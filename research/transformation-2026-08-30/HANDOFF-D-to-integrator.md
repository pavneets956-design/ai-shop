# HANDOFF — Lane D (content registries, consolidation, redirects, pricing) → integrator

**Date:** 2026-08-30 · **Branch:** `feat/site-transformation-2026-08-30` · **Nothing committed — working tree only.**
**Spec executed:** `research/transformation-2026-08-30/03-content-dispositions.md` §1, §5.2, §5.3.
**Gate at handoff:** `npx tsc --noEmit` → **No errors found** · `npx vitest run` → **232 passed / 0 failed** (includes `tests/seo-static.test.ts`).

---

## 0. Read this first — two corrections to the brief

**1. "Zero of 39 industry pages contain the word 'receptionist'" is FALSE at HEAD.** That finding is stale. Measured before I touched anything: **17 of the 31 surviving industry entries already contained "receptionist"**, 63 occurrences across the three industry files. The real gap was the *market noun*: **"answering service" appeared exactly once** across all 39 industry pages, while every Canadian competitor (askbenny.ca, Mihron, VoiceFleet) sells on that phrase. That is what I fixed — "answering service" is now at **10** occurrences and "receptionist" at **70**, concentrated on the five IMPROVE trade pages where the phone is genuinely the channel. The 14 entries still carrying neither are non-phone verticals (accountant, consultant, agency, law firm, immigration, wedding planner, gym, personal trainer, mortgage, insurance, real estate, dental, auto-detailing) and are KEEP pages — adding copy to them was out of scope and would risk their positions.

**2. `lib/redirects.js` has 46 rows, not 48.** Your message said 48. Verified count is 46: 45 merges/retirements + 1 retargeted alias. The 46th spec row (`/locations/ai-automation-edmonton-ab`) was deliberately downgraded to KEEP — evidence in §2.

---

## 1. Redirect map — `lib/redirects.js`

**46 rows. 0 duplicate sources. 0 chains. 0 non-permanent. 34 unique destinations. Every destination is a KEEP/IMPROVE page.**

```
rows: 46
duplicate sources: 0
chains (destination is also a source): 0
non-permanent: 0
destinations (unique): 34
edmonton present? no — downgraded to KEEP
```

Composition: use-cases 17 · services 4 · industries 8 · resources 7 + 1 retargeted alias · how-to 3 · compare 4 · locations 2 (Gate G2).

**Evidence gate applied to every source** before writing it, against `02-url-inventory.csv`. **42 of 46 sources have 0 impressions and 0 clicks. No source has a single click.** The five with any measured impression:

| Source | impr | clicks | pos | Kept as a merge because |
|---|--:|--:|--:|---|
| `/resources/ai-integration-cost` | 3 | 0 | 85.3 | Position 85 is zero traffic value; the 301 preserves the history rather than discarding it. The disposition made this call knowingly with this number on file. |
| `/resources/can-ai-follow-up-with-leads` | 2 | 0 | 71.0 | 247-word stub on the identical intent as a 606-word guide. |
| `/how-to/automate-missed-calls` | 1 | 0 | 68.0 | 295 words, duplicate token with the use-case that becomes the single missed-call page. |
| `/locations/ai-automation-calgary-ab` | 4 | 0 | 76.8 | Gate G2. Out of service area, T1+T2+T3 template with the city swapped. |
| `/locations/ai-automation-toronto-on` | 1 | 0 | 84.0 | Gate G2. Same. |

### ⚠️ ONE ROW DOWNGRADED TO KEEP — `/locations/ai-automation-edmonton-ab`

**GSC evidence: 1 impression, 0 clicks, position 7.0.** It is the only source on the whole list that ranks page-one for anything, and disposition gate G1 flips any source at **position ≤30** to KEEP. I left its registry row in `lib/data/locations.ts` and wrote no redirect for it.

