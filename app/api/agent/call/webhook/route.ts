// app/api/agent/call/webhook/route.ts
// Minimal webhook for debugging - proves Twilio can reach the route

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

function xmlResponse(twiml: string) {
  return new NextResponse(twiml, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

// For manual browser test (GET)
export async function GET(req: NextRequest) {
  const vr = new VoiceResponse();
  vr.say("AI Tech Shop webhook is alive. This is a GET test.");
  return xmlResponse(vr.toString());
}

// For Twilio calls (POST)
export async function POST(req: NextRequest) {
  try {
    const vr = new VoiceResponse();
    vr.say("Hello from AI Tech Shop. Your Twilio webhook is working.");
    vr.pause({ length: 2 });
    vr.say("Goodbye.");
    return xmlResponse(vr.toString());
  } catch (err) {
    console.error("Webhook fatal error:", err);
    const vr = new VoiceResponse();
    vr.say("We are experiencing an internal error. Goodbye.");
    return xmlResponse(vr.toString());
  }
}
