# HANDOFF C → integrator — lead capture, /start truthfulness, API hardening

**Lane:** C · **Date:** 2026-08-30 · **Branch:** `feat/site-transformation-2026-08-30`
**Spec followed:** `research/transformation-2026-08-30/11-lead-demo-pipeline.md` §6, plus the form/contrast
findings in `04-ux-cro-a11y.md` §2.1/§2.2/§4.9, the event table in `07-analytics-privacy.md` §2.1, and
D4/D5 in `10-baseline-visual-perf.md`.

**Nothing was committed, staged, pushed or deployed.** No git state was changed. No production request
was made and no email was sent.

---

## 1. Verification gate (commands run, with output)

```
$ npx tsc --noEmit
.next/types/app/ai-front-desk/page.ts(2,24): error TS2307: Cannot find module '../../../../app/ai-front-desk/page.js'
.next/types/app/ai-front-desk/page.ts(5,29): error TS2307: ...
.next/types/app/forge/page.ts(2,24):        error TS2307: Cannot find module '../../../../app/forge/page.js'
.next/types/app/forge/page.ts(5,29):        error TS2307: ...
TypeScript: 4 errors in 2 files
```
**All four are stale `.next/` build artifacts for `/ai-front-desk` and `/forge`, routes retired to 308s in
`next.config.js:48-49`. Zero errors in `app/`, `components/`, `lib/`, `tests/`.** They pre-date this lane
and clear on the next build.

```
$ npx vitest run
PASS (232) FAIL (0)
```
Full suite. `tests/build-request.test.ts` 18 → 18 (all still passing, two edited — see §7),
`tests/lead-guards.test.ts` **+23 new**. Other lanes' new files (`tests/api-guards.test.ts`,
`tests/seo-static.test.ts`, `tests/e2e/`) are included in that 232 and are green.

```
$ npx eslint components/BuildRequestForm.tsx components/ConsultationCall.tsx \
    app/api/build-request/route.ts app/api/consultation/route.ts app/start/page.tsx \
    app/create/page.tsx lib/data/builder.ts lib/data/intake.ts lib/rateLimit.ts \
    tests/lead-guards.test.ts tests/build-request.test.ts
ESLint: No issues found
```

Per the lane rules I did **not** run `next build` or start a server, so this is
`TESTED` + `LOCALLY VERIFIED (typecheck/lint/unit)` — **not** `PREVIEW VERIFIED`. Nobody has looked at
these screens in a browser. See §9.

---

## 2. Per-file changes

| File | +/− | What changed |
|---|---|---|
| `components/BuildRequestForm.tsx` | +594 / −202 | Full rewrite. 4-field required step + optional second step; single email-or-phone field; real labels; inline validation; all 7 states; honeypot; attribution; analytics. |
| `app/api/build-request/route.ts` | +303 / −29 | Rate limit, body cap, honeypot, origin check, test mode, email-or-phone, PII removed from logs. Dedupe / persist-before-email / 502 untouched. |
| `lib/rateLimit.ts` | +26 / −0 | `checkLeadPerMinute` (5/min/IP) + `checkLeadPerDay` (20/day/IP), both env-tunable. Nothing existing touched. |
| `lib/data/intake.ts` | +52 / −46 | Trade questions rewritten from customer-side to business-side; 4–5 fields per trade → 2, both optional chips. Ids unchanged. |
| `lib/data/builder.ts` | +28 / −14 | `priceRange` now `packagePriceLabel()`; six invented `impact` figures replaced. |
| `components/ConsultationCall.tsx` | +101 / −44 | Honest email ask + close; leaked voice string removed; gate copy; contrast + 44px targets; input labelled; `kind`/`city` payload fix. |
| `app/start/page.tsx` | +37 / −18 | Crawlable copy now states what the page actually is. |
| `app/create/page.tsx` | +5 / −4 | Lede matches the shorter form; body text contrast. |
| `app/api/consultation/route.ts` | +40 / −4 | **Disabled by default** (404 unless `CONSULTATION_API_ENABLED=true`) + origin check. |
| `tests/build-request.test.ts` | +17 / −5 | Per-request IP in the `post()` helper; one assertion updated for the new 400 message. |
| `tests/lead-guards.test.ts` | new, 23 cases | Honeypot, rate limit, size cap, origin, phone-only, test mode, no-false-sent, duplicate, PII-in-logs. |

### 2.1 The form, concretely

