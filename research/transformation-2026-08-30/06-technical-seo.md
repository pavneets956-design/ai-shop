# 06 — Technical SEO: schema, metadata, sitemap, robots, redirects, IndexNow, llms.txt

**Agent:** A6 · **Date:** 2026-08-30 · **Posture:** READ-ONLY (nothing outside this folder written)
**Audited:** the WORKING TREE at `fix/dead-social-link` HEAD `e732d98` (36 commits ahead of production).
**Production reference:** `origin/main` `3031d36` (2026-07-15). Every "live" number below was fetched with `curl` on 2026-08-30 and is labelled PROD. Nothing was built or started. No browser tools used.
**Prior work read and cited:** `research/keyword-gap-2026-08-12/11-technical-seo-audit.md`, `R3-technical-seo-verification.md`, `17-local-seo-entity.md`, `12-aeo-geo-strategy.md`, `drafts/localbusiness-schema.json`.
**Scratch evidence:** `…/scratchpad/live/*.html` (11 PROD pages), `parse.js`, `final-checks2.js`, `sitemap-eval.ts` (evaluates `app/sitemap.ts` via `tsx` without building the app).

---

## Read this first — five things the prior audits got wrong or that changed

| # | Claim on record | Reality today | Evidence |
|---|---|---|---|
| 1 | `11-technical-seo-audit.md` fix #5: og:image missing on **203/237** routes | **PROD has og:image on 0 of 11 pages fetched and `/opengraph-image.png` returns 404.** The file does not exist on `origin/main`. The working tree fixes both (`lib/seo.ts:20-25`, `app/opengraph-image.png` added in `d49493b`) — but nothing is deployed. | `git ls-tree origin/main app/` → no `opengraph-image*`; `curl -w %{http_code} https://aibuiltbyhand.com/opengraph-image.png` → **404** `text/html`; `parse.js` → `og:image: (none)` on `/`, `/pricing`, `/shop`, `/solutions`, 5 templates, 1 tool |
| 2 | Footer `/services/ai-review-engine` "404 on 2026-08-05" (task brief) | **Not a 404 — on PROD or in the tree.** The slug exists in the service registry and the page serves a `Service` + `FAQPage` + `BreadcrumbList`. | `lib/data/_services_b.ts:429` `"slug": "ai-review-engine"`; `components/Footer.tsx:125`; PROD `curl` → **200**, canonical `https://aibuiltbyhand.com/services/ai-review-engine` |
| 3 | `R3 §3`: `/products` → 307 → `/solutions` (measured on `next start`) | **On PROD `/products` is a 307 with NO `Location` header** — a redirect that goes nowhere. Body is 25,682 bytes of layout HTML titled "Handbuilt AI \| Custom AI Apps…"; the string `/solutions` does not appear in it. `/products/1` does carry `Location: /solutions`. Code is unchanged in the tree (`app/products/page.tsx:5` `redirect("/solutions")`), so it will ship again. | `curl -sI https://aibuiltbyhand.com/products` → `HTTP/1.1 307 Temporary Redirect`, header set = Accept-Ranges…X-Vercel-Id, **no Location**; `curl -w '%{redirect_url}'` → empty |
| 4 | `12-aeo-geo-strategy.md §2`: live `llms.txt` publishes "$2,500–5,000 CAD" | **Still true on PROD today** (line 32). Fixed in the tree: `lib/data/money.ts:281` now reads "$3,500–$7,500 CAD" and the pricing block is generated from `packages.ts` (`app/llms.txt/route.ts:41-47`). Deploy-blocked. | PROD `llms.txt` L32: `…one system. $2,500–5,000 CAD. The flagship…`; PROD L8-11 (`## Pricing (CAD)`) already correct |
| 5 | `R3 §2 P1`: `/solutions` shows $1,000/$2,500/$7,500 | **Fixed in the tree.** `lib/data/solutions.ts` `startsAt` values are now 1500/3500/10000 (diff vs `origin/main`: 16 lines). PROD visible-markup check was inconclusive (prices are client-rendered — 0 `$` figures in stripped HTML), so R3's measurement stands for PROD. | `grep -n startsAt lib/data/solutions.ts` → 1500 ×4, 3500 ×3, 10000 ×1; `git diff --stat origin/main..HEAD -- lib/data/solutions.ts` |

---

## 1. Structured data

### 1.1 Every JSON-LD emitter in the working tree

