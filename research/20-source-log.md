# 20 — Source Log

**All research conducted 2026-07-31.** Search region: US (the available search tool is US-region only — a stated limitation affecting Canadian query results, noted below).

---

## 1. Method

| Technique | Tool | Notes |
|---|---|---|
| Live web search | US-region web search | 24 distinct queries |
| Live page fetch | HTTP fetch → markdown → extraction | 3 successful, 3 blocked |
| Direct HTTP | `curl` against production | sitemap, robots, llms.txt, 4 HTML pages |
| Repository inspection | Local file read + knowledge graph query | `lib/data/registry.ts`, page-type system |
| Pattern extraction | ripgrep over saved HTML | pricing contradiction verification |

**No production change of any kind was made.** No page, redirect, sitemap entry, metadata field, GSC setting or deployment was touched. Repository working tree unchanged apart from the new `research/` directory.

---

## 2. Queries run

| # | Query | Engine | Region | Result |
|---|---|---|---|---|
| 1 | AI receptionist for contractors pricing 2026 | web | US | 10 results |
| 2 | answering service for contractors cost per month | web | US | 7 results |
| 3 | missed call text back contractors software | web | US | 10 results |
| 4 | reddit contractors missing calls while on the job losing leads | web | US | 10 results (mostly GHL spam) |
| 5 | speed to lead study calling leads within 5 minutes conversion research | web | US | 9 results |
| 6 | best AI phone answering service small business 2026 comparison | web | US | 9 results |
| 7 | contractors answering service AI receptionist experience worth it | web | **reddit.com** | **BLOCKED** |
| 8 | hired AI automation agency small business bad experience wasted money | web | **reddit.com** | **BLOCKED** |
| 9 | plumber HVAC office admin overwhelmed answering phones scheduling | web | **reddit.com** | **BLOCKED** |
| 10 | Canada call recording consent law two party PIPEDA business phone AI | web | US | 9 results |
| 11 | "AI automation agency" niche saturated 2026 small business clients | web | US | 6 results |
| 12 | Jobber Housecall Pro ServiceTitan built-in AI receptionist feature 2026 | web | US | 6 results |
| 13 | contractortalk forum answering service phone calls office help discussion | web | US | 7 results |
| 14 | Smith.ai Ruby receptionist reviews complaints contractors G2 Trustpilot | web | US | 8 results |
| 15 | AI receptionist reviews "sounds robotic" customers hang up complaints | web | US | 9 results |
| 16 | contractor software Canada Jobber pricing CAD small trades business | web | US | 8 results |
| 17 | custom AI software development small business own the code vs SaaS subscription 2026 | web | US | 8 results |
| 18 | "do I own it" OR "vendor lock-in" AI automation agency monthly retainer objection | web | US | 9 results |
| 19 | CASL Canada automated SMS text message consent rules business express consent 2026 | web | US | 7 results |
| 20 | how does an AI receptionist work can it transfer to a real person integrate CRM | web | US | 8 results |
| 21 | home service contractors miss percentage of inbound calls statistic study source | web | US | 9 results |
| 22 | British Columbia construction trades small business count statistics 2026 | web | US | 7 results |
| 23 | AI receptionist Canada provider Canadian small business bilingual French Quebec | web | US | 9 results |
| 24 | "AI receptionist" vs "answering service" search interest which term do businesses use | web | US | 8 results |
| 25 | local AI automation agency near me hire someone to set up AI for my business | web | US | 9 results |
| 26 | contractor lost job because did not call back estimate follow up forgot quote | web | US | 6 results |
| 27 | "AI Built By Hand" OR "Handbuilt AI Studio" Surrey BC | web | US | **0 relevant — key finding** |
| 28 | small business owner tired of monthly subscriptions software fatigue SaaS too many tools | web | US | 7 results |
| 29 | which trades adopt AI receptionist most HVAC plumbing roofing electrical adoption 2026 | web | US | 7 results |
| 30 | AI answering service emergency call after hours HVAC plumbing 24/7 demand | web | US | 9 results |
| 31 | home services market size by state Texas Florida California contractors 2026 | web | US | 8 results |
| 32 | Google Trends "AI receptionist" search growth trend 2025 2026 rising | web | US | 5 results |
| 33 | contractor bought AI chatbot never used it setup problems abandoned software trades | web | US | 6 results |
| 34 | virtual receptionist vs AI receptionist search volume keyword difficulty SEO | web | US | 6 results |
| 35 | Google Business Profile service area business rules AI agency no storefront 2026 | web | US | 8 results |
| 36 | "you own it" OR "no monthly fees" AI automation positioning one-time build | web | US | 10 results |
| 37 | AI Overviews generative engine optimization getting cited by ChatGPT Perplexity 2026 | web | US | 8 results |

## 3. Direct fetches

