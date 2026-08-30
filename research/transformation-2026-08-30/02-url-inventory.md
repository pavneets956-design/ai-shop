# URL Inventory — aibuiltbyhand.com (agent A2, crawl + URL inventory)

**Date:** 2026-08-30
**Branch crawled:** `feat/site-transformation-2026-08-30` @ `e732d98` (42 commits ahead of local `main`, 0 behind — this reflects the branch, not necessarily what is deployed to production; verify against Vercel before treating any number here as a live-site fact).
**Method:** `npx next build` (no `prisma migrate`) → `npx next start -p 3200` → crawled every URL in `.next/prerender-manifest.json` (241 statically-generated paths) plus the live `/sitemap.xml` (216 URLs, a strict subset of the 241) plus one extra dynamic route (`/account`) not covered by either = **242 URLs crawled**. Every number below comes from that crawl or from the build's own output — nothing estimated.
**Script:** `research/transformation-2026-08-30/scripts/crawl.mjs` (raw fetch, no external deps). Output: `research/transformation-2026-08-30/02-url-inventory.csv` (242 rows) + `research/transformation-2026-08-30/scripts/crawl-raw-output.json` (full structured dump).
**Excluded from crawl:** `app/agent/leads/[id]/page.tsx` and `app/products/[id]/page.tsx` — both are `ƒ` dynamic with no `generateStaticParams`, so there is no discoverable list of valid ids from static files. Hitting them with a fabricated id would only prove the not-found path, not real inventory.

---

## 1. Build result

`npx next build` (not `npm run build`, so no `prisma migrate deploy`) — **exit 0**.

- 260 static pages generated (`Generating static pages (260/260)`)
- Compiled with warnings only, no errors:
  - `mupdf.js` topLevelAwait warning (async/await in a WASM module, repeats per import of `tools/form-filler-ca`) — cosmetic, does not fail the build
  - `no-img-element` (ESLint) — raw `<img>` instead of `next/image` somewhere in the tree
  - `react-hooks/exhaustive-deps` in `components/showroom/Showroom.tsx:192` — missing `streamIn` dependency
- `baseline-browser-mapping` and `caniuse-lite` staleness notices (informational only)

### Route / bundle-size table (verbatim from the build)

