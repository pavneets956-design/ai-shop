import { NextResponse } from "next/server";
import { getOpenAI, modelFor, DEMO_SAFETY, DEMO_REFUSAL, looksLikeInjection } from "@/lib/ai/core";

export const runtime = "nodejs";

/**
 * Live AI-receptionist DEMO endpoint.
 *
 * The visitor plays a CUSTOMER calling a sample business; the AI answers as
 * that business's receptionist, so a prospect feels exactly what their own
 * callers would experience. Honest demo — no fabricated prices, testimonials,
 * or client claims (the system prompt forbids inventing specifics).
 *
 * Env:
 *   OPENAI_API_KEY   required for live responses (falls back to a canned line)
 *   OPENAI_MODEL     optional, defaults to gpt-4o-mini (cheap + fast for a public demo)
 *
 * Cost/abuse guards: caps history length and per-message length so a public
 * endpoint can't run up an unbounded bill.
 */

const MAX_MESSAGES = 24; // full conversation turns kept
const MAX_CHARS = 600; // per user message

type ChatMessage = { role: "user" | "assistant"; content: string };

function systemPrompt(business: string): string {
  return `You are a warm, competent AI receptionist answering phone calls for ${business}. The person messaging you is a CUSTOMER contacting ${business}. This is a live demo so they can see exactly what their own callers would experience.

What to do on the call:
- Greet warmly and find out how you can help.
- Understand what they need — a quote, a booking, a question, or an urgent issue.
- Answer naturally and briefly.
- When they want to book or need a callback, collect their name, the best phone or email to reach them, and what they need. Then confirm those details back.
- If it sounds urgent, reassure them it'll be passed to the team right away.

Style:
- Sound like a real, friendly human receptionist — never a script or robot.
- Keep replies short: 1–3 sentences. No long paragraphs.
- Ask only one question at a time.
- Stay in character as ${business}'s receptionist. You may say you're the "AI receptionist" (that's what this demo is), but don't discuss being a language model.

Honesty rules (important):
- Never invent specific prices, addresses, staff names, or hours for ${business}. If asked something only the owner would know, say you'll have someone confirm and capture their contact details instead.
- Never make up testimonials, guarantees, or statistics.`;
}

function fallbackReply(messages: ChatMessage[]): string {
  const last = messages[messages.length - 1]?.content.toLowerCase() ?? "";
  if (/book|appointment|schedule|quote/.test(last)) {
    return "Happy to help with that. Can I grab your name and the best number to reach you, so I can get it booked?";
  }
  if (/emergency|urgent|asap|leak|broke|broken/.test(last)) {
    return "Sorry to hear that — let's get someone on it quickly. What's your name and a callback number?";
  }
  return "Thanks for calling! I can help with bookings, quotes, or questions — what do you need today?";
}

export async function POST(req: Request) {
  let body: { business?: string; messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const business =
    typeof body.business === "string" && body.business.trim()
      ? body.business.trim().slice(0, 120)
      : "a local service business";

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

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages" }, { status: 400 });
  }

  // Cheap pre-filter: refuse obvious prompt-injection / off-topic before spending a token.
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  if (looksLikeInjection(lastUser)) {
    return NextResponse.json({ reply: DEMO_REFUSAL });
  }

  const openai = await getOpenAI();
  if (!openai) {
    // No key configured — keep the page working with a graceful canned line.
    return NextResponse.json({ reply: fallbackReply(messages), fallback: true });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: modelFor("fast"),
      messages: [{ role: "system", content: systemPrompt(business) + DEMO_SAFETY }, ...messages],
      temperature: 0.7,
      max_tokens: 180,
    });
    const reply =
      completion.choices[0]?.message?.content?.trim() || fallbackReply(messages);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[AI-SHOP DEMO] openai error", err);
    return NextResponse.json({ reply: fallbackReply(messages), fallback: true });
  }
}
