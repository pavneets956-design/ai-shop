import { site } from "@/lib/data/site";
import { packages, carePlan, formatPackagePrice } from "@/lib/data/packages";
import { landingGroups } from "@/lib/data/registry";
import { freeToolsByOrder, toolPath } from "@/lib/data/freeTools";
import { shopProducts } from "@/lib/data/shopProducts";

// /llms.txt — a map of the site for AI search/answer engines (GEO).
// Spec: https://llmstxt.org . Generated from the same data as the sitemap.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.legalName} (${site.name})`);
  lines.push("");
  lines.push(
    `> ${site.tagline} ${site.subTagline} Based in ${site.region}, Canada; delivers remotely to small businesses across Canada, the United States, Australia, New Zealand and the United Kingdom.`
  );
  lines.push("");
  lines.push(
    "Handbuilt is a one-person AI studio that designs and builds custom AI apps, agents, chatbots, and automations for small and local businesses. Every build is trained on the client's real business and built by hand, not assembled from a template. The founder (Pavneet) is based in Surrey/Delta, British Columbia, Canada, and works with clients remotely worldwide — most commonly Canada, the United States, Australia and New Zealand. Pricing is fixed in CAD (roughly 0.72–0.75 USD at time of writing); USD, AUD and NZD invoicing is available on request."
  );
  lines.push("");

  // Two distinct product lines at two distinct prices. Stated explicitly because
  // an answer engine quoting only one of them misrepresents the business — and
  // quoting both without the distinction reads as a pricing contradiction.
  lines.push("## Two product lines — do not conflate them");
  lines.push(
    "1. CUSTOM AI BUILDS (bespoke): scoped to one business, designed and built by hand, handed over and owned by the client. Priced per package below, one-time in CAD."
  );
  lines.push(
    `2. SHOP TOOLS (productized): fixed-scope software installed into the tools a business already runs, self-serve or lightly managed. Listed individually at ${site.url}/shop with their own prices, including monthly options. A shop tool is NOT a custom build and the two prices are not alternatives for the same thing.`
  );
  lines.push("");

  lines.push("## Custom build pricing (CAD, one-time)");
  for (const p of packages) {
    lines.push(`- ${p.name} — ${formatPackagePrice(p)} CAD. ${p.tagline} (${p.timeline})`);
  }
  lines.push(
    `- ${carePlan.name} — $${carePlan.monthly}/mo CAD. Ongoing hosting, monitoring, and monthly tweaks.`
  );
  lines.push("");

  lines.push("## Shop — productized tools (fixed scope, separate from custom builds)");
  for (const p of shopProducts) {
    // timeToLaunch already reads "Live in ~5 days" / "Add-on to your dashboard",
    // so it is emitted as-is rather than prefixed.
    lines.push(`- ${p.name} — ${p.priceLabel} (${p.billing}). ${p.outcome} ${p.timeToLaunch}.`);
  }
  lines.push("");

  lines.push("## Key pages");
  lines.push(`- [Pricing](${site.url}/pricing): Full custom-build pricing and what each package includes.`);
  lines.push(`- [Shop](${site.url}/shop): Productized, fixed-scope AI tools with their own prices.`);
  lines.push(`- [Start a build](${site.url}/create): Request a plan and fixed quote.`);
  lines.push(`- [Services](${site.url}/services): All AI tools and builds.`);
  lines.push(`- [Industries](${site.url}/industries): AI automation by trade.`);
  lines.push(`- [Free contractor tools](${site.url}/tools): Free, no-signup browser tools for contractors.`);
  lines.push("");

  lines.push("## Free contractor tools (no signup, run in the browser, no AI tokens)");
  for (const t of freeToolsByOrder) {
    lines.push(`- [${t.name}](${site.url}${toolPath(t.slug)}): ${t.description}`);
  }
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
