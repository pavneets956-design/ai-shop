#!/usr/bin/env node
/**
 * Production smoke test — READ-ONLY.
 *
 *   node scripts/smoke.mjs                            # https://aibuiltbyhand.com
 *   node scripts/smoke.mjs http://localhost:3200      # a local `next start`
 *   node scripts/smoke.mjs https://<preview>.vercel.app
 *
 * Rules this script obeys, without exception:
 *   - It NEVER sends a POST, PUT, PATCH or DELETE. Nothing it does creates a
 *     lead, an email, an OpenAI charge, a Twilio call or a database row.
 *   - It never sends a body, a credential or a phone number.
 *   - Every assertion prints its own evidence, so a FAIL is actionable without
 *     re-running anything.
 *
 * Exit code 1 on any FAIL. Zero dependencies; Node >= 18 (global fetch).
 */

import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const BASE = (process.argv[2] || "https://aibuiltbyhand.com").replace(/\/+$/, "");
const require = createRequire(import.meta.url);

// ---------------------------------------------------------------------------
// Tiny assertion harness
// ---------------------------------------------------------------------------
const results = [];
let currentGroup = "general";

function group(name) {
  currentGroup = name;
}

function record(ok, name, detail) {
  results.push({ group: currentGroup, ok, name, detail: detail || "" });
  const mark = ok ? "  PASS" : "  FAIL";
  process.stdout.write(`${mark}  ${name}${detail ? `\n         ${detail}` : ""}\n`);
}

function check(ok, name, detail) {
  record(Boolean(ok), name, detail);
  return Boolean(ok);
}

async function get(path, { redirect = "follow" } = {}) {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const res = await fetch(url, {
    method: "GET",
    redirect,
    headers: { "user-agent": "handbuilt-smoke/1.0 (read-only)" },
  });
  return res;
}

async function getText(path, opts) {
  const res = await get(path, opts);
  const body = await res.text();
  return { res, body };
}

// ---------------------------------------------------------------------------
// Fixtures read from the repo, so the script self-corrects when data changes
// ---------------------------------------------------------------------------
async function repoPrices() {
  try {
    const src = await readFile(new URL("../lib/data/packages.ts", import.meta.url), "utf8");
    const out = [];
    const re = /id:\s*"(starter|business|custom)"[\s\S]*?price:\s*(\d+)/g;
    let m;
    while ((m = re.exec(src))) out.push({ id: m[1], price: Number(m[2]) });
    return out;
  } catch {
    return [];
  }
}

function repoRedirectsSync() {
  try {
    const cfg = require("../next.config.js");
    return typeof cfg.redirects === "function" ? cfg.redirects() : Promise.resolve([]);
  } catch (err) {
    return Promise.reject(err);
  }
}

/** Price strings that were retired and must never reappear. */
const STALE_PRICES = [
  /\$2,500\s*[–\-]\s*\$?5,000/,
  /\$3,500\s*[–\-]\s*\$?5,000/,
  /from CAD \$7,500/i,
];

const KEY_ROUTES = [
  "/",
  "/pricing",
  "/create",
  "/demo",
  "/start",
  "/about",
  "/faq",
  "/shop",
  "/tools",
  "/industries",
  "/locations",
  "/services",
  "/compare",
  "/resources",
  "/how-to",
  "/use-cases",
  "/solutions",
  "/creators",
  "/privacy",
  "/terms",
  "/ai-receptionist",
  "/ai-receptionist-for-contractors",
  "/ai-business-system",
  "/ai-chatbot-for-small-business",
];

