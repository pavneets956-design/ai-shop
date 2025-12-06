// AI Conversation Engine for Sales Agent - Enhanced for Cold Calling Local Businesses
// This handles the conversation flow and responses

import { AI_AGENT_PLANS, formatPrice, recommendPlan } from "./pricebook";

export interface ConversationState {
  stage: "introduction" | "qualification" | "pitch" | "objection-handling" | "close" | "follow-up";
  prospectName?: string;
  companyName?: string;
  businessType?: string;
  location?: string;
  painPoints: string[];
  objections: string[];
  interestLevel: "low" | "medium" | "high";
  nextAction?: "schedule-demo" | "send-info" | "follow-up" | "not-interested";
  callStartTime: Date;
  conversationHistory: Array<{ role: "agent" | "prospect"; message: string; timestamp: Date }>;
}

export interface BusinessContext {
  companyName: string;
  industry?: string;
  location?: string;
  businessType?: string;
  size?: "small" | "medium" | "large";
  knownInfo?: string;
}

export class ConversationEngine {
  private state: ConversationState;
  private businessContext?: BusinessContext;

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
  }

  // Main conversation handler
  processResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    // Record prospect's response
    this.state.conversationHistory.push({
      role: "prospect",
      message: userInput,
      timestamp: new Date(),
    });

    let response: string;
    switch (this.state.stage) {
      case "introduction":
        response = this.handleIntroduction(input);
        break;
      case "qualification":
        response = this.handleQualification(input);
        break;
      case "pitch":
        response = this.handlePitch(input);
        break;
      case "objection-handling":
        response = this.handleObjection(input);
        break;
      case "close":
        response = this.handleClose(input);
        break;
      default:
        response = this.getDefaultResponse();
    }

    // Record agent's response
    this.state.conversationHistory.push({
      role: "agent",
      message: response,
      timestamp: new Date(),
    });

    return response;
  }

  private handleIntroduction(input: string): string {
    // Extract name if mentioned
    if (input.includes("this is") || input.includes("i'm") || input.includes("my name is") || input.includes("speaking")) {
      const nameMatch = input.match(/(?:this is|i'm|my name is|i am|speaking)\s+([a-z]+(?:\s+[a-z]+)?)/i);
      if (nameMatch) {
        this.state.prospectName = nameMatch[1].trim();
      }
    }

    // Detect if they're busy or want to hang up
    if (input.includes("busy") || input.includes("not interested") || input.includes("don't call") || input.includes("remove")) {
      this.state.interestLevel = "low";
      return `I completely understand - I won't take up your time. Just one quick question: are you the person who handles customer inquiries for ${this.businessContext?.companyName || "your business"}? If not, could you point me to the right person?`;
    }

    // Detect if they're interested
    if (input.includes("yes") || input.includes("sure") || input.includes("okay") || input.includes("what is this about")) {
      this.state.stage = "qualification";
      const locationContext = this.businessContext?.location ? ` in ${this.businessContext.location}` : "";
      const businessContext = this.businessContext?.businessType ? ` I see you're a ${this.businessContext.businessType}` : "";
      
      return `Hi ${this.state.prospectName || "there"}, thank you for taking my call! My name is Sarah, and I'm reaching out to local businesses${locationContext}${businessContext ? `, and${businessContext.toLowerCase()}` : ""} about a solution that could save you time and money.

Do you currently handle all your incoming calls manually, or do you have some automation in place?`;
    }

    // Default introduction with local business context
    const locationContext = this.businessContext?.location ? ` in ${this.businessContext.location}` : "";
    const businessContext = this.businessContext?.businessType ? ` I noticed you're a ${this.businessContext.businessType}` : "";
    
    this.state.stage = "qualification";
    
    return `Hi ${this.state.prospectName || "there"}, thank you for taking my call! My name is Sarah, and I'm reaching out to local businesses${locationContext}${businessContext ? `, and${businessContext.toLowerCase()}` : ""} about a solution that could save you time and money.

Do you currently handle all your incoming calls manually, or do you have some automation in place?`;
  }

  private handleQualification(input: string): string {
    // Detect pain points
    if (input.includes("busy") || input.includes("missed") || input.includes("can't answer") || input.includes("don't answer") || input.includes("voicemail")) {
      this.state.painPoints.push("missed-calls");
      this.state.interestLevel = "high";
    }
    if (input.includes("cost") || input.includes("expensive") || input.includes("hiring") || input.includes("receptionist") || input.includes("staff")) {
      this.state.painPoints.push("cost");
    }
    if (input.includes("after hours") || input.includes("weekend") || input.includes("evening") || input.includes("closed") || input.includes("off hours")) {
      this.state.painPoints.push("after-hours");
    }
    if (input.includes("small") || input.includes("just me") || input.includes("solo") || input.includes("owner")) {
      this.state.painPoints.push("small-team");
    }
    if (input.includes("language") || input.includes("spanish") || input.includes("bilingual")) {
      this.state.painPoints.push("multi-language");
    }

    // Detect if they already have a solution
    if (input.includes("already have") || input.includes("using") || input.includes("system") || input.includes("service")) {
      this.state.objections.push("existing-solution");
      this.state.stage = "objection-handling";
      return `That's great that you have something in place! Many businesses we work with started with a basic system but found they needed more. What specific challenges are you still facing with your current setup?`;
    }

    // Move to pitch
    this.state.stage = "pitch";

    return this.buildPitch();
  }

  private handlePitch(input: string): string {
    // Detect interest
    if (input.includes("interesting") || input.includes("tell me more") || input.includes("how much") || input.includes("price") || input.includes("cost")) {
      this.state.interestLevel = "high";
      const starterPlan = AI_AGENT_PLANS.find(p => p.id === "starter");
      const growthPlan = AI_AGENT_PLANS.find(p => p.id === "growth");
      const scalePlan = AI_AGENT_PLANS.find(p => p.id === "scale");
      
      return `Great! We offer three plans to fit different business needs:

Our Starter plan is ${starterPlan?.monthlyPrice ? formatPrice(starterPlan.monthlyPrice) : "$129"} per month and includes ${starterPlan?.features.slice(0, 3).join(", ") || "essential features"}. Perfect for small businesses just getting started.

Our Growth plan is ${growthPlan?.monthlyPrice ? formatPrice(growthPlan.monthlyPrice) : "$299"} per month for businesses with higher call volume - includes ${growthPlan?.features.slice(0, 3).join(", ") || "advanced features"}.

And we have a Scale plan for larger businesses at ${scalePlan?.monthlyPrice ? formatPrice(scalePlan.monthlyPrice) : "$699"} per month with advanced features.

The average business saves $3,000-$5,000 per month compared to hiring a full-time receptionist. Which plan sounds like it might fit your needs?`;
    }

    // Detect objections
    if (input.includes("not interested") || input.includes("don't need") || input.includes("too expensive")) {
      this.state.stage = "objection-handling";
      return this.handleObjection(input);
    }

    return `I understand. Let me share a quick example: one of our clients, a medical practice, was missing 30% of their calls during peak hours. After implementing our AI receptionist, they now capture every call and have increased appointments by 25%. 

Would this kind of improvement be valuable for your business?`;
  }

  private handleObjection(input: string): string {
    if (input.includes("expensive") || input.includes("cost") || input.includes("price")) {
      this.state.objections.push("price");
      const starterPlan = AI_AGENT_PLANS.find(p => p.id === "starter");
      const starterPrice = starterPlan?.monthlyPrice || 129;
      const savings = 3000 - starterPrice;
      
      return `I completely understand cost is a concern. Let me put this in perspective: a full-time receptionist costs $3,000-$4,000 per month, plus benefits. Our Starter plan is ${formatPrice(starterPrice)}/month - that's about ${Math.round((savings / 3000) * 100)}% less expensive, and it works 24/7 without breaks, sick days, or training time.

We also have plans starting at ${formatPrice(starterPrice)}/month that include everything you need. Plus, you can try it risk-free for 30 days. Would you like to hear about our different plans?`;
    }

    if (input.includes("don't need") || input.includes("not interested") || input.includes("happy with")) {
      this.state.interestLevel = "low";
      return `I appreciate your honesty. Just out of curiosity, what's your current process for handling calls when you're unavailable? Many businesses don't realize how many opportunities they're missing until they see the data.`;
    }

    if (input.includes("think about it") || input.includes("later")) {
      this.state.nextAction = "follow-up";
      return `Absolutely, I understand you want to think it over. Would it be okay if I send you some information via email, and maybe we can schedule a quick 10-minute demo call later this week?`;
    }

    // Try to re-engage
    this.state.stage = "pitch";
    return `I hear you. Many of our clients felt the same way initially, but after seeing how it works, they realized it was exactly what they needed. 

Would you be open to a quick 5-minute demo? No pressure, just to see if it could work for your business.`;
  }

  private handleClose(input: string): string {
    if (input.includes("yes") || input.includes("sure") || input.includes("okay")) {
      this.state.nextAction = "schedule-demo";
      return `Excellent! I'll send you a calendar link so you can pick a time that works best for you. The demo takes about 15 minutes and I'll show you exactly how it works for your type of business.

What's the best email to send the calendar link to?`;
    }

    return `No problem at all. Would you like me to send you some information about the solution, or would you prefer I call back at a better time?`;
  }

  private buildPitch(): string {
    const painPointResponses: Record<string, string> = {
      "missed-calls": "I hear you're missing calls - that's exactly what we solve. Our AI receptionist never misses a call, even during your busiest times.",
      "cost": "I understand cost is a concern. Our solution costs 97% less than hiring a full-time receptionist, and it works 24/7.",
      "after-hours": "After-hours coverage is one of our biggest strengths. Your AI receptionist handles calls perfectly, even at 2 AM on weekends.",
      "small-team": "Perfect for small businesses! You get enterprise-level call handling without the enterprise-level cost or hiring headaches.",
      "multi-language": "Great! Our AI speaks 15+ languages fluently, so you can serve all your customers, no matter what language they speak.",
    };

    let pitch = `Perfect! Based on what you've shared, I think our AI Receptionist Pro could be a game-changer for ${this.businessContext?.companyName || "your business"}. `;

    // Address specific pain points
    this.state.painPoints.forEach((pain) => {
      if (painPointResponses[pain]) {
        pitch += painPointResponses[pain] + " ";
      }
    });

    // Add local business context
    const localContext = this.businessContext?.location 
      ? ` I work with several businesses in ${this.businessContext.location}, and they've seen amazing results.`
      : "";

    pitch += `${localContext} Here's what makes it special:

• Never miss a call - handles unlimited calls simultaneously, even during peak hours
• Natural conversations - your customers can't tell it's AI, it sounds completely human
• Automatic scheduling - integrates with your calendar and books appointments automatically
• Multi-language support - serves customers in 15+ languages, perfect for diverse communities
• Detailed analytics - see exactly what's happening with your calls, track missed opportunities
• 24/7 availability - never lose a customer because you're closed

We have plans starting at ${formatPrice(AI_AGENT_PLANS.find(p => p.id === "starter")?.monthlyPrice || 129)} per month, which is less than most businesses spend on coffee. That's about ${Math.round((AI_AGENT_PLANS.find(p => p.id === "starter")?.monthlyPrice || 129) / 30)} dollars a day for a receptionist that never sleeps, never takes breaks, and never calls in sick.

Would you like to hear how it works, or do you have any questions?`;

    return pitch;
  }

  private getDefaultResponse(): string {
    return `I'm here to help you understand how AI Receptionist Pro can transform your business. Would you like to hear more about it, or do you have any questions?`;
  }

  getState(): ConversationState {
    return this.state;
  }

  reset(): void {
    this.state = {
      stage: "introduction",
      painPoints: [],
      objections: [],
      interestLevel: "medium",
      callStartTime: new Date(),
      conversationHistory: [],
    };
  }

  setBusinessContext(context: BusinessContext): void {
    this.businessContext = context;
    this.state.companyName = context.companyName;
    this.state.businessType = context.businessType;
    this.state.location = context.location;
  }

  getConversationHistory(): Array<{ role: "agent" | "prospect"; message: string; timestamp: Date }> {
    return this.state.conversationHistory;
  }

  getCallDuration(): number {
    return Math.floor((new Date().getTime() - this.state.callStartTime.getTime()) / 1000);
  }
}

