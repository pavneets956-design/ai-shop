#!/usr/bin/env node
/**
 * Route-preservation manifest generator.
 *
 * Walks the prerendered HTML in .next/server/app and records, per route, the
 * SEO surface that a visual redesign must not disturb: title, canonical,
 * robots directives, H1 text/count, JSON-LD @types, and every price string.
 *
 * Usage:  node scripts/seo-baseline.js <out.json> [out.csv]
 *
 * Compare two runs with `node scripts/seo-diff.js before.json after.json`.
 * The sitemap path hash uses one fixed recipe so before/after are comparable:
 *   sha256( pathnames sorted with Array.prototype.sort(), joined by "\n" )
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const APP_DIR = path.join(process.cwd(), ".next", "server", "app");
const outJson = process.argv[2] || "docs/design/baseline/seo-before.json";
const outCsv = process.argv[3] || null;

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const decode = (s) =>
  s == null
    ? null
    : s
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/&#x2F;/g, "/");

const stripTags = (s) => (s == null ? null : decode(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim());

if (!fs.existsSync(APP_DIR)) {
  console.error(`No build output at ${APP_DIR}. Run "npx next build" first.`);
  process.exit(1);
}

const files = walk(APP_DIR).sort();
const rows = [];

for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  let route = "/" + path.relative(APP_DIR, f).replace(/\\/g, "/").replace(/\.html$/, "");
  if (route.endsWith("/index")) route = route.slice(0, -"/index".length) || "/";
  if (route === "/index") route = "/";

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
  const ld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

  const ldTypes = [];
  const ldPrices = [];
  for (const block of ld) {
    try {
      const parsed = JSON.parse(block);
      const visit = (node) => {
        if (Array.isArray(node)) return node.forEach(visit);
        if (!node || typeof node !== "object") return;
        if (node["@type"]) ldTypes.push(...[].concat(node["@type"]));
        if (node.price != null) ldPrices.push(String(node.price));
        if (node.lowPrice != null) ldPrices.push(`low:${node.lowPrice}`);
        if (node.highPrice != null) ldPrices.push(`high:${node.highPrice}`);
        Object.values(node).forEach(visit);
      };
      visit(parsed);
    } catch {
      ldTypes.push("PARSE_ERROR");
    }
  }

  // Visible price strings, from body text only (drop scripts/styles first).
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ");
  const prices = [...new Set((decode(body).match(/\$[\d,]{3,}(?:\s*[–—-]\s*\$?[\d,]{3,})?/g) || []).map((s) => s.replace(/\s+/g, " ")))].sort();

  rows.push({
    route,
    title: stripTags(pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i)),
    canonical: decode(pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)),
    robots: decode(pick(html, /<meta[^>]+name="robots"[^>]+content="([^"]+)"/i)),
    description: decode(pick(html, /<meta[^>]+name="description"[^>]+content="([^"]+)"/i)),
    ogTitle: decode(pick(html, /<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)),
    h1Count: h1s.length,
    h1: h1s[0] || null,
    ldTypes: [...new Set(ldTypes)].sort(),
    ldPrices: [...new Set(ldPrices)].sort(),
    prices,
    bytes: html.length,
  });
}

rows.sort((a, b) => a.route.localeCompare(b.route));

const routeList = rows.map((r) => r.route).sort();
const routeHash = crypto.createHash("sha256").update(routeList.join("\n")).digest("hex");

const manifest = {
  generatedFrom: ".next/server/app",
  recipe: 'sha256(routes.sort().join("\\n")) over prerendered HTML files',
  routeCount: rows.length,
  routeHash,
  routes: rows,
};

fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(manifest, null, 2));

if (outCsv) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = "route,title,canonical,robots,h1Count,h1,ldTypes,prices";
  const lines = rows.map((r) =>
    [r.route, r.title, r.canonical, r.robots, r.h1Count, r.h1, r.ldTypes.join("|"), r.prices.join("|")].map(esc).join(","),
  );
  fs.writeFileSync(outCsv, [head, ...lines].join("\n") + "\n");
}

console.log(`routes:      ${rows.length}`);
console.log(`routeHash:   ${routeHash}`);
console.log(`noindex:     ${rows.filter((r) => /noindex/i.test(r.robots || "")).length}`);
console.log(`missing h1:  ${rows.filter((r) => r.h1Count === 0).length}`);
console.log(`multi h1:    ${rows.filter((r) => r.h1Count > 1).length}`);
console.log(`no canonical:${rows.filter((r) => !r.canonical).length}`);
console.log(`wrote:       ${outJson}${outCsv ? " + " + outCsv : ""}`);
