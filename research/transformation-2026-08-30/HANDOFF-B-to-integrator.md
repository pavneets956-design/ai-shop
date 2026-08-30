# HANDOFF — Lane B (technical SEO) → integrator

**Date:** 2026-08-30 · **Branch:** `feat/site-transformation-2026-08-30`
**Spec followed:** `research/transformation-2026-08-30/06-technical-seo.md` (§1.2 split identity, §3.2/§3.3 sitemap + lastmod, §5 redirects, §8 unified identity block), `02-url-inventory.md`, `03-content-dispositions.md` (Appendix — non-sitemap routes), `01-repo-architecture.md`.
**No git state was changed.** Nothing staged, committed, stashed or pushed.

---

## 1. Files changed (Lane B owns all of these)

| File | State | What changed |
|---|---|---|
| `lib/seo.ts` | **rewritten** | Unified identity, real `lastmod` tables, FAQ gating, per-page `WebPage`, offers by `@id`. Detail below. |
| `app/sitemap.ts` | **rewritten** | Exports the canonical route list; adds 7 routes; real `lastmod`; filters redirect sources + `noindex` rows. **216 → 164 entries.** |
| `app/robots.ts` | **rewritten** | +3 disallowed private paths, +10 AI user-agents named, all still `allow: "/"`. |
| `next.config.js` | **edited** | `require("./lib/redirects.js")` merged first; `/products` and `/v2` now real 308s. **30 base + 46 registry = 76 rules.** |
| `components/JsonLd.tsx` | **rewritten** | Emits one `@graph`; drops null/typeless nodes; escapes `<` and U+2028/9. |
| `app/llms.txt/route.ts` | **rewritten** | Every price from `packages.ts`/`shopProducts.ts`; every link checked against the sitemap; FX sentence removed; contact block added; long tail moved under `## Optional`. |
| `app/api/indexnow/route.ts` | **rewritten** | Submits `sitemapUrls()` instead of a hand-typed 9-path list; unset secret → 503 + log, not 500. |
| `tests/seo-static.test.ts` | **new** | 42 assertions, node env, no server. |
| `lib/redirects.js` | **created as a placeholder, then filled by Lane D** | I wrote the CJS contract + header; Lane D populated 46 rows. See §5.7 for the one JSDoc line worth fixing. |

**No file outside that list was touched.**

---

## 2. `lib/seo.ts` — what the identity looks like now

One Organization-class node, `@id https://aibuiltbyhand.com/#organization`, referenced by every other node. Name stays **"Handbuilt AI"** — no rename was approved.

Emitted (every value traceable to a source file):

| Field | Source |
|---|---|
| `@type: ["LocalBusiness","ProfessionalService"]` | one node covers Organization / LocalBusiness / ProfessionalService |
| `name` / `legalName` / `alternateName` | `site.name` / `site.legalName` |
| `url`, `logo` (512×512 ImageObject), `image` | `site.url`, `public/logo.png`, `/opengraph-image.png` |
| `email` | `site.email` — still the Gmail, deliberately (no MX on the domain) |
| `address` | locality Surrey / region BC / country CA. **No street, no postal code.** |
| `areaServed` | 9 `City` + 2 `AdministrativeArea`, generated from `site.serviceArea`. No "Canada", no "Remote / Worldwide", no foreign countries. |
| `priceRange` | **derived** `"$1,500–$10,000+ CAD"` = min/max of `packages.ts`. Replaces the invented `"$$"`. |
| `founder` | `{"@id": …/#founder}` → a real `Person` node using `site.founder` ("Pavneet Singh") |
| `sameAs` | `Object.values(site.social)`, filtered for empty / `"#"` / non-http |
| `hasOfferCatalog` | 4 `Offer` nodes (`#starter`, `#business`, `#custom`, `#care`) generated from `packages.ts` + `carePlan`. **Zero hand-typed prices.** |

**Deliberately absent — asserted by test:** `telephone`, `faxNumber`, `geo`, `openingHours`, `aggregateRating`, `review`, `foundingDate`, `numberOfEmployees`, `streetAddress`, `postalCode`.