**Before:** 3 steps, up to **17 controls**, **14 questions before it asked who was filling it in**. The
trade block was the showroom's *customer* intake — a plumber was asked "What's the issue: Leak / water",
"Service address", "Active water or gas issue?", i.e. whether *he* had a gas leak.

**After:**
- **Step 1 — "What you need" (4 fields, all required):** Your name · Email or phone (one field) ·
  Business name, or what you do · What are you trying to automate?
- **Step 2 — "Detail (optional)" (5 controls, all optional, skippable):** trade chips → two business-side
  trade questions ("What kind of work do you take on?", "How do new enquiries reach you today?") ·
  Budget · Timeline.
- The submit button is on **step 1**. "Add detail first" is the secondary action, so a visitor can send
  after four fields and never see step 2.
- Dropped entirely: `useType`, `existing`, `website`, `tools`, and the 3-field contact row.

Preserved query-param handling: `?goal=`, `?build=`, `?package=`, `?industry=`, `?src=`. **Newly
consumed** (previously read by nobody and silently dropped, `11-lead-demo-pipeline.md` §1a): `?category=`
and `?outcome=`, now carried as `entryCategory` / `entryOutcome`.

---

## 3. New API response contract — `POST /api/build-request`

Order of guards: origin → rate limit → size → JSON → honeypot → schema → sanitize → test-mode →
**persist** → notify.

| Status | Body | When |
|---|---|---|
| **200** | `{ ok:true, id, contact:"email"\|"phone", delivery:{persisted,emailed} }` | accepted |
| **200** | `{ ok:true, id, deduped:true, contact, delivery:{persisted:true,emailed:false} }` | identical content within 10 min |
| **200** | `{ ok:true, ..., test:true }` | valid `x-lead-test` header |
| **200** | `{ ok:true, delivery:{persisted:false,emailed:false} }` | honeypot tripped — **nothing stored, nothing sent** |
| **200** | `{ ok:true, devMock:true, delivery:{false,false}, note }` | local `next dev` only, unchanged |
| **400** | `{ error:"Invalid request" }` | unparseable JSON *(unchanged string)* |
| **400** | `{ error:"Enter an email or a phone number so we can reply" }` | **was** `"Valid email required"` |
| **403** | `{ ok:false, error:"Invalid request" }` | **new** — declared origin ≠ host |
| **413** | `{ ok:false, error:"That request is too long to send…" }` | **new** — body > 32 KB |
| **429** | `{ ok:false, error:"Too many requests…", retryAfter:<s> }` + `Retry-After` header | **new** |
| **502** | `{ ok:false, error:"We couldn't save your request just now…" }` | both channels failed *(unchanged)* |

**`delivery.emailed` means the OWNER notification, never a visitor confirmation.** Nothing is ever
addressed to the lead. The route header comment now says this so a future edit can't misread it.

**Not regressed** (each has a passing test): content-fingerprint dedupe, the `dedupeKey` P2002 race
resolution, DB-write-before-email ordering, the truthful 502.

**Not added:** the `x-idempotency-key` from spec §6b. A per-mount UUID folded into the fingerprint would
*break* dedupe across a reload or a retry-after-502 — the 10-minute content window already collapses a
double-tap into one row. Flagging it as a deliberate deviation.

### 3.1 Phone-only leads and the `email` column

`BuildRequest.email` is `NOT NULL` and schema changes were out of scope, so a phone-only lead stores a
deterministic **non-deliverable sentinel**: `no-email+<12 hex of sha256(digits)>@lead.invalid`
(`.invalid` is RFC 2606 reserved and can never resolve). The real phone is in the `phone` column and the
payload; `payload.email` stays absent. The notification then **omits `replyTo` entirely** (never points
at the sentinel), appends `(phone only — no email given)` to the subject, and renders
`Email: none given — reply by phone`.

Because the sentinel is derived from the digits, `604-555-0100` and `(604) 555 0100` produce the same
`dedupeKey` — dedupe still works. Tested.

**Owner decision:** if you'd rather have a real column for this, the additive migration is
`email String?` + a `contactKind` column. I did not touch Prisma.

---

## 4. Contrast — measured, not asserted

WCAG 2.x relative-luminance formula, computed from the literal hex in `tailwind.config.ts` /
`app/globals.css`. Form card background is `.glass` = `#FFFFFF`; `/start` overlay is `#FFFFFF`, its cards
`#FAFAFA`.

### `/create`

