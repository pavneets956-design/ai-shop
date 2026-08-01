#!/usr/bin/env node
/**
 * Live SERP + People-Also-Ask harvester.
 *
 * Google renders results client-side, so curl returns only a JS shell. This
 * drives a real headless Chromium instead. Personalisation is suppressed with
 * `pws=0` and a throwaway profile (no cookies, never signed in); `gl`/`hl`/`uule`
 * pin the market.
 *
 * PAA trees are built the way AlsoAsked does it: read level-1 questions, click
 * each one, wait for Google to append its children, re-read, recurse. Depth is
 * capped at 3.
 *
 * Usage:
 *   NODE_PATH=<npx playwright node_modules> node scripts/research/serp-harvest.js queries.json CA
 *
 * Writes, per query:
 *   research/search-demand/raw/serp/<market>/<slug>.json   parsed record
 *   research/search-demand/raw/serp/<market>/<slug>.html   archived DOM
 * and appends a row to _index.jsonl.
 *
 * Nothing here infers. If a feature is absent it is recorded as absent; if a
 * fetch fails the row records the failure rather than being dropped.
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const queriesFile = process.argv[2];
const market = (process.argv[3] || "CA").toUpperCase();
const MAX_PAA_DEPTH = parseInt(process.env.PAA_DEPTH || "3", 10);

const GEO = {
  CA: { gl: "ca", hl: "en", label: "Canada" },
  US: { gl: "us", hl: "en", label: "United States" },
};
const geo = GEO[market];
if (!geo) throw new Error(`unknown market ${market}`);

const OUT = path.join(process.cwd(), "research", "search-demand", "raw", "serp", market);
fs.mkdirSync(OUT, { recursive: true });

const queries = JSON.parse(fs.readFileSync(queriesFile, "utf8"));
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Read the currently-visible PAA question strings, in DOM order. */
async function readPaa(page) {
  return page.evaluate(() => {
    const seen = new Set();
    const out = [];
    // Google marks each PAA row with data-q (the question) on the expander.
    document.querySelectorAll("[data-q]").forEach((el) => {
      const q = el.getAttribute("data-q");
      if (q && q.length > 8 && !seen.has(q)) {
        seen.add(q);
        out.push(q);
      }
    });
    // Fallback for layouts that use role=button + aria-expanded around the text.
    if (out.length === 0) {
      document.querySelectorAll('div[role="button"][aria-expanded], [jsname][aria-expanded]').forEach((el) => {
        const t = (el.innerText || "").trim().split("\n")[0];
        if (t && /\?$/.test(t) && t.length > 8 && t.length < 160 && !seen.has(t)) {
          seen.add(t);
          out.push(t);
        }
      });
    }
    return out;
  });
}

/** Click a PAA row by its question text so Google appends its children. */
async function expandPaa(page, question) {
  return page.evaluate(async (q) => {
    const target =
      document.querySelector(`[data-q="${CSS.escape(q)}"]`) ||
      [...document.querySelectorAll('div[role="button"][aria-expanded]')].find(
        (el) => (el.innerText || "").trim().split("\n")[0] === q,
      );
    if (!target) return false;
    const clickable = target.closest('[role="button"]') || target;
    clickable.scrollIntoView({ block: "center" });
    clickable.click();
    return true;
  }, question);
}

async function harvestPaaTree(page) {
  const level1 = await readPaa(page);
  if (level1.length === 0) return { present: false, tree: [], flat: [] };

  const tree = level1.map((q) => ({ q, depth: 1, children: [] }));
  const known = new Set(level1);
  const flat = [...level1];

  // Breadth-first: expand each node, diff the question list, attribute new
  // questions to the node that was just clicked.
  const queue = tree.map((n) => n);
  while (queue.length) {
    const node = queue.shift();
    if (node.depth >= MAX_PAA_DEPTH) continue;
    const ok = await expandPaa(page, node.q);
    if (!ok) continue;
    await sleep(1400);
    const after = await readPaa(page);
    const fresh = after.filter((q) => !known.has(q));
    for (const q of fresh) {
      known.add(q);
      flat.push(q);
      const child = { q, depth: node.depth + 1, children: [] };
      node.children.push(child);
      queue.push(child);
    }
    if (flat.length > 60) break; // safety valve; recorded in notes
  }
  return { present: true, tree, flat, truncated: flat.length > 60 };
}