Counter-argument for the owner, stated fairly: 7.0 is a **single-impression sample**, and the page is the Richmond/Coquitlam template with the city name swapped, for a city outside the advertised service area — which is exactly why the disposition proposed retiring it. My call was that keeping a page costs nothing and is reversible, while redirecting away a page-one position and finding out later is not. **If the owner wants it gone, it is a two-line change:** add the row to `lib/redirects.js` and delete the `ai-automation-edmonton-ab` entry from `locations.ts` in the same commit.

### Wiring notes
- Lane B had already wired `next.config.js` to `require('./lib/redirects.js')` and merge it **first**, de-duping its own base list by `source`. My retargeted alias `/resources/best-ai-tools-for-small-business-canada` → `/resources/best-ai-automations-for-service-businesses` therefore **supersedes** the stale row still in `next.config.js` (which pointed at `/resources/best-ai-tools-for-small-business`, itself now a redirect source). That would have been the only chain in the map. **The old row in `next.config.js` can be deleted for tidiness but is already inert.**
- **Two conditional targets retargeted to `/creators`**, because I applied the G2 noindex to their twins and a 301 into a noindexed page wastes the hop: `/resources/can-ai-edit-videos` and `/how-to/build-faceless-content-system`.
- The 2 location rows sit in a clearly-marked **Gate G2 (owner approval)** block at the bottom of the file, easy to delete as a unit.

---

## 2. Registry rows removed — 45 total

Every slug was verified present before removal; **0 misses, 0 guesses**. Row counts after:

| File | Removed | Rows now | Spec said |
|---|--:|--:|---|
| `useCases.ts` | 17 | 8 | −17 ✅ |
| `_services_b.ts` | 4 | 11 | −4 ✅ (all four are in `_services_b`; `services.ts` lost none) |
| `_industries_c.ts` | **8** | 10 | **−7 + `_industries_b` −1 ❌ — see below** |
| `_industries_b.ts` | 0 | 11 | — |
| `resources.ts` | 7 | 17 | −7 ✅ |
| `howto.ts` | 3 | 6 | −3 ✅ |
| `compare.ts` | 4 | 17 | −4 ✅ |
| `locations.ts` | 2 | 17 | −3 (Edmonton downgraded) |

**Mismatch reported rather than guessed (§5.3):** the spec says `_industries_c.ts −7 / _industries_b.ts −1` and flags "barbershop is in `_industries_c`; verify per slug list". Verified: **all 8 merged industry slugs live in `_industries_c.ts`** (bookkeeper, barbershop, food-truck, photographer, videographer, coach, ecommerce, retail-store). `_industries_b.ts` loses nothing. The 8/0 split is correct; the spec's 7/1 was wrong.

`getUseCaseDemo` and its `CONVERSATIONAL` / `DEMO_INDUSTRY` / `DEMO_WORKER` / `SAMPLE_BUSINESS` maps in `useCases.ts` are **untouched** — the removals spliced array entries only. Verified by string assertion after every batch.

### Internal links repointed
**52 `related`/`relatedBuilds` links repointed** inside my own files, then **6 duplicate** and **4 self-referential** links dropped from the affected entries. **0 entries left with fewer than 2 related links.** Post-check: **zero references to any merged slug remain in any Lane D file.**

### ⚠️ 8 dangling references remain in files I do not own — INTEGRATOR MUST FIX
The 301s will catch these, but they are internal links to redirect sources:

