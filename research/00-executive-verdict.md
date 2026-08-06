# 00 — Executive Verdict

**Prepared:** 2026-07-31
**Scope:** aibuiltbyhand.com — US + Canada market, keyword, SEO, AEO, GEO and customer-language intelligence
**Status of this phase:** Research only. No production change was made. No page, redirect, sitemap, metadata or GSC setting was touched.

---

## The one-paragraph verdict

The site does not have a keyword problem. It has a **proof problem and an identity problem**, and it has been solving them by publishing more pages. There are **216 indexable URLs and zero pieces of first-party evidence** — no named client, no case study, no testimonial, no recorded real call. Meanwhile the category the site leads with, "AI receptionist," has in the last 18 months consolidated into a crowded, venture-funded SaaS market at $99–$249/month **and is now being bundled into the field-service platforms contractors already pay for** — Jobber ships an AI Receptionist add-on at $99/mo, Housecall Pro ships one built in. A one-person studio in Surrey cannot win a feature-and-price war in that category, and every additional programmatic page spent competing there deepens the loss. The move is to stop selling the commodity and start selling the two things the SaaS category structurally *cannot* sell: **an owned, integrated system rather than a rented feature, installed by a named human who is accountable for it.** Keep the receptionist as the wedge — it is the pain owners actually name — but stop pricing and positioning against $99/mo tools. Consolidate the ~20 overlapping receptionist URLs into 3, fix the pricing contradictions that are currently poisoning the site's own structured data, establish a brand entity that presently does not exist anywhere on the web, and buy the first real case study with discounted or free work. Do that before writing another page.

---

## The 20 required answers

**1. What should AI Built By Hand primarily sell?**
An **owned, connected back-office system for one field-service trade at a time**, sold as a fixed-price install with the code and accounts in the client's name. Not "an AI receptionist" as a product — that is now a $99/mo checkbox inside Jobber. The receptionist stays as the *entry wedge* because it is the pain owners name out loud; the *offer* is ownership and integration.
Confidence: **Strongly supported** (competitor pricing + platform-bundling evidence verified; the ownership objection is verified as recurring — see `07-competitor-analysis.md`).

**2. Who should it primarily sell to?**
Owner-operators of field-service businesses at roughly **$300K–$2M revenue, 2–15 staff**, already paying for Jobber or Housecall Pro, too small for ServiceTitan, where the owner or one overloaded admin answers the phone. Small firms (<20 employees) are **85% of BC construction businesses** (BCCA), so this is where the population actually is.
Confidence: **Strongly supported**.

**3. Which country first?**
**Canada — specifically Metro Vancouver and the Fraser Valley.** This is *not* because Canadian search demand is larger; the US home-services market is ~US$842B and roughly an order of magnitude bigger. It is because the binding constraint is **proof, not traffic**, and proof requires proximity: a referenceable local name, a site visit, a same-timezone phone number, a real recorded call. The US is Tier 2, entered on the remote-delivery positioning that already exists at `/remote-ai-development`.
Confidence: **Inferred** (strategic judgment from a verified constraint, not a demand measurement).

**4. Which industries first?**
Tier 1: **HVAC, plumbing, electrical, roofing** — highest lead value, genuine after-hours emergency demand.
But the sharper play is Tier 1b: **quote-heavy, software-thin trades — fencing, decks, concrete, landscaping/hardscaping, restoration.** Venture-backed voice platforms (Avoca, Sameday, AnswerForce, Newo) explicitly target HVAC/plumbing/roofing; the quote-complexity trades are comparatively unserved and the pain there is *estimate follow-up*, not call answering. See `08-industry-opportunity.md`.
Confidence: **Inferred** for Tier 1b; **Strongly supported** for Tier 1.

**5. Which services show the strongest demand?**
In descending order of evidenced commercial demand: (a) **missed-call capture / call answering**, (b) **estimate & quote follow-up**, (c) **appointment booking**, (d) review requests, (e) invoice chasing. Note (b) is where the site is *weakest* relative to demand and where competition is thinnest.

**6. What language do customers actually use?**
They say **"answering service," "missed call," "get back to people," "office help."** They do not say "AI-powered workflow orchestration." "AI receptionist" is now understood but it is a *product* word that immediately invites price comparison. Full verbatim set in `03-customer-language.md`.