// ---------------------------------------------------------------------------
// A. Key routes
// ---------------------------------------------------------------------------
async function checkRoutes() {
  group("routes");
  for (const path of KEY_ROUTES) {
    try {
      const res = await get(path, { redirect: "manual" });
      check(res.status === 200, `GET ${path} is 200`, `got ${res.status}`);
    } catch (err) {
      check(false, `GET ${path} is 200`, err.message);
    }
  }

  const stamp = Date.now();
  const { res, body } = await getText(`/this-route-does-not-exist-${stamp}`);
  check(res.status === 404, "an unknown route answers 404", `got ${res.status}`);
  check(/<h1[\s>]/i.test(body), "the 404 page renders an <h1>");
  check(/noindex/i.test(body), "the 404 page is noindex");
  check(!/at Object\.|node_modules|\bstack\b.*\n\s+at /i.test(body), "the 404 page leaks no stack trace");
}

// ---------------------------------------------------------------------------
// B. robots + sitemap
// ---------------------------------------------------------------------------
async function checkRobotsAndSitemap() {
  group("robots + sitemap");

  const robots = await getText("/robots.txt");
  check(robots.res.status === 200, "GET /robots.txt is 200", `got ${robots.res.status}`);
  check(/Sitemap:\s*https?:\/\//i.test(robots.body), "robots.txt declares a Sitemap");
  check(/Disallow:\s*\/api\//i.test(robots.body), "robots.txt disallows /api/");
  check(/Disallow:\s*\/agent\//i.test(robots.body), "robots.txt disallows /agent/");

  const sitemap = await getText("/sitemap.xml");
  check(sitemap.res.status === 200, "GET /sitemap.xml is 200", `got ${sitemap.res.status}`);

  const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check(locs.length > 50, "sitemap parses and lists URLs", `${locs.length} <loc> entries`);
  check(new Set(locs).size === locs.length, "sitemap has no duplicate URLs");
  check(
    locs.every((l) => l.startsWith("https://")),
    "every sitemap URL is absolute and https",
  );

  // Sample 15 URLs rather than crawling everything.
  const sample = locs.filter((_, i) => i % Math.max(1, Math.floor(locs.length / 15)) === 0).slice(0, 15);
  const bad = [];
  for (const loc of sample) {
    try {
      const res = await get(loc, { redirect: "manual" });
      if (res.status !== 200) bad.push(`${new URL(loc).pathname} -> ${res.status}`);
    } catch (err) {
      bad.push(`${loc} -> ${err.message}`);
    }
  }
  check(bad.length === 0, `sampled ${sample.length} sitemap URLs, all 200`, bad.join("; "));
}

// ---------------------------------------------------------------------------
// C. Metadata in the raw HTML
// ---------------------------------------------------------------------------
async function checkMetadata() {
  group("metadata");

  const titles = new Map();
  const descriptions = new Map();
  const sample = KEY_ROUTES.slice(0, 14);

  for (const path of sample) {
    const { res, body } = await getText(path);
    if (res.status !== 200) {
      check(false, `metadata on ${path}`, `page is ${res.status}`);
      continue;
    }

    const title = (body.match(/<title>([^<]*)<\/title>/i) || [])[1]?.trim() || "";
    const description =
      (body.match(/<meta name="description" content="([^"]*)"/i) || [])[1]?.trim() || "";
    const canonical = (body.match(/<link rel="canonical" href="([^"]*)"/i) || [])[1] || "";
    const ogImage = /property="og:image"/i.test(body);
    const h1Count = (body.match(/<h1[\s>]/gi) || []).length;

    check(title.length > 0, `${path} has a <title>`, title);
    check(description.length > 20, `${path} has a description`, `${description.length} chars`);
    // Accept "https://host" and "https://host/" as equivalent for the homepage.
    const canonicalPath = canonical ? new URL(canonical, BASE).pathname.replace(/\/$/, "") || "/" : "";
    check(
      canonicalPath === path,
      `${path} canonical points at itself`,
      canonical || "(missing)",
    );
    check(ogImage, `${path} declares og:image`);
    check(h1Count === 1, `${path} has exactly one <h1>`, `found ${h1Count}`);

    // Every JSON-LD block must parse — a bad interpolation ships invalid schema.
    const blocks = [...body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    let bad = 0;
    for (const b of blocks) {
      try {
        JSON.parse(b[1]);
      } catch {
        bad++;
      }
    }
    check(bad === 0, `${path} JSON-LD parses`, `${blocks.length} block(s), ${bad} invalid`);

    if (title) titles.set(path, title);
    if (description) descriptions.set(path, description);
  }

  const dupTitles = duplicates([...titles.values()]);
  check(dupTitles.length === 0, "titles are unique across the sampled pages", dupTitles.join(" | "));
  const dupDesc = duplicates([...descriptions.values()]);
  check(dupDesc.length === 0, "descriptions are unique across the sampled pages", dupDesc.slice(0, 2).join(" | "));
}

function duplicates(values) {
  const seen = new Set();
  const dup = new Set();
  for (const v of values) {
    if (seen.has(v)) dup.add(v);
    seen.add(v);
  }
  return [...dup];
}

// ---------------------------------------------------------------------------
// D. Dead links + stale prices in rendered HTML
// ---------------------------------------------------------------------------
async function checkContentDefects() {
  group("content defects");

  const prices = await repoPrices();
  const pages = ["/", "/pricing", "/create", "/about", "/ai-receptionist", "/faq", "/llms.txt"];

  for (const path of pages) {
    const { res, body } = await getText(path);
    if (res.status !== 200) continue;

    const deadLinks = (body.match(/href="#"/g) || []).length;
    check(deadLinks === 0, `${path} has no href="#"`, `${deadLinks} found`);

    const stale = STALE_PRICES.filter((re) => re.test(body)).map(String);
    check(stale.length === 0, `${path} carries no retired price string`, stale.join(", "));

    check(!/\bis From \$/.test(body), `${path} has no "is From $" prose defect`);
  }

  if (prices.length) {
    const { res, body } = await getText("/pricing");
    if (res.status === 200) {
      const missing = prices
        .map((p) => ({ ...p, str: p.price.toLocaleString("en-CA") }))
        .filter((p) => !body.includes(p.str));
      check(
        missing.length === 0,
        "/pricing quotes every price from lib/data/packages.ts",
        missing.map((p) => `${p.id}=${p.str}`).join(", "),
      );
    }
  }
}

// ---------------------------------------------------------------------------
// E. Redirects resolve in one hop
// ---------------------------------------------------------------------------
async function checkRedirects() {
  group("redirects");

  let redirects;
  try {
    redirects = await repoRedirectsSync();
  } catch (err) {
    check(false, "next.config.js redirects() is readable", err.message);
    return;
  }

  const testable = redirects.filter((r) => !r.source.includes(":") && !r.destination.includes(":"));
  check(testable.length > 0, "found redirect rules to verify", `${testable.length} rule(s)`);

  // The rules come from the LOCAL next.config.js. Run this against a target
  // that has the current branch deployed — a rule added on the branch will
  // read as "200, expected 3xx" against an older production build, which is a
  // deploy-lag artefact, not a defect.
  process.stdout.write(
    `         (rules read from the local next.config.js — a 200 here can mean "not deployed yet")\n`,
  );

  const problems = [];
  for (const r of testable) {
    try {
      const first = await get(r.source, { redirect: "manual" });
      if (first.status < 300 || first.status >= 400) {
        problems.push(`${r.source}: ${first.status}, expected 3xx`);
        continue;
      }
      const location = first.headers.get("location");
      const landed = location && location.startsWith("http") ? new URL(location).pathname : location;
      if (landed !== r.destination) {
        problems.push(`${r.source}: -> ${landed}, config says ${r.destination}`);
        continue;
      }
      const second = await get(r.destination, { redirect: "manual" });
      if (second.status >= 300 && second.status < 400) {
        problems.push(`${r.source} -> ${r.destination} -> ${second.headers.get("location")} (chain)`);
      } else if (second.status !== 200) {
        problems.push(`${r.source} -> ${r.destination} is ${second.status}`);
      }
    } catch (err) {
      problems.push(`${r.source}: ${err.message}`);
    }
  }
  check(problems.length === 0, "every redirect lands in one hop on a live page", problems.join("; "));
}

// ---------------------------------------------------------------------------
// F. Security surface (GET only — never dial, never write)
// ---------------------------------------------------------------------------
async function checkSecurity() {
  group("security");

  // THE P0 CANARY. Until the agent subsystem was gated (2026-08-30) this
  // returned 200 with every stored contact's name, phone and email. It must
  // now be 404 (kill switch off) or 401/403 (switch on, not the owner).
  const { res, body } = await getText("/api/agent/contacts", { redirect: "manual" });
  const gated = [401, 403, 404, 307, 302].includes(res.status);
  check(gated, "GET /api/agent/contacts does NOT serve data", `status ${res.status}`);
  const looksLikeContacts = /"phone"\s*:|"contactName"\s*:|"company"\s*:/.test(body);
  check(!looksLikeContacts, "the /api/agent/contacts body contains no contact fields");

  for (const path of ["/api/agent/calls", "/api/agent/campaigns"]) {
    const r = await get(path, { redirect: "manual" });
    check([401, 403, 404, 307, 302].includes(r.status), `GET ${path} is gated`, `status ${r.status}`);
  }

  // The agent dashboard pages must not be publicly browsable either.
  for (const path of ["/agent", "/agent/contacts"]) {
    const r = await get(path, { redirect: "manual" });
    check(
      [401, 403, 404, 307, 302].includes(r.status),
      `GET ${path} is gated`,
      `status ${r.status}`,
    );
  }

  // IndexNow requires its shared secret.
  const idx = await get("/api/indexnow", { redirect: "manual" });
  check(idx.status !== 200, "GET /api/indexnow without a secret is refused", `status ${idx.status}`);

  // Security headers on the homepage.
  const home = await get("/");
  const h = (k) => home.headers.get(k) || "";
  check(/nosniff/i.test(h("x-content-type-options")), "X-Content-Type-Options: nosniff");
  check(/sameorigin|deny/i.test(h("x-frame-options")), "X-Frame-Options is set", h("x-frame-options"));
  check(h("referrer-policy").length > 0, "Referrer-Policy is set", h("referrer-policy"));
  check(h("permissions-policy").length > 0, "Permissions-Policy is set");
  if (BASE.startsWith("https://")) {
    check(/max-age=\d+/.test(h("strict-transport-security")), "HSTS is set", h("strict-transport-security"));
  }
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------
async function main() {
  process.stdout.write(`\nHandbuilt smoke test — READ-ONLY (no POST/PUT/DELETE)\nTarget: ${BASE}\n\n`);

  const steps = [
    ["Routes", checkRoutes],
    ["Robots + sitemap", checkRobotsAndSitemap],
    ["Metadata", checkMetadata],
    ["Content defects", checkContentDefects],
    ["Redirects", checkRedirects],
    ["Security", checkSecurity],
  ];

  for (const [label, fn] of steps) {
    process.stdout.write(`\n${label}\n${"-".repeat(label.length)}\n`);
    try {
      await fn();
    } catch (err) {
      record(false, `${label} suite crashed`, err.message);
    }
  }

  const failed = results.filter((r) => !r.ok);
  process.stdout.write(`\n${"=".repeat(60)}\n`);
  process.stdout.write(`${results.length - failed.length}/${results.length} checks passed\n`);

  if (failed.length) {
    process.stdout.write(`\nFAILURES\n`);
    for (const f of failed) {
      process.stdout.write(`  [${f.group}] ${f.name}${f.detail ? ` — ${f.detail}` : ""}\n`);
    }
    process.stdout.write("\n");
    process.exit(1);
  }

  process.stdout.write("\nAll checks passed.\n\n");
}

main().catch((err) => {
  process.stderr.write(`\nSmoke test could not run: ${err.stack || err.message}\n\n`);
  process.exit(1);
});
