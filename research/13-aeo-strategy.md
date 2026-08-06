# 13 — AEO Strategy (Answer Engine Optimization)

**Researched:** 2026-07-31

**Target surfaces:** Featured snippets · People Also Ask · Google AI Overviews · Bing answers · voice search · conversational search.

**Context, verified:** Google AI Overviews now appear in roughly **50% of all searches**, and AI search engines handle an estimated **12–18% of English-language informational queries as of Q1 2026** (up from under 2% a year earlier). *Confidence: Moderate — secondary sources; directionally consistent across several.*

---

## 1. The governing principle

**Do not create hundreds of thin FAQ pages.** The site has already made a version of this mistake — 24 `/resources` pages, 9 `/how-to` pages and 21 `/compare` pages, many answering a single question each. That is the anti-pattern: it fragments authority and answers questions in isolation from the task the user is actually trying to complete.

**Group questions around complete user tasks.** A contractor asking "does it sound robotic?" is not doing research — they are deciding whether to risk their reputation on a phone call. That question belongs *next to* the recording, the escalation explanation and the ownership answer, on one page.

---

## 2. Answer-format rules

| Question shape | Format | Length | Schema |
|---|---|---|---|
| "What is X?" | Definition paragraph, direct answer first | 40–60 words | `DefinedTerm` |
| "How much does X cost?" | **Table** with named alternatives and real numbers | Table + 60 words | `Offer` |
| "X vs Y" | **Comparison table**, then honest prose on when each wins | Table + 200 words | — |
| "How do I…?" | Numbered steps | 5–9 steps | `HowTo` |
| "Can AI do X?" | **Yes/no first**, then the caveat | 40–60 words | `FAQPage` |
| "Is it legal to…?" | Direct answer + jurisdiction + "verify with counsel" | 60–80 words | — |
| "What does it cost me?" | **Calculator** | Interactive | `WebApplication` |

**The single most important formatting rule:** answer in the **first sentence**, then explain. Answer engines extract the first direct statement. Most of the site's `/resources` pages currently build up to the answer instead of leading with it.

---

## 3. Question-to-page map

Every high-value question routes to **one** canonical page. Questions do not get their own URLs.

| Question | Canonical page | Format |
|---|---|---|
| Will my customers know it's AI? | `/ai-receptionist-for-contractors` | **Recording** + 60 words |
| Does it sound robotic? | same | same section |
| What happens when it can't answer? | same | 80 words + escalation diagram |
| Can it book into my calendar? | same | 60 words + screenshot |
| Does it work with Jobber? | `/integrations/jobber` | 60 words + screenshot |
| How much does it cost? | `/pricing` | Table |
| Is a build cheaper than $99/mo? | `/pricing` | **Payback calculator** |
| Do I own it? | `/what-you-own` | 60 words + table |
| What if I stop paying? | `/what-you-own` | 80 words |
| What if the builder disappears? | `/what-you-own` | 80 words — answer honestly |
| Is it legal to record in Canada? | `/trust/call-recording` | 80 words + PIPEDA cite |
| Do I need consent to text? | `/trust/call-recording` | 80 words + CASL cite |
| What does a missed call cost me? | `/missed-calls` | **Calculator** |
| How many calls do contractors miss? | `/missed-calls` | 60 words + honest sourcing |
| How do I follow up on a quote? | `/quote-follow-up` | **Generator** + steps |
| How long does setup take? | `/ai-receptionist-for-contractors` | 40 words |
| AI receptionist vs answering service? | `/compare/ai-receptionist-vs-answering-service` | Table |

**17 high-value questions → 8 pages.** Compare with today, where a similar question set is spread across 40+ URLs.

---

## 4. The differentiated AEO play: be the honest source

Most content in this category recycles the same unverifiable statistics — above all the "**62% of contractor calls go unanswered**" figure, which is attributed to a 2024 ServiceTitan study that **I could not locate** (`02-market-demand.md` §2.1).

**The opportunity:** publish the numbers *with their provenance and their weaknesses stated*.

> "Invoca's own research puts the figure at 27% of calls to home-services businesses going unanswered. Invoca does not publish the sample size, methodology or data year, so treat it as indicative. The widely-quoted 62% figure traces back to a study we could not locate a primary source for — we don't use it."

This is unusual enough in this market to be genuinely quotable, and answer engines increasingly favour sources that attribute and qualify. It is also the only version of statistical content consistent with a brand positioned on honesty — and it costs nothing to do.

---

## 5. Schema priorities

| Schema | Where | Status |
|---|---|---|
| `Organization` + `sameAs` | Sitewide | **Missing `sameAs` — no external profiles exist yet.** Blocked on §6 of `11-local-seo.md` |
| `LocalBusiness` | Homepage, location pages | Present in some form; must match GBP exactly once GBP exists |
| `Service` | Each service page | Verify |
| `Offer` | Pricing | **Present but carrying contradictory values — P0 fix** |
| `FAQPage` | The 8 canonical pages only | Rich-result eligibility is limited; still valuable for extraction |
| `HowTo` | `/how-to/*` | Verify |
| `BreadcrumbList` | Sitewide | Add |
| `WebApplication` | The 5 free tools | **Add — currently unmarked and these are the best assets** |
| `Person` (founder) | `/about` | **Add — critical for E-E-A-T and entity** |
| `VideoObject` | When the recording exists | Future |
| `Review` / `AggregateRating` | — | **Only when real reviews exist.** Never synthesise. |

---

## 6. Voice search

Low measurable priority, but free if the above is done: conversational headings, direct first-sentence answers, and local phrasing ("AI receptionist near me", "who sets up AI for contractors in Surrey"). The GBP work in `11-local-seo.md` matters more here than any on-page change.

---

## 7. What would make this fail

- **Answering questions the site cannot back.** "Will my customers know it's AI?" answered with prose instead of a recording is a worse AEO asset than not answering at all, because it invites a comparison the site loses.
- **More FAQ pages.** The instinct to add a page per question is the exact instinct that produced the current 216.
- **Publishing the 62% statistic** because competitors do. It is the cheapest possible credibility loss.
- **`Review` schema without reviews.** Policy violation and a trust catastrophe if noticed.
