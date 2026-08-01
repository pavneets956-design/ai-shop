# 11 — Receptionist Pillar Differentiation Audit

**Executed:** 2026-08-01 · **Branch:** `fix/p0-pricing-contradiction`
**Owner decision applied:** `/ai-receptionist` is the primary broad pillar. `/ai-receptionist-for-contractors`
is **not** redirected, **not** cross-canonicalised, and reassessed after ~90 days of further GSC evidence.

**Scope discipline:** this is an audit plus technical-defect repair only. No strategic content rewriting.

---

## 1. Side-by-side

| Field | `/ai-receptionist` | `/ai-receptionist-for-contractors` |
|---|---|---|
| **Title** | AI Receptionist for Local Businesses \| Handbuilt AI | AI Receptionist for Contractors \| Handbuilt AI |
| **H1** | AI Receptionist for Local Businesses | AI Receptionist for Contractors |
| **Canonical** | `https://aibuiltbyhand.com/ai-receptionist` ✅ self | `https://aibuiltbyhand.com/ai-receptionist-for-contractors` ✅ self |
| **Source** | `lib/data/money.ts` L206 | `lib/data/money.ts` L445 |
| **Rendered by** | `app/ai-receptionist/page.tsx` → `LandingTemplate type="money"` | `app/ai-receptionist-for-contractors/page.tsx` → same template |
| **Intent** | Broad category / definitional — "what is an AI receptionist" | Occupational — trades on-site, can't answer the phone |
| **Audience** | Contractors, clinics, local service businesses (multi-vertical) | Trades only — roofing, fencing, HVAC, plumbing, electrical |
| **Price shown** | $1,500 CAD | $1,500 CAD (flat, scoped proposal) |
| **Page weight** | 88.9 KB | 106.3 KB |
| **Impressions (46d)** | **146** | **16** |
| **Avg position** | 72.5 | 71.9 |
| **Clicks** | 0 | 0 |

## 2. Section overlap

**Shared (template-driven, 5):** How it works · What you get · Related · Common questions · Want this built for your business?

**Unique to `/ai-receptionist` (3):**
- What's included in the setup
- How it handles different types of inquiries
- Who this is for

**Unique to `/ai-receptionist-for-contractors` (3):**
- Why Contractors Lose Jobs to Missed Calls
- What the AI Receptionist Actually Does
- Built for Trades — Not a Generic Chatbot

The contractor page already carries trade-specific narrative: a Fraser Valley fencing-crew scenario,
a 4-step flow opening on a discovery call and a fixed $1,500 scoped proposal, and "on a roof, under a
sink, or inside a panel box" framing. **Differentiation is real, not cosmetic** — the shared 5 are
template chrome, and every body section differs.

## 3. Ranking queries

| Query | Serving page | Impr | Position | Note |
|---|---|---:|---:|---|
| `ai receptionist for contractors` | **`/ai-receptionist`** | 50 | 71.9 | Only page serving it. The exact-match page does **not** rank for its own query. |
| `ai receptionist for construction` | **`/ai-receptionist`** | 34 | 72.9 | Same pattern. |

`/ai-receptionist-for-contractors` serves **no** query in the measured query×page joins. Its 16
impressions sit entirely in low-volume/anonymised queries. This is the evidence behind the owner
decision to keep `/ai-receptionist` as the pillar — Google already picked it.

## 4. Internal links

| Target | Links | Files |
|---|---:|---|
| `/ai-receptionist` | **28** | 12 |
| `/ai-receptionist-for-contractors` | **13** | 6 |
| `/use-cases/ai-receptionist-for-contractors` | **5** | 3 |

## 5. Technical defects

| Check | Result |
|---|---|
| Wrong canonical | ✅ None — both self-canonical, no cross-domain, no cross-page canonical |
| Duplicate title | ✅ None — titles and H1s differ |
| Contradictory pricing | ✅ None — both $1,500, inside the approved $1,500–$2,500 receptionist band |
| Broken internal link | ✅ None — all three targets resolve 200 |
| Missing from sitemap | ✅ Both present |
| Accidental noindex / redirect | ✅ Neither is redirected or noindexed |

**No technical defect found. Nothing repaired on these two pages.**

## 6. Finding for the positioning branch — NOT actioned here

**A third page exists on the same topic:** `/use-cases/ai-receptionist-for-contractors`
(`lib/data/useCases.ts` L22), separate from the money page at `/ai-receptionist-for-contractors`
(`lib/data/money.ts` L445). Both build, both return 200, neither redirects to the other.

Internal links are **split across the two**: 13 point at the money page, 5 at the use-case page.

This was **deliberately not changed.** Repointing those 5 links is a consolidation decision, and the
owner deferred consolidation for ~90 days. It is not a broken link — both targets resolve — so it
does not meet the "clear technical defect" bar for this branch. **Carry it into the positioning/redesign
branch and re-test against 90-day GSC evidence.**

## 7. Proposed future differentiation (for the positioning branch, not built)

1. **Push the contractor page further from the pillar** on contractor-only ground the broad page cannot
   hold: quoting from a truck, Jobber/Housecall Pro workflow handoff, after-hours emergency triage
   vs. next-day scheduling, seasonal call-volume spikes, crew dispatch escalation.
2. **Resolve the three-page topic overlap** — pick one contractor URL and make the other two point at it.
3. **Do not act before ~2026-10-29.** At 16 impressions and 0 clicks, there is no signal to optimise against.
