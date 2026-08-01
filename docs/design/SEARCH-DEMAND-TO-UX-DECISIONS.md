# Search Demand → UX Decisions

Bridges the live search-demand study (`research/search-demand/`, collected 2026-08-01) to the Verseo UI rebuild (`docs/design/VERSE0-REFERENCE-AUDIT.md`).

**The rule this file enforces:** *the reference design controls presentation; search and customer evidence control the words, priorities and information architecture.* Where the two conflicted, the content structure was adapted and the visual quality preserved.

**Confidence:** `High` = live SERP or PAA. `Medium` = autocomplete breadth or Reddit engagement. `Low` = inference from composition. No decision below rests on search-volume data, because none exists in this study.

---

## 1. Copy and messaging

| UX decision | Evidence | Source | Confidence |
|---|---|---|---|
| H1 = "Quotes go quiet. Calls get missed. We install the system that catches them." | `quote` 104 autocomplete variants vs `estimate` 23; `missed call` 347 variants (largest cluster); "Homeowners ghosting" 91 comments | `03` §1, `05` §1 | High |
| Rejected the brief's "The office work slowing your contracting business down—handled." | "office work" is category language; `contractor office automation` is a semantic trap returning industrial-controls intent | `04` §4 | High |
| Say **"quote"**, not "estimate", in all headings | 104 : 23 in Canada (4.5 : 1) | `03` §1 | High |
| Say **"contractor"**, never "home service business" | 283 variants vs **1** | `03` §1 | High |
| "Done-for-you AI systems" demoted from H1 to eyebrow | `done for you business automation` SERP has zero contractor and zero Canadian results | `04` §4 | High |
| Pair "AI receptionist" with "answering service" on first use | 333 vs 270 variants; cost queries skew to "answering service" | `03` §1, §4 | High |
| Do **not** lead with "Canadian" | Jobber is Canadian; PAA asks *"Is Jobber a Canadian company?"* | `02` Tree 3 | High |
| "Surrey" **is** used as a specific local claim | Two AI-Overview-free SERPs are Surrey-local | `04` §2 | High |
| Anti-hype tone; no futuristic AI framing | "Why is every construction 'AI' demo a Sci-Fi movie… when PDFs still ruin my day?" — 111 comments | `05` §2 | High |

## 2. Navigation

| UX decision | Evidence | Source | Confidence |
|---|---|---|---|
| "Tools" → **"Free Tools"** | The "free" cluster is one of the largest measured | `03` §3 | Medium |
| "Get a Fit Check" → **"See what it's costing you"** | "fit check" has zero search presence; leak-framing matches the calculators | `10` §3 | Medium |
| "For Contractors" → **"For Your Trade"** | "Contractor" is correct vocabulary but redundant as a nav item on a contractor site; trade specificity is the open gap | `06` Gap 4 | Medium |
| Keep "Pricing" prominent | `how much does an ai receptionist cost` scores attack-now | `04` §5 | High |
| Keep a "Proof" slot but leave it honest | Zero customers exist | `09` | High |
| Demoted nav links stay reachable in the footer | Route/internal-link preservation; `/creators` currently ranks best on the site | `09` | High |

## 3. Homepage structure

| UX decision | Evidence | Source | Confidence |
|---|---|---|---|
| Verseo's customer-logo strip → **live embedded calculator** | No customers exist; no competitor across 34 SERPs shipped a working tool | `06` Gap 3 | High |
| Problem selector = quotes going quiet · missed calls on site · admin at 9pm | Three largest evidenced clusters | `03` §1, `05` §2 | High |
| Added an explicit **objection block** not in the reference | Four objections verified live: chatbot aversion (PAA), phone-number portability (crtc.gc.ca ranks), data ownership (PAA), cancellation (`how to cancel jobber`) | `02` Tree 8, `05` §2 | High |
| Verseo's testimonial section → **design-partner invitation** | Zero testimonials exist; fabrication forbidden | `09` | High |
| Verseo's monthly/annual pricing toggle **removed** | Pricing is project-based; a toggle would imply subscription, which is the exact objection being countered | `04`, `10` §7 | Medium |
| Trade cards limited to 3, roofing first | Roofing scores attack-now; only `askbenny.ca` is trade-specific across 34 SERPs | `06` Gap 4 | High |
| Positioning = *configure what you already own*, not *replace your CRM* | "I'm really disappointed with Jobber" 112 comments; `how to cancel jobber` is Canada-only | `05` §2, `06` Gap 5 | High |

## 4. Tools

| UX decision | Evidence | Source | Confidence |
|---|---|---|---|
| Missed-call calculator promoted hardest | 347 variants — largest cluster measured | `08` | High |
| Quote follow-up generator retitled to "quote" | 104 : 23; *"How to professionally follow up on an estimate?"* recurs in 3 PAA trees | `02`, `08` | High |
| Build a **quote-recovery value calculator** | Highest-scoring gap; no equivalent on any of 34 SERPs | `08` | Medium |
| Build an **AI receptionist cost calculator** | attack-now query; no ads; cost-led PAA; competitors don't publish prices | `08` | Medium |
| **No** LLM-powered free tools | Unbounded inference cost against a large budgetless "free" cluster | `08` | High |
| Tools measured on downstream bookings, not sessions | The "free" cluster is large and largely budgetless | `08` | Medium |

## 5. Deliberately NOT done in this branch

| Not done | Why |
|---|---|
| No redirects, no consolidation, no noindex | Brief §14 and design-brief §19 both require separate authorization |
| Both receptionist pages left intact | No technical defect; route contracts preserved |
| `/creators` untouched | Ranks best on the site |
| No new pages beyond the three evidenced | 94% of national SERPs carry an AI Overview — adding guides is negative-return |
| AI Review Engine pricing untouched | Standing owner decision |

---

## Where evidence overrode the reference

1. **Logo strip → working calculator.** Verseo's strongest trust device is borrowed credibility. We have none to borrow and one thing better: a tool that works.
2. **Testimonials → design-partner invitation.** Same reason.
3. **Pricing toggle removed.** A subscription affordance would undercut the ownership positioning that the objection research says matters most.
4. **Objection block added.** Not in the reference at all, but four verified live objections had nowhere to live.
5. **Body type set to 17px/1.55, not Verseo's 15px/1.2.** Not a search finding — an audience finding, argued in the reference audit §5.3.

## Where the reference won

Section rhythm, elevation system, hairline-as-shadow technique, radius scale, button geometry, the "two flat + one elevated" before/after row, the window-chrome accordion, the sticky step sequence, the hairline bento, and the bracketed micro-eyebrow. None of these are content decisions, so none is constrained by the search evidence.
