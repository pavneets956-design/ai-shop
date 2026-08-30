// app/api/agent/call/webhook/route.ts
//
// Twilio VOICE webhook for the outbound agent. Twilio POSTs here when a call
// connects and expects TwiML back.
//
// SECURITY MODEL (2026-08-30)
// ---------------------------
// This route is the one part of the agent subsystem that cannot require a
// session — Twilio's servers call it and Twilio has no login. Two gates
// instead:
//
//   1. The kill switch in `middleware.ts`. While `AGENT_SUBSYSTEM_ENABLED`
//      is not exactly "true", this path 404s along with the rest of
//      `/api/agent/*`. That is safe: no call can be placed while the
//      subsystem is off, so no webhook can legitimately arrive.
//   2. Twilio's HMAC signature (`X-Twilio-Signature`), verified in
//      `lib/agent/twilioSignature.ts`. Before this, ANY caller could POST
//      here and get TwiML back — the standard way an attacker steers a
//      voice bot.
//
// The TwiML below still just says "Test". Do not point a real campaign at it:
// see the OWNER DECISION block at the top of `lib/agent/conversationEngine.ts`.

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { verifyTwilioRequest } from "@/lib/agent/twilioSignature";

// Force Node.js runtime (required for Twilio SDK)
export const runtime = "nodejs";

const VoiceResponse = twilio.twiml.VoiceResponse;

// GET handler — plain-text reachability check. Only answers at all when the
// kill switch is on (the middleware 404s this path otherwise).
export async function GET(_req: NextRequest) {
  return new NextResponse("Webhook GET ok", {
    status: 200,
    headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" },
  });
}

// POST handler — signature-gated, returns minimal TwiML for Twilio.
export async function POST(req: NextRequest) {
  const verified = await verifyTwilioRequest(req);
  if (!verified.ok) {
    // Never TwiML for an unverified caller — a 403 makes the rejection
    // unambiguous in the Twilio debugger and in our own logs.
    console.warn("[agent-webhook] rejected unverified request:", verified.reason);
    return NextResponse.json(
      { error: "Twilio signature verification failed", reason: verified.reason },
      { status: 403 },
    );
  }

  try {
    const vr = new VoiceResponse();
    vr.say("Test");
    return new NextResponse(vr.toString(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (err) {
    console.error("Webhook POST error:", err);
    // Even on error, return valid TwiML so the call ends cleanly.
    const vr = new VoiceResponse();
    vr.say("Error");
    return new NextResponse(vr.toString(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }
}
