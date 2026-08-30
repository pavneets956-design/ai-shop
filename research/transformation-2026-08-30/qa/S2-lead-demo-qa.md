# S2 — Functional QA: lead flow + demo

**Target:** local PRODUCTION build at `http://localhost:3200`, branch `feat/site-transformation-2026-08-30` @ `8c32924` (verified: `.git/refs/heads/feat/site-transformation-2026-08-30` = `8c32924ae4b44c71d03b648182e4f62d80d1dc09`, "Merge the production security hotfix into the transformation branch"). Working tree clean apart from untracked `research/` files.
**Date:** 2026-08-30. **Tooling:** Playwright 1.62.1 (Chromium), curl.
**Local env reality:** `.env.local` contains exactly one variable (`CALCOM_API_KEY`). No `DATABASE_URL`, no `RESEND_API_KEY`, no `OPENAI_API_KEY`. `next start` sets `NODE_ENV=production`, so the route's `strict` branch is the one under test — the same branch Vercel takes.

**Evidence:** scripts in `qa/scripts/s2/`, raw transcripts in `qa/_raw/s2/`, 33 screenshots in `qa/shots/`.
**Scope note:** `S5-lead-delivery-and-email.md` already covers the Resend/DNS remediation in depth. This report does not re-derive it; where the fix is DNS-shaped it points there.

---

## Q1. Does the lead form preserve and deliver every inquiry?

### What is written, and where

One table only: **`BuildRequest`** (`prisma/schema.prisma:205-229`, created by `prisma/migrations/20260714000000_add_build_request/migration.sql`, extended by `20260714010000_add_build_request_dedupe`). Schema and migrations agree — no drift.

Written by `persistLead()` at `app/api/build-request/route.ts:308-324`:

| Column | Source | Notes |
|---|---|---|
| `id` | cuid | |
| `name` | `lead.name` | nullable |
| `email` | `realEmail` **or** a sentinel | NOT NULL. On a phone-only lead this is `no-email+<sha256[0:12]>@lead.invalid` (`:547-551`) — RFC 2606, never deliverable, deterministic so dedupe still collides |
| `phone` | `lead.phone` | |
| `source` | `lead.source ?? lead.type`, prefixed `test:` when the test header matched (`:315`) | |
| `kind` | `kindOf(lead)` (`:574-579`) | "AI consultation" / "Plan request" / "Build request" |
| `goal` | `lead.goal ?? lead.want` (`:292`) | |
| `fingerprint` | sha256 of `email\|goal\|tasks\|name\|source` normalised (`:354-368`) | |
| `dedupeKey` | `fingerprint:floor(now/600000)` — UNIQUE index | |
| `payload` | the **entire sanitised submission** (`:320`) | nothing is dropped; strings >4000 chars truncated with a visible `… [truncated]` marker (`:521`), max 80 keys (`:47`), one level of nesting |
| `status` | `"new"`, or `"test"` when the test header matched (`:321`) | |
| `emailed` | `false` at insert; best-effort `true` later (`:208-214`) | **see defect L-4** |
| `createdAt` | now | |

### Order of operations

`app/api/build-request/route.ts:79-261`, in order:

1. `:86` cross-origin (`Origin`/`Referer` host ≠ `Host`) → **403**. Missing origin is deliberately allowed.
2. `:91-105` per-IP rate limit (5/min, 20/day) → **429** + `Retry-After`.
3. `:108-116` 32 KB body cap, header then real byte length → **413**.
4. `:128-134` honeypot `company_website` → **200 `{ok:true, delivery:{persisted:false,emailed:false}}`, stores nothing, sends nothing.**
5. `:136-143` zod (`email` OR `phone` required) → **400**.
6. `:182` **`persistLead()` — the DB write happens FIRST.**
7. `:189-197` if the write resolved to an existing row → **early return, the email is never attempted.**
8. `:200` **`sendNotification()` — the owner email happens SECOND**, and only for a non-duplicate.
9. `:216` `accepted = persist.ok || notify.ok`. Accepted → **200**. Neither → **502** (`:249-260`), unless `NODE_ENV !== "production"`, in which case a dev mock returns **200 `{ok:true, devMock:true}`** (`:234-246`).

