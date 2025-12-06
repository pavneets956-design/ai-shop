/**
 * AI Agent Pricebook
 * 
 * Centralized pricing structure for AI Receptionist / Cold Calling service.
 * Used in:
 * - UI (Agent dashboard, Settings)
 * - AI conversations (agent can discuss pricing naturally)
 * 
 * To update pricing: Edit the AI_AGENT_PLANS array below.
 * 
 * Internal cost per AI-handled call: ~$0.08 (Twilio + OpenAI)
 * These prices provide healthy profit margins.
 */

export type PlanId = "starter" | "growth" | "scale" | "payg";

export interface PricePlan {
  id: PlanId;
  name: string;
  monthlyPrice?: number;       // undefined for pay-as-you-go
  perCallPrice?: number;       // for pay-as-you-go
  includedCalls: number | "usage"; // "usage" for pay-as-you-go
  maxNumbers: number | "usage";
  description: string;
  bestFor: string;
  features: string[];
}

export const AI_AGENT_PLANS: PricePlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 129,
    includedCalls: 300,
    maxNumbers: 1,
    description: "Perfect entry-level AI receptionist for smaller local businesses.",
    bestFor: "Solo operators, small shops, and early-stage businesses that miss calls during the day.",
    features: [
      "AI receptionist for 1 business number",
      "Up to 300 AI-handled calls per month",
      "Basic call routing and information capture",
      "Simple appointment booking via SMS or email summary",
      "Missed call callback automation"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 299,
    includedCalls: 1000,
    maxNumbers: 3,
    description: "Most popular plan for busy local businesses that run on phone calls.",
    bestFor: "Salons, restaurants, trades, clinics, and service businesses with steady daily call volume.",
    features: [
      "AI receptionist for up to 3 phone numbers or locations",
      "Up to 1,000 AI-handled calls per month",
      "Calendar integration for booking and rescheduling",
      "Lead qualification tags and call outcomes",
      "Call summaries and transcripts in the dashboard",
      "Automatic follow-up SMS after important calls"
    ]
  },
  {
    id: "scale",
    name: "Scale",
    monthlyPrice: 699,
    includedCalls: 3000,
    maxNumbers: 10,
    description: "High-volume AI call handling for agencies and multi-location operations.",
    bestFor: "Agencies, multi-location businesses, franchises, or heavy outbound/cold-calling teams.",
    features: [
      "AI receptionist + outbound campaigns for up to 10 numbers",
      "Up to 3,000 AI-handled calls per month",
      "Custom scripts per campaign or department",
      "Advanced lead scoring and deal tracking",
      "Full call recordings, transcripts, and exports",
      "Analytics dashboard with call metrics and conversions"
    ]
  },
  {
    id: "payg",
    name: "Pay-as-you-go",
    perCallPrice: 0.35,
    includedCalls: "usage",
    maxNumbers: "usage",
    description: "No monthly commitment. Only pay for the calls the AI actually handles.",
    bestFor: "Very small businesses or people who want to try the AI receptionist without a subscription.",
    features: [
      "No monthly subscription fee",
      "Pay only $0.35 per AI-handled call",
      "Same high-quality AI receptionist",
      "Great for testing or seasonal businesses"
    ]
  }
];

/**
 * Get a plan by ID
 */
export function getPlan(planId: PlanId): PricePlan | undefined {
  return AI_AGENT_PLANS.find((plan) => plan.id === planId);
}

/**
 * Get the most popular/recommended plan (Growth)
 */
export function getRecommendedPlan(): PricePlan {
  return getPlan("growth") || AI_AGENT_PLANS[1];
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

/**
 * Get pricing summary for AI conversations
 * Returns a natural language description of plans for system prompts
 */
export function getPricingSummary(): string {
  return AI_AGENT_PLANS.map((plan) => {
    if (plan.monthlyPrice) {
      return `${plan.name}: $${plan.monthlyPrice}/month for ${plan.includedCalls} calls and up to ${plan.maxNumbers} numbers. Best for: ${plan.bestFor}.`;
    }
    if (plan.perCallPrice) {
      return `${plan.name}: pay-as-you-go at $${plan.perCallPrice.toFixed(2)} per AI-handled call. Best for: ${plan.bestFor}.`;
    }
    return "";
  }).filter(Boolean).join(" ");
}

/**
 * Find the best plan for a prospect based on their needs
 */
export function recommendPlan(callVolume?: number, locations?: number): PricePlan {
  if (!callVolume && !locations) {
    return getRecommendedPlan();
  }

  // If they need more than 3000 calls, recommend Scale
  if (callVolume && callVolume > 3000) {
    return getPlan("scale") || AI_AGENT_PLANS[2];
  }

  // If they need more than 1000 calls or more than 3 locations, recommend Scale
  if ((callVolume && callVolume > 1000) || (locations && locations > 3)) {
    return getPlan("scale") || AI_AGENT_PLANS[2];
  }

  // If they need more than 300 calls or more than 1 location, recommend Growth
  if ((callVolume && callVolume > 300) || (locations && locations > 1)) {
    return getPlan("growth") || AI_AGENT_PLANS[1];
  }

  // Default to Starter
  return getPlan("starter") || AI_AGENT_PLANS[0];
}

