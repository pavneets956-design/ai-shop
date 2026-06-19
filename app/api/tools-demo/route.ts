import { NextResponse } from "next/server";
import { getOpenAI, modelFor, DEMO_SAFETY, DEMO_REFUSAL, looksLikeInjection } from "@/lib/ai/core";

export const runtime = "nodejs";

/**
 * Unified live-DEMO endpoint for the shop's AI tools.
 *
 * One route, several `kind`s so each shop product has a real, working demo
 * a prospect can try — proof, not screenshots. Two shapes:
 *   - chat kinds   ("lead", "assistant"): take a `messages[]` history.
 *   - generator    ("quote", "nudge"):    take `fields{}` → one AI output.
 *
 * Honesty rules (in every prompt): never invent exact prices, addresses,
 * staff, hours, testimonials or guarantees. Estimates are framed as rough
 * ballparks the owner confirms — no fabricated specifics.
 *
 * Env:
 *   OPENAI_API_KEY   required for live output (falls back to a canned line)
 *   OPENAI_MODEL     optional, defaults to gpt-4o-mini
 *
 * Cost/abuse guards: caps history + per-message/field length so a public
 * endpoint can't run up an unbounded bill.
 */

const MAX_MESSAGES = 24;
const MAX_CHARS = 600;
const MAX_FIELD = 400;

type ChatMessage = { role: "user" | "assistant"; content: string };
type Kind = "quote" | "lead" | "assistant" | "nudge";

const isChatKind = (k: Kind) => k === "lead" || k === "assistant";

// ---------- System prompts per kind ----------
function systemPrompt(kind: Kind, business: string): string {
  const honesty = `\n\nHonesty rules (important): Never invent specific prices, addresses, staff names, hours, testimonials, guarantees or statistics for ${business}. If asked something only the owner would know, say you'll have someone confirm and capture their contact details instead.`;

  switch (kind) {
    case "lead":
      return `You are an AI lead assistant working for ${business}. The person messaging you is a potential CUSTOMER who just enquired. Your job is to reply instantly, qualify them, and move them toward booking. Find out, one question at a time: what they need, rough timeline/urgency, and the best way to reach them (name + phone or email). Keep replies short and friendly (1-3 sentences). Once you have name + contact + what they need, confirm you've got it and that the team will follow up fast. You may say you're the "AI assistant".${honesty}`;

    case "assistant":
      return `You are a helpful AI sales assistant embedded on the website of ${business}. The person messaging is a website VISITOR. Answer their questions about services clearly and briefly, and when there's intent, capture their name and best contact (phone or email) and offer to book a call or get them a quote. Keep replies short (1-3 sentences), warm, never pushy. You may say you're the website's "AI assistant".${honesty}`;

    case "quote":
      return `You are an AI quoting assistant for ${business}. Based on the job details provided, produce a helpful response in this exact structure using short lines:

ESTIMATE: a rough ballpark RANGE (e.g. "$X–$Y"), clearly framed as an estimate the owner confirms — not a binding price.
WHY: 1-2 short bullets on what drives the price for this job.
NEXT: one line on what happens next (owner confirms details / books a site visit).
LEAD SUMMARY: a clean one-line summary of the job for the owner (service, scope, location/urgency if given).

Keep the whole thing tight. Use realistic ranges for the service type but NEVER present an exact final price as guaranteed.${honesty}`;

    case "nudge":
      return `You are an AI accounts assistant for ${business}. Draft a single polite, professional payment-reminder message for an overdue invoice, in the requested tone. Rules: warm and respectful (never threatening), short (3-5 sentences), include a clear ask to pay and an offer to help if there's an issue. Output ONLY the message text — no preamble, no subject line unless natural. Use the client name and amount given; do not invent extra details.${honesty}`;
  }
}

