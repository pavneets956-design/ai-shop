import { NextRequest, NextResponse } from "next/server";
import { CallManager } from "@/lib/agent/callManager";
import { ConversationEngine } from "@/lib/agent/conversationEngine";

// This endpoint handles Twilio webhooks for incoming call responses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { callId, userInput, callSid } = body;

    // Initialize conversation engine
    const engine = new ConversationEngine();
    const callManager = new CallManager(engine);

    // Process the user's speech/input
    const response = await callManager.handleCallResponse(callId, userInput);

    // Return response for Twilio to speak
    return NextResponse.json({
      response,
      shouldContinue: true,
    });
  } catch (error) {
    console.error("Call API error:", error);
    return NextResponse.json(
      { error: "Failed to process call" },
      { status: 500 }
    );
  }
}

// Initiate a new call
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { toNumber, contactId, businessContext } = body;

    // Validate Twilio configuration
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      return NextResponse.json(
        { 
          error: "Twilio not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in your environment variables.",
          configured: false
        },
        { status: 400 }
      );
    }

    if (!toNumber) {
      return NextResponse.json(
        { error: "Phone number (toNumber) is required" },
        { status: 400 }
      );
    }

    const engine = new ConversationEngine();
    const callManager = new CallManager(engine);

    // In production, get settings from database
    const config = {
      fromNumber: process.env.TWILIO_PHONE_NUMBER,
      toNumber,
      agentName: process.env.AGENT_NAME || "Sarah",
      agentVoice: "professional-female",
      pitchStyle: "conversational",
      businessContext: businessContext || undefined,
    };

    const callId = await callManager.initiateCall(config);

    return NextResponse.json({
      callId,
      status: "initiated",
      message: "Call initiated successfully",
    });
  } catch (error: any) {
    console.error("Call initiation error:", error);
    return NextResponse.json(
      { 
        error: "Failed to initiate call",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

