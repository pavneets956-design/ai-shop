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
    price: 1000,
    priceFormat: "flat",
    timeline: "Live in ~5 business days",
    forWho: "Best if you want to start with one focused win and test before scaling.",
    accent: "electric",
    includes: [
      "One focused AI worker (receptionist, chatbot, quote intake, or review replies)",
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
    price: 2500,
    priceHigh: 5000,
    priceTypical: 3500,
    priceFormat: "band",
    timeline: "Live in 2–3 weeks",
    forWho: "Best for businesses losing money to slow replies and manual admin.",
    highlight: true,
    badge: "Most popular",
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
    price: 7500,
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
  monthly: 250,
  annualMonthly: 200, // billed annually
  covers: [
    "Hosting & uptime monitoring",
    "Up to 1 hour of tweaks/changes per month",
    "API usage tracking with cost alerts",
    "Priority support (same/next business day)",
    "Monthly performance summary",
  ],
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