| File | Line | Points at | Should point at |
|---|--:|---|---|
| `lib/data/money.ts` | 250 | `/use-cases/ai-receptionist-for-contractors` | `/ai-receptionist-for-contractors` |
| `lib/data/money.ts` | 513 | `/resources/what-is-an-ai-receptionist` | `/ai-receptionist` |
| `lib/data/money.ts` | 514 | `/compare/ai-receptionist-vs-human-receptionist` | `/compare/ai-receptionist-vs-virtual-receptionist` |
| `lib/data/money.ts` | 722 | `/resources/what-can-ai-automate-small-business` | `/resources/ai-automation-examples-for-small-business` |
| `lib/data/money.ts` | 911 | `/services/custom-business-automation` | `/services/ai-workflow-automation` |
| `lib/data/money.ts` | 972 | `/locations/ai-automation-toronto-on` | `/remote-ai-development` |
| `lib/data/money.ts` | 973 | `/locations/ai-automation-calgary-ab` | `/remote-ai-development` |
| `components/home/MoltenForge.tsx` | 211 | `/resources/what-can-ai-automate-small-business` | `/resources/ai-automation-examples-for-small-business` |

---

## 3. Creator vertical — 14 rows noindexed (Gate G2)

**`noindex: true` set on exactly 14 creator rows. Nothing deleted. `/creators` untouched.** 7 in `creators.ts`, 7 in `_creators_b.ts`. The 6 with a GSC row stay indexed, as specified.

I added `noindex?: boolean` to `LandingContent` in `lib/data/landing.ts` with a comment explaining the contract. **The template side was already built by Lane P/B** — `lib/seo.ts` has `isNoindexEntry()` reading `content.noindex`, `landingMetadata()` already emits `robots: { index: false, follow: true }` when set, and `app/sitemap.ts` already imports `isNoindexEntry`. So the metadata and sitemap paths work with no further change.

### ⚠️ INTEGRATOR ACTION — one template still needs to read the flag
`app/creators/page.tsx` (the hub) lists registry rows directly. **`isNoindexEntry` only controls metadata and the sitemap — it does not filter a hub listing.** The hub will keep linking all 20 creator pages unless it filters. That is not my file. Linking to a noindexed page is harmless (they are `follow`), so this is a positioning tidy-up rather than a defect — your call whether to filter.

---

## 4. Pricing sweep

`lib/data/packages.ts` treated as sole source of truth: Starter from $1,500 · Business $3,500–$7,500 · Custom from $10,000 · Care Plan from $99/mo.

**11 contradictions fixed:**

| File:line (pre-edit) | Was | Now |
|---|---|---|
| `compare.ts:345` | "a custom build from Handbuilt (from CAD **$7,500**)" | "(from CAD **$10,000**)" — Custom tier floor |
| `compare.ts:929` | "More complex receptionist builds … run up to **$2,500**" | "scoped as a Business AI System at **$3,500–$7,500** CAD" |
| `compare.ts:1047` | "custom one-time builds (**$1,500–$2,500** at Handbuilt)" | "$1,500 for a single worker up to $3,500–$7,500 for a connected system" |
| `compare.ts:107` | Cash cost, handbuilt: "CAD **$1,500–$3,500**" | "CAD $1,500 (one worker) to $3,500–$7,500 (connected system)" |
| `compare.ts:237, 372, 437` | Setup/Upfront cost, handbuilt: "CAD **$1,500–$3,500** one-time" ×3 | same correction ×3 |
| `compare.ts:1334` | "a custom build costs **$2,000**, … pays for itself in about 10 months" | "$1,500 Starter build pays for itself in about eight months and a $3,500 Business build in about eighteen" |
| `resources.ts:353` | "runs closer to **$2,000–$2,500**" | "is a Business AI System at $3,500–$7,500 CAD" |
| `resources.ts:177` | "typically costs **$1,500–$3,500** CAD as a one-time build fee" | "$1,500 CAD for one worker, or $3,500–$7,500 for a connected system" |
| `liveTools.ts:142` | AI Admin System price "From **$2,500** CAD" | "From **$3,500** CAD" |
| `compare.ts:951` | title "Best AI Receptionist for Small Business Canada" | "Best AI Answering Service for a Canadian Small Business" (retitle, R5 P2) |

### Proof — the four patterns from the brief

