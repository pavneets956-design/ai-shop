import type { Metadata } from "next";
import { site } from "./data/site";
import { packages, carePlan, formatPackagePrice, getPackage } from "./data/packages";
import type { LandingContent, PageType } from "./data/landing";
import { landingPath, landingBreadcrumb } from "./data/landing";

/* ==========================================================================
   1. Stable entity ids
   ==========================================================================
   ONE identity node for the business, referenced by @id from everywhere else.
   Before 2026-08-30 the site shipped two competing Organization-class nodes:
   `#organization` ("Handbuilt AI", priceRange "$$", ten service areas including
   "Remote / Worldwide" and four foreign countries) on all ~237 routes from the
   root layout, PLUS a second `#localbusiness` ("Handbuilt AI Studio",
   "$99–$10,000+ CAD", Surrey/Delta) declared inline on the homepage, with
   nothing linking them. Two entities for one business.
   See research/transformation-2026-08-30/06-technical-seo.md §1.2 and §8.

   The brand name stays "Handbuilt AI" — no rename has been approved. */

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const FOUNDER_ID = `${site.url}/#founder`;

/** Stable @id for a package Offer, so every Service can reference it instead of
 *  re-stating a price that could then drift from packages.ts. */
export function offerId(id: string): string {
  return `${site.url}/pricing#${id}`;
}

type Node = Record<string, unknown>;

/* ==========================================================================
   2. Shared social card
   ========================================================================== */

/**
 * Shared social card, used by every page that does not ship its own.
 *
 * `app/opengraph-image.png` is inherited automatically ONLY by routes that never
 * declare an `openGraph` object of their own. Every landing page does declare one
 * (for its title/description/url), and Next replaces the inherited object rather
 * than deep-merging it — so 202 of 237 routes were shipping no og:image at all,
 * including all three of the highest-impression pages.
 *
 * Verified 2026-08-30: `app/opengraph-image.png` is a real 1200×630 PNG
 * (35,055 bytes, branded artwork — not a placeholder), and `app/twitter-image.png`
 * is a byte-identical copy. Both are served by the Next file convention at the
 * un-hashed paths used below.
 */
