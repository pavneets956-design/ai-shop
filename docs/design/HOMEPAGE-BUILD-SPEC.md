# Homepage Build Specification

**Branch:** `feat/verseo-ui-rebuild` · **Written:** 2026-08-01, after the search-demand gate
**Evidence:** `research/search-demand/` — especially `11-research-addendum.md`, which corrected the phase-1 hero recommendation
**Design system:** `docs/design/VERSE0-REFERENCE-AUDIT.md`

Every messaging decision below cites evidence. `[V]` live/first-party · `[D]` directional · `[I]` inference.

---

## 1. One primary audience

**Contractor and trades business owners, 1–15 employees, Surrey / Metro Vancouver.**

- 38.4% of first-party GSC impressions are the AI receptionist cluster, and every query in it is trade-qualified — `for contractors`, `for construction`, `for trades`, `for carpenters`, `for builders`, `for tradespeople`, `for handyman services` `[V]`
- 21.1% of impressions are Vancouver/Surrey/BC-qualified `[V]`
- Reddit composition is owner-operator and small crew `[D]`
- Matches existing $1,500–$7,500 CAD project pricing `[I]`

Secondary audiences (physio clinics, gyms, creators) appear in GSC at 3.9% and are **not** addressed on the homepage.

## 2. One primary promise

**Your phone gets answered and your quotes get followed up — installed into the accounts you already own.**

Three components, each evidenced:
- *Phone answered* — the 38.4% cluster `[V]`
- *Quotes followed up* — the most-repeated PAA question in the study `[V]`
- *You own it* — answers the three verified objection queries (data ownership, number portability, cancellation) `[V]`

## 3. Hero

**Eyebrow:** `[ for Surrey & Metro Vancouver contractors ]`
> Local qualifier. Only AI-Overview-free SERPs found were Surrey-local `[V]`; `ai services surrey` has first-party impressions `[V]`.

**H1:** *(revised — see `research/search-demand/13-hero-decision.md` for the three-way comparison)*
> # An AI receptionist for contractors — on the number you already own.

> An earlier draft read *"Missed calls become booked jobs."* It was clear and outcome-framed but **never said what was being sold**, and it abandoned the only entity association the site has. Its "missed calls" framing rested on autocomplete breadth, which YouTube data later showed to be 50% builder/agency intent bare.
>
> First clause: the site's **#1 first-party GSC query** (50 impr), head of the 156-impression cluster, and the only phrasing measured at **100% buyer intent** `[V]`.
> Second clause: answers the live PAA question about number portability (`crtc.gc.ca` ranks on it), is said by **zero** competitors across 34 SERPs, and is what stops the headline reading as a generic answering service — which by definition gives you *their* number `[V]`.
>
> Deliberately **not** "AI-powered" anything, and no absolutes like "never" — the 111-comment thread *"Why is every construction 'AI' demo a Sci-Fi movie…"* is explicit hostility to the first, and the second would be an unsupportable claim.

**Supporting copy:**
> It answers the calls you miss while you're on site, books the job into your calendar, and chases the quotes that go quiet. Installed in about a week.
>
> Not a subscription you have to figure out. You keep the number, the data and the accounts — export or cancel any time.

> Problem language ("missed calls", "quotes go quiet") lives here rather than in the H1. "while you're on site" is contractor-situational `[V]`. "Installed in about a week" matches `packages.ts` (Starter: ~5 business days). "Not a subscription" answers `contractor software without subscription`, scored attack-now `[V]`.

**Primary CTA:** `Book an AI opportunity review` → `/create`
**Secondary CTA:** `See what missed calls cost you` → `/tools/missed-call-revenue-calculator`

> Both routes the brief requires — book/request a review, and free tools — are in the hero.

**Hero visual:** purpose-built call-timeline SVG/CSS showing *call comes in → nobody free → AI answers → job booked → owner notified*. Sample data explicitly labelled. **No stock imagery, no robots, no dashboards with invented metrics.**

## 4. Offer hierarchy

Sourced from `lib/data/packages.ts` at render time — never hand-typed.

1. **Free contractor tools** — no login, no email
2. **AI opportunity review** — the paid diagnosis
3. **AI Starter System** — from $1,500 CAD, one worker
4. **AI Business System** — $3,500–$7,500 CAD, 2–4 connected workers
5. **Custom AI App** — from $10,000 CAD
6. **Care plan** — monthly, attached to an installed system

## 5. Section sequence

| # | Section | Purpose | Evidence |
|---|---|---|---|
| 1 | Hero | Problem → mechanism → two routes | §3 |
| 2 | **Live calculator strip** | Trust via a working tool, where Verseo puts client logos | No customers exist; no competitor across 34 SERPs shipped a tool `[V]` |
| 3 | Problem selector (3) | Route by symptom | Three largest clusters `[D]` |
| 4 | Before / After | Two flat cards + one elevated | Verseo pattern; audit §3.4 |
| 5 | What gets installed (4 cards) | Plain-language offers | Named deliverables outperform category language `[V]` |
| 6 | How it works (3 steps) | Sticky desktop, stacked mobile | Audit §1.8 |
| 7 | Free tools | The strongest asset | `08` |
| 8 | Objections | Answer the four verified fears | `02` Tree 8 `[V]` |
| 9 | Pricing | From the registry | §4 |
| 10 | Surrey / local credibility | Local is the open surface | `[V]` |
| 11 | FAQ | 6 selected questions | §11 |
| 12 | Final CTA + footer | Three honest actions | — |

**No testimonials section. No client logos. No stat counters with invented numbers.**

## 6. Proof strategy