| Element | Before | After | Ratio |
|---|---|---|---|
| Error message | `text-red-300` #FCA5A5 on #FDECEC — **1.66:1** | `text-danger` #B42318 on `bg-danger/[0.08]` #F9EDED | **5.75:1** ✓ |
| Hint / privacy / help text | `text-ink/35` #B0B0B1 — 2.17:1 | `text-ink-soft` #6E6E73 on white | **5.07:1** ✓ |
| Secondary body (`text-ink/40`) | #A5A5A5 — 2.46:1 | `text-ink-soft` | **5.07:1** ✓ |
| Success paragraph | `text-ink/60` #777779 — 4.47:1 | `text-ink` #1D1D1F | **16.83:1** ✓ |
| Field labels | — | `text-ink` #1D1D1F | **16.83:1** ✓ |
| Chip text (unselected) | `text-ink/60` — 4.47:1 | `text-ink-soft` | **5.07:1** ✓ |
| Chip text (selected) | — | #FFFFFF on #1D1D1F | **16.83:1** ✓ |
| Chip **boundary** (SC 1.4.11, ≥3:1) | `border-ink/10` #E8E8E9 — 1.22:1 | `border-ink/50` #8E8E8F | **3.27:1** ✓ |
| Input **boundary** | `.field` `border-ink/20` #D2D2D2 — 1.51:1 | `border-ink/50` #8E8E8F | **3.27:1** ✓ |

### `/start`

| Element | Before | After | Ratio |
|---|---|---|---|
| Success note `.hbc-note` | #C7C7CC @12px — **1.68:1** | #686868 @14px | **5.57:1** ✓ |
| Success note, `.hbc-note-ok` variant | — | #1D1D1F | **16.83:1** ✓ |
| Failure note `.hbc-note-fail` | #B42318 | unchanged | 6.57:1 ✓ |
| `.hbc-exit` back link | #A1A1A6 @13px — 2.57:1 | #686868 @14px | **5.57:1** ✓ |
| `.hbc-gate-sub` / `.hbc-gate-skip` | #A1A1A6 @12–13px — 2.57:1 | #686868 @14px | **5.57:1** ✓ |
| `.hbc-diag-k` (on #FAFAFA) | #A1A1A6 — 2.46:1 | #5F5F5F | **6.12:1** ✓ |
| `.hbc-row span:first-child` | #86868B — 3.62:1 | #5F5F5F on #FAFAFA | **6.12:1** ✓ |
| `.hbc-flow-sub` / `.hbc-flow-arrow` | #A1A1A6 / #86868B | #686868 | **5.57:1** ✓ |
| `.hbc-gate-list` bullets | *(new)* | #3A3A3D on white | **11.34:1** ✓ |
| Chip / input **boundary** | #D2D2D7 — 1.55:1 | #8E8E8F | **3.27:1** ✓ |
| `.hbc-voice` badge | #D2D2D7 — 1.51:1 | **deleted** (see §5) | n/a |

**Still #C7C7CC and deliberately so:** `.hbc-lines .ln` and `.hbc-thinking` — the animated bars and the
three thinking dots. Both are `aria-hidden` decorative graphics (exempt from 1.4.11) and the thinking
indicator now carries a `role="status"` + visually-hidden "Designing your plan…" text alternative,
replacing the `aria-label` on a bare `<span>` that nothing announced.

### Touch targets ≥44px
All form chips, both trade chips, all four inputs, the progress-step buttons, `.hbc-chip`,
`.hbc-inputrow input`, its send button, `.hbc-exit`, `.hbc-gate-tap`, `.hbc-gate-skip`. `.btn-primary` /
`.btn-ghost` were already 48px.

---

## 5. `/start` truthfulness — what was false, what it says now

| Was (file:line at HEAD) | Now |
|---|---|
| Spoken: *"Where should I send it?"* (`:532`) | *"What email should Pavneet reply to?"* |
| Spoken: *"Done — it's on its way."* (`:549`) | *"Done — your plan and answers are with Pavneet. He'll reply to that address within one business day."* |
| On screen: *"Your plan has been sent to {email}. I'll follow up by email shortly."* (`:776`) | *"Your plan and answers are with Pavneet. He'll reply to {email} within one business day. Nothing was emailed to you automatically — this screen is the plan."* |
| Retry-invalid: *"…what's the best one to send your plan to?"* | *"…what's the best address to reach you on?"* |
| No-email path: *"…here's how to get it to me."* | *"…nothing has gone to Pavneet yet… here's how to get it to him."* |

**D5 — the leaked system string.** `voice: Microsoft George - English (United Kingdom)` came from
`{voiceName && <span className="hbc-voice">voice: {voiceName}</span>}`. The badge, the `voiceName` state
and the `.hbc-voice` CSS rule are all removed. `voiceRef` (which actually selects the voice) is untouched,
so TTS behaviour is unchanged.

**D4 — the near-blank page.** Before the tap the page showed a dot and six words. The gate now leads with
a heading, a lede and four bullets that state honestly what this is: six questions plus your email, a
fixed script rather than a chatbot, sound optional because every word is also on screen, and **"Nothing is
emailed to you."** `app/start/page.tsx`'s crawlable copy says the same (it previously sold it as
"talk to the Handbuilt AI").

