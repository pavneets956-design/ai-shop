# 04 — SERP Forensics

**Collected:** 2026-08-01 · Google `gl=ca&hl=en&pws=0` · Surrey BC residential IP
**Coverage:** 48 queries attempted · **34 usable** · 14 collection failures (listed, excluded from all counts)
**Raw:** `raw/serp/CA-batch{1,2,3,4}.json`, `raw/serp/CA-localpack-surrey.json` · **Table:** `derived/serp-summary.tsv`

---

## 1. The headline number

| Feature | Count | Share of 34 |
|---|---:|---:|
| **AI Overview present** | **32** | **94%** |
| Reddit ranking organically | 30 | 88% |
| People Also Ask present | 22 | 65% |
| At least one `.ca` host on page 1 | 24 | 71% |
| **Paid ads present** | **2** | **6%** |

Two facts dominate everything else in this study.

**AI Overview is on 94% of these SERPs.** Google is answering the contractor's question on the results page. For informational and problem-aware queries, ranking #1 organically increasingly means ranking below a synthesised answer that already resolved the question. A content strategy built on "publish a guide per question" is being repriced downward in real time — and this business publishes a lot of guides.

**Ads appear on only 6%.** In a market with genuine, well-understood commercial value, someone bids. Two ads across 34 commercially-framed contractor-AI queries in Canada says the paid market here is thin. Read that two ways: little competition to outspend, and little proof anyone is profitably buying these clicks.

Only **two** queries had no AI Overview: `ai automation surrey bc` and `ai consultant surrey`. Both are local.

---

## 2. The clearest opening: local

`ai automation surrey bc` — **no AI Overview · no ads · no PAA**

Page one, in order: `automatebc.ca` · `adaptai.ca` · `manndigital.ca` · `buildgravity.ca` · `signalos.ca` · `townmedialabs.ca` · `jazzedtechnology.com` · `aandhsolutions.com` · `ddaiagency.com` · `raxxos.com`

Their own descriptions:
- automatebc.ca — *"Based in Surrey, BC, we help Canadian businesses save time and reduce costs"*
- adaptai.ca — *"helps Vancouver and Surrey small and medium businesses cut costs with practical AI"*
- manndigital.ca — *"Surrey-based web design and AI automation agency serving businesses across British Columbia"*
- buildgravity.ca — *"Surrey-based with Metro Vancouver reach"*

### Correction to an earlier reading

An initial pass flagged a local pack on these queries. **That was a false positive** — the detector matched the words "Places"/"Rating" in Google's navigation chrome. Direct DOM inspection of the rendered page found **no business listings in a local pack**. The corrected, verified position is above: no AIO, no ads, ten organic results, six of them Surrey/BC AI agencies.

### What this actually means

It is not an empty field — it is a **contested local niche with six direct competitors**, none of which is a national brand and none of which is contractor-specialised. That is a materially better fight than the national queries, where the answer is given away by an AI Overview before anyone scrolls.

`adaptai.ca` is the strongest local competitor, ranking on three separate local SERPs (`ai automation surrey bc`, `ai consultant surrey`, `business automation consultant near me`).

`business automation consultant near me` returns related searches that name the geography explicitly: *"business automation consultant near surrey, bc"*, *"business automation consultant near vancouver, bc"*.

---

## 3. Reddit owns this space

Reddit ranks organically on **30 of 34** SERPs — more than any other domain by a factor of five.

| Host | SERPs | Canadian |
|---|---:|---|
| reddit.com | 30 | no |
| capterra.ca | 6 | yes |
| myquoteiq.com | 6 | no |
| facebook.com | 4 | no |
| roofr.com | 3 | no |
| **adaptai.ca** | **3** | **yes** |
| relayfi.com | 2 | no |
| buildops.com | 2 | no |
| futureforgeaisolutions.ca | 2 | yes |
| contractoraccelerator.com | 2 | no |
| contractorrevenuehub.com | 2 | no |

