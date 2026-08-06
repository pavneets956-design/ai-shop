# 12 — SEO Strategy

**Researched:** 2026-07-31

---

## Strategic frame

This site's SEO problem is **not** coverage. 216 URLs across 11 page types is more coverage than the domain's authority can support. The problems are, in order:

1. **Signal dilution** — 20 URLs on one intent, 7 on another.
2. **No first-party evidence** — the thing Google's helpful-content and E-E-A-T systems are explicitly built to reward, and the thing this site has none of.
3. **No entity** — no external corroboration that the business exists.

The strategy is therefore **subtract, prove, then add** — in that order. Nothing here recommends new page production before Stage 2.

---

## 1. Technical SEO

### Already correct — do not touch
- `robots.txt` — explicit per-agent allowlist for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-Web, Google-Extended, Applebot-Extended, Bingbot; sensitive paths disallowed; `Host` + `Sitemap` present. **Better than most sites of any size.**
- `sitemap.xml` — complete, priority-tiered, generated from the same registry as content, so it cannot drift.
- `llms.txt` — exists, structured, registry-generated.
- **Registry architecture** (`lib/data/*.ts` → `registry.ts`) — makes consolidation a data edit rather than a routing project. This is the reason the plan below is cheap to execute.

### Must fix
| Priority | Issue | Action |
|---|---|---|
| **P0** | **Contradictory prices in body copy, JSON-LD and `llms.txt`** (`01-current-site-audit.md` §3.1) | Establish one pricing source of truth in the data layer; make every surface read from it. This is corrupting machine-readable data *today*. |
| **P0** | **20-URL receptionist cannibalization** | Consolidate to 3 with 301/308 — **after** GSC baseline |
| **P1** | 7 cost pages | Consolidate to 1 |
| **P1** | No canonical audit performed | Full crawl required — not run this phase |
| **P2** | Redirect chains / broken links / orphans unknown | Full crawl required |
| **P2** | Core Web Vitals unmeasured | Run PSI + CrUX against production |
| **P2** | Image alt-text coverage unknown | Full crawl required |

### Not verifiable in this phase
Redirect chains, broken links, orphan pages, canonical correctness, OG completeness, alt-text coverage, CWV field data, JS rendering parity and log-file behaviour all require a crawler (Screaming Frog / Sitebulb) plus GSC. **Stated as gaps, not estimated.** Stage 0 of the roadmap.

---

## 2. URL and consolidation strategy

**Principle: redirect, never delete.** Every consolidated URL 301/308s to its canonical parent. The domain has been live long enough that URL history has non-zero value, and there is currently no baseline to measure a loss against — which is why Stage 0 (GSC export) strictly precedes Stage 1.

| From | To | Count |
|---|---|---:|
| Receptionist variants | `/ai-receptionist-for-contractors` | 9 |
| Receptionist explainers | `/ai-receptionist` | 2 |
| All cost pages | `/pricing` | 7 |
| Chatbot variants | `/ai-chatbot-development` | 3 |
| Follow-up variants | `/quote-follow-up` *(new)* | 5 |
| Missed-call variants | `/missed-calls` *(new)* | 2 |
| Generic automation synonyms | `/ai-automation-agency` | 3 |

**Keep URL conventions as-is.** Slugs are clean, readable and keyword-appropriate. The problem is quantity, not format.

---

## 3. On-page — the six pages that matter

For each: primary keyword, intent, and **the reason it deserves to rank** — which is the test the current pages fail.

### `/` — Homepage
- **Intent:** brand + problem-aware
- **H1:** keep the existing "Missed calls, late quotes, invoice chasing — handled." It matches customer language well.
- **Must add:** the ownership claim, and **proof above the fold**
- **Deserves to rank because:** it will be the only site in the category that shows a real recorded call and states plainly what you own. *Currently it deserves to rank for nothing — there is no evidence on it.*

