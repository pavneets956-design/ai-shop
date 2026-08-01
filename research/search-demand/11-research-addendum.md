# 11 — Research Addendum (second pass)

**Collected:** 2026-08-01, after `00`–`10`. Same provenance rules as `01`.
**Purpose:** close the gaps that were realistically closable, and convert untested limitations into tested ones.

---

## 1. THE correction: first-party GSC overturns a phase-1 recommendation

`00-executive-verdict.md` recommended **quote follow-up** as the first product and *"Quotes go quiet. Calls get missed."* as the H1, reasoning from autocomplete breadth (`missed call` = 347 variants, the largest cluster measured).

The project already contains a Google Search Console export at `research/gsc-baseline/raw/gsc/queries-raw.tsv` — **92 real queries the site earned impressions for**, 2026-06-14 → 07-29. That is first-party `[V]` evidence and it outranks every directional signal in this study.

Clustered by impressions (437 total in the query table):

| Cluster | Impressions | Share | Queries | Best position |
|---|---:|---:|---:|---:|
| **AI receptionist / answering** | **168** | **38.4%** | 20 | 18.0 |
| Chatbot (mostly Vancouver) | 105 | 24.0% | 12 | 69.0 |
| **Vancouver / Surrey / BC local** | **92** | **21.1%** | 6 | 69.0 |
| Lead follow-up | 41 | 9.4% | 10 | 48.0 |
| Non-contractor verticals (physio, gym, PT) | 17 | 3.9% | 7 | 41.0 |
| Done-for-you | 16 | 3.7% | 4 | 39.0 |
| Brand ("handbuilt") | 12 | 2.7% | 2 | 41.2 |
| **Quotes / estimates** | **8** | **1.8%** | 3 | 81.0 |
| **Missed call** | **2** | **0.5%** | 2 | 68.0 |

The site has had a quote-follow-up tool and a missed-call calculator live this whole window. They earn **8 and 2 impressions**. The receptionist cluster earns **168**.

### Why the two signals disagreed, resolved

YouTube autocomplete (new this pass, `raw/youtube/`) explains it. Per-term builder-vs-buyer intent:

| Term | Builder intent | Buyer intent | Builder examples |
|---|---:|---:|---|
| `ai receptionist` | **50%** | 0% | `ai receptionist n8n`, `ai receptionist agency`, `ai receptionist tutorial` |
| `missed call text back` | **50%** | 0% | `missed call text back high level`, `missed call text back n8n` |
| `ai voice agent` | 39% | 0% | `ai voice agent n8n`, `ai voice agent ghl` |
| **`ai receptionist for contractors`** | **0%** | **100%** | — |
| `ai answering service` | 9% | 91% | `sell ai answering service` |

**`missed call text back`'s 347 autocomplete variants are largely agency vocabulary** — people learning to build and resell these systems with n8n and GoHighLevel. Not contractors. This matches the Reddit thread found in `05`: *"Do any of you get sales calls for missed call text back services?"*

**Rule that falls out of this:** the bare head terms are saturated with implementers. The **`for contractors` / trade qualifier flips intent to 100% buyer**. Never target `ai receptionist` or `missed call text back` bare.

### Revised recommendation

**Lead with AI receptionist + Surrey local. Not quote follow-up.**

Quote follow-up keeps genuine *question* evidence (the most-repeated PAA question in the study) and stays a legitimate tool and content play — but it is not the hero, and the homepage H1 should not be built on it.

---

## 2. The single best opportunity in the dataset

`is an ai receptionist worth it?` — **21 impressions across three phrasings, best position 45.8.**

It is simultaneously:
- a first-party GSC query with real impressions `[V]`
- a live PAA question on `how much does an ai receptionist cost` `[V]`
- a live PAA root of its own `[V]`
- the highest-positioned commercially-relevant query the site has

Live SERP for it (`raw/serp/CA-paa-tree-receptionist-worth-it.json`): AI Overview ✔, ads ✔, **Reddit at #1 and #2**, and three Canada-targeted competitor articles — `heyjodie.com` ("Best AI Receptionist Canada 2026: Ranked and Compared"), `polarisvoice.ca` ("A Practical Guide for Canadian…"), `therebelchick.com` ("Is an AI Receptionist Worth It for a Canadian Small Business").

Its PAA: *Is AI receptionist legit?* · *Will receptionists be replaced by AI?* · *How much should I charge for an AI receptionist?* · *What does an AI receptionist do?*

> *"Is AI receptionist legit?"* is a **trust/scam** question. That is the emotional register of this buyer, and it argues for the plainest, least-salesy treatment possible.

