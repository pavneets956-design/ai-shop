# 01 — Current Site Audit

**Crawled:** 2026-07-31, live production (`https://aibuiltbyhand.com`)
**Method:** live fetch of `/sitemap.xml`, `/robots.txt`, `/llms.txt` and four key HTML pages; cross-referenced against the repository's page registry (`lib/data/registry.ts`) on branch `free-contractor-tools`.
**Raw evidence:** `raw/site-sitemap-2026-07-31.xml`, `raw/site-llms-2026-07-31.txt`

---

## 1. Inventory

**216 indexable URLs** in the sitemap. Homepage returns 200. Sitemap returns 200 (`application/xml`, 40,257 bytes), last modified `2026-07-16T05:19:47Z`.

| Page type | Count | Hub | Sitemap priority |
|---|---:|---|---|
| Core / static | 17 | — | 1.0 / 0.9 |
| Free tools | 5 | `/tools` | — |
| Money pages | 12 | `/services` | 0.9 |
| Services | 25 | `/services` | 0.8 |
| Industries | 39 | `/industries` | 0.8 |
| Creators | 20 | `/creators` | 0.8 |
| Locations | 19 | `/locations` | 0.75 |
| Resources | 24 | `/resources` | 0.7 |
| Use-cases | 25 | `/use-cases` | 0.7 |
| How-to | 9 | `/how-to` | 0.6 |
| Compare | 21 | `/compare` | 0.6 |
| **Total** | **216** | | |

Core/static: `/`, `/services`, `/industries`, `/locations`, `/solutions`, `/use-cases`, `/resources`, `/how-to`, `/compare`, `/pricing`, `/shop`, `/tools`, `/faq`, `/about`, `/create`, `/privacy`, `/terms`.

### Architecture note
Pages are data-driven, not hand-authored routes: `lib/data/*.ts` feeds `lib/data/registry.ts`, which is the single source for both `sitemap.xml` and `llms.txt`. This is a genuine strength — the sitemap cannot drift from the content — and it means consolidation is a data-file edit, not a routing project.

---

## 2. Technical SEO — what is already correct

Credit where due; these are done properly and should not be disturbed.

- **`robots.txt`** explicitly allows the AI crawlers that matter, each with its own block: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `Claude-Web`, `Google-Extended`, `Applebot-Extended`, `Bingbot`. `Host` and `Sitemap` directives present. Sensitive paths (`/api/`, `/agent/`, `/dashboard`, `/login`, `/cart`) disallowed. This is better AI-crawler hygiene than most sites of any size.
- **`llms.txt` exists and is generated from the same registry** as the sitemap. Structurally excellent.
- **Sitemap is complete and priority-tiered.**
- **JSON-LD is present** on the pages inspected (`Offer` objects observed in `/pricing` and `/ai-business-system` payloads).
- **Free tools run client-side** with no login and no inference cost — genuinely useful, genuinely linkable.

---

## 3. Defects found

### 3.1 — CRITICAL: contradictory pricing inside one page and inside `llms.txt`

`/ai-business-system` publishes **three different prices for the same product**:

| Location | Value |
|---|---|
| Body copy / meta description | `$2,500–5,000 CAD. The flagship Handbuilt package.` |
| In-page cross-reference | `$3,500–5,000 CAD (typically $7,500)` |
| JSON-LD `Offer` | `$3,500–$7,500` |

The middle value is self-refuting on its face: a range of $3,500–5,000 cannot be "typically $7,500."

`llms.txt` carries the contradiction forward — line 9 states `$3,500–$7,500 CAD` for the AI Business System while line 32 states `$2,500–5,000 CAD` for the same product.

The homepage, separately, lists `AI Business System: $3,500–$7,500 CAD`.

**Why this is critical rather than cosmetic:** `llms.txt` and JSON-LD are precisely what answer engines read to respond to "what does AI Built By Hand charge." The site currently supplies three mutually exclusive answers. Any AI-generated answer sourced from it will be wrong, and a prospect who sees one number on the homepage and another on the product page has a trust problem before the first call.

**Evidence:** extracted from live HTML fetched 2026-07-31, saved during audit. Verified by direct pattern match across `page-ai-business-system.html`, `page-pricing.html` and `llms.txt`.