export const DEFAULT_OG_IMAGE = {
  url: `${site.url}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: "Handbuilt AI — AI that works for your business, built by hand, not bought off a shelf. Surrey, BC — done-for-you AI receptionist and automation.",
} as const;

/* ==========================================================================
   3. lastmod — real, per-source-file, stable across deploys
   ==========================================================================
   Every sitemap entry used to carry `new Date()` evaluated at build time, so all
   216 URLs claimed the same timestamp and "changed" again on every deploy. Google
   discards lastmod site-wide when it is not verifiably accurate.

   These are REAL dates, taken from `git log -1 --format=%cs -- <file>` on
   2026-08-30 — the last commit that actually changed the file that generates the
   page. They are committed rather than computed inside `next build`: Vercel's
   build clone may be shallow, and a shallow clone would silently produce today's
   date for everything, recreating the exact defect this removes.

   REGENERATE before a content release (Git Bash, repo root):
     for f in lib/data/*.ts; do echo "$f = $(git log -1 --format=%cs -- $f)"; done
     for p in "" /services /industries …; do echo "$p = $(git log -1 --format=%cs -- app$p/page.tsx)"; done
   Then paste the changed rows below. `tests/seo-static.test.ts` asserts the map
   stays sane (parseable, not in the future, not all-identical, full coverage). */

/** Last real change to the data file that generates each page type. */
export const REGISTRY_LASTMOD: Record<string, string> = {
  money: "2026-08-12", // lib/data/money.ts
  service: "2026-08-30", // lib/data/services.ts + _services_b.ts
  industry: "2026-08-30", // lib/data/industries.ts + _industries_b.ts + _industries_c.ts
  creators: "2026-08-30", // lib/data/creators.ts + _creators_b.ts
  location: "2026-08-30", // lib/data/locations.ts
  resource: "2026-08-30", // lib/data/resources.ts
  howto: "2026-08-30", // lib/data/howto.ts
  compare: "2026-08-30", // lib/data/compare.ts
  usecase: "2026-08-30", // lib/data/useCases.ts
  tool: "2026-08-12", // lib/data/freeTools.ts
};

/** Last real change to each hand-routed page file. */
export const STATIC_LASTMOD: Record<string, string> = {
  "": "2026-09-18",
  "/services": "2026-07-06",
  "/industries": "2026-07-06",
  "/locations": "2026-07-06",
  "/solutions": "2026-08-30",
  "/use-cases": "2026-08-30",
  "/resources": "2026-06-14",
  "/how-to": "2026-06-14",
  "/compare": "2026-06-14",
  "/pricing": "2026-09-18",
  "/shop": "2026-08-30",
  "/tools": "2026-07-15",
  "/faq": "2026-09-18",
  "/about": "2026-09-18",
  "/create": "2026-09-18",
  "/privacy": "2026-08-30",
  "/terms": "2026-08-30",
  "/creators": "2026-07-06",
  "/demo": "2026-06-19",
  "/demo/assistant": "2026-06-17",
  "/demo/lead": "2026-06-17",
  "/demo/nudge": "2026-06-17",
  "/demo/quote": "2026-06-17",
  "/start": "2026-08-30",
};

/** ISO date (YYYY-MM-DD) for a page type, or undefined — never a guess. */
export function lastmodForType(type: string): string | undefined {
  return REGISTRY_LASTMOD[type];
}

/* ==========================================================================
   4. Derived, verifiable identity values
   ========================================================================== */

/** Places in site.serviceArea that are regions, not municipalities. */
const ADMIN_AREAS = new Set(["British Columbia", "Fraser Valley", "Metro Vancouver", "Lower Mainland"]);
const BC = { "@type": "AdministrativeArea", name: "British Columbia" } as const;

/**
 * areaServed from `site.serviceArea` — the owner-narrowed BC list. Nothing is
 * added: no "Canada", no "Remote / Worldwide", no foreign Country nodes.
 */
export function areaServedNodes(): Node[] {
  return site.serviceArea.map((name) =>
    ADMIN_AREAS.has(name)
      ? { "@type": "AdministrativeArea", name }
      : { "@type": "City", name, containedInPlace: BC }
  );
}

/** sameAs from site.social — real profiles only, empties and "#" filtered. */
function sameAsUrls(): string[] {
  return Object.values(site.social ?? {}).filter(
    (u): u is string => typeof u === "string" && u.length > 0 && u !== "#" && u.startsWith("http")
  );
}

/**
 * The founder's own profile URLs, derived (not invented) from the org's.
 * `site.social.github` is a REPOSITORY url; the account that owns it is the
 * founder's profile. `https://github.com/pavneets956-design` was fetched and
 * returned 200 on 2026-08-30 (06-technical-seo.md §8, "Verified values").
 * If the regex does not match, nothing is emitted.
 */
function founderSameAs(): string[] {
  const out: string[] = [];
  for (const u of sameAsUrls()) {
    const m = /^https:\/\/github\.com\/([^/]+)/.exec(u);
    if (m) out.push(`https://github.com/${m[1]}`);
  }
  return Array.from(new Set(out));
}

const nf = new Intl.NumberFormat("en-CA");

/**
 * priceRange derived from packages.ts — the real floor and the real ceiling of
 * the published catalogue. Not the old invented `"$$"`, and not the homepage's
 * hand-typed `"$99–$10,000+ CAD"`. Recomputes if a package price changes.
 */
function derivedPriceRange(): string {
  const floor = Math.min(...packages.map((p) => p.price));
  const ceiling = Math.max(...packages.map((p) => p.priceHigh ?? p.price));
  return `$${nf.format(floor)}–$${nf.format(ceiling)}+ ${site.currency}`;
}

/** Offer nodes for the three build packages + the Care Plan, from packages.ts. */
function packageOffers(): Node[] {
  const offers: Node[] = packages.map((p) => ({
    "@type": "Offer",
    "@id": offerId(p.id),
    price: p.price,
    priceCurrency: site.currency,
    description: `${formatPackagePrice(p)} ${site.currency}`,
    url: `${site.url}${p.cta.href}`,
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: p.name,
      description: p.tagline,
      provider: { "@id": ORG_ID },
    },
  }));
  offers.push({
    "@type": "Offer",
    "@id": offerId("care"),
    price: carePlan.monthly,
    priceCurrency: site.currency,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: carePlan.monthly,
      priceCurrency: site.currency,
      unitText: "MONTH",
    },
    itemOffered: {
      "@type": "Service",
      name: carePlan.name,
      description: carePlan.covers.join(". "),
      provider: { "@id": ORG_ID },
    },
  });
  return offers;
}

