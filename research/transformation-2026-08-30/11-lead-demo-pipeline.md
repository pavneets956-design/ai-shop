# 11 — Lead-capture + live-demo pipeline, end to end

**Agent:** A11 · **Date:** 2026-08-30 · **Mode:** READ-ONLY static audit
**Repo:** `C:/Users/gillp/Documents/Claude/Projects/AI Shop` · branch `feat/site-transformation-2026-08-30` · HEAD `e732d98` (same commit as `fix/dead-social-link`)

> **Verification boundary.** Nothing was built, started, or POSTed. No browser. Every claim below is
> read from source at HEAD and cited `file:line`. Where a claim is about production behaviour I say
> "at HEAD" — production runs `origin/main`, which memory records as ~35 commits behind this branch
> (`release-preview-2026-08-12.md`). I cannot see the Vercel dashboard or the live DB from here.
>
> Prior work read first and built on: `research/keyword-gap-2026-08-12/16-conversion-audit.md`
> (S1–S13, P1–P13) and `22-PRE-DEPLOYMENT-REPORT.md` (the 8 Phase-0 commits, incl. `e7a7bef` /start
> truthfulness and `25aeaa8` /demo disclosure). I re-verified each of their lead/demo findings against
> HEAD and mark them **FIXED**, **STILL OPEN**, or **NEW** below.

---

## 0. Three things this audit found that the prior audits did not

1. **The "Try it live" chat on 9 of 25 use-case pages can never answer.** `components/ReceptionistChat.tsx:48-56`
   posts `{ business, messages }` to `/api/demo` and renders `data.reply`. `app/api/demo/route.ts` never
   returns a `reply` key — every branch returns `{ response: DemoResponse, fallback?, limited? }`
   (`:94, :99, :110-114, :119, :125, :147, :152`). So `data.reply` is always `undefined` and the visitor
   sees `"Sorry, could you say that again?"` (`ReceptionistChat.tsx:56`) on **every** turn, forever —
   while the page above it says *"This is a real, working AI … it's the exact experience they'd get"*
   (`app/use-cases/[slug]/page.tsx:149-150`). When `OPENAI_API_KEY` is set, each of those doomed turns
   also spends a real completion (`route.ts:131-143`, `max_tokens: 600`) whose output is thrown away.
   Mounted for solutions `AI Receptionist` (4 pages), `AI Booking Assistant` (1), `AI Website Chatbot` (2),
   `AI Lead Follow-Up Agent` (1), `AI Customer Support Bot` (1) — `lib/data/useCases.ts:895-901`.
2. **`/start` still tells the visitor the plan was emailed to them. It never is.** After `e7a7bef` the
   *failure* path is honest, but the *success* line reads `"Your plan has been sent to {email}. I'll
   follow up by email shortly."` (`components/ConsultationCall.tsx:774-778`) and the voice says
   `"Done — it's on its way."` (`:549`) after asking `"Where should I send it?"` (`:532`). The only email
   `/api/build-request` sends goes **to the owner** — `to = LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com"`
   (`app/api/build-request/route.ts:262`) with the visitor as `replyTo` (`:274`). Nothing is ever sent to
   the visitor's address. This is 16-conversion-audit S6, still open, and now more specific than before.
3. **`SolutionFinder` is dead code — but two live CTAs point at it.** `components/SolutionFinder.tsx` is
   imported by nothing (grep `SolutionFinder|id="finder"` across `app/` + `components/` returns only the
   file itself). Yet `app/solutions/page.tsx:45` ("Find my AI solution" → `/#finder`) and
   `app/use-cases/[slug]/page.tsx:118` ("Not sure? Use the finder" → `/#finder`, on all 25 use-case pages)
   send visitors to an anchor that does not exist on the homepage (`app/page.tsx:6-17` mounts no finder).
   Its backend `/api/recommend` is a live, unauthenticated, un-rate-limited OpenAI endpoint with no caller.

---

## 1. Entry points → destination map

Every link on the site that lands on a lead-capture or demo surface, what it passes, and how the
surface consumes it. Live = reachable from a mounted component at HEAD.

### 1a. Into `/create` (the only real lead form)

| Source (file:line) | Label | Params passed | Consumed by `BuildRequestForm.tsx`? |
|---|---|---|---|
| `components/Navbar.tsx:98-100` (desktop) | "Request a review" | none | — |
| `components/Navbar.tsx:152-154` (mobile) | "Request a free AI opportunity review" | none | — |
| `components/marketing/Hero.tsx:66-69` | "Request a free AI opportunity review" | none | — |
| `components/marketing/HomeSections.tsx:151-152, :348-349, :431-432` | "Request a free AI opportunity review" (×3) | none | — |
| `components/Footer.tsx:99-100` | "Request a review" | none | — |
| `components/LandingTemplate.tsx:40-43, :89, :258, :323` (money/industry/location/service pages) | `content.ctaLabel ?? "Start a build"`; industry pages use "Request a free AI opportunity review" (`lib/data/_industries_b.ts:53,135,217`) | `?package=<packageId>` when the page has one | ✅ `:45, :66-68` → preselects budget chip |
| `lib/data/packages.ts:37, :58, :75` (pricing cards) | "Start with Starter" / "Build my system" / "Request a quote" | `?package=starter\|business\|custom` | ✅ budget |
| `components/ServicePackages.tsx:86` | Care Plan CTA | `?package=care` | ❌ `packages.some(p => p.id === "care")` is false at `:66` → **silently dropped**, budget = "" |
| `lib/data/alwaysAnswering.ts:211, :224, :236` | "Get this built" / "Plan my system" | `?package=starter\|business\|custom` | ✅ budget |
| `app/use-cases/[slug]/page.tsx:115-116, :215, :284` | "Request this build" | `?package=<uc.packageId>` | ✅ budget |
| `app/shop/page.tsx:201-205` (10 cards) | "Get it built" | `?build=<slug>` | ✅ `:46, :59` → goal = `"<name> — <outcome>"`; `:68` budget = product `packageId` |
| `app/demo/{assistant,lead,nudge,quote}/page.tsx:23, :23, :42, :53` via `DemoPageTemplate.tsx:70-72` | "Get this installed" | `?build=ai-chatbot-for-website` / `ai-lead-capture-form` / `ai-invoice-reminder-system` / `ai-quote-generator` | ✅ as above |
| `components/showroom/Showroom.tsx:197-199, :609-610` | "Get this installed" / "Start my build" (at limit) | `?industry=<id>&goal=<Worker> for my <Industry> business` | ✅ `:48-50` goal + trade preselect (ids match `lib/data/intake.ts:6-7`) |
| `lib/data/freeTools.ts:584` via `components/tools/ToolCta.tsx:21-28` (5 free tools) | per-tool label | `?goal=<ctaGoal>&src=tool-<slug>` | ✅ `:48` goal, `:54` src → posted `:118`, persisted (`tests/build-request.test.ts:271, :289`) |
| `app/tools/page.tsx:147` | "Get a free workflow fit check" | `?src=tools-hub` | ✅ src only |
| `components/PhoneReceptionistPlan.tsx:71` (`/pricing`) | — | `?goal=AI Phone Receptionist — answer and book calls` | ✅ goal |
| `components/home/HeroWorkerPreview.tsx:82`, `components/home/MoltenForge.tsx:40`, `components/experience/MissedCallCaught.tsx:585` | — | `?goal=…` | **dead** — none of these components is mounted (`app/page.tsx:6-17`; `/ai-front-desk` and `/forge` 308 in `next.config.js:48-49`) |
| `components/creators/CreatorStudio.tsx:18` | — | `?goal=creator-system` | ✅ goal |
| `components/UseCaseBentoGrid.tsx:28` (`/solutions`) | — | `?category=<slug>` | ❌ **silently dropped** — form never reads `category` |
| `components/SolutionFinder.tsx:210-211` | "Book a free 15-min call" | `?package=&outcome=` | dead (not mounted); `outcome` would be dropped anyway |

