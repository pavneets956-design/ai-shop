// OpenAI-Powered Conversation Engine for Sales Agent
// Uses GPT-4o for intelligent, natural conversations

import OpenAI from "openai";
import { ConversationState, BusinessContext } from "./conversationEngine";
import { AI_AGENT_PLANS, getPricingSummary, recommendPlan, formatPrice } from "./pricebook";

export class OpenAIConversationEngine {
  private state: ConversationState;
  private businessContext?: BusinessContext;
  private openai: OpenAI | null = null;
  private conversationHistory: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];

  constructor(businessContext?: BusinessContext) {
    this.state = {
      stage: "introduction",
      painPoints: [],
      objections: [],
      interestLevel: "medium",
      callStartTime: new Date(),
      conversationHistory: [],
    };
    this.businessContext = businessContext;

    // Initialize OpenAI client if API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    } else {
      console.warn("OpenAI API key not found. Falling back to rule-based engine.");
    }
  }

  // Main conversation handler using OpenAI
  async processResponse(userInput: string): Promise<string> {
    // Record prospect's response
    this.state.conversationHistory.push({
      role: "prospect",
      message: userInput,
      timestamp: new Date(),
    });

    // If OpenAI is not configured, fall back to basic response
    if (!this.openai) {
      return this.getFallbackResponse(userInput);
    }

    try {
      // Build system prompt with business context
      const systemPrompt = this.buildSystemPrompt();

      // Add user input to conversation history
      this.conversationHistory.push({
        role: "user",
        content: userInput,
      });

      // Call OpenAI API
      const completion = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          ...this.conversationHistory,
        ],
        temperature: 0.7, // Moderate temperature for natural, human-like responses
        max_tokens: 150, // Keep responses concise for phone conversations (120-180 range)
        response_format: { type: "text" },
      });

      const response = completion.choices[0]?.message?.content || this.getFallbackResponse(userInput);

      // Add assistant response to conversation history
      this.conversationHistory.push({
        role: "assistant",
        content: response,
      });

      // Update state based on response
      this.updateStateFromResponse(userInput, response);

      // Record agent's response
      this.state.conversationHistory.push({
        role: "agent",
        message: response,
        timestamp: new Date(),
      });

      return response;
    } catch (error) {
      console.error("OpenAI API error:", error);
      return this.getFallbackResponse(userInput);
    }
  }

  // Build system prompt with business context and instructions
  private buildSystemPrompt(): string {
    const locationContext = this.businessContext?.location 
      ? ` You are calling a business located in ${this.businessContext.location}.`
      : "";
    
    const businessContext = this.businessContext?.businessType 
      ? ` The business is a ${this.businessContext.businessType}.`
      : "";
    
    const companyName = this.businessContext?.companyName 
      ? ` The company name is ${this.businessContext.companyName}.`
      : "";

    // Build pricing summary from pricebook
    const pricingSummary = getPricingSummary();
    const starterPlan = AI_AGENT_PLANS.find(p => p.id === "starter");
    const growthPlan = AI_AGENT_PLANS.find(p => p.id === "growth");

    return `You are an AI sales and receptionist agent for an AI call-handling service. You talk in a natural, friendly, human way. You ask questions, listen, and respond like a professional human receptionist or sales rep.

Service description:
* You answer and make phone calls for local businesses.
* You can capture leads, book appointments, and qualify callers.
* You work 24/7, never miss a call, and handle multiple calls simultaneously.
* You integrate with calendars for booking and can send summaries via SMS or email.

Pricing:
${pricingSummary}

Pricing behavior:
* When someone asks about price, briefly describe the three main subscription plans (Starter, Growth, Scale) and the pay-as-you-go option.
* Recommend the Growth plan ($${growthPlan?.monthlyPrice}/mo, 1,000 calls, up to 3 numbers) for most active businesses, unless the user clearly fits Starter or Scale.
* Emphasize that they can start small and upgrade later.
* If they ask about going over limits, explain they can upgrade or pay per call for overages.

Conversation style:
* Sound like a real human, not a script.
* Use short, clear sentences and natural phrasing.
* Ask follow-up questions to understand the business (e.g., "How many calls do you usually get per day?").
* Answer questions directly, then add 1 concise helpful detail.
* Do NOT overwhelm them with long paragraphs.
* If they seem confused, pause and ask a clarifying question instead of talking over them.
* Keep the tone friendly, confident, and respectful.
* Never ask more than 2 questions in a row.
* After you speak, stop and let the caller respond.
* When you need more details, ask one clear question at a time.

Turn-taking behavior:
* Wait for the caller to finish speaking before responding.
* If they interrupt you, acknowledge it and let them speak.
* After answering a question, pause briefly before asking your next question.
* Keep each response to 2-3 sentences maximum.

Call goals:
* Understand what kind of business they run and their call volume.
* Identify whether they miss calls or have long hold times.
* Explain how the AI receptionist helps them.
* Offer a demo or trial, and collect contact details if they are interested.
* If they clearly say "no", politely close the conversation.

Common questions to answer naturally:
* "How much does it cost?" → Briefly mention all plans, recommend Growth for most businesses.
* "Can I start with a smaller plan?" → Yes, Starter at $${starterPlan?.monthlyPrice}/month, or pay-as-you-go at $0.35 per call.
* "What happens if I go over my call limit?" → You can upgrade to the next plan or pay per call for overages.
* "Can I cancel anytime?" → Yes, no long-term contracts, cancel anytime.
* "What exactly does the AI do on calls?" → Answers calls naturally, captures information, books appointments, qualifies leads, just like a human receptionist.

${locationContext}${businessContext}${companyName}

Current conversation stage: ${this.state.stage}
Interest level: ${this.state.interestLevel}
Pain points identified: ${this.state.painPoints.join(", ") || "none yet"}
Objections raised: ${this.state.objections.join(", ") || "none yet"}

Respond naturally and helpfully. Keep responses short and conversational.`;
  }

  // Update conversation state based on user input and AI response
  private updateStateFromResponse(userInput: string, aiResponse: string): void {
    const input = userInput.toLowerCase();

    // Detect pain points
    if (input.includes("busy") || input.includes("missed") || input.includes("can't answer")) {
      if (!this.state.painPoints.includes("missed-calls")) {
        this.state.painPoints.push("missed-calls");
      }
      this.state.interestLevel = "high";
    }
    if (input.includes("cost") || input.includes("expensive") || input.includes("hiring")) {
      if (!this.state.painPoints.includes("cost")) {
        this.state.painPoints.push("cost");
      }
    }
    if (input.includes("after hours") || input.includes("weekend") || input.includes("evening")) {
      if (!this.state.painPoints.includes("after-hours")) {
        this.state.painPoints.push("after-hours");
      }
    }

    // Detect objections
    if (input.includes("not interested") || input.includes("don't need")) {
      this.state.interestLevel = "low";
      if (!this.state.objections.includes("not-interested")) {
        this.state.objections.push("not-interested");
      }
    }
    if (input.includes("expensive") || input.includes("cost") || input.includes("price")) {
      if (!this.state.objections.includes("price")) {
        this.state.objections.push("price");
      }
    }

    // Detect interest
    if (input.includes("interesting") || input.includes("tell me more") || input.includes("how much") || input.includes("yes")) {
      this.state.interestLevel = "high";
    }

    // Detect next actions
    if (input.includes("email") || input.includes("send") || input.includes("info")) {
      this.state.nextAction = "send-info";
    }
    if (input.includes("demo") || input.includes("schedule") || input.includes("meeting")) {
      this.state.nextAction = "schedule-demo";
    }
    if (input.includes("think") || input.includes("later") || input.includes("call back")) {
      this.state.nextAction = "follow-up";
    }

    // Extract name if mentioned
    if (input.includes("this is") || input.includes("i'm") || input.includes("my name is")) {
      const nameMatch = input.match(/(?:this is|i'm|my name is|i am)\s+([a-z]+(?:\s+[a-z]+)?)/i);
      if (nameMatch && !this.state.prospectName) {
        this.state.prospectName = nameMatch[1].trim();
      }
    }

    // Update stage based on conversation flow
    if (this.state.stage === "introduction" && this.state.conversationHistory.length > 2) {
      this.state.stage = "qualification";
    }
    if (this.state.stage === "qualification" && this.state.painPoints.length > 0) {
      this.state.stage = "pitch";
    }
    if (this.state.objections.length > 0 && this.state.stage !== "objection-handling") {
      this.state.stage = "objection-handling";
    }
  }

  // Fallback response if OpenAI is not available
  private getFallbackResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    if (input.includes("hello") || input.includes("hi") || input.includes("yes")) {
      return `Hi there! Thank you for taking my call. My name is Sarah, and I'm calling because I believe your business could benefit from our AI Receptionist solution. Do you have a moment to chat?`;
    }
    
    if (input.includes("not interested") || input.includes("don't call")) {
      return `I completely understand. I won't take up any more of your time. Thank you for your time today, and have a great day!`;
    }
    
    if (input.includes("busy") || input.includes("not a good time")) {
      return `I completely understand you're busy. Would it be better if I called back at a different time?`;
    }
    
    return `I understand. Let me tell you a bit more about how our AI Receptionist Pro can help your business. It works 24/7, never misses a call, and costs just $99 per month. Would you like to hear more?`;
  }

  // Get current state
  getState(): ConversationState {
    return this.state;
  }

  // Set business context
  setBusinessContext(context: BusinessContext): void {
    this.businessContext = context;
    this.state.companyName = context.companyName;
    this.state.businessType = context.businessType;
    this.state.location = context.location;
  }

  // Get conversation history
  getConversationHistory(): Array<{ role: "agent" | "prospect"; message: string; timestamp: Date }> {
    return this.state.conversationHistory;
  }

  // Get call duration
  getCallDuration(): number {
    return Math.floor((new Date().getTime() - this.state.callStartTime.getTime()) / 1000);
  }

  // Reset conversation
  reset(): void {
    this.state = {
      stage: "introduction",
      painPoints: [],
      objections: [],
      interestLevel: "medium",
      callStartTime: new Date(),
      conversationHistory: [],
    };
    this.conversationHistory = [];
  }
}

