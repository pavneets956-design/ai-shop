// Shop storefront catalog — the 5 "ready-to-install" lead products.
// Each maps to an existing /services/<slug> detail page (the SEO engine) and,
// where available, a live /demo. Pricing is one-time (strategy-locked) — the
// optional AI Care Plan ($250/mo) keeps a build running. No payment code here.

export interface ShopProduct {
  /** Maps to an existing /services/<slug> landing page. */
  slug: string;
  /** Result-named — describes the outcome, not the tech. */
  name: string;
  /** lucide-react icon name (see lib/icons.ts). */
  icon: string;
  accent: "electric" | "violet" | "cyan" | "gold";
  /** The pain, in the buyer's words. */
  problem: string;
  /** What it does + the result, first sentence. */
  outcome: string;
  forWho: string;
  /** Exact tool names the buyer already uses — makes it feel real. */
  integrations: string[];
  /** Fulfillment model. Handbuilt is done-for-you by default. */
  delivery: "Done-for-you" | "Done-with-you";
  /** Honest time-to-live. */
  timeToLaunch: string;
  /** One-time price label (CAD). */
  priceLabel: string;
  packageId: "starter" | "business" | "custom";
  /** Live demo on this site, if one exists. */
  demoHref?: string;
}

export const shopProducts: ShopProduct[] = [
  {
    slug: "ai-receptionist-setup",
    name: "AI Receptionist",
    icon: "PhoneCall",
    accent: "electric",
    problem: "You miss calls while you're on a job — and those callers dial the next business on the list.",
    outcome:
      "Answers every call and message 24/7, captures the job details, and books the appointment straight into your calendar.",
    forWho: "Trades, clinics, salons & local services losing leads to voicemail.",
    integrations: ["Twilio", "Google Calendar", "Your website"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    priceLabel: "$1,000 · built for you",
    packageId: "starter",
    demoHref: "/demo",
  },
  {
    slug: "ai-quote-generator",
    name: "AI Quote Generator",
    icon: "TrendingUp",
    accent: "gold",
    problem: "Website visitors send vague “how much?” messages, then go cold before you can reply.",
    outcome:
      "Asks the right questions, returns a smart estimate range, and sends you a clean lead with budget, location and urgency.",
    forWho: "Landscapers, movers, cleaners, painters & contractors who quote a lot.",
    integrations: ["Website form", "Google Sheets", "Stripe", "Your CRM"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    priceLabel: "$1,000 · built for you",
    packageId: "starter",
    demoHref: "/demo/quote",
  },
  {
    slug: "ai-lead-capture-form",
    name: "AI Lead Capture & Follow-Up",
    icon: "Magnet",
    accent: "violet",
    problem: "New leads sit in your inbox too long, and warm quotes never get a second touch.",
    outcome:
      "Replies instantly, qualifies the lead, and follows up by email or text until they book — so nothing goes cold.",
    forWho: "Anyone losing revenue to slow replies and no follow-up.",
    integrations: ["Gmail / Outlook", "Twilio SMS", "HubSpot / GoHighLevel"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in 2–3 weeks",
    priceLabel: "From $2,500 · built for you",
    packageId: "business",
    demoHref: "/demo/lead",
  },
  {
    slug: "ai-chatbot-for-website",
    name: "AI Website Sales Assistant",
    icon: "MessagesSquare",
    accent: "electric",
    problem: "Your website just sits there — visitors leave with questions instead of booking.",
    outcome:
      "A chatbot trained on your business answers FAQs, explains your services, and captures the lead or books the call.",
    forWho: "Any business whose website should be selling, not just informing.",
    integrations: ["Any website", "Gmail", "Google Calendar"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    priceLabel: "$1,000 · built for you",
    packageId: "starter",
    demoHref: "/demo/assistant",
  },
  {
    slug: "ai-invoice-reminder-system",
    name: "AI Invoice & Payment Nudge",
    icon: "Receipt",
    accent: "cyan",
    problem: "You hate chasing unpaid invoices — so you put it off and get paid late.",
    outcome:
      "Sends polite, on-brand reminders on a schedule until the invoice is paid. No awkward phone calls.",
    forWho: "Service businesses & contractors tired of chasing payments.",
    integrations: ["Stripe", "QuickBooks", "Gmail"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    priceLabel: "$1,000 · built for you",
    packageId: "starter",
    demoHref: "/demo/nudge",
  },
];

// Industry tiles — each maps to an existing /industries/<slug> page.
export const shopIndustries: { slug: string; label: string }[] = [
  { slug: "landscaping-ai-automation", label: "Landscaping" },
  { slug: "lawn-care-ai-automation", label: "Lawn care" },
  { slug: "plumber-ai-automation", label: "Plumbers" },
  { slug: "electrician-ai-automation", label: "Electricians" },
  { slug: "hvac-ai-automation", label: "HVAC" },
  { slug: "roofing-ai-automation", label: "Roofers" },
  { slug: "contractor-ai-automation", label: "Contractors" },
  { slug: "cleaning-business-ai-automation", label: "Cleaning" },
  { slug: "moving-company-ai-automation", label: "Movers" },
  { slug: "dental-clinic-ai-automation", label: "Clinics" },
  { slug: "salon-ai-automation", label: "Salons" },
  { slug: "auto-detailing-ai-automation", label: "Auto detailing" },
];
