# Decision Memo — AI Built By Hand

**Subject:** Proposed pivot to a contractor AI tools platform
**Prepared:** 1 August 2026
**For:** Founder, AI Built By Hand (Surrey, BC)
**Status:** Consultation only. No code, page, branch, deployment or purchase was touched.

**Currency:** CAD unless marked USD. Vendor list prices are USD where the vendor publishes in USD; I have not applied an FX rate, and you should not blend USD COGS with CAD revenue without inserting a current rate.

**Evidence labelling used throughout:**
`[V]` verified against a primary source with a URL · `[D]` directional (vendor marketing or cost-guide data, methodology undisclosed) · `[I]` my inference from verified inputs · `[U]` unknown, no credible source found — stated as unknown, never estimated.

---

## 0. Read this part first

Three findings changed my answer from what I expected going in. All three are verified, and all three make your proposed pivot worse than you think:

**1. Your prior research had Jobber's AI Receptionist price wrong, and the correct number is much worse for you.** `research/00-executive-verdict.md` says Jobber ships it "at $99/mo." The live pricing page says **$29 USD/mo as an add-on, and free on the Plus tier**, with no per-minute fees, in Canada, with a Canadian demo line published. `[V — getjobber.com/pricing, getjobber.com/features/ai-receptionist, fetched 2026-08-01]` Jobber also ships **automated quote follow-ups and invoice follow-ups from the Connect tier ($70–139 USD/mo)** as a standard automation. `[V — help.getjobber.com Automations]` Your proposed $19–29/mo toolbox is not entering an empty price band. It is entering the price band a $150M-revenue, 100,000-customer Canadian company uses as a *retention add-on*.

**2. The exact pivot you are describing already exists, is shipping, and is cheaper than your proposed price.** QuoteIQ sells AI estimating + AI phone answering + automated review requests as one flat plan at **$29.99 USD/mo**. AirQuote sells voice-to-quote at **$12 USD/mo or $119 one-time lifetime**. Contractor+ ships AI estimating on a **free forever** tier. ServiceM8 ships AI on **$29 USD/mo with unlimited users**. `[V — vendor pricing pages]` Meanwhile Y Combinator has funded at least six companies in this precise lane, one of which (Broccoli AI, W22) went 0 → 800+ contractors in under two years with Khosla money, and Avoca raised **$125M at a $1B valuation** in April 2026. `[V]` You would be the last and smallest entrant into a funded, crowded category, competing on the one axis — price — where you have the least room.

**3. The arithmetic of a $19–29/mo product does not survive contact with a solo founder's time.** Worked in §6 below. Summary: at $19/mo, after Stripe fees, infrastructure and a *single fifteen-minute support interaction per user per quarter*, you net roughly **$6–7 per user per month**. One hundred paying users — which would take you a year to reach with your current traffic — is about **$665/month**. One done-for-you install at $4,500 with 20 hours of work is $225/hour. The subscription tier is not a smaller version of your business. It is a different, worse business that consumes the time the real one needs.

None of this means the tools idea is wrong. It means **you have the right instinct about the funnel and the wrong instinct about where the money is.** The tools are an acquisition and proof engine, not a revenue line. Build them as such and the pivot is excellent. Build them as a SaaS business and it is a tool graveyard with a support inbox.

---

## 1. Executive verdict

**Your problem is not your business model. It is that you have no evidence and no traffic, and a new business model does not create either.**

The numbers you supplied are the whole story: 216 indexable URLs, 609 impressions, 3 clicks, average position 63.9. Position 64 means you are not on page one for anything. Your own prior audit found zero first-party proof anywhere on 216 pages, and found that searching your own brand name returns nothing about your company. `[V — research/01-current-site-audit.md, verified live 2026-07-31]`

A pivot to a tools platform does not fix that. It changes what you have no proof *of*. Worse, it swaps a business with **zero variable cost, zero support burden and zero regulatory exposure** (done-for-you services) for one with **per-user infrastructure cost, unbounded support burden, and personal CASL liability at $1M per violation** (a platform that sends messages on behalf of others — see §12 and the compliance annex). That is a strictly worse risk profile to adopt at the exact moment you have no revenue to absorb it.

What you should actually do is **keep the done-for-you business as the revenue engine, convert the tools from a side asset into the entire top of the funnel, and refuse to launch a self-serve subscription until three specific gates are cleared.** That is a hybrid, so the verdict below reads as a hybrid — but the hybrid I am recommending is not the one in your brief. Yours puts subscription revenue in the middle. Mine puts it last, and gated.

**The single most valuable thing you own right now is five working, client-side, zero-cost contractor tools that no competitor gives away without a login.** `[V — app/tools/, verified: client-side, no auth, no inference cost]` You are correct that they are your strongest asset and correct that they are not connected to anything. Fix that and you have a funnel. Put a paywall on them and you have destroyed the only distribution advantage you have.

---

## 2. Recommended business model

### The three-model scorecard

Scored 0–100. Higher is better on every row (so "customer acquisition difficulty" scores high when acquisition is *easy*, "trust required" scores high when *less* trust is needed, "technical complexity" and "support burden" score high when *lower*). Scores are my judgment `[I]` grounded in the verified inputs cited throughout.

| Criterion | **A. Done-for-you only** | **B. Cheap tools SaaS only** | **C. Hybrid (tools funnel + installs)** |
|---|---:|---:|---:|
| Likelihood of reaching first revenue | **75** | 20 | 70 |
| Ability to compete | 65 | 15 | **70** |
| Scalability | 25 | **75** | 55 |
| Profitability | **80** | 30 | **78** |
| Customer acquisition (ease) | 30 | 25 | **55** |
| Trust required (less is better) | 25 | 60 | **50** |
| Technical complexity (lower is better) | **85** | 30 | 55 |
| Support burden (lower is better) | **70** | 20 | 55 |
| Defensibility | 55 | 20 | **65** |
| Fit for a one-person founder | **80** | 25 | **68** |
| Fit for existing site and assets | 60 | 45 | **85** |
| **Total (of 1100)** | **650** | **365** | **706** |

**Notes on the scores that matter most:**

- **B scores 20 on first revenue** because your current organic performance is 3 clicks in 46 days. A self-serve SaaS with no paid acquisition budget and no audience converts approximately 3 clicks into approximately zero subscriptions. `[I from V baseline]`
- **B scores 15 on ability to compete** because the price band is occupied by Jobber ($29 USD add-on), QuoteIQ ($29.99 USD full suite), AirQuote ($12 USD / $119 lifetime) and Contractor+ (free). `[V]`
- **A scores 25 on scalability** — correctly. It is a services business. That is a real ceiling and you should not pretend otherwise.
- **C scores 85 on fit for existing assets** because it is the only model that uses the 216 pages, the registry architecture, the five tools, the trade content and the existing offer ladder simultaneously.
- **A beats C on technical complexity, support burden and founder fit.** That is not noise. If you cannot execute C's discipline — specifically, refusing to build a subscription tier before the gates — A is genuinely the safer business, and A + free tools is only ~55 points behind C.

### Recommended model: C, in a specific shape

```
FREE TOOLS  →  PAID DIAGNOSTIC  →  INSTALL  →  MANAGED CARE PLAN
(no login)     ($499, credited)    ($1,900–      ($149–299/mo)
                                    $12,000+)
                                        ↑
                          [ self-serve subscription tier
                            lives HERE, and only after
                            the three gates in §6 ]
```

The recurring revenue in year one comes from **care plans attached to installs**, not from self-serve subscriptions. This matters enormously:

- Care-plan CAC is **zero** — the customer is already yours.
- Care-plan churn is **structurally low** — they are attached to a system you built into their business, not a tool they can forget about.
- Care-plan support is **bounded** — you have ten of them, not a thousand.
- Care-plan gross margin is ~95% at the COGS numbers in §6.

That is the correct shape of recurring revenue for a one-person company. A $19/mo self-serve tier is the wrong shape at every one of those four points.

---

## 3. Chosen initial customer

**Residential roofing and exteriors contractors (roofing, siding, gutters, windows and doors), 2–15 employees, Metro Vancouver and the Fraser Valley.**

Not "contractors." Not "trades." This one.

**Why, on evidence rather than vibes:**

| Factor | Evidence |
|---|---|
| **The exact pain is measured, not assumed** | Only **16% of roofing and exteriors contractors follow up same-day on unsold estimates**; **32% have no rapid re-engagement process at all**. `[V — ServiceTitan 2026 Roofing & Exteriors Market Report, Thrive Analytics, n>1,000]` This is the single most on-point piece of primary evidence found in the entire research pass. |
| **Best value anchor in home services by a wide margin** | Roofing & Gutters has the **highest cost-per-lead of any home-services category at $228.15 USD** *and* the **worst conversion rate at 3.70%**. `[V — LocaliQ/WordStream 2025 Home Services Search Ad Benchmarks, n=3,211 campaigns]` Compare: Cleaning $46.99 CPL. Your entire pitch is "one recovered quote pays for this" — in roofing that is numerically overwhelming; in cleaning it is a rounding error. |
| **Highest ticket among candidates** | $7,500–12,000 typical replacement. `[D]` |
| **Least seasonal high-ticket trade** | Roofing search demand varies only **25–70%** across the year vs **90–600% for HVAC** and **25–609% for plumbing**. `[V/D — Ahrefs data via WebFX, Jan 2023–Dec 2024]` Seasonality is churn. Roofing has the least of it. |
| **Real, unserved product gap** | Only **4% of $5M+ roofers use AI features native to their CRM**; 25% use ChatGPT ad hoc. `[V — ServiceTitan 2026]` Aware, willing, unserved. |
| **Enumerable in your catchment** | RCABC public member list + BC Housing Licence Registry + Technical Safety BC registry + Google Maps + supplier counters (Convoy Supply, Roofmart, IKO). You can build the complete target list by hand in two days. `[V — public registries]` |
| **Structurally uncontested by the leader** | ServiceTitan **explicitly avoids businesses with fewer than five employees**. `[V — ServiceTitan S-1]` ~57% of BC establishments in NAICS 2381 (roofing/siding/concrete/framing) have fewer than 5 employees; BC total is 3,701 employers / 7,344 including owner-operators. `[V — ISED Canadian Industry Statistics, 2025 reference year]` |

