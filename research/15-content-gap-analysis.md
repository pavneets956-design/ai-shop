# 15 — Content Gap and Information-Gain Strategy

**Researched:** 2026-07-31 · **Machine-readable:** `data/content-backlog.csv`

---

## The rule this file enforces

**No content asset is recommended because a competitor has one.** Every item below states what *new* value it adds that does not already exist on the web. If an item cannot pass that test, it is not in the backlog.

By that test, **the site's biggest content problem is not a gap — it is a surplus.** 216 URLs, most of which restate publicly available information. The backlog below is deliberately short: **12 assets**, of which 5 already exist and need promotion rather than creation.

---

## Tier 0 — Already built, badly under-used

The five free tools are the strongest assets on the site and the only genuine information-gain content on it: real calculators, real math, client-side, no login, no API cost. They are also **orphaned from the commercial funnel** and buried under 216 pages.

| Asset | Information gain | Action |
|---|---|---|
| `/tools/missed-call-revenue-calculator` | Every assumption visible and editable — most competitor ROI calculators hide theirs | Anchor `/missed-calls`; link from every trade page |
| `/tools/contractor-quote-follow-up-generator` | Produces usable message sequences, not advice | Anchor `/quote-follow-up` |
| `/tools/contractor-lead-leak-audit` | 12-question diagnostic with a prioritised action plan | Primary lead magnet |
| `/tools/contractor-profit-pricing-calculator` | Markup vs. margin explained correctly — genuinely often got wrong | Link-earning asset for trade communities |
| `/tools/contractor-labor-burden-calculator` | Real burden math | Same |

**Highest-leverage, lowest-cost action in the entire plan: link these from the commercial pages, add `WebApplication` schema, and promote them to trade communities.** No new content required.

---

## Tier 1 — Build first (5 assets)

### 1. One real recorded call ★ highest value in this document
- **Information gain:** virtually every competitor shows a curated demo. Almost nobody publishes an unedited real customer call.
- **Answers:** "Will my customers know it's AI?" / "Does it sound robotic?" — the two severest objections found.
- **Requires:** one client, **written consent from both parties**, PIPEDA-compliant notification.
- **Format:** audio + transcript + `VideoObject`/`AudioObject` schema.
- **Worth more than the next fifty pages.** Nothing else on this list is close.

### 2. `/what-you-own` — ownership and exit page
- **Information gain:** the buyer-checklist literature asks "do I own this?"; **no subscription competitor answers it publicly, because they cannot.**
- **Must cover:** what transfers, whose accounts hold what, what happens if you stop paying, what happens if the builder disappears, how another developer takes over.
- **Structural moat.** Competitors cannot copy this without indicting their own model.

### 3. Build-vs-subscribe payback calculator
- **Information gain:** turns the abstract ownership argument into a date. Input current tool spend → break-even month against a one-time build.
- **Honesty requirement:** it must show the cases where **subscribing wins** — low volume, simple needs, already on Jobber. A calculator that always recommends buying is marketing; one that sometimes says "don't" is a credibility asset and will be shared for that reason.

### 4. `/beyond-platform-ai` — "you already have Jobber's AI receptionist"
- **Information gain:** effectively zero competitor coverage. No vendor writes about the limits of the category they sell.
- **Audience:** buyers who already spent money and are dissatisfied — the highest-converting segment available.
- **Must be fair.** Where the $99 add-on is genuinely sufficient, say so.

### 5. `/trust/call-recording` — Canada + US consent guide
- **Information gain:** applies PIPEDA all-parties consent and CASL's two-year implied-consent clock **specifically to trades workflows** — quote follow-up texts, after-hours callbacks. Generic compliance content exists; trade-specific does not.
- **Caveat required:** not legal advice; verify with counsel. Do not publish state-by-state US specifics without verifying each against primary statute.

---

## Tier 2 — After proof exists (4 assets)

| # | Asset | Information gain | Gate |
|---|---|---|---|
| 6 | **One real case study** (named client, real before/after) | First-party outcome data — the site has none | 1 delivered client + written consent |
| 7 | `/integrations/jobber` + `/integrations/housecall-pro` | Screenshot of a booking actually landing in the platform. Proof, not copy | Working integration |
| 8 | 4 trade pages rebuilt around real clients | Replaces 39 speculative industry pages with 4 credible ones | 1 client per trade |
| 9 | Trade-specific call-flow templates (download) | Real scripts for fencing/landscaping quote intake | Delivered work to base them on |

---

## Tier 3 — Long-term authority (3 assets)

| # | Asset | Information gain |
|---|---|---|
| 10 | **Original response-time / quote-close benchmark study** | The only genuinely new data in this market. Everyone recycles the same unverifiable statistics — see below |
| 11 | AI receptionist evaluation scorecard | A vendor-neutral buying framework earns citations precisely because it is not a pitch |
| 12 | Before/after process maps by trade | Visual, linkable, teaches the buyer what "a system" means |

### On the benchmark study — why it matters more than it looks

This market runs on recycled statistics of poor provenance. The dominant "**62% of contractor calls go unanswered**" figure is attributed to a 2024 ServiceTitan study **that I could not locate a primary source for.** Invoca's 27% is better-sourced but publishes no sample size, methodology or data year.

A study of even **50 Fraser Valley trade businesses** — measuring real answer rates, real callback times, real quote-close rates, with the methodology published — would be the **best-sourced data in the category.** It is the only realistic route to the domain authority this site does not have, and it doubles as the outreach mechanism that finds clients.

---

## Explicitly not recommended

| Not building | Why |
|---|---|
| More `/resources` explainers | 24 already exist; saturated topics |
| More `/compare` pages | 21 already exist; vendor-saturated category |
| More industry pages | 39 already exist with zero delivered work behind any of them |
| More city pages | 19 already exist with no GBP, no citations, no local proof |
| More `/creators` content | Pending the audience decision in `08` and `17` |
| "Best AI receptionist 2026" listicle | Vendor-authored saturation; adds nothing, dilutes entity |
| A blog | There is no content-production capacity problem to solve; there is a proof problem |

---

## Honest limitation of this backlog

Prioritisation here is **reasoned, not measured.** With no search volume, no keyword difficulty and no Search Console data, ordering reflects *commercial intent × competitor density × offer fit × proof feasibility*. Volume data could reorder Tier 2 and Tier 3 — it is very unlikely to reorder Tier 1, because Tier 1 is driven by objection severity and competitive asymmetry rather than by traffic.

The GSC export named in `00-executive-verdict.md` is the input that would upgrade this from reasoning to measurement.