The ordering is correct: **a Resend outage can never lose a lead**, because the row is already committed before Resend is touched.

### Failure matrix (all verified live against localhost:3200 with curl)

| Condition | HTTP | Body | Verified |
|---|---|---|---|
| DB write fails, email fails | 502 | `{"ok":false,"error":"We couldn't save your request just now. Please email us and we'll jump right on it."}` | ✅ observed (no DB + no Resend key locally) |
| DB write fails, email succeeds | 200 | `delivery:{persisted:false,emailed:true}` | code path `:216`, not reproducible locally |
| DB write succeeds, email fails | 200 | `delivery:{persisted:true,emailed:false}` + `console.error` at `:203` when the cause is `no_key` | code path |
| Both succeed | 200 | `delivery:{persisted:true,emailed:true}` | code path |
| Duplicate inside 10 min | 200 | `deduped:true, delivery:{persisted:true,emailed:false}` | code path `:189-196` |
| No email and no phone | 400 | `{"error":"Enter an email or a phone number so we can reply"}` | ✅ observed |
| Cross-origin | 403 | `{"ok":false,"error":"Invalid request"}` | ✅ observed |
| 40 KB body | 413 | `{"ok":false,"error":"That request is too long to send. Trim it down, or email us the detail directly."}` | ✅ observed |
| 6th submit in a minute | 429 | `{"ok":false,"error":"Too many requests…","retryAfter":42}` + `Retry-After: 42` | ✅ observed |
| Honeypot filled | **200 `ok:true`** | `{"ok":true,"delivery":{"persisted":false,"emailed":false}}` | ✅ observed |

Concurrency is genuinely safe: the `dedupeKey` UNIQUE index plus P2002 recovery (`:329-340`) means two simultaneous identical posts produce at most one row and one email.

### Can a lead ever be silently lost?

**Yes — three ways.**

1. **Honeypot false positive (P0, proven end-to-end).** A real person whose browser, password manager or form-filling extension writes into the hidden `company_website` field gets `{ok:true, delivery:{persisted:false, emailed:false}}` — nothing stored, nothing sent — and the browser renders the **full success screen**. Proven against the real server, no interception: see the section below and `shots/create-honeypot-false-success.png`. The server logs a `console.warn` at `:129`; nothing else exists.
2. **Persisted but never notified (P1).** DB up, Resend down/unverified → the row lands, the owner is never emailed, and **there is no place to look.** `prisma.buildRequest` is written by exactly one file and **read by none** — no admin route, no export script, no cron, no digest (verified by grepping the whole repo for `buildRequest`). The only signal is a `console.error` line in the Vercel log drain, which nobody checks. This is today's actual state: the code's own comment (`:24-25`) says the visitor confirmation is blocked on Resend domain verification.
3. **Dedupe swallows the retry (P2).** `:189-197` returns before `sendNotification()`. If submission 1 persisted but its email failed, an identical resubmission inside 10 minutes is deduped and **never retries the email**. The lead is safe in the DB but the notification is permanently skipped.

Not silent (correct behaviour): both channels failing produces a 502 that the UI renders with a mailto fallback.

---

## Q2. Does any success message claim an email was sent when it wasn't?

**Headline: no state on `/create` claims an email reached the visitor.** Every success screen carries this line verbatim:

> There's no automatic confirmation email — this screen is your receipt.

That is the correct call, and it matches the API contract (`:21-25`: "NO EMAIL IS EVER SENT TO THE LEAD").

Full matrix, driven in Chromium with `page.route` fulfilling each shape. Strings are verbatim from the rendered DOM.

