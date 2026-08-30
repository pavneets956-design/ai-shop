# S3 — Adversarial SEO + Content Challenge

**Repo** `C:\Users\gillp\Documents\Claude\Projects\AI Shop` · **branch** `feat/site-transformation-2026-08-30` · **commit** `8c32924`
**Reviewed** 2026-08-30. Read-only. No application file was edited; no git state was changed.

## How this was verified

Every number below comes from one of three sources, and each is named at the point of use:

1. **A local PRODUCTION build of `8c32924` served at `http://localhost:3200`.** The Vercel preview is behind Deployment Protection (SSO) and is unreachable to automation, so **all 46 redirects and all 164 sitemap URLs were verified against this byte-identical local production build**, not against the preview URL. Every status code, `location` header, `<link rel=canonical>` and `<meta name=robots>` in this report is an observed response from that server.
2. **The rendered HTML of all 164 sitemap URLs**, downloaded and analysed offline (`<main>` text extracted, sentence-level cross-page frequency, 5-gram Jaccard, H2 skeleton signatures).
3. **`research/transformation-2026-08-30/02-url-inventory.csv`** for per-URL GSC impressions / clicks / average position (window ≈ 2026-06-14 → 08-10).

**Protection rule honoured throughout:** no URL with measured clicks, or an average position ≤ 30, is recommended for removal. 39 of the 164 are protected under that rule and are marked as such.

---

## 0. Verdict first — what must be fixed before production

| # | Finding | Severity | Evidence |
|---|---|---|---|
| 1 | **`/shop` publishes five prices that contradict the matching `/services/*` page for the same product**, and four of them are below the $1,500 single-worker floor — in `Offer` structured data, not just prose | **BLOCKER** | §5.2 |
| 2 | **AI Review Engine is a single done-for-you worker sold at $1,000** — $500 under the floor, and `packages.ts` names "review replies" as a Starter worker | **BLOCKER** | §5.3 |
| 3 | **Six creator tools sold at $500–$900** as one-time custom builds | **BLOCKER** | §5.4 |
| 4 | **`lib/data/faqs.ts:33` contains an invented customer outcome AND an absolute promise** — "Most local businesses start seeing time savings within the first week" / "so you never miss a call on a job". The homepage explicitly disavows both | **HIGH** | §4.3 |
| 5 | **Five more "most clients …" claims** asserting behaviour of customers that do not exist | **HIGH** | §4.3 |
| 6 | **9 of 10 sitemap `lastmod` dates are stale against this branch** — 25 data files were rewritten, only `useCases.ts` got a new date | **HIGH** | §3.4 |
| 7 | The homepage `<title>` and `/ai-receptionist-for-contractors` target the **identical head term** | MEDIUM | §1.4 |

**Clean:** all 46 redirects (§2), sitemap integrity (§3.1–3.3), and the `packages.ts` three-tier floors (§5.1).

---

## 1. Why 164 pages remain

### 1.1 The arithmetic

The baseline inventory (`02-url-inventory.csv`) recorded **216 URLs in the sitemap**. The current sitemap serves **164**, with no duplicate `<loc>`.

| | count |
|---|---|
| Baseline sitemap | 216 |
| − 301'd via `lib/redirects.js` (45 of the 46 rows; the 46th was already redirecting in `next.config.js`) | −45 |
| − 14 `/creators/*` pages retained as live routes but set `noindex, follow` and dropped from the sitemap | −14 |
| + newly added: `/creators`, `/start`, `/demo`, `/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote` | +7 |
| **Current sitemap** | **164** |

The arithmetic reconciles exactly. Nothing is unaccounted for.

### 1.2 Category breakdown

`avg sim` = mean of each page's highest 5-gram Jaccard similarity against another page in the same category, **after** removing every sentence that appears on ≥20 pages (so site chrome and the shared CTA are excluded and the number reflects body copy only). `prot` = protected by clicks or position ≤30. `0-impr` = pages with zero GSC impressions.

| Category | pages | avg words | avg sim | GSC impr | clicks | prot | 0-impr |
|---|---|---|---|---|---|---|---|
| `/industries/*` | 31 | 667 | 5.9% | 50 | 0 | 3 | 19 |
| `/services/*` | 21 | 499 | 4.2% | 14 | 0 | 3 | 18 |
| `/locations/*` | 17 | 642 | 9.7% | 62 | 0 | 9 | 4 |
| `/resources/*` | 17 | 719 | 2.2% | 139 | 0 | 3 | 4 |
| `/compare/*` | 17 | 697 | 3.6% | 2 | 0 | 2 | 15 |
| `/use-cases/*` | 8 | 368 | 8.0% | 13 | 0 | 3 | 1 |
| `/creators/*` | 6 | 447 | 4.6% | 18 | 0 | 4 | 0 |
| `/how-to/*` | 6 | 905 | 2.4% | 16 | 0 | 1 | 4 |
| `/tools/*` | 5 | 1159 | 4.6% | 0 | 0 | 0 | 5 |
| `/demo/*` | 4 | 124 | 7.4% | 0 | 0 | 0 | 4 |
| money pages (12 single routes) | 12 | 955 | — | 364 | 0 | 5 | 2 |
| hubs (`/services`, `/industries`, `/locations`, `/solutions`, `/use-cases`, `/resources`, `/how-to`, `/compare`, `/creators`, `/tools`, `/shop`, `/pricing`) | 12 | 679 | — | 23 | 1 | 2 | 8 |
| utility (`/`, `/about`, `/faq`, `/create`, `/start`, `/demo`, `/privacy`, `/terms`) | 8 | 925 | — | 91 | 3 | 4 | 4 |
| **Total** | **164** | | | **792** | **4** | **39** | **88** |

### 1.3 Per-category: what it adds, and the strongest case for cutting it

**`/industries/*` — 31 pages.**
*Value:* vertical-specific intent (`ai automation for plumbers`) is the site's most natural entry point, and the trades pages carry real depth — `/industries/fence-company-ai-automation` is 1,258 words, `/industries/insurance-broker-ai-automation` 1,016, `/industries/landscaping-ai-automation` 926. Body copy is verbatim-unique.
*Strongest case for cutting:* the category splits in two. Sixteen trades/local-service pages run 615–1,258 words. Ten off-ICP verticals (physiotherapy, chiropractor, gym, personal trainer, wedding planner, immigration consultant, law firm, accountant, consultant, agency) run **344–416 words and share one byte-identical H2 sequence with 36 other pages**. The prior pass already 301'd five off-ICP verticals for exactly this reason (photographer, videographer, coach, ecommerce, retail store → `/industries`). It stopped one class short. 19 of 31 have zero impressions.

