// Central site config — single source of truth for brand, contact, SEO.
export const site = {
  name: "Handbuilt AI",
  legalName: "Handbuilt AI Studio",
  tagline: "Websites, apps and AI systems, thoughtfully built with you.",
  subTagline: "Your independent build studio. Websites, interactive experiences, apps and AI systems.",
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

// Primary services and the project inquiry funnel. Older hubs remain linked in the footer.
export const navLinks = [
  { label: "Websites", href: "/web-design-development" },
  { label: "Apps", href: "/custom-ai-app-development" },
  { label: "AI systems", href: "/done-for-you-ai-automation" },
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;
