import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { allLandingEntries } from "@/lib/data/registry";
import { freeToolsByOrder, toolPath } from "@/lib/data/freeTools";

/**
 * NOTE ON `lastModified` — deliberately omitted.
 *
 * Every entry previously carried `new Date()` evaluated at build time, so all 216
 * URLs claimed the same modification timestamp and every one of them "changed"
 * again on each deploy, whether or not a single word had.
 *
 * Google only honours lastmod when it is "consistently and verifiably accurate";
 * a value that is always today is the textbook case of the opposite, and the
 * documented consequence is that the signal is discarded for the whole site.
 * An absent lastmod is strictly better than a false one.
 *
 * There is currently no real per-page modification date to substitute: none of
 * the content files in lib/data carry an `updated` field. Adding genuine dates is
 * worth doing, but they have to be real — inventing them would recreate exactly
 * the problem this removes. Until then, no claim is made.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Top-level + hub routes.
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/industries", priority: 0.9 },
    { path: "/locations", priority: 0.8 },
    { path: "/solutions", priority: 0.8 },
    { path: "/use-cases", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/how-to", priority: 0.7 },
    { path: "/compare", priority: 0.7 },
    { path: "/pricing", priority: 0.9 },
    { path: "/shop", priority: 0.7 },
    { path: "/tools", priority: 0.8 },
    { path: "/faq", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/create", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  // Free contractor tools (each a unique indexable page).
  const toolEntries = freeToolsByOrder.map((t) => ({
    url: `${site.url}${toolPath(t.slug)}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticEntries = staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));

  const landingEntries = allLandingEntries().map((e) => ({
    url: `${site.url}${e.path}`,
    changeFrequency: "monthly" as const,
    priority: e.priority,
  }));

  return [...staticEntries, ...toolEntries, ...landingEntries];
}
