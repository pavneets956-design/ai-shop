import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { checkLeadPerDay, checkLeadPerMinute, clientIp } from "@/lib/rateLimit";
// The send, the templates and the delivery-state machine live in one module so
// the retry worker can produce a byte-identical email. See lib/leadNotify.ts.
import {
  NOTIFY,
  claimLeadForNotify,
  errorShape,
  kindOf,
  recordNotifyResult,
  sendOwnerNotification,
  str,
} from "@/lib/leadNotify";

export const runtime = "nodejs";

/**
 * Lead capture for the Build Request form, the "email me this plan" action, and
 * the /start AI consultation.
 *
 * TRUTHFULNESS CONTRACT: this endpoint returns `{ ok: true }` ONLY when the lead
 * has been durably accepted — persisted to the database OR delivered by email.
 * A lead is written to the DB *before* the notification email is attempted, so a
 * missing/expired/rate-limited RESEND_API_KEY (or any Resend outage) can never
 * silently lose a lead. If BOTH durable channels fail, we return a non-2xx so the
 * form shows its retry/fallback message instead of a false "Request received".
 *
 * NO EMAIL IS EVER SENT TO THE LEAD. The only message this endpoint sends goes to
 * the owner, with the visitor as `replyTo`. Any UI that says otherwise is lying —
 * see `delivery.emailed`, which reports the OWNER notification, never a
 * visitor-facing confirmation. A visitor confirmation is blocked on Resend domain
 * verification (the site domain has no MX record today).
 *
 * Guards (2026-08-30): per-IP rate limit, 32 KB body cap, honeypot, cross-origin
 * rejection, and a request-level test mode. Logs carry an id + coarse metadata —
 * never the lead body, which used to be JSON.stringify'd into Vercel logs on
 * every submission.
 *
 * Env:
 *   RESEND_API_KEY          enable the self-notification email
 *   LEAD_NOTIFY_EMAIL       where to send notifications (default: pavneets956@gmail.com)
 *   LEAD_FROM_EMAIL         verified from address (default: Handbuilt <onboarding@resend.dev>)
 *   LEAD_TEST_SECRET        value of the `x-lead-test` header that marks a test submission
 *   LEAD_TEST_NOTIFY_EMAIL  optional inbox for test submissions (default: send nothing)
 *   LEAD_MAX_PER_IP_MIN     per-IP submissions per minute (default 5)
 *   LEAD_MAX_PER_IP_DAY     per-IP submissions per day (default 20)
 */

/** Hard body cap. A real lead is ~1–3 KB; the /start transcript is under 1 KB. */
const MAX_BODY_BYTES = 32 * 1024;
/** Longest value we keep for any single field. Longer values are truncated, never dropped silently. */
const MAX_FIELD_CHARS = 4000;
/** Most keys we keep off one submission — stops a payload-stuffing bot. */
const MAX_FIELDS = 80;
/**
 * Honeypot. Rendered visually hidden (`display:none`) with `autocomplete="off"`
 * and `tabindex="-1"` so neither a human nor a password manager can fill it.
 * A non-empty value means a bot: we return a normal-looking success and store
 * nothing. It is logged loudly so a false positive can never be silent.
 */
// Must match HONEYPOT in components/BuildRequestForm.tsx. Renamed off
// "company_website" because browser autofill targets that name, and a
// tripped honeypot discards the lead.
const HONEYPOT_FIELD = "hb_form_token";
/**
 * RFC 2606 reserved TLD — can never resolve, so a value in this domain is
 * self-documenting as "not a real address". Used only when a visitor gives a
 * phone and no email: the `BuildRequest.email` column is NOT NULL and changing
 * the schema is out of scope, so the column carries a deterministic sentinel
 * while the real phone lives in `phone` + `payload`. Nothing is ever addressed
 * to it — `replyTo` is omitted entirely on a phone-only lead.
 */
const NO_EMAIL_DOMAIN = "lead.invalid";