/* ==========================================================================
   5. The identity graph — emitted ONCE, from the root layout
   ==========================================================================
   Only fields with a verified source. Deliberately absent, because no verified
   value exists: telephone, streetAddress, postalCode, geo, openingHours,
   aggregateRating, review, foundingDate, numberOfEmployees. Do not add them. */

export function organizationSchema(): Node {
  const floor = Math.min(...packages.map((p) => p.price));
  const same = sameAsUrls();
  return {
    "@context": "https://schema.org",
    // ProfessionalService ⊂ LocalBusiness ⊂ Organization — one node covers all
    // three, so nothing else on the site needs to re-declare an identity.
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.legalName,
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 512, height: 512 },
    image: DEFAULT_OG_IMAGE.url,
    description:
      `Handbuilt AI is a one-person AI studio in ${site.region} that installs done-for-you AI ` +
      `receptionists, quote follow-up and admin automation for contractors and local service ` +
      `businesses across Metro Vancouver and the Fraser Valley — inside the phone number and ` +
      `accounts the business already owns. Fixed ${site.currency} pricing from $${nf.format(floor)}.`,
    // Still the personal Gmail, deliberately: aibuiltbyhand.com has no MX record,
    // so a branded address would black-hole enquiries. See lib/data/site.ts.
    email: site.email,
    // Locality/region/country only — this is a service-area business with no
    // storefront. No street address, no postal code: neither is verified.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surrey",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    areaServed: areaServedNodes(),
    priceRange: derivedPriceRange(),
    currenciesAccepted: site.currency,
    founder: { "@id": FOUNDER_ID },
    knowsAbout: [
      "AI receptionist for contractors",
      "AI phone answering",
      "After-hours call answering",
      "Missed-call text-back",
      "AI quote follow-up",
      "Custom AI chatbot development",
      "Custom AI app development",
    ],
    ...(same.length && { sameAs: same }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Custom AI builds (${site.currency})`,
      itemListElement: packageOffers(),
    },
  };
}

export function websiteSchema(): Node {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.url,
    inLanguage: "en-CA",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * The founder as a real Person entity. `site.founder` is the public name form.
 * `image` is deliberately absent: public/founder.jpg is untracked and its use as
 * a schema image needs owner approval (06-technical-seo.md §8, owner input (c)).
 */
export function founderSchema(): Node {
  const same = founderSameAs();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: site.founder,
    givenName: site.owner,
    jobTitle: "Founder & Builder",
    worksFor: { "@id": ORG_ID },
    url: `${site.url}/about`,
    ...(same.length && { sameAs: same }),
  };
}

/**
 * The complete sitewide identity graph. `app/layout.tsx` should render exactly
 * this and nothing else identity-shaped; no page may re-declare an
 * Organization/LocalBusiness node.
 */
export function identityGraph(): Node[] {
  return [organizationSchema(), websiteSchema(), founderSchema()];
}

/* ==========================================================================
   6. Per-page nodes
   ========================================================================== */

export type WebPageKind = "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "ItemPage";

/** One WebPage node per route, tied to the WebSite and the identity. */
export function webPageSchema(opts: {
  path: string;
  name: string;
  description?: string;
  kind?: WebPageKind;
  /** ISO YYYY-MM-DD. Omitted entirely when unknown — never guessed. */
  dateModified?: string;
  /** true when the page also emits a BreadcrumbList for the same url. */
  hasBreadcrumb?: boolean;
}): Node {
  const url = `${site.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": opts.kind ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description && { description: opts.description }),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: DEFAULT_OG_IMAGE.url,
    inLanguage: "en-CA",
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    ...(opts.hasBreadcrumb && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
  };
}

/**
 * Whether the FAQ renderers keep EVERY answer in the served HTML.
 *
 * Google requires FAQ structured data to describe content that is visibly on
 * the page. Until 2026-08-30 `components/FAQSection.tsx` mounted only the open
 * accordion item (`{isOpen && (<motion.div>…)}` with `useState(0)`), so ~200
 * routes advertised answers that were not in the HTML — production measured
 * 1 of 6 answers on `/pricing` and 2 of 8 on `/ai-receptionist-for-contractors`.
 *
 * VERIFIED true on 2026-08-30 against every FAQ renderer in the tree:
 *   · components/FAQSection.tsx      → native <details> (169 landing pages,
 *                                      /faq, /pricing, 25 use-cases)
 *   · components/tools/ToolShell.tsx → native <details> (5 free tools)
 *   · components/marketing/Interactive.tsx → `hidden={!isOpen}` attribute, so
 *                                      the text stays in the DOM (homepage)
 *
 * `tests/seo-static.test.ts` reads those component sources and fails if any of
 * them goes back to conditional mounting, so this flag cannot silently become a
 * lie. If it must be turned off, turn it off — do not leave it true and hope.
 */
export const FAQ_ANSWERS_RENDERED = true;

/**
 * The "emit nothing" sentinel.
 *
 * A JSON-LD node with no `@type` carries no meaning, so `JsonLd`/`toGraph` drop
 * it from the graph and `landingSchema` never appends it. It is returned instead
 * of `null` for one reason: `faqSchema` is called from `lib/data/freeTools.ts`,
 * `app/page.tsx`, `app/faq/page.tsx`, `app/pricing/page.tsx` and
 * `app/use-cases/[slug]/page.tsx`, all of which push straight into a
 * `Record<string, unknown>[]`. A nullable return would type-error five files
 * owned by other lanes; a typeless node changes the OUTPUT without changing a
 * single call site's types.
 */
export const OMITTED_NODE: Node = Object.freeze({});

/** True when a node is real structured data rather than the omit sentinel. */
export function isEmittableNode(n: unknown): n is Node {
  return Boolean(n) && typeof n === "object" && "@type" in (n as Node);
}

/**
 * FAQPage — emitted only when the caller asserts the answers are in the HTML.
 * Returns `OMITTED_NODE` otherwise, which never reaches the rendered graph.
 */
export function faqSchema(
  items: { q: string; a: string }[],
  opts?: { answersRendered?: boolean }
): Node {
  const rendered = opts?.answersRendered ?? FAQ_ANSWERS_RENDERED;
  if (!rendered || !items.length) return OMITTED_NODE;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList with a stable @id derived from the page it describes. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]): Node {
  const last = crumbs[crumbs.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(last && { "@id": `${site.url}${last.path}#breadcrumb` }),
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}

/* ==========================================================================
   7. Service / Offer nodes — every price derives from packages.ts
   ========================================================================== */

export function serviceSchema(): Node[] {
  return packages.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/#service-${p.id}`,
    name: p.name,
    serviceType: "AI development & automation",
    description: p.tagline + " " + p.includes.join(". "),
    provider: { "@id": ORG_ID },
    areaServed: areaServedNodes(),
    // By reference: the priced Offer lives once, in the organization's
    // hasOfferCatalog, which ships on every route from the root layout.
    offers: { "@id": offerId(p.id) },
  }));
}

