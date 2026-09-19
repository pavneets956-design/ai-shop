# Handbuilt AI: search and website recovery review

Observed 18 September 2026 (America/Vancouver). Project: `C:/Users/gillp/Documents/Claude/Projects/AI Shop`. Live property: https://aibuiltbyhand.com/.

Implementation follow-up: see [the studio release record](./2026-09-18-studio-release.md) for the approved redesign, corrected pricing copy, tested redirects and search submissions. The observations below preserve the initial audit state.

## Decision

The site is technically functioning but has very little qualified search visibility. The visual presentation also needs editing: a long, repetitive homepage and weakly presented proof make the offer harder to understand. A visual refresh alone cannot establish why Google should rank the service.

Keep the existing application and useful URLs. Improve the small set already showing traction, repair Bing discovery, and build a much shorter homepage around a clear offer and demonstrable work. Do not launch another large batch of programmatic pages or delete low-traffic pages based only on this tiny sample.

## Live Google Search Console

Read directly in the signed-in property, Search type Web, no query/country/device filters.

| Measure | Three months, Jun 17–Sep 16 | Last 28 days | Previous 28 days |
|---|---:|---:|---:|
| Clicks | 4 | 1 | 0 |
| Impressions | 1.29K (rounded UI value) | 433 | 342 |
| CTR | 0.3% | 0.2% | 0% |
| Average position | 58.4 | 49.1 | 59.9 |

The comparison is the UI's “Compare last 28 days to previous period” selection. Its accessible chart date label was malformed, so the relative periods are retained rather than treating that label as a valid date range. Impressions increased 26.6%; average position improved by 10.8 positions. This is modest progress, not evidence of a traffic collapse or a proven effect of the August redesign. The absolute sample is too small to judge conversion rates or attribute results to an individual change.

Historical on-disk baseline: `research/gsc-baseline/00-executive-verdict.md` records Jun 14–Jul 29: 3 clicks, 609 impressions, average position 63.9. These unequal, overlapping windows are context, not a valid before/after experiment. August research also records an owner-supplied approximately 1,062 impressions and 3–4 clicks as of Aug 27; that is weaker evidence than the current live reports.

### Pages worth preserving and improving

| Page | 3-month impressions | Position | Last 28 days: impressions / position | Previous 28 days: impressions / position |
|---|---:|---:|---:|---:|
| `/` | 75 | 21.8 | 8 / 27.9 | 19 / 36.7 |
| `/industries` | 22 | 5.5 | Not captured | Not captured |
| `/resources/best-ai-tools-for-contractors` | 301 | 77.9 | 127 / 79.4 | 133 / 79.4 |
| `/ai-receptionist` | 137 | 73.1 | Not captured | Not captured |
| `/ai-chatbot-development` | 109 | 70.1 | Not captured | Not captured |
| `/locations/ai-chatbot-developer-vancouver` | 102 | 51.7 | 65 / 52.1 | 28 / 49.1 |
| `/ai-lead-follow-up-agent` | 94 | 42.4 | 55 / 28.1 | 34 / 59.3 |
| `/done-for-you-ai-automation` | 61 | 41.1 | 19 / 27.8 | 28 / 46.4 |
| `/locations/ai-receptionist-surrey-bc` | 34 | 8.4 | 19 / 4.7 | 10 / 9.6 |
| `/locations/ai-automation-burnaby-bc` | 33 | 6.6 | 22 / 4.1 | 11 / 11.6 |

These are page aggregates across queries, countries and devices, not guaranteed rankings for a named keyword. Local pages are encouraging but still have only tens of impressions. The homepage has four page-level clicks and `/industries` one; the property chart has four. Keep the chart total authoritative and do not add differently aggregated tables to “correct” it. A full raw export reconciliation was not performed in this review.

The leading visible queries included:

