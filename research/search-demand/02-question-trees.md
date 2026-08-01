# 02 — Question Trees (live People Also Ask)

**Collected:** 2026-08-01 · Google `gl=ca&hl=en&pws=0` · headless Chromium, same-origin fetch
**Raw:** `raw/serp/CA-batch*.json` (field `paaLevel1`)
**Label:** `[V]` — every question below was returned by Google on the date shown. None is written by me.

## Depth limitation, stated up front

The brief asks for level 1–3 expansions. **Only level 1 was obtained.**

Levels 2 and 3 require *clicking* each PAA row so Google appends children — that needs a live rendered page per query. The fetch channel that made bulk collection possible returns static HTML, and by the time deeper expansion was attempted the IP had been throttled (see `01-methodology-and-provenance.md`, Trap 2).

Levels 2–3 are `[U]`. They are not guessed at. 22 of 34 collected SERPs carried PAA; 12 carried none, which is itself recorded.

---

## Tree 1 — Quote follow-up  ⭐ cleanest intent in the study

**Root:** `quote follow up for contractors` — AIO ✔ · PAA ✔ · ads ✘ · Reddit + Facebook organic

- How to professionally follow up on a quote?
- How long should I wait for a quote from a contractor?
- How to professionally follow up on an estimate?
- How to follow up after submitting a quote?

**Root:** `customer did not respond to estimate` — AIO ✔ · PAA ✔ · ads ✘ · Reddit + Facebook + Quora organic

- What to do if a client doesn't respond to a quote?
- How to professionally follow up on an estimate?
- What is an unresponsive customer?
- How to respond to an estimate?

**Root:** `roofing quote follow up` — AIO ✔ · PAA ✔

- How to professionally follow up on an estimate?
- How much does it cost to get a quote from a roofer?
- How many quotes should you get for a new roof?
- What is the cheapest month for roofing?

> **Read:** `How to professionally follow up on an estimate?` appears in **all three** trees. It is the single most repeated question in the entire study. Three independent forums (Reddit, Facebook, Quora) rank organically on these SERPs, which means the existing web answers are not satisfying people.
> **Caution:** the roofing tree drifts to *homeowner* intent by question 2 ("how much does it cost to get a quote from a roofer", "how many quotes should you get"). Roofing quote content must be written for the contractor, or it will attract the wrong reader.
> **Destination:** free tool (`/tools/contractor-quote-follow-up-generator`) + a direct answer. Not a new page per question.

---

## Tree 2 — AI receptionist cost

**Root:** `how much does an ai receptionist cost` — AIO ✔ · PAA ✔ · ads ✘ · **3 Canadian competitors organic**

- Is an AI receptionist worth it?
- How much should I charge for an AI receptionist?
- How much does AI reception cost?
- How much does AI medical receptionist cost?

> **Read:** `Is an AI receptionist worth it?` is a buying question and deserves a direct on-page answer. `How much should I charge for an AI receptionist?` is *agency* intent — other builders researching their own pricing, not customers. `medical receptionist` shows the vertical is currently healthcare-led, not trades-led.
> **Destination:** `/pricing` + FAQ. Publishing a real range is a differentiator — `mihronai.ca`, `voxara.ca` and `rasai.ca` rank here and largely do not.

---

## Tree 3 — Jobber displacement

**Root:** `jobber alternatives` — AIO ✔ · PAA ✔ · Reddit organic #1

- Is there anything better than Jobber?
- Is QuickBooks better than Jobber?
- Is Housecall Pro better than Jobber?
- Is Jobber the same as DripJobs?

**Root:** `jobber too expensive` — AIO ✔ · PAA ✔ · Reddit + Facebook organic

- Is there a cheaper option than Jobber?
- **Is Jobber a Canadian company?**
- How much is the cheapest version of Jobber?
- Is Jobber worth it?

> **Read:** the comparison set is other *software*. Nobody in this tree is asking for a service or an installer — they are shopping SKUs. That is a category we do not compete in.
> **`Is Jobber a Canadian company?` is a strategic warning.** Jobber is Canadian (Edmonton). "We're local/Canadian" therefore does **not** differentiate against the incumbent. Confirmed by CA-only autocomplete: `jobber toronto`, `jobber vancouver office`, `jobber kitchener`, `jobber headquarters`, `is jobber canadian`.
> **Destination:** monitor. Directory sites (`capterra.ca`, `getapp.ca`) plus Jobber's own domain hold this SERP.

