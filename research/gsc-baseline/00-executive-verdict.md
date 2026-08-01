# 00 — Executive Verdict (Evidence Gate)

**Executed:** 2026-07-31 · **Phase:** Evidence gate · **Production changes: zero**

---

## The verdict in one paragraph

The blocker that gated Phase 1 is now closed, and the answer is not the one anyone wanted: **there is no 16-month dataset. The property holds 46 days — 2026-06-14 to 2026-07-29 — containing 3 clicks and 609 impressions at an average position of 63.9.** That is not an underperforming site; it is a site that is not yet in the competitive index at all. The measured data does three things. It **confirms** the Phase-1 strategic diagnosis — the site ranks 41.2 for its own brand name, which is entity invisibility measured rather than inferred. It **contradicts** the Phase-1 tactical plan — Google has already consolidated the receptionist cluster to one URL per query, it picked `/ai-receptionist` (146 impressions) over the purpose-built `/ai-receptionist-for-contractors` (16), and the Phase-1 merge would have redirected away the site's best page in favour of one Google ignores. And it **quietly rescues** two things Phase 1 wanted to discard: the BC location pages (one of which outranks its own money page 52.0 to 77.4) and the creators cluster (positions 6.9–11.0, the best on the site). Consequently the consolidation plan shrank from 152 merges to **zero executed, 194 deferred, 21 protected, 3 noindex-proposed** — because acting on 46 days of near-zero data would be acting on absence, not evidence. One indisputable P0 was repaired: `/ai-business-system` was publishing three mutually exclusive prices, two self-refuting, and feeding the contradiction into `llms.txt` where AI engines read it. That is fixed, verified in the built output, and sitting on a branch awaiting your push.

---

## Exact GSC period retrieved

| Field | Value |
|---|---|
| Property | `https://aibuiltbyhand.com/` (URL-prefix) |
| Requested | 16 months |
| **Retrieved** | **2026-06-14 → 2026-07-29 (46 days)** |
| Method | Authenticated browser interface, DOM extraction — **not** API |
| Verification | Property total **3 clicks / 609 impressions**, confirmed by the country and device exports (both sum exactly). The page and query exports are **not** additive to it — see the reconciliation note below. |

## Data limitations

1. **46 days, not 16 months** — no seasonality, no trend, no YoY.
2. **609 impressions / 3 clicks** — statistically tiny.
3. **Average position 63.9** — measures near-absence, not performance.
4. **28.2% of impressions (172) are in withheld/anonymised queries.**
5. **Query×page joins cover 3 of 92 queries** (28.8% of attributed impressions).
6. **No search-appearance data** — no rich-result types recorded.
7. **137 of 216 URLs returned no rows** — uninterpretable at this window and position.
8. **No backlink data** — "preserve URLs with links" remains unevaluable.
9. **The 5 free tools had 13 days of exposure** — their zero carries no information.
10. **No conversion data joined** to GSC pages.

## Top measured opportunities

| # | Opportunity | Evidence |
|---|---|---|
| 1 | **Quote / estimate follow-up** | **25 impressions across 10 distinct queries with no page targeting the intent.** Unassisted capture — the best-evidenced new page |
| 2 | **Fix the receptionist canonical** | `/ai-receptionist` gets 146 impressions and serves the flagship query; the exact-match page gets 16 and serves none |
| 3 | **`/industries` hub** | 1 click at **position 5.8** — the best-ranking meaningful page on the site |
| 4 | **`/locations/ai-chatbot-developer-vancouver`** | Position **52.0** vs 77.4 for its money page on a shared query |
| 5 | **Brand entity** | `handbuilt` ranks **41.2**. The site does not reliably rank for its own name |
| 6 | **Landscaping** | Best industry page: 15 impressions, position 55.2, plus 3 landscaping queries |

**Not an opportunity:** there are **no queries at positions 4–15**. The standard "push near-page-1 terms over the line" play does not apply — nothing is in range.

