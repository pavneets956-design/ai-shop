/**
 * Static SEO contract tests — no server, no build, no network.
 *
 * Imports the registries and lib/seo.ts directly and asserts the things that
 * silently rotted between 2026-06 and 2026-08 on the live site:
 *  · duplicate/absent titles and descriptions
 *  · canonicals that don't point at the page they're on
 *  · price strings hand-typed into metadata and drifting from packages.ts
 *  · sitemap entries that are actually redirect sources (46 arrive this release)
 *  · redirect destinations that are not real routes, and redirect chains
 *  · two competing Organization identities in one page's structured data
 *
 * Each assertion names the offending URL/slug so a failure reads as a defect
 * report, not "expected true to be false".
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { site } from "@/lib/data/site";
import { packages, carePlan } from "@/lib/data/packages";
import { landingGroups } from "@/lib/data/registry";
import { useCases } from "@/lib/data/useCases";
import { landingPath, type PageType } from "@/lib/data/landing";
import { freeToolsByOrder, toolPath, toolMetadata, toolsHubMetadata } from "@/lib/data/freeTools";
import {
  ORG_ID,
  WEBSITE_ID,
  FOUNDER_ID,
  DEFAULT_OG_IMAGE,
  REGISTRY_LASTMOD,
  STATIC_LASTMOD,
  FAQ_ANSWERS_RENDERED,
  organizationSchema,
  websiteSchema,
  founderSchema,
  identityGraph,
  serviceSchema,
  carePlanOffer,
  faqSchema,
  breadcrumbSchema,
  landingSchema,
  landingMetadata,
  isEmittableNode,
} from "@/lib/seo";
import { toGraph, serializeJsonLd } from "@/components/JsonLd";
import { sitemapRoutes, sitemapUrls, registryRedirects, isRedirected } from "@/app/sitemap";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

type Row = { type: PageType; slug: string; path: string; content: (typeof landingGroups)[0]["items"][0] };

const landingRows: Row[] = landingGroups.flatMap((g) =>
  g.items.map((content) => ({
    type: g.type,
    slug: content.slug,
    path: landingPath(g.type, content.slug),
    content,
  }))
);

const redirects = registryRedirects();
const sitemapPaths = sitemapRoutes().map((r) => r.path);
const sitemapPathSet = new Set(sitemapPaths);

/** Every path the app can actually serve a 200 for, from the registries. */
const knownRoutes = new Set<string>([
  ...sitemapPaths,
  ...landingRows.map((r) => r.path),
  ...useCases.map((u) => `/use-cases/${u.slug}`),
  ...freeToolsByOrder.map((t) => toolPath(t.slug)),
  // Hand-routed pages that exist but are intentionally out of the sitemap.
  "/tools/form-filler",
  "/account",
  "/login",
  "/cart",
  "/dashboard",
]);

/**
 * Price strings that must never appear in generated metadata again. Each was a
 * real published contradiction against packages.ts.
 *   $2,500 / $7,500+ — the pre-2026-07-31 package floors, still live in llms.txt
 *   ~$1,000          — the Review Engine figure that undercut the Starter floor
 *   $250/mo          — a care tier that has not existed since the 3-tier rebuild
 */
const STALE_PRICE_STRINGS = ["$2,500", "$7,500+", "~$1,000", "$250/mo", "$2,500–5,000", "$2500"];

function metadataStrings(m: Record<string, unknown>): string[] {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v as object).forEach(walk);
  };
  walk(m);
  return out;
}

function nodesOf(graph: Record<string, unknown> | null): Record<string, unknown>[] {
  if (!graph) return [];
  return (graph["@graph"] as Record<string, unknown>[]) ?? [];
}

function typesOf(node: Record<string, unknown>): string[] {
  const t = node["@type"];
  return Array.isArray(t) ? (t as string[]) : typeof t === "string" ? [t] : [];
}

// ---------------------------------------------------------------------------
// 1. Titles and descriptions are unique
// ---------------------------------------------------------------------------

