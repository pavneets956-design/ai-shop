/**
 * Owner-notification delivery for website leads.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * The send and the email templates used to live inside
 * `app/api/build-request/route.ts`. A Next.js route module may only export HTTP
 * handlers, so nothing else could reuse them — which meant a notification that
 * failed at submit time could never be retried by anything. Extracting them here
 * gives the POST handler and the retry worker ONE implementation, so a retried
 * email is identical to the one that should have gone out at submit.
 *
 * THE CONTRACT (unchanged from the route, restated because it is load-bearing):
 *   NO EMAIL IS EVER SENT TO THE LEAD. The only message here goes to the OWNER,
 *   with the visitor as `replyTo`. A visitor-facing confirmation stays blocked
 *   until the sending domain is verified — aibuiltbyhand.com has no MX record,
 *   so "we emailed you" would be a lie and a reply would bounce.
 *
 * IDEMPOTENCY. `claimLeadForNotify()` is an atomic conditional UPDATE: it moves
 * a row from pending/failed to `sending`, and only the caller that observes
 * count === 1 owns the send. Two concurrent workers — or a cron overlapping a
 * fresh submission — therefore cannot both mail the owner about one lead.
 *
 * LOGGING. Failures log a coarse error identity (`errorShape`) and the lead id.
 * Never the name, email, phone, or anything the visitor typed: this endpoint
 * used to `JSON.stringify` the whole lead into the Vercel log drain.
 */
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Notification delivery state (mirrors BuildRequest.notifyStatus)
// ---------------------------------------------------------------------------

export const NOTIFY = {
  /** Written, never attempted, or waiting for another retry. */
  PENDING: "pending",
  /** Claimed by a worker right now. The idempotency lock. */
  SENDING: "sending",
  /** Resend accepted it. `notifyMessageId` is the receipt. */
  DELIVERED: "delivered",
  /** Attempted and refused. `notifyLastError` says how. */
  FAILED: "failed",
  /** Deliberately not sent (a test submission with no test inbox configured). */
  SKIPPED: "skipped",
} as const;

export type NotifyStatus = (typeof NOTIFY)[keyof typeof NOTIFY];

/** Statuses a retry worker is allowed to pick up. */
export const RETRYABLE: NotifyStatus[] = [NOTIFY.PENDING, NOTIFY.FAILED];

/**
 * Give up after this many attempts. A permanently bad address or a revoked API
 * key must not generate an unbounded stream of retries; after the cap the row
 * stays `failed` and is surfaced in /admin/leads and the CLI report, which are
 * the human-checked surfaces. Giving up silently is never the outcome.
 */
export const MAX_NOTIFY_ATTEMPTS = 5;

/** A claim older than this belonged to a function that died mid-send. */
export const CLAIM_STALE_MS = 5 * 60 * 1000;

// ---------------------------------------------------------------------------
// Shared formatting helpers (moved verbatim from the route)
// ---------------------------------------------------------------------------