// ---------- Fallbacks (no API key / error) ----------
function chatFallback(kind: Kind, messages: ChatMessage[]): string {
  const last = messages[messages.length - 1]?.content.toLowerCase() ?? "";
  if (/book|quote|appointment|price|cost|interested/.test(last)) {
    return "Happy to help with that. What's your name and the best number or email to reach you, so the team can follow up quickly?";
  }
  if (kind === "assistant") {
    return "Great question — I can help with that. Want me to grab your details and have someone send the specifics?";
  }
  return "Thanks for reaching out! Tell me a bit about what you need and the best way to reach you.";
}

function generatorFallback(kind: Kind, fields: Record<string, string>): string {
  if (kind === "quote") {
    const svc = fields.service || "the job";
    return `ESTIMATE: A rough ballpark for ${svc} would be confirmed by the owner once details are reviewed.\nWHY: Final price depends on scope, materials and site access.\nNEXT: The owner reviews this and confirms a firm quote, usually same day.\nLEAD SUMMARY: New ${svc} enquiry — owner to confirm exact pricing.`;
  }
  const client = fields.client || "there";
  const amount = fields.amount ? ` of ${fields.amount}` : "";
  return `Hi ${client}, just a friendly reminder that your invoice${amount} is now past due. If you've already sent payment, thank you — please disregard this note. If anything's holding it up, reply here and we'll sort it out together. Thanks so much!`;
}

// ---------- Handler ----------
export async function POST(req: Request) {
  let body: {
    kind?: string;
    business?: string;
    messages?: ChatMessage[];
    fields?: Record<string, string>;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const kind = body.kind as Kind;
  if (!["quote", "lead", "assistant", "nudge"].includes(kind)) {
    return NextResponse.json({ error: "Unknown demo kind" }, { status: 400 });
  }

  const business =
    typeof body.business === "string" && body.business.trim()
      ? body.business.trim().slice(0, 120)
      : "a local service business";

  // Build the model messages for this kind.
  let modelMessages: ChatMessage[];
  let fields: Record<string, string> = {};

  if (isChatKind(kind)) {
    const raw = Array.isArray(body.messages) ? body.messages : [];
    modelMessages = raw
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

    if (modelMessages.length === 0) {
      return NextResponse.json({ error: "No messages" }, { status: 400 });
    }
  } else {
    // Generator kinds: sanitize fields into a single user message.
    const rawFields = body.fields && typeof body.fields === "object" ? body.fields : {};
    fields = Object.fromEntries(
      Object.entries(rawFields)
        .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
        .slice(0, 12)
        .map(([k, v]) => [k.slice(0, 40), String(v).slice(0, MAX_FIELD)])
    );
    const userContent = Object.entries(fields)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    modelMessages = [{ role: "user", content: userContent || "No details provided." }];
  }

  // Cheap pre-filter on interactive chat kinds: refuse obvious injection / off-topic.
  if (isChatKind(kind)) {
    const lastUser = [...modelMessages].reverse().find((m) => m.role === "user")?.content ?? "";
    if (looksLikeInjection(lastUser)) {
      return NextResponse.json({ reply: DEMO_REFUSAL });
    }
  }

  const openai = await getOpenAI();
  if (!openai) {
    const reply = isChatKind(kind)
      ? chatFallback(kind, modelMessages)
      : generatorFallback(kind, fields);
    return NextResponse.json({ reply, fallback: true });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: modelFor("fast"),
      messages: [
        { role: "system", content: systemPrompt(kind, business) + DEMO_SAFETY },
        ...modelMessages,
      ],
      temperature: kind === "nudge" || kind === "quote" ? 0.6 : 0.7,
      max_tokens: isChatKind(kind) ? 180 : 320,
    });
    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      (isChatKind(kind) ? chatFallback(kind, modelMessages) : generatorFallback(kind, fields));
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[AI-SHOP TOOLS-DEMO] openai error", err);
    const reply = isChatKind(kind)
      ? chatFallback(kind, modelMessages)
      : generatorFallback(kind, fields);
    return NextResponse.json({ reply, fallback: true });
  }
}
