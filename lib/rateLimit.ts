// Lightweight in-memory rate limiting for the public tools endpoint. This is a
// FLOOR, not a fortress: on serverless it's per-instance and resets on cold
// start. Enough to stop a single script or shared login from hammering the
// OpenAI key. For hard guarantees at scale, pair with Vercel WAF + a KV store.

type Bucket = { count: number; resetAt: number };

const ipBuckets = new Map<string, Bucket>();
const userDayBuckets = new Map<string, Bucket>();

const IP_LIMIT = 10; // requests
const IP_WINDOW = 60_000; // per minute
const USER_DAILY_LIMIT = 50; // generations per subscriber per day
const DAY = 24 * 60 * 60 * 1000;

export interface RateResult {
  ok: boolean;
  /** Seconds until the window resets (only meaningful when !ok). */
  retryAfter: number;
}

function take(
  map: Map<string, Bucket>,
  key: string,
  limit: number,
  windowMs: number
): RateResult {
  const now = Date.now();
  // Opportunistic prune so the maps can't grow unbounded on a long-lived instance.
  if (map.size > 5000) {
    for (const [k, b] of map) if (now >= b.resetAt) map.delete(k);
  }
  const b = map.get(key);
  if (!b || now >= b.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((b.resetAt - now) / 1000)) };
  }
  b.count++;
  return { ok: true, retryAfter: 0 };
}

/** Per-IP throttle — stops a script from hammering the endpoint on your key. */
export function checkIpRate(ip: string): RateResult {
  return take(ipBuckets, ip, IP_LIMIT, IP_WINDOW);
}

/** Per-subscriber daily cap — blunts account-sharing and runaway use. */
export function checkUserDaily(userId: string): RateResult {
  return take(userDayBuckets, userId, USER_DAILY_LIMIT, DAY);
}

// Global daily generation ceiling — a hard backstop on TOTAL spend across all
// users/IPs. Per-user + per-IP caps don't stop distributed abuse or a runaway
// agent loop hitting your OpenAI key from many sources. gpt-4o-mini ≈ $0.0005
// per generation, so the default 5000/day caps worst-case exposure near ~$2.50/day.
// Tune via TOOLS_GLOBAL_DAILY_MAX. Per-instance on serverless (a floor, not a cap).
let globalDay = { count: 0, resetAt: 0 };
export function checkGlobalDaily(): RateResult {
  const max = Number(process.env.TOOLS_GLOBAL_DAILY_MAX || 5000);
  const now = Date.now();
  if (now >= globalDay.resetAt) globalDay = { count: 0, resetAt: now + DAY };
  if (globalDay.count >= max) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((globalDay.resetAt - now) / 1000)) };
  }
  globalDay.count++;
  return { ok: true, retryAfter: 0 };
}

export const DAILY_LIMIT = USER_DAILY_LIMIT;

/** Best-effort client IP from proxy headers. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
