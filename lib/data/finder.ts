import { getPackage, formatPackagePrice } from "./packages";
import { featuredBuilds } from "./solutions";

// ---------- Finder inputs ----------
export interface Outcome {
  id: string;
  label: string;
  icon: string;
  blurb: string;
  defaultPackage: "starter" | "business" | "custom";
  buildSlugs: string[];
}

export const outcomes: Outcome[] = [
  {
    id: "more-leads",
    label: "Get more leads",
    icon: "Magnet",
    blurb: "Capture, qualify and follow up automatically.",
    defaultPackage: "business",
    buildSlugs: ["ai-lead-follow-up-agent", "ai-website-chatbot"],
  },
  {
    id: "answer-calls",
    label: "Answer calls & messages",
    icon: "PhoneCall",
    blurb: "Never miss a call, DM or text again.",
    defaultPackage: "starter",
    buildSlugs: ["ai-receptionist", "ai-customer-support-bot"],
  },
  {
    id: "save-time",
    label: "Save time on admin",
    icon: "Clock",
    blurb: "Automate the boring, repetitive work.",
    defaultPackage: "business",
    buildSlugs: ["ai-invoice-reminder-system", "ai-business-dashboard"],
  },
  {
    id: "create-content",
    label: "Create content faster",
    icon: "PenTool",
    blurb: "A content engine in your brand voice.",
    defaultPackage: "business",
    buildSlugs: ["ai-content-engine"],
  },
  {
    id: "build-app",
    label: "Build an app or tool",
    icon: "Boxes",
    blurb: "A real, custom app you own.",
    defaultPackage: "custom",
    buildSlugs: ["ai-personal-planner", "ai-business-dashboard"],
  },
  {
    id: "add-ai-website",
    label: "Add AI to my website",
    icon: "Globe",
    blurb: "Chat, search & lead capture on your site.",
    defaultPackage: "starter",
    buildSlugs: ["ai-website-chatbot", "ai-customer-support-bot"],
  },
  {
    id: "build-agent",
    label: "Build an AI agent",
    icon: "Bot",
    blurb: "An agent that takes action, not just chats.",
    defaultPackage: "business",
    buildSlugs: ["ai-lead-follow-up-agent"],
  },
  {
    id: "not-sure",
    label: "Not sure — help me figure it out",
    icon: "Sparkles",
    blurb: "Answer a couple of questions and we'll map it.",
    defaultPackage: "business",
    buildSlugs: ["ai-receptionist", "ai-lead-follow-up-agent"],
  },
];

export const industries = [
  { id: "trades", label: "Trades / contractor" },
  { id: "real-estate", label: "Real estate" },
  { id: "restaurant", label: "Restaurant / food" },
  { id: "clinic", label: "Clinic / health" },
  { id: "salon", label: "Salon / beauty" },
  { id: "ecommerce", label: "E-commerce / retail" },
  { id: "creator", label: "Creator / coach" },
  { id: "startup", label: "Startup / founder" },
  { id: "other", label: "Something else" },
];

export const volumes = [
  { id: "low", label: "A handful a week" },
  { id: "mid", label: "10–50 a week" },
  { id: "high", label: "50+ a week" },
];

export const currentTools = [
  { id: "nothing", label: "Nothing yet" },
  { id: "website", label: "A website" },
  { id: "crm", label: "A CRM" },
  { id: "social", label: "Social / DMs" },
  { id: "booking", label: "A booking tool" },
];

// ---------- Shared recommendation shape (client + API) ----------
export interface FinderInput {
  outcome: string;
  industry?: string;
  volume?: string;
  tools?: string[];
}

export interface Recommendation {
  packageId: "starter" | "business" | "custom";
  packageName: string;
  priceLabel: string;
  timeline: string;
  headline: string;
  intro: string;
  buildSlugs: string[];
  bullets: string[];
  timeSaved: string;
  source: "ai" | "rules";
}

// Rules-based recommendation — instant, zero-cost, and the API fallback.
// The LLM only ever *personalizes* on top of these fixed packages & prices.
export function recommend(input: FinderInput): Recommendation {
  const outcome = outcomes.find((o) => o.id === input.outcome) ?? outcomes[outcomes.length - 1];

  // Volume can bump a starter recommendation up to a system.
  let packageId = outcome.defaultPackage;
  if (input.volume === "high" && packageId === "starter") packageId = "business";

  const pkg = getPackage(packageId)!;
  const builds = outcome.buildSlugs
    .map((slug) => featuredBuilds.find((b) => b.slug === slug))
    .filter(Boolean)
    .slice(0, 3) as typeof featuredBuilds;

  const industryLabel = industries.find((i) => i.id === input.industry)?.label;
  const who = industryLabel ? industryLabel.toLowerCase() : "business";

  const intro = `Here's what I'd build for a ${who} that wants to ${outcome.label.toLowerCase()}${
    input.volume ? ` and handles ${volumes.find((v) => v.id === input.volume)?.label.toLowerCase()}` : ""
  }:`;

  const bullets = builds.map((b) => `${b.title} — ${b.what}`);

  const timeSaved =
    packageId === "custom" ? "10+ hrs/week" : packageId === "business" ? "~8 hrs/week" : "~4 hrs/week";

  return {
    packageId,
    packageName: pkg.name,
    priceLabel: formatPackagePrice(pkg),
    timeline: pkg.timeline,
    headline: `Recommended for you: ${pkg.name}`,
    intro,
    buildSlugs: builds.map((b) => b.slug),
    bullets,
    timeSaved,
    source: "rules",
  };
}