Other changes in the same file:

- `websiteSchema()` gains `inLanguage: en-CA`; `founderSchema()` and `identityGraph()` are new.
- `webPageSchema()` — one `WebPage` per route, `isPartOf → #website`, `about → #organization`, `breadcrumb → <url>#breadcrumb`, `dateModified` from the real lastmod table (omitted when unknown).
- `breadcrumbSchema()` gains a stable `@id`.
- `serviceSchema()` / `carePlanOffer()` / `landingSchema()` now reference `offers: {"@id": …/pricing#<pkg>}` instead of restating a price — one priced Offer sitewide, in the catalog the root layout ships.
- `landingSchema()` **`areaServed` no longer says `"Worldwide"` anywhere.** Location pages get their own `City` **only when that city is in the verified `site.serviceArea`**; anything else falls back to the org's service area. `/remote-ai-development` is the one page that keeps `Country` nodes, because its own copy is about remote delivery.
- `shopSchema()` hybrid fix — was emitting only the monthly. Now both: "AI Lead Capture & Follow-Up" → `[Offer 2500, Offer 99/MONTH]` (was `99`); "AI Review Engine" → `[1000, 49/MONTH]` (was `49`); Ops Dashboard → `[1500, 199/MONTH]`; Receptionist OS → `[1500, 349/MONTH]`.
- `landingMetadata()` honours a `noindex: true` flag on a registry row the moment `LandingContent` has one, and now sets `siteName` / `locale` on `openGraph`.
- `staticMetadata()` — **new helper you may want** (see §5.2, the og:url defect).

---

## 3. FAQPage — RESOLVED IN THE TREE, no change needed from you

You asked me to confirm your `FAQSection.tsx` rewrite against my emission logic. **Confirmed — they match, and I have flipped the gate on.**

What I built: `faqSchema(items, { answersRendered })` returns a real `FAQPage` only when the caller asserts every answer is in the served HTML; otherwise it returns `OMITTED_NODE`, a frozen typeless node that `JsonLd` / `toGraph` drop from the graph. The default comes from `FAQ_ANSWERS_RENDERED` in `lib/seo.ts`.

Why a typeless sentinel rather than `null`: `faqSchema` is called from `lib/data/freeTools.ts`, `app/page.tsx`, `app/faq/page.tsx`, `app/pricing/page.tsx` and `app/use-cases/[slug]/page.tsx` — all pushing straight into a `Record<string, unknown>[]`. A nullable return would type-error five files owned by other lanes; a typeless node changes the OUTPUT without changing a single call site.

I then read all three FAQ renderers on disk and verified every answer is in the server-rendered HTML:

| Renderer | Pattern | Covers |
|---|---|---|
| `components/FAQSection.tsx` | native `<details>`/`<summary>`, server component, no `"use client"`, `<p>{f.a}</p>` always mounted | 169 landing pages, `/faq`, `/pricing`, 25 use-cases |
| `components/tools/ToolShell.tsx:139` | native `<details>` | 5 free tools |
| `components/marketing/Interactive.tsx:179` | `hidden={!isOpen}` — attribute, so the text stays in the DOM | homepage |

`<details>` collapsing is presentational; the answer text is in the HTML for Google, answer engines, Reader mode and JS-disabled users. So **`FAQ_ANSWERS_RENDERED = true`** in `lib/seo.ts`, and FAQPage is back on ~200 routes — this time truthfully.

Nothing in `lib/seo.ts` still assumes one-answer-at-a-time. The only `isOpen` strings left in that file are two comment lines: one recording the old defect for the record, one naming `Interactive.tsx`'s `hidden={!isOpen}` as an approved pattern.

**The flag cannot silently become a lie.** `tests/seo-static.test.ts` → *"every FAQ renderer keeps all answers in the server-rendered HTML"* reads those three component sources and fails if `<details>` disappears, if `<AnimatePresence>` returns, or if `Interactive.tsx` swaps `hidden={!isOpen}` for a conditional mount. If a renderer ever has to go back to conditional mounting, set `FAQ_ANSWERS_RENDERED = false` in the same commit — do not leave it `true`.