### 3.2 — CRITICAL: keyword cannibalization on the core commercial intent

**20 URLs target the AI-receptionist intent:**

```
/ai-receptionist                                     ← money page
/ai-receptionist-for-contractors                     ← money page
/services/ai-receptionist-setup
/services/ai-receptionist-os
/services/ai-voice-agent                             ← same thing, different noun
/locations/ai-receptionist-surrey-bc
/resources/what-is-an-ai-receptionist
/resources/ai-receptionist-cost
/resources/is-ai-receptionist-worth-it
/how-to/create-ai-receptionist-for-small-business
/compare/ai-receptionist-vs-human-receptionist
/compare/ai-receptionist-vs-virtual-receptionist
/compare/ai-receptionist-vs-answering-service
/compare/ai-chatbot-vs-ai-receptionist
/compare/best-ai-receptionist-small-business-canada
/compare/ai-receptionist-pricing-canada
/use-cases/ai-receptionist-for-contractors           ← near-duplicate of the money page
/use-cases/ai-receptionist-for-clinics
/use-cases/ai-receptionist-for-dentists
/use-cases/ai-receptionist-for-real-estate
```

The worst instance is the pair `/ai-receptionist-for-contractors` and `/use-cases/ai-receptionist-for-contractors` — **identical target intent, identical head terms, different URL**. On a site with no domain authority to spare, these split every signal they earn.

**Other clusters with the same problem:**

- **Cost — 3 pages:** `/resources/ai-receptionist-cost`, `/compare/ai-receptionist-pricing-canada`, `/resources/how-much-does-ai-automation-cost` (plus `/resources/ai-chatbot-cost`, `/resources/custom-ai-tool-cost`, `/resources/ai-integration-cost`, `/resources/small-business-ai-setup-cost` — **7 cost pages total**).
- **Chatbot — 5 pages:** `/ai-chatbot-development`, `/ai-chatbot-for-small-business`, `/services/ai-chatbot-for-website`, `/services/ai-website-assistant`, `/compare/ai-chatbot-vs-live-chat`.
- **Lead follow-up — 4 pages:** `/ai-lead-follow-up-agent`, `/services/ai-sales-assistant`, `/resources/ai-lead-follow-up-guide`, `/resources/can-ai-follow-up-with-leads`, `/use-cases/estimate-follow-up-automation`.
- **Generic automation — 4 near-synonyms:** `/ai-automation-agency`, `/done-for-you-ai-automation`, `/ai-integration-services`, `/services/custom-business-automation`.

### 3.3 — CRITICAL: no first-party proof anywhere

`/ai-receptionist-for-contractors` is the flagship commercial page. Its H2 structure is sound ("The problem", "How it works", "Why Contractors Lose Jobs to Missed Calls", "What the AI Receptionist Actually Does", "Built for Trades — Not a Generic Chatbot", "What you get", "Common questions"). Its FAQ block is genuinely well-targeted and maps to real buyer questions.

Its only worked example is **explicitly hypothetical**: "a fencing contractor running a 4-person crew in the Fraser Valley" losing "an estimated 5–8 leads a week to missed calls."

There is **no** case study, testimonial, named client, logo, recorded call, screenshot of an integration, or third-party review anywhere in the inspected pages. For a service sold on trust to a sceptical, previously-burned buyer, this is the binding constraint on the entire site.

### 3.4 — MAJOR: the brand has no entity presence

Live search for `"AI Built By Hand"` and `"Handbuilt AI Studio" Surrey BC` on 2026-07-31 returned **no result about this company**. Results were other Surrey / Metro Vancouver AI firms — AdaptAI (`adaptai.ca`), BuildGravity (`buildgravity.ca`), MSP Corp, Fusion Computing — plus an unrelated Surrey steel fabricator trading as "AI Industries".

There is no third-party corroboration of the entity: no directory profile, no review profile, no press mention, no association listing, no `sameAs` anchor. AI answer engines select sources partly on corroborated entity identity; an entity that exists only on its own domain is very hard to cite and impossible to verify.