```
Route (app)                                              Size     First Load JS
┌ ○ /                                                    5.16 kB         102 kB
├ ○ /_not-found                                          159 B          88.4 kB
├ ○ /about                                               1.27 kB         139 kB
├ ƒ /account                                             1.54 kB         149 kB
├ ○ /agent                                               2.76 kB        99.8 kB
├ ○ /agent/calls                                         2.94 kB         100 kB
├ ○ /agent/campaigns                                     3.29 kB         100 kB
├ ○ /agent/contacts                                      3.9 kB          101 kB
├ ○ /agent/leads                                         4.04 kB         101 kB
├ ƒ /agent/leads/[id]                                    4.12 kB         101 kB
├ ○ /agent/settings                                      4.38 kB         101 kB
├ ○ /ai-automation-agency                                1.34 kB         141 kB
├ ○ /ai-automation-canada                                1.34 kB         141 kB
├ ○ /ai-business-system                                  1.34 kB         141 kB
├ ○ /ai-chatbot-development                              1.34 kB         141 kB
├ ○ /ai-chatbot-for-small-business                       1.34 kB         141 kB
├ ○ /ai-front-desk                                       14.8 kB         134 kB
├ ○ /ai-integration-services                             1.34 kB         141 kB
├ ○ /ai-lead-follow-up-agent                             1.34 kB         141 kB
├ ○ /ai-receptionist                                     1.34 kB         141 kB
├ ○ /ai-receptionist-for-contractors                     1.34 kB         141 kB
├ ƒ /api/agent/businesses/search .. /api/tts             0 B             0 B   (18 API routes, all 0 B / server-only)
├ ○ /cart                                                187 B          97.2 kB
├ ○ /compare                                             1.3 kB          139 kB
├ ● /compare/[slug]  (21 paths)                          1.34 kB         141 kB
├ ○ /create                                              11.6 kB         140 kB
├ ○ /creators                                            439 B           138 kB
├ ● /creators/[slug]  (20 paths)                         1.34 kB         141 kB
├ ○ /custom-ai-app-development                           1.34 kB         141 kB
├ ƒ /dashboard                                            2.85 kB        99.9 kB
├ ○ /demo                                                12.8 kB         150 kB
├ ○ /demo/assistant                                      2.45 kB         140 kB
├ ○ /demo/lead                                           2.45 kB         140 kB
├ ○ /demo/nudge                                          151 B           141 kB
├ ○ /demo/quote                                          151 B           141 kB
├ ○ /done-for-you-ai-automation                          1.34 kB         141 kB
├ ○ /faq                                                 1.26 kB         141 kB
├ ○ /forge                                               6.67 kB         135 kB
├ ○ /how-to                                              1.3 kB          139 kB
├ ● /how-to/[slug]  (9 paths)                            1.34 kB         141 kB
├ ○ /industries                                          1.3 kB          139 kB
├ ● /industries/[slug]  (39 paths)                       1.34 kB         141 kB
├ ○ /llms.txt                                            0 B                0 B
├ ○ /locations                                           1.3 kB          139 kB
├ ● /locations/[slug]  (19 paths)                        1.34 kB         141 kB
├ ○ /login                                               1.96 kB         109 kB
├ ○ /opengraph-image.png                                 0 B                0 B
├ ○ /pricing                                             1.27 kB         141 kB
├ ○ /privacy                                             159 B          88.4 kB
├ ○ /products                                            159 B          88.4 kB
├ ƒ /products/[id]                                       159 B          88.4 kB
├ ○ /remote-ai-development                               1.34 kB         141 kB
├ ○ /resources                                           1.3 kB          139 kB
├ ● /resources/[slug]  (24 paths)                        1.34 kB         141 kB
├ ○ /robots.txt                                          0 B                0 B
├ ○ /services                                            1.3 kB          139 kB
├ ● /services/[slug]  (25 paths)                         1.34 kB         141 kB
├ ○ /shop                                                1.3 kB          139 kB
├ ○ /sitemap.xml                                         0 B                0 B
├ ○ /solutions                                           1.28 kB         139 kB
├ ○ /start                                               10.3 kB         107 kB
├ ○ /terms                                               159 B          88.4 kB
├ ○ /tools                                               187 B          97.2 kB
├ ○ /tools/* (6 calculators/form-filler)                 3.5–14.7 kB     103–157 kB
├ ○ /twitter-image.png                                   0 B                0 B
├ ○ /use-cases                                           1.3 kB          139 kB
└ ● /use-cases/[slug]  (25 paths)                        2.67 kB         143 kB
+ First Load JS shared by all                            88.3 kB
ƒ Middleware                                             49.3 kB
```
`○` static · `●` SSG (prerendered from `generateStaticParams`) · `ƒ` server-rendered per request.

**Note:** the build table shows `/account` and `/dashboard` inconsistently in different runs of this same build (ƒ in the compiled route summary but `.next/prerender-manifest.json` confirms `/dashboard` IS statically prerendered and `/account` is NOT — the manifest is the authoritative source used for the crawl universe, see §2).

---

## 2. URL universe

| Source | Count |
|---|---:|
| `.next/prerender-manifest.json` (ground truth: every statically generated path) | **241** |
| Live `/sitemap.xml` | **216** |
| Sitemap URLs NOT in the prerendered set | **0** — every sitemap URL is a real, buildable page |
| Prerendered paths NOT in the sitemap | **25** |
| Extra manually-added dynamic route (`/account`, ƒ, no static params) | **1** |
| **Total crawled** | **242** |

### Prerendered-but-not-in-sitemap (25 routes)

`/agent`, `/agent/calls`, `/agent/campaigns`, `/agent/contacts`, `/agent/leads`, `/agent/settings`, `/dashboard`, `/login`, `/cart` — 9 auth-gated app routes, correctly `Disallow`'d in `robots.txt` (`/agent/`, `/dashboard`, `/login`, `/cart`). Expected.

