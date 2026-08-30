# 08 — Test Suite + Production-Risk Review

Agent A8 · 2026-08-30 · READ-ONLY · site https://aibuiltbyhand.com · repo `C:\Users\gillp\Documents\Claude\Projects\AI Shop`

**Ground truth at time of review (filesystem, not memory):**
- Branch is **`feat/site-transformation-2026-08-30`**, not `fix/dead-social-link` as `MEMORY.md` states. `fix/dead-social-link` is an ancestor; HEAD is 2 commits past it and **36 commits ahead of `origin/main`**. Local `main` is 5 behind `origin/main`.
- Baseline reported by the caller (tsc 0, vitest 9 files / 114 tests) matches the test inventory below (21+11+9+10+19+13+10+3+18 = 114). I did not re-run the gate — the brief forbids build/start.
- Prior reviews cited and re-checked: `research/keyword-gap-2026-08-12/R1-adversarial-release-review.md`, `21-PHASE-0-PRODUCTION-SAFETY.md`, `22-PRE-DEPLOYMENT-REPORT.md`. Status of each of R1's findings on *this* branch is in §7.

Everything below quotes `file:line`. Where I could not verify from the repo, it says so.

---

## 1. Test inventory

### 1.1 What exists (9 files, 114 tests, all vitest, `environment: "node"`)

`vitest.config.ts:7-12` — include `tests/**/*.test.ts` and `lib/**/*.test.ts`; `@/` alias. No jsdom, no React Testing Library, no Playwright, no coverage config. `package.json:39-56` — no `@playwright/test`, no `jsdom`, no `@testing-library/*`. `.github/workflows` does not exist → **tests run only when someone types `npm test`.** `.eslintrc.json` is `next/core-web-vitals` only.

| File | Tests | Covers |
|---|---:|---|
| `lib/tools/format.test.ts` | 21 | `safeNum`, `clampNonNeg`, `round2`, `formatCurrency/Percent/Number` |
| `lib/tools/laborBurden.test.ts` | 11 | worked example + zero/negative/impossible-margin guards |
| `lib/tools/leadLeakAudit.test.ts` | 9 | 12 categories × 4 options, scoring 0/50/100, top leaks |
| `lib/tools/missedCall.test.ts` | 10 | weekly→monthly ×4.33, three scenarios, payback, NaN guards |
| `lib/tools/profitPricing.test.ts` | 19 | margin↔markup, verdicts, overrun modelling, edge cases |
| `lib/tools/quoteFollowUp.test.ts` | 13 | SMS segments, 7-step sequence, channel filters, lane discipline |
| `lib/tools/urlState.test.ts` | 10 | URL-state encode/decode round-trip |
| `lib/track.test.ts` | 3 | `trackTool` forwards safe props, never throws |
| `tests/build-request.test.ts` | 18 | `POST /api/build-request` — 400s, persist-before-email, 502 on double failure, no internals leak, dedupe (fast-path + P2002 race), dev-mock only outside production, `want`→`goal` normalisation, free-tool `src` attribution (mocks `resend` :7 and `@/lib/prisma` :12; `vi.stubEnv("NODE_ENV","production")` :49) |

**Quality note:** the 18 build-request tests are genuinely good — they pin the truthfulness contract. The 93 tool tests are pure-function tests of `lib/tools/*`. That is the entire suite.

### 1.2 Critical paths with ZERO tests

| Path | Where it lives | Why it matters |
|---|---|---|
| Homepage CTAs | `components/marketing/Hero.tsx:66` (`/create`), `HomeSections.tsx:151,313,348,431,436` (`/create`, `/pricing`, `/tools`) | primary conversion links; nothing asserts they resolve to 200 |
| Primary nav | `lib/data/site.ts:51-55` — 5 links incl. `/#how-it-works` anchor | anchor target existence is never checked |
| Demo: worker/industry selection, quick prompt, loading, response, scripted-fallback banner | `components/showroom/Showroom.tsx:34-35,88,135-161,194,234` | site's primary proof asset; only its API has server tests (none) |
| `/start` interview → lead send → closing screen states | `components/ConsultationCall.tsx:178,426,534-549,771-792` | highest-intent lead surface; R1's P0 lived here |
| Build-request form progression / required fields / duplicate submit | `components/BuildRequestForm.tsx:165,286,290,323,329` | only the *route* is tested, never the form |
| Pricing consistency across ~240 pages | `lib/data/packages.ts:117-125` is the SoT; hand-typed copies still exist — `lib/data/compare.ts:345` says **"a custom build from Handbuilt (from CAD $7,500)"** vs `packages.ts:64` custom `price: 10000` → "From $10,000" (owner-approved `packages.ts:118-119`) | the exact P0 class that shipped before |
| Redirects (31 × 308) | `next.config.js:47-89` | no test that destinations are live, non-chaining, canonical |
| Sitemap ⊆ live routes; count stability | `app/sitemap.ts:23-64` → `lib/data/registry.ts:43-66`; baseline `docs/design/baseline/routes-before.txt` (216 lines) | a data-file typo silently drops or 404s a URL |
| Metadata uniqueness (title/description/canonical) | `lib/seo.ts:287-309` — `title: content.h1`, `description: content.description`, canonical = path | duplicates across 8 registry groups are invisible until GSC reports them |
| Structured-data validity | `lib/seo.ts:28-285` (`organizationSchema`, `faqSchema`, `breadcrumbSchema`, `landingSchema`, `shopSchema`) | a bad interpolation (see R1 P2-2, still present at `lib/data/homeFaqs.ts:27`) ships into `FAQPage` JSON-LD |
| One `<h1>` per template | `components/marketing/Hero.tsx:51` and every `app/**/page.tsx` | never asserted |
| Error/404 boundaries render with chrome + link home | `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` | verified once by hand on 2026-08-12 (`22-PRE-DEPLOYMENT-REPORT.md` §4), never automated |
| Every API route except `/api/build-request` (18 of 19) | §2 | includes the unauthenticated Twilio dialer |
| a11y (landmarks, labels, focus, contrast) | — | nothing |

### 1.3 Minimal e2e proposal — Playwright against `next start`

Reuse what's already here: Chromium builds exist at `%LOCALAPPDATA%\ms-playwright\chromium-1208|1223|1228` (from the MCP), and `scripts/seo-audit.mjs:1-19` already crawls `/sitemap.xml` and asserts on-page essentials against a base URL. Do **not** add a second crawler; extend that one and put browser assertions in Playwright.