---

## 3. PAA depth — now tested, not assumed

`02-question-trees.md` listed levels 2–3 as `[U]` because expansion had not been attempted. **It has now been attempted and it does not work.**

On `is an ai receptionist worth it`: 5 click-expansions performed, **0 new questions**.
On `quote follow up for contractors`, three techniques in sequence:

| Technique | Result |
|---|---|
| A — click each `[data-q]` host element | 5 → 5, no change |
| B — click all 16 `aria-expanded="false"` controls | 5 → 5, no change |
| C — scroll to page bottom for lazy-append | 5 → 5, no change |

**Conclusion:** in Google's current Canadian SERP layout, People Also Ask on these queries is level 1 only. This is a property of the SERP, not a collection failure. Raw log: `raw/serp/CA-paa-tree-quote-followup.json`.

This is the honest answer to the brief's request for level 2–3 branches: they were pursued with three methods and **they are not there to collect**.

---

## 4. Sources attempted this pass

| Source | Method | Result |
|---|---|---|
| **YouTube autocomplete** | `suggestqueries-clients6.youtube.com`, 20 seeds × 2 markets | ✅ **40/40 OK, 177 unique suggestions** — the builder/buyer split above |
| **GSC export (in-project)** | `research/gsc-baseline/raw/gsc/` | ✅ 92 queries mined — the most valuable dataset found |
| PAA click-expansion | 3 techniques, 2 SERPs | ✅ ran; **result is "no depth exists"** |
| Google Trends | `trends.google.com/trends/api/explore`, 2 attempts with CA geo | ❌ **HTTP 429** both times |
| G2 | `g2.com/products/jobber/reviews` | ❌ **HTTP 403** |
| Capterra (.com) | `capterra.com/p/151096/Jobber/reviews/` | ❌ **HTTP 403, Cloudflare "Just a moment"** |
| Capterra / GetApp (.ca) | redirect-following | ❌ product IDs resolved to unrelated products; Cloudflare markers present |
| 12 trade + topic SERPs | fetch channel | ❌ **all 12 hit the throttle ceiling**, recorded as failures |

**Fresh GSC:** not available. The in-project export covers 2026-06-14 → 07-29 only. A current export requires the owner's authenticated browser session. **This remains a named blocker** — see `00` §Recommended next actions.

---

## 5. Trade coverage — answered from first-party data instead

The 12 trade SERPs (`ai tools for electricians|plumbers|landscapers|hvac|general contractors`) failed to collect. However GSC already shows which trades produce impressions for this site:

`ai receptionist for carpenters` (5) · `ai chatbot for drywall contractors` (4) · `ai answering service for builders` (4) · `ai receptionist for trades` (8) · `ai receptionist for tradespeople` (2) · `ai receptionist for handyman services` (1) · `ai receptionist for building contractors` (1) · `ai automation for landscaping companies` (1) · `ai follow up for landscapers` (1) · `automation tools for landscaping businesses` (1) · `ai automation for subcontractors` (1) · `painter voice assistant` (2)

**Reading `[I]`:** trade-qualified receptionist demand is broad and thin — many trades, 1–8 impressions each. That argues for **one strong receptionist page with trade variants**, not a page per trade. It also confirms the qualifier pattern from §1: every one of these is `<thing> for <trade>`, never bare.

---

## 6. Unexpected finding: the Vancouver chatbot cluster

The site's **#2 query overall is `custom chatbot development vancouver` (42 impressions)**, plus `ai chatbot development vancouver` (29), `ai chatbot development in vancouver` (8), `custom chatbot development canada` (9), `chatbot consulting vancouver` (1). **Chatbot ≈ 105 impressions, 24% of the query table** — and it is overwhelmingly *Vancouver*-qualified.

This was not in any phase-1 recommendation and is not in the current homepage positioning at all. Combined with `ai services surrey` (11 impr) and the two AI-Overview-free Surrey SERPs, **local + a named deliverable ("chatbot", "receptionist") is where this site already has traction.**

`[I]` Caveat: impressions at position 69–92 mean nobody is clicking. This is latent, not proven, demand — but it is first-party and it is the strongest latent signal available.

---

## 7. Updated collection totals

| | Count |
|---|---:|
| SERPs attempted | 62 |
| **SERPs usable** | **34** |
| SERPs failed (recorded as failures) | 28 |
| Autocomplete requests (Google+Bing) | 2,400 |
| YouTube autocomplete requests | 40 |
| Reddit searches | 14 (334 posts) |
| GSC queries mined | 92 |

Nothing in the 28 failures is counted as evidence of anything.
