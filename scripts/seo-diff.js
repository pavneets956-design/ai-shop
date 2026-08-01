#!/usr/bin/env node
/**
 * Compares two route-preservation manifests produced by scripts/seo-baseline.js
 * and exits non-zero if the redesign moved anything it should not have.
 *
 * Usage: node scripts/seo-diff.js docs/design/baseline/seo-before.json docs/design/baseline/seo-after.json
 *
 * Hard failures (exit 1): dropped routes, canonical changes, newly-noindexed
 * pages, H1 disappearing, JSON-LD price changes.
 * Reported but not fatal: added routes, title/description edits, H1 rewording,
 * visible-price additions — a redesign is allowed to do those deliberately.
 */
const fs = require("fs");

const [beforePath, afterPath] = process.argv.slice(2);
if (!beforePath || !afterPath) {
  console.error("usage: node scripts/seo-diff.js <before.json> <after.json>");
  process.exit(2);
}

const before = JSON.parse(fs.readFileSync(beforePath, "utf8"));
const after = JSON.parse(fs.readFileSync(afterPath, "utf8"));

const bMap = new Map(before.routes.map((r) => [r.route, r]));
const aMap = new Map(after.routes.map((r) => [r.route, r]));

const fatal = [];
const warn = [];
const info = [];

// --- route set -------------------------------------------------------------
const dropped = [...bMap.keys()].filter((r) => !aMap.has(r));
const added = [...aMap.keys()].filter((r) => !bMap.has(r));
if (dropped.length) fatal.push(`${dropped.length} route(s) DROPPED:\n    ` + dropped.join("\n    "));
if (added.length) info.push(`${added.length} route(s) added:\n    ` + added.join("\n    "));

// --- per-route surface -----------------------------------------------------
for (const [route, b] of bMap) {
  const a = aMap.get(route);
  if (!a) continue;

  if (b.canonical !== a.canonical) fatal.push(`${route}: canonical ${b.canonical} -> ${a.canonical}`);

  const bNo = /noindex/i.test(b.robots || "");
  const aNo = /noindex/i.test(a.robots || "");
  if (!bNo && aNo) fatal.push(`${route}: newly NOINDEXED (robots="${a.robots}")`);
  if (bNo && !aNo) info.push(`${route}: noindex removed`);

  if (b.h1Count > 0 && a.h1Count === 0) fatal.push(`${route}: H1 disappeared (was "${b.h1}")`);
  if (a.h1Count > 1) fatal.push(`${route}: ${a.h1Count} H1s (must be exactly 1)`);
  if (b.h1Count === 0 && a.h1Count === 1) info.push(`${route}: H1 added ("${a.h1}") — pre-existing gap fixed`);

  const bLd = b.ldPrices.join("|");
  const aLd = a.ldPrices.join("|");
  if (bLd !== aLd) fatal.push(`${route}: JSON-LD price changed [${bLd}] -> [${aLd}]`);

  const bT = b.ldTypes.join("|");
  const aT = a.ldTypes.join("|");
  if (bT !== aT) warn.push(`${route}: JSON-LD @types [${bT}] -> [${aT}]`);

  if (b.title !== a.title) warn.push(`${route}: title changed`);

  const gone = b.prices.filter((p) => !a.prices.includes(p));
  if (gone.length) warn.push(`${route}: visible price(s) removed: ${gone.join(", ")}`);
}

// --- report ----------------------------------------------------------------
const line = (n) => "-".repeat(n);
console.log(line(72));
console.log(`ROUTE PRESERVATION DIFF`);
console.log(`  before: ${beforePath}  (${before.routeCount} routes, ${before.routeHash.slice(0, 16)}…)`);
console.log(`  after : ${afterPath}  (${after.routeCount} routes, ${after.routeHash.slice(0, 16)}…)`);
console.log(`  routeHash identical: ${before.routeHash === after.routeHash ? "YES" : "NO"}`);
console.log(line(72));

for (const [label, list] of [["FATAL", fatal], ["WARN", warn], ["INFO", info]]) {
  if (!list.length) continue;
  console.log(`\n${label} (${list.length}):`);
  list.slice(0, 60).forEach((m) => console.log(`  - ${m}`));
  if (list.length > 60) console.log(`  … and ${list.length - 60} more`);
}

console.log(`\n${line(72)}`);
if (fatal.length) {
  console.log(`RESULT: FAIL — ${fatal.length} fatal, ${warn.length} warn, ${info.length} info`);
  process.exit(1);
}
console.log(`RESULT: PASS — 0 fatal, ${warn.length} warn, ${info.length} info`);