**Analytics on these clicks:** only the free-tool CTA fires an event (`tool_cta_clicked`,
`ToolCta.tsx:23`). `lead_from_tool` is declared in `lib/track.ts:13` and **fired nowhere** (grep:
only `lib/track.ts:13` and `lib/track.test.ts:24`). No CTA anywhere else is instrumented.

### 1b. Into `/start` (the voice "AI Builder")

The only live inbound link is the shop's flagship card: `lib/data/shopProducts.ts:278` `demoHref: "/start"`
on **"AI Receptionist OS — From $349/mo + setup"** (`:270`), rendered as "Try it live"
(`app/shop/page.tsx:207-210`). Every other `/start` link lives in unmounted components
(`components/home/HomepageNew.tsx`, `components/home/stage/HandStage.tsx`,
`components/experience/MissedCallCaught.tsx` — see the dead-code row above). `/start` is otherwise
reachable only by URL and the crawlable H1 (`app/start/page.tsx:23-41`).

### 1c. Into demos

| Surface | Reached from | Backend |
|---|---|---|
| `/demo` (Showroom) | Footer `components/Footer.tsx:159` "Live demo"; shop card `shopProducts.ts:77`; `builder.ts:182, :217` | `/api/demo` |
| `/demo/assistant`, `/demo/lead` | shop cards `shopProducts.ts:144, :122`; `builder.ts:196` | `/api/tools-demo` (chat kinds) via `ToolChat.tsx:53` |
| `/demo/quote`, `/demo/nudge` | shop cards `shopProducts.ts:99, :166`; `builder.ts:187, :208` | `/api/tools-demo` (generator kinds) via `ToolGenerator.tsx:70` |
| 9 use-case pages "Try it live" | `app/use-cases/[slug]/page.tsx:139-164` | `/api/demo` via `ReceptionistChat.tsx:48` — **contract mismatch, always fails** (§0.1) |

### 1d. `mailto:` surfaces (all → `site.email` = `pavneets956@gmail.com`, `lib/data/site.ts:11`)

`components/Footer.tsx:63, :68` · `app/about/page.tsx:97` · `app/privacy/page.tsx:85, :95` ·
`app/terms/page.tsx:81` · `app/error.tsx:70` · `app/global-error.tsx:121` · `app/not-found.tsx:59` ·
`components/BuildRequestForm.tsx:142` (success fallback) · `components/ConsultationCall.tsx:783, :796`
(no-email / failed). Still a personal Gmail on every one (16-audit §4, unchanged).

---

## 2. `/create` — the Build Request form, field by field

**Page:** `app/create/page.tsx`. H1 "Tell us what you want to build" (`:25`); promise "You'll get a real
reply with a plan and a quote within one business day — no obligation." (`:30-31`). `<Suspense>`
skeleton while the client form hydrates (`:36`). **No `loading.tsx`** for the route (fine — the
Suspense covers it).

**Component:** `components/BuildRequestForm.tsx` (client, `useSearchParams`). Steps
`["The build", "Your setup", "You"]` (`:41`).

### 2a. Fields

| Step | Field | Type | Label (exact) | Required | Options (exact strings) | Default / preset |
|---|---|---|---|---|---|---|
| 0 "The build" | `goal` | textarea rows=3, autoFocus | "What are you trying to build?" | **Yes** — `canAdvance = form.goal.trim().length > 0` (`:86`); Next button disabled (`:323`) | placeholder "e.g. Something that answers my phone and books jobs while I'm on site" (`:217`) | `?build=` → `"<name> — <outcome>"`, else `?goal=` (`:59`) |
| 0 | `useType` | chips | "Is this for business or personal use?" | no | "For my business", "Personal use" (`:29-32`) | `"business"` |
| 0 | `industry` | chips (wrap) | "What's your trade / industry?" | no | `TRADES` (`lib/data/intake.ts:30-141`): Landscaping, Plumbing, Electrical, Cleaning, Dental / Clinic, Salon, Restaurant, Real Estate, Moving, Something else | `?industry=` if it matches a trade id (`:50`) |
| 1 "Your setup" | `intake[*]` | `OccupationIntake` (`components/intake/OccupationIntake.tsx`) — 2–5 trade-specific text/chip fields, e.g. Plumbing: "What's the issue" / "Urgency" / "Service address / area" / "Active water or gas issue?" / "Best callback number" (`intake.ts:47-51`) | rendered only when a trade with fields is selected (`:232`) | no | per trade | `{}` |
| 1 | `tasks` | textarea rows=2 | "What should the AI actually do?" | no | placeholder "e.g. answer calls, qualify leads, send follow-up texts, sync to my calendar" (`:244`) | "" |
| 1 | `existing` | chips | "Do you already have a website or app?" | no | "Nothing yet", "A website", "An app", "Both" (`:34-39`) | `"none"` |
| 1 | `website` | `<input type="url">` | "Your website (if you have one)" | no | placeholder `https://yourbusiness.com` | "" |
| 1 | `tools` | text | "Tools you use today" | no | placeholder "e.g. Jobber, Google Calendar, Shopify" | "" |
| 1 | `budget` | chips (wrap) | "Budget range" | no | **At HEAD, rendered from the registry** (`:15-20` via `packagePriceLabel`, `lib/data/packages.ts:122-125`): `"From $1,500 (one tool)"`, `"$3,500–$7,500 (a system)"`, `"From $10,000 (custom app)"`, `"Not sure yet"` | `?package=` if it is a real package id, else the `?build=` product's `packageId`, else "" (`:66-68`) |
| 1 | `timeline` | chips (wrap) | "Timeline" | no | "ASAP", "Within a month", "This quarter", "Just exploring" (`:22-27`) | "" |
| 2 "You" | `name` | text, `required` | "Name *" | **Yes (native)** | placeholder "Your name" | "" |
| 2 | `email` | `type="email"`, `required` | "Email *" | **Yes (native)** | placeholder "you@business.com" | "" |
| 2 | `phone` | `type="tel"` | "Phone" | no | placeholder "Optional" | "" |