| # | Response the API gave | Verbatim message shown to the visitor | Honest? |
|---|---|---|---|
| 01 | 200 `persisted:true, emailed:true` | **"Request received."** / "Thanks, Pav — I'll read what you want to build and reply to qa-noreply@example.invalid within one business day with a plan and a quote." / "There's no automatic confirmation email — this screen is your receipt." / "Need it sooner? Email pavneets956@gmail.com" | ✅ |
| 02 | 200 `persisted:true, emailed:false` | identical to 01 | ✅ (the lead IS durably saved) |
| 03 | 200 `persisted:false, emailed:true` | identical to 01 | ✅ |
| 04 | 200 `persisted:false, emailed:false` (**honeypot**) | identical to 01 | ❌ **FALSE** — nothing stored, nothing sent |
| 05 | 200 `devMock:true, persisted:false, emailed:false` | identical to 01 | ❌ **FALSE** (dev-only) |
| 06 | 200 `deduped:true` | **"Already received."** / "We already have this one, Pav — no need to send it twice. I'll reply to … within one business day with a plan and a quote." | ✅ |
| 07 | 200 `contact:"phone"` | "…and **call or text 604 555 0100** within one business day…" | ✅ |
| 08 | 400 | "Enter an email or a phone number so we can reply" + "Your answers are still on this page — press Send again, or email pavneets956@gmail.com." | ✅ |
| 09 | 403 | "Invalid request" + same recovery line | ⚠️ opaque wording, but no false claim |
| 10 | 413 | "That request is too long to send. Trim it down, or email us the detail directly." | ✅ |
| 11 | 429 | "Too many requests from this connection. Try again shortly, or email us directly." + "**Try again in about 42s**, or email pavneets956@gmail.com." | ✅ |
| 12 | 502 | "We couldn't save your request just now. Please email us and we'll jump right on it." | ✅ |
| 13 | 500, empty body | "Something went wrong on our end and your request wasn't saved." | ✅ |
| 14 | network abort | "We couldn't reach the server. Check your connection and try again — everything you typed is still here." | ✅ |
| 15 | 200 but `text/html`, not JSON | "Something went wrong on our end and your request wasn't saved." | ✅ (good defensive handling) |

**Root cause of 04/05:** `BuildRequestForm.tsx:299-301` branches on `res.ok` and `data.ok` only. It **never reads `data.delivery`**, which is the one field the API added specifically to describe what actually happened. Rows 01–03 are all truthful by luck of the copy, not by inspection.

**End-to-end proof of 04 against the real server (no interception):**

```
server responded: 200 {"ok":true,"delivery":{"persisted":false,"emailed":false}}
WHAT THE USER SEES:
  Request received.
  Thanks, Honeypot — I'll read what you want to build and reply to
  honeypot-qa@example.invalid within one business day with a plan and a quote.
  There's no automatic confirmation email — this screen is your receipt.
```

`shots/create-honeypot-false-success.png`.

`/start` has the same class of gap but narrower: `ConsultationCall.tsx:441` checks `res.ok` and not `data.ok`, then renders "Your plan and answers are with Pavneet." A `{ok:true, persisted:false, emailed:false}` body would render that falsely. `/start` never sends the honeypot field, so the honeypot path cannot reach it; only the dev mock can.

---

## Q3. Where do new leads go, and how are you notified?

**One paragraph for the owner:**

Every submission from `/create` and from the `/start` AI Builder is written as one row in the **`BuildRequest` table of your Neon Postgres database** — the whole raw submission lands in the `payload` JSON column, so nothing is ever lost to a schema mismatch. Immediately *after* that row is committed, the server tries to email **you** (not the visitor) at `LEAD_NOTIFY_EMAIL`, defaulting to `pavneets956@gmail.com`, from `LEAD_FROM_EMAIL`, defaulting to `Handbuilt Leads <onboarding@resend.dev>` — with the visitor's address as `replyTo` so you can hit reply. **That email is your only notification, and right now it is your single point of failure:** if `RESEND_API_KEY` is missing or Resend errors, the lead is still safely in the database but nothing tells you it arrived, because **the site has no admin page, no export script, no digest and no alert** — `BuildRequest` is written by one file and read by nothing. Until that changes, treat the Neon SQL console as the system of record and check it, or check the Vercel log drain for `[AI-SHOP LEAD] accepted`.

