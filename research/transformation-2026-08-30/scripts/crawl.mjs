// Crawl script for aibuiltbyhand.com URL inventory (agent A2, 2026-08-30)
// Fetches every sitemap URL + every non-sitemap route from a local `next start`
// server and extracts structured SEO/content signals per URL. Read-only: never
// touches the app or the sitemap, only writes into research/transformation-2026-08-30/.
//
// Usage: node research/transformation-2026-08-30/scripts/crawl.mjs
// Requires: local server already running at BASE_URL (default http://localhost:3200)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const OUT_DIR = path.resolve(__dirname, "..");
const BASE_URL = process.env.CRAWL_BASE_URL || "http://localhost:3200";
const PROD_HOST = "aibuiltbyhand.com";

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

// ---------- 1. Build the URL universe ----------

function loadSitemapPaths() {
  // We fetch the live sitemap.xml from the running server rather than parsing
  // a static file, so this reflects exactly what the app would serve.
  return null; // filled in at runtime, see main()
}

function loadPrerenderedPaths() {
  const manifestPath = path.join(REPO_ROOT, ".next", "prerender-manifest.json");
  const m = readJson(manifestPath);
  return Object.keys(m.routes);
}

// Routes that exist in the app but are not statically prerendered (dynamic,
// server-rendered, ƒ in the build output) and are NOT parametrized by an
// unknowable runtime id. These are added manually because they cannot be
// discovered from the prerender manifest.
const EXTRA_DYNAMIC_ROUTES = [
  "/account", // ƒ dynamic — auth-gated account page, no static params
];

// Route templates that require a real database-backed id and have no
// generateStaticParams (app/agent/leads/[id], app/products/[id]). These are
// intentionally excluded from the crawl universe — there is no discoverable
// list of valid ids from static files, and hitting them with a fake id would
// only prove the 404/not-found path, not real inventory. Recorded here for
// the report.
const EXCLUDED_ID_ROUTES = ["/agent/leads/[id]", "/products/[id]"];

// ---------- 2. Page-type inference ----------

function inferPageType(p) {
  if (p === "/") return "home";
  if (p === "/robots.txt" || p === "/sitemap.xml" || p === "/llms.txt") return "meta";
  if (p === "/opengraph-image.png" || p === "/twitter-image.png") return "meta";
  if (p === "/privacy" || p === "/terms") return "legal";
  if (p.startsWith("/services")) return "service";
  if (p.startsWith("/industries")) return "industry";
  if (p.startsWith("/locations")) return "location";
  if (p.startsWith("/compare")) return "compare";
  if (p.startsWith("/creators")) return "creator";
  if (p.startsWith("/use-cases")) return "use-case";
  if (p.startsWith("/resources")) return "resource";
  if (p.startsWith("/how-to")) return "how-to";
  if (p.startsWith("/tools")) return "tool";
  if (p.startsWith("/agent")) return "app";
  if (["/dashboard", "/login", "/cart", "/account", "/products"].includes(p)) return "app";
  if (p.startsWith("/demo")) return "demo";
  if (["/about", "/faq", "/pricing", "/solutions", "/shop", "/start", "/create", "/forge", "/ai-front-desk"].includes(p))
    return "other";
  if (
    p.startsWith("/ai-") ||
    ["/custom-ai-app-development", "/done-for-you-ai-automation", "/remote-ai-development"].includes(p)
  )
    return "service"; // flagship/legacy standalone service-style landing pages
  return "other";
}

// ---------- 3. Lightweight HTML extraction (no cheerio dependency) ----------

function stripTagBlocks(html, tags) {
  let out = html;
  for (const tag of tags) {
    const re = new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
    out = out.replace(re, " ");
  }
  return out;
}

function getAttr(tagHtml, attr) {
  const re = new RegExp(`${attr}\\s*=\\s*"([^"]*)"|${attr}\\s*=\\s*'([^']*)'`, "i");
  const m = tagHtml.match(re);
  if (!m) return null;
  return m[1] !== undefined ? m[1] : m[2];
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x2F;/g, "/")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”");
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(m[1].trim()) : "";
}

