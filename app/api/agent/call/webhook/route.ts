import { NextRequest, NextResponse } from "next/server";
import { ConversationEngine } from "@/lib/agent/conversationEngine";
import { OpenAIConversationEngine } from "@/lib/agent/openaiConversationEngine";
import { CallStorage } from "@/lib/agent/callStorage";

// Twilio webhook endpoint for call events
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const callStatus = formData.get("CallStatus");
    const callSid = formData.get("CallSid");
    const from = formData.get("From");
    const to = formData.get("To");
    const speechResult = formData.get("SpeechResult");
    const digits = formData.get("Digits");

    console.log("Twilio webhook:", { callStatus, callSid, from, to, speechResult, digits });

    const callStorage = new CallStorage();
    const callSidStr = callSid?.toString() || "";

    // Handle call status updates (not TwiML requests)
    if (callStatus && callStatus !== "ringing" && callStatus !== "in-progress") {
      // This is a status callback - save final call data
      console.log(`Call ${callSid} status: ${callStatus}`);
      
      // Save call completion data
      if (callStatus === "completed" || callStatus === "no-answer" || callStatus === "busy" || callStatus === "failed") {
        try {
          await callStorage.saveCall({
            callSid: callSidStr,
            fromNumber: from?.toString() || "",
            toNumber: to?.toString() || "",
            status: callStatus,
          });
        } catch (error) {
          console.error("Error saving call status:", error);
        }
      }
      
      return new NextResponse("", { status: 200 });
    }

    // Initialize conversation engine
    // Use OpenAI if configured, otherwise fall back to rule-based
    const useOpenAI = !!process.env.OPENAI_API_KEY;
    const engine = useOpenAI 
      ? new OpenAIConversationEngine()
      : new ConversationEngine();
    
    // Get user input from speech recognition or DTMF
    const userInput = speechResult?.toString() || digits?.toString() || "";

    let twimlResponse: string;

    if (!userInput || userInput.trim() === "") {
      // First message - introduction
      // Save initial call record
      try {
        await callStorage.saveCall({
          callSid: callSidStr,
          fromNumber: from?.toString() || "",
          toNumber: to?.toString() || "",
          status: "in-progress",
        });
      } catch (error) {
        console.error("Error saving initial call:", error);
      }

      let intro: string;
      try {
        if (useOpenAI) {
          intro = await (engine as OpenAIConversationEngine).processResponse("hello");
        } else {
          intro = (engine as ConversationEngine).processResponse("hello");
        }
        
        // Ensure we have a valid response
        if (!intro || intro.trim() === "") {
          intro = "Hi! I'm calling to introduce you to our AI receptionist service. Do you have a moment to chat?";
        }
      } catch (error) {
        console.error("Error generating intro:", error);
        intro = "Hi! I'm calling to introduce you to our AI receptionist service. Do you have a moment to chat?";
      }
      
      // Save conversation history
      const history = engine.getConversationHistory();
      if (history.length > 0) {
        try {
          await callStorage.updateConversationHistory(callSidStr, history);
        } catch (error) {
          console.error("Error saving conversation history:", error);
        }
      }
      
      twimlResponse = generateTwiML(intro, callSidStr);
    } else {
      // Process user's response
      let response: string;
      try {
        if (useOpenAI) {
          response = await (engine as OpenAIConversationEngine).processResponse(userInput);
        } else {
          response = (engine as ConversationEngine).processResponse(userInput);
        }
        
        // Ensure we have a valid response
        if (!response || response.trim() === "") {
          response = "I understand. Let me know if you have any questions about our AI receptionist service.";
        }
      } catch (error) {
        console.error("Error processing user response:", error);
        response = "I'm sorry, I'm having trouble processing that. Could you repeat your question?";
      }
      
      const state = engine.getState();
      
      // Save conversation history after each exchange
      const history = engine.getConversationHistory();
      if (history.length > 0) {
        try {
          await callStorage.updateConversationHistory(callSidStr, history);
          
          // Update call with current state
          await callStorage.saveCall({
            callSid: callSidStr,
            fromNumber: from?.toString() || "",
            toNumber: to?.toString() || "",
            status: "in-progress",
            conversationHistory: history,
            outcome: state.nextAction || (state.interestLevel === "high" ? "interested" : state.interestLevel === "low" ? "not-interested" : undefined),
          });
        } catch (error) {
          console.error("Error saving conversation:", error);
        }
      }
      
      // Check if conversation should continue
      if (state.interestLevel === "low" && state.stage === "objection-handling") {
        // End call gracefully if not interested
        // Save final call data
        try {
          const history = engine.getConversationHistory();
          await callStorage.saveCall({
            callSid: callSidStr,
            fromNumber: from?.toString() || "",
            toNumber: to?.toString() || "",
            status: "completed",
            conversationHistory: history,
            outcome: "not-interested",
            transcript: history.map((h: any) => `${h.role === "agent" ? "Agent" : "Prospect"}: ${h.message || h.content}`).join("\n\n"),
          });
          await callStorage.createLeadFromCall(callSidStr, "not-interested");
        } catch (error) {
          console.error("Error saving final call data:", error);
        }
        
        const ssmlResponse = convertToSSML(response);
        twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">${ssmlResponse}</prosody>
  </Say>
  <Pause length="1.5"/>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">Thank you for your time. Have a great day!</prosody>
  </Say>
  <Hangup/>
</Response>`;
      } else if (state.nextAction === "schedule-demo" || state.nextAction === "send-info") {
        // Close the call and schedule follow-up
        // Save final call data
        try {
          const history = engine.getConversationHistory();
          const outcome = state.nextAction === "schedule-demo" ? "scheduled" : "follow-up";
          await callStorage.saveCall({
            callSid: callSidStr,
            fromNumber: from?.toString() || "",
            toNumber: to?.toString() || "",
            status: "completed",
            conversationHistory: history,
            outcome,
            transcript: history.map((h: any) => `${h.role === "agent" ? "Agent" : "Prospect"}: ${h.message || h.content}`).join("\n\n"),
          });
          await callStorage.createLeadFromCall(callSidStr, outcome);
        } catch (error) {
          console.error("Error saving final call data:", error);
        }
        
        const ssmlResponse = convertToSSML(response);
        twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">${ssmlResponse}</prosody>
  </Say>
  <Pause length="1.5"/>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">I'll send you that information right away. Thank you so much for your time today!</prosody>
  </Say>
  <Hangup/>
</Response>`;
      } else {
        // Continue conversation
        twimlResponse = generateTwiML(response, callSidStr);
      }
    }

    return new NextResponse(twimlResponse, {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    
    // Return error TwiML
    const errorTwiML = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">I'm sorry, I'm having technical difficulties. Please try calling back later.</prosody>
  </Say>
  <Hangup/>
</Response>`;
    
    return new NextResponse(errorTwiML, {
      headers: { "Content-Type": "text/xml" },
      status: 500,
    });
  }
}

// Convert text to SSML with natural pauses and emphasis for human-like speech
function convertToSSML(text: string): string {
  // Handle null/undefined
  if (!text || typeof text !== 'string') {
    text = "I'm sorry, I didn't catch that.";
  }
  
  // Escape XML first
  let ssml = escapeXml(text);
  
  // Add longer, more natural pauses after sentence endings
  ssml = ssml.replace(/([.!?])\s+/g, '$1<break time="0.8s"/> ');
  
  // Add natural pauses after commas (longer for more human-like flow)
  ssml = ssml.replace(/,\s+/g, ',<break time="0.5s"/> ');
  
  // Add pauses after conjunctions for more natural speech
  ssml = ssml.replace(/\s+(and|but|or|so|because)\s+/gi, ' <break time="0.3s"/>$1<break time="0.3s"/> ');
  
  // Add emphasis to key phrases (prices, numbers, important words) with stronger emphasis
  ssml = ssml.replace(/\$(\d+)/g, '<emphasis level="strong">$$$1</emphasis>');
  ssml = ssml.replace(/(\d+)\s*(percent|%|month|per month|dollar|dollars)/gi, '<emphasis level="strong">$1 $2</emphasis>');
  
  // Add emphasis to important action words
  const emphasisWords = ['free', 'save', 'never', 'always', 'guaranteed', 'risk-free', 'perfect', 'amazing', 'exactly'];
  emphasisWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    ssml = ssml.replace(regex, `<emphasis level="moderate">${word}</emphasis>`);
  });
  
  // Add natural pauses for longer sentences (after 12+ words for more human-like pacing)
  const sentences = ssml.split(/<break time="0\.8s"\/>/);
  const processedSentences = sentences.map(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length > 12) {
      // Add a pause in the middle of long sentences for breathing
      const midPoint = Math.floor(words.length / 2);
      words[midPoint] = `<break time="0.6s"/>${words[midPoint]}`;
      return words.join(' ');
    }
    return sentence;
  });
  ssml = processedSentences.join('<break time="0.8s"/>');
  
  // Add slight pauses after question words for more natural Q&A flow
  ssml = ssml.replace(/\b(how|what|when|where|why|who|which)\s+/gi, '<break time="0.2s"/>$1<break time="0.2s"/> ');
  
  return ssml;
}

// Helper function to generate TwiML with speech recognition
// Uses SSML for more natural, human-like speech
function generateTwiML(message: string, callSid: string): string {
  const webhookUrl = process.env.TWILIO_WEBHOOK_URL || 
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/agent/call/webhook`;
  
  // Convert message to SSML with natural pauses and emphasis
  const ssmlMessage = convertToSSML(message);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">${ssmlMessage}</prosody>
  </Say>
  <Pause length="1.5"/>
  <Gather 
    input="speech" 
    action="${webhookUrl}" 
    method="POST" 
    speechTimeout="auto"
    language="en-US"
    enhanced="true"
    speechModel="phone_call"
    hints="yes, no, interested, not interested, maybe, later, tell me more, how much, price, cost, sure, okay, sounds good">
    <Say voice="Polly.Amy-Neural" language="en-US">
      <prosody rate="85%" pitch="+5%">Please go ahead when you're ready.</prosody>
    </Say>
  </Gather>
  <Pause length="1.5"/>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">I didn't catch that. Feel free to let me know if you'd like to continue or if you have any questions.</prosody>
  </Say>
  <Gather 
    input="speech" 
    action="${webhookUrl}" 
    method="POST" 
    speechTimeout="auto"
    enhanced="true"
    speechModel="phone_call">
  </Gather>
  <Say voice="Polly.Amy-Neural" language="en-US">
    <prosody rate="85%" pitch="+5%">Thank you for your time. Have a great day!</prosody>
  </Say>
  <Hangup/>
</Response>`;
}

// Escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