**The day Resend is verified,** two things change and one does not:
- Change `LEAD_FROM_EMAIL` to an address on the verified domain (e.g. `leads@aibuiltbyhand.com`); the `onboarding@resend.dev` fallback only reliably reaches your own Resend-account address, which is why it is a stopgap. See `S5-lead-delivery-and-email.md` for the exact SPF/DKIM/DMARC records.
- Owner notifications become reliable and stop landing in spam.
- **A confirmation email to the visitor still does not exist.** No code sends one. `/create` correctly says "There's no automatic confirmation email — this screen is your receipt", and that line must stay until such an email is actually built.

---

## Q4. Demo, form, validation and submission paths

### 4a — `/create`

| Check | Result |
|---|---|
| Label association | ✅ All four fields have a real `<label for>` bound to the input id, and each says `(required)` **in words**: `br-name` "Your name (required)", `br-contact` "Email or phone (required)", `br-business` "Business name, or what you do (required)", `br-goal` "What are you trying to automate? (required)". Autocomplete tokens set (`name`, `email`, `organization`) |
| Required-field behaviour | ✅ Empty submit renders a summary — "**4 answers need fixing before this can send — they're marked below.**" — plus a per-field message, `aria-invalid="true"` on all four, an `aria-live="assertive"` announcement, and focus moved to `br-name` |
| Per-field messages | "Tell us your name so we know who we're replying to." · "Add an email or a phone number — either one is fine." · "What's the business called, or what do you do?" · "Tell us what you'd like the AI to take off your plate." |
| Inline validation | ✅ `pav@` → "That email doesn't look complete — check for a typo." `12345` → "That doesn't look like an email or a phone number." One field accepts either kind |
| Error clears on typing | ✅ error node removed the moment the field is edited |
| Submit never disabled for invalid input | ✅ `isDisabled()` = `false` after a failed validation — errors are answered inline, not by a dead button |
| Typed data survives an error | ✅ after a 502 the values, the selected chip ("Within a month") and the current step all persist; the alert says "Your answers are still on this page — press Send again, or email pavneets956@gmail.com." |
| Double-submit prevention | ✅ 5 extra clicks + 5 Enter presses during a 1.5 s in-flight request → **exactly 1 POST.** Button becomes "Sending…" and disabled, `form[aria-busy]="true"`, polite region reads "Sending your request…" |
| Honeypot | ✅ `#company_website`, `name=company_website`, `tabindex=-1`, `autocomplete="off"`, wrapper `display:none` + `aria-hidden="true"`, not in the tab order. (Its false-positive handling is the P0 above) |
| Optional step 2 genuinely skippable | ✅ Step 2 contains zero `(required)` markers; every legend says "(optional)"; "Send my request" is present on step 1 and step 2; chips are un-pickable by clicking the active one. Copy: "All optional. Skip straight to sending if you'd rather — it doesn't change the reply you get." |
| Keyboard-only completion | ✅ Completed and submitted with keyboard alone. ⚠️ **but see D-6:** tab order is `br-goal → privacy link → "Send my request" → "Add detail first"`, while the *visual* order is "Add detail first" then "Send my request" (`order-last` on the submit button). Focus order contradicts reading order (WCAG 2.4.3) |

### 4b — `/demo` (AI Worker Showroom)