`components/JsonLd.tsx:2-9` is the only renderer: one `<script type="application/ld+json">` per call, `JSON.stringify(data)` with **no `<` escaping** (hygiene item, §Defects #19). Every emitter below calls it.

| # | Emitter (file:line) | Routes | @types emitted | Identity / money fields |
|---|---|---|---|---|
| E1 | `app/layout.tsx:119` → `organizationSchema()` `lib/seo.ts:28-69` + `websiteSchema()` `:71-80` | **all 237 routes incl. `/_not-found` and the 10 app screens** | `["Organization","ProfessionalService","LocalBusiness"]` `@id #organization`; `WebSite` `@id #website` (publisher → `#organization`) | name `Handbuilt AI` (`site.ts:3`); description `:34-35` ("custom AI apps, agents, chatbots, automations, dashboards…"); url; **email `pavneets956@gmail.com`** (`site.ts:11`); image+logo `/logo.png` (512×512, PROD 200); priceRange `"$$"`; **areaServed = 6 `AdministrativeArea` from `site.serviceArea` (`site.ts:14`) — includes `"Canada"` and `"Remote / Worldwide"` typed as AdministrativeArea — plus 4 `Country` (US, AU, NZ, UK)**; address `Surrey / BC / CA` (no street, no postal — correct for a SAB); knowsAbout ×8 (generic "AI automation" nouns); **sameAs `["https://github.com/pavneets956-design/ai-shop"]`** (`:67`, the `"#"` entries for twitter/instagram/linkedin at `site.ts:20-22` are filtered out — no `"#"` reaches the markup). **No telephone, no geo, no legalName, no founder, no openingHours.** |
| E2 | `app/page.tsx:83-126,131` | `/` | `Service` ×3 (`serviceSchema()`), **`ProfessionalService` `@id #localbusiness`**, `FAQPage` (6 Q from `lib/data/homeFaqs.ts`) | The second identity node: name **`Handbuilt AI Studio`** (`site.legalName`), alternateName `Handbuilt AI`, email gmail, description "Done-for-you AI receptionist…in BC", areaServed `City Surrey`, `City Delta`, `AdministrativeArea British Columbia`, `Country Canada`; address **region-only** (`BC/CA`, no locality); priceRange **`"$99–$10,000+ CAD"`**; knowsAbout ×5 (receptionist nouns); `makesOffer` ×4 with **hand-typed string prices** `"1500","1500","3500","10000"` (`:113-116`) — currently equal to `packages.ts` but not derived from it. |
| E3 | `app/pricing/page.tsx:26` | `/pricing` | `Service` ×3 + `Service` "Care Plan" (`carePlanOffer()` `lib/seo.ts:107-126`, `UnitPriceSpecification` 99 CAD/MONTH) + `FAQPage` (6 Q, `lib/data/faqs.ts:78`) | Prices from `packages.ts` by construction (1500 / 3500 / 10000 / 99). FAQ answers hand-type the same prices (`faqs.ts:43,48`). |
| E4 | `app/solutions/page.tsx:23` | `/solutions` | `Service` ×3 | 1500/3500/10000, and the visible cards now agree (`solutions.ts`). |
| E5 | `app/shop/page.tsx:24` → `shopSchema()` `lib/seo.ts:157-220` | `/shop` | `BreadcrumbList` + `ItemList` (10 `Service` items each with one `Offer`) | Productized line, separate prices by owner decision. **Defect (R3, unchanged):** `lib/seo.ts:175-188` — when `monthlyPrice` exists the setup fee is dropped: "AI Lead Capture & Follow-Up" visible `From $2,500 + $99/mo` → `Offer.price 99`; "AI Review Engine" `$1,000 + $49/mo` → `price 49` (`shopProducts.ts:115-117,182-184`). |
| E6 | `components/LandingTemplate.tsx:49` → `landingSchema()` `lib/seo.ts:225-282` | **169 landing pages** (money 12 · service 25 · industry 39 · creators 20 · location 19 · resource 24 · howto 9 · compare 21 — counts from `sitemap-eval.ts`) | `Service` (`Offer` at `pkg.price` when `packageId`) **or** `HowTo` **or** `Article` (author+publisher → `#organization`), then `FAQPage` if `content.faqs.length`, then `BreadcrumbList` | `Service.areaServed: "Worldwide"` on **all**, including the 19 `/locations/*` pages (PROD Surrey page: `areaServed="Worldwide"`, `offers.price=1500`). `serviceType` = `shortName ?? h1` — on `/services/ai-review-engine` the `Service.name` is literally the question H1 "How do I get more Google reviews without chasing customers?" (PROD). |
| E7 | `app/use-cases/[slug]/page.tsx:53-91` | 25 `/use-cases/*` | `Service` (+`Offer` `pkg.price`) + `HowTo` + `FAQPage` + `BreadcrumbList` | Same shape as E6, hand-rolled in the page instead of `landingSchema`. |
| E8 | `app/use-cases/page.tsx:21` | `/use-cases` | `BreadcrumbList` | — |
| E9 | `app/faq/page.tsx:28-36` | `/faq` | `FAQPage` (all `faqs`) + `BreadcrumbList` | — |
| E10 | `app/tools/page.tsx:21` → `toolsHubJsonLd()` `lib/data/freeTools.ts:690-709` | `/tools` | `CollectionPage` (+`hasPart` ×5) + `BreadcrumbList` | — |
| E11 | `components/tools/ToolShell.tsx:49` → `toolJsonLd()` `freeTools.ts:654-688` | 5 `/tools/*` calculators | `SoftwareApplication`/`WebApplication` (`price 0`, `isAccessibleForFree`, provider → `#organization`) + `HowTo` + `FAQPage` + `BreadcrumbList` | Clean; free-tool pattern. FAQ rendered with `<details>` (`ToolShell.tsx:139`) so answers ARE in the HTML (PROD: 4/4). |
| E12 | `app/creators/page.tsx:15-39` | `/creators` | `ItemList` (20) + hand-built `BreadcrumbList` | — |
| E13 | `app/ai-front-desk/page.tsx:83-90` | `/ai-front-desk` — **a 308-redirected route** (`next.config.js:48`) that is still built with `canonical /ai-front-desk` + `robots index` (`:34-35`) | custom `frontDeskSchema()` + `FAQPage` + `BreadcrumbList` | Dead weight; never served. |
| — | **No JSON-LD at all** | `/about`, `/create`, `/demo` (+4), `/start`, `/services`, `/industries`, `/locations`, `/resources`, `/compare`, `/how-to` hubs, `/tools/form-filler`, `/privacy`, `/terms`, `/account`, `/login`, `/cart`, `/dashboard`, `/agent/*`, `/products`, `/v2` | (E1 still fires on all of them) | `/about` has no `Person`/`AboutPage`; the founder exists nowhere in schema. |

### 1.2 Duplicate identity nodes

- **Two Organization-class nodes on the homepage** with different `@id`s, **different names** (`Handbuilt AI` vs `Handbuilt AI Studio`), **different `priceRange`** (`$$` vs `$99–$10,000+ CAD`), **different `areaServed`** (10 areas incl. four foreign countries vs Surrey/Delta/BC/Canada) and **different address granularity** (locality vs region-only). PROD confirms both blocks ship together (`parse.js`: block1 `#organization` "Handbuilt AI", block2 `#localbusiness` "Handbuilt AI Studio"). Nothing links `#localbusiness` to `#organization` (no `parentOrganization`/`sameAs`).
- **`#organization` is emitted on every route** via the root layout (E1), so every landing page carries an identity node plus its own `Service`/`Article` node. That is the intended pattern (page entity + provider reference) — the problem is only the second identity node on `/`.
- **`Service` provider references are consistent** — every `provider`/`author`/`publisher` points at `#organization` (E5, E6, E7, E11). Good; keep.
- A third identity was proposed but never wired: `research/keyword-gap-2026-08-12/drafts/localbusiness-schema.json` (placeholders intact — correctly not shipped).

### 1.3 Flags requested by the brief

| Flag | Result | Evidence |
|---|---|---|
| Personal Gmail in schema | **YES** — `pavneets956@gmail.com` on all 237 routes (E1) and again on `/` (E2) | `lib/data/site.ts:11`; PROD `email=pavneets956@gmail.com` on 11/11 pages |
| `"#"` in `sameAs` | **No** — filtered at `lib/seo.ts:67`; `Footer.tsx:70-78` also guards `!== "#"` | PROD `sameAs=["https://github.com/pavneets956-design/ai-shop"]` |
| Offer price contradicting `packages.ts` (Starter 1500 · Business 3500–7500 · Custom 10000 · Care 99/mo) | **Working tree: none.** `landingSchema`, `serviceSchema`, `carePlanOffer`, use-case `Offer`, `solutions.ts` all resolve to `packages.ts`. Two hand-typed copies that currently match but can drift: `app/page.tsx:113-116` (`makesOffer` strings), `lib/data/faqs.ts:43,48`. **PROD: `llms.txt` L32 "$2,500–5,000"** (stale `money.ts` on main). Shop hybrid `Offer.price` understates by the setup fee (E5). | see rows |
| `AggregateRating` / `Review` | **None anywhere** | `Grep AggregateRating\|reviewRating\|ratingValue` over `app/`, `components/`, `lib/` → 0 hits |
| `FAQPage` whose Q/A text is not visibly on the page | **YES, on ~200 routes.** `components/FAQSection.tsx:29-41` renders the answer only when `isOpen` (`{isOpen && (<motion.div>…)}`) with `useState(0)`, so exactly one answer per accordion is in the HTML. Used by `LandingTemplate.tsx:300` (169 pages), `use-cases/[slug]/page.tsx` (25), `app/pricing/page.tsx:80`, `app/faq/page.tsx:66` (4 groups → 4 of 13 answers). Compliant exceptions: `/tools/*` (`<details>`, `ToolShell.tsx:139`) and the rebuilt homepage `components/marketing/Interactive.tsx:179` (`hidden={!isOpen}` — text stays in the DOM). | PROD (`final-checks2.js`, scripts stripped): `/pricing` Q 6/6 A **1/6**; Surrey location Q 5/5 A **1/5**; `/ai-receptionist-for-contractors` Q 8/8 A **2/8**; plumber Q 2/2 A 1/2; compare Q 3/3 A 1/3; review-engine Q 3/3 A 1/3; **`/tools/missed-call…` A 4/4**; PROD `/` (old homepage) A 6/6 |

### 1.4 JSON-LD validity — PROD, parsed with `JSON.parse` (node)

11 pages × 2 blocks = **22 blocks, 22 PARSE_OK, 0 failures**: `/`, `/ai-receptionist-for-contractors` (money), `/services/ai-review-engine` (service), `/industries/plumber-ai-automation` (industry), `/locations/ai-receptionist-surrey-bc` (location), `/compare/custom-ai-tool-vs-saas` (compare), `/tools/missed-call-revenue-calculator` (tool), `/pricing`, `/shop`, `/solutions`, plus the 404 page (which still emits E1 — a `LocalBusiness` node on a `noindex` 404 is harmless but pointless). Matches R3's 444/444 on the branch build.

---

## 2. Metadata

### 2.1 How it is generated

- **Root** `app/layout.tsx:35-108`: `metadataBase = site.url`; title `default` + template `"%s | Handbuilt AI"`; description; keywords; `authors/creator = "Pavneet"`; `openGraph { type website, locale en_CA, alternateLocale ×4, url: site.url, siteName, title, description }` — **no `images`**; `twitter { card summary_large_image, title, description }` — no images; `robots index/follow`; icons; Google verification token. **No `alternates.canonical`** (removed `fa08ed3`, comment at `:59-69`).
- **Landing pages** `lib/seo.ts:287-309` `landingMetadata()`: `title = h1` (templated), `description`, `keywords`, `alternates.canonical = path` (relative → absolute via `metadataBase`), `openGraph { title: content.title, description, url, type "article", images [DEFAULT_OG_IMAGE] }`, `twitter { card, title, description, images }`. Called from the 8 `[slug]` templates and the 12 money-page files.
- **Free tools** `lib/data/freeTools.ts:607-651` `toolMetadata()/toolsHubMetadata()` — same shape, `type "website"`.
- **Use cases** `app/use-cases/[slug]/page.tsx:22-43` — same shape, hand-rolled.
- **Homepage** `app/page.tsx:35-76` — absolute title, own canonical `/`, explicit `openGraph.images` and `twitter.images` (relative `/opengraph-image.png`, `/twitter-image.png`).
- **24 static pages declare `metadata` with a canonical but no `openGraph`** (list from `grep`): about, account, compare, create, creators, demo ×5, faq, how-to, industries, locations, pricing, privacy, resources, services, shop, solutions, start, terms, tools/form-filler, use-cases. They inherit the layout's `openGraph` **including `url: site.url`** — so **`og:url` on every one of them is the homepage**. PROD confirms: `/pricing`, `/shop`, `/solutions` all emit `og:url https://aibuiltbyhand.com`. (They do get og:image on the branch via the `app/opengraph-image.png` file convention, which only auto-attaches to routes that don't override `openGraph` — that is why `landingMetadata` needed `DEFAULT_OG_IMAGE`.)
- **Two routes declare `openGraph` without images**: `app/ai-front-desk/page.tsx:36-42` and `app/forge/page.tsx:18-22` — both 308-redirected, so R3's "235/237" is the ceiling.

