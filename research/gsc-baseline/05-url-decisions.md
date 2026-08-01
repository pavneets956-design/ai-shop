# 05 — URL Decisions (Re-scored Against Measured Evidence)

**Dataset:** `data/consolidation-decisions.csv` (218 rows — 216 sitemap URLs + 2 URLs found in GSC but absent from the sitemap)
**Every decision below is PROPOSED. Nothing has been executed. No redirect exists. No URL was deleted.**

---

## 1. Revised totals

**Authoritative protected-page count for this phase: 21.** Any "22" below is Phase 1's superseded
figure, shown only to describe what changed. Verified against `data/consolidation-decisions.csv`
(218 rows; `protected=yes` on exactly 21, agreeing with `revised_decision=KEEP` on every row).

| Decision | **This phase (authoritative)** | Change from Phase 1 (superseded) |
|---|---:|---|
| **KEEP (protected)** | **21** | was 22 KEEP — but a *different* set |
| **DEFER** | **194** | was 152 MERGE + 20 PAUSE + 13 NOINDEX + 7 REWRITE + 2 REPURPOSE |
| **NOINDEX (proposed)** | **3** | Calgary, Edmonton, Toronto only |
| **MERGE (executed)** | **0** | was 152 proposed |
| **DELETE** | **0** | unchanged — nothing is ever deleted |

**The headline revision: Phase 1 proposed merging 152 URLs. The measured evidence supports merging none of them yet.**

## 2. Why almost everything is DEFER

Phase 1's consolidation plan rested on an inference — that 216 pages were splitting each other's signal. The measured data does not support that inference (`04-cannibalization.md`), and more importantly, **the dataset is too thin to justify irreversible action**:

- 46 days, not 16 months
- 609 impressions, 3 clicks
- average position **63.9** — the site has essentially no rankings to redistribute
- **137 of 216 URLs returned no rows at all**, which at this window length and position is uninterpretable
- backlink data is still unknown, so "preserve URLs with links" could not be evaluated

Merging 152 URLs on this evidence would be acting on absence-of-data, which the assignment explicitly forbids: *never treat a page with zero clicks as worthless if it has impressions, backlinks, conversions, or a strategically important function.*

**DEFER is not indecision. It is the only defensible call at 46 days.** Re-run this analysis at 90 and 180 days; by then the free tools will have real exposure and the dataset will support real decisions.

## 3. The 21 protected URLs — and why each is protected

### Measured clicks (never redirect)
| URL | Clicks | Impr | Pos |
|---|---:|---:|---:|
| `/` | 3 | 60 | 15.4 |
| `/industries` | 1 | 20 | **5.8** |

### Top impressions / best positions
| URL | Impr | Pos | Why |
|---|---:|---:|---|
| `/ai-receptionist` | **146** | 72.5 | Site's #1 page. **Serves the flagship query** `ai receptionist for contractors`. Phase 1 would have redirected this away. |
| `/ai-chatbot-development` | **118** | 68.6 | #2 page |
| `/resources/best-ai-tools-for-contractors` | **66** | 72.1 | #3 page — a *resource* page outperforming most money pages |
| `/resources/is-ai-receptionist-worth-it` | 25 | **42.4** | Best-positioned resource |
| `/locations/ai-chatbot-developer-vancouver` | 15 | **52.0** | **Outranks its own money page (77.4) on a shared query.** Phase 1 would have noindexed this. |

### Strategic / conversion / legal (search data cannot measure these)
`/create` · `/pricing` · `/about` · `/faq` · `/privacy` · `/terms` · `/tools`

### Free tools — protected on the "too new" rule
`/tools/contractor-profit-pricing-calculator` · `/tools/contractor-quote-follow-up-generator` · `/tools/missed-call-revenue-calculator` · `/tools/contractor-labor-burden-calculator` · `/tools/contractor-lead-leak-audit`

All five shipped **2026-07-16** — 13 days inside a 46-day window on a domain averaging position 63.9. **Zero impressions is the expected result and carries no information.** Re-measure at 90 days.

### Found in GSC, absent from sitemap — investigate before touching
| URL | Impr | Pos |
|---|---:|---:|
| `/demo` | 3 | **3.7** |
| `/creators` | 2 | **8.0** |

