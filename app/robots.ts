import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

/**
 * Explicitly WELCOME AI crawlers — we want to be cited by ChatGPT, Perplexity,
 * Claude, Google AI Overviews, etc. (GEO). Every agent below gets `allow: "/"`.
 * Nothing that matters to answer engines is blocked.
 *
 * Only private app surfaces are disallowed. Added 2026-08-30:
 *  - /account   — 307s to /login when signed out and already carries a noindex
 *                 meta tag; disallowed for symmetry with /login and /cart.
 *  - /products  — was an indexable, non-disallowed URL that answered 307 with no
 *                 Location header on production. Now a 308 in next.config.js;
 *                 disallowed so the dead prefix stops being crawled at all.
 *  - /v2        — public/v2/index.html, a 610 KB stray "Bundled Page" serving
 *                 200 with no canonical and no robots directive. Now redirected
 *                 in next.config.js; disallowed as belt and braces.
 *
 * KNOWN TENSION (deliberate, see HANDOFF-B-to-integrator.md): Disallow also
 * stops a crawler reading a `noindex` on those paths, so a URL that gets linked
 * externally can still be indexed URL-only. The correct end state is segment
 * metadata `robots: { index: false }` on /login, /cart, /dashboard, /agent AND
 * removing them from this list. Those segment layouts belong to another lane;
 * until they exist, removing the Disallow would make the pages MORE indexable,
 * so the Disallow stays.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/api/",
    "/agent/",
    // The owner's lead inbox. Already unreachable without an allowlisted
    // session, and it carries robots: { index: false } — this is belt and
    // braces so a crawler never spends a request on it.
    "/admin",
    "/dashboard",
    "/login",
    "/cart",
    "/account",
    "/products",
    "/v2",
  ];

  // AI search / answer engines — named explicitly so the intent is legible.
  // Each already inherits Allow from "*"; naming them changes no access, it
  // just makes the welcome unambiguous and survives a future "*" tightening.
  const aiAgents = [
    "GPTBot", // OpenAI training/crawl
    "OAI-SearchBot", // ChatGPT search index
    "ChatGPT-User", // ChatGPT browsing on a user's behalf
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot", // Anthropic crawler
    "Claude-User", // Claude browsing on a user's behalf
    "Claude-SearchBot", // Claude search index
    "Claude-Web", // legacy Anthropic UA, kept so old configs still match
    "anthropic-ai",
    "Google-Extended", // Gemini / AI Overviews grounding
    "Applebot-Extended",
    "Bingbot",
    "CCBot", // Common Crawl — feeds most open models
    "meta-externalagent", // Meta AI
    "Amazonbot",
    "cohere-ai",
    "DuckAssistBot",
    "MistralAI-User",
    "YouBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiAgents.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