| Check | Result |
|---|---|
| Pick a worker / industry | ✅ "Quote Agent" + "Plumbing" → phone header re-renders as **"Summit Plumbing & Heating"**, quick prompts swap to plumbing-quote prompts, transcript re-seeds |
| Real reply renders | ✅ |
| "AI is responding…" state | ❌ **Missing.** With a 3 s delayed reply, `main` contains no "responding/typing/thinking/loading" text and there are **zero `[role=status]`/`[aria-live]` regions**. Only three animated dots (`Typing()`, `Showroom.tsx:460-473`) — invisible to a screen reader and to `prefers-reduced-motion` |
| Captured fields populate | ✅ Name, Phone, Service, Location, Preferred time, Budget all fill; "Still needed: …" renders; Urgent/Normal pill flips |
| Owner summary populates | ✅ "LEAD / JOB SUMMARY" and "WHAT HAPPENS NEXT" both render |
| Simulated actions labelled | ✅ Section heading "**Simulated business updates**", plus the pill "Demo mode — no real call, text, email or booking sent" |
| Scripted-fallback notice on degradation | ✅ Forced `{fallback:true}` → "**Live AI is unavailable — these replies are a scripted sample, not the real model.**" + "Dismiss and retry", `role="status"`. Correctly does **not** appear on a `fallback:false` reply |
| Analytics | ❌ **Zero events fired** on load or on a full demo turn |

Additional observations, all reproducible:
- **The demo opens with a conversation the visitor never had.** `seed()` (`Showroom.tsx:63-84`) preloads a scripted user turn labelled "**YOU (CUSTOMER)** — Hi, can I book lawn mowing this week?" plus an AI reply and a fully populated outcome panel, and does **not** set `scripted`, so the "scripted sample" notice is absent for it.
- **On the fallback path the AI repeats itself verbatim.** Asked "My kitchen sink is leaking badly, how much to fix it today?", the Quote Agent returned the exact sentence already on screen from the seed: "Happy to prep a rough range for leak repair. To get it close, what's the size/scope, and is access easy?…". The same two system events also duplicated in the feed. Locally — and on **any** deploy without `OPENAI_API_KEY` — this is the *only* path.
- **The honesty pill disappears exactly when it matters.** The scripted notice and the "Demo mode — no real call, text, email or booking sent" pill share one slot (`Showroom.tsx:412-436`); when degraded, the pill count drops to **0** while the panel is showing "SMS confirmation queued".
- The composer `<textarea>` has **no accessible name at all** — no `id`, `aria-label`, `aria-labelledby` or `<label>`; placeholder only.

### 4c — Embedded chat on a use-case page

**The URL in the brief does not host a chat.** `/use-cases/ai-receptionist-for-contractors` **308-redirects to `/ai-receptionist-for-contractors`**, a `LandingTemplate` money page with **no embedded chat** (0 chat inputs) — only a link to `/demo`.

Chat presence across every `/use-cases/*` page:

| Slug | Chat? |
|---|---|
| ai-chatbot-for-restaurants | ✅ |
| ai-receptionist-for-dentists | ✅ |
| automate-admin-for-accountants | ✗ |
| **missed-call-automation** (Contractors & Local Service Businesses) | ✗ |
| appointment-reminder-automation | ✗ |
| google-business-profile-lead-automation | ✗ |
| facebook-lead-automation | ✗ |
| ai-sop-generator | ✗ |

`getUseCaseDemo()` (`lib/data/useCases.ts:361-399`) gates on `DEMO_INDUSTRY`, whose keys are `"Contractors & Trades"`, `"Real Estate"`, `"Clinics & Health"`, `"Dental Practices"`, `"Salons & Beauty"`, `"Restaurants"`. Only two of those six match a real `uc.industry` string; the contractor use case's industry is `"Contractors & Local Service Businesses"`, which is not a key. **Four of the six map entries are dead config, and the contractor page silently gets no demo.** (This is a fail-*closed* miss, and the code comment at `:326-331` shows it was a deliberate fix for the old fail-open bug where every page ran as the landscaping receptionist — that regression has not returned.)