```
$ node stalegrep.js '$2,500' '$7,500+' '~$1,000' '$250/mo'
lib/data/resources.ts:720   [$250/mo]  "…If they exceed roughly $250/mo, a custom tool often pays back inside 18 months…"
lib/data/compare.ts:58      [$250/mo]  "…If they exceed CAD $250/mo, a custom tool often pays back in under 18 months…"
lib/data/compare.ts:230     [$250/mo]  "The VA cost for this one task exceeds $250/mo"
lib/data/compare.ts:238     [$2,500]   { factor: "Monthly cost", handbuilt: "Optional Care Plan $99/mo", alternative: "CAD $400–$2,500/mo depending on hours" }
lib/data/compare.ts:1163    [~$1,000]  "Typical range: ~$1,000–$10,000+/mo"
lib/data/shopProducts.ts:115 [$2,500]  priceLabel: "From $2,500 + $99/mo"
MATCHES: 6
```

**`$7,500+` → 0 matches. Fully eliminated.** The other 6 are **not Handbuilt prices** and I did not touch them:
- **3× `$250/mo`** — the *reader's own* SaaS subscription / VA spend threshold ("add up your subscriptions; if they exceed…"). A third-party benchmark, not a Handbuilt price.
- **`compare.ts:238` `$2,500`** — inside the `alternative:` (virtual assistant) column. The `handbuilt:` cell on that same row reads "$99/mo".
- **`compare.ts:1163` `~$1,000`** — a third-party **agency retainer** band on the agency-pricing comparison page.
- **`shopProducts.ts:115` `$2,500`** — a storefront SKU. See the open owner call below.

### Authoritative assertions (both scripted, both zero)

```
comparison-table Handbuilt price cells checked: 24   off-ladder: 0
Handbuilt-attributed price sentences scanned: 61     off-ladder: 0*
```
\* 2 lines flag, both because a third-party band ("SaaS apps around $50–$500/mo", "agencies $100–$250/hr") sits in the same sentence as the word "Handbuilt". Neither is a Handbuilt-attributed price.

### 🚩 TWO OPEN OWNER CALLS — pricing, not copy. I did not change either.
1. **AI Review Engine at `$1,000` + `$49/mo`** (`_services_b.ts`, `shopProducts.ts:182`) sits **below the $1,500 Starter floor**. This is the pre-existing open call already on record from 2026-08-01.
2. **AI Lead Capture & Follow-Up at `From $2,500 + $99/mo`** (`shopProducts.ts:115`) is tagged `packageId: "business"` but priced **below the $3,500 Business floor**. Same class of question.

Both are storefront SKU prices for a deliberately distinct productized line, not mis-typed copies of package prices. Repricing a live product is a business decision with no evidence pointing either way, so I flagged rather than "fixed" it.

---

## 5. Claims sweep

Re-ran the R8 / §3 pattern families over all 17 Lane D files. **15 real violations found and fixed.** Exact patterns used are at the bottom of this section.