| URL | Result |
|---|---|
| `aibuiltbyhand.com/` | ✅ 200 — full transcription |
| `aibuiltbyhand.com/ai-receptionist-for-contractors` | ✅ 200 — headings, FAQ, proof audit |
| `aibuiltbyhand.com/sitemap.xml` | ✅ 200, 40,257 bytes → **archived** `raw/site-sitemap-2026-07-31.xml` |
| `aibuiltbyhand.com/robots.txt` | ✅ 200 — full text captured |
| `aibuiltbyhand.com/llms.txt` | ✅ 200, 46.3 KB → **archived** `raw/site-llms-2026-07-31.txt` |
| `aibuiltbyhand.com/ai-business-system` | ✅ 200 → pricing contradiction verified |
| `aibuiltbyhand.com/pricing` | ✅ 200 |
| `aibuiltbyhand.com/ai-receptionist` | ✅ 200 |
| `invoca.com/blog/how-much-missed-sales-calls-cost...` | ✅ — provenance of the 27% statistic established |
| `contractortalk.com/threads/answering-the-phone.64814/` | ❌ 307 → `tollbit.` → **HTTP 402 Payment Required** |
| `contractortalk.com/threads/how-should-i-take-phone-calls.36150/` | ❌ same |

---

## 4. Access blockers — and their effect on this research

| Blocker | Effect | Severity |
|---|---|---|
| **Reddit blocked to the research user agent** | No unfiltered contractor discussion. Primary voice-of-customer source unavailable | **High** |
| **ContractorTalk paywalled (402)** | Second-choice VoC source unavailable | **High** |
| **No keyword tool / Keyword Planner access** | **All volume, difficulty, CPC and trend columns are blank.** Nothing was estimated | **High** |
| **No Google Search Console access** | No ranking baseline, no query truth, no impression data. Named as blocker #1 in the executive verdict | **High** |
| **No first-party analytics access** | No conversion data per page | Medium |
| **No SERP-scraping capability** | PAA, autocomplete and related-searches captured only by proxy (competitor FAQs, article H2 structure) | Medium |
| **Search tool is US-region only** | Canadian SERP results not directly observable; Canadian findings derived from Canadian-domain sources found via US search | Medium |
| **No backlink tool** | Competitor authority and own link profile unknown | Medium |
| **No site crawler run** | Redirect chains, orphans, canonicals, alt text unaudited | Medium |

**Consequence, stated plainly:** the *strategic* conclusions in this report rest on verified structural evidence — site inventory, competitor pricing and bundling, regulatory facts, entity absence, and the site's own contradictions. The *page-level keyword prioritisation* rests on reasoning, not measurement. Both are labelled as such throughout. This is why the gate verdict is NOT READY rather than APPROVED.

---

## 5. Sources cited (grouped)

**Own site (primary, live):** aibuiltbyhand.com — `/`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/ai-receptionist-for-contractors`, `/ai-business-system`, `/pricing`, `/ai-receptionist`; repository `lib/data/registry.ts`

**Regulatory (primary / authoritative):** Office of the Privacy Commissioner of Canada · Canadian Chamber of Commerce (CASL) · BC Construction Association Stat Pack Spring 2026 · Vancouver Regional Construction Association · Job Bank Canada

**Competitor & category pricing:** getaira.io · dolfyn.ai · getnextphone.com · oncallclerk.com · pipelineon.com · callbirdai.com · wildrunai.com · ai-receptionist.com · retellai.com · upfirst.ai · ringly.io · withallo.com · dapta.ai · nextiva.com · cloudtalk.io · serviceagent.ai · frontdeskfred.com · ever-help.com · avoca.ai · housecallpro.com · answerourphone.com · vertexhub.app

**Platform bundling:** theaitrades.ai · korekomfortsolutions.com · pinkcallers.com · fieldproxy.com · golmtech.solutions

**Canadian competitors:** mihronai.ca · voicefleet.ai · voxify.ca · dialbox.ca · polarisvoice.ca · callin.io

**Local Metro Vancouver:** adaptai.ca · buildgravity.ca · mspcorp.ca · fusioncomputing.ca

**Statistics & studies:** invoca.com · insidesales.com · leadangel.com · caseyresponse.com · contractorincharge.com · calljolt.com · hicira.com · agentzap.ai · higrovi.com

**Voice-of-customer proxies:** contractortalk.com (search summary only) · cloudtalk.io · nexomize.com · trustpilot.com · massmonopoly.com · pushleads.com · partnerwithpear.com · mybusinessportal.cloud

**Build-vs-buy & agency economics:** cmarix.com · aristeksystems.com · digitalapplied.com · aimakers.co · arsum.com · thinkpeak.ai · taskip.net · layer3labs.io · automatonagency.com · latenode.com

**AI failure rates:** netguru.com · number6.ai · opencream.ai · gorgias.com · velaro.com

**SEO / GEO / local:** semrush.com · writer.com · enrichlabs.ai · leapd.ai · aimagicx.com · rankai.ai · emarketed.com · digitalapplied.com · thevalleymarketinggroup.com

**Market sizing:** mordorintelligence.com · gitnux.org · worldmetrics.org · technavio.com · resonateapp.com · globemarketresearch.com

**Canadian software market:** tradebrain.ca · capterra.ca · softwarefinder.com

---

## 6. Reproducibility

Another researcher can reproduce the **verified** findings by:
1. Fetching `aibuiltbyhand.com/{sitemap.xml, robots.txt, llms.txt}` and comparing to the archived copies in `raw/`.
2. Fetching `/ai-business-system` and grepping for `2,500`, `3,500`, `7,500` — the contradiction is in the served HTML.
3. Searching `"AI Built By Hand"` on any engine.
4. Counting slugs containing `receptionist` in the archived sitemap.

The **strongly-supported** findings can be reproduced by re-running the queries in §2. Vendor pricing changes frequently — re-verify before publishing any of it.

The **inferred** findings cannot be reproduced; they are labelled judgments, and every one of them is marked as such at the point it is made.
