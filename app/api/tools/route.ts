import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSubStatus } from "@/lib/subscription";

export const runtime = "nodejs";

/**
 * Self-serve AI tools endpoint (the /tools suite).
 *
 * Generator tools: take `fields{}` → return one AI `reply`. One route, a
 * `kind` switch, rich per-kind prompts. Same engine + safety as /api/demo:
 *   - dynamic-import openai, OPENAI_MODEL default gpt-4o-mini
 *   - graceful canned fallback when no key (so pages never look broken)
 *   - honesty rules in every prompt (no fabricated prices/specifics)
 *   - length/field caps so a public endpoint can't run up an unbounded bill
 *
 * Outputs use ALLCAPS labels ("SCOPE:", "PRICING:") so the client renders
 * them as headed sections.
 */

const MAX_FIELD = 600;

type Kind = "proposal" | "estimate" | "review" | "brief" | "reminder";
const KINDS: Kind[] = ["proposal", "estimate", "review", "brief", "reminder"];

const HONESTY =
  "\n\nHonesty rules: Use only the details the user gave you. Do not invent specific facts, credentials, awards, testimonials, statistics or guarantees. Any price you state is a rough estimate the user confirms — never a binding or guaranteed amount.";

function systemPrompt(kind: Kind): string {
  switch (kind) {
    case "proposal":
      return `You are an expert proposal writer for service businesses. From the details provided, write a polished, persuasive, client-ready proposal the user can send as-is. Use this exact structure with ALLCAPS section labels on their own lines:

OVERVIEW: 2-3 sentences restating the client's need and the outcome they'll get.
SCOPE OF WORK: a clear bulleted list of everything included.
APPROACH: 2-3 short bullets on how the work will be done, phase by phase.
TIMELINE: the timeline given (or a sensible phrasing if none), broken into milestones if useful.
INVESTMENT: the price, framed with confidence; if helpful, break it into a couple of line items. Note it's an estimate only if appropriate.
WHY US: 1-2 short, credible lines on why this business is a strong choice (use only details given — no invented credentials).
TERMS: 2-3 fair, standard terms (deposit, validity, change requests). Generic — not legal advice.
NEXT STEPS: how the client accepts and what happens first.

Then add:
COVER EMAIL: a short, warm email the user can paste to send the proposal, with a subject line.

Make it specific to the project and address the client by name. Confident, professional, not generic.${HONESTY}`;

    case "estimate":
      return `You are an experienced estimator for service businesses. From the job details, produce a helpful ballpark estimate. Use this exact structure with ALLCAPS labels:

ESTIMATE: a rough price RANGE (e.g. "$X–$Y"), clearly labelled as an estimate to be confirmed after a closer look — never a guaranteed price.
LABOUR: one line on the labour assumption driving the estimate.
MATERIALS: one line on materials/equipment assumptions (or "n/a").
WHAT AFFECTS THE PRICE: 2-3 short bullets on factors that move it up or down.
CUSTOMER QUOTE: a short, friendly summary the user could send the customer, ending by inviting them to confirm details.

Use realistic ranges for the industry, but be clear these are ballparks. Keep it tight.${HONESTY}`;

    case "review":
      return `You are a friendly small-business owner replying to an online review. Based on the review, its star rating, and the requested tone, write THREE distinct reply options. Use this exact structure with ALLCAPS labels:

FRIENDLY: a warm, personable reply.
PROFESSIONAL: a polished, professional reply.
SHORT: a brief one-or-two-sentence reply.

Rules: thank the reviewer, reference something specific from their review, and keep each reply genuine — never generic spam. For negative or low-star reviews, stay calm and gracious, apologise sincerely, avoid admitting fault or sharing private details, and invite them to continue the conversation offline. Use the business name if given.${HONESTY}`;

    case "brief":
      return `You are a senior brand and web strategist. From the user's idea, produce a complete, practical business & website brief they could hand to a designer or build from today. Use this exact structure with ALLCAPS labels:

BRAND: a crisp positioning line + 3 name ideas (clearly marked as suggestions) + a one-line tagline.
TARGET CUSTOMER: who they're for and the core problem solved.
SERVICES: 3-5 core services/offers as bullets, with a one-line description each.
COMPETITIVE ANGLE: 1-2 bullets on how to stand out.
WEBSITE PAGES: the pages the site should have, as a short list.
HERO COPY: a headline + one-line subheadline for the homepage.
SEO KEYWORDS: 6-8 keywords/phrases worth ranking for.
FAQS: 3-4 likely customer questions with one-line answers.
FIRST 30 DAYS: 3 concrete steps to launch.

Be specific to the user's idea and audience. Usable and concrete, not fluffy.${HONESTY}`;

    case "reminder":
      return `You are an accounts assistant. Based on the client, amount, due info and tone, write THREE polite payment-reminder options. Use this exact structure with ALLCAPS labels:

EMAIL: a complete reminder email (warm, clear ask to pay, offer to help if there's an issue).
SMS: a short text-message version (1-2 sentences).
FINAL NOTICE: a firmer but still professional and respectful version, for if earlier reminders went unanswered.

Rules: never threatening, never rude. Use the client name and amount given; don't invent other details. Always leave room that they may have already paid.${HONESTY}`;
  }
}