export function carePlanOffer(): Node {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/#service-care`,
    name: carePlan.name,
    description: carePlan.covers.join(". "),
    provider: { "@id": ORG_ID },
    areaServed: areaServedNodes(),
    offers: { "@id": offerId("care") },
  };
}

// Shop storefront schema: a breadcrumb + an ItemList of the products as
// self-contained Service offers, priced by their real billing model.
//
// FIXED 2026-08-30: the hybrid branch used to emit ONLY the monthly figure, so
// "AI Lead Capture & Follow-Up" (visible: From $2,500 + $99/mo) advertised
// `Offer.price 99` and the Review Engine ($1,000 + $49/mo) advertised 49 —
// understating both by the setup fee. Hybrids now emit BOTH offers.
export function shopSchema(
  products: {
    name: string;
    outcome: string;
    packageId: "starter" | "business" | "custom";
    billing?: "one-time" | "managed" | "hybrid";
    priceLabel?: string;
    monthlyPrice?: number;
    setupPrice?: number;
  }[]
): Node[] {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ready-to-install AI systems",
    itemListElement: products.map((p, i) => {
      const pkg = getPackage(p.packageId);
      const label = p.priceLabel ?? (pkg ? formatPackagePrice(pkg) : undefined);
      const offers: Node[] = [];

      const oneTime = p.setupPrice ?? (p.monthlyPrice ? undefined : pkg?.price);
      if (oneTime != null) {
        offers.push({
          "@type": "Offer",
          price: oneTime,
          priceCurrency: site.currency,
          ...(label && { description: label }),
          url: `${site.url}/create`,
        });
      }
      if (p.monthlyPrice != null) {
        offers.push({
          "@type": "Offer",
          price: p.monthlyPrice,
          priceCurrency: site.currency,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.monthlyPrice,
            priceCurrency: site.currency,
            unitText: "MONTH",
          },
          ...(label && { description: label }),
          url: `${site.url}/create`,
        });
      }

      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: p.name,
          serviceType: "AI development & automation",
          description: p.outcome,
          provider: { "@id": ORG_ID },
          areaServed: areaServedNodes(),
          ...(offers.length && { offers: offers.length === 1 ? offers[0] : offers }),
        },
      };
    }),
  };
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
    ]),
    itemList,
  ];
}

