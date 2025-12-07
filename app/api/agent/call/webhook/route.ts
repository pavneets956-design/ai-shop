// app/api/agent/call/webhook/route.ts
// Ultra-simple webhook - GET returns plain text, POST returns minimal TwiML
// NO database, NO OpenAI, NO complex logic - just prove the route works

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Force Node.js runtime (required for Twilio SDK)
export const runtime = "nodejs";

const VoiceResponse = twilio.twiml.VoiceResponse;

// GET handler - returns plain text for easy browser testing
export async function GET(_req: NextRequest) {
  return new NextResponse("Webhook GET ok", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

// POST handler - returns minimal TwiML for Twilio
export async function POST(_req: NextRequest) {
  try {
    const vr = new VoiceResponse();
    vr.say("Test");
    return new NextResponse(vr.toString(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (err) {
    console.error("Webhook POST error:", err);
    // Even on error, return valid TwiML
    const vr = new VoiceResponse();
    vr.say("Error");
    return new NextResponse(vr.toString(), {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }
}
