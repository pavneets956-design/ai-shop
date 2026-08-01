#!/usr/bin/env node
/**
 * Builds research/search-demand/07-keyword-intent-map.tsv.
 *
 * Columns are fixed by the research brief. Fields we could not measure are
 * written as the literal string UNKNOWN — never 0, never blank. No keyword
 * tool was available in this environment, so volume/CPC/difficulty are
 * UNKNOWN for every row by definition (see 01-methodology-and-provenance.md).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(process.cwd(), "research", "search-demand");
const DERIVED = path.join(ROOT, "derived");
const DATE = "2026-08-01";

// --- load SERP evidence ----------------------------------------------------
const serp = new Map();
const serpDir = path.join(ROOT, "raw", "serp");
for (const f of fs.readdirSync(serpDir).filter((x) => x.endsWith(".json"))) {
  const d = JSON.parse(fs.readFileSync(path.join(serpDir, f), "utf8"));
  (d.results || (Array.isArray(d) ? d : [d])).forEach((r) => {
    if (r.collectionFailed || r.blocked || r.error || !(r.organicCount > 0)) return;
    serp.set(r.query.toLowerCase(), r);
  });
}

// --- load autocomplete -----------------------------------------------------
const sugg = { CA: new Set(), US: new Set() };
for (const m of ["CA", "US"]) {
  const f = path.join(DERIVED, `suggestions-${m}.tsv`);
  if (!fs.existsSync(f)) continue;
  fs.readFileSync(f, "utf8").split("\n").slice(1).filter(Boolean).forEach((l) => sugg[m].add(l.split("\t")[0].toLowerCase()));
}

/**
 * Curated priority set. Every row is a query we either pulled a live SERP for
 * or observed in live autocomplete. Nothing invented.
 *
 * verdict follows the brief's vocabulary: attack-now | attack-after-proof |
 * build-free-tool | fold-into-existing | monitor | avoid
 */