**7. Should the company lead with "AI receptionist," "answering service," or "business automation"?**
**None of them as the headline.** Lead with the **outcome plus the ownership**, and use "AI receptionist" as the sub-line for search match. Leading with "AI receptionist" enters a price fight against $99/mo. Leading with "business automation" is abstract and invisible to search. Recommended primary in `17-positioning-and-offers.md`.

**8. What is wrong with the current positioning?**
Four things, in severity order:
- **No proof.** The flagship contractor page's only example is explicitly hypothetical — "a fencing contractor running a 4-person crew in the Fraser Valley" losing "an estimated 5–8 leads a week." That is a worked example presented where a case study should be.
- **No entity.** Searching `"AI Built By Hand"` and `"Handbuilt AI Studio"` returns **nothing** about this company. Other Surrey/Metro Vancouver AI firms (AdaptAI, BuildGravity, MSP Corp) do surface. An entity that no third party mentions cannot be cited by an AI engine.
- **Two audiences.** The site sells to contractors *and* to content creators (20 `/creators` pages). One solo founder, two vocabularies, zero proof in either. Entity clarity is the single largest GEO factor and this actively destroys it.
- **Price contradictions in its own machine-readable data.** See #11 and `01-current-site-audit.md`.

**9. What current pages should survive?**
The **5 free tools** (`/tools/*`) are the strongest asset on the site and the only genuine information-gain content: real calculators, real math, no login, no API cost. They are exactly what earns links and AI citations. Also keep: `/pricing`, `/about`, `/create`, `/faq`, the four Tier-1 trade industry pages, and `/compare/ai-receptionist-vs-answering-service`.

**10. What pages are missing?**
A real **case-study / proof page**; a **security, privacy & call-recording page** (required for trust *and* required for Canadian buyers — PIPEDA is all-parties consent); an **integrations page** naming Jobber/Housecall Pro/QuickBooks explicitly; an **ownership & what-happens-if-you-leave page**; and an honest **"what this costs vs. Jobber's $99 add-on"** comparison. Full list in `15-content-gap-analysis.md`.

**11. Which current pages compete with each other?**
Severe. **20 URLs target the AI-receptionist intent**, including a near-duplicate slug pair: `/ai-receptionist-for-contractors` and `/use-cases/ai-receptionist-for-contractors`. Three separate cost pages. Five chatbot pages. Full cannibalization map in `01-current-site-audit.md`.

Separately and urgently — **`/ai-business-system` publishes three different prices for the same product on one page**: body copy says "$2,500–5,000 CAD", a cross-reference says "$3,500–5,000 CAD (typically $7,500)" (internally contradictory on its face), and the JSON-LD `Offer` says "$3,500–$7,500". `llms.txt` carries both "$3,500–$7,500" (line 9) and "$2,500–5,000" (line 32). This is the exact data AI engines ingest to answer "what does it cost," and it is currently self-refuting.

**12. Ten strongest commercial keyword clusters** — see `06-keyword-clusters.md`. Headline: missed-call capture, answering service for <trade>, estimate follow-up automation, AI receptionist cost, AI receptionist vs answering service, <trade> office automation, contractor CRM integration, custom AI build cost, done-for-you AI setup, local "AI automation <city>".

**13. Ten strongest question clusters** — see `04-question-graph.md`. Headline: *Will customers know it's AI? What happens when it can't answer? Can it book into my calendar? Does it work with Jobber? What does it actually cost? Do I own it? What if I stop paying? Is it legal to record? How long to set up? Is it better than my answering service?*

