// Central site config — single source of truth for brand, contact, SEO.
export const site = {
  name: "Handbuilt AI",
  legalName: "Handbuilt AI Studio",
  tagline: "AI that works for your business — built by hand, not bought off a shelf.",
  subTagline:
    "Your personal AI studio. Custom apps, agents, and automations — built for what you actually do.",
  url: "https://aibuiltbyhand.com", // custom domain — bought 2026-06-14
  // Owner / local SEO (GEO). Every value here must be independently verifiable —
  // this object is the source for the sitewide schema identity.
  owner: "Pavneet",
  /** Full name, as used publicly on ironwoodgrounds.ca. Used for Person schema + the About page. */
  founder: "Pavneet Singh",
  /**
   * ⚠️ Still the personal Gmail, deliberately. `build@aibuiltbyhand.com` cannot
   * receive mail: DNS for aibuiltbyhand.com has NO MX record and no Resend DKIM
   * (checked 2026-08-30). Publishing a branded address that black-holes enquiries
   * is worse than publishing a working personal one. Swap this the day a mailbox
   * exists — see resend-email-setup.md.
   */
  email: "pavneets956@gmail.com",
  region: "Surrey, BC",
  country: "CA",
  /**
   * Narrowed 2026-08-30. The old list ran to "Canada" and "Remote / Worldwide",
   * which tells Google this is a global agency and competes with the local
   * intent the site actually ranks for. Only places he can drive to.
   */
  serviceArea: [
    "Surrey",
    "Delta",
    "Langley",
    "White Rock",
    "Vancouver",
    "Burnaby",
    "Richmond",
    "Coquitlam",
    "Abbotsford",
    "Fraser Valley",
    "British Columbia",
  ],
  currency: "CAD",
  // IndexNow key (Bing/Yandex instant indexing). Public by design — the key
  // file lives at /<key>.txt. Ping via GET /api/indexnow?secret=...
  indexNowKey: "ac88d1565466f5394f041d46f2546ce7",
  /**
   * Only profiles that exist. `twitter`, `instagram` and `linkedin` were all
   * `"#"` — rendered as real icons in the footer on every internal page and
   * went nowhere. A dead social link costs more trust than a missing one, and
   * `"#"` in `sameAs` is an invalid entity anchor. Add an entry here the day
   * the profile is live, and the footer + schema pick it up automatically.
   */
  social: {
    github: "https://github.com/pavneets956-design/ai-shop",
  } as Record<string, string>,
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
  { label: "Demo", href: "/demo" },
  { label: "Free Tools", href: "/tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

/**
 * Changes 2026-08-30:
 *  + "Demo". The AI Worker Showroom is the strongest asset on the site and it
 *    was not reachable from the primary navigation of any page.
 *  + "About". The site claimed "one builder" without ever introducing him;
 *    the founder page is now the trust anchor, so it needs a permanent slot.
 *  − "How It Works" (`/#how-it-works`). A homepage anchor in the global header
 *    threw internal-page visitors back to the homepage.
 *  − "For Your Trade" (`/industries`). Still linked from the footer and from
 *    every industry page — it does not need to spend one of five header slots.
 */