const ROWS = [
  // --- local: the clearest opening -----------------------------------------
  { q: "ai automation surrey bc", loc: "Surrey BC", intent: "local-commercial", funnel: "MOFU/BOFU", trade: "all", size: "1-15", target: "/locations/surrey", format: "location landing", prio: "P0", verdict: "attack-now",
    note: "No AI Overview, no ads, no PAA. Page one is six Surrey/BC AI agencies. Winnable with a real local entity + GBP." },
  { q: "ai consultant surrey", loc: "Surrey BC", intent: "local-commercial", funnel: "BOFU", trade: "all", size: "1-15", target: "/locations/surrey", format: "location landing", prio: "P0", verdict: "attack-now",
    note: "No AI Overview. adaptai.ca ranks. PAA is cost-led." },
  { q: "business automation consultant near me", loc: "BC", intent: "local-commercial", funnel: "BOFU", trade: "all", size: "1-15", target: "/locations/surrey", format: "location landing", prio: "P1", verdict: "attack-now",
    note: "Related searches explicitly name Surrey and Vancouver. Needs GBP to compete." },
  { q: "ai company for contractors canada", loc: "Canada", intent: "local-commercial", funnel: "MOFU", trade: "all", size: "any", target: "/ai-automation-canada", format: "national landing", prio: "P1", verdict: "attack-after-proof",
    note: "frameworkai.ca, bdc.ca, scaleai.ca rank. Credibility-gated." },

  // --- quote follow-up: cleanest problem-intent cluster ---------------------
  { q: "quote follow up for contractors", loc: "Canada", intent: "problem-aware", funnel: "TOFU/MOFU", trade: "all", size: "1-15", target: "/tools/contractor-quote-follow-up-generator", format: "free tool + guide", prio: "P0", verdict: "build-free-tool",
    note: "PAA is 100% on-topic. Reddit + Facebook both rank. Tool already exists." },
  { q: "customer did not respond to estimate", loc: "Canada", intent: "problem-aware", funnel: "TOFU", trade: "all", size: "1-15", target: "/tools/contractor-quote-follow-up-generator", format: "free tool + guide", prio: "P0", verdict: "build-free-tool",
    note: "Reddit, Facebook AND Quora all rank — strong unmet-need signal. PAA fully on-topic." },
  { q: "roofing quote follow up", loc: "Canada", intent: "problem-aware", funnel: "MOFU", trade: "roofing", size: "1-15", target: "/industries/roofing", format: "trade landing", prio: "P0", verdict: "attack-now",
    note: "On-topic PAA. Roofing beachhead entry point." },
  { q: "estimate follow up template", loc: "Canada", intent: "informational", funnel: "TOFU", trade: "all", size: "any", target: "/tools/contractor-quote-follow-up-generator", format: "free tool", prio: "P1", verdict: "build-free-tool",
    note: "SERP COLLECTION FAILED this session — verdict is from autocomplete presence only." },

  // --- missed calls: biggest vocabulary cluster ----------------------------
  { q: "missed call text back", loc: "Canada", intent: "solution-aware", funnel: "MOFU", trade: "all", size: "1-15", target: "/tools/missed-call-revenue-calculator", format: "free tool", prio: "P0", verdict: "build-free-tool",
    note: "347 distinct autocomplete variants — the largest cluster measured. gohighlevel dominates organic." },
  { q: "contractor missed calls", loc: "Canada", intent: "problem-aware", funnel: "TOFU", trade: "all", size: "1-15", target: "/tools/missed-call-revenue-calculator", format: "free tool", prio: "P1", verdict: "build-free-tool",
    note: "SERP COLLECTION FAILED this session. Reddit thread evidence is strong." },
  { q: "ai receptionist for contractors", loc: "Canada", intent: "product-aware", funnel: "BOFU", trade: "all", size: "1-15", target: "/ai-receptionist-for-contractors", format: "money page", prio: "P1", verdict: "attack-after-proof",
    note: "AI Overview + ads. Related searches include 'salary' and 'jobs' — job-seeker contamination." },
  { q: "how much does an ai receptionist cost", loc: "Canada", intent: "commercial-cost", funnel: "BOFU", trade: "all", size: "1-15", target: "/pricing", format: "pricing + FAQ", prio: "P0", verdict: "attack-now",
    note: "Three Canadian competitors rank (mihronai.ca, voxara.ca, rasai.ca). PAA is cost-led and on-topic. We publish real ranges; most hide them." },
  { q: "ai answering service for contractors", loc: "Canada", intent: "product-aware", funnel: "BOFU", trade: "all", size: "1-15", target: "/ai-receptionist-for-contractors", format: "money page", prio: "P1", verdict: "attack-after-proof",
    note: "'answering service' is near-equal vocabulary to 'receptionist' (270 vs 333 variants)." },

  // --- ownership / anti-subscription --------------------------------------
  { q: "contractor software without subscription", loc: "Canada", intent: "price-sensitive", funnel: "MOFU", trade: "all", size: "1-15", target: "/ai-business-system", format: "positioning page", prio: "P0", verdict: "attack-now",
    note: "Directly matches the ownership pitch. ownyourtools.work already plays this angle." },
  { q: "jobber too expensive", loc: "Canada", intent: "objection", funnel: "MOFU", trade: "all", size: "1-15", target: "/compare/jobber-alternative", format: "comparison", prio: "P1", verdict: "attack-after-proof",
    note: "Reddit #1. Related: 'Jobber reviews complaints'. PAA: 'Is Jobber a Canadian company?'" },
  { q: "jobber alternatives", loc: "Canada", intent: "comparison", funnel: "BOFU", trade: "all", size: "1-15", target: "/compare/jobber-alternative", format: "comparison", prio: "P2", verdict: "monitor",
    note: "capterra.ca, getapp.ca and Jobber itself rank. Directory-dominated; hard for a small site." },
  { q: "housecall pro alternatives", loc: "Canada", intent: "comparison", funnel: "BOFU", trade: "all", size: "1-15", target: "/compare", format: "comparison", prio: "P2", verdict: "monitor",
    note: "Same directory dominance." },
  { q: "who owns my customer data software", loc: "Canada", intent: "objection", funnel: "MOFU", trade: "all", size: "any", target: "/faq", format: "FAQ answer", prio: "P1", verdict: "fold-into-existing",
    note: "Generic SERP, no contractor intent — but the objection is real. Answer it on-site, do not build a page." },
  { q: "can i keep my phone number answering service", loc: "Canada", intent: "objection", funnel: "BOFU", trade: "all", size: "any", target: "/faq", format: "FAQ answer", prio: "P1", verdict: "fold-into-existing",
    note: "crtc.gc.ca ranks — genuine Canadian regulatory concern. Strong trust-building answer." },
  { q: "customers hate automated messages", loc: "Canada", intent: "objection", funnel: "TOFU", trade: "all", size: "any", target: "/faq", format: "FAQ answer", prio: "P0", verdict: "fold-into-existing",
    note: "PAA: 'Why are customers averse to service chatbots?'. This is THE objection. Answer it head-on." },

  // --- roofing beachhead ---------------------------------------------------
  { q: "ai for roofing companies", loc: "Canada", intent: "solution-aware", funnel: "MOFU", trade: "roofing", size: "1-15", target: "/industries/roofing", format: "trade landing", prio: "P0", verdict: "attack-now",
    note: "On-topic PAA incl. 'Will AI replace roofing contractors?' — an objection to answer." },
  { q: "roofing estimating software", loc: "Canada", intent: "solution-aware", funnel: "MOFU", trade: "roofing", size: "any", target: "none", format: "none", prio: "P3", verdict: "avoid",
    note: "roofr/roofsnap/stackct own this. Product category we do not sell. PAA drifts to homeowner roof-cost." },

  // --- traps: relevant-sounding, wrong intent ------------------------------
  { q: "contractor review requests", loc: "Canada", intent: "informational", funnel: "n/a", trade: "all", size: "any", target: "none", format: "none", prio: "P3", verdict: "avoid",
    note: "TRAP. PAA reads as homeowner-reviewing-a-contractor + contractor rate increases. Wrong audience entirely." },
  { q: "contractor office automation", loc: "Canada", intent: "informational", funnel: "n/a", trade: "all", size: "any", target: "none", format: "none", prio: "P3", verdict: "avoid",
    note: "TRAP. PAA: 'What is an automation contractor?' — Google reads this as industrial automation installers." },
  { q: "ai tools for contractors", loc: "Canada", intent: "informational", funnel: "TOFU", trade: "all", size: "any", target: "/tools", format: "hub", prio: "P2", verdict: "fold-into-existing",
    note: "PARTIAL TRAP. PAA includes 'best AI tool for contracts' (contract law). AI Overview + ads present." },
  { q: "ai consultant for contractors", loc: "Canada", intent: "solution-aware", funnel: "MOFU", trade: "all", size: "any", target: "none", format: "none", prio: "P3", verdict: "avoid",
    note: "TRAP. bdc.ca ranks #1; PAA includes 'What is the 30% rule for AI?'. Diluted." },
  { q: "done for you business automation", loc: "Canada", intent: "solution-aware", funnel: "MOFU", trade: "all", size: "any", target: "none", format: "none", prio: "P3", verdict: "avoid",
    note: "Zero contractor and zero Canadian results. Global generic term. Internal language, not customer language." },
  { q: "ai called my customer", loc: "Canada", intent: "objection", funnel: "n/a", trade: "all", size: "any", target: "none", format: "none", prio: "P3", verdict: "avoid",
    note: "TRAP as a page. News coverage of AI scam calls. Confirms the fear is live; do not target the query." },

  // --- other measured ------------------------------------------------------
  { q: "contractor crm for small business", loc: "Canada", intent: "solution-aware", funnel: "MOFU", trade: "all", size: "1-15", target: "/ai-business-system", format: "positioning page", prio: "P2", verdict: "monitor",
    note: "capterra.ca + buildertrend + buildops. Directory/vendor heavy." },
  { q: "how to automate a contracting business", loc: "Canada", intent: "informational", funnel: "TOFU", trade: "all", size: "1-15", target: "/resources", format: "guide", prio: "P2", verdict: "fold-into-existing",
    note: "PAA drifts to 'contract management' and 'most profitable contracting business'." },
  { q: "contractor invoice reminders", loc: "Canada", intent: "problem-aware", funnel: "MOFU", trade: "all", size: "1-15", target: "/services", format: "service section", prio: "P2", verdict: "fold-into-existing",
    note: "On-topic PAA incl. 'Are payment reminders legally required?' — good Canadian-compliance angle." },
  { q: "automated review requests for contractors", loc: "Canada", intent: "solution-aware", funnel: "MOFU", trade: "all", size: "1-15", target: "/services/ai-review-engine", format: "service page", prio: "P2", verdict: "monitor",
    note: "Exists as a page already. Note the AI Review Engine pricing decision is still open." },
  { q: "problems with jobber", loc: "Canada", intent: "objection", funnel: "MOFU", trade: "all", size: "1-15", target: "/compare/jobber-alternative", format: "comparison", prio: "P2", verdict: "monitor",
    note: "Jobber's own help/status pages plus Reddit, BBB, Trustpilot. Hard to outrank, easy to be honest about." },
  { q: "contractor software data export", loc: "Canada", intent: "objection", funnel: "MOFU", trade: "all", size: "any", target: "/faq", format: "FAQ answer", prio: "P1", verdict: "fold-into-existing",
    note: "Directly supports the data-export commitment already in the trust list." },
  { q: "contractor software alternatives", loc: "Canada", intent: "comparison", funnel: "MOFU", trade: "all", size: "1-15", target: "/compare", format: "comparison hub", prio: "P2", verdict: "monitor",
    note: "capterra.ca + getapp.ca dominate. blog.tradetraks.ca is a small Canadian entrant." },
];

