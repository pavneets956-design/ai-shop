// app/api/agent/call/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export const runtime = "nodejs"; // be sure this runs on the Node runtime

const VoiceResponse = twilio.twiml.VoiceResponse;

function xmlResponse(vr: twilio.twiml.VoiceResponse) {
  return new NextResponse(vr.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

// For quick browser test (GET)
export async function GET(_req: NextRequest) {
  const vr = new VoiceResponse();
  vr.say("AI Tech Shop webhook GET is alive.");
  return xmlResponse(vr);
}

// For Twilio calls (POST)
export async function POST(_req: NextRequest) {
  try {
    const vr = new VoiceResponse();
    vr.say("Hello from AI Tech Shop. Your Twilio webhook POST is working.");
    vr.pause({ length: 2 });
    vr.say("Goodbye.");
    return xmlResponse(vr);
  } catch (err) {
    console.error("Webhook fatal error:", err);
    const vr = new VoiceResponse();
    vr.say("We are experiencing an internal error. Goodbye.");
    return xmlResponse(vr);
  }
}