## Pages protected from consolidation

**21 URLs.** Full rationale in `05-url-decisions.md`.

- **Measured clicks (page-aggregated):** `/` (3 clicks, pos 15.4) · `/industries` (1 click, pos 5.8) — these sum to 4 against a property total of 3; that is expected GSC behaviour, not a data error (see reconciliation note)
- **Top impressions:** `/ai-receptionist` (146) · `/ai-chatbot-development` (118) · `/resources/best-ai-tools-for-contractors` (66) · `/resources/is-ai-receptionist-worth-it` (25, pos 42.4)
- **Outranks its own money page:** `/locations/ai-chatbot-developer-vancouver` (pos 52.0)
- **Strategic/legal:** `/create` · `/pricing` · `/about` · `/faq` · `/privacy` · `/terms` · `/tools`
- **Too new to judge:** all 5 `/tools/*` (shipped 2026-07-16, 13 days of exposure)
- **Indexed but missing from sitemap:** `/demo` (pos 3.7) · `/creators` (pos 8.0)

## Revised URL totals by action

| Action | **This phase (authoritative)** | Phase 1's superseded count (for comparison only) |
|---|---:|---:|
| **KEEP (protected)** | **21** | 22 |
| **DEFER** | **194** | — |
| **NOINDEX (proposed)** | **3** | 33 |
| **MERGE (executed)** | **0** | 152 proposed |
| **DELETE** | **0** | 0 |

> **The authoritative protected-page count is 21.** The `22` above is Phase 1's superseded figure,
> shown only for comparison — the two columns were never competing claims about the same thing, but
> the old header (`Phase 1 had`) was ambiguous enough to read as a contradiction. Verified against
> `data/consolidation-decisions.csv`: 218 rows, `protected=yes` on exactly 21, and the `protected`
> flag agrees with `revised_decision=KEEP` on every row.

---

## Data reconciliation — why some tables do not sum to 3 / 609

**Corrected 2026-08-01. No figure was silently altered; one prose claim was wrong and is now fixed.**

The property total is **3 clicks / 609 impressions**. Two exports are deliberately non-additive to it:

| Export | Rows | Clicks | Impr | Cause |
|---|---:|---:|---:|---|
| Country | 25 | 3 | 609 | — matches (property-aggregated) |
| Device | 3 | 3 | 609 | — matches (property-aggregated) |
| **Query** | 92 | **0** | **437** | **Query privacy** — anonymised queries have no table row but count in the total. All 3 clicks sit in that withheld bucket. |
| **Page** | 81 | **4** | **803** | **Page-level aggregation** — the table aggregates by page, the total by property. One SERP showing several of the site's URLs is 1 property impression but N page impressions. |

So `/` (3 clicks) + `/industries` (1 click) = 4 page-clicks against 3 property clicks, and 803 vs 609
impressions. Both are expected GSC behaviour. **The earlier claim in
`01-methodology-and-provenance.md` that page impressions were "609-consistent" was a reporting
mistake — they always summed to 803 in `raw/gsc/pages-raw.tsv`, which was never edited.**

Date-range skew, duplicated rows and applied filters were checked and ruled out. Full detail:
`01-methodology-and-provenance.md` §2 · machine-readable: `data/reconciliation.csv` · `data/_README.md`.

## P0 fixes completed

**One:** the `/ai-business-system` pricing contradiction — five strings in `lib/data/money.ts`.

Before: `description` said `$2,500–5,000`, `answer` said `$3,500–5,000 (typically $7,500)`, `gets` said `$2,500–5,000 (typically $7,500)`, two FAQs disagreed again, and JSON-LD said `3500`. Three of those are arithmetically impossible.

After: **`$3,500–$7,500 CAD` × 21 in the built page, zero contradictions, JSON-LD consistent.** The value was not invented — it is what `money.ts` itself already said at lines 387/409, and what the homepage, `/pricing`, `faqs.ts` and `_industries_b.ts` all say.

