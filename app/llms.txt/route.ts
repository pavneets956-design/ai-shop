import { site } from "@/lib/data/site";
import { packages, carePlan, formatPackagePrice } from "@/lib/data/packages";
import { landingGroups } from "@/lib/data/registry";
import { landingPath } from "@/lib/data/landing";
import { freeToolsByOrder, toolPath } from "@/lib/data/freeTools";
import { shopProducts } from "@/lib/data/shopProducts";
import { sitemapUrls } from "@/app/sitemap";

// /llms.txt — a map of the site for AI search/answer engines (GEO).
// Spec: https://llmstxt.org . Generated from the same data as the sitemap.
//
// Rules this file obeys (2026-08-30):
//  1. Every price is derived from packages.ts / shopProducts.ts. Never hand-typed.
//     Production shipped "$2,500–5,000 CAD" here long after the real price moved.
//  2. Every link is checked against the sitemap before it is emitted, so a
//     redirected or noindexed page can never be advertised to an answer engine.
//  3. No claim that rots. The old copy carried a hand-typed FX rate ("roughly
//     0.72–0.75 USD at time of writing") — removed.
//  4. Geography comes from site.serviceArea, not from prose. The old copy claimed
//     delivery across the US, Australia, New Zealand and the UK, which contradicts
//     the narrowed BC service area the rest of the site now states.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  const indexable = new Set(sitemapUrls());

  /** Emit a link only if the sitemap says the URL is canonical and indexable. */
  const link = (path: string, label: string, note: string) => {
    const url = `${site.url}${path}`;
    if (!indexable.has(url)) return;
    lines.push(`- [${label}](${url}): ${note}`);
  };

  const places = site.serviceArea.filter((p) => p !== "British Columbia");
  const floor = formatPackagePrice(packages[0]).replace(/^From /, "");

  lines.push(`# ${site.legalName} (${site.name})`);
  lines.push("");
  lines.push(
    `> ${site.tagline} Done-for-you AI receptionists, quote follow-up and admin automation for contractors and local service businesses in ${site.region}, Canada.`
  );
  lines.push("");
  lines.push(
    `${site.name} is a one-person AI studio run by ${site.founder}, based in ${site.region}, Canada. ` +
      `Every build is designed around one business's real services, prices, hours and tools — built by hand, ` +
      `not assembled from a template — and installed inside the phone number and accounts the business already owns. ` +
      `Pricing is fixed in ${site.currency}, from ${floor}.`
  );
  lines.push("");

  lines.push("## Contact");
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Request a build: ${site.url}/create (a request form — there is no self-serve checkout and no calendar booking)`);
  lines.push(`- Service area: ${places.join(", ")} — British Columbia, Canada`);
  lines.push("");

  // Two distinct product lines at two distinct prices. Stated explicitly because
  // an answer engine quoting only one of them misrepresents the business — and
  // quoting both without the distinction reads as a pricing contradiction.
  lines.push("## Two product lines — do not conflate them");
  lines.push(
    "1. CUSTOM AI BUILDS (bespoke): scoped to one business, designed and built by hand, handed over and owned by the client. Priced per package below, one-time in CAD."
  );
  lines.push(
    // Do NOT describe these as "self-serve". There is no checkout: every shop CTA
    // routes to /create?build=<slug>, i.e. a request form. Handbuilt builds and
    // installs all of it. Claiming self-serve on the file answer engines quote
    // would put a false capability into their descriptions of the business.
    `2. SHOP TOOLS (productized): fixed-scope software that ${site.name} builds and installs into the tools a business already runs. Chosen off the shelf rather than scoped from scratch. Listed individually at ${site.url}/shop with their own prices, including monthly options. Every purchase starts with a request at ${site.url}/create — there is no self-serve checkout.`
  );
  lines.push("");

  lines.push(`## Custom build pricing (${site.currency}, one-time)`);
  for (const p of packages) {
    lines.push(`- ${p.name} — ${formatPackagePrice(p)} ${site.currency}. ${p.tagline} (${p.timeline})`);
  }
  lines.push(
    `- ${carePlan.name} — $${carePlan.monthly}/mo ${site.currency}. Ongoing hosting, monitoring, and monthly tweaks.`
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
  link("/ai-receptionist-for-contractors", "AI receptionist for contractors", "The main offer: an AI receptionist that answers every call and books the job.");
  link("/pricing", "Pricing", "Full custom-build pricing and what each package includes.");
  link("/shop", "Shop", "Productized, fixed-scope AI tools with their own prices.");
  link("/create", "Start a build", "Request a plan and fixed quote.");
  link("/about", "About", `Who builds it: ${site.founder}, ${site.region}.`);
  link("/demo", "Demo", "Working demonstrations of the AI workers.");
  link("/services", "Services", "All AI tools and builds.");
  link("/industries", "Industries", "AI automation by trade.");
  link("/locations", "Locations", "Where Handbuilt works, across the Lower Mainland and Fraser Valley.");
  link("/tools", "Free contractor tools", "Free, no-signup browser tools for contractors.");
  lines.push("");

  lines.push("## Free contractor tools (no signup, run in the browser, no AI tokens)");
  for (const t of freeToolsByOrder) {
    link(toolPath(t.slug), t.name, t.description);
  }
  lines.push("");

  // ## Optional — the long tail. llmstxt.org reserves this heading for material
  // a consumer may skip when short on context. Keeping 194 landing pages at the
  // same weight as the offer above was the single biggest problem with this file.
  lines.push("## Optional");
  lines.push("");
  for (const g of landingGroups) {
    const rows = g.items.filter((it) => indexable.has(`${site.url}${landingPath(g.type, it.slug)}`));
    if (!rows.length) continue;
    lines.push(`### ${g.label}`);
    for (const it of rows) {
      lines.push(`- [${it.h1}](${site.url}${landingPath(g.type, it.slug)}): ${it.description}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
