# 03 — Voice of Customer / Customer Language

**Researched:** 2026-07-31

---

## Access blocker — read this before using anything below

The two richest sources of unfiltered contractor language were **not accessible** in this phase:

| Source | Result | Evidence |
|---|---|---|
| **Reddit** (r/Contractors, r/HVAC, r/Plumbing, r/smallbusiness, r/Entrepreneur) | **Blocked to the research user agent** | `API Error: 400 — The following domains are not accessible to our user agent: ['reddit.com']` |
| **ContractorTalk.com** threads | **Paywalled to bots.** Requests 307-redirect to `tollbit.contractortalk.com`, which returns **HTTP 402 Payment Required** | Observed on both target threads, 2026-07-31 |

**Consequence, stated plainly:** what follows is a *partial* voice-of-customer set assembled from review sites, vendor-published case detail and search-result summaries. It is enough to identify the objection *categories* with confidence. It is **not** enough to claim that any specific phrasing is the dominant customer wording, and it is not the reproducible verbatim corpus the assignment specifies.

Everything below is labelled **[VERBATIM]**, **[REPORTED]** (a source describes what a customer said, but the wording is the source's) or **[VENDOR]** (marketing copy that asserts a customer feeling — lowest value, included only where it names a real objection).

**Do not put any phrase from this file into site copy as a quotation.** Section 5 gives the protocol for collecting a corpus you can actually quote.

---

## 1. Problems — how owners describe what is broken

| Phrase | Type | Source | Normalised problem |
|---|---|---|---|
| Contractors are "on a roof with tools in hand unable to answer their phone safely" | [VENDOR] | massmonopoly.com | Physically cannot answer while working |
| "To make money, you have to do the work, but to get work, you have to answer the phone" — described as the *Availability Paradox* of the trades | [VENDOR] | massmonopoly.com | Core structural bind |
| "many people hang up on answering machines and won't leave messages" | [REPORTED] | ContractorTalk thread summary | Voicemail does not capture leads |
| Caller "already called the next contractor on Google who answered" | [VENDOR] | massmonopoly.com | Lead goes to first responder |
| "Homeowners rarely say no; they go quiet, then hire whoever stayed in touch" | [VENDOR] | partnerwithpear.com | Quote follow-up failure |
| Contractors "stop after one" follow-up on unsold estimates | [REPORTED] | pushleads.com | Follow-up discipline collapse |
| Owner reserves "cell phone for important clients and subcontractors" and routes the rest to a service | [REPORTED] | ContractorTalk thread summary | Wants call triage, not blanket answering |

**The strongest signal here is not the missed call — it is the *split attention*.** Owners are not asking to never answer the phone. They are asking to not have to *decide*, mid-job, whether this ring is worth climbing down for.

## 2. Desired outcomes

| Phrase | Type | Source |
|---|---|---|
| Wants details "emailed or texted to the phone" minutes after the call, with "immediate callback for important or emergency calls" | [REPORTED] | ContractorTalk thread summary |
| Wants a service that "answers calls in your business name" | [REPORTED] | ContractorTalk thread summary |
| "hands the customer a price the same afternoon looks 10× more professional" | [VENDOR] | partnerwithpear.com |

Note what is *absent*: nobody in the captured material asks for "AI." They ask for **coverage, speed, and their business name spoken correctly.** AI is the mechanism, never the desire.

## 3. Objections and fears — ranked by evidenced severity

### Severe — will kill a deal

**3.1 "It will sound robotic and my customers will hang up."**
- **[VERBATIM]** Property manager evaluating RingCentral's AI receptionist: *"You could obviously tell it was a robot. And as soon as you try to talk, it would try to talk and then stop."*
- **[REPORTED]** A legal office switched providers specifically because the AI *"sounded too robotic"* and customers hung up.
- **[REPORTED]** A landscaping company owner found the default voice speed robotic; raising it to 1.1× made it "more natural and conversational."
- **Counter-evidence, cite honestly:** *"around one in three consumers (29%) say they would hang up if forced to speak to AI"* — while vendors claim *"in blind tests, 85 to 95% of callers can't tell AI from a human voice."* Both are vendor-published; the 29% is the more useful number because it is the one the buyer feels.
- **Frequency: high. Severity: deal-killing. Real, not hypothetical.**

**3.2 "I'll be locked in — will I actually own this?"**
- **[REPORTED]** The ownership question is framed in the buyer-guidance literature as: *"Do I own all the automations and configurations you build, or am I locked into your platform?"*
- **[REPORTED]** *"Some agencies build automations on proprietary platforms or under their own accounts... If you stop paying them, your automations stop working."*
- **[REPORTED]** *"Insist on full ownership of all configurations, workflows, and code. Any agency that refuses this is prioritizing lock-in over client success."*
- **[REPORTED]** *"ask whether you will own the accounts, code, and configuration. If everything lives in the agency's private accounts, leaving means rebuilding."*
- **Frequency: high. Severity: high. This is now a standard item on buyer checklists — which means it is being asked in sales calls whether or not the vendor raises it.**
- **This is the single best-aligned objection in the entire research set.** It is a real, recurring, checklist-level buyer concern, and it is the one thing Handbuilt can answer better than every $99/mo competitor. It should be answered *before it is asked*, in writing, on the site.

**3.3 "I was burned before."**
- **42% of companies abandoned most AI initiatives in 2025**, up from 17% the year before.
- **MIT: 95% of GenAI projects fail to deliver significant value.**
- **[REPORTED]** *"The chatbot graveyard is enormous, and most of the tombstones say 'Built with good intentions. Died from bad implementation.'"*
- **[REPORTED]** A European chemical distributor "spent six figures on an AI chatbot that worked, but nobody used it... nobody saw the value quickly enough."
- **Frequency: rising fast. Severity: high.**

### Frequent — must be answered on the page

**3.4 Surprise billing.** Verified as the dominant complaint pattern against the incumbent human/hybrid services — *"three complaint patterns appear independently across Trustpilot, G2, Clutch, and BBB: billing surprises from stacking add-on fees, calls transferred to live agents without the client's authorization, and charges continuing after cancellation."* One Capterra reviewer reported an expected **$660 invoice ballooned to over $5,100 with no advance warning** (Ruby). Named pricing traps include **Dialzara $0.48/min overages, AnswerForce $2/min overages, Rosie's $49 plan excluding appointment booking, and undisclosed setup fees of $75–$1,500+.**
→ **A fixed one-time price is a direct, evidenced answer to the loudest complaint in this market.** This is a stronger argument than "you own it" because it is emotional and immediate.

**3.5 "Will it connect to what I already use?"** Integration with Jobber / Housecall Pro / QuickBooks / the existing calendar is a standard evaluation criterion.

**3.6 "What happens when it can't answer?"** Escalation and warm transfer are named features across the category — buyers ask about failure modes.

**3.7 "Is it legal to record?"** Live in Canada specifically — see `10-canada-market.md`.

### Hypothetical — do not build pages for these

- "It will replace my employees" — appears in vendor-written objection lists; no customer-side evidence found.
- "It will expose customer data" — a real enterprise concern; **no evidence** of it being a frequent small-contractor objection.
- "AI will misunderstand accents" — plausible and important, but **no supporting evidence located**. Do not assert it.

---

## 4. Language decisions this supports

| Use | Avoid | Why |
|---|---|---|
| "answering service", "missed calls", "get back to people", "office help" | "workflow orchestration", "agentic systems", "AI-powered solutions" | Owners use plain operational nouns |
| "you own it", "one fixed price", "no monthly fee" | "flexible pricing", "custom quote" | Directly answers the #1 complaint in the category |
| "here's a real recording" | "cutting-edge", "seamless", "revolutionary" | Sceptical market; 42% abandonment rate |
| "here's what it does *not* do" | Superlatives, "never miss a call again" as an absolute | The absolute claim is the one that gets disproved on call three |
| Naming Jobber / Housecall Pro explicitly | "integrates with your CRM" | Buyers search by their tool's name |

---

## 5. Protocol to collect a corpus you can actually quote

This is the gap that most limits this report. It is closable in about a week:

1. **Pull `/create` form submissions and any past sales-call notes.** First-party, already consented, already yours. Highest value. Zero cost.
2. **Ten 20-minute calls with Fraser Valley trade owners**, recorded with permission, no pitch. Ask only: *walk me through the last time you missed a call that mattered* and *what happened to the last quote you sent that went quiet.* Transcribe. This produces quotable, attributable, first-party language and simultaneously builds the referral list.
3. **Mine review text for the incumbents you compete against** — Ruby, Smith.ai, AnswerForce, Podium on G2/Capterra/Trustpilot. The 1–3 star reviews are where the real objections are, and they are quotable with attribution.
4. **Trade Facebook groups and local association forums** (BC Construction Association, regional HBA chapters) — publicly visible, not bot-blocked, and geographically correct for the Canada-first strategy.

Structured output goes to `data/customer-language.csv`, which is currently seeded with only the evidence above and its confidence labels.
