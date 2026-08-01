#!/usr/bin/env node
/**
 * Turns the raw harvest into the evidence tables the research brief asks for.
 *
 * Reads:
 *   research/search-demand/raw/autocomplete/*.jsonl
 *   research/search-demand/raw/serp/CA-batch*.json
 *
 * Writes:
 *   research/search-demand/derived/suggestions-<market>.tsv
 *   research/search-demand/derived/serp-summary.tsv
 *   research/search-demand/derived/competitors.tsv
 *   research/search-demand/derived/stats.json
 *
 * Deliberately does no inference. "Reach" below is the number of distinct seed
 * queries that surfaced a suggestion — a directional signal about how central a
 * phrase is to the topic, NOT search volume. Nothing here is a volume estimate.
 */
const fs = require("fs");
const path = require("path");

const RAW = path.join(process.cwd(), "research", "search-demand", "raw");
const OUT = path.join(process.cwd(), "research", "search-demand", "derived");
fs.mkdirSync(OUT, { recursive: true });

// --------------------------------------------------------------------------
// Autocomplete
// --------------------------------------------------------------------------
function loadJsonl(f) {
  if (!fs.existsSync(f)) return [];
  return fs
    .readFileSync(f, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

const INTENT = [
  [/\b(cost|price|pricing|how much|cheap|fee|rate)\b/i, "commercial-cost"],
  [/\b(vs|versus|alternative|alternatives|compare|comparison|better than|instead of)\b/i, "comparison"],
  [/\b(best|top|review|reviews|worth it|recommend)\b/i, "product-aware"],
  [/\b(near me|surrey|vancouver|burnaby|richmond|langley|delta|coquitlam|abbotsford|chilliwack|bc|british columbia|canada|canadian)\b/i, "local-commercial"],
  [/\b(how to|how do|guide|tutorial|steps|template|example)\b/i, "informational"],
  [/\b(problem|problems|issue|complaint|hate|too expensive|cancel|export|scam|bad|not working)\b/i, "objection"],
  [/\b(free|trial|no subscription|without subscription|no contract)\b/i, "price-sensitive"],
  [/\b(software|app|tool|platform|system|service|company|agency|consultant)\b/i, "solution-aware"],
];
const classify = (q) => {
  for (const [re, label] of INTENT) if (re.test(q)) return label;
  return "problem-aware";
};

const CA_GEO = /\b(canada|canadian|bc|british columbia|surrey|vancouver|burnaby|richmond|langley|delta|coquitlam|abbotsford|chilliwack|toronto|ontario|alberta|calgary)\b/i;

const stats = { markets: {} };

for (const market of ["CA", "US"]) {
  const rows = loadJsonl(path.join(RAW, "autocomplete", `google-${market}.jsonl`));
  const bing = loadJsonl(path.join(RAW, "autocomplete", `bing-${market}.jsonl`));
  if (!rows.length && !bing.length) continue;

  // suggestion -> { reach: distinct seeds, engines, sampleSourceQueries }
  const agg = new Map();
  const note = (s, seed, engine, sourceQ) => {
    const k = s.toLowerCase().trim();
    if (!k) return;
    if (!agg.has(k)) agg.set(k, { text: s, seeds: new Set(), engines: new Set(), sources: new Set() });
    const e = agg.get(k);
    e.seeds.add(seed);
    e.engines.add(engine);
    if (e.sources.size < 3) e.sources.add(sourceQ);
  };
  rows.forEach((r) => r.suggestions.forEach((s) => note(s, r.seed, "google", r.q)));
  bing.forEach((r) => r.suggestions.forEach((s) => note(s, r.seed, "bing", r.q)));

  const list = [...agg.values()]
    .map((e) => ({
      suggestion: e.text,
      reach: e.seeds.size,
      engines: [...e.engines].sort().join("+"),
      intent: classify(e.text),
      canadaSpecific: CA_GEO.test(e.text) ? "yes" : "no",
      sourceQueries: [...e.sources].join(" ; "),
    }))
    .sort((a, b) => b.reach - a.reach || a.suggestion.localeCompare(b.suggestion));

  const head = "suggestion\treach_distinct_seeds\tengines\tintent\tcanada_specific\tsource_queries";
  fs.writeFileSync(
    path.join(OUT, `suggestions-${market}.tsv`),
    [head, ...list.map((r) => [r.suggestion, r.reach, r.engines, r.intent, r.canadaSpecific, r.sourceQueries].join("\t"))].join("\n") + "\n",
  );

  const emptyTrusted = rows.filter((r) => r.suggestions.length === 0 && r.emptyTrusted === true).length;
  const emptyUntrusted = rows.filter((r) => r.suggestions.length === 0 && r.emptyTrusted === false).length;

  stats.markets[market] = {
    googleRequests: rows.length,
    bingRequests: bing.length,
    uniqueSuggestions: list.length,
    emptyResults_trusted: emptyTrusted,
    emptyResults_untrusted_throttleSuspect: emptyUntrusted,
    byIntent: list.reduce((a, r) => ((a[r.intent] = (a[r.intent] || 0) + 1), a), {}),
    canadaSpecificCount: list.filter((r) => r.canadaSpecific === "yes").length,
  };
}

// --------------------------------------------------------------------------
// SERPs
// --------------------------------------------------------------------------
const serpDir = path.join(RAW, "serp");
const serpRecords = [];
if (fs.existsSync(serpDir)) {
  for (const f of fs.readdirSync(serpDir).filter((x) => x.endsWith(".json"))) {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(serpDir, f), "utf8"));
      const arr = d.results || (Array.isArray(d) ? d : [d]);
      arr.forEach((r) => serpRecords.push(r));
    } catch {}
  }
}

