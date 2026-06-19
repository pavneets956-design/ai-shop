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
    "useType", "industry", "existing", "tools", "budget", "timeline",
  ];
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
    ...extraLines(lead, shown),
    "",
    `Received:  ${g("receivedAt")}`,
  ].join("\n");
}
