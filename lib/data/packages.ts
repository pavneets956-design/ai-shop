export type PriceFormat = "flat" | "from" | "quote";

export interface ServicePackage {
  id: "starter" | "business" | "custom";
  name: string;
  tagline: string;
  price: number; // CAD
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
    name: "Starter AI Setup",
    tagline: "One AI win, live in days.",
    price: 750,
    priceFormat: "flat",
    timeline: "Live in ~5 business days",
    forWho: "Solo operators & small local businesses who want one specific win.",
    accent: "electric",
    includes: [
      "One AI tool deployed & working — chatbot, AI receptionist, or a single automation",
      "Trained on your business (services, hours, pricing, FAQs)",
      "Connected to one channel you already use (website, Instagram DM, WhatsApp, email)",
      "14 days of post-launch tweaks included",
    ],
    cta: { label: "Start with Starter", href: "/create?package=starter" },
  },
  {
    id: "business",
    name: "Business AI System",
    tagline: "A connected system that runs the boring parts.",
    price: 2500,
    priceFormat: "from",
    timeline: "Live in 2–3 weeks",
    forWho: "Established businesses losing money to slow replies and manual admin.",
    highlight: true,
    badge: "Most popular",
    accent: "violet",
    includes: [
      "2–4 connected AI tools working as one system",
      "Integrated with your stack — calendar, CRM, email, payments or POS",
      "Custom workflows: leads routed, calls answered, follow-ups automated",
      "A simple dashboard to see what the AI is doing",
      "30 days of support & tuning included",
    ],
    cta: { label: "Build my system", href: "/create?package=business" },
  },
  {
    id: "custom",
    name: "Custom AI App",
    tagline: "A full app, built around your idea — and you own it.",
    price: 7500,
    priceFormat: "from",
    timeline: "Typically 4–8 weeks, scoped on a call",
    forWho: "Founders, creators & businesses that have outgrown off-the-shelf tools.",
    accent: "cyan",
    includes: [
      "A full custom app: web app, internal tool, customer portal, or SaaS MVP",
      "Custom AI logic — your data, your rules, your models",
      "User accounts, database, admin panel as needed",
      "Built on a modern, ownable stack — you own the code",
      "60 days of support, then optional Care Plan",
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
  name: "AI Care Plan",
  monthly: 250,
  annualMonthly: 200, // billed annually
  covers: [
    "Hosting & monitoring of your AI tools — you never touch infrastructure",
    "Up to 1 hour of tweaks & changes every month",
    "API usage management with cost alerts",
    "Priority support — same / next business day",
    'Monthly "what your AI did" summary',
  ],
};

const nf = new Intl.NumberFormat("en-CA");

export function formatPackagePrice(p: Pick<ServicePackage, "price" | "priceFormat">): string {
  const amount = `$${nf.format(p.price)}`;
  if (p.priceFormat === "flat") return amount;
  if (p.priceFormat === "from") return `From ${amount}`;
  return "Request quote";
}

export function getPackage(id: string): ServicePackage | undefined {
  return packages.find((p) => p.id === id);
}