/** Coarse, non-sensitive error identity for logs. Never the raw error object. */
export function errorShape(err: unknown): { name: string; code?: string; message: string } {
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
export function str(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

/** Human label for the submission type, shared by the email + DB row. */
export function kindOf(lead: Record<string, unknown>): string {
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

// ---------------------------------------------------------------------------
// The send itself — best-effort, result-checked, non-throwing
// ---------------------------------------------------------------------------

export type NotifyResult = {
  ok: boolean;
  id?: string;
  /** Coarse, non-sensitive reason for the caller/logs. */
  reason?: "no_key" | "provider_error" | "exception" | "test_skipped";
  /** Short, PII-free description stored in `notifyLastError`. */
  detail?: string;
};

/**
 * The OWNER notification. Nothing here is addressed to the lead — `replyTo` is
 * the only place their address appears, and on a phone-only lead it is omitted
 * entirely rather than pointed at the `lead.invalid` sentinel.
 *
 * Never throws. Every failure mode comes back as `{ ok: false, reason }` so the
 * caller can record it and the visitor is never told a send happened.
 */
export async function sendOwnerNotification(
  lead: Record<string, unknown>,
  replyToEmail: string | undefined,
  isTest = false
): Promise<NotifyResult> {
  // Test submissions never touch the real inbox. Set LEAD_TEST_NOTIFY_EMAIL to
  // route them to a throwaway address instead of dropping them.
  const testInbox = isTest ? process.env.LEAD_TEST_NOTIFY_EMAIL : undefined;
  if (isTest && !testInbox) {
    return {
      ok: false,
      reason: "test_skipped",
      detail: "test submission, no LEAD_TEST_NOTIFY_EMAIL set",
    };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return {
      ok: false,
      reason: "no_key",
      detail: "RESEND_API_KEY is not set in this environment",
    };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const to = testInbox || process.env.LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com";
    // Resend's shared `onboarding@resend.dev` needs no domain verification and
    // reliably delivers to your own Resend-account email — ideal for a
    // self-notification. Override LEAD_FROM_EMAIL once a domain is verified.
    const from = process.env.LEAD_FROM_EMAIL || "Handbuilt Leads <onboarding@resend.dev>";
    const isConsultation = lead.source === "ai-builder" || lead.source === "consultation";
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
      const shape = errorShape(error);
      console.error("[AI-SHOP LEAD] Resend returned an error", shape);
      return {
        ok: false,
        reason: "provider_error",
        detail: `${shape.name}${shape.code ? ` (${shape.code})` : ""}: ${shape.message}`,
      };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    // Network / SDK exception. Detail stays server-side.
    const shape = errorShape(err);
    console.error("[AI-SHOP LEAD] Resend threw", shape);
    return { ok: false, reason: "exception", detail: `${shape.name}: ${shape.message}` };
  }
}

// ---------------------------------------------------------------------------
// Delivery state — claim, record, retry
// ---------------------------------------------------------------------------

/** Keep `notifyLastError` short and free of anything a visitor typed. */
function safeDetail(detail: string | undefined, reason: string | undefined): string {
  return (detail ?? reason ?? "unknown failure").slice(0, 240);
}

/**
 * Atomically take ownership of a lead's notification.
 *
 * THIS IS THE IDEMPOTENCY GUARANTEE. `updateMany` compiles to a single
 * `UPDATE ... WHERE id = ? AND notifyStatus IN ('pending','failed')`, which
 * Postgres executes under a row lock. Exactly one concurrent caller can see
 * count === 1; everyone else sees 0 and must not send. A row already `delivered`
 * or already `sending` is never claimable, so a duplicate email is impossible
 * even when the cron overlaps a live submission.
 *
 * @returns true when the caller owns the send.
 */
export async function claimLeadForNotify(id: string): Promise<boolean> {
  try {
    const res = await prisma.buildRequest.updateMany({
      where: { id, notifyStatus: { in: RETRYABLE } },
      data: {
        notifyStatus: NOTIFY.SENDING,
        notifyClaimedAt: new Date(),
        notifyAttempts: { increment: 1 },
      },
    });
    return res.count === 1;
  } catch (err) {
    // Losing the claim is safe: we simply do not send. Never send on an error.
    console.error("[AI-SHOP LEAD] claim failed", { id, ...errorShape(err) });
    return false;
  }
}

/**
 * Write the outcome of a send back onto the row. Best-effort: the lead itself is
 * already durable, so a failure here must never propagate. It is still logged,
 * because a row stuck in `sending` is exactly the silent state this file exists
 * to remove — the stale-claim reaper in `runNotifyRetry` will recover it.
 */
export async function recordNotifyResult(id: string, result: NotifyResult): Promise<void> {
  try {
    await prisma.buildRequest.update({
      where: { id },
      data: result.ok
        ? {
            notifyStatus: NOTIFY.DELIVERED,
            notifiedAt: new Date(),
            notifyMessageId: result.id ?? null,
            notifyLastError: null,
            emailed: true, // legacy mirror, kept in sync
          }
        : {
            // A deliberate non-send is `skipped`, not `failed`: a test
            // submission with no test inbox is working as designed and must not
            // sit in the retry queue forever.
            notifyStatus: result.reason === "test_skipped" ? NOTIFY.SKIPPED : NOTIFY.FAILED,
            notifyLastError: safeDetail(result.detail, result.reason),
            emailed: false,
          },
    });
  } catch (err) {
    console.error("[AI-SHOP LEAD] could not record notification status", {
      id,
      ...errorShape(err),
    });
  }
}

/**
 * Release claims orphaned by a function that died between claiming and
 * recording. Without this, one crashed invocation would park a lead in
 * `sending` permanently and nothing would ever mail the owner about it.
 */
async function reapStaleClaims(): Promise<number> {
  try {
    const res = await prisma.buildRequest.updateMany({
      where: {
        notifyStatus: NOTIFY.SENDING,
        notifyClaimedAt: { lt: new Date(Date.now() - CLAIM_STALE_MS) },
      },
      data: {
        notifyStatus: NOTIFY.FAILED,
        notifyLastError: "claim expired — the previous attempt did not finish",
      },
    });
    if (res.count > 0) {
      console.warn("[AI-SHOP LEAD] reaped stale notification claims", { count: res.count });
    }
    return res.count;
  } catch (err) {
    console.error("[AI-SHOP LEAD] stale-claim reap failed", errorShape(err));
    return 0;
  }
}

export type RetryReport = {
  scanned: number;
  reaped: number;
  delivered: number;
  failed: number;
  skipped: number;
  exhausted: number;
  /** Present when the run could not do its job at all. */
  error?: string;
};

/**
 * Retry every lead the owner was never successfully told about.
 *
 * Safe to run concurrently with itself and with live submissions: each row is
 * taken through `claimLeadForNotify`, so a row already delivered or in flight is
 * skipped rather than mailed twice.
 */
export async function runNotifyRetry(limit = 25): Promise<RetryReport> {
  const report: RetryReport = {
    scanned: 0,
    reaped: 0,
    delivered: 0,
    failed: 0,
    skipped: 0,
    exhausted: 0,
  };

  report.reaped = await reapStaleClaims();

  let queue: Array<{
    id: string;
    payload: unknown;
    source: string | null;
  }>;
  try {
    queue = await prisma.buildRequest.findMany({
      where: {
        notifyStatus: { in: RETRYABLE },
        notifyAttempts: { lt: MAX_NOTIFY_ATTEMPTS },
      },
      orderBy: { createdAt: "asc" },
      take: limit,
      select: { id: true, payload: true, source: true },
    });
  } catch (err) {
    const shape = errorShape(err);
    console.error("[AI-SHOP LEAD] retry could not read the queue", shape);
    return { ...report, error: `${shape.name}: ${shape.message}` };
  }

  report.scanned = queue.length;

  // How many are past the cap and therefore need a human, not another retry.
  try {
    report.exhausted = await prisma.buildRequest.count({
      where: {
        notifyStatus: { in: RETRYABLE },
        notifyAttempts: { gte: MAX_NOTIFY_ATTEMPTS },
      },
    });
    if (report.exhausted > 0) {
      console.error(
        "[AI-SHOP LEAD] leads have exhausted their notification retries and need manual follow-up",
        { count: report.exhausted }
      );
    }
  } catch {
    /* the count is diagnostic only */
  }

  for (const row of queue) {
    // Sequential on purpose: this is a low-volume queue, and a burst of parallel
    // sends is the fastest way to hit a provider rate limit and turn a
    // recoverable backlog into a wall of failures.
    const owned = await claimLeadForNotify(row.id);
    if (!owned) continue;

    const lead = isPlainObject(row.payload) ? row.payload : {};
    // The persisted `email` column carries a `.invalid` sentinel for phone-only
    // leads, so re-derive the reply-to from the payload exactly as the live path
    // does — a retried email is then identical to the one that should have gone.
    const replyTo = str(lead.email);
    // A test lead is marked `test:<source>` in the source column.
    const isTest = (row.source ?? "").startsWith("test:");

    const result = await sendOwnerNotification(lead, replyTo, isTest);
    await recordNotifyResult(row.id, result);

    if (result.ok) report.delivered += 1;
    else if (result.reason === "test_skipped") report.skipped += 1;
    else report.failed += 1;
  }

  console.log("[AI-SHOP LEAD] notification retry finished", report);
  return report;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