---

## 4. Sitemap, redirects, robots, llms.txt, IndexNow

**Sitemap: 216 → 164.** `static 24 · tool 5 · money 12 · service 21 · industry 31 · creators 6 · location 17 · resource 17 · howto 6 · compare 17 · usecase 8`

- **Added (7):** `/creators`, `/demo`, `/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote`, `/start`.
- **Not added: `/tools/form-filler`** — `03-content-dispositions.md` Appendix marks it NOINDEX (R5 P3). Eight routes were missing; only seven belong in the sitemap.
- **Removed (46):** every source in `lib/redirects.js`, filtered automatically. Parameterised sources are matched by prefix.
- **Removed (14):** creator rows Lane F flagged `noindex` — picked up defensively via `isNoindexEntry()`, which reads the field whether or not `LandingContent` declares it yet.
- **`lastmod` is real.** Per-source-file dates from `git log -1 --format=%cs`, committed in `REGISTRY_LASTMOD` / `STATIC_LASTMOD` in `lib/seo.ts`. **9 distinct dates** (2026-06-07 … 2026-08-30), stable across deploys. Not computed in `next build` — a shallow Vercel clone would silently produce today's date for everything, which is the exact defect being removed. The file carries the one-line regeneration command; run it before a content release.
- `sitemapRoutes()` / `sitemapUrls()` are exported and consumed by `llms.txt`, IndexNow and the tests. **The three hand-typed URL lists are now one list.**

**Redirects.** `/products` was a live 307 with **no `Location` header** on an indexable, non-disallowed URL. It is now `{ source: '/products', destination: '/solutions', permanent: true }` plus `/products/:path*`, in `next.config.js`. A config redirect runs before the filesystem and the app router, so it is authoritative whether or not `app/products/**` still exists (it does — deleting it is your call, §5.4). Same treatment for `/v2` → `/`.

Audited: 76 rules, **0 duplicate sources, 0 chains, 0 loops, every destination root-relative + 308 + a known route, and no sitemap URL is a redirect source.** All five assertions run against the real `next.config.js` `redirects()` output, not a copy of it.

**Robots.** All AI crawlers still `allow: "/"`; 10 more named (`Claude-User`, `Claude-SearchBot`, `anthropic-ai`, `CCBot`, `meta-externalagent`, `Amazonbot`, `cohere-ai`, `DuckAssistBot`, `MistralAI-User`, `YouBot`). Added to Disallow: `/account`, `/products`, `/v2`. `/login`, `/cart`, `/dashboard` stay — see §5.3.

**llms.txt.** Prices 100% derived. Every link filtered through `sitemapUrls()`, so a redirected or noindexed page can no longer be advertised. Removed the rotting FX rate ("roughly 0.72–0.75 USD at time of writing"). Added a `## Contact` block (email, `/create` with the explicit "no self-serve checkout and no calendar booking", service area from `site.serviceArea`). Geography narrowed to BC — the old copy claimed US/AU/NZ/UK delivery, contradicting the narrowed `serviceArea`. The 194-link dump moved under `## Optional`.

**IndexNow.** Key file `public/ac88d1565466f5394f041d46f2546ce7.txt` verified present, 32 bytes, byte-equal to `site.indexNowKey`. The endpoint now submits the full sitemap (was 9 paths — it omitted `/tools`, the 5 tools, `/shop`, `/faq`, `/about`, `/create`, `/locations`). Unset secret → **503** with a message naming the variable plus a `console.error`, instead of a bare 500. Upstream failure → 502 + log, never a silent success.

