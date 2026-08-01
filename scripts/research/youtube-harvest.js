#!/usr/bin/env node
/**
 * YouTube autocomplete harvester.
 *
 * Why this matters separately from Google: YouTube search intent for this
 * topic skews heavily toward people who want to BUILD and SELL these systems
 * (n8n, GoHighLevel, "agency", "tutorial") rather than contractors who want to
 * buy one. Measuring that split is the point — it tells us which keywords are
 * saturated with agency/builder traffic and therefore worth less commercially
 * than raw autocomplete breadth suggests.
 *
 * Output: research/search-demand/raw/youtube/suggestions.jsonl
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "research", "search-demand", "raw", "youtube");
fs.mkdirSync(OUT, { recursive: true });

const SEEDS = [
  "ai receptionist",
  "ai receptionist for contractors",
  "ai answering service",
  "missed call text back",
  "contractor quote follow up",
  "quote follow up",
  "ai for contractors",
  "contractor automation",
  "jobber",
  "housecall pro",
  "ai voice agent",
  "ai for roofing",
  "ai for plumbers",
  "ai for electricians",
  "ai for hvac",
  "ai for landscapers",
  "contractor crm",
  "automate my business",
  "ai review requests",
  "ai website chat",
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** YouTube answers with a JSONP wrapper: window.google.ac.h([...]) */
function parseYt(text) {
  const m = text.match(/^window\.google\.ac\.h\((.*)\)\s*$/s);
  if (!m) return null;
  try {
    const j = JSON.parse(m[1]);
    return Array.isArray(j?.[1]) ? j[1].map((row) => (Array.isArray(row) ? row[0] : row)).filter((s) => typeof s === "string") : [];
  } catch {
    return null;
  }
}

/**
 * Classify who a suggestion is for. Builder/agency terms mean the keyword's
 * audience is other implementers, which lowers its commercial value to us.
 */
const BUILDER = /\bn8n\b|\bmake\.com\b|zapier|gohighlevel|high level|ghl\b|agency|tutorial|build|course|how to make|api|vapi|retell|bland|twilio|clone|white label|saas|sell|reseller|affiliate/i;
const BUYER = /cost|price|pricing|worth it|review|vs\b|alternative|best|for small business|for contractors|near me|service/i;

(async () => {
  const stream = fs.createWriteStream(path.join(OUT, "suggestions.jsonl"), { flags: "w" });
  const stats = { requests: 0, ok: 0, failed: 0, suggestions: 0, builder: 0, buyer: 0, neutral: 0 };
  const all = new Set();

  for (const market of [{ m: "CA", gl: "ca" }, { m: "US", gl: "us" }]) {
    for (const seed of SEEDS) {
      const url = `https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&ds=yt&hl=en&gl=${market.gl}&q=${encodeURIComponent(seed)}`;
      stats.requests++;
      try {
        const res = await fetch(url, { headers: { "User-Agent": UA } });
        const text = await res.text();
        const s = parseYt(text);
        if (s === null) {
          stats.failed++;
        } else {
          stats.ok++;
          stats.suggestions += s.length;
          s.forEach((x) => {
            all.add(x.toLowerCase());
            if (BUILDER.test(x)) stats.builder++;
            else if (BUYER.test(x)) stats.buyer++;
            else stats.neutral++;
          });
          stream.write(
            JSON.stringify({
              seed,
              market: market.m,
              engine: "youtube",
              suggestions: s,
              builderIntent: s.filter((x) => BUILDER.test(x)),
              buyerIntent: s.filter((x) => BUYER.test(x)),
              requestUrl: url,
              collectedAt: new Date().toISOString(),
            }) + "\n",
          );
        }
      } catch (e) {
        stats.failed++;
      }
      await sleep(280);
    }
  }
  stream.end();

  const manifest = {
    collectedAt: new Date().toISOString(),
    seeds: SEEDS.length,
    markets: ["CA", "US"],
    uniqueSuggestions: all.size,
    stats,
    builderShare: `${((100 * stats.builder) / (stats.builder + stats.buyer + stats.neutral)).toFixed(1)}%`,
    note:
      "Builder/agency vs buyer split is the point of this file. A term whose YouTube " +
      "suggestions are dominated by n8n / GoHighLevel / 'agency' / 'tutorial' is saturated " +
      "with implementers researching how to sell it, not contractors looking to buy it.",
  };
  fs.writeFileSync(path.join(OUT, "_manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest, null, 2));
})();