```
devDependencies: "@playwright/test": "^1.5x"          # one dep, pin exact
playwright.config.ts:
  webServer: { command: "npx next start -p 3200", url: "http://localhost:3200", reuseExistingServer: true }
  use: { baseURL: "http://localhost:3200", trace: "retain-on-failure" }
  projects: [{ name: "desktop", viewport 1440×900 }, { name: "mobile", ...devices["iPhone 13"] }]
package.json scripts:
  "test:e2e": "playwright test", "test:e2e:build": "next build && playwright test"
e2e/
  smoke.spec.ts        # 200s for hubs + one page per registry group; 404 page has h1 + noindex + 5 links
  home.spec.ts         # exactly one h1; every <a href^="/"> in Hero/HomeSections resolves 200; nav 5 links; /#how-it-works target exists
  demo.spec.ts         # route /api/demo mocked via page.route → assert loading state, response render,
                       #   and that {fallback:true} shows the scripted banner (Showroom.tsx:150-161)
  start.spec.ts        # mock /api/consultation {fallback:true} + /api/build-request 200/502 → closing screen shows sent | failed | no-email (ConsultationCall.tsx:771-792)
  create.spec.ts       # step gating (BuildRequestForm.tsx:165,323), required email (:290), submit disabled while sending (:329), 502 → error block (:306), double-click = one POST
  redirects.spec.ts    # every entry of next.config.js redirects(): status 308, Location == destination, destination 200, no second hop
  console.spec.ts      # zero console.error on /, /demo, /start, /create, /tools/*, /pricing (allowlist /_vercel/insights 404 locally, /api/auth/session when NEXTAUTH unset)
```
Mock the OpenAI-backed routes with `page.route()` — the e2e suite must never spend tokens or hit Resend. Prisma: run `next start` with the Preview Neon branch URL or mock `/api/build-request` at the network layer; never point e2e at production.

### 1.4 Vitest-level "static SEO test" (no server, runs in the existing config)

Importing the registries is cheap and catches the recurring defect class at unit speed. Add `tests/seo-static.test.ts`:

```ts
import { allLandingEntries, landingGroups } from "@/lib/data/registry";
import { freeToolsByOrder, toolPath } from "@/lib/data/freeTools";
import { landingMetadata, faqSchema, organizationSchema } from "@/lib/seo";
import { packages, packagePriceLabel } from "@/lib/data/packages";
import nextConfig from "@/next.config.js";           // redirects() is async
import sitemap from "@/app/sitemap";
import { HOME_OBJECTIONS } from "@/lib/data/homeFaqs";

// 1. titles + descriptions unique across every registry entry (and length bands)
// 2. sitemap() URLs: all absolute on site.url, no duplicates, count === baseline (216) unless a fixture is updated deliberately
// 3. sitemap ⊆ known routes: derive routes from landingGroups + static list in app/sitemap.ts; every sitemap path must be in that set and in docs/design/baseline/routes-before.txt
// 4. redirect targets: for each of nextConfig.redirects(), destination is NOT itself a redirect source (no chains) and IS in the route set (except "/")
// 5. stale price strings: JSON.stringify every lib/data/*.ts export must not match /\$2,500[–-]5,000|\$3,500[–-]5,000|from CAD \$7,500/ — and any "$N" adjacent to "custom build" must equal packagePriceLabel("custom")  ← fails today on compare.ts:345
// 6. FAQ prose: no "is From $" (fails today on homeFaqs.ts:27 → renders "One AI worker is From $1,500 CAD")
// 7. JSON-LD: JSON.parse(JSON.stringify(faqSchema(HOME_OBJECTIONS))) has @type FAQPage and every answer non-empty; organizationSchema().sameAs is an array of https URLs
// 8. landingMetadata(): alternates.canonical === landingPath(); openGraph.images present
```
Two of those eight assertions fail on the current tree (items 5 and 6). That is the point.

---

## 2. API route risk table — all 19 `app/api/**/route.ts`

`middleware.ts:1-7` — `export { default } from "next-auth/middleware"` with matcher **`/agent/:path*` only**. No `/api/agent` entry. Every `/api/*` route below is therefore reachable by anyone unless the handler itself checks a session.

Legend: RL = rate limit (`lib/rateLimit.ts` or inline) · "200-on-failure" = client can receive HTTP 200 when the real operation did not happen.