/* ==========================================================================
   8. Landing pages
   ========================================================================== */

/** Optional flags a registry row may carry once Lane P/F adds them to
 *  LandingContent. Read defensively so this compiles either way. */
type LandingFlags = { noindex?: boolean; updatedAt?: string };

function flagsOf(content: LandingContent): LandingFlags {
  return content as LandingContent & LandingFlags;
}

export function isNoindexEntry(content: LandingContent): boolean {
  return flagsOf(content).noindex === true;
}

function slugish(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * areaServed for a landing page.
 *
 * Was `"Worldwide"` on all 169 pages, including the 19 /locations/* pages — a
 * Chilliwack page with no Chilliwack entity, and a global claim that fights the
 * local intent the site actually ranks for.
 *
 * A location page gets its own City ONLY when that city is in the verified
 * `site.serviceArea`; a page for a place outside the service area falls back to
 * the real service area rather than asserting coverage that was never offered.
 */
function landingAreaServed(type: PageType, content: LandingContent): Node[] {
  if (type === "location") {
    const slug = content.slug.toLowerCase();
    const city = site.serviceArea.find((p) => !ADMIN_AREAS.has(p) && slug.includes(slugish(p)));
    if (city) return [{ "@type": "City", name: city, containedInPlace: BC }];
  }
  if (content.slug === "remote-ai-development") {
    // The one page whose own copy is explicitly about remote delivery abroad.
    return [
      ...areaServedNodes(),
      ...["Canada", "United States", "Australia", "New Zealand", "United Kingdom"].map((name) => ({
        "@type": "Country",
        name,
      })),
    ];
  }
  return areaServedNodes();
}

const WEBPAGE_KIND: Partial<Record<PageType, WebPageKind>> = {
  compare: "ItemPage",
};

/**
 * The full JSON-LD graph for a programmatic landing page: WebPage + the primary
 * entity (Service / HowTo / Article) + FAQPage (only if the answers render) +
 * BreadcrumbList. Every provider/author/publisher points at the one identity.
 */
export function landingSchema(
  type: PageType,
  content: LandingContent,
  shortName?: string,
  opts?: { faqAnswersRendered?: boolean }
): Node[] {
  const path = landingPath(type, content.slug);
  const url = `${site.url}${path}`;
  const pkg = content.packageId ? getPackage(content.packageId) : undefined;
  const dateModified = flagsOf(content).updatedAt ?? lastmodForType(type);
  const out: Node[] = [
    webPageSchema({
      path,
      name: content.title,
      description: content.description,
      kind: WEBPAGE_KIND[type],
      dateModified,
      hasBreadcrumb: true,
    }),
  ];

  if (content.schema === "Service") {
    out.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: shortName ?? content.h1,
      serviceType: shortName ?? content.h1,
      description: content.answer,
      provider: { "@id": ORG_ID },
      areaServed: landingAreaServed(type, content),
      url,
      // Referenced, not restated: the priced Offer lives in the organization's
      // hasOfferCatalog, which is on every page via the root layout.
      ...(pkg && { offers: { "@id": offerId(pkg.id) } }),
    });
  } else if (content.schema === "HowTo") {
    out.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: content.h1,
      description: content.answer,
      author: { "@id": FOUNDER_ID },
      publisher: { "@id": ORG_ID },
      ...(dateModified && { dateModified }),
      step: (content.steps ?? []).map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: s,
      })),
    });
  } else {
    // Article — for resource / comparison answer pages. A named human author
    // beats an organisation for E-E-A-T.
    out.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: content.h1,
      description: content.answer,
      author: { "@id": FOUNDER_ID },
      publisher: { "@id": ORG_ID },
      ...(dateModified && { dateModified }),
      mainEntityOfPage: { "@id": `${url}#webpage` },
    });
  }

  const faq = faqSchema(content.faqs, {
    answersRendered: opts?.faqAnswersRendered ?? FAQ_ANSWERS_RENDERED,
  });
  if (isEmittableNode(faq)) out.push(faq);
  out.push(breadcrumbSchema(landingBreadcrumb(type, content, shortName)));
  return out;
}

// Next.js Metadata for any landing page. Title goes through the root layout
// template ("%s | Handbuilt AI"), so we pass the bare H1 and use the full
// content.title for OpenGraph (which isn't templated).
export function landingMetadata(type: PageType, content: LandingContent): Metadata {
  const path = landingPath(type, content.slug);
  const url = `${site.url}${path}`;
  const noindex = isNoindexEntry(content);
  return {
    title: content.h1,
    description: content.description,
    keywords: content.keywords,
    alternates: { canonical: path },
    // Honours a `noindex: true` flag on the registry row the moment one exists,
    // so a retired page stops being indexable without touching this file.
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      title: content.title,
      description: content.description,
      url,
      siteName: site.name,
      locale: "en_CA",
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

/**
 * Metadata for a hand-routed static page. Fixes the sitewide og:url defect: 24
 * static pages declared a canonical but no `openGraph`, so they inherited the
 * root layout's object **including `url: site.url`** — every one of them told
 * social platforms it was the homepage.
 */
export function staticMetadata(opts: {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords && { keywords: opts.keywords }),
    alternates: { canonical: opts.path || "/" },
    ...(opts.noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: opts.ogTitle ?? opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: "en_CA",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.ogTitle ?? opts.title,
      description: opts.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
