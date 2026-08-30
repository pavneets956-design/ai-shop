# 01 — Repository & Architecture Audit (A1)

**Audited:** 2026-08-30 · **Working tree:** branch `feat/site-transformation-2026-08-30` @ `e732d98`, **36 commits ahead of `origin/main` (`3031d36`, 2026-07-15 = production)**. Verified with `git rev-list --count origin/main..HEAD` = 36.
**Method:** read-only. `graphify query` for orientation, then direct reads/greps of `app/`, `components/`, `lib/`, `tools/`, `middleware.ts`, `next.config.js`, `package.json`, plus a transitive import-reachability script (scratchpad `reach.js`, entrypoints = every file under `app/` + `middleware.ts`). No build, no server, no network, no edits.
**Prior research relied on, not re-derived:** `research/keyword-gap-2026-08-12/23-CONSOLIDATED-RELEASE-REPORT.md` (release ledger, R1–R8), `research/30-page-plan.md` (page inventory, prune/write lists, owner facts gap), `research/01-current-site-audit.md` (cannibalisation clusters, registry architecture).
**Untracked owner files at repo root noted, not audited:** `AI Built By Hand final design rotating.zip`, `Handbuilt-Website design1.html`, `Quiet Hours 2nd Variant (standalone).html`, `The Quiet Hours.html`, `logos/`, `public/founder.jpg` (referenced by nothing in `app/`, `components/`, `lib/` — grep `founder\.jpg` = 0 hits).

Two corrections to premises in the brief, up front:

1. **The homepage does NOT use a different header/footer on the working tree.** It did on production: `origin/main:components/ChromeGate.tsx:12` has `HIDDEN_EXACT = ["/", "/creators"]` and `origin/main:app/page.tsx:2` imports `MoltenForge`, which carries its own nav and footer (`components/home/MoltenForge.tsx:904-905`). The branch already unified it: `components/ChromeGate.tsx:16` is `HIDDEN_EXACT = ["/creators"]` with the explanation at `:12-15`, and `app/page.tsx:128-144` composes only `components/marketing/*` sections inside the global `Navbar`/`Footer` from `app/layout.tsx:120-126`. The remaining chrome divergences are elsewhere (§b).
2. **`research/30-page-plan.md` §0 item 1 says `/services/ai-review-engine` no longer exists and the footer link 404s. On this tree it exists:** `lib/data/_services_b.ts:429` `"slug": "ai-review-engine"`, resolved by `app/services/[slug]/page.tsx:20` via `getService`. Footer link `components/Footer.tsx:125` is live.

---

## a) Route map

**Counts:** 66 `page.tsx`, 17 `route.ts` (API) + `app/llms.txt/route.ts`, `app/robots.ts`, `app/sitemap.ts`, `app/layout.tsx`, `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx`. No `loading.tsx` anywhere. No nested `layout.tsx` — one root layout wraps every route.

### a.1 Data-driven routes (registry → route)

`lib/data/registry.ts:23-32` is the single source for `app/sitemap.ts:58` and `app/llms.txt/route.ts:3`. Sitemap = 17 static (`sitemap.ts:25-43`) + 5 free tools (`:46-50`, from `freeToolsByOrder`) + every registry entry.

| Registry group (`registry.ts` line) | Data file(s) | Route | Hub |
|---|---|---|---|
| `money` (:24) | `lib/data/money.ts` | **12 hand-created route files**, each `getMoneyPage(SLUG)` + `LandingTemplate` (pattern: `app/remote-ai-development/page.tsx:7-17`): `/ai-automation-agency`, `/ai-automation-canada`, `/ai-business-system`, `/ai-chatbot-development`, `/ai-chatbot-for-small-business`, `/ai-integration-services`, `/ai-lead-follow-up-agent`, `/ai-receptionist`, `/ai-receptionist-for-contractors`, `/custom-ai-app-development`, `/done-for-you-ai-automation`, `/remote-ai-development` | `/services` |
| `service` (:25) | `services.ts` + `_services_b.ts` | `app/services/[slug]/page.tsx` (`dynamicParams = false`, `:7`) | `app/services/page.tsx` → `LandingHub` |
| `industry` (:26) | `industries.ts` + `_industries_b.ts` + `_industries_c.ts` | `app/industries/[slug]/page.tsx` | `app/industries/page.tsx` |
| `creators` (:27) | `creators.ts` + `_creators_b.ts` | `app/creators/[slug]/page.tsx` (global chrome) | `app/creators/page.tsx` → `CreatorStudio` (**own chrome**, §b) |
| `location` (:28) | `locations.ts` | `app/locations/[slug]/page.tsx` | `app/locations/page.tsx` |
| `resource` (:29) | `resources.ts` | `app/resources/[slug]/page.tsx` | `app/resources/page.tsx` |
| `howto` (:30) | `howto.ts` | `app/how-to/[slug]/page.tsx` | `app/how-to/page.tsx` |
| `compare` (:31) | `compare.ts` | `app/compare/[slug]/page.tsx` | `app/compare/page.tsx` |
| use-cases (:56-64, appended outside `landingGroups`) | `useCases.ts` | `app/use-cases/[slug]/page.tsx` (also mounts `ReceptionistChat` → `/api/demo`, `:11,:155`) | `app/use-cases/page.tsx` |
| free tools (not in registry; `sitemap.ts:46`) | `freeTools.ts` | 5 hand routes `app/tools/<slug>/page.tsx` | `app/tools/page.tsx` |

Page counts per group are already measured in `research/30-page-plan.md` §1 (12 / 20 / 39 / 20 / 19 / 24 / 25 / 9 / 21 / 5) — not re-counted here.

### a.2 Hand-authored marketing/conversion routes

`/` · `/about` · `/pricing` · `/faq` · `/privacy` · `/terms` · `/solutions` · `/shop` · `/create` (→ `BuildRequestForm` → `/api/build-request`) · `/start` (→ `ConsultationCall`, 38 KB, → `/api/consultation`, `/api/tts`, `/api/build-request`) · `/demo` (→ `Showroom` → `/api/demo`) · `/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote` (→ `DemoPageTemplate` + `ToolChat`/`ToolGenerator` → `/api/tools-demo`; `components/ToolChat.tsx:53`, `components/ToolGenerator.tsx:37`).