Driving the chat that does exist, `/use-cases/ai-receptionist-for-dentists`:

- Greeting: "Thanks for calling **Brightsmile Dental**! This is the AI receptionist — how can I help you today?"
- POST payload: `{"workerId":"receptionist","industryId":"dental","messages":[…]}` — correct persona, no stray `business` string.
- Reply to "I chipped a front tooth this morning, can I get in today?": **"Sorry to hear that — let's get someone on it quickly. Can I grab your name and the best callback number?"**
- Renders "Sorry, could you say that again?" → **no**. Leaks landscaping/lawn/mow/Greenline → **no**.
- **"AI is responding…"** ✅ renders, both visibly and as an sr-only announcement inside `role="status" aria-live="polite"` (verified with a 3 s delayed reply, `shots/usecase-04-responding.png`). Send button disabled while in flight.
- Degraded (`fallback:true`): "Live AI is unavailable right now — these replies are a scripted sample, not the real model." Not shown on a `fallback:false` reply.
- `/api/demo` 500: "The demo didn't answer that one. Try again, or tell Pavneet what you were testing and he'll look at it." — the visitor's message stays in the transcript.
- Footer always present: "Demo mode — no real call, text, email or booking is sent."

**The embedded chat is the better of the two implementations.** The showroom on `/demo` is missing the responding state and the accessible name that this component gets right.

### 4d — `/start`

No copy claims anything was emailed to the visitor. Scan of the served HTML:

| Phrase | Present? |
|---|---|
| "check your inbox" / "check your email" | absent |
| "sent to you" / "emailed to you" (as a claim) | absent — the only match is inside "**Nothing is emailed to you.**" |
| "on its way" / "has been sent" / "we'll email" | absent |

Crawlable copy: "Nothing is emailed to you. At the end you can send your answers to Pavneet, and he replies within one business day." Gate copy repeats it. The end-state (`ConsultationCall.tsx:814-819`) reads: "Your plan and answers are with Pavneet. He'll reply to `<email>` within one business day. **Nothing was emailed to you automatically — this screen is the plan.**" Failure state offers a "Try again" button and a mailto. `/start` fires **zero** analytics events.

---

## Q5. Analytics events

`lib/track.ts` declares **13** `SiteEvent` names. Verified by exhaustive grep of every call site plus live `window.va` capture.

| Event | Call sites | Fired in the browser? |
|---|---|---|
| `form_started` | `BuildRequestForm.tsx:136` | ✅ |
| `form_step_completed` | `:177` | ✅ (on "Add detail first") |
| `form_validation_error` | `:191` | ✅ (one per invalid field) |
| `form_submitted` | `:255,266,277,292,303,327` | ✅ (every branch) |
| `lead_from_tool` (ToolEvent) | `:317` | ✅ (only with `?src=tool-…`) |
| **`hero_demo_click`** | **none** | ❌ clicked "Try the live AI demo" → `[]` |
| **`hero_contact_click`** | **none** | ❌ clicked "Request a free 10-minute fit check" → `[]` |
| **`pricing_cta_click`** | **none** | ❌ clicked "Start with Starter" → `[]` |
| **`demo_started`** | **none** | ❌ |
| **`demo_prompt_used`** | **none** | ❌ |
| **`demo_completed`** | **none** | ❌ |
| **`email_click`** | **none** | ❌ |
| **`calendar_click`** | **none** | ❌ |
| **`phone_click`** | **none** | ❌ |

**9 of 13 named events have no call site anywhere in the repo.** Every hero, pricing and demo CTA is a plain `<a>` with no handler. `lib/track.ts:314` already calls this out for `lead_from_tool` — "a defined-but-dead event is a dashboard lie" — and then leaves nine more.

### Attribution is dropped on the path that matters

