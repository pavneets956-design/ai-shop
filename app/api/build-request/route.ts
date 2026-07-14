import { NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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
 * Env:
 *   RESEND_API_KEY     enable the self-notification email
 *   LEAD_NOTIFY_EMAIL  where to send notifications (default: pavneets956@gmail.com)
 *   LEAD_FROM_EMAIL    verified from address (default: Handbuilt <onboarding@resend.dev>)
 */

// Require a valid email; everything else is optional and passed through, because
// the three callers (build-request / plan / consultation) post different shapes.
const LeadSchema = z
  .object({ email: z.string().trim().email() })
  .passthrough();

const DEDUPE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    // Don't echo zod internals — a single clear message is enough for the form.
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const payload = parsed.data as Record<string, unknown>;
  const email = String(payload.email).trim();
  const lead = { receivedAt: new Date().toISOString(), ...payload, email };

  // Structured log — always on, visible in Vercel → Logs. NOT a durable store.
  console.log("[AI-SHOP LEAD]", JSON.stringify(lead));

  // NODE_ENV === "production" on Vercel covers BOTH preview and production
  // deploys. Only true local dev (`next dev`) is non-strict.
  const strict = process.env.NODE_ENV === "production";

  // 1) Durable persistence FIRST. Idempotent on rapid duplicate submits.
  const persist = await persistLead(lead, email);
  if (persist.deduped) {
    // A matching lead already landed moments ago — accept idempotently, don't
    // insert or notify twice.
    return NextResponse.json({ ok: true, id: persist.id, deduped: true });
  }

  // 2) Best-effort notification email. Never throws; reports true acceptance.
  const notify = await sendNotification(lead, email);
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
    return NextResponse.json({
      ok: true,
      id: persist.id,
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
 * Write the lead to the BuildRequest table. Idempotent within a short window:
 * if an identical (email + goal) lead landed in the last 10 minutes we treat a
 * repeat as the same submission rather than inserting/notifying twice.
 * Never throws — a DB failure returns { ok: false } so email can still accept.
 */
async function persistLead(
  lead: Record<string, unknown>,
  email: string
): Promise<PersistResult> {
  // Normalize the primary intent across the three payload shapes.
  const goal = str(lead.goal) ?? str(lead.want) ?? null;
  try {
    const recent = await prisma.buildRequest.findFirst({
      where: {
        email,
        goal,
        createdAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
      },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });
    if (recent) return { ok: true, id: recent.id, deduped: true };

    const row = await prisma.buildRequest.create({
      data: {
        name: str(lead.name),
        email,
        phone: str(lead.phone),
        source: str(lead.source) ?? str(lead.type),
        kind: kindOf(lead),
        goal,
        payload: lead as unknown as Prisma.InputJsonValue,
      },
      select: { id: true },
    });
    return { ok: true, id: row.id };
  } catch (err) {
    // Log full detail server-side only; caller decides how to respond.
    console.error("[AI-SHOP LEAD] DB persist failed", err);
    return { ok: false };
  }
}

// ---------------------------------------------------------------------------
// Notification email (Resend) — best-effort, result-checked, non-throwing
// ---------------------------------------------------------------------------

type NotifyResult = {
  ok: boolean;
  id?: string;
  /** Coarse, non-sensitive reason for the caller/logs. */
  reason?: "no_key" | "provider_error" | "exception";
};

async function sendNotification(
  lead: Record<string, unknown>,
  email: string
): Promise<NotifyResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "no_key" };

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    const to = process.env.LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com";
    // Resend's shared `onboarding@resend.dev` needs no domain verification and
    // reliably delivers to your own Resend-account email — ideal for a
    // self-notification. Override LEAD_FROM_EMAIL once a domain is verified.
    const from = process.env.LEAD_FROM_EMAIL || "Handbuilt Leads <onboarding@resend.dev>";
    const isConsultation =
      lead.source === "ai-builder" || lead.source === "consultation";
    const kind = kindOf(lead);

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New Handbuilt ${kind}: ${lead.name || email}`,
      text: isConsultation ? formatConsultation(lead) : formatLead(lead),
      html: isConsultation ? htmlConsultation(lead) : htmlLead(lead),
    });

    // Resend v4 does NOT throw on a non-2xx API response (invalid/expired key,
    // rate limit, etc.) — it returns { error }. Inspect it, never assume success.
    if (error) {
      console.error("[AI-SHOP LEAD] Resend returned an error", error);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    // Network / SDK exception. Detail stays server-side.
    console.error("[AI-SHOP LEAD] Resend threw", err);
    return { ok: false, reason: "exception" };
  }
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
    `Email:     ${g("email")}`,
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
    has(lead, "email") ? row("Email", lead.email) : "",
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
