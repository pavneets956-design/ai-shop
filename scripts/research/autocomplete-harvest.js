#!/usr/bin/env node
/**
 * Live autocomplete harvester — Google + Bing, per-market.
 *
 * Autocomplete is a real, first-party demand signal: Google only suggests
 * strings people actually type. It is NOT search volume, and this script never
 * pretends otherwise — output is labelled [D] directional in the research docs.
 *
 * Usage:
 *   node scripts/research/autocomplete-harvest.js --scope=pilot
 *   node scripts/research/autocomplete-harvest.js --scope=full
 *
 * Writes:
 *   research/search-demand/raw/autocomplete/<engine>-<market>.jsonl   (one row per query, raw response)
 *   research/search-demand/raw/autocomplete/_manifest.json            (run provenance)
 *
 * Every row records the exact request URL and an ISO timestamp so any claim
 * downstream can be traced to the request that produced it.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "research", "search-demand", "raw", "autocomplete");
const scope = (process.argv.find((a) => a.startsWith("--scope=")) || "--scope=pilot").split("=")[1];

// ---------------------------------------------------------------------------
// Seeds. Taken from the brief's topic families, trimmed to the ones with a
// plausible commercial relationship to what this business actually sells.
// ---------------------------------------------------------------------------
const SEEDS_CORE = [
  "ai receptionist for contractors",
  "ai answering service for contractors",
  "missed call text back",
  "contractor missed calls",
  "quote follow up",
  "estimate follow up",
  "contractor quote follow up",
  "roofing quote follow up",
  "customer did not respond to quote",
  "ai automation for contractors",
  "contractor office automation",
  "ai tools for contractors",
  "automate contractor business",
  "jobber alternatives",
  "housecall pro alternatives",
  "contractor software without subscription",
  "contractor crm for small business",
  "automated review requests for contractors",
  "contractor invoice reminder",
  "done for you business automation",
];

const SEEDS_EXTRA = [
  "ai for roofing companies",
  "roofing estimating software",
  "virtual receptionist for contractors",
  "after hours answering service",
  "contractor workflow automation",
  "ai consultant for contractors",
  "how much does an ai receptionist cost",
  "contractor follow up software",
  "zapier for contractors",
  "contractor virtual assistant",
  "overdue invoice follow up",
  "construction admin automation",
  "simple crm for contractors",
  "field service software consultant",
  "ai setup service for small business",
];

/**
 * SHORT roots for alphabet soup.
 *
 * Learned the hard way on the 2026-08-01 pilot: appending a letter to an
 * already-specific 5-word phrase ("ai receptionist for contractors" + "a")
 * returns nothing 82% of the time, because no such string is typed often
 * enough to suggest. That empty rate is real, not throttling — verified with a
 * control query in the same session — but it is also useless. Alphabet soup
 * only discovers vocabulary when the stem is short enough to have many
 * continuations. Long phrases get bare + suffix treatment instead.
 */
const ROOTS = [
  "ai for contractors",
  "contractor ai",
  "ai receptionist",
  "answering service",
  "missed call",
  "quote follow up",
  "estimate follow up",
  "contractor software",
  "contractor crm",
  "jobber",
  "housecall pro",
  "roofing software",
  "contractor automation",
  "automate my",
  "ai answering",
];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const PREFIXES = ["how to", "what is", "why", "when", "should i", "can i", "is", "does", "best", "cheap", "free"];
const SUFFIXES = [
  "cost", "price", "canada", "bc", "reddit", "alternative", "vs", "review",
  "worth it", "near me", "small business", "without subscription", "no contract",
  "done for you", "software", "service",
];

const MARKETS = [
  { market: "CA", gl: "ca", hl: "en", bing: "en-CA" },
  { market: "US", gl: "us", hl: "en", bing: "en-US" },
];

/**
 * Two different jobs, so two different query plans:
 *   ROOTS   -> alphabet soup + question prefixes. Discovers vocabulary.
 *   PHRASES -> bare + commercial suffixes. Confirms a specific phrase is real
 *              and shows which modifiers people actually attach to it.
 */
const phraseSeeds = scope === "full" ? [...SEEDS_CORE, ...SEEDS_EXTRA] : SEEDS_CORE.slice(0, 6);
const rootSeeds = scope === "full" ? ROOTS : ROOTS.slice(0, 4);

const PHRASE_EXP =
  scope === "full"
    ? [{ kind: "bare", build: (s) => s }, ...SUFFIXES.map((x) => ({ kind: "suffix", build: (s) => `${s} ${x}` }))]
    : [{ kind: "bare", build: (s) => s }, ...SUFFIXES.slice(0, 4).map((x) => ({ kind: "suffix", build: (s) => `${s} ${x}` }))];

const ROOT_EXP =
  scope === "full"
    ? [
        { kind: "bare", build: (s) => s },
        ...ALPHABET.map((c) => ({ kind: "alpha", build: (s) => `${s} ${c}` })),
        ...PREFIXES.map((p) => ({ kind: "prefix", build: (s) => `${p} ${s}` })),
      ]
    : [
        { kind: "bare", build: (s) => s },
        ...ALPHABET.slice(0, 6).map((c) => ({ kind: "alpha", build: (s) => `${s} ${c}` })),
      ];

