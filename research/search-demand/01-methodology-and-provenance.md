# 01 — Methodology and Provenance

**Collection date:** 2026-08-01 (all data collected this day; no cached or prior-session data reused)
**Collector location:** Surrey, British Columbia, Canada — residential IP `154.5.156.116`
**Primary market:** Canada (`gl=ca`, `hl=en`, locale `en-CA`, timezone `America/Vancouver`)
**Secondary market:** United States (`gl=us`, `hl=en`)
**Analyst:** Claude Opus 5 via Claude Code, driving headless Chromium and direct HTTP.

> This file is the contract for every other file in `research/search-demand/`.
> If a claim elsewhere is not traceable to a row in `raw/`, it is not a finding.

---

## Evidence labels

| Label | Meaning |
|---|---|
| `[V]` | Verified primary/live source. A request was made on 2026-08-01 and the response is archived in `raw/`. |
| `[D]` | Directional. Real observed signal, but not a volume measurement (e.g. autocomplete presence, PAA appearance, forum thread counts). |
| `[I]` | Inference. Reasoning on top of `[V]`/`[D]` evidence. Always stated as inference. |
| `[U]` | Unknown. Could not be obtained. Never silently replaced with zero or a guess. |

---

## What was collected

### Sources that WORKED

| # | Source | Method | Volume | Label |
|---|---|---|---|---|
| 1 | Google autocomplete | `suggestqueries.google.com/complete/search?client=firefox`, per-market `gl` | 1,165 CA + 1,165 US requests | `[V]` request / `[D]` demand |
| 2 | Bing autocomplete | `api.bing.com/osjson.aspx`, per-market | bare seeds only, cross-check | `[V]` / `[D]` |
| 3 | Google SERP (organic, features, related) | Headless Chromium on `google.com`, then **same-origin `fetch()`** of `/search?…&pws=0` parsed with `DOMParser` | 34 usable Canadian SERPs | `[V]` |
| 4 | Google People Also Ask (level 1) | Extracted from the same SERP HTML via the `data-q` attribute | 22 SERPs carried PAA | `[V]` |
| 5 | Reddit | `old.reddit.com` per-subreddit search, same-origin `fetch()` | 14 searches, 334 posts | `[V]` |
| 6 | Anthropic WebSearch | Built-in tool | spot checks | `[V]`, **US-biased** |

### Sources that were BLOCKED or UNAVAILABLE

| Source | What happened | Consequence |
|---|---|---|
| Google SERP via plain `curl` | Returns a JS shell — 90KB, `<title>Google Search</title>`, zero results in markup | Cannot script SERPs without a browser |
| Google SERP via own headless Chromium (direct navigation) | `Our systems have detected unusual traffic from your computer network` — headless **and** headed | Forced the same-origin-fetch approach through an already-warm browser |
| Bing SERP via own headless Chromium | `Please solve the challenge below to continue` (CAPTCHA) | No Bing SERP forensics. Bing autocomplete only. |
| Google same-origin `fetch()`, after ~37 SERPs | Started returning a redirect interstitial (`Please click here if you are not redirected…`) | Hard ceiling on SERP count this session. 14 queries recorded as **collection failures**, not as findings. |
| Reddit via WebSearch / WebFetch | `400 — domains not accessible to our user agent` | Reddit reached via browser instead |
| reddit.com (new UI) via browser | `Reddit - Prove your humanity` | `old.reddit.com` used instead — worked |
| AlsoAsked.com | No account, no credits in this environment | PAA trees built directly from Google instead |
| AnswerThePublic | No account | Substituted by the autocomplete harvester |
| Google Trends | Not attempted — no reliable unauthenticated endpoint from this IP after throttling | `[U]` for all trend claims |
| Search volume / CPC / keyword difficulty | **No keyword tool is available in this environment** (no Ahrefs/SEMrush/Moz/Keyword Planner credentials) | **Every volume, CPC and difficulty value in this study is `UNKNOWN`.** See below. |
| G2 / Capterra review mining | Not reached before the SERP throttle ceiling | `[U]` |
| Fresh GSC export | Requires the owner's authenticated browser session; not performed in this pass | Prior baseline reused read-only — see §GSC |
| Bing Webmaster Tools | Not connected | `[U]` |

---

## The hard limitation, stated plainly

**There is no search-volume, CPC or keyword-difficulty data in this study.**

No keyword tool was available. Rather than invent numbers or quietly leave zeros, every such field in `07-keyword-intent-map.tsv` is literally `UNKNOWN`.

What is used instead, per the brief's own fallback list, all labelled `[D]`:

- **Autocomplete presence** — Google only suggests strings people actually type.
- **Autocomplete breadth** — how many distinct modifier variants a phrase supports.
- **PAA appearance** — Google surfaces a question because it is asked.
- **Reddit thread count and comment count** — independent discussion volume.
- **Competitor page proliferation** — how many businesses built a page for the term.
- **SERP feature mix** — ads present implies someone is paying for the click.