// At least one of email / phone. Everything else is optional and passed through,
// because the callers (build-request / plan / consultation) post different shapes.
const LeadSchema = z
  .object({
    email: z.string().trim().email().optional(),
    phone: z.string().trim().min(5).max(40).optional(),
  })
  .passthrough()
  .refine((v) => Boolean(v.email) || Boolean(v.phone), {
    message: "email or phone required",
  });

const DEDUPE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(req: Request) {
  // 0a) Cross-origin rejection. A same-origin `fetch` POST always carries
  //     `Origin` (the Fetch spec sets it for every non-GET/HEAD request), so a
  //     MISMATCH is a cross-site post and is refused. A MISSING origin is
  //     allowed: privacy tooling and server-side test scripts strip it, and
  //     dropping a real lead is worse than accepting an unattributed one. The
  //     rate limit + honeypot carry the anti-script load.
  if (originMismatch(req)) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 403 });
  }

  // 0b) Per-IP rate limit. Applied BEFORE parsing so a malformed flood is cheap.
  const ip = clientIp(req);
  const minute = checkLeadPerMinute(ip);
  const day = minute.ok ? checkLeadPerDay(ip) : minute;
  if (!minute.ok || !day.ok) {
    const retryAfter = minute.ok ? day.retryAfter : minute.retryAfter;
    console.warn("[AI-SHOP LEAD] rate limited", { ipHash: hashIp(ip), retryAfter });
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests from this connection. Try again shortly, or email us directly.",
        retryAfter,
      },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  // 0c) Body size cap — header first (cheap), then the real byte length.
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_BODY_BYTES) return tooLarge();
  let bodyText: string;
  try {
    bodyText = await req.text();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (Buffer.byteLength(bodyText, "utf8") > MAX_BODY_BYTES) return tooLarge();

  let raw: unknown;
  try {
    raw = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 0d) Honeypot. Only a bot can reach this field. Answer like a success so the
  //     bot has nothing to tune against, persist nothing, send nothing — and log
  //     it, because a false positive here silently eats a real lead.
  if (isRecord(raw) && str(raw[HONEYPOT_FIELD])) {
    console.warn("[AI-SHOP LEAD] honeypot tripped — nothing stored, nothing sent", {
      ipHash: hashIp(ip),
      fields: Object.keys(raw).length,
    });
    return NextResponse.json({ ok: true, delivery: { persisted: false, emailed: false } });
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    // Don't echo zod internals — a single clear message is enough for the form.
    return NextResponse.json(
      { error: "Enter an email or a phone number so we can reply" },
      { status: 400 }
    );
  }

  // Trim the payload to a sane shape before anything touches storage or email.
  const payload = sanitizePayload(parsed.data as Record<string, unknown>);
  const realEmail = str(payload.email);
  const phone = str(payload.phone);
  // `email` is the DB column value; `realEmail` is what a human can actually be
  // reached at. They differ only on a phone-only lead.
  const email = realEmail ?? sentinelEmail(phone as string);

  // 0e) Test mode: `x-lead-test: <LEAD_TEST_SECRET>`, constant-time compared. A
  //     wrong or absent secret is treated as an ordinary lead — never an error,
  //     never a hint that the mechanism exists.
  const isTest = isTestRequest(req);

  const lead: Record<string, unknown> = {
    receivedAt: new Date().toISOString(),
    ...payload,
  };

  // Structured log — always on, visible in Vercel → Logs. NOT a durable store.
  // Coarse metadata ONLY: this used to log the entire lead (email, phone, the
  // full /start transcript) on every request, which put PII in the log drain.
  console.log("[AI-SHOP LEAD] received", {
    source: str(lead.source) ?? str(lead.type) ?? "unknown",
    kind: kindOf(lead),
    test: isTest,
    contact: realEmail ? "email" : "phone",
    hasPhone: Boolean(phone),
    goalChars: (str(lead.goal) ?? str(lead.want) ?? "").length,
    fields: Object.keys(payload).length,
    ipHash: hashIp(ip),
  });

  // NODE_ENV === "production" on Vercel covers BOTH preview and production
  // deploys. Only true local dev (`next dev`) is non-strict.
  const strict = process.env.NODE_ENV === "production";

  // 1) Durable persistence FIRST. Idempotent on rapid duplicate submits.
  const persist = await persistLead(lead, email, isTest);
  if (persist.deduped) {
    // A matching lead already landed moments ago — accept idempotently, don't
    // insert or notify twice. Same stable response shape as a fresh success:
    // persisted:true (the lead IS durably stored), emailed:false (no NEW email
    // was sent for this duplicate request) — never claims an insert/email that
    // did not happen.
    return NextResponse.json({
      ok: true,
      id: persist.id,
      deduped: true,
      contact: realEmail ? "email" : "phone",
      ...(isTest ? { test: true } : {}),
      delivery: { persisted: true, emailed: false },
    });
  }

  // 2) Owner notification. Never throws; reports true acceptance.
  //
  //    When the lead was persisted we CLAIM the row first. The claim is an
  //    atomic conditional UPDATE (pending|failed → sending), so this request and
  //    the retry cron can never both mail the owner about the same submission.
  //    Losing the claim means another worker already owns it — that is a success
  //    for the visitor (the lead is safe and someone is sending), so we do not
  //    send again and we do not report a new email.
  let notify: Awaited<ReturnType<typeof sendOwnerNotification>>;
  if (persist.ok && persist.id) {
    const owned = await claimLeadForNotify(persist.id);
    if (owned) {
      notify = await sendOwnerNotification(lead, realEmail, isTest);
      // Awaited, not fire-and-forget: the row must not be left in `sending`
      // after we answer, and `delivery.emailed` below must match what the
      // database says. The old code wrote `emailed` without awaiting, so a
      // cold-start teardown could drop the write and strand a delivered lead.
      await recordNotifyResult(persist.id, notify);
    } else {
      notify = {
        ok: false,
        reason: "provider_error",
        detail: "another worker already owns this notification",
      };
      console.log("[AI-SHOP LEAD] notification already claimed elsewhere", { id: persist.id });
    }
  } else {
    // No durable row to attach state to (DB unreachable). Still try the email —
    // it is the only remaining channel that can save this lead.
    notify = await sendOwnerNotification(lead, realEmail, isTest);
  }

  if (strict && !notify.ok && notify.reason === "no_key") {
    // A backend-only failure a human must still see. The lead is safe in the
    // database; nobody has been told about it. `notifyStatus` is now `failed`,
    // so /admin/leads, the CLI report and the retry worker all surface it.
    console.error(
      "[AI-SHOP LEAD] RESEND_API_KEY missing in this environment — lead persisted to DB but NO notification email was sent.",
      { id: persist.id ?? null, notifyStatus: NOTIFY.FAILED }
    );
  }

  const accepted = persist.ok || notify.ok;
  if (accepted) {
    console.log("[AI-SHOP LEAD] accepted", {
      id: persist.id ?? null,
      persisted: persist.ok,
      emailed: notify.ok,
      test: isTest,
    });
    return NextResponse.json({
      ok: true,
      id: persist.id,
      contact: realEmail ? "email" : "phone",
      ...(isTest ? { test: true } : {}),
      delivery: { persisted: persist.ok, emailed: notify.ok },
    });
  }

  // 3) Neither durable channel accepted the lead.
  if (!strict) {
    // LOCAL DEV ONLY: don't block the founder testing the form when there's no
    // DB and no RESEND_API_KEY — but NEVER claim a real delivery happened.
    console.warn(
      "[AI-SHOP LEAD] dev mock — lead was NOT persisted and NOT emailed (no DB + no RESEND_API_KEY). Returning dev-mock acknowledgement."
    );
    return NextResponse.json({
      ok: true,
      devMock: true,
      delivery: { persisted: false, emailed: false },
      note: "Development mock: not persisted, not delivered.",
    });
  }

  // PRODUCTION / PREVIEW: be truthful — reject so the UI shows retry/fallback.
  console.error("[AI-SHOP LEAD] CRITICAL: lead not accepted — DB and email both failed.", {
    persistOk: persist.ok,
    notifyReason: notify.reason,
  });
  return NextResponse.json(
    {
      ok: false,
      error:
        "We couldn't save your request just now. Please email us and we'll jump right on it.",
    },
    { status: 502 }
  );
}

