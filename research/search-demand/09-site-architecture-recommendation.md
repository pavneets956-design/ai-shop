# 09 — Site Architecture Recommendation

**Basis:** 34 live Canadian SERPs · 3,660 CA autocomplete suggestions · 334 Reddit posts · 2026-08-01
**Current site:** 216 sitemap URLs / 237 prerendered routes (`docs/design/baseline/seo-before.json`)

> **Nothing in this file is to be implemented in the visual-redesign branch.** No redirects, no consolidation, no noindex. Those need separate authorization per the design brief §19 and this brief §14.

---

## Governing principle

94% of the national SERPs measured carry an AI Overview. **Adding informational pages to a 216-page site in a market where Google answers the question itself is negative-return work.** The recommendation is therefore heavily weighted toward *not building*: 3 new pages, not 50.

---

## Pages to preserve unchanged

| URL | Evidence |
|---|---|
| `/tools` + all 5 tool routes | Strongest asset. Free-tool demand is the largest entry cluster; no competitor on 34 SERPs shipped a working calculator. |
| `/pricing` | Target for `how much does an ai receptionist cost` (**attack-now**). Publishing real CAD ranges is the differentiator. |
| `/ai-business-system` | Target for `contractor software without subscription` (**attack-now**). Pricing was just repaired here. |
| `/ai-receptionist` · `/ai-receptionist-for-contractors` | Both self-canonical, distinct, both $1,500. No technical defect. Route contracts preserved. |
| `/locations/*` (19 pages) | **Upgraded in importance.** The only two AI-Overview-free SERPs found were local. Prior GSC analysis showed BC location pages outranking their money pages. |
| `/industries/roofing` | Roofing beachhead. `ai for roofing companies` and `roofing quote follow up` both score attack-now. |
| `/faq` | Becomes a primary asset — see below. |
| `/compare/*` | Keep, deprioritise. Directory-dominated SERPs. |

---

## Pages to rewrite (same URL, better targeting)

| URL | Problem | Fix |
|---|---|---|
| `/faq` | Currently generic | Rebuild around the four evidenced objections: *will it annoy my customers* · *can I keep my phone number* · *who owns my data / can I export* · *what happens if I cancel*. All four are verified live PAA or Reddit threads. |
| `/tools/contractor-quote-follow-up-generator` | Titled "estimate" language | Retarget to **"quote"** (104 variants vs 23). Answer *"How to professionally follow up on an estimate?"* verbatim — it recurs in 3 PAA trees. |
| `/locations/surrey` | Generic location template | Make it a real local landing page: it targets the two AI-Overview-free queries and faces six named Surrey competitors. |
| `/industries/roofing` | Generic | Add *"Will AI replace roofing contractors?"* — surfaced by Google's own PAA. |
| `/ai-business-system` | Positions as a system purchase | Add the "software you bought but never got set up" angle from `I'm really disappointed with Jobber` (112 comments). |

---

## New pages justified by evidence — three only

| New URL | Query | Evidence |
|---|---|---|
| `/tools/quote-recovery-calculator` | `quote follow up`, `customer did not respond to estimate` | Highest-scoring gap in `08`. No equivalent on any of 34 SERPs. |
| `/tools/ai-receptionist-cost-calculator` | `how much does an ai receptionist cost` | attack-now; no ads; cost-led PAA; 3 Canadian competitors ranking |
| `/compare/jobber-alternative` *(if not already present)* | `jobber too expensive`, `problems with jobber` | Reddit-dominated but real. **Attack after proof only.** |

That is the complete list. Every other evidenced question folds into an existing page.

---

## Questions to answer inside existing pages (no new URLs)

| Question (live PAA / Reddit) | Home |
|---|---|
| Why are customers averse to service chatbots? | `/faq` + homepage objection block |
| Can I keep my phone number if I switch provider in Canada? | `/faq` (cite CRTC) |
| Who owns customer data? / Is our data really private? | `/faq` |
| Are payment reminders legally required? | `/services` invoice section |
| Is an AI receptionist worth it? | `/pricing` |
| Will AI replace roofing contractors? | `/industries/roofing` |
| How to professionally follow up on an estimate? | quote follow-up tool page |
| What to do if a client doesn't respond to a quote? | quote-recovery calculator page |
| Is there a cheaper option than Jobber? | comparison page |

---

## Pages to consolidate later — NOT in this branch

The prior GSC-gated analysis cut consolidation from 152 merges to **0**, on evidence that BC location pages outrank their money pages and `/creators` ranks best on the site. Nothing in this study overturns that. Two items to revisit **after** fresh GSC data:

- `/use-cases/ai-receptionist-for-contractors` is a third live page on the same topic (internal links split 13 → money page, 5 → use-case page).
- The 20 `/creators/*` pages remain flagged for entity dilution, but `/creators` ranks best on the site. **Do not touch without new evidence.**

---

## Pages to noindex later — NOT in this branch

None recommended from this study. Prior work identified 194 defer / 21 protected. This study adds no new noindex candidates and does not authorize any.

Two pre-existing defects found in the route baseline, worth fixing on merit (not SEO strategy): **`/login` and `/products` have no H1.**

---

## Pages requiring proof before publication

Anything with an outcome or ROI claim. There are currently **zero customers, zero testimonials, zero case studies**. Specifically gated: any "results" page, any recovered-revenue figure, any named customer, any comparison page asserting superiority rather than difference.

Free tools are exempt — a calculator makes no claim about *this business's* results.

---

## The architectural bet

**Local + tools, not national + content.**

- National informational queries: 94% carry an AI Overview → adding guides is a losing trade.
- Local queries: the only two AI-Overview-free SERPs found → and six competitors already there, so it is contested but winnable.
- Free tools: the one asset class no competitor on 34 SERPs has shipped.

The 216 pages are not the problem and should not be demolished. The problem is that the highest-leverage surfaces — the Surrey local page and the tools hub — are treated as peripheral.

**Outside this branch's scope but the single highest-leverage item found: Google Business Profile still does not exist.** Local is where the AI-Overview-free demand is, and a GBP is roughly a third of local-pack weight. Nineteen location pages are waiting behind it.
