# 11 — Local SEO

**Researched:** 2026-07-31 · **Machine-readable:** `data/locations.csv`

---

## 1. The blunt finding

The site has **19 location pages and no Google Business Profile.** That is backwards. GBP signals are reported as the **largest single category of local-pack ranking weight (~32%)**, ahead of on-page (19%), reviews (16%) and links (15%), and the **single strongest individual factor is the primary GBP category**.

*Source: 2025 Local Search Ranking Factors / Whitespark 2026 report, via secondary summary 2026-07-31. Confidence: Moderate — widely cited industry survey, not independently verified here.*

Nineteen city pages without a GBP is investment in the 19% while ignoring the 32%.

## 2. Doorway-page risk — assessed honestly

Google requires a location page to carry **genuine local value**. Current pages appear to be the same service proposition with the city name substituted. Under Google's own guidance that is the definition of a doorway page.

**Mitigating factors** (the risk is real but not acute): the pages are few, the site is small, and prior work reportedly gave the BC cities unique local content. **Aggravating factors:** no GBP, no local citations, no local client, no local proof, and three of the pages (Calgary, Edmonton, Toronto) cover markets where there is no presence at all.

**Recommendation: pause, don't purge.** Keep the pages live, add `noindex` to the 14 with no realistic near-term proof, and retain the five where proof is achievable within two quarters. Do not delete — deleting destroys whatever equity exists and there is no baseline to measure the loss against.

## 3. What a location page must have to earn its URL

A page qualifies only if it carries at least **four** of these, and at least one from the first three:

1. A named local client or a local case study ← **strongest**
2. A real local number or metric from delivered work ← **strongest**
3. Local proof asset — a recorded call from a business in that market ← **strongest**
4. Genuine local market conditions (trade mix, seasonality, permit or licensing specifics)
5. Regional regulatory content (BC-specific, or PIPEDA/CASL applied to that market)
6. Local partnerships or association membership
7. Service availability specifics — drive time, on-site vs. remote
8. Local terminology that actually differs

**On today's evidence, zero of the 19 pages meet this bar.** That is not a criticism of the writing; it is the absence of delivered work.

## 4. Google Business Profile — the actual priority

**Set up as a service-area business (SAB).** Verified requirements as of 2026:

- **Address must be hidden.** Mandatory for any business not serving customers at its location.
- **Radius service areas are no longer supported.** Define by **cities, postal codes or real named areas.**
- Up to **20 service areas**; keep the total boundary within roughly **two hours' drive** of the base.
- **Google evaluates whether ranking behaviour matches the declared service area.** Listing markets you do not realistically serve creates a relevance mismatch that can be flagged.

*Confidence: Moderate-High — consistent across multiple 2026 sources.*

**Direct consequence for this business:** declaring Calgary, Edmonton and Toronto on a Surrey-based SAB profile is **outside the guidance and carries flag risk.** Those three should be handled as remote-delivery content, never as local-intent pages.

**Recommended GBP configuration:**
| Field | Value |
|---|---|
| Primary category | **Software company** — the single highest-weighted local factor; choose deliberately |
| Secondary | Business management consultant / Website designer |
| Service areas | Surrey, Delta, Langley, White Rock, Burnaby, Richmond, Coquitlam, New Westminster, Maple Ridge, Abbotsford, Chilliwack, Vancouver — **12, all inside ~2h** |
| Address | **Hidden** |
| Name | **One name, matching the site exactly** — see §6 |

## 5. Citations and NAP

Currently: **none found.** Priority build, in order — Google Business Profile, Bing Places, Apple Business Connect, Yelp, Yellow Pages Canada, BBB, Surrey Board of Trade, Clutch, DesignRush, and any BC Construction Association or regional Home Builders' Association listing that admits a supplier.

**Every listing must carry an identical Name, Address, Phone.** Which requires first solving the naming problem.

## 6. The naming problem blocks everything here

The business currently presents **three names at once** — visible in the site's own footer:

> `© 2026 HANDBUILT AI · BY AI BUILT BY HAND · AIBUILTBYHAND.COM`

plus "Handbuilt AI Studio" in `llms.txt`.

**Citations, GBP, schema `sameAs` and entity resolution all depend on one consistent name.** Until one is chosen and applied everywhere, every citation built is a weaker signal than it should be, and AI engines have no stable string to attach facts to.

**This is a five-minute decision that gates months of work.** Recommendation and reasoning in `14-geo-ai-search-strategy.md` §3.

## 7. Sequence

| Order | Action | Gate |
|---|---|---|
| 1 | **Choose one brand name.** Apply site-wide. | None — do this first |
| 2 | Create and verify **GBP** as SAB, 12 service areas, address hidden | Name chosen |
| 3 | Build **5 core citations** with identical NAP | GBP live |
| 4 | `noindex` the 14 unprovable location pages; keep 5 | GSC baseline captured |
| 5 | Win **one** Surrey/Fraser Valley reference client | — |
| 6 | Rebuild **one** location page around that real client | Client consent in writing |
| 7 | Request **GBP reviews** from delivered clients | Clients exist |
| 8 | Expand location pages **one per real client**, never speculatively | Proof per market |

**The rule: one location page per market where real work has been delivered.** That is the difference between local SEO and doorway spam, and it is the only version of this that survives contact with Google's guidance.
