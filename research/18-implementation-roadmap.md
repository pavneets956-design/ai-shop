# 18 — Implementation Roadmap

**Prepared:** 2026-07-31
**Gate status:** Stages 0 and 1 are cleared to begin. **Stages 2+ are blocked on proof.** See `00-executive-verdict.md`.

---

## Stage 0 — Evidence and baseline *(blocking — nothing else starts)*

**Deliverables**
1. Export **16 months of Google Search Console** data — queries, pages, impressions, positions, CTR. The property is verified; the data exists.
2. Record current indexed URL count and coverage state.
3. Full technical crawl (Screaming Frog / Sitebulb) — canonicals, redirect chains, broken links, orphans, alt text, OG.
4. Core Web Vitals via PSI + CrUX.
5. Confirm conversion events fire on `/create`; confirm Vercel Analytics tool events.
6. Snapshot rankings for the ~30 terms that matter.

**Dependencies:** none. **Effort:** 3–5 hours.
**Acceptance:** a saved baseline that a later change can be measured against.
**Risk if skipped:** consolidation will reduce total impressions by design, and without a baseline there is no way to distinguish that intended effect from a mistake. **This is why Stage 0 blocks everything.**

---

## Stage 1 — Identity, truth and architecture *(no proof required — do it now)*

**1a. Fix the pricing contradiction — P0**
- One pricing source of truth in the data layer; every surface (body, JSON-LD, `llms.txt`, homepage) reads from it.
- Resolve `/ai-business-system`: three conflicting values today, including a self-refuting "$3,500–5,000 CAD (typically $7,500)".
- **Acceptance:** one price per product across HTML, schema and `llms.txt`. Verified by re-fetching production.
- **Effort:** 1–2 hours. **This is live misinformation being ingested by AI engines right now.**

**1b. Choose one brand name**
- Recommendation: **AI Built By Hand** (exact domain match), "Handbuilt AI" demoted to schema `alternateName`.
- Apply to footer, schema, `llms.txt`, email signature.
- **Gates all citation and entity work.** Effort: 1 hour.

**1c. Entity foundation**
- `Organization` schema + `Person` schema on a rewritten `/about` with the founder's full name.
- Google Business Profile as a **service-area business**: address hidden, 12 service areas inside ~2h drive, primary category **Software company**.
- 5 directory profiles with identical NAP.
- **Effort:** 4–6 hours + GBP verification wait.

**1d. Consolidation wave 1** *(after Stage 0)*
- Receptionist cluster: 20 URLs → 3.
- Cost pages: 7 → 1.
- 301/308, no chains, nothing deleted.
- **Effort:** 3–4 hours (data-layer edit, thanks to the registry architecture).

**1e. Audience decision**
- Trades only, or trades + creators on separate entities. If trades only: `noindex` the 20 `/creators` pages (reversible, preserves the work).
- **Founder decision. Blocks nothing technically, blocks entity clarity entirely.**

**1f. Wire the free tools into the funnel**
- Cross-link tools ↔ commercial pages; add `WebApplication` schema.
- **Highest value-to-effort ratio in the whole plan.** Effort: 2 hours.

**Acceptance for Stage 1:** one name everywhere · one price per product · GBP live · 20 receptionist URLs → 3 · tools linked from commercial pages.
**Measurement:** branded search appears at all; impressions consolidate onto canonical URLs.
**Risk:** consolidation temporarily reduces total impressions — expected, monitored against the Stage 0 baseline.

---

## Stage 2 — Proof acquisition *(the real blocker)*

**Deliverables**
1. **Win 2–3 reference clients at a deliberate discount**, explicitly traded for: a named case study, a recorded call with written two-party consent, and a reference call. Target trades: fencing/decks, landscaping, or one HVAC/plumbing.
2. Publish **one real recorded call** + transcript.
3. Publish **one named case study** with a real before/after number.
4. Build a **live demo line** a visitor can phone immediately.
5. Capture an **integration screenshot** — a booking landing in Jobber.

**Dependencies:** Stage 1 (a credible site to send prospects to).
**Effort:** the dominant cost of the whole plan — weeks, and it is sales work, not build work.
**Acceptance:** `/proof` exists with at least one named client and one real recording.
**Risk:** clients decline to be named. Mitigate by making consent part of the discounted engagement from the outset, in writing, and by offering first-name-plus-trade-plus-city attribution as a fallback.

