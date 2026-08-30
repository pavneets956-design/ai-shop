# 03 — Content Dispositions, Cannibalization & Priority-Page Outlines (agent A3)

**Date:** 2026-08-30 · **Content HEAD read:** `e732d98` (`fix/dead-social-link`, same tree as `feat/site-transformation-2026-08-30`) · **Mode:** READ-ONLY — nothing outside `research/transformation-2026-08-30/` was written.
**Builds on, does not redo:** `research/keyword-gap-2026-08-12/R5-route-dispositions.md` (per-route baseline, cited as **R5**), `R6-content-quality-review.md` (**R6**), `R8-unsupported-claims-sweep.md` (**R8**), `18-content-quality-audit.md`, `13-internal-linking-audit.md`, `20-DEFINITIVE-KEYWORD-GAP.md`, `99-MASTER-KEYWORD-GAP.md`, `research/30-page-plan.md`, `research/gsc-baseline/04-cannibalization.md` + `05-url-decisions.md`, and sibling A2's `02-url-inventory.csv` (2026-08-30 crawl, used for current title / H1 / word count).

---

## 0. Read first — scope facts, corrections, and the gates every action below sits behind

1. **216 sitemap URLs confirmed from the registries at HEAD:** 17 static (`app/sitemap.ts:25-43`) + 5 free tools + 12 money + **25** services + 39 industries + 20 creators + 19 locations + 24 resources + 9 how-to + 21 compare + 25 use-cases = **216**. A2's crawl of the live `/sitemap.xml` agrees (216). **Correction to `research/30-page-plan.md` §0.1**, which counted 211 and said five service slugs "no longer exist": they exist as JSON-keyed entries inside the same `servicesB` array — `lib/data/_services_b.ts:429` (`"slug": "ai-review-engine"`), `:493`, `:557`, `:621`, `:685` — and are built, linked from `components/Footer.tsx:125` and `lib/data/shopProducts.ts:190,212,234,255,279`. The 30-page-plan's grep only matched unquoted keys.
2. **GSC per-URL numbers below are the 90-day-overridden set from R5's `data/route-dispositions.tsv`** (46-day base, `06-gsc-fresh` overrides; window 2026-06-14 → ~08-10). The owner-supplied 2026-08-27 totals (~1,062 impr, 3–4 clicks, pos ~61) have **no per-URL breakdown on disk**, so ~313 impressions arrived after my per-URL data. Clicks exist on exactly two URLs: `/` (3) and `/industries` (1).
3. **Gate G1 — before any MERGE/REDIRECT ships, the implementer pulls a fresh per-URL GSC page report (2026-06-14 → today).** Any URL in this file marked 0 impressions that shows **≥3 impressions or any position ≤30** flips to KEEP. Every consolidation here is a reversible 301 plus a data-file row removal; nothing is deleted.
4. **Gate G2 — OWNER APPROVAL REQUIRED** for: the 14 creator NOINDEXes (§1.6), the 3 out-of-service-area redirects (§1.7), and the medical/legal/hospitality verticals (kept here; R5 §2.6b).
5. **Thinness is not a ranking cause on this site** (`18-content-quality-audit.md`, r² = 0.0003). No row below is actioned on word count alone. Word count is cited only where it corroborates templating or intent overlap.
6. **Why this file consolidates more than R5 (2 merges) and less than 30-page-plan (~41):** R5's duplicate test was byte-identical `keywords[0]` collisions only (R5 C4). The brief asks for intent overlap + templating + positioning dilution. Every row that departs from R5 names the R5 disposition and the evidence for the change. Every MERGE target is a KEEP/IMPROVE page (no chains), verified in §5.2.

---

## 1. Disposition table — all 216 sitemap URLs

**Columns:** URL · intended query · overlapping URLs · GSC impr/clicks/pos (R5 TSV; "none" = no row) · templated-text evidence (codes below; "—" = none found) · action · reason (cites R5 where it decided).

**Template evidence codes** (all quoted from source at HEAD; counts from `scratchpad/rep.js` / `awk` over `lib/data/*.ts`):

| Code | Repeated text (verbatim) | Where | Pages |
|---|---|---|---:|
| T1 | "A single AI worker starts at $1,500 CAD, usually live in about 5 business days." | `lib/data/locations.ts` | **10** — richmond, coquitlam, new-westminster, white-rock, maple-ridge, chilliwack, victoria, calgary, edmonton, toronto |
| T2 | "Handoff & support — working system plus optional $99/mo Care Plan." and "Scoped proposal — flat CAD price, clear outcome." | `locations.ts` | 9 each |
| T3 | "Built from nearby Surrey/Delta with fixed CAD pricing from $1,500." / "Delivered remotely from British Columbia, with the same hands-on build and fixed CAD pricing from $1,500." | `locations.ts` | 3 / 3 (calgary, edmonton, toronto) |
| T4 | "Most <trade> setups run as a Business AI System from $3,500 CAD" frame; plus R6 §5: HVAC and electrician openers are "Different words, identical information" | `lib/data/industries.ts` (7 hits) | 7 + R6 finding across 39 |
| T5 | "Get this built for your business" CTA and "Optional Care Plan is $99/mo." | `_industries_b.ts` | 6 each |
| T6 | "Typically $3,500 CAD as part of the Business AI System." | `_services_b.ts` | 4 |
| T7 | H1 generated as `${uc.solution} for ${uc.industry}` (`app/use-cases/[slug]/page.tsx:26,31`); bodies 224–377 words (A2 crawl); R6 §5: "the shallowest type on the site… Category description, no mechanism" | `useCases.ts` | 25 |
| T8 | 13 of 20 creator pages carry the identical related link "AI Tools for Content Creators"; 8 carry "AI Content Repurposing System" | `creators.ts` + `_creators_b.ts` | 13 / 8 |
| T9 | Section heading "The manual way (and why it breaks)" | `howto.ts` | 4 |
| T10 | Comparison row "Optional Care Plan CAD $99/mo" (7 pages); related link "How Much Does AI Automation Cost?" (6 pages) | `compare.ts` | 7 / 6 |
| T11 | R6 P3-20: "6 location pages share a byte-identical 15-word cost answer" | rendered HTML (R6) | 6 |

Scenario blocks: 109 `scenario` fields across registries; 58 open with an explicit hedge (Say/Imagine/Picture/Consider/Take/"Example scenario"), 51 open with an indefinite present-tense persona ("A Langley window cleaning company sends…"). **None assert a delivered past-tense result** — the three R6 P0-2 cases were fixed in `d405ae7`.

### 1.1 Static / hub routes (17)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/` | brand + "ai receptionist for contractors surrey" | `/ai-receptionist-for-contractors`, `/ai-receptionist`, `/locations/ai-receptionist-surrey-bc` | 60/3/15.4 | — | **IMPROVE** | R5 PROTECT (only clicks). Keep URL/title; body work in §2.1. Title is the 4th surface on the contractor phrase (§2.0) — do not add more. |
| `/services` | "ai services" hub | `/solutions` | none | — | KEEP | R5 KEEP. Hub. |
| `/industries` | "ai automation by industry" | — | 20/1/5.8 | — | **IMPROVE** | R5 PROTECT. 1 of 4 site clicks, pos 5.8. Outline §2.2. |
| `/locations` | "ai automation bc locations" | — | 1/0/80 | — | KEEP | R5 KEEP. Hub. |
| `/solutions` | "ai solutions" | `/services` (both hubs of what Handbuilt builds; `lib/data/solutions.ts:1-2`) | none | — | KEEP | R5 KEEP. Low priority; flag for A1's chrome/architecture lane whether two "what we build" hubs are needed. |
| `/use-cases` | hub | — | none | — | KEEP | Hub survives with 8 use-cases after §1.11 merges. |
| `/resources` | hub | — | none | — | KEEP | R5 KEEP. |
| `/how-to` | hub | — | none | — | KEEP | R5 KEEP. |
| `/compare` | hub | — | none | — | KEEP | R5 KEEP. |
| `/pricing` | "ai automation pricing canada" | `/compare/ai-automation-agency-pricing`, `/resources/how-much-does-ai-automation-cost` | none (GSC top query "ai custom integration pricing") | — | **IMPROVE** | R5 KEEP. Outline §2.13. |
| `/shop` | productized tools | — | none | — | KEEP | R5 KEEP. Recently reworked (`d5e9322`…`a95f8c4`). |
| `/tools` | "free contractor tools" | — | none (live since 2026-07-16) | — | KEEP | R5 PROTECT P0. |
| `/faq` | brand FAQ | — | 16/0/6.6 | — | KEEP | R5 PROTECT. |
| `/about` | brand | — | none | — | **IMPROVE** | R5 KEEP. R6 §4: names nobody, no Person schema. Outline §2.15. |
| `/create` | conversion form | `/start` | 14/0/7.6 | — | **IMPROVE** | R5 PROTECT. 33 words; outline §2.17. |
| `/privacy` | legal | — | none | — | KEEP | "Last updated: June 6, 2026" hard-coded (§4). |
| `/terms` | legal | — | none | — | KEEP | Same date defect (§4). |

