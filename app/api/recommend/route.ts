import { NextResponse } from "next/server";
import { recommend, type FinderInput, type Recommendation } from "@/lib/data/finder";
import { packages } from "@/lib/data/packages";

export const runtime = "nodejs";

/**
 * AI Solution Finder endpoint.
 * The recommendation's PACKAGE and PRICE always come from our fixed rules
 * (so the model can never hallucinate a quote). The LLM only personalizes the
 * human copy — intro, bullets, time saved. Falls back to pure rules if no key
 * or any error.
 */
export async function POST(req: Request) {
  let input: FinderInput;
  try {
    input = (await req.json()) as FinderInput;
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
      model: "gpt-4o-mini",
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
  } catch {
    return NextResponse.json(base);
  }
}