### 2.2 Uniqueness, canonicals, robots

- Titles/descriptions are per-entry fields (`LandingContent.title/description`, `landing.ts:44-47`); R3 measured **0 duplicate titles among the 216 sitemap URLs, 32 titles > 65 chars**. Not re-measured here (no build).
- Self-referencing canonical on every content route (R3: 226/226). **11 routes emit no canonical**: `/login`, `/cart`, `/dashboard`, `/agent` ×6, `/products`, `/_not-found`. Of those only `/account` (`app/account/page.tsx:15`) and `/_not-found` carry `noindex`; the rest inherit `index, follow` from `layout.tsx:86`. On PROD `/login`, `/dashboard`, `/cart` are **200**, `index, follow`, no canonical, and protected only by `robots.txt` Disallow.
- **Trailing slash**: `next.config.js` does not set `trailingSlash` → Next default (`false`). PROD `/pricing/` → **308** → `/pricing`. Correct.
- **Query strings**: PROD `/pricing?utm_source=x` → 200 with canonical `https://aibuiltbyhand.com/pricing` (self-canonical absorbs parameters). `/create?package=starter` (the package CTAs, `packages.ts:37,58,75`) canonicalises to `/create` (`app/create/page.tsx:11`). Correct.
- **twitter:card**: `summary_large_image` sitewide from the layout — PROD 11/11.

### 2.3 The og:image file

- `app/opengraph-image.png` — **1200×630, 35,055 bytes, PNG**; `app/twitter-image.png` is a byte-identical copy (same md5 `4fd004a6…`). Alt text in `app/opengraph-image.alt.txt` = the `DEFAULT_OG_IMAGE.alt` string (`lib/seo.ts:24`).
- **It is real branded artwork, not a placeholder** (viewed): off-white card, red accent bar + "HANDBUILT AI" wordmark top-left, headline "AI that works for your business.", sub-line "Built by hand, not bought off a shelf.", footer "aibuiltbyhand.com" / "Surrey, BC — Done-for-you AI receptionist & automation". Text-only, no photo, no product screenshot. Adequate as a sitewide default; A5 owns whether it should carry the founder/product.
- **PROD: 404.** Not on `origin/main`. Every social share of the live site today has no card image.
- Two URL forms will coexist after deploy (R3 P3.5): `DEFAULT_OG_IMAGE.url` is the un-hashed `${site.url}/opengraph-image.png` (`lib/seo.ts:21`) while the file convention emits `/opengraph-image.png?<hash>` on routes without their own `openGraph`. Both resolve; the un-hashed one has no cache-buster.

---

## 3. Sitemap

### 3.1 What `app/sitemap.ts` does (working tree)

- 17 hand-listed static routes (`:25-43`) + 5 free tools from `freeToolsByOrder` (`:46-50`) + `allLandingEntries()` (`lib/data/registry.ts:43-66`: 8 landing groups + 25 use-cases) = **216 entries, 0 duplicates, 0 `lastModified`** (`sitemap-eval.ts`, evaluated with `tsx`). Same count as PROD (216 `<loc>`).
- `changeFrequency`/`priority` set on every entry; Google ignores both. Harmless.
- **`lastmod` deliberately omitted** with a correct rationale comment (`:6-22`). **PROD still ships 216 × `<lastmod>2026-07-16T05:19:47.431Z`** (verified today) because the fix is undeployed.

### 3.2 Inclusion / exclusion gaps

- **Missing, indexable, linked, 200 on PROD:** `/creators` (ranks pos 8.0 per GSC), `/demo` (pos 3.7), `/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote`, `/start`, `/tools/form-filler` (orphan — not linked from `/tools` either, R3). Eight routes, unchanged since R3.
- **Could a redirected / removed / noindex route enter?** Today **no redirect source is in the sitemap** (`sitemap-eval.ts` cross-check against all 27 `next.config.js` sources → `[]`). But nothing *prevents* it: `LandingContent` (`lib/data/landing.ts:38-72`) has **no `noindex`/`draft`/`redirectTo` field**, `allLandingEntries()` has no filter, and there is no test. The moment a slug is retired via a redirect but left in its data file, it is in the sitemap as a 308 source. The out-of-province noindex recommendation in `17-local-seo-entity.md` has no sitemap counterpart.
- **Parallel URL lists that already drift:** `app/api/indexnow/route.ts:27-37` hand-types **9** static paths (missing `/tools`, the 5 tools, `/shop`, `/faq`, `/about`, `/create`, `/locations`, `/privacy`, `/terms`); `app/llms.txt/route.ts:58-81` hand-types its own "Key pages". Three lists, one truth.

