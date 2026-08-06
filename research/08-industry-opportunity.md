# 08 — Industry Opportunity

**Researched:** 2026-07-31 · **Machine-readable:** `data/industries.csv`

---

## Scoring model — and why it is not scientific

Six factors, each 1–5, summed to /30. **Three of the six inputs are qualitative judgments, not measurements.** No search-volume, revenue-per-customer or willingness-to-pay data was obtainable for any individual trade, so this model deliberately does **not** include a demand-volume factor — including one would have meant inventing it.

| Factor | Basis |
|---|---|
| **LV** — Lead value | Typical job size; **evidenced** for HVAC/plumbing/roofing, inferred elsewhere |
| **UR** — Urgency / speed-to-lead sensitivity | Emergency vs. planned work; **partly evidenced** |
| **QC** — Quote complexity | Whether the sale needs a site visit and a custom number; **inferred** |
| **AB** — Admin burden | Scheduling + follow-up + invoicing load; **inferred** |
| **CD** — Competitor density *(inverted — higher = less contested)* | **Evidenced** from which trades voice-AI vendors explicitly name |
| **PF** — Proof feasibility for a Surrey-based solo builder | Local density in the Fraser Valley + willingness to be referenced; **inferred** |

**Use this to sequence, not to forecast.**

---

## Scores

| # | Industry | LV | UR | QC | AB | CD | PF | **/30** | Tier |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **Fencing / decks** | 4 | 2 | **5** | 4 | **5** | **5** | **25** | **1b** |
| 2 | **Landscaping / hardscaping** | 3 | 2 | **5** | 4 | **4** | **5** | **23** | **1b** |
| 3 | **HVAC** | **5** | **5** | 3 | 4 | 1 | 4 | **22** | **1a** |
| 4 | **Restoration / water damage** | **5** | **5** | 4 | 3 | **4** | 2 | **23** | **1b** |
| 5 | **Plumbing** | 4 | **5** | 2 | 4 | 1 | 4 | **20** | **1a** |
| 6 | **Concrete / paving** | 4 | 1 | **5** | 3 | **5** | 4 | **22** | **1b** |
| 7 | **Roofing** | **5** | 3 | 4 | 4 | 1 | 4 | **21** | **1a** |
| 8 | **Electrical** | 3 | 4 | 3 | 4 | 2 | 4 | **20** | **1a** |
| 9 | **Painting** | 3 | 1 | 4 | 3 | **4** | **5** | **20** | 2 |
| 10 | **General contracting / remodel** | **5** | 1 | **5** | **5** | 3 | 3 | **22** | 2 |
| 11 | **Cleaning** | 2 | 2 | 2 | **5** | 3 | **5** | **19** | 2 |
| 12 | **Pest control** | 2 | 3 | 2 | 4 | 2 | 3 | **16** | 3 |
| 13 | **Moving** | 3 | 3 | 4 | 4 | 3 | 3 | **20** | 2 |
| 14 | **Tree service** | 3 | 3 | 4 | 3 | **5** | 4 | **22** | 2 |
| 15 | **Garage door / locksmith** | 2 | **5** | 1 | 3 | 3 | 3 | **17** | 3 |
| 16 | **Auto detailing / mobile mechanic** | 2 | 2 | 2 | 3 | 4 | 4 | **17** | 3 |
| 17 | **Property management** | 4 | 3 | 3 | **5** | 4 | 3 | **22** | 2 |
| 18 | Clinics / dental / physio | 3 | 2 | 1 | **5** | 1 | 2 | **14** | **Reject** |
| 19 | Law firms | **5** | 2 | 2 | 4 | 1 | 2 | **16** | **Reject** |
| 20 | Salons / barbershops / gyms | 1 | 1 | 1 | 4 | 2 | 4 | **13** | **Reject** |
| 21 | Restaurants / food trucks | 1 | 2 | 1 | 3 | 3 | 4 | **14** | **Reject** |
| 22 | Real estate / mortgage / insurance | 4 | 3 | 2 | 4 | 1 | 3 | **17** | **Reject** |
| 23 | **Content creators** | 2 | 1 | 2 | 4 | 3 | 2 | **14** | **Reject** |

---

## The contrarian finding — and the argument against it

**Finding:** the highest-scoring trades are *not* the ones the market is chasing.

Every venture-backed voice-AI vendor names **HVAC, plumbing, roofing, electrical** (Avoca, Sameday, AnswerForce, Newo, Xenara, LeadTruffle). Those trades score well on lead value and urgency — and terribly on competitor density. A solo builder entering "AI receptionist for HVAC" competes with funded companies that have review counts, integrations and ad budgets.

The **quote-complexity trades** — fencing, decks, concrete, landscaping, tree service — score high on the factors that actually favour a custom build:
- **Quote complexity 5/5.** The sale requires a site visit and a bespoke number. A generic voice agent cannot do this; it can only take a message. A *custom* system that captures dimensions, materials, access constraints and photos, then drives a structured follow-up sequence, genuinely can.
- **Competitor density 4–5/5 (uncontested).** No vendor is targeting them.
- **The binding pain is estimate follow-up, not call answering** — which is the thinnest content gap found in this entire research (`07`, `06`).
- **Proof feasibility 5/5.** The Fraser Valley is dense with them, and the site's own existing hypothetical already reaches for a fencing contractor — which suggests the instinct was already there.

**The honest argument against:** these trades are more seasonal, generally lower-revenue, and likely **less willing to pay $1,500–$3,500** than an HVAC company doing $2M with genuine 2am emergency calls. Urgency scores are low (1–2), and urgency is what makes an owner buy *this month* rather than next spring. There is **no willingness-to-pay data** for either group — that is an unmeasured assumption on both sides of the argument.

**Recommendation — sequence, don't choose:**
1. **Win the first 2–3 reference clients in fencing / decks / landscaping.** Cheap to reach, uncontested, quote-follow-up pain is real, and they will say yes to being named. The goal of these builds is **proof, not margin.**
2. **Then attack HVAC and plumbing with that proof in hand.** Higher willingness to pay, and by then there is a real recording and a real number to show — the only things that beat a funded competitor's review count.

**Reject the clinical, legal, beauty, hospitality and financial verticals.** Regulated data (PHIPA), incumbent specialist vendors, and no relationship to the founder's actual delivery strength. Their 12 industry pages should be paused, not maintained.

---

## The creators vertical — explicit recommendation

**Score: 14/30. Recommendation: pause and noindex the 20 `/creators` pages, or spin them to a separate domain.**

Reasoning, not taste:
- **Entity dilution.** Clear service definition and explicit target industries are the top-ranked GEO factors. A site that says "we serve contractors and TikTok creators" answers *"what is AI Built By Hand?"* badly — and that question is exactly what an AI engine must answer to recommend it.
- **Proof burden doubles.** Zero proof in one vertical is a problem; zero proof in two is twice the problem with the same founder-hours to fix it.
- **No shared buying trigger, vocabulary, price expectation, or referral path.** A fencing contractor never refers a YouTuber.
- **Different competitive dynamic.** Creator tooling competes with $20/mo self-serve products and a fast-moving open-source scene — a worse fight than the contractor market, not a better one.

This is a real fork and it is the founder's call, not mine. But carrying both while having proof in neither is the one option that is clearly worse than either choice made deliberately.
