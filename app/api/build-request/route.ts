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
      // From-address must be on a Resend-verified domain matching the API key's scope.
      // Key is scoped to coitracker.co. Swap to an Handbuilt / handbuilt.ai address once
      // that domain is bought + verified in Resend.
      const from = process.env.LEAD_FROM_EMAIL || "Handbuilt <leads@coitracker.co>";
      const isConsultation = payload.source === "consultation";
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

function formatConsultation(lead: Record<string, unknown>): string {
  const g = (k: string) => {
    const v = lead[k];
    if (v === undefined || v === null || v === "") return "—";
    return typeof v === "object" ? JSON.stringify(v) : String(v);
  };
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
    "",
    `Received:  ${g("receivedAt")}`,
  ].join("\n");
}
