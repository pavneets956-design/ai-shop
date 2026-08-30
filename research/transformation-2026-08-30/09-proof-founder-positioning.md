# 09 — Verified Proof Register, Founder Facts, Positioning Synthesis

**Agent:** A9 · **Date:** 2026-08-30 · **Mode:** READ-ONLY (no repo modified, no builds run, no `.env*` read, no secret printed).
**Rule applied throughout:** every line carries a source (file path + line, or URL + what was observed today). Anything without a source is in §C as UNKNOWN. Nothing is invented — no customers, testimonials, revenue, conversion lifts, call volumes, booked jobs, reviews, logos or outcomes.

**Evidence tiers used:** `LIVE-VERIFIED` (curl/DNS/API today) · `SOURCE` (read from a file on disk) · `MEMORY` (a dated per-project memory note — a cached observation, re-verify before publishing) · `OWNER-AUTHORED` (a claim written by Pavneet himself — résumé, site copy — not independently verified).

---

## A. Verified Proof Register

**Headline finding:** every property on this machine is Pavneet's **own** product or **own** business. **No client work exists** — searched `C:\Users\gillp\CascadeProjects` (24 folders), `C:\Users\gillp\Documents\Claude\Projects`, and the 2026-07-25 portfolio audit (`C:\Users\gillp\Documents\Claude\Marketing-Portfolio-Audit\2026-07-25\01-PORTFOLIO-COMMAND-TABLE.csv`, 24 rows, every row `verified_revenue=UNVERIFIED` or `N/A`). `CascadeProjects\spice-of-nepal\README.md:3-4` is the only third-party-branded work and it says "Spec work… NOT commissioned, NOT deployed, NOT owned by the restaurant."

That is not a weakness to hide. The honest proof story is: *a builder who runs his own trades business and built his own back-office systems for it, plus two live SaaS products.*

### A1. COITracker.co — `LIVE` · OWNED PRODUCT · pre-revenue

| Field | Fact | Source |
|---|---|---|
| Problem | Small businesses receiving Certificates of Insurance from vendors track expiries in spreadsheets and miss lapses | live meta description: "Track COIs, workers' comp clearances, licences… automated expiry reminders 30, 14, and 7 days out" — `LIVE-VERIFIED` curl https://coitracker.co 2026-08-30, HTTP 200 |
| What was built | B2B SaaS: vendor list, document upload, evidence-linked field extraction the user confirms, expiry reminders, one-click vendor renewal requests, secure PDF storage; second line "VendorReady" (AI-assisted COI reading) behind a feature flag | `COI expirey reminder\AGENTS.md:7-9`; live `/pricing` meta: "Secure PDF storage, one-click vendor renewal requests, no seat fees" (`LIVE-VERIFIED`) |
| How the workflow operates | Upload → ordered deterministic provider chain (AcroForm → positioned-text → LLM vision only if the tenant permits) → if every provider abstains the reader abstains, never guesses → immutable versioned audit record per run → daily cron scans expiries and emails 30/14/7-day reminders | `AGENTS.md:47-53` (reader chain), `AGENTS.md:37` (crons `/api/cron/check-expiry` 08:00 UTC, `/api/vendorready/cron/check-compliance` 09:00 UTC) |
| Stack | Next.js 16.3.3, React 19.2.8, TypeScript strict, Tailwind v4, Supabase (magic-link auth, Postgres + RLS, private Storage), Stripe, Resend (transactional only), Sentry, Vercel, `@anthropic-ai/sdk`, `pdfjs-dist` + `pdf-lib` + `@napi-rs/canvas`, Vitest, PostHog, Vercel Analytics | `package.json:20-42`; `AGENTS.md:31-37` |
| Tools connected | Stripe (env-driven price IDs, `lib/stripe.ts`), Resend (domain `coitracker.co` verified DKIM/SPF), Supabase project `uryeuobsbjyyecgvvfyn`, Vercel project `coi-tracker`, Sentry, 2 Vercel crons | `AGENTS.md:33-37`; `jarvis/profile.md` §6 |
| Pricing (live) | Free up to 10 vendors · Starter $29/mo (25 vendors) · Growth $59/mo (100) · Pro $129/mo (unlimited); yearly 290/590/1290 | `types/index.ts:64-101` (`TIER_CONFIG`); live `/pricing` title "Free for 10 vendors, then $29/mo" (`LIVE-VERIFIED`) |
| What was tested | 76 test files under `__tests__/` + 13 adversarial PDF fixtures (blank, prompt-injection, rotated, handwritten, foreign-language…); CI runs tsc, eslint, vitest, Postgres-in-Docker `db-smoke`; mandatory `npm run smoke:checker` against the real production build before promote | `find` count 76 / `ls __adversarial__` = 13 (`SOURCE`); `AGENTS.md:91-95`; `MEMORY` 2026-08-27 (`~/.claude/projects/C--Users-gillp-CascadeProjects-COI-expirey-reminder/memory/project_d4_closure_2026_08_27.md`): "vitest 805 pass/0 fail/15 skip · adversarial 31/31 · smoke:checker 11/11" |
| Scale of the codebase | 260 commits; 32 SQL migrations | `git rev-list --count HEAD` = 260; `ls supabase/migrations` = 32 (`SOURCE`) |
| Real usage | Production census 2026-08-27: **2 auth users (founder + 1 real free-tier user), 1 vendor, 1 COI**. Pre-revenue. | `MEMORY` `project_d4_closure_2026_08_27.md` ("Prod census: 2 auth users (founder + sipplenevan), 1 vendor, 1 COI"); `jarvis/profile.md` §1 "Pre-revenue (~0 paying customers as of 2026-04)" |
| Traffic | GSC 20 clicks / 4.2K impressions / avg pos 24.8 (2026-08-12); Vercel Analytics 41 visitors in 7 days (2026-07-25) | `MEMORY` COI `MEMORY.md` line "LIVE FUNNEL DATA 2026-08-12"; `Marketing-Portfolio-Audit\2026-07-25\00-PORTFOLIO-COMMAND-TABLE.md` correction table |
| What the owner controls | Everything: Vercel team `pavs-projects-2a8231d9`, Supabase, Stripe, Resend, Sentry, GitHub repo (private), domain + MX (Hostinger) | `AGENTS.md:35`; `nslookup -type=MX coitracker.co` → mx1/mx2.hostinger.com (`LIVE-VERIFIED`) |
| Screenshots available | `COI expirey reminder\DASHBOARD.jpg` (95 KB), `PRICING.jpg`, `HOW IT WORKS.PNG`, `Screenshot 2026-05-07 150142.png`, `acord-guide-diagram.jpeg` | `ls` (`SOURCE`) — content not reviewed; verify they show no customer data before publishing |
| Caveats | `/features` and `/how-it-works` return 404 on the live site (`LIVE-VERIFIED`) — do not link them from the About page. "Pre-revenue" is the honest status. |

