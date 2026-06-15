import { site } from "@/lib/data/site";
import { packages, carePlan, formatPackagePrice } from "@/lib/data/packages";
import { landingGroups } from "@/lib/data/registry";

// /llms.txt — a map of the site for AI search/answer engines (GEO).
// Spec: https://llmstxt.org . Generated from the same data as the sitemap.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.legalName} (${site.name})`);
  lines.push("");
  lines.push(
    `> ${site.tagline} ${site.subTagline} Based in ${site.region}, ${site.country}; serves Canada and remote worldwide.`
  );
  lines.push("");
  lines.push(
    "Handbuilt is a one-person AI studio that designs and builds custom AI apps, agents, chatbots, and automations for small and local businesses. Every build is trained on the client's real business and built by hand, not assembled from a template."
  );
  lines.push("");

  lines.push("## Pricing (CAD)");
  for (const p of packages) {
    lines.push(`- ${p.name} — ${formatPackagePrice(p)} CAD. ${p.tagline} (${p.timeline})`);
  }
  lines.push(
    `- ${carePlan.name} — $${carePlan.monthly}/mo CAD. Ongoing hosting, monitoring, and monthly tweaks.`
  );
  lines.push("");

  lines.push("## Key pages");
  lines.push(`- [Pricing](${site.url}/pricing): Full pricing and what each package includes.`);
  lines.push(`- [Start a build](${site.url}/create): Request a plan and fixed quote.`);
  lines.push(`- [Services](${site.url}/services): All AI tools and builds.`);
  lines.push(`- [Industries](${site.url}/industries): AI automation by trade.`);
  lines.push("");

  for (const g of landingGroups) {
    if (!g.items.length) continue;
    lines.push(`## ${g.label}`);
    for (const it of g.items) {
      const path = g.type === "money" ? `/${it.slug}` : `${g.hub}/${it.slug}`;
      lines.push(`- [${it.h1}](${site.url}${path}): ${it.description}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