**Phantom prices.** `lib/data/builder.ts` hand-typed `$1,500–$2,500` (×3) and `$1,500–$3,000` (×2);
neither band exists in `packages.ts`, and `/start` read them **aloud** as the headline number. All six
templates now use `packagePriceLabel("starter")` / `packagePriceLabel("business")`.

**Invented statistics — not in my brief, fixed anyway** (never-fabricate is absolute, and these are spoken
to visitors from files I own). `builder.ts` `impact`: `~12 hrs/week saved`, `~8 hrs/week saved`,
`~15 hrs/week saved`, `Replies in under 60 seconds` → outcome statements. `ConsultationCall` `DIAG.impact`
carried *"can double the leads you actually close"* and *"can mean thousands in lost revenue a month"* —
both replaced with mechanism statements that need no evidence. The plan card's **"Estimated time saved"**
label is now **"What changes"**, because the value is no longer a duration. **Flagging for review: this is
visitor-facing copy I changed on truthfulness grounds, not on instruction.**

**Payload fix.** `/start` sent `kind: a.pain`, so the owner's email read `Type: Answering calls`. It now
sends the recommended system. The always-empty `city: ""` is dropped rather than rendered as a question
the visitor appeared to skip.

---

## 6. Test mode — how to run it

Nothing here can spam the real inbox, and nothing needs hand-deleting from Neon afterwards.

1. **Set env** (Vercel → Preview, and Production if you want to smoke-test prod):
   - `LEAD_TEST_SECRET` — a long random string. Treat it as a secret; it is read at request time and
     compared with `timingSafeEqual`.
   - `LEAD_TEST_NOTIFY_EMAIL` *(optional)* — a throwaway inbox. **Leave it unset and no email is sent at
     all**, which is the default and the safe choice.
2. **Send a request** with the header:
   ```
   curl -X POST https://<deployment>/api/build-request \
     -H 'content-type: application/json' \
     -H 'x-lead-test: <LEAD_TEST_SECRET>' \
     -d '{"type":"build-request","name":"Pipeline check","email":"qa@example.com",
          "business":"QA","goal":"end-to-end pipeline check"}'
   ```
3. **What happens:** the row is written with `status = "test"` and `source = "test:build-request"`; no
   email is sent (or it goes to `LEAD_TEST_NOTIFY_EMAIL` with `[TEST]` in the subject); the response
   carries `test: true` and a truthful `delivery`.
4. **Clean up:** `DELETE FROM "BuildRequest" WHERE status = 'test' RETURNING id;` — an exact match on a
   column no real lead can ever hold. No `ILIKE`, no pattern matching. *(I did not write
   `scripts/purge-test-leads.ts` — a one-line SQL with an exact predicate is safer than a script that
   could grow a wildcard. Say the word if you want the script.)*

**A wrong or absent secret is treated as an ordinary lead** — never an error, never a hint that the
mechanism exists. Tested both ways.

**Preview caveat, unchanged from A11 §4e:** memory records `RESEND_API_KEY` as Production-only, so Preview
takes the `no_key` branch regardless. Preview can prove persistence, not delivery.

---

## 7. Changes to the existing test file (2 edits, both necessary)

1. `post()` now attaches a unique `x-forwarded-for` per call. The route's rate limiter keeps its buckets in
   module state shared by every test in a file, so 18 cases from one implicit IP would have tripped the
   5/min cap. The limiter is exercised deliberately in `lead-guards.test.ts` instead.
2. `"rejects a missing email with 400"` → `"rejects a submission with neither email nor phone (400)"`, and
   the asserted message moves from `"Valid email required"` to `"Enter an email or a phone number so we
   can reply"`. The status and the "nothing persisted, nothing sent" assertions are unchanged.

