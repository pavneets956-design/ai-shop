# 07 — Owner Decision Sheet

> ## ✅ RESOLVED 2026-07-31 — decisions returned by the owner
>
> The three decisions below were made by the owner and **have been implemented on
> `fix/p0-pricing-contradiction`**. The original analysis is preserved beneath for the record.
>
> | Item | State |
> |---|---|
> | **Pricing** | **DECIDED.** AI Business System = **$3,500–$7,500 CAD**. Starter from $1,500 · Receptionist Install $1,500–$2,500 · Custom App from $10,000 · Care Plan unchanged. Implemented — see `12-pricing-consistency-repair.md`. |
> | **Receptionist pillar** | **DECIDED.** `/ai-receptionist` is the primary broad pillar. `/ai-receptionist-for-contractors` is **not** redirected and **not** cross-canonicalised; it is differentiated in place. Reassess after ~90 days. Audited — see `11-receptionist-differentiation.md`. |
> | **Brand** | **TEMPORARY DECISION ONLY.** `Handbuilt AI` is **rejected** as the permanent brand — `handbuilt.ai` is already operated by another bespoke AI consultancy with materially overlapping positioning. Continue using **`AI Built By Hand`** temporarily. No brand migration, no asset purchase, no domain change, no redesign. |
> | **Permanent naming** | **UNRESOLVED — future owner-level work.** A distinctive-brand naming process is required. |
> | **Redirect implementation** | **BLOCKED.** Zero merges executed; consolidation deferred ~90 days pending more GSC evidence. |
> | **Full redesign** | **NOT STARTED.** |
> | **Design-partner acquisition** | **NEXT COMMERCIAL WORKSTREAM** — see `08-design-partner-plan.md`. |
>
> ### On the brand decision — read this precisely
>
> **GSC did not prove `AI Built By Hand` is the best permanent name, and nothing here claims it did.**
> The measured evidence is thin and points the other way on user language: `handbuilt` drew 9 of 12
> branded impressions at position 41.2. That is why the earlier recommendation favoured "Handbuilt AI".
> That recommendation is now **overridden by a fact GSC cannot see** — `handbuilt.ai` is an occupied
> name in the same category, which makes it a trademark and confusion risk regardless of search behaviour.
>
> `AI Built By Hand` is therefore the **safer temporary identity while a distinctive name is researched** —
> not a validated permanent choice. It matches the domain already owned and avoids collision. Both
> candidates remain weak on entity distinctiveness: the site does not rank page-1 for its own name
> under either. **Permanent naming stays open.**

---

These are decisions I deliberately did **not** make. Each one changes what customers are quoted, what the brand is called, or which audience the business serves — none are mechanical defects, so none were touched autonomously.

Each has: the evidence, the options, my recommendation, and what it unblocks.

**Everything from this line down is the pre-decision analysis, retained for the record.**

---

## DECISION 1 — Business tier price across the industry pages ⚠️ REVENUE-AFFECTING

**Status: 12 live pages currently quote a price the rest of the site contradicts.**

The P0 fix corrected `/ai-business-system` to **$3,500–$7,500 CAD** (see `09-preview-qa-report.md`). But `lib/data/industries.ts` still quotes **$2,500–5,000 CAD** for the same Business AI System tier on 12 live industry pages:

`lines 43, 81, 110, 177, 244, 311, 378, 445, 512, 579, 646` — landscaping, lawn-care, plumber, and 9 others.

Meanwhile `lib/data/_industries_b.ts` (the newer industries file) consistently uses **$3,500–$7,500**.

**Additional variants found in the repo:**
| File | Value | Note |
|---|---|---|
| `lib/data/liveTools.ts:127` | $2,500–$5,000 | legacy homepage component |
| `components/BuildRequestForm.tsx:15` | "$2,500–$5,000 (a system)" | **live intake form the customer sees** |
| `lib/data/alwaysAnswering.ts:178,273` | "$1,000 to $7,500+" | $1,000 floor contradicts the $1,500 Starter floor everywhere else |
| `lib/data/forge.ts:106–108` | $750–$2,500 / $2,500–$7,500 | `/forge` was retired via redirect — likely dead code |
| `lib/data/compare.ts:1195` | "$1,500–$2,500 at Handbuilt" | receptionist tier, different product |

**Why I didn't fix it:** changing what 12 pages quote a customer is a pricing decision, not a typo. The `/ai-business-system` strings I did fix were *self-refuting on their face* ("$3,500–5,000 CAD (typically $7,500)") — objectively broken regardless of the correct number.

| Option | Consequence |
|---|---|
| **A. Standardise everything to $3,500–$7,500** *(recommended)* | Matches homepage, /pricing, faqs, JSON-LD, `_industries_b.ts`. Raises the quoted floor on 12 pages by $1,000. |
| B. Standardise to $2,500–$5,000 | Requires changing homepage, /pricing, JSON-LD, faqs and `_industries_b.ts` — more surface, lower price |
| C. Introduce a single `pricing.ts` source of truth | Correct long-term fix. Larger change; prevents recurrence. |

**Recommendation: A now, C next.** A is a find-and-replace; C stops this happening a fourth time.

**Unblocks:** honest pricing site-wide; the AEO/GEO work in `research/13` and `research/14`; any redesign that quotes a price.

---

## DECISION 2 — Which receptionist page is canonical? ⚠️ BLOCKS THE CONSOLIDATION PLAN

**Measured:**

| Page | Impr | Pos | Serves `ai receptionist for contractors`? |
|---|---:|---:|---|
| `/ai-receptionist` | **146** | 72.5 | **Yes** — Google's choice |
| `/ai-receptionist-for-contractors` | 16 | 71.9 | **No** |