---

## Tree 4 — Contractor invoices

**Root:** `contractor invoice reminders` — AIO ✔ · PAA ✔

- What is an example of a reminder on an invoice?
- What should a contractor invoice include?
- **Are payment reminders legally required?**
- How often should you send invoice reminders?

> **Read:** `Are payment reminders legally required?` is a compliance question with a Canadian answer. Good trust content, low commercial value on its own.
> **Destination:** fold into an existing services section + FAQ.

---

## Tree 5 — AI in roofing

**Root:** `ai for roofing companies` — AIO ✔ · PAA ✔

- How can I use AI for my roofing business?
- **Will AI replace roofing contractors?**
- Is there an AI app for contractors?
- How to use AI to run a construction company?

> **Read:** `Will AI replace roofing contractors?` is fear, surfaced by Google itself. Answering it plainly ("no — it handles the office work, you keep the trade") is on-brand and directly addresses the audience's actual anxiety.
> **Destination:** roofing trade landing page.

---

## Tree 6 — Automating the business

**Root:** `how to automate a contracting business` — AIO ✔ · PAA ✔

- How to automate contract management?
- What is the most profitable contracting business?
- Can I use AI to automate my business?
- How to get more clients as a contractor?

> **Read:** only questions 3 and 4 are on-intent. Google is unsure whether "contracting" means trades or contracts. Weak root.

---

## Tree 7 — Software without a subscription

**Root:** `contractor software without subscription` — AIO ✔ · PAA ✔

- Is there a free app for contractors?
- What is the cheapest contractor software?
- Can ChatGPT do construction estimates?
- Is the contractor plus app free?

> **Read:** the intent behind "without subscription" is **cheap**, not **ownership**. That is an important and slightly inconvenient distinction — the ownership pitch is real and defensible, but this query does not deliver people looking for it; it delivers people looking for free. Expect poor conversion from this term even if it ranks.
> `Can ChatGPT do construction estimates?` shows DIY substitution is an active competitor.

---

## Tree 8 — The AI-contact objection  ⭐ most useful for copy

**Root:** `customers hate automated messages` — AIO ✔ · PAA ✔ · Reddit organic

- **Why are customers averse to service chatbots?**
- What are the 3 F's of customer service?
- What not to say to customers on the phone?
- What are the 7 qualities of bad customer service?

**Root:** `can i keep my phone number answering service` — AIO ✔ · PAA ✔ · **crtc.gc.ca organic**

- Can I still keep my phone number without service?
- Can I keep my phone number if I switch provider in Canada?
- Can you keep your phone number between providers?
- What is the cheapest way to keep a phone number in Canada?

**Root:** `who owns my customer data software` — AIO ✔ · PAA ✔

- Who owns customer data?
- Who owns the CRM system?
- Is our data really private?
- Who is the owner of software?

> **Read:** this is the highest-value tree in the study for **copy**, and the lowest-value for **new pages**. These are not queries to rank for; they are the objections a buyer arrives with. Every one maps to an FAQ answer.
> `crtc.gc.ca` ranking on the phone-number question confirms it is a genuine Canadian regulatory concern, not a generic worry.

---

## Trees NOT built, and why

| Intended root (brief §5) | Status |
|---|---|
| `ai tools for contractors` | Built, but **contaminated** — `What is the best AI tool for contracts?` is contract-law intent |
| `ai automation for contractors` | SERP collected, **no PAA present** |
| `ai receptionist for contractors` | SERP collected, **no PAA present**; related searches show `salary` / `jobs` contamination |
| `missed call text back` | SERP collected, **no PAA present** |
| `contractor software alternatives` | SERP collected, **no PAA present** |
| `contractor crm for small business` | SERP collected, **no PAA present** |
| `contractor review requests` | Built, but **wrong audience** — see `04-serp-forensics.md` |
| `roofing estimating software` | Built, but drifts to homeowner roof-cost intent |
| `done for you business automation` | SERP collected, **no PAA**, zero contractor/Canadian results |
| `estimate follow up template` | **COLLECTION FAILED** — throttled, not re-run |
| `how many times should a contractor follow up` | **COLLECTION FAILED** |
| `unsold estimate follow up` | **COLLECTION FAILED** |

Twelve of 34 collected SERPs carried no PAA at all. That is a real finding: much of this space is not question-shaped in Google's view, which reduces the value of a question-per-page content strategy.
