// app/api/agent/call/webhook/status/route.ts
//
// Twilio STATUS CALLBACK.
//
// `lib/agent/callManager.ts` registers
//   statusCallback: `${webhookUrl}/status`
//   statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
// on every outbound call — but this route did not exist until 2026-08-30, so
// every status callback Twilio sent hit a 404. Twilio retries 404s, so a live
// campaign would have generated a wall of failing callbacks with no record of
// what actually happened on each call.
//
// Two options were on the table: create the route, or stop registering the
// callback. Created — the call lifecycle is exactly the thing you want a log
// of if this subsystem is ever switched on.
//
// Same security model as the voice webhook: kill-switched by `middleware.ts`,
// and gated on Twilio's HMAC signature rather than a session (Twilio cannot
// log in). It records nothing to the database and takes no action — it only
// acknowledges and logs, so an accepted callback can never mutate state.

import { NextRequest, NextResponse } from "next/server";
import { verifyTwilioRequest } from "@/lib/agent/twilioSignature";

export const runtime = "nodejs";

/** Fields Twilio sends on a status callback that are safe to log. */
const LOGGED = [
  "CallSid",
  "CallStatus",
  "CallDuration",
  "Direction",
  "Timestamp",
  "SequenceNumber",
] as const;

export async function POST(req: NextRequest) {
  const verified = await verifyTwilioRequest(req);
  if (!verified.ok) {
    console.warn("[agent-status-callback] rejected unverified request:", verified.reason);
    return NextResponse.json(
      { error: "Twilio signature verification failed", reason: verified.reason },
      { status: 403 },
    );
  }

  // Deliberately does NOT log `To` / `From` / `Called` / `Caller` — those are
  // phone numbers, and Vercel logs are not the place for them.
  const summary: Record<string, string> = {};
  for (const key of LOGGED) {
    if (verified.params[key]) summary[key] = verified.params[key];
  }
  console.log("[agent-status-callback]", JSON.stringify(summary));

  // Twilio only needs a 2xx; an empty 204 is the cheapest valid acknowledgement.
  return new NextResponse(null, { status: 204 });
}

/** Reachability check. Twilio never GETs this; humans and smoke tests do. */
export async function GET() {
  return new NextResponse("Status callback ok", {
    status: 200,
    headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" },
  });
}