// ---------------------------------------------------------------------------
// Durable persistence
// ---------------------------------------------------------------------------

type PersistResult = { ok: boolean; id?: string; deduped?: boolean };

/**
 * Write the lead to the BuildRequest table. Idempotent within a ~10-minute
 * window and CONCURRENCY-SAFE:
 *
 *  - Duplicate identity is a content `fingerprint` (email + goal/want + tasks +
 *    name + source/type), NOT just email — so two genuinely different leads from
 *    the same address (even both with no goal) are never merged.
 *  - A sliding-window `findFirst(fingerprint, last 10 min)` fast-path avoids a
 *    doomed insert on the common rapid-resubmit case.
 *  - `dedupeKey` = fingerprint + 10-minute bucket has a UNIQUE index, so two
 *    simultaneous identical requests can never both insert: one wins, the other
 *    gets a P2002 unique violation and is resolved to the winner's row. At most
 *    one row and (because we return `deduped` before emailing) one email.
 *
 * Never throws — a DB failure returns { ok: false } so email can still accept
 * the lead. A distinct lead is never dropped (distinct content → distinct key).
 */
async function persistLead(
  lead: Record<string, unknown>,
  email: string,
  isTest = false
): Promise<PersistResult> {
  // Normalize the primary intent across the three payload shapes.
  const goal = str(lead.goal) ?? str(lead.want) ?? null;
  const fingerprint = contentFingerprint(lead, email);
  const dedupeKey = `${fingerprint}:${Math.floor(Date.now() / DEDUPE_WINDOW_MS)}`;
  try {
    // Fast-path: an identical submission already landed in the last 10 minutes.
    const recent = await prisma.buildRequest.findFirst({
      where: {
        fingerprint,
        createdAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
      },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });
    if (recent) return { ok: true, id: recent.id, deduped: true };

    const source = str(lead.source) ?? str(lead.type);
    const row = await prisma.buildRequest.create({
      data: {
        name: str(lead.name),
        email,
        phone: str(lead.phone),
        // A test submission is marked in BOTH columns so it can never be mistaken
        // for a real lead and is trivially purgeable: WHERE status = 'test'.
        source: isTest ? `test:${source ?? "unknown"}` : source,
        kind: kindOf(lead),
        goal,
        fingerprint,
        dedupeKey,
        payload: lead as unknown as Prisma.InputJsonValue,
        ...(isTest ? { status: "test" } : {}),
      },
      select: { id: true },
    });
    return { ok: true, id: row.id };
  } catch (err) {
    // A concurrent identical request won the unique-key race: resolve to its row
    // rather than inserting a duplicate. This is the atomic dedupe guarantee.
    if (isUniqueViolation(err)) {
      try {
        const winner = await prisma.buildRequest.findFirst({
          where: { dedupeKey },
          orderBy: { createdAt: "desc" },
          select: { id: true },
        });
        if (winner) return { ok: true, id: winner.id, deduped: true };
      } catch {
        /* fall through to the failure path below */
      }
    }
    // Coarse error identity only — a raw Prisma error can echo submitted values
    // back into the log drain, which is the PII leak this pass is closing.
    console.error("[AI-SHOP LEAD] DB persist failed", errorShape(err));
    return { ok: false };
  }
}