**14. Ten biggest customer objections** — see `03-customer-language.md`. The three severe ones: **"it will sound robotic and my customers will hang up"** (verified: ~29% of consumers say they'd hang up on AI; documented provider switches over robotic voice), **"I'll be locked in / I won't own it"** (verified as a recurring agency-selection criterion), and **"I was burned before"** (verified: 42% of companies abandoned most AI initiatives in 2025, up from 17%).

**15. What proof does the website need?**
In priority order: (1) **one real recorded call** with written consent, published; (2) **one named client with a before/after number**; (3) a live, testable demo line the visitor can phone right now; (4) an integration proof — a screenshot of a booking actually landing in Jobber. One of #1 or #2 is worth more than the next fifty pages.

**16. What should the homepage communicate in five seconds?**
Who it's for (this trade), what breaks (calls and quotes fall through), what they get (a system that catches them), and the differentiator that no $99/mo tool can match (**you own it, and one named person built it**). The current H1 — "Missed calls, late quotes, invoice chasing — handled." — is genuinely good on problem-match and should largely survive; what it lacks is the ownership claim and any proof beneath it.

**17. Which opportunities are supported by data?**
Competitor pricing and category structure; platform bundling by Jobber/Housecall Pro; the ownership/lock-in objection; PIPEDA and CASL constraints; the existence of a saturated Canadian AI-receptionist field; the site's own inventory and its pricing contradictions; the absence of brand entity presence.

**18. Which opportunities remain hypotheses?**
The quote-heavy-trades wedge (Tier 1b); the claim that ownership positioning converts *better* than price positioning; the ranking feasibility of any specific keyword (no volume or difficulty data was obtainable); and the assumption that local proof unlocks the US market.

**19. What should be implemented in the first 30 days?**
1. Fix the `/ai-business-system` price contradiction and re-audit every price against one source of truth — it is currently corrupting schema and `llms.txt`.
2. Consolidate the 20 receptionist URLs to 3 with 301/308 redirects. Preserve every existing URL's equity — do not delete.
3. Win **one** reference client at a discount in exchange for a published, recorded, named case study.
4. Establish the entity: Google Business Profile as a service-area business, consistent NAP, `Organization` schema with real `sameAs`, and profiles on 3–5 directories.
5. Pull 16 months of Google Search Console data. It exists and is verified; it is the single largest missing input to this research.

**20. What should NOT be built yet?**
No new programmatic pages of any kind. No new city pages. No US state pages. No Quebec/French track. No new industries. No new `/creators` pages — that vertical should be paused or spun out. The site's page-to-proof ratio is 216:0; adding to the numerator makes it worse.

---

## Evidence confidence summary

| Confidence | Findings |
|---|---|
| **Verified** (directly observed by me this session) | Site inventory of 216 URLs; robots.txt and llms.txt contents; the `/ai-business-system` three-way price contradiction; the hypothetical-only example on `/ai-receptionist-for-contractors`; absence of any search result for the brand name; the 20-URL receptionist overlap |
| **Strongly supported** (multiple independent public sources) | AI receptionist market pricing $99–$249/mo; Jobber $99/mo add-on and Housecall Pro built-in; answering-service pricing bands; ownership/lock-in as a recurring objection; PIPEDA all-parties consent; CASL consent regime; saturated Canadian bilingual AI-receptionist field; BC construction firm-size distribution |
| **Inferred** (my judgment from verified inputs, labelled as such) | Canada-first sequencing; the quote-heavy-trades wedge; recommended positioning; industry opportunity scores |
| **Unknown** (could not be obtained — not estimated, not invented) | Search volume, keyword difficulty, CPC for every keyword; current rankings; GSC impressions/clicks/queries; first-party analytics; competitor traffic and backlink profiles; AI Overview presence per query |

**No search volume, keyword difficulty, CPC, traffic, market-share or ranking figure appears anywhere in this research, because none was obtainable from an accessible source.** Those columns are left blank in `05-keyword-universe.csv` by design. Widely-circulated statistics such as the "62% of contractor calls go unanswered" figure are recorded with their provenance and confidence rather than repeated as fact — see `19-evidence-register.csv`.

---

## Next gate

> **NOT READY FOR REDESIGN — RESEARCH BLOCKERS REMAIN**

Two blockers, both cheap and both yours to clear:

1. **Google Search Console export.** The property is verified and has ~16 months of history. Without query, impression and position data, every page-level priority in `15-` and `18-` is reasoning rather than measurement. This is a one-hour task and it would upgrade a large fraction of this report from *Inferred* to *Verified*.
2. **Zero first-party proof.** No redesign fixes a 216-page site with no evidence behind it. One named client with one real number changes what the site can honestly say — and therefore what it should be built to say.

The strategic conclusions above (audience, offer, ownership positioning, consolidation) are supported well enough to **begin Stage 1 architecture work now**. What must not begin is page production or a visual redesign, because both would harden the current unproven positioning into a new coat of paint.
