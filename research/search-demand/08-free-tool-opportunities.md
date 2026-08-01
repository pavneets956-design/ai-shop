# 08 — Free Tool Opportunities

**Basis:** live autocomplete clusters + PAA + Reddit threads, 2026-08-01
**Constraint from the brief:** choose **no more than five**. A tool must (1) answer a real searched question, (2) deliver value without login, (3) reveal a measurable leak, (4) transition naturally to a paid diagnosis, (5) carry little or no recurring inference cost.

**Critical context:** five working tools already ship at `/tools` — missed-call revenue calculator, lead-leak audit, profit-pricing calculator, labor-burden calculator, quote follow-up generator. The right answer to "which five tools" is therefore mostly **"the ones you already have, pointed at the right queries"**, not five new builds.

---

## Scoring

Search demand and Canadian relevance are `[D]` from live autocomplete/PAA. Effort, support burden and variable cost are `[I]` engineering judgement. **No search-volume figures exist** — see `01-methodology-and-provenance.md`.

| Tool | Demand `[D]` | Reveals a leak | → paid path | Inference cost | Status | Score |
|---|---|---|---|---|---|---:|
| **Missed-call revenue calculator** | **347 variants**; `missed call text back calculator` appears in Bing autocomplete | Yes — dollars | Strong | **Zero** (arithmetic) | **SHIPPED** | **9.5** |
| **Quote follow-up generator** | PAA repeats *"How to professionally follow up on an estimate?"* across 3 trees; Reddit "Homeowners ghosting" 91c | Partial | Strong | Zero if templated | **SHIPPED** | **9.0** |
| **Quote-recovery value calculator** | Same cluster; no equivalent found on any SERP | **Yes — dollars** | **Strongest** | Zero | **NEW — build** | **8.5** |
| **AI receptionist cost calculator** | `ai receptionist cost`, `…cost per month`, `…pricing`, `answering service cost per month`; PAA *"Is an AI receptionist worth it?"* | Yes — comparison | Strong | Zero | **NEW — build** | **8.0** |
| **Lead-leak audit** | `contractor lead leak` weak, but composite of missed-call + quote clusters | Yes | Strong | Zero | **SHIPPED** | 7.5 |
| Software subscription cost calculator | `jobber cost`, `housecall pro cost`, `how much is jobber per month`, `how to cancel jobber` | Yes — dollars | Medium | Zero | Candidate | 7.0 |
| Profit-pricing calculator | Generic contractor demand | Indirect | Weak | Zero | SHIPPED | 6.0 |
| Labor-burden calculator | Generic | Indirect | Weak | Zero | SHIPPED | 5.5 |
| Review-request generator | `automated review requests for contractors` exists but SERP is vendor-held | No | Weak | Low | Skip | 4.5 |
| Scope-of-work / change-order generator | Little Canadian autocomplete support | No | Weak | **High** (LLM per use) | **Skip** | 3.0 |
| Job-site note summarizer | No demand evidence found | No | Weak | **High** | **Skip** | 2.0 |
| Roofing job profitability calculator | Homeowner-intent contamination on roofing SERPs | Indirect | Weak | Zero | Skip | 3.5 |
| Jobber total-cost calculator | Overlaps subscription calculator; brand-targeted | Yes | Medium | Zero | Fold in | 5.0 |
| Contractor hourly-rate calculator | Overlaps profit-pricing | No | Weak | Zero | Skip | 3.5 |
| Automation readiness assessment | No search demand; vendor-invented format | No | Medium | Zero | **Skip** | 2.5 |

---

## The five

### 1. Missed-call revenue calculator — SHIPPED, promote hardest
Largest measured vocabulary cluster in the study (347 variants). Zero inference cost. Already has a verified regression fixture (433 calls/mo · 30% missed · 70% qualified · 40% close · $800 → **$29,097**).
**Action:** no rebuild. Point it at `missed call text back` / `contractor missed calls` language and put it in the homepage trust slot.

### 2. Quote follow-up generator — SHIPPED, retarget the copy
The question *"How to professionally follow up on an estimate?"* appears in **three separate PAA trees** — the most repeated question found. Reddit's "Homeowners ghosting" (91 comments) is the same problem in customer words.
**Action:** no rebuild. Retitle around **"quote"** (104 variants) rather than "estimate" (23), and answer the PAA question verbatim on the page.

### 3. Quote-recovery value calculator — BUILD
The one genuine gap. The follow-up generator tells you *what to send*; nothing tells you *what the silence is costing*. Quotes sent/month × average value × close-rate delta → dollars currently walking away.
**Why it wins:** puts a number on a leak the contractor already feels ("Tired of wasting time on free estimates"), then hands them the fix. Cleanest possible bridge to a paid diagnosis. Zero inference cost. No equivalent found on any of the 34 SERPs.

### 4. AI receptionist cost calculator — BUILD
`how much does an ai receptionist cost` is scored **attack-now**: no ads, cost-led PAA, three Canadian competitors ranking. Compare human answering service vs AI vs missed-call cost, in CAD.
**Why it wins:** intercepts the highest-intent commercial query in the study with a tool instead of a brochure, and publishing real numbers is the differentiator identified in `06-competitor-content-gap.md`.
**Constraint:** must pull from `lib/data/packages.ts`, never hand-typed figures.

### 5. Lead-leak audit — SHIPPED, keep as the composite
Combines the two strongest clusters into one diagnosis and is already the closest thing to a paid-assessment preview.

---

## Explicitly not building

**Anything with per-use LLM cost.** Scope-of-work generators, change-order generators and note summarizers all fail criterion 5 — they carry unbounded inference cost on free traffic, and the "free" autocomplete cluster shows a large share of that traffic has no budget. A free tool that costs money per use, aimed at an audience that searches "free", is a subsidy.

**Automation readiness assessment.** Zero search evidence. Vendor-invented format.

**Anything on `roofing estimating software`.** `roofr`/`roofsnap` own it and it is not a product this business sells.

---

## Measurement

Free-tool traffic should be judged on **downstream paid-diagnosis bookings**, not sessions. The `free` autocomplete cluster is large and largely budgetless; volume alone will look like success and mean nothing.