### 3.3 Design: real per-page `lastmod`

**Rule:** a date is emitted only when it is *known*; never `new Date()`; never a build timestamp.

1. **Optional field on every registry type** — `LandingContent.updatedAt?: string` (`YYYY-MM-DD`, `lib/data/landing.ts`), `ToolRegistryEntry.updatedAt?`, and an `updatedAt` on the static-route table in `app/sitemap.ts`. Authors set it when they change copy. `git log` shows the data files already carry distinct real dates (money/services/industries/howto/freeTools 2026-08-12; resources 2026-07-31; locations/compare/creators/useCases 2026-07-06), so the first pass can be seeded truthfully from history.
2. **Git-derived fallback, generated and committed** — `scripts/gen-lastmod.mjs` runs `git log -1 --format=%cs -- <file>` for each registry file (and each static `app/**/page.tsx`) and writes `lib/data/lastmod.generated.json` (`{ "lib/data/locations.ts": "2026-07-06", … }`). Commit the JSON; run the script from a `pre-commit` hook or as a manual step before release. **Do not** compute it inside `next build` on Vercel — whether the build clone carries enough history is UNKNOWN from here, and a shallow clone would silently produce today's date for everything (the exact failure being removed).
3. **Resolution order in `app/sitemap.ts`:** `entry.updatedAt` → `lastmod.generated.json[sourceFile]` → *omit the field*. Granularity is per data file for the fallback (all 19 locations share one date) — honest, if coarse; per-entry `updatedAt` refines it.
4. **Mirror into `WebPage.dateModified`** (§8) so schema and sitemap never disagree.

### 3.4 Automated sitemap test spec (`tests/sitemap.test.ts`, vitest, node env — same harness as `tests/build-request.test.ts`)

| Assertion | How |
|---|---|
| Entry count equals the indexable route set | Glob `app/**/page.tsx`, expand `[slug]` via each registry, subtract a declared `NON_INDEXABLE` list (`/login`, `/cart`, `/dashboard`, `/agent/**`, `/account`, `/products/**`, `/ai-front-desk`, `/forge`, `/_not-found`) — set equality, both directions |
| No duplicates; every URL absolute, starts with `site.url`, no trailing slash, no query, no fragment | string checks |
| No entry is a redirect source | `import nextConfig from "../next.config.js"`, `await nextConfig.redirects()`, compare `source` paths (static sources only) |
| No entry is `noindex` | each registry entry with `noindex: true` (new field) must be absent |
| `lastModified` sane | if present: parseable, `<= now`, `>= 2026-06-14` (domain purchase); **not all identical** when ≥2 present |
| Three lists agree | IndexNow `urlList` ⊆ sitemap URLs; every `llms.txt` link ⊆ sitemap URLs (parse the `GET()` output) |
| Schema/price consistency (sibling test `tests/schema.test.ts`) | render `organizationSchema()`, `serviceSchema()`, `landingSchema()` for every entry, `shopSchema()`, `toolJsonLd()`: exactly one Organization-class node per page (counting the layout node); every `Offer.price` ∈ `{packages[].price, carePlan.monthly, shopProducts[].setupPrice/monthlyPrice}`; no `sameAs` equals `"#"` or 404s (offline: regex only); `email` endsWith `@aibuiltbyhand.com` once that is owner-approved |

---

## 4. Robots

`app/robots.ts:7`: `disallow = ["/api/", "/agent/", "/dashboard", "/login", "/cart"]`, replicated under `*` + 10 named AI agents (`:11-22`), `sitemap`, non-standard `host`. **PROD `robots.txt` is byte-for-byte the same policy** (fetched). `12-aeo-geo-strategy.md §1` verdict stands: nothing that matters is blocked.

Missing / stale:

| Path | Today | Recommendation |
|---|---|---|
| `/account` | PROD 307 → `/login` when signed out; has `noindex` meta (`app/account/page.tsx:15`) | add to Disallow for symmetry with `/login` (low) |
| `/products`, `/products/*` | not disallowed; PROD `/products` = **307 with no Location**, `index,follow`, no canonical | fix the redirect (§5) and disallow the prefix |
| `/v2` | **PROD 200**, `<title>Bundled Page</title>`, no canonical, no robots meta — the stray `public/v2/index.html` (610 KB) flagged in `11-technical-seo-audit.md §6` is live and crawlable | delete the file or redirect `/v2` → `/` in `next.config.js`; disallow meanwhile |
| `/demo/*`, `/start`, `/tools/form-filler` | allowed — **keep allowed** (`/demo` ranks pos 3.7) | add to sitemap instead |
| `Claude-Web` | stale UA name; `Claude-User`, `Claude-SearchBot`, `CCBot`, `anthropic-ai`, `meta-externalagent` unnamed (all fall through to `*` Allow) | cosmetic rename; no access change |
| `X-Robots-Tag` | none (`next.config.js:27-33` headers list) | not needed if meta `robots` is set on the app segments |

**The real robots defect is structural, not a missing line:** `/login`, `/cart`, `/dashboard` say `index, follow` (layout default) and have no canonical, while `Disallow` stops Google from ever reading a `noindex` on them. Either (a) add `robots: { index: false, follow: false }` metadata via a `layout.tsx` in each of those segments **and remove them from Disallow** so the directive is readable, or (b) accept URL-only indexing risk. (a) is correct; keep `/api/` and `/agent/` disallowed (auth-gated 307 anyway).

---

## 5. Redirects

### 5.1 Redirect map — `next.config.js` (27 entries, all `permanent: true` → **308**)

| # | From | To | Line | PROD check (2026-08-30) |
|---|---|---|---|---|
| 1 | `/quiet-hours` | `/ai-receptionist` | 47 | 308 → ✔ |
| 2 | `/ai-front-desk` | `/ai-receptionist` | 48 | 308 → ✔ (source still built with self-canonical + JSON-LD, E13) |
| 3 | `/forge` | `/` | 49 | 308 → ✔ (source still built, `app/forge/page.tsx:17`) |
| 4 | `/tools/pro` | `/pricing` | 56 | 308 → ✔ |
| 5–13 | `/tools/{proposal-generator, quote-estimate-generator, review-reply-generator, business-brief-generator, invoice-reminder-generator, quote-builder, sop-builder, hiring-assistant, customer-reactivation}` | `/shop` | 57–65 | `/tools/review-reply-generator` 308 → `/shop` ✔ |
| 14 | `/ai-quote-generator` | `/services/ai-quote-generator` | 71 | 308 → ✔ |
| 15 | `/ai-workflow-automation` | `/services/ai-workflow-automation` | 72 | not fetched |
| 16 | `/ai-crm-automation` | `/services/ai-crm-automation` | 73 | not fetched |
| 17 | `/ai-invoice-reminder-system` | `/services/ai-invoice-reminder-system` | 74 | not fetched |
| 18 | `/ai-email-automation` | `/services/ai-email-automation` | 75 | not fetched |
| 19 | `/ai-booking-assistant` | `/services/ai-calendar-booking-agent` | 76 | not fetched |
| 20 | `/ai-customer-support-bot` | `/services/ai-customer-support-agent` | 77 | not fetched |
| 21 | `/ai-voice-agent-for-business` | `/services/ai-voice-agent` | 78 | not fetched |
| 22 | `/custom-ai-app-development-canada` | `/custom-ai-app-development` | 79 | 308 → ✔ |
| 23 | `/resources/how-to-automate-quote-requests` | `/how-to/automate-quote-requests` | 81 | 308 → ✔ |
| 24 | `/resources/how-to-automate-invoice-reminders` | `/how-to/automate-invoice-reminders` | 82 | not fetched |
| 25 | `/resources/best-ai-tools-for-small-business-canada` | `/resources/best-ai-tools-for-small-business` | 83 | not fetched |
| 26 | `/resources/ai-automation-examples-small-business` | `/resources/ai-automation-examples-for-small-business` | 84 | not fetched |
| 27 | `/compare/custom-ai-app-vs-saas-tool` | `/compare/custom-ai-tool-vs-saas` | 86 | 308 → ✔ |

