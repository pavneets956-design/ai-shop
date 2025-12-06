// Call Storage Service - Handles saving and retrieving call data from database

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

try {
  prisma = new PrismaClient();
} catch (error) {
  console.warn("Prisma client not available. Database features will be disabled.");
}

export interface CallData {
  callSid: string;
  contactId?: string;
  campaignId?: string;
  fromNumber: string;
  toNumber: string;
  status: string;
  duration?: number;
  transcript?: string;
  conversationHistory?: any;
  outcome?: string;
  notes?: string;
}

export class CallStorage {
  /**
   * Create or update a call record
   */
  async saveCall(data: CallData): Promise<any> {
    if (!prisma) {
      console.warn("Database not available. Call data not saved.");
      return null;
    }
    
    try {
      // Find or create contact by phone number
      let contact = await prisma.contact.findFirst({
        where: { phone: data.toNumber },
      });

      if (!contact) {
        // Create contact if doesn't exist
        contact = await prisma.contact.create({
          data: {
            company: "Unknown Company",
            phone: data.toNumber,
            status: "contacted",
          },
        });
      }

      // Check if call already exists
      const existingCall = await prisma.call.findFirst({
        where: { callId: data.callSid },
      });

      if (existingCall) {
        // Update existing call
        return await prisma.call.update({
          where: { id: existingCall.id },
          data: {
            status: data.status,
            duration: data.duration,
            transcript: data.transcript,
            conversationHistory: data.conversationHistory ? JSON.parse(JSON.stringify(data.conversationHistory)) : null,
            outcome: data.outcome,
            notes: data.notes,
            callTime: data.status === "completed" ? new Date() : existingCall.callTime,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create new call
        return await prisma.call.create({
          data: {
            contactId: contact.id,
            campaignId: data.campaignId || null,
            callId: data.callSid,
            status: data.status,
            duration: data.duration,
            transcript: data.transcript,
            conversationHistory: data.conversationHistory ? JSON.parse(JSON.stringify(data.conversationHistory)) : null,
            outcome: data.outcome,
            notes: data.notes,
            callTime: new Date(),
          },
        });
      }
    } catch (error) {
      console.error("Error saving call to database:", error);
      throw error;
    }
  }

  /**
   * Update conversation history for a call
   */
  async updateConversationHistory(callSid: string, conversationHistory: any[]): Promise<void> {
    if (!prisma) {
      console.warn("Database not available. Conversation history not saved.");
      return;
    }
    
    try {
      const call = await prisma.call.findFirst({
        where: { callId: callSid },
      });

      if (call) {
        await prisma.call.update({
          where: { id: call.id },
          data: {
            conversationHistory: JSON.parse(JSON.stringify(conversationHistory)),
            updatedAt: new Date(),
          },
        });
      }
    } catch (error) {
      console.error("Error updating conversation history:", error);
    }
  }

  /**
   * Get all calls
   */
  async getAllCalls(limit: number = 100): Promise<any[]> {
    if (!prisma) {
      console.warn("Database not available. Returning empty calls list.");
      return [];
    }
    
    try {
      const calls = await prisma.call.findMany({
        take: limit,
        orderBy: { callTime: "desc" },
        include: {
          contact: true,
          campaign: true,
        },
      });

      return calls.map((call) => ({
        id: call.id,
        callSid: call.callId,
        company: call.contact.company,
        contact: call.contact.contactName || "Unknown",
        phone: call.contact.phone,
        date: call.callTime?.toISOString() || call.createdAt.toISOString(),
        duration: call.duration ? `${Math.floor(call.duration / 60)}:${String(call.duration % 60).padStart(2, "0")}` : "0:00",
        status: call.status,
        outcome: call.outcome || "unknown",
        transcript: call.transcript || this.formatConversationHistory(call.conversationHistory),
        conversationHistory: call.conversationHistory,
      }));
    } catch (error) {
      console.error("Error fetching calls:", error);
      return [];
    }
  }

  /**
   * Get call by ID
   */
  async getCallById(callId: string): Promise<any | null> {
    if (!prisma) {
      console.warn("Database not available. Cannot fetch call.");
      return null;
    }
    
    try {
      const call = await prisma.call.findUnique({
        where: { id: callId },
        include: {
          contact: true,
          campaign: true,
        },
      });

      if (!call) return null;

      return {
        id: call.id,
        callSid: call.callId,
        company: call.contact.company,
        contact: call.contact.contactName || "Unknown",
        phone: call.contact.phone,
        date: call.callTime?.toISOString() || call.createdAt.toISOString(),
        duration: call.duration ? `${Math.floor(call.duration / 60)}:${String(call.duration % 60).padStart(2, "0")}` : "0:00",
        status: call.status,
        outcome: call.outcome || "unknown",
        transcript: call.transcript || this.formatConversationHistory(call.conversationHistory),
        conversationHistory: call.conversationHistory,
      };
    } catch (error) {
      console.error("Error fetching call:", error);
      return null;
    }
  }

  /**
   * Format conversation history as transcript
   */
  private formatConversationHistory(history: any): string {
    if (!history || !Array.isArray(history)) return "";

    return history
      .map((entry: any) => {
        const role = entry.role === "agent" ? "Agent" : "Prospect";
        const message = entry.message || entry.content || "";
        return `${role}: ${message}`;
      })
      .join("\n\n");
  }

  /**
   * Create or update lead from call
   */
  async createLeadFromCall(callSid: string, outcome: string): Promise<void> {
    if (!prisma) {
      console.warn("Database not available. Lead not created.");
      return;
    }
    
    try {
      const call = await prisma.call.findFirst({
        where: { callId: callSid },
        include: { contact: true },
      });

      if (!call) return;

      // Only create lead if interested or scheduled
      if (outcome === "interested" || outcome === "scheduled" || outcome === "follow-up") {
        const existingLead = await prisma.lead.findFirst({
          where: { contactId: call.contactId },
        });

        if (!existingLead) {
          // Calculate lead score based on outcome
          let score = 50;
          if (outcome === "scheduled") score = 90;
          else if (outcome === "interested") score = 75;
          else if (outcome === "follow-up") score = 60;

          await prisma.lead.create({
            data: {
              contactId: call.contactId,
              status: outcome === "scheduled" ? "demo-scheduled" : outcome === "interested" ? "qualified" : "follow-up",
              score,
              source: "AI Agent Call",
            },
          });

          // Update contact status
          await prisma.contact.update({
            where: { id: call.contactId },
            data: {
              status: outcome === "scheduled" ? "scheduled" : outcome === "interested" ? "interested" : "contacted",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error creating lead from call:", error);
    }
  }
}

