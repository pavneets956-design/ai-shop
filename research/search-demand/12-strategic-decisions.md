# 12 — Strategic Decisions

Two decisions the brief asked to be resolved with a recommendation, not a menu.

---

# A. AI Review Engine — price and position

## Current state (verified)

`lib/data/_services_b.ts` L436–437, live on `/services/ai-review-engine`:

> *"From $1,000 CAD to set up, then $49/mo."*
> Connected to Google Business Profile, Twilio SMS and Gmail. Asks every finished customer for a review, routes happy ones to Google and unhappy ones privately to the owner.

`lib/data/packages.ts` — **AI Starter System, floor $1,500**, described as *"One focused AI worker (receptionist, chatbot, quote intake, **or review replies**)"*.

So the registry already lists review replies as a Starter capability at $1,500, while a live page sells overlapping capability at $1,000 — **$500 under the floor.**

## Analysis against the brief's six criteria

**1. Consistency with the $1,500 Starter floor — fails.**
A visitor who reads `/pricing` and then `/services/ai-review-engine` learns the floor is negotiable. This is the same class of defect the P0 repair just spent a branch fixing: two pages, two prices, one capability.

**2. Perceived value — underpriced.**
$1,000 buys GBP API integration, Twilio SMS provisioning (which in Canada means A2P 10DLC registration — real, tedious, non-optional work), Gmail wiring, sentiment routing, and a review-gating flow that has to be built carefully to stay within Google's review policies. That is not a $1,000 scope.

**3. Implementation effort — equal to or greater than a receptionist install.**
It is the only offer in the ladder with a *standing service obligation*: messages keep sending, the SMS number keeps costing money, Google's API keeps changing. A receptionist install can be handed over. This cannot.

**4. Standalone, add-on, or entry product?**
This is the decisive question, and search evidence answers it. **It has no independent demand:**
- **Zero** review-related queries appear in the 92 first-party GSC queries.
- `automated review requests for contractors` is vendor-held (`revofield.com`, `ailocalgrowth.com`, `birdeye.com`, `myquoteiq.com`).
- `contractor review requests` is a confirmed **semantic trap** — its PAA is *"What is a contractor review?"*, *"What not to say to your contractor?"* — homeowner and employment intent, not buyer intent.

A product with no traffic arriving at it **cannot function as an entry product**, because there is nobody to enter. Pricing it as a loss-leader buys nothing.

**5. Risk of confusing the ladder — currently high.**
Four price points where two describe nearly the same deliverable: $1,000 (Review Engine) · $1,500 (Starter, which includes review replies) · $3,500–$7,500 (Business System) · $10,000 (Custom).

**6. Expected conversion role — value-add, not acquisition.**
Its real job is to raise the value of a system that is already being installed, and to give the care plan something concrete to justify a monthly.

## Recommendation

> **Retire the standalone $1,000 price. Make the AI Review Engine one of the named Starter worker options at the $1,500 floor, and keep $49/mo as its running cost — the one worker type with a genuine, explainable recurring cost.**

Concretely:
- `/services/ai-review-engine` **stays as a URL** (it is indexed; do not delete or redirect it). Reprice the page to **"Installed from $1,500 CAD, then $49/mo to run."**
- Add one honest line explaining *why* this specific worker has a monthly when others do not: **it sends real SMS messages and holds a phone number, so there is a per-message cost that does not exist for a chatbot or a quote-intake worker.** That converts an arbitrary-looking fee into a credible one.
- Offer it as an **add-on to an existing installed system** at the same $1,500, so it can also be sold to a customer who already bought something else.
- Source the numbers from `lib/data/packages.ts`, never hand-typed — this is exactly the failure mode the P0 repair addressed.

**Why not simply raise it to $1,500 as a standalone SKU?** Because that leaves two indistinguishable $1,500 offers in the ladder. Folding it into Starter as a *choice of worker* keeps the ladder at three rungs, which is the number the pricing section can present clearly.

**Owner approval required before any price string changes.** Nothing has been changed in code.

---

# B. Google Business Profile strategy

## Why this matters more than it looks

Local is the only surface in this entire study where Google is **not** answering the question itself. 32 of 34 SERPs carried an AI Overview; the two that did not were `ai automation surrey bc` and `ai consultant surrey`. First-party GSC independently shows `ai services surrey` (11 impressions) and a 92-impression Vancouver/Surrey/BC cluster (21% of all query impressions).

## ⚠️ Eligibility risk — read this first

**A Google Business Profile requires in-person contact with customers.** Google's guidelines exclude online-only businesses. This business installs systems *into the customer's accounts*, which can be done entirely remotely.