| # | File:line | Verbatim text removed | Class |
|---|---|---|---|
| S1 | `howto.ts:298` | "Most of our clients use a light footer note … Customers rarely object." | Fabricated client base + observed customer behaviour |
| S16 | `howto.ts:179` | "BC minimum wage 2024: $17.40/hour — a part-time receptionist (20 hrs/week) costs $1,400+/month" | Stale self-dated statistic |
| — | `howto.ts:30` | "(Harvard Business Review, 2011 — **still holds**)" | Unsupported editorial claim bolted onto a real citation |
| — | `howto.ts:73` | "The goal is to **never lose a lead** just because the bot hit a gap." | Absolute |
| — | `howto.ts` FAQ | "Callers sometimes **can't tell**." | Indistinguishability (missed by the original R8 regex — no "it's") |
| S11 | `_industries_c.ts:90` | "a friendly, on-brand check-in that's **proven** to reactivate a share of them" | "Proven" without evidence |
| — | `compare.ts:480` | "warm, flexible, **proven**" | "Proven" (describing the human alternative) |
| — | `compare.ts` FAQ | "high uptime — **typically above 99.9%**" | Unverifiable statistic about infrastructure the studio does not control |
| — | `compare.ts` body | "the AI **never has an off day**" | Absolute |
| — | `_services_b.ts:195` | `ctaLabel: "Never miss a call"` | Absolute, in a CTA button |
| — | `_services_b.ts:522` | "runs your entire front desk so you **never lose a lead** in the gaps" | Absolute |
| S13 | `_services_b.ts:318` | "Google Business **for posting reviews**" | Capability the product cannot have — only a customer can post a review |
| — | `shopProducts.ts:264` | "**Never lose a lead again.**" | Absolute |
| — | `shop.ts:46` | "**Never miss a lead** — it answers 24/7" | Absolute |
| — | `locations.ts:799` | "Yes — AI assistants can converse and book in **multiple languages**." | Capability claim contradicting the site's own "English reliably" |
| — | `creators.ts:59` | "we build for creators **worldwide**" | Unverified market claim (facts gap #14 class) |

**Final sweep result — 9 candidate lines, all verified false positives, 0 real violations:**

| Group | n | Why it is a false positive |
|---|--:|---|
| A. client base | 4 | All are "**your** clients" — the reader's customers, not Handbuilt's. |
| B. social proof | 1 | My own heading "Written from running a fence company, **not from a case study**" — matched on "case stud". |
| F. indistinguishability | 2 | Both are my own copy stating it is **not** indistinguishable from a person. |
| G. capability | 1 | My own copy stating **no system can** post a review on a customer's behalf. |
| C, D, E, H, I, J | **0** | Invented statistics, "proven", absolutes, past-tense customer results, geography claims, stale self-dated stats — **all zero**. |

**Exact patterns used** (`scratchpad/claims.js`, 10 groups over 17 files):
```
A  /our clients|clients (have|saw|see|report|tell|use)|customers (say|report|tell|love|rarely object)|most of our|several of (our|my)|businesses we('ve| have) (helped|worked)/i
B  /trusted by|testimonial|client logo|case stud|aggregateRating|reviewCount|ratingValue|rated [0-9]|[0-9]+\+ (businesses|clients|customers|contractors|companies)|years of experience|since 20[0-9][0-9]/i
C  /[0-9]+% (more|fewer|less|increase|decrease|of (our|their) )|saved \$|saves \$|recovered \$|[0-9]+x (more|faster|ROI)|paid for itself for|booked [0-9]+ (more|extra)/i
D  /\bproven\b/i
E  /never miss(es)? a (call|lead)|never lose a lead|no missed calls ever|100% of (calls|leads)|zero missed|always answers every|guaranteed to/i
F  /can'?t tell (it'?s|they'?re|the difference)|indistinguishable|sounds exactly like a (human|person)|nobody (will )?know it'?s ai/i
G  /post(ing)? reviews|posts? a review (to|on)|writes? (the )?reviews? for/i
H  /we (helped|installed|set up|deployed|delivered|built) (a|an|the|[0-9])[a-z ]*(client|customer|contractor|company|business)|they (booked|saw|got) [0-9]/i
I  /Australia|New Zealand|United Kingdom|worldwide/i
J  /(20(1[0-9]|2[0-5])):?\s|minimum wage 20[0-9][0-9]/
```

---

## 6. Pages rewritten

Every rewrite is grounded in `09-proof-founder-positioning.md`. **No customer, testimonial, review, logo, client count, ROI figure or past-tense delivered result was written anywhere.** The firsthand material used is §A3/§A3b (the author's own cedar-fence business and the AI receptionist he ran on its real line), §A2 (PayNudge integrations built against Jobber/QuickBooks/Square/Stripe), §A5 (the five free tools), and §D (competitor pricing).

### Full rewrites (9)
| Page | Was | Now carries |
|---|---|---|
| `/resources/best-ai-tools-for-contractors` | 279 words, reviewed nothing, named no third-party tool — **124 impressions, the site's #2 page** | Explicit "how this was picked and what has actually been tested" split into *built against directly* (Jobber, QuickBooks, Square, Stripe) vs *not bench-tested* (Housecall Pro, ServiceTitan, CompanyCam, standalone services); named tools with verified prices; per-tool "best for / not for"; the five free calculators; a "buy one tool, not six" close. Explicitly declines to name a winner and says why. |
| `/resources/best-ai-automations-for-service-businesses` | 253-word generic listicle | Five automations in **build order**; the atomic-claim-before-send ordering lesson from a real reminder system; "which to build first" decision rule; a **"ones to skip"** section (AI social posts, AI blog content, review gating). |
| `/resources/ai-receptionist-cost` | Bands only | The three price shapes with **verified competitor figures**; a **"fees that are easy to miss"** section (per-minute overages, $75–1,500 setup fees, per-resolution billing, model usage); the year-one vs year-two arithmetic that concludes **a subscription is often the better buy**. |
| `/resources/is-ai-receptionist-worth-it` | 556 words, break-even in prose | Break-even you run yourself + links the missed-call calculator; **"Two businesses where the answer is no"**; a firsthand section on the three things running one on a real line taught, ending with the honest disclosure that **the AI is currently out of the call path on that line and why**. |
| `/resources/can-ai-answer-business-phone-calls` | "Six generic verbs" (R6 Tier B) | How it works under the hood incl. the config-driven business brain and the *services explicitly not offered* field; **"The four ways it breaks in real life"** — upstream telephony failure (one caller, 14 attempts, never connected), a provider retiring the model mid-flight producing a greeting-then-silent agent, hang-ups during greeting, bad audio/talk-over; a latency FAQ that **refuses to quote an unmeasured number**. |
| `/resources/ai-chatbot-cost` | 330 words on the site's #1 topic | The running cost nobody quotes (model usage, who holds the account); what drives build price; **"Where chatbots waste money"**. |
| `/how-to/automate-review-requests` | 327 words | Rebuilt as the **compliance explainer**: review gating stated plainly incl. the "how did we do?" dressed-up version; what no tool can do (post on a customer's behalf); "stop after two". |
| `/use-cases/missed-call-automation` | 295 words, absolute claims | Absolutes removed; measurement-first framing; a **"what are the limits"** FAQ (personal-cell blind spot, telemarketers, emergencies need a person). |
| `/use-cases/appointment-reminder-automation` | 224 words — thinnest page on the site | Reschedule-link-is-the-mechanism insight; stale-calendar failure mode; "how many reminders is too many". |
| `/services/ai-receptionist-setup` | — | Retitled to **"AI Answering Service Setup for Small Business"** (R5 P2); disclosure-first and "what happens when it doesn't know" FAQs added. |

### Targeted expansions (7)
- `/how-to/create-ai-receptionist-for-small-business` — two new sections: **"How to actually test it before it touches a customer"** (call from one bar of signal, interrupt it, ask for a service you don't offer, trigger the emergency phrase and confirm it reaches a ringing phone) and **"What goes wrong once it is live"**.
- `/industries/fence-company-ai-automation` — the strongest page: explicit disclosure that it is written from running a cedar-fence business, **not** from a client case study; the real intake fields that price a fence (slope, truck access); an honest ranking of phone vs follow-up.
- `/industries/landscaping-ai-automation` — what a receptionist must know about a landscaping business; job-site audio and April-vs-January seasonality as failure modes.
- `/industries/electrician-ai-automation` — was the only trade IMPROVE page with **zero** "receptionist" occurrences; now leads on the two-stream emergency/routine split.
- `/industries/hvac-ai-automation` + `/industries/plumber-ai-automation` — retitled to **"AI Answering Service for HVAC Companies"** / **"…for Plumbers"** (R5 P1); seasonal-spike overage warning and emergency-transfer requirements added.
- `/compare/ai-receptionist-vs-answering-service` — the 99.9% uptime figure and "never has an off day" replaced with an honest three-party failure explanation and the silent-failure question to ask any vendor.

### Location pages (9)
8 retitled to carry the **answering-service / chatbot noun** alongside the city, slugs unchanged, incl. R5 C3's `developer` → `development` fix on the Vancouver chatbot page. **4 de-templated** with genuine local specifics (Richmond: the Cantonese/Mandarin language limit stated honestly; Coquitlam: Burke Mountain / Austin Heights renovation mix; White Rock: the one catchment where in-person is genuinely easy; Victoria: stated plainly as remote delivery). **new-westminster, maple-ridge and chilliwack were deliberately left templated** — disposition §1.7 says not to risk their positions in this pass.

### Not done — not my file
`/industries` hub copy lives in `app/industries/page.tsx`, which is outside Lane D ownership. §2.2's hub rewrite (tiering trades first, per-trade failure line) is unassigned.

---

## 7. Integrator checklist

1. **Fix the 8 dangling links** in `lib/data/money.ts` (×7) and `components/home/MoltenForge.tsx` (×1) — table in §2.
2. **Decide `app/creators/page.tsx`** — whether the hub filters the 14 noindexed rows (§3).
3. **Gate G2 owner approvals**: the 14 creator noindexes, and the 2 location redirects in the marked block at the bottom of `lib/redirects.js`.
4. **Owner decision on Edmonton** — keep as-is (current state), or add the redirect + delete the registry row together (§1).
5. **Two open pricing calls** — Review Engine $1,000/$49, Lead Capture $2,500 (§4). Both below their tier floors.
6. Optionally delete the now-inert `/resources/best-ai-tools-for-small-business-canada` row from `next.config.js` (§1).
7. Run `graphify update .` after the registry edits (project rule).
8. Expected sitemap count after this lane: **216 − 45 = 171** indexable registry URLs, minus the 14 creator noindexes = **157**, plus whatever Lane P adds (`/creators`, `/demo`).

---

## 8. Commands run, with output

```
$ node rm.js plan.json                      # dry run
(DRY)  removed=45 failures=0

$ node rm.js plan.json --write
WRITTEN  removed=45 failures=0

$ node repoint.js --write
repointed=52 deduped=6 self-dropped=4  WRITTEN
thin-related entries: 0

$ node noindex.js --write
WRITTEN noindex set on 14 rows
noindex:true rows = 14

$ node claimfix.js
applied=12  missed=0                        # + 3 more applied via Edit = 15 total

$ node ladder.js
comparison-table Handbuilt price cells checked: 24  off-ladder: 0

$ node prose-price.js
Handbuilt-attributed price sentences scanned: 61   off-ladder: 0*

$ node stalegrep.js '$2,500' '$7,500+' '~$1,000' '$250/mo'
MATCHES: 6                                  # all third-party or shop SKU — §4

$ node claims.js
TOTAL CANDIDATE LINES: 9                    # all false positives — §5
   C. invented statistics/outcomes  [0]
   D. "proven" without evidence     [0]
   E. absolute guarantees           [0]
   H. past-tense customer result    [0]
   I. unverified geography claim    [0]
   J. stale self-dated statistic    [0]

$ node -e "require('./lib/redirects.js')…"
rows: 46 · duplicate sources: 0 · chains: 0 · non-permanent: 0 · unique destinations: 34

$ registry row counts
useCases 8 · services 10 · _services_b 11 · industries 10 · _industries_b 11
_industries_c 10 · resources 17 · howto 6 · compare 17 · locations 17
creators 10 · _creators_b 10 — all match expected

$ npx tsc --noEmit
TypeScript: No errors found

$ npx vitest run
PASS (232) FAIL (0)
```

**No git state-changing command was run at any point.** All work is uncommitted in the working tree.