`captureAttribution()` has **no call site**. It only runs lazily inside `getAttribution()`, which is first reached when the form fires `form_started` — on `/create`, where the UTM params no longer exist.

Proven:

```
goto  /?utm_source=test&utm_medium=qa&utm_campaign=preview
  → sessionStorage hb_attr_v1 = null          ← nothing captured on landing
  → click hero CTA → /create → fill → submit
  → sessionStorage = {"landing_path":"/create","device":"desktop","first_seen":"2026-08-30"}
  → POST body carries NO utm_* at all
  → form_submitted props: {form, result, status, deduped, contact, budget, timeline, industry, page, device}
```

Control — landing **directly** on `/create?utm_source=test&utm_medium=qa&utm_campaign=preview&src=tool-…`:

```
  → form_started props include utm_source:"test", utm_medium:"qa", utm_campaign:"preview"
  → POST body includes utm_source/utm_medium/utm_campaign
  → lead_from_tool also fires
```

**So every campaign click that lands anywhere but `/create` loses its attribution**, and the `landing_path` recorded on the lead is always `/create` — actively misleading, not merely absent.

### PII check — clean

No captured prop contained a name, email, phone, or anything typed. Actual props observed:

```json
{"form":"build_request","result":"ok","status":200,"deduped":false,"contact":"email",
 "budget":"starter","timeline":null,"industry":null,"page":"/create","device":"desktop"}
{"form":"build_request","step":0,"field":"contact"}
```

`contact:"email"` is the channel, not the address. `field:"contact"` is a field identifier. `sanitize()` (`lib/track.ts:44-58`) drops any key matching `/(name|email|phone|address|message|prompt|text|query|note|content|body|input|value)/i` and caps values at 64 chars.

One structural nit: `page`, `utm_*`, `referrer_host` and `device` are assigned **after** `sanitize()` runs (`lib/track.ts:71-83`), so they bypass the ban-list and the 64-char cap. Harmless today (they are capped at 120 by `lib/attribution.ts:45`), but the guarantee is weaker than the file's own comment claims.

As expected, `/_vercel/insights/script.js` 404s locally ("Refused to execute script … MIME type ('text/html')"), so no beacon leaves the browser. All assertions above are on the `window.va` call, not the network.

---

## Defect list

### P0 — blocks deploy

**D-1. A real lead can be silently destroyed and the visitor told it succeeded.**
The honeypot returns `{ok:true, delivery:{persisted:false, emailed:false}}` (`route.ts:128-134`); `BuildRequestForm.tsx:299` ignores `delivery` and renders the full "Request received." screen. Proven end-to-end against the real server. Any autofill, password manager or privacy extension that writes into `#company_website` destroys the lead with no trace beyond a `console.warn`.
*Fix (either, ideally both):* have the client branch on `data.delivery` and refuse to claim success when `persisted === false && emailed === false`; and/or make the server persist honeypot hits with `status:"honeypot"` instead of discarding them, so a false positive is recoverable.

### P1 — fix before or immediately after deploy

**D-2. A persisted lead that fails to email is invisible.** `BuildRequest` is written by `app/api/build-request/route.ts` and **read by nothing** — no admin page, no export, no digest, no alert. With Resend unverified this is the live state: leads accumulate where the owner will not look.
*Fix:* an owner-only `/admin/leads` route, or a daily digest cron, or at minimum a documented Neon query. Cheapest first step: a Vercel log alert on `[AI-SHOP LEAD] accepted` with `emailed:false`.

**D-3. Nine of thirteen analytics events never fire.** `hero_demo_click`, `hero_contact_click`, `pricing_cta_click`, `demo_started`, `demo_prompt_used`, `demo_completed`, `email_click`, `calendar_click`, `phone_click`. The funnel is unmeasurable above the form.
*Fix:* wire the handlers, or delete the names. A declared-and-dead event is worse than no event.

