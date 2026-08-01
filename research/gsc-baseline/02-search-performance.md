# 02 — Search Performance (Measured)

**Window:** 2026-06-14 → 2026-07-29 (46 days) · **All figures measured from GSC. Nothing estimated.**

---

## 1. Totals

| Metric | Value |
|---|---:|
| Clicks | **3** |
| Impressions | **609** |
| CTR | **0.5%** |
| Average position | **63.9** |

Average position 63.9 is **page 6–7 of results**. Combined with 609 impressions over 46 days (~13/day), this does not describe a site that is underperforming. It describes a site that is **effectively not in the index's competitive range at all**.

This is the single most important measured fact in this report, and it reframes everything: **there is no traffic to protect, no ranking to lose, and no CTR to optimise.** The consolidation risk that gated Phase 1 is far smaller than assumed — but so is the value of any on-page optimisation.

## 2. Pages

**81 pages received impressions. 79 of them are among the 216 sitemap URLs → 137 sitemap URLs (63%) returned no rows.**

### The only two pages with clicks

| Page | Clicks | Impr | CTR | Position |
|---|---:|---:|---:|---:|
| `/` | **3** | 60 | 5.0% | **15.4** |
| `/industries` | **1** | 20 | 5.0% | **5.8** |

Both convert at 5% CTR — far above the 0.5% site average — because both rank in a range where clicks are physically possible. `/industries` at **position 5.8** is the best-ranking meaningful page on the site.

*(Note: page-level clicks sum to 4 against a reported total of 3. This is normal GSC cross-dimension de-duplication, recorded as observed.)*

### Top pages by impressions

| Page | Clicks | Impr | Position | Read |
|---|---:|---:|---:|---|
| `/ai-receptionist` | 0 | **146** | 72.5 | Most-seen page. Buried on page 7. Absorbs contractor queries (see `04`) |
| `/ai-chatbot-development` | 0 | **118** | 68.6 | Second-most-seen. Also page 7 |
| `/resources/best-ai-tools-for-contractors` | 0 | **66** | 72.1 | Resource page outranks most money pages on volume |
| `/` | 3 | 60 | 15.4 | **Only page with real clicks** |
| `/resources/is-ai-receptionist-worth-it` | 0 | 25 | 42.4 | Best-positioned resource page |
| `/done-for-you-ai-automation` | 0 | 20 | 51.0 | |
| `/industries` | 1 | 20 | 5.8 | **Best position on the site** |
| `/faq` | 0 | 16 | **6.6** | Ranks well, gets nothing |
| `/ai-receptionist-for-contractors` | 0 | **16** | 71.9 | **The dedicated money page. See §5.** |

### Pages ranking well but starved of impressions

These sit on page 1 but are seen almost never — meaning they rank for queries almost nobody searches, or for very rare long-tail:

| Page | Impr | Position |
|---|---:|---:|
| `/resources/can-ai-run-my-customer-support` | 1 | **1.0** |
| `/industries/consultant-ai-automation` | 2 | **3.0** |
| `/demo` | 3 | **3.7** |
| `/ai-automation-agency` | 10 | **4.3** |
| `/locations/ai-automation-delta-bc` | 3 | **4.3** |
| `/create` | 12 | **4.5** |
| `/ai-business-system` | 11 | **4.5** |
| `/industries` | 20 | **5.8** |
| `/faq` | 16 | **6.6** |
| `/creators/ai-creator-crm` | 7 | **6.9** |
| `/locations/ai-automation-chilliwack-bc` | 7 | **6.9** |

**Interpretation:** the site *can* rank — it ranks page-1 for a dozen things. Those things just have almost no search demand. This is the measured signature of a site targeting terms with no volume, not a site being outranked.

## 3. Countries — Canada leads, but not overwhelmingly

| Country | Clicks | Impr | % of impr | Position |
|---|---:|---:|---:|---:|
| **Canada** | **3** | **302** | **49.6%** | 66.5 |
| **United States** | 0 | **193** | **31.7%** | 64.0 |
| United Kingdom | 0 | 42 | 6.9% | 70.6 |
| Australia | 0 | 31 | 5.1% | 70.8 |
| Other (21 countries) | 0 | 41 | 6.7% | — |

**All 3 clicks are Canadian.** Canada is half of impressions and 100% of clicks, at a *worse* average position than the US.

This **supports the Phase-1 Canada-first recommendation** — but note the US already generates 31.7% of impressions with zero pages built for it. That is incidental capture, and it is a larger share than expected.

## 4. Devices — the most surprising finding

| Device | Clicks | Impr | % of impr | Position |
|---|---:|---:|---:|---:|
| **Desktop** | 2 | **569** | **93.4%** | 64.9 |
| **Mobile** | 1 | 39 | 6.4% | **48.5** |
| Tablet | 0 | 1 | 0.2% | 39.0 |

**93.4% desktop.** For a business targeting contractors — people who are, definitionally, not at a desk — this is a red flag about *who is actually seeing the site*.

Contractors search on phones, from trucks and job sites. A 93% desktop skew is far more consistent with an audience of **other agencies, marketers, researchers and competitors** than with owner-operators of trade businesses.

Note also that mobile ranks **better** (48.5 vs 64.9) and converts better (1 click from 39 impressions = 2.6% CTR vs desktop 0.35%). The small mobile slice is the higher-quality slice.

**This does not prove the audience is wrong — 609 impressions is far too small for that.** It is flagged as the highest-value hypothesis to re-test once volume exists.

## 5. The measured problem with the flagship money page

| Page | Impr | Position |
|---|---:|---:|
| `/ai-receptionist` (generic) | **146** | 72.5 |
| `/ai-receptionist-for-contractors` (exact-match money page) | **16** | 71.9 |

The generic page receives **9× the impressions** of the dedicated contractor page — and as `04-cannibalization.md` shows, the generic page is the one Google serves for the query *"ai receptionist for contractors"*.

The purpose-built, exact-match, strategically-central page is being outcompeted **by another page on the same site**.

## 6. Free tools — zero, and why that means nothing yet

**All five `/tools/*` URLs: 0 impressions.**

They shipped **2026-07-16**, giving them **13 days** inside a 46-day window, on a domain averaging position 63.9. Zero is the expected result, not a verdict.

Per the assignment's own rule — *absence of impressions for a topic the site does not adequately cover is not evidence of absent market demand* — the tools are marked **KEEP-PROTECTED** in `05-url-decisions.md` and must be re-measured after 90 days of exposure.

## 7. What the measured data confirms and contradicts vs. Phase 1

| Phase-1 claim | Measured verdict |
|---|---|
| Site has a proof/entity problem, not a keyword problem | **CONFIRMED.** 3 clicks / position 63.9 is invisibility, which no keyword edit fixes |
| Brand has no entity presence | **CONFIRMED.** Branded queries total 12 impressions (`handbuilt` 9, `hand built` 3) — and `handbuilt` sits at position **41.2**. The site does not reliably rank for its own name |
| 20 receptionist URLs are splitting signal | **PARTLY CONTRADICTED.** Google already picked one URL per query. The problem is it picked the *wrong* one — see `04` |
| Location pages are doorway-risk with no value | **PARTLY CONTRADICTED.** `/locations/ai-chatbot-developer-vancouver` ranks **52.0 vs 77.4** for the money page on the same query — the best-performing location asset on the site |
| Canada first | **SUPPORTED.** 100% of clicks, 49.6% of impressions |
| Quote-follow-up wedge | **WEAKLY SUPPORTED** — see `03` |
| Free tools are the strongest asset | **UNTESTED.** 13 days of exposure, 0 impressions |