### A2. PayNudge — `LIVE` · OWNED PRODUCT · pre-revenue

| Field | Fact | Source |
|---|---|---|
| Problem | Small service businesses chase overdue invoices by hand | live title "PayNudge — Payment Reminder Software for Small Business"; meta "Automatic email reminders for overdue invoices at days 1, 3 and 7 past due. Works with QuickBooks, Square, Jobber and Stripe. Stops when your client pays." (`LIVE-VERIFIED` https://paynudge.xyz, HTTP 200) |
| What was built | Invoice entry + CSV import, dashboard, 3-step automatic email cadence (day +1 friendly / +3 firm / +7 final), one-tap `sms:` deep-link drafts the merchant sends from their own phone (no Twilio, by decision), integrations sync, trial attribution footer | `paynudge\README.md:7-19`; `AGENTS.md:7` |
| How the workflow operates | Daily cron `send-nudges` 17:00 UTC → nudge engine decides per invoice → send claimed by atomic DB insert **before** email (duplicate claim throws 23505, so concurrent runs cannot double-send) → Resend; `sync-integrations` 16:00 UTC pulls Jobber/QuickBooks/Square/Stripe; `retention` 18:00 UTC redacts at 365 d / deletes at 1095 d | `vercel.json` (3 crons, `SOURCE`); `AGENTS.md` "The reminder cron" section; `docs/RUNBOOK.md` System map |
| Stack | Next.js 16.2.12, React 19.2.8, Tailwind v4, shadcn/ui, pnpm, Supabase (Pro), Stripe via raw REST (no SDK), Resend, Vercel AI SDK (`@ai-sdk/anthropic`, `@ai-sdk/openai`), Sentry, PostHog (project 378201), Vercel Analytics | `package.json` deps; `AGENTS.md` Stack; `docs/RUNBOOK.md` |
| Tools connected | Jobber, QuickBooks, Square, Stripe (OAuth + sync modules for each) | `src/lib/integrations/{jobber,quickbooks,square,stripe}/` — `oauth.ts`, `sync.ts`, `config.ts`, `types.ts` in each (`SOURCE` `ls`) |
| Pricing (live) | One plan CA$29/mo (CA$290/yr), 14-day free trial | live `/pricing` title "CA$29/month, Unlimited Invoice Reminders" (`LIVE-VERIFIED`); `docs/RUNBOOK.md` "base CA$29/mo + CA$290/yr, PPP bands" |
| What was tested | 31 test files registered by hand in the `test` script (17 under `tests/`, 14 under `src/lib/`), incl. regression locks for Twilio removal, demo-mode fail-closed, analytics privacy, accessibility contract; Playwright e2e opt-in; a commit-msg hook rejects `fix:` commits without an `Evidence:` line | `package.json` `"test"` script (`SOURCE`, counted); `AGENTS.md` Tests + Commit discipline |
| Scale | 257 commits; 16 migrations | `git rev-list --count HEAD` = 257; `ls supabase/migrations` = 16 |
| Real usage | "3 real signups (not 4), all bounced same step" (2026-08-12); "near-zero real customers"; Stripe App marketplace listing **submitted 2026-08-27, in review** | `MEMORY` `~/.claude/projects/C--Users-gillp-CascadeProjects-paynudge/memory/MEMORY.md` ("FULL A-TO-Z AUDIT 2026-08-12"; "Activation + Stripe App"); `jarvis/profile.md` §3 "PayNudge has near-zero real customers — say so" |
| Traffic | Vercel Analytics 13 visitors / 7 days (2026-07-25) | portfolio audit correction table |
| Owner controls | Vercel (Pro), Supabase (Pro), Stripe account, Resend, PostHog, Sentry, domain | `docs/RUNBOOK.md` System map (`SOURCE`, last verified 2026-08-27) |
| Screenshots available | `paynudge\dashboard-sample-card.jpeg`, `invoices-new-desktop.jpeg`, `invoices-new-desktop-v2.jpeg`, `invoices-new-v2.jpeg` | `ls` (`SOURCE`) — seed data is fictional (dental clinic, law firm…) per `README.md:29`; label as "sample data" if used |

### A3. Ironwood Grounds — `LIVE` · OWNER'S OWN TRADES BUSINESS + its website · the closest thing to a real case study

This is the important one. Ironwood Grounds is **Pavneet's own cedar-fence contracting business**, not a client.

| Field | Fact | Source |
|---|---|---|
| Identity | "Pavneet Singh — Founder & Builder — Ironwood Grounds"; "Western red cedar fences, gates, fence repair, hedge trimming and grounds care. WorkSafeBC insured. Fixed written quotes." | `CascadeProjects\ironwood-grounds\pavneet-singh-ironwood-grounds.vcf` (`N`, `FN`, `ORG`, `TITLE`, `NOTE` lines — `SOURCE`; private cell line deliberately not transcribed) |
| Live site | https://ironwoodgrounds.ca — HTTP 200; title "Ironwood Grounds — Cedar Fence Contractor · South Surrey, White Rock & Delta"; meta names "Fixed written quotes, WorkSafeBC insured, written workmanship warranty" | `LIVE-VERIFIED` curl 2026-08-30; identical to `ironwood-grounds\index.html` `<title>`/meta |
| What was built (site) | Flat static HTML on Vercel, no framework/build step; 24-URL sitemap after the 2026-08-28 SEO expansion (8 new pages: services hub, mulch, grounds care, cleanup, mulch calculator + 3 guides); a private `/card` business-card page; JSON-LD LocalBusiness/Service/Breadcrumb per page; Vercel Web Analytics (Pro) with `phone_click`, `quote_cta_click`, `quote_form_*` events | `ironwood-grounds\AGENTS.md:3-7, 70-85`; `MEMORY` ironwood `seo-expansion-2026-08-27.md`, `release-2026-08-28-seo-expansion.md` |
| The quote-form workflow (a real, shipped back-office automation) | Browser form on 6 pages → `POST /api/send-quote` → dependency-free Vercel Node function → validates, HTML-escapes, honeypot, per-IP rate limit → Resend REST → email to business inbox; **200 only after Resend accepts**; provider failure returns 4xx/5xx so the visitor keeps their input and sees an error; no analytics or third-party calls in that path | `ironwood-grounds\api\send-quote.js:1-27`; `docs\QUOTE-FORM.md:1-30` |
| What was tested | QA harness: `seo-checks.mjs` (release gate) + 7 suites (`analytics-wiring`, `card`, `http-contract`, `notfound`, `quote-endpoint`, `site-smoke`, `vercel-config`); owner-confirmed facts pinned in `tests/site-facts.mjs`. Recorded pass counts: card 111/111, quote-endpoint 32/32, Playwright smoke 521/521 (25 pages × 1440/390/320) | `ls tests/`; `tests\README.md:1-28`; `MEMORY` `seo-expansion-2026-08-27.md` (rebase-gate line) |
| Scale | 44 commits, last 2026-08-29 17:47 PDT | `git log` (`SOURCE`) |
| Public facts on the site | "4 Google reviews" (visible count, no AggregateRating schema by decision); public line 778-850-1016 on every indexable page; no founder photo on any page (privacy decision 2026-08-26) | `index.html` grep "4 Google reviews"; `tests\site-facts.mjs` PUBLIC_PHONE + review comment; `AGENTS.md:52-61` |
| Traffic | GSC baseline at 2026-08-28 release: 48 clicks / 1.61K impressions, 8 indexed | `MEMORY` `release-2026-08-28-seo-expansion.md` |
| Screenshots available | `CascadeProjects\Ironwood Grounds\01-hero.jpeg` … `09-cta.jpeg` (hero, build sequence, hedge slider, craft, process, CTA), `PHONE-iphone13-front.png`/`-back.png`, `card-final-front.png`/`-back.png`, `build-step0.jpeg` | `ls "Ironwood Grounds"` (`SOURCE`); which are current vs pre-redesign is UNKNOWN — re-shoot from the live site |

### A3b. The Ironwood AI receptionist (`CascadeProjects\Aireceptionist`) — `BUILT` · `TOOK REAL CALLS` · **`PAUSED` since 2026-08-27** (AI out of the call path by owner order)

| Field | Fact | Source |
|---|---|---|
| What it is | "AIBuiltByHand Receptionist. Self-owned AI phone receptionist. Customer #1: Ironwood Grounds. Config-driven 'business brain' — one config row per business, no code per client." | `Aireceptionist\README.md:1-4` |
| Stack | Python 3.12 + pipecat; STT Deepgram (fallback Groq Whisper); LLM Groq (fallback Gemini); TTS Deepgram Aura-2 (fallback self-hosted Kokoro); Asterisk 20 (chan_pjsip + AudioSocket) + VoIP.ms SIP on one Vultr Ubuntu box; Supabase multi-tenant (`tenants`, `calls`, `leads`); Resend lead-alert email from `leads@ironwoodgrounds.ca` | `README.md:17-24`; `docs\runbooks\box-rebuild-runbook.md:1-4, 30-55` (env **names** only were read); `docs\plans\2026-07-02-phase-c-telephony.md:9` |
| Workflow | Inbound call to DID → Asterisk → voice pipeline resolves tenant by DID → greeting + disclosure line from `seed/ironwood.json` (services offered **and explicitly not offered**, 9 service areas, FAQs, booking/estimate/escalation rules) → after-call: save call + extracted lead to Supabase (`save_call_resilient`) → `alerts.py` emails the owner | `docs\runbooks\onboard-first-10.md:6-11`; `MEMORY` ironwood `ai-receptionist-not-in-repo.md` ("seed/ironwood.json is a genuinely good business brain… It matches the real business") |
| Tested | 29 Python test files; `pytest → 87 passed` at the 2026-08-04 merge | `find` count (`SOURCE`); `MEMORY` `ai-receptionist-not-in-repo.md` |
| Scale | 50 commits (main), last 2026-08-04; 2 uncommitted files today | `git log`, `git status --short` (`SOURCE`) |
| **Real call history (the only "outcome" data that exists)** | VoIP.ms CDR Jul 1–Aug 27 2026: **39 calls total**. 22 were failed attempts (NO ANSWER 0:00) between Aug 2–5 while the box was provably healthy — a real caller tried 14× and never got through (upstream delivery failure, exact hop unproven). After Aug 5 17:31 EDT every call was answered end-to-end: Aug 5 (76 s, saved + lead email sent), Aug 18 (11 s, transcript only), Aug 27 (7 s, hung up during greeting). Groq retired the default model Aug 18 → "greeting-then-dead-bot" until fixed Aug 27. | `MEMORY` ironwood `phone-line-human-first-2026-08-27.md` "Root-cause timeline (all verified 2026-08-27)" |
| **Current state** | 2026-08-27, owner's order: **human-first**. DID 778-850-1016 routes at VoIP.ms to ring group "IronwoodCell" → Pav's cell with press-1 answer confirmation (defeats carrier voicemail) → VoIP.ms mailbox 101 → WAV email; CDR watcher cron on the box alerts on non-answered legs. **Phase 1 declared operationally complete 2026-08-28 04:17 UTC. "AI is fully out of the call path."** | `Aireceptionist\docs\plans\call-flow-redesign-2026-08-27.md:1-15`; `MEMORY` `phone-line-human-first-2026-08-27.md` |
| What this means for proof | You may say: *"I built a self-hosted AI phone receptionist for my own fence business, put it on the real business line, and learned from it."* You may **not** say it is answering the line today, and you may not quote call counts as outcomes — the honest number is "a handful of real calls in July–August 2026, one of which produced a lead email." |
| The homepage audio | `public/demo/receptionist-call.mp3` is "Kokoro TTS re-creation of the real greeting script — labelled 'sample', not the literal production voice." It is **not a real call recording.** | `components\home\MoltenForge.tsx:41-45` (`SOURCE`) |
| Screenshots | none of the voice product; the Supabase `calls`/`leads` tables are the only artefact (contain caller PII — never screenshot) | `MEMORY` `ai-receptionist-not-in-repo.md` table |

### A4. Other owned properties (context for the About page — most should NOT be listed as AI proof)

| Property | What it is | Status | Source |
|---|---|---|---|
| **Westmark Grounds** — https://westmarkgrounds.ca | Strata lawn care / fence repair / grounds maintenance vendor site, Metro Vancouver. Page carries `<h2>Pavneet Singh, Founder</h2>` and a founder portrait `assets/images/founder-portrait.jpg` (alt "Pavneet Singh, Founder of Westmark Grounds") | `LIVE` (HTTP 200) — **no source repo on disk**; only a 108-page static mirror in `CascadeProjects\westmark-grounds-recovered` | curl 2026-08-30 + Grep of the fetched HTML lines 469-473; `westmark-grounds-recovered\README.md:1-20` |
| **Pav's Mobile Detailing** — https://pavstruckandrvwash.com | "Mobile Truck & RV Detailing in Surrey, Langley & Delta" — owner's own business | `LIVE` (HTTP 200) | curl 2026-08-30; portfolio CSV row `pavs-truck-rv-wash` |
| **Lavaan & Lights** — https://lavaanandlights.com | "$99 Sikh/Punjabi wedding planning PDF for Canada"; 67 visitors/7d on 2026-07-25 (the best-trafficked property then) | `LIVE` | curl 2026-08-30; portfolio table + CSV |
| **ArticleProof** — https://articleproof.app | "Prove your AI disclosed — timestamped, exportable, audit-ready. Article 50 transparency widget + event log + audit-pack PDF for SaaS teams." | `LIVE`, `VALIDATE DEMAND` | curl 2026-08-30 meta; portfolio CSV |
| **JobReel** — https://getjobreel.com | Photo-to-social-post automation for trades; homepage redirects to `/login` ("Sign in — jobreel") | `LIVE` but no public landing page | curl 2026-08-30 (final URL `/login`); portfolio CSV |
| **RoomRush** — playroomrush.com | Phone-controlled online party games (17 games) | `LIVE`, `VALIDATE DEMAND` | portfolio CSV (not re-curled) |
| **Yard Designer** — yard-designer.vercel.app | AI yard redesign from one photo with plant list + budget; Next.js; repo `Documents\Claude\Projects\yard-designer`, last commit 2026-07-30 | `PROTOTYPE` (no custom domain) | `git log`; portfolio CSV |
| **FairRide BC** | Vite + React 19 SPA, "driver-owned ride-hailing… 90% driver share"; Supabase backend | `PROTOTYPE` — `fairridebc.ca`/`.com` do not resolve (curl 000); portfolio lists only a 4 KB vercel.app stub | `fairridebc\README.md:1-5`; curl 2026-08-30 |
| **LandSignal** | "Canadian land intelligence — Fraser Valley signal pipeline", last commit 2026-05-09 | `PROTOTYPE` (vercel.app) | `landsignal\README.md:1-3`; portfolio CSV |
| **AskedThis / comment-to-content-engine** | Reads a YouTube creator's own comments, clusters questions, finds content gaps; Next.js 16 + Supabase + Stripe | `PROTOTYPE` | `comment-to-content-engine\AGENTS.md:5-7` |
| **SignalDesk (Social media manager)** | Private single-founder content OS; does not publish | `INTERNAL` | `Social media manager\AGENTS.md:5-14` |
| **DeskPet** | Tauri 2 desktop pet with LLM personality; Stripe stubbed | `PROTOTYPE` | `deskpet\AGENTS.md:3-9` |
| **hca-prep-bc**, **pointspr**, **spice-of-nepal** (spec, not commissioned), **Align** (public repo; personal wellness app), **abh-lead-engine** (internal outreach tooling for AI Built By Hand) | — | `PROTOTYPE` / `INTERNAL` | portfolio CSV; `spice-of-nepal\README.md` |
| **Sentinel** (`CascadeProjects\Senitnel`) | Telegram phone bridge: PowerShell listener long-polls Telegram, zero-token `status`/`health` replies, wake → governor-bounded Claude runs, worker watcher; token only in a user env var | `INTERNAL` (ops tooling, not a product) | `~/.claude/CLAUDE.md` §11; `Senitnel\scripts\` (`bridge.ps1`, `governor.ps1`, `health-snapshot.ps1`, `launch-listener.vbs` …) |

### A5. The AI Shop's own assets (aibuiltbyhand.com) — `LIVE`

| Asset | Fact | Source |
|---|---|---|
| Free contractor tools `/tools` | 5 no-login browser tools (profit/pricing calculator, quote follow-up generator, missed-call revenue calculator, labour-burden calculator, lead-leak audit) + the super-visa form filler; pure-math modules in `lib/tools/*` with co-located tests; zero inference/paid-API calls; shipped to prod 2026-07-16 (PR #2, merge `3031d36`) | `ls lib/tools` (7 modules + 7 test files); `MEMORY` `free-contractor-tools-2026-07-15.md` (prod verification block) |
| Test count | 111 `it(`/`test(` blocks counted in `lib/tools/*.test.ts` + `tests/build-request.test.ts` today; last recorded gate "vitest 114/114" | `grep -c` (`SOURCE`); `MEMORY` `release-preview-2026-08-12.md` |
| AI Worker Showroom `/demo` | "Pick an AI worker, play the customer… Live demo, no real call, text, email or booking sent." | `app\demo\page.tsx:5-8` |
| Build-request flow `/create` | 3-step wizard → durable `BuildRequest` row persisted **before** email → Resend to `pavneets956@gmail.com`; 502 only if both channels fail | `MEMORY` `build-request-truthfulness-fix-2026-07-14.md`; `MoltenForge.tsx:36-38` comment |
| What the site currently claims as proof (verified line by line) | • `app\about\page.tsx:11-13, 48-58`: "personal AI studio in Surrey, BC… One builder, your whole AI department… working with clients worldwide" — **"clients worldwide" is unsupported** (no client exists; §A headline). • `components\WhyAIShop.tsx:5-10`: six principle cards — all process claims, no outcomes; "You own what we build… No lock-in, ever" needs the ownership definition in §C. • `components\FeaturedBuilds.tsx` renders `lib\data\solutions.ts:89-149` — six *offers with starting prices*, not case studies; nothing claims a delivered build. • `components\home\MoltenForge.tsx:474` "Sample call · Ironwood Grounds" (correctly labelled sample); **but `MoltenForge.tsx:517-527` shows a Google review card "Ironwood Grounds Ltd… Sarah M. ★★★★★ 'Great crew, lawn looks amazing…'" with an owner reply — that review text is invented demo content and reads as a real review. The real business has 4 Google reviews (§A3) and none is quoted. Must be labelled "illustration" or removed.** • `MoltenForge.tsx:145` quotes a fake invoice nudge with `pay.ironwood.ca/1042` — a domain the business does not own. | file lines cited |
| Site names the founder today | "Built by Pavneet in Surrey/Delta, BC · real builder, no agency handoff" (`components\home\HomepageNew.tsx:385`, `LiveAIHome.tsx:360`); "Pavneet builds it, trains it… tests it, and connects it to your phone line" (`lib\data\money.ts:539`); locations copy (`lib\data\locations.ts:17,25,71`). Live homepage HTML contains "Pavneet" (Grep of fetched page, 2026-08-30). No `Person` schema; `sameAs` on the live page = `["https://github.com/pavneets956-design/ai-shop"]` only. | files cited; live HTML grep |

---

## B. Founder Facts Register

| Fact | Value | Tier | Source |
|---|---|---|---|
| Full name as used publicly | **Pavneet Singh** | `SOURCE` | `ironwood-grounds\pavneet-singh-ironwood-grounds.vcf` (`FN:Pavneet Singh`); westmarkgrounds.ca `<h2>Pavneet Singh, Founder</h2>` (`LIVE-VERIFIED`); `COI expirey reminder\jarvis\profile.md:4` "Owner: Pavneet Singh"; git author "PAV" |
| First-name-only usage on aibuiltbyhand.com | "Pavneet" | `SOURCE` | `lib\data\site.ts:10` `owner: "Pavneet"`; `HomepageNew.tsx:385` |
| Location | Surrey, BC (Fleetwood neighbourhood per résumés); site copy says "Surrey/Delta, BC"; Ironwood serves South Surrey / White Rock / Delta | `SOURCE` / `OWNER-AUTHORED` | `site.ts:12` `region: "Surrey, BC"`; `lib\seo.ts:35` "Based in Surrey/Delta BC"; `app\page.tsx:40,95`; `Downloads\Pavneet_Singh_AI_Developer_Resume.docx` header "Surrey, BC (Fleetwood)"; ironwoodgrounds.ca title |
| Role | Solo founder / sole builder — no cofounders, no employees documented | `SOURCE` | `COI jarvis\profile.md` §7 "Owner: Pavneet Singh (solo). No cofounders, no investors"; `paynudge\jarvis\profile.md` §7 same; `AGENTS.md` (both) "Solo founder is Pavneet" |
| Owns and operates a trades business | Ironwood Grounds — cedar fences, gates, fence repair, hedge trimming, grounds care; WorkSafeBC insured; South Surrey / White Rock / Delta | `SOURCE` + `LIVE-VERIFIED` | vcf `TITLE:Founder & Builder`, `NOTE:`; ironwoodgrounds.ca meta |
| Prior exterior-maintenance business name | "Fleetwood Exterior Maintenance — Owner / Sole Operator, 2024–Present" (lawn care, fence install/repair, pressure washing) | `OWNER-AUTHORED` | `Desktop\Pavneet_Singh_Resume_WorkBC_SelfEmployment.docx` (CURRENT BUSINESS section); AI Developer résumé "BUSINESS OPERATIONS" |
| Employment history (as documented; **the two résumés disagree on dates**) | InnoServ / Gordon Food Services — commercial kitchen equipment sales & service technician (one résumé says 2024–Present, the other 2022–2024); Precision Heat Treat — heat-treatment / maintenance technician (2021–2024 vs 2021–2022); service attendant & painter 2018–2021 | `OWNER-AUTHORED`, **inconsistent** | `Downloads\PAV_Resume_MASTER_Versatile.txt` (lines "InnoServ… 2024 - Present", "Precision Heat Treat… 2021 - 2024"); `Desktop\Pavneet_Singh_Resume_WorkBC_SelfEmployment.docx` ("InnoServ… 2022 – 2024", "Precision Heat Treat… 2021 – 2022") |
| Education | Associate of Arts, Coquitlam College, 2021 | `OWNER-AUTHORED` | `PAV_Resume_MASTER_Versatile.txt` EDUCATION |
| Certifications listed | WHMIS, Lockout/Tagout, Electrical Safety Training, First Aid Level 1, BC Class 5 licence | `OWNER-AUTHORED` | same file |
| Self-described technical profile | "AI Developer / Full-Stack Engineer / Automation Specialist… Claude API, Supabase, React Native, Next.js…"; projects listed there (Blender 3D bot, FORGE editor, OpenClaw WhatsApp automation, HydraTag NFC app, ALIGN, Freshjuice.co) are **unverified here** except HydraTag (GitHub bio) and Align (public repo) | `OWNER-AUTHORED` | `Downloads\Pavneet_Singh_AI_Developer_Resume.docx` |
| Ships in | TypeScript / Next.js 16 / React 19 / Supabase / Stripe / Resend / Vercel / Sentry / Vitest (COITracker, PayNudge); Python + pipecat + Asterisk (receptionist); static HTML + Vercel functions (Ironwood) | `SOURCE` | §A stacks |
| Owned products (live) | COITracker.co, PayNudge (paynudge.xyz), aibuiltbyhand.com (+ free tools), ironwoodgrounds.ca, westmarkgrounds.ca, pavstruckandrvwash.com, lavaanandlights.com, articleproof.app | `LIVE-VERIFIED` | §A curls |
| GitHub profile | https://github.com/pavneets956-design resolves (HTTP 200). API: `name: "hydratag"`, `bio: "HydraTag water tracking "`, `blog: https://sites.google.com/view/hydrataglogger/home`, `location: null`, `public_repos: 2`, created 2025-08-17. Public repos: `ai-shop` (description "AI Shop - Marketplace with AI Sales Agent", language HTML, pushed 2026-08-13) and `Align` ("Aligh mental wellnessapp", TypeScript, pushed 2025-12-07). `aireceptionist`, the COI repo and `paynudge` are **not public**. | `LIVE-VERIFIED` | `curl https://api.github.com/users/pavneets956-design` and `/repos` 2026-08-30 |
| ⚠ GitHub as a credential | As it stands the profile says "hydratag", not "Pavneet Singh", and the flagship public repo is described as a "Marketplace with AI Sales Agent" — the abandoned 2026-06-05 concept. Linking it from the About page today would **contradict** the site. | assessment from the above |
| LinkedIn | **No personal LinkedIn URL found anywhere on disk.** The 4 files matching `linkedin.com/in/` are third-party source lists (`memoriam\*CANDIDATES*.md`, `Senitnel\projects\_inbox\ELDERLY-SOURCE-CANDIDATES.md`, the portfolio audit) — none is Pavneet's. No LinkedIn company page for Handbuilt exists (`research\keyword-gap-2026-08-12\05-competitor-gap.md:136,257`). | `SOURCE` grep | — |
| Branded email | `build@aibuiltbyhand.com` **cannot receive mail**: `nslookup -type=MX aibuiltbyhand.com` (2026-08-30) returned only the SOA (nsone.net) — no MX record. The code agrees: `MoltenForge.tsx:36-38` "build@aibuiltbyhand.com, a mailbox that doesn't exist yet". It also **cannot send**: `resend._domainkey.aibuiltbyhand.com` is non-existent (`Aireceptionist\docs\runbooks\box-rebuild-runbook.md`, sender-domain note, 2026-08-04). The site uses `pavneets956@gmail.com` (`site.ts:11`). `coitracker.co` has Hostinger MX; `ironwoodgrounds.ca` is Resend-verified for sending but had no MX as of 2026-08-02 (`COI MEMORY.md` "Ironwood bounce" line). | `LIVE-VERIFIED` + `SOURCE` | — |
| Phone | Public business line 778-850-1016 belongs to Ironwood Grounds (VoIP.ms DID); the site aibuiltbyhand.com publishes **no** phone number (`site.ts` has none; kg-12 §"Cheapest real fixes": "add a business phone"). The founder's private cell is on disk in several files and must never be published. | `SOURCE` | `tests\site-facts.mjs`; `AGENTS.md` (ironwood) identity invariants |
| Portrait — `public/founder.jpg` | Viewed with the Read tool. Square head-and-shoulders portrait, straight-on, plain white background, even studio-style lighting. A man in his twenties with a full dark beard and moustache, wearing a **navy-blue dastar (Sikh turban)** and an olive-green crew-neck t-shirt, neutral expression, looking directly at the camera. No logo, no text, no props. Suitable for an About page at 280–560 px. **Not referenced by any file in `app/`, `components/` or `lib/` today** (`grep -rn founder.jpg` → nothing) and absent from the live `/about` HTML. Owner-supplied 2026-08-05 per task brief (not independently verified). | `SOURCE` (viewed) | `public\founder.jpg` (42.9 KB); grep 2026-08-30 |
| Suggested alt text | "Pavneet Singh, founder of Handbuilt AI, in a navy turban and green t-shirt against a white background" | — | derived from the image |

---

## C. UNKNOWN — owner must supply (nothing here may be written into copy until he does)

1. **Public name form.** "Pavneet Singh" everywhere (as on the vCard and Westmark) or "Pavneet" only (as on the site today)? The site is inconsistent with his other two brands.
2. **Ownership definition per package.** The trust strip wants "Customer owns the finished system." For a **Custom AI App** the stack is theirs (`packages.ts:73`). For the **Starter receptionist**, the only receptionist that exists is multi-tenant on Pavneet's Vultr box + Supabase (§A3b) — a tenant row, not a customer-hosted system. What exactly transfers: the phone number (ported), the accounts (in the customer's name), the config, the code? Until answered, use "no lock-in" language only where `packages.ts` already does.
3. **"Live in ~5 business days"** (`packages.ts:28`) — no delivered client build exists to support a timeline; keep it only if he confirms it from his own Ironwood build time.
4. **Employment dates** — the two résumés conflict (InnoServ 2022–24 vs 2024–present; Precision Heat Treat 2021–22 vs 2021–24). Do not put dates on the site until he picks one.
5. **Whether to mention the field-service / heat-treat background at all.** It is genuinely on-brand ("I've been the guy on the tools who couldn't answer the phone") but is `OWNER-AUTHORED` only.
6. **Whether Westmark Grounds and Pav's Mobile Detailing may be named** as his businesses on aibuiltbyhand.com (they are public sites, but cross-linking three trades brands to one AI studio is an entity-dilution decision — see research/17 §7).
7. **Consent to publish anything from Ironwood's phone line**: a real call recording (none exported), the July lead email, or call counts. Today nothing consented exists.
8. **LinkedIn profile URL** (personal) and whether a company page should be created.
9. **GitHub profile cleanup** (rename from "hydratag", real bio, location, pin or make public one honest repo) — or don't link it.
10. **Branded email**: add MX (or Cloudflare Email Routing / Google Workspace) for `aibuiltbyhand.com` and verify the domain in Resend — or keep Gmail and stop referencing `build@`.
11. **GBP video verification** for "Handbuilt AI Studio" (created 2026-06-14, ~87%, never verified — `MEMORY` `gbp-and-brand-name.md`). Only he can do this, on his phone.
12. **Which screenshots may be published** — every candidate in §A lists a path; none has been checked for customer data or staleness.
13. **Any paying customer, anywhere.** Every source read today says pre-revenue / near-zero (COI: 1 real free user; PayNudge: 3 signups that bounced; AI Shop: no client). If that has changed since 2026-08-27, only he knows.

---

## D. Positioning one-pager (synthesis only — no new market research)

**Who the BC contractor actually meets when they search** (`research\07-competitor-analysis.md` §1; `research\keyword-gap-2026-08-12\05-competitor-gap.md` §1-2; AI Shop memory `keyword-aeo-gap-2026-08-12.md`):

| Layer | Who | Price | What they can't do |
|---|---|---|---|
| Platform-bundled | **Jobber AI Receptionist** ($99/mo add-on, free on Plus $499–599/mo); Housecall Pro built-in ($59–329/mo) | $99/mo | Confined to the platform; no cross-tool logic; customer owns none of it (07 §1 L1) |
| Standalone SaaS | Numa, Rosie, Goodcall, Smith.ai… | $49–249/mo + per-minute overages, setup fees $75–1,500 | Rented; billing surprises are the #1 complaint pattern (07 §1 L3, 03 §3.4) |
| Canadian-native | **Mihron AI** (Toronto, CA$299/mo, 24 city pages incl. a Surrey page with placeholder NAP), **Voxara** ($49–597/mo, fake 4.8/127 AggregateRating on every page), **askbenny.ca** ("AI Phone Answering for {trade}", from $99/mo, 244 URLs, Jobber integration, CFIB discount, client-rendered so body copy is invisible to crawlers), VoiceFleet CA$149 | CA$99–299/mo | Say "AI answering service" / "AI phone answering", not "AI receptionist"; none is local to Surrey; none is owned |
| Local Metro Vancouver | **adaptai.ca** (Surrey — the one that outranks us on all 3 local queries; "AI consulting" + city in every title, 5-question H2 template), manndigital.ca (Surrey web agency, owns "missed-call-text-back-bc", packages $1,500/$8,000), automatebc.ca (dead SPA), buildgravity (not a competitor) | — | adaptai sells consulting/chatbots, not an installed phone system |
| Non-vendors | **Reddit** ranks on 30 of 34 Canadian SERPs; **AI Overview on 92–94% of SERPs** | — | — |

**The wedge (the only empty square on the 2×2, 07 §4):** *owned + done-for-you at a small-business price* — "the only person who will build a $1,500–$7,500 owned system for a trades business and put their name on it." Reinforced by kg-05 L234: nobody in Canada aggregates *done-for-you install*. Five load-bearing words, each with a factual anchor: **owned** (§C-2 must be defined first), **done-for-you** (`packages.ts` includes lines), **one builder** (§B role), **fixed CAD price** (`packages.ts:20-66`; `money.ts:624` "You'll know the price before work starts"), **connected to the tools you already use** (Jobber/QuickBooks/Square/Stripe integrations demonstrably built in PayNudge, §A2; calendar/CRM in `packages.ts:52`).

**Honest limits of the wedge (07 §4):** it converts *switchers* who were burned by a $99/mo tool, not cold visitors; it loses on speed (5 days vs same-day) and on proof (zero G2 reviews vs hundreds).

**Language customers use → use it** (`research\03-customer-language.md` §4; 17 §6): "answering service", "missed calls", "get back to people", "office help", "you own it", "one fixed price", "no monthly fee", "here's a real recording", "here's what it does *not* do", name **Jobber / Housecall Pro / QuickBooks** explicitly. Nobody in the captured material asks for "AI" — they ask for coverage, speed, and their business name spoken correctly (03 §2).

**Language to avoid** (17 §6): "never miss another call" as an absolute; "trusted by contractors across BC" (unsupportable); the 62% missed-call stat; "enterprise-grade / cutting-edge / seamless / revolutionary"; "AI-powered" as the lead; any customer count, ROI or revenue figure not measured; PIPEDA/PHIPA/Loi 25 claims without the practice; "39 industries" (name 4–6). Add from §A5: no invented review cards, no fake domains.

**Recommended hero** (17 §3 scored 27/30; keep the receptionist as the entry wedge in copy but not the headline product — `21-pivot-decision-memo.md` §15 item 6):
> **The AI office system you own — built for your trade.**
> Your phone gets answered, your quotes get followed up, and your invoices get chased — by a system built for how *you* work. One fixed price. You own it. Built and supported by one person in Surrey, BC.

Note the tension with first-party GSC: "AI receptionist" is 38.4% of impressions and `chatbot` the #1 query (memory `verseo-rebuild…` and `keyword-aeo-gap…`). The `<title>` should keep "AI Receptionist" for search; the H1 can carry the ownership frame.

**Trust-strip wording — each claim checked against a source:**

| Proposed claim | Verdict | Source / required rewording |
|---|---|---|
| "Built in Surrey/Delta, BC" | ✅ supported | `lib\seo.ts:35`; `app\page.tsx:40,95`; `HomepageNew.tsx:385`; vCard/résumé Surrey |
| "One builder from discovery through deployment" | ✅ supported (process claim) | `WhyAIShop.tsx:8` "One person who designs it, builds it, and ships it live"; `about\page.tsx:56`; both jarvis profiles "solo" |
| "Fixed CAD pricing" | ⚠ reword — Starter is "from $1,500", Business is a **band** $3,500–$7,500 | `packages.ts:26-27, 43-46`; `money.ts:459, 624` → **"Fixed CAD quote before work starts"** |
| "Tested before go-live" | ✅ supported as practice; evidence of the habit exists | `homeFaqs.ts:60` "I test it on real calls before it ever touches a customer"; `money.ts:539, 873, 932`; Ironwood acceptance calls with CDR + email evidence (`MEMORY` 2026-08-28); COI `smoke:checker` gate → **"Tested on real calls before handover"** |
| "Customer owns the finished system" | ⚠ blocked on §C-2 | `WhyAIShop.tsx:10`; `packages.ts:63,73`; `homeFaqs.ts:56` → until defined, **"Yours to keep — no lock-in"** with a one-line definition per package |
| "Real human support" | ✅ supported | `packages.ts:73` "60 days support", Starter "14 days of tweaks", Care Plan "Priority support (same/next business day)" → **"Support from the person who built it"** |

---

## E. Proposed copy — uses ONLY registered facts (placeholders in ⟦⟧ wait on §C)

### E1. Proof section (replaces the six-offer "Featured builds" grid with three real things)

**Eyebrow:** What I've actually built
**H2:** Three systems I run myself. No client logos — I don't have any yet, and I won't invent them.

**Card 1 — COITracker.co** *(Live · my own product)*
Vendor insurance tracking for small businesses. Upload a certificate, confirm the extracted fields, and get reminders 30, 14 and 7 days before it lapses. Next.js, Supabase, Stripe, Resend, two daily crons, 76 test files plus 13 adversarial PDFs the reader must refuse to guess on. Free for 10 vendors, then $29/mo.
→ coitracker.co

**Card 2 — PayNudge** *(Live · my own product)*
Overdue-invoice reminders for service businesses: day 1, day 3, day 7, stops when they pay. Syncs with Jobber, QuickBooks, Square and Stripe. One plan, CA$29/mo. Built with the same stack I'd use for you.
→ paynudge.xyz

**Card 3 — Ironwood Grounds** *(Live · my own fence company, South Surrey)*
I run a cedar-fence business, so I built its back office first: a quote form that emails me and fails loudly instead of silently, a self-hosted AI phone receptionist I put on the real business line in July 2026, and a test suite that checks every page before it ships. The receptionist is currently switched to a human-first ring-through while I rebuild the call flow ⟦owner: keep this sentence? it is the honest state as of 2026-08-28⟧.
→ ironwoodgrounds.ca

**Footer line under the cards:** Zero client case studies yet. The first two builds are ⟦discounted/priced⟧ in exchange for a named case study and a recorded call (research/17 §5 — owner decision).

### E2. Founder section (About page)

**Photo:** `public/founder.jpg`, alt "Pavneet Singh, founder of Handbuilt AI, in a navy turban and green t-shirt against a white background".

**H2:** Built by Pavneet ⟦Singh — confirm surname on site⟧, in Surrey, BC.

I'm one person. I run a cedar-fence company in South Surrey, and I build software: a live vendor-insurance tracker (COITracker.co), a live invoice-reminder tool (PayNudge), and the systems that run my own business — including an AI phone receptionist I put on my own line before I'd ever offer one to you.

I ship in TypeScript, Next.js and Supabase, with Stripe and Resend for payments and email, and I test before go-live because I've been the guy on the tools who couldn't answer the phone ⟦owner: keep the trades line? it rests on your résumé, not on the site⟧.

What I won't do: invent a customer, quote a number I didn't measure, or promise "never miss a call." Here's what each build does — and doesn't — do.

Contact: pavneets956@gmail.com ⟦or a working @aibuiltbyhand.com address once MX exists — §C-10⟧ · GitHub ⟦only after §C-9⟧ · LinkedIn ⟦§C-8⟧

### E3. Trust strip (six short items)

Built in Surrey/Delta, BC · One builder, discovery to deployment · Fixed CAD quote before work starts · Tested on real calls before handover · Yours to keep — no lock-in ⟦definition per §C-2⟧ · Support from the person who built it

### E4. Things to remove in the same commit
- `MoltenForge.tsx:517-527` invented "Sarah M." review card and `:145` `pay.ironwood.ca` — label as illustration or delete.
- `app\about\page.tsx:48` "working with clients worldwide" and `:13` metadata "for businesses and individuals worldwide".
- Any `mailto:build@aibuiltbyhand.com` (none live today, but the string still exists in comments).

---

## Summary (≤300 words)

**There is no client work on this machine — and that is the proof story.** Every property is Pavneet's own: two live SaaS products (COITracker.co — Next.js 16/Supabase/Stripe/Resend, 76 test files + 13 adversarial PDFs, 260 commits, free-to-$129/mo, 1 real free-tier user; PayNudge — CA$29/mo, Jobber/QuickBooks/Square/Stripe integrations, 3 crons, 31 registered test files, near-zero customers, Stripe App listing in review) and his own cedar-fence company, Ironwood Grounds (ironwoodgrounds.ca, "Pavneet Singh — Founder & Builder" on the vCard, 4 Google reviews, WorkSafeBC insured, 7-suite QA harness). For Ironwood he built a self-hosted AI phone receptionist (Python/pipecat/Asterisk/VoIP.ms, 87 pytest passes) and put it on the real line: 39 calls Jul 1–Aug 27 including a 4-day upstream outage; since 2026-08-27 the AI is **out of the call path** by his order. The homepage MP3 is a labelled TTS sample, not a real recording; the homepage also shows an invented "Sarah M." review card that must go.

**Founder facts:** Pavneet Singh, Surrey (Fleetwood), BC; solo; trades + field-service background (résumé-only, dates inconsistent across two résumés). Portrait `public/founder.jpg` (navy turban, green t-shirt, white background) is unused anywhere in the code today. `build@aibuiltbyhand.com` has no MX and no Resend DKIM — it can neither receive nor send. GitHub resolves but is named "hydratag" with the repo described as a "Marketplace with AI Sales Agent." No LinkedIn found. GBP created but never video-verified. No directory listings (research/11 §"none found").

**Positioning:** Jobber's $99/mo add-on, askbenny/Mihron/Voxara at CA$99–299/mo, adaptai.ca locally, and Reddit are the real SERP. The only empty square is *owned + done-for-you* at $1,500–$7,500 by one named builder. Trust-strip claims verified except two: "Fixed CAD pricing" → "Fixed CAD quote before work starts"; "Customer owns it" is blocked until the owner defines what transfers for a multi-tenant receptionist.
