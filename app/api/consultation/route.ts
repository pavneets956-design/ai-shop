import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Live LLM intake for the /start "AI call".
 *
 * Powers the cinematic voice-led consultation: the model plays a warm Handbuilt
 * intake consultant, conducts a free-form interview that handles ANY typed
 * answer, and returns the next spoken line plus an incrementally-extracted brief.
 *
 * Contract (mirrors /api/demo's fallback shape so the client can branch):
 *   IN : { messages: {role:"user"|"assistant", content}[], brief?: Partial<Brief> }
 *   OUT: { reply, chips: string[], briefPatch: Brief, done: boolean }   (live)
 *        { fallback: true }                                             (no key / error)
 *
 * When OPENAI_API_KEY is absent or the model errors, this returns
 * { fallback:true } and the client degrades to a scripted flow — so /start
 * NEVER breaks in prod, with or without the key.
 *
 * Env:
 *   OPENAI_API_KEY   required for live conversation (else graceful fallback)
 *   OPENAI_MODEL     optional, defaults to gpt-4o-mini (cheap + fast)
 *
 * Abuse guards: history cap, per-message char cap, hard turn cap, max_tokens,
 * and a light in-memory per-IP rate limit (per-instance floor).
 */

const MAX_MESSAGES = 24; // conversation turns kept in context
const MAX_CHARS = 600; // per user message
const MAX_USER_TURNS = 12; // hard cap — a 5-field intake never needs more
const MAX_TOKENS = 240;

type Role = "user" | "assistant";
type ChatMessage = { role: Role; content: string };
type Brief = { name: string; kind: string; want: string; city: string; email: string };

// ---- light per-IP rate limit (in-memory, per-instance) --------------------
const RL_WINDOW_MS = 60_000;
const RL_MAX = 24; // requests / minute / IP
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  // opportunistic cleanup so the map can't grow unbounded
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < RL_WINDOW_MS)) hits.delete(k);
  }
  return arr.length > RL_MAX;
}

function systemPrompt(brief: Partial<Brief>, wrapUp: boolean): string {
  const known = Object.entries(brief)
    .filter(([, v]) => typeof v === "string" && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");

  return `You are the voice of Handbuilt — a studio that builds AI agents and AI-powered websites for everyday businesses (plumbers, clinics, shops, trades, local services). You are on a short, warm phone-style intake call with a potential client who just reached you. The visitor has ALREADY been greeted; do not re-introduce yourself or say hello again.

Your job: run a quick, natural conversation to learn five things, then wrap up.
  1. name  — what their business is called
  2. kind  — what the business does (normalize: e.g. "plumbing", "dental clinic", "online store")
  3. want  — what they want the AI to do for them (e.g. "answer calls and book jobs", "reply to website chats", "capture leads 24/7", "just a great website")
  4. city  — where they're based (normalize to a clean city name)
  5. email — where to send their plan

How to talk:
- Speak ONE short line per turn — 1 to 2 sentences, the way a friendly human consultant would on a call. Never a paragraph.
- Ask ONE thing at a time. React briefly and warmly to what they just said before asking the next thing.
- When a question has natural categorical answers (the business kind, what they want the AI to do), offer 2–4 short tappable options in "chips" so they can pick fast. For open answers (name, city, email) return chips: [].
- Accept messy, free-form answers and extract clean values into briefPatch. Only include a field in briefPatch when you actually learned it THIS turn; otherwise return "" for that field. Never guess or invent values.

Wrapping up:
- Before finishing, read the EMAIL back once to confirm it's right (e.g. "great, I'll send the plan to pav at gmail dot com — that right?").
- Set done:true ONLY after you have a valid email AND every other field. When done, give a brief, warm closing line (their plan is on its way, you'll follow up) and chips: [].

Honesty (non-negotiable):
- Never invent or promise specific prices, timelines, guarantees, client names, or statistics. Pricing lives on the pricing page; if asked, say a human will confirm specifics. Don't discuss being a language model.
${known ? `\nAlready collected: ${known}. Do NOT ask for these again.` : ""}${
    wrapUp
      ? `\n\nThis call has gone long — wrap it up NOW. Get the email if you don't have it, then set done:true.`
      : ""
  }`;
}

const RESPONSE_FORMAT = {
  type: "json_schema" as const,
  json_schema: {
    name: "intake_turn",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        reply: { type: "string", description: "The single short line to speak this turn." },
        chips: {
          type: "array",
          items: { type: "string" },
          description: "2-4 short tappable options, or empty array.",
        },
        briefPatch: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            kind: { type: "string" },
            want: { type: "string" },
            city: { type: "string" },
            email: { type: "string" },
          },
          required: ["name", "kind", "want", "city", "email"],
        },
        done: { type: "boolean" },
      },
      required: ["reply", "chips", "briefPatch", "done"],
    },
  },
};

export async function POST(req: Request) {
  let body: { messages?: ChatMessage[]; brief?: Partial<Brief> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Slow down" }, { status: 429 });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const messages: ChatMessage[] = rawMessages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  const brief: Partial<Brief> =
    body.brief && typeof body.brief === "object" ? body.brief : {};

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    // No key — client falls back to the scripted flow.
    return NextResponse.json({ fallback: true });
  }

  const userTurns = messages.filter((m) => m.role === "user").length;
  const wrapUp = userTurns >= MAX_USER_TURNS;

  // First turn: no history yet — ask the model to open with the first question.
  const convo: ChatMessage[] =
    messages.length > 0
      ? messages
      : [
          {
            role: "user",
            content:
              "(The call just connected and I've already heard your greeting. Ask me your first question.)",
          },
        ];

  try {
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: key });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt(brief, wrapUp) }, ...convo],
      temperature: 0.6,
      max_tokens: MAX_TOKENS,
      response_format: RESPONSE_FORMAT,
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    const parsed = JSON.parse(raw) as {
      reply?: string;
      chips?: unknown;
      briefPatch?: Partial<Brief>;
      done?: boolean;
    };

    const reply = typeof parsed.reply === "string" ? parsed.reply.trim() : "";
    if (!reply) throw new Error("empty reply");

    const chips = Array.isArray(parsed.chips)
      ? parsed.chips.filter((c) => typeof c === "string" && c.trim()).slice(0, 4)
      : [];

    const patch: Partial<Brief> = {};
    const pb = parsed.briefPatch || {};
    (["name", "kind", "want", "city", "email"] as const).forEach((k) => {
      const v = pb[k];
      if (typeof v === "string" && v.trim()) patch[k] = v.trim();
    });

    // Force a wrap-up if we've hit the turn cap, regardless of model output.
    const done = wrapUp ? true : Boolean(parsed.done);

    return NextResponse.json({ reply, chips, briefPatch: patch, done });
  } catch (err) {
    console.error("[HANDBUILT CONSULTATION] error", err);
    // Any failure -> client degrades to its deterministic finisher.
    return NextResponse.json({ fallback: true });
  }
}
