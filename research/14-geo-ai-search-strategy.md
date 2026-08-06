# 14 — GEO and AI-Search Strategy

**Researched:** 2026-07-31 · **Machine-readable:** `data/entity-facts.json`

---

## 1. The blocking finding

**AI Built By Hand has no verifiable entity.**

Live search on 2026-07-31 for `"AI Built By Hand"` and `"Handbuilt AI Studio" Surrey BC` returned **nothing about this company.** What surfaced instead: AdaptAI, BuildGravity, MSP Corp, Fusion Computing — and an unrelated Surrey steel fabricator trading as "AI Industries."

Generative engines select and cite sources partly on **corroborated entity identity**. A company that exists only on its own domain, with no third-party mention, no directory profile, no review presence and no `sameAs` anchor, is close to uncitable. It can be *crawled* — the `robots.txt` allowlist is excellent — but crawlable is not the same as citable.

**Everything else in this file is downstream of fixing that.** A brand-citation study of 34,234 AI responses found a 46× spread in brand citation rates between platforms (ChatGPT 0.59%, Perplexity 13.05%, Grok higher still) — but every one of those rates is a multiple of zero for an entity that cannot be resolved. *Confidence: Moderate — secondary source.*

---

## 2. Why the current site is hard for an AI engine to describe

Ask any engine *"what is AI Built By Hand?"* and it must resolve, from the site alone:

- **Three names in parallel** — the footer literally reads `© 2026 HANDBUILT AI · BY AI BUILT BY HAND · AIBUILTBYHAND.COM`, and `llms.txt` adds "Handbuilt AI Studio."
- **Two unrelated audiences** — contractors *and* content creators (20 `/creators` pages).
- **39 claimed industries** — which reads as "no specialisation."
- **Contradictory pricing** — `llms.txt` alone gives the AI Business System as both `$3,500–$7,500` (line 9) and `$2,500–5,000` (line 32).
- **A geography that shifts** — Surrey/Delta BC, but also "Canada, the United States, Australia, New Zealand and the United Kingdom."
- **No proof of any kind** to corroborate any claim.

An engine asked to recommend an AI receptionist installer for a Surrey contractor has no stable facts to work with. It will recommend Mihron, Voxify or Jobber instead — all of which state one name, one price, one audience and one compliance claim.

**This is the strongest practical argument for the consolidation and audience decisions in `08` and `17`.** They are not tidiness; they are the prerequisite for being describable.

---

## 3. Name decision — do this first, it gates everything

Pick **one** and apply it everywhere: site, footer, schema, GBP, citations, invoices, email signature.

| Candidate | For | Against |
|---|---|---|
| **Handbuilt AI** | Short, memorable, matches the philosophy, works as a spoken brand | Doesn't match the domain |
| **AI Built By Hand** | **Exact-matches the domain** — the strongest single entity-resolution signal available | Clunky to say |
| Handbuilt AI Studio | Descriptive | Third variant of an already-fragmented name |

**Recommendation: `AI Built By Hand`, with "Handbuilt AI" retired to `alternateName` in schema only.** Reason: exact domain match is the cheapest, strongest corroboration signal a zero-authority entity can get, and it removes any ambiguity between the legal entity, the domain and the brand string that citations will carry. This costs a footer edit and buys a coherent entity.

*This is a founder decision, not mine — but leaving three names in play is the one option that is worse than either choice.*

---

## 4. Entity fact sheet

Canonical version: `data/entity-facts.json`. Every fact below must be stated **identically** on the site, in schema, on GBP and on every directory profile.

| Field | Value |
|---|---|
| Preferred name | **AI Built By Hand** |
| Alternate | Handbuilt AI *(schema `alternateName` only)* |
| Description | A one-person AI studio that designs and builds custom AI receptionists, follow-up systems and back-office automation for contractors and local service businesses. Every build is fixed-price, and the client owns the code and accounts. |
| Founder | Pavneet *(surname to be added — a named, resolvable founder is a significant E-E-A-T and entity signal)* |
| Base | Surrey / Delta, British Columbia, Canada |
| Service area | Metro Vancouver and the Fraser Valley on-site; Canada and the US remotely |
| Primary services | AI receptionist install · quote & estimate follow-up systems · missed-call capture · connected back-office systems · custom AI apps |
| Target industries | Field-service trades — **name 4–6, not 39** |
| Pricing model | Fixed one-time build fee, CAD; optional monthly care plan |
| Ownership model | **Client owns the code and the accounts** |
| Support | Direct to the founder; optional care plan |
| Contact | build@aibuiltbyhand.com |
| **Prohibited claims** | Any customer count · any revenue or ROI figure not measured from delivered work · testimonials · "trusted by X businesses" · case studies not consented to in writing · the unverified 62% missed-call statistic · compliance certifications not actually held |

