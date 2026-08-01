# 03 — Autocomplete and Related Searches

**Collected:** 2026-08-01 · Google `suggestqueries` (`client=firefox`) + Bing `osjson`
**Volume:** 2,400 requests · 2,400 OK · **0 failed · 0 blocked · 0 throttle events** · 8,822 suggestions returned
**Unique suggestions:** 3,660 Canada · 3,773 United States
**Raw:** `raw/autocomplete/*.jsonl` · **Tables:** `derived/suggestions-CA.tsv`, `derived/suggestions-US.tsv`

**Label: `[D]` throughout.** Autocomplete proves a string is typed often enough for Google to suggest it. It does not measure how often. There is no volume data in this study — see `01-methodology-and-provenance.md`.

---

## 1. Terminology head-to-head — the most actionable table here

Count of *distinct suggestions containing the term*:

| Term | Canada | US | Verdict |
|---|---:|---:|---|
| **missed call** | **347** | 347 | Largest cluster measured |
| **receptionist** | **333** | 345 | Dominant for the phone product |
| **contractor** | **283** | 298 | Use this word |
| **answering service** | **270** | 275 | Near-equal to "receptionist" — use both |
| **crm** | 160 | 172 | Significant |
| **quote** | **104** | 111 | — |
| **estimate** | **23** | 24 | — |
| ai automation | 14 | 14 | Weak as a search term |
| **home service** | **1** | 2 | Effectively zero |
| tradesman / tradie | 1 | 1 | Not Canadian vocabulary |

### Three decisions fall straight out of this

**"Quote" beats "estimate" 104 : 23** in Canada — roughly 4.5 : 1. The site should say *quote* in headlines and tool names. "Estimate" belongs in body copy as a synonym, because it still appears in PAA phrasing.

**"Home service business" is dead vocabulary — 1 suggestion.** "Contractor" is at 283. Any copy that leads with "home service business" is speaking vendor language to nobody.

**"AI automation" is weak at 14.** It is how the business describes itself; it is not how customers search. Real searches are problem-shaped (`missed call`, `quote follow up`) or product-shaped (`receptionist`, `answering service`), not category-shaped.

---

## 2. Canada vs United States

3,598 suggestions are shared. Only **62 are Canada-only** and **175 US-only**. Vocabulary is ~98% identical; the differences are instructive rather than large.

### Canada-only — dominated by Jobber as a *company*

`jobber toronto` · `jobber vancouver office` · `jobber kitchener` · `jobber headquarters` · `jobber grants program` · `jobber home depot` · `is jobber canadian` · `jobber careers canada` · `jobber outage` · `jobber download` · **`how to cancel jobber`**

Two readings. First, **Jobber is a Canadian company** with real brand-navigation volume here — so "we're local / we're Canadian" does not differentiate against the incumbent, and any messaging built on that is weaker than it looks. Second, `how to cancel jobber` and `jobber outage` are genuine churn signals, and they are Canada-specific.

Canada also skews cheaper: `affordable answering service`, `cheap phone answering service`, `cheap telephone answering service`.

### US-only — a more developed AI-receptionist category

`ai voice agent receptionist` · `best ai phone receptionist` · `ai phone answering service cost` · `ai receptionist for dental office` · `ai law receptionist` · `ai receptionist free trial` · `ai voice receptionist reddit` · `business automation installation service` · `business process automation services`

The US has vertical-specific AI-receptionist demand (dental, law) and mature category language ("voice agent", "installation service"). Canada does not yet. **The category is roughly one cycle earlier here** — which is both the opportunity and the reason demand looks thin.

---

## 3. The "free" cluster is enormous — and it cuts both ways

Dozens of variants: `ai receptionist free` · `ai answering service free` · `ai receptionist app free` · `ai receptionist builder free` · `construction crm free` · `construction software free` · `free jobber alternatives` · `best free jobber alternatives` · `can i use jobber for free` · `is housecall pro free` · `ai for construction estimating free` · `roofing estimate software free download`

**Supports** the free-tools strategy as the acquisition wedge — it is clearly how this audience enters the market.
**Warns** that a large share of this demand has no budget at all. Free-tool traffic should be measured on downstream diagnosis bookings, not on sessions.

---

## 4. Cost vocabulary

`how much does an answering service cost` · `answering service cost per month` · `answering service for small business cost` · `24 hour answering service cost` · `after hours answering service cost` · `answering service pricing` · `ai receptionist cost` · `ai receptionist cost per month` · `ai receptionist pricing` · `ai consultant hourly rate` · `ai contractor pricing` · `ai contractor rate` · `cheap ai receptionist` · `cheap ai answering service`

**"Answering service" carries more cost-variants than "AI receptionist"** — people price-shop the familiar category, then discover the AI one. Pricing copy should name both.

`ai consultant hourly rate` and `ai contractor rate` are the wrong frame for this business (project pricing, not hourly) and should not be chased.

---

## 5. Fear and objection language

Genuine, from live autocomplete: `will ai replace construction workers` · `jobber not working` · `why is jobber not working` · `housecall pro not working` · `housecall pro notifications not working` · `is housecall pro safe` · `how to cancel jobber` · `how to turn off ai receptionist on iphone`

**Honest caveat:** my intent classifier tagged 13 CA suggestions as "objection" and most were noise — `my automatic recliner is not working`, `power automate my clipboard not working`. The regex over-matched on "not working". The genuine objection signal in autocomplete is **thin**; the strong objection evidence in this study comes from Reddit and PAA, not autocomplete. See `05-customer-language.md`.

---

## 6. Noise contamination to be aware of

`jobber drill` · `jobber term` · `jobber to the stars` — "jobber" is also a drill-bit length and professional-wrestling slang.
`missed call does katie die` · `answering service gerald levert lyrics` — entertainment collisions.
`ai receptionist for contractors salary` · `ai receptionist for contractors jobs` (from related searches) — **job-seeker intent inside our core product query.**

That last one matters: a share of traffic to `ai receptionist for contractors` is people looking for a *job*, not a service. It depresses the real commercial value of the term and argues for the cost-framed variant (`how much does an ai receptionist cost`) as the better target.

---

## 7. Empty results — verified genuine

1,344 of 2,400 requests returned zero suggestions, and **all 1,344 are trusted empties** (`emptyTrusted: true`): a control query was re-issued every 40 requests and never failed, so no empty was recorded while throttled.

Most empties come from alphabet-soup expansion of long phrases, which is a study-design artefact rather than a finding — see `01-methodology-and-provenance.md`, Trap 1. The useful negative signal is narrower: highly specific five-word contractor-AI phrases mostly have **no** autocomplete presence at all, which is consistent with an early-stage category.