/**
 * Deterministic content fingerprint for duplicate detection. Built from the
 * meaningful submitted fields (normalized: trimmed, whitespace-collapsed,
 * lower-cased) so identical resubmits collide but distinct leads do not. Does
 * NOT include time — the 10-minute window is layered on top via dedupeKey.
 */
function contentFingerprint(lead: Record<string, unknown>, email: string): string {
  const norm = (v: unknown) =>
    (typeof v === "string" ? v : v == null ? "" : JSON.stringify(v))
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  const canonical = [
    email.toLowerCase(),
    norm(lead.goal) || norm(lead.want),
    norm(lead.tasks),
    norm(lead.name),
    norm(lead.source) || norm(lead.type),
  ].join("|");
  return createHash("sha256").update(canonical).digest("hex");
}

/** True when a Prisma error is a unique-constraint violation (P2002). */
function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    (err as { code?: unknown }).code === "P2002"
  );
}

// ---------------------------------------------------------------------------
// Request guards + payload hygiene
// ---------------------------------------------------------------------------

function tooLarge() {
  return NextResponse.json(
    {
      ok: false,
      error: "That request is too long to send. Trim it down, or email us the detail directly.",
    },
    { status: 413 }
  );
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * True only when the request declares an origin that is NOT this host. A missing
 * origin is deliberately allowed — see the note at the top of POST.
 */
function originMismatch(req: Request): boolean {
  const host = req.headers.get("host");
  const src = req.headers.get("origin") || req.headers.get("referer");
  if (!host || !src) return false;
  try {
    return new URL(src).host !== host;
  } catch {
    return true; // an unparseable origin header is not a browser we trust
  }
}

/** Non-reversible, salted IP tag for abuse correlation. Never log the raw IP. */
function hashIp(ip: string): string {
  return createHash("sha256")
    .update(`${process.env.LEAD_IP_SALT ?? "handbuilt-lead"}:${ip}`)
    .digest("hex")
    .slice(0, 12);
}

/**
 * `x-lead-test: <LEAD_TEST_SECRET>`, constant-time compared. A wrong or absent
 * secret returns false — the submission is then handled as an ordinary lead, so
 * probing the header can never reveal that the mechanism exists.
 */
function isTestRequest(req: Request): boolean {
  const provided = req.headers.get("x-lead-test");
  const secret = process.env.LEAD_TEST_SECRET;
  if (!provided || !secret) return false;
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(secret, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Bound the shape of an arbitrary passthrough payload: cap the key count, drop
 * the honeypot, and truncate any oversized string with a visible marker so the
 * owner can see that something was cut rather than wonder why a sentence stops.
 */
function sanitizePayload(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  let kept = 0;
  for (const [k, v] of Object.entries(input)) {
    if (k === HONEYPOT_FIELD) continue;
    if (kept >= MAX_FIELDS) break;
    kept++;
    if (typeof v === "string") {
      out[k] = v.length > MAX_FIELD_CHARS ? `${v.slice(0, MAX_FIELD_CHARS)}… [truncated]` : v;
    } else if (isRecord(v)) {
      // One level of nesting only (the trade `intake` object).
      const nested: Record<string, unknown> = {};
      let n = 0;
      for (const [nk, nv] of Object.entries(v)) {
        if (n >= MAX_FIELDS) break;
        n++;
        nested[nk] =
          typeof nv === "string" && nv.length > MAX_FIELD_CHARS
            ? `${nv.slice(0, MAX_FIELD_CHARS)}… [truncated]`
            : nv;
      }
      out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Deterministic non-deliverable stand-in for the NOT NULL `email` column on a
 * phone-only lead. Deterministic so the dedupe fingerprint still collides on a
 * repeat submission from the same number.
 */
function sentinelEmail(phone: string): string {
  const digits = String(phone).replace(/[^\d]/g, "");
  const h = createHash("sha256").update(digits || String(phone)).digest("hex").slice(0, 12);
  return `no-email+${h}@${NO_EMAIL_DOMAIN}`;
}

