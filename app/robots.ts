import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

// Explicitly WELCOME AI crawlers — we want to be cited by ChatGPT, Perplexity,
// Claude, Google AI Overviews, etc. (GEO). Block only private app surfaces.
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/agent/", "/dashboard", "/login", "/cart"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // AI search / answer engines — allowed on purpose
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Perplexity-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
