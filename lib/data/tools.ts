// Self-serve AI tools — the paid "Tools Pro" suite. A single subscription
// (NextAuth sign-in + Stripe, gated via getSubStatus) unlocks all of them;
// they also funnel into the done-for-you systems in the shop.
// UI config + SEO live here; the prompts live server-side in app/api/tools/route.ts
// (keyed by `kind`). Add a tool by adding an entry + a prompt case — no new route.

export type ToolFieldType = "text" | "textarea" | "select";

export interface ToolField {
  key: string;
  label: string;
  type: ToolFieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export type ToolKind =
  | "proposal"
  | "estimate"
  | "review"
  | "brief"
  | "reminder"
  | "quote"
  | "sop"
  | "hiring"
  | "winback";

export interface SelfServeTool {
  slug: string;
  kind: ToolKind;
  name: string;
  /** One-line value prop. */
  tagline: string;
  /** The pain it removes, in plain words. */
  problem: string;
  icon: string;
  accent: "electric" | "violet" | "cyan" | "gold";
  fields: ToolField[];
  submitLabel: string;
  resultTitle: string;
  /** Show a copy button on the result. */
  copyable: boolean;
  /** Show a "Print / Save as PDF" button (for docs like proposals). */
  printable: boolean;
  /** Which done-for-you build this feeds, for the upsell CTA. */
  funnelBuild: string;
  /** SEO. */
  seoTitle: string;
  seoDescription: string;
}

export const selfServeTools: SelfServeTool[] = [
  {
    slug: "proposal-generator",
    kind: "proposal",
    name: "AI Proposal Generator",
    tagline: "A polished client proposal in 30 seconds.",
    problem: "Writing proposals eats an hour you don't have — so they go out late, or not at all.",
    icon: "PenTool",
    accent: "violet",
    fields: [
      { key: "yourBusiness", label: "Your business", type: "text", placeholder: "e.g. Northside Renovations", required: true },
      { key: "businessType", label: "What you do", type: "text", placeholder: "e.g. Home renovations & remodels", required: true },
      { key: "clientName", label: "Client name", type: "text", placeholder: "e.g. The Patels", required: true },
      { key: "project", label: "The project / service", type: "textarea", placeholder: "Describe the job you're proposing — scope, deliverables, anything specific.", required: true },
      { key: "price", label: "Price", type: "text", placeholder: "e.g. $14,500" },
      { key: "timeline", label: "Timeline", type: "text", placeholder: "e.g. 4–6 weeks, starting July" },
      { key: "notes", label: "Anything else (optional)", type: "textarea", placeholder: "Payment terms, what's included/excluded, special notes…" },
    ],
    submitLabel: "Generate my proposal",
    resultTitle: "Your proposal",
    copyable: true,
    printable: true,
    funnelBuild: "ai-lead-capture-form",
    seoTitle: "Free AI Proposal Generator — Polished Client Proposals in Seconds",
    seoDescription:
      "Generate a professional client proposal — scope, pricing, timeline, terms and a cover email — in seconds. Free AI proposal generator for freelancers, contractors and agencies.",
  },
  {
    slug: "quote-estimate-generator",
    kind: "estimate",
    name: "AI Quote & Estimate Generator",
    tagline: "Turn a job description into a ballpark quote.",
    problem: "Pricing on the fly is slow and inconsistent — and slow quotes lose jobs.",
    icon: "TrendingUp",
    accent: "gold",
    fields: [
      {
        key: "industry",
        label: "Industry",
        type: "select",
        required: true,
        options: ["Landscaping", "Lawn care", "Cleaning", "Painting", "Moving", "Plumbing", "Electrical", "Roofing", "Renovation", "Web design", "Other"],
      },
      { key: "job", label: "The job", type: "textarea", placeholder: "Describe the work — what, how big, condition, access…", required: true },
      { key: "scope", label: "Size / scope", type: "text", placeholder: "e.g. 1/4-acre yard, 3 rooms, 1,800 sq ft" },
      { key: "location", label: "Location (optional)", type: "text", placeholder: "e.g. Surrey, BC" },
    ],
    submitLabel: "Estimate this job",
    resultTitle: "Your estimate",
    copyable: true,
    printable: true,
    funnelBuild: "ai-quote-generator",
    seoTitle: "Free AI Quote & Estimate Generator for Service Businesses",
    seoDescription:
      "Describe a job and get an instant ballpark estimate with a labour/materials breakdown and a customer-ready quote. Free AI quote generator for trades and local service businesses.",
  },
  {
    slug: "review-reply-generator",
    kind: "review",
    name: "AI Review Reply Generator",
    tagline: "Reply to any Google review in your voice.",
    problem: "Reviews sit unanswered — and a blank reply box is its own kind of writer's block.",
    icon: "MessagesSquare",
    accent: "electric",
    fields: [
      { key: "businessName", label: "Your business (optional)", type: "text", placeholder: "e.g. Brightsmile Dental" },
      { key: "rating", label: "Star rating", type: "select", required: true, options: ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"] },
      { key: "review", label: "The review", type: "textarea", placeholder: "Paste the customer's review here…", required: true },
      { key: "tone", label: "Tone", type: "select", options: ["Warm & friendly", "Professional", "Short & simple"] },
    ],
    submitLabel: "Write my replies",
    resultTitle: "Reply options",
    copyable: true,
    printable: false,
    funnelBuild: "ai-receptionist-setup",
    seoTitle: "Free AI Google Review Reply Generator",
    seoDescription:
      "Paste a Google review and get friendly, professional and short reply options in seconds — including the right way to handle negative reviews. Free AI review reply generator.",
  },
  {
    slug: "business-brief-generator",
    kind: "brief",
    name: "AI Business & Website Brief Generator",
    tagline: "Turn an idea into a complete business brief.",
    problem: "You have the idea but staring at a blank page — name, services, pages, copy — stalls you.",
    icon: "Rocket",
    accent: "cyan",
    fields: [
      { key: "idea", label: "Your business idea", type: "textarea", placeholder: "What's the business? What do you sell or do, and to whom?", required: true },
      { key: "audience", label: "Who it's for", type: "text", placeholder: "e.g. Busy homeowners in Greater Vancouver" },
      { key: "vibe", label: "Brand vibe (optional)", type: "text", placeholder: "e.g. Premium but friendly, local, trustworthy" },
    ],
    submitLabel: "Build my brief",
    resultTitle: "Your business brief",
    copyable: true,
    printable: true,
    funnelBuild: "ai-chatbot-for-website",
    seoTitle: "Free AI Business & Website Brief Generator",
    seoDescription:
      "Answer a few questions and get a complete brief — brand idea, services, website pages, hero copy, SEO keywords and FAQs. Free AI business plan & website brief generator.",
  },
  {
    slug: "invoice-reminder-generator",
    kind: "reminder",
    name: "AI Invoice Reminder Generator",
    tagline: "Polite payment reminders, written for you.",
    problem: "Chasing late invoices is awkward, so you put it off and get paid even later.",
    icon: "Receipt",
    accent: "gold",
    fields: [
      { key: "client", label: "Client name", type: "text", placeholder: "e.g. Dave at Marlin Cafe", required: true },
      { key: "amount", label: "Amount owed", type: "text", placeholder: "e.g. $1,250", required: true },
      { key: "dueInfo", label: "Due date / days overdue", type: "text", placeholder: "e.g. Due June 1 — 14 days overdue" },
      { key: "tone", label: "Tone", type: "select", required: true, options: ["Friendly first reminder", "Firm but polite", "Final notice (still professional)"] },
    ],
    submitLabel: "Write my reminders",
    resultTitle: "Reminder options",
    copyable: true,
    printable: false,
    funnelBuild: "ai-invoice-reminder-system",
    seoTitle: "Free AI Invoice & Payment Reminder Generator",
    seoDescription:
      "Get polite, professional payment-reminder messages — email, SMS and final notice — written for you in seconds. Free AI invoice reminder generator for freelancers and small businesses.",
  },
  {
    slug: "quote-builder",
    kind: "quote",
    name: "AI Quote Builder",
    tagline: "Turn one job into a 3-tier quote that sells.",
    problem: "A flat price gets haggled. Good/Better/Best gets chosen — but building three options by hand is a pain.",
    icon: "Layers",
    accent: "gold",
    fields: [
      { key: "yourBusiness", label: "Your business", type: "text", placeholder: "e.g. Greenline Landscaping" },
      {
        key: "industry",
        label: "Trade / industry",
        type: "select",
        required: true,
        options: ["Landscaping", "Lawn care", "Cleaning", "Painting", "Moving", "Plumbing", "Electrical", "Roofing", "Renovation", "Auto detailing", "Other"],
      },
      { key: "job", label: "The job", type: "textarea", placeholder: "Describe the work — what, how big, condition, access, and anything the customer asked for.", required: true },
      { key: "target", label: "Budget or ask (optional)", type: "text", placeholder: "e.g. They mentioned ~$3k, or wants it done before the long weekend" },
    ],
    submitLabel: "Build my 3-tier quote",
    resultTitle: "Your quote options",
    copyable: true,
    printable: true,
    funnelBuild: "ai-quote-generator",
    seoTitle: "Free AI Quote Builder — Good/Better/Best Quotes for Trades",
    seoDescription:
      "Turn a job description into a professional three-tier quote (Basic, Better, Premium) with upsells and a customer-ready message. Free AI quote builder for landscapers, contractors and local service businesses.",
  },
  {
    slug: "sop-builder",
    kind: "sop",
    name: "AI SOP Builder",
    tagline: "Turn how you do it into a step-by-step SOP.",
    problem: "Everything lives in your head, so training a new hire means repeating yourself — and quality slips when you're not watching.",
    icon: "Workflow",
    accent: "cyan",
    fields: [
      { key: "yourBusiness", label: "Your business (optional)", type: "text", placeholder: "e.g. Spotless Move-Outs" },
      { key: "task", label: "The task or process", type: "textarea", placeholder: "Describe how you do it — e.g. how we mow a lawn, how we clean a move-out, how we close up the shop.", required: true },
      { key: "doneBy", label: "Who usually does it (optional)", type: "text", placeholder: "e.g. A two-person crew" },
      { key: "tools", label: "Tools / equipment (optional)", type: "text", placeholder: "e.g. Mower, trimmer, blower, tarps" },
    ],
    submitLabel: "Build my SOP",
    resultTitle: "Your SOP",
    copyable: true,
    printable: true,
    funnelBuild: "ai-operations-dashboard",
    seoTitle: "Free AI SOP Builder — Standard Operating Procedures in Seconds",
    seoDescription:
      "Describe a task and get a complete SOP — steps, a quality checklist, common mistakes and training notes — ready to hand a new employee. Free AI SOP and process-documentation generator for small businesses.",
  },
  {
    slug: "hiring-assistant",
    kind: "hiring",
    name: "AI Hiring Assistant",
    tagline: "A job ad + screening kit in one go.",
    problem: "Hiring eats time you don't have — writing the ad, then wading through unqualified applicants.",
    icon: "FileSearch",
    accent: "violet",
    fields: [
      { key: "business", label: "Your business", type: "text", placeholder: "e.g. Westside Plumbing", required: true },
      { key: "role", label: "The role", type: "text", placeholder: "e.g. Apprentice plumber, front-desk receptionist", required: true },
      { key: "employment", label: "Type", type: "select", options: ["Full-time", "Part-time", "Seasonal", "Contract", "Casual"] },
      { key: "requirements", label: "Key requirements (optional)", type: "textarea", placeholder: "Must-haves, certifications, experience, and a pay range if you want it in the ad." },
      { key: "location", label: "Location (optional)", type: "text", placeholder: "e.g. Surrey, BC" },
    ],
    submitLabel: "Build my hiring kit",
    resultTitle: "Your hiring kit",
    copyable: true,
    printable: true,
    funnelBuild: "ai-lead-capture-form",
    seoTitle: "Free AI Hiring Assistant — Job Ads & Applicant Screening",
    seoDescription:
      "Get a ready-to-post job ad, screening questions, a scoring rubric and interview questions in seconds. Free AI hiring assistant for small businesses and local trades with no HR team.",
  },
  {
    slug: "customer-reactivation",
    kind: "winback",
    name: "AI Customer Re-Activation",
    tagline: "Win back past customers with one message.",
    problem: "Last year's customers are your cheapest source of new jobs — but nobody has time to reach back out.",
    icon: "Magnet",
    accent: "electric",
    fields: [
      { key: "business", label: "Your business", type: "text", placeholder: "e.g. Bright Spark Electrical", required: true },
      { key: "customers", label: "Who you're reaching", type: "textarea", placeholder: "e.g. Customers from last spring who booked a one-time clean and never came back.", required: true },
      { key: "service", label: "What to offer them", type: "text", placeholder: "e.g. A seasonal tune-up, a repeat booking, a new service" },
      { key: "incentive", label: "Incentive (optional)", type: "text", placeholder: "e.g. 10% off this month — only if you actually want to offer one" },
    ],
    submitLabel: "Write my win-back campaign",
    resultTitle: "Your re-activation campaign",
    copyable: true,
    printable: false,
    funnelBuild: "ai-customer-reactivation",
    seoTitle: "Free AI Customer Re-Activation & Win-Back Message Generator",
    seoDescription:
      "Turn your list of past customers into a friendly win-back campaign — email, SMS, a follow-up and an offer idea — in seconds. Free AI customer re-activation generator for local service businesses.",
  },
];

export function getTool(slug: string): SelfServeTool | undefined {
  return selfServeTools.find((t) => t.slug === slug);
}
