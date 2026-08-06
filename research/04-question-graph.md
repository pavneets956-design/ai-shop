# 04 — Question Graph

**Researched:** 2026-07-31
**Machine-readable version:** `data/questions.csv`, `data/questions.json`

---

## Method and its honest limits

Google's People Also Ask, autocomplete and related-searches boxes were **not directly scrapeable** in this phase — no SERP-scraping capability was available and no keyword tool was accessible. This graph is therefore assembled from:

1. **Competitor FAQ blocks** (the strongest available proxy — vendors build FAQ sections against real PAA data and their own sales calls);
2. **Comparison-article H2/H3 structures** across ~40 sources;
3. **Review-site complaint themes**, which surface post-purchase questions buyers *should* have asked;
4. **The site's own FAQ blocks**, which already encode good instinct.

**What this means:** the question *set* is well-grounded and the *intent classification* is reliable. The **ordering within tiers is not measured** — it reflects source frequency, which is a proxy for search demand, not a measurement of it. Do not treat the ranking as volume data.

---

## Root 1 — AI receptionist (highest competition, lowest opportunity)

```
How does an AI receptionist work?
├── Will my customers know they're talking to AI?        [trust]      ★ SEVERE
│   ├── Does it sound robotic?
│   ├── Do I have to tell callers it's AI?
│   └── What do customers think of AI receptionists?
├── What happens when it can't answer a question?        [risk]       ★ SEVERE
│   ├── Can it transfer to a real person?
│   ├── What if it books the wrong appointment?
│   └── What if it quotes the wrong price?
├── Can it book appointments into my calendar?           [capability]
│   ├── Does it check my real availability?
│   └── Does it work with Google Calendar / Jobber?
├── Does it integrate with my CRM?                       [integration] ★ HIGH
│   ├── Does it work with Jobber?                        ← name the tool
│   ├── Does it work with Housecall Pro?
│   └── Does it work with QuickBooks?
├── How much does an AI receptionist cost?               [pricing]     ★ SATURATED
│   ├── Is there a setup fee?
│   ├── What are the overage charges?                    ← the real question
│   └── Is it cheaper than an answering service?
├── Can it handle multiple calls at once?                [capability]
├── Does it work after hours and weekends?               [capability]
├── Is it legal to record calls?                         [legal]       ★ CANADA-CRITICAL
└── Is it better than an answering service?              [comparison]
```

**Assessment:** the site already answers most of this well on `/ai-receptionist-for-contractors`. The problem is not coverage — it is that ~15 other URLs answer the same tree, and that competitors answer it with data and reviews. **Consolidate; do not expand.**

## Root 2 — Missed calls (the problem, not the product) — **best commercial root**

```
Why am I losing jobs from missed calls?
├── How many calls do contractors actually miss?          [problem-aware]
├── What does a missed call cost me?                      [ROI]  ← CALCULATOR EXISTS
├── Do customers call back if I miss them?                [problem-aware]
├── How fast do I have to call back?                      [speed-to-lead]
├── What is missed call text back?                        [solution-aware]
│   ├── Is a text enough or do I need a real answer?
│   └── Can I set it up myself?                           ← honest answer wins trust
└── Should I hire a receptionist or use a service?        [commercial] ★ HIGH
    ├── What does a receptionist cost per year?
    └── What does an answering service cost?
```

**This root is better than Root 1** — it is problem-aware, less vendor-saturated, and `/tools/missed-call-revenue-calculator` already answers the ROI branch with real math. That tool is the single best-aligned asset on the site.

## Root 3 — Quote and estimate follow-up — **best gap**

```
Why do customers go quiet after I send a quote?
├── How many times should I follow up on an estimate?     [how-to]
├── When should I follow up after a quote?                [how-to]
├── What do I say in a follow-up without being pushy?     [how-to] ← TOOL EXISTS
├── How do I automate estimate follow-up?                 [solution] ★ HIGH, THIN COMPETITION
│   ├── Can I automate it in Jobber?
│   └── Text or email?
└── What's a normal quote close rate for contractors?     [benchmark] ← ORIGINAL RESEARCH OPPORTUNITY
```