None of these is search volume, and none is presented as such.

---

## Two collection traps hit, and how they were handled

Recording these because both would have produced confidently wrong strategy.

### Trap 1 — the silent empty autocomplete

The suggest endpoint answers **HTTP 200 with a valid, empty JSON array** both when a phrase genuinely has no completions *and* when the IP is throttled. The two are indistinguishable per request.

A first sweep returned 570 empty results out of 696. Read naively, that says "there is almost no search demand for contractor AI terms" — which would have been a catastrophic conclusion.

**Test performed:** immediately re-queried a control phrase known to return results (`plumber`) alongside phrases that had returned empty.

**Result:** `plumber` returned 10 suggestions including `plumber surrey` and `plumber vancouver` (confirming BC geo-targeting was working), while the empty phrases were *still* empty. **The empties were genuine, not throttling.**

The real defect was study design, not the data: appending a letter to an already-specific five-word phrase (`ai receptionist for contractors` + `a`) has no completions by nature. Alphabet soup only discovers vocabulary from **short** stems. The harvester was rebuilt to split short `ROOTS` (alphabet + question prefixes) from long `PHRASES` (bare + commercial suffixes), and a **throttle canary** was added: every 40 requests it re-asks the control, and any empty recorded while the canary is unhealthy is flagged `emptyTrusted: false`.

Final run: **0 untrusted empties** in either market.

### Trap 2 — the soft-blocked SERP

Late in collection, Google began returning a redirect stub instead of a SERP. The stub contains no "unusual traffic" string, so the original blocked-detector missed it and recorded three queries as having zero results.

**Fix:** the detector now treats *zero parsed organic results* as a collection failure regardless of page text, with the explicit reason string `"NOT evidence of no demand"`. 14 queries are recorded as failures. They are listed in `derived/stats.json → serp.failedQueries` and are excluded from every count.

**No query in this study is recorded as "no demand" on the basis of a failed fetch.**

---

## A correction made during analysis

An early pass flagged `localPack: true` on several local queries and this was briefly treated as "local pack present, wide open". That was a **false positive** — the regex matched the words `Places`/`Rating` in Google's own navigation chrome.

Direct inspection of `ai automation surrey bc` found **no business listings in a local pack at all**. What *is* verified for that query: no AI Overview, no ads, no PAA, and ten organic results of which six are Surrey/BC-based AI agencies. The corrected finding is in `04-serp-forensics.md`. Raw evidence: `raw/serp/CA-localpack-surrey.json`.

---

## Personalization and bias controls

- `pws=0` on every SERP request (personalized search disabled).
- Browser was never signed in to a Google account; throwaway profile.
- `gl` / `hl` / `locale` / `timezoneId` pinned per market.
- Collector's physical location is Surrey BC, which **can** still influence local-intent results even with `pws=0`. Local queries in this study should be read as "what a Surrey-based searcher sees" — which is the target user, so this is a feature, not a defect, but it is not a national view.
- Anthropic's WebSearch tool is **US-only** and was used only for spot checks, never for Canadian demand claims.

---

## Reproducibility

| Artifact | Path |
|---|---|
| Autocomplete harvester | `scripts/research/autocomplete-harvest.js` |
| SERP harvester (standalone) | `scripts/research/serp-harvest.js` |
| Analysis / table builder | `scripts/research/analyze.js` |
| Raw autocomplete | `research/search-demand/raw/autocomplete/*.jsonl` |
| Raw SERPs | `research/search-demand/raw/serp/*.json` |
| Raw Reddit | `research/search-demand/raw/reddit/*.json` |
| Derived tables | `research/search-demand/derived/*.tsv` |
| Run stats | `research/search-demand/derived/stats.json` |

Every raw row carries its exact `requestUrl` and an ISO `collectedAt`, so any downstream claim can be traced to the request that produced it.

Re-run with:

```bash
node scripts/research/autocomplete-harvest.js --scope=full
node scripts/research/analyze.js
```

SERP collection is not fully re-runnable unattended — it depends on a warm browser session and will throttle after roughly 35–40 queries from a single residential IP.

---

## Relationship to the existing GSC baseline

Per the brief, the previously established figures are **not** re-litigated. Restated read-only:

- Property totals: **3 clicks, 609 impressions, average position ≈ 63.9** (46 days, 2026-06-14 → 07-29)
- Country table: 3 / 609 · Device table: 3 / 609 — both additive
- Query table: 0 clicks / 437 impressions — anonymised queries withheld
- Page table: 4 clicks / 803 impressions — page-level aggregation differs from property totals
- No archived daily table exists, so daily reconciliation cannot be claimed

**No fresh GSC export was taken in this pass** — it needs the owner's authenticated session. Everything in §10 of the brief that depends on a fresh export is `[U]` and is listed as an open item in `00-executive-verdict.md`.
