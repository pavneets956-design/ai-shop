import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Lead capture for the Build Request form and the "email me this plan" action.
 *
 * - Always logs the lead (visible in Vercel → Logs) so nothing is ever lost.
 * - If RESEND_API_KEY is set, sends YOU a notification email (self-notification —
 *   not outbound to the client). Sending never blocks or fails the request.
 *
 * Env:
 *   RESEND_API_KEY     enable email delivery
 *   LEAD_NOTIFY_EMAIL  where to send notifications (default: pavneets956@gmail.com)
 *   LEAD_FROM_EMAIL    verified from address (default: Handbuilt <onboarding@resend.dev>)
 */
export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const lead = { receivedAt: new Date().toISOString(), ...payload };

  // Structured log — always on, shows up in Vercel → Logs.
  console.log("[AI-SHOP LEAD]", JSON.stringify(lead));

  // Self-notification via Resend (best-effort, never blocks the response).
  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      const to = process.env.LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com";
      // From-address: Resend's shared `onboarding@resend.dev` needs NO domain
      // verification and reliably delivers to your own Resend-account email — ideal
      // for a self-notification (you email yourself the lead). No Handbuilt mailbox
      // or domain required. Override LEAD_FROM_EMAIL once you verify a domain, e.g.
      // "Handbuilt <leads@aibuiltbyhand.com>" or your existing "leads@coitracker.co".
      const from = process.env.LEAD_FROM_EMAIL || "Handbuilt Leads <onboarding@resend.dev>";
      // The /start AI call posts source "ai-builder"; an older flow used "consultation".
      // Both carry the rich brief (pain, recommended build, transcript) → rich format.
      const isConsultation =
        payload.source === "ai-builder" || payload.source === "consultation";
      const kind = isConsultation
        ? "AI consultation"
        : payload.type === "plan"
        ? "Plan request"
        : "Build request";

      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New Handbuilt ${kind}: ${payload.name || email}`,
        text: isConsultation ? formatConsultation(lead) : formatLead(lead),
        html: isConsultation ? htmlConsultation(lead) : htmlLead(lead),
      });
    } catch (err) {
      // Don't fail the user's submission if email delivery hiccups.
      console.error("[AI-SHOP LEAD] resend error", err);
    }
  }

  return NextResponse.json({ ok: true });
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