**D-4. Attribution is captured on the wrong page, so campaign data is lost and `landing_path` is wrong.** `captureAttribution()` is never called on load.
*Fix:* call `captureAttribution()` once in the root layout's client boundary (or a tiny `<AttributionCapture/>`), so first touch is recorded on the real landing page.

**D-5. `/demo` has no accessible "AI is responding" state.** Three animated dots, no text, no `role="status"`, no `aria-live` — and nothing at all under `prefers-reduced-motion`. Silent state. The embedded `ReceptionistChat` already does this correctly; copy it.

### P2 — should fix

**D-6. Focus order contradicts visual order on `/create`.** `order-last` on the submit button puts "Send my request" before "Add detail first" in the tab order while rendering it after. WCAG 2.4.3. Reorder the DOM instead of the CSS.

**D-7. `/demo` composer `<textarea>` has no accessible name.** No `id`/`aria-label`/`aria-labelledby`/`<label>`; placeholder only (`Showroom.tsx:328-337`).

**D-8. The "no real call, text, email or booking" pill vanishes during degradation.** It shares its slot with the scripted-sample notice (`Showroom.tsx:412-436`), so the honesty disclosure disappears at the exact moment the panel is announcing "SMS confirmation queued". Render both.

**D-9. `/demo` opens with a conversation attributed to the visitor.** `seed()` labels a scripted line "YOU (CUSTOMER)" before anyone has typed, with no "scripted sample" notice. Label it as an example, or start empty.

**D-10. On the fallback path the demo repeats itself verbatim.** The scripted engine returned the exact sentence already on screen, and duplicated two system events. Without `OPENAI_API_KEY` this is the only path a visitor ever sees. Verify the key is set in the deploy target before launch.

**D-11. The dedupe fast-path swallows a notification retry.** `route.ts:189-197` returns before `sendNotification()`, so an identical resubmit inside 10 minutes never retries a failed email. Consider attempting the notification on a dedupe hit when the stored row has `emailed = false`.

**D-12. The `emailed` column is unreliable in both directions.** `route.ts:208-214` fires the update without `await`, so on a serverless function that may be frozen after the response it can stay `false` after a successful send; and it is never set for a deduped row. It cannot be used as an audit trail as written.

**D-13. The rate limiter trusts a client-supplied header.** `lib/rateLimit.ts:133-137` takes `x-forwarded-for.split(",")[0]` — the first entry, which the client controls. Confirmed: rotating `X-Forwarded-For` gave a fresh bucket every time. The file already calls itself "a floor, not a fortress", so this is informational, but on Vercel prefer `x-vercel-forwarded-for` / `x-real-ip` as the trusted source.

**D-14. `/start` checks `res.ok` but not `data.ok`.** `ConsultationCall.tsx:441`. Same class as D-1, currently unreachable via the honeypot (that field is not sent), but it will render "Your plan and answers are with Pavneet" on any `ok:false` 200.

**D-15. The 403 message is opaque.** "Invalid request" gives the visitor nothing to act on. Low frequency, but it is the one error string on `/create` without a next step of its own.

### Informational

- `/use-cases/ai-receptionist-for-contractors` 308s to `/ai-receptionist-for-contractors`, which has no embedded demo. Four of six `DEMO_INDUSTRY` keys match no use case (`lib/data/useCases.ts:333-340`) — dead config. If a contractor-facing embedded demo is wanted, add `"Contractors & Local Service Businesses": "plumbing"` and put `missed-call-automation`'s solution into `CONVERSATIONAL`.
- The hero CTA reads "Request a free 10-minute fit check" while `/create` and its success screen promise "a real reply … within one business day" — a written reply, not a call. Not a functional defect; flagging it for whoever owns claims review.
- Local build has no `DATABASE_URL`, `RESEND_API_KEY` or `OPENAI_API_KEY`. **Every one of those must be confirmed present in the Vercel deploy target before launch** — this QA cannot verify them from here.