Redirects that live **outside** `next.config.js` (these bring the count to the brief's "29"+):

| From | To | Mechanism | Status | Note |
|---|---|---|---|---|
| `/:path+/` | `/:path+` | Next trailing-slash normaliser | 308 | PROD `/pricing/` ✔ |
| `/products` | `/solutions` | `app/products/page.tsx:5` `redirect()` | **PROD 307, no `Location`** | broken on PROD; see §Read-this-first #3 |
| `/products/[id]` | `/solutions` | `app/products/[id]/page.tsx:5` | PROD 307 → `/solutions` ✔ | 307 = temporary; should be 308 |
| `/account` (signed out) | `/login` | `app/account/page.tsx:24` | 307 | correct (auth) |
| `/agent/*` (signed out) | `/api/auth/signin?callbackUrl=…` | `middleware.ts:3-7` | 307 | correct (auth) |
| `http://aibuiltbyhand.com/` | `https://aibuiltbyhand.com/` | Vercel | **308** ✔ | HSTS `max-age=63072000; includeSubDomains; preload` on apex |
| `https://www.aibuiltbyhand.com/` | `https://aibuiltbyhand.com/` | Vercel domain redirect | **307** | Vercel's default for a domain-level redirect. **Should be 308** for a permanent host canonicalisation — this is a Vercel dashboard setting (Project → Domains → www → redirect status), not code; a `next.config.js` `has: host` rule never runs because the edge redirect fires first. I cannot change or verify the dashboard from here. |
| `http://www.aibuiltbyhand.com/` | `https://www…` → `https://aibuiltbyhand.com/` | Vercel | 308 then 307 = **2-hop chain** | resolves with the dashboard change above |

**Chains / loops / redirect-to-404 among the 27:** none (R3 verified every destination is a built 200 route; `sitemap-eval.ts` confirms no destination-vs-source overlap; 9 spot-checked live today).

### 5.2 Internal links that still point at redirect sources (working tree)

| Link | Where | Rendered? |
|---|---|---|
| `/tools/review-reply-generator` | `lib/data/_services_b.ts:466` (related link on `/services/ai-review-engine`); `lib/data/shopProducts.ts:189` `demoHref` | yes — `app/shop/page.tsx:207-208` renders `demoHref` as a "btn-secondary" `<Link>` |
| `/tools/customer-reactivation` | `lib/data/_services_b.ts:524`; `lib/data/shopProducts.ts:211` `demoHref` | yes (same) |
| `/tools/pro` | `components/ToolGenerator.tsx:38` (default `upgradeHref`) — mounted by `app/demo/nudge/page.tsx`, `app/demo/quote/page.tsx`; `components/ProCheckout.tsx:46` via `ToolPaywall.tsx`; `components/home/LiveAIHome.tsx:357,389` (LiveAIHome is imported by nothing — dead) | demo pages: yes |
| `/ai-front-desk` | `components/home/stage/HandStage.tsx:98` ← `components/home/HomepageNew.tsx` (not the live homepage) | dormant |
| `/services/ai-review-engine` (Footer.tsx:125) | **not a redirect and not a 404** — valid slug `_services_b.ts:429` | — |

### 5.3 www / http

Covered above: http→https 308 ✔; www→apex **307** (dashboard-owned; recommend 308); `http://www` is a two-hop chain until then.

---

## 6. IndexNow

- Key file: `public/ac88d1565466f5394f041d46f2546ce7.txt` contains the key; equals `site.indexNowKey` (`lib/data/site.ts:18`); **PROD 200** with the key as body. ✔
- Endpoint `app/api/indexnow/route.ts`: `GET ?secret=` gated by `INDEXNOW_PING_SECRET` (`:14-24`), posts `host/key/keyLocation/urlList` to `api.indexnow.org` (`:43-54`), returns `{ok,status,submitted}`.
- **PROD: non-functional.** `GET /api/indexnow` (with or without a secret) → **HTTP 500 `{"ok":false,"error":"INDEXNOW_PING_SECRET not configured"}`**. That is the code path at `:16-21`, so the Production env var is unset — established from the live response, not a dashboard scan. Nothing has ever been pinged from production.
- `urlList` is the hand-typed 9-path list + `allLandingEntries()` (`:27-41`): omits `/tools` and the 5 tool pages, `/shop`, `/faq`, `/about`, `/create`, `/locations`. Should import the sitemap function.
- Not wired to any deploy hook or cron (comment at `:8-9` says "call manually"). No `vercel.json`, no `.github/workflows`.
- A 500 on an unauthenticated GET is also a NO-SILENT-STATES miss on the backend side: an unset secret should log and return a 503 with a clear message, not a generic 500.

---

## 7. `llms.txt`

`app/llms.txt/route.ts` (`force-static`). Working-tree content vs `packages.ts`:

| Section | Source | Accuracy |
|---|---|---|
| Identity block (`:14-23`) | `site.ts` + hand-typed paragraph | "one-person AI studio… Surrey/Delta" ✔. **Hand-typed FX rate "roughly 0.72–0.75 USD at time of writing" (`:21`) will rot** — remove or date it. |
| "Two product lines" (`:28-38`) | hand-typed, careful ("no self-serve checkout") | ✔ — good machine-facing disambiguation |
| Custom build pricing (`:41-47`) | `packages` + `carePlan` | From $1,500 · $3,500–$7,500 · From $10,000 · $99/mo ✔ (by construction) |
| Shop tools (`:50-55`) | `shopProducts.priceLabel` | ✔ matches `/shop` cards |
| Key pages (`:58-64`) | hand-typed | omits `/ai-receptionist-for-contractors` (the nav's lead item, 38% of impressions), `/about`, `/demo` |
| Free tools (`:67-70`) | `freeToolsByOrder` | ✔ |
| Every landing group (`:73-81`) | `landingGroups` → 194 links | **still the link dump** `12-aeo-geo-strategy.md §2` criticised; no `## Optional` split; equal weight to 39 trade pages and the receptionist offer |
| Contact | — | **no email/phone line at all**; the only contact is buried in `site.tagline` prose |

**PROD**: 210 lines; pricing block correct (L8-11); **L32 `/ai-business-system` description "$2,500–5,000 CAD"** — the only machine-readable contradiction on the live site, fixed in the tree via `money.ts:281`. A curated rewrite already exists at `research/keyword-gap-2026-08-12/drafts/llms.txt` (unreviewed by me; facts sourced from `packages.ts`/`site.ts` per its header).

---

## 8. Proposed unified identity block

**Principles:** one Organization-class node sitewide with a stable `@id`; every page references it, never re-declares it; one `WebSite`; one `WebPage` per route; one `Person` for the founder; `Service`/`Offer` nodes derived from `packages.ts`; `FAQPage` only where the answers are in the HTML; **no field without a verified value** — no phone, no street, no coordinates, no hours, no ratings.

**Verified values available today** (source in brackets): name `Handbuilt AI` [`site.ts:3`]; legalName `Handbuilt AI Studio` [`site.ts:4`; task brief]; url; logo `/logo.png` 512×512 [PROD 200]; default image `/opengraph-image.png` 1200×630 [tree]; address locality `Surrey`, region `BC`, country `CA` [`site.ts:12-13`; visible: `Footer.tsx:58` "Based in Surrey, BC.", `HomeSections.tsx:338` "Based in Surrey."]; founder given name `Pavneet` [`site.ts:10`], full name `Pavneet Singh` [task brief — confirm the public form with owner]; founder GitHub profile `https://github.com/pavneets956-design` [PROD 200 today]; service-area copy `Surrey · Delta · Langley · White Rock · Burnaby · New Westminster · Coquitlam · Richmond · Abbotsford` [`Footer.tsx:30`]; brief-permitted `areaServed`: Surrey, Delta, Vancouver, Fraser Valley, British Columbia; prices [`packages.ts:26,43-44,64,88`].

**Not available — omit, do not invent:** `telephone` (none on site), `streetAddress`/`postalCode`, `geo`, `openingHours`, LinkedIn/any social (`site.ts:20-22` are `"#"`), any rating/review, a domain email (**`00-PLAN.md` blocker #2: the domain has no MX/SPF — `build@aibuiltbyhand.com` must not be published until mail is set up**; until then the choice is the existing Gmail or no `email` field — owner call).

```jsonc
// lib/seo.ts — emitted ONCE in app/layout.tsx as {"@context":"https://schema.org","@graph":[organization, website, founder]}
// Page-level emitters append their own nodes to the same @graph and reference by @id.
{
  "@type": ["LocalBusiness", "ProfessionalService"],        // ProfessionalService ⊂ LocalBusiness ⊂ Organization
  "@id": "https://aibuiltbyhand.com/#organization",
  "name": "Handbuilt AI",
  "legalName": "Handbuilt AI Studio",
  "alternateName": "Handbuilt AI Studio",
  "url": "https://aibuiltbyhand.com",
  "logo": { "@type": "ImageObject", "url": "https://aibuiltbyhand.com/logo.png", "width": 512, "height": 512 },
  "image": "https://aibuiltbyhand.com/opengraph-image.png",
  "description": "Handbuilt AI is a one-person AI studio in Surrey, BC that installs done-for-you AI receptionists, quote follow-up and admin automation for contractors and local service businesses across Metro Vancouver and the Fraser Valley — inside the phone number and accounts the business already owns. Fixed CAD pricing from $1,500.",
  "email": "OWNER_INPUT — keep pavneets956@gmail.com or omit until aibuiltbyhand.com can receive mail (no MX today)",
  "address": { "@type": "PostalAddress", "addressLocality": "Surrey", "addressRegion": "BC", "addressCountry": "CA" },
  "areaServed": [
    { "@type": "City", "name": "Surrey", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
    { "@type": "City", "name": "Delta" },
    { "@type": "City", "name": "Vancouver" },
    { "@type": "AdministrativeArea", "name": "Fraser Valley" },
    { "@type": "AdministrativeArea", "name": "British Columbia" }
  ],
  "priceRange": "$1,500–$10,000+ CAD",
  "currenciesAccepted": "CAD",
  "founder": { "@id": "https://aibuiltbyhand.com/#founder" },
  "knowsAbout": ["AI receptionist for contractors", "AI phone answering", "After-hours call answering", "Missed-call text-back", "AI quote follow-up", "Custom AI chatbot development", "Custom AI app development"],
  "sameAs": ["https://github.com/pavneets956-design"],       // profile, not the repo; extend only with live, public profiles
  "hasOfferCatalog": {
    "@type": "OfferCatalog", "name": "Custom AI builds (CAD, one-time)",
    "itemListElement": [
      { "@type": "Offer", "@id": "https://aibuiltbyhand.com/pricing#starter",  "price": 1500,  "priceCurrency": "CAD", "description": "From $1,500",       "itemOffered": { "@type": "Service", "name": "AI Starter System",  "provider": { "@id": "https://aibuiltbyhand.com/#organization" } }, "url": "https://aibuiltbyhand.com/create?package=starter" },
      { "@type": "Offer", "@id": "https://aibuiltbyhand.com/pricing#business", "price": 3500,  "priceCurrency": "CAD", "description": "$3,500–$7,500",     "itemOffered": { "@type": "Service", "name": "AI Business System" }, "url": "https://aibuiltbyhand.com/create?package=business" },
      { "@type": "Offer", "@id": "https://aibuiltbyhand.com/pricing#custom",   "price": 10000, "priceCurrency": "CAD", "description": "From $10,000",      "itemOffered": { "@type": "Service", "name": "Custom AI App" },      "url": "https://aibuiltbyhand.com/create?package=custom" },
      { "@type": "Offer", "@id": "https://aibuiltbyhand.com/pricing#care",     "price": 99,    "priceCurrency": "CAD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": 99, "priceCurrency": "CAD", "unitText": "MONTH" }, "itemOffered": { "@type": "Service", "name": "Care Plan" } }
    ]
  }
}
{ "@type": "WebSite", "@id": "https://aibuiltbyhand.com/#website", "url": "https://aibuiltbyhand.com", "name": "Handbuilt AI", "publisher": { "@id": "https://aibuiltbyhand.com/#organization" }, "inLanguage": "en-CA" }
{ "@type": "Person", "@id": "https://aibuiltbyhand.com/#founder", "name": "OWNER_CONFIRM — 'Pavneet Singh'", "givenName": "Pavneet", "jobTitle": "Founder & Builder", "worksFor": { "@id": "https://aibuiltbyhand.com/#organization" }, "url": "https://aibuiltbyhand.com/about", "sameAs": ["https://github.com/pavneets956-design"], "image": "OWNER_APPROVAL — public/founder.jpg (560×560, untracked)" }
```

**Per-page nodes (appended to the same `@graph`):**
- `WebPage` — `@id: <url>#webpage`, `url`, `name` (= title), `description`, `isPartOf {#website}`, `about {#organization}`, `breadcrumb {<url>#breadcrumb}`, `primaryImageOfPage` (og image), `dateModified` (from the §3.3 source; omit when unknown), `inLanguage en-CA`. Use `CollectionPage` for the 8 hubs and `/tools`, `AboutPage` for `/about`, `ContactPage` for `/create`.
- `BreadcrumbList` — `@id: <url>#breadcrumb` (existing `breadcrumbSchema`, add the `@id`).
- `Service` (landing/use-case) — keep, but `provider {#organization}`, `offers { "@id": "https://aibuiltbyhand.com/pricing#<packageId>" }` **by reference** instead of re-emitting the price; **`areaServed`**: location pages → the page's `City` (`{ "@type": "City", "name": "Chilliwack", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } }`); everything else → the organization's `areaServed` (drop `"Worldwide"`; `/remote-ai-development` may keep `Country` nodes for CA/US/AU/NZ/UK — that is the one page whose copy actually says so).
- `Article`/`HowTo` — keep; add `dateModified` and `author {#founder}` (a named human beats an org as author).
- `FAQPage` — emit only from components that put every answer in the HTML (`<details>` or `hidden` attribute). After `FAQSection.tsx` is fixed, all current call sites qualify.
- `SoftwareApplication`/`WebApplication` (tools) — keep as-is; add `author {#founder}`.
- **Delete** `localBusinessSchema` from `app/page.tsx:83-126`; **delete** `app/ai-front-desk/page.tsx` + `app/forge/page.tsx` (redirected sources with their own schema).

---

## Defect list — severity ranked

| # | Sev | Defect | Where | State |
|---|---|---|---|---|
| 1 | **P1** | No og:image on any page; `/opengraph-image.png` 404 | PROD | Fixed in tree (`lib/seo.ts:20-25,300,306`; `app/opengraph-image.png`) — **deploy-blocked** |
| 2 | **P1** | `llms.txt` publishes "$2,500–5,000 CAD" for the Business System (L32) | PROD | Fixed in tree (`money.ts:281`) — deploy-blocked |
| 3 | **P1** | `/products` answers 307 with **no `Location`**, `index,follow`, no canonical, not disallowed | PROD; code unchanged in tree (`app/products/page.tsx:5`) | Replace with `next.config.js` `{ source: '/products/:path*', destination: '/solutions', permanent: true }` and delete both page files |
| 4 | **P1** | Two identity nodes on `/` (`#organization` "Handbuilt AI" `$$` vs `#localbusiness` "Handbuilt AI Studio" `$99–$10,000+`) with conflicting areaServed/address; sitewide node claims `"Remote / Worldwide"` as an `AdministrativeArea` and four foreign countries; `sameAs` = a source-code repo; personal Gmail as business email; no `legalName`, no founder | `lib/seo.ts:28-69`, `app/page.tsx:83-126`, `site.ts:11,14,23` | Tree + PROD |
| 5 | **P2** | `FAQPage` on ~200 routes whose answers are absent from the HTML (1 of N rendered) — Google's FAQ guideline says the content must be visible on the page; also the largest AEO loss on the site (`12-aeo` §3.1) | `components/FAQSection.tsx:29-41` (`{isOpen && …}`, `useState(0)`) | Tree + PROD (PROD `/pricing` 1/6, Surrey 1/5, contractors 2/8) |
| 6 | **P2** | Sitemap omits 8 indexable routes (`/creators`, `/demo` ×5, `/start`, `/tools/form-filler`); no `lastmod` design; no test; nothing prevents a redirected/noindex slug from entering | `app/sitemap.ts:25-43`, `lib/data/landing.ts:38-72` | Tree; PROD additionally ships 216 identical fake `lastmod` |
| 7 | **P2** | IndexNow ping returns 500 — `INDEXNOW_PING_SECRET` unset in Production; hand-typed 9-path list drifts from the sitemap; no deploy hook | `app/api/indexnow/route.ts:14-21,27-37` | PROD verified by response body |
| 8 | **P2** | Shop hybrid products emit only the monthly as `Offer.price` (99 for a $2,500+$99/mo system; 49 for $1,000+$49/mo) | `lib/seo.ts:175-188` | Tree + PROD |
| 9 | **P2** | `og:url` = homepage on the 24 static pages that inherit the layout's `openGraph` (`/pricing`, `/shop`, `/solutions` verified live) | `app/layout.tsx:74` + the 24 pages without `openGraph` | Tree + PROD |
| 10 | **P2** | 10 app routes `index, follow` with no canonical (`/login`, `/cart`, `/dashboard` are 200 on PROD); protected only by `Disallow`, which also hides any future `noindex` | `app/layout.tsx:86`; no segment metadata on `app/login`, `app/cart`, `app/dashboard`, `app/agent` | Tree + PROD |
| 11 | **P2** | `/v2` — 610 KB "Bundled Page" served from `public/v2/index.html`: 200, no canonical, no robots, not disallowed | `public/v2/index.html` | PROD 200 |
| 12 | **P3** | 19 location `Service` nodes declare `areaServed: "Worldwide"`; a Chilliwack page has no Chilliwack entity | `lib/seo.ts:242` | Tree + PROD |
| 13 | **P3** | Internal links to 308 sources: 2 related-links + 2 shop `demoHref` buttons → retired Tools Pro slugs; demo pages' `upgradeHref` → `/tools/pro` | `_services_b.ts:466,524`; `shopProducts.ts:189,211`; `ToolGenerator.tsx:38` | Tree + PROD |
| 14 | **P3** | Redirected sources still built as full pages with self-canonical + `robots index` + their own JSON-LD | `app/ai-front-desk/page.tsx:34-35,83`; `app/forge/page.tsx:17` | Tree + PROD |
| 15 | **P3** | Hand-typed price copies that can drift from `packages.ts`: `makesOffer` strings; FAQ answers; llms.txt FX rate | `app/page.tsx:113-116`; `lib/data/faqs.ts:43,48`; `app/llms.txt/route.ts:21` | Tree (currently equal) |
| 16 | **P3** | `www` → apex is 307 (should be 308); `http://www` is a 2-hop chain | Vercel domain settings (not code) | PROD; cannot verify dashboard from here |
| 17 | **P3** | `llms.txt` is a 194-link dump with no contact line and a stale-prone FX rate; "Key pages" omits the lead offer page | `app/llms.txt/route.ts:21,58-81` | Tree + PROD |
| 18 | **P3** | robots: `Claude-Web` stale; `/account`, `/products`, `/v2` not disallowed; `Host:` non-standard | `app/robots.ts:7,19,25` | Tree + PROD |
| 19 | **P3** | `JsonLd` does not escape `<` / `</script>` in `JSON.stringify` output (all strings are first-party today; becomes a real XSS vector the day user content reaches schema) | `components/JsonLd.tsx:7` | Tree + PROD |
| 20 | **P3** | 32 titles > 65 chars (R3, not re-measured); `/services/ai-review-engine` `Service.name` is a question sentence | `LandingContent.title/h1` | Tree + PROD |
| 21 | Info | `/services/ai-review-engine` is **not** a 404 — correct the 2026-08-05 record | `_services_b.ts:429`, `Footer.tsx:125` | PROD 200 |

---

## Proposed implementation plan (file ownership)

**Order matters: #1 is a deploy, not a code change.**

| Step | Files | Change | Test / gate |
|---|---|---|---|
| **0 — Deploy what exists** | — | Merge `fix/dead-social-link` (owner approval). Clears defects 1, 2, 5's `/solutions` sibling, and the fake `lastmod`. | Post-deploy: `curl -I /opengraph-image.png` = 200 image/png; `llms.txt` L32; `sitemap.xml` has 0 `<lastmod>` |
| **1 — Identity consolidation** | `lib/seo.ts` (owner of all schema builders) | Replace `organizationSchema()` with the §8 node (single `@type ["LocalBusiness","ProfessionalService"]`, `legalName`, `founder`, `hasOfferCatalog` from `packages`, `areaServed` from a new `site.areaServed` typed array, `sameAs` = GitHub **profile**); add `founderSchema()`, `webPageSchema(url, meta)`; give `breadcrumbSchema` an `@id`; make `landingSchema` reference offers by `@id` and set `areaServed` per page type (location → City); fix `shopSchema` hybrid branch to emit **two** offers (setup one-time + monthly `UnitPriceSpecification`) or one `Offer` with `priceSpecification[]`; `faqSchema` unchanged. | `tests/schema.test.ts` (§3.4): one Organization-class node per page; every price ∈ packages/shop; no `Worldwide` on location pages; no `"#"`; `JSON.parse` round-trip |
| | `lib/data/site.ts` | `areaServed: [{type:"City",name:"Surrey"},…]` (replaces the string list at `:14`); `social.github` → profile URL; **`email` stays as-is until the MX blocker clears** (owner decides Gmail-vs-omit) | — |
| | `components/JsonLd.tsx` | Accept an array and emit a single `{"@context","@graph":[…]}`; strip per-node `@context`; escape `<` as `<` | unit test: output contains no literal `</script` |
| | `app/layout.tsx` | Emit `[organization, website, founder]` once; add nothing else | — |
| | `app/page.tsx` | Delete `localBusinessSchema` (`:83-126`); keep `serviceSchema()` (or drop — the catalog now lives on `#organization`) + `faqSchema(HOME_OBJECTIONS)` | — |
| | `components/LandingTemplate.tsx`, `app/use-cases/[slug]/page.tsx`, `components/tools/ToolShell.tsx`, hub pages | Append `webPageSchema()`; use-cases switch to `landingSchema`-style helper instead of hand-rolled nodes; hubs get `CollectionPage`; `/about` gets `AboutPage` + references `#founder` | — |
| **2 — FAQ visibility** | `components/FAQSection.tsx` | Render every `<p>` unconditionally; toggle with the `hidden` attribute (pattern already in `components/marketing/Interactive.tsx:179`) or `<details>` (pattern in `ToolShell.tsx:139`); animate `max-height`, not mount/unmount | vitest render test: N questions → N answers in static HTML |
| **3 — Sitemap + lastmod** | `lib/data/landing.ts`, `lib/data/freeTools.ts` | `updatedAt?: string`, `noindex?: boolean` on the entry types | |
| | `scripts/gen-lastmod.mjs`, `lib/data/lastmod.generated.json` | git-derived per-file dates, committed (§3.3) | |
| | `app/sitemap.ts` | Add `/creators`, `/demo`, `/demo/{assistant,lead,nudge,quote}`, `/start`, `/tools/form-filler`; resolve `lastModified` per §3.3; filter `noindex`; export the route list for reuse | `tests/sitemap.test.ts` (§3.4) |
| | `app/api/indexnow/route.ts`, `app/llms.txt/route.ts` | Consume the exported sitemap route list; llms.txt adopts the curated draft structure (identity, contact, offers, `## Optional` for the long tail), drops the FX sentence | `tests/llms.test.ts`: every `$` figure ∈ packages/shop; every link ∈ sitemap |
| **4 — Robots / redirects / dead routes** | `next.config.js` | Add `/products/:path*` → `/solutions` (308) and `/v2` → `/` (or delete `public/v2/`); keep 27 existing; no `trailingSlash` change | `tests/redirects.test.ts`: no source is a destination; no sitemap URL is a source; no `href` in `lib/data/**` equals a source |
| | `app/products/`, `app/products/[id]/`, `app/ai-front-desk/`, `app/forge/`, `components/home/LiveAIHome.tsx`, `components/home/stage/HandStage.tsx` (+ `HomepageNew.tsx` if dead), `components/forge/`, `components/experience/MissedCallCaught.tsx`, `lib/data/alwaysAnswering.ts`, `lib/data/forge.ts` | Delete (A1 owns the dead-code sweep; listed here because each carries SEO surface) | build passes; route count drops by 4 |
| | `app/login/layout.tsx`, `app/cart/layout.tsx`, `app/dashboard/layout.tsx`, `app/agent/layout.tsx` (new, metadata-only) | `robots: { index: false, follow: false }` | |
| | `app/robots.ts` | Remove `/login`, `/cart`, `/dashboard` from Disallow (so the `noindex` is readable); add `/account`, `/products`, `/v2`; rename `Claude-Web` → `Claude-User` + `Claude-SearchBot`; drop `host` | assert PROD `robots.txt` after deploy |
| | `lib/data/_services_b.ts:466,524`, `lib/data/shopProducts.ts:189,211`, `components/ToolGenerator.tsx:38` | Repoint to `/tools/contractor-quote-follow-up-generator` (review-reply) / `/create?build=ai-customer-reactivation` / `/pricing` | redirects test above |
| **5 — Ops** | Vercel Production env (owner) | Set `INDEXNOW_PING_SECRET`; add a deploy hook that GETs `/api/indexnow?secret=…`; change the `www` redirect to 308 in Project → Domains | `curl /api/indexnow?secret=` → 200 `{ok:true}`; `curl -I https://www.aibuiltbyhand.com/` → 308 |
| | `app/api/indexnow/route.ts:16-21` | Unset secret → log + 503 with a message (NO SILENT STATES), not 500 | |

**Owner inputs required before step 1 ships:** (a) public founder name form; (b) email policy while the domain has no MX; (c) whether `public/founder.jpg` may be the `Person.image`; (d) any real profile URLs for `sameAs` (none exist today — ship with GitHub profile only). **Never add:** telephone, street, geo, hours, ratings — none are verified.

---

## Summary (≤300 words)

Production (`3031d36`, 2026-07-15) is worse than every prior audit assumed on the one thing social sharing depends on: **no page has an og:image and `/opengraph-image.png` is a 404**, because the image was added on the unmerged branch. The same branch fixes the live `llms.txt` price contradiction, the fake sitemap `lastmod`, and the `/solutions` under-floor prices. Step zero of any plan is therefore a merge, not code.

Three defects are new to the record. `/products` returns a **307 with no `Location` header** on production — a redirect to nowhere on an indexable, non-disallowed URL; the code is unchanged in the tree and will ship again unless it becomes a `next.config.js` 308. The footer's `/services/ai-review-engine` is **not** a 404 (valid slug, 200 live) — that report was wrong. And `/v2` serves a 610 KB "Bundled Page" with no canonical or robots directive.

The structural schema problem is a **split identity**: `#organization` ("Handbuilt AI", `$$`, ten service areas including "Remote / Worldwide" and four foreign countries, Gmail, repo-as-`sameAs`) ships on all 237 routes, while the homepage adds a second `#localbusiness` ("Handbuilt AI Studio", `$99–$10,000+`, Surrey/Delta). Every `Service` node correctly points at `#organization`, so consolidation is cheap. Prices in the working tree all derive from `packages.ts` except two hand-typed copies and the shop's hybrid offers, which drop the setup fee. No ratings or reviews exist anywhere — good.

`FAQPage` is emitted on ~200 pages whose answers are not in the HTML (`FAQSection.tsx` mounts only the open item; production measures 1 of 6 on `/pricing`). The fix pattern already exists in two other components.

Sitemap: 216 entries, clean, but eight indexable routes missing, no `lastmod` source, and three hand-typed URL lists (sitemap, IndexNow, llms.txt) that already disagree. IndexNow has never worked in production (`INDEXNOW_PING_SECRET` unset → 500). `www` → apex is a Vercel-level 307 that only the dashboard can make 308.

Section 8 gives the single-node identity block using only verified values; phone, street, coordinates, hours and a domain email (no MX yet) are deliberately absent.
