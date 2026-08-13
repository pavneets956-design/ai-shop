// Central site config — single source of truth for brand, contact, SEO.
export const site = {
  name: "Handbuilt AI",
  legalName: "Handbuilt AI Studio",
  tagline: "AI that works for your business — built by hand, not bought off a shelf.",
  subTagline:
    "Your personal AI studio. Custom apps, agents, and automations — built for what you actually do.",
  url: "https://aibuiltbyhand.com", // custom domain — bought 2026-06-14
  // Owner / local SEO (GEO). Update with real public business details before launch.
  owner: "Pavneet",
  email: "pavneets956@gmail.com",
  region: "Surrey, BC",
  country: "CA",
  serviceArea: ["Surrey", "Vancouver", "Greater Vancouver", "British Columbia", "Canada", "Remote / Worldwide"],
  currency: "CAD",
  // IndexNow key (Bing/Yandex instant indexing). Public by design — the key
  // file lives at /<key>.txt. Ping via GET /api/indexnow?secret=...
  indexNowKey: "ac88d1565466f5394f041d46f2546ce7",
  social: {
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    github: "https://github.com/pavneets956-design/ai-shop",
  },
  // Where the primary CTA sends people. There is NO calendar booking product:
  // /create is a request form and the site's copy says so ("Request a free AI
  // opportunity review", "reply within one business day"). Do not reintroduce
  // "Book a call" language against this value — it promises a scheduled call
  // the site cannot deliver. If a Cal.com/Calendly link is ever added, change
  // the CTA copy in the same commit.
  //
  // NOTE: currently referenced by nothing; the CTAs link to /create directly.
  bookingUrl: "/create",
};

/**
 * Primary navigation (2026-08-01 rebuild).
 *
 * Labels are evidence-led — see research/search-demand/10-copy-language-recommendation.md:
 *  - "Free Tools" rather than "Tools": the "free" cluster is one of the largest measured.
 *  - "AI Receptionist" leads because it is 38.4% of first-party GSC impressions.
 *  - No "Proof" item: there is nothing honest to put behind it yet, and a nav
 *    link to an empty promise is worse than no link.
 *  - No "Get a Fit Check": "fit check" has zero search presence.
 *
 * Route safety: /demo, /shop, /creators and /ai-receptionist left the nav in
 * this pass. They are NOT orphaned — every one is linked from the footer.
 * /creators in particular currently ranks best on the site.
 */
export const navLinks = [
  { label: "AI Receptionist", href: "/ai-receptionist-for-contractors" },
  { label: "Free Tools", href: "/tools" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Your Trade", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
] as const;
