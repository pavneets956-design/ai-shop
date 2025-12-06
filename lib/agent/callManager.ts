// Call Manager - Handles telephony integration and call orchestration
// This integrates with Twilio or similar service

import { ConversationEngine, BusinessContext } from "./conversationEngine";
import twilio from "twilio";

const Twilio = twilio;

export interface CallConfig {
  fromNumber: string;
  toNumber: string;
  agentName: string;
  agentVoice: string;
  pitchStyle: string;
  businessContext?: BusinessContext;
}

export interface CallResult {
  callId: string;
  status: "completed" | "no-answer" | "busy" | "failed";
  duration: number;
  transcript?: string;
  outcome: "interested" | "not-interested" | "scheduled" | "follow-up";
  notes?: string;
}

export class CallManager {
  private conversationEngine: any; // ConversationEngine instance
  private twilioClient: twilio.Twilio | null = null;

  constructor(conversationEngine: any) {
    this.conversationEngine = conversationEngine;
    
    // Initialize Twilio client if credentials are available
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    if (accountSid && authToken) {
      this.twilioClient = Twilio(accountSid, authToken);
    }
  }

  // Initialize a call
  async initiateCall(config: CallConfig): Promise<string> {
    // Update conversation engine with business context if provided
    if (config.businessContext) {
      this.conversationEngine.setBusinessContext(config.businessContext);
    }
    
    console.log(`Initiating call from ${config.fromNumber} to ${config.toNumber}`);
    console.log(`Agent: ${config.agentName}, Voice: ${config.agentVoice}`);
    if (config.businessContext) {
      console.log(`Business: ${config.businessContext.companyName} (${config.businessContext.industry || 'N/A'})`);
    }
    
    // Use Twilio if available, otherwise return mock call ID
    if (this.twilioClient && config.fromNumber && config.toNumber) {
      try {
        // Get the webhook URL - adjust this to your actual domain
        const webhookUrl = process.env.TWILIO_WEBHOOK_URL || 
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/agent/call/webhook`;
        
        const call = await this.twilioClient.calls.create({
          to: config.toNumber,
          from: config.fromNumber,
          url: webhookUrl,
          method: 'POST',
          statusCallback: `${webhookUrl}/status`,
          statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
          statusCallbackMethod: 'POST',
        });
        
        console.log(`Twilio call initiated: ${call.sid}`);
        return call.sid;
      } catch (error) {
        console.error("Twilio call error:", error);
        // Fall back to mock if Twilio fails
        return `call_${Date.now()}`;
      }
    }
    
    // Mock call ID for development/testing
    return `call_${Date.now()}`;
  }

  // Process incoming call response (for Twilio webhook)
  async handleCallResponse(callId: string, userInput: string): Promise<string> {
    const response = this.conversationEngine.processResponse(userInput);
    
    // In production, you might want to:
    // - Log the conversation
    // - Update call status
    // - Trigger follow-up actions based on response
    
    return response;
  }

  // End call and save results
  async endCall(callId: string, result: CallResult): Promise<void> {
    // In production, this would save to database
    console.log(`Call ${callId} ended:`, result);
  }

  // Get call status
  async getCallStatus(callId: string): Promise<CallResult | null> {
    // In production, this would fetch from database
    return null;
  }
}

