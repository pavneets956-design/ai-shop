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

const nf = new Intl.NumberFormat("en-CA");

/**
 * AI Phone Receptionist — owner-approved LAUNCH PRICING (CAD). This is the
 * only place the receptionist's commercial terms live. It is a separate,
 * narrow offer: it is NOT the Starter build ($1,500) and NOT a Business system.
 *
 * "Launch pricing" names the price. It is not a claim that any particular
 * phone line is live or has passed testing — each setup goes live only after
 * its own test calls and handover.
 *
 * Must never be described as: unlimited calls or support, no monthly fee,
 * provider usage charged on top of the included minutes, or including booking,
 * CRM, SMS or a dashboard. No uptime, outcome or job-booking guarantees.
 */
export const phonePlan = {
  id: "phone" as const,
  name: "AI Phone Receptionist",
  pricingLabel: "Launch pricing",
  setup: 750, // one-time, fixed
  monthly: 179, // month-to-month
  includedMinutes: 300, // AI-handled minutes per month
  overagePerMinute: 0.25, // per AI-handled minute beyond includedMinutes
  includedChangeMinutes: 30, // small customer changes per month, no rollover
  term: "month-to-month",
  /** What the fixed setup fee covers. */
  setupIncludes: [
    "One business, one phone number, one routing flow and one language",
    "Approved FAQs, services, service area and greeting",
    "Captures caller name, contact details, reason for calling and callback request",
    "An emailed summary of each handled call",
    "A configured and tested fallback to a person or voicemail",
    "Test calls before go-live, then a handover walkthrough",
  ],
  /** What the monthly fee covers. */
  get monthlyIncludes(): string[] {
    return [
      "Ongoing operation and maintenance of the agreed call flow",
      `${this.includedMinutes} AI-handled minutes a month; extra minutes $${this.overagePerMinute.toFixed(2)} each`,
      `Up to ${this.includedChangeMinutes} minutes of small changes a month (does not roll over)`,
      "Correction of faults in the agreed setup",
    ];
  },
  /** Never implied as included. Quoted separately if wanted. */
  notIncluded: [
    "Calendar booking",
    "CRM integration",
    "Text messaging (SMS)",
    "Dashboards",
    "Extra numbers, locations, languages or routing flows",
  ],
};

const money = (n: number) =>
  Number.isInteger(n) ? `$${nf.format(n)}` : `$${n.toFixed(2)}`;

/** "$750" */
export const PHONE_SETUP_PRICE = money(phonePlan.setup);
/** "$179" */
export const PHONE_MONTHLY_PRICE = money(phonePlan.monthly);
/** "$0.25" */
export const PHONE_OVERAGE_PRICE = money(phonePlan.overagePerMinute);
/** "$750 setup + $179/month" — compact label for cards and table cells. */
export const PHONE_PRICE_LABEL = `${PHONE_SETUP_PRICE} setup + ${PHONE_MONTHLY_PRICE}/month`;
/** "$750 setup + $179/month CAD (launch pricing)" */
export const PHONE_PRICE_SHORT = `${PHONE_PRICE_LABEL} CAD (launch pricing)`;
/** One-sentence commercial terms. Use wherever a receptionist price is stated. */
export const PHONE_PRICE_SENTENCE =
  `AI Phone Receptionist launch pricing: ${PHONE_SETUP_PRICE} CAD fixed setup, then ` +
  `${PHONE_MONTHLY_PRICE} CAD/month, month-to-month. Includes ${phonePlan.includedMinutes} ` +
  `AI-handled minutes a month; extra minutes are ${PHONE_OVERAGE_PRICE} each. Taxes extra.`;
/** What the narrow offer is. */
export const PHONE_SCOPE_SENTENCE =
  "Setup covers one business, one number, one routing flow and one language: approved FAQs, " +
  "services, service area and greeting; caller name, contact details, reason and callback " +
  "request; an emailed call summary; a configured and tested fallback; test calls and handover.";
/** What the monthly fee is. */
export const PHONE_MONTHLY_SENTENCE =
  `The monthly fee covers operation and maintenance, ${phonePlan.includedMinutes} AI-handled ` +
  `minutes and up to ${phonePlan.includedChangeMinutes} minutes of small changes a month ` +
  "(no rollover). Faults in the agreed setup are corrected at no charge.";
/** The boundary. Use beside any mention of booking, CRM, SMS or dashboards. */
export const PHONE_EXCLUSIONS_SENTENCE =
  "Calendar booking, CRM, text messaging, dashboards, extra numbers or languages and other " +
  "features beyond this scope are not included and are quoted separately.";
/**
 * For sentences that name receptionists alongside other builds: keeps the
 * $1,500 build floor from reading as the receptionist's price.
 * "custom builds from $1,500, AI phone receptionist $750 setup + $179/month"
 */
export const BUILD_AND_PHONE_PRICING =
  `custom builds from $${nf.format(packages[0].price)}, AI phone receptionist ${PHONE_PRICE_LABEL}`;
/** Replaces the old "provider usage is additional" line. */
export const PHONE_USAGE_SENTENCE =
  `No separate phone or AI usage charge for the first ${phonePlan.includedMinutes} AI-handled ` +
  `minutes each month; beyond that, ${PHONE_OVERAGE_PRICE} CAD per minute.`;

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

/** A landing page recommends either a build package or the phone offer. */
export type OfferRef = ServicePackage["id"] | typeof phonePlan.id;

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