**Deliberately not fixed:** `industries.ts` quotes `$2,500–5,000` on 12 live pages. That is a pricing decision, not a typo → `07-owner-decisions.md` Decision 1.

## Preview URL and commit SHA

| Field | Value |
|---|---|
| Branch | `fix/p0-pricing-contradiction` |
| Commit | **`97286f0`** |
| Base | `free-contractor-tools` @ `551b2d7` |
| **Preview URL** | **None — branch not pushed** |

The Vercel CLI is not installed here, and pushing is an outward-facing action requiring your authorisation. To create the preview: `git push -u origin fix/p0-pricing-contradiction`. QA checklist in `09-preview-qa-report.md`.

## Tests performed and results

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ **0 errors** |
| `npx vitest run` | ✅ **114 passed / 0 failed** |
| `npx next lint` | ✅ **0 errors / 0 warnings** |
| `npx next build` | ✅ **exit 0** (via `rtk proxy` — RTK's reporter emits a false "Errors: 2") |
| Built-output price audit | ✅ 21× `$3,500–$7,500`, zero contradictions |
| Repo-wide contradiction scan | ✅ **NONE** |
| Production archive | ✅ 21 files, all HTTP 200 |

## Production change status

> **ZERO.** Not merged · not pushed · not deployed · no redirect created · no `noindex` applied · no URL deleted · sitemap unchanged at 216 · `robots.txt` untouched · all 5 free tools intact · registry architecture intact.

## Remaining owner decisions

| # | Decision | Urgency |
|---|---|---|
| 1 | Business tier price — 12 pages quote a contradicted number today | **HIGH** |
| 2 | Which receptionist page is canonical — blocks the 9-URL merge | **HIGH** |
| 3 | One brand name — blocks GBP, citations, all entity work | **HIGH** |
| 4 | Whether "HANDBUILT AI" survives | Follows #3 |
| 5 | `/creators` fork — **recommend defer**, they rank 6.9–11.0 | LOW |
| 6 | Headline & packaging | After proof |
| 7 | `/demo` + `/creators` sitemap absence | MEDIUM |

**Note a genuine reversal:** Phase 1 recommended the brand name "AI Built By Hand" on domain-match logic. The measured data shows people actually search **`handbuilt`** (9 of 12 branded impressions). I now lean **"Handbuilt AI"** — matching human search behaviour beats matching the domain string. Your call, but the evidence moved.

## The single best next action

**Sign three design partners.** (`08-design-partner-plan.md`)

The site earned **3 clicks in 46 days**. No architecture change, redirect plan, title rewrite or new page alters that in any near horizon — the measured position of 63.9 says the site is not in contention for anything. Every high-value item in the backlog is gated on proof: the case study, the recorded call, the integration screenshot, the benchmark study, and the credibility to charge full price.

Three discounted builds for Fraser Valley fencing, landscaping or concrete firms — traded explicitly for named case studies, recorded calls and before/after numbers — is the only action here that changes the business rather than the website.

The two 15-minute decisions worth making alongside it: **the price** and **the brand name**. Both are free, both are blocking, and neither needs more data.

---

## Final gate

> **CONDITIONALLY READY — OWNER DECISIONS REQUIRED**

The evidence blocker is closed: GSC was retrieved in full, and the finding is that only 46 days exist. That is an answer, and waiting will not improve it — only elapsed time will.

What now blocks positioning and redesign is not evidence but **three owner decisions** (price, receptionist canonical, brand name) and **the absence of proof**. All three decisions are free and take minutes. The proof takes a quarter.

**Do not begin redesign or page production.** Do make the three decisions, push the P0 fix, and start the design-partner outreach. Re-run this entire analysis at 90 days (~2026-10-29), when the free tools will have had real exposure and the dataset will finally be large enough to decide the fate of the 194 deferred URLs.