| Query | Impressions | Average position | Clicks |
|---|---:|---:|---:|
| custom chatbot development vancouver | 77 | 55.4 | 0 |
| ai leads for contractors | 75 | 80.6 | 0 |
| instant lead follow-up ai canada | 62 | 28.2 | 0 |
| ai receptionist for contractors | 48 | 71.8 | 0 |
| ai chatbot development vancouver | 39 | 79.6 | 0 |
| ai marketing tools for contractors | 37 | 75.1 | 0 |
| ai automation for contractors | 33 | 78.1 | 0 |
| ai receptionist for construction | 32 | 72.8 | 0 |
| done-for-you ai systems canada | 25 | 36.6 | 0 |
| ai services surrey | 22 | 85.8 | 0 |

The low overall CTR should not be treated as evidence that titles alone are broken: most leading queries rank poorly. Improve offer relevance and proof, then evaluate CTR within comparable query/position groups.

### Indexing and authority

Page indexing last updated Sep 13: **131 indexed, 65 not indexed** among known URLs. The 65 are:

- 57 discovered, currently not indexed.
- 3 crawled, currently not indexed.
- 2 duplicate without user-selected canonical.
- 2 not found (404).
- 1 page with redirect.

Do not classify all 65 as errors; intentional redirects and retired URLs can be correct. Do not divide 131 by the current sitemap's 147 to claim an indexation rate: the “all known pages” and sitemap cohorts differ.

Duplicate examples: `/services/ai-workflow-automation` (last crawled Aug 20) and `/tools/contractor-labor-burden-calculator` (Aug 17). Both now return HTTP 200 with the correct self canonical on a fresh public HTTP fetch. This supports that the report may reflect older crawls; URL Inspection is still needed to establish Google's current selected canonical. Do not rewrite canonical logic again merely because an old example remains in the report.

404 examples: `/demo/follow-up` (last crawled Jul 6) and `/demo/ai-receptionist` (Jul 2). These paths are absent from current `next.config.js` redirects. A narrowly scoped permanent redirect to the corresponding working demo is a reasonable repair after checking the exact intended replacement and inbound links. This review did not execute those redirects.

Google sitemap: submitted Aug 31, last read Sep 13, Success, 147 discovered pages. Public `/sitemap.xml` also contains 147 URLs.

Links report: **0 reported external links**, 147 internal-link total. This does not prove no link exists anywhere; it means GSC currently reports none. It supports prioritising real, relevant third-party discovery and evidence. No paid link scheme or arbitrary backlink target is recommended.

Manual actions: **No issues detected**. Security issues: **No issues detected**. Core Web Vitals overview has no field data for mobile or desktop. No claim of a clean algorithmic bill of health or measured Core Web Vitals pass follows from these reports.

## Live Bing Webmaster Tools

Verified property: `https://aibuiltbyhand.com/` (the initial selected property was a different business, which was changed before reading these figures).

- Search Performance, All traffic, 3 months, Jun 18–Sep 17: **0 clicks, 8 impressions, 0% CTR**.
- Keyword rows: “europe ai community developers paid membership automation” (4 impressions, position 2.25) and “trinidad and tobago law firms average cost for ai document analyzer” (4 impressions, position 5.25). Neither is well aligned with the contractor offer. Eight impressions are insufficient to generalise about all Bing demand.
- Site Explorer: 94 known URLs; **51 indexed, 43 excluded, 0 errors, 0 warnings**. The flagship contractor receptionist page is listed indexed, last crawled Aug 19, HTTP 200.
- Sitemaps: one successful sitemap, **86 URLs**, imported Jun 15, **last crawl Jun 15**. This is stale relative to the current 147-URL sitemap; Google has already read the newer version.
- Backlinks: **No data available**.
- IndexNow page presents onboarding, not a submission history.
- Production `/api/indexnow` returns HTTP 503. Source `app/api/indexnow/route.ts` returns 503 for the missing `INDEXNOW_PING_SECRET` branch; the ordinary missing/wrong request secret returns 401 when configuration exists. Thus this is a configuration gap, not merely successful authentication protection.