**The budget question — status of the known live defect.** The brief's stale ranges
(`~$1,000 / $2,500–$5,000 / $7,500+`) are documented as the *old* drift in the source comment at
`BuildRequestForm.tsx:13-14` and are gone at HEAD. Whether production still shows them depends
entirely on whether this branch has been deployed; memory says it has not (`origin/main` = `3031d36`,
35 commits behind). **I cannot verify production from here.** Note the chips are stored by **id**
(`starter`/`business`/`custom`/`unsure`), so the email shows `Budget: business`, not the label
(`route.ts:376`, `:561`).

### 2b. Submit handler, validation, state machine

- **State:** `status: "idle" | "sending" | "done" | "error"` (`:76`). No `duplicate` state on the
  client — a server `deduped:true` is a 200 and shows the normal success (`:122-123`). That is correct
  behaviour (the lead *is* stored) and matches the route's contract (`route.ts:61-73`).
- **Enter on steps 0–1 advances, never submits** (`:96-100`).
- **Client guard** (`:102-105`): `!name.trim() || !email.trim() || !email.includes("@")` → `go(2)`.
  On step 2 that is a **no-op** (you are already on step 2): whitespace-only name passes native
  `required`, fails `.trim()`, and the click does nothing on screen. **16-audit S8 — STILL OPEN.**
- **Native browser bubbles** for empty name/email (`:286, :290`). **S9 — STILL OPEN.**
- **POST** `/api/build-request` with `{ type:"build-request", ...form, industry:<trade label>, src?, intake? }`
  (`:109-121`). `if (!res.ok) throw new Error()` (`:122`) — the server's human 502 message
  (`route.ts:124-125`) is discarded; the client shows its own generic line. **S10 — STILL OPEN.**
- **Loading:** button disabled + spinner + "Sending…" while `status === "sending"` (`:329-333`). ✅
  Double-submit guarded by the disabled button only (no idempotency token; server dedupe covers the
  rest, `route.ts:160-172`).
- **Success screen** (`:129-148`): "Request received." / "Thanks, {first name} — I'll review what you
  want to build and reply within one business day with a plan and a quote." / "Need it sooner? Email
  {site.email}". ✅ Truthful — no "check your inbox". The form unmounts; typed data is gone but the
  request is stored.
- **Error** (`:306-310`): red box "Something went wrong sending that. Email {site.email} and I'll sort
  it out." Form stays mounted with **all typed data intact** (`status` flips, `form` untouched). ✅
  No retry button — the user re-clicks Send (allowed: `disabled={status === "sending"}` only).
- **Honeypot:** **none** in this form. (The retired `/forge` form had one — `components/forge/ForgeExperience.tsx:370-375, :469-473` — and `/forge` 308s to `/` per `next.config.js:49`.)
- **Rate limit / origin check on `/api/build-request`:** **none** (§4). **S12 — STILL OPEN.**
- **UTM / referrer / landing page capture:** **none**. The only attribution is `?src=` from free tools
  (`:54`). grep `utm_|document.referrer|landingPage` across `app/ components/ lib/` hits only the
  outbound shop-link helper `lib/data/shop.ts:28-34`.
- **Privacy text:** `:297-299` "No spam, no obligation. You'll get a real reply from a real person within
  one business day." No link to `/privacy`, no consent checkbox, no statement of what is stored.
  (`/privacy` exists — `app/privacy/page.tsx`.)
- **Prefill trust:** `?goal=` is rendered straight into the textarea (`:59`, `:215`) — React-escaped,
  so not an XSS vector; but any URL can pre-write the "goal" the owner receives. Low risk, note only.

---

## 3. `/start` — what it actually is

**Page:** `app/start/page.tsx` — crawlable H1 "Start your AI consultation" + copy "Talk to the Handbuilt
AI for about a minute…" (`:24-30`), then `<ConsultationCall />` (`:43`), a **fixed full-screen overlay
z-100** (`ConsultationCall.tsx:810`) that covers nav and footer.

**It is not an LLM.** `components/ConsultationCall.tsx:33-35`: *"Fully deterministic + zero API cost:
the plan, pricing, and routing all come from lib/data/builder.ts"*. The interview is a hard-coded
script (`runBuilder`, `:451-557`). **`/api/consultation` has zero callers** (grep `api/consultation`
across `app/ components/ lib/` → only its own file and the build-request comment). Its header comment
(`app/api/consultation/route.ts:7-20`) describes a caller that no longer exists.

**APIs it does call:** `/api/tts` (`:330-334`, premium voice, falls back to browser `SpeechSynthesis`)
and `/api/build-request` (`:426-439`). Not `/api/consultation`, not `/api/recommend`.

### 3a. The scripted flow (every user-visible state)

| # | State | What the visitor sees / hears | Source |
|---|---|---|---|
| 0 | Gate | "Tap to start the AI Builder" / "turn your sound on · it talks you through it" — nothing happens until tapped (audio unlock) | `:605-617` |
| 1 | Speaking | 5 animated lines + typewriter text + blinking cursor; `voice: {name}` badge top-right | `:620-635, :603` |
| 2 | Q1 chips | "Hi — I'm the AI Builder. Tell me what part of your business is wasting the most time right now." → chips Answering calls / Following up with leads / Sending quotes / Chasing unpaid invoices / Scheduling jobs / Something else | `:454-455, :74-81` |
| 3 | Q2 input | "Got it. What's the business called?" (placeholder "e.g. Delta Turf Mowers") | `:461-462` |
| 4 | Q3 chips | per-intent volume question, e.g. "Roughly how many calls do you miss in a week?" → A few / 5–15 / 15–30 / 30+ | `:465-466, :105-146` |
| 5 | Thinking | 3 dots (`aria-label="designing"`), 900 ms | `:476-478, :719` |
| 6 | **Diagnosis card** | "Current problem" / "Potential impact" / "Recommended system" / "Build time" / **"Estimated investment"** — then spoken: "I'd build you the {system} — roughly {priceRange}, ready in {timeline}." | `:479-491, :639-671` |
| 7 | Micro-yes | "Want me to design the exact workflow?" → single chip "Yes, show me the plan" | `:494-495` |
| 8 | Workflow card | 5-step vertical flow from `builder.ts` | `:498-499, :673-686` |
| 9 | Q4–Q6 | team size chips / jobs per week input / software input | `:502-515` |
| 10 | Thinking → **Plan card** | "Your AI Build Plan" with Business / Recommended systems / Estimated time saved / Estimated launch / Estimated investment | `:518-529, :688-716` |
| 11 | Email | "Where should I send it?" → input; one re-ask on invalid | `:532-537` |
| 12 | Close (valid email) | spoken "Done — it's on its way. Here's where to go next." → `sendLead()` fires in background | `:541-549` |
| 12′ | Close (invalid ×2) | spoken "I couldn't read that email, so I haven't sent anything yet…" → `leadStatus = "no-email"` | `:551-555` |
| 13 | Done CTAs | primary route (e.g. "See your AI Receptionist →" `/ai-receptionist`), demo link, "Back to site" | `:754-770`, routes `builder.ts:176-219` |
| 13a | `leadStatus:"sending"` | "Sending your plan…" | `:771-773` |
| 13b | `leadStatus:"sent"` | **"Your plan has been sent to {email}. I'll follow up by email shortly."** | `:774-779` |
| 13c | `leadStatus:"no-email"` | red: "No email captured, so nothing was sent. Copy your plan from the screen, or email {gmail} and I'll rebuild it with you." | `:780-788` |
| 13d | `leadStatus:"failed"` | red: "Your plan didn't send — that's a fault on our end. [Try again] or email {gmail}…" — retry re-arms the guard (`:444-446`) | `:789-801` |