| Route | Methods | Auth | Validation | RL | External | 200-on-failure? | Logging | Secrets touched (names) | Reachable from public site |
|---|---|---|---|---|---|---|---|---|---|
| `app/api/agent/businesses/search/route.ts` | POST, PUT | **none** | `location` truthy only (:12); CSV string only (:49) | none | none — `lib/agent/businessDiscovery.ts:43-46` returns **mock data** | 500 on throw (:36) | console | — | yes (URL); UI only in `/agent/campaigns` |
| `app/api/agent/call/route.ts` | POST, PUT | **none** | POST: none (:8-9); PUT: `toNumber` truthy only (:49) | none | **Twilio `calls.create`** via `lib/agent/callManager.ts:63-71` when `TWILIO_ACCOUNT_SID`+`TWILIO_AUTH_TOKEN` set (:35-39); `agentName: process.env.AGENT_NAME \|\| "Sarah"` (route :63) | PUT returns 200 `status:"initiated"` even when Twilio throws, because `callManager.ts:75-78` swallows the error and returns a mock `call_<ts>` id | console (:24,:77) incl. `details: error.message` (:81) | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`, `TWILIO_WEBHOOK_URL`, `NEXT_PUBLIC_APP_URL`, `AGENT_NAME` | yes — `components/AgentCallButton.tsx:21-28` (rendered only in `/agent/contacts`), but **the endpoint needs no page** |
| `app/api/agent/call/webhook/route.ts` | GET, POST | **none; no Twilio signature validation** | none | none | always 200 TwiML `"Test"` (:24-29) or `"Error"` (:33-38) | console | — | yes; Twilio will speak "Test" to whoever answers |
| `app/api/agent/calls/route.ts` | GET, POST | **none** | `callId` truthy (:29) | none | Prisma `Call` via `lib/agent/callStorage.ts` | 500 with `details: error.message` (:17) | console | DB URL | yes — dumps every call record/transcript |
| `app/api/agent/campaigns/route.ts` | GET, POST, PUT | **none** | shape-only (:28,:57) | none | **in-memory singleton** `new CampaignManager()` (:6) — state lost on every cold start; PUT `start` → `campaignManager.startCampaign` → loop `lib/agent/campaignManager.ts:190-217` → `makeCall` → `CallManager.initiateCall` (:239-253) with `setTimeout(5000)` between calls (:213) and **simulated results** `"Mock transcript"` (:255-262) | 200 with fake stats | console | Twilio names above | yes — an unauthenticated PUT can start a dial loop over any `targetBusinesses[]` |
| `app/api/agent/contacts/route.ts` | GET, POST | **none** | `company`+`phone` truthy (:28) | none | Prisma `Contact` | POST 500 returns **`error: error?.message`** (:56-59) | console incl. Prisma meta (:49-53) | DB URL | yes — **GET returns every contact (name, phone, email)** to anyone |
| `app/api/agent/contacts/[id]/route.ts` | DELETE, PUT | **none** | **none — `data: body`** straight into `prisma.contact.update` (:33-38) = mass assignment | none | Prisma | 500 | console | DB URL | yes |
| `app/api/auth/[...nextauth]/route.ts` | GET, POST | NextAuth (Google, Prisma adapter, db sessions — `lib/auth.ts:6-29`) | NextAuth | none | Google OAuth, Prisma | NextAuth semantics | NextAuth | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_URL` (+ `NEXTAUTH_SECRET` implicitly) | yes (`/login`) |
| `app/api/build-request/route.ts` | POST | none (public lead form) | zod `{ email }` + **`.passthrough()`** (:28-30) — no field-length or body-size caps; whole payload stored as JSON (:184) | **none** | Prisma `BuildRequest` (persist first :60, sha256 `fingerprint` :216-229, `dedupeKey` unique per 10-min bucket :161, P2002 race resolved :192-199); **Resend** from `LEAD_FROM_EMAIL \|\| "Handbuilt Leads <onboarding@resend.dev>"` (:266) to `LEAD_NOTIFY_EMAIL \|\| "pavneets956@gmail.com"` (:262) | **No in production** — 200 only when persisted or emailed (:92-98), 502 otherwise (:121-128). Dev-mock 200 only when `NODE_ENV !== "production"` (:102-113). Idempotent duplicate → 200 `deduped:true` (:61-73) | `console.log("[AI-SHOP LEAD]", JSON.stringify(lead))` **full PII to Vercel logs** (:53); errors (:78,:117,:205,:283,:289) | `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`, DB URL | yes — `/create`, `/start`, `/forge`, SolutionFinder |
| `app/api/consultation/route.ts` | POST | none | roles/strings filtered (:141-150); caps 24 msgs / 600 chars / 12 turns / 240 tokens (:30-33) | inline in-memory 24/min/IP (:41,:136-138 → 429) | OpenAI chat (`modelFor("fast")`) | **yes** — 200 `{ fallback: true }` when no key (:158) or any error (:216); client degrades to scripted flow by design | console (:214) | `OPENAI_API_KEY`, `OPENAI_MODEL*` | yes (`/start`) |
| `app/api/demo/route.ts` | POST | none | roles filtered, 1000 chars, last 8 (:73-82); response validated by zod `demoResponseSchema` (:146) | `checkDemoPerMinute` 3/min, `checkDemoPerDay` 20/day/IP, `checkDemoGlobalDaily` 300/day (`lib/rateLimit.ts:82-104`) | OpenAI, 20 s abort (:42,:128-129) | **yes, by design** — 200 with `fallback:true` on 6 paths (:94,:99,:119,:125,:152) or `limited:true` (:110-114). Client now reads both (`Showroom.tsx:150,190`) — R1 P1-1 is fixed | console (:150) | `OPENAI_API_KEY`, `AI_DEMO_DISABLED`, `AI_DEMO_DAILY_REQUEST_CAP`, `AI_DEMO_MAX_MESSAGES_PER_IP_DAY` | yes (`/demo`, and `ReceptionistChat` on 27 `/use-cases/*` pages — see §4, it is broken there) |
| `app/api/indexnow/route.ts` | GET | shared secret `?secret=` (:13-24 → 401) | — | none | `fetch("https://api.indexnow.org/indexnow")` (:50) | 500 if secret unset (:16-21); otherwise passes through `res.ok` (:57) | none | `INDEXNOW_PING_SECRET` | yes but gated; key file `public/ac88d1565466f5394f041d46f2546ce7.txt` is public by design (`site.ts:16-18`) |
| `app/api/recommend/route.ts` | POST | none | `input?.outcome` truthy only (:22) — no zod | **none** | OpenAI (`max_tokens: 320`) | **yes** — rules-based result on no key/error (:30,:61,:79) — acceptable, but the `catch {}` at :78-80 **logs nothing** | none | `OPENAI_API_KEY` | endpoint yes; UI **no** — `components/SolutionFinder.tsx` is imported by nothing |
| `app/api/stripe/checkout/route.ts` | POST | `getCurrentUser()` → 401 (:18-22) | `priceId` string, **allow-listed** against `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY/ANNUAL` (:37-43) | none | Stripe Checkout, Prisma `User` | 503 when no key (:14-16) | none | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PRICE_*`, DB URL | via `components/ToolPaywall.tsx` → `ProCheckout` (Tools Pro retired; route still live) |
| `app/api/stripe/portal/route.ts` | POST | 401 (:17) | — | none | Stripe Billing Portal | 503/400 | none | `STRIPE_SECRET_KEY` | `/account` |
| `app/api/stripe/webhook/route.ts` | POST | **Stripe signature** `constructEvent` (:22-32) | Stripe | n/a | Stripe retrieve, Prisma `updateMany` + metadata fallback (:75-92) | 503 unconfigured, 400 bad sig, 500 handler | console (:30,:55,:88,:90) | `STRIPE_WEBHOOK_SECRET`, `STRIPE_SECRET_KEY` | Stripe only |
| `app/api/tools/route.ts` | POST | `getSubStatus()` (`lib/subscription.ts:23-52`, DB-backed; `TOOLS_DEV_UNLOCK` hard-gated to non-prod :27) → 402 paywall (:238-250); one free generation per tool via cookie (:236-237) | `kind` allow-list (:228); fields 40-char keys / 600-char values (:271) | `checkIpRate` 10/min (:212), `checkUserDaily` 50 (:255), `checkGlobalDaily` 5000 (:283) | OpenAI; Prisma `ToolRun` history (:295-305) | **yes** — canned `fallback:true` on no key (:327) or error (:347) | console (:305,:346) | `OPENAI_API_KEY`, `TOOLS_GLOBAL_DAILY_MAX`, DB URL | Tools Pro retired 2026-07-06; route live |
| `app/api/tools-demo/route.ts` | POST | none | `kind` allow-list (:98); business 120 chars (:104); msgs 24/600, fields 400 (:26-28,:121-122,:134) | **none** — imports only `@/lib/ai/core` (:2) | OpenAI | **yes** — `fallback:true` on no key (:155) or error (:177) | console (:173) | `OPENAI_API_KEY` | yes — `/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote` |
| `app/api/tts/route.ts` | POST | **same-origin** Origin/Referer host check → 403 (:68-78,:91-93) | 320 chars (:32,:103) | 40/min/IP (:34,:110 → 429); 200 000 chars/day per instance (:35,:123) | OpenAI TTS (`gpt-4o-mini-tts`), in-memory MP3 cache 256 (:36) | **yes** — `fallback:true` on no key / over budget / error (:113,:123,:148); client falls back to SpeechSynthesis | console (:147) | `OPENAI_API_KEY`, `OPENAI_TTS_MODEL`, `OPENAI_TTS_VOICE` | yes (`/start`) |

### 2.1 The `/api/agent/*` question, answered

**Can `/api/agent/call` place a Twilio call unauthenticated?** Yes, if Twilio is configured in the deploy target. The chain is fully unguarded:

- `middleware.ts:5` matcher is `"/agent/:path*"` — the `/agent/*` **pages** are protected; the `/api/agent/*` **handlers** are not. All six `app/agent/*/page.tsx` are `"use client"` with zero server-side session checks (they rely on the middleware), and they call the API routes from the browser (`app/agent/contacts/page.tsx:41,64,97`, `campaigns/page.tsx:40,52,72,95`, `calls/page.tsx:34`).
- `app/api/agent/call/route.ts:33-75` — `PUT` reads `toNumber` from the body (:36), checks only that the three `TWILIO_*` env vars exist (:39) and that `toNumber` is truthy (:49), then `callManager.initiateCall(config)` (:69).
- `lib/agent/callManager.ts:57-71` — if the client was built (`TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN` present at :35-39) it calls `this.twilioClient.calls.create({ to, from, url: webhookUrl, statusCallback: \`${webhookUrl}/status\` ... })`.
- `statusCallback` targets `/api/agent/call/webhook/status` — **that route does not exist** (`ls -R app/api/agent/call` → only `route.ts` and `webhook/route.ts`). Twilio's status callbacks would 404.
- The webhook that answers the call (`app/api/agent/call/webhook/route.ts:22-29`) validates no Twilio signature and returns TwiML `vr.say("Test")`.

**Whether `TWILIO_*` is set in Vercel Production I cannot verify from here** — the brief forbids dashboards and `.env.local` contains only `CALCOM_API_KEY` (name only). If it is set, anyone who discovers the URL can dial arbitrary numbers on the owner's Twilio balance, with the callee hearing "Test". If it is not set, the endpoint 400s (:40-46) — but `app/api/agent/campaigns` PUT `start` still runs the loop and records fake "completed" calls.

**The "Sarah" script.** `lib/agent/conversationEngine.ts:1` — `// AI Conversation Engine for Sales Agent - Enhanced for Cold Calling Local Businesses`. The introduction the AI speaks, both branches:

- `:108` — `` `Hi ${this.state.prospectName || "there"}, thank you for taking my call! My name is Sarah, and I'm reaching out to local businesses${locationContext}… about a solution that could save you time and money.` ``
- `:119` — identical default-branch line.
- `:97-99` — on "not interested"/"don't call"/"remove" it does **not** end the call; it asks `"are you the person who handles customer inquiries for … ? If not, could you point me to the right person?"`.
- `:258` — the pitch claims the product `"introduces itself as your AI assistant rather than pretending to be a person"` while the caller itself presents as "Sarah".
- `lib/agent/openaiConversationEngine.ts:249` — fallback: `"Hi there! Thank you for taking my call. My name is Sarah, and I'm calling because I believe your business could benefit from our AI Receptionist solution."` (this file is imported by nothing — dead, but tracked).
- `app/api/agent/call/route.ts:63` — `agentName: process.env.AGENT_NAME || "Sarah"`.

That is an outbound AI cold-caller that does not identify itself as automated, does not honour a "don't call" as a stop, and whose pitch (`conversationEngine.ts:255-262`) makes unverified claims ("15+ languages", "unlimited calls simultaneously"). In Canada this is CRTC Unsolicited Telecommunications Rules / DNCL territory, and the pitch pricing comes from `lib/agent/pricebook.ts` (`AI_AGENT_PLANS` monthly plans) which contradicts the site's one-time `packages.ts` model. **Recommendation (decision for Pavneet): delete `app/api/agent/**`, `app/agent/**`, `lib/agent/**`, `components/AgentCallButton.tsx`, and the `twilio` dependency, or gate the API routes and rewrite the script before any Twilio credentials exist in production.**

---

## 3. Secret exposure

**Key-shaped strings in the tree** (`sk_live_|sk_test_|sk-|cal_live_|re_|AC[0-9a-f]{32}|whsec_|eyJ…|pk_|sb_secret_|sb_publishable_|AKIA|ghp_|xox[bp]-`, excluding `node_modules`, `.next`, `.git`, `graphify-out`, `.claude`): **0 matches.** The only key-like literal anywhere is the obvious fixture `"re_test_key"` at `tests/build-request.test.ts:50` (11 chars, not a real Resend key shape).

**`NEXT_PUBLIC_*` (all legitimately browser-safe):**
- `NEXT_PUBLIC_APP_URL` — `lib/stripe.ts:21`, `lib/agent/callManager.ts:61`
- `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY` / `_ANNUAL` — `lib/stripe.ts:54-55`, `lib/data/toolsPlan.ts:4,20,35,42`, `app/api/stripe/checkout/route.ts:38-39` (Price IDs, not keys)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — `app/layout.tsx:99`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION` — `app/layout.tsx:101-105`

**Server-only env names referenced in app code (30):** `OPENAI_API_KEY`(×7), `OPENAI_MODEL`, `OPENAI_MODEL_FAST`, `OPENAI_MODEL_PREMIUM`, `OPENAI_TTS_MODEL`, `OPENAI_TTS_VOICE`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`, `TWILIO_WEBHOOK_URL`, `AGENT_NAME`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_URL`, `INDEXNOW_PING_SECRET`, `TOOLS_GLOBAL_DAILY_MAX`, `TOOLS_DEV_UNLOCK`, `AI_DEMO_DISABLED`, `AI_DEMO_DAILY_REQUEST_CAP`, `AI_DEMO_MAX_MESSAGES_PER_IP_DAY`, `NODE_ENV`, plus `POSTGRES_PRISMA_URL` / `POSTGRES_URL_NON_POOLING` (`prisma/schema.prisma:12-13`).

**Local env files (names only, never read):** `.env.local` (57 B, one var: `CALCOM_API_KEY`) and `env.local.txt` (41 B). Both are ignored (`.gitignore:28` `.env*.local`, `:33` `*.local.txt`; `:32` `env*.txt`). Memory records a `cal_live_` key once sat in `env.local.txt` — **delete that file** rather than rely on the ignore rule; nothing in the app reads `CALCOM_API_KEY` (not in the 30 names above).

**`.gitignore` coverage check (`git check-ignore -v`):** `.env.local` ✓ (:28) · `env.local.txt` ✓ (:33) · `tsconfig.tsbuildinfo` ✓ (:48 `*.tsbuildinfo`) · `.playwright-mcp/` ✓ (:44) · root `*.png`/`*.jpeg` ✓ (:55-56) · `.vercel` ✓ (:38) · `.claude/` ✓ (:63) · `graphify-out/` ✓ (:60).
**Gaps:** no rule for `screenshots/` directories (but `docs/design/screenshots/**` — 40 jpegs — is *deliberately tracked*, so leave it); `logos/*.png` is **not** ignored (root-only `/*.png`); `public/founder.jpg` not ignored; `research/` not ignored (139 untracked files, ~15 MB, includes `research/keyword-gap-2026-08-12/screenshots/*.png`); root `*.zip` / `*.html` not ignored. See §5.4.

**Hard-coded personal data (not secrets, but exposure):** `pavneets956@gmail.com` at `lib/data/site.ts:11`, `app/global-error.tsx:20`, `app/api/build-request/route.ts:22,262`. `site.ts:19-22` social links are `"#"`.

---

## 4. Error / empty / loading states

### 4.1 The three boundaries (added 2026-08-12, `001011a`) — verified by reading source

| File | Renders chrome? | Link home | Other |
|---|---|---|---|
| `app/error.tsx` (`"use client"`) | yes — it is a segment boundary inside the root layout, so `Navbar`/`Footer` (`app/layout.tsx:121,125`) survive | `<Link href="/">` :59-64 | `reset` only on click :54; mailto :69-74; digest :78-82; `console.error("[route-error]")` :28 |
| `app/global-error.tsx` | **no, by design** — own `<html lang="en-CA"><body>` :38-53, 100 % inline styles, palette copied :15-19 | `<a href="/">` :103-116 | mailto :121; digest :127-138. **Still no `<title>`** (R1 P3 open) |
| `app/not-found.tsx` | yes (root layout) | 5 real `<Link>`s :19-25 inside `<nav aria-label="Popular pages">` :42-55 | `robots: { index:false, follow:true }` :16; `<h1>` :33; mailto :59 |

Live rendering of these was checked by hand on 2026-08-12 (`22-PRE-DEPLOYMENT-REPORT.md` §4: 404 → HTTP 404, title, noindex, header+footer). Not re-verified in a browser this session.

### 4.2 `notFound()` callers — 20 files

Static SEO pages (`if (!content) notFound();` at `:15`): `app/ai-automation-agency`, `ai-automation-canada`, `ai-business-system`, `ai-chatbot-development`, `ai-chatbot-for-small-business`, `ai-integration-services`, `ai-lead-follow-up-agent`, `ai-receptionist`, `ai-receptionist-for-contractors`, `custom-ai-app-development`, `done-for-you-ai-automation`, `remote-ai-development` (12).
Dynamic (`:21`): `app/compare/[slug]`, `creators/[slug]`, `how-to/[slug]`, `industries/[slug]`, `locations/[slug]`, `resources/[slug]`, `services/[slug]` (7). `app/use-cases/[slug]/page.tsx:47` (1).

**No `loading.tsx` exists anywhere under `app/`** (`find app -name loading.tsx` → nothing). Every route transition is a blank wait; for the data-driven pages that is fine (static), for `/agent/*`, `/account`, `/dashboard` it is a silent state.

### 4.3 Client components that `fetch()` — 14 files, with the gaps

| Component (rendered by) | Loading branch | Error branch | Finding |
|---|---|---|---|
| `components/ReceptionistChat.tsx` (`app/use-cases/[slug]/page.tsx:155` — 27 pages) | `sending` :28,:46 | catch → canned line :58-62 | **BROKEN: wrong response contract.** Posts `{ business, messages }` to `/api/demo` (:48-52) and reads `data.reply` (:56). `/api/demo` returns `{ response: DemoResponse }` (`route.ts:94,99,110,119,125,147,152`) — there is no `reply` key — so **every turn renders "Sorry, could you say that again?"** on all 27 use-case pages. No `res.ok` check either. |
| `components/AgentCallButton.tsx` (`/agent/contacts`) | `isCalling` :13 | status text :36,:41 | no `res.ok` (:30-32); on success `isCalling` is never reset → button disabled forever (:32-34, :53) |
| `components/ToolChat.tsx` (`/demo/assistant`, `/demo/lead`) | `sending` | catch :63-67 | no `res.ok`; a 400 from `/api/tools-demo` becomes "Sorry, could you say that again?" (:61) — indistinguishable from a model reply |
| `app/agent/calls/page.tsx` | `loading` :33,:42 | **console only** :39-41 | no `res.ok`; failure = empty table, no message |
| `app/agent/campaigns/page.tsx` | partial | console :43-44; `alert()` :63 | `alert()` is a browser default, not a designed state |
| `app/agent/contacts/page.tsx` | `loading` | `alert()` :104,:108 | same |
| `components/SolutionFinder.tsx` | ✓ | `/api/recommend` ✓ :47; second POST to `/api/build-request` :61-66 swallows errors | **dead code** — imported by nothing |
| `components/ToolGenerator.tsx` (`/demo/nudge`, `/demo/quote`) | ✓ | `res.json().catch(()=>({}))` :75 then error state | acceptable |
| `components/forge/ForgeExperience.tsx` (`/forge` — 308-redirected) | ✓ | `res.ok` :383 → `setStatus("error")` :386 | dead route |
| `components/BuildRequestForm.tsx` (`/create`) | `status==="sending"` :329-330, submit disabled | `res.ok` :122 → `status==="error"` block :306 | ✓ |
| `components/ConsultationCall.tsx` (`/start`) | `leadStatus==="sending"` :771 | `sent` :774 / **`no-email` :780** / `failed` + retry :789-792; `willSend` gate :541-549 | ✓ — **R1 P0 is fixed on this branch** |
| `components/showroom/Showroom.tsx` (`/demo`) | `busy` | `res.ok` :141; reads `data.fallback` :150 and `data.limited` :190; banner :234 | ✓ — **R1 P1-1 fixed** |
| `components/ProCheckout.tsx`, `components/AccountActions.tsx` | ✓ | `setError` :64,:68 / :20,:24 | ✓ |

---

## 5. Build / deploy safety

### 5.1 `package.json:7` — `"build": "prisma migrate deploy && next build"`

- A failing migration aborts the build → **no deploy**, production keeps serving the last good build. That is the safe direction, but it also means a migration that needs a long lock, or a Preview build with a stale Preview DB branch, blocks *all* deploys until fixed.
- `postinstall: prisma generate` (:11) — fine.
- `prisma/schema.prisma:8-13` — `url = env("POSTGRES_PRISMA_URL")`, `directUrl = env("POSTGRES_URL_NON_POOLING")`. The comment at :10-11 still says "Vercel<>Supabase integration"; memory says the DB is **Neon** (`vercel-supabase-infra.md`). Names still work; the comment is stale.

**Migrations (`prisma/migrations/`, `migration_lock.toml` = postgresql):**

| Dir | Content |
|---|---|
| `0_init` | 13 `CREATE TABLE` (User, ToolRun, Product, Purchase, Review, Contact, Campaign, Call, Lead, Account, Session, VerificationToken + …) |
| `20260617000000_add_user_oauth_fields` | `User.emailVerified`, `User.image` |
| `20260714000000_add_build_request` | `BuildRequest` + 3 indexes |
| `20260714010000_add_build_request_dedupe` | `fingerprint`, `dedupeKey` + unique index + index |

**Pending-migration check (static):** all 13 schema models have a `CREATE TABLE`; every scalar column name in `schema.prisma` appears in a migration; schema has 31 `@@index/@@unique/@unique` and migrations have 31 `CREATE … INDEX`. **No drift detected.** (`prisma migrate status` against the live DB was not run — forbidden by the brief.) `R1` also confirmed `git diff main..HEAD -- prisma/` was empty on 2026-08-12.

### 5.2 `next.config.js`

- `images.remotePatterns` (:37-40): `images.unsplash.com`, `**.supabase.co` — the Supabase pattern is stale (Neon), harmless.
- `redirects()` (:41-89): 31 entries, **all `permanent: true` (308)**. R1 P2-3's caveat stands: the 5-week-old `/tools → /shop` 308 was removed on this branch; browsers that cached it keep going to `/shop` until their cache expires.
- `headers()` (:91-103): `baseSecurityHeaders` (nosniff, Referrer-Policy, `X-Frame-Options: SAMEORIGIN`, HSTS 2 y preload, **`Permissions-Policy: camera=(), microphone=(), geolocation=()`**) on `/:path*`. CSP **only** on `/tools/form-filler/:path*` (:96-102). Note the `microphone=()` — `/start` is text-typed today, but any future real voice input on the site is blocked by this header and would fail silently.
- The `connect-src` comment at :18 ("No analytics") is contradicted by `<Analytics />` at `app/layout.tsx:130` — R1 P1-2, still open (`app/privacy/page.tsx:37,62` still describe only "request logs").
- `webpack` (:105-121): WASM + node-builtin stubs for MuPDF/Tesseract.

### 5.3 Vercel

`.vercel/project.json` and `repo.json` exist (ignored). **No `vercel.json`** → no cron, no per-function `maxDuration`, no rewrites. Consequence for `/api/agent/campaigns` PUT `start`: the loop sleeps 5 s per call (`campaignManager.ts:213`) and up to 60 s waiting for call hours (:343,:358) inside a single invocation — it will hit the function timeout and its in-memory state (:6) evaporates on the next cold start. It cannot work on Vercel as written.

### 5.4 Untracked owner files — what a broad `git add` would ship

`git status --porcelain --untracked-files=all` → **148 untracked files**:

| Path | Size | Ignored? | Note |
|---|---:|---|---|
| `AI Built By Hand final design rotating.zip` | 51 KB | no | design asset |
| `Handbuilt-Website design1.html` | 610 KB | no | standalone design |
| `Quiet Hours 2nd Variant (standalone).html` | 1.3 MB | no | |
| `The Quiet Hours.html` | 794 KB | no | |
| `logos/1.png … 4.png` | 3.9 MB total | **no** (root-only `/*.png`) | |
| `public/founder.jpg` | 42.9 KB | no | **the owner's real portrait** — see below |
| `research/**` (139 files) | ~15 MB | no | includes `keyword-gap-2026-08-12/screenshots/*.png`, this wave's `transformation-2026-08-30/baseline/screenshots/*.png` |

**Rule for every commit on this project: stage by explicit path (`git add app lib components tests …`), never `git add -A` / `git add .`** while these sit in the tree. Git user is `PAV`; 512 files tracked today.

**`public/founder.jpg`:** nothing references it (`grep -rn founder app components lib` → only prose mentions of "founder"; no `/founder.jpg` src). The instant it is committed it is served at `https://aibuiltbyhand.com/founder.jpg` whether or not any page uses it — a real face on a public URL with no `alt`, no page context, no consent decision recorded. **Treat it as an asset to use deliberately:** commit it in the same change that uses it — `/about` with `next/image` (`width={560} height={560}`, honest `alt`), and `organizationSchema()`/a `Person` node in `lib/seo.ts:28-70` pointing `image` at it. Until then, either leave it untracked or move it out of `public/`.

---

## 6. Production smoke-test spec (run after every deploy)

Target `https://aibuiltbyhand.com`. **No POST that creates real data except the one tagged lead below; never call `/api/agent/*` with a real phone number; never call `/api/indexnow`.** Write as `scripts/smoke-prod.mjs` (node ≥ 20, `fetch`) + `e2e/prod-console.spec.ts` (Playwright, `--project=prod`, read-only). Outline:

```
BASE=https://aibuiltbyhand.com

A. Status + headers (plain fetch, redirect:"manual")
   200: / /ai-receptionist-for-contractors /ai-receptionist /pricing /tools /industries /locations /services
        /compare /resources /how-to /use-cases /solutions /shop /faq /about /create /start /demo /privacy /terms
        /tools/missed-call-revenue-calculator /tools/contractor-lead-leak-audit /tools/contractor-profit-pricing-calculator
        /tools/contractor-quote-follow-up-generator /tools/contractor-labor-burden-calculator /tools/form-filler
        + one URL per registry group (industries/locations/services/compare/resources/how-to/creators/use-cases)
   308 with exact Location: every next.config.js redirects() entry; then GET Location → 200 (no chain)
   404: /this-route-does-not-exist-<ts> → status 404, body has <h1>, <meta name="robots" content="noindex, follow">, 5 links, no stack trace
   307→/login: /agent /agent/contacts /dashboard  (middleware)
   Headers on /: strict-transport-security, x-content-type-options=nosniff, x-frame-options=SAMEORIGIN,
        referrer-policy=strict-origin-when-cross-origin, permissions-policy present; content-security-policy ABSENT
   Headers on /tools/form-filler: content-security-policy present and contains "connect-src 'self' blob: data: https://cdn.jsdelivr.net"; x-frame-options=DENY

B. Robots / sitemap / llms
   /robots.txt: 200; contains "Disallow: /api/" "Disallow: /agent/" "Sitemap: https://aibuiltbyhand.com/sitemap.xml"; GPTBot + ClaudeBot rules present
   /sitemap.xml: 200; parse; count == expected (216 today — store in fixture); 0 <lastmod>; all <loc> start with BASE; sample 25 random <loc> → 200; no <loc> is a redirect source
   /llms.txt: 200; contains packagePriceLabel values ("From $1,500", "$3,500–$7,500", "From $10,000"); does NOT contain "$2,500–5,000" or "$3,500–5,000"
   /ac88d1565466f5394f041d46f2546ce7.txt: 200 (IndexNow key)

C. Metadata visible in HTML (fetch text, cheap regex — no browser)
   For each URL in A: exactly one <h1>; <title> non-empty and ≠ "Handbuilt AI"; <meta name="description">; <link rel="canonical" href="BASE+path">;
        <meta property="og:image">; every <script type="application/ld+json"> JSON.parse()s; FAQPage answers contain no "is From $"
   Uniqueness across the set: titles unique, descriptions unique
   / : contains "AI receptionist" H1 wording from Hero.tsx; contains no "Book a call"

D. Browser (Playwright, chromium, 1440 + 390)
   / /demo /start /create /tools/missed-call-revenue-calculator /pricing:
        zero console.error (allowlist: none in prod — /_vercel/insights must load); zero failed requests (status ≥ 400) for same-origin assets;
        no horizontal overflow at 390; focus ring visible on first CTA
   /demo: click a Quick prompt → a loading indicator appears within 300 ms → an assistant turn renders within 25 s;
        if the scripted-sample banner is visible, record it (means fallback/limited — investigate OpenAI key/cap)
   /_vercel/insights/script.js → 200 (analytics beacon reachable); network shows POST /_vercel/insights/view on navigation

E. Forms — test mode
   POST /api/build-request {email:"smoke+<ts>@aibuiltbyhand.com", name:"SMOKE TEST", source:"smoke-test", goal:"smoke <ts>"} → 200, ok:true, delivery.persisted:true
        (Pavneet receives ONE email titled "New Handbuilt Build request: SMOKE TEST" — filter on source=smoke-test); repeat same body → 200 deduped:true
   POST /api/build-request {} → 400 ; POST /api/build-request "not json" → 400
   POST /api/demo {workerId:"receptionist",industryId:"landscaping",messages:[{role:"user",content:"Can I book a job?"}]} → 200; response.assistantMessage non-empty; log `fallback`/`limited`
   POST /api/tts (no Origin header) → 403
   POST /api/consultation {messages:[]} → 200 with either reply or fallback:true
   GET  /api/agent/contacts → MUST be 401/403/307 after the §7 fix (today: 200 + PII)  ← make this assertion fail loudly until fixed
   GET  /api/indexnow → 401 (no secret)

F. Report: print PASS/FAIL table, exit 1 on any FAIL, write research/…/smoke-<ts>.md
```

---

## 7. Severity-ranked risk list

| # | Sev | Risk | Evidence | Fix (owner) |
|---|---|---|---|---|
| 1 | **P0** | `/api/agent/*` fully unauthenticated: contacts PII dump, mass-assignment update, delete, and a Twilio dialer that introduces itself as "Sarah" | `middleware.ts:5`; `app/api/agent/contacts/route.ts:5-11`; `contacts/[id]/route.ts:35-38`; `call/route.ts:33-75`; `lib/agent/callManager.ts:63-71`; `conversationEngine.ts:108,119` | Pavneet decision: delete the agent subsystem, or (minimum) add `"/api/agent/:path*"` to the middleware matcher and rewrite the script. Cannot verify from here whether `TWILIO_*` is set in Vercel Production — check before deploy |
| 2 | **P0** | `ReceptionistChat` answers every message with "Sorry, could you say that again?" on 27 `/use-cases/*` pages — wrong API contract | `components/ReceptionistChat.tsx:48-56` reads `data.reply`; `app/api/demo/route.ts:147,152` returns `{ response }`; rendered at `app/use-cases/[slug]/page.tsx:155` | Map `data.response.assistantMessage`, send `workerId/industryId`, check `res.ok`; or swap in `Showroom`. Add `demo.spec.ts` |
| 3 | **P1** | `/api/build-request` has no rate limit and no payload cap; every distinct POST = 1 DB row + 1 email to the owner's Gmail; full lead PII goes to Vercel logs | `route.ts:28-30` passthrough, no `checkIpRate`; `:53` `console.log(JSON.stringify(lead))` | `checkIpRate(clientIp(req))` (same pattern as `/api/tools:212`), `z.string().max()` on known fields + body length guard, log a hash/email-domain not the payload |
| 4 | **P1** | `/api/recommend` and `/api/tools-demo` call OpenAI with no rate limit | `recommend/route.ts` (no RL import); `tools-demo/route.ts:2` imports only `lib/ai/core` | reuse `checkDemoPerMinute/PerDay/GlobalDaily` |
| 5 | **P1** | Twilio webhook: no signature validation; `statusCallback` route 404s; TwiML says "Test" | `webhook/route.ts:22-29`; `callManager.ts:68` vs `ls app/api/agent/call` | covered by #1 |
| 6 | **P1** | Privacy policy still omits Vercel Web Analytics + custom events (R1 P1-2 open) | `app/layout.tsx:130`; `app/privacy/page.tsx:37,62` | one paragraph, same deploy |
| 7 | **P1** | Stale price: "custom build from Handbuilt (from CAD $7,500)" vs SoT "From $10,000" | `lib/data/compare.ts:345` (slug `custom-ai-app-vs-template`, :339) vs `packages.ts:64,118-119` | replace with `${packagePriceLabel("custom")}`; static test §1.4 item 5 |
| 8 | **P2** | Homepage FAQ + FAQPage JSON-LD render "One AI worker is From $1,500 CAD" (R1 P2-2 open) | `lib/data/homeFaqs.ts:27` | lower-case or restructure; static test item 6 |
| 9 | **P2** | No `loading.tsx`; `/agent/*` pages fail to console/`alert()`; `AgentCallButton` sticks disabled | §4.3 | covered by #1 for agent; add `app/loading.tsx` skeleton for `/account`, `/dashboard` |
| 10 | **P2** | `Reveal.tsx` SSR/client mismatch — reveal never animates, dev hydration warning (R1 P3 open) | `components/marketing/Reveal.tsx:30` | init `shown=true`, observe in effect |
| 11 | **P2** | `global-error.tsx` has no `<title>` | `app/global-error.tsx:38-53` | add `<title>Site error | Handbuilt AI</title>` inside `<head>` |
| 12 | **P2** | Dead code tracked: `components/home/MoltenForge.tsx` (69 KB), `HomepageNew.tsx`, `SolutionFinder.tsx`, `lib/agent/openaiConversationEngine.ts`; `/forge` + `/ai-front-desk` page files behind 308s | import grep: only comments at `app/page.tsx:110`, `CreatorStudio.tsx:9` | delete in a `chore:` commit |
| 13 | **P2** | Untracked owner files (3.9 MB logos, 15 MB research, 2.7 MB design HTML, `public/founder.jpg`) one `git add -A` from shipping | §5.4 | explicit-path staging; decide founder.jpg deliberately |
| 14 | **P2** | No CI — tests only run when invoked by hand; no e2e at all | no `.github/workflows` | §8 |
| 15 | **P3** | `next.config.js:39` Supabase image pattern + `schema.prisma:10` comment stale (DB is Neon); `Permissions-Policy: microphone=()` will block any future voice input | `next.config.js:32,39` | tidy |
| 16 | **P3** | Memory says branch `fix/dead-social-link`; filesystem says `feat/site-transformation-2026-08-30` (36 ahead of `origin/main`) | `git branch --show-current` | fix `MEMORY.md` this session |

**R1 findings re-checked on this branch:** P0-1 `/start` idle state → **fixed** (`ConsultationCall.tsx:541-549,780`). P1-1 `/demo` fallback flag → **fixed** (`Showroom.tsx:150`). P1-2 privacy/analytics → **open**. P2-1 shop sentence → **fixed** (`app/shop/page.tsx:225-233` now describes the link only). P2-2 "is From $1,500" → **open**. P3 Reveal, global-error title, dead code → **open**.

---

## 8. Proposed implementation plan (tests to add, where, who owns)

Ownership: **A8-tests** = the agent/PR that implements this section; **Pav** = owner decisions; **A-copy** = whichever wave agent owns `lib/data/*` prose.

| Step | File(s) | What | Owner | Gate |
|---|---|---|---|---|
| 0 | `MEMORY.md` | correct branch name + "agent subsystem is unauthenticated" flag | A8-tests | — |
| 1 | `tests/seo-static.test.ts` (new) | the 8 assertions in §1.4; fixture `tests/fixtures/sitemap-count.json = 216`; import `next.config.js` redirects | A8-tests | vitest; **expected red** on `compare.ts:345` and `homeFaqs.ts:27` until A-copy fixes them |
| 2 | `tests/api-guards.test.ts` (new) | for every `/api/*` handler: invalid JSON → 400; `/api/tts` without Origin → 403; `/api/demo` no messages → 400; `/api/recommend` missing outcome → 400; `/api/indexnow` no secret → 401; **`/api/agent/contacts` GET → not 200** (red until #1 fixed). Mock `openai`, `resend`, `@/lib/prisma`, `twilio` with `vi.mock` as `tests/build-request.test.ts:7-20` already does | A8-tests | vitest |
| 3 | `tests/receptionist-chat-contract.test.ts` (new) | assert `/api/demo` response has `response.assistantMessage` and that the client reads that key (import the type; or a jsdom RTL test once `jsdom` + `@testing-library/react` are added) | A8-tests | red today (#2) |
| 4 | `middleware.ts` | matcher `["/agent/:path*", "/api/agent/:path*"]` **or** delete `app/api/agent`, `app/agent`, `lib/agent`, `components/AgentCallButton.tsx`, `twilio` dep, `Contact/Campaign/Call/Lead` usage (models can stay; no migration) | **Pav decides**, A8-tests implements | tsc + vitest |
| 5 | `app/api/build-request/route.ts`, `app/api/recommend/route.ts`, `app/api/tools-demo/route.ts` | add `checkIpRate`/demo limiters; field caps; stop logging the full payload | A8-tests | extend `tests/build-request.test.ts` with "429 after 10 in a minute" + "does not log email" |
| 6 | `package.json`, `playwright.config.ts`, `e2e/*.spec.ts` (§1.3) | Playwright devDependency, `webServer: next start -p 3200`, 7 specs, all network to OpenAI/Resend/Prisma mocked with `page.route` | A8-tests | `npm run test:e2e` green locally; screenshots to `research/transformation-2026-08-30/e2e/` |
| 7 | `scripts/smoke-prod.mjs` + `e2e/prod-console.spec.ts` | §6, read-only against prod; exit 1 on FAIL | A8-tests | run once against current prod **before** the transformation deploy to capture the baseline (the `/api/agent/contacts` line will FAIL — that is the evidence for Pav) |
| 8 | `.github/workflows/ci.yml` | on PR: `npm ci`, `tsc --noEmit`, `vitest run`, `next build` (with `SKIP_ENV_VALIDATION`/dummy `POSTGRES_*` or `prisma migrate deploy` skipped via `next build` only), `playwright test` | A8-tests | **Pav approval** — changes GitHub settings |
| 9 | `lib/data/compare.ts:345`, `lib/data/homeFaqs.ts:27`, `app/privacy/page.tsx`, `app/global-error.tsx`, `components/marketing/Reveal.tsx:30` | the P1/P2 copy + boundary fixes | A-copy / A8-tests | step-1 tests go green |
| 10 | `public/founder.jpg` | decide: use on `/about` + `Person` schema in the same commit, or leave untracked | **Pav** | — |

Every step is READ-ONLY until Pav says go; nothing in this document was executed against production.

---

## Summary (≤300 words)

The test suite is real but narrow: 114 vitest tests, 93 of them on the five free-tool calculators and 18 on `/api/build-request`, which is the one route whose truthfulness contract is genuinely pinned. Nothing else on the site is tested — no page, no CTA, no redirect, no sitemap, no metadata, no JSON-LD, no a11y, and 18 of 19 API routes. There is no Playwright, no CI, and no `loading.tsx` anywhere.

Two P0s. First, `middleware.ts:5` protects only the `/agent/*` pages; every `/api/agent/*` handler is open to the internet — `GET /api/agent/contacts` returns every stored name/phone/email, `PUT /api/agent/contacts/[id]` is a mass-assignment write, and `PUT /api/agent/call` dials any number through Twilio (`callManager.ts:63-71`) with an AI that says "My name is Sarah" (`conversationEngine.ts:108,119`), never identifies as automated, and does not stop on "don't call". Whether Twilio credentials exist in Vercel Production I cannot verify from the repo. Second, `ReceptionistChat.tsx:56` reads `data.reply` from `/api/demo`, which returns `{ response }` — so the live demo embedded on 27 `/use-cases/*` pages answers everything with "Sorry, could you say that again?".

P1s: no rate limit on `/api/build-request` (each POST = a DB row + an email to Gmail, and the full lead is `console.log`ged), none on `/api/recommend` or `/api/tools-demo`; the privacy policy still omits analytics; `compare.ts:345` still quotes the custom build at $7,500 against the approved $10,000.

Good news, verified: R1's `/start` P0 and `/demo` fallback P1 are fixed on this branch; the three error boundaries are correct; migrations match `schema.prisma` with no drift; zero key-shaped strings in the tree; `.gitignore` covers the env files.

Deploy hygiene: 148 untracked owner files (15 MB research, 3.9 MB logos, `public/founder.jpg`) sit one `git add -A` from production. The branch is `feat/site-transformation-2026-08-30`, not what memory says.

Plan: a static SEO vitest file that fails today on the two copy defects, API guard tests, a mocked Playwright harness on `next start`, a read-only prod smoke script, and an owner decision on the agent subsystem before anything ships.
