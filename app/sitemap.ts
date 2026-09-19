import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { landingGroups } from "@/lib/data/registry";
import { useCases } from "@/lib/data/useCases";
import { landingPath } from "@/lib/data/landing";
import { freeToolsByOrder, toolPath } from "@/lib/data/freeTools";
import { REGISTRY_LASTMOD, STATIC_LASTMOD, isNoindexEntry, lastmodForType } from "@/lib/seo";
import * as redirectsModule from "@/lib/redirects";

export interface RedirectRow {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * `lib/redirects.js` is CommonJS with hand-written JSDoc (Lane D owns it), so
 * its inferred TypeScript shape is not trustworthy. Normalise defensively — an
 * unreadable registry must degrade to "no known redirects", never crash the
 * sitemap, and never silently type-error the build.
 */
export function registryRedirects(): RedirectRow[] {
  const mod = redirectsModule as unknown as {
    redirects?: RedirectRow[];
    default?: { redirects?: RedirectRow[] };
  };
  const rows = mod?.redirects ?? mod?.default?.redirects;
  return Array.isArray(rows) ? rows : [];
}

/**
 * THE canonical list of indexable URLs. `app/api/indexnow/route.ts`,
 * `app/llms.txt/route.ts` and `tests/seo-static.test.ts` all import from here,
 * so the three URL lists that used to be hand-typed separately cannot drift.
 *
 * `lastModified` is REAL: a committed per-source-file date from `git log`
 * (lib/seo.ts §3), not `new Date()`. Every entry previously carried a build-time
 * timestamp, so all 216 URLs claimed the same date and "changed" again on every
 * deploy — the textbook case of a lastmod Google discards site-wide. A date is
 * emitted only when it is known; otherwise the field is omitted entirely.
 */
export interface SitemapRoute {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
  /** ISO YYYY-MM-DD, or undefined when no real date is known. */
  lastModified?: string;
  /** Which registry produced it — for tests and debugging. */
  source: string;
}

/**
 * Top-level + hub routes.
 *
 * Added 2026-08-30 (06-technical-seo.md §3.2 — indexable, linked, 200, but
 * missing): /creators (GSC pos 8.0), /demo (pos 3.7) and /start.
 *
 * The four sub-demos (/demo/assistant, /demo/lead, /demo/nudge, /demo/quote)
 * were added by that same pass and REMOVED again on 2026-08-30 by the second
 * consolidation pass. At 111–141 words each they are functional widgets, not
 * documents, and a release whose stated purpose is consolidation should not be
 * adding four sub-150-word pages to the index. THE ROUTES ARE KEPT: they stay
 * linked from /demo, which is in the sitemap and ranks at position 3.7, so the
 * intent is still served and the demos are still reachable.
 *
 * NOT added: /tools/form-filler. 03-content-dispositions.md Appendix marks it
 * NOINDEX (R5 P3), so putting it in the sitemap would contradict the
 * disposition. It is also unlinked from /tools.
 */
const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/industries", priority: 0.9 },
  { path: "/locations", priority: 0.8 },
  { path: "/solutions", priority: 0.8 },
  { path: "/use-cases", priority: 0.8 },
  { path: "/resources", priority: 0.8 },
  { path: "/how-to", priority: 0.7 },
  { path: "/compare", priority: 0.7 },
  { path: "/creators", priority: 0.7 },
  { path: "/pricing", priority: 0.9 },
  { path: "/shop", priority: 0.7 },
  { path: "/tools", priority: 0.8 },
  { path: "/faq", priority: 0.6 },
  { path: "/about", priority: 0.6 },
  { path: "/create", priority: 0.9 },
  { path: "/start", priority: 0.7 },
  { path: "/demo", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

/**
 * Redirect sources, as plain paths, from the ONE registry that next.config.js
 * also reads. A URL that redirects must never be advertised as canonical.
 * Parameterised sources ("/products/:path*") are reduced to a prefix so both
 * "/products" and "/products/anything" are caught.
 */
function redirectMatchers(): { exact: Set<string>; prefixes: string[] } {
  const exact = new Set<string>();
  const prefixes: string[] = [];
  for (const r of registryRedirects()) {
    const i = r.source.indexOf("/:");
    if (i === -1) {
      exact.add(r.source);
    } else {
      const prefix = r.source.slice(0, i);
      exact.add(prefix);
      prefixes.push(prefix + "/");
    }
  }
  return { exact, prefixes };
}

/** True when `path` is the SOURCE of a redirect — i.e. never canonical. */
export function isRedirected(path: string): boolean {
  const { exact, prefixes } = redirectMatchers();
  if (exact.has(path)) return true;
  return prefixes.some((p) => path.startsWith(p));
}

/** Every indexable route on the site, with a real lastmod where one is known. */
export function sitemapRoutes(): SitemapRoute[] {
  const out: SitemapRoute[] = [];

  for (const r of STATIC_ROUTES) {
    out.push({
      path: r.path,
      priority: r.priority,
      changeFrequency: "weekly",
      lastModified: STATIC_LASTMOD[r.path],
      source: "static",
    });
  }

  for (const t of freeToolsByOrder) {
    out.push({
      path: toolPath(t.slug),
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: REGISTRY_LASTMOD.tool,
      source: "tool",
    });
  }

  for (const g of landingGroups) {
    for (const it of g.items) {
      // A row flagged noindex (Lane P/F adds the field to LandingContent) must
      // never enter the sitemap. Read defensively so this works either way.
      if (isNoindexEntry(it)) continue;
      out.push({
        path: landingPath(g.type, it.slug),
        priority: g.priority,
        changeFrequency: "monthly",
        lastModified: it.updatedAt ?? lastmodForType(g.type),
        source: g.type,
      });
    }
  }

  for (const u of useCases) {
    out.push({
      path: `/use-cases/${u.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: REGISTRY_LASTMOD.usecase,
      source: "usecase",
    });
  }

  // Guard rails: no redirect source, no duplicate. Both were possible before —
  // nothing stopped a slug retired via a redirect from staying in its data file,
  // and Lane D's registry retires 46 of them in this release.
  const { exact, prefixes } = redirectMatchers();
  const seen = new Set<string>();
  return out.filter((r) => {
    if (seen.has(r.path)) return false;
    if (exact.has(r.path) || prefixes.some((p) => r.path.startsWith(p))) return false;
    seen.add(r.path);
    return true;
  });
}

/** Absolute URLs for every indexable route. */
export function sitemapUrls(): string[] {
  return sitemapRoutes().map((r) => `${site.url}${r.path}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes().map((r) => ({
    url: `${site.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    // Only when a real date exists. `new Date(...)` on a YYYY-MM-DD string is
    // parsed as UTC midnight, which is exactly what <lastmod> wants.
    ...(r.lastModified && { lastModified: new Date(`${r.lastModified}T00:00:00Z`) }),
  }));
}