`e7a7bef` is confirmed present: `sendLead` awaits, checks `res.ok` (`:440`), drives `leadStatus`
(`:178-180`). **16-audit S4/S5 — FIXED.** The `"no-email"` state is the "fixed no-email state" the
brief refers to (`:551-555`, `:780-788`).

### 3b. What is still wrong on `/start`

1. **False delivery claim on success** (§0.2). `:532` "Where should I send it?", `:549` "it's on its
   way", `:776` "sent to {email}". Nothing is sent to that email (`route.ts:262, :274`). The visitor
   leaves believing a plan is in their inbox. Fixing the failure path without fixing the success line
   left the more common lie in place.
2. **Phantom prices, spoken aloud.** The "Estimated investment" comes from `lib/data/builder.ts`:
   `$1,500–$2,500` (`:68, :84, :115`), `$1,500–$3,000` (`:100, :131`), `$3,500–$7,500` (`:147`). Only the
   last matches `packages.ts`. The first two are the "phantom band" flagged as 16-audit **P9 — STILL
   OPEN**, and here it is not buried in prose — it is the headline number on the diagnosis card
   (`:487`) and read out by the voice (`:490`).
3. **Price-model collision on the only inbound link.** The visitor clicks "Try it live" on a **$349/mo**
   shop card (`shopProducts.ts:270, :278`) and is told by the AI Builder that the system is
   **$1,500–$2,500 one-time**. Two business models, one click apart.
4. **Mislabelled payload.** `kind: a.pain` and `want: a.pain` (`:433-434`) → the owner's email shows
   `Type: Answering calls` (`route.ts:331`). `city: ""` always (`:435`). No phone is ever asked for.
   The useful qualifiers (volume, team, jobs/week, software) only survive inside the free-text
   `transcript` (`:405-416`).
5. **Voice-gated.** Nothing happens without a tap and (ideally) sound; no text-only mode; ~9 turns
   before the email ask. Mobile users on a job site are the stated audience.
6. **Orphaned paid endpoint.** `/api/consultation` (OpenAI, 24 req/min/IP, `max_tokens 240`) has no
   caller, no origin check, no auth. Dead code that can still be billed.

### 3c. Verdict: `/create` is the better lead path, by a wide margin

`/create`: one inbound link from every page, durable + truthful acceptance, structured fields the
owner can act on, trade-specific intake, `?src=` attribution, honest success copy. `/start`: one
inbound link (from a card whose price contradicts it), voice-gated, phantom prices, false "sent to
your email" close, mislabelled fields, no phone. **Recommendation:** demote `/start` to a demo of the
AI Builder (or retire it) and never present it as a lead path until (a) it quotes `packages.ts`
labels and (b) its close is honest. Do not spend design effort making it a second form.

---

## 4. Server: `/api/build-request`, the `BuildRequest` model, rate limiting

### 4a. `app/api/build-request/route.ts` — walk-through

- **Contract comment** `:9-24` (truthfulness contract; env `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`,
  `LEAD_FROM_EMAIL`). **Validation** `:28-30`: zod `{ email: z.string().trim().email() }.passthrough()`.
  Everything else is optional and **unbounded** — no field length caps, no key allow-list; the whole
  body is stored as `payload` JSON (`:184`). Bad JSON → 400 `{ error: "Invalid request" }` (`:39`);
  bad email → 400 `{ error: "Valid email required" }` (`:45`).
- **Log** `:53` `console.log("[AI-SHOP LEAD]", JSON.stringify(lead))` — the full lead incl. email/phone
  goes to Vercel logs on every request (PII in logs; note only).
- **`strict = NODE_ENV === "production"`** `:57` — true on Vercel preview *and* prod.
- **Persist FIRST** `persistLead` `:154-208`: `goal = goal ?? want` (`:159`); `fingerprint = sha256(email |
  goal/want | tasks | name | source/type)` normalised (`:216-230`); `dedupeKey = fingerprint:<10-min
  bucket>` (`:161`). Fast-path `findFirst(fingerprint, createdAt ≥ now−10min)` → `{deduped:true}`
  (`:164-172`); else `create` (`:174-188`); P2002 unique race → resolve to winner (`:192-203`); any
  other error → `{ ok:false }` after `console.error` (`:205-206`).
- **Duplicate response** `:61-73`: **200** `{ ok:true, id, deduped:true, delivery:{persisted:true, emailed:false} }`.
  A duplicate returns **success**, never an error, and sends **no second email**. ✅
- **Notify** `sendNotification` `:252-292`: no key → `{ok:false, reason:"no_key"}` (`:257`).
  `from = LEAD_FROM_EMAIL || "Handbuilt Leads <onboarding@resend.dev>"` (`:266`);
  `to = LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com"` (`:262`); `replyTo: email` (`:274`);
  `subject: "New Handbuilt {kind}: {name || email}"` (`:275`) where kind ∈ "AI consultation" |
  "Plan request" | "Build request" (`:302-307`); `text` + branded `html` (`:276-277`, builders `:318-603`).
  Resend `{ error }` inspected (`:282-285`) → `provider_error`; throw → `exception` (`:287-291`).
  **No email is ever addressed to the lead.**
- **Missing key in strict mode** → `console.error` only (`:77-81`). The lead is DB-only and the owner is
  **not told** unless someone reads the log drain. Backend silent state (see §6 P1-4).
- **Delivery flag** `emailed:true` written best-effort after success (`:84-90`).
- **Accepted** = `persist.ok || notify.ok` → **200** `{ ok:true, id, delivery:{persisted, emailed} }` (`:92-99`).
- **Both failed, non-strict (local dev only)** → 200 `{ ok:true, devMock:true, delivery:{false,false}, note }` (`:102-114`).
- **Both failed, strict** → **502** `{ ok:false, error:"We couldn't save your request just now. Please email us and we'll jump right on it." }` (`:116-128`) after `console.error("CRITICAL…")`.

### 4b. `prisma/schema.prisma:205-229` — `BuildRequest`

`id cuid` · `name?` · `email` · `phone?` · `source?` ("build-request" | "plan" | "ai-builder" | "consultation")
· `kind?` · `goal? @db.Text` · `fingerprint?` · `dedupeKey? @unique` · `payload Json` · `status @default("new")`
(new/contacted/quoted/won/lost) · `emailed Boolean @default(false)` · `createdAt` · indexes on
`email`, `createdAt`, `status`, `fingerprint`. **No column for src/UTM/referrer/landing page/IP/user-agent**
— `src` survives only inside `payload` (verified by `tests/build-request.test.ts:271-288`).
**No admin view reads this table**: `/agent/leads` renders `mockLeads` (graphify node
`app/agent/leads/page.tsx:L22`; `PREVIEW_LEADS.md` "This is a preview with mock data").

