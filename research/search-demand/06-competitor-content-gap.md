# 06 — Competitor Content Gap

**Collected:** 2026-08-01 · derived from 34 live Canadian SERPs
**Raw:** `derived/competitors.tsv` (192 distinct hosts, 47 Canadian)
**Label:** `[V]` for who ranks where. `[I]` for the strategic reading. Competitor pricing pages were **not** individually fetched — the SERP throttle ceiling hit first — so any claim about a competitor's pricing or feature set is `[U]` unless it appeared in a SERP snippet.

---

## 1. The competitive picture is not the one the brief assumed

The brief lists Jobber, Housecall Pro, ServiceTitan, Podium, Birdeye, Smith.ai, Ruby, Rosie, Goodcall, Avoca as the competitor set. **On live Canadian SERPs for the queries this business actually wants, almost none of them appear.**

Across 34 SERPs:

| Named in the brief | SERPs ranked on |
|---|---:|
| getjobber.com | 1 |
| workiz.com | 2 |
| birdeye.com | 1 |
| housecallpro.com | 0 |
| servicetitan.com | 0 |
| podium.com | 0 |
| smith.ai / ruby.com | 0 / 1 |
| rosie / goodcall / avoca | 0 |

The actual page-one occupants are three groups nobody named:

### Group A — Reddit (30 of 34 SERPs)
The dominant entity in this space. Not a competitor for customers; a competitor for **attention and trust**, and the likeliest source an AI Overview cites.

### Group B — Canadian software directories
`capterra.ca` (6 SERPs), `getapp.ca`, `softwareadvice.com`. These own every "alternatives" and "CRM" query. They are effectively unbeatable for a small site and are the main reason `jobber alternatives` and `housecall pro alternatives` are scored **monitor**, not attack.

### Group C — small Canadian AI agencies ⭐ the real competitors

Forty-seven `.ca` domains appeared. The ones that matter:

| Domain | Where they rank | Positioning (from their own SERP snippet) |
|---|---|---|
| **adaptai.ca** | 3 local SERPs | *"helps Vancouver and Surrey small and medium businesses cut costs with practical AI — automation, chatbots, custom tools, data, and training"* |
| **automatebc.ca** | `ai automation surrey bc` #1 | *"Based in Surrey, BC… AI-powered back office automation"* |
| manndigital.ca | `ai automation surrey bc` | *"Surrey-based web design and AI automation agency serving BC"* |
| buildgravity.ca | `ai automation surrey bc` | *"Surrey-based with Metro Vancouver reach"* |
| signalos.ca, townmedialabs.ca | `ai automation surrey bc` | — |
| futureforgeaisolutions.ca | 2 SERPs | AI automation + AI consulting for contractors |
| signalandform.ca, adivor.ca, ai-contractor.ca | `ai automation for contractors` | — |
| mihronai.ca, voxara.ca, rasai.ca | `how much does an ai receptionist cost` | AI receptionist, Canadian |
| askbenny.ca, voxs.ca | AI answering service | *"AI Phone Answering for General Contractors"* |
| logicpros.ca, debutmarketing.ca, automatelocal.ca | `contractor office automation` | — |
| rundo.ca | `housecall pro alternatives` | — |
| frameworkai.ca | `ai company for contractors canada` #1 | — |

**`adaptai.ca` is the single most direct competitor** — same city, same buyer, same service, ranking on all three local queries.

**This is the finding that should change planning.** The competitive threat is not Jobber. It is roughly a dozen small BC/Canadian AI agencies who got to the local SERPs first, with the same pitch.

---

## 2. Where the gaps actually are

### Gap 1 — Nobody publishes prices `[I]`
`how much does an ai receptionist cost` has an AI Overview, no ads, and three Canadian competitors ranking. The PAA is entirely cost-led (*"Is an AI receptionist worth it?"*, *"How much does AI reception cost?"*). This business already publishes real CAD ranges ($1,500 floor, $3,500–$7,500 band) from a canonical registry. Publishing a straight answer where the category hedges is a genuine, low-effort differentiator.
*Caveat: not verified that each competitor hides pricing — their pages were not fetched. `[U]`.*

### Gap 2 — Nobody answers the objections
The objection cluster (`customers hate automated messages`, `can i keep my phone number answering service`, `who owns my customer data software`, `contractor software data export`) returns generic, non-contractor pages. `crtc.gc.ca` ranking on the phone-number question shows there is no vendor-authored Canadian answer. Meanwhile Reddit shows the objections are live and emotional. **Nobody is speaking to the fear.**

### Gap 3 — Working free tools
Competitors surface as brochure sites. Across 34 SERPs the only calculator-like results were `roofsnap`/`roofr` (roof measurement) and a `missed call text back calculator` in Bing autocomplete. This business already ships **five working, no-login tools** — the strongest asset it has, and the one thing on this list a brochure site cannot copy in an afternoon.

### Gap 4 — Trade specificity
The Canadian AI agencies are horizontal ("small and medium businesses", "back office automation"). Only `askbenny.ca` ("General Contractors") is trade-specific. **Roofing/exteriors specificity is genuinely open.**

### Gap 5 — Setup-and-configuration, not replacement
Reddit's complaint is *"I'm really disappointed with Jobber"* + `how to cancel jobber` — software bought and never properly configured. Nobody on these SERPs sells "we'll make the tools you already pay for actually work". That is closer to the real job-to-be-done than "replace your CRM".

---

## 3. Where NOT to fight

| Battle | Why not |
|---|---|
| `jobber alternatives` / `housecall pro alternatives` | `capterra.ca` + `getapp.ca` + vendor domains. Directory SEO; unwinnable at this size. |
| `roofing estimating software` | `roofr`, `roofsnap`, `stackct` own it, and it is a product category this business does not sell. |
| Any "AI consultant" query | `bdc.ca` (a federal crown corporation) ranks #1. Diluted, non-trade intent. |
| "Canadian" as a differentiator vs Jobber | Jobber is Canadian. PAA literally asks *"Is Jobber a Canadian company?"* |
| National generic AI-automation terms | 94% carry an AI Overview. |

---

## 4. Not done

Per the brief's §12 list, the following were **not** completed and are `[U]`: individual competitor keyword footprints, their comparison pages, backlink profiles, their free tools, their FAQ topics, hidden-pricing audit, cancellation-complaint mining, and Canadian compliance gaps. All required fetching each competitor site, which the SERP throttle ceiling prevented this session.

The competitor **set** above is verified from live SERPs. The competitor **analysis** is one pass short.