> **This stage is the plan.** Everything before it is preparation; everything after it is blocked on it. A 216-page site with no evidence is not fixed by architecture.

---

## Stage 3 — Core commercial pages *(gated on Stage 2)*

| Page | Gate |
|---|---|
| `/` rewritten with proof above the fold | 1 case study |
| `/ai-receptionist-for-contractors` — hypothetical replaced with real | Recording |
| `/what-you-own` — **the moat** | None — build with Stage 1 |
| `/beyond-platform-ai` — "you already have Jobber AI" | None — build with Stage 1 |
| `/missed-calls` pillar | Honest sourcing |
| `/quote-follow-up` pillar | None |
| `/proof` | 1 client |
| `/pricing` absorbing 7 cost pages | Stage 1d |

**Note:** `/what-you-own`, `/beyond-platform-ai` and `/quote-follow-up` need **no proof** and carry the strongest differentiation. **Build these three during Stage 1.** They are the exception to the gate.

---

## Stage 4 — Trades, integrations, trust *(gated: one client per trade)*

- 4 trade pages, each built around a real client. Absorbs 35 industry pages.
- `/integrations/jobber`, `/housecall-pro`, `/quickbooks` — each with a working screenshot.
- `/trust/call-recording` (PIPEDA + CASL, trades-specific, legal review required).
- `/trust/how-it-fails` — escalation, honestly.
- Consolidation wave 2: industries, use-cases, how-to, compare, resources.

**Risk:** publishing a trade page without a client in that trade reproduces exactly the problem this plan exists to fix.

---

## Stage 5 — Local expansion *(gated: GBP + local proof)*

- `noindex` the 14 unprovable location pages; keep 5.
- Rebuild **one** location page around a real local client.
- GBP reviews from delivered clients.
- **One location page per market with delivered work. No exceptions.**
- **Calgary, Edmonton and Toronto are not local markets** — they are remote-delivery content. Declaring them on a Surrey SAB profile carries flag risk.

---

## Stage 6 — Authority and original research

- **Original benchmark study**: 50 Fraser Valley trade businesses — real answer rates, callback times, quote-close rates, methodology published. Would be the best-sourced data in the category and doubles as client outreach.
- Build-vs-subscribe payback calculator.
- AI receptionist evaluation scorecard (vendor-neutral).
- Trade-specific call-flow templates.
- Trade podcasts, associations, integration marketplace listings.

---

## Sequencing summary

| Stage | Blocks on | Type of work |
|---|---|---|
| **0 — Baseline** | nothing | 3–5 hours, mechanical |
| **1 — Identity, truth, architecture** | Stage 0 for 1d only | ~2 days, mostly data-layer |
| **1.5 — The three ungated pages** | nothing | Writing |
| **2 — Proof** | Stage 1 | **Weeks. Sales work. The actual constraint.** |
| **3 — Core pages** | Stage 2 | Writing |
| **4 — Trades / integrations / trust** | 1 client per trade | Writing + build |
| **5 — Local** | GBP + local proof | Slow, gated |
| **6 — Authority** | Stage 2 data | Ongoing |

---

## What must not happen

1. **No page production before Stage 1 completes.** The page-to-proof ratio is 216:0; adding to the numerator makes it worse.
2. **No redirects before the Stage 0 baseline exists.**
3. **No deletions.** Redirect or `noindex` — always reversible.
4. **No visual redesign before positioning is settled.** A redesign now hardens unproven positioning into a new coat of paint.
5. **No fabricated proof.** Not a testimonial, not a customer count, not an ROI figure, not the 62% statistic. Once an AI engine ingests an invented claim it is effectively permanent.
6. **No new city, industry, use-case, how-to or compare pages** until Stage 4, and then only with a client behind each.

---

## Honest assessment of this roadmap

Stages 0, 1 and 1.5 are **about three days of work** and would materially improve the site: one name, one price, 20 URLs collapsed to 3, an entity that exists, tools wired into the funnel, and three genuinely differentiated pages nobody else can write.

**Stage 2 is the whole plan and it is not a website task.** It is picking up the phone and selling two or three discounted builds in exchange for permission to tell the truth about them. Every gate in Stages 3–6 opens the moment that happens, and none of them open before.

The most useful thing this research can say is that **the constraint was never the website.** It is that the site currently has to sell on assertion, because there is nothing else to sell on.