### 4c. `lib/rateLimit.ts` — and who uses it

Per-instance in-memory buckets (`:1-4` "a FLOOR, not a fortress"). Exports: `checkIpRate` 10/min
(`:11-12, :46`), `checkUserDaily` 50/day (`:13, :51`), `checkGlobalDaily` `TOOLS_GLOBAL_DAILY_MAX` default
5000 (`:61-70`), demo caps `checkDemoPerMinute` 3/min (`:82-84`), `checkDemoPerDay`
`AI_DEMO_MAX_MESSAGES_PER_IP_DAY` default 20 (`:87-90`), `checkDemoGlobalDaily` `AI_DEMO_DAILY_REQUEST_CAP`
default 300 (`:95-104`), `clientIp` (`:107-111`).

| Endpoint | Rate limit | Origin check | Cost cap | Caller |
|---|---|---|---|---|
| `/api/build-request` | **none** | none | n/a (DB + 1 email per unique payload) | `/create`, `/start`, dead `SolutionFinder` |
| `/api/demo` | 3/min/IP + 20/day/IP + 300/day global + dup-prompt block (`route.ts:107-126`) | none | `max_tokens 600`, 20 s timeout, `AI_DEMO_DISABLED` kill switch (`:98`) | Showroom (works), ReceptionistChat (broken contract) |
| `/api/tools-demo` | **none** (imports only `lib/ai/core`) | none | `max_tokens 180/320`, 24 msgs × 600 chars (`:26-28, :166`) | ToolChat, ToolGenerator |
| `/api/tts` | 40/min/IP (`:34`), 320 chars (`:32`), 200k chars/day/instance (`:35`), cache 256 (`:36`) | **yes** (`:68-78`) | as left | ConsultationCall |
| `/api/consultation` | 24/min/IP (`:41`), 12 user turns (`:32`), `max_tokens 240` (`:33`) | none | as left | **nobody** |
| `/api/recommend` | **none** | none | `max_tokens 320` (`:52`) | **nobody** (SolutionFinder unmounted) |

`middleware.ts:3-6` protects only `/agent/:path*` — no `/api/*` route is behind auth.

### 4d. `/api/consultation` the same way

`app/api/consultation/route.ts`: JSON in `{ messages[], brief? }` → `{ reply, chips[], briefPatch, done }`
or `{ fallback:true }` on no key / any error (`:155-159, :213-217`). Sanitises roles, trims to 24
messages × 600 chars (`:140-150`), strict JSON-schema output (`:90-122`), honesty clause in the prompt
(`:81-82`). It does **not** persist or email anything itself — the design was for the client to POST
the brief to `/api/build-request` when `done`. **Since the client never calls it, this is dead code with
a live API key behind it.** Delete it or add an origin check and a kill switch.

### 4e. Testing the pipeline without spamming the real inbox — what exists, what doesn't

**Exists today**
1. **Unit level:** `tests/build-request.test.ts` (16 cases) mocks `resend` and `@/lib/prisma`
   (`:6-20`) and covers 400s, no-key, provider error, exception, 502, dedupe, race, plan payload,
   dev-mock, `/start` normalisation, `src` attribution (`:64-300`). Zero network, zero email.
2. **Env override:** `LEAD_NOTIFY_EMAIL` is read at request time (`route.ts:262`). Set it in Vercel
   **Preview** to a throwaway inbox and preview submits go there. Per memory
   (`preview-prod-isolation-2026-07-14.md`) `RESEND_API_KEY` is Production-only, so Preview today
   takes the `no_key` branch — persisted to the Neon `preview` branch, no email. That means Preview
   **cannot** currently exercise the email branch at all.
3. **Local dev mock:** `NODE_ENV !== "production"` + no DB + no key → `devMock:true` (`:102-114`). Only
   for `next dev`; never on Vercel.

**Does not exist (grep `LEAD_TEST|x-lead-test` → nothing):** any request-level test flag. There is no
way to submit a real HTTP request against Preview or Prod that is visibly a test, skips or redirects
the email, and is trivially cleanable afterwards. The 2026-07-14 prod smoke test had to create real
rows and then hand-delete 4 of them by id in the Neon console
(`build-request-truthfulness-fix-2026-07-14.md`).

**Proposed design (spec, not implemented):**
- Env `LEAD_TEST_SECRET` (Preview + Production). Request header `x-lead-test: <secret>`; a
  constant-time compare. Wrong/absent secret → treated as a normal lead (never an error, never a hint).
- When matched: `source = "test:" + (payload.source ?? "unknown")`, DB `status = "test"`, and
  `sendNotification` is **skipped** unless `LEAD_TEST_NOTIFY_EMAIL` is set, in which case it sends
  there instead of `LEAD_NOTIFY_EMAIL`. Response adds `test: true` and keeps `delivery` truthful.