function extractMetaContent(html, nameOrProperty, value) {
  // Match <meta name="X" content="Y"> in either attribute order.
  const metaTagRe = /<meta\b[^>]*>/gi;
  const tags = html.match(metaTagRe) || [];
  for (const tag of tags) {
    const nameAttr = getAttr(tag, "name") || getAttr(tag, "property");
    if (nameAttr && nameAttr.toLowerCase() === value.toLowerCase()) {
      const content = getAttr(tag, "content");
      if (content !== null) return decodeEntities(content);
    }
  }
  return "";
}

function extractCanonical(html) {
  const linkTagRe = /<link\b[^>]*>/gi;
  const tags = html.match(linkTagRe) || [];
  for (const tag of tags) {
    const rel = getAttr(tag, "rel");
    if (rel && rel.toLowerCase() === "canonical") {
      return getAttr(tag, "href") || "";
    }
  }
  return "";
}

function extractH1s(html) {
  const re = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi;
  const matches = [...html.matchAll(re)];
  const texts = matches.map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
  );
  return { count: matches.length, texts };
}

function extractJsonLd(html) {
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [...html.matchAll(re)];
  const types = [];
  for (const m of matches) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (item && item["@graph"] && Array.isArray(item["@graph"])) {
          for (const g of item["@graph"]) {
            if (g && g["@type"]) types.push(String(g["@type"]));
          }
        } else if (item && item["@type"]) {
          types.push(String(item["@type"]));
        }
      }
    } catch {
      types.push("PARSE_ERROR");
    }
  }
  return { count: matches.length, types };
}

function extractInternalLinks(html, baseOrigin) {
  const re = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const seen = new Set();
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1].trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (href.startsWith("javascript:")) continue;
    let normalized;
    if (href.startsWith("/")) {
      normalized = href.split("#")[0].split("?")[0];
    } else if (href.includes(PROD_HOST) || href.includes("localhost:3200")) {
      try {
        const u = new URL(href);
        normalized = u.pathname;
      } catch {
        continue;
      }
    } else if (href.startsWith("http://") || href.startsWith("https://")) {
      continue; // external
    } else {
      continue; // relative non-absolute (rare in Next output), skip
    }
    if (normalized === "") normalized = "/";
    seen.add(normalized);
  }
  return seen.size;
}

function extractOgImage(html) {
  return extractMetaContent(html, "property", "og:image");
}

function extractRobotsMeta(html) {
  return extractMetaContent(html, "name", "robots");
}

const STALE_STRINGS = ["$2,500", "$7,500+", "~$1,000", "$250/mo", "Book a call", "Book a 10"];

function extractPriceStrings(text) {
  // Distinct $-prefixed price-like tokens, e.g. $1,500, $2,500-5,000, $99/mo
  const re = /\$[\d][\d,]*(?:\.\d+)?(?:\s*[-–]\s*\$?[\d][\d,]*(?:\.\d+)?)?(?:\/(?:mo|month|yr|year))?\+?/g;
  const found = text.match(re) || [];
  return [...new Set(found)];
}

function getVisibleText(html) {
  let body = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) body = bodyMatch[1];
  body = stripTagBlocks(body, ["script", "style", "nav", "footer", "noscript", "template"]);
  const text = body
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return decodeEntities(text);
}

function wordCount(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

// ---------- 4. GSC join ----------

function parseCsv(content) {
  // Minimal CSV parser handling quoted fields with commas.
  const lines = content.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const parseLine = (line) => {
    const out = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQuotes) {
        if (c === '"') {
          if (line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          cur += c;
        }
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ",") {
          out.push(cur);
          cur = "";
        } else cur += c;
      }
    }
    out.push(cur);
    return out;
  };
  const header = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const vals = parseLine(line);
    const row = {};
    header.forEach((h, i) => (row[h] = vals[i] !== undefined ? vals[i] : ""));
    return row;
  });
}

function normalizePath(url) {
  let pth;
  try {
    pth = new URL(url).pathname;
  } catch {
    pth = url.startsWith("/") ? url : `/${url}`;
  }
  if (pth !== "/" && pth.endsWith("/")) pth = pth.slice(0, -1);
  return pth;
}