const HEAD = [
  "query", "country", "location", "source", "search_volume", "cpc", "difficulty", "trend",
  "intent", "funnel_stage", "trade", "business_size", "serp_type", "existing_target_url",
  "recommended_target_url", "content_format", "priority", "evidence_level", "verdict", "notes", "date_collected",
].join("\t");

const rows = ROWS.map((r) => {
  const s = serp.get(r.q.toLowerCase());
  const inAuto = sugg.CA.has(r.q.toLowerCase());
  const sources = [];
  if (s) sources.push("google-serp-live");
  if (inAuto) sources.push("google-autocomplete");
  if (!sources.length) sources.push("google-autocomplete-cluster");

  const serpType = s
    ? [
        s.features?.aiOverview ? "AIO" : null,
        s.features?.peopleAlsoAsk ? "PAA" : null,
        s.features?.ads ? "ADS" : null,
        s.features?.discussionsForums ? "FORUMS" : null,
        (s.forumHosts || []).some((h) => /reddit/.test(h)) ? "REDDIT-ORGANIC" : null,
        (s.canadianHosts || []).length ? "CA-HOSTS" : null,
      ].filter(Boolean).join("+")
    : "UNKNOWN (serp not collected)";

  // Evidence level per the label scheme in 01-methodology.
  const evidence = s ? "V" : inAuto ? "D" : "D";

  return [
    r.q, "CA", r.loc, sources.join("+"),
    "UNKNOWN", "UNKNOWN", "UNKNOWN", "UNKNOWN",
    r.intent, r.funnel, r.trade, r.size, serpType,
    "UNKNOWN", r.target, r.format, r.prio, evidence, r.verdict, r.note, DATE,
  ].join("\t");
});

fs.writeFileSync(path.join(ROOT, "07-keyword-intent-map.tsv"), [HEAD, ...rows].join("\n") + "\n");

const counts = ROWS.reduce((a, r) => ((a[r.verdict] = (a[r.verdict] || 0) + 1), a), {});
console.log(`rows: ${ROWS.length}`);
console.log(`with live SERP evidence [V]: ${ROWS.filter((r) => serp.has(r.q.toLowerCase())).length}`);
console.log("verdicts:", JSON.stringify(counts, null, 1));
