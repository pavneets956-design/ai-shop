# 01 — Methodology and Provenance

**Executed:** 2026-07-31 · **Phase:** Evidence gate (follows `research/` Phase-1 strategy work)

---

## 1. The headline provenance fact

**The assignment asked for 16 months of Google Search Console data. Only 46 days exist.**

| Field | Value |
|---|---|
| **Property** | `https://aibuiltbyhand.com/` (URL-prefix property) |
| **Requested range** | 16 months (`num_of_months=16`) |
| **Actual range returned** | **2026-06-14 → 2026-07-29** |
| **Days in range** | **46** (45 with ≥1 impression; 2026-06-14 itself shows 0) |
| **Last GSC update** | ~13 hours before capture |
| **Export method** | Authenticated browser interface (the user's logged-in Chrome), DOM extraction of the rendered performance grid |
| **API used** | **No.** No Search Console API credential was configured. |
| **Time zone** | GSC default (America/Los_Angeles) — not independently verified |
| **Search type** | Web (default) |
| **Filters applied** | None, except the per-query filters in §4 |

The "16 months" selector was applied and accepted. The property simply has no history before mid-June 2026 — consistent with the property being verified on 2026-07-06 with a short backfill.

**This is an answer, not a blocker.** The Phase-1 report named "pull 16 months of GSC" as blocker #1. That blocker is now closed: the data was retrieved, and the finding is that the dataset is 46 days and very small. No amount of waiting changes what already happened; only time forward will.

---

## 2. Row limits and completeness

| Dimension | Rows retrieved | Complete? |
|---|---:|---|
| Queries | **92** | Yes — far below GSC's 1,000-row interface cap |
| Pages | **81** | Yes |
| Countries | **25** | Yes |
| Devices | **3** | Yes |
| Days | **46** | Yes |
| Search appearance | **0** | **No data** — the tab falls back to the query grid, indicating no rich-result appearance types were recorded |

**Interface export was not capped.** Every dimension returned well under the 1,000-row limit, so these are complete for the window. I am **not** claiming API-level completeness — the API can expose more granular query×page combinations than the interface, and anonymised queries are withheld at both levels.

### Internal consistency checks performed

> **Correction issued 2026-08-01.** The row previously reading
> *"Sum of page impressions | 609-consistent"* was **wrong**. The pages dimension sums to
> **803 impressions, not 609**. That was a reporting mistake in this file — the underlying
> export in `raw/gsc/pages-raw.tsv` was always correct and has **not** been altered.
> The row below it ("recorded as observed, not reconciled") has now been reconciled.
> No figure anywhere in this deliverable set has been silently changed.

#### Reconciliation table (machine-checkable)

Every value below is reproducible from `raw/gsc/*.tsv` with a column sum.
Authoritative property totals: **3 clicks · 609 impressions** over 2026-06-14 → 2026-07-29.

| Source report | Dimension | Filters | Rows | Clicks | Impressions | Δ clicks | Δ impr | Explanation for non-additive total |
|---|---|---|---:|---:|---:|---:|---:|---|
| `raw/gsc/countries-raw.tsv` | Country | none | 25 | **3** | **609** | 0 | 0 | Property-aggregated. Matches exactly. |
| `raw/gsc/devices-raw.tsv` | Device | none | 3 | **3** | **609** | 0 | 0 | Property-aggregated. Matches exactly. |
| `raw/gsc/queries-raw.tsv` | Query | none | 92 | **0** | **437** | **−3** | **−172** | **Query privacy.** Anonymised queries have no row in the table but *are* counted in the chart total. All 3 clicks fall inside the withheld bucket, so the query table shows zero clicks. |
| `raw/gsc/pages-raw.tsv` | Page | none | 81 | **4** | **803** | **+1** | **+194** | **Page-level aggregation.** The table is aggregated by page; the total is aggregated by property. One SERP showing several of the site's URLs is 1 property impression but N page impressions. |
| *(not archived)* | Day | none | 46 | 3 | 609 | 0 | 0 | Reported reconciling in the original capture. **Cannot be re-verified — no `dates-raw.tsv` was archived.** Recorded as a provenance gap, not as a verified check. |

**Ruled out as causes:** date-range skew (the pages excess is +194 impressions ≈ 15 days' worth at the
observed ~13/day — far too large for a capture-time offset, and clicks/impressions are internally
consistent within each file), duplicated rows (81 unique page rows, no repeats), and applied filters
(all four exports were captured unfiltered).

#### Why the two dimensions move in opposite directions

Google documents both mechanisms:

- **Pages over-sum.** *"Choosing the Pages dimension aggregates table data by page rather than by property. The graph data is always aggregated by property, regardless of the dimension selected."* And on the property side: *"If you look at the Performance report with data grouped by property, only one impression is counted for the entire card."* So a search result showing two of this site's URLs contributes **1** to the property total but **2** to the pages table. With 218 URLs clustered on near-identical receptionist/chatbot topics at an average position of 63.9, multi-URL SERPs are exactly what would be expected — and +194 (32%) is the measured size of that effect. The same boundary accounts for the 4th click (`/`=3, `/industries`=1 against a property total of 3).
- **Queries under-sum.** *"Some queries are omitted from the report to protect user privacy. These are called anonymized queries. They're included in chart totals, unless a query filter is applied."* Hence 609 − 437 = **172** withheld impressions (28.2%), and all 3 clicks sit in that bucket.

**Honesty limit on the click figure:** Google publishes a worked example of property-vs-page aggregation
for *impressions* only. The +1 click is attributed to the same aggregation boundary because every
property-aggregated dimension (country, device) returns exactly 3 while only the page-aggregated
dimension returns 4 — but Google does not publish a click-level worked example, so this is a
**strongly-evidenced inference, not a quoted rule.**

**Rule for all downstream use:** cite **3 clicks / 609 impressions** as the property total.
Never sum the pages table to a site total, and never sum the queries table to a site total.

Sources: [Search Console — How data is calculated](https://support.google.com/webmasters/answer/7042828) ·
[Performance report: dimensions and data groupings](https://support.google.com/webmasters/answer/17011259)

---

## 2b. Authoritative protected-page count — **21**

Reported as both "21" and "22" across the deliverable set. Resolved: **21 is authoritative for this
phase; 22 was Phase 1's count and appears only in "Phase 1 had" comparison columns.** They were never
two claims about the same thing — but the columns were labelled ambiguously enough to read as a
contradiction, which is itself a reporting defect. Column headers have been made explicit.

Derived from `data/consolidation-decisions.csv` (218 rows = 216 sitemap URLs + `/demo` + `/creators`):

| `revised_decision` | `protected` | Rows |
|---|---|---:|
| KEEP | `yes` | **21** |
| DEFER | `no` | 194 |
| NOINDEX-PROPOSED | `no` | 3 |
| **Total** | | **218** |

The `protected` flag and the `KEEP` decision agree on all 218 rows — 21 `yes`, 197 `no`, zero
disagreements. **Any report stating a protected count other than 21 for this phase is wrong.**

---

## 3. Extraction method and its risks

GSC's performance tables are rendered client-side and **the page keeps stale hidden grids in the DOM after a dimension switch.** An early extraction attempt returned the *queries* grid six times while appearing to have switched dimensions.

**Mitigation applied:** the extractor was rewritten to select only grids with a non-zero bounding box, and every capture was validated against its expected column header (`Top queries` / `Top pages` / `Country` / `Device` / `Day`) before being accepted. Dimension switching was done by URL parameter (`&breakdown=`) rather than by synthetic `.click()`, which did not fire the framework's handlers.

**Anti-pattern explicitly avoided:** no `document.body.innerText` scraping. Row counts were verified against the DOM grid, and all datasets were small enough to render fully without virtualisation.

---

## 4. Query × page joins

The interface does not expose a bulk query×page export. Joins were obtained by applying an **exact-match query filter** (`&query=!<query>`) and reading the resulting pages grid. The filter chip was verified present in the DOM for every join before the data was accepted.

**Scope limit, stated plainly:** only **3 of 92 queries** were joined this way — the top three by impressions, covering 126 of 437 attributed impressions (28.8%). Joining all 92 would require 92 further page loads. `04-cannibalization.md` reports only what was measured; it does not extrapolate to the other 89 queries.

---

## 5. What "not present in retrieved dataset" means

**137 of the 216 sitemap URLs returned no rows.** This is recorded throughout as *"not present in retrieved dataset"* and **never** as "has never had impressions" or "is worthless."

Reasons a URL can be absent that have nothing to do with quality:
- It was published inside or near the 46-day window (**all five free tools shipped 2026-07-16 — only 13 days inside it**).
- It has impressions below GSC's reporting/anonymisation threshold.
- It is indexed but not yet surfacing for anything in a 46-day sample at average position 63.9.
- It serves a strategic or conversion function that search data cannot measure (`/create`, `/privacy`, `/terms`).

**A 46-day window at 609 total impressions cannot distinguish "no demand" from "not yet indexed/ranked."** Every URL decision in `05-url-decisions.md` is qualified accordingly.

---

## 6. URLs found in GSC but absent from the sitemap

Two URLs receive impressions but are not in `sitemap.xml`:

| URL | Clicks | Impr | Position |
|---|---:|---:|---:|
| `/demo` | 0 | 3 | 3.7 |
| `/creators` | 0 | 2 | 8.0 |

Both are indexed and ranking (at genuinely good positions). `/creators` is the creators hub; `/demo` was not in the 216-URL inventory at all. Flagged for investigation in `05-url-decisions.md` — neither should be touched until its role is confirmed.

---

## 7. Baseline archive (Phase 1)

Captured **before** any edit, under `raw/site/`:

- `sitemap.xml`, `robots.txt`, `llms.txt`
- Homepage, `/pricing`, `/shop`, `/faq`, `/about`, `/create`
- Money pages: `/ai-business-system`, `/ai-receptionist`, `/ai-receptionist-for-contractors`, `/ai-automation-agency`, `/custom-ai-app-development`, `/ai-chatbot-development`
- `/tools` hub + **all five free tools**

21 files, **all HTTP 200**, with content-type, byte size and Vercel cache headers recorded in `raw/site/_manifest.json`.

**Repository state at capture:**

| Field | Value |
|---|---|
| Branch | `free-contractor-tools` |
| HEAD | `551b2d7a45d1a95b34e2ed7dde78c1ea300928a2` |
| `origin/main` | `3031d36baae51b05cca0db14557217f1fc5ff9fd` |
| Divergence | 1 ahead / 1 behind main |
| Working tree | Clean except untracked design assets + `research/` |
| Framework | Next.js App Router, deployed on Vercel |
| Sitemap count | 216 URLs |

The earlier Phase-1 evidence in `research/` was **not overwritten**; this phase writes only under `research/gsc-baseline/`.

---

## 8. Data limitations — carry these into every downstream decision

1. **46 days, not 16 months.** No seasonality, no trend, no year-over-year.
2. **609 impressions and 3 clicks.** Statistically tiny. A single position shift moves percentages wildly.
3. **Average position 63.9** — page 6–7. The site is effectively invisible; this measures *near-absence*, not performance.
4. **28.2% of impressions are in withheld queries** — the query list is incomplete by construction.
5. **No search-appearance data** — no rich-result eligibility measured.
6. **Query×page joins cover 3 of 92 queries.**
7. **No conversion data joined.** Vercel Analytics events were not correlated to GSC pages in this phase.
8. **No backlink data.** Still unknown, so "preserve URLs with links" could not be evaluated on evidence.
9. **Interface export, not API.** Granularity is lower than an API pull would give.
10. **The five free tools had ~13 days of possible exposure.** Their zero is uninterpretable.

---

## 9. Credentials

No credential, token, cookie or session value was read, copied, logged, screenshotted or written to any file. Access used the user's already-authenticated browser session. No secret appears anywhere in this deliverable set.