### a.3 Dormant / legacy routes — what each is, what to do

| Route | Evidence | Status | Next |
|---|---|---|---|
| `/ai-front-desk` | `app/ai-front-desk/page.tsx` (96 lines) imports `MissedCallCaught` → `PhoneScene` → three.js. **308 → `/ai-receptionist`** at `next.config.js:48`, so the file can never render. | Dead route file, still compiled | Delete `app/ai-front-desk/`, `components/experience/*` (4 files, ~81 KB), `lib/data/alwaysAnswering.ts`; keep the redirect |
| `/forge` | `app/forge/page.tsx` → `ForgeExperience` → `ForgeScene` (three.js). **308 → `/`** at `next.config.js:49` | Dead route file, still compiled | Delete `app/forge/`, `components/forge/*` (3 files, ~38 KB), `lib/data/forge.ts`; keep the redirect |
| `/products`, `/products/[id]` | `app/products/page.tsx:5` and `app/products/[id]/page.tsx:5` are `redirect("/solutions")` in code | In-code redirects (2 of the "29") | Move both to `next.config.js` as permanent redirects; delete the route files |
| `/cart` | `app/cart/page.tsx:5-16` hard-coded cart ("AI Receptionist Pro" $99, "Content Creator AI" $149), `:23` `bg-[#0a0a0a]`, links to `/products` (`:28`); **no `metadata`** → inherits root title + `index,follow` (`app/layout.tsx:37-40,86`); `robots.ts:7` disallows | Fabricated marketplace remnant | Delete; redirect `/cart` → `/pricing` |
| `/dashboard` | `app/dashboard/page.tsx:8-27` `"use client"` hard-coded "sales: 45, revenue: 4455"; no metadata; robots-disallowed | Fabricated creator dashboard | Delete; redirect → `/` |
| `/login`, `/account` | `app/login/page.tsx:6` Google `signIn`; `app/account/page.tsx:15` `robots: noindex`, `:23-24` redirects to `/login`, shows Stripe subscription for retired Tools Pro; `lib/auth.ts:2,9` GoogleProvider | Dormant Tools Pro auth/billing ("left dormant + reversible" — memory) | Owner call. If Tools Pro stays retired: delete `login/`, `account/`, `api/stripe/*`, `api/auth/*`, `components/AccountActions.tsx`, `components/CheckoutFinalizing.tsx`, `lib/subscription.ts`, `lib/stripe.ts`, `lib/auth.ts`, `components/Providers.tsx`; drop `useSession` from `Navbar.tsx:24` |
| `/agent`, `/agent/{calls,campaigns,contacts,leads,leads/[id],settings}` | 7 `"use client"` pages, no metadata; `app/agent/page.tsx:11-16` hard-coded "Total Calls 1,247 … Conversion Rate 27%"; `app/agent/leads/page.tsx:27-79` fake leads with fake emails/phones; protected by `middleware.ts:5` (`/agent/:path*`); `robots.ts:7` disallows `/agent/` | Outbound cold-call CRM (§f) | Remove from the public site repo (§f, P0) |
| `/tools/form-filler` | `app/tools/form-filler/page.tsx:5` dynamic-imports `tools/form-filler-ca/ui/FormFiller` (dir = 2.9 MB, 13 files); route-scoped CSP `next.config.js:92-99`; canonical set (`:14`); **inbound links = 0** (grep `form-filler` in `app/ components/ lib/` hits only its own file, `:5,:14`); **not in sitemap** (`sitemap.ts` emits only `freeToolsByOrder`) | Orphan, indexable, unrelated to contractor positioning (Super Visa IMM forms) | Owner call: either list it on `/tools` + sitemap, or `robots: noindex` + move to its own project. Do not leave it indexable and unlinked |
| `/remote-ai-development` | Live money page (`registry.ts:24`), footer link `Footer.tsx:160` "Remote / international" | Live | Keep; it is the only page carrying the remote claim — check against the AU/NZ/UK question (§c) |
| `/compare` (+21) | Live registry hub | Live, saturated per `research/30-page-plan.md` §4 | No new compare pages |
| `/creators` (+20) | Live, own chrome | Owner decision deferred (`30-page-plan.md` §2.6) | Not this audit's call; chrome fix in §b regardless |

### a.4 Redirects already in place

`next.config.js` `redirects()` returns **27** entries: 3 legacy showpieces (`:47-49`), 10 Tools Pro (`:56-65`), 9 root→services canonicalisation (`:71-79`), 4 resource aliases (`:81-84`), 1 compare alias (`:86`). Plus **2 in-code** `redirect()` calls (`/products`, `/products/[id]`) = **29**. All `permanent: true` (308). `headers()` (`:89-101`) applies `baseSecurityHeaders` sitewide and the strict CSP only to `/tools/form-filler/:path*`.

**10 routes emit `index,follow` + the root title with no canonical** (confirmed by per-file scan: `meta=0` for `cart`, `dashboard`, `login`, `agent`×7). `robots.ts:7` is the only guard. Matches R-report P2.

---

## b) Global chrome — how every page gets its header and footer

**Mechanism (working tree):** `app/layout.tsx:118-127` renders `<Providers>` (next-auth `SessionProvider`) → `<JsonLd>` (Organization + WebSite) → `<ChromeGate><Navbar/></ChromeGate>` → `<main className="min-h-screen">{children}</main>` → `<ChromeGate><Footer/></ChromeGate>`. `ChromeGate` (`components/ChromeGate.tsx:18-25`) is a **client component** using `usePathname()` that returns `null` for `HIDDEN_PREFIXES = ["/ai-front-desk", "/forge"]` (`:7`) and `HIDDEN_EXACT = ["/creators"]` (`:16`).

