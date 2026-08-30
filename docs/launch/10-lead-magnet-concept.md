# Lead magnet — "What AI should I build?"

> **Draft concept. Nothing built, nothing published.**

## The problem it solves

The five free tools already on the site are the strongest asset there — real, useful, no signup — but they are all *diagnostic of a symptom* (what a missed call costs, what to charge). None of them answers the question a contractor actually has after using one: **"fine, so what do I do about it?"**

That gap is where the enquiry dies. This fills it.

It is also the honest antidote to the sales pitch. Most of the time the right answer for a small contractor is not a $3,500 system, and a tool that says so is worth more trust than any amount of copy claiming he is honest.

---

## The concept

**Name:** "What AI should I build?" — literal, matches how people ask it, no cleverness.

**Format:** a browser tool at `/tools/what-ai-should-i-build`, in the same shell as the existing five. **Not a gated PDF.** No email required, nothing to download, results shareable by URL. That is consistent with the rest of the suite, and the suite's whole credibility rests on nothing being gated.

**Length:** 7 questions, under 90 seconds.

### The questions

1. **What is your trade?** (the nine already in the showroom, plus "other")
2. **When the phone rings during the workday, what happens?** — I answer it / it goes to voicemail / someone in the office gets it / an answering service / I usually miss it
3. **Roughly how many calls a week do you not get to?** — a slider, not a text box
4. **What happens to a quote after you send it?** — I follow up when I remember / never / I have a system
5. **How do you get paid, and what happens when they are late?** — I chase by hand / my software chases / I do not chase
6. **What do you already run the business on?** — Jobber / Housecall Pro / QuickBooks / Square / spreadsheets and a phone / something else
7. **If one hour a day came back, what would you do with it?** — more jobs / go home earlier / stop doing admin at night

### What it outputs

A single-screen result with four parts:

1. **Your biggest leak, named**, with the number attached — pulled from the same arithmetic as the existing missed-call calculator so the two tools can never disagree.
2. **The cheapest fix that is not me.** This is the part that makes the tool worth trusting. If the answer is a missed-call text-back on their existing phone plan, or turning on a feature in the Jobber account they already pay for, it says so, names it, and stops. **No email capture on that path** — they got their answer and it did not cost them anything.
3. **What a built system would do**, only when the answers actually warrant one, described in terms of their trade and the tools they named in question 6, with the real price band from `lib/data/packages.ts`.
4. **One action.** Either "here is the free tool that goes deeper on this" or "here is the form, and here is what I would need from you" — never both.

### What it must never do

- Produce a quote. It produces a **direction**, and the site says so on the result screen.
- Recommend a build for every set of answers. If it never says "you do not need me for this", it is a sales funnel wearing a diagnostic costume, and contractors read that instantly.
- Ask for an email before showing the result.
- Invent a number. Every figure on the result screen must come from what the visitor typed plus arithmetic they could check on paper.

---

## Why this shape and not a PDF

- **A PDF needs an email address to deliver**, and the domain has no MX record — the whole delivery path is blocked today (see `12-external-checklist.md`). A browser tool needs nothing.
- The five existing tools are ungated. Gating the sixth teaches visitors that the free ones were bait.
- A URL-shareable result gets forwarded to a business partner or a bookkeeper. A PDF sits in a downloads folder.
- It is indexable. "What AI should I build for my business" is a real question people type; a page that answers it can rank. A PDF behind a form cannot.

## Build notes

- Belongs in `lib/tools/` as a pure function with co-located tests, registered in `lib/data/freeTools.ts`, exactly like the other five. Same shell components, no new patterns.
- The recommendation logic is **rules, not a model.** No API call, no cost per use, no chance of a hallucinated price. The existing solution finder already demonstrates the correct split: the rules pick the package and the price, and a model may only rewrite the prose around them.
- Route the result CTA through the existing free-tool attribution tag (`src=tool-<slug>`) so an enquiry that came from this tool is identifiable in the lead payload without any new database column.
- **Effort estimate: about a day**, mostly on the copy in the result screen. The scoring is simple; the honesty is the hard part.

## Priority

⟦Owner decision.⟧ This is a strong asset and it is not the top of the list. It matters only after there is traffic to run through it — see `11-30-day-schedule.md`, where the off-site foundation (a working mailbox, a verified profile, a LinkedIn presence) has to come first. Build it in week 4 or later.