**og:image.** `app/opengraph-image.png` verified by reading the bytes: PNG, **1200×630**, 35,055 B — and viewed: real branded artwork (off-white ground, red accent bar, "HANDBUILT AI" wordmark, "AI that works for your business.", "aibuiltbyhand.com" / "Surrey, BC — Done-for-you AI receptionist & automation"). `app/twitter-image.png` is a byte-identical copy. **No new image generated and no `app/opengraph-image.tsx` created** — a second `opengraph-image.*` in the same segment is a Next build error, and the existing file already clears the "real branded, not a generic gradient" bar. One caveat in §5.5.

---

## 5. What you need to do — and what needs an owner

### 5.1 REQUIRED — `app/layout.tsx`, 2 lines. The `#founder` reference currently dangles.

`organizationSchema()` emits `founder: { "@id": ".../#founder" }`, but the layout renders only `[organizationSchema(), websiteSchema()]`, so the `Person` node is never emitted. Swap in `identityGraph()`, which is exactly `[organization, website, founder]`:

```diff
-import { organizationSchema, websiteSchema } from "@/lib/seo";
+import { identityGraph } from "@/lib/seo";
...
-          <JsonLd data={[organizationSchema(), websiteSchema()]} />
+          <JsonLd data={identityGraph()} />
```

### 5.2 RECOMMENDED — `app/layout.tsx`, 1 line. og:url is the homepage on 24 static pages.

Those pages declare `metadata` with a canonical but no `openGraph`, so they inherit the layout's object **including `url: site.url`**. Verified live on `/pricing`, `/shop`, `/solutions`. Delete the line:

```diff
   openGraph: {
     type: "website",
     locale: "en_CA",
     alternateLocale: ["en_US", "en_AU", "en_NZ", "en_GB"],
-    url: site.url,
     siteName: site.name,
```

An absent `og:url` is strictly better than a wrong one. The complete fix is to move those pages onto `staticMetadata({ path, title, description })` from `lib/seo.ts`, which sets a correct `og:url`, `siteName`, `locale`, og:image and twitter card in one call. Their page files are not mine.

### 5.3 RECOMMENDED — segment `noindex` for the app screens.

`/login`, `/cart`, `/dashboard` and `/agent/*` emit `index, follow` with no canonical and are protected only by `Disallow` — which also stops a crawler ever reading a `noindex`, so an externally-linked URL can still be indexed URL-only. Correct end state: a metadata-only `layout.tsx` in each segment with `robots: { index: false, follow: false }`, **then** remove those three from the Disallow list in `app/robots.ts`. I deliberately did **not** remove them first: without the segment metadata that would make the pages *more* indexable, not less. Do both halves together, or tell me and I will drop them from `robots.ts`.

### 5.4 Dead weight now redirected but still shipped

- `app/products/page.tsx` + `app/products/[id]/page.tsx` — unreachable behind the 308; safe to delete.
- `public/v2/index.html` — 610 KB, now redirected and disallowed, but still in the deploy. Deleting it removes the redirect's reason to exist; keep the redirect either way.
- `app/ai-front-desk/` and `app/forge/` you already deleted — their 308s are still in `next.config.js` and **must stay**, otherwise those indexed URLs 404.

### 5.5 OWNER DECISIONS — none blocking, all one-liners

1. **`sameAs` is a repository, not a profile.** `site.social.github` = `https://github.com/pavneets956-design/ai-shop`. `06-technical-seo.md` §8 recommends the **profile** `https://github.com/pavneets956-design` (fetched 200 on 2026-08-30) as the entity anchor. I used `site.social` verbatim for the org because `site.ts` is integrator-owned; for `Person.sameAs` I derive the profile from it by regex. Change the value in `site.ts` and both follow automatically.
2. **`email` is the personal Gmail.** `aibuiltbyhand.com` has no MX and no Resend DKIM, so `build@` would black-hole enquiries. Publishing the working Gmail beats publishing a dead branded address. The alternative is to omit `email` entirely. Owner call; flip the day a mailbox exists.
3. **`priceRange: "$1,500–$10,000+ CAD"`** — derived from `packages.ts`, not invented, and `LocalBusiness` benefits from it. If the owner does not want a band published, delete one line in `organizationSchema()`; the test asserting it is not `"$$"` needs the same edit.
4. **`public/founder.jpg`** is untracked and is **not** used as `Person.image` — that needs owner approval (`06-technical-seo.md` §8, owner input (c)). One line to add once approved.
5. **The OG image headline is the old positioning.** It reads "AI that works for your business. / Built by hand, not bought off a shelf." with "Surrey, BC — Done-for-you AI receptionist & automation" in the footer. That is real branded artwork, so I did not replace it — but it is not the new "AI receptionist & admin systems for BC contractors" line. If Lane A5 or the owner wants it re-cut, replace `app/opengraph-image.png` + `app/twitter-image.png` (same 1200×630) and update `DEFAULT_OG_IMAGE.alt` plus both `*.alt.txt` files in the same commit.
6. **Gate G2 rows in `lib/redirects.js`** — the 2 out-of-service-area location redirects and the 14 creator `noindex`es carry owner-approval gates from `03-content-dispositions.md`. Not mine; flagged so they are not lost.