There are zero customers. Permitted proof only:
- **Working tools the visitor can use immediately** — the primary device
- Based in Surrey, BC
- Systems installed in the customer's own accounts
- Data-export commitment · cancel-anytime
- Transparent CAD price ranges
- Real screenshots of functioning systems
- Design-partner invitation

**Forbidden:** customer names, logos, testimonials, revenue-recovered figures, hours-saved figures, "trusted by N".

Sample data in the hero visual must be visibly labelled as an example.

## 7. Local Surrey positioning

- Eyebrow names Surrey and Metro Vancouver
- A dedicated local section: service area, "installed in your accounts", link to `/locations/ai-receptionist-surrey-bc`
- `LocalBusiness`/`ProfessionalService` schema retained with existing `areaServed`
- **Do not claim Google reviews or a Google Business Profile** — neither exists `[V]`
- **Do not lead with "Canadian"** — Jobber is Canadian; PAA asks *"Is Jobber a Canadian company?"* `[V]`. "Surrey" is the defensible claim.

## 8. Objection handling

| Objection (verbatim / live PAA) | On-page answer |
|---|---|
| *"…or do they just piss off older customers?"* `[V]` · PAA *"Why are customers averse to service chatbots?"* `[V]` | **"Will this annoy my customers?"** — it answers in your business's voice, says it's an assistant, and hands off to you. You approve what it says before it goes live. |
| PAA *"Is AI receptionist legit?"* `[V]` | **"Is this legit?"** — you can use every tool on this site right now without giving us anything. |
| PAA *"Can I keep my phone number if I switch provider in Canada?"* (crtc.gc.ca ranks) `[V]` | **"Do I keep my phone number?"** — yes, in your name. |
| PAA *"Who owns customer data?"* `[V]` · `contractor software data export` `[V]` | **"Who owns the data?"** — you do. Export any time. |
| *"I'm really disappointed with Jobber"* (112c) · `how to cancel jobber` `[V]` | **"What if I cancel?"** — it's in your accounts. It keeps running; we stop. |

## 9. Pricing presentation

- Three cards from `packages.ts`, middle elevated (Verseo pattern)
- **No monthly/annual toggle** — pricing is project-based; a toggle implies subscription, the exact objection being countered
- CAD stated explicitly
- Care plan shown as attached to an installed system, not standalone
- **AI Review Engine price is NOT changed** — owner decision pending (`12-strategic-decisions.md`)

## 10. Tools strategy

Five shipped tools promoted by the business question they answer. Missed-call calculator is embedded live in section 2 — the single highest-value placement, replacing the borrowed-credibility slot.

## 11. FAQ — six selected

1. Will this annoy my customers?
2. Do I keep my phone number?
3. Who owns the system and the data?
4. What happens if I cancel?
5. Does this work with the tools I already use?
6. How long does installation take?

> Chosen from live PAA and Reddit. Deliberately excludes "Does this replace employees?" — *"Will receptionists be replaced by AI?"* is job-seeker intent `[V]`, and raising it unprompted on a sales page invites a fear the buyer didn't arrive with.

## 12. Internal links

`/tools` + all five tool routes · `/pricing` · `/ai-receptionist-for-contractors` · `/ai-business-system` · `/industries/roofing` · `/locations/ai-receptionist-surrey-bc` · `/create` · `/faq`
Footer retains `/creators`, `/shop`, `/demo`, `/services`, `/industries`, `/locations`, `/use-cases`, `/compare`, `/about`, `/resources` — **`/creators` currently ranks best on the site and must not lose internal links.**

## 13. Metadata

- **Title:** `AI Receptionist for Contractors in Surrey & Metro Vancouver | Handbuilt AI`
- **Description:** `We install AI receptionists and quote follow-up for contractors in Surrey, Delta, Langley and Metro Vancouver — inside the phone number and accounts you already own. From $1,500 CAD. Free contractor calculators, no signup.`
- **Canonical:** `/` — unchanged

> Title leads with the 38.4% cluster plus the local qualifier `[V]`. Current title leads with "AI Receptionist & Admin Systems for BC Contractors" — already close; this sharpens the geography and keeps the entity.

## 14. Schema

Existing `serviceSchema()`, `localBusinessSchema`, `faqSchema(HOME_FAQS)` **all retained**. Offer prices must continue to match visible copy (the route-diff gate fails on any JSON-LD price change). FAQ schema updated to the six questions above.

## 15. Mobile behaviour

- Designed at 390 and 430 first
- Sticky how-it-works **degrades to a plain stack below `lg`** — no scroll-jacking
- CTAs stack full-width, primary first
- Tap targets ≥ 44px
- No horizontal scroll at any width
- Live calculator usable on mobile without the keyboard covering the result
- `prefers-reduced-motion` respected; count-ups render final value immediately

## 16. Rejected, with reasons

| Rejected | Why |
|---|---|
| Phase-1 H1 *"Quotes go quiet. Calls get missed."* | Quotes/estimates earn **8** first-party impressions vs 168 for receptionist `[V]` |
| Leading with quote follow-up as the hero product | Same |
| `missed call text back` as a marketing term | 50% builder intent on YouTube; contractors report cold calls from those vendors `[V]` |
| "Quote Rescue" as H1 or nav | Zero occurrences across all sources `[V]` |
| "Done-for-you AI systems" as H1 | Zero contractor/Canadian SERP results for the business-automation phrasing `[V]` |
| "Home service business" | 1 autocomplete variant vs 283 for contractor `[V]` |
| Testimonials / logo strip | No customers |
| Monthly-annual toggle | Implies subscription |
