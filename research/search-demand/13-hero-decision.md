# 13 — Hero Decision

**Question:** why was the H1 built on "missed calls" when that cluster has only **2** first-party impressions, while the AI-receptionist cluster has **156**?

**Answer: it shouldn't have been. The H1 has been changed.** This file shows the working.

---

## 1. First, what the GSC numbers can and cannot decide

Recomputed from `research/gsc-baseline/raw/gsc/queries-raw.tsv`:

| Cluster | Impressions | Queries | Best position | Impression-weighted position |
|---|---:|---:|---:|---:|
| AI receptionist | 156 | 13 | 42.5 | **73.3** |
| Local geo (Vancouver/Surrey/CA) | 113 | 12 | 63.5 | 78.2 |
| Chatbot | 105 | 12 | 69.0 | 78.9 |
| Lead follow-up | 42 | 11 | 48.0 | 76.8 |
| *"is an AI receptionist worth it"* | 21 | 3 | 42.5 | **47.6** |
| Answering / phone | 14 | 7 | 70.0 | 88.1 |
| Quote / estimate | 8 | 3 | 81.0 | 82.5 |
| **Missed call** | **2** | 2 | 68.0 | 73.0 |

**Three facts that constrain how much weight these can carry:**

1. **Zero clicks. Across all 92 queries.** The property's 3 clicks sit in the 172 withheld anonymised impressions, not in any visible row.
2. **Impression-weighted average position is 74.4.** Page seven. Only 3 of 92 queries rank above position 30.
3. **It is partly circular.** The current homepage `<title>` is literally *"AI Receptionist & Admin Systems for BC Contractors"*. Google returns receptionist impressions substantially **because that is what the page already says**. This measures existing targeting as much as independent demand.

So the dataset shows **topical association**, not demand and not conversion. Using "168 impressions" (156 on a stricter regex) to mechanically pick a headline would be exactly the error the brief warns against.

It also, however, **does not vindicate the shipped H1.** Two impressions is not a mandate either, and the missed-call *tool* has been live the whole window: `summary-stats.json` records **`tools_impressions: 0`**.

---

## 2. The three directions, scored

### Option 1 — "AI receptionist for contractors"

| Criterion | Assessment |
|---|---|
| Search-intent alignment | **Strongest.** Exact match to the site's #1 query (50 impr). 100% buyer intent on YouTube. Heads the largest cluster. |
| Contractor comprehension | **High.** "Receptionist" is a job everyone already understands. |
| Differentiation | **Weakest.** It *is* the category label. `billdr.ai`, `askbenny.ca`, `lunacal.ai`, `heyitsclara.com`, `trillet.ai`, `workphone.io`, `dolfyn.ai`, `mihronai.ca`, `voxara.ca`, `rasai.ca`, `polarisvoice.ca`, `heyjodie.com` all lead with these words. |
| Local relevance | Neutral on its own. |
| Conversion clarity | **Moderate.** Names the product; gives no reason to act. |
| Generic-answering-service risk | **Highest.** RingCentral ranks on this term with *"AI Receptionist: 24/7 Intelligent Virtual Answering Service"*. |
| Starter-offer consistency | **High.** Starter is one worker, usually this one. |

### Option 2 — "Never lose another job to a missed call"

| Criterion | Assessment |
|---|---|
| Search-intent alignment | Weak. "Missed call" is 2 impressions, and bare it is **50% builder/agency intent** on YouTube. |
| Contractor comprehension | **High.** Plain and concrete. |
| Differentiation | **Low.** Near-identical to the existing site's line and to every missed-call-text-back vendor's pitch. Reddit records contractors being cold-called by exactly those vendors and resenting it. |
| Local relevance | Absent. |
| Conversion clarity | Good — loss-framed. |
| Generic risk | **High.** This is the MCTB sales script. |
| Starter consistency | Partial. |
| **Disqualifier** | **"Never" is an unsupportable absolute.** No system catches every call. An unverifiable claim in the H1 breaks the project's own no-unsupported-claims rule. |

### Option 3 — "Missed calls become booked jobs." *(what shipped)*

| Criterion | Assessment |
|---|---|
| Search-intent alignment | **Weak.** Customer language, largest autocomplete cluster (347 variants) — but that cluster is agency-contaminated bare, and first-party impressions are 2. |
| Contractor comprehension | **High.** Outcome-framed, no jargon. |
| Differentiation | Moderate. |
| Local relevance | Absent from the H1 (eyebrow only). |
| Conversion clarity | **High.** States the transformation cleanly. |
| Generic risk | Moderate. |
| **Real defect** | **It never says what is being sold.** It reads equally as a phone system, an answering service, a CRM or a lead-gen agency — and it abandons the one entity association Google currently has for this site. |

---

## 3. Decision

**None of the three is right alone.** Option 1 wins on search and loses on differentiation; Option 3 wins on clarity and loses on identity; Option 2 is disqualified by an unsupportable absolute.

The H1 has to do two jobs at once: **name the deliverable** (identity, comprehension, search) and **carry the differentiator** (so it is not the category label).

> ## Final: "An AI receptionist for contractors — on the number you already own."

**Why each half earns its place:**

| Clause | Evidence |
|---|---|
| *An AI receptionist for contractors* | The site's **#1 first-party query** (50 impr) · head of the 156-impression cluster · **100% buyer intent** on YouTube, where the bare term is 50% builder intent — the qualifier is what flips it |
| *on the number you already own* | Answers a **verified live PAA question** (*"Can I keep my phone number if I switch provider in Canada?"*, where `crtc.gc.ca` ranks) · said by **zero** competitors across 34 collected SERPs · an answering service by definition gives you *their* number, so this clause is what kills the generic read |

This is not keyword insertion. The phrase earns the slot because it is simultaneously the entity, the top query and the buyer-intent phrasing — and it is paired with a claim only this business can make.

**Supporting copy now carries the problem language:**

> It answers the calls you miss while you're on site, books the job into your calendar, and chases the quotes that go quiet. Installed in about a week.
>
> Not a subscription you have to figure out. You keep the number, the data and the accounts — export or cancel any time.

"Missed calls" and "quotes go quiet" stay, in the support line where customer language belongs. *"Installed in about a week"* matches `packages.ts` (Starter: "Live in ~5 business days"). *"Not a subscription"* answers `contractor software without subscription` (scored attack-now).

---

## 4. What would change this decision

- **A fresh GSC export showing clicks.** Everything above rests on a zero-click dataset; the first real click data outranks all of it.
- **Ranking movement above position 30.** At position 74 nothing is being chosen; it is only being shown.
- **Evidence that "receptionist" reads as replacing a person.** The live PAA *"Will receptionists be replaced by AI?"* is job-seeker intent, but if buyers read the H1 that way it is the wrong noun.