**`/services/*` — 21 pages.**
*Value:* these are the product catalogue; each maps to a purchasable SKU, and several carry the FAQ text that answers a distinct buying question.
*Strongest case for cutting:* 18 of 21 have zero impressions, average 499 words, and all 21 share one H2 skeleton with 16 other pages. At least two pairs describe the same deliverable — `ai-lead-capture-form` vs `ai-intake-form-builder` (both "a branching AI form that qualifies leads"), and `ai-receptionist-setup` vs `ai-receptionist-os` vs the `/ai-receptionist` money page.

**`/locations/*` — 17 pages.**
*Value:* the highest-similarity category (9.7%) but also the **most protected** — 9 of 17 rank at position ≤30, and `/locations/custom-ai-apps-surrey` sits at position 2.0. Local intent is the one place a one-person Surrey studio genuinely out-competes a national SaaS.
*Strongest case for cutting:* every page is the same document with the city swapped. The H2 skeleton is invariant — `The problem` → `What this looks like in practice` → `How it works` (identical 4 steps) → `Who we build for in <PLACE>` → `<one bespoke H2>` → `What you get` → `Recommended package` → `Related` → `Common questions`. The differentiation is at the level of proper nouns and one paragraph of local geography, not at the level of information. See §1.5.

**`/resources/*` — 17 pages.** *Value:* holds 139 impressions — 18% of all site impressions, the best-performing category, led by `/resources/best-ai-tools-for-contractors` (66 impr, 1,553 words). Lowest similarity on the site (2.2%). *Case for cutting:* four thin survivors at 267–360 words (`can-ai-run-my-customer-support`, `can-ai-send-quotes-automatically`, `custom-ai-tool-cost`, `small-business-ai-setup-cost`) — but **all four are position-protected** (positions 1.0, 73.5, 3.0, 4.0; three of the four rank ≤4). Cannot recommend removal.

**`/compare/*` — 17 pages.** *Value:* comparison intent is bottom-of-funnel, the pages are substantial (avg 697 words, up to 1,039), and similarity is a genuinely low 3.6%. *Case for cutting:* **15 of 17 have zero impressions and the whole category has generated 2 impressions total.** It is the weakest-performing category per page on the site. Six of the 17 are receptionist comparisons competing with each other (§1.4).

**`/use-cases/*` — 8 pages.** *Value:* survivors of a 17-row cull; three rank ≤8. *Case for cutting:* the thinnest surviving content category at 368 avg words, second-highest similarity at 8.0%. `/use-cases/automate-admin-for-accountants` is 251 words.

**`/creators/*` — 6 pages.** *Value:* 4 of 6 rank at position ≤11 — proportionally the best-ranking category. *Case for cutting:* the vertical is off the trades ICP the rest of the site now commits to, and 14 sibling pages were just noindexed for entity dilution. Keeping six of twenty is a half-measure: either the vertical earns a place or it does not.

**`/how-to/*` — 6 pages.** *Value:* the deepest category at 905 avg words; `/how-to/automate-customer-replies` has 14 impressions at position 37.4. No strong case for cutting.

**`/tools/*` — 5 pages.** *Value:* the deepest content on the site (1,159 avg words) and the only genuinely interactive, linkable assets. *Case for cutting:* **zero impressions across all five** — but they are new, they are the site's best link bait, and the deficiency is promotion, not the pages. Keep.

**`/demo/*` — 4 pages.** *Value:* live interactive demos, which is the proof asset a studio with no customers most needs. *Case for cutting:* **111–141 words each, newly added to the sitemap by this very branch.** See §1.6, items 10–13.

### 1.4 The receptionist cluster — an unresolved cannibalisation

**Sixteen** sitemap URLs carry "receptionist" in the `<title>` or `<h1>`. The two head-term collisions that matter:

- `/` — `<title>` **"AI Receptionist for Contractors in Surrey & Metro Vancouver | Handbuilt AI"** — 60 impressions, **3 clicks (all the site's clicks)**, position 15.4
- `/ai-receptionist-for-contractors` — `<title>` **"AI Receptionist for Contractors | Handbuilt AI"** — 16 impressions, 0 clicks, position 71.9

These target the identical head term. The homepage is winning and the dedicated page is not. Also in the cluster: `/ai-receptionist` (146 impr, pos 72.5), `/services/ai-receptionist-setup` (0 impr), `/services/ai-receptionist-os` (0 impr), `/locations/ai-receptionist-surrey-bc` (pos 18.7, protected), plus five `/compare/*` receptionist pages holding **1 impression between them**.

Not a removal recommendation — the homepage is protected and `/ai-receptionist` holds 146 impressions. It is a **titling** decision the owner should make before launch: either the homepage stops claiming the exact phrase, or `/ai-receptionist-for-contractors` is 301'd into it.

### 1.5 The honest finding that cuts against my own case

I set out to prove the pages are duplicate templates. **The verbatim-duplication charge does not stick, and the prior pass deserves credit for that.** Measured across all 164 pages:

- Highest in-category body similarity anywhere on the site: **14.6%** (`/locations/ai-automation-coquitlam-bc` vs `/locations/ai-automation-maple-ridge-bc`). A genuine spun-template farm scores 40–80%.
- **Zero duplicate `<title>` tags. Every page has exactly one `<h1>`.**
- On most of the weakest pages, the strongest non-CTA sentence repeat is **1** — the body copy is verbatim-unique.
- The location pages carry real, specific local detail: Coquitlam names *Burke Mountain, Austin Heights, Maillardville*; Maple Ridge names *Pitt Meadows* and the semi-rural service area. That is not a find-and-replace.

**So the case for consolidation has to be made on different ground, and it is this:** low verbatim overlap is not the same as unique value. What repeats is the *structure and the information*, not the words.

- **37 pages share one byte-identical H2 sequence:** `How it works || What you get || Related || Common questions || Want this built for your business?` — 21 `/services/*`, 10 `/industries/*`, 6 `/creators/*`.
- **135 pages** carry `"Want this built for your business?"` and `"Tell us about your setup and we'll send a plan and a fixed quote within one business day."`
- **115 pages** carry `"Built remotely for small businesses across Canada, the US, Australia & New Zealand."`
- **27 pages** carry `"Get a fixed quote Not sure what you need?"`
- The 17 location pages share an invariant 4-step `How it works`, of which `"2 Scoped proposal — flat CAD price, clear outcome."` appears verbatim on 7 and `"A single AI worker starts at $1,500 CAD, usually live in about 5 business days."` on 8.

On a 352-word page like `/industries/personal-trainer-ai-automation`, the shared CTA block is a material share of the word count. Each page answers the same question with the same answer, paraphrased. That is a thin-content and crawl-budget argument, not a duplicate-content one — and it is still an argument for cutting.

### 1.6 The weakest 20 URLs — the case for removing each

Every URL below has **0 clicks** and either **no ranking position** or a **position worse than 30**, so none is protected. `H2 skeleton` = number of pages sharing that page's exact H2 sequence. `Repeat` = the strongest verbatim sentence on the page and how many pages carry it, measured across all 164 rendered pages.

| # | URL | words | GSC (impr/clk/pos) | H2 skeleton | Strongest measured verbatim repeat | Recommendation |
|---|---|---|---|---|---|---|
| 1 | `/industries/law-firm-ai-automation` | 353 | 0 / 0 / — | **37 pages** | `"Want this built for your business?"` — **135 pages**; `"Tell us about your setup and we'll send a plan and a fixed quote within one business day."` — **135 pages**. Non-CTA body: unique | **MERGE → `/industries`**. Off-ICP (not a local service business), zero demand, thinnest quartile. The prior pass 301'd five off-ICP verticals into `/industries` on exactly this reasoning; this is the same class. |
| 2 | `/industries/wedding-planner-ai-automation` | 367 | 1 / 0 / 84.0 | **37 pages** | Same three CTA sentences (135 / 135 / 115 pages). Non-CTA body: unique | **MERGE → `/industries`**. Off-ICP, position 84. |
| 3 | `/industries/personal-trainer-ai-automation` | 352 | 1 / 0 / 69.0 | **37 pages** | Same (135 / 135 / 115). Non-CTA body: unique | **MERGE → `/industries`**. Off-ICP, position 69, third-thinnest industry page. |
| 4 | `/industries/gym-ai-automation` | 370 | 8 / 0 / 45.6 | **37 pages** | Same (135 / 135 / 115). Non-CTA body: unique | **MERGE → `/industries`**. Off-ICP. Counter-argument: 8 impressions is above the category median — the owner may prefer to keep it and thicken it instead. |
| 5 | `/industries/physiotherapy-ai-automation` | 403 | 12 / 0 / 69.4 | **37 pages** | `"Automate my clinic Not sure what you need?"` — **2 pages** (the other is #6). Plus the three CTA sentences | **MERGE → `/industries/clinic-ai-automation`** (912 words, same buyer, same deliverable). Do not merge to the hub — the clinic page is the better target. |
| 6 | `/industries/chiropractor-ai-automation` | 416 | 3 / 0 / 36.0 | **37 pages** | `"Automate my clinic Not sure what you need?"` — **2 pages** (the other is #5) | **MERGE → `/industries/clinic-ai-automation`**. #5 and #6 are each other's nearest neighbour at 7.3% and share a CTA no other page uses; they are one page split in two. |
| 7 | `/industries/agency-ai-automation` | 363 | 2 / 0 / 36.5 | **37 pages** | Same three CTA sentences. Non-CTA body: unique | **MERGE → `/industries`**. Off-ICP, and it is the only page that sells white-label resale — a positioning contradiction with "one builder, no handoff". |
| 8 | `/creators/ai-tools-for-content-creators` | 526 | 5 / 0 / 88.4 | **37 pages** | `"Build my creator system Not sure what you need?"` — **2 pages** | **MERGE → `/creators`**. It is a hub-shaped page sitting under a hub that ranks at position 8.0. Position 88.4 for the head term of a vertical whose other 14 pages were just noindexed. |
| 9 | `/creators/ai-youtube-shorts-automation` | 403 | 1 / 0 / 42.0 | **37 pages** | CTA only; non-CTA body unique | **MERGE → `/creators`**. Note this page is currently the *destination* of the `/how-to/automate-youtube-shorts` 301 — if merged, repoint that redirect to `/creators` in the same commit or a chain is created. |
| 10 | `/demo/quote` | **111** | 0 / 0 / — | 6 pages (all with **no H2 at all**) | No repeated sentence — the page is too short to have one | **REMOVE FROM SITEMAP, keep the route.** 111 words is below any indexable threshold. It is a functional demo widget, not a document. |
| 11 | `/demo/nudge` | **112** | 0 / 0 / — | 6 pages, no H2 | None | **REMOVE FROM SITEMAP, keep the route.** |
| 12 | `/demo/lead` | **131** | 0 / 0 / — | 6 pages, no H2 | None | **REMOVE FROM SITEMAP, keep the route.** |
| 13 | `/demo/assistant` | **141** | 0 / 0 / — | 6 pages, no H2 | None | **REMOVE FROM SITEMAP, keep the route.** These four were **added to the sitemap by this branch** — a release whose stated purpose is consolidation added four sub-150-word pages to the index. Link to them from `/demo` (protected, position 3.7) and leave them out of the sitemap. |
| 14 | `/locations/ai-automation-victoria-bc` | 536 | 0 / 0 / — | 1 (bespoke H2) | `"Get a fixed quote Not sure what you need?"` — **27 pages**; `"A single AI worker starts at $1,500 CAD, usually live in about 5 business days."` — **8 pages**; `"2 Scoped proposal — flat CAD price, clear outcome."` — **7 pages** | **MERGE → `/locations`**. Vancouver Island is not the advertised service area; the page's own bespoke H2 is *"Island business, mainland build"*, which is the `/remote-ai-development` argument. Same class as the Calgary and Toronto rows already written for 301. Zero impressions. |
| 15 | `/locations/ai-automation-richmond-bc` | 650 | 0 / 0 / — | 1 (bespoke H2) | 27-page CTA; **8-page** `$1,500` sentence; `"Built from nearby Surrey/Delta with fixed CAD pricing from $1,500."` — **3 pages** | **KEEP — but only just.** Zero impressions and 9.7% similarity to New Westminster argue for a cut, yet Richmond is inside the advertised service area and its bespoke section (*"Multilingual matters here"*) is the one location differentiator on the site that is a real service claim rather than geography. Cutting it removes a genuine argument. Thicken instead. |
| 16 | `/locations/ai-automation-coquitlam-bc` | 572 | 2 / 0 / 41.5 | 1 (bespoke H2) | 27-page CTA; **8-page** `$1,500` sentence; **7-page** `"2 Scoped proposal…"` | **MERGE → `/locations/ai-automation-new-westminster-bc`**. This is the **highest-similarity pair on the entire site at 14.6%**, against Maple Ridge — but Maple Ridge is protected at position 4.0, so Coquitlam is the one that can go. Its distinct content is one paragraph about Burke Mountain and Austin Heights. |
| 17 | `/locations/ai-automation-langley-bc` | 705 | 0 / 0 / — | 1 (bespoke H2) | 27-page CTA | **KEEP.** Zero impressions, but 705 words, only 8.2% similarity, and squarely inside the Surrey/Delta service area. Cutting an in-area location page with real length is the wrong trade. Listed for completeness of the adversarial exercise, not as a recommendation. |
| 18 | `/locations/ai-automation-abbotsford` | 673 | 0 / 0 / — | 1 (bespoke H2) | 27-page CTA | **KEEP**, same reasoning as #17. Fraser Valley is in-area. |
| 19 | `/services/ai-intake-form-builder` | 447 | 0 / 0 / — | **37 pages** | CTA only; non-CTA body unique | **MERGE → `/services/ai-lead-capture-form`.** These two are each other's nearest neighbour (6.4%) and describe the same deliverable — a branching AI form that qualifies a lead before submit. Two SKUs for one product is also part of the pricing problem in §5.5. Zero impressions on both, so the target is chosen by which name buyers search. |
| 20 | `/services/ai-receptionist-setup` | 648 | 0 / 0 / — | **37 pages** | CTA only; non-CTA body unique | **MERGE → `/ai-receptionist`** (146 impressions, the strongest receptionist page). Its `<title>` is *"AI Answering Service Setup for Small Business"*, which collides with `/compare/ai-receptionist-vs-answering-service`, while its subject collides with `/ai-receptionist` and `/services/ai-receptionist-os`. Zero impressions after a full GSC window. **Blocked on a pricing decision first** — it is the SKU whose `/shop` card says `From $129/mo` and whose page says `$1,500` (§5.2). |

**Net recommendation: 14 merges, 4 sitemap removals (routes kept), 2 keeps.** Applied, the sitemap goes 164 → 146.

**Three candidates I deliberately did NOT recommend cutting, and why:** `/industries/accountant-ai-automation` (position 4.0), `/industries/consultant-ai-automation` (position 3.0) and `/industries/immigration-consultant-ai-automation` (position 6.0) are the same off-ICP, ~350-word, 37-page-skeleton class as items #1–#7 and are the natural next cuts on content grounds. **All three rank at position ≤6 and are therefore protected.** They are the clearest example of the protection rule doing its job against my own argument. Flagging them so the owner knows they exist, not recommending removal.

---

## 2. Redirect verification — all 46 rows

**Verified against `http://localhost:3200`, the local production build of `8c32924`.** The Vercel preview is SSO-gated by Deployment Protection and cannot be reached by automation; this build is byte-identical to it. Each source was requested with redirects disabled, then the returned `location` was requested once to confirm the destination resolves in **one hop**.

**Result: 46/46 pass. Zero chains, zero loops, zero non-200 destinations.**

Every row returned **HTTP 308** (Next.js `permanent: true` emits 308, not 301 — see the note below), pointed at exactly the destination declared in `lib/redirects.js`, and that destination returned **200** with no further `location` header.

| # | Source | → Destination | Status | Dest. status | Hops |
|---|---|---|---|---|---|
| 1 | `/use-cases/ai-receptionist-for-contractors` | `/ai-receptionist-for-contractors` | 308 | 200 | 1 |
| 2 | `/use-cases/ai-invoice-reminders-for-small-business` | `/services/ai-invoice-reminder-system` | 308 | 200 | 1 |
| 3 | `/use-cases/estimate-follow-up-automation` | `/ai-lead-follow-up-agent` | 308 | 200 | 1 |
| 4 | `/use-cases/lead-capture-ai-for-real-estate` | `/industries/real-estate-agent-ai-automation` | 308 | 200 | 1 |
| 5 | `/use-cases/ai-receptionist-for-real-estate` | `/industries/real-estate-agent-ai-automation` | 308 | 200 | 1 |
| 6 | `/use-cases/ai-receptionist-for-clinics` | `/industries/clinic-ai-automation` | 308 | 200 | 1 |
| 7 | `/use-cases/ai-document-analyzer-for-law-firms` | `/industries/law-firm-ai-automation` | 308 | 200 | 1 |
| 8 | `/use-cases/ai-booking-assistant-for-salons` | `/industries/salon-ai-automation` | 308 | 200 | 1 |
| 9 | `/use-cases/ai-chatbot-for-ecommerce` | `/services/ai-chatbot-for-website` | 308 | 200 | 1 |
| 10 | `/use-cases/ai-content-engine-for-creators` | `/creators` | 308 | 200 | 1 |
| 11 | `/use-cases/custom-ai-app-for-startups` | `/custom-ai-app-development` | 308 | 200 | 1 |
| 12 | `/use-cases/personal-ai-assistant-app` | `/custom-ai-app-development` | 308 | 200 | 1 |
| 13 | `/use-cases/ai-support-bot-for-saas` | `/services/ai-customer-support-agent` | 308 | 200 | 1 |
| 14 | `/use-cases/no-show-reminder-automation` | `/use-cases/appointment-reminder-automation` | 308 | 200 | 1 |
| 15 | `/use-cases/instagram-dm-automation` | `/use-cases/facebook-lead-automation` | 308 | 200 | 1 |
| 16 | `/use-cases/ai-operations-assistant` | `/services/ai-admin-assistant` | 308 | 200 | 1 |
| 17 | `/use-cases/client-onboarding-automation` | `/services/ai-intake-form-builder` | 308 | 200 | 1 |
| 18 | `/services/ai-website-assistant` | `/services/ai-chatbot-for-website` | 308 | 200 | 1 |
| 19 | `/services/ai-proposal-generator` | `/services/ai-quote-generator` | 308 | 200 | 1 |
| 20 | `/services/ai-review-request-system` | `/services/ai-review-engine` | 308 | 200 | 1 |
| 21 | `/services/custom-business-automation` | `/services/ai-workflow-automation` | 308 | 200 | 1 |
| 22 | `/industries/bookkeeper-ai-automation` | `/industries/accountant-ai-automation` | 308 | 200 | 1 |
| 23 | `/industries/barbershop-ai-automation` | `/industries/salon-ai-automation` | 308 | 200 | 1 |
| 24 | `/industries/food-truck-ai-automation` | `/industries/restaurant-ai-automation` | 308 | 200 | 1 |
| 25 | `/industries/photographer-ai-automation` | `/industries` | 308 | 200 | 1 |
| 26 | `/industries/videographer-ai-automation` | `/industries` | 308 | 200 | 1 |
| 27 | `/industries/coach-ai-automation` | `/industries` | 308 | 200 | 1 |
| 28 | `/industries/ecommerce-ai-automation` | `/industries` | 308 | 200 | 1 |
| 29 | `/industries/retail-store-ai-automation` | `/industries` | 308 | 200 | 1 |
| 30 | `/resources/what-is-an-ai-receptionist` | `/ai-receptionist` | 308 | 200 | 1 |
| 31 | `/resources/ai-integration-cost` | `/ai-integration-services` | 308 | 200 | 1 |
| 32 | `/resources/can-ai-follow-up-with-leads` | `/resources/ai-lead-follow-up-guide` | 308 | 200 | 1 |
| 33 | `/resources/what-can-ai-automate-small-business` | `/resources/ai-automation-examples-for-small-business` | 308 | 200 | 1 |
| 34 | `/resources/best-ai-tools-for-small-business` | `/resources/best-ai-automations-for-service-businesses` | 308 | 200 | 1 |
| 35 | `/resources/can-ai-edit-videos` | `/creators` | 308 | 200 | 1 |
| 36 | `/resources/can-ai-make-tiktok-videos` | `/creators/ai-tiktok-content-system` | 308 | 200 | 1 |
| 37 | `/resources/best-ai-tools-for-small-business-canada` | `/resources/best-ai-automations-for-service-businesses` | 308 | 200 | 1 |
| 38 | `/how-to/automate-youtube-shorts` | `/creators/ai-youtube-shorts-automation` | 308 | 200 | 1 |
| 39 | `/how-to/build-faceless-content-system` | `/creators` | 308 | 200 | 1 |
| 40 | `/how-to/automate-missed-calls` | `/use-cases/missed-call-automation` | 308 | 200 | 1 |
| 41 | `/compare/ai-receptionist-vs-human-receptionist` | `/compare/ai-receptionist-vs-virtual-receptionist` | 308 | 200 | 1 |
| 42 | `/compare/custom-ai-automation-vs-zapier` | `/compare/make-vs-zapier-vs-custom-ai-automation` | 308 | 200 | 1 |
| 43 | `/compare/ai-consultant-vs-ai-automation-agency` | `/ai-automation-agency` | 308 | 200 | 1 |
| 44 | `/compare/ai-built-by-hand-vs-generic-ai-agency` | `/about` | 308 | 200 | 1 |
| 45 | `/locations/ai-automation-calgary-ab` | `/remote-ai-development` | 308 | 200 | 1 |
| 46 | `/locations/ai-automation-toronto-on` | `/remote-ai-development` | 308 | 200 | 1 |

**Row 37 is the chain-breaker working as designed.** `/resources/best-ai-tools-for-small-business-canada` was previously redirected in `next.config.js` to `/resources/best-ai-tools-for-small-business`, which is itself row 34's source. The registry row points it straight at the final destination and `next.config.js` de-dupes by `source`, so no chain is produced. Verified: 308 → `/resources/best-ai-automations-for-service-businesses` → 200, one hop.

**Two documentation defects (not behavioural):**

- The header comment in `lib/redirects.js` is titled **"WHY EVERY ROW IS A 301 AND NOT A DELETION"**, but Next.js `permanent: true` emits **308**, and all 46 were observed as 308. Google treats 301 and 308 equivalently, so there is no SEO consequence — but the comment names a status code the code does not emit. Cosmetic.
- The same header says "The four with any measured impression" and then enumerates **five**. Cosmetic.

**Owner gate still open:** rows 45–46 (Calgary, Toronto) are flagged `GATE G2 — OWNER APPROVAL REQUIRED` in the file's own header, because they retire pages for a positioning reason rather than duplication. They are wired and working; they have not been approved. `/locations/ai-automation-victoria-bc` (§1.6 #14) is the same class and is not yet in the list.

---

## 3. Sitemap integrity

### 3.1 Every `<loc>` — status, canonical, robots

All 164 URLs were requested against `http://localhost:3200`.

| Check | Result |
|---|---|
| Returns HTTP 200 | **164 / 164** ✅ |
| Is a redirect (3xx) | **0** ✅ |
| Emits `<link rel="canonical">` | **164 / 164** ✅ |
| Canonical is **self**-referential (`https://aibuiltbyhand.com` + path) | **164 / 164** ✅ |
| Emits `noindex` | **0 / 164** ✅ |
| Is also a `source` in `lib/redirects.js` | **0** ✅ |
| Is also a `source` in `next.config.js` (31 rows) | **0** ✅ |
| Duplicate `<loc>` entries | **0** ✅ |
| Non-`https://aibuiltbyhand.com` host, trailing slash, or query string | **0** ✅ |

**The sitemap is clean.** Every URL is canonical, indexable, 200, and not a redirect source. Spot-checked the negative case to confirm the test discriminates: `/creators/ai-video-editing-automation` returns 200 with `<meta name="robots" content="noindex, follow"/>` and is correctly **absent** from the sitemap; `/locations/ai-automation-edmonton-ab` emits no robots meta and is correctly **present**.

### 3.2 Live 200 routes absent from the sitemap

The build's `prerender-manifest.json` lists **194** prerendered routes against **164** sitemap URLs. All 164 sitemap URLs are prerendered (no sitemap entry is missing from the build). The 30 extra routes:

| Route(s) | Observed | Absence correct? |
|---|---|---|
| `/agent`, `/agent/calls`, `/agent/campaigns`, `/agent/contacts`, `/agent/leads`, `/agent/settings` (6) | **404** + `noindex, nofollow`; `Disallow: /agent/` in robots.txt | ✅ Correct — internal console, gated three ways |
| 14 × `/creators/*` twins | 200 + `noindex, follow` | ✅ Correct — deliberately noindexed for entity dilution |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/opengraph-image.png`, `/twitter-image.png` (5) | 200 | ✅ Correct — not HTML documents |
| `/products` | **308 → `/solutions`** | ✅ Correct — it is a redirect source. ⚠️ See 3.3 |
| `/cart`, `/dashboard`, `/login` (3) | 200, no robots meta, `Disallow` in robots.txt | ✅ Acceptable — see 3.3 |
| `/tools/form-filler` | **200, no robots meta, NOT in robots.txt, NOT in the sitemap, not linked from `/tools`** | ⚠️ **Orphan.** The only genuinely indexable page outside the sitemap. Either add it, `noindex` it, or `Disallow` it. |

### 3.3 Two robots.txt conflicts

- **`Disallow: /products` blocks a 308.** `/products` and `/products/:path*` redirect to `/solutions`, but robots.txt forbids crawling `/products`, so a crawler never follows the redirect and the equity does not transfer. Same for **`Disallow: /v2`**, which is a 308 → `/`. Remove those two `Disallow` lines from all 21 user-agent blocks, or accept that the redirects are decorative.
- **`/cart`, `/dashboard`, `/login` are `Disallow`ed but carry no `noindex`.** A disallowed URL can still be indexed URL-only if it is linked from anywhere. Low risk and a standard trade-off — noted, not a blocker.

### 3.4 ⚠️ `lastmod` is stale against this branch — HIGH

`app/sitemap.ts` sources every date from `lib/seo.ts:78-89` (`REGISTRY_LASTMOD`) and `lib/seo.ts:92+` (`STATIC_LASTMOD`). `app/sitemap.ts:39` states the design intent explicitly: a date that does not track real change is *"the textbook case of a lastmod Google discards site-wide."*

`git diff --stat origin/main...HEAD -- lib/data/` shows **25 data files changed, 841 insertions / 2,732 deletions** on this branch. Only **one** of the ten registry dates was updated:

| Registry key | Source file(s) changed on this branch | `lastmod` in `lib/seo.ts` | Correct? |
|---|---|---|---|
| `usecase` | `useCases.ts` (685 lines) | `2026-08-30` | ✅ |
| `service` | `services.ts` (46) + `_services_b.ts` (196) | `2026-08-12` | ❌ stale |
| `industry` | `industries.ts` (68) + `_industries_b.ts` (62) + `_industries_c.ts` (370) | `2026-08-12` | ❌ stale |
| `resource` | `resources.ts` (**705**) | `2026-07-31` | ❌ stale |
| `compare` | `compare.ts` (314) | `2026-07-06` | ❌ stale |
| `howto` | `howto.ts` (194) | `2026-08-12` | ❌ stale |
| `location` | `locations.ts` (159) | `2026-07-06` | ❌ stale |
| `creators` | `creators.ts` (29) + `_creators_b.ts` (23) | `2026-07-06` | ❌ stale |
| `money` | `money.ts` (30) | `2026-08-12` | ❌ stale |
| `tool` | `freeTools.ts` (32) | `2026-08-12` | ❌ stale |

Plus `STATIC_LASTMOD` — `/shop` reads `2026-08-12` while `shop.ts` and `shopProducts.ts` both changed; the homepage `""` reads `2026-08-12` while `landing.ts`, `site.ts` and `homeFaqs.ts` all changed.

Observed in the served sitemap: only **8** of 164 URLs carry `2026-08-30` (all eight are `/use-cases/*`). 77 still say `2026-08-12`, 45 say `2026-07-06`, 17 say `2026-07-31`, 7 say `2026-06-14`.

**Net effect: 156 of 164 URLs will tell Google nothing changed, on the release whose entire purpose was rewriting them.** Bump the nine stale keys before deploying. Cheap fix, real cost if missed.

---

## 4. Fabrication sweep

### 4.1 Method

Grep patterns run across `lib/`, `app/`, `components/`, `docs/` (`--include=*.ts,*.tsx,*.js,*.jsx,*.json,*.md`), plus regex sweeps over the extracted `<main>` text of all 164 rendered pages:

```
testimonial|aggregateRating|reviewCount|ratingValue|star rating|5-star|five-star|★
\b(we (helped|saved|increased|booked|recovered|grew)|clients? (saw|report|reported|got)|customers? (saw|report|reported)|helped \d+|saved \d+|increased .{0,20}by \d+%|\d+% (more|increase|growth|lift))
\b(trusted by|join \d+|over \d+ (businesses|clients|customers)|\d+\+ (businesses|clients|customers|happy)|serving \d+)
\b(never miss(es)? (a|another) (call|lead|quote)|guarantee(d)?|100% |always answers|zero missed)
\b(pays for itself|paid for itself|most (local )?businesses|most (clients|customers|owners)|typically (covers|recovers|pays)|usually pays|within the first (week|month)|start seeing)
[^.!?]*\d+(\.\d+)?\s?%[^.!?]*[.!?]        (all 37 distinct %-bearing sentences reviewed by hand)
[^.!?]*\$[\d,]+[^.!?]*[.!?]               (all price sentences reviewed by hand)
```

### 4.2 Result: **0 fake testimonials, 0 named customers, 0 review counts, 0 star ratings, 0 client logos on any public page**

The discipline in this codebase is genuinely strong, and I want to be explicit about it because it makes the exceptions in §4.3 stand out:

- `components/marketing/ProofFounder.tsx:17-23` carries an evidence rule listing exactly what is excluded, and the component renders only the owner's own three properties (Ironwood Grounds, COITracker, PayNudge). `ProofFounder.tsx:130` states on-page: *"No client logos and no testimonials — I don't have clients yet, and I'm not going to invent them."*
- `lib/seo.ts:223` explicitly forbids `aggregateRating`, `review`, `foundingDate`, `numberOfEmployees` in structured data. Confirmed: no `aggregateRating` or `review` node is emitted anywhere.
- `app/about/page.tsx:95` — *"No stock testimonials, no borrowed client logos, no statistic I didn't measure myself."*
- The homepage states: *"What I won't do: invent a customer, quote a number I didn't measure, or promise you'll never miss a call again."*
- **`docs/launch/` is clean.** Every risky-pattern hit in that folder is a *prohibition*, not a claim: `00-README.md:27` bans invented customers/testimonials/metrics; `00-README.md:29` bans absolute promises; `09-demo-video-script.md:77-79` names *"Never miss another call."* and *"Trusted by contractors across BC."* as forbidden lines; `06-gbp-posts.md:7` bans posting a review or customer name; `12-external-checklist.md:118-126` states Handbuilt AI has no reviews and that **Ironwood Grounds' four Google reviews must never be presented as reviews of the AI studio**. Ironwood Grounds is the owner's own company, disclosed as such everywhere it appears — that is self-reference, not a fabricated customer.

### 4.3 ⚠️ Six invented-customer claims that contradict all of the above

| # | file:line | Exact quote | Why it fails |
|---|---|---|---|
| 1 | **`lib/data/faqs.ts:33`** | *"…an AI receptionist **(so you never miss a call on a job)**, automated booking and no-show reminders, and instant lead follow-up. **Most local businesses start seeing time savings within the first week.**"* | **Two violations in one string.** (a) An absolute promise the homepage explicitly disavows and `docs/launch/00-README.md:29` explicitly bans. (b) An invented customer-outcome statistic — there are no customers to have observed. Renders on `/faq` (16 impressions, position 6.6 — a *protected, ranking* page). |
| 2 | **`lib/data/money.ts:310`** | *"**Most clients** who start with a Starter chatbot or receptionist **upgrade to the Business AI System within 90 days** because they see the gap clearly once the first tool is running."* | The worst of the set: an invented cohort statistic used as an upsell. Renders on `/ai-business-system` (position 4.5 — protected and ranking). |
| 3 | **`lib/data/howto.ts:120`** | *"**Most clients recover the cost within the first month** from leads they would have lost overnight."* | Invented ROI outcome attributed to clients. Renders on `/how-to/automate-quote-requests`. |
| 4 | **`lib/data/money.ts:195`** | *"**Most clients** update their chatbot 2–4 times per year."* | Invented client behaviour. Renders on `/ai-chatbot-development` (118 impressions). |
| 5 | **`lib/data/resources.ts:78`** | *"Yes. **Most clients start with one tool** — a chatbot or intake form — and add automations over time."* | Invented client behaviour. Renders on `/resources/how-much-does-ai-automation-cost`. |
| 6 | **`lib/data/howto.ts:377`** | *"**Most clients appreciate a reminder** — they're busy too."* | Lowest severity — "clients" here reads as *the reader's* clients, not Handbuilt's. Reword to "most customers" to remove the ambiguity. |

**Fix:** these are five sentences and one parenthetical. Rewrite as capability or reasoning rather than observed cohort behaviour — e.g. *"A single worker is designed to pay for itself from the leads it catches"* instead of *"most clients recover the cost within the first month."* No page needs to be rebuilt.

### 4.4 Nine payback assertions — MEDIUM, owner's call

Phrased as observed base rates (*"typically"*, *"usually"*) by a studio with no customers:

| file:line | Quote |
|---|---|
| `lib/data/industries.ts:118` | *"…**typically pays back** in one recovered spring renewal season."* |
| `lib/data/industries.ts:335` | *"…recovering even five peak-week calls per season **typically covers the cost**."* |
| `lib/data/industries.ts:536` | *"…**typically recovers the cost in the first month**."* |
| `lib/data/industries.ts:603` | *"…preventing even 10% annual lapse **typically covers the cost**."* |
| `lib/data/_industries_b.ts:458` | *"Even one recovered job **typically covers the cost** of the system."* |
| `lib/data/locations.ts:709` | *"…there's **usually an AI worker that pays for itself fast**."* |
| `lib/data/locations.ts:833` | *"…an AI worker **usually pays for itself inside the first season**."* |
| `lib/data/locations.ts:862` | *"…**usually pays for itself in recovered jobs**."* |
| `lib/data/resources.ts:66` | *"…automation **usually pays for itself within a year**."* |

Each is arithmetic dressed as experience. `/resources/is-ai-receptionist-worth-it` shows the honest form of the same argument: *"Divide $1,500 by your average job value. That is how many recovered jobs it takes to pay for itself."* No claim, just the calculation. Recommend converting all nine to that form. Not a launch blocker, but it is the pattern that becomes a fabrication the moment someone asks "typically according to whom?"

### 4.5 Two non-public notes

- **`lib/agent/businessDiscovery.ts:64` and `:142`** — `rating: Math.random() * 2 + 3` and `reviewCount: Math.floor(Math.random() * 100) + 10`. This **generates fake ratings and review counts** for prospect records in the cold-call tooling. It is not public (`/agent/*` returns 404 and is `Disallow`ed), so it is not a customer-facing fabrication — but it means the owner's own prospect list contains invented numbers that look real. Label them or remove them.
- **`lib/data/showroom.ts:151,154`** — *"5-star review: amazing service, fast and friendly!"* These are **sample inputs** a visitor pastes into a review-reply demo, not claimed reviews. Correct as-is. The same file at `:271` instructs the model: *"Never invent specific prices, addresses, staff names, hours, or testimonials."*

### 4.6 Statistics — reviewed, no fabrications

All 37 distinct sentences containing a `%` across the 164 pages were read. Every one is either a calculator input/output, an explicitly-framed hypothetical (*"Say a…"*, *"Consider a…"*, *"Take a…"*, *"Worked example"*, *"Assumes…"*), or a generic industry rule of thumb. **None is presented as a measured Handbuilt result.** Two carry mild uncited-statistic risk and are worth a source or a hedge: `/tools/contractor-labor-burden-calculator` — *"An employee costs far more than their wage — often 25–40% more"*; `/creators/ai-course-creator-automation` — *"a support assistant trained on the course answers 80% of questions instantly."*

Every use of "guarantee" on the site was also read in context. All 8 are **negations or disclaimers** — e.g. `/industries/clinic-ai-automation`: *"We are not a covered entity under PIPEDA/PHIPA and cannot provide compliance guarantees"*; `/tools/missed-call-revenue-calculator`: *"Results are estimates to guide a decision, not guaranteed outcomes."* No absolute guarantee is offered anywhere except the `faqs.ts:33` parenthetical in §4.3.

---

## 5. Pricing

### 5.1 The three floors — `lib/data/packages.ts` PASSES

| Rule | `packages.ts` | Rendered on `/pricing` | Verdict |
|---|---|---|---|
| Single done-for-you AI worker ≥ **$1,500 CAD** | `id: "starter"`, `price: 1500`, `priceFormat: "from"` | *"From $1,500 CAD · Live in ~5 business days"* | ✅ |
| Connected business system ≥ **$3,500 CAD** | `id: "business"`, `price: 3500`, `priceHigh: 7500` | *"$3,500–$7,500 CAD · Live in 2–3 weeks · most land around $5,000"* | ✅ |
| Custom AI app ≥ **$10,000 CAD** | `id: "custom"`, `price: 10000`, `priceFormat: "from"` | *"From $10,000 CAD · Typically 4–8 weeks"* | ✅ |

Every page emits the same package JSON-LD with prices `1500, 3500, 10000, 99, 99`. Across all 164 pages, `$1,500` appears on 102, `$3,500` on 83, `$7,500` on 78, `$10,000` on 24. **The package tier itself is consistent site-wide.** `packages.ts` is doing its job as the single source of truth.

### 5.2 🚨 BLOCKER — `/shop` contradicts `/services/*` on five products, four of them below the floor

`lib/data/shopProducts.ts` carries a **hand-typed `priceLabel` string per SKU** that is not derived from `packages.ts`. For five products it states a different price from the `/services/<same-slug>` page describing the same thing. All observed on `http://localhost:3200`.

| slug | `/services/<slug>` says | `shopProducts.ts` says | Δ | Floor |
|---|---|---|---|---|
| `ai-quote-generator` | *"Starts at **$1,500 CAD**."* | `:93` `"$1,000 · built for you"` | −$500 | ❌ **below** |
| `ai-chatbot-for-website` | *"…live in about 5 business days, starting at **$1,500 CAD**."* | `:138` `"$1,000 · built for you"` | −$500 | ❌ **below** |
| `ai-invoice-reminder-system` | *"Starts at **$1,500 CAD**."* | `:160` `"$1,000 · built for you"` | −$500 | ❌ **below** |
| `ai-receptionist-setup` | *"Setup starts at **$1,500 CAD** as a one-time build rather than a per-minute plan."* | `:71` `"From $129/mo · we run it"` | contradicts the **model**, not just the number | ❌ **no one-time floor at all** |
| `ai-lead-capture-form` | *"Setup starts at **$1,500 CAD**…"* | `:115` `"From $2,500 + $99/mo"` | +$1,000 | see §5.5 |
| `ai-customer-reactivation` | *"…from **$500 per campaign**."* | `:205` `"From $500 · per campaign"` | consistent | ❌ **both below** |
| `ai-review-engine` | *"…from **$1,000 CAD** to set up, then $49/mo."* | `:182` `"$1,000 + $49/mo"` | consistent | ❌ **both below** — see §5.3 |
| `ai-operations-dashboard` | *"**$1,500** to set up, then from $199/mo all in."* | `:227` `"From $199/mo + setup"` | setup **omitted** on the card | ⚠️ |
| `ai-receptionist-os` | *"Pricing is **$1,500** onboarding, then from $349/mo."* | `:270` `"From $349/mo + setup"` | setup **omitted** on the card | ⚠️ |
| `ai-business-analyst` | *"…from $99/mo on top of your dashboard."* | `:249` `"From $99/mo · add-on"` | consistent | ✅ add-on |

**This is not a prose slip — it is in structured data.** The `/shop` page emits a second JSON-LD block whose `Offer` prices are:

`129, 129, 1000, 2500, 99, 99, 1000, 1000, 1000, 49, 49, 500, 1500, 199, 199, 99, 99, 1500, 349, 349`

Four `1000` offers, a `500`, and a `129` are published to Google as machine-readable prices for done-for-you AI workers, while every other page on the site publishes `1500` as the floor. This is the same class of defect as the P0 pricing contradiction fixed on 2026-08-01 — it was never extended to `/shop`.

**Fix:** derive `priceLabel` from `packages.ts` the way the rest of the site does, or at minimum raise the four `$1,000` SKUs to `$1,500` and add the omitted `$1,500` setup to the two monthly cards. Not shippable as-is.

### 5.3 🚨 Review Engine — dishonestly classified

**What it actually delivers** (`/services/ai-review-engine`, `lib/data/shopProducts.ts:170-182`):

> *"An AI Review Engine is a managed system that asks every customer for a review after their job finishes, invites all of them to review it publicly using the same link, and copies you on what they say… Handbuilt builds it on your real jobs and **runs it for you** — connected to **Google Business, Twilio SMS and Gmail**."*

Price: **from $1,000 CAD setup + $49/mo.**

**Verdict: this is a single done-for-you AI worker priced $500 below its own floor.** The evidence is in `packages.ts` itself — the Starter tier is defined as:

> `"One focused AI worker (receptionist, chatbot, quote intake, or review replies)"` … `"Connected to one channel (website, SMS, email, or WhatsApp)"` … `"~5 business days to launch"`

The Review Engine is a review worker on one channel (SMS), live in ~1 week. It is the Starter package under a different name, at $1,000. Two further points make this worse, not better:

1. `lib/redirects.js` row 20 301s `/services/ai-review-request-system` → `/services/ai-review-engine`, so this page now absorbs *all* review-request intent. It is the canonical review product.
2. It also carries a **$49/mo** run fee the $1,500 Starter does not, so the cheaper SKU is the one with recurring revenue attached — the pricing tells a buyer the opposite of the truth about which is the bigger commitment.

**Recommendation: reprice to $1,500 setup + $49/mo**, or drop the "we run it" managed component and sell it as a $1,500 one-time build the customer owns. Do not leave it at $1,000. *(This is recorded in project memory as an open owner call from 2026-08-01 — "$1,000 vs $1,500 Starter floor". It is still open, and it is now published in structured data.)*

### 5.4 🚨 Six creator tools sold at $500–$900

`components/creators/CreatorStudio.tsx:78-83`, rendered on `/creators` (position 8.0, protected). The file's own comment reads *"creators buy the tool once, it's theirs"* — one-time custom builds, i.e. single done-for-you AI workers:

| Item | Price |
|---|---|
| Script / hook generator — *"trained on your niche + voice"* | **$500** |
| Caption + subtitle generator — *"on-brand, burned-in"* | **$500** |
| Thumbnail generator — *"your brand kit, consistent style"* | **$700** |
| TTS voiceover tool — *"your voice or licensed"* | **$700** |
| Clip finder / repurposer — *"long video → ready clips"* | **$900** |
| Custom creator tool — *"built to your workflow"* | **from $900** |

All six are below the $1,500 floor. The page then says: *"Bundle any three into one wired system — that's the $1,500 Starter build."* That is the tell — three sub-floor items are stated to equal one Starter, which concedes each is a fraction of a worker while still selling each as a standalone custom build. **Recommendation: either raise the floor to $1,500 for any standalone build and sell these only as bundle components, or relabel them as templates the buyer configures rather than tools built for them.**

### 5.5 Lead Capture — honestly priced on one page, misclassified on the other

**`/services/ai-lead-capture-form` — correct.** What it delivers: *"a branching intake that adapts to each visitor's answers"*, mapped qualifying questions, connected to inbox/CRM/Sheet, tested end-to-end plus the embed code. That is **one worker**. Priced at *"Setup starts at $1,500 CAD"* — **meets the floor. ✅**

**`shopProducts.ts:103-115` — misclassified.** Same slug, but the shop card describes a bigger product:

> *"Replies instantly, qualifies the lead, and **follows up by email or text until they book** — so nothing goes cold."*

Instant qualification **plus** a multi-channel follow-up agent running until conversion is **two connected workers across two channels** — by `packages.ts`'s own definition (*"2–4 connected AI workers… Automated workflows: call handling, quotes, lead follow-up"*) that is the **Business tier, floor $3,500**. It is priced at **$2,500 + $99/mo — $1,000 below the connected-system floor**, and published as a `2500` offer in `/shop`'s JSON-LD.

**Verdict: "Lead Capture" is two different products sharing one slug.** One is a $1,500 intake worker; the other is a $2,500 intake-plus-follow-up system that should be $3,500.

**Recommendation — pick one:**
- **(a)** Keep `/services/ai-lead-capture-form` as the single intake worker at **$1,500**, and split the shop SKU into a separately-named connected system at **$3,500**. *(Preferred — it also resolves the `ai-intake-form-builder` duplicate at §1.6 #19, since the intake worker then has exactly one page.)*
- **(b)** Strip the "follows up until they book" claim from the shop card so it describes one worker, and price it **$1,500** to match the service page.

Do not ship the current state: the same URL slug quotes $1,500 in one place and $2,500 in another, for two different scopes.

### 5.6 Pricing summary

| Rule | Verdict |
|---|---|
| Single worker ≥ $1,500 | ❌ **11 violations** — 4 shop SKUs at $1,000, 1 at $500, Review Engine at $1,000, 6 creator tools at $500–$900 (Review Engine counted once) |
| Connected system ≥ $3,500 | ❌ **1 violation** — Lead Capture shop SKU at $2,500 for a 2-worker scope |
| Custom app ≥ $10,000 | ✅ **No violations** — `$10,000` appears on 24 pages, always as the floor |
| Review Engine honestly classified | ❌ **No** — it is a Starter-class single worker at $1,000 |
| Lead Capture honestly classified | ⚠️ **Split** — the service page is honest at $1,500; the shop SKU sells a connected system at $2,500 |

---

## 6. What I could not verify

- **The Vercel preview deployment itself.** It is behind Deployment Protection (SSO). Everything in §2 and §3 was verified against the local production build of the same commit `8c32924`, which is byte-identical, but it is not the preview URL and I am not claiming it is. Re-run the §2 and §3 checks against the preview once protection is lifted, or against production after deploy.
- **Live production behaviour at `https://aibuiltbyhand.com`.** Not touched beyond the read-only scope of this task; nothing in this report describes production state.
- **GSC data freshness.** Positions and impressions are read from `02-url-inventory.csv` (window ≈ 2026-06-14 → 08-10). They were not re-pulled from Search Console. Several protected positions rest on 1–3 impressions and are statistically fragile — e.g. `/locations/ai-automation-maple-ridge-bc` at position 4.0 on **one** impression. The protection rule was applied as written regardless.
