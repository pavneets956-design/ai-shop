import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = "nodejs";

/**
 * Premium text-to-speech for the /start "AI call".
 *
 * Returns warm, human MP3 audio (OpenAI gpt-4o-mini-tts) for a single spoken
 * line. The client plays it through one reused, gesture-unlocked <audio>
 * element and falls back to free browser SpeechSynthesis whenever this returns
 * { fallback:true } — so voice always works, key or no key.
 *
 * Env:
 *   OPENAI_API_KEY   required for premium voice (else graceful fallback)
 *   OPENAI_TTS_MODEL optional, defaults to gpt-4o-mini-tts
 *   OPENAI_TTS_VOICE optional, defaults to "shimmer" (warm/soft)
 *
 * Guards (this endpoint returns BILLABLE audio):
 *   - same-origin only (Origin/Referer host must match request host)
 *   - per-line char cap
 *   - per-IP in-memory rate limit
 *   - per-instance daily char budget backstop (caps worst-case spend)
 *   - in-memory cache keyed by text hash (the fixed opener lines + repeated
 *     chips/phrasings serve from cache → 0 API cost, instant)
 *
 * NOTE: in-memory guards/cache are per-instance and reset on cold start. When
 * real traffic arrives, add Vercel WAF rate-limiting + a persistent KV/Blob
 * cache + a global spend ceiling. Fine as a floor while the feature is new.
 */

const MAX_CHARS = 320;
const RL_WINDOW_MS = 60_000;
const RL_MAX = 40; // requests / min / IP
const DAILY_CHAR_BUDGET = 200_000; // per-instance backstop
const CACHE_MAX = 256; // distinct lines cached per instance

type AudioEntry = { buf: Buffer; type: string };

const hits = new Map<string, number[]>();
const cache = new Map<string, AudioEntry>();
let dayKey = "";
let daySpent = 0;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < RL_WINDOW_MS)) hits.delete(k);
  }
  return arr.length > RL_MAX;
}

// Crude per-instance daily budget. Returns true if this request is over budget.
function overBudget(chars: number): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    daySpent = 0;
  }
  if (daySpent + chars > DAILY_CHAR_BUDGET) return true;
  daySpent += chars;
  return false;
}

function sameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  if (!host) return false;
  const src = req.headers.get("origin") || req.headers.get("referer");
  if (!src) return false; // no origin info -> reject (legit browser fetch sends it)
  try {
    return new URL(src).host === host;
  } catch {
    return false;
  }
}

function audioResponse(entry: AudioEntry): Response {
  return new Response(new Uint8Array(entry.buf), {
    status: 200,
    headers: {
      "Content-Type": entry.type,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const text =
    typeof body.text === "string" ? body.text.trim().slice(0, MAX_CHARS) : "";
  if (!text) return NextResponse.json({ error: "No text" }, { status: 400 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Slow down" }, { status: 429 });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ fallback: true });

  const voice = process.env.OPENAI_TTS_VOICE || "shimmer";
  const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
  const hash = createHash("sha1").update(`${model}:${voice}:${text}`).digest("hex");

  // Serve identical lines (openers, repeated phrasings) from cache — no API call.
  const cached = cache.get(hash);
  if (cached) return audioResponse(cached);

  if (overBudget(text.length)) return NextResponse.json({ fallback: true });

  try {
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: key });
    const speech = await openai.audio.speech.create({
      model,
      voice,
      input: text,
      instructions:
        "Speak warmly and calmly, like a friendly, competent human on a phone call — unhurried, natural, reassuring. Not corporate, not robotic.",
      response_format: "mp3",
    });
    const buf = Buffer.from(await speech.arrayBuffer());
    const entry: AudioEntry = { buf, type: "audio/mpeg" };

    if (cache.size >= CACHE_MAX) {
      const first = cache.keys().next().value;
      if (first) cache.delete(first);
    }
    cache.set(hash, entry);

    return audioResponse(entry);
  } catch (err) {
    console.error("[HANDBUILT TTS] error", err);
    return NextResponse.json({ fallback: true });
  }
}
