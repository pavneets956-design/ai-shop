// Solution categories (what AI Shop builds) + featured builds.
// `icon` is a lucide-react icon name, mapped to a component in lib/icons.ts.

export interface SolutionCategory {
  slug: string;
  name: string;
  icon: string;
  blurb: string;
  examples: string[];
}

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "business-automation",
    name: "Business Automation",
    icon: "Workflow",
    blurb: "Kill the repetitive admin. Quotes, invoices, follow-ups and data entry that run themselves.",
    examples: ["Auto invoice reminders", "Quote generators", "Job/status updates", "Data sync between tools"],
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    icon: "Bot",
    blurb: "Autonomous agents that take action — book, reply, research, qualify — not just chat.",
    examples: ["Lead qualifier", "Outbound caller", "Research agent", "Inbox triage agent"],
  },
  {
    slug: "customer-communication",
    name: "Customer Communication",
    icon: "PhoneCall",
    blurb: "Answer every call, DM and message instantly — 24/7, in your voice.",
    examples: ["AI receptionist", "SMS/WhatsApp responder", "DM auto-reply", "After-hours line"],
  },
  {
    slug: "local-service-tools",
    name: "Local Service Business Tools",
    icon: "Wrench",
    blurb: "Built for trades, clinics, salons and shops — booking, dispatch and reminders that fit how you work.",
    examples: ["Booking assistant", "No-show reminders", "Review collector", "Dispatch helper"],
  },
  {
    slug: "personal-ai-apps",
    name: "Personal AI Apps",
    icon: "Sparkles",
    blurb: "Your own private app — planner, tracker, assistant — built around your life, not a template.",
    examples: ["Personal planner", "Finance tracker", "Study/coach app", "Habit assistant"],
  },
  {
    slug: "content-marketing",
    name: "Content & Marketing",
    icon: "PenTool",
    blurb: "A content engine that writes, repurposes and schedules in your brand voice.",
    examples: ["Content engine", "SEO writer", "Ad copy generator", "Newsletter automation"],
  },
  {
    slug: "website-ai",
    name: "Website AI",
    icon: "Globe",
    blurb: "Add an AI layer to the site you already have — chat, search, lead capture, recommendations.",
    examples: ["Website chatbot", "AI search", "Smart lead forms", "Product recommender"],
  },
  {
    slug: "data-documents",
    name: "Data & Documents",
    icon: "FileSearch",
    blurb: "Turn piles of documents and data into instant answers, summaries and reports.",
    examples: ["Document analyzer", "Contract Q&A", "Report generator", "Data dashboards"],
  },
  {
    slug: "custom-saas",
    name: "Custom SaaS Builds",
    icon: "Boxes",
    blurb: "From idea to a real product — full apps with auth, payments, databases and AI built in.",
    examples: ["SaaS MVP", "Internal tool", "Customer portal", "Marketplace"],
  },
];

export interface FeaturedBuild {
  slug: string;
  title: string;
  forWho: string;
  what: string;
  icon: string;
  accent: "electric" | "violet" | "cyan" | "gold";
  startsAt: number; // CAD, ties to a package floor
  packageId: "starter" | "business" | "custom";
}

export const featuredBuilds: FeaturedBuild[] = [
  {
    slug: "ai-receptionist",
    title: "AI Receptionist",
    forWho: "Service businesses that miss calls",
    what: "Answers calls & messages 24/7, books appointments, and texts you the details.",
    icon: "PhoneCall",
    accent: "electric",
    startsAt: 750,
    packageId: "starter",
  },
  {
    slug: "ai-lead-follow-up-agent",
    title: "AI Lead Follow-Up Agent",
    forWho: "Anyone losing leads to slow replies",
    what: "Instantly replies to new leads, qualifies them, and follows up until they book.",
    icon: "Magnet",
    accent: "violet",
    startsAt: 2500,
    packageId: "business",
  },
  {
    slug: "ai-invoice-reminder-system",
    title: "AI Invoice Reminder System",
    forWho: "Businesses chasing unpaid invoices",
    what: "Automatically nudges clients on overdue invoices — politely, on schedule, until paid.",
    icon: "Receipt",
    accent: "cyan",
    startsAt: 750,
    packageId: "starter",
  },
  {
    slug: "ai-content-engine",
    title: "AI Content Engine",
    forWho: "Creators & marketers",
    what: "Generates and repurposes content in your brand voice, ready to schedule.",
    icon: "PenTool",
    accent: "gold",
    startsAt: 2500,
    packageId: "business",
  },
  {
    slug: "ai-customer-support-bot",
    title: "AI Customer Support Bot",
    forWho: "Teams drowning in repeat questions",
    what: "Resolves common questions instantly and hands the hard ones to a human.",
    icon: "Headphones",
    accent: "electric",
    startsAt: 750,
    packageId: "starter",
  },
  {
    slug: "ai-personal-planner",
    title: "AI Personal Planner",
    forWho: "Busy people & solo founders",
    what: "A private app that plans your day, tracks goals, and keeps you on top of everything.",
    icon: "CalendarCheck",
    accent: "violet",
    startsAt: 7500,
    packageId: "custom",
  },
  {
    slug: "ai-business-dashboard",
    title: "AI Business Dashboard",
    forWho: "Owners flying blind on numbers",
    what: "One screen with your real numbers, plain-language insights, and what to do next.",
    icon: "BarChart3",
    accent: "cyan",
    startsAt: 2500,
    packageId: "business",
  },
  {
    slug: "ai-website-chatbot",
    title: "AI Website Chatbot",
    forWho: "Any site that wants more conversions",
    what: "A chatbot trained on your site that answers visitors and captures leads.",
    icon: "MessagesSquare",
    accent: "gold",
    startsAt: 750,
    packageId: "starter",
  },
];

export function getBuild(slug: string): FeaturedBuild | undefined {
  return featuredBuilds.find((b) => b.slug === slug);
}