describe("metadata uniqueness", () => {
  it("every landing page has a non-empty, unique <title>", () => {
    const byTitle = new Map<string, string[]>();
    for (const r of landingRows) {
      const t = (landingMetadata(r.type, r.content).title as string) ?? "";
      expect(t, `${r.path} has no title`).not.toBe("");
      byTitle.set(t, [...(byTitle.get(t) ?? []), r.path]);
    }
    const dupes = [...byTitle.entries()].filter(([, paths]) => paths.length > 1);
    expect(dupes.map(([t, p]) => `"${t}" on ${p.join(", ")}`)).toEqual([]);
  });

  it("every landing page has a non-empty, unique meta description", () => {
    const byDesc = new Map<string, string[]>();
    for (const r of landingRows) {
      const d = (landingMetadata(r.type, r.content).description as string) ?? "";
      expect(d, `${r.path} has no description`).not.toBe("");
      byDesc.set(d, [...(byDesc.get(d) ?? []), r.path]);
    }
    const dupes = [...byDesc.entries()].filter(([, paths]) => paths.length > 1);
    expect(dupes.map(([d, p]) => `"${d.slice(0, 60)}…" on ${p.join(", ")}`)).toEqual([]);
  });

  it("free-tool titles and descriptions are unique too", () => {
    const titles = [
      ...freeToolsByOrder.map((t) => toolMetadata(t).title as string),
      toolsHubMetadata().title as string,
    ];
    expect(new Set(titles).size).toBe(titles.length);
  });
});

// ---------------------------------------------------------------------------
// 2. Self-referencing canonicals + social cards
// ---------------------------------------------------------------------------

describe("canonicals and social cards", () => {
  it("every landing page self-canonicalises to its own path", () => {
    const wrong: string[] = [];
    for (const r of landingRows) {
      const m = landingMetadata(r.type, r.content);
      const canonical = m.alternates?.canonical;
      if (canonical !== r.path) wrong.push(`${r.path} → canonical ${String(canonical)}`);
    }
    expect(wrong).toEqual([]);
  });

  it("og:url is the page's own URL, never the homepage", () => {
    const wrong: string[] = [];
    for (const r of landingRows) {
      const url = landingMetadata(r.type, r.content).openGraph?.url;
      const expected = `${site.url}${r.path}`;
      if (String(url) !== expected) wrong.push(`${r.path} → og:url ${String(url)}`);
    }
    expect(wrong).toEqual([]);
  });

  it("every landing page carries the og:image and twitter summary_large_image", () => {
    const missing: string[] = [];
    for (const r of landingRows) {
      const m = landingMetadata(r.type, r.content);
      const og = m.openGraph?.images;
      const tw = m.twitter;
      if (!Array.isArray(og) || og.length === 0) missing.push(`${r.path} og:image`);
      if ((tw as { card?: string })?.card !== "summary_large_image") missing.push(`${r.path} twitter:card`);
    }
    expect(missing).toEqual([]);
  });

  it("DEFAULT_OG_IMAGE is an absolute 1200x630 URL on this origin", () => {
    expect(DEFAULT_OG_IMAGE.url.startsWith(site.url)).toBe(true);
    expect(DEFAULT_OG_IMAGE.width).toBe(1200);
    expect(DEFAULT_OG_IMAGE.height).toBe(630);
    expect(DEFAULT_OG_IMAGE.alt.length).toBeGreaterThan(20);
  });
});

// ---------------------------------------------------------------------------
// 3. No stale price strings anywhere in generated metadata
// ---------------------------------------------------------------------------

describe("prices derive from packages.ts", () => {
  it("no stale price string appears in any generated metadata", () => {
    const hits: string[] = [];
    const check = (label: string, m: Record<string, unknown>) => {
      for (const s of metadataStrings(m)) {
        for (const bad of STALE_PRICE_STRINGS) {
          if (s.includes(bad)) hits.push(`${label}: "${bad}" in "${s.slice(0, 90)}"`);
        }
      }
    };
    for (const r of landingRows) check(r.path, landingMetadata(r.type, r.content) as Record<string, unknown>);
    for (const t of freeToolsByOrder) check(toolPath(t.slug), toolMetadata(t) as Record<string, unknown>);
    check("/tools", toolsHubMetadata() as Record<string, unknown>);
    expect(hits).toEqual([]);
  });

  it("every Offer price in the identity graph comes from packages.ts", () => {
    const allowed = new Set<number>([...packages.map((p) => p.price), carePlan.monthly]);
    const catalog = organizationSchema().hasOfferCatalog as {
      itemListElement: Record<string, unknown>[];
    };
    const bad = catalog.itemListElement
      .map((o) => o.price as number)
      .filter((p) => !allowed.has(p));
    expect(bad).toEqual([]);
    expect(catalog.itemListElement).toHaveLength(packages.length + 1);
  });

  it("landing Service nodes reference a package Offer by @id rather than restating a price", () => {
    const restated: string[] = [];
    for (const r of landingRows) {
      for (const node of landingSchema(r.type, r.content)) {
        const offers = node.offers as Record<string, unknown> | undefined;
        if (!offers) continue;
        if (!("@id" in offers)) restated.push(`${r.path} restates ${JSON.stringify(offers).slice(0, 60)}`);
      }
    }
    expect(restated).toEqual([]);
  });

  it("priceRange is derived, not the old invented '$$' or a hand-typed band", () => {
    const pr = organizationSchema().priceRange as string;
    expect(pr).not.toBe("$$");
    expect(pr).toContain(String(Math.min(...packages.map((p) => p.price)).toLocaleString("en-CA")));
    expect(pr).toContain(site.currency);
  });
});

