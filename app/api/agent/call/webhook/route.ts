// app/api/agent/call/webhook/route.ts
// Ultra-minimal webhook - no dependencies, just raw TwiML XML

import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime (not Edge) to avoid compatibility issues
export const runtime = "nodejs";

// For manual browser test (GET)
export async function GET(req: NextRequest) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>AI Tech Shop webhook is alive. This is a GET test.</Say>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

// For Twilio calls (POST)
export async function POST(req: NextRequest) {
  try {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello from AI Tech Shop. Your Twilio webhook is working.</Say>
  <Pause length="2"/>
  <Say>Goodbye.</Say>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (err: any) {
    console.error("Webhook fatal error:", err);
    
    // Even on error, return valid TwiML
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>We are experiencing an internal error. Goodbye.</Say>
</Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  }
}