**The honest arguments against, which you should weigh:**

- The ServiceTitan follow-up evidence comes from **$5M+ revenue** companies. You are inferring it holds for 2–15 person shops. `[I]`
- **BC has little storm- or insurance-driven roofing volume** compared to the US markets those reports describe. `[I]`
- Roofers have vertical CRMs (JobNimbus, AccuLynx) with **unknown Canadian penetration**. `[U]`
- **The addressable pool may be small.** ISED only resolves to 7,344 BC establishments across all of NAICS 2381 including concrete and framing. Residential roofers specifically in Metro Vancouver are `[U]` — likely low hundreds to ~1,000. `[I]`

**The validation gate, and it is cheap:** before committing, build the actual list from RCABC + Google Maps + supplier counters. **If you count fewer than ~250 residential roofing/exteriors companies in the catchment, widen to "outdoor build" — roofing, siding, gutters, fencing, decks, hardscape — which share quoting dynamics, ticket size, three-bid buying behaviour and supplier channels.** Your site already carries fencing and deck content, so the expansion costs you nothing in positioning.

**Why not the alternatives:**

- **Landscaping** has the best reachability in BC (BCLNA has 400+ member companies with a public directory and in-person events `[V]`) and is the most tech-receptive trade (42% refresh technology every ≤6 months `[V/D — HIRI Feb 2025]`). It loses on the decisive point: **Jobber is an Edmonton company with near-certain deep penetration in BC landscaping, and Jobber already bundles quote follow-up and a $29 AI receptionist to exactly that buyer.** `[V]` You would be selling a feature of the tool they already pay for.
- **HVAC/plumbing** have the highest AI adoption (HVAC 81.5% `[V — Jobber 2026 Trends, n=1,050]`) and the highest satisfaction with current methods — the most "we're fine" resistance `[V/D — HIRI]` — and are the most saturated by funded voice-AI vendors.
- **Cleaners** have the lowest pricing confidence, the weakest ability to pay, and a $46.99 CPL that destroys the value anchor. `[V]`
- **"Solo tradespeople"** cannot pay and churn hardest. **"Larger field-service companies"** belong to ServiceTitan.

---

## 4. Chosen initial product

### First, the structural problem with your candidate list

You asked me to choose from: quote builder, scope generator, quote follow-up, invoice reminders, missed-call capture, job-site note summarizer, review management.

**Quote follow-up — the one your research identified as the strongest uncovered opportunity — is not viable as a standalone self-serve product, for a reason that has nothing to do with competition: you do not own the quote.** To follow up on a quote you need to know a quote was sent, to whom, for how much, and whether it was accepted. That data lives in one of three places:

1. **In your tool** — meaning you must *be* the quoting tool, which puts you head-to-head with Jobber, Joist ($10 USD), QuoteIQ ($29.99 USD), AirQuote ($12 USD) and Contractor+ (free). `[V]`
2. **In Jobber/Housecall Pro** — where **automated quote follow-up already ships natively from the Connect tier**. `[V]` You would integrate with a platform in order to sell it a feature it already has.
3. **In their email/paper** — meaning no structured data, and you are building an email-scraping product.

This is the single most important product insight in this memo, and it kills the clean version of your pivot. **Follow-up is a feature of a system of record, not a product.** Every "cheap tool" on your list has an equivalent version of this problem: it either needs data you don't hold, or it is a thin wrapper around a model call that an LLM can reproduce in an afternoon.

### The first product: "Quote Rescue" — a done-for-you install, not a SaaS

**Exact first product:** A done-for-you *installed workflow* that connects a roofing/exteriors contractor's existing quoting system (Jobber, JobNimbus, AccuLynx, spreadsheet, or plain email) to an automated, consent-compliant, trade-specific follow-up sequence — plus a monthly report showing which quotes were recovered.

**The first three features, in build order:**

1. **Quote intake connector.** Reads sent quotes from wherever they actually live — Jobber API, forwarded email address, or a simple manual entry form. Nothing else works until this does. This is the hard part and the reason it is a service, not a SaaS.
2. **Consent-aware follow-up sequence engine.** Day 2 / day 5 / day 12 / day 30 email (and optional SMS), with roofing-specific copy, hard-coded CASL implied-consent expiry (6 months from inquiry, 2 years from a purchase), one-click unsubscribe, and an immutable consent and suppression log. `[V — CASL s.10(9)–(10), s.6(2), s.11; see compliance annex]` This is your due-diligence defence and it is not optional.
3. **The recovery report.** A one-page monthly PDF: quotes sent, quotes followed up, quotes that went quiet, quotes recovered, dollars recovered. **This feature is what makes the case study possible**, and the case study is the binding constraint on your entire business. Build it in the MVP even though no customer will ask for it.

**Target contractor:** 2–15 employee residential roofing/exteriors company in Metro Vancouver or the Fraser Valley, sending roughly 10–40 quotes a month, with the owner or one office admin doing follow-up manually or not at all.

**Primary user:** the **office admin or owner's spouse**, not the owner. The owner buys. The admin uses it daily and is the one who churns you if it is annoying. Design for the admin; sell to the owner.

**Pain being solved:** quotes are sent and then nothing happens. 84% of roofing/exteriors contractors do not follow up same-day; a third have no re-engagement process at all `[V]`; and quoting a roof costs $228 in lead acquisition before a single hour of estimating time `[V]`.

**Why they would pay:** because at a $228 CPL and a $9,000 average job, **one recovered quote per year pays for the install outright**, and one recovered quote per quarter pays for the care plan several times over. That arithmetic does not require them to believe anything about AI.

**Why existing tools do not solve it adequately:**
- Jobber's native automation is capped at **2 reminders within 90 days** `[V — Jobber Automations doc]`, is generic across all trades, and requires the contractor to be on Connect ($70–139 USD/mo) and to have actually turned it on.
- The 21% of small contractors who are not on a field-service platform at all have nothing.
- No incumbent gives them a **recovery report**, which is the artifact that proves the thing worked.
- And critically: **nobody sets it up for them.** The #1 and #3 stated barriers to contractor tech adoption are "no time for training" and "limited technical expertise." `[V/D — HIRI]` The gap is not software. It is installation.

### What must NOT be in the MVP

| Excluded | Why |
|---|---|
| **Any self-serve signup or subscription tier** | See §6. It is a different, worse business. |
| **AI phone receptionist / voice** | Jobber sells it at $29 USD. Consumer sentiment is actively hostile: **87% of consumers prefer a human when contacting home services, 80% would choose a business with human answering, 62% distrust AI in emergencies.** `[D — ServiceForge survey, June 2026, methodology undisclosed]` And Podium's own G2 reviews already document contractors burned by AI answering badly. One mishandled emergency call loses the account permanently. |
| **Outbound AI calling** | Legally a completely different product: CRTC Unsolicited Telecommunications Rules + National DNCL registration + ADAD express consent + TCPA artificial-voice rules at **$500–1,500 USD per violation, uncapped**. `[V]` Inbound answering avoids all of it. Do not cross this line. |
| **SMS in v1** | Email-only v1 is materially lower risk. SMS adds the CWTA keyword regime (STOP/ARRET/HELP/AIDE/INFO, bilingual, mandatory), Canadian carrier A2P filtering, character-limit workarounds for the CASL identification requirement, and — if you touch the US — uncapped TCPA per-message damages. Add SMS in v2, deliberately, with a lawyer's sign-off. |
| **Quebec** | Law 25 has a **private right of action with statutory punitive damages of not less than $1,000**, AMPs to $10M or 2% of worldwide turnover, and a mandatory documented Privacy Impact Assessment before any data leaves Quebec. `[V]` Geo-block Quebec at launch and say so in your terms. A documented scope decision is far safer than accidental non-compliance. |
| **A general "toolbox"** | 62.4% of small businesses have 0–2 paid software subscriptions total. `[V — n=781, March 2026]` The loudest complaint about incumbents is add-on sprawl: *"they charge for every extra thing."* `[V — Capterra, Oct 2025]` |
| **Job-site notes, change orders, material calculators, voice-to-estimate** | Every one is a thin wrapper. AirQuote already does voice-to-estimate for $119 lifetime. `[V]` |
| **A mobile app** | Nobody asked. |

---

## 5. Is "many cheap tools" a trap?

**Yes. Specifically and demonstrably.** Here is each risk you named, with the evidence:

| Risk you named | Verdict | Evidence |
|---|---|---|
| Collection of weak AI wrappers | **Confirmed** | Every tool on your list is a prompt plus a PDF export. AirQuote ($12 USD/$119 lifetime), V2E, SayQuote, HandyQuoter, Contractor AI, Handoff, QuoteIQ already exist. `[V]` |
| Difficult to maintain | **Confirmed** | 15 tools = 15 prompt surfaces, 15 output formats, 15 sets of edge cases, one founder. |
| Expensive to support | **Confirmed, and this is the killer** | See §6 arithmetic. A single 15-minute support interaction per user per quarter consumes ~44% of a $19/mo subscription's net margin at a $100/hr opportunity cost. |
| Easy to copy | **Confirmed** | An LLM reproduces any single tool in an afternoon. Your five existing tools are client-side and view-source-able today. |
| Hard to market | **Confirmed** | "AI tools for contractors" is already a saturated SEO surface — ServiceAgent, OnCrew, NextPhone, SkipCalls, Tooled Up Pro, Astucia, CheckThat.ai and a dozen more are running comparison-SEO plays against Jobber's pricing pages right now. `[V]` |
| Dependent on low-paying users | **Confirmed** | *"Sick of all these monthly fees. Pay one time and done."* — contractor, Mike Holt's Forum, 2024-03-14 `[V]`. SMB self-serve SaaS carries 15–25% annual logo churn as an *acceptable* benchmark. `[V]` Trades-specific churn: `[U]`. |
| Overwhelmed by API/SMS/email/storage costs | **Partially false — and this is the one you have backwards** | Infrastructure is cheap. An automation-heavy user costs **$1.78–5.68 USD/month** in real variable COGS depending on stack choices. `[V — worked in §6]` Infrastructure will not kill you. **Your time will.** |

