import { NextResponse } from "next/server";
import { recommend, type FinderInput, type Recommendation } from "@/lib/data/finder";
import { packages } from "@/lib/data/packages";
import { modelFor } from "@/lib/ai/core";
import {
  clientIp,
  checkDemoPerMinute,
  checkDemoPerDay,
  checkDemoGlobalDaily,
} from "@/lib/rateLimit";

export const runtime = "nodejs";

/** Body size cap — nothing legitimate about a finder answer set is this big. */
const MAX_BODY_CHARS = 4_000;

/**
 * AI Solution Finder endpoint.
 * The recommendation's PACKAGE and PRICE always come from our fixed rules
 * (so the model can never hallucinate a quote). The LLM only personalizes the
 * human copy — intro, bullets, time saved. Falls back to pure rules if no key
 * or any error.
 *
 * RATE LIMITS (added 2026-08-30). This route posted to OpenAI on the owner's
 * key with no limit and no body cap. It now shares /api/demo's three-layer
 * guard (per-minute + per-IP-day + global daily backstop). Degrading is cheap
 * here: the rules-based recommendation is the authoritative one — the model
 * only rewrites the prose — so a limited caller still gets a correct answer,
 * flagged `limited: true` with `source: "rules"`.
 *
 * NOTE — SHARED BUDGET with /api/demo and /api/tools-demo; see the handoff for
 * the dedicated buckets proposed for `lib/rateLimit.ts`.
 */
export async function POST(req: Request) {
  let input: FinderInput;
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (rawBody.length > MAX_BODY_CHARS) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  try {
    input = JSON.parse(rawBody) as FinderInput;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!input?.outcome) {
    return NextResponse.json({ error: "Missing outcome" }, { status: 400 });
  }

  const base = recommend(input); // rules-based: locks package, price, timeline

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(base);
  }

  // Rate limit BEFORE the paid call. A limited caller gets the rules answer,
  // told plainly that it wasn't personalised — never a blank or an error.
  const ip = clientIp(req);
  const perMin = checkDemoPerMinute(ip);
  const perDay = checkDemoPerDay(ip);
  if (!perMin.ok || !perDay.ok) {
    return NextResponse.json(
      { ...base, limited: true, retryAfter: Math.max(perMin.retryAfter, perDay.retryAfter) },
      { headers: { "Retry-After": String(Math.max(perMin.retryAfter, perDay.retryAfter)) } },
    );
  }
  // Global daily spend backstop.
  if (!checkDemoGlobalDaily().ok) {
    return NextResponse.json({ ...base, limited: true });
  }

  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey });

    const pkg = packages.find((p) => p.id === base.packageId)!;
    const system =
      "You are the solution advisor for 'Handbuilt', a personal AI studio that builds custom AI tools, agents, automations and apps for businesses and individuals. " +
      "You will be given a visitor's goal and a PRE-SELECTED package (already chosen by business rules). " +
      "Do NOT change the package, price, or timeline. Only write warm, concrete, jargon-free copy that personalizes the recommendation to their situation. " +
      "Return STRICT JSON with keys: intro (one sentence, <=160 chars), bullets (array of 3 short strings, each a concrete thing we'd build for them, no prices), timeSaved (short phrase like '~8 hrs/week'). No markdown.";

    const user = JSON.stringify({
      goal: input,
      preselectedPackage: { name: pkg.name, forWho: pkg.forWho, includes: pkg.includes },
    });

    const completion = await client.chat.completions.create({
      model: modelFor("fast"),
      temperature: 0.7,
      max_tokens: 320,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) return NextResponse.json(base);

    const parsed = JSON.parse(raw) as { intro?: string; bullets?: string[]; timeSaved?: string };

    const result: Recommendation = {
      ...base,
      intro: typeof parsed.intro === "string" && parsed.intro.trim() ? parsed.intro.trim() : base.intro,
      bullets:
        Array.isArray(parsed.bullets) && parsed.bullets.length > 0
          ? parsed.bullets.slice(0, 4).map(String)
          : base.bullets,
      timeSaved:
        typeof parsed.timeSaved === "string" && parsed.timeSaved.trim() ? parsed.timeSaved.trim() : base.timeSaved,
      source: "ai",
    };

    return NextResponse.json(result);
  } catch (err) {
    // Was a bare `catch {}` — a failure only this process ever knew about.
    console.error("[AI-SHOP RECOMMEND] falling back to rules:", (err as Error)?.message);
    return NextResponse.json(base);
  }
}