**Lowest competitor density of any root in this research.** `/tools/contractor-quote-follow-up-generator` already serves it. This is where to build.

## Root 4 — Ownership and lock-in — **best differentiation**

```
Do I own the AI system I paid for?
├── What happens if I stop paying the agency?             ★ SEVERE
├── Who owns the accounts and API keys?
├── Can another developer take it over?
├── What am I actually buying — software or a service?
├── One-time build vs monthly subscription — which is cheaper?
│   └── How long until a build pays for itself vs $99/mo?  ← CALCULATOR OPPORTUNITY
└── What if the builder disappears?                        ← answer this honestly; it is the real fear
```

**No competitor answers this well because none of them can.** This is the content moat.

## Root 5 — Trust, legality and privacy (Canada-weighted)

```
Is it legal / safe to use AI on customer calls?
├── Do I need consent to record calls in Canada?          [PIPEDA — all-parties]
├── Is it different in the US?                            [state-by-state]
├── Do I need consent to text customers?                  [CASL]
├── Where is my customer data stored?
└── Does it comply with PIPEDA / Loi 25 / PHIPA?          ← competitors already claim this
```

## Root 6 — Implementation

```
How do I actually get this set up?
├── How long does it take?
├── What do I need to provide?
├── Will it break my current phone setup?
├── Who fixes it when it breaks?                          ★ HIGH — the post-burn question
└── Do I need to learn new software?
```

## Root 7 — Custom builds / "can AI do X for my business?"

```
Can AI do <task> for my business?
├── Can AI answer my phone / book jobs / send quotes / chase invoices / ask for reviews
├── What can AI actually automate in a small business?
├── Should I build custom or buy software?
└── What does a custom AI app cost?
```

Well covered by the existing `/resources/can-ai-*` set. Informational, top-funnel, low commercial value — **keep, do not expand.**

---

## Intent classification summary

| Intent type | Roots | Commercial value | Competition | Action |
|---|---|---|---|---|
| Problem-aware | 2, 3 | **High** | **Low-Mod** | **Build here** |
| Ownership / lock-in | 4 | **High** | **Very low** | **Build here — moat** |
| Trust & risk | 1, 5 | High | Moderate | Consolidate + Canada angle |
| Comparison | 1 | Moderate | **Saturated** | Keep 2 pages, merge rest |
| Pricing | 1, 4 | Moderate | **Saturated** | One page only |
| Integration | 1, 6 | **High** | Low | **Build — name the platforms** |
| Implementation | 6 | Moderate | Low | Fold into service pages |
| Informational "can AI…" | 7 | Low | Moderate | Keep, freeze |
| Local | — | Low (no proof) | Low | **Pause until proof exists** |

---

## Answer-format mapping

| Question family | Best format | Existing asset |
|---|---|---|
| What does a missed call cost me? | **Calculator** | ✅ `/tools/missed-call-revenue-calculator` |
| What do I say in a follow-up? | **Generator** | ✅ `/tools/contractor-quote-follow-up-generator` |
| Where am I losing leads? | **Scorecard** | ✅ `/tools/contractor-lead-leak-audit` |
| What should I charge? | **Calculator** | ✅ `/tools/contractor-profit-pricing-calculator` |
| What does my labour actually cost? | **Calculator** | ✅ `/tools/contractor-labor-burden-calculator` |
| Build vs $99/mo — when does it pay back? | **Calculator** | ❌ **build this — directly serves Root 4** |
| Does it sound robotic? | **Real recorded call** | ❌ **highest-value missing asset** |
| Does it work with Jobber? | **Integration page + screenshot** | ❌ missing |
| Do I own it? | **Plain-English ownership page** | ❌ missing |
| Consent / recording law | **Regional guide + comparison table** | ❌ missing |

**The five existing tools already answer five of the ten highest-value question families.** That is a genuinely strong position that the site is currently under-exploiting — the tools are new, buried under 216 pages, and not linked from the commercial pages they should feed.