const usable = serpRecords.filter((r) => !r.collectionFailed && !r.blocked && !r.error && (r.organicCount || 0) > 0);
const failed = serpRecords.filter((r) => r.collectionFailed || r.blocked || r.error || !(r.organicCount > 0));

const serpHead = [
  "query", "market", "ai_overview", "people_also_ask", "ads", "forums_block",
  "organic_count", "canadian_hosts", "forum_hosts", "top_hosts", "paa_questions", "collected_at",
].join("\t");
const serpRows = usable.map((r) =>
  [
    r.query,
    r.market || "CA",
    r.features?.aiOverview ?? "UNKNOWN",
    r.features?.peopleAlsoAsk ?? "UNKNOWN",
    r.features?.ads ?? "UNKNOWN",
    r.features?.discussionsForums ?? "UNKNOWN",
    r.organicCount ?? "UNKNOWN",
    (r.canadianHosts || []).join("|") || "none",
    (r.forumHosts || []).join("|") || "none",
    Object.keys(r.hostMix || {}).slice(0, 6).join("|"),
    (r.paaLevel1 || []).filter((p) => p !== r.query).join(" ;; ") || "none",
    r.collectedAt,
  ].join("\t"),
);
fs.writeFileSync(path.join(OUT, "serp-summary.tsv"), [serpHead, ...serpRows].join("\n") + "\n");

// Competitor frequency across all usable SERPs
const hostFreq = {};
const hostQueries = {};
usable.forEach((r) => {
  Object.keys(r.hostMix || {}).forEach((h) => {
    hostFreq[h] = (hostFreq[h] || 0) + 1;
    (hostQueries[h] = hostQueries[h] || []).push(r.query);
  });
});
const compHead = "host\tserps_ranked_on\tcanadian\tqueries";
const compRows = Object.entries(hostFreq)
  .sort((a, b) => b[1] - a[1])
  .map(([h, n]) => [h, n, /\.ca$/.test(h) ? "yes" : "no", hostQueries[h].slice(0, 6).join(" ; ")].join("\t"));
fs.writeFileSync(path.join(OUT, "competitors.tsv"), [compHead, ...compRows].join("\n") + "\n");

stats.serp = {
  collected: serpRecords.length,
  usable: usable.length,
  failed: failed.length,
  failedQueries: failed.map((r) => r.query),
  aiOverviewPresent: usable.filter((r) => r.features?.aiOverview).length,
  paaPresent: usable.filter((r) => r.features?.peopleAlsoAsk).length,
  adsPresent: usable.filter((r) => r.features?.ads).length,
  redditRanking: usable.filter((r) => (r.forumHosts || []).some((h) => /reddit/.test(h))).length,
  anyCanadianHost: usable.filter((r) => (r.canadianHosts || []).length > 0).length,
  distinctHosts: Object.keys(hostFreq).length,
  distinctCanadianHosts: Object.keys(hostFreq).filter((h) => /\.ca$/.test(h)).length,
};

fs.writeFileSync(path.join(OUT, "stats.json"), JSON.stringify(stats, null, 2));
console.log(JSON.stringify(stats, null, 2));
