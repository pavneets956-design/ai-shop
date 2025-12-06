import { NextRequest, NextResponse } from "next/server";
import { CallStorage } from "@/lib/agent/callStorage";

// Get all calls from database
export async function GET(request: NextRequest) {
  try {
    const callStorage = new CallStorage();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    
    const calls = await callStorage.getAllCalls(limit);
    
    return NextResponse.json({ calls });
  } catch (error) {
    console.error("Error fetching calls:", error);
    return NextResponse.json(
      { error: "Failed to fetch calls", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Get single call by ID
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { callId } = body;
    
    if (!callId) {
      return NextResponse.json(
        { error: "callId is required" },
        { status: 400 }
      );
    }
    
    const callStorage = new CallStorage();
    const call = await callStorage.getCallById(callId);
    
    if (!call) {
      return NextResponse.json(
        { error: "Call not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ call });
  } catch (error) {
    console.error("Error fetching call:", error);
    return NextResponse.json(
      { error: "Failed to fetch call" },
      { status: 500 }
    );
  }
}