Concrete next operations: resubmit the existing public sitemap URL to Bing; configure the protected IndexNow route and invoke it after deployment. Verify accepted submissions and subsequent crawls separately from actual indexing. Neither mechanism guarantees ranking or indexing. No submissions or production environment changes were performed during this audit.

## Live UX and offer findings

1. **The hero loses its hierarchy at intermediate desktop widths.** At the observed 1,030px browser viewport, its 520px right column squeezes the text column. The H1 wraps to seven lines and the primary buttons fall below the initial view. `components/marketing/Hero.tsx` uses `lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]`; a comment asserting three balanced lines is not true at this width. Use proportional columns or delay the two-column breakpoint, with a substantially shorter headline.
2. **15 homepage sections repeat the proposition.** The hero timeline, problem selector, before/after section, six-step workflow and process section explain overlapping ideas. Visitors have to read too much before reaching a concise proof/offer decision. Reduce the homepage to five or six main sections.
3. **Proof reads like internal engineering notes.** Library names, suite counts and lengthy caveats take space that could demonstrate a useful result. Keep the ownership labels and relevant limitations; show short, verifiable project descriptions and useful screenshots or a recorded workflow. Move technical details to project pages.
4. **Honesty has become defensive copy.** Repeated statements about not inventing customers interrupt the sales story. “Own business” and “Own product” labels convey the status clearly. Do not fabricate testimonials, clients or outcomes. The Ironwood voice system is recorded as paused in the Aug 30 proof register; do not reframe it as a currently operating receptionist without fresh evidence.
5. **The demo does not demonstrate voice quality.** `/demo` is a text worker showroom with nine industry options and six worker types. Its simulated actions are labelled, which is good. It does not prove call latency, interruption handling, transfer quality or phone reliability. Label its CTA “Try the text demo”; create a real recorded test call only when one exists and is approved for publication.
6. **The commercial scope needs precision.** The hero combines answering, booking and quote chasing alongside the starter price. `packages.ts` defines the starter as one worker and one channel; its channels list website/SMS/email/WhatsApp, with no explicit phone allowance. Put exact phone setup scope, included integrations and ongoing telephony/AI costs on the receptionist offer before selling the full workflow at a starter floor. Do not invent new prices to resolve this.
7. **Unsupported popularity language remains.** `packages.ts` uses “Most popular” for the business package while the registered proof says no client work as of Aug 30. Replace with a factual scope label unless sales evidence now supports popularity.
8. **The contact form is already reasonably short.** Four required fields and optional detail; a fresh rewrite of the funnel is not the first priority. The generic “Tell us what you want to build” heading can better match a receptionist enquiry. No form was submitted, so this review does not verify real email delivery or lead storage.

Design direction supplied: `prototypes/2026-09-18-refresh.html`. Warm paper, dark green work panel, restrained terracotta, a two-line visual headline, five main sections, an interactive three-scenario illustration, concise owned-project proof and a consistent request CTA. All scenario text is explicitly illustrative. It links to the existing pricing page rather than copying mutable prices. This is a visual direction, not a replacement production homepage: implementation must retain category-rich metadata, the receptionist term in a prominent semantic heading, FAQ/schema alignment, attribution and existing analytics contracts. The placeholder H brand treatment is also a concept choice, not a completed logo replacement.

## Recovery sequence

### First: discovery and accuracy

- Refresh Bing sitemap submission and configure IndexNow through the production release process.
- Inspect the two canonical examples in GSC; validate only after confirming Google's current rendered/canonical evidence.
- Repair the two obsolete demo paths with tested redirects where replacements match.
- Resolve exact receptionist package scope, operating costs and the unsupported popularity badge.
- Keep the working four-field enquiry form; verify one authorised end-to-end delivery separately from read-only smoke checks.

### Then: the pages with a reason to exist