Three consequences:

1. **If work is genuinely 100% remote, the business may not qualify at all.** Creating a profile anyway risks suspension, and a suspended profile is materially harder to recover than never having had one.
2. **Do not register a virtual office, a mailbox, or a co-working address.** Address-based suspensions are the most common GBP enforcement action and they are hard to appeal.
3. **The qualifying path is on-site work.** If the business does visit contractor customers in Surrey/Langley/Delta to scope or install — even occasionally — it qualifies as a **service-area business (SAB)**, and that should be the basis of the listing.

**Owner decision required:** does the business meet customers in person? If yes, proceed as an SAB. If no, GBP should not be created, and local strategy has to run on location landing pages and citations alone.

## If eligible — recommended setup

**Business type:** Service-area business. **Hide the address.** A home address must be entered for verification but must be set to not display. Showing a residential address on a B2B profile is both a privacy problem and a credibility problem.

**Service areas, in this order:** Surrey · Delta · Langley · White Rock · Burnaby · New Westminster · Coquitlam · Richmond · Abbotsford. Google caps service areas (roughly 20) and diluting across all of Metro Vancouver weakens local relevance. Start tight — Surrey first, because that is where the evidence is.

**Categories.** `[U]` — I cannot verify Google's current live category list from this environment, so these are candidates to check in the GBP interface, not confirmed strings:
- *Primary candidate:* **Software company** or **Business management consultant** — pick whichever the interface offers that best matches "we build and install systems". Primary category is the single heaviest ranking factor in the local pack.
- *Secondary candidates:* Website designer · Computer consultant · Marketing agency · **Telephone answering service** (worth checking — it maps directly to the 38.4% receptionist cluster, but only add it if the business genuinely provides that service, which it does via installed receptionists).

Do not stuff categories. Wrong or aspirational categories are a suspension vector.

**Business name:** exactly **"Handbuilt AI"** — matching `site.name`. Do **not** append keywords ("Handbuilt AI | AI Automation Surrey"). Name-stuffing is the most-reported and most-penalised GBP violation, and competitors report each other for it.

**Description (750 chars max), draft:**
> Handbuilt AI installs practical AI and automation for contractors and local service businesses in Surrey and Metro Vancouver. We set up AI receptionists that answer when you can't, automatic follow-up for quotes that go quiet, and review requests that run themselves — inside the accounts and tools you already own. Everything is built around your real services, prices and calendar, then tested before it goes live. You keep your phone number, your data and your accounts, and you can export or cancel at any time. Free contractor calculators are available on our site with no signup. Based in Surrey, BC.

**Services to list:** AI receptionist installation · AI phone answering setup · Quote follow-up automation · Missed-call response setup · Review request automation · Business automation consulting · Custom AI app development · Chatbot development.
*(These mirror the highest-impression GSC clusters — receptionist, chatbot, follow-up — rather than internal product names.)*

**Photos.** This is the hardest honest problem: there is no storefront, no team, no client site to photograph. Do **not** use stock imagery or AI-generated images — Google removes them and they read as fake. Legitimate options: real screenshots of an installed workflow, a photograph of the actual workspace, a plain logo mark, and a simple diagram of what gets installed. Four real assets beat twenty generic ones.

**Reviews.** There are zero customers, so there are zero reviews, and **no review can be solicited, incentivised or written in-house.** The first design partners are the first review opportunity. Note the irony worth using in sales: the business sells a review-request system and should run its own once it has customers to ask.

## Release order for local pages

Do not publish 19 location pages against an empty profile. Sequence:

1. **Resolve eligibility** (owner decision above).
2. **Create and verify the profile** — verification can take days to weeks and everything else waits on it.
3. **Rewrite `/locations/ai-receptionist-surrey-bc` first** as a genuine local landing page — it targets the two AI-Overview-free queries and faces six named Surrey competitors (`automatebc.ca`, `adaptai.ca`, `manndigital.ca`, `buildgravity.ca`, `signalos.ca`, `townmedialabs.ca`).
4. **Add `LocalBusiness` schema** consistent with the profile — identical name, identical service areas. Inconsistency between schema and profile is a known trust problem.
5. **Then Vancouver**, because GSC already shows a 92-impression Vancouver/BC cluster and the site's #2 query overall is `custom chatbot development vancouver`.
6. **Then Langley, Delta, Burnaby** — only after the first two show movement.
7. Leave the remaining location pages as they are until there is evidence they earn anything.

## Explicitly NOT done

**No profile has been created, no verification started, no URL submitted.** The brief forbids it without explicit authorization and nothing here has been actioned.