- A `scripts/purge-test-leads.ts` that deletes `WHERE status = 'test' AND createdAt < now()` with a
  `RETURNING id` printout — no ILIKE, no broad matches (the owner's standing rule).
- Vitest cases: header + right secret → skipped email, `status:"test"`; wrong secret → normal path.

---

## 5. Demo pipeline

### 5a. `/demo` — the AI Worker Showroom (`components/showroom/Showroom.tsx` + `lib/data/showroom.ts` + `/api/demo`)

- **Worker selection:** 6 workers (`showroom.ts:52-107`): AI Receptionist, Quote Agent, Lead Follow-Up,
  Invoice Nudge, Review Reply, Proposal Builder — left column cards (`Showroom.tsx:261-288`).
- **Industry selection:** 9 industries with sample business names (`showroom.ts:109-119`, e.g.
  "Greenline Landscaping"), chips (`Showroom.tsx:290-307`). Ids match `lib/data/intake.ts` so the CTA
  deep-links (`Showroom.tsx:197-199`).
- **Prompt suggestions:** 4 per worker, `{service}`-filled (`showroom.ts:125-165`; `Showroom.tsx:309-325`);
  post-turn `suggestedReplies` chips (`:581-590`). Free type-in, 1000-char cap, Enter sends (`:330-338`).
- **Captured-information panel:** "What the AI captured" — Name / Phone / Service / Location /
  Preferred time / Budget + Urgent/Normal pill + "Still needed: …" (`:496-533`). Email is captured in
  the contract (`showroom.ts:174`) but **not displayed** (`Showroom.tsx:484-491`).
- **Owner summary:** "Lead / job summary" + "What happens next" (nextActions) (`:536-550`).
- **Simulated actions and how they are labelled:** heading **"Simulated business updates"** (`:554`);
  events are phrased as completed records — "CRM lead created", "Calendar slot suggested", "Owner
  alerted — urgent" (`showroom.ts:356, :369, :380, :392, :406, :417`); the system prompt instructs the
  model to phrase them "as completed records … These are simulated only" (`:278`) and forbids "I sent
  that / it's booked" in the chat reply (`:268`). Persistent footer pill: **"Demo mode — no real call,
  text, email or booking sent"** (`Showroom.tsx:429-431`). Page meta says the same
  (`app/demo/page.tsx:7`). Each bubble is labelled "AI worker" / "You (customer)" (`:450`).
  **Residual risk:** the event text itself ("CRM lead created") is a completed-action claim; the only
  thing making it honest is the panel heading 2 lines above it. Acceptable, but the word "Simulated"
  should be on the pill or in each row, not only on the heading.
- **Loading indicator:** `typing` → `<Typing/>` = "AI worker" label + three bouncing dots
  (`:407, :460-472`), then a 520 ms pause and a character-streamed reply (`:166-169, :99-112`). Send
  button spinner while `busy` (`:345`). **There is no literal "AI is responding…" text** — the state is
  the animated dots only. Under `prefers-reduced-motion` the dots still render (only the reply
  streaming is skipped, `:101`).
- **Scripted fallback disclosure (`25aeaa8` present):** `res.ok` checked (`:146`), `data.fallback`
  flagged (`:150`), fetch failure flagged (`:151-155`), sticky `scripted` state (`:158-161`) → red pill
  **"Live AI is unavailable — these replies are a scripted sample, not the real model. [Dismiss and
  retry]"** (`:413-427`). **16-audit S7 — FIXED, with two gaps:**
  1. **The rate-limited path is not disclosed.** `/api/demo` returns `{ response: scripted, limited:true }`
     **without `fallback:true`** (`route.ts:110-114`). The client sets `limited` (`:190`) but not
     `scripted` — the visitor gets a canned reply plus the "free demo limit" CTA, never told the reply
     was scripted.
  2. **The opening exchange is always scripted and never disclosed.** `seed()` builds greeting + sample
     user line + `scriptedResponse(...)` on every worker/industry change (`:62-86`), labelled "AI
     worker" like a live reply. The first thing a visitor reads in the site's main proof asset is a
     template.
- **Error state when OpenAI fails:** server catches everything → scripted + `fallback:true`
  (`route.ts:148-152`); client shows the red pill. Injection → `DEMO_REFUSAL` + `fallback:true`
  (`route.ts:93-95`, `lib/ai/core.ts:54-55, :69-83`). Kill switch `AI_DEMO_DISABLED` (`route.ts:97-100`).
- **Rate limiting / cost:** §4c table. Client-side session cap 8 user turns (`Showroom.tsx:21, :117`).
- **Post-demo CTA:** black card "Want this trained on your business?" / at limit "You've reached the
  free demo limit." → "Get this installed" / "Start my build" → `/create?industry=&goal=` + "See
  pricing" (`:593-617`). ✅ Honest label, real destination, params consumed.

### 5b. `/demo/assistant`, `/demo/lead` — `ToolChat.tsx` → `/api/tools-demo`

- Contract matches (`ToolChat.tsx:53-61` reads `data.reply`; route returns `{ reply }` `:171`). ✅
- **Loading:** three bouncing dots + spinner on the button (`:112-122, :153`). No text label.
- **Fallback is silent.** The route returns `{ reply, fallback:true }` on no key (`:155`) and on model
  error (`:177`); ToolChat ignores `fallback` and has no `res.ok` check (`:58-62`). A 500 with a JSON
  error body → `data.reply` undefined → "Sorry, could you say that again?" (`:61`). The page copy says
  **"A real, live AI assistant"** (`app/demo/assistant/page.tsx:17`, `app/demo/lead/page.tsx:17`).
  **16-audit S11 — STILL OPEN**, and the canned `chatFallback` lines (`tools-demo/route.ts:62-71`) are
  presented as live.
- **No rate limit, no origin check** on `/api/tools-demo` (§4c). Public, unauthenticated OpenAI spend.
- **No simulated-action panel** — these are plain chats; nothing reads as a completed booking. ✅

### 5c. `/demo/quote`, `/demo/nudge` — `ToolGenerator.tsx` → `/api/tools-demo`

- **Best-handled surface:** 402 → upgrade, 429 → notice, `!res.ok || !data.reply` → notice, network →
  notice, `finally` clears loading (`ToolGenerator.tsx:76-94`); button "Working…" with spinner (`:179-182`).
- **Still ignores `fallback:true`** → the generator fallback (`tools-demo/route.ts:73-81`, e.g.
  "ESTIMATE: A rough ballpark … would be confirmed by the owner") renders as a real generation.
- Honesty is built into the prompt (`:47-54` "NEVER present an exact final price as guaranteed") and
  the page hint (`app/demo/quote/page.tsx:47`). ✅

### 5d. 9 use-case pages — `ReceptionistChat.tsx` → `/api/demo` — **BROKEN** (§0.1)

- Contract mismatch: sends `{ business, messages }`, reads `data.reply` (`:48-56`); `/api/demo` needs
  `{ workerId, industryId, messages }` and returns `{ response }`. With `workerId`/`industryId` absent the
  route defaults to receptionist + landscaping (`route.ts:69-70`) — so even if the key were read, the
  bot would answer as "Greenline Landscaping" on a real-estate or clinic page.
- Visible result: every turn → "Sorry, could you say that again?"; on a thrown fetch → "Sorry — the
  line dropped." (`:61`). Loading dots do appear (`:109-119`), so the visitor sees "thinking" then a
  non-answer. Indistinguishable from a dim AI.
