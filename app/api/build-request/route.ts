import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { checkLeadPerDay, checkLeadPerMinute, clientIp } from "@/lib/rateLimit";

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
const HONEYPOT_FIELD = "company_website";
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

  // 2) Best-effort notification email. Never throws; reports true acceptance.
  const notify = await sendNotification(lead, realEmail, isTest);
  if (strict && !notify.ok && notify.reason === "no_key") {
    console.error(
      "[AI-SHOP LEAD] RESEND_API_KEY missing in production — lead persisted to DB but NO notification email was sent."
    );
  }

  // Best-effort: record delivery status on the persisted row (non-blocking).
  if (persist.ok && persist.id && notify.ok) {
    prisma.buildRequest
      .update({ where: { id: persist.id }, data: { emailed: true } })
      .catch(() => {
        /* delivery flag is cosmetic — the lead is already safe */
      });
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
// Notification email (Resend) — best-effort, result-checked, non-throwing
// ---------------------------------------------------------------------------

type NotifyResult = {
  ok: boolean;
  id?: string;
  /** Coarse, non-sensitive reason for the caller/logs. */
  reason?: "no_key" | "provider_error" | "exception" | "test_skipped";
};

/**
 * The OWNER notification. Nothing here is addressed to the lead — `replyTo` is
 * the only place their address appears, and on a phone-only lead it is omitted
 * entirely rather than pointed at the `lead.invalid` sentinel.
 */
async function sendNotification(
  lead: Record<string, unknown>,
  replyToEmail: string | undefined,
  isTest = false
): Promise<NotifyResult> {
  // Test submissions never touch the real inbox. Set LEAD_TEST_NOTIFY_EMAIL to
  // route them to a throwaway address instead of dropping them.
  const testInbox = isTest ? process.env.LEAD_TEST_NOTIFY_EMAIL : undefined;
  if (isTest && !testInbox) return { ok: false, reason: "test_skipped" };

  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "no_key" };

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const to = testInbox || process.env.LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com";
    // Resend's shared `onboarding@resend.dev` needs no domain verification and
    // reliably delivers to your own Resend-account email — ideal for a
    // self-notification. Override LEAD_FROM_EMAIL once a domain is verified.
    const from = process.env.LEAD_FROM_EMAIL || "Handbuilt Leads <onboarding@resend.dev>";
    const isConsultation =
      lead.source === "ai-builder" || lead.source === "consultation";
    const kind = kindOf(lead);
    const who = str(lead.name) || replyToEmail || str(lead.phone) || "no contact given";
    const prefix = isTest ? "[TEST] " : "";
    const suffix = replyToEmail ? "" : " (phone only — no email given)";

    const { data, error } = await resend.emails.send({
      from,
      to,
      // Never reply-to the phone-only sentinel: it is an RFC 2606 `.invalid`
      // address and a reply would bounce. The phone is in the body.
      ...(replyToEmail ? { replyTo: replyToEmail } : {}),
      subject: `${prefix}New Handbuilt ${kind}: ${who}${suffix}`,
      text: isConsultation ? formatConsultation(lead) : formatLead(lead),
      html: isConsultation ? htmlConsultation(lead) : htmlLead(lead),
    });

    // Resend v4 does NOT throw on a non-2xx API response (invalid/expired key,
    // rate limit, etc.) — it returns { error }. Inspect it, never assume success.
    if (error) {
      console.error("[AI-SHOP LEAD] Resend returned an error", errorShape(error));
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    // Network / SDK exception. Detail stays server-side.
    console.error("[AI-SHOP LEAD] Resend threw", errorShape(err));
    return { ok: false, reason: "exception" };
  }
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

/** Coarse, non-sensitive error identity for logs. Never the raw error object. */
function errorShape(err: unknown): { name: string; code?: string; message: string } {
  if (typeof err !== "object" || err === null) {
    return { name: "unknown", message: String(err).slice(0, 200) };
  }
  const e = err as { name?: unknown; code?: unknown; message?: unknown };
  return {
    name: typeof e.name === "string" ? e.name : "Error",
    ...(typeof e.code === "string" ? { code: e.code } : {}),
    message: typeof e.message === "string" ? e.message.slice(0, 200) : "",
  };
}

/** Coerce a value to a trimmed non-empty string, or undefined. */
function str(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

/** Human label for the submission type, shared by the email + DB row. */
function kindOf(lead: Record<string, unknown>): string {
  if (lead.source === "ai-builder" || lead.source === "consultation") {
    return "AI consultation";
  }
  return lead.type === "plan" ? "Plan request" : "Build request";
}

/** Any payload keys not already shown — so a lead email never silently drops data. */
function extraLines(lead: Record<string, unknown>, shown: string[]): string[] {
  const skip = new Set([...shown, "type", "source", "receivedAt"]);
  const rows = Object.entries(lead)
    .filter(([k, v]) => !skip.has(k) && v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`);
  return rows.length ? ["", "— Other details —", ...rows] : [];
}

function formatConsultation(lead: Record<string, unknown>): string {
  const g = (k: string) => {
    const v = lead[k];
    if (v === undefined || v === null || v === "") return "—";
    return typeof v === "object" ? JSON.stringify(v) : String(v);
  };
  const shown = ["name", "email", "kind", "want", "city", "recommendedBuild", "transcript"];
  return [
    "NEW AI CONSULTATION — Handbuilt (/start)",
    "",
    "— Lead —",
    `Business:  ${g("name")}`,
    `Email:     ${g("email")}`,
    `Type:      ${g("kind")}`,
    `AI should: ${g("want")}`,
    `City:      ${g("city")}`,
    `Suggested: ${g("recommendedBuild")}`,
    "",
    "— Transcript —",
    g("transcript"),
    ...extraLines(lead, shown),
    "",
    `Received:  ${g("receivedAt")}`,
  ].join("\n");
}

function formatLead(lead: Record<string, unknown>): string {
  const g = (k: string) => {
    const v = lead[k];
    if (v === undefined || v === null || v === "") return "—";
    return typeof v === "object" ? JSON.stringify(v) : String(v);
  };
  const shown = [
    "name", "email", "phone", "website", "goal", "tasks",
    "useType", "industry", "existing", "tools", "budget", "timeline", "intake",
  ];
  const jobLines =
    lead.intake && typeof lead.intake === "object"
      ? ["", "— Job details —", ...Object.entries(lead.intake as Record<string, unknown>)
          .filter(([, v]) => v !== undefined && v !== null && v !== "")
          .map(([k, v]) => `${k}: ${String(v)}`)]
      : [];
  return [
    "NEW BUILD REQUEST — Handbuilt",
    "",
    "— Contact —",
    `Name:      ${g("name")}`,
    `Email:     ${has(lead, "email") ? g("email") : "— none given (phone only)"}`,
    `Phone:     ${g("phone")}`,
    `Website:   ${g("website")}`,
    "",
    "— Project —",
    `Goal:      ${g("goal")}`,
    `AI should: ${g("tasks")}`,
    `Use for:   ${g("useType")}`,
    `Industry:  ${g("industry")}`,
    `Has now:   ${g("existing")}`,
    `Tools:     ${g("tools")}`,
    `Budget:    ${g("budget")}`,
    `Timeline:  ${g("timeline")}`,
    ...jobLines,
    ...extraLines(lead, shown),
    "",
    `Received:  ${g("receivedAt")}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Branded HTML email (cream/white, warm border, table-based for email clients).
// Only renders a row when the underlying field actually exists in the payload —
// no invented data. The plaintext versions above remain the fallback.
// ---------------------------------------------------------------------------

const BRAND = {
  page: "#FAF7F2", // warm cream page background
  card: "#FFFFFF", // white card
  ink: "#191716", // near-black text
  border: "#E8DED3", // thin warm border
  muted: "#6F675E", // muted label / meta
  accent: "#C2651B", // warm amber accent (matches site brand)
} as const;

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Escape a value for safe inline HTML. */
function esc(v: unknown): string {
  const s = typeof v === "object" && v !== null ? JSON.stringify(v) : String(v);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** True only when a lead field is present and non-empty. */
function has(lead: Record<string, unknown>, k: string): boolean {
  const v = lead[k];
  return v !== undefined && v !== null && v !== "";
}

/** A label/value table row — caller guards with has() so this never invents data. */
function row(label: string, value: unknown): string {
  return `<tr>
  <td style="padding:7px 0;vertical-align:top;width:120px;color:${BRAND.muted};font-size:13px;font-weight:600;letter-spacing:.01em;">${esc(
    label
  )}</td>
  <td style="padding:7px 0;vertical-align:top;color:${BRAND.ink};font-size:14px;line-height:1.5;">${esc(
    value
  )}</td>
</tr>`;
}

/** A titled section card; returns "" when it has no rows so empty sections vanish. */
function section(title: string, rows: string[]): string {
  const inner = rows.filter(Boolean).join("\n");
  if (!inner) return "";
  return `<tr><td style="padding:0 28px;">
  <div style="margin:22px 0 4px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.accent};">${esc(
    title
  )}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${inner}
  </table>
</td></tr>`;
}

/** Wrap section markup in the branded outer shell. */
function shell(opts: {
  kicker: string;
  heading: string;
  sections: string;
  receivedAt: unknown;
}): string {
  const meta = opts.receivedAt
    ? `<tr><td style="padding:18px 28px 28px;color:${BRAND.muted};font-size:12px;line-height:1.5;border-top:1px solid ${BRAND.border};">Received ${esc(
        opts.receivedAt
      )}</td></tr>`
    : "";
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.page};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.page};">
  <tr><td align="center" style="padding:28px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${BRAND.card};border:1px solid ${BRAND.border};border-radius:14px;overflow:hidden;font-family:${FONT};">
      <tr><td style="padding:26px 28px 18px;border-bottom:1px solid ${BRAND.border};">
        <div style="font-size:18px;font-weight:800;letter-spacing:-.01em;color:${BRAND.ink};">Handbuilt</div>
        <div style="margin-top:10px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.accent};">${esc(
          opts.kicker
        )}</div>
        <div style="margin-top:4px;font-size:20px;font-weight:700;line-height:1.25;color:${BRAND.ink};">${esc(
          opts.heading
        )}</div>
      </td></tr>
${opts.sections}
${meta}
    </table>
  </td></tr>
</table>
</body></html>`;
}

function htmlConsultation(lead: Record<string, unknown>): string {
  const heading =
    (typeof lead.name === "string" && lead.name.trim()) ||
    (typeof lead.email === "string" && lead.email.trim()) ||
    "New AI consultation";

  const contact = section("Contact", [
    has(lead, "email") ? row("Email", lead.email) : "",
    has(lead, "city") ? row("City", lead.city) : "",
  ]);

  const business = section("Business", [
    has(lead, "name") ? row("Business", lead.name) : "",
    has(lead, "kind") ? row("Type", lead.kind) : "",
  ]);

  const project = section("Project", [
    has(lead, "want") ? row("AI should", lead.want) : "",
  ]);

  const recommended = section("Recommended build", [
    has(lead, "recommendedBuild") ? row("Suggested", lead.recommendedBuild) : "",
  ]);

  const transcript = has(lead, "transcript")
    ? `<tr><td style="padding:0 28px;">
  <div style="margin:22px 0 6px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.accent};">Transcript</div>
  <div style="white-space:pre-wrap;background:${BRAND.page};border:1px solid ${BRAND.border};border-radius:10px;padding:14px 16px;color:${BRAND.ink};font-size:13px;line-height:1.6;">${esc(
        lead.transcript
      )}</div>
</td></tr>`
    : "";

  const shownExtra = [
    "name",
    "email",
    "kind",
    "want",
    "city",
    "recommendedBuild",
    "transcript",
  ];
  const admin = section("Admin", [
    has(lead, "source") ? row("Source", lead.source) : "",
    ...adminExtraRows(lead, shownExtra),
  ]);

  return shell({
    kicker: "New AI consultation",
    heading,
    sections: [contact, business, project, recommended, transcript, admin].join(
      "\n"
    ),
    receivedAt: lead.receivedAt,
  });
}

function htmlLead(lead: Record<string, unknown>): string {
  const heading =
    (typeof lead.name === "string" && lead.name.trim()) ||
    (typeof lead.email === "string" && lead.email.trim()) ||
    "New build request";

  const contact = section("Contact", [
    has(lead, "name") ? row("Name", lead.name) : "",
    has(lead, "email")
      ? row("Email", lead.email)
      : row("Email", "none given — reply by phone"),
    has(lead, "phone") ? row("Phone", lead.phone) : "",
    has(lead, "website") ? row("Website", lead.website) : "",
  ]);

  const business = section("Business", [
    has(lead, "useType") ? row("Use for", lead.useType) : "",
    has(lead, "industry") ? row("Industry", lead.industry) : "",
  ]);

  const project = section("Project", [
    has(lead, "goal") ? row("Goal", lead.goal) : "",
    has(lead, "tasks") ? row("AI should", lead.tasks) : "",
    has(lead, "existing") ? row("Has now", lead.existing) : "",
    has(lead, "tools") ? row("Tools", lead.tools) : "",
    has(lead, "budget") ? row("Budget", lead.budget) : "",
    has(lead, "timeline") ? row("Timeline", lead.timeline) : "",
  ]);

  // Occupation-specific intake (Phase D): an object of { "City": "Delta", ... }.
  const jobDetails =
    lead.intake && typeof lead.intake === "object"
      ? section(
          "Job details",
          Object.entries(lead.intake as Record<string, unknown>)
            .filter(([, v]) => v !== undefined && v !== null && v !== "")
            .map(([k, v]) => row(k, v)),
        )
      : "";

  const shownExtra = [
    "name",
    "email",
    "phone",
    "website",
    "goal",
    "tasks",
    "useType",
    "industry",
    "existing",
    "tools",
    "budget",
    "timeline",
    "intake",
  ];
  const admin = section("Admin", [
    has(lead, "source") ? row("Source", lead.source) : "",
    has(lead, "type") ? row("Type", lead.type) : "",
    ...adminExtraRows(lead, shownExtra),
  ]);

  return shell({
    kicker: "New build request",
    heading,
    sections: [contact, business, project, jobDetails, admin].join("\n"),
    receivedAt: lead.receivedAt,
  });
}

/** Any payload keys not already rendered — mirrors extraLines() so nothing drops. */
function adminExtraRows(
  lead: Record<string, unknown>,
  shown: string[]
): string[] {
  const skip = new Set([...shown, "type", "source", "receivedAt"]);
  return Object.entries(lead)
    .filter(([k, v]) => !skip.has(k) && v !== undefined && v !== null && v !== "")
    .map(([k, v]) => row(k, v));
}