- Implement a shortened homepage with the existing founder and owned-product proof, a precise offer, clear price scope, visible request/demo actions and responsive proportional layout.
- Prioritise `/locations/ai-receptionist-surrey-bc`, `/locations/ai-automation-burnaby-bc`, and `/ai-lead-follow-up-agent` for genuine content improvement. Keep their URLs. Explain installation, limits, handover, local availability and actual examples; do not add city-name variants as the work.
- Preserve `/industries`, the existing receptionist pages and the Vancouver page while obtaining query-to-page evidence before any consolidation.
- Rework the high-impression tools article only if we can add original tested comparisons. It has visibility at position ~78, not a demonstrated near-term buyer funnel.

### Establish proof and distribution

- Produce one accurate build story from an owned system with a public demo, real screenshots and a dated current status. If an outcome was not measured, describe the workflow instead of claiming an uplift.
- Earn relevant mentions through real relationships, partners and legitimate profiles. Owner-approved outreach should point to this useful proof. Do not create fake directory identities or send unsolicited outreach from this audit.
- Track qualified enquiries, not just total clicks. Existing code defines `hero_demo_click`, `hero_contact_click`, `demo_started`, `demo_completed`, `form_started`, `form_submitted` and attribution events. Verify actual event collection in Vercel before relying on them; this review did not access the Vercel analytics dashboard.
- Evaluate weekly 28-day Google comparisons, Bing crawl freshness and the specific priority pages. Sparse data means no responsible promise of a click target or ranking deadline.

This prioritisation is an inference from the evidence, consistent with [Google's guidance on original, useful content and demonstrable experience](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). [Recrawl requests do not guarantee indexing](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Checks, changes and limits

- Fetched origin. Local branch and `origin/main` both at `12efe76b7eadb9bc17d67da0864cc29f00734a0c`; the inspected checkout is not sitting on unmerged application changes.
- Read AGENTS.md, relevant source files, historical GSC research, the proof register and the live site/dashboards. The graph query was available, but its wiki index was missing and its query results included archived documentation; those were not treated as current product truth.
- Production read-only smoke: **159/159 passed**. Evidence: `research/2026-09-18-production-smoke.txt`. Coverage includes key routes, sampled sitemap URLs, metadata, canonicals, price/schema consistency and security headers. It is not a full 147-URL crawl, Lighthouse run, delivery test or complete security audit.
- The smoke script accepts unconfigured IndexNow as a refused unauthenticated call. That security assertion passed; operational IndexNow remains unconfigured. “All checks passed” is not a business-readiness verdict.
- No application source changes, database mutations, outreach, commits, pushes, deployments or search-console submissions in this pass. Added this audit, the smoke output and a local visual prototype/server. Existing owner modifications were left in place.
- No full Search Console export, complete Bing exclusion drilldown, query/page join, live Vercel conversion data, current voice-system test or first-hand customer evidence was obtained. These are explicitly unresolved, not silently assumed.
- The browser viewport override did not actually change the existing live viewport (DOM reported width 1030). The prototype's mobile review uses a same-origin 390px iframe instead; no unsupported claim of a live-site 390px test is made.
- Prototype QA: inspected desktop hero and founder/project section, confirmed the founder image loads, one H1 and five sections, all three scenario controls update the visible text, and the selected-work anchor reaches `#proof`. Desktop document width and scroll width both 1265px; mobile iframe content width and scroll width both 375px (390px outer frame less scrollbar), so neither observed layout has horizontal overflow. Corrected the mobile brand/button wrapping and shortened the mobile heading size after visual review. The preview server passed `node --check`. Application build/unit tests were not rerun because application source was not edited.

Preview: run `node prototypes/serve-refresh.mjs` from this project, then open http://127.0.0.1:3187. The server only serves the prototype, its founder image and the mobile preview wrapper; it does not expose the repository or environment files.

Live dashboard entry points: [GSC performance](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Faibuiltbyhand.com%2F), [GSC indexing](https://search.google.com/search-console/index?resource_id=https%3A%2F%2Faibuiltbyhand.com%2F), [Bing performance](https://www.bing.com/webmasters/searchperf?siteUrl=https://aibuiltbyhand.com/), [Bing sitemaps](https://www.bing.com/webmasters/sitemaps?siteUrl=https://aibuiltbyhand.com/). These require the owner's signed-in account.
