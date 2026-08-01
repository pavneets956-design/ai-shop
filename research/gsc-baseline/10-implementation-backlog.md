# 10 — Implementation Backlog

Ordered by dependency, then impact. Every item states what unblocks it and what it unblocks.

---

## NOW — no dependencies, no new data needed

| # | Item | Effort | Impact | Notes |
|---|---|---|---|---|
| **1** | **Owner Decision 1** — standardise the Business tier price | 15 min decision | **HIGH** | 12 live pages currently quote a price the rest of the site contradicts |
| **2** | **Owner Decision 3** — pick one brand name | 15 min decision | **HIGH** | Blocks GBP, all citations, all entity work. Measured: site ranks **41.2** for its own name |
| **3** | **Push `fix/p0-pricing-contradiction`** → Vercel preview → verify → merge | 30 min | **HIGH** | Gate already green. `git push -u origin fix/p0-pricing-contradiction` |
| **4** | Apply Decision 1 across `industries.ts`, `BuildRequestForm.tsx`, `liveTools.ts`, `alwaysAnswering.ts` | 1 h | HIGH | Depends on #1 |
| **5** | Create a single `lib/data/pricing.ts` source of truth; make every surface read from it | 3 h | HIGH | Prevents a fourth recurrence |
| **6** | **Start design-partner outreach** (`08`) — target 3 Fraser Valley fencing/landscaping/concrete firms | Ongoing | **HIGHEST** | **The actual growth lever.** Nothing else moves revenue |

## NEXT — depends on the decisions above

| # | Item | Depends on | Effort | Impact |
|---|---|---|---|---|
| 7 | Google Business Profile as service-area business (12 BC areas, address hidden, primary category *Software company*) | #2 | 2 h + verification wait | HIGH — GBP is ~32% of local-pack weight and does not exist today |
| 8 | `Organization` + `Person` schema with real `sameAs`; full name on `/about` | #2, #7 | 2 h | HIGH — entity resolution |
| 9 | 5 directory citations with identical NAP | #2, #7 | 2 h | MEDIUM |
| 10 | Investigate `/demo` + `/creators` sitemap absence (Decision 7) | — | 30 min | MEDIUM — two of the best-positioned URLs are invisible to the sitemap |
| 11 | Wire the 5 free tools into the commercial funnel; add `WebApplication` schema | — | 2 h | MEDIUM — best value-to-effort on-site action |
| 12 | Build `/quote-follow-up` | — | 1 day | MEDIUM — **only new page with measured demand** (25 impressions, 10 queries, no page today) |
| 13 | `noindex` Calgary / Edmonton / Toronto location pages | — | 15 min | LOW — reversible, assignment-mandated |

## LATER — strategic bets, explicitly unvalidated

| # | Item | Evidence status | Effort |
|---|---|---|---|
| 14 | Build `/what-you-own` | **Zero queries measured.** Competitor-analysis bet only | 1 day |
| 15 | Build `/beyond-platform-ai` | **Zero Jobber queries measured.** Bet only | 1 day |
| 16 | Publish first case study + real recorded call | Blocked on #6 | 1 day after client |
| 17 | `/integrations/jobber` with a real booking screenshot | Blocked on #6 | 1 day |

## AT 90 DAYS (~2026-10-29) — re-measure before deciding

| # | Item | Why it waits |
|---|---|---|
| 18 | **Re-run the full GSC pull** | 46 days → ~136 days. Enough to actually decide |
| 19 | **Re-measure the 5 free tools** | They had 13 days of exposure. Their zero means nothing yet |
| 20 | Query×page joins for the **top 20 queries** | Converts `04-cannibalization.md` from 3/92 to ~80% of impressions |
| 21 | **Backlink pull** | Still unknown. "Preserve URLs with links" is currently unevaluable |
| 22 | Re-derive the consolidation plan for the **194 deferred URLs** | Depends on #18, #20, #21 |
| 23 | Revisit Decision 5 (`/creators` fork) | Creator pages rank 6.9–11.0; too good to kill on 46 days |
| 24 | Re-test the **93.4% desktop skew** | If it holds at volume, the audience assumption is wrong and that changes everything |

## AT 180 DAYS

| # | Item |
|---|---|
| 25 | Execute consolidation on real data — Decision 2 canonical first |
| 26 | Original Fraser Valley response-time benchmark study (needs the design-partner data from #6) |
| 27 | Positioning and redesign — **only after 3 case studies exist** |

---

## Explicitly NOT on this backlog

- **Merging 152 URLs.** The measured evidence does not support it. Deferred, not cancelled.
- **Noindexing the BC location pages.** Contradicted — one outranks its money page by 25 positions.
- **Title/meta rewrites for CTR.** No CTR problem exists; the problem is position 63.9.
- **Chasing positions 4–15.** There are no queries in that band.
- **New industry, city, use-case, how-to or compare pages.** 216 URLs, 3 clicks.
- **Any visual redesign.** Positioning isn't settled and proof doesn't exist.

---

## The one-line summary

**Items 1, 2, 3 and 6 are the week's work.** Three are 15–30 minute decisions that unblock months of downstream work; the fourth is picking up the phone. Everything else waits on either those decisions or on 90 days of data that does not exist yet.
