# 04 — Cannibalization (Measured)

**Scope limit stated first:** query×page joins were run for **3 of 92 queries** — the top three by impressions, covering 126 of 437 attributed impressions (28.8%). The interface offers no bulk query×page export. Everything below is measured; nothing is extrapolated to the other 89 queries.

Dataset: `data/query-page-map.csv`

---

## 1. What was measured

| Query | Impr | Pages receiving impressions | Verdict |
|---|---:|---|---|
| `ai receptionist for contractors` | 50 | **1** — `/ai-receptionist` (71.9) | No cannibalization. **Wrong page selected.** |
| `ai receptionist for construction` | 34 | **1** — `/ai-receptionist` (72.9) | No cannibalization. Same pattern. |
| `custom chatbot development vancouver` | 42 | **2** — `/ai-chatbot-development` (77.4, 29 impr) **+** `/locations/ai-chatbot-developer-vancouver` (**52.0**, 14 impr) | **Genuine cannibalization** |

---

## 2. Finding 1 — the receptionist cluster is NOT cannibalizing. It is mis-targeting.

Phase 1 inferred that **20 URLs targeting the receptionist intent** were splitting signal, and recommended consolidating to 3.

**The measured data does not support that diagnosis.**

For both receptionist queries tested, **exactly one URL received impressions**. Google has already consolidated. It did not get confused by 20 pages.

The actual problem is worse and different: **Google chose `/ai-receptionist` — the generic page — to serve `ai receptionist for contractors`**, while `/ai-receptionist-for-contractors`, the purpose-built exact-match money page, received **zero impressions for its own exact-match query** and only 16 impressions in total across the entire window.

| Page | Total impr | Position | Serves the flagship query? |
|---|---:|---:|---|
| `/ai-receptionist` | **146** | 72.5 | **Yes** |
| `/ai-receptionist-for-contractors` | 16 | 71.9 | **No** |

**Why this matters for the consolidation plan:** merging 20 URLs *into* `/ai-receptionist-for-contractors` — the Phase-1 recommendation — would consolidate into the page Google currently ignores, and would redirect away the page Google actually ranks (`/ai-receptionist`, the site's #1 page by impressions).

**That would have been an own goal, and the measured data caught it.** This is the clearest example in this phase of why the Phase-1 plan was correctly gated behind evidence.

**Revised direction:** either (a) make `/ai-receptionist-for-contractors` the canonical and redirect `/ai-receptionist` into it — accepting temporary loss of the site's highest-impression URL — or (b) accept Google's choice, make `/ai-receptionist` the contractor-focused canonical, and fold the contractor page into it. **This is a real decision with a real trade-off and it belongs to the owner** → `07-owner-decisions.md`.

## 3. Finding 2 — genuine cannibalization, and the location page is winning

`custom chatbot development vancouver` (42 impressions) is served by **two** URLs:

| Page | Impr | Position |
|---|---:|---:|
| `/ai-chatbot-development` | 29 | 77.4 |
| `/locations/ai-chatbot-developer-vancouver` | 14 | **52.0** |

The **location page ranks 25 positions better** than the money page for the money page's own query.

Phase 1 recommended `noindex` for 14 location pages and merging the rest, on the reasoning that they were doorway pages with no local proof. **For this URL, that recommendation is contradicted by measurement.** `/locations/ai-chatbot-developer-vancouver` is:
- the site's **10th-highest page by impressions** (15 total),
- ranking **52.0** where its money-page counterpart ranks 77.4,
- capturing a genuinely commercial local query.

**It must be protected from consolidation.**

More broadly, the location cluster performs better than Phase 1 assumed:

| Location page | Impr | Position |
|---|---:|---:|
| `/locations/ai-chatbot-developer-vancouver` | 15 | **52.0** |
| `/locations/ai-automation-white-rock-bc` | 14 | 59.9 |
| `/locations/ai-automation-chilliwack-bc` | 7 | **6.9** |
| `/locations/ai-receptionist-surrey-bc` | 6 | 18.7 |
| `/locations/ai-automation-agency-surrey-bc` | 5 | 17.2 |
| `/locations/ai-automation-burnaby-bc` | 4 | **13.3** |
| `/locations/ai-automation-delta-bc` | 3 | **4.3** |

Seven location pages with impressions, several at strong positions. `/locations/ai-automation-delta-bc` at position **4.3** is among the best-ranking pages on the site.

**Revised: do not noindex the BC location pages.** The Calgary/Edmonton/Toronto pages (4, 1 and 1 impressions, positions 76.8 / 7.0 / 84.0) remain out of scope as local-service targets per the assignment's explicit instruction — but they should be `noindex`ed or reframed as remote-delivery content, **not deleted.**

## 4. Multiple URLs on the same query — full extent unknown

Only 3 queries were joined. **1 of 3 (33%) showed two URLs receiving impressions.** Whether that rate holds across the other 89 queries is **unmeasured**.

Candidate clusters where cannibalization is *plausible but unverified*, based on overlapping page-level impressions:

- `/ai-chatbot-development` (118) vs `/ai-chatbot-for-small-business` (3) vs `/locations/ai-chatbot-developer-vancouver` (15) — chatbot cluster, **1 confirmed collision**
- `/resources/is-ai-receptionist-worth-it` (25, pos 42.4) vs `/ai-receptionist` (146) — the query `is an ai receptionist worth it?` (15 impr, pos 45.8) closely matches the resource page's position, suggesting the resource page serves it cleanly
- `/resources/best-ai-tools-for-contractors` (66) vs `/ai-receptionist-for-contractors` (16) — both target contractor intent

**Recommended before any consolidation:** run query×page joins for the top ~20 queries (≈20 page loads). That covers roughly 80% of attributed impressions and would convert this section from partial to substantially complete.

## 5. Net revision to the Phase-1 cannibalization thesis

| Phase-1 claim | Measured verdict |
|---|---|
| 20 receptionist URLs split signal → consolidate to 3 | **NOT SUPPORTED.** Google serves one URL per query already |
| Consolidate into `/ai-receptionist-for-contractors` | **ACTIVELY RISKY.** That page doesn't rank; `/ai-receptionist` does |
| 7 cost pages cannibalize | **UNTESTED.** Only 4 of them have any impressions, all ≤5 |
| Location pages are doorway-risk, noindex 14 | **CONTRADICTED for BC.** 7 have impressions; one is the site's best local performer at position 52.0 vs 77.4 for its money page |
| Chatbot cluster splits signal | **CONFIRMED** — the one genuine collision measured |

**Bottom line:** the site's problem is not that 216 pages fight each other. It is that 216 pages, fighting or not, sit at average position 63.9. Cannibalization is a real but **minor** issue here, and the Phase-1 consolidation plan would in at least two specific cases have destroyed the site's better-performing URLs.