### 1.2 Free tools (5)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/tools/contractor-profit-pricing-calculator` | "contractor pricing calculator" | — | none | — | KEEP | R5 PROTECT P0; R6 §5 "Best page on the site". |
| `/tools/contractor-quote-follow-up-generator` | "quote follow up template contractors" | `/ai-lead-follow-up-agent` (commercial twin — link, don't merge) | none | — | KEEP | R5 PROTECT P0. |
| `/tools/missed-call-revenue-calculator` | "missed call cost calculator" | `/use-cases/missed-call-automation` | none | — | KEEP | R5 PROTECT P0. |
| `/tools/contractor-labor-burden-calculator` | "labor burden calculator" | — | none | — | KEEP | R5 PROTECT P0. |
| `/tools/contractor-lead-leak-audit` | "contractor lead audit" | — | none | — | KEEP | R5 PROTECT P0. |

### 1.3 Money pages (12)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/ai-automation-agency` | "ai automation agency" | `/locations/ai-automation-agency-surrey-bc`, `/compare/ai-consultant-vs-ai-automation-agency` | 10/0/4.3 | — | KEEP | R5 PROTECT. Receives `/compare/ai-consultant-vs-ai-automation-agency` (§1.10). |
| `/custom-ai-app-development` | "custom ai app development" | `/locations/custom-ai-apps-surrey`, `/use-cases/custom-ai-app-for-startups`, `/use-cases/personal-ai-assistant-app` | 14/0/10.2 | — | KEEP | R5 PROTECT. Receives two use-case merges. |
| `/ai-chatbot-development` | "custom chatbot development vancouver" (54 impr, #1 query) | `/locations/ai-chatbot-developer-vancouver` (15 @54.1 — **measured cannibalization**, gsc-baseline 04 §3), `/services/ai-chatbot-for-website` (0 impr, holds the footer slot — R5 C2), `/ai-chatbot-for-small-business` | 118/0/68.6 | — | **IMPROVE** | R5 KEEP (already retitled `63f88c3`/`a118f5b`). Outline §2.8. Do not retitle again. |
| `/ai-receptionist` | "ai receptionist" (head), "ai receptionist for local business" | **Receptionist cluster** §2.0 | 146/0/72.5 | — | **IMPROVE** | R5 RETITLE P1. Site's #1 page; Google serves it for "ai receptionist for contractors" (gsc-baseline 04). Differentiate, never redirect. Outline §2.3. |
| `/ai-business-system` | "ai business system" (dead term, R6 §3: 0 Reddit usage) | `/done-for-you-ai-automation` | 11/0/4.5 | — | KEEP | R5 PROTECT. Change the **footer anchor text** only (`components/Footer.tsx:124`), not the page — it ranks 4.5. |
| `/done-for-you-ai-automation` | "done for you ai automation" (9 @49.3) | `/ai-business-system`, `/services/ai-workflow-automation` | 28/0/50.6 | — | **IMPROVE** | R5 PROTECT P1 (§2.7 reversal stands). Outline §2.7. |
| `/ai-receptionist-for-contractors` | "ai receptionist for contractors" (50 impr) | §2.0 cluster; nav target (`lib/data/site.ts:navLinks`), 479 inbound (R5 C1) | 16/0/71.9 | — | **IMPROVE** | R5 KEEP P0 — canonical for the contractor query. Outline §2.4. |
| `/ai-lead-follow-up-agent` | "ai leads for contractors" (32), "ai sales follow up system for construction company" (18) | `/resources/ai-lead-follow-up-guide`, `/use-cases/estimate-follow-up-automation` (→ merged in), `/tools/contractor-quote-follow-up-generator` | 24/0/77.9 | — | **IMPROVE** | R5 RETITLE P1 (dead term "lead follow-up agent", R6 §3). Outline §2.6. |
| `/ai-chatbot-for-small-business` | "chatbot for small business" | `/ai-chatbot-development` | 3/0/29.7 | — | KEEP | R5 KEEP. 976 words, distinct audience qualifier. |
| `/remote-ai-development` | "remote ai development canada" | out-of-area location pages | none | — | KEEP | R5 KEEP. Becomes the 301 target for Calgary/Edmonton/Toronto (§1.7) — the honest "we deliver remotely" page. |
| `/ai-integration-services` | "ai integration services" | `/resources/ai-integration-cost` (→ merged in) | 14/0/48.4 | — | KEEP | R5 KEEP. Absorbs the 299-word cost stub; add a cost section. |
| `/ai-automation-canada` | "ai automation canada" | `/remote-ai-development` | 2/0/10.5 | — | KEEP | R5 PROTECT. |

### 1.4 Services (25)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/services/ai-chatbot-for-website` | "ai chatbot for website" | `/services/ai-website-assistant` (same product, 401 vs 400 words, both 0 impr), `/ai-chatbot-development` | none (246 inbound, footer slot — R5 C2) | — | KEEP | R5 KEEP P1. Receives `ai-website-assistant`. Footer chatbot slot should move to `/ai-chatbot-development` (R5 C2). |
| `/services/ai-lead-capture-form` | "ai lead capture form" | `/services/ai-intake-form-builder` | none | — | KEEP | R5 KEEP. |
| `/services/ai-quote-generator` | "ai quote generator" | `/services/ai-proposal-generator` (→ merged in), `/how-to/automate-quote-requests`, `/resources/can-ai-send-quotes-automatically` | none (21 inbound) | — | KEEP | R5 KEEP. Receives proposal-generator. |
| `/services/ai-customer-support-agent` | "ai customer support agent" | `/use-cases/ai-support-bot-for-saas` (→ merged in) | none | — | KEEP | R5 KEEP. |
| `/services/ai-receptionist-setup` | "ai receptionist setup small business" | R5 C5 pile-up (with `/resources/what-is-an-ai-receptionist`, `/how-to/create-ai-receptionist-for-small-business`, `/compare/ai-receptionist-vs-human-receptionist`) | none | — | **IMPROVE** | R5 RETITLE P2 → "AI Answering Service Setup for Small Business". Takes the commercial answering-service noun (R5 C5). |
| `/services/ai-email-automation` | "ai email automation" | `/services/ai-sms-automation` | none | — | KEEP | R5 KEEP. Distinct channel. |
| `/services/ai-sms-automation` | "ai sms automation" | — | none (17 inbound) | — | KEEP | R5 KEEP. |
| `/services/ai-calendar-booking-agent` | "ai booking agent" | `/resources/can-ai-book-appointments` | 1/0/8 | — | KEEP | R5 PROTECT. |
| `/services/ai-crm-automation` | "ai crm automation" | — | 3/0/7.3 | — | KEEP | R5 PROTECT. |
| `/services/ai-invoice-reminder-system` | "automate invoice reminders" | `/how-to/automate-invoice-reminders` (2 @17 — keep both, R5 C4), `/use-cases/ai-invoice-reminders-for-small-business` (→ merged in) | none | — | KEEP | R5 KEEP; MERGE target (R5 P2). |
| `/services/ai-review-request-system` | "ai review request system" | `/services/ai-review-engine` (**same product**: R6 P0-1 treated the two as one offer; engine is the priced shop SKU `shopProducts.ts:170-190`) | none | — | **MERGE→`/services/ai-review-engine`** | Changes R5 KEEP. Evidence: two 0-impression pages selling one review flow; the engine page is footer-linked (`Footer.tsx:125`) and shop-linked; request-system is linked from 4 files (`related:` arrays — repoint). Carry its compliant FAQ (`_services_b.ts:41`) into the engine page. |
| `/services/ai-intake-form-builder` | "ai intake form" | `/use-cases/client-onboarding-automation` (→ merged in) | none | — | KEEP | R5 KEEP. |
| `/services/ai-website-assistant` | "ai website assistant" | `/services/ai-chatbot-for-website` | none | — | **MERGE→`/services/ai-chatbot-for-website`** | Changes R5 KEEP. Evidence: both describe a site-embedded assistant; 401 vs 400 words; 0 impressions both windows; 3 inbound files to repoint. |
| `/services/ai-sales-assistant` | "ai sales assistant" | `/services/ai-crm-automation`, `/ai-lead-follow-up-agent` | none | T6 | KEEP | R5 KEEP. Flag: vague noun, templated price line (T6). Candidate for a later pass, not this one. |
| `/services/ai-admin-assistant` | "ai admin assistant" | `/use-cases/ai-operations-assistant` (→ merged in) | none | T6 | KEEP | R5 KEEP. |
| `/services/ai-document-generator` | "ai document generator" / SOP | `/use-cases/ai-sop-generator` (2 impr — keep) | none | — | KEEP | R5 KEEP. |
| `/services/ai-proposal-generator` | "ai proposal generator" | `/services/ai-quote-generator` | none | — | **MERGE→`/services/ai-quote-generator`** | Changes R5 KEEP. Evidence: for the ICP a proposal and a quote are the same artefact; 390 words; 0 impressions; 3 inbound files. |
| `/services/ai-voice-agent` | "ai voice agent" / "ai phone assistant for business" (1) | `/services/ai-receptionist-setup`, `/ai-receptionist` | none | T6 | KEEP | R5 KEEP. Distinct vocabulary ("painter voice assistant" 2 impr). |
| `/services/ai-workflow-automation` | "ai workflow automation" | `/services/custom-business-automation` (→ merged in), `/done-for-you-ai-automation` | 10/0/27.3 | — | KEEP | R5 KEEP. MERGE target. |
| `/services/custom-business-automation` | "custom business automation" | `/services/ai-workflow-automation` | none | — | **MERGE→`/services/ai-workflow-automation`** | Changes R5 KEEP. Evidence: same "we automate your workflows" intent; 411 words; 0 impr vs target's 10 @27.3; 5 inbound files. |
| `/services/ai-review-engine` | "get more google reviews" | `/services/ai-review-request-system`, `/how-to/automate-review-requests` | none | — | KEEP | R5 KEEP. Shop SKU page. MERGE target. Fix `_services_b.ts:488` "for posting reviews" (§3). |
| `/services/ai-customer-reactivation` | "customer reactivation campaign" | — | none | — | KEEP | R5 KEEP. Shop-linked (`shopProducts.ts:212`). |
| `/services/ai-operations-dashboard` | "operations dashboard small business" | `/services/ai-business-analyst` | none | — | KEEP | R5 KEEP. Shop-linked. |
| `/services/ai-business-analyst` | "ai business analyst" | `/services/ai-operations-dashboard` | none | — | KEEP | R5 KEEP. Shop-linked. |
| `/services/ai-receptionist-os` | "ai receptionist os" | `/ai-receptionist` | none | — | KEEP | R5 KEEP. Shop-linked (`shopProducts.ts:279`); cannot redirect without a shop edit. |

### 1.5 Industries (39)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/industries/landscaping-ai-automation` | "ai automation for landscaping companies" (1), "ai follow up for landscapers" (1) | — | 15/0/55.2 | T4 | **IMPROVE** | R5 KEEP; 30-page-plan #1 (best industry page + #2 opportunity score). Expand in place. |
| `/industries/lawn-care-ai-automation` | "ai automation lawn care" | landscaping | none | T4 | KEEP | R5 KEEP. On-ICP trade. |
| `/industries/plumber-ai-automation` | "plumber answering service" | — | none | T4 | **IMPROVE** | R5 RETITLE P1 → "AI Answering Service for Plumbers"; R6 §6: "on call" appears 0×. |
| `/industries/electrician-ai-automation` | "ai automation for electricians" | — | none | T4 | **IMPROVE** | R5 KEEP. R6 §5 quotes it as informationally identical to HVAC; R6 §6 "on call" 0×. Light rewrite in the trade's register. |
| `/industries/hvac-ai-automation` | "hvac answering service" | — | none | T4 | **IMPROVE** | R5 RETITLE P1 → "AI Answering Service for HVAC Companies"; 30-page-plan #10. |
| `/industries/roofing-ai-automation` | "ai automation roofing" | — | none | T4 | KEEP | R5 KEEP. Register correct (estimates). |
| `/industries/cleaning-business-ai-automation` | "ai automation cleaning business" | — | none | T4 | KEEP | R5 KEEP. |
| `/industries/moving-company-ai-automation` | "ai automation moving company" | — | none | — | KEEP | R5 KEEP. |
| `/industries/pest-control-ai-automation` | "ai automation pest control" | — | none | — | KEEP | R5 KEEP. |
| `/industries/contractor-ai-automation` | "ai automation for contractors" (18) | `/ai-receptionist-for-contractors`, `/resources/best-ai-tools-for-contractors` | none | — | KEEP | R5 KEEP. The query has 18 impressions and lands elsewhere; A1/A6 should check which page Google serves before touching. |
| `/industries/real-estate-agent-ai-automation` | "ai automation real estate agents" | `/use-cases/ai-receptionist-for-real-estate`, `/use-cases/lead-capture-ai-for-real-estate` (both → merged in) | none | — | KEEP | R5 KEEP. 664 words; the deepest of three real-estate URLs. |
| `/industries/dental-clinic-ai-automation` | "ai automation dental clinic" | `/use-cases/ai-receptionist-for-dentists` (2.0 — protect) | none | — | KEEP | R5 NEEDS-OWNER (medical, §2.6b). Gate G2. |
| `/industries/salon-ai-automation` | "ai automation salon" | `/industries/barbershop-ai-automation`, `/use-cases/ai-booking-assistant-for-salons` (both → merged in) | none | — | KEEP | R5 KEEP. MERGE target. |
| `/industries/restaurant-ai-automation` | "ai phone answering for restaurants" (w78 in gap list) | `/use-cases/ai-chatbot-for-restaurants` (8.0), `/industries/food-truck-ai-automation` (→ merged in) | none | — | KEEP | R5 NEEDS-OWNER. Gate G2. |
| `/industries/auto-detailing-ai-automation` | "ai automation auto detailing" | — | none | — | KEEP | R5 KEEP. 689 words. |
| `/industries/fence-company-ai-automation` | "fence company automation" | deck-builder | none | T5 | **IMPROVE** | R5 KEEP; 30-page-plan #2 (#1 opportunity score). Expand in place — gated on a real fencing client per that plan. |
| `/industries/deck-builder-ai-automation` | "deck builder automation" | fence | none | T5 | KEEP | R5 KEEP. |
| `/industries/painter-ai-automation` | "ai for painters" ("painter voice assistant" 2) | — | 2/0/95.5 | T5 | KEEP | R5 KEEP. |
| `/industries/clinic-ai-automation` | "ai automation clinic" | `/use-cases/ai-receptionist-for-clinics` (→ merged in), dental, physio | none | — | KEEP | R5 NEEDS-OWNER. Gate G2. MERGE target. |
| `/industries/mortgage-broker-ai-automation` | "ai automation mortgage broker" | insurance | none | — | KEEP | R5 KEEP. |
| `/industries/insurance-broker-ai-automation` | "ai automation insurance broker" | mortgage | 1/0/94 | — | KEEP | R5 KEEP. |
| `/industries/physiotherapy-ai-automation` | "automating physio clinic admin" (4+4+3) | clinic | 12/0/69.4 | — | KEEP | R5 NEEDS-OWNER; real accidental demand. Gate G2. |
| `/industries/chiropractor-ai-automation` | "ai automation chiropractor" (3) | clinic | 3/0/36 | — | KEEP | R5 NEEDS-OWNER. |
| `/industries/barbershop-ai-automation` | "ai automation barbershop" | salon | none | — | **MERGE→`/industries/salon-ai-automation`** | Changes R5 KEEP. Evidence: same vertical (H1 "AI Automation for Barbershops & Barbers"), 337 vs 664 words, 0 impr both, 0 inbound files. |
| `/industries/gym-ai-automation` | "ai automation for gyms" (5) | personal-trainer | 8/0/45.6 | — | KEEP | R5 KEEP. |
| `/industries/personal-trainer-ai-automation` | "automation for personal trainer" (1) | gym | 1/0/69 | — | KEEP | R5 KEEP. |
| `/industries/food-truck-ai-automation` | "ai for food trucks" | restaurant | none | — | **MERGE→`/industries/restaurant-ai-automation`** | Changes R5 KEEP. Evidence: 355 words, 0 impr, 0 inbound, same vertical; off-ICP. |
| `/industries/wedding-planner-ai-automation` | "ai automation wedding planner" | — | 1/0/84 | — | KEEP | R5 KEEP (has a row). |
| `/industries/photographer-ai-automation` | "ai automation photographers" | videographer, creators cluster | none | — | **MERGE→`/industries`** | Changes R5 KEEP. Evidence: `_industries_c.ts` "Reject tier" batch (30-page-plan §2.2), 338 words, 0 impr both windows, 1 inbound file; creator-adjacent (dilutes positioning). |
| `/industries/videographer-ai-automation` | "ai automation videographers" | photographer, creators | none | — | **MERGE→`/industries`** | Same evidence; 331 words, 0 impr, 1 inbound. |
| `/industries/immigration-consultant-ai-automation` | "ai for immigration consultants" (2) | — | 2/0/6 | — | KEEP | R5 PROTECT. |
| `/industries/law-firm-ai-automation` | "virtual receptionist for law firms" (w24) | `/use-cases/ai-document-analyzer-for-law-firms` (→ merged in) | none | — | KEEP | R5 NEEDS-OWNER. Gate G2. MERGE target. |
| `/industries/accountant-ai-automation` | "ai automation for accountants" | `/use-cases/automate-admin-for-accountants` (both 4.0 — **do not merge**, R5 C4), bookkeeper (→ merged in) | 1/0/4 | — | KEEP | R5 PROTECT. |
| `/industries/bookkeeper-ai-automation` | "ai automation bookkeepers" | accountant | none | — | **MERGE→`/industries/accountant-ai-automation`** | Changes R5 KEEP. Evidence: same vertical, 312 words, 0 impr, 1 inbound; target ranks 4.0. |
| `/industries/consultant-ai-automation` | "ai automation consultants" | coach | 2/0/3 | — | KEEP | R5 PROTECT (3.0). |
| `/industries/agency-ai-automation` | "ai automation marketing agency" | — | 2/0/36.5 | — | KEEP | R5 KEEP. |
| `/industries/ecommerce-ai-automation` | "ai automation ecommerce" | `/use-cases/ai-chatbot-for-ecommerce` | none | — | **MERGE→`/industries`** | Changes R5 KEEP. Evidence: not a local service business (positioning brief), 313 words, 0 impr, 1 inbound. |
| `/industries/retail-store-ai-automation` | "ai automation retail store" | — | none | — | **MERGE→`/industries`** | Same batch: 334 words, 0 impr, 1 inbound. |
| `/industries/coach-ai-automation` | "ai automation for coaches" | consultant, `/creators/ai-coaching-content-system` (11.0) | none | — | **MERGE→`/industries`** | Same batch: 343 words, 0 impr, 0 inbound; overlaps the creator coaching page that ranks. |

### 1.6 Creators (20) — Gate G2, owner decision (R5 §2.6a)

Default proposed here: the 6 with any GSC row stay indexed; the other 14 get `noindex` (reversible, URL preserved, removed from sitemap + `llms.txt`). If the owner keeps creators in positioning, all 14 flip to KEEP with no other change.

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/creators/ai-tools-for-content-creators` | "best ai tools for creators" (1 @41) | `/resources/best-ai-tools-for-content-creators` (8 @47.1) | 5/0/88.4 | T8 | KEEP | Has impressions. |
| `/creators/ai-video-editing-automation` | "ai video editing automation" | `/resources/can-ai-edit-videos` (→ merged in) | none | T8 | NOINDEX | R5 NEEDS-OWNER. 0 impr. |
| `/creators/ai-tiktok-content-system` | "ai tiktok content system" | `/resources/can-ai-make-tiktok-videos` (→ merged in) | 2/0/7 | T8 | KEEP | R5 PROTECT (7.0). |
| `/creators/ai-youtube-shorts-automation` | "automate youtube shorts" | `/how-to/automate-youtube-shorts` (→ merged in) | 1/0/42 | T8 | KEEP | Has a row. |
| `/creators/ai-youtube-video-workflow` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-podcast-clipping-system` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-text-to-speech-for-creators` | — | voice-cloning | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-voice-cloning-workflow` | "ai voice cloning" | `/resources/can-ai-clone-my-voice-legally` (5 @39.8 — keep) | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-avatar-video-creation` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-faceless-channel-automation` | "faceless channel automation" | `/how-to/build-faceless-content-system` (→ merged in) | none | T8 | NOINDEX | 0 impr. If noindexed, retarget that how-to's 301 to `/creators`. |
| `/creators/ai-script-writing-system` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-caption-subtitle-automation` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-content-repurposing-system` | — | `/use-cases/ai-content-engine-for-creators` | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-social-media-scheduling-automation` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-newsletter-automation` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-fan-message-automation` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-creator-crm` | "creator crm" | — | 7/0/6.9 | T8 | KEEP | R5 PROTECT. |
| `/creators/ai-patreon-creator-automation` | — | — | none | T8 | NOINDEX | 0 impr. |
| `/creators/ai-course-creator-automation` | — | — | 2/0/10 | T8 | KEEP | R5 PROTECT. |
| `/creators/ai-coaching-content-system` | — | `/industries/coach-ai-automation` (→ merged to hub) | 1/0/11 | T8 | KEEP | R5 PROTECT. |

Note: the `/creators` hub (pos 8.0, 2 impr) is **not in the sitemap** (`app/sitemap.ts:25-43` has no `/creators`) — add it (§5.1, Lane P).

### 1.7 Locations (19)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/locations/ai-automation-agency-surrey-bc` | "ai services surrey" (11) | `/ai-automation-agency`, `/locations/ai-receptionist-surrey-bc` | 5/0/17.2 | — | KEEP | R5 PROTECT. |
| `/locations/ai-automation-delta-bc` | "ai automation delta bc" | — | 3/0/4.3 | — | KEEP | R5 PROTECT. |
| `/locations/ai-automation-vancouver` | "ai automation vancouver" | `/locations/ai-chatbot-developer-vancouver` | 1/0/90 | — | **IMPROVE** | R5 RETITLE P2 → "AI Chatbots & Answering Services for Vancouver Businesses". |
| `/locations/ai-automation-langley-bc` | "ai automation langley" | — | none | — | **IMPROVE** | R5 RETITLE P2 ("AI Answering Service & Automation in Langley"). GBP caveat (R5 C6). |
| `/locations/ai-automation-abbotsford` | "ai automation abbotsford" | — | none | — | **IMPROVE** | R5 RETITLE P2. |
| `/locations/ai-receptionist-surrey-bc` | "ai receptionist surrey" | §2.0 cluster (Surrey variant) | 6/0/18.7 | — | **IMPROVE** | R5 PROTECT. Priority page; outline §2.5. |
| `/locations/ai-chatbot-developer-vancouver` | "custom chatbot development vancouver" (54) | `/ai-chatbot-development` (**measured collision**, location page wins 54.1 vs 68.6) | 15/0/54.1 | — | **IMPROVE** | R5 RETITLE P1 → "Custom AI Chatbot Development in Vancouver, BC" (word-form fix, R5 C3). Slug unchanged. Outline §2.9. |
| `/locations/custom-ai-apps-surrey` | "custom ai apps surrey" | `/custom-ai-app-development` | 1/0/2 | — | KEEP | R5 PROTECT (2.0). |
| `/locations/ai-automation-burnaby-bc` | "ai automation burnaby" | — | 7/0/12 | — | KEEP | R5 PROTECT. R6 §5 cites it as the correct local-specificity pattern (Metrotown, Brentwood, Lougheed). |
| `/locations/ai-automation-richmond-bc` | "ai automation richmond" | — | none | T1,T2,T3 | **IMPROVE** | R5 RETITLE P2. Three template sentences; needs one real Richmond specific. |
| `/locations/ai-automation-coquitlam-bc` | "ai services coquitlam" (1) | — | 2/0/41.5 | T1,T2,T3 | **IMPROVE** | R5 RETITLE P2. |
| `/locations/ai-automation-new-westminster-bc` | "ai automation new westminster" | — | 2/0/10 | T1,T2,T3 | KEEP | R5 PROTECT (10.0). Template sentences stay — do not risk the position in this pass. |
| `/locations/ai-automation-white-rock-bc` | "ai automation white rock" | — | 14/0/59.9 | T1,T2 | **IMPROVE** | R5 RETITLE P2. 14 impressions on a templated page — the strongest case for a real local rewrite. |
| `/locations/ai-automation-maple-ridge-bc` | "ai automation maple ridge" | — | 1/0/4 | T1,T2 | KEEP | R5 PROTECT. |
| `/locations/ai-automation-chilliwack-bc` | "ai automation chilliwack" | — | 9/0/8.1 | T1,T2 | KEEP | R5 PROTECT. |
| `/locations/ai-automation-victoria-bc` | "ai automation victoria bc" | — | none | T1,T2 | **IMPROVE** | R5 RETITLE P2. Flag: Victoria is not in the 12-area service list (`30-page-plan` facts gap #13) — owner confirms before investing. |
| `/locations/ai-automation-calgary-ab` | "ai automation calgary" ("ai chatbot calgary" 3) | `/remote-ai-development` | 4/0/76.8 | T1,T2,T3 | **REDIRECT→`/remote-ai-development`** | gsc-baseline 05 §4 and 30-page-plan §2.5 already proposed noindex; R5 NEEDS-OWNER. A 301 to the honest remote-delivery page preserves what little equity exists better than noindex. **Gate G2.** |
| `/locations/ai-automation-edmonton-ab` | "ai automation edmonton" | `/remote-ai-development` | 1/0/7 | T1,T2,T3 | **REDIRECT→`/remote-ai-development`** | Changes R5 PROTECT. Evidence: position 7.0 is a single-impression sample; page is T1+T2+T3 template with the city swapped; outside the advertised service area. Gate G2 — if the owner wants to keep it, NOINDEX is the fallback. |
| `/locations/ai-automation-toronto-on` | "ai automation toronto" (1 @84) | `/remote-ai-development` | 1/0/84 | T1,T2,T3 | **REDIRECT→`/remote-ai-development`** | R6 §5: "Substitute any city name and the sentence is unchanged." Gate G2. |

### 1.8 Resources (24)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/resources/how-much-does-ai-automation-cost` | "how much does ai automation cost" | `/pricing`, `/compare/ai-automation-agency-pricing` | none | T10 (linked from 6 compare pages) | KEEP | R5 KEEP. 623 words; distinct from agency-pricing angle. |
| `/resources/what-is-an-ai-receptionist` | "what is an ai receptionist" | `/ai-receptionist` (head page), R5 C5 pile-up | none | — | **MERGE→`/ai-receptionist`** | Changes R5 RETITLE P3. Evidence: R6 §5 Tier B — "That is a dictionary entry… the canonical page an AI Overview eats whole"; 0 impressions; the definition becomes a section on the head-term page (§2.3). 5 inbound files to repoint. |
| `/resources/best-ai-tools-for-small-business` | "best ai tools for small business" | `/resources/best-ai-tools-for-contractors` (124), `/resources/best-ai-automations-for-service-businesses` | none | — | **MERGE→`/resources/best-ai-automations-for-service-businesses`** | Changes R5 KEEP. Evidence: generic-audience listicle, 0 impr, dilutes the contractor listicle that carries 124 impr; target has 2 impr @34.5 and the closer (service-business) audience. **Update the existing alias** `next.config.js:83` so it does not chain. |
| `/resources/ai-automation-examples-for-small-business` | "ai automation examples" | `/resources/what-can-ai-automate-small-business` (→ merged in) | none | — | KEEP | R5 KEEP. MERGE target. |
| `/resources/ai-receptionist-cost` | "how much does an answering service cost" (w88 — biggest gap, `20-DEFINITIVE` cluster 1) | `/compare/ai-receptionist-pricing-canada` (4.0), `/pricing` | none | — | **IMPROVE** | R5 REWRITE P1. Add the answering-service cost cluster (per-minute vs one-time; Ruby/Plumbline comparison queries). |
| `/resources/is-ai-receptionist-worth-it` | "is an ai receptionist worth it?" (15 @45.8 + 4 + 2) | `/ai-receptionist` | 25/0/42.4 | — | **IMPROVE** | R5 KEEP. Best-positioned resource. Outline §2.12. |
| `/resources/can-ai-answer-business-phone-calls` | "can ai answer business phone calls" (1 @93) | `/services/ai-voice-agent` | 7/0/68.6 | — | **IMPROVE** | R5 KEEP. R6 §5 Tier B ("Six generic verbs"). Outline §2.11. |
| `/resources/can-ai-book-appointments` | "can ai book appointments" | `/services/ai-calendar-booking-agent` (8.0) | none | — | KEEP | R5 KEEP. Question format, AEO. |
| `/resources/ai-lead-follow-up-guide` | "ai lead follow up" (3) | `/ai-lead-follow-up-agent`, `/resources/can-ai-follow-up-with-leads` (→ merged in) | 6/0/65.5 | — | KEEP | R5 KEEP. MERGE target. |
| `/resources/what-can-ai-automate-small-business` | "what can ai automate" | `/resources/ai-automation-examples-for-small-business` | none | — | **MERGE→`/resources/ai-automation-examples-for-small-business`** | Changes R5 KEEP. Evidence: near-identical intent (what/examples), 0 impr both, 526 vs 628 words; 5 inbound files. |
| `/resources/can-ai-edit-videos` | "can ai edit videos" | `/creators/ai-video-editing-automation` | none | — | **MERGE→`/creators/ai-video-editing-automation`** | Changes R5 KEEP. Exact-intent creator duplicate, 259 words, 0 impr, 0 inbound. If the twin is noindexed (G2), retarget to `/creators`. |
| `/resources/can-ai-clone-my-voice-legally` | "is ai voice cloning illegal?" (1 @39), "ai voice cloning consent" (1) | `/creators/ai-voice-cloning-workflow` | 5/0/39.8 | — | KEEP | R5 KEEP. Real question demand. |
| `/resources/can-ai-make-tiktok-videos` | "can ai make tiktok videos" | `/creators/ai-tiktok-content-system` (7.0) | none | — | **MERGE→`/creators/ai-tiktok-content-system`** | Changes R5 KEEP. Exact-intent duplicate of a page that ranks 7.0; 263 words; 0 impr; 0 inbound. |
| `/resources/best-ai-tools-for-content-creators` | "best ai tools for creators" (1 @41) | `/creators/ai-tools-for-content-creators` | 8/0/47.1 | — | KEEP | R5 KEEP. Has impressions. |
| `/resources/ai-chatbot-cost` | "ai chatbot cost" (3), "how much is a chatbot" (1), "cost to build a chatbot" (1) | `/ai-chatbot-development` | 5/0/93.4 | — | **IMPROVE** | R5 KEEP. 330 words on the site's #1 topic; cost pages are the warmest audience (`20-DEFINITIVE` cluster 1). |
| `/resources/custom-ai-tool-cost` | "custom ai tool cost" | `/custom-ai-app-development` | 2/0/4.5 | — | KEEP | R5 PROTECT. |
| `/resources/ai-integration-cost` | "ai integration cost" (2), "ai custom integration pricing" (1) | `/ai-integration-services` (14 @48.4) | 3/0/85.3 | — | **MERGE→`/ai-integration-services`** | Changes R5 KEEP. Evidence: 299-word stub; the money page carries 14 impr on the same topic and gains a cost section; 0 inbound files. |
| `/resources/small-business-ai-setup-cost` | "small business ai setup cost" | `/pricing` | 1/0/4 | — | KEEP | R5 PROTECT. |
| `/resources/can-ai-send-quotes-automatically` | "ai quoting software contractors" (8), "quotes automation" (1) | `/services/ai-quote-generator`, `/how-to/automate-quote-requests` | 4/0/73.5 | — | KEEP | R5 KEEP. Has impressions; light improve later. |
| `/resources/can-ai-follow-up-with-leads` | "can ai follow up with old leads…" (2 @71) | `/resources/ai-lead-follow-up-guide` (606 words, 6 impr) | 2/0/71 | — | **MERGE→`/resources/ai-lead-follow-up-guide`** | Changes R5 KEEP. Evidence: 247-word stub on the identical intent as the 606-word guide; 0 inbound files. Carry its FAQ into the guide. |
| `/resources/can-ai-run-my-customer-support` | long conversational query | `/services/ai-customer-support-agent` | 1/0/1 | — | KEEP | R5 PROTECT (1.0). |
| `/resources/what-is-an-ai-worker` | "ai workers" (5), "ai worker" (3 @46) | `/demo` (top query "ai workers") | 8/0/59.4 | — | KEEP | R5 KEEP. Brand vocabulary with real impressions. |
| `/resources/best-ai-tools-for-contractors` | "best ai tools for contractors" | `/industries/contractor-ai-automation`, `/ai-receptionist-for-contractors` | 124/0/76 | — | **IMPROVE** | R5 RETITLE P2. #2 page by impressions at **279 words**. Outline §2.10. |
| `/resources/best-ai-automations-for-service-businesses` | "best ai automations service business" | best-ai-tools-for-small-business (→ merged in) | 2/0/34.5 | — | **IMPROVE** | R5 KEEP. 253 words; becomes the service-business listicle. |

### 1.9 How-to (9)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/how-to/add-ai-chatbot-to-website` | "how to add ai chatbot to website" | `/services/ai-chatbot-for-website` | none | T9 | KEEP | R5 KEEP. 655 words. |
| `/how-to/automate-quote-requests` | "automate quote requests" | `/services/ai-quote-generator` | none | T9 | KEEP | R5 KEEP. 687 words. |
| `/how-to/create-ai-receptionist-for-small-business` | "how to create an ai receptionist" | R5 C5 pile-up | none | T9 | **IMPROVE** | R5 RETITLE P3. R6 §5: "names no tool"; R6 P2-15 stale "BC minimum wage 2024" at `lib/data/howto.ts:179`. Make it a real how-to with a named stack; fix the wage line. |
| `/how-to/automate-customer-replies` | conversational support query (2 @**8.5** — best query position on site) | `/services/ai-customer-support-agent` | 14/0/37.4 | — | KEEP | R5 KEEP P2: "Treat this page's structure as the template for future AEO content." Do not edit. |
| `/how-to/automate-invoice-reminders` | "automate invoice reminders" | `/services/ai-invoice-reminder-system` | 2/0/17 | — | KEEP | R5 PROTECT. |
| `/how-to/automate-youtube-shorts` | "automate youtube shorts" | `/creators/ai-youtube-shorts-automation` (1 @42) | none | — | **MERGE→`/creators/ai-youtube-shorts-automation`** | Changes R5 KEEP. Exact-intent duplicate, 297 words, 0 impr, 0 inbound. |
| `/how-to/build-faceless-content-system` | "faceless content system" | `/creators/ai-faceless-channel-automation` | none | — | **MERGE→`/creators/ai-faceless-channel-automation`** (→ `/creators` if twin noindexed) | Changes R5 KEEP. 304 words, 0 impr, 0 inbound. |
| `/how-to/automate-missed-calls` | "missed call automation" (1) | `/use-cases/missed-call-automation` (2 @89), `/tools/missed-call-revenue-calculator` | 1/0/68 | — | **MERGE→`/use-cases/missed-call-automation`** | Changes R5 KEEP. Evidence: two sub-300-word pages (295 / 296) on the identical token; 3 impressions combined; the use-case is R5's REWRITE target and becomes the single missed-call page (30-page-plan #5 without a new URL). |
| `/how-to/automate-review-requests` | "automate review requests" | `/services/ai-review-engine` | none | — | **IMPROVE** | R5 KEEP. R6 P0-1 called its FAQ "the honest half" of the review-compliance story; 327 words — expand as the compliance explainer that the engine page links to. |

### 1.10 Compare (21)

| URL | Intended query | Overlaps | GSC | Templ. | Action | Reason |
|---|---|---|---|---|---|---|
| `/compare/custom-ai-tool-vs-saas` | "custom ai tool vs saas" | custom-ai-app-vs-template | none | T10 | KEEP | R5 KEEP. |
| `/compare/ai-automation-agency-vs-diy` | "ai automation agency vs diy" | — | none | T10 | KEEP | R5 RETITLE P3 (declaration-only). |
| `/compare/ai-receptionist-vs-human-receptionist` | "ai receptionist vs human receptionist" | `/compare/ai-receptionist-vs-virtual-receptionist` — `compare.ts:549` defines a virtual receptionist as "a real person answering remotely", i.e. the same alternative | none | T10 | **MERGE→`/compare/ai-receptionist-vs-virtual-receptionist`** | Changes R5 RETITLE P3. Evidence: both compare AI to a human; 416 vs 544 words; 0 impr both; "virtual receptionists for contractors" has 11 impr, "human receptionist" none. 3 inbound files. |
| `/compare/ai-chatbot-vs-live-chat` | "ai chatbot vs live chat" | — | none | — | KEEP | R5 RETITLE P3 (declaration-only). FK grade 17.0 (R6 §6) — readability pass later. |
| `/compare/ai-automation-vs-virtual-assistant` | "ai automation vs virtual assistant" | hiring-vs-ai | none | T10 | KEEP | R5 KEEP. |
| `/compare/custom-ai-app-vs-template` | "custom ai app vs template" | custom-ai-tool-vs-saas | none | T10 | KEEP | R5 KEEP. |
| `/compare/ai-workflow-automation-vs-manual-admin` | "workflow automation vs manual admin" | — | none | — | KEEP | R5 KEEP. |
| `/compare/hiring-vs-ai-automation` | "hiring vs ai automation" | — | 1/0/3 | — | KEEP | R5 PROTECT (3.0). R6 Tier A. |
| `/compare/ai-receptionist-vs-virtual-receptionist` | "virtual receptionist vs ai" | human-receptionist (→ merged in) | none | T10 | KEEP | R5 KEEP. MERGE target. |
| `/compare/ai-receptionist-vs-answering-service` | "ai receptionist vs answering service" | `/resources/ai-receptionist-cost` | none | T10 | **IMPROVE** | R5 RETITLE P1 → "AI Receptionist vs Answering Service — What Each Actually Costs". R6 Tier A ("recommends against itself"). |
| `/compare/chatgpt-vs-custom-ai-agent` | "chatgpt vs custom ai agent" | — | none | T10 | KEEP | R5 KEEP. |
| `/compare/custom-ai-automation-vs-zapier` | "custom ai automation vs zapier" | `/compare/make-vs-zapier-vs-custom-ai-automation` (861 words, strict superset) | none | T10 | **MERGE→`/compare/make-vs-zapier-vs-custom-ai-automation`** | Changes R5 KEEP. Evidence: Zapier appears in both titles; 0 impr both; 573 vs 861 words; 1 inbound file. |
| `/compare/gohighlevel-ai-vs-custom-ai-automation` | "gohighlevel ai vs custom" (GHL builder-intent trap noted in `99-MASTER`) | — | none | T10 | KEEP | R5 KEEP. |
| `/compare/intercom-fin-alternative-small-business` | "intercom fin alternative" (site-operator query 1 @9) | — | none | — | KEEP | R5 KEEP. |
| `/compare/ai-chatbot-vs-ai-receptionist` | "chatbot vs ai receptionist" | — | none | — | KEEP | R5 KEEP. |
| `/compare/best-ai-receptionist-small-business-canada` | "ai receptionist for small business" (19 @84.8) | `/ai-receptionist` | none | — | **IMPROVE** | R5 RETITLE P2 → "Best AI Answering Service for a Canadian Small Business". 672 words. |
| `/compare/ai-receptionist-pricing-canada` | "ai receptionist pricing canada" | `/resources/ai-receptionist-cost` | 1/0/4 | — | KEEP | R5 PROTECT (4.0). |
| `/compare/ai-automation-agency-pricing` | "ai automation agency pricing" | `/pricing` | none | — | KEEP | R5 RETITLE P3 (declaration-only). 738 words. |
| `/compare/make-vs-zapier-vs-custom-ai-automation` | "make vs zapier vs custom" | custom-vs-zapier (→ merged in) | none | — | KEEP | R5 KEEP. MERGE target. |
| `/compare/ai-consultant-vs-ai-automation-agency` | "ai consultant vs ai automation agency" (trap term owned by bdc.ca — R5 §2.4) | `/ai-automation-agency` (10 @4.3) | none | — | **MERGE→`/ai-automation-agency`** | Changes R5 REWRITE P3. Evidence: R5 itself calls the target term a documented trap; rewriting a 0-impression page toward a term the site cannot win is wasted effort; the agency money page ranks 4.3. 1 inbound file. |
| `/compare/ai-built-by-hand-vs-generic-ai-agency` | brand vs generic agency | `/about` | none | — | **MERGE→`/about`** | Changes R5 KEEP. Evidence: self-comparison page, 420 words, 0 impr, R6 §5 "low" gain, FK 16.6; its argument is the About page's job (§2.15). 1 inbound file. |

### 1.11 Use-cases (25) — T7 applies to every row

| URL | Intended query | Overlaps | GSC | Action | Reason |
|---|---|---|---|---|---|
| `/use-cases/ai-receptionist-for-contractors` | "ai receptionist for contractors" | `/ai-receptionist-for-contractors` (byte-identical `keywords[0]`, R5 C4) | none | **MERGE→`/ai-receptionist-for-contractors`** | R5 MERGE **P0**. 377 words vs 887. Repoint `industries.ts:192,326,661`, `money.ts:250`, `services.ts:180`. |
| `/use-cases/lead-capture-ai-for-real-estate` | "lead capture ai real estate" | `/industries/real-estate-agent-ai-automation`; title carries dead term "AI Lead Follow-Up Agent for Real Estate" (R6 §3) | none | **MERGE→`/industries/real-estate-agent-ai-automation`** | Changes R5 KEEP. Three URLs on one off-core vertical, all 0 impr; 347 words; 2 inbound files. |
| `/use-cases/ai-chatbot-for-restaurants` | "ai chatbot for restaurants" | `/industries/restaurant-ai-automation` | 2/0/8 | KEEP | R5 PROTECT (8.0). |
| `/use-cases/ai-receptionist-for-clinics` | "ai receptionist for clinics" | `/industries/clinic-ai-automation` (736 words) | none | **MERGE→`/industries/clinic-ai-automation`** | Changes R5 NEEDS-OWNER. Duplicate inside the vertical either way; 324 words; 0 inbound. Vertical decision stays with the owner (G2). |
| `/use-cases/ai-invoice-reminders-for-small-business` | "automate invoice reminders" | `/services/ai-invoice-reminder-system` (identical `keywords[0]`, R5 C4) | none | **MERGE→`/services/ai-invoice-reminder-system`** | R5 MERGE P2. 247 words. |
| `/use-cases/custom-ai-app-for-startups` | "custom ai app for startups" | `/custom-ai-app-development` (10.2) | none | **MERGE→`/custom-ai-app-development`** | Changes R5 KEEP. Off-ICP ("startups"), 272 words, 0 impr, 0 inbound. |
| `/use-cases/ai-receptionist-for-dentists` | "ai receptionist for dentists" | dental-clinic industry | 1/0/2 | KEEP | R5 PROTECT (2.0). |
| `/use-cases/ai-booking-assistant-for-salons` | "booking assistant salons" | `/industries/salon-ai-automation` | none | **MERGE→`/industries/salon-ai-automation`** | Changes R5 KEEP. 323 words, 0 impr, 1 inbound. |
| `/use-cases/ai-chatbot-for-ecommerce` | "ai chatbot for ecommerce" | `/services/ai-chatbot-for-website` | none | **MERGE→`/services/ai-chatbot-for-website`** | Changes R5 KEEP. Off-ICP; 321 words; 0 impr; 1 inbound. (Industry twin also leaves — §1.5.) |
| `/use-cases/ai-content-engine-for-creators` | "ai content engine creators" | `/creators` cluster | none | **MERGE→`/creators`** | Changes R5 KEEP. 255 words, 0 impr, 0 inbound; duplicate of the hub pitch regardless of the G2 decision. |
| `/use-cases/automate-admin-for-accountants` | "ai automation for accountants" | `/industries/accountant-ai-automation` (both 4.0 — R5 C4 **do not merge**) | 1/0/4 | KEEP | R5 PROTECT. |
| `/use-cases/ai-document-analyzer-for-law-firms` | "ai document analyzer law firm" | `/industries/law-firm-ai-automation` | none | **MERGE→`/industries/law-firm-ai-automation`** | Changes R5 NEEDS-OWNER. 257 words, 0 impr, 1 inbound. Vertical stays with owner (G2). |
| `/use-cases/ai-receptionist-for-real-estate` | "ai receptionist real estate" | real-estate industry | none | **MERGE→`/industries/real-estate-agent-ai-automation`** | Changes R5 KEEP. 333 words, 0 impr, 0 inbound. |
| `/use-cases/ai-support-bot-for-saas` | "ai support bot saas" | `/services/ai-customer-support-agent` | none | **MERGE→`/services/ai-customer-support-agent`** | Changes R5 KEEP. Off-ICP (SaaS), 324 words, 0 impr, 1 inbound. |
| `/use-cases/personal-ai-assistant-app` | "personal ai assistant app" | `/custom-ai-app-development` | none | **MERGE→`/custom-ai-app-development`** | Changes R5 KEEP. Consumer framing dilutes positioning; 269 words; 0 impr; 0 inbound. |
| `/use-cases/missed-call-automation` | "missed call automation" (1), "missed call text back automation" (1) | `/how-to/automate-missed-calls` (→ merged in), `/tools/missed-call-revenue-calculator` | 2/0/89 | **IMPROVE** | R5 REWRITE P2. Becomes the single missed-call page; anchor the calculator; apply the `for contractors` qualifier (R5 §2.4 trap note). |
| `/use-cases/estimate-follow-up-automation` | "estimate follow up automation" | `/ai-lead-follow-up-agent` — answer text "chases every quote you send until it turns into a yes or a no" vs money page "chases … every quiet quote … until you get a yes or a no" | none | **MERGE→`/ai-lead-follow-up-agent`** | Changes R5 KEEP. Identical promise, 265 vs 948 words, 0 impr, 2 inbound files. 30-page-plan #3 wanted a new `/quote-follow-up`; the money page already holds the demand (24 impr) — improve it instead (§2.6). |
| `/use-cases/no-show-reminder-automation` | "no show reminder automation" | `/use-cases/appointment-reminder-automation` | none | **MERGE→`/use-cases/appointment-reminder-automation`** | Changes R5 KEEP. Same intent (reminders); 240 vs 224 words; 0 impr both; 3 inbound files. |
| `/use-cases/appointment-reminder-automation` | "appointment reminder automation" | no-show (→ merged in), `/services/ai-calendar-booking-agent` | none | **IMPROVE** | R5 KEEP. Thinnest page on the site (224 words) becomes the one reminders page. Fix "proven to reduce no-shows" (`useCases.ts:626`, §3). |
| `/use-cases/google-business-profile-lead-automation` | "google business profile automation tool" (1) | — | 2/0/57.5 | KEEP | R5 KEEP. |
| `/use-cases/instagram-dm-automation` | "instagram dm automation" | `/use-cases/facebook-lead-automation` (3 @52.3) | none | **MERGE→`/use-cases/facebook-lead-automation`** | Changes R5 KEEP. Social-lead intent; 252 words; 0 impr; 1 inbound. Retitle target "Facebook & Instagram lead automation". |
| `/use-cases/facebook-lead-automation` | "facebook leads automation" (1 @48), "facebook lead ads automation" (1) | instagram (→ merged in) | 3/0/52.3 | KEEP | R5 KEEP. |
| `/use-cases/ai-operations-assistant` | "ai operations assistant" | `/services/ai-admin-assistant` | none | **MERGE→`/services/ai-admin-assistant`** | Changes R5 KEEP. 253 words, 0 impr, 0 inbound. |
| `/use-cases/ai-sop-generator` | "sop generator" (1), "sop ai" (1) | `/services/ai-document-generator` | 2/0/87.5 | KEEP | R5 KEEP. Has its own query family. |
| `/use-cases/client-onboarding-automation` | "client onboarding automation" | `/services/ai-intake-form-builder` | none | **MERGE→`/services/ai-intake-form-builder`** | Changes R5 KEEP. 228 words, 0 impr, 1 inbound. |

### 1.12 Totals (216, each exactly once)

| Action | n | Notes |
|---|---:|---|
| KEEP | **119** | incl. all R5 PROTECT + free tools + owner-gated verticals |
| IMPROVE | **37** | 17 priority pages (§2) + R5 RETITLE set + R5 REWRITE set + 2 use-case survivors |
| MERGE→target | **43** | all 0 impressions on disk; all targets are KEEP/IMPROVE; all via 301 in `next.config.js` |
| REDIRECT→target | **3** | Calgary / Edmonton / Toronto → `/remote-ai-development` (Gate G2) |
| NOINDEX | **14** | creator pages without a GSC row (Gate G2) |
| REMOVE | **0** | nothing is deleted |

Check: 119 + 37 + 43 + 3 + 14 = 216. Per group: static 12/5/0/0/0 · tools 5 · money 7/5 · services 20/1/4 · industries 26/5/8 · creators 6/0/0/0/14 · locations 7/9/0/3 · resources 11/6/7 · how-to 4/2/3 · compare 15/2/4 · use-cases 6/2/17.

---

## 2. The priority pages

### 2.0 The receptionist cannibalization and the canonical winner

The prior research found the receptionist phrase spread across four indexable surfaces (memory calls it "a 4-way cannibalization"; R5 §0.1 narrows the *exact* `keywords[0]` collision to three and notes `/ai-receptionist` targets the broader head term). At HEAD the four surfaces on "AI receptionist (for contractors)" are:

| Surface | Title / H1 at HEAD (A2 crawl) | GSC | Internal support |
|---|---|---|---|
| `/` | "AI Receptionist for Contractors in Surrey & Metro Vancouver" / "Your business number, answered by an AI receptionist built for contractors." | 60/3/15.4 | 1,071 inbound |
| `/ai-receptionist` | "AI Receptionist for Local Businesses" | **146**/0/72.5 — Google serves it for "ai receptionist for contractors" (gsc-baseline 04 §2) | footer anchor "AI receptionist" ×233 (`components/Footer.tsx:123`) |
| `/ai-receptionist-for-contractors` | "AI Receptionist for Contractors" | 16/0/71.9 | **nav** anchor "AI Receptionist" ×233 (`lib/data/site.ts` `navLinks[0]`), footer ×233, 479 inbound (R5 C1) |
| `/use-cases/ai-receptionist-for-contractors` | "AI Receptionist for Contractors & Trades" (template H1) | none | 5 files |
| (+ local variant) `/locations/ai-receptionist-surrey-bc` | "AI Receptionist in Surrey, BC" | 6/0/18.7 | footer ×233 |

**Canonical winner for "ai receptionist for contractors": `/ai-receptionist-for-contractors`.** It is the nav target, the most-linked money page, the purpose-built page, and its title was already fixed on this branch. The reason it earns 9× fewer impressions than `/ai-receptionist` on 2× the links is R5 C1: two case-variant identical anchors ("AI Receptionist" nav → contractors page; "AI receptionist" footer → generic page) tell Google two URLs are the same page, 233 times each — **still present at HEAD** (`Footer.tsx:122-123` + `site.ts navLinks`).

What each surface becomes:
- `/ai-receptionist-for-contractors` — canonical for the contractor phrase. IMPROVE (§2.4). Nav anchor renamed "AI Receptionist for Contractors".
- `/ai-receptionist` — canonical for the **head term and the answering-service noun** (146 impressions must not be redirected). Retitle per R5 but keep "AI Receptionist" in the title because that is the query family delivering the impressions: **"AI Receptionist & Answering Service for Local Businesses in BC | Handbuilt AI"**. Footer anchor renamed "AI answering service". Absorbs `/resources/what-is-an-ai-receptionist`.
- `/` — brand + positioning page; keep its title (only clicks on the site) but stop adding receptionist head-term surfaces. Its H1 is fine.
- `/use-cases/ai-receptionist-for-contractors` — 301 → canonical (R5 P0).
- `/locations/ai-receptionist-surrey-bc` — the Surrey variant, keep; it ranks 18.7 and answers "AI receptionist Surrey".

The chatbot cluster has the only **measured** collision (gsc-baseline 04 §3): `/ai-chatbot-development` (118 @68.6) vs `/locations/ai-chatbot-developer-vancouver` (15 @54.1) on "custom chatbot development vancouver". Keep both; the fix is the footer slot (R5 C2), the "developer→development" retitle (R5 C3), and cross-links — not a merge.

### 2.1 `/` (home)
- **Now:** title "AI Receptionist for Contractors in Surrey & Metro Vancouver | Handbuilt AI"; H1 "Your business number, answered by an AI receptionist built for contractors."; 1,890 words; 60/3/15.4; FK grade 7.9 (R6 §6 — the best-written page).
- **Generic:** nothing in the hero; the weakness is proof. Calculator asserts "$120,960" before input (R6 P2-13, `components/marketing/LiveCalcStrip.tsx`). FAQ "you can listen to the calls" with no recording/consent line (`lib/data/homeFaqs.ts:23`).
- **Missing:** a real artefact (recording/transcript of the studio's own line — R6 §4 item 3), the founder by name, the honest-limits block, a single "who this is not for".
- **Outline:** keep hero → "What it does on a real call" (transcript excerpt, labelled as the studio's own line, not a customer) → three trades × one specific failure it prevents → price + what you own → "Not for you if…" (fewer than ~20 calls/mo; every call is a custom consult — reuse `resources.ts` is-worth-it text) → calculator with empty defaults → founder card (name, photo, Surrey/Delta) → FAQ (+ recording/consent line) → CTA "Request a plan" (not "Book").

### 2.2 `/industries` (overview)
- **Now:** "AI Automation by Industry | Handbuilt AI" / H1 "AI Automation Built for Your Industry"; 1,218 words; 20/**1**/5.8; intro "Every trade loses money in different places" (`app/industries/page.tsx:17`). Lists all 39 (31 after §1.5).
- **Generic:** description names "dental clinics, real estate, restaurants" ahead of the positioning trades; hub is a flat card grid.
- **Missing:** tiering (trades first, then local services, then "also"), per-trade one-line failure mode, any proof.
- **Outline:** H1 "AI receptionist & follow-up systems by trade" → Tier 1 trades (plumbing, HVAC, electrical, roofing, landscaping, fencing/decks, painting, cleaning, pest, moving) with one concrete failure each → "Other local services we build for" (clinics, salons, gyms, professional services) → "How we scope a trade build" (3 steps) → CTA. Keep the URL and the 5.8 position; do not change the title's head noun.

### 2.3 `/ai-receptionist`
- **Now:** "AI Receptionist for Local Businesses" (title = H1); 772 words; 146/0/72.5; sections "What's included in the setup / How it handles different types of inquiries / Who this is for" (`lib/data/money.ts:210-…`); scenario "Say a residential HVAC contractor…".
- **Generic:** answer paragraph covers chat/text/missed-call but the site's strongest demand is *voice*; no named platform; pricing FAQ only.
- **Missing:** the answering-service cost comparison (biggest gap, `20-DEFINITIVE` cluster 1), definition section (absorb `what-is-an-ai-receptionist`), disclosure posture, limits (languages: `resources.ts` "English reliably"), a test call.
- **Outline:** new title (§2.0) → answer-first: what it answers (calls, texts, web) and what it hands off → "AI receptionist vs answering service vs hiring — cost shapes" table (one-time vs per-minute vs salary) → "What it will not do" (emergencies transfer; languages; no promise of indistinguishability) → setup + ownership → definition block → FAQ (keep 4, add "Does it say it's an AI?" = yes, proactively) → CTA. Cross-link contractors page prominently ("Contractors: start here").

### 2.4 `/ai-receptionist-for-contractors`
- **Now:** "AI Receptionist for Contractors | Handbuilt AI" / same H1; 887 words; 16/0/71.9; 8 FAQs incl. "Will my customers know they're talking to AI?"; scenario "Imagine a fencing contractor…".
- **Generic:** "You're on a roof, under a sink, or inside a panel box" is good; the three sections are assertion-only ("Built for Trades — Not a Generic Chatbot") with no artefact.
- **Missing:** a call transcript, the Jobber/Housecall booking question (30-page-plan facts gap #8), failure modes (bad cell reception, caller refuses AI, after-hours emergencies), pricing insight (what the $1,500 covers vs Care Plan), author.
- **Outline:** H1 unchanged → 40-second transcript of a booking call (studio line, labelled) → "Three calls it handles / two it hands to you" → "Works with" (only integrations actually delivered — G2 facts gap #8; otherwise say "we connect to your calendar; CRM integrations scoped per build") → price + ownership → limits → 8 FAQs (rewrite the "know they're talking to AI" answer to the disclosure-first stance) → founder line → CTA. Nav anchor renamed (§2.0).

### 2.5 `/locations/ai-receptionist-surrey-bc` (the "locations/surrey" page — no `/locations/surrey` route exists)
- **Now:** "AI Receptionist in Surrey, BC" (title = H1); 658 words; 6/0/18.7; sections "What a Surrey AI receptionist handles / Why build it locally"; 5 FAQs incl. "How much does an AI receptionist cost in Surrey?".
- **Generic:** city could be swapped without loss (R6 §5 pattern); "Why build it locally" has no Surrey specific.
- **Missing:** real Surrey specifics (Newton/Guildford/Cloverdale/South Surrey trade corridors, 604/778 number porting, in-person availability), GBP (does not exist — R5 C6 caveat), the near-me answer.
- **Outline:** H1 keep → "For Surrey trades" (name three areas and a real trade mix) → what it answers → "Can I meet you?" (honest: Surrey/Delta in person; the rest of Metro remote) → price → FAQ (keep) → link to contractors canonical + the Surrey agency page. Retitle only if A6 confirms no loss of the 18.7 position.

### 2.6 `/ai-lead-follow-up-agent`
- **Now:** "AI Lead Follow-Up Agent | Handbuilt AI" / H1 "AI Lead Follow-Up Agent"; 948 words; 24/0/77.9; top query "ai sales follow up system for construction company"; sections "Speed-to-Lead…/ What the Follow-Up Agent Actually Does / Not a Marketing Tool — a Closing Tool"; 8 FAQs.
- **Generic:** H1/title on a dead term (R6 §3: "lead follow-up agent" 0 market usage); no example message; no cadence shown.
- **Missing:** the actual sequence (the free generator two clicks away already produces it — embed a sample), CASL/consent line for SMS, what happens when a lead says "stop", failure modes (wrong number, duplicate leads), pricing insight.
- **Outline:** title per R5 "AI Lead Follow-Up for Contractors — Chase Every Quote" (H1 "Quotes that go quiet get chased — automatically") → sample 5-touch sequence (day 0/1/3/7/14) with real message text → "Where leads come from" (form, missed call, GBP, Facebook) → consent + STOP handling → what it will not do → price → FAQs → link the generator tool. Absorbs `/use-cases/estimate-follow-up-automation`.

### 2.7 `/done-for-you-ai-automation`
- **Now:** "Done-for-You AI Automation for Small Business"; 911 words; 28/0/50.6; top query "done for you ai automation"; sections "Why DIY AI Fails…/ What Actually Gets Automated / How Pricing Works — No Surprises"; CTA "Request a free AI opportunity review".
- **Generic:** "You've seen the AI demos" pain; no named tools; the "what gets automated" list is the same list as every services page.
- **Missing:** the ownership answer (facts gap #6-7 — what transfers: repo, keys, numbers), a scoping example, failure modes ("what if the integration breaks"), the Care Plan boundary.
- **Outline:** keep title → "What done-for-you means here" (we build inside the accounts you own; you keep everything — only claim what facts gap #6 confirms) → a worked scope (one trade, three automations, the price band it lands in) → "What we won't automate" → Care Plan vs no Care Plan → FAQs → CTA.

### 2.8 `/ai-chatbot-development`
- **Now:** "Custom AI Chatbot Development | Vancouver & BC | Handbuilt" (`money.ts:142`; A2 crawl renders "Custom AI Chatbot Development | Handbuilt AI" via the layout template — A6 should check which wins) / H1 "Custom AI Chatbot Development"; 769 words; 118/0/68.6; click depth 3, 8 inbound (`13-internal-linking` §).
- **Generic:** scenario is a dental clinic on a contractor-positioned site; no Vancouver section despite the #1 query being Vancouver.
- **Missing:** a live example (the `/demo` showroom is one — link it), the "will it give wrong answers" failure modes with a real guardrail description, hosting/usage cost insight (has "$100–400/mo+"), Vancouver delivery specifics.
- **Outline:** H1 keep → "Built for Vancouver & BC businesses" (in-person Surrey/Delta, remote Metro) → "Try one" (link `/demo`) → what it is trained on → "Where chatbots fail and how ours is guarded" → price incl. hosting → FAQs → link the Vancouver location page and get the footer chatbot slot (R5 C2).

### 2.9 `/locations/ai-chatbot-developer-vancouver`
- **Now:** "AI Chatbot Developer in Vancouver" (title = H1); 632 words; 15/0/54.1 — outranks the money page on the shared query.
- **Generic:** "developer" (a person) vs every query's "development" (R5 C3); template sections "What a custom Vancouver chatbot does / Local developer, real ownership".
- **Missing:** links from the money page and hub (2 inbound), one Vancouver-specific example, the demo link.
- **Outline:** title "Custom AI Chatbot Development in Vancouver, BC" (slug unchanged) → answer-first with price → "Vancouver businesses we build for" (kinds, not fake names) → try the demo → ownership → FAQ. Cross-link both ways with `/ai-chatbot-development`.

### 2.10 `/resources/best-ai-tools-for-contractors`
- **Now:** "Best AI Tools for Contractors (2026) | Handbuilt" (`resources.ts:1254`; rendered "Best AI Tools for Contractors | Handbuilt AI") / H1 "Best AI Tools for Contractors"; **279 words**; 124/0/76 (#2 page); two sections, 4 bullets, 2 FAQs; top query "ai marketing tools for contractors".
- **Generic:** the four bullets are the site's own four products; no third-party tool is named — a "best tools" page that reviews nothing.
- **Missing:** actual tools (Jobber, Housecall Pro, ServiceTitan, CompanyCam, a voice-AI provider, the site's own free calculators), selection criteria, what was tested and how, prices, who each is not for, a date and author.
- **Outline:** title keep the year only if a visible "Updated <date>" appears on-page → "How we picked" (criteria + what we actually tested — only what is true) → 8–10 tools grouped: answering/receptionist, quoting, scheduling/FSM, follow-up, reviews, photos/docs, free calculators (link all five) → per tool: what it does, price, best for, not for → "When to connect them into one system" (the Handbuilt pitch, last) → FAQs (keep 2, add "Do I need Jobber first?").

### 2.11 `/resources/can-ai-answer-business-phone-calls`
- **Now:** "Can AI Answer Business Phone Calls?"; 523 words; 7/0/68.6; sections "What AI Can Handle / Where AI Falls Short / How It Actually Works / Best For / Not Best For"; 5 FAQs (languages answer is the honest one: "English reliably").
- **Generic:** R6 §5 Tier B — "Six generic verbs. No named provider, no cost, no limitation the reader could act on." Structure is actually right; the content is abstract.
- **Missing:** a transcript, latency/interruption behaviour, what happens on bad audio, the emergency path shown, a cost line, a date.
- **Outline:** keep H1 → 3-sentence answer with a number ("answers in under N seconds" only if measured) → transcript excerpt → "What it handles / hands off" table → failure modes (bad reception, talk-over, accents, refusal to talk to AI) → cost shapes → FAQs (keep) → link is-worth-it + cost page.

### 2.12 `/resources/is-ai-receptionist-worth-it`
- **Now:** "Is an AI Receptionist Worth It?"; 556 words; 25/0/42.4 (best resource); honest break-even section ("This is illustrative"); 5 FAQs incl. "No invented numbers here".
- **Generic:** little — this is one of the better pages. Break-even is prose; the site has a calculator that does it.
- **Missing:** the missed-call calculator embedded/linked, a "when to say no" worked case, author.
- **Outline:** keep all sections → embed/link `/tools/missed-call-revenue-calculator` in the break-even section → add "Two businesses where we'd say no" (low volume; bespoke consults) → keep FAQs → author line.

### 2.13 `/pricing`
- **Now:** "Pricing — Custom AI Builds from $1,500 CAD"; H1 "Pricing that's easy to say yes to"; 558 words; no GSC row (top query "ai custom integration pricing"); prices render from `packages.ts`; subline claims "Built remotely for small businesses across Canada, the US, Australia & New Zealand" (`app/pricing/page.tsx:~44`).
- **Generic:** H1 is a slogan; the AU/NZ claim is unverified (facts gap #14).
- **Missing:** the answering-service comparison (per-minute traps — 30-page-plan #7), what is in/out of each tier, what you own, Care Plan boundary, the AI Review Engine $1,000 SKU below the $1,500 floor (open owner call).
- **Outline:** H1 "What it costs, in CAD, with nothing hidden" → three tiers with in/out lists → "Compared with what you pay now" (per-minute answering service, part-time admin, SaaS stack) → Care Plan → shop line → FAQs → CTA "Request a fixed quote". Drop AU/NZ unless confirmed.

### 2.14 `/demo`
- **Now:** "AI Worker Showroom — Test a Real AI Worker"; H1 "Test a real AI worker."; 175 words; 3/0/3.7; **not in the sitemap**; scripted-fallback disclosure already shipped (`25aeaa8`).
- **Generic:** "AI worker" is brand vocabulary; fine here (it has 8 impr on "ai worker(s)").
- **Missing:** crawlable explanation of what is simulated vs real, a guided 3-step try, link to the contractors page, sitemap entry.
- **Outline:** add to sitemap → keep H1 → one paragraph "what you're testing and what is simulated" (server-rendered) → three suggested prompts per worker → "Book the real thing" → CTA. Owned by A4/A11 for UX; content only here.

### 2.15 `/about`
- **Now:** "About Handbuilt — Your Personal AI Studio"; H1 "A personal AI studio, not a software factory"; 372 words; no GSC row; names nobody (R6 §4); `public/founder.jpg` untracked and unused; `site.ts:10` owner "Pavneet" only.
- **Generic:** "most people know AI could help their business or life" — consumer framing against a contractor homepage.
- **Missing:** founder name + photo + one-paragraph real bio, location, what he has actually built (A9's verified proof register), Person schema, LinkedIn (currently `#`), how work is delivered, the "not for" list.
- **Outline:** H1 "One builder in Surrey, BC. Here's who." → photo + name + 6-line bio (only A9-verified facts) → "What I've built" (the verified register; no customer counts) → "How a build works" (scope → build → handover → Care Plan) → "What I won't build/claim" (no fake reviews, no gating, no invented stats — quote the house rule from `app/page.tsx:31`) → Person + Organization schema → contact. Absorbs `/compare/ai-built-by-hand-vs-generic-ai-agency`.

### 2.16 Case studies / work — **does not exist**
No `app/work`, `app/case-studies`, `app/portfolio` route; no `Review`/`aggregateRating` schema anywhere (§3). `app/page.tsx:31` bans testimonials/logos/invented statistics. **Recommendation:** do not create a "case studies" page until A9's proof register confirms at least one named, consented engagement. Until then the honest proof surfaces are `/demo`, the five tools, and a recording of the studio's own line (R6 §4 item 3). If a page is created, it is `/work` with only verified items and it is added to the sitemap in the same commit.

### 2.17 `/create` and `/start`
- `/create` **now:** "Start a Build — Request Your Custom AI System"; H1 "Tell us what you want to build"; **33 words**; 14/0/7.6; promises "a plan and a quote within one business day". `/start` **now:** "Start your AI consultation — talk to the Handbuilt AI"; 107 words; not in sitemap; overlay `ConsultationCall`.
- **Generic:** `/create` has no reassurance content (what happens next, who reads it, response time evidence). Two entry points with different promises ("plan and quote" vs "custom plan in about a minute").
- **Missing (`/create`):** what to expect after submit, what you will and won't be asked, a no-obligation line, privacy line, the founder's name as the reader of the form, and the lead-email blocker (00-PLAN blocker 2) means no confirmation email — the page must say what confirmation looks like.
- **Outline:** H1 keep → 3 bullets "what happens next" (read by Pavneet; reply within one business day by email; no call unless you ask) → form → "Prefer to talk it through first?" → `/start` link with an honest label ("a scripted AI intake, not a human call") → privacy line. Keep `/start` out of the sitemap; make its H1 and title stop implying a human consultation.

---

## 3. Claims audit — what survives R8 at HEAD `e732d98`

**Method:** re-read every R8 line at HEAD; then re-swept `lib/data/*`, `app/*`, `components/*` with `grep -rn -i -E` for: `our clients|clients (have|saw|see|report|tell)|customers (say|report|tell|love)|trusted by|testimonial|client logo|case stud|[0-9]+\+ (businesses|clients|customers|contractors|companies)|rated [0-9]|stars|reviewCount|aggregateRating|ratingValue|years of experience|since 20[0-9][0-9]|we (helped|built|installed|set up|deployed|delivered) (a|an|the|[0-9])`; a second pass for `[0-9]+% (more|fewer|less|increase|decrease)|saved \$|saves \$|recovered \$|[0-9]+x (more|faster|ROI)|paid for itself|booked [0-9]+`; `proven`; `never miss(es)? a call|97% less|15\+ languages|\$99 per month`; scenario openers classified by script (109 fields, §1 header).

### 3.1 Fixed since R8 (verified at HEAD)
- `_services_b.ts:41` (B1) now "They get the same review link as everyone else — screening who is asked to review breaks Google's policies…" ✔
- `_services_b.ts:439` (B2) scenario now "Everyone gets the same one-tap link… not instead." ✔ (`e732d98`)
- `_industries_b.ts:162` (C1) now carries the "not a covered entity" disclaimer ✔ (`9c0b7f0`)
- `conversationEngine.ts` :172 (invented "$3,000–$5,000 saves"), :216 ("Many of our clients felt the same way"), :252 ("I work with several businesses in <city>"), :258 ("can't tell it's AI") — all rewritten ✔
- `openaiConversationEngine.ts:160` ("cancel anytime") → "Point them at the written terms" ✔
- `app/page.tsx:109` — the phantom $99 "AI Workflow Audit" Offer is gone; only a comment remains ✔ (`a95f8c4`)

### 3.2 Survivors — must be fixed (file:line, verbatim)

| # | File:line | Text | Class | Renders? |
|---|---|---|---|---|
| S1 | `lib/data/howto.ts:298` | "…Most of our clients use a light footer note: 'This reply was drafted with AI assistance.' Customers rarely object." | **Fabricated client base + observed customer behaviour** (R8 A3, unfixed) | YES — `faqs` entry → FAQPage JSON-LD via `lib/seo.ts:131-135` |
| S2 | `lib/agent/conversationEngine.ts:234` | "Our AI receptionist never misses a call, even during your busiest times." | Absolute guarantee (R8 A1) | Via unauthenticated `POST /api/agent/call` (R8; 00-PLAN blocker 4) |
| S3 | `conversationEngine.ts:235` | "Our solution costs 97% less than hiring a full-time receptionist, and it works 24/7." | Invented statistic | same |
| S4 | `conversationEngine.ts:236` | "Your AI receptionist handles calls perfectly, even at 2 AM on weekends." | Absolute | same |
| S5 | `conversationEngine.ts:238` and `:260` | "Our AI speaks 15+ languages fluently…" / "serves customers in 15+ languages" | Capability claim contradicted by `resources.ts` ("English reliably") | same |
| S6 | `lib/agent/openaiConversationEngine.ts:119` | "You work 24/7, never miss a call, and handle multiple calls simultaneously." | Absolute (dead code — nothing imports it) | NO |
| S7 | `openaiConversationEngine.ts:260` | "…AI Receptionist Pro… works 24/7, never misses a call, and costs just $99 per month." | Absolute + price conflation | NO |
| S8 | `app/agent/leads/[id]/page.tsx:27,31,35` | "Hi John, this is Sarah from Handbuilt…" / "…never misses a call, and costs 97% less…" / "It's $99 per month…" | **Hard-coded fake call transcript** with a fictitious named agent and a `2024-01-15` date — not in R8 | App shell; `robots.txt` disallows `/agent/` but R5 notes it emits `index, follow` |
| S9 | `lib/data/useCases.ts:56` | "It's trained on your business and speaks naturally. Most callers can't tell, and the hard calls get routed to you." | Indistinguishability claim (the same class R8 removed at `conversationEngine:258`); contradicts the disclosure-first stance in `resources.ts` is-worth-it FAQ | YES — FAQ → JSON-LD (page is a MERGE source; carry nothing of this line into the canonical) |
| S10 | `useCases.ts:593` / `:599` / `:626` | "on a proven cadence" / "A proven multi-touch cadence" / "a schedule proven to reduce no-shows" | "Proven" without evidence (R8 D) | YES (`gets`/`steps` bullets) |
| S11 | `lib/data/_industries_c.ts:90` | "…a friendly, on-brand check-in that's proven to reactivate a share of them…" | "Proven" (R8 D) | YES — FAQ → JSON-LD |
| S12 | `lib/data/resources.ts:1140` | "…keep following up on a proven cadence until they reply, book, or opt out." | "Proven" (R8 D) | YES (page is a MERGE source) |
| S13 | `lib/data/_services_b.ts:40` and `:488` | "Which platforms can it post reviews to?" / "Google Business for posting reviews, Twilio…" | Capability the product cannot have (R6 P1-6, unfixed) | YES — FAQ → JSON-LD on both review pages |
| S14 | `app/llms.txt/route.ts:16,20` | "…delivers remotely to small businesses across Canada, the United States, Australia, New Zealand and the United Kingdom." / "works with clients remotely worldwide — most commonly Canada, the United States, Australia and New Zealand" | Unverified market claim + implied client-base distribution (30-page-plan facts gap #14); echoed on `app/pricing/page.tsx` ("Canada, the US, Australia & New Zealand") | YES (llms.txt, pricing) |
| S15 | `lib/data/homeFaqs.ts:23` | "…and you can listen to the calls." | Implies call recording; no recording/consent disclosure anywhere (R6 P2-14) | YES — homepage FAQ → JSON-LD |
| S16 | `lib/data/howto.ts:179` | "BC minimum wage 2024: $17.40/hour — a part-time receptionist (20 hrs/week) costs $1,400+/month" | Stale, self-dated statistic (R6 P2-15) | YES |

Not counted as claims but flagged for the pricing lane (A2 `stale_strings_found` column, verified in source): `resources.ts:119-120` "Full receptionist with calendar + CRM: $2,500–$3,500" / "Phone-based AI receptionist: $3,500–$7,500+"; `compare.ts:1076` "a basic receptionist also starts around $1,500. More complex receptionist…"; `compare.ts:58,299` and `resources.ts:1004` "$250/mo" SaaS threshold; `compare.ts:1311` "Typical range: ~$1,000–$10,000+/mo" (agency retainers — third-party figure). These are bands and third-party figures, not contradictions of `packages.ts` (1500/3500/10000/99), but `resources.ts:119-120` should be checked against the approved receptionist band before the cost page is rewritten.

### 3.3 Categories that came back empty (0 found)
`aggregateRating` · `reviewCount` · `ratingValue` · `Review` schema · "testimonial" (outside the honesty-rule prompts at `app/api/tools/route.ts:61`, `app/api/tools-demo/route.ts:37`, `lib/data/showroom.ts:271`, `app/page.tsx:31`) · "trusted by" · client logos · "X+ businesses/clients" · "years of experience" · "since 20xx" · dollar-amount customer results · past-tense "we set up/built/delivered <a customer>" (all 11 remaining "We set up" strings are present-tense build descriptions, per R8's cleared list, re-verified: `useCases.ts:31,823`, `_services_b.ts:84,125`, `locations.ts:799`, `_industries_b.ts:244`, `_industries_c.ts:65,241`). `showroom.ts:151,154` "5-star review…" remain sample *inputs* (R8 cleared). The three R6 P0-2 past-tense stories are gone; 0 of 109 scenarios read as a delivered result.

---

## 4. Authorship and freshness

| Surface | What it claims | Real? | Evidence |
|---|---|---|---|
| `/privacy`, `/terms` | "Last updated: June 6, 2026" | **Not maintained.** Hard-coded constant; the files' last commit is 2026-06-19 (`dbd4c9e`), i.e. edited after the stated date with the date unchanged. | `app/privacy/page.tsx:10,20`, `app/terms/page.tsx:10,20`; `git log -1 -- app/privacy/page.tsx` |
| Sitemap `lastmod` | none (deliberately removed) | Honest. Comment explains no real per-page date exists: "none of the content files in lib/data carry an `updated` field." | `app/sitemap.ts:6-22`. A2 reports prod still serves `lastmod = 2026-07-16T05:19:47Z` on all 216 — the fix is unmerged. |
| Registry content | no dates | Real last-commit dates: `locations.ts`, `compare.ts`, `useCases.ts`, `creators.ts`, `_creators_b.ts` → 2026-07-06 (`8e6f510`); `resources.ts` → 2026-07-31; `industries*/services*/howto.ts` → 2026-08-12 (claims fixes only); `money.ts` → 2026-08-12. | `git log -1 --format=%ad -- <file>` |
| `/resources/best-ai-tools-for-contractors` | title "(2026)" | A year in the title with no visible date on the page; content last committed 2026-07-31. | `resources.ts:1254` |
| Article JSON-LD (resource/compare pages) | `author` = Organization `@id`; no `datePublished`/`dateModified`; no `Person` anywhere | Machine-readable authorship is the company, not a person. | `lib/seo.ts:268-276`; R6 §4 |
| `<meta name="author" content="Pavneet">` | site-wide | Real but first-name only, and not an E-E-A-T signal. | `app/layout.tsx:57-58` (R6) |
| `/about` | "one builder" | No name, photo, bio, or credentials; `public/founder.jpg` untracked/unreferenced (`git status`). | `app/about/page.tsx:56-58` |
| Footer © year | `new Date().getFullYear()` at build | Frozen at build time on static pages (R6 P3-17). | `components/Footer.tsx:170` |

**Recommendation (Lane P + I):** add `published`/`updated` ISO fields to `LandingContent` (optional), populate only from git history or the rewrite date — never backfilled with guesses — and emit `datePublished`/`dateModified` + a visible "Updated <date>" only where the field exists. Make `/privacy`/`/terms` read their date from the same mechanism. Add `Person` schema on `/about` once the surname (facts gap #12) is confirmed.

---

## 5. Proposed implementation plan

### 5.1 Lanes and file ownership (no two lanes touch the same file)

| Lane | Owns (exclusive) | Does |
|---|---|---|
| **P — platform (first, blocks others)** | `lib/data/landing.ts`, `lib/seo.ts`, `lib/data/registry.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `next.config.js` | Add `noindex?: boolean` + optional `published/updated` to `LandingContent`; `landingMetadata` emits `robots: { index: false }` when set; `allLandingEntries()` and `llms.txt` skip noindexed rows; add `/creators` and `/demo` to the sitemap; fix S14 in `llms.txt`; **append the full redirect block in §5.2 once** (other lanes submit rows, P commits) and repoint the alias at `next.config.js:83`. |
| **A — money + chrome** | `lib/data/money.ts`, `lib/data/site.ts`, `lib/data/homeFaqs.ts`, `components/Footer.tsx`, `components/marketing/*`, `app/page.tsx` | §2.1, §2.3, §2.4, §2.6, §2.7, §2.8 rewrites; nav/footer anchor renames (R5 C1) and footer chatbot slot → `/ai-chatbot-development` (R5 C2); footer "AI business system" anchor text; S15; calculator defaults; absorb `what-is-an-ai-receptionist` content into `ai-receptionist`; `money.ts:250` repoint. |
| **B — resources + how-to** | `lib/data/resources.ts`, `lib/data/howto.ts` | §2.10–2.12 rewrites; `ai-receptionist-cost`, `ai-chatbot-cost`, `best-ai-automations-for-service-businesses`, `create-ai-receptionist…`, `automate-review-requests` improvements; remove the 7 merged resource rows and 3 merged how-to rows; S1, S12, S16. |
| **C — use-cases + services** | `lib/data/useCases.ts`, `lib/data/services.ts`, `lib/data/_services_b.ts` (read-only check of `lib/data/shopProducts.ts`, `lib/data/tools.ts` — no edits) | Remove 17 use-case rows and 4 service rows; rewrite `missed-call-automation` and `appointment-reminder-automation`; `ai-receptionist-setup` retitle; carry the compliant FAQ from `_services_b.ts:41` into the engine page; S9, S10, S13; `services.ts:180` repoint. |
| **D — industries** | `lib/data/industries.ts`, `lib/data/_industries_b.ts`, `lib/data/_industries_c.ts`, `app/industries/page.tsx`, `components/LandingHub.tsx` | §2.2 hub rewrite; landscaping/fence/hvac/plumber/electrician improvements; remove 8 merged rows; S11; repoint `industries.ts:192,326,661`. |
| **E — locations** | `lib/data/locations.ts` | §2.5 + §2.9; the 6 R5 retitles + white-rock/richmond/coquitlam/victoria template replacement; remove Calgary/Edmonton/Toronto rows (after G2). |
| **F — creators** | `lib/data/creators.ts`, `lib/data/_creators_b.ts`, `app/creators/page.tsx` | Set `noindex: true` on the 14 (after G2); merge the two how-tos' and two resources' unique FAQs into the twins. |
| **H — compare** | `lib/data/compare.ts` | Remove 4 merged rows; 2 improvements; carry any unique comparison rows into targets. |
| **I — static pages** | `app/about/page.tsx`, `app/pricing/page.tsx`, `app/demo/page.tsx` + `components/showroom/Showroom.tsx` (content strings only), `app/create/page.tsx` (copy only — form logic is A11's), `app/start/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx` | §2.13–2.17; absorb `ai-built-by-hand-vs-generic-ai-agency`; real dates. |
| **J — agent code** | `lib/agent/conversationEngine.ts`, `lib/agent/openaiConversationEngine.ts`, `app/agent/leads/[id]/page.tsx` | S2–S8 (delete `openaiConversationEngine.ts` or align it; replace the fake transcript with an empty state). Auth on `/api/agent/*` is A1/A8's. |

Rule for cross-file links: each lane repoints links **inside its own files** using §5.2; the 301s catch anything missed, so no lane blocks another. Lane P runs first (schema fields + sitemap), Lane P's redirect commit runs last.

### 5.2 Redirect map (append to `next.config.js` `redirects()`, all `permanent: true`)

| From | To |
|---|---|
| `/use-cases/ai-receptionist-for-contractors` | `/ai-receptionist-for-contractors` |
| `/use-cases/ai-invoice-reminders-for-small-business` | `/services/ai-invoice-reminder-system` |
| `/use-cases/estimate-follow-up-automation` | `/ai-lead-follow-up-agent` |
| `/use-cases/lead-capture-ai-for-real-estate` | `/industries/real-estate-agent-ai-automation` |
| `/use-cases/ai-receptionist-for-real-estate` | `/industries/real-estate-agent-ai-automation` |
| `/use-cases/ai-receptionist-for-clinics` | `/industries/clinic-ai-automation` |
| `/use-cases/ai-document-analyzer-for-law-firms` | `/industries/law-firm-ai-automation` |
| `/use-cases/ai-booking-assistant-for-salons` | `/industries/salon-ai-automation` |
| `/use-cases/ai-chatbot-for-ecommerce` | `/services/ai-chatbot-for-website` |
| `/use-cases/ai-content-engine-for-creators` | `/creators` |
| `/use-cases/custom-ai-app-for-startups` | `/custom-ai-app-development` |
| `/use-cases/personal-ai-assistant-app` | `/custom-ai-app-development` |
| `/use-cases/ai-support-bot-for-saas` | `/services/ai-customer-support-agent` |
| `/use-cases/no-show-reminder-automation` | `/use-cases/appointment-reminder-automation` |
| `/use-cases/instagram-dm-automation` | `/use-cases/facebook-lead-automation` |
| `/use-cases/ai-operations-assistant` | `/services/ai-admin-assistant` |
| `/use-cases/client-onboarding-automation` | `/services/ai-intake-form-builder` |
| `/services/ai-website-assistant` | `/services/ai-chatbot-for-website` |
| `/services/ai-proposal-generator` | `/services/ai-quote-generator` |
| `/services/ai-review-request-system` | `/services/ai-review-engine` |
| `/services/custom-business-automation` | `/services/ai-workflow-automation` |
| `/industries/bookkeeper-ai-automation` | `/industries/accountant-ai-automation` |
| `/industries/barbershop-ai-automation` | `/industries/salon-ai-automation` |
| `/industries/food-truck-ai-automation` | `/industries/restaurant-ai-automation` |
| `/industries/photographer-ai-automation` | `/industries` |
| `/industries/videographer-ai-automation` | `/industries` |
| `/industries/coach-ai-automation` | `/industries` |
| `/industries/ecommerce-ai-automation` | `/industries` |
| `/industries/retail-store-ai-automation` | `/industries` |
| `/resources/what-is-an-ai-receptionist` | `/ai-receptionist` |
| `/resources/ai-integration-cost` | `/ai-integration-services` |
| `/resources/can-ai-follow-up-with-leads` | `/resources/ai-lead-follow-up-guide` |
| `/resources/what-can-ai-automate-small-business` | `/resources/ai-automation-examples-for-small-business` |
| `/resources/best-ai-tools-for-small-business` | `/resources/best-ai-automations-for-service-businesses` |
| `/resources/best-ai-tools-for-small-business-canada` (**existing alias, `next.config.js:83` — retarget to avoid a chain**) | `/resources/best-ai-automations-for-service-businesses` |
| `/resources/can-ai-edit-videos` | `/creators/ai-video-editing-automation` (→ `/creators` if noindexed) |
| `/resources/can-ai-make-tiktok-videos` | `/creators/ai-tiktok-content-system` |
| `/how-to/automate-youtube-shorts` | `/creators/ai-youtube-shorts-automation` |
| `/how-to/build-faceless-content-system` | `/creators/ai-faceless-channel-automation` (→ `/creators` if noindexed) |
| `/how-to/automate-missed-calls` | `/use-cases/missed-call-automation` |
| `/compare/ai-receptionist-vs-human-receptionist` | `/compare/ai-receptionist-vs-virtual-receptionist` |
| `/compare/custom-ai-automation-vs-zapier` | `/compare/make-vs-zapier-vs-custom-ai-automation` |
| `/compare/ai-consultant-vs-ai-automation-agency` | `/ai-automation-agency` |
| `/compare/ai-built-by-hand-vs-generic-ai-agency` | `/about` |
| `/locations/ai-automation-calgary-ab` (G2) | `/remote-ai-development` |
| `/locations/ai-automation-edmonton-ab` (G2) | `/remote-ai-development` |
| `/locations/ai-automation-toronto-on` (G2) | `/remote-ai-development` |

46 new rows + 1 retargeted alias. Chain check: every destination is a KEEP/IMPROVE row in §1 (the two creator twins are the only conditional targets, handled inline). Existing redirects whose destinations remain valid: all (`/ai-front-desk`, `/quiet-hours` → `/ai-receptionist`; `/ai-*` aliases → `/services/*` KEEP pages; `/compare/custom-ai-app-vs-saas-tool` → KEEP).

### 5.3 Pages rewritten (37 IMPROVE) — by lane
- **A:** `/`, `/ai-receptionist`, `/ai-receptionist-for-contractors`, `/ai-lead-follow-up-agent`, `/done-for-you-ai-automation`, `/ai-chatbot-development` (6)
- **B:** `/resources/best-ai-tools-for-contractors`, `/resources/is-ai-receptionist-worth-it`, `/resources/can-ai-answer-business-phone-calls`, `/resources/ai-receptionist-cost`, `/resources/ai-chatbot-cost`, `/resources/best-ai-automations-for-service-businesses`, `/how-to/create-ai-receptionist-for-small-business`, `/how-to/automate-review-requests` (8)
- **C:** `/services/ai-receptionist-setup`, `/use-cases/missed-call-automation`, `/use-cases/appointment-reminder-automation` (3)
- **D:** `/industries`, `/industries/landscaping-ai-automation`, `/industries/fence-company-ai-automation`, `/industries/hvac-ai-automation`, `/industries/plumber-ai-automation`, `/industries/electrician-ai-automation` (6)
- **E:** `/locations/ai-receptionist-surrey-bc`, `/locations/ai-chatbot-developer-vancouver`, `/locations/ai-automation-vancouver`, `/locations/ai-automation-langley-bc`, `/locations/ai-automation-abbotsford`, `/locations/ai-automation-richmond-bc`, `/locations/ai-automation-coquitlam-bc`, `/locations/ai-automation-white-rock-bc`, `/locations/ai-automation-victoria-bc` (9)
- **H:** `/compare/ai-receptionist-vs-answering-service`, `/compare/best-ai-receptionist-small-business-canada` (2)
- **I:** `/pricing`, `/about`, `/demo`, `/create` (4; `/start` copy-only)

Registry rows removed (43 merges + 3 redirects): `useCases.ts` −17 · `_services_b.ts`/`services.ts` −4 · `_industries_c.ts` −7, `_industries_b.ts` −1 (barbershop is in `_industries_c`; verify per slug list) · `resources.ts` −7 · `howto.ts` −3 · `compare.ts` −4 · `locations.ts` −3. Rows set `noindex: true`: `creators.ts`/`_creators_b.ts` 14 (G2).

### 5.4 Gate before the redirect commit ships
1. G1 fresh per-URL GSC pull; flip any ≥3-impression / ≤30-position source to KEEP.
2. `tsc` 0 · `vitest` green · `next build` 0 · local crawl: 216 − 46 + 0 = **170 sitemap URLs** (+2 if `/creators` and `/demo` are added → 172), every 301 resolves in one hop, no source URL still linked from a `related:` array or chrome.
3. `graphify update .` after registry edits (project rule).

---

## Appendix — non-sitemap routes (carried from R5, unchanged)
`/agent` ×6, `/cart`, `/dashboard`, `/login`, `/products` → NOINDEX (R5 P2; robots-disallowed but emit `index, follow`). `/tools/form-filler` → NOINDEX (R5 P3). `/ai-front-desk`, `/forge` → already 308; delete the dead route files (R5 P2). `/demo/assistant|lead|nudge|quote` → KEEP (R5 P3). `/_not-found` → n/a.