// research/gsc-baseline/data/url-performance.csv — real GSC page-dimension pull
// (46-day window 2026-06-14→2026-07-29). Columns per _README.md:
// current_url,page_type,phase1_action,clicks,impressions,ctr_pct,avg_position,
// in_gsc_dataset,revised_action,confidence,reason,implementation_status
function loadGscUrlPerformance() {
  const p = path.join(REPO_ROOT, "research", "gsc-baseline", "data", "url-performance.csv");
  if (!fs.existsSync(p)) return { rows: [], byPath: new Map(), columns: [] };
  const raw = fs.readFileSync(p, "utf8");
  const rows = parseCsv(raw);
  const byPath = new Map();
  for (const row of rows) {
    const url = row.current_url || "";
    if (!url) continue;
    const pth = normalizePath(url);
    byPath.set(pth, row);
  }
  return { rows, byPath, columns: rows.length ? Object.keys(rows[0]) : [] };
}

// research/gsc-baseline/data/query-page-map.csv — real query->page GSC join,
// but tiny (4 rows covering only the 2 queries with measured cannibalization).
// Columns: query,page,clicks,impressions,avg_position,note
function loadGscQueryPageMap() {
  const p = path.join(REPO_ROOT, "research", "gsc-baseline", "data", "query-page-map.csv");
  if (!fs.existsSync(p)) return new Map();
  const raw = fs.readFileSync(p, "utf8");
  const rows = parseCsv(raw);
  const byPath = new Map();
  for (const row of rows) {
    const url = row.page || "";
    const query = row.query || "";
    if (!url) continue;
    const pth = normalizePath(url);
    const impressions = Number(row.impressions || 0);
    const existing = byPath.get(pth);
    if (!existing || impressions > existing._impr) {
      byPath.set(pth, { query, _impr: impressions });
    }
  }
  return byPath;
}

function loadGapCoverageJoin() {
  // research/keyword-gap-2026-08-12/data/GSC-COVERAGE-JOIN.tsv — query -> nearest
  // matched page (heuristic "best_page", NOT a real per-page GSC pull; per
  // GSC-COVERAGE-SUMMARY.json every row is NO-PAGE or WEAK-PAGE, verdict
  // RANKING count = 0). Used only as a fallback "closest query" hint, keeping
  // the highest-impression query per best_page.
  const p = path.join(REPO_ROOT, "research", "keyword-gap-2026-08-12", "data", "GSC-COVERAGE-JOIN.tsv");
  if (!fs.existsSync(p)) return new Map();
  const raw = fs.readFileSync(p, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return new Map();
  const header = lines[0].split("\t");
  const urlIdx = header.indexOf("best_page");
  const imprIdx = header.indexOf("impressions");
  const queryIdx = header.indexOf("query");
  const verdictIdx = header.indexOf("verdict");
  const byPath = new Map();
  if (urlIdx === -1) return byPath;
  for (const line of lines.slice(1)) {
    const cols = line.split("\t");
    const url = cols[urlIdx];
    if (!url) continue;
    const pth = normalizePath(url);
    const impressions = Number(cols[imprIdx] || 0);
    const existing = byPath.get(pth);
    if (!existing || impressions > existing._impr) {
      byPath.set(pth, { query: cols[queryIdx], verdict: cols[verdictIdx], _impr: impressions });
    }
  }
  return byPath;
}

// ---------- 5. Main crawl ----------

function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

async function fetchUrl(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location") || "";
      return { status: res.status, redirected: true, finalUrl: location, contentType: res.headers.get("content-type") || "", html: "" };
    }
    const contentType = res.headers.get("content-type") || "";
    let html = "";
    if (contentType.includes("text/html")) {
      html = await res.text();
    }
    return { status: res.status, redirected: false, finalUrl: url, contentType, html };
  } catch (e) {
    return { status: 0, redirected: false, finalUrl: url, contentType: "", html: "", error: String(e) };
  }
}

