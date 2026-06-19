import { NextResponse } from "next/server";
import { getOpenAI, modelFor, DEMO_SAFETY, DEMO_REFUSAL, looksLikeInjection } from "@/lib/ai/core";
import {
  clientIp,
  checkDemoPerMinute,
  checkDemoPerDay,
  checkDemoGlobalDaily,
} from "@/lib/rateLimit";
import {
  workerById,
  industryById,
  showroomSystemPrompt,
  scriptedResponse,
  DEMO_JSON_SCHEMA,
  type WorkerId,
  type IndustryId,
  type DemoResponse,
} from "@/lib/data/showroom";
import { demoResponseSchema } from "@/lib/ai/demoSchema";

export const runtime = "nodejs";

/**
 * AI Worker Showroom demo endpoint.
 *
 * The public website demo NEVER makes real calls / SMS / emails / bookings —
 * GPT only produces the worker's reply, captured fields, next actions and
 * SIMULATED system events. Every failure path (no key, daily cap, GPT error,
 * bad JSON, rate-limited) degrades to a high-quality deterministic scripted
 * response so the showroom is never broken.
 *
 * Cost / anti-abuse (env-tunable):
 *   OPENAI_API_KEY, OPENAI_MODEL_FAST (=gpt-4o-mini), OPENAI_MODEL_PREMIUM
 *   AI_DEMO_DISABLED=false
 *   AI_DEMO_DAILY_REQUEST_CAP=300
 *   AI_DEMO_MAX_MESSAGES_PER_IP_DAY=20
 *   (+ 3/min/IP, 1000-char input, last-8 history — enforced here)
 */

const MAX_INPUT_CHARS = 1000;
const MAX_HISTORY = 8;
const TIMEOUT_MS = 20_000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function refusal(): DemoResponse {
  return {
    assistantMessage: DEMO_REFUSAL,
    capturedFields: {
      name: null, phone: null, email: null, service: null, location: null,
      urgency: null, budget: null, preferredTime: null, missingInfo: [],
    },
    leadSummary: "Off-topic request — politely declined.",
    nextActions: [],
    systemEvents: [],
    suggestedReplies: ["Can I book a job?", "How much for a quote?", "What can you do?"],
    cta: { show: false, label: "", href: "/create" },
  };
}

export async function POST(req: Request) {
  let body: { workerId?: string; industryId?: string; messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const worker = workerById((body.workerId as WorkerId) ?? "receptionist");
  const industry = industryById((body.industryId as IndustryId) ?? "landscaping");

  // Normalize + clamp history. Public-demo input length cap (anti-abuse).
  const messages: ChatMessage[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_CHARS) }))
    .slice(-MAX_HISTORY);

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages" }, { status: 400 });
  }

  const userTurns = messages.filter((m) => m.role === "user");
  const lastUser = userTurns[userTurns.length - 1]?.content ?? "";
  const prevUser = userTurns[userTurns.length - 2]?.content ?? "";

  // Off-topic / prompt-injection — refuse before spending a token.
  if (looksLikeInjection(lastUser)) {
    return NextResponse.json({ response: refusal(), fallback: true });
  }

  // Master kill switch.
  if (process.env.AI_DEMO_DISABLED === "true") {
    return NextResponse.json({ response: scriptedResponse(worker, industry, messages), fallback: true });
  }

  const ip = clientIp(req);

  // Visitor-facing free-demo limits (per-minute + per-IP-day). When hit, keep the
  // panel working with a scripted turn but flag `limited` so the UI shows the
  // "reached the free demo limit → start my build" CTA.
  const perMin = checkDemoPerMinute(ip);
  const perDay = checkDemoPerDay(ip);
  if (!perMin.ok || !perDay.ok) {
    return NextResponse.json({
      response: scriptedResponse(worker, industry, messages),
      limited: true,
      retryAfter: Math.max(perMin.retryAfter, perDay.retryAfter),
    });
  }

  // Block exact repeated prompts (don't pay for the same generation twice).
  if (lastUser && lastUser === prevUser) {
    return NextResponse.json({ response: scriptedResponse(worker, industry, messages), fallback: true });
  }

  const openai = await getOpenAI();
  // Global daily spend backstop — checked right before the paid call.
  if (!openai || !checkDemoGlobalDaily().ok) {
    return NextResponse.json({ response: scriptedResponse(worker, industry, messages), fallback: true });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const completion = await openai.chat.completions.create(
      {
        model: modelFor("fast"),
        messages: [
          { role: "system", content: showroomSystemPrompt(worker, industry) + DEMO_SAFETY },
          ...messages,
        ],
        temperature: 0.6,
        max_tokens: 600,
        response_format: { type: "json_schema", json_schema: DEMO_JSON_SCHEMA },
      },
      { signal: controller.signal },
    );
    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) throw new Error("empty completion");
    const parsed = demoResponseSchema.parse(JSON.parse(raw));
    return NextResponse.json({ response: parsed });
  } catch (err) {
    if ((err as Error)?.name !== "AbortError") {
      console.error("[AI-SHOP SHOWROOM] fallback:", (err as Error)?.message);
    }
    return NextResponse.json({ response: scriptedResponse(worker, industry, messages), fallback: true });
  } finally {
    clearTimeout(timer);
  }
}