192 distinct hosts appeared across the 34 SERPs; **47 were `.ca` domains**. This market is fragmented — no vendor owns it — but Reddit owns the *answer layer* beneath the AI Overview.

Implication: for most of these queries the realistic organic prize is not position 1 — it is being the source an AI Overview cites, or being present in the Reddit thread that ranks.

---

## 4. Three semantic traps

Queries that sound perfectly on-topic and are not. Each was caught by reading the PAA Google returned, not by guessing.

### `contractor review requests` — wrong audience entirely
PAA returned: *What is a contractor review?* · *What not to say to your contractor?* · *What is the most common contractor mistake?* · *How do I ask for a rate increase as a contractor?*

Google reads this as (a) a homeowner reviewing a contractor and (b) an IT/staffing contractor asking for a raise. Organic is `trustedpros.ca`, `chba.ca`, `homestars.com`, `worksafebc.com`, `bchousing.org` — homeowner directories and regulators. **Avoid.**

### `contractor office automation` — wrong industry
PAA returned: *What are the 4 types of workplace automation?* · **What is an automation contractor?** · *What are examples of office automation?*

"Automation contractor" is an established term for an industrial/electrical controls installer. Google is serving that industry. **Avoid.**

### `ai consultant for contractors` — diluted
Organic #1 is `bdc.ca` (Business Development Bank of Canada). PAA includes *What is the 30% rule for AI?*. Generic AI-consulting intent with no trade specificity. **Avoid.**

**Partial trap:** `ai tools for contractors` — PAA includes *What is the best AI tool for contracts?* (contract-law software). Has both AIO and ads. Usable as a `/tools` hub target, not as a money page.

**Also avoid:** `done for you business automation` — zero contractor results and zero Canadian results across the whole page (`doneforyou.com`, `lamaquina.studio`, `automis.ai`, `ivconsulting.in`, `lunasystems.com.au`). This is internal vocabulary, not customer vocabulary.

---

## 5. Verdicts

Full table with evidence: `07-keyword-intent-map.tsv`.

| Verdict | n | Queries |
|---|---:|---|
| **Attack now** | 7 | `ai automation surrey bc` · `ai consultant surrey` · `business automation consultant near me` · `how much does an ai receptionist cost` · `contractor software without subscription` · `roofing quote follow up` · `ai for roofing companies` |
| **Build a free tool** | 5 | `quote follow up for contractors` · `customer did not respond to estimate` · `missed call text back` · `contractor missed calls` · `estimate follow up template` |
| **Attack after proof** | 4 | `ai receptionist for contractors` · `ai answering service for contractors` · `ai company for contractors canada` · `jobber too expensive` |
| **Fold into existing** | 7 | the objection cluster + `ai tools for contractors` · `how to automate a contracting business` · `contractor invoice reminders` |
| **Monitor** | 6 | `jobber alternatives` · `housecall pro alternatives` · `contractor crm for small business` · `contractor software alternatives` · `problems with jobber` · `automated review requests for contractors` |
| **Avoid** | 6 | `contractor review requests` · `contractor office automation` · `ai consultant for contractors` · `done for you business automation` · `roofing estimating software` · `ai called my customer` |

---

## 6. Collection failures — not findings

These 14 attempts returned a redirect stub after the IP was throttled. They are **not** evidence of low demand and are excluded from every percentage above.

`estimate follow up template` · `how many times should a contractor follow up` · `unsold estimate follow up` · `ai automation vancouver bc` · `ai receptionist surrey bc` · `ai automation langley bc` · `automation consultant abbotsford` · `ai automation for small business surrey` · `quote follow up software` · `contractor missed calls` *(and 3 duplicate retries)*

The five uncollected **local** queries are the highest-value gap in this study, because local is where the only two AI-Overview-free SERPs were found. Re-running them is the first recommended action of any follow-up pass.
