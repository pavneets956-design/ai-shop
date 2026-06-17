import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSubStatus } from "@/lib/subscription";
import {
  checkIpRate,
  checkUserDaily,
  checkGlobalDaily,
  clientIp,
  DAILY_LIMIT,
} from "@/lib/rateLimit";

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
 * Access model:
 *   - Tools Pro subscribers: unlimited (bounded by a generous daily cap).
 *   - Everyone else: ONE free generation per tool (taste-it funnel), tracked by
 *     an httpOnly cookie. After that, a subscription is required.
 *   - An IP throttle guards the OpenAI key from scripted abuse.
 *
 * Outputs use ALLCAPS labels ("SCOPE:", "PRICING:") so the client renders
 * them as headed sections.
 */

const MAX_FIELD = 600;
const FREE_COOKIE = "tp_free";

type Kind = "proposal" | "estimate" | "review" | "brief" | "reminder";
const KINDS: Kind[] = ["proposal", "estimate", "review", "brief", "reminder"];

const HONESTY =
  "\n\nHonesty rules: Use only the details the user gave you. Do not invent specific facts, credentials, awards, testimonials, statistics or guarantees. Any price you state is a rough estimate the user confirms — never a binding or guaranteed amount.";

function systemPrompt(kind: Kind): string {
  switch (kind) {
    case "proposal":
      return `You are a top-tier proposal writer for a hands-on service business. Write a proposal so specific and well-judged that the client feels understood and says yes. Open on THEIR situation and outcome, not on your company. Use the actual project details concretely — never generic filler. Sound like a sharp, warm professional, never like a template or an AI.

Use this exact structure with ALLCAPS section labels on their own lines:

OVERVIEW: 2-3 sentences naming the client's situation and the specific outcome they'll get. Lead with them, not you.
SCOPE OF WORK: a concrete bulleted list of exactly what's included, drawn from the project details — specific, not vague.
APPROACH: 2-3 short bullets on how the work gets done, phase by phase, so they feel the process is under control.
TIMELINE: the timeline given (or a sensible one), as clear milestones.
INVESTMENT: the price, stated with confidence and framed against the value/outcome; break it into a couple of line items if that helps. Note it's an estimate only if appropriate.
WHY US: 1-2 credible lines on why this business is the right choice — using ONLY details given, with no invented credentials, awards or numbers.
TERMS: 2-3 fair, standard terms (deposit, validity, change requests). Generic, not legal advice.
NEXT STEPS: exactly how the client says yes and what happens first.

Then add:
COVER EMAIL: a short, warm email (with a subject line) the client would actually want to open — specific to them, not boilerplate.

Tone rules (hard): no clichés ("in today's fast-paced world", "we are thrilled/excited to", "leverage", "seamless", "elevate", "unlock", "robust"). No empty superlatives. Short, direct sentences. Address the client by name. Make every line earn its place.${HONESTY}`;

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

/** Tool kinds this browser has already spent its one free generation on. */
function usedFreeKinds(req: Request): string[] {
  const cookie = req.headers.get("cookie") || "";
  const entry = cookie.split(/;\s*/).find((c) => c.startsWith(`${FREE_COOKIE}=`));
  if (!entry) return [];
  return decodeURIComponent(entry.slice(FREE_COOKIE.length + 1))
    .split(",")
    .filter(Boolean);
}

export async function POST(req: Request) {
  // Throttle by IP first — the cheapest guard against scripted abuse of the key.
  const ipRate = checkIpRate(clientIp(req));
  if (!ipRate.ok) {
    return NextResponse.json(
      { error: "You're going a little fast — give it a moment and try again." },
      { status: 429, headers: { "Retry-After": String(ipRate.retryAfter) } }
    );
  }

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

  const sub = await getSubStatus();

  // Free-taste funnel: anyone gets ONE free generation per tool, no login. After
  // that (or for any repeat use) a Tools Pro subscription is required.
  const used = usedFreeKinds(req);
  const freeAvailable = !sub.subscribed && !used.includes(kind);
  if (!sub.subscribed && !freeAvailable) {
    return NextResponse.json(
      {
        error: sub.authed
          ? "You've used your free generation for this tool. Subscribe to Tools Pro for unlimited use."
          : "You've used your free generation for this tool. Sign in and subscribe for unlimited use.",
        upgrade: true,
        authed: sub.authed,
        freeUsed: true,
      },
      { status: 402 }
    );
  }

  // Per-subscriber daily cap (anti-abuse / sharing). Free users are bounded by
  // the one-per-tool rule + the IP throttle instead.
  if (sub.subscribed && sub.userId) {
    const daily = checkUserDaily(sub.userId);
    if (!daily.ok) {
      return NextResponse.json(
        {
          error: `You've hit today's limit of ${DAILY_LIMIT} generations. It resets in a few hours.`,
        },
        { status: 429, headers: { "Retry-After": String(daily.retryAfter) } }
      );
    }
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

  // Global daily backstop on TOTAL generations — guards the OpenAI key against
  // distributed abuse / runaway agents beyond the per-user + per-IP caps.
  const globalCap = checkGlobalDaily();
  if (!globalCap.ok) {
    return NextResponse.json(
      { error: "The tools are at capacity for today — please try again tomorrow." },
      { status: 429, headers: { "Retry-After": String(globalCap.retryAfter) } }
    );
  }

  // Save every generation to the subscriber's history — best-effort, never
  // blocks the response, and runs for live AI and canned-fallback output alike.
  const persist = (reply: string) => {
    if (!sub.userId) return;
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
  };

  // Build the response, persisting and (for a free generation) marking this
  // tool's free credit as spent for ~6 months on this browser.
  const finish = (reply: string, extra: Record<string, unknown> = {}) => {
    persist(reply);
    const res = NextResponse.json({ reply, free: freeAvailable, ...extra });
    if (freeAvailable) {
      const next = Array.from(new Set([...used, kind])).join(",");
      res.cookies.set(FREE_COOKIE, next, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
      });
    }
    return res;
  };

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return finish(fallback(kind, fields), { fallback: true });
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
    return finish(reply);
  } catch (err) {
    console.error("[AI-SHOP TOOLS] openai error", err);
    return finish(fallback(kind, fields), { fallback: true });
  }
}