`Navbar` (`components/Navbar.tsx`) — `"use client"`, sticky 72 px (`tailwind.config.ts:80` `header: "72px"`), wordmark "Handbuilt AI" (`:69`), links from `lib/data/site.ts:50-56` (`navLinks`: AI Receptionist, Free Tools, How It Works `/#how-it-works`, For Your Trade, Pricing), CTA "Request a review" → `/create` (`:98-100`), **`useSession()` (`:24`) to show an "Account" link (`:89-97`)**.
`Footer` (`components/Footer.tsx`) — server component; brand + service-area line (`:30`, `:53-60`), `mailto:${site.email}` twice (`:63,:68`), GitHub/LinkedIn icons guarded against `"#"` (`:71,:76`), free-tools column by name (`:110-119`), "what we install" (`:121-134`), trades/areas (`:136-149`), company (`:151-161` incl. `/creators`, `/shop`, `/demo`, `/remote-ai-development`), legal line `© {year} {site.name}. {site.legalName}, Surrey, British Columbia. Prices in CAD.` (`:169-172`).

**Where pages diverge from that chrome today:**

| Page | Divergence | Evidence |
|---|---|---|
| `/creators` hub | Global chrome hidden; `CreatorStudio` ships its own sticky header (wordmark "Handbuilt AI", links `#timeline`, `/pricing`, "Start a build") and its own dark footer ("© 2026 Handbuilt AI — all builds delivered remotely.") | `ChromeGate.tsx:16`; `components/creators/CreatorStudio.tsx:127-158`, `:400-420` |
| `/ai-front-desk`, `/forge` | Hidden by prefix — but both routes are 308-redirected, so the entries are dead config | `ChromeGate.tsx:7`; `next.config.js:48-49` |
| `/start` | Global chrome renders but is covered by a fixed full-screen overlay | `app/start/page.tsx:12-13` ("full-screen overlay (z-100) above the global nav/footer") |
| `/tools/form-filler` | Renders its **own `<main className="min-h-screen bg-slate-950">` inside the layout's `<main>`** (nested landmarks), dark slate page under the cream Navbar, own eyebrow "Handbuilt · Form Filler" | `app/tools/form-filler/page.tsx:19-22`; `app/layout.tsx:123` |
| `/login` | Renders its own centred logo + wordmark **"Handbuilt"** while the global Navbar (wordmark "Handbuilt AI") is also on screen → two logos, two names | `app/login/page.tsx:19-24` |
| `/cart`, `/dashboard`, `/agent/*` (9 files) | Full-page `bg-[#0a0a0a]` dark legacy UI with `pt-32` header offsets, wrapped by the cream marketing Navbar and the contractor Footer | `app/cart/page.tsx:23`; grep `bg-\[#0a0a0a\]|bg-black|bg-slate-950` → 10 files under `app/` |
| Every page | The marketing header is a client component that mounts next-auth's `useSession` sitewide, purely for the retired Tools Pro "Account" link; `Providers.tsx` wraps every route in `SessionProvider` | `Navbar.tsx:1,5,24`; reach script: `next-auth/react` reachable from `app/layout.tsx` |