### The exact conditions under which "many cheap tools" becomes a good business rather than a tool graveyard

All five must hold simultaneously. If any one fails, it is a graveyard.

1. **The tools share one data object that gets more valuable the longer the customer stays.** Not fifteen tools — one workflow with fifteen surfaces, all writing to the same quote/customer/pricing history. Without shared data gravity, each tool is independently churnable and independently copyable.
2. **Acquisition is genuinely free and compounding.** Organic search, tool-driven links, and word of mouth in a tight trade community. If you ever have to pay for a $19/mo customer, the model is dead on arrival — home-services CPL runs $47–228 USD `[V]`.
3. **Support is near-zero by construction** — no login for the free tier, no configuration, no integrations to break, no data to lose.
4. **The price is high enough to survive a support ticket.** Empirically, from §6: that floor is around **$79–99/mo**, not $19–29.
5. **One tool is a genuine wedge that gets them in the door for a reason a competitor cannot replicate.** For you that is human installation plus Canadian compliance — neither of which is a tool.

**Your five existing free tools already satisfy conditions 2 and 3 perfectly, because they are client-side, login-free and zero-cost.** That is exactly why you should not paywall them.

---

## 6. Pricing and unit economics

### Verified input costs (list prices, USD, fetched 2026-08-01)

| Line | Best verified option | Price | Note |
|---|---|---|---|
| LLM (cheap tier) | Gemini 2.5 Flash-Lite | $0.10 / $0.40 per 1M tok | Claude Haiku 4.5 at $1.00/$5.00 is ~10× on input |
| ⚠️ LLM (mid tier) | Claude Sonnet 5 | $2/$10 **introductory — reverts to $3/$15 on 1 Sep 2026** | If any model of yours assumes Sonnet, it is 50% under-costed as of next month |
| Transcription | AssemblyAI Universal-2 | $0.0025 / min | Deepgram Nova-3 $0.0043/min |
| Email | AWS SES à la carte | $0.00010 / email | Resend Pro $0.00040 — 4× more, far less ops burden |
| **SMS (Canada)** | **Telnyx $0.0025/msg** vs **Twilio $0.0083 + ~$0.008 carrier surcharge = ~$0.0163** | **~6× difference** | **The single largest cost lever in this document.** Twilio's Bell/Telus carrier surcharge nearly doubles its headline rate; Telnyx lists $0.00 carrier fees on Canadian long codes |
| Phone number (CA) | Telnyx $1.00/mo | vs Twilio $1.15/mo | |
| Storage | Cloudflare R2 $0.015/GB-mo, **$0 egress** | vs S3 $0.023/GB + egress | |
| Hosting | Vercel Pro $20/mo | | |
| Database + Auth | Supabase Pro $25/mo (100k MAU included) | | Auth is effectively free at your scale |
| Errors | Sentry Team $26/mo | | |
| Analytics | PostHog free tier | 1M events/mo | |
| Support | Crisp free (2 seats) | | |
| **Fixed platform total** | | **$91 USD/mo** | |
| Payments (Canada) | Stripe 2.9% + $0.30 CAD, + 0.7% Billing, + 0.5% Tax Basic | **≈4.1% + $0.30 CAD** | Paddle/Lemon Squeezy at 5% + $0.50 buy away US state sales-tax registration entirely |
| Sales tax | GST/HST registration required above **$30,000 CAD** over four rolling quarters | `[V — CRA]` | Register voluntarily early to claim input tax credits on all the USD costs above |

### Worked COGS per active user per month (USD)

Assumptions stated separately from verified prices: one AI generation = 3,000 input + 1,000 output tokens; prompt caching at 70% cache-read on heavy users; one dedicated phone number per tenant where SMS is used.

| Scenario | Variable COGS | + fixed @100 users | + fixed @500 users |
|---|---:|---:|---:|
| Light tool user (20 generations, 10 emails) | $0.11 | $1.02 | $0.29 |
| Heavy tool user (300 gens, 60 min transcription, 30 SMS) | $3.78 | $4.69 | $3.96 |
| Automation user (200 SMS, 300 emails, 100 gens) — **naive stack** (Twilio/Resend/Haiku) | $5.68 | $6.59 | $5.86 |
| Automation user — **optimised stack** (Telnyx/SES/Flash-Lite) | **$1.78** | $2.69 | **$1.96** |

**Switching Twilio→Telnyx, Resend→SES and Haiku→Flash-Lite cuts an automation user's variable cost by 69%.** At 500 users that is $23,400 USD/year.

### The arithmetic that kills the $19–29 tier

At **$19 CAD/month**, with light automation:

```
Revenue                                    CA$19.00
Stripe (4.1% + $0.30)                      -CA$1.08
Variable COGS (≈US$1.20)                   -CA$1.65
Fixed infra alloc @100 users (≈US$0.91)    -CA$1.25
                                          ─────────
Net before support                         CA$15.02

One 15-min support interaction per user
per quarter, at $100/hr founder time       -CA$8.33
                                          ─────────
NET PER USER PER MONTH                      CA$6.69
```

**100 paying users = CA$669/month.** To reach 100 paying users at a generous 3% visitor-to-paid conversion you need **~3,300 relevant visitors**. You currently get **3 clicks per 46 days**. `[V]`

Against that: **one install at $4,500 with 20 hours of work is $225/hour** and requires one customer, not 3,300 visitors.

The $19 tier is not a stepping stone to the real business. It is a tax on it.

### Recommended pricing

**Free — "Contractor Tools" (permanent, no login, no email wall)**
Your five existing tools plus 3–5 more, all client-side. Zero marginal cost. This is marketing spend that costs nothing and is the only compounding acquisition asset you own. **Do not paywall. Do not gate. Do not add a login.**

**$499 CAD one-time — "Quote Leak Audit"** *(fully credited against any install within 60 days)*
You review 90 days of their actual quotes, missed calls and follow-up behaviour and hand back a written report with real numbers. Qualifies the buyer, produces the **baseline data your case studies need**, converts free-tool traffic into revenue, and — critically — turns a sales step into a research asset. `[Adapted from research/17-positioning-and-offers.md option C, which I endorse and would move up in priority.]`

**$1,900 CAD — "Quote Rescue Install"** *(one connected workflow)*
Note: **raise this from $1,500.** At $1,500 the buyer computes a 15-month payback against Jobber's $29/mo add-on and you lose the frame. At $1,900, positioned as an installed system rather than a receptionist, there is no like-for-like comparison to make. Deliverable: intake connector, follow-up sequence, consent logging, recovery report, 60 minutes of training, 30 days of support.

**$4,500–$8,500 CAD — "Connected Office"**
Quote follow-up + invoice reminders + review requests + CRM/QuickBooks/calendar connections, configured for their actual stack.

**$12,000+ CAD — "Custom build"**
Unchanged in kind; raise the floor from $10,000. Nobody at $10,000 is price-shopping against $12,000, and the higher floor filters tire-kickers.

**$149 / $299 CAD per month — "Care Plan"** *(attached to an install only, not self-serve)*
- **Essential $149/mo:** monitoring, sequence and template updates, up to 500 emails/mo, quarterly recovery report, 2 business-day support.
- **Managed $299/mo:** everything above plus SMS (up to 500 segments/mo included), monthly report and review call, priority support, unlimited template changes.
- **Overages:** email $0.01/message, SMS $0.05/segment beyond the included allowance. Both are ~3–10× your real cost — that is normal, defensible and protects you from a customer who blasts a list.
- **Annual:** 2 months free (16.7% discount), paid up front. This is worth doing specifically because it survives seasonality.
- **Gross margin at $299 CAD with an optimised stack:** roughly **95%**. Even the naive Twilio stack leaves ~91%.

**The self-serve subscription tier does not launch until all three gates are cleared:**
1. **10 installs delivered** and a repeatable install playbook written down.
2. **500+ organic tool sessions per month** sustained for three consecutive months (your current baseline is effectively zero).
3. **A documented install that takes under 2 hours** end-to-end — because that is what self-serve onboarding has to replace.

If those gates are never cleared, you never launch a self-serve tier, and you still have a profitable business. That is the point.

### Cancellation, data export and ownership — say this explicitly on the site

- **Cancel anytime, no term.** No 12-month lock. Podium and Thryv's contracts are the single loudest complaint in their reviews `[V — G2]`; make the opposite your marketing.
- **On cancellation:** full export of all quote, contact, message and consent history as CSV plus JSON, delivered within 7 days, free. Access is retained read-only for 30 days.
- **What the customer owns:** their data, their content, their phone number, their domain, their Google/Jobber/QuickBooks accounts (always created in *their* name, never yours), and — for custom builds — the source code under a perpetual licence with a repository handover.
- **What stays hosted by you:** the scheduling engine, the AI orchestration, the consent ledger, and the monitoring. Say this plainly rather than implying they own the platform. Overclaiming ownership is worse than not claiming it.
- **This "you own it" position is your best differentiator and it is free.** It is also *not* a moat (see §7) — a competitor can copy the promise tomorrow. Use it, don't rely on it.

---

## 7. Differentiation and moat, ranked

You listed fourteen candidate moats. Here they are ranked strongest to weakest, with an honest note on each. A moat is something that gets *harder* for a competitor to overcome as time passes. Several of your candidates are differentiators, not moats — I have marked those.