// ---------- Fallbacks (no key / error) — keep pages functional ----------
function fallback(kind: Kind, f: Record<string, string>): string {
  switch (kind) {
    case "proposal":
      return `OVERVIEW: Proposal for ${f.clientName || "your client"} from ${f.yourBusiness || "your business"} covering ${f.project || "the requested work"}.\nSCOPE OF WORK: As described, delivered to a professional standard.\nTIMELINE: ${f.timeline || "To be confirmed"}.\nPRICING: ${f.price || "To be confirmed"} (estimate — confirmed on acceptance).\nTERMS: Deposit to start; quote valid 30 days; change requests scoped separately.\nNEXT STEPS: Reply to accept and we'll schedule a start date.\nCOVER EMAIL: Hi ${f.clientName || "there"}, thanks for the opportunity — please find our proposal attached. Happy to walk through any of it. Best regards.`;
    case "estimate":
      return `ESTIMATE: A ballpark for "${f.job || "this job"}" will be confirmed after a closer look.\nLABOUR: Depends on scope and access.\nMATERIALS: Varies with the spec chosen.\nWHAT AFFECTS THE PRICE: Size; condition; timeline; materials.\nCUSTOMER QUOTE: Thanks for the details — here's a rough range; happy to firm it up once we confirm specifics.`;
    case "review":
      return `FRIENDLY: Thank you so much for taking the time to share this — it genuinely means a lot to ${f.businessName || "us"}!\nPROFESSIONAL: Thank you for your feedback. We appreciate you choosing ${f.businessName || "us"} and look forward to serving you again.\nSHORT: Thanks so much for the kind words!`;
    case "brief":
      return `BRAND: A focused offer for ${f.audience || "your audience"}.\nSERVICES: Core service; add-on service; premium tier.\nWEBSITE PAGES: Home; Services; About; Contact.\nHERO COPY: A clear headline about the value you deliver.\nSEO KEYWORDS: your service + your city, "near me" variants.\nFAQS: What do you offer? How much? How to start?`;
    case "reminder":
      return `EMAIL: Hi ${f.client || "there"}, a friendly reminder that your invoice${f.amount ? ` of ${f.amount}` : ""} is now due. If you've already paid, thank you — please disregard. Any issues, just reply and we'll help.\nSMS: Hi ${f.client || "there"}, quick reminder your invoice${f.amount ? ` (${f.amount})` : ""} is due — thank you!\nFINAL NOTICE: Hi ${f.client || "there"}, following up once more on the outstanding invoice${f.amount ? ` of ${f.amount}` : ""}. Please arrange payment at your earliest convenience, or reply if there's a problem we can help with.`;
  }
}

export async function POST(req: Request) {
  let body: { kind?: string; fields?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const kind = body.kind as Kind;
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
  }

  // Paid gate — Tools Pro subscription required. (Defense in depth: the page
  // also gates, but the endpoint must never generate for a non-subscriber.)
  const sub = await getSubStatus();
  if (!sub.subscribed) {
    return NextResponse.json(
      {
        error: sub.authed ? "A Tools Pro subscription is required." : "Please sign in to continue.",
        upgrade: true,
        authed: sub.authed,
      },
      { status: 402 }
    );
  }

  const rawFields = body.fields && typeof body.fields === "object" ? body.fields : {};
  const fields: Record<string, string> = Object.fromEntries(
    Object.entries(rawFields)
      .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
      .slice(0, 16)
      .map(([k, v]) => [k.slice(0, 40), String(v).slice(0, MAX_FIELD)])
  );

  const userContent = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  if (!userContent) {
    return NextResponse.json({ error: "No details provided" }, { status: 400 });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ reply: fallback(kind, fields), fallback: true });
  }

  try {
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: key });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt(kind) },
        { role: "user", content: userContent },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const reply = completion.choices[0]?.message?.content?.trim() || fallback(kind, fields);
    // Save to the subscriber's history (best-effort — never blocks the response).
    if (sub.userId) {
      prisma.toolRun
        .create({
          data: {
            userId: sub.userId,
            tool: kind,
            title: (fields.clientName || fields.client || fields.job || fields.idea || kind).slice(0, 80),
            input: fields,
            output: reply,
          },
        })
        .catch((e) => console.error("[AI-SHOP TOOLS] history save failed", e));
    }
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[AI-SHOP TOOLS] openai error", err);
    return NextResponse.json({ reply: fallback(kind, fields), fallback: true });
  }
}
