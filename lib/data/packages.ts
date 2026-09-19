export type PriceFormat = "flat" | "from" | "band" | "quote";

export interface ServicePackage {
  id: "starter" | "business" | "custom";
  name: string;
  tagline: string;
  price: number; // CAD (the floor)
  priceHigh?: number; // upper bound for "band" format
  priceTypical?: number; // "most land around" figure
  priceFormat: PriceFormat;
  timeline: string;
  forWho: string;
  highlight?: boolean;
  badge?: string;
  includes: string[];
  cta: { label: string; href: string };
  accent: "electric" | "violet" | "cyan";
}

// Pricing locked via strategy consult. CAD. "Hard to say no to, not cheap."
export const packages: ServicePackage[] = [
  {
    id: "starter",
    name: "AI Starter System",
    tagline: "One AI worker, live in days.",
    price: 1500,
    priceFormat: "from",
    timeline: "Live in ~5 business days",
    forWho: "Best if you want to start with one focused win and test before scaling.",
    accent: "electric",
    includes: [
      "One focused AI worker (chatbot, quote intake, follow-up, or review replies)",
      "Trained on your services, pricing, hours & FAQs",
      "Connected to one channel (website, SMS, email, or WhatsApp)",
      "~5 business days to launch + 14 days of tweaks",
    ],
    cta: { label: "Start with Starter", href: "/create?package=starter" },
  },
  {
    id: "business",
    name: "AI Business System",
    tagline: "2–4 connected AI workers, one system.",
    price: 3500,
    priceHigh: 7500,
    priceTypical: 5000,
    priceFormat: "band",
    timeline: "Live in 2–3 weeks",
    forWho: "Best for businesses losing money to slow replies and manual admin.",
    highlight: true,
    badge: "Connected workflows",
    accent: "violet",
    includes: [
      "2–4 connected AI workers running as one system",
      "Integrates with your CRM, calendar, email, payments",
      "Automated workflows: call handling, quotes, lead follow-up",
      "Simple dashboard + 30 days of hands-on tuning",
    ],
    cta: { label: "Build my system", href: "/create?package=business" },
  },
  {
    id: "custom",
    name: "Custom AI App",
    tagline: "A full app or platform you own.",
    price: 10000,
    priceFormat: "from",
    timeline: "Typically 4–8 weeks, scoped on a call",
    forWho: "Best when you've outgrown off-the-shelf tools and need something custom.",
    accent: "cyan",
    includes: [
      "Full custom app, portal, internal tool, or SaaS MVP",
      "Custom AI logic built around your data & rules",
      "Accounts, database, admin, integrations as needed",
      "Built on a modern stack you own — 60 days support",
    ],
    cta: { label: "Request a quote", href: "/create?package=custom" },
  },
];

export interface CarePlan {
  name: string;
  monthly: number;
  annualMonthly: number;
  covers: string[];
}

export const carePlan: CarePlan = {
  name: "Care Plan",
  monthly: 99, // entry "Light Care" tier; plans scale to ~$499/mo for multi-worker systems
  annualMonthly: 79, // billed annually
  covers: [
    "Hosting & uptime monitoring",
    "Up to 1 hour of tweaks/changes per month",
    "API usage tracking with cost alerts",
    "Priority support (same/next business day)",
    "Monthly performance summary",
  ],
};

/** Existing phone-service price, centralised from PhoneReceptionistPlan. */
export const phonePlan = {
  monthly: 250,
  usage: "Phone and AI provider usage is additional; estimates and limits are agreed before launch.",
};

const nf = new Intl.NumberFormat("en-CA");

export function formatPackagePrice(
  p: Pick<ServicePackage, "price" | "priceHigh" | "priceFormat">
): string {
  const amount = `$${nf.format(p.price)}`;
  if (p.priceFormat === "flat") return amount;
  if (p.priceFormat === "from") return `From ${amount}`;
  if (p.priceFormat === "band")
    return p.priceHigh ? `${amount}–$${nf.format(p.priceHigh)}` : `From ${amount}`;
  return "Request quote";
}

export function getPackage(id: string): ServicePackage | undefined {
  return packages.find((p) => p.id === id);
}

/**
 * Canonical price label per package — the single place prose/UI should pull
 * from instead of hand-typing a range. Owner-approved 2026-07-31:
 * Starter from $1,500 · Business $3,500–$7,500 · Custom from $10,000 (CAD).
 * Hand-typed copies of these numbers are what produced the P0 contradiction.
 */
export function packagePriceLabel(id: ServicePackage["id"]): string {
  const p = getPackage(id);
  return p ? formatPackagePrice(p) : "Request quote";
}

/** Approved long-form wording for the Business AI System, where space permits. */
export const BUSINESS_SYSTEM_SENTENCE =
  `From $${nf.format(packages[1].price)} CAD. Most connected back-office systems cost ` +
  `$${nf.format(packages[1].price)}–$${nf.format(packages[1].priceHigh!)} CAD after scope is confirmed.`;

/** PayNudge's universal terms, verified against paynudge.xyz/pricing on 2026-09-18. */
export const PAYNUDGE_PRICING_SUMMARY =
  "CA$2 once per overdue invoice after its first qualifying email reminder is confirmed delivered to the receiving server. " +
  "Later follow-ups stay included, even across billing months. CA$29 cap per monthly billing period before tax; " +
  "CA$0 with no qualifying usage. Same CAD pricing worldwide. 14-day trial without a card; payment setup required afterward.";