| # | Candidate | Strength | Honest assessment |
|---:|---|---|---|
| 1 | **Saved business context + company pricing memory + quote history** | **Strongest** | This is the only true data-gravity moat on your list. After 18 months of a contractor's quotes, prices, win/loss and follow-up outcomes, switching costs are real and rising. Requires you to own the workflow — which is exactly why the install model matters. |
| 2 | **Human installation and named accountability** | **Very strong** | Structurally uncopyable by a self-serve SaaS at $29/mo. ServiceTitan won't serve <5-employee shops `[V]`; Jobber can't install anything. This is your genuine unfair advantage and it does not scale — which is fine, because it does not need to. |
| 3 | **Customer evidence (case studies, recorded calls, named references)** | **Very strong, currently zero** | In a market where **~50% of residential contractors don't trust AI** `[V — ServiceTitan 2026]`, proof *is* the product. Compounding: each case study makes the next sale easier. This is your #1 investment. |
| 4 | **Local Canadian compliance knowledge (CASL / PIPEDA / Law 25 / ARRET)** | **Strong and underrated** | Most US vendors handle none of it. Bilingual STOP/ARRET handling, CASL implied-consent expiry enforced in code, PIPEDA-compliant recording notices, a documented Law 25 PIA — these are real, verifiable, expensive to retrofit, and a genuine reason a Canadian roofer picks you over QuoteIQ. **You are currently not claiming this at all.** |
| 5 | **Integrations (Jobber, HCP, QuickBooks, JobNimbus)** | **Moderate** | Real switching cost once wired, but high maintenance and **platform-dependency risk** — Jobber can change its API, revoke access, or ship your feature natively. Never build a business whose survival depends on one partner's goodwill. |
| 6 | **Contractor-specific workflows** | **Moderate** | Slow to copy, not impossible. Becomes strong only when fused with #1. |
| 7 | **Follow-up timing intelligence** | **Weak now, potentially strong later** | Genuinely defensible *if* you ever have enough outcome data to know that roofing quotes over $8,000 convert best on a day-9 touch. You will not have that data for years. Do not market it until it is true. |
| 8 | **Trade-specific terminology** | **Weak** | An LLM has this. |
| 9 | **Ownership and portability** | **Differentiator, not a moat** | Excellent positioning, powerful against subscription fatigue, zero barrier to imitation. |
| 10 | **Simplicity** | **Differentiator, not a moat** | *"I've tried at least a dozen various CRMs, and I can't find one that suits my very basic needs"* — contractor, Aug 2025 `[V]`. Real market insight. Not defensible. |
| 11 | **Workflow data** | **Same as #1** | Don't count it twice. |
| 12 | **Proprietary templates** | **Weakest** | Copyable in an afternoon by anyone with an LLM. |

**The composite moat, stated in one sentence:** *the accumulated quote and pricing history of a specific trade in a specific region, installed and maintained by a named person who is personally accountable and who has done the Canadian compliance work nobody else bothers with.*

That is not one thing. It is four things that are individually weak and jointly quite hard to replicate — which is what a real moat for a one-person company looks like.

---

## 8. Website architecture

Strategic IA only. No visual design.

### Primary navigation — six items, not nine

```
Tools   |   For Roofers   |   How It Works   |   Pricing   |   Proof   |   Get a Fit Check
```

**Reasoning on each of the nine you proposed:**

| You proposed | Verdict |
|---|---|
| **Tools** | ✅ **First item.** It is your strongest asset and your only genuine traffic source. |
| **Trades** | ✅ **But narrowed to "For Roofers"** at launch, expanding to a dropdown as you add trades. "39 industries" reads as "no specialisation" `[per your own research]`. Name one. |
| **How Ownership Works** | ✅ **Folded into "How It Works."** Ownership is a section on that page, not a nav item — a nav item called "How Ownership Works" is confusing before the visitor knows what the product is. |
| **Pricing** | ✅ Keep. Transparent pricing is a differentiator: Housecall Pro's CSR AI, Workiz, Podium, Birdeye, Avoca and Buildertrend all hide theirs behind sales calls `[V]`. |
| **Proof** | ✅ **Keep — but do not build it until you have one case study.** An empty Proof page is worse than no Proof page. |
| **Done-for-You** | ❌ **Merge into Pricing.** It is the top of the price ladder, not a separate concept. |
| **Solutions** | ❌ **Kill.** Meaningless word. Your own audit found it cannibalizing. |
| **Integrations** | ❌ **Demote to a section on How It Works.** Becomes a nav item only when you have 5+ real, working, screenshot-able integrations. |
| **Resources** | ❌ **Demote to footer.** 24 resource pages are earning you approximately nothing today. |

### The homepage: choose ONE selector, and make it the problem

You asked whether visitors should choose their problem, their trade, a tool, a plan, or take a guided assessment. **Problem. Unambiguously.**

- **Trade** fails because you serve one trade at launch — put it in the H1 instead of making it a choice.
- **Tool** fails because they don't know what they need.
- **Plan** fails because they don't know what they're buying yet.
- **Guided assessment** fails because it is friction before value, and your visitors have no reason to trust you yet.
- **Problem works** because it matches how the buyer actually thinks and because your existing homepage H1 already does it well — *"Missed calls, late quotes, invoice chasing — handled."* That line is good. Keep it. `[V — per your own audit]`

**Narrow six paths to three.** Six choices is not a choice, it is a menu.

```
┌─────────────────────────────────────────────────────────────┐
│  H1: Roofing quotes that go quiet — followed up             │
│      automatically. A system you own.                       │
│                                                             │
│  [ My quotes go quiet ]  [ I'm missing calls ]              │
│  [ My office work is piling up ]                            │
└─────────────────────────────────────────────────────────────┘
              ↓                    ↓                ↓
     Quote Rescue page    Missed-call tool    Connected Office
              ↓                    ↓                ↓
        ┌────────────────────────────────────────────┐
        │  Free tool relevant to that problem        │
        │  (no login, instant value, real math)      │
        └────────────────────────────────────────────┘
                              ↓
        ┌────────────────────────────────────────────┐
        │  Proof: the case study for that problem    │
        └────────────────────────────────────────────┘
                              ↓
        ┌────────────────────────────────────────────┐
        │  $499 Quote Leak Audit  →  Install          │
        └────────────────────────────────────────────┘
```

**"I want to use individual tools" is not a path — it is the free tools hub, linked from everywhere.** "I want everything automated" and "I need something custom" are not paths either; they are price tiers, and they belong on the Pricing page.

### The conversion journey, stated plainly

**Free tool (no login) → email capture only *after* the tool has delivered value ("email me this result") → problem-specific case study → $499 audit → install → care plan.**

The one change that matters most: **your tools hub currently ends with "Rather have this handled for you? → Get a free workflow fit check."** `[V — app/tools/page.tsx]` That is a leap from "I used a calculator" to "book a sales call with a stranger." The missing rung is a **result you can email yourself** and a **case study**. Add those two and the funnel exists.

---

## 9. Framer template verdict

**VERDICT: Use it as a free visual reference. Rebuild the design in your existing Next.js codebase. Do not use Framer as a platform.**

### What the template actually is

`lime-themes-311774.framer.app` is a staging deployment of **"Verseo"** by Tvorba Design, listed on the official Framer Marketplace. **It is free.** `[V — framer.com/community/marketplace/templates/verseo]` It is a single-page AI-writing-SaaS landing page: hero → logo bar → problem/solution split → 4-card feature grid → 3 persona cards → 3-step how-it-works → metrics band → examples gallery → integrations wall → 3 testimonials → 3-tier pricing with monthly/annual toggle → 6-item FAQ → CTA → footer. Every CTA links to `/contact-us`. There is no dashboard section, no blog, no CMS.

**Worth keeping (as structure, rebuilt in Tailwind):** the problem-then-relief section before features, the numbered 3-step process, the pricing toggle with a "Popular" anchor on the middle tier, the FAQ accordion, the persona segmentation pattern.

**Must be rebuilt or replaced entirely:**
- **The metrics band.** Its stat tiles literally render `0%` — the template assumes you supply real outcome numbers. You have none. Replace with a live demo or a real recovery report screenshot until you do.
- **The logo bar and integrations wall.** Placeholder slots for 5 customer logos and ~9 integration logos. **Do not fill these with logos you have not earned.** Replace the customer logo bar with a "here's what we actually have" section — a named design partner, a recorded call, a registry listing.
- **The three fictional testimonials.** Delete outright until real ones exist.
- **The generic AI-writing dashboard framing.** Replace with the artifact your buyer cares about: a real roofing quote follow-up sequence and a real recovery report.

### Framer as a platform — three independent disqualifiers

Any one of these is fatal for your site:

1. **CMS routing allows exactly one dynamic URL segment, and it must be last.** `/locations/:city` works. **`/locations/:province/:city` does not. `/tools/:tool/:variant` does not.** `[V]` Your 216 programmatic pages across services × industries × locations × use-cases × comparisons cannot be expressed. You would have to flatten your entire URL structure — a full URL migration stacked on top of a platform migration.
2. **There is no server runtime for your code.** Code components are client-side React only — no server-side execution, no secrets, no API routes. `[V — framer.com/developers]` Your five tools and any authenticated product must be iframes of a Next.js app you were trying to retire, and iframed content is not indexed as part of the parent page. You gain nothing and keep both stacks.
3. **Authenticated SaaS is unsupported.** Auth requires bolting on Outseta/FrameAuth/Thenty — additional monthly cost for client-side gating that is not a real security boundary. `[V]`