**Production differs materially:** on `origin/main` the homepage has a *third* chrome (MoltenForge's own nav/footer, `components/home/MoltenForge.tsx:904-905`, footer text `© 2026 HANDBUILT AI · BY AI BUILT BY HAND · AIBUILTBYHAND.COM` / `ONE BUILDER · SURREY / DELTA, BC · BUILD@AIBUILTBYHAND.COM`). Merging the branch removes that.

**What one consistent header + footer requires (concrete):**

1. **Route groups instead of a client-side gate.** `app/(marketing)/layout.tsx` renders `Navbar` + `Footer` as server components; move every public page under it. `app/(app)/layout.tsx` (minimal, `noindex`) holds whatever survives of `login`/`account`. Delete `components/ChromeGate.tsx` and the `usePathname` check — no more pathname string matching, no client boundary around the header.
2. **`/creators`:** strip `CreatorStudio.tsx:127-158` and `:400-420`; let the global chrome wrap the dark hub (dark section inside light chrome is a design decision, not a code constraint). Files: `components/creators/CreatorStudio.tsx`.
3. **Navbar as a server component:** remove `useSession`/"Account" (`Navbar.tsx:5,24,89-97,139-150`); the mobile sheet needs one small client island (toggle button + sheet), not the whole header. Then `components/Providers.tsx` can leave the root layout.
4. **Fix nested `<main>`:** `app/tools/form-filler/page.tsx:19` → `<div>` or `<section>`.
5. **Delete or regroup the dark app screens** (`cart`, `dashboard`, `agent/*`) — §a.3.
6. **One wordmark string** — today: "Handbuilt AI" (`Navbar.tsx:69`, `Footer.tsx:50`, `CreatorStudio.tsx:132,406`, `WorkflowStory.tsx:237`), "Handbuilt" (`login/page.tsx:23`), "Handbuilt · Form Filler" (`form-filler/page.tsx:22`). Render `site.name` everywhere instead of literals so the §c brand decision is a one-line change.
7. **Drop dead `HIDDEN_PREFIXES`** with the route files (§a.3).

---

## c) Brand / contact consistency

### c.1 Brand name variants (shipped code = `app/`, `components/`, `lib/`, `public/`; `*.ts,*.tsx,*.txt,*.svg,*.json`)

| String | Lines / files | Where |
|---|---|---|
| `Handbuilt AI Studio` | 1 / 1 | `lib/data/site.ts:4` (`legalName`) → rendered by `Footer.tsx:170`, `app/page.tsx:87` (LocalBusiness `name`), `app/llms.txt/route.ts:14` (`# ${site.legalName} (${site.name})`) |
| `Handbuilt AI` | 32 / 16 | `site.ts:3` (`name`); `app/layout.tsx:38,39,42,76,82` (title default/template/OG/Twitter); `app/page.tsx:37,43,60,72`; `app/opengraph-image.alt.txt:1`; `app/twitter-image.alt.txt:1`; `app/start/page.tsx:5,7,28`; `components/creators/CreatorStudio.tsx:132,406,420`; `components/Logo.tsx:4`; `components/marketing/WorkflowStory.tsx:237`; `lib/seo.ts:24`; copy in `compare.ts:596`, `alwaysAnswering.ts:128`, `homeFaqs.ts:56`, `money.ts:214,215,282`, `resources.ts:340,346`, `_industries_b.ts:509,597` |
| `AI Built By Hand` (any case) | 1 live + 1 dead | `lib/data/compare.ts:1557` (link label "AI Built By Hand vs Generic AI Agency"); dead `components/home/MoltenForge.tsx:904` "BY AI BUILT BY HAND" |
| `AI Shop` | 0 in shipped code | `package.json:2` `"name": "ai-shop"`; root docs (`ROUTES.md`, `README_AGENT.md` describe the marketplace era) |
| `Handbuilt` (bare) | 560 / 55 | Mostly body copy ("Handbuilt builds…", "Handbuilt package"); wordmark on `app/login/page.tsx:23`; `app/tools/form-filler/page.tsx:11,22` |

Domain: `site.ts:8` `url: "https://aibuiltbyhand.com"`. **Unresolved owner decision:** `research/30-page-plan.md` §5 #11 records the owner's temporary official name as "AI Built By Hand" (per `research/gsc-baseline/07-owner-decisions.md`) while the code renders "Handbuilt AI"/"Handbuilt AI Studio" everywhere, and the domain says a third thing. Every `sameAs`/citation action is blocked on this (`30-page-plan.md` §6). Founder is "Pavneet" only (`site.ts:10`; surname nowhere — `30-page-plan.md` #12).

### c.2 Email addresses (every string, shipped code)

| Address | Occurrences | Files |
|---|---|---|
| `pavneets956@gmail.com` (personal Gmail) | 5 | `lib/data/site.ts:11` (`site.email` — feeds **13 `mailto:` anchors** and JSON-LD `email` at `lib/seo.ts:37`, `app/page.tsx:90`); `app/global-error.tsx:20` (hard-coded `const EMAIL`); `app/api/build-request/route.ts:22,262` (`LEAD_NOTIFY_EMAIL` default); dead `MoltenForge.tsx:36` |
| `onboarding@resend.dev` | 3 | `app/api/build-request/route.ts:23,263,266` (`LEAD_FROM_EMAIL` default — Resend's shared sender) |
| `build@aibuiltbyhand.com` | 2 (both dead) | `MoltenForge.tsx:38` ("a mailbox that doesn't exist yet"), `:905` |
| `leads@aibuiltbyhand.com` | 0 in code; 5 in `*.md`/`docs/` | docs only |
| Fake sample data | 8 | `app/agent/leads/page.tsx:28-79`, `app/agent/leads/[id]/page.tsx:13,41` (john@techsolutions.com etc.); dead `MoltenForge.tsx:501` dan.k@ladnerlawns.ca |
| Placeholders | 5 | `you@business.com` (`BuildRequestForm.tsx:290`, `ConsultationCall.tsx:533,536`, `SolutionFinder.tsx:228`), `john@company.com` (`agent/contacts/page.tsx:195`), `dev@local` (`lib/subscription.ts:28`, non-production only) |

Net: **the only real public contact address is a personal Gmail, on 13 mailto links, in Organization JSON-LD, and as the lead-notification default.** No domain mailbox exists in code; Resend domain verification is still the blocker recorded in the release report §12.

### c.3 Phone numbers

**No business phone number exists anywhere in shipped code.** All matches are fictional demo numbers: `components/marketing/CallTimeline.tsx:18` "604-555-0117", `lib/data/liveTools.ts:42,46` "778-555-0190" (dead file), `lib/data/showroom.ts:358` "604-555-0142", `app/agent/leads/*` "+1 (555) …". The Twilio number **`+16592223313` appears only in `DEPLOYMENT.md:41,64`, `PRODUCTION_LAUNCH.md:74,104`, `QUICK_DEPLOY.md:47,71`** — never in `app/`, `components/`, `lib/`; code reads `process.env.TWILIO_PHONE_NUMBER` (`app/api/agent/call/route.ts:39,61`; `lib/agent/campaignManager.ts:244`). (Those three docs also list the names of `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`; values were not read.)

### c.4 `href="#"`, dead social links, `mailto:`

- `lib/data/site.ts:20-22`: `twitter: "#"`, `instagram: "#"`, `linkedin: "#"`. `github` is real (`:23`). **Zero `"#"` anchors reach the DOM**: `Footer.tsx:71,76` guard both icons, `lib/seo.ts:66` filters `sameAs` (so `sameAs` = GitHub only), `lib/data/shop.ts:33` treats `"#"` as `/create`. Fixed by `860c6d1` (git log on Footer). Instagram is declared but never rendered.
- `mailto:` = **15** occurrences: 13 via `site.email` (`about:97`, `error.tsx:70`, `global-error.tsx:121` via its own const, `not-found.tsx:59`, `privacy:85,95`, `terms:81`, `BuildRequestForm:142`, `ConsultationCall:783,796` via `SUPPORT_EMAIL = site.email` (`:15`), `Footer:63,68`, `SolutionFinder:244` (dead)); 1 to a lead's email in the agent CRM (`agent/leads/[id]/page.tsx:165`); 1 comment (`MoltenForge.tsx:37`).

---

## d) Dead code and weight

### d.1 Files unreachable from any `app/` entrypoint (transitive import graph)

20 files, **244,113 bytes** of source:

```
components/CategoryGrid.tsx            2,219
components/FeaturedProducts.tsx        1,657
components/IndustryStrip.tsx             847
components/ProCheckout.tsx             6,256   (→ /api/stripe/checkout — no live caller)
components/ProductCard.tsx             2,838
components/SolutionFinder.tsx         11,944   (→ /api/recommend — no live caller)
components/ToolPaywall.tsx               889
components/home/HeroFlowField.tsx      9,613
components/home/HeroWorkerPreview.tsx  3,625
components/home/HomepageNew.tsx       18,421
components/home/LiveAIHome.tsx        23,511   (+ LiveAIHome.module.css 21.8 KB)
components/home/MoltenForge.tsx       71,108   (prod homepage; stale brand/email strings)
components/home/stage/HandStage.tsx   25,107
components/home/stage/HandVisual.tsx   6,622
components/home/stage/StageObjects.tsx 16,296
lib/agent/openaiConversationEngine.ts 12,368   (second "Sarah" script)
lib/data/liveTools.ts                 10,772
lib/data/tools.ts                     14,475   (retired Tools Pro catalogue)
lib/data/toolsPlan.ts                  2,190
tools/form-filler-ca/__tests__/verify.mjs 3,355
```

Plus `lib/data/shop.ts:38` `featuredService` — exported, imported by nothing (`app/shop/page.tsx:10` imports only `liveSaas`, `utmHref`). Confirms the R-report P3 list and extends it.

### d.2 Reachable in code but unreachable at runtime (redirected routes)

`app/ai-front-desk/page.tsx` and `app/forge/page.tsx` are the **only** importers of the three.js stack (`components/experience/PhoneScene.tsx`, `components/forge/ForgeScene.tsx` → `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`). Both routes are 308-redirected (`next.config.js:48-49`), so the four packages and ~120 KB of `components/experience/*` + `components/forge/*` + `lib/data/alwaysAnswering.ts` + `lib/data/forge.ts` are compiled into route chunks nobody can request.

### d.3 Heavy dependency → which routes actually reach it

| Package | Importing files | App entrypoints reaching it |
|---|---|---|
| `three`, `@react-three/{fiber,drei,postprocessing}` | `components/experience/PhoneScene.tsx`, `components/forge/ForgeScene.tsx` | **2** — `/ai-front-desk`, `/forge` (both redirected). **The homepage does not pull three.js**: `app/page.tsx` transitive closure has external imports only `next`, `next/link`, `react`, `lucide-react` (static analysis; bundle size is the build agent's to measure) |
| `framer-motion` | 12 files (`Reveal.tsx`, `MagneticButton.tsx`, `FAQSection.tsx`, `BuildRequestForm.tsx`, `SolutionFinder.tsx`, `tools/ui.tsx`, `experience/MissedCallCaught.tsx`, `forge/ForgeExperience.tsx`, `home/stage/*`×2, `intake/OccupationIntake.tsx`, `showroom/Showroom.tsx`) | **47** routes (every `LandingTemplate`/`LandingHub` page via `components/Reveal.tsx` + `MagneticButton.tsx`; the 5 free tools via `tools/ui.tsx`; `/create`, `/pricing`, `/shop`, `/solutions`, `/demo/*`). **Not the homepage** — it uses `components/marketing/Reveal.tsx` (framer-free, `ext=[react]`). Two components named `Reveal` exist; this is a trap |
| `tesseract.js`, `mupdf`, `mrz` | `tools/form-filler-ca/engine/{ocr,fill,mrz}.ts` | **1** — `/tools/form-filler` (dynamic import, `ssr:false`, `page.tsx:5-8`) |
| `pdfjs-dist`, `pdf-lib` | **0 importers** | none — removable |
| `bcryptjs`, `date-fns`, `clsx` | **0 importers** | none — removable |
| `twilio` | `lib/agent/callManager.ts`, `api/agent/call/webhook` | 3 API routes |
| `openai` | `lib/ai/core.ts`, `lib/agent/openaiConversationEngine.ts` (dead), 4 routes | 6 API routes (`consultation`, `demo`, `recommend`, `tools-demo`, `tools`, `tts`) |
| `stripe` | `lib/stripe.ts`, `api/stripe/webhook` | 3 API routes |
| `next-auth` | `lib/auth.ts`, `Navbar.tsx`, `Providers.tsx`, `login`, `AccountActions`, `ProCheckout` (dead) | 8 incl. **`app/layout.tsx`** and `middleware.ts` |
| `resend` | `api/build-request` | 1 |
| `zod` | `api/build-request`, `lib/ai/demoSchema.ts` | 2 |

### d.4 Dead or caller-less API routes

- `/api/recommend` — only caller `components/SolutionFinder.tsx:42` (unreachable). Calls OpenAI when `OPENAI_API_KEY` is set (`route.ts:28-35`), **no rate limit**. Dead endpoint with live spend.
- `/api/stripe/checkout` — only caller `components/ProCheckout.tsx:55` (unreachable). Auth-gated (`:21`), harmless, dead.
- `/api/tools` — Tools Pro generator; `ToolGenerator.tsx:37` defaults to `/api/tools-demo` and `ToolChat.tsx:53` calls `/api/tools-demo`; no live caller of `/api/tools` found (subscription-gated + 3-tier rate limit, `route.ts:210-287`).
- `/api/agent/call/webhook` — a stub: "NO database, NO OpenAI … just prove the route works" (`:2-3`), always answers TwiML `<Say>Test</Say>` (`:25`). `CallManager` points real calls at it (`lib/agent/callManager.ts:60-61`). The cold-call product cannot actually converse.

### d.5 Root-level document weight

31 Markdown files at repo root (`ROUTES.md`, `README_AGENT.md`, `README_COLD_CALLING.md`, `QUICK_START_COLD_CALLING.md`, `TWILIO_SETUP.md`, `TWILIO_QUICK_SETUP.md`, `DEPLOYMENT.md`, `PRODUCTION_LAUNCH.md`, `QUICK_DEPLOY.md`, `TOOLS-PRO-GO-LIVE.md`, three god-prompts, …). `ROUTES.md` still documents `/products`, `/dashboard` and "Click *Agent* in the navbar" — the marketplace era. These are read by every agent session and mislead.

---

## e) Duplicate destinations — one canonical per intent

| Intent | Routes serving it today | Evidence of overlap | Canonical → action |
|---|---|---|---|
| **Ask for a build / contact** | `/create` (form → `/api/build-request`, DB + Resend); `/start` (AI "call" overlay → `/api/consultation` + `/api/tts` + `/api/build-request`); every nav/footer/shop/solutions CTA → `/create` | `Navbar.tsx:98`, `Footer.tsx:99`, `site.ts:33` `bookingUrl: "/create"`; `app/start/page.tsx` title "talk to the Handbuilt AI" | **`/create`.** 308 `/start` → `/create` (or demote to `/demo/consultation`). Deletes `ConsultationCall.tsx` (38 KB), `/api/consultation`, `/api/tts`, `lib/data/builder.ts` |
| **See it work** | `/demo` (Showroom, 5 workers, `/api/demo` with caps); `/demo/assistant`, `/demo/lead`, `/demo/nudge`, `/demo/quote` (older `ToolChat`/`ToolGenerator` → `/api/tools-demo`, **no caps**); `ReceptionistChat` inside every `/use-cases/[slug]` | `app/demo/page.tsx:12-13`; `components/ToolChat.tsx:10-11` "Mirrors ReceptionistChat's look" | **`/demo`.** 308 the four `/demo/*` → `/demo`; delete `DemoPageTemplate`, `ToolChat`, `ToolGenerator`, `/api/tools-demo` (removes the unmetered OpenAI proxy, §f) |
| **What do you sell (catalog)** | `/services` (registry hub, 20); `/solutions` (hand-authored bento, `serviceSchema`, `app/solutions/page.tsx:20-23`); `/shop` (10 productized SKUs, `shopProducts.ts`); `/products` → `/solutions`; `/use-cases` (25) | Release report §2 #3: Starter package and shop SKU overlap (`packages.ts:31` vs `shopProducts.ts:76`); `research/01-current-site-audit.md` §3.2 | **`/services`** for the catalog, **`/pricing`** for numbers. 308 `/solutions` → `/services` and `/products/*` → `/services`. `/shop` is an owner product decision (two price lines) — if kept, it must stay the *only* page selling fixed-scope SKUs; if not, 308 → `/services` |
| **AI receptionist** | `/ai-receptionist`, `/ai-receptionist-for-contractors` (nav item), `/use-cases/ai-receptionist-for-contractors`, `/services/ai-receptionist-setup`, `/services/ai-voice-agent`, `/locations/ai-receptionist-surrey-bc`, 6 compare/resource pages | Fully analysed in `research/01-current-site-audit.md` §3.2 and `30-page-plan.md` §2.1 — cited | **`/ai-receptionist-for-contractors`** as the commercial page (it is the nav target, `site.ts:51`); merge the use-case duplicate per the page plan; `/ai-receptionist` stays the generic pillar per the owner decision cited there |
| **Who / where** | `/about`; footer service-area line; `/remote-ai-development`; `/locations` (19); `/creators` (second audience) | `Footer.tsx:57-60,160`; `30-page-plan.md` §2.5–2.6 | **`/about`** for identity; locations untouched (page plan); `/creators` = owner decision, not re-opened |
| **Cost** | 7 cost pages | `30-page-plan.md` §2.3 | Consolidate per the page plan (write-list #7) |

---

## f) Security surface

**`middleware.ts:1-7`** exports `next-auth/middleware` with `matcher: ["/agent/:path*"]` — it protects the seven dashboard **pages** and nothing else. `robots.ts:7` disallows `/api/`, `/agent/`, `/dashboard`, `/login`, `/cart` (hides from crawlers; not a control).

| Route (handlers) | Auth | Rate limit | Validation | Notes |
|---|---|---|---|---|
| `/api/agent/businesses/search` (POST, PUT) | **none** | none | `location` required (`:12`) | PUT ingests arbitrary CSV (`:44-58`) |
| `/api/agent/call` (POST, PUT) | **none** | none | `toNumber` required (`:49`) | **PUT places a real Twilio outbound call to any number in the body** when `TWILIO_*` env is set (`:33-69`); persona `AGENT_NAME \|\| "Sarah"` (`:63`). POST accepts `callId`/`userInput` with no Twilio signature check |
| `/api/agent/call/webhook` (GET, POST) | none | none | none | Stub TwiML "Test" (`:25`); no `twilio.validateRequest` |
| `/api/agent/calls` (GET, POST) | **none** | none | `callId` required | GET dumps up to 100 call records/transcripts from Prisma `Call` (`:5-13`) |
| `/api/agent/campaigns` (GET, POST, PUT) | **none** | none | field presence only | PUT `action: "start"` starts an outbound calling campaign (`:64-67`); module-level in-memory singleton (`:6`) |
| `/api/agent/contacts` (GET, POST), `/api/agent/contacts/[id]` (PUT, DELETE) | **none** | none | `company`,`phone` required | **GET returns every `Contact` row — names, phones, emails** (`contacts/route.ts:5-11`); POST error path echoes `error.message` (`:56-61`) |
| `/api/auth/[...nextauth]` | NextAuth Google (`lib/auth.ts:2,9`) | — | — | Dormant Tools Pro |
| `/api/build-request` (POST) | public by design | none found in scan (comments at `:16,:281` refer to Resend's limit) | zod `LeadSchema.safeParse` (`:42`) | Persists `BuildRequest` before email; 502 if both channels fail (memory) |
| `/api/consultation` (POST) | public | in-memory per-IP (`:39-44,:136`) | length/shape | OpenAI |
| `/api/demo` (POST) | public | `lib/rateLimit` per-minute + per-day + global cap; 1000-char input; injection check (`:1-42`) | zod `demoResponseSchema` | Best-guarded public endpoint |
| `/api/indexnow` (GET) | `?secret=` vs `INDEXNOW_PING_SECRET` (`:13-23`) | — | — | OK |
| `/api/recommend` (POST) | public | **none** | `outcome` required | OpenAI when key set (`:28-35`); **no live caller** |
| `/api/stripe/checkout`, `/api/stripe/portal` (POST) | 401 unless session (`checkout:21`, `portal:17`) | — | — | Dormant |
| `/api/stripe/webhook` (POST) | `constructEvent` signature (`:28`) | — | — | OK |
| `/api/tools` (POST) | subscription (`getSubStatus`) + IP/day/global limits (`:210-287`) | yes | yes | Retired product, no caller |
| `/api/tools-demo` (POST) | public | **none** (grep `rateLimit\|checkDemo\|clientIp` = 0 hits in file) | `kind` whitelist (`:98`), business ≤120 chars | **Unmetered OpenAI proxy** (`getOpenAI()` at `:150`) behind the four `/demo/*` pages |
| `/api/tts` (POST) | `sameOrigin` check (`:91`) | in-memory per-IP (`:110`) | ≤`MAX_CHARS` | OK for a demo |

`lib/rateLimit.ts:1-4` states the limits are "a FLOOR, not a fortress" — per-instance, reset on cold start. Vercel WAF rate rules are the real control; none can be verified from the repo.

**`lib/agent/conversationEngine.ts`** — outbound cold-call script. The AI introduces itself as a person: `"My name is Sarah, and I'm reaching out to local businesses…"` at **`:108` and `:119`** (also `lib/agent/openaiConversationEngine.ts:249`, unreachable). `:258` sells the product as one that "introduces itself as your AI assistant rather than pretending to be a person" — the studio's own script does the opposite. `README_AGENT.md:3-8` describes it as "human-like conversations" that "automatically call businesses". Combined with the "Test" webhook (§d.4) it is both non-compliant (CRTC/DNCL/CASL — legal question for the owner, flagged in the release report §D) and non-functional. **Nothing on the marketing site links to `/agent`** (the Navbar has no such item; `ROUTES.md` is stale).

---

## Severity-ranked defects

**P0 — fix before the transformation ships**
1. **`/api/agent/*` has no authentication** — 13 handlers across 7 files read/write PII (`contacts`), dump call transcripts (`calls`), and can place real outbound calls / start campaigns (`call` PUT, `campaigns` PUT) for anyone who finds the URL. `middleware.ts:5` covers pages only. Pre-existing on production.
2. **Human-persona cold-call agent in the production repo** — `conversationEngine.ts:108,119` "My name is Sarah"; `call/route.ts:63`; webhook stub returns "Test". Owner must decide: delete from this repo (recommended — it is not part of the website) or move to a private repo. Pre-existing on production.

**P1**
3. **`/api/tools-demo` and `/api/recommend` are unauthenticated, un-rate-limited OpenAI proxies** (`tools-demo/route.ts:150`; `recommend/route.ts:28-35`). `/api/recommend` has no live caller at all.
4. **Public contact is a personal Gmail** on 13 `mailto:` anchors, Organization JSON-LD (`seo.ts:37`, `page.tsx:90`) and the lead-notification default (`build-request/route.ts:262`); the domain mailboxes in dead code/docs (`build@`, `leads@`) do not exist in code and Resend is unverified.
5. **Brand name split three ways** — code "Handbuilt AI"/"Handbuilt AI Studio", owner-recorded temporary name "AI Built By Hand" (`30-page-plan.md` #11), domain `aibuiltbyhand.com`; wordmark literals differ per page (§b item 6). Blocks `sameAs`, GBP, citations.
6. **Legacy app screens inside marketing chrome** — `cart`, `dashboard`, `login`, `agent/*` render dark `#0a0a0a` pages under the cream Navbar with no metadata (root title, `index,follow`); `/cart` and `/dashboard` display fabricated sales figures; `/login` shows two logos; `/tools/form-filler` nests `<main>`.
7. **~120 KB of three.js UI + 4 packages compiled for two redirected routes**; `pdfjs-dist`, `pdf-lib`, `bcryptjs`, `date-fns`, `clsx` have zero importers.

**P2**
8. 20 unreachable files (244 KB) incl. `MoltenForge.tsx` (71 KB) with stale brand/email strings; `shop.ts featuredService`.
9. `/tools/form-filler`: indexable, canonical set, 0 inbound links, not in sitemap, 2.9 MB tool, off-positioning.
10. Duplicate destinations: `/start`≈`/create`; four `/demo/*`≈`/demo`; `/solutions`≈`/services`≈`/shop`; `/products` redirects live in code instead of config.
11. `Navbar` is a client component with `useSession` on every route; `ChromeGate` does client-side pathname matching and lists two redirected routes.
12. `organizationSchema` claims `areaServed` US/AU/NZ/UK (`seo.ts:44-49`) and `llms.txt` repeats it (`route.ts:16`) — unresearched markets (`30-page-plan.md` #14).
13. Social placeholders `"#"` for twitter/instagram/linkedin (`site.ts:20-22`); harmless in the DOM, but `sameAs` is GitHub-only.
14. 31 root Markdown docs, several describing retired products; three carry the Twilio number.
15. No `loading.tsx` on any route (silent-state rule); `/api/build-request` has no request rate limit in code.

---

## g) What `AGENTS.md` must contain (hard-won traps only; `CLAUDE.md` becomes `@AGENTS.md` + the graphify block)

1. **Pages come from data, not routes.** `lib/data/*.ts` → `lib/data/registry.ts` → `app/sitemap.ts` + `app/llms.txt/route.ts`. Add/remove a landing page by editing the data file; the only exceptions are the 12 money pages (one route file each wrapping `getMoneyPage`) and the 5 free tools. Services/industries/creators are split across `_b`/`_c` files — grep all of them.
2. **Never set `alternates.canonical` on the root layout** (`app/layout.tsx:59-69` records why: it declared 11 app routes duplicates of the homepage). Every public page declares its own canonical.
3. **Pricing source of truth is `lib/data/packages.ts`.** Copy files that restate prices must read from it; `scripts/seo-diff.js` fails the build on JSON-LD price movement (`app/page.tsx:80-81`). The `_industries_b`/`money`/`liveTools` drift of 2026-08 is the anchor.
4. **No `lastModified` in the sitemap unless it is a real date** (`app/sitemap.ts:6-22`).
5. **`ChromeGate`: "/" must never be hidden** (`components/ChromeGate.tsx:12-15`). (Delete this rule once route groups replace the gate.)
6. **`site.bookingUrl` is a form, not a calendar** — no "Book a call" copy (`lib/data/site.ts:25-33`).
7. **Secrets:** `.env*.local`, `env.local.txt`, `env*.txt` are gitignored (`.gitignore:27-32`). Never read them for values; a `cal_live_` key once sat in plaintext `env.local.txt`. The GSC token (`layout.tsx:99-100`) and IndexNow key (`site.ts:18`) are public by design.
8. **`npm run build` = `prisma migrate deploy && next build`** (`package.json:7`) — a build needs `DATABASE_URL`; Preview uses the Neon `preview` branch, `RESEND_API_KEY` is Production-only, so preview never sends email.
9. **Always `git fetch` and diff against `origin/main`** — local `main` has been stale by 5 commits; production = `origin/main`.
10. **Form-filler is CSP- and webpack-coupled:** `next.config.js:11-25,92-99` (route-scoped CSP) and `:102-117` (WASM + `node:` shim). Moving the route means moving both.
11. **Two `Reveal` components:** `components/Reveal.tsx` (framer-motion) vs `components/marketing/Reveal.tsx` (CSS). The homepage must stay framer-free.
12. **Rate limits in `lib/rateLimit.ts` and the per-route in-memory maps are per-instance floors** — anything cost-bearing needs Vercel WAF rules too.
13. **`middleware.ts` protects `/agent/:path*` pages only, not `/api/agent/*`** — until the agent code is removed, do not set `TWILIO_*` in any Vercel environment.
14. **Gate before claiming done:** `npx tsc --noEmit`, `npx vitest run` (114 tests in `lib/tools/*.test.ts`, `lib/track.test.ts`, `tests/build-request.test.ts`), `npx next build`, then the 15-step production smoke test in `research/keyword-gap-2026-08-12/23-CONSOLIDATED-RELEASE-REPORT.md` §10.
15. **Never author content that asserts customers, results, testimonials, or a phone number that does not exist** — the site has none; `research/data/entity-facts.json` `prohibited_claims` governs.
16. Keep the `<!-- BEGIN:nextjs-agent-rules -->` … `<!-- END -->` block if Next tooling adds one; edit outside it only.

No status, branch names, counts-as-of, or TODOs go in the file.

---

## Proposed implementation plan (file ownership)

**W0 — Security & legal (owner decision first, then one PR)**
- Owner decides: delete cold-call agent. Delete `app/agent/**`, `app/api/agent/**`, `lib/agent/**`, `components/AgentCallButton.tsx`, `middleware.ts`; remove `twilio` from `package.json`; archive `README_AGENT.md`, `README_COLD_CALLING.md`, `QUICK_START_COLD_CALLING.md`, `TWILIO_SETUP.md`, `TWILIO_QUICK_SETUP.md`, `DEPLOYMENT.md`, `PRODUCTION_LAUNCH.md`, `QUICK_DEPLOY.md` to `docs/archive/`. Prisma models `Contact`, `Campaign`, `Call`, `Lead` → drop in a migration **only with owner approval** (data). If the owner keeps it: add `getServerSession` + email allowlist to every `/api/agent/*` handler and `twilio.validateRequest` to the webhook — but the "Sarah" persona must still change.
- Delete `/api/recommend` + `components/SolutionFinder.tsx`; delete `/api/tools-demo` with the four `/demo/*` pages (W3) or, if kept, wrap it in `lib/rateLimit` exactly like `/api/demo`.

**W1 — Chrome unification** (`app/layout.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, `components/ChromeGate.tsx` (delete), `components/Providers.tsx`, `components/creators/CreatorStudio.tsx`, `app/tools/form-filler/page.tsx`, new `app/(marketing)/layout.tsx`, `app/(app)/layout.tsx`)
- Route groups; server-component Navbar with a client island for the mobile sheet; remove `useSession`; strip CreatorStudio's own header/footer; un-nest `<main>`; render `site.name` instead of literal wordmarks.

**W2 — Brand & contact** (`lib/data/site.ts`, `app/global-error.tsx:20`, `app/api/build-request/route.ts:262,266`, `lib/seo.ts`, `app/llms.txt/route.ts`, `lib/data/compare.ts:1557`)
- Owner supplies: final name, founder surname, one domain mailbox, LinkedIn URL. Then a single `site.ts` edit propagates; replace the hard-coded Gmail in `global-error.tsx` with an import; set `LEAD_NOTIFY_EMAIL`/`LEAD_FROM_EMAIL` in Vercel after Resend verifies the domain (owner action); narrow `areaServed`/llms.txt to what was researched.

**W3 — Dead code & IA** (`next.config.js`, `package.json`, deletions)
- Delete the 20 unreachable files, `app/ai-front-desk/`, `app/forge/`, `components/experience/`, `components/forge/`, `lib/data/alwaysAnswering.ts`, `lib/data/forge.ts`, `app/cart/`, `app/dashboard/`, `app/products/`; remove `three`, `@react-three/*`, `pdfjs-dist`, `pdf-lib`, `bcryptjs`, `date-fns`, `clsx`.
- Add redirects: `/products/:path*`→`/services`, `/cart`→`/pricing`, `/dashboard`→`/`, `/start`→`/create`, `/demo/:slug`→`/demo`, `/solutions`→`/services`. Keep `/shop` pending the owner's two-price-line decision.
- Tools Pro backend (`login`, `account`, `api/stripe/*`, `api/auth`, `api/tools`, `lib/{auth,stripe,subscription}.ts`) — owner call: "dormant + reversible" today; recommend removal in the same PR as W1 so `next-auth` leaves the root layout.
- `/tools/form-filler`: owner picks list-it or `noindex`; either way move `tools/form-filler-ca` behind the decision.

**W4 — Instruction files** (`AGENTS.md` new, `CLAUDE.md` → pointer, root `*.md` triage to `docs/archive/`). Content per §g. Edit on the default branch only.

**Sequencing:** W0 before anything is deployed; W1+W3 in one branch (they touch the same layout/route files); W2 gated on owner facts; W4 last, after the file layout settles.

**Not verified from here:** bundle sizes (build agent), Vercel env/WAF state, whether any Twilio env is set in production, GBP/Resend status.