async function main() {
  console.log("Fetching sitemap.xml from", BASE_URL);
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  const sitemapPaths = new Set(
    [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      try {
        return new URL(m[1]).pathname || "/";
      } catch {
        return m[1];
      }
    })
  );
  console.log("Sitemap URLs:", sitemapPaths.size);

  const prerendered = loadPrerenderedPaths();
  const allPaths = new Set([...prerendered, ...sitemapPaths, ...EXTRA_DYNAMIC_ROUTES]);
  const sortedPaths = [...allPaths].sort();
  console.log("Total URL universe to crawl:", sortedPaths.length);

  const gscUrlPerf = loadGscUrlPerformance();
  const gscQueryMap = loadGscQueryPageMap();
  const gapJoin = loadGapCoverageJoin();

  const rows = [];
  let i = 0;
  for (const p of sortedPaths) {
    i++;
    const url = `${BASE_URL}${p}`;
    const result = await fetchUrl(url);
    let title = "",
      description = "",
      canonical = "",
      robotsMeta = "",
      ogImage = "",
      h1Count = 0,
      h1Text = "",
      wc = 0,
      internalLinks = 0,
      jsonLdCount = 0,
      jsonLdTypes = "",
      priceStrings = "",
      staleHits = "";

    if (result.html) {
      title = extractTitle(result.html);
      description = extractMetaContent(result.html, "name", "description");
      canonical = extractCanonical(result.html);
      robotsMeta = extractRobotsMeta(result.html);
      ogImage = extractOgImage(result.html);
      const h1 = extractH1s(result.html);
      h1Count = h1.count;
      h1Text = h1.texts.join(" | ");
      const visibleText = getVisibleText(result.html);
      wc = wordCount(visibleText);
      internalLinks = extractInternalLinks(result.html, BASE_URL);
      const jsonLd = extractJsonLd(result.html);
      jsonLdCount = jsonLd.count;
      jsonLdTypes = [...new Set(jsonLd.types)].join("|");
      const prices = extractPriceStrings(result.html);
      priceStrings = prices.join("|");
      staleHits = STALE_STRINGS.filter((s) => result.html.includes(s)).join("|");
    }

    const gscRow = gscUrlPerf.byPath.get(p);
    const gscQuery = gscQueryMap.get(p);
    const gapRow = gapJoin.get(p);

    rows.push({
      path: p,
      page_type: inferPageType(p),
      in_sitemap: sitemapPaths.has(p) ? "yes" : "no",
      status: result.status,
      redirected: result.redirected ? "yes" : "no",
      final_url: result.redirected ? result.finalUrl : "",
      content_type: result.contentType,
      title,
      title_length: title.length,
      meta_description: description,
      description_length: description.length,
      canonical,
      robots_meta: robotsMeta,
      noindex: /noindex/i.test(robotsMeta) ? "yes" : "no",
      og_image: ogImage,
      h1_count: h1Count,
      h1_text: h1Text,
      word_count: wc,
      internal_link_count: internalLinks,
      jsonld_block_count: jsonLdCount,
      jsonld_types: jsonLdTypes,
      price_strings: priceStrings,
      stale_strings_found: staleHits,
      gsc_impressions: gscRow ? gscRow.impressions || "" : "",
      gsc_clicks: gscRow ? gscRow.clicks || "" : "",
      gsc_position: gscRow ? gscRow.avg_position || "" : "",
      gsc_in_dataset: gscRow ? gscRow.in_gsc_dataset || "" : "",
      gsc_top_query: gscQuery ? gscQuery.query : gapRow ? gapRow.query || "" : "",
      gsc_top_query_source: gscQuery ? "query-page-map (real)" : gapRow ? `gap-coverage-join (heuristic, ${gapRow.verdict})` : "",
      intended_keyword: "",
      overlapping_pages: "",
      action: "",
      fetch_error: result.error || "",
    });

    if (i % 25 === 0) console.log(`  crawled ${i}/${sortedPaths.length}`);
  }

  // Write CSV
  const columns = Object.keys(rows[0]);
  const csvLines = [columns.join(",")];
  for (const row of rows) {
    csvLines.push(columns.map((c) => csvEscape(row[c])).join(","));
  }
  const csvPath = path.join(OUT_DIR, "02-url-inventory.csv");
  fs.writeFileSync(csvPath, csvLines.join("\n") + "\n");
  console.log("Wrote", csvPath, `(${rows.length} rows)`);

  // Persist raw data + diagnostics for the report-writing step.
  fs.writeFileSync(
    path.join(OUT_DIR, "scripts", "crawl-raw-output.json"),
    JSON.stringify(
      {
        base_url: BASE_URL,
        crawled_at: new Date().toISOString(),
        total_urls: rows.length,
        sitemap_url_count: sitemapPaths.size,
        prerendered_count: prerendered.length,
        extra_dynamic_routes: EXTRA_DYNAMIC_ROUTES,
        excluded_id_routes: EXCLUDED_ID_ROUTES,
        gsc_url_perf_columns: gscUrlPerf.columns || [],
        gsc_url_perf_row_count: gscUrlPerf.rows.length,
        rows,
      },
      null,
      2
    )
  );
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
