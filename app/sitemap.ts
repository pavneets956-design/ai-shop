import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { allLandingEntries } from "@/lib/data/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top-level + hub routes.
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/industries", priority: 0.9 },
    { path: "/solutions", priority: 0.8 },
    { path: "/use-cases", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/how-to", priority: 0.7 },
    { path: "/compare", priority: 0.7 },
    { path: "/pricing", priority: 0.9 },
    { path: "/shop", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/create", priority: 0.9 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  const staticEntries = staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));

  const landingEntries = allLandingEntries().map((e) => ({
    url: `${site.url}${e.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: e.priority,
  }));

  return [...staticEntries, ...landingEntries];
}