Both are indexed and ranking at strong positions. `/demo` was not in the 216-URL inventory at all. **Neither should be altered until its role and its sitemap absence are explained.**

## 4. The three NOINDEX proposals

| URL | Impr | Pos | Reason |
|---|---:|---:|---|
| `/locations/ai-automation-calgary-ab` | 4 | 76.8 | Outside any realistic service area |
| `/locations/ai-automation-edmonton-ab` | 1 | 7.0 | Outside service area |
| `/locations/ai-automation-toronto-on` | 1 | 84.0 | Outside service area |

The assignment is explicit: *do not target Calgary, Edmonton, Toronto, or other unsupported service areas as local service pages.* `noindex` is proposed rather than redirect or delete because it is **fully reversible** and preserves the URLs.

Note the tension worth flagging: Edmonton ranks at position **7.0**, and unprompted Hamilton, Ontario queries appeared in the data (`done-for-you ai hamilton ontario`, `ai lead response hamilton`). There is measurable, if tiny, demand outside BC. The correct response is **remote-delivery content**, not local-service pages — see `06-revised-architecture.md`.

## 5. Reversals of specific Phase-1 recommendations

| Phase-1 said | Measured evidence | Revised |
|---|---|---|
| Merge 9 receptionist URLs **into** `/ai-receptionist-for-contractors` | That page gets 16 impressions and does **not** serve its own exact-match query. `/ai-receptionist` (146 impr) does. | **Blocked.** Owner must choose the canonical — see `07` |
| Noindex 14 location pages | 7 BC location pages have impressions; one outranks its money page by 25 positions | **Reversed for BC.** Only the 3 out-of-area pages proposed for noindex |
| Merge 7 cost pages into `/pricing` | Only 4 have any impressions, all ≤5. No join evidence of collision | **Deferred** |
| Pause/noindex all 20 `/creators` pages | `/creators` hub ranks position 8.0; `/creators/ai-creator-crm` position 6.9 | **Deferred** — this is an audience decision, not an SEO one → `07` |
| Merge 35 industry pages into 4 trades | `/industries` hub is one of only two pages with clicks (position 5.8); `/industries/landscaping-ai-automation` is the best industry page (15 impr, 55.2) | **Deferred.** The hub is an asset |
| Rewrite 4 Tier-1 trade pages | Fencing/decks/concrete pages have zero impressions — untested, not failed | **Deferred pending proof, not pending data** |

## 6. Pages that must NOT be redirected blindly

Beyond the 21 protected, these carry measured signal and would lose it in a merge:

`/done-for-you-ai-automation` (20 impr, 51.0) · `/locations/ai-automation-white-rock-bc` (14, 59.9) · `/industries/landscaping-ai-automation` (15, 55.2) · `/custom-ai-app-development` (14, **10.2**) · `/how-to/automate-customer-replies` (14, 37.4) · `/ai-integration-services` (14, 48.4) · `/ai-business-system` (11, **4.5**) · `/ai-automation-agency` (10, **4.3**) · `/services/ai-workflow-automation` (10, 27.3) · `/ai-lead-follow-up-agent` (10, 79.6)

Several of these sit at positions 4–10 — better than anything Phase 1 proposed consolidating them into.

## 7. Pages with no visible search contribution

**137 sitemap URLs returned no rows.** They are recorded in `data/url-performance.csv` as `in_gsc_dataset=no` with the rationale *"Not present in retrieved dataset (46-day window) — NOT proof of zero lifetime impressions."*

They are **not** recommended for removal. At 46 days and position 63.9, non-appearance is the default state for most of this site, including pages that may perform later.

**Re-measure at 90 and 180 days before any of them is touched.**

## 8. Implementation status

> **ALL DECISIONS ARE PROPOSED. NOTHING IS EXECUTED.**
> No redirect was created. No `noindex` was applied. No URL was deleted. No sitemap entry was changed. `robots.txt` is untouched. The registry architecture and all five free tools are intact.

The only production-affecting change made in this phase is the P0 pricing correction in `lib/data/money.ts`, committed to branch `fix/p0-pricing-contradiction` and **not deployed** — see `09-preview-qa-report.md`.
