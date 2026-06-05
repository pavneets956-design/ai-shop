import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { useCases } from "@/lib/data/useCases";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/solutions", "/use-cases", "/pricing", "/faq", "/about", "/create"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const useCaseRoutes = useCases.map((u) => ({
    url: `${site.url}/use-cases/${u.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...useCaseRoutes];
}