All 18 original behaviours still assert the same things.

---

## 8. Blocked on the owner / needs a decision

1. **🔴 No visitor confirmation email — and it must stay that way for now.** `aibuiltbyhand.com` has **no
   MX record**, and Resend domain verification is not done (`resend-email-setup.md`). Until both are true,
   a "we've emailed you a copy" line would be a lie *and* the mail would bounce. Neither `/create` nor
   `/start` says it now, and both explicitly tell the visitor no automatic email is coming. **Do not ship a
   confirmation email, or any copy implying one, until DNS + Resend are verified.**
2. **🔴 `LEAD_TEST_SECRET` is not set anywhere.** Until the owner adds it in Vercel, test mode is inert —
   the header is simply ignored. That is safe, but it also means the pipeline cannot be smoke-tested
   against a real deployment without creating a real lead.
3. **🟠 `/api/consultation` is now OFF by default.** It had zero callers, no auth and a live OpenAI key
   behind it (`11-lead-demo-pipeline.md` §3b.6). It returns 404 unless `CONSULTATION_API_ENABLED=true`,
   and rejects cross-origin posts. **Owner's call: if `/start` stays scripted, delete the file — an
   endpoint that is merely switched off is still a file to keep reviewing.** I did not delete it because
   deletion is destructive and reversible only through git.
4. **🟠 Rate-limit numbers are a judgment call.** 5/min and 20/day per IP. Deliberately loose: a throttled
   demo message costs a visitor nothing, a throttled lead costs the business the lead. Tune with
   `LEAD_MAX_PER_IP_MIN` / `LEAD_MAX_PER_IP_DAY` without a deploy. Note these buckets are **per serverless
   instance** — a floor, not a fortress, exactly like every other limiter in `lib/rateLimit.ts`.
5. **🟠 The origin check rejects only a *mismatched* origin, never a missing one.** A same-origin `fetch`
   POST always carries `Origin` per the Fetch spec, so this stops cross-site posts; it does not stop
   `curl`. Rejecting origin-less requests would have dropped leads from privacy tooling and made the test
   header unusable from a script. The rate limit + honeypot + dedupe carry the rest.
6. **🟠 Honeypot false-positive risk.** A real visitor whose password manager filled a `display:none`
   field would silently lose their lead. Mitigated with `display:none` + `autocomplete="off"` +
   `tabindex="-1"`, and every trip is logged as `console.warn("[AI-SHOP LEAD] honeypot tripped…")`. If
   that warning ever appears with plausible-looking traffic, rename the field or drop the honeypot.
7. **🟠 The `.invalid` sentinel in the `email` column** (§3.1) is a workaround for a `NOT NULL` constraint
   under a no-migration rule. It works and dedupes correctly, but a real `email String?` + `contactKind`
   migration would be cleaner if you ever open the schema.
8. **🟡 Copy I changed on truthfulness grounds without being asked** — the six `impact` figures in
   `builder.ts` and the two `DIAG.impact` claims in `ConsultationCall.tsx` (§5). Review these as copy, not
   as code.
9. **🟡 Possible overlap with another lane:** `tests/api-guards.test.ts` appeared in the working tree
   during this lane. If it also covers `/api/build-request`, dedupe the two files before committing.
10. **⚪ Fable design consult did not run.** Per the standing rule I dispatched a Fable agent for the two
    open design calls (the single email-or-phone field + sentinel, and the `/start` closing copy). It
    failed: `HTTP 429 — You've reached your Fable 5 limit`. **The strings in §3.1 and §5 are my judgment
    alone and have had no design review.** Worth a second pass when Fable credits are back.

---

## 9. What is NOT verified

- **No browser has rendered any of this.** Per the lane rules I ran neither `next build` nor a dev server.
  The contrast ratios in §4 are computed from source hex values, which is exactly how `04-ux-cro-a11y.md`
  measured the failures — but the *rendered* result, the 44px targets, the step transition, the new gate
  layout at 390px, and the focus behaviour are all unverified visually. **This needs a screenshot pass
  before it ships.**
- The `/start` overlay still has **no focus trap, no initial focus and no Escape handler**
  (`04-ux-cro-a11y.md` §4.x), and is still a `div` rather than a dialog. Out of scope for this lane;
  the finding stands.
- Nothing was POSTed to Preview or Production, so the rate limiter, the origin check and test mode are
  verified by unit test only — never against a real deployment.