Compounding this: the brand uses **at least three names in parallel** — "AI Built By Hand", "Handbuilt AI", "Handbuilt AI Studio" — visible together in the footer string `© 2026 HANDBUILT AI · BY AI BUILT BY HAND · AIBUILTBYHAND.COM`. Inconsistent naming is a direct negative signal for entity resolution.

### 3.5 — MAJOR: two incompatible audiences

The site sells to **contractors and local service businesses** (money pages, 39 industries, locations) *and* to **content creators** (20 `/creators` pages: TikTok, YouTube Shorts, voice cloning, faceless channels, Patreon, avatar video).

These audiences share no vocabulary, no buying trigger, no price expectation and no proof. Carrying both halves the clarity of the entity at exactly the moment the entity needs to be unambiguous, and it doubles the proof burden for a one-person studio that currently has none.

This is a genuine strategic fork, not a tidy-up. Recommendation in `17-positioning-and-offers.md`.

### 3.6 — MODERATE: thin and speculative page types

- **19 location pages** covering Surrey, Delta, Vancouver, Langley, Abbotsford, Burnaby, Richmond, Coquitlam, New Westminster, White Rock, Maple Ridge, Chilliwack, Victoria, Calgary, Edmonton, Toronto. With no local proof, no local client, no local citation and no GBP, these carry substantial doorway-page risk. Google's own guidance requires genuine local value; "same service, different city name" does not qualify. Treated in detail in `11-local-seo.md`.
- **39 industry pages** spanning trades, clinics, law firms, gyms, food trucks, wedding planners and immigration consultants. This is a claim to serve 39 verticals with zero delivered work in any of them.
- **25 use-case pages** overlapping heavily with services and industries.

---

## 4. Per-page disposition (summary)

Full row-level mapping for all 216 URLs is in `data/url-map.csv`, generated directly from the live sitemap. Counts:

| Recommendation | Count | Rationale |
|---|---:|---|
| **Keep** | 22 | Core commercial, 5 free tools, legal, `/pricing`, `/about`, `/create`, best comparison, 3 resources |
| **Merge → redirect** | 152 | Cannibalizing duplicates folded into a canonical parent |
| **Pause / noindex** | 20 | All `/creators` — pending the audience decision |
| **Noindex** | 13 | Location pages with no local proof |
| **Rewrite** | 7 | 4 Tier-1 trade pages + Surrey + homepage-adjacent — each gated on proof |
| **Repurpose** | 2 | Hub pages, retained only if their children survive |
| **Remove outright** | 0 | — |

**Nothing is recommended for deletion.** Every consolidated URL should 308/301 to its canonical parent to preserve whatever equity, links and indexed history exist. The site has been live long enough that URL equity is an asset of unknown but non-zero value, and no ranking baseline exists to measure the loss against — which is exactly why the GSC export named in `00-executive-verdict.md` must precede any consolidation.

---

## 5. What must not be changed blindly

1. **The registry architecture** (`lib/data/*.ts` → `registry.ts` → sitemap + llms.txt). It is the reason this site can be consolidated cheaply. Do not hand-author routes around it.
2. **`robots.txt`.** The AI-crawler allowlist is better than most. Leave it.
3. **The 5 free tools.** Strongest asset on the site. They are the link and citation engine. Expand, do not touch the URLs.
4. **Existing URLs.** Redirect, never delete — and only after the GSC baseline is captured.
5. **The homepage H1** — "Missed calls, late quotes, invoice chasing — handled." It matches customer language well. It needs proof under it and an ownership claim beside it, not replacement.

---

## 6. Data that could not be obtained

| Item | Why | Impact |
|---|---|---|
| Google Search Console queries, impressions, positions | Requires authenticated access; not available to this research phase | **High** — no ranking baseline, no query-level truth |
| First-party analytics | Same | Medium — no conversion data per page |
| Backlink profile | No accessible source | Medium — link equity of consolidated URLs unknown |
| Core Web Vitals / field data | Requires CrUX or PSI run against production | Low-Medium |
| Redirect chains, broken links, orphan pages | Requires a full crawler (Screaming Frog / Sitebulb); not run in this phase | Medium |
| Per-page canonical, OG and image-alt audit | Requires the same full crawl | Medium |

These are stated as gaps, not estimated. Closing them is Stage 0 of `18-implementation-roadmap.md`.