- Cost: each turn is a full `/api/demo` completion when a key is present, subject to the demo caps.
- **Likely cause:** `/api/demo` was rebuilt for the Showroom contract (`showroom.ts:1-13` "Shared by the
  server route … and the client UI") and `ReceptionistChat` was never migrated.

### 5e. Places where a simulated action could read as real

| Where | Text | Mitigation present? |
|---|---|---|
| Showroom events feed | "CRM lead created", "Calendar slot suggested", "Owner alerted — urgent" | Heading "Simulated business updates" (`Showroom.tsx:554`) + footer pill (`:430`) — **not on the row itself** |
| Showroom seed reply | scripted first reply labelled "AI worker" | none (§5a gap 2) |
| Showroom rate-limited reply | scripted, no `fallback` flag | none (§5a gap 1) |
| `/demo/lead` page copy | "It replies instantly and follows up by email or text until they book." (`app/demo/lead/page.tsx:17`) | none — the demo cannot send anything; "follows up by email or text" describes the paid product, not what the visitor is testing |
| `/demo/nudge` hint | "The real tool sends these for you automatically" (`:36`) | clear enough — says "real tool" vs. draft |
| ToolChat fallback lines | "Happy to help with that. What's your name and the best number…" (`tools-demo:65`) presented as live | none |
| `/start` close | "Done — it's on its way." / "sent to {email}" | **claims a real email that is not sent** (§3b.1) |

---

## 6. Defects ranked, and the target spec

### 6a. Ranked defects

| # | Sev | Defect | Evidence | Status vs prior audits |
|---|---|---|---|---|
| **P0-1** | P0 | 9 use-case "Try it live" chats can never answer; page says "real, working AI"; burns completions | `ReceptionistChat.tsx:48-56` vs `api/demo/route.ts:94-152`; `use-cases/[slug]/page.tsx:149-150`; `useCases.ts:895-901` | **NEW** |
| **P0-2** | P0 | `/start` tells the visitor the plan was emailed to them; no email is ever sent to a lead | `ConsultationCall.tsx:532, :549, :776`; `route.ts:262, :274` | S6 **STILL OPEN**, now worse |
| **P0-3** | P0 | Budget chips / pricing on the live site — cannot verify from here; at HEAD fixed; production is 35 commits behind | `BuildRequestForm.tsx:13-20`; memory `release-preview-2026-08-12.md` | deploy problem, not code |
| **P1-1** | P1 | `/start` quotes phantom bands `$1,500–$2,500` / `$1,500–$3,000` on the card and aloud; reached from a `$349/mo` card | `builder.ts:68, :84, :100, :115, :131`; `ConsultationCall.tsx:487, :490`; `shopProducts.ts:270, :278` | P9 **STILL OPEN** |
| **P1-2** | P1 | `/api/build-request` has no rate limit, no honeypot, no origin check, no field caps; one POST = one owner email + one DB row per unique payload | `route.ts:28-30, :34-129`; `rateLimit.ts` not imported | S12 **STILL OPEN** |
| **P1-3** | P1 | `/api/tools-demo` has no rate limit or origin check — open OpenAI spend | `tools-demo/route.ts` (no `rateLimit` import); §4c | **NEW** |
| **P1-4** | P1 | Persisted-but-not-emailed leads are invisible: no admin view reads `BuildRequest`; missing key only `console.error`s | `route.ts:77-81`; `/agent/leads` = `mockLeads`; `PREVIEW_LEADS.md` | **NEW** (backend silent state) |
| **P1-5** | P1 | Two live CTAs → `/#finder`, an anchor that does not exist (SolutionFinder unmounted) | `solutions/page.tsx:45`; `use-cases/[slug]/page.tsx:118`; `app/page.tsx:6-17` | **NEW** |
| **P1-6** | P1 | `/demo/assistant` + `/demo/lead` present canned fallback as "a real, live AI assistant"; no `res.ok` | `ToolChat.tsx:58-62`; `tools-demo/route.ts:155, :177`; `demo/*/page.tsx:17` | S11 **STILL OPEN** |
| **P2-1** | P2 | Showroom: rate-limited reply and the seeded opening exchange are scripted but undisclosed | `api/demo/route.ts:110-114`; `Showroom.tsx:62-86, :150, :190` | **NEW** (gaps in `25aeaa8`) |
| **P2-2** | P2 | `/create`: whitespace-name no-op; native validation bubbles; server 502 text discarded | `BuildRequestForm.tsx:102-105, :122, :286, :290` | S8/S9/S10 **STILL OPEN** |
| **P2-3** | P2 | No UTM / referrer / landing-page capture; `lead_from_tool` never fired; `?package=care`, `?category=`, `?outcome=` silently dropped | `BuildRequestForm.tsx:45-54, :66`; `track.ts:13`; `ServicePackages.tsx:86`; `UseCaseBentoGrid.tsx:28` | **NEW** |
| **P2-4** | P2 | Dead paid endpoints with no caller: `/api/consultation`, `/api/recommend` | grep; §4c | **NEW** |
| **P2-5** | P2 | `/start` payload mislabelled (`kind = pain`), `city` always empty, no phone | `ConsultationCall.tsx:429-438` | **NEW** |
| **P2-6** | P2 | Full lead (email/phone) logged to Vercel logs on every request | `route.ts:53` | note |

### 6b. Target spec — the lead form

**Principle:** one form, one endpoint, one truthful contract. Short first step, optional second.

**Step 1 (required, ≤ 30 s on a phone):**
- `name` — text, required, trimmed (whitespace-only rejected inline).
- `contact` — **email or phone, at least one**. Email validated with the same zod rule as the server;
  phone `type="tel"`, light normalisation. Server rule: `email || phone` (today it is `email` only,
  `route.ts:29` — change the schema).
- `business` — "Business name / what you do" — single text (not two fields).
- `goal` — "What are you trying to automate?" — textarea, required, prefillable by `?goal=`/`?build=`.

**Step 2 (optional, "Add detail — or skip"):**
- `industry` chips (existing `TRADES`) + `OccupationIntake` when a trade is picked (keep — it is good).
- `timeline` chips (keep existing 4).
- `budget` chips — **only** `packagePriceLabel("starter"|"business"|"custom")` + `"Not sure yet"`.
  Never a hand-typed number. Store the id; render the label in the email (fix `route.ts:376/:561`).

**Hidden / automatic:**
- `src` (existing), `utm_source/medium/campaign/content/term`, `referrer` (`document.referrer`),
  `landingPage` (first path of the session, `sessionStorage`), `page` (path at submit). Add columns
  `src`, `utm Json?`, `referrer?`, `landingPage?` to `BuildRequest` (additive migration).
- Honeypot: hidden `company_website` field (pattern from `ForgeExperience.tsx:469-473`); server returns a
  200 that looks like success and **stores nothing**.
- Client idempotency key (`crypto.randomUUID()` per form mount) sent as `x-idempotency-key`; server
  folds it into `dedupeKey` so a double-tap is one row, and a retry after a 502 is not treated as new.
- Rate limit on `/api/build-request`: reuse `checkIpRate` (10/min/IP) + a daily per-IP cap; 429 with
  `retryAfter`. Field caps: 200 chars per short field, 4 000 for textareas, 32 KB body.

**States (all explicit, none native):**
- *Loading* — disabled button + "Sending…" (exists) + `aria-busy`.
- *Success* — "Request received. I'll reply within one business day with a plan and a quote." **No
  "check your inbox" until the visitor-facing confirmation email actually exists and the response
  says `delivery.confirmationEmailed:true`.** When that exists: "A copy is on its way to {email} — if
  it's not there in a few minutes, check spam or email {address}."
- *Error* — render the server's `error` string when present, else the generic line; keep all typed
  data; offer Retry + mailto (exists minus the server text).
- *Duplicate* — server `deduped:true` → "Already received — I have this one. No need to resend."
- *Rate-limited* — 429 → "Too many requests from this connection — try again in {n}s or email {address}."
- *Invalid* — inline messages under the field; submit stays enabled; nothing wiped.

**Confirmation email to the lead — gate, do not ship blind.** Blocked until `aibuiltbyhand.com` is
verified in Resend and `LEAD_FROM_EMAIL` is set (`resend-email-setup.md:15-44`). The site's domain
has no MX today, so `replyTo`/from on that domain will bounce replies until DNS is done. Until then the
success copy must not mention the inbox — which is exactly what `/create` does today and `/start` does not.

### 6c. Target spec — the demos

1. **Kill or fix `ReceptionistChat`.** Either delete the 9 embeds (fastest, honest) or migrate it to the
   Showroom contract: send `{ workerId:"receptionist", industryId:<mapped>, messages }`, read
   `data.response.assistantMessage`, and show the `scripted` pill on `fallback || limited`. Map
   `SAMPLE_BUSINESS` → showroom `IndustryId` or accept an `industry` override in `/api/demo`.
2. **Disclose every scripted turn.** Server: add `fallback:true` to the `limited` response. Client:
   flag the seed exchange as "Sample conversation — send a message to talk to the live model" until the
   first real turn. Put "simulated" in the event pill text, not only the panel heading.
3. **ToolChat / ToolGenerator:** honour `fallback:true` with the same red pill as Showroom; check
   `res.ok`; change "A real, live AI assistant" to copy that survives a fallback ("Live when the model
   is available; you'll be told if it isn't").
4. **`/demo/lead` copy:** drop "follows up by email or text until they book" from the demo hint — the
   demo cannot do that; keep it in "What we customize".
5. **Loading:** keep the dots; add an `aria-live="polite"` "AI is responding…" text node (visually
   hidden or small) so the state is announced and matches the standing no-silent-states rule.
6. **Cost:** wrap `/api/tools-demo` in `checkDemoPerMinute/PerDay/GlobalDaily` + `clientIp`; add the
   `sameOrigin()` check from `tts/route.ts:68-78` to `/api/demo`, `/api/tools-demo`, `/api/build-request`.
   Delete `/api/consultation` and `/api/recommend` or gate them the same way.
7. **`/start`:** replace `builder.ts` `priceRange` strings with `packagePriceLabel()` outputs; change
   the close to "I've sent your answers to Pavneet — he'll reply to {email} within one business day"
   (true today); re-label the shop link from "Try it live" to "See the AI Builder" or remove it from
   the $349/mo card.

---

## Proposed implementation plan (file ownership)

| Order | Change | Files | Owner |
|---|---|---|---|
| 1 | Remove or migrate the broken use-case chat (P0-1) | `components/ReceptionistChat.tsx`, `app/use-cases/[slug]/page.tsx:138-164`, `lib/data/useCases.ts:895-950`, optionally `app/api/demo/route.ts:69-70` (accept `industry` override) | demo |
| 2 | `/start` honest close + canonical prices (P0-2, P1-1, P2-5) | `components/ConsultationCall.tsx:429-438, :532-556, :774-779`; `lib/data/builder.ts:68-147` (`priceRange` ← `packagePriceLabel`); `lib/data/shopProducts.ts:278` | lead |
| 3 | Harden `/api/build-request` (P1-2) | `app/api/build-request/route.ts` (schema caps, `email||phone`, honeypot, idempotency header, `checkIpRate`, `sameOrigin`), `lib/rateLimit.ts` (export a lead bucket), `tests/build-request.test.ts` (+ cases) | server |
| 4 | Attribution + schema (P2-3) | `prisma/schema.prisma:205-229` (+`src`, `utm`, `referrer`, `landingPage`), new migration, `components/BuildRequestForm.tsx:44-54, :109-121`, `lib/track.ts` (fire `lead_from_tool` on success when `src` starts with `tool-`) | server + lead |
| 5 | Form UX states (P2-2, spec §6b) | `components/BuildRequestForm.tsx` (inline validation, server error text, duplicate + 429 states, honeypot field, privacy link) | lead |
| 6 | Owner visibility for DB-only leads (P1-4) | new `app/agent/build-requests/page.tsx` reading `prisma.buildRequest` (behind existing `/agent` middleware), or a daily digest cron — owner's call | server |
| 7 | Fix `/#finder` dead links (P1-5) | `app/solutions/page.tsx:45`, `app/use-cases/[slug]/page.tsx:118` → `/create` (or mount the finder; not recommended — it carries "Book a free 15-min call" and "check your inbox") | content |
| 8 | Demo disclosure gaps (P1-6, P2-1) | `app/api/demo/route.ts:110-114` (+`fallback:true`), `components/showroom/Showroom.tsx:62-86, :150, :190, :430`, `components/ToolChat.tsx:53-62`, `components/ToolGenerator.tsx:85-89`, `app/demo/lead/page.tsx:17`, `app/demo/assistant/page.tsx:17` | demo |
| 9 | Cost controls on public AI endpoints (P1-3, P2-4) | `app/api/tools-demo/route.ts` (+rate limit, +origin), delete or gate `app/api/consultation/route.ts` and `app/api/recommend/route.ts` (+ delete `components/SolutionFinder.tsx`) | server |
| 10 | Test mode (§4e) | `app/api/build-request/route.ts`, `scripts/purge-test-leads.ts`, `tests/build-request.test.ts`, Vercel env `LEAD_TEST_SECRET` (owner sets) | server |
| 11 | Confirmation email to lead — **blocked** on Resend domain verification + `LEAD_FROM_EMAIL` + MX | `resend-email-setup.md` checklist first; then `route.ts:252-292` | owner → server |

Verification gate for every item: `npx tsc --noEmit` · `npx vitest run` · `next build` · a Preview
deploy driven with the `x-lead-test` header (item 10 first, so nothing else spams the inbox).

---

## Summary (≤ 300 words)

The lead backend (`/api/build-request`) is still the best-built thing on the site: zod-validated,
persist-before-email, content-fingerprint dedupe with a unique-key race guard, truthful 502 when both
channels fail, 16 passing unit cases. `/create` on top of it is honest — its success copy never claims an
inbox it cannot deliver to — and at HEAD the budget chips render from `packages.ts`. Whether production
shows the stale `$1,000 / $2,500–$5,000 / $7,500+` bands is a deploy question I cannot answer from here;
the branch is 35 commits ahead of `origin/main`.

Three findings are new. First, the "Try it live" chat embedded on 9 of 25 use-case pages posts to
`/api/demo` with the wrong request shape and reads a `reply` key the route never returns, so it answers
"Sorry, could you say that again?" on every turn while the page calls it "a real, working AI" — and burns
an OpenAI completion doing it. Second, `/start` still closes with "Your plan has been sent to {email}";
the only email the system sends goes to the owner. The 2026-08-12 fix made the failure path honest and
left the success line false. Third, `SolutionFinder` is unmounted, yet `/solutions` and all 25 use-case
pages link to `/#finder`, an anchor that does not exist.

Still open from the prior audit: phantom `$1,500–$2,500` bands spoken aloud by `/start` (reached only
from a `$349/mo` card), no rate limit or honeypot on the lead endpoint, silent fallback on
`/demo/assistant` and `/demo/lead`, whitespace-name no-op and discarded server error on `/create`.
Fixed and verified present: `/start` failure state, Showroom scripted-sample pill (with two gaps: the
rate-limited reply and the seeded opener are undisclosed). `/api/tools-demo` has no rate limit at all;
`/api/consultation` and `/api/recommend` are live paid endpoints with no caller. No test-mode mechanism
exists; §4e specifies one. `/create` is the lead path; `/start` should not be sold as one until its
prices and its close are true.