Phase 1 recommended merging 9 URLs *into* `/ai-receptionist-for-contractors`. That would redirect away the site's #1 page by impressions, in favour of a page Google currently ignores.

| Option | Consequence |
|---|---|
| **A. Make `/ai-receptionist` the contractor-focused canonical** | Keeps the ranking URL. Loses the exact-match slug — a modest on-page signal. Lowest risk. |
| **B. Force `/ai-receptionist-for-contractors` canonical, redirect the generic page in** | Better slug/intent match. **Risks the site's highest-impression URL** for an uncertain gain at position ~72 where nothing converts anyway. |
| **C. Keep both, differentiate hard** | Generic = category explainer; contractor = commercial. Requires real content work, defers the decision. |

**Recommendation: A.** At position 72 the exact-match slug is worth very little, and preserving the only page with meaningful impressions costs nothing. Revisit if positions improve materially.

**Unblocks:** the entire receptionist consolidation (9 URLs).

---

## DECISION 3 — The permanent public brand name

**Measured:** `handbuilt` — 9 impressions at position **41.2**. `hand built` — 3 impressions at position 54.0. **12 branded impressions total, and the site does not rank page-1 for its own name.**

Three names run in parallel today, visible in the site's own footer:
`© 2026 HANDBUILT AI · BY AI BUILT BY HAND · AIBUILTBYHAND.COM` — plus "Handbuilt AI Studio" in `llms.txt`.

| Option | For | Against |
|---|---|---|
| **A. "AI Built By Hand"** *(recommended)* | Exact domain match — strongest available corroboration for a zero-authority entity | Clunky spoken; the measured branded query is `handbuilt`, not this |
| **B. "Handbuilt AI"** | **This is what people actually search** (9 of 12 branded impressions) | No domain match |
| C. Keep all three | — | Guarantees the entity stays unresolvable |

**Note — this is a genuine revision to my Phase-1 recommendation.** Phase 1 recommended (A) on domain-match logic. The measured data shows real users search **`handbuilt`**, which argues for (B). Domain-match is a machine signal; matching what humans type is a demand signal. **I now lean (B) "Handbuilt AI", with `aibuiltbyhand.com` retained as the domain and "AI Built By Hand" as schema `alternateName`.**

**Unblocks:** GBP, all citations, `Organization` schema `sameAs`, and every entity-building action in `research/14`.

---

## DECISION 4 — Does "HANDBUILT AI" remain anywhere?

Consequence of Decision 3. If (B): it becomes the primary name everywhere. If (A): it survives only as schema `alternateName` and must be removed from the footer, `llms.txt` header and all copy.

**Explicitly requires a decision** — the current mixed state is the worst option.

---

## DECISION 5 — The `/creators` audience fork

**Phase 1 recommended noindexing all 20 pages. The measured data complicates that:**

| URL | Impr | Pos |
|---|---:|---:|
| `/creators` (hub) | 2 | **8.0** |
| `/creators/ai-creator-crm` | 7 | **6.9** |
| `/creators/ai-tiktok-content-system` | 2 | 7.0 |
| `/creators/ai-course-creator-automation` | 2 | 10.0 |
| `/creators/ai-coaching-content-system` | 1 | 11.0 |
| `/creators/ai-tools-for-content-creators` | 5 | 88.4 |
| `/creators/ai-youtube-shorts-automation` | 1 | 42.0 |

Creator pages rank **far better** (positions 6.9–11.0) than the contractor money pages (68–73). Only ~2 impressions of creator-intent *queries* were captured, so the volume is negligible — but the positions are the best on the site.

| Option | Consequence |
|---|---|
| **A. Defer** *(recommended)* | Costs nothing. 46 days is too short to kill 20 ranking pages. |
| B. Noindex now | Removes entity dilution immediately; discards the best-positioned pages on the site |
| C. Spin to a separate domain | Cleanest entity outcome; real work |

**Recommendation: A — defer to the 90-day review.** The entity-dilution argument from Phase 1 still stands strategically, but it is not urgent enough to justify discarding measurably-ranking pages on 46 days of data.

---

## DECISION 6 — Final headline, packaging and tier structure

Out of scope for an evidence gate; listed so it is not lost.

Phase 1 recommended *"The AI office system you own — built for your trade."* **No measured evidence supports or contradicts it** — zero ownership-language queries exist because no page uses that language.

**This is a positioning decision to make after proof exists, not before.**

---

## DECISION 7 — `/demo` and `/creators` are indexed but absent from the sitemap

`/demo` — 3 impressions, position **3.7**. `/creators` — 2 impressions, position **8.0**.

Both rank well. Neither is in `sitemap.xml`. `/demo` was not in the 216-URL inventory at all.

**Question for the owner:** is `/demo` intentionally excluded, or is this a registry gap? Two of the site's best-positioned URLs are invisible to its own sitemap.

**Recommendation:** investigate before touching either. If intentional, document why. If not, add to the registry.

---

## Summary — what blocks what

| # | Decision | Blocks | Urgency |
|---|---|---|---|
| 1 | Business tier price | Honest pricing site-wide | **HIGH — 12 pages quote a contradicted price today** |
| 2 | Receptionist canonical | 9-URL consolidation | HIGH — blocks the main merge |
| 3 | Brand name | GBP, citations, all entity work | **HIGH — blocks everything in `research/14`** |
| 4 | "HANDBUILT AI" retention | Footer, llms.txt, copy | Follows #3 |
| 5 | Creators fork | 20 URLs | LOW — defer to 90 days |
| 6 | Headline & packaging | Redesign | Defer until proof exists |
| 7 | `/demo` sitemap gap | Registry integrity | MEDIUM — investigate |

**Decisions 1, 2 and 3 are the ones worth making this week.** They are cheap, they are blocking, and none of them requires more data.