`/llms.txt`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image.png`, `/twitter-image.png` — 5 meta/asset endpoints. Expected exclusion.

`/ai-front-desk`, `/forge` — legacy pages retired via `next.config.js` 308 redirects (to `/ai-receptionist` and `/` respectively). Still statically built (dead weight in the build, but not indexable — they redirect before ever serving content).

`/products` — 307 redirect page (see §6, this one has a real bug).

**Not expected — flag for review:**
- **`/creators` (hub)** — every individual `/creators/{slug}` page IS in the sitemap, but the **hub page itself is not**. All 5 sibling hubs (`/services`, `/industries`, `/locations`, `/resources`, `/how-to`, `/use-cases`, `/compare`) ARE in the sitemap. `/creators` is the one hub silently missing.
- **`/demo` and its 4 sub-pages** (`/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote`) — a real, marketing-facing interactive demo, not auth-gated, not disallowed by robots.txt, but entirely absent from the sitemap.
- **`/start`** — the AI Builder / monetization entry point (Google login + Stripe per memory) is not in the sitemap.
- **`/tools/form-filler`** — the other 6 tools (`/tools` hub + 5 calculators) are all in the sitemap; only `form-filler` is missing.

---

## 3. Status codes

| Status | Count | Detail |
|---:|---:|---|
| 200 | 232 | |
| 307 | 8 | `/account`→`/login`; `/agent`, `/agent/calls`, `/agent/campaigns`, `/agent/contacts`, `/agent/leads`, `/agent/settings`→`/api/auth/error?error=Configuration` (NextAuth misconfigured for this local build — no `NEXTAUTH`/OAuth env in `.env.local` here; needs re-verification against real Vercel env, not a confirmed prod bug); `/products`→ **no `Location` header at all** (see §6) |
| 308 | 2 | `/ai-front-desk`→`/ai-receptionist`, `/forge`→`/` (working correctly) |

**Sitemap URLs that don't 200: 0.** Every one of the 216 sitemap URLs returns 200 in this build. This overturns any assumption of live sitemap 404s at least on this branch's build artifact.

---

## 4. Titles, descriptions, canonicals, robots

- **227** HTML pages returned 200 (the other 5 of the 232 are `robots.txt`/`sitemap.xml`/`llms.txt`/2 image endpoints — non-HTML).
- **Duplicate titles: 1 group, 3 pages** — `/cart`, `/dashboard`, `/login` all render the root-layout default title *"Handbuilt AI | Custom AI Apps, Agents & Business Automation"* because none of them define page-level metadata. Same 3 pages also share the duplicate meta description and are the only **3 pages missing a canonical tag**. All other 224 HTML pages have unique titles, unique descriptions, and a canonical.
- **Duplicate descriptions:** same group, same 3 pages. No other duplicates found across 227 pages.
- **Duplicate canonical hrefs (different pages pointing to the same canonical URL): 0.**
- **Canonical mismatches (canonical path ≠ own path): 0.**
- **Empty titles / empty descriptions: 0.**
- **`noindex` pages: 0.** `robots_meta` is `index, follow` on all 227 HTML pages; the other 15 crawled responses (10 redirects + 5 meta/asset endpoints) carry no robots meta tag (not applicable to those response types).

---

## 5. H1s, word count, internal links

- **H1 count:** 226 of 227 HTML pages have exactly 1 `<h1>`. **0 pages have 2+.** **1 page has 0**: `/login` — its server-rendered HTML body is essentially empty (0 visible words, 57 KB of page weight is almost entirely JS bundle; the form is client-rendered). Low severity since `/login` is `noindex`-equivalent via `robots.txt` disallow, but worth knowing if it's ever crawled by an AI agent that doesn't respect robots.txt.
- **Word count:** min 0 (`/login`), max 1,890 (`/`), median 420. **41 pages under 300 words** — full list is in the CSV `word_count` column; notable clusters: all 5 `/demo*` pages (111–175w, by design — interactive tools, not long-form), the FAQ-style `/resources/can-ai-*` question pages (9 pages, 238–288w each — thin but intentional Q&A format), 12 `/use-cases/*` pages (224–296w), `/create` (33w), `/cart` (36w), `/tools/form-filler` (42w), plus `/privacy` and `/terms` (282–292w, standard boilerplate length).
- **Internal links:** min 25, median 39, max 70 across all 227 HTML pages. **0 pages have fewer than 3** — global nav + footer guarantee a wide link floor everywhere.

---

## 6. Stale price strings and the `/products` redirect bug

### 6a. Named stale strings still present — 9 URLs

Checked for exactly: `$2,500`, `$7,500+`, `~$1,000`, `$250/mo`, `Book a call`, `Book a 10`.

| URL | Stale string(s) found |
|---|---|
| `/compare/ai-automation-agency-pricing` | `~$1,000` |
| `/compare/ai-automation-vs-virtual-assistant` | `$2,500`, `$250/mo` |
| `/compare/ai-chatbot-vs-ai-receptionist` | `$2,500` |
| `/compare/ai-receptionist-pricing-canada` | `$2,500` |
| `/compare/custom-ai-tool-vs-saas` | `$250/mo` |
| `/resources/ai-receptionist-cost` | `$2,500` |
| `/resources/custom-ai-tool-cost` | `$250/mo` |
| `/resources/what-is-an-ai-receptionist` | `$2,500`, `$7,500+` |
| `/shop` | `$2,500` |

`Book a call` / `Book a 10` — 0 hits (confirms the 2026-08-12 phase0 fix that removed the fake booked-call CTA held).

The full `price_strings` column in the CSV captures every distinct `$…` token per page (100+ distinct raw values site-wide, many from live calculator tool outputs like `$120,960` or `$2,262.86` — not pricing-page prices, just computed example results). Use `price_strings` + `stale_strings_found` together when auditing; don't treat every `$` token as a pricing claim.

### 6b. `/products` — broken redirect, real production-shape defect

`app/products/page.tsx` calls `redirect("/solutions")` inside its Server Component. At build time this got baked as a **static** page (`○ /products`, per the build table) — and the static artifact is broken:

```
.next/server/app/products.meta:
{ "status": 307, "headers": { "x-next-cache-tags": "..." } }   ← no "location" key
```

Live curl confirms it: `HTTP/1.1 307 Temporary Redirect` with **no `Location` header**, and the response body is the `<html id="__next_error__">` shell carrying the *root layout's* default site-wide metadata (title "Handbuilt AI | Custom AI Apps, Agents & Business Automation"), not `/solutions`'s content. Compare with `/ai-front-desk` and `/forge`, which redirect correctly (308 + `Location` header) because those are handled by `next.config.js`'s `redirects()` array (middleware-level), not an in-component `redirect()` call.

**Net effect:** any client hitting `/products` gets a redirect status code with no target — it does not land on `/solutions`. Not in the sitemap and no internal `href="/products"` was found in `app/`, `components/`, or `lib/`, so exposure is limited to old external links/bookmarks, but it is a genuine bug, not a false alarm — fix by moving `/products → /solutions` into `next.config.js` `redirects()` alongside the other retirements, the same pattern that already works for `/ai-front-desk` and `/forge`.

---

## 7. JSON-LD

- **207 pages emit 2 JSON-LD `<script>` blocks; 20 emit 1.** The 20 single-block pages are hub/index/app/legal pages: `/about`, `/cart`, `/compare`, `/create`, `/dashboard`, `/demo`, `/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote`, `/how-to`, `/industries`, `/locations`, `/login`, `/privacy`, `/resources`, `/services`, `/start`, `/terms`, `/tools/form-filler` — these carry only the sitewide Organization+WebSite block and no page-specific Service/FAQ/Breadcrumb schema.
- **`@type` frequency across all blocks:** `ProfessionalService` 228, `Organization` 227, `LocalBusiness` 227, `WebSite` 227, `BreadcrumbList` 204, `FAQPage` 202, `Service` 143, `Article` 45, `HowTo` 38, `SoftwareApplication` 3, `ItemList` 2, `WebApplication` 2, `CollectionPage` 1.
- **Sitewide entity block** (present on all 227 HTML pages, same `@id`): a single object with `"@type": ["Organization","ProfessionalService","LocalBusiness"]`, `@id: https://aibuiltbyhand.com/#organization`, name "Handbuilt AI" — plus a `WebSite` object. This multi-type-on-one-`@id` pattern is valid schema.org and is **not** a duplication bug.
- **Real duplicate found — homepage only.** `/` additionally emits a *second*, distinct `ProfessionalService` entity in its page-specific block: `@id: https://aibuiltbyhand.com/#localbusiness`, **name: "Handbuilt AI Studio"** (a different business name from the sitewide entity's "Handbuilt AI"), alongside three `Service` objects and an `FAQPage`. This is exactly the `228 ProfessionalService` vs `227 Organization/LocalBusiness` discrepancy (228 − 227 = 1, isolated entirely to `/`). Two competing `ProfessionalService` declarations with two different `@id`s and two different names on the same page is a genuine schema conflict worth fixing — pick one canonical business name/`@id` and drop the second block, or merge the `#localbusiness` fields into `#organization`.
- No other page repeats Organization/ProfessionalService/LocalBusiness — every other page correctly references the schema by relying on the single shared sitewide block.

---

## 8. GSC join (46-day window, 2026-06-14→2026-07-29, from `research/gsc-baseline/data/url-performance.csv`)

Per the dataset's own `_README.md`: this is a page-dimension GSC pull, NOT additive to the 3-click/609-impression property total (page-level rows over-count when one SERP shows multiple site URLs). Joined by exact path match; columns used: `current_url`, `clicks`, `impressions`, `avg_position`, `in_gsc_dataset`.

- **81 of the 242 crawled URLs have impressions > 0** in this window (full list in the CSV `gsc_impressions`/`gsc_clicks`/`gsc_position` columns).
- Highest-impression pages: `/ai-receptionist` (146 impr, pos 72.5), `/ai-chatbot-development` (118 impr, pos 68.6), `/resources/best-ai-tools-for-contractors` (66 impr, pos 72.1), `/` (60 impr, pos 15.4, 3 clicks — the only page with any measured clicks in this file), `/resources/is-ai-receptionist-worth-it` (25 impr, pos 42.4).
- A second, narrower query→page join exists at `research/gsc-baseline/data/query-page-map.csv` (only 4 rows, covering the one confirmed cannibalization pair: "custom chatbot development vancouver" ranking both `/ai-chatbot-development` and `/locations/ai-chatbot-developer-vancouver"`). Where present, this real join populates `gsc_top_query` with `gsc_top_query_source = "query-page-map (real)"`.
- Where no real per-page query exists, `gsc_top_query` falls back to `research/keyword-gap-2026-08-12/data/GSC-COVERAGE-JOIN.tsv`'s heuristic "closest matching page" for an orphan query (`gsc_top_query_source = "gap-coverage-join (heuristic, NO-PAGE|WEAK-PAGE)"`). Per that file's own summary, **0 queries have verdict RANKING** — every heuristic match is explicitly a gap, not a confirmed ranking page. Treat those `gsc_top_query` values as candidate targets, not proof of current ranking.

---

## 9. Page-type totals (242 crawled URLs)

| page_type | count |
|---|---:|
| industry | 40 |
| service | 38 |
| use-case | 26 |
| resource | 25 |
| compare | 22 |
| creator | 21 |
| location | 20 |
| app | 11 |
| how-to | 10 |
| other | 9 |
| tool | 7 |
| demo | 5 |
| meta | 5 |
| legal | 2 |
| home | 1 |

---

## Files

- `research/transformation-2026-08-30/02-url-inventory.csv` — 242 rows × 33 columns (status, redirects, title/description/canonical/robots, H1, word count, internal links, JSON-LD, price strings, stale-string flags, GSC join, plus empty `intended_keyword`/`overlapping_pages`/`action` columns for the next research pass).
- `research/transformation-2026-08-30/scripts/crawl.mjs` — the crawler (re-runnable; requires a local `next start` server at `CRAWL_BASE_URL`, default `http://localhost:3200`).
- `research/transformation-2026-08-30/scripts/crawl-raw-output.json` — full structured dump behind the CSV, for any downstream agent that wants the data without re-crawling.