### 5.6 Ops (Vercel dashboard, owner)

- `INDEXNOW_PING_SECRET` is **unset in Production** — `/api/indexnow` has never worked. Set it, then `GET /api/indexnow?secret=…` should return `{ok:true, submitted:164}`. It now returns a clear 503 instead of a 500 until then.
- `https://www.aibuiltbyhand.com/` → apex is a Vercel-level **307**; it should be a **308**. Project → Domains → the `www` entry. A `next.config.js` `has: host` rule cannot fix it — the edge redirect fires first. I cannot verify or change the dashboard from here.

### 5.7 One line in `lib/redirects.js` (Lane D's file now)

The header JSDoc I left as `@type {{ redirects: {...}[] }}` sits directly above `const redirects = [...]`, so TypeScript infers the *array* as the wrapper object. It caused `app/sitemap.ts(78,19): TS2488`. I worked around it with a defensive normaliser in `app/sitemap.ts` (`registryRedirects()`), so nothing is broken — but the clean fix is:

```js
/** @type {{ source: string, destination: string, permanent: boolean }[]} */
const redirects = [
```

Runtime is unaffected either way.

---

## 6. Verification — exact commands and output

All run from the repo root on 2026-08-30, working tree, no build, no server, no network.

```
$ node -e "…read PNG IHDR…"
app/opengraph-image.png sig 89504e470d0a1a0a w 1200 h 630 bytes 35055
app/twitter-image.png   sig 89504e470d0a1a0a w 1200 h 630 bytes 35055
public/logo.png         sig 89504e470d0a1a0a w 512  h 512  bytes 14458

$ node -e "…compare public/<key>.txt to site.indexNowKey…"
key file: public/ac88d1565466f5394f041d46f2546ce7.txt
matches site.indexNowKey: true | body len 32

$ node -e "console.log(require('./lib/redirects.js').redirects.length)"
46

$ npx tsc --noEmit
.next/types/app/ai-front-desk/page.ts(2,24): error TS2307: Cannot find module '../../../../app/ai-front-desk/page.js'
.next/types/app/ai-front-desk/page.ts(5,29): error TS2307: Cannot find module '../../../../app/ai-front-desk/page.js'
.next/types/app/forge/page.ts(2,24):        error TS2307: Cannot find module '../../../../app/forge/page.js'
.next/types/app/forge/page.ts(5,29):        error TS2307: Cannot find module '../../../../app/forge/page.js'
TypeScript: 4 errors in 2 files
```

**All four are stale `.next/types` artifacts for the two route files you deleted. Zero errors in source** — confirmed with `npx tsc --noEmit | grep -v "^\.next/types" | grep "error TS"` → no output. They clear on the next `next build`.

```
$ npx vitest run tests/seo-static.test.ts
Test Files  1 passed (1)
     Tests  42 passed (42)

$ npx vitest run
Test Files  12 passed (12)
     Tests  232 passed (232)
```

Generated-output spot checks (evaluated through vitest; the scratch file was removed afterwards):