const plan = [
  ...rootSeeds.flatMap((s) => ROOT_EXP.map((e) => ({ seed: s, seedKind: "root", exp: e }))),
  ...phraseSeeds.flatMap((s) => PHRASE_EXP.map((e) => ({ seed: s, seedKind: "phrase", exp: e }))),
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: { "User-Agent": UA, "Accept-Language": "en-CA,en;q=0.9" },
      });
      clearTimeout(t);
      if (res.status === 429 || res.status >= 500) {
        await sleep(1500 * (i + 1));
        continue;
      }
      if (!res.ok) return { error: `HTTP ${res.status}` };
      return { text: await res.text(), status: res.status };
    } catch (e) {
      if (i === tries - 1) return { error: String(e.name || e).slice(0, 60) };
      await sleep(1200 * (i + 1));
    }
  }
  return { error: "exhausted" };
}

function parseGoogle(text) {
  // ["query", ["suggestion", ...], [], {...}]
  try {
    const j = JSON.parse(text);
    return Array.isArray(j?.[1]) ? j[1].filter((s) => typeof s === "string") : [];
  } catch {
    return null;
  }
}
function parseBing(text) {
  try {
    const j = JSON.parse(text);
    return Array.isArray(j?.[1]) ? j[1].filter((s) => typeof s === "string") : [];
  } catch {
    return null;
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const startedAt = new Date().toISOString();
  const stats = { requests: 0, ok: 0, failed: 0, suggestions: 0, blocked: 0, emptyResults: 0, throttleEvents: 0 };
  const streams = {};
  const openStream = (key) => {
    if (!streams[key]) streams[key] = fs.createWriteStream(path.join(OUT, `${key}.jsonl`), { flags: "w" });
    return streams[key];
  };

  /**
   * Throttle canary. The suggest endpoint answers HTTP 200 with an empty
   * suggestion array both when a phrase genuinely has no completions AND when
   * the IP is being throttled — the two are indistinguishable per-request. So
   * every 40 requests we re-ask a control query that is known to return
   * results ("plumber"). If the control goes empty, we are throttled: back off
   * hard and mark subsequent rows suspect rather than silently recording
   * "no demand".
   */
  const CONTROL = "plumber";
  let sinceCanary = 0;
  let throttled = false;

  async function canary(m) {
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${m.hl}&gl=${m.gl}&q=${CONTROL}`;
    const r = await get(url);
    const s = r.error ? null : parseGoogle(r.text);
    const healthy = Array.isArray(s) && s.length > 0;
    if (!healthy) {
      stats.throttleEvents++;
      throttled = true;
      await sleep(45000);
      const again = await get(url);
      const s2 = again.error ? null : parseGoogle(again.text);
      throttled = !(Array.isArray(s2) && s2.length > 0);
    } else {
      throttled = false;
    }
    return !throttled;
  }

  for (const m of MARKETS) {
    for (const item of plan) {
      const q = item.exp.build(item.seed);

      if (sinceCanary >= 40) {
        sinceCanary = 0;
        await canary(m);
      }

      const gUrl = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${m.hl}&gl=${m.gl}&q=${encodeURIComponent(q)}`;
      const g = await get(gUrl);
      stats.requests++;
      sinceCanary++;
      if (g.error) {
        stats.failed++;
      } else {
        const sugg = parseGoogle(g.text);
        if (sugg === null) {
          stats.blocked++;
        } else {
          stats.ok++;
          stats.suggestions += sugg.length;
          if (sugg.length === 0) stats.emptyResults++;
          openStream(`google-${m.market}`).write(
            JSON.stringify({
              q,
              seed: item.seed,
              seedKind: item.seedKind,
              expansion: item.exp.kind,
              market: m.market,
              engine: "google",
              suggestions: sugg,
              // An empty result is only trustworthy when the canary was healthy.
              emptyTrusted: sugg.length === 0 ? !throttled : undefined,
              requestUrl: gUrl,
              collectedAt: new Date().toISOString(),
            }) + "\n",
          );
        }
      }
      await sleep(260);
    }
  }

  // Bing on bare seeds only — a cross-check on Google, not a second full sweep.
  for (const m of MARKETS) {
    for (const seed of phraseSeeds) {
      const bUrl = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(seed)}&market=${m.bing}`;
      const b = await get(bUrl);
      stats.requests++;
      if (b.error) {
        stats.failed++;
      } else {
        const sugg = parseBing(b.text);
        if (sugg === null) stats.blocked++;
        else {
          stats.ok++;
          stats.suggestions += sugg.length;
          openStream(`bing-${m.market}`).write(
            JSON.stringify({
              q: seed,
              seed,
              expansion: "bare",
              market: m.market,
              engine: "bing",
              suggestions: sugg,
              requestUrl: bUrl,
              collectedAt: new Date().toISOString(),
            }) + "\n",
          );
        }
      }
      await sleep(150);
    }
  }

  Object.values(streams).forEach((s) => s.end());

  const manifest = {
    scope,
    startedAt,
    finishedAt: new Date().toISOString(),
    phraseSeeds: phraseSeeds.length,
    rootSeeds: rootSeeds.length,
    plannedQueries: plan.length,

    markets: MARKETS.map((m) => m.market),
    engines: ["google:suggestqueries(client=firefox)", "bing:osjson"],
    stats,
    note:
      "Autocomplete presence is a directional demand signal, not search volume. " +
      "Google only suggests strings users actually type, but frequency is not exposed. " +
      "Label all downstream use as [D].",
  };
  fs.writeFileSync(path.join(OUT, "_manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest, null, 2));
}

main();
