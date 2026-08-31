import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { MAX_NOTIFY_ATTEMPTS, runNotifyRetry } from "@/lib/leadNotify";
import { checkOwner } from "@/lib/ownerAuth";

export const runtime = "nodejs";
// A cron target must never be served from the cache.
export const dynamic = "force-dynamic";

/**
 * Owner-notification retry worker.
 *
 * WHAT IT IS FOR
 * --------------
 * Persisting a lead and then failing to tell anyone is the same, to the founder,
 * as losing it. Before this route, one Resend hiccup at submit time meant the
 * enquiry sat in Neon forever with `emailed = false` and no mechanism on earth
 * would try again. This route drains that queue.
 *
 * IT READS NOTHING OUT. The response carries counts only — never a lead id's
 * contents, never an address. There is deliberately no lead-reading endpoint on
 * this site; use /admin/leads or `scripts/leads-report.mjs`.
 *
 * IDEMPOTENT. Every row is taken through `claimLeadForNotify()`, an atomic
 * conditional UPDATE, so running this twice at once — or while a visitor is
 * submitting — cannot send two emails for one lead.
 *
 * AUTHORISATION, in order:
 *   1. `Authorization: Bearer $CRON_SECRET` — how Vercel Cron calls it.
 *   2. A signed-in owner on the allowlist — so you can drain the queue by hand.
 * Anything else gets a 404: this path should be indistinguishable from a route
 * that does not exist.
 *
 * FAIL-CLOSED, LOUDLY. With no `CRON_SECRET` set, the cron cannot authenticate
 * and the worker never runs. That is the safe default, but a worker that quietly
 * does nothing is exactly the silent state this codebase forbids — so the
 * unauthenticated path logs the reason, and /admin/leads shows a banner when
 * `CRON_SECRET` is missing.
 */

const CRON_SECRET_ENV = "CRON_SECRET";

/** Constant-time bearer comparison. Absent secret = nobody authenticates. */
function hasCronSecret(req: Request): boolean {
  const secret = process.env[CRON_SECRET_ENV];
  if (!secret) return false;
  const header = req.headers.get("authorization") || "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!provided) return false;
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(secret, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function notFound(): NextResponse {
  return NextResponse.json(
    { error: "Not found" },
    { status: 404, headers: { "x-robots-tag": "noindex, nofollow" } }
  );
}

async function authorize(req: Request): Promise<{ ok: true; via: string } | { ok: false }> {
  if (hasCronSecret(req)) return { ok: true, via: "cron" };

  const owner = await checkOwner();
  if (owner.status === "owner") return { ok: true, via: "owner" };

  if (!process.env[CRON_SECRET_ENV]) {
    console.error(
      `[AI-SHOP LEAD] lead-notify-retry was called but ${CRON_SECRET_ENV} is not set, ` +
        `so the scheduled worker can never authenticate. Unnotified leads will not be retried. ` +
        `Set ${CRON_SECRET_ENV} in Vercel to switch the worker on.`
    );
  }
  return { ok: false };
}

async function run(req: Request): Promise<NextResponse> {
  const auth = await authorize(req);
  if (!auth.ok) return notFound();

  const limit = Math.min(
    Math.max(Number(new URL(req.url).searchParams.get("limit") ?? 25) || 25, 1),
    100
  );

  const report = await runNotifyRetry(limit);

  // A run that could not read its own queue is a failure, not a quiet success.
  if (report.error) {
    return NextResponse.json(
      { ok: false, via: auth.via, error: report.error, report },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    via: auth.via,
    maxAttempts: MAX_NOTIFY_ATTEMPTS,
    ...report,
  });
}

/** Vercel Cron issues a GET. */
export async function GET(req: Request) {
  return run(req);
}

/** POST is accepted so the owner can trigger a drain from a terminal. */
export async function POST(req: Request) {
  return run(req);
}