// ---------------------------------------------------------------------------
// 4. Sitemap
// ---------------------------------------------------------------------------

describe("sitemap", () => {
  it("has no duplicates and every URL is absolute, clean and on this origin", () => {
    const urls = sitemapUrls();
    expect(new Set(urls).size).toBe(urls.length);
    const bad = urls.filter(
      (u) => !u.startsWith(site.url) || u.includes("?") || u.includes("#") || u.endsWith("/")
    );
    expect(bad).toEqual([]);
  });

  it("contains the hub routes that were indexable but missing, and none of the thin sub-demos", () => {
    // 06-technical-seo.md §3.2 listed eight. /tools/form-filler is excluded:
    // 03-content-dispositions.md Appendix marks it NOINDEX.
    for (const p of ["/creators", "/demo", "/start"]) {
      expect(sitemapPathSet.has(p), `${p} missing from sitemap`).toBe(true);
    }
    expect(sitemapPathSet.has("/tools/form-filler"), "/tools/form-filler is NOINDEX, must not be in the sitemap").toBe(false);

    // The four sub-demos run 111–141 words (S3-seo-content-challenge.md §1.6,
    // rows 10–13). They are functional widgets, not documents. The ROUTES stay
    // and stay linked from /demo — only the sitemap entries go, so a release
    // whose purpose is consolidation stops adding sub-150-word pages to the
    // index. If one of these ever grows into a real page, delete it from this
    // list rather than quietly re-adding it to the sitemap.
    for (const p of ["/demo/assistant", "/demo/lead", "/demo/nudge", "/demo/quote"]) {
      expect(sitemapPathSet.has(p), `${p} is too thin to be indexed and must stay out of the sitemap`).toBe(false);
    }
  });

  it("contains no route that lib/redirects.js redirects", () => {
    const offenders = sitemapPaths.filter((p) => isRedirected(p));
    expect(offenders).toEqual([]);
  });

  it("contains no private or app-only route", () => {
    const privatePrefixes = ["/login", "/cart", "/dashboard", "/account", "/agent", "/api", "/products", "/v2"];
    const offenders = sitemapPaths.filter((p) => privatePrefixes.some((x) => p === x || p.startsWith(`${x}/`)));
    expect(offenders).toEqual([]);
  });

  it("lastModified is real: parseable, not in the future, and not all identical", () => {
    const dates = sitemapRoutes()
      .map((r) => r.lastModified)
      .filter((d): d is string => Boolean(d));
    expect(dates.length).toBeGreaterThan(0);
    const now = Date.now();
    for (const d of dates) {
      expect(d, `"${d}" is not YYYY-MM-DD`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const t = new Date(`${d}T00:00:00Z`).getTime();
      expect(Number.isNaN(t), `"${d}" does not parse`).toBe(false);
      expect(t, `${d} is in the future`).toBeLessThanOrEqual(now);
      expect(t, `${d} predates the repo`).toBeGreaterThanOrEqual(new Date("2026-06-01T00:00:00Z").getTime());
    }
    // The original defect: every URL claiming the same build timestamp.
    expect(new Set(dates).size, "all lastmod values are identical — that is the build-timestamp bug").toBeGreaterThan(1);
  });

  it("the lastmod tables cover every page type and static route in the sitemap", () => {
    const uncovered = sitemapRoutes().filter((r) => !r.lastModified);
    expect(uncovered.map((r) => `${r.path} (${r.source})`)).toEqual([]);
    for (const g of landingGroups) {
      expect(REGISTRY_LASTMOD[g.type], `no lastmod row for page type "${g.type}"`).toBeTruthy();
    }
    expect(Object.keys(STATIC_LASTMOD).length).toBeGreaterThanOrEqual(20);
  });
});

// ---------------------------------------------------------------------------
// 5. Redirects
// ---------------------------------------------------------------------------

describe("redirects", () => {
  it("every source is unique", () => {
    const sources = redirects.map((r) => r.source);
    const dupes = sources.filter((s, i) => sources.indexOf(s) !== i);
    expect(dupes).toEqual([]);
  });

  it("no chains — a destination is never also a source", () => {
    const sources = new Set(redirects.map((r) => r.source));
    const chained = redirects.filter((r) => sources.has(r.destination));
    expect(chained.map((r) => `${r.source} → ${r.destination} (which also redirects)`)).toEqual([]);
  });

  it("no loops — a redirect never points at itself", () => {
    expect(redirects.filter((r) => r.source === r.destination).map((r) => r.source)).toEqual([]);
  });

  it("every destination is a route this app can serve", () => {
    const unknown = redirects
      .filter((r) => !knownRoutes.has(r.destination) && r.destination !== "/")
      .map((r) => `${r.source} → ${r.destination} (destination is not a known route)`);
    expect(unknown).toEqual([]);
  });

  it("every destination is site-root-relative and permanent (308)", () => {
    const bad = redirects.filter((r) => !r.destination.startsWith("/") || r.permanent !== true);
    expect(bad.map((r) => `${r.source} → ${r.destination} permanent=${r.permanent}`)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 5b. next.config.js — the redirect map the platform actually serves
// ---------------------------------------------------------------------------

import nextConfig from "../next.config.js";

type NextRedirect = { source: string; destination: string; permanent?: boolean };

async function configRedirects(): Promise<NextRedirect[]> {
  const cfg = nextConfig as unknown as { redirects?: () => Promise<NextRedirect[]> };
  return cfg.redirects ? await cfg.redirects() : [];
}

/** "/products/:path*" → "/products" for comparison against concrete paths. */
function sourcePrefix(source: string): string {
  const i = source.indexOf("/:");
  return i === -1 ? source : source.slice(0, i);
}

describe("next.config.js redirect map", () => {
  it("merges lib/redirects.js without dropping or duplicating a source", async () => {
    const all = await configRedirects();
    const sources = all.map((r) => r.source);
    expect(sources.filter((s, i) => sources.indexOf(s) !== i), "duplicate redirect source").toEqual([]);
    for (const r of redirects) {
      expect(sources, `${r.source} from lib/redirects.js is missing from next.config.js`).toContain(r.source);
    }
  });

  it("still fixes /products — the live 307 with no Location header", async () => {
    const all = await configRedirects();
    const products = all.filter((r) => sourcePrefix(r.source) === "/products");
    expect(products.length, "/products has no redirect rule").toBeGreaterThan(0);
    for (const r of products) {
      expect(r.destination).toBe("/solutions");
      expect(r.permanent, "/products must be a 308, not a 307").toBe(true);
    }
  });

  it("every redirect is permanent (308) and points at a root-relative path", async () => {
    const bad = (await configRedirects()).filter(
      (r) => r.permanent !== true || !r.destination.startsWith("/")
    );
    expect(bad.map((r) => `${r.source} → ${r.destination} permanent=${r.permanent}`)).toEqual([]);
  });

  it("no chains — no destination is itself a redirect source", async () => {
    const all = await configRedirects();
    const prefixes = all.map((r) => sourcePrefix(r.source));
    const chained = all.filter((r) => prefixes.includes(r.destination));
    expect(chained.map((r) => `${r.source} → ${r.destination} (which also redirects)`)).toEqual([]);
  });

  it("no sitemap URL is a redirect source at the platform level either", async () => {
    const all = await configRedirects();
    const offenders: string[] = [];
    for (const r of all) {
      const prefix = sourcePrefix(r.source);
      for (const p of sitemapPaths) {
        if (p === prefix || (r.source !== prefix && p.startsWith(`${prefix}/`))) {
          offenders.push(`${p} is in the sitemap and redirects to ${r.destination}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 6. Structured data: exactly one identity
// ---------------------------------------------------------------------------

const ORG_TYPES = new Set(["Organization", "LocalBusiness", "ProfessionalService", "Corporation"]);

function identityIdsIn(nodes: Record<string, unknown>[]): string[] {
  return nodes
    .filter((n) => typesOf(n).some((t) => ORG_TYPES.has(t)))
    .map((n) => String(n["@id"] ?? "(no @id)"));
}

describe("schema identity", () => {
  it("the sitewide graph declares exactly one Organization-class node", () => {
    const ids = identityIdsIn(nodesOf(toGraph(identityGraph())));
    expect(ids).toEqual([ORG_ID]);
  });

  it("the identity graph is Organization + WebSite + Person, all cross-linked by @id", () => {
    const nodes = nodesOf(toGraph(identityGraph()));
    expect(nodes).toHaveLength(3);
    const org = nodes.find((n) => n["@id"] === ORG_ID)!;
    const web = nodes.find((n) => n["@id"] === WEBSITE_ID)!;
    const person = nodes.find((n) => n["@id"] === FOUNDER_ID)!;
    expect(org).toBeTruthy();
    expect(web.publisher).toEqual({ "@id": ORG_ID });
    expect(person.worksFor).toEqual({ "@id": ORG_ID });
    expect(org.founder).toEqual({ "@id": FOUNDER_ID });
    expect(typesOf(person)).toEqual(["Person"]);
    expect(person.name).toBe(site.founder);
  });

  it("no landing page re-declares an identity node", () => {
    const offenders: string[] = [];
    for (const r of landingRows) {
      const ids = identityIdsIn(nodesOf(toGraph(landingSchema(r.type, r.content))));
      if (ids.length) offenders.push(`${r.path} declares ${ids.join(", ")}`);
    }
    expect(offenders).toEqual([]);
  });

  it("every provider / author / publisher points at the one identity", () => {
    const bad: string[] = [];
    const REF_KEYS = ["provider", "publisher"];
    for (const r of landingRows) {
      for (const node of landingSchema(r.type, r.content)) {
        for (const k of REF_KEYS) {
          const v = node[k] as { "@id"?: string } | undefined;
          if (v && v["@id"] !== ORG_ID) bad.push(`${r.path} ${k} → ${JSON.stringify(v)}`);
        }
        const author = node.author as { "@id"?: string } | undefined;
        if (author && author["@id"] !== FOUNDER_ID && author["@id"] !== ORG_ID) {
          bad.push(`${r.path} author → ${JSON.stringify(author)}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it("the identity carries no unverifiable field", () => {
    const org = organizationSchema();
    for (const forbidden of [
      "telephone",
      "faxNumber",
      "geo",
      "openingHours",
      "openingHoursSpecification",
      "aggregateRating",
      "review",
      "foundingDate",
      "numberOfEmployees",
    ]) {
      expect(org[forbidden], `identity must not claim ${forbidden}`).toBeUndefined();
    }
    const address = org.address as Record<string, unknown>;
    expect(address.streetAddress, "no verified street address exists").toBeUndefined();
    expect(address.postalCode, "no verified postal code exists").toBeUndefined();
  });

  it("sameAs contains only real absolute URLs — never '#'", () => {
    for (const node of [organizationSchema(), founderSchema()]) {
      const same = (node.sameAs as string[] | undefined) ?? [];
      for (const u of same) {
        expect(u).not.toBe("#");
        expect(u.startsWith("https://"), `${u} is not an absolute https URL`).toBe(true);
      }
    }
  });

  it("areaServed is the narrowed BC service area — no 'Worldwide', no invented country", () => {
    const flat = JSON.stringify(organizationSchema().areaServed);
    expect(flat).not.toContain("Worldwide");
    expect(flat).not.toContain("Remote");
    for (const place of site.serviceArea) expect(flat).toContain(place);

    // …and no landing page claims Worldwide either (was on all 169, including
    // the 19 /locations/* pages).
    const offenders: string[] = [];
    for (const r of landingRows) {
      for (const node of landingSchema(r.type, r.content)) {
        if (JSON.stringify(node.areaServed ?? "").includes("Worldwide")) offenders.push(r.path);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("every landing page emits exactly one WebPage and one BreadcrumbList", () => {
    const bad: string[] = [];
    for (const r of landingRows) {
      const nodes = landingSchema(r.type, r.content);
      const pages = nodes.filter((n) =>
        typesOf(n).some((t) => t.endsWith("Page") && t !== "FAQPage")
      );
      const crumbs = nodes.filter((n) => typesOf(n).includes("BreadcrumbList"));
      if (pages.length !== 1) bad.push(`${r.path} has ${pages.length} WebPage nodes`);
      if (crumbs.length !== 1) bad.push(`${r.path} has ${crumbs.length} BreadcrumbList nodes`);
    }
    expect(bad).toEqual([]);
  });

  it("every generated graph is valid JSON and contains no raw '</script'", () => {
    const graphs = [
      identityGraph(),
      serviceSchema(),
      [carePlanOffer()],
      ...landingRows.slice(0, 40).map((r) => landingSchema(r.type, r.content)),
    ];
    for (const g of graphs) {
      const json = serializeJsonLd(toGraph(g));
      expect(json.toLowerCase()).not.toContain("</script");
      expect(() => JSON.parse(json)).not.toThrow();
    }
  });
});

// ---------------------------------------------------------------------------
// 7. FAQPage honesty
// ---------------------------------------------------------------------------

describe("FAQPage matches rendered content", () => {
  const items = [{ q: "Does this work?", a: "Yes." }];

  it("emits nothing unless the caller asserts the answers are in the HTML", () => {
    expect(isEmittableNode(faqSchema(items, { answersRendered: false }))).toBe(false);
    expect(isEmittableNode(faqSchema(items, { answersRendered: true }))).toBe(true);
    expect(isEmittableNode(faqSchema([], { answersRendered: true }))).toBe(false);
  });

  it("a suppressed FAQPage never reaches the rendered graph", () => {
    const graph = toGraph([breadcrumbSchema([{ name: "Home", path: "/" }]), faqSchema(items)]);
    expect(nodesOf(graph).some((n) => typesOf(n).includes("FAQPage"))).toBe(FAQ_ANSWERS_RENDERED);
  });

  it("landing pages emit FAQPage only while the renderer keeps every answer in the DOM", () => {
    const withFaqs = landingRows.filter((r) => r.content.faqs.length > 0);
    expect(withFaqs.length).toBeGreaterThan(0);
    const emitting = withFaqs.filter((r) =>
      landingSchema(r.type, r.content).some((n) => typesOf(n).includes("FAQPage"))
    );
    expect(emitting.length > 0).toBe(FAQ_ANSWERS_RENDERED);
  });

  /**
   * THE COUPLING — the reason FAQ_ANSWERS_RENDERED is allowed to be `true`.
   *
   * Every component that renders an FAQ must keep all answers in the
   * server-rendered HTML. `<details>` and a `hidden` attribute both do; a
   * conditional mount (`{isOpen && …}`, framer `AnimatePresence`) does not.
   * This reads the component sources so a revert to conditional mounting fails
   * here instead of silently re-publishing schema for invisible answers.
   */
  it("every FAQ renderer keeps all answers in the server-rendered HTML", () => {
    const detailsRenderers = ["components/FAQSection.tsx", "components/tools/ToolShell.tsx"];
    for (const file of detailsRenderers) {
      const src = readFileSync(resolve(__dirname, "..", file), "utf8");
      expect(src, `${file} no longer uses <details>`).toContain("<details");
      expect(src, `${file} reintroduced AnimatePresence around FAQ answers`).not.toContain(
        "<AnimatePresence"
      );
    }
    // The homepage accordion keeps its answers mounted via the `hidden`
    // attribute rather than <details>.
    const interactive = readFileSync(
      resolve(__dirname, "..", "components/marketing/Interactive.tsx"),
      "utf8"
    );
    expect(interactive, "homepage FAQ must stay mounted via hidden={!isOpen}").toContain(
      "hidden={!isOpen}"
    );
    expect(interactive, "homepage FAQ must not conditionally mount its answers").not.toContain(
      "{isOpen && "
    );
  });
});

// ---------------------------------------------------------------------------
// 8. The three URL lists agree
// ---------------------------------------------------------------------------

describe("one URL list", () => {
  it("websiteSchema and organizationSchema agree on the origin", () => {
    expect(websiteSchema().url).toBe(site.url);
    expect(organizationSchema().url).toBe(site.url);
  });

  it("every sitemap path is a route the registries know about", () => {
    const unknown = sitemapPaths.filter((p) => p !== "" && !knownRoutes.has(p));
    expect(unknown).toEqual([]);
  });
});