```
SITEMAP: 164 {"static":24,"tool":5,"money":12,"service":21,"industry":31,
              "creators":6,"location":17,"resource":17,"howto":6,"compare":17,"usecase":8}
LASTMOD distinct: 2026-06-07, 2026-06-14, 2026-06-17, 2026-06-19, 2026-07-06,
                  2026-07-15, 2026-07-31, 2026-08-12, 2026-08-30
NEXT.CONFIG redirect rules: 76
products rules: [{"source":"/products","destination":"/solutions","permanent":true},
                 {"source":"/products/:path*","destination":"/solutions","permanent":true}]
v2 rules:       [{"source":"/v2","destination":"/","permanent":true},
                 {"source":"/v2/:path*","destination":"/","permanent":true}]

/locations/ai-automation-agency-surrey-bc node types: WebPage | Service | BreadcrumbList
  Service.areaServed   = [{"@type":"City","name":"Surrey",
                           "containedInPlace":{"@type":"AdministrativeArea","name":"British Columbia"}}]
  Service.offers       = {"@id":"https://aibuiltbyhand.com/pricing#starter"}
  WebPage.dateModified = "2026-07-06"

SHOP AI Lead Capture & Follow-Up (label "From $2,500 + $99/mo")
  => [{"price":2500},{"price":99,"priceSpecification":{"unitText":"MONTH"}}]   (was: 99 only)
SHOP AI Review Engine (label "$1,000 + $49/mo")
  => [{"price":1000},{"price":49,"priceSpecification":{"unitText":"MONTH"}}]   (was: 49 only)

llms.txt: 197 lines · FX sentence present? false
  $ figures: $1,500 $3,500 $7,500 $10,000 $99/mo $129/mo $1,000 $2,500 $49/mo $500 $199/mo $349/mo
  (every one traceable to packages.ts or shopProducts.ts)
```

### What the 42 assertions cover

Unique titles · unique descriptions · unique tool titles · self-referencing canonical on every landing page · `og:url` = own URL · og:image + `twitter:card` on every landing page · `DEFAULT_OG_IMAGE` absolute 1200×630 · **no stale price string** (`$2,500`, `$7,500+`, `~$1,000`, `$250/mo`, `$2,500–5,000`, `$2500`) anywhere in generated metadata · every catalog `Offer.price` ∈ `packages.ts` · every landing `offers` is an `@id` reference, never a restated price · `priceRange` derived, not `"$$"` · sitemap has no duplicates / query / fragment / trailing slash · the 7 added routes present and `/tools/form-filler` absent · **no sitemap entry is a redirect source** (registry *and* `next.config.js`) · no private route in the sitemap · `lastmod` parseable, not future, not pre-repo, **not all identical** · lastmod tables cover every route · redirect sources unique · no chains · no loops · every destination a known route · every destination root-relative + 308 · `next.config.js` merges the registry without loss or duplication · `/products` is a 308 to `/solutions` · **exactly one Organization-class node sitewide** · identity graph is Organization + WebSite + Person cross-linked by `@id` · no landing page re-declares an identity · every provider/author/publisher points at the one identity · identity carries no unverifiable field · `sameAs` never `"#"` · `areaServed` never "Worldwide" · exactly one `WebPage` + one `BreadcrumbList` per landing page · every graph valid JSON with no raw `</script` · FAQPage suppressed unless asserted · suppressed FAQPage never reaches the graph · FAQPage emission tracks `FAQ_ANSWERS_RENDERED` · **every FAQ renderer keeps all answers in the server-rendered HTML** · origin agreement · every sitemap path is a known route.

### Not verified from here — needs your build/deploy gate

- `next build` — I did not run it, per the brief.
- `/opengraph-image.png` (un-hashed) resolving 200. The Next file convention serves it at that path and `DEFAULT_OG_IMAGE.url` depends on it: `curl -sI https://<preview>/opengraph-image.png` after deploy.
- Live redirect status codes on the preview (`/products`, `/v2`, the 46 registry sources) — offline I could only assert the config.
- The `www` → apex 307, which is dashboard-owned.