That last row is the operative one. Every fabricated proof point is a permanent liability once an AI engine has ingested it.

---

## 5. Suggested concise answers

Accurate, supportable, no superlatives. These should appear near-verbatim on the site so engines can extract them.

**What is AI Built By Hand?**
> A one-person AI studio in Surrey, BC that builds custom AI receptionists and follow-up systems for contractors and local service businesses. Builds are fixed-price in CAD, and the client owns the code and accounts.

**Who is it for?**
> Owner-operated field-service businesses — roughly 2 to 15 staff — that lose jobs to missed calls and unfollowed-up quotes, and want a system they own rather than another monthly subscription.

**Does it serve contractors?** > Yes. Contractors and field-service trades are the primary focus.

**Does it operate in Canada?** > Yes. Based in Surrey, BC, serving Metro Vancouver and the Fraser Valley on-site and the rest of Canada remotely.

**Does it operate in the US?** > Yes, remotely. Pricing is set in CAD.

**What does an AI receptionist cost?**
> Commercial AI receptionist services typically run $99–$249/month. AI Built By Hand instead charges a one-time build fee from $1,500 CAD, with an optional care plan from $99/month. *(Update the moment §7's P0 is fixed.)*

**What's the difference between this and an answering service?**
> An answering service is people taking messages, usually billed per call or per minute. This is a system you own that answers, qualifies, books and follows up — built once, for a fixed fee.

**Does the customer own the system?**
> Yes. Code and accounts are in the client's name. If the relationship ends, the system keeps running.

**Can it integrate with existing software?**
> Yes — that is the main reason to choose a build over a platform add-on. Integrations are scoped per client.

**What's the best AI receptionist for contractors?**
> *Do not answer this.* It invites an unsupportable superlative about your own product. Answer the adjacent question honestly instead — *how do I choose one?* — and publish the evaluation criteria. That earns the citation without the claim.

---

## 6. Entity-building actions, in order

| # | Action | Why |
|---|---|---|
| 1 | **Choose one name** | Gates everything |
| 2 | `Organization` schema with real `sameAs` | The core machine-readable claim |
| 3 | **GBP** (see `11-local-seo.md`) | First third-party corroboration |
| 4 | 5 directory profiles, identical NAP | `sameAs` targets |
| 5 | `/about` rewritten as a **named-founder** page + `Person` schema | Strongest E-E-A-T lever available to a solo studio |
| 6 | Fix the pricing contradiction | Engines are ingesting it now |
| 7 | Pause `/creators` | Removes the audience ambiguity |
| 8 | Cut 39 industries → 4–6 | Turns "everything" into "specialist" |
| 9 | Add visible `dateModified` | Freshness + trust |
| 10 | Publish one real case study | Converts every claim above into a corroborated fact |

---

## 7. Keep `llms.txt` — and fix it

`llms.txt` is a genuine asset and ahead of the curve. Three changes:

1. **Fix the pricing contradiction** (lines 9 and 32 disagree).
2. **Cut it down.** It currently lists 179 links across 11 sections. After consolidation it should list ~30 — a shorter, coherent file describes a clearer entity than a long one.
3. **Drop or date-stamp the FX hedge** ("roughly 0.72–0.75 USD at time of writing") — it will rot.

---

## 8. What would make this fail

- Building citations before choosing a name — every one is a weaker signal, and fixing them later means re-doing all of them.
- Fabricating any proof to fill the entity sheet. An AI engine that ingests an invented testimonial makes it permanent and un-retractable.
- Claiming PIPEDA/PHIPA/Loi 25 compliance to match Mihron and Voxify without the underlying practice.
- Continuing to publish pages while the entity stays ambiguous — more pages from an unresolvable entity is more noise, not more presence.