async function harvestOne(page, query) {
  const url =
    `https://www.google.com/search?q=${encodeURIComponent(query)}` +
    `&gl=${geo.gl}&hl=${geo.hl}&pws=0&num=20`;
  const rec = {
    query,
    market,
    geo: geo.label,
    requestUrl: url,
    collectedAt: new Date().toISOString(),
    personalization: "suppressed (pws=0, fresh context, not signed in)",
  };

  try {
    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 35000 });
    rec.httpStatus = resp ? resp.status() : null;
    await sleep(1800);

    const blocked = await page.evaluate(() =>
      /unusual traffic|systems have detected|recaptcha|before you continue/i.test(document.body.innerText || ""),
    );
    if (blocked) {
      rec.blocked = true;
      rec.note = "Google served an interstitial (captcha/consent). No data extracted.";
      return rec;
    }

    Object.assign(
      rec,
      await page.evaluate(() => {
        const text = document.body.innerText || "";
        const org = [...document.querySelectorAll("a h3")]
          .map((h) => {
            const a = h.closest("a");
            let host = "";
            try {
              host = new URL(a.href).hostname.replace(/^www\./, "");
            } catch {}
            return { title: (h.textContent || "").trim(), host, url: a ? a.href : "" };
          })
          .filter((r) => r.host && !/^google\./.test(r.host));

        const related = [...document.querySelectorAll('a[href*="/search?"]')]
          .map((a) => (a.textContent || "").trim())
          .filter(
            (t) =>
              t.length > 6 &&
              t.length < 90 &&
              !/^(Images|Videos|News|Maps|Shopping|Books|Flights|Finance|More|Tools|Settings|Sign in|Next|Previous|AI Mode|Short videos|Past |Verbatim|See more|Try without)/i.test(
                t,
              ),
          );

        // AI Overview: Google labels the block; capture its text if present.
        let aiOverviewText = null;
        const aioHeading = [...document.querySelectorAll("h1,h2,div,span")].find(
          (e) => (e.textContent || "").trim() === "AI Overview",
        );
        if (aioHeading) {
          const block = aioHeading.closest("div[data-hveid]") || aioHeading.parentElement;
          if (block) aiOverviewText = (block.innerText || "").slice(0, 1200);
        }

        return {
          organic: org.slice(0, 12),
          organicCount: org.length,
          relatedSearches: [...new Set(related)].slice(0, 24),
          features: {
            aiOverview: /\bAI Overview\b/.test(text),
            peopleAlsoAsk: /People also ask/i.test(text),
            ads: /\bSponsored\b/i.test(text),
            localPack: /\bMore places\b|\bPlaces\b/i.test(text),
            videosBlock: !!document.querySelector('a[href*="youtube.com/watch"]'),
            discussionsAndForums: /Discussions and forums/i.test(text),
          },
          aiOverviewText,
          hostMix: (() => {
            const counts = {};
            [...document.querySelectorAll("a h3")].forEach((h) => {
              const a = h.closest("a");
              try {
                const host = new URL(a.href).hostname.replace(/^www\./, "");
                if (!/^google\./.test(host)) counts[host] = (counts[host] || 0) + 1;
              } catch {}
            });
            return counts;
          })(),
        };
      }),
    );

    rec.paa = await harvestPaaTree(page);

    const html = await page.content();
    fs.writeFileSync(path.join(OUT, `${slug(query)}.html`), html);
    rec.archivedHtml = `research/search-demand/raw/serp/${market}/${slug(query)}.html`;
    rec.archivedBytes = html.length;
  } catch (e) {
    rec.error = String(e.message || e).slice(0, 160);
  }
  return rec;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    locale: market === "CA" ? "en-CA" : "en-US",
    timezoneId: market === "CA" ? "America/Vancouver" : "America/New_York",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 1200 },
  });
  const page = await ctx.newPage();

  const idx = fs.createWriteStream(path.join(OUT, "_index.jsonl"), { flags: "w" });
  let ok = 0,
    blocked = 0,
    errored = 0,
    withPaa = 0;

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    const rec = await harvestOne(page, q);
    fs.writeFileSync(path.join(OUT, `${slug(q)}.json`), JSON.stringify(rec, null, 2));
    idx.write(JSON.stringify(rec) + "\n");
    if (rec.blocked) blocked++;
    else if (rec.error) errored++;
    else {
      ok++;
      if (rec.paa?.present) withPaa++;
    }
    process.stderr.write(
      `[${i + 1}/${queries.length}] ${market} ${rec.blocked ? "BLOCKED" : rec.error ? "ERR" : "ok"} ` +
        `paa=${rec.paa?.flat?.length ?? 0} org=${rec.organicCount ?? 0}  ${q}\n`,
    );
    await sleep(2600 + Math.floor(Math.random() * 1200));
  }

  idx.end();
  await browser.close();
  console.log(JSON.stringify({ market, total: queries.length, ok, blocked, errored, withPaa }, null, 2));
})();