### `/ai-receptionist-for-contractors` — primary money page
- **Primary:** AI receptionist for contractors · **Secondary:** contractor answering service, trades call answering
- **Keep:** the existing H2 structure and FAQ block — both are well-targeted
- **Must add:** real recorded call; replace the hypothetical fencing example with a real client or label it explicitly as an illustration; add an honest "vs. Jobber's $99 add-on" section
- **Deserves to rank because:** it will answer the post-purchase question no vendor answers

### `/missed-calls` — NEW pillar
- **Primary:** missed calls contractors · **Intent:** problem-aware
- **Anchor:** the existing missed-call revenue calculator
- **Deserves to rank because:** it will cite the Invoca 27% figure *with its methodology limitations stated* and refuse the unverifiable 62% number everyone else repeats. In a market of recycled statistics, being the one honest source is a genuine ranking argument.

### `/quote-follow-up` — NEW pillar · **best opportunity in the plan**
- **Primary:** estimate follow up contractors
- **Anchor:** the existing quote-follow-up generator
- **Deserves to rank because:** thinnest competition found in this research, and a working free tool beats another advice article

### `/what-you-own` — NEW · **the moat**
- **Primary:** do I own the automation / AI agency vendor lock-in
- **Content:** what transfers, whose accounts, what happens if you leave, what happens if the builder disappears
- **Deserves to rank because:** **no subscription competitor can publish this honestly.** Structural, not temporary, advantage.

### `/integrations/jobber` — NEW
- **Primary:** Jobber integration / connect Jobber
- **Deserves to rank because:** buyers search by their tool's name, and a screenshot of a booking actually landing in Jobber is proof, not copy

---

## 4. Internal linking

Currently hub-and-spoke by page type — structurally fine, but the **five free tools are orphaned from the commercial funnel**, which is the single biggest on-site linking miss.

Fix:
- Every commercial page links to its matching tool (`/ai-receptionist-for-contractors` → missed-call calculator; `/quote-follow-up` → follow-up generator).
- Every tool links back to its pillar and to `/create`.
- Every trade page links to the tools, the pillar and `/what-you-own`.
- Breadcrumbs sitewide with `BreadcrumbList` schema.

---

## 5. Off-page and authority

Current backlink profile: **unknown** (no accessible source). Assume near-zero.

**Legitimate, non-spammy opportunities, ranked by realism:**

| Opportunity | Effort | Value | Note |
|---|---|---|---|
| **The 5 free tools** | Already built | **Highest** | Genuinely linkable. Currently under-promoted — this is the cheapest win available |
| **Original response-time / quote-close benchmark study** | High | **Highest** | The only route to real authority. Needs first-party data from delivered work |
| BC Construction Association, regional HBAs, Surrey Board of Trade | Low | High | Local, credible, relevant |
| Software directories — Clutch, DesignRush, GoodFirms | Low | Moderate | Also serves entity building |
| Trade podcasts / newsletters | Moderate | Moderate | Founder story is genuinely differentiated |
| Client case studies | Moderate | High | Clients link back |
| Integration marketplace listings (Jobber, Zapier) | Moderate | Moderate | Also proof of integration |

**Explicitly excluded:** bulk directory submission, guest-post networks, paid links, PBNs. The domain cannot survive a manual action and does not need one to compete at this scale.

---

## 6. Measurement

**Cannot begin without Stage 0.** Baseline to capture before any change:
- GSC: 16 months of queries, impressions, positions, pages
- Indexed URL count and coverage state
- Current conversion events on `/create`
- Ranking snapshot for the ~30 terms that matter

**Leading indicators** (weeks): impressions on consolidated canonical URLs; tool page sessions; branded search appearing at all.
**Lagging** (quarters): `/create` submissions attributed to organic; booked builds; AI-engine citations.

**The honest warning:** consolidating 108 URLs into ~30 will make total impressions **fall** before anything improves. That is the intended mechanism, not a regression — signal concentrating rather than dispersing. Without the Stage 0 baseline it will be impossible to tell that from an actual mistake, which is precisely why the baseline is non-negotiable.
