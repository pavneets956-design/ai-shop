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
 *   LEAD_FROM_EMAIL    verified from address (default: AI Shop <onboarding@resend.dev>)
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
      const from = process.env.LEAD_FROM_EMAIL || "AI Shop <onboarding@resend.dev>";
      const kind = payload.type === "plan" ? "Plan request" : "Build request";

      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New AI Shop ${kind}: ${email}`,
        text: formatLead(lead),
      });
    } catch (err) {
      // Don't fail the user's submission if email delivery hiccups.
      console.error("[AI-SHOP LEAD] resend error", err);
    }
  }

  return NextResponse.json({ ok: true });
}

function formatLead(lead: Record<string, unknown>): string {
  return Object.entries(lead)
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
    .join("\n");
}
