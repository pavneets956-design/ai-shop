// Shop catalog — what Handbuilt has shipped.
// Storefront only: own live SaaS (proof) + one buyable done-for-you service.
// No payment code lives here — external items deep-link to their own checkout/signup.

export type ShopKind = "service" | "saas";

export interface ShopItem {
  id: string;
  name: string;
  kind: ShopKind;
  /** One-line positioning. */
  tagline: string;
  /** Who it's for — kept short. */
  forWho: string;
  /** 2–4 outcome bullets (what the buyer gets, not features). */
  outcomes: string[];
  /** Human price label, e.g. "Custom build, from $1,000" or "From $29/mo". */
  priceLabel: string;
  /** External product home (its own signup/checkout). Undefined → degrades to /create. */
  href?: string;
  /** Optional live demo on this site. */
  demoHref?: string;
  /** Optional one-word category chip shown on the card. */
  eyebrow?: string;
}

/**
 * Append UTM attribution to an external link so studio-driven traffic is
 * attributable in each product's own analytics. Internal links pass through.
 */
export function utmHref(href: string | undefined, contentId: string): string {
  if (!href || href.startsWith("/") || href === "#") return href || "/create";
  const sep = href.includes("?") ? "&" : "?";
  return `${href}${sep}utm_source=handbuilt&utm_medium=shop&utm_content=${contentId}`;
}

// The one buyable, done-for-you offer for the local-SMB audience.
export const featuredService: ShopItem = {
  id: "ai-receptionist",
  name: "AI Receptionist",
  kind: "service",
  eyebrow: "Done-for-you",
  tagline: "An AI that answers every call and message — and books the job.",
  forWho: "Local service businesses losing leads to missed calls and slow replies.",
  outcomes: [
    "Never miss a lead — it answers 24/7, even when you're on a job",
    "Books appointments and captures details straight into your day",
    "Sounds like your shop, not a robot — trained on your services, hours and pricing",
    "Live in days, fully built and tuned for you",
  ],
  priceLabel: "Custom build, from $1,000",
  demoHref: "/demo",
};

// Own live SaaS — first-class proof, second-class shop items.
// These prove Handbuilt ships and runs real production software.
export const liveSaas: ShopItem[] = [
  {
    id: "coitracker",
    name: "COITracker",
    kind: "saas",
    eyebrow: "Live SaaS",
    tagline: "Automated vendor Certificate of Insurance tracking for B2B.",
    forWho: "Property managers, GCs and ops teams chasing expiring vendor COIs.",
    outcomes: [
      "Tracks every vendor's insurance and flags expiries before they lapse",
      "Automated reminders — stop chasing certificates by hand",
    ],
    priceLabel: "Subscription · see plans",
    href: "https://coitracker.co",
  },
  {
    id: "paynudge",
    name: "PayNudge",
    kind: "saas",
    eyebrow: "Live SaaS",
    tagline: "Polite, automated payment reminders that get invoices paid.",
    forWho: "Small businesses tired of chasing late payments.",
    outcomes: [
      "Automated nudges on overdue invoices — on-brand, never awkward",
      "Get paid faster without the uncomfortable follow-up calls",
    ],
    priceLabel: "Subscription · see plans",
    href: "https://www.paynudge.xyz",
  },
];