**Plus, for completeness:**
- **SEO:** rendering is fine (static generation + edge CDN, real HTML for crawlers). But **there is no native JSON-LD interface** — every structured-data block becomes hand-written JSON in a custom-code textarea, with no types, no validation, no tests. You currently get typed, tested JSON-LD free from Next.js. Redirects are actually fine (wildcard 301s, bulk CSV via Framer's free Redirect Sync plugin).
- **Performance:** Framer publishes P75 LCP 1.1s `[vendor claim]`. Independent measurement is thin — HTTP Archive/CrUX dashboards don't break out Framer, and I could not obtain lab data (PageSpeed API rate-limited on three attempts). The consistent third-party reporting is 1.5–3MB page weight and INP problems on animation-heavy builds, which is exactly what Verseo is. `[D]`
- **Cost:** $360–$1,200 USD/yr + $20/mo per editor seat + $20/mo per locale + third-party auth, versus Vercel Pro at $20/mo. **More expensive and less capable.**
- **Migration off is effectively one-way.** Tested exports produce static HTML whose behaviour lives in minified hashed bundles; removing Framer's CDN JS breaks layout and animations. *"You don't own the code. You can't inspect it, version control it, or let AI tools modify it."* `[V — migration testing writeups]`
- **I found zero published case studies of a 200+ page programmatic-SEO site migrating to Framer with measured traffic outcomes.** Every "does Framer hurt SEO" article is agency content marketing with no data. That absence is itself a signal.

**The hybrid (marketing on Framer, app on a subdomain) is the only defensible Framer shape and it is still wrong for you.** Subdomain SEO is genuinely fine — Google has said so repeatedly. The problem is the seam: your programmatic pages and your tool pages *are* your SEO assets, so the hybrid degrades into "Framer hosts ten marketing pages" while you maintain two design systems, two deploy pipelines and two analytics setups.

**What you are actually buying from Verseo is a section inventory and a copy skeleton, and it costs $0.** Lift both into Tailwind. It is roughly a week of component work, and you reuse it across every programmatic page template. Then go get the customer logos, testimonials and real metrics the template assumes you have — **that, not the platform, is what is limiting your conversion rate.**

---

## 10. Existing-URL preservation strategy

**Nothing gets deleted. Nothing gets redirected before the baseline is captured.**

### First — resolve a contradiction in your own inputs

Your brief says GSC has **46 days** of history. Your own July 2026 research says the property is verified with **~16 months** of history and that pulling it is a one-hour task. `[research/00-executive-verdict.md §19.5]` These cannot both be true. Most likely explanation `[I]`: there is more than one GSC property (domain vs URL-prefix, or http vs https), and you are looking at the newer one. **Before anything else, check for every property variant, export whatever exists from all of them, and add Bing Webmaster Tools today** — Bing backfills faster and gives you a second data source for free.

With only 46 days and 609 impressions at position 63.9, you have **effectively no ranking signal to protect.** That cuts both ways: consolidation is unusually safe right now, and you also cannot measure whether it helped. Which means: **consolidate once, decisively, and instrument it properly, rather than iterating blind.**

### Disposition by page type

| Asset | Action | Reasoning |
|---|---|---|
| **The 5 free tools** (`/tools/*`) | **Keep, expand, never change the URLs.** Add 3–5 more, all client-side. Add "email me this result." | Your single best asset. Zero cost, zero support, link-earning, citation-earning. `[V]` |
| **`/tools` hub** | **Promote to primary nav position 1.** Rewrite the CTA to add the missing funnel rungs (§8). | Currently your only real traffic surface. |
| **20 AI-receptionist URLs** | **Consolidate to 3.** `/ai-receptionist` (category), `/ai-receptionist-for-contractors` (money page), `/compare/ai-receptionist-vs-answering-service` (comparison). All other 17 → **301** to the closest of those three. | `[V]` The pair `/ai-receptionist-for-contractors` and `/use-cases/ai-receptionist-for-contractors` is an identical-intent duplicate on a site with no authority to split. |
| **7 cost pages** | Consolidate to **1** (`/pricing`) plus one resource explainer. 301 the rest. | `[V]` |
| **5 chatbot pages, 4 lead-follow-up pages, 4 automation-synonym pages** | Consolidate each cluster to 1. 301 the rest. | `[V]` |
| **25 service pages** | Keep the 6 that map to your new offer ladder. 301 the other 19 into them. | |
| **39 industry pages** | Keep **4–6** (roofing/exteriors first, then siding, fencing, decks, hardscape, HVAC). **`noindex, follow`** the remaining 33 — do not delete, do not redirect. | 39 verticals with zero delivered work is a credibility problem, not an SEO asset. `noindex` is reversible; a redirect is not. |
| **19 location pages** | **`noindex, follow` all except Surrey.** Rewrite Surrey with genuine local content once you have a local client. | Doorway-page risk with no local proof, no GBP, no citations. `[V — per your own audit]` |
| **20 creator pages** | **`noindex, follow` all 20** and make the audience decision within 30 days. | Entity dilution. One founder, two vocabularies, zero proof in either. `[V]` This is the decision you have been deferring. |
| **24 resource / 25 use-case / 9 how-to / 21 compare pages** | Keep the ~10 that support the roofing beachhead and the offer ladder. 301 or `noindex` the rest by cluster. | |
| **`/pricing`** | **Rewrite to the new ladder.** Fix the three-way price contradiction first. | **This is your most urgent single fix — see below.** |
| **Legal pages** | Keep. **Add three new ones:** Privacy (PIPEDA-compliant, naming foreign processing and subprocessors), CASL/messaging policy, and Data Ownership & Export. | Required by §12 and they double as trust content. |
| **`robots.txt`** | **Do not touch.** | Your AI-crawler allowlist (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot et al., each with its own block) is better than most sites of any size. `[V]` |
| **`sitemap.xml`** | Regenerated automatically from `lib/data/registry.ts`. `noindex`ed pages must be **removed from the sitemap** but kept crawlable. | Your registry architecture means this is a data-file edit, not a routing project. Genuine strength — preserve it. `[V]` |
| **`llms.txt`** | **Regenerate after the price fix.** | It currently carries the pricing contradiction into every AI answer engine. `[V]` |
| **Structured data** | Audit every `Offer` against one source-of-truth price constant. | |

### 🔴 The one thing to fix this week

`/ai-business-system` publishes **three different prices for the same product on one page**: body copy says $2,500–5,000, an in-page cross-reference says "$3,500–5,000 (typically $7,500)" — which is self-refuting on its face — and the JSON-LD `Offer` says $3,500–$7,500. `llms.txt` carries both $3,500–$7,500 and $2,500–5,000 for the same product. `[V — verified live 2026-07-31]`

This is the exact data ChatGPT, Perplexity and Google's AI Overviews read to answer "what does AI Built By Hand charge." You are currently supplying three mutually exclusive answers, and a prospect who sees a different number on two of your pages does not conclude "flexible pricing" — they conclude you are disorganised, on a page selling operational competence.

**Create one exported pricing constant. Derive every display, every meta description, every JSON-LD `Offer` and `llms.txt` from it. Make it impossible to drift.**

### Sequencing — do not reverse this order

```
1. Export every GSC property variant + enable Bing Webmaster Tools   [today]
2. Full crawl (Screaming Frog / Sitebulb) — redirect chains,
   orphans, canonicals, broken links                                 [week 1]
3. Fix the pricing contradiction; single source of truth             [week 1]
4. noindex creators + surplus locations + surplus industries         [week 2]
5. 301 consolidation, one cluster at a time, one week apart          [weeks 3–8]
6. Regenerate sitemap + llms.txt after each cluster                  [ongoing]
7. Measure at 4, 8 and 12 weeks against the exported baseline        [ongoing]
```

---

## 11. Proof, and the design-partner offer

### What must exist before the homepage makes any strong claim

**Nothing on your homepage may assert an outcome you have not measured.** Today that means: no "trusted by contractors across BC," no customer counts, no ROI figures, no time-saved claims, no percentage anything. `[Per your own research/17 §6 — I endorse it completely.]`

Also on the banned list, and this one is easy to get wrong: **the "62% of calls to small businesses go unanswered" statistic.** I traced it. Origin: a 2016 self-published study by a marketing agency (411 Locals) monitoring **85 businesses**, never peer-reviewed, a decade old. `[V — two independent audits]` Same for "$1,200 average value of a missed call" (universally attributed to Invoca; **no such figure appears in any current Invoca report**) and "80% of callers won't leave a voicemail" (citation chain dead-ends at a 2009 NYT lifestyle piece).

**Use these instead, they are real:**
- **27% of calls to home-services businesses go unanswered**, and **fewer than 3% of callers pushed to voicemail leave a message.** `[V — Invoca, 60M+ calls analyzed]`
- **Home services has the highest call conversion rate of any industry: 46%.** `[V — Invoca 2025 Benchmarks]`
- **Contact within 60 minutes makes a lead ~7× more likely to qualify; 23% of companies never respond at all.** `[V — Harvard Business Review, Oldroyd/McElheran/Elkington 2011, 2,241 companies + 1.25M leads]`
- **Only 16% of roofing/exteriors contractors follow up same-day on unsold estimates.** `[V — ServiceTitan 2026, n>1,000]`

Citing the real ones with sources, and publicly saying the famous ones are unverifiable, is itself a differentiator in a market full of vendors repeating folklore.

### The design-partner offer

**Recruit:** **three** residential roofing/exteriors companies, 2–15 employees, in Metro Vancouver or the Fraser Valley, who send at least 10 quotes a month and admit they do not follow up consistently. Source them from the RCABC member list, supplier counters (Convoy Supply, Roofmart, IKO branches), Google Maps, and the BC Housing Licence Registry. Three, not one — one gives you an anecdote, three gives you a pattern and protects you if one goes quiet.

**Offer:** the **$4,500 Connected Office install for $1,200**, plus **six months of the $299 Care Plan free**, explicitly and in writing in exchange for the permissions below. Price the discount as marketing spend, because that is exactly what it is: ~$10,000 of foregone revenue buys you the asset that unblocks every other recommendation in this memo.

**Baseline metrics to capture before you touch anything** (this is the part people skip, and skipping it destroys the case study):

| Metric | How | Why |
|---|---|---|
| Quotes sent per month, last 90 days | Their Jobber/JobNimbus export or quote folder | The denominator for everything |
| Quote close rate, last 90 days | Same | The headline before/after number |
| Average job value | Same | Converts percentage lift into dollars |
| Current follow-up behaviour | Interview + inbox audit: how many of the last 30 quotes got any follow-up at all | The gap you are closing |
| Time to first follow-up | Timestamp analysis | Speed-to-lead is your mechanism |
| Missed calls per week | Phone provider call log — request 90 days | Only if you scope calls in |
| Hours per week on follow-up | Owner/admin self-report, weekly for 4 weeks | Soft but persuasive |
| Cost per lead | Their actual Google Ads / Angi / referral spend ÷ leads | Makes the ROI arithmetic *theirs*, not yours |

**Permissions to request in writing, up front, in one signed document:**
1. Use of company name and logo in marketing.
2. Publication of the specific before/after metrics above.
3. **Publication of one recorded customer interaction** — and note this needs the *homeowner's* consent too, not just the contractor's. Under PIPEDA you must notify at the outset and state the purpose. `[V — OPC Guidance on Recording of Customer Telephone Calls]` Budget for this being the hardest permission to get.
4. Screenshots of the working integration and the recovery report (with customer PII redacted).
5. A 20-minute recorded video testimonial.
6. Willingness to take **two reference calls per quarter** from prospects.
7. A named quote you may edit for length but not for meaning, with their approval.

**Measurement window: 90 days minimum, 120 preferred.** Roofing quote cycles run weeks; anything shorter measures noise. Report at 30 / 60 / 90 days so you have an interim story while you wait.

**Results that actually matter, in order:** (1) dollars of recovered work attributable to a follow-up touch; (2) close-rate change on followed-up quotes vs the baseline period; (3) number of quotes that received *any* follow-up, before vs after — this is often the most dramatic and most honest number; (4) hours returned to the owner or admin; (5) time to first follow-up.

**Case study structure** — one page, this order:

```
1. The company        Name, trade, size, city, photo of the owner
2. Before             The baseline table. Real numbers. Their words.
3. What we installed  Specific. Named tools. A screenshot.
4. What happened      The 90-day numbers, with the measurement
                      window and method stated openly
5. What it did not do Yes, really. One honest limitation buys more
                      credibility than three superlatives, in a market
                      where ~50% of contractors distrust AI [V]
6. In their words     Pull quote + video
7. What it cost       The real price. Transparency is your position.
8. Reference          "Ask us to connect you with [Name]"
```

**Never:** fabricated logos, invented testimonials, unsupported savings claims, projected ROI presented as measured, or the word "typically" attached to a number you have measured once.

---

## 12. Technical architecture — build vs buy

**Build exactly one thing: the quote → follow-up → outcome domain logic and its consent ledger. Buy everything else.**

| Layer | Decision | Recommendation | Rationale |
|---|---|---|---|
| Framework / hosting | **Buy** | Next.js on **Vercel Pro, $20 USD/mo** | Already in place. Nothing about this pivot argues for changing it. |
| Database | **Buy** | **Supabase Pro, $25 USD/mo** (8GB, 100k MAU) | Postgres + auth + storage in one bill. Prisma is already in your repo. |
| Auth | **Buy** | **Supabase Auth** (bundled) or Clerk (free to 50k MRU) | Auth is effectively $0 at your scale. Auth0 at $35/mo for 500 MAU makes no sense here. |
| Payments | **Buy** | **Stripe** now (2.9% + $0.30 CAD, + 0.7% Billing, + 0.5% Tax Basic) | Revisit **Paddle or Lemon Squeezy (5% + $0.50)** if US revenue grows — ~1 extra point buys away all US state sales-tax registration. |
| AI generation | **Buy** | **Gemini 2.5 Flash-Lite** ($0.10/$0.40 per 1M) for structured short generations; **Claude Haiku 4.5** ($1/$5) where quality matters. **Route through one internal abstraction so you can swap.** | ⚠️ **Claude Sonnet 5's $2/$10 is introductory and reverts to $3/$15 on 1 Sep 2026.** Do not build a cost model on it. |
| Transcription | **Buy** | **AssemblyAI ($0.0025/min)** or Deepgram Nova-3 ($0.0043/min) | Not needed in v1. |
| Email | **Buy** | **Resend Pro ($20/mo, 50k)** to start; move to **AWS SES ($0.10/1,000)** at volume | Resend is already in your repo (`resend-email-setup.md`). 4× the price of SES and worth it until you have thousands of users. |
| **SMS / telephony** | **Buy** | **Telnyx**, not Twilio | **$0.0025/msg vs Twilio's $0.0083 + ~$0.008 Bell/Telus carrier surcharge.** ~6× all-in. `[V]` **Defer to v2 entirely.** |
| Voice agent (if ever) | **Buy, never build** | Bland ($0.14/min flat, zero assembly) or Vapi/Retell BYO-model (~$0.09–0.12/min) | Recommended: **don't ship voice.** See §4 exclusions. |
| Document / PDF export | **Buy** | React-PDF or Puppeteer on a Vercel function | Trivial. Don't overthink. |
| File / photo storage | **Buy** | **Cloudflare R2** ($0.015/GB, **$0 egress**) | 35% cheaper than S3 with zero egress. Obvious for job photos. |
| Analytics | **Buy** | **PostHog free tier** (1M events, 5k recordings, flags) | Session replay is how you will find out why contractors abandon your tools. |
| Error monitoring | **Buy** | **Sentry Team, $26 USD/mo** | Non-negotiable for a solo founder. |
| Support | **Buy** | **Crisp free** (2 seats) | Upgrade only when volume demands it. |
| Workflow automation | **Buy, carefully** | **n8n self-hosted** or Make for internal glue only | Never put customer-facing message delivery behind a no-code tool you can't debug at 11pm. |
| Integrations (Jobber, QBO, JobNimbus) | **Build thin, one at a time** | Start with **email forwarding as the universal connector** — works with every system, requires no API approval, ships in days | Build the Jobber API integration only after 3 customers ask for it by name. Platform-dependency risk is real. |
| **Consent + suppression ledger** | 🔨 **BUILD. This is not optional and cannot be bought.** | Immutable, append-only, per-recipient, per-tenant. Records: address, timestamp, method, consent type (express vs implied-by-inquiry), form version, exact consent text shown, IP. Enforces **6-month and 2-year expiry in code as a hard block on sending**, not a warning. | This is your CASL s.33 due-diligence defence and it must exist **before the first message goes out**. You cannot retrofit it during an investigation. `[V]` |
| **Quote → follow-up domain logic** | 🔨 **BUILD** | The sequence engine, the trade-specific templates, the recovery report | This is the actual product. |

**Total fixed infrastructure: ~$91 USD/month.** That is the entire technical cost of running this business until you have hundreds of users. Your constraint is not infrastructure. It is your calendar.

**Two architecture decisions worth making now:**
- **Per-contractor sending identity, not a shared platform sender.** CASL requires identifying both the sender and the person on whose behalf the message is sent `[V — s.6(2)(a), SOR/2012-36 s.2]`. A shared sender creates a filtering problem *and* an identification problem *and* makes STOP handling ambiguous (does STOP unsubscribe from one contractor or all of them?).
- **Every account created in the customer's name, never yours.** Their Twilio/Telnyx number, their Google Business Profile, their domain, their Jobber connection. This is what makes the ownership claim in §6 true rather than marketing.

---

## 13. Pre-mortem

*It is February 2028. The project failed. Here is why, ranked by probability.*

| # | Cause | Early warning sign | Prevention | Recovery | Fatal? |
|---:|---|---|---|---|:---:|
| **1** | **You built the tools platform and nobody came.** 216 pages became 240; traffic stayed at single-digit clicks; the subscription tier reached 11 users. | 90 days post-launch and organic tool sessions are still under 100/mo | **Do not launch a self-serve tier before the three gates in §6.** Sell installs by hand, in person, to a list you built by hand. | Kill the subscription, keep the free tools, go back to services. You will have lost ~4 months. | **Reversible** |
| **2** | **You never got the case study.** Design partners went quiet, wouldn't give permission, or the numbers were unimpressive. Everything downstream stayed blocked. | Week 6 of the design-partner program with no baseline data captured | Capture baselines **before** installing anything. Recruit **three**, not one. Get all permissions signed on day one, before delivering value. | Buy it harder: a fourth partner at a deeper discount, or pay a contractor outright for the right to publish. | **Fatal if unresolved** |
| **3** | **A CASL violation.** A contractor imported a decade-old customer list, your platform sent 4,000 messages, and the CRTC treated it per-violation. | Any tenant whose send volume jumps >5× in a week; any bulk import without per-record consent provenance | Hard-block bulk import without provenance. Enforce 6-month/24-month expiry **in code as a refusal**, not a warning. Vet clients at onboarding. Written CASL policy + audit logs from day one. | Immediate suspension, self-report, undertaking. The CRTC's dominant mode is warning letters and undertakings, not mega-fines — but that is a posture, not a rule. | **Potentially fatal** — max $1M per violation for an individual, and **s.31 means incorporation does not shield the founder who wrote the sending logic** `[V]` |
| **4** | **Jobber shipped it.** Jobber extended quote follow-up to Core, added roofing templates, or made the AI Receptionist free on all tiers. Your differentiator evaporated overnight. | Jobber changelog, any Jobber roofing-vertical announcement | Never build on a single feature Jobber can ship. Compete on installation, compliance and accumulated data — none of which Jobber does. | Move fully upmarket to custom builds; become the person who *configures* Jobber for roofers. | **Reversible** if positioned on installation |
| **5** | **You ran out of runway doing services while building product.** Two half-businesses, neither funded by the other. | Any month where you shipped product code and closed zero deals | Hard-timebox: 60% selling and delivering, 40% building, every single week. Product work happens on Fridays or not at all. | Stop building. Sell only. Restart product when there is 6 months of cash. | **Fatal if it runs long** |
| **6** | **Support ate you.** 60 subscribers generating 5 tickets a day at $19/mo. | Support time per user per month exceeding 10 minutes | Free tier has **no login and no support surface**. Paid tiers priced ≥$99/mo. Public FAQ before public signup. | Raise prices, grandfather nobody, cut the cheapest tier. | **Reversible, painfully** |
| **7** | **A design partner's customer had a bad experience** — a follow-up went to someone who had already complained, or an AI message read as tone-deaf after a job went wrong. | Any customer complaint routed back through a contractor | Suppression must be **global by default within a tenant** and applied across every message type. Never let a review-request template ignore a marketing opt-out. Human review of all templates. | Immediate apology, kill the sequence, publish what you changed. | **Reversible, but it costs the reference** |
| **8** | **You picked the wrong trade.** Metro Vancouver roofing turned out to be ~150 companies, half already on AccuLynx. | The enumeration exercise in §3 returns under 250 companies | **Do the enumeration before committing.** It takes two days. | Widen to "outdoor build" — siding, fencing, decks, hardscape. Same quoting dynamics, same suppliers, same ticket size. | **Reversible** |
| **9** | **The Framer redesign consumed a quarter and changed nothing.** A beautiful site with the same three clicks. | Any week spent on visual design while proof is still zero | The verdict in §9: rebuild in Next.js, one week of component work, **after** the case study exists. Design is not the constraint. | Ship what exists, get back to selling. | **Reversible, expensive in time** |
| **10** | **Nobody would pay $499 for the audit**, so you gave it away, so nothing qualified anyone, so you took every call and burned your calendar. | Three consecutive audits given away free | Hold the price. Credit it fully against the install — that removes the risk without removing the filter. | Replace with a fixed 20-minute qualification call and a hard qualification rubric. | **Reversible** |

---

## 14. Ninety-day execution sequence

**The rule for all 90 days: no new programmatic pages, no visual redesign, no self-serve subscription tier.** Your page-to-proof ratio is 216:0. Adding to the numerator makes it worse.

### Days 1–14 — Stop the bleeding, capture the baseline

- [ ] Find **every** GSC property variant; export everything; enable **Bing Webmaster Tools**. Resolve the 46-days vs 16-months discrepancy.
- [ ] Run a full crawl (Screaming Frog or Sitebulb). Redirect chains, orphans, canonicals, broken links.
- [ ] **Fix the `/ai-business-system` three-way price contradiction.** One exported constant → every display, meta, JSON-LD `Offer`, and `llms.txt`. Regenerate `llms.txt`.
- [ ] **Make the audience decision:** `noindex, follow` the 20 `/creators` pages, or spin them to a separate domain. Decide and act; do not defer again.
- [ ] `noindex, follow` 18 of 19 location pages and 33 of 39 industry pages. Remove from sitemap, keep crawlable.
- [ ] Build the **target list by hand**: every residential roofing/exteriors company in Metro Vancouver and the Fraser Valley, from RCABC + Google Maps + BC Housing registry + supplier counters. **If it is under 250, widen to "outdoor build" now.**
- [ ] Register for GST/HST voluntarily (you can claim input tax credits on every USD tool in §12).

### Days 15–45 — Buy the proof

- [ ] Contact **40 companies** from the list. Phone and in person at supplier counters, not email. Target: **3 design partners signed.**
- [ ] Have the design-partner agreement drafted by a lawyer **once** — it covers the discount, all seven permissions, the measurement window, and the CASL/privacy representations. Reuse it forever. Budget ~$1,500–2,500.
- [ ] **Capture all baseline metrics before installing anything.** (§11 table.)
- [ ] Build the **consent + suppression ledger first**, before any sending capability exists.
- [ ] Build **Quote Rescue v1**: email-forwarding intake connector, 4-touch email sequence with roofing copy, consent enforcement, recovery report. **Email only. No SMS. No voice. Quebec geo-blocked.**
- [ ] Install for all three partners. Sit beside the admin while they use it for an hour.
- [ ] Publish the **CASL/messaging policy**, the **PIPEDA privacy policy** naming foreign processing and subprocessors, and the **Data Ownership & Export** page. These are legal requirements *and* trust content — they do double duty.

### Days 46–75 — Consolidate and instrument

- [ ] Execute the 301 consolidation, **one cluster per week**: receptionist (20→3), cost (7→2), chatbot (5→1), lead follow-up (4→1), automation synonyms (4→1), services (25→6). Regenerate sitemap after each.
- [ ] Rewrite `/pricing` to the new ladder. Add the "what you own vs what we host" table.
- [ ] Rewrite `/tools` hub: add "email me this result" to every tool, add case-study links, replace the naked "book a fit check" CTA with the missing funnel rungs.
- [ ] Ship **2–3 new free tools** aimed squarely at roofing: roofing quote follow-up sequence generator, roofing job profitability calculator, quote-recovery value calculator. Client-side, no login.
- [ ] Establish the **entity**: Google Business Profile as a service-area business, consistent NAP, `Organization` schema with real `sameAs`, RCABC or BCCA associate membership if available, 3–5 directory profiles. **Pick one name and use it everywhere** — "AI Built By Hand," "Handbuilt AI" and "Handbuilt AI Studio" currently appear together in your own footer, which is a direct negative signal for entity resolution. `[V]`
- [ ] Rebuild the homepage and the roofing money page using the Verseo section inventory, in Tailwind, in your existing codebase. **One week. Not a quarter.**
- [ ] Capture 30- and 60-day design-partner numbers.

### Days 76–90 — Publish and decide

- [ ] Publish **case study #1** in the §11 structure. Link it from the homepage, the tools hub, the roofing page and `/pricing`.
- [ ] Launch the **$499 Quote Leak Audit** as a purchasable product with the credit-against-install terms.
- [ ] Sell **2 installs at full price** using case study #1. This is the real test of the whole thesis.
- [ ] Measure the consolidation against the exported baseline at 4/8/12 weeks.
- [ ] **Gate review — answer honestly, in writing:**
  - Did the case study produce numbers you would publish under your own name?
  - Did a stranger buy an install because of it?
  - Are organic tool sessions above 500/month?
  - Is the install repeatable in under 2 hours?

  **Fewer than 3 yeses: do not build the subscription tier.** Keep selling installs and keep publishing case studies. That is still a good business. **4 yeses: build the self-serve tier at $99/mo, with SMS, for roofers only.**

---

## 15. Open owner decisions

These are yours. I have given a recommendation for each, but they turn on things only you know.

1. **The creators vertical.** 20 pages of real shipped work versus entity clarity. *My recommendation: `noindex` and focus entirely on trades.* But if creators is where your actual revenue came from historically, that changes the calculus and you should tell me.
2. **Runway.** Every recommendation here assumes you can run 6+ months on services revenue while building. If runway is under 4 months, drop everything in §14 except the design-partner program and sell installs full-time.
3. **Roofing versus outdoor-build.** I recommend roofing with an enumeration gate. If you already have a warm relationship with a fencing or landscaping contractor who would be a design partner tomorrow, **take the warm relationship.** A signed design partner in a slightly worse segment beats a perfect segment with no one in it.
4. **Whether you will actually hold the line on no-self-serve-tier.** This is the single biggest execution risk in the memo. The subscription tier will be tempting every week. Decide now, write it down, and put the three gates somewhere you will see them.
5. **Legal budget.** You need a Canadian privacy/marketing lawyer to review the CASL sending architecture, the terms, and the DPA before the first message sends. Budget **$3,000–5,000**. If that is not available, **ship email-only, Canada-only, three customers, and defer SMS entirely** — that is a materially lower-risk shape and it costs you nothing in the first 90 days.
6. **Whether to keep selling AI receptionist at all.** It generates conversations, which you need. It also anchors you to a $29/mo comparison you cannot win. *My recommendation: keep it as an entry wedge in copy, remove it as a headline product, and never lead with it.*
7. **US market timing.** Everything above is Canada-first for proof reasons. The US is ~10× the market and carries TCPA exposure at $500–1,500 USD per message, uncapped. *My recommendation: not before three case studies and a lawyer's review.*

---

## 16. Verdict

> ### `BUILD HYBRID TOOLS + INSTALLATION MODEL`

With the specific structure in this memo, which differs from the one in your brief in three ways that matter:

1. **The tools are free forever and are an acquisition and proof engine, not a revenue line.** No $19–29/mo toolbox. That price point is occupied by better-funded competitors and does not survive a solo founder's support time.
2. **Recurring revenue comes from care plans attached to installs at $149–299/mo**, not from self-serve subscriptions. Zero CAC, low churn, bounded support, ~95% margin.
3. **The self-serve tier is gated** behind 10 delivered installs, 500+ monthly organic tool sessions, and a sub-2-hour repeatable install. If those gates never clear, you never launch it — and you still have a profitable business.

**Reject the Framer platform. Use the (free) Verseo template as a visual reference and rebuild it in your existing Next.js codebase in one week, after the case study exists.**

---

## The single highest-leverage next action

**Spend the next two weeks getting three residential roofing or exteriors contractors in Metro Vancouver or the Fraser Valley to agree, in writing, to a $1,200 install plus six free months of the care plan in exchange for publishing their real before-and-after numbers — and capture their baseline quote volume, close rate and follow-up behaviour *before* you install anything.**

Not a line of code. Not a page. Not a redesign.

Everything else in this memo is blocked on that one asset. You have 216 pages and zero proof. The 217th page is worth nothing. The first case study is worth all of them.

---

### Appendix — What I could not verify

Stated as unknown rather than estimated:

- **Quote volume per week for a 2–15 employee BC roofer.** No published data exists anywhere. This is the number that most determines whether your ROI story holds at small scale. Get it from 12–15 customer interviews.
- **The actual count of residential roofing companies in Metro Vancouver.** ISED resolves only to 7,344 BC establishments across all of NAICS 2381.
- **Housecall Pro CSR AI pricing, Workiz AI Answering pricing, Avoca, Sameday, Podium, Birdeye and Buildertrend pricing** — all sales-gated, none published.
- **Trades-specific SaaS churn rates.** Nothing exists. General SMB self-serve benchmarks (15–25% annual logo churn) are the best available proxy.
- **Any verifiable statement of contractor willingness-to-pay for follow-up automation.** The only revealed-preference evidence is indirect: Jobber gates it behind its $70–139/mo tier.
- **Reddit and Facebook contractor sentiment** — egress-blocked in this session. Capterra, G2 and Mike Holt's Forum were used instead. If you want that gap closed, it is worth doing manually.
- **Whether your GSC property has 46 days or 16 months of data.** Your brief and your own July research disagree.
- **Framer lab performance data** — PageSpeed Insights API rate-limited on three attempts.
- **Search volume, keyword difficulty, CPC and current rankings for any keyword.** No accessible source. None of these appear anywhere in this memo, by design.

**Nothing in this memo was fabricated.** Where I inferred, I marked it `[I]`. Where a widely-circulated statistic turned out to be marketing folklore, I said so and gave the traceable replacement.

**I am not a lawyer.** The CASL, PIPEDA, Law 25 and TCPA material is research to help you scope risk and brief counsel, not legal advice.

---

## Sources

**Competitors and pricing:** [Jobber pricing](https://www.getjobber.com/pricing/) · [Jobber AI Receptionist](https://www.getjobber.com/features/ai-receptionist/) · [Jobber Automations](https://help.getjobber.com/hc/en-us/articles/24244124296471-Automations) · [Jobber Reviews add-on](https://help.getjobber.com/hc/en-us/articles/20621046897559-Reviews-Marketing-Tools) · [Housecall Pro pricing](https://www.housecallpro.com/pricing/) · [Housecall Pro CSR AI](https://www.housecallpro.com/features/csr-ai/) · [ServiceTitan Titan Intelligence](https://www.servicetitan.com/features/titan-intelligence) · [ServiceM8 pricing](https://www.servicem8.com/us/pricing) · [Workiz pricing](https://www.workiz.com/pricing-plans/) · [Service Fusion pricing](https://www.servicefusion.com/pricing/) · [Thryv pricing](https://www.thryv.com/pricing/) · [Podium pricing](https://www.podium.com/pricing/) · [Broadly AI Workforce](https://broadly.com/pricing-ai-workforce/) · [Joist pricing](https://www.joist.com/pricing/) · [QuoteIQ](https://myquoteiq.com/) · [AirQuote](https://airquote.co/ai-quoting) · [Contractor+ pricing](https://contractorplus.app/pricing) · [Handoff AI pricing](https://www.handoff.ai/pricing) · [Knowify pricing](https://www.knowify.com/pricing/) · [Rosie pricing](https://heyrosie.com/pricing) · [Goodcall pricing](https://www.goodcall.com/pricing) · [Slang.ai pricing](https://www.slang.ai/pricing) · [Smith.ai pricing](https://smith.ai/pricing) · [Ruby pricing](https://www.ruby.com/pricing/) · [CompanyCam pricing](https://companycam.com/pricing) · [YC Home Services companies](https://www.ycombinator.com/companies/industry/Home%20Services) · [Avoca $125M raise](https://www.prnewswire.com/news-releases/avoca-raises-125m-at-1b-valuation-to-power-americas-services-economy-with-ai-302753962.html) · [Jobber 100,000 customers](https://www.prnewswire.com/news-releases/jobber-surpasses-100-000-customers-cementing-its-position-as-the-market-leading-platform-for-home-and-commercial-service-businesses-302768759.html)

**Market and beachhead:** [Jobber 2026 Home Service Trends Report](https://www.getjobber.com/home-service-trends-report/) · [Jobber Q3 2025 Economic Report](https://www.prnewswire.com/news-releases/home-service-category-shows-steady-growth-amid-easing-inflation-and-rate-cuts-jobber-report-finds-302619236.html) · [ServiceTitan 2026 Roofing & Exteriors report](https://www.barchart.com/story/news/37040292/servicetitan-report-finds-75-of-roofing-and-exteriors-contractors-expect-revenue-growth-in-2026-despite-tighter-margins) · [ServiceTitan residential AI adoption via HousingWire](https://www.housingwire.com/articles/ai-adoption-residential-contracting/) · [ServiceTitan S-1 breakdown](https://www.mostlymetrics.com/p/servicetitan-ipo-s1-breakdown) · [HBR: The Short Life of Online Sales Leads](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) · [Speed-to-lead statistics audit](https://www.expertise.ai/stats/speed-to-lead-statistics) · [Invoca: cost of missed calls in home services](https://www.invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses) · [Invoca 2025 Call Conversion Benchmarks](https://www.invoca.com/reports/the-invoca-call-conversion-benchmarks-report-home-services-2025) · [Missed-call statistics fact-check](https://www.majleads.com/blog/ai-receptionist-statistics-fact-check) · [LocaliQ 2025 Home Services Search Ad Benchmarks](https://localiq.com/blog/home-services-search-advertising-benchmarks/) · [HIRI contractor tech adoption](https://www.hiri.org/blog/contractor-tech-adoption-trends) · [WebFX home services seasonality](https://www.webfx.com/blog/home-services/seasonal-search-trends/) · [Small business software costs survey, n=781](https://www.thesmallbusinessexpo.com/blog/small-business-software-costs/) · ISED Canadian Industry Statistics: [2381](https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/2381) · [2382](https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/2382) · [2389](https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/2389) · [5617](https://ised-isde.canada.ca/app/ixb/cis/businesses-entreprises/5617) · [RCABC members](https://www.rcabc.org/members/) · [BC Housing Licence Registry](https://newhomesregistry.bchousing.org/LicenceRegistry/LicenceSearch/) · [BCLNA](https://bclna.com/) · [Consumer preference for human answering](https://cmmonline.com/news/most-would-rather-speak-to-a-person-when-booking-a-home-service)

**Unit costs:** [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) · [OpenAI pricing](https://developers.openai.com/api/docs/pricing) · [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing) · [Deepgram](https://deepgram.com/pricing) · [AssemblyAI](https://www.assemblyai.com/pricing) · [Twilio SMS Canada](https://www.twilio.com/en-us/sms/pricing/ca) · [Twilio Voice Canada](https://www.twilio.com/en-us/voice/pricing/ca) · [Telnyx rate card](https://telnyx.com/pricing.md) · [Resend](https://resend.com/pricing) · [AWS SES](https://aws.amazon.com/ses/pricing/) · [Vercel](https://vercel.com/pricing) · [Supabase](https://supabase.com/pricing) · [Cloudflare R2](https://developers.cloudflare.com/r2/pricing/) · [Stripe Canada](https://stripe.com/en-ca/pricing) · [Paddle](https://www.paddle.com/pricing) · [Clerk](https://clerk.com/pricing) · [Sentry](https://sentry.io/pricing/) · [PostHog](https://posthog.com/pricing) · [Crisp](https://crisp.chat/en/pricing/) · [CRA GST/HST registration](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge.html) · [CRA digital economy](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/digital-economy.html)

**Compliance:** [CASL full Act](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/) · [CASL s.6](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/section-6.html) · [CASL ss.9–11](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/page-2.html) · [CASL ss.31–33](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/page-4.html) · [SOR/2012-36](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/page-1.html) · [CRTC CASL FAQ](https://crtc.gc.ca/eng/com500/faq500.htm) · [CRTC Bulletin 2018-415 (accessory liability)](https://crtc.gc.ca/eng/archive/2018/2018-415.htm) · [CRTC Unsolicited Telecommunications Rules](https://www.crtc.gc.ca/eng/trules-reglest.htm) · [OPC — Recording of Customer Telephone Calls](https://www.priv.gc.ca/en/privacy-topics/surveillance/02_05_d_14/) · [OPC — cross-border processing](https://www.priv.gc.ca/en/privacy-topics/airports-and-borders/gl_dab_090127/) · [OPC — generative AI principles](https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai/) · [PIPEDA s.10.1](https://laws-lois.justice.gc.ca/eng/acts/P-8.6/section-10.1.html) · [Osler — Law 25 enforcement](https://www.osler.com/en/insights/blogs/risk/law-25-a-new-enforcement-scheme-for-protection-of-personal-information-in-the-private-sector-in-que/) · [Canadian mandatory SMS keywords](https://www.infobip.com/docs/essentials/canadian-mandatory-keyword-responses) · [Twilio Canada SMS guidelines](https://www.twilio.com/en-us/guidelines/ca/sms) · [FTC CAN-SPAM guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) · [FCC AI voices in robocalls](https://www.fcc.gov/document/fcc-makes-ai-generated-voices-robocalls-illegal) · [Orrick — 2026 state chatbot laws](https://www.orrick.com/en/Insights/2026/04/2026-State-Chatbot-Laws-Key-Provisions-and-Regulatory-Trends)

**Framer:** [Verseo on Framer Marketplace](https://www.framer.com/community/marketplace/templates/verseo/) · [Framer pricing](https://www.framer.com/pricing) · [Framer SEO features](https://www.framer.com/help/articles/guide-to-seo-features-and-tools/) · [Framer URL structure limits](https://brixtemplates.com/blog/framer-url-structure-explained-what-you-can-and-cant-do) · [Framer programmatic SEO](https://brixtemplates.com/blog/how-to-do-programmatic-seo-in-framer) · [Framer code components](https://www.framer.com/developers/components-introduction) · [Framer Server API](https://www.framer.com/updates/server-api) · [Framer export limitations tested](https://convertframer.com/blog/framer-export-code-limitations) · [Framer→code migration guide](https://migratelab.com/resources/framer-to-code-migration-guide) · [Subdomain vs subfolder, Ahrefs](https://ahrefs.com/blog/subdomain-vs-subfolder)

**Your own files (verified against the live site 2026-07-31):** `research/00-executive-verdict.md` · `research/01-current-site-audit.md` · `research/17-positioning-and-offers.md` · `app/tools/page.tsx` · `app/sitemap.ts`
