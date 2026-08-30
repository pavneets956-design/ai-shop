# HANDOFF — Lane E (security hardening + test harness) → integrator

Branch `feat/site-transformation-2026-08-30` · 2026-08-30 · nothing committed by this lane (the integrator commits).

Gate as of handoff, run by me on the shared tree:

| Command | Result |
|---|---|
| `npx tsc --noEmit` | **0 errors.** (An earlier run showed 4, all in stale generated `.next/types/app/{ai-front-desk,forge}/page.ts` for pages another lane deleted; they cleared on the next build.) |
| `npx vitest run` | **12 files, 232 tests, 0 failed** (114 at wave start; +50 from this lane's `tests/api-guards.test.ts`, the rest from other lanes) |
| `npx playwright test --list` | **88 tests across 7 spec files**, all compile and resolve their imports |
| `node scripts/smoke.mjs https://aibuiltbyhand.com` | **135/159 passed**, read-only against **production** — see §6, it found the live P0 |

---

## 1. What is now gated, and how to re-enable it

### The agent subsystem ships dark

Nothing was deleted. No Prisma model was dropped. No migration was written. Two independent locks now sit in front of the same code:

**Lock 1 — kill switch.** `middleware.ts` matches `/agent/:path*` **and** `/api/agent/:path*`. Unless `AGENT_SUBSYSTEM_ENABLED === "true"` (the exact string), both answer **404**:

- `/api/agent/*` → JSON `{"error":"Not found"}`, `x-robots-tag: noindex, nofollow`
- `/agent/*` → a small self-contained HTML 404 with a link home (middleware cannot render `app/not-found.tsx`, and a blank body is a silent state)

**Lock 2 — owner session.** `lib/agent/guard.ts` exports `guardAgentApi()`, called as the first statement of all **13** `/api/agent/*` handlers. When the switch is on it requires a NextAuth session whose email is in `AGENT_OWNER_EMAILS`, and answers **JSON 401/403** — not NextAuth's 307-to-HTML-login, which a `fetch()` caller cannot read and a smoke test mistakes for "reachable".

Fail-closed: switch on + allowlist unset → 403 naming the variable to set. Session lookup throws → 401, never "authorised".

**To re-enable** (both, in this order):

```
AGENT_SUBSYSTEM_ENABLED=true
AGENT_OWNER_EMAILS=<owner email>[,<second owner>]
```

then **redeploy**. Middleware may inline `process.env` at build time on Vercel, so an env-var flip alone is not guaranteed to reach the edge gate. The failure direction is safe: the Node-runtime handler guard reads the var at request time, so a stale-inlined middleware can only make the subsystem *more* closed, never less. Do not enable without reading §5 first.

### Twilio webhooks — signature-gated, not session-gated

Twilio has no login, so `/api/agent/call/webhook` and the new `/api/agent/call/webhook/status` are gated on Twilio's HMAC (`X-Twilio-Signature`) via `lib/agent/twilioSignature.ts` instead. Before this, any caller could POST and get TwiML back. Fail-closed on: no `TWILIO_AUTH_TOKEN`, no signature header, unreadable body, bad signature. They are still behind the kill switch — correct, because no call can be placed while the subsystem is off.

`app/api/agent/call/webhook/status/route.ts` is **new**. `lib/agent/callManager.ts` has always registered `statusCallback: \`${webhookUrl}/status\`` against a route that did not exist, so every Twilio status callback 404'd (and Twilio retries 404s). It now acknowledges with 204 and logs `CallSid / CallStatus / CallDuration / Direction / Timestamp / SequenceNumber` only — deliberately **not** `To` / `From` / `Called` / `Caller`, because those are phone numbers and Vercel logs are not the place for them.

### Mass assignment closed

`PUT /api/agent/contacts/[id]` passed the raw request body into `prisma.contact.update({ data: body })`. It now allowlists six fields (`company`, `contactName`, `phone`, `email`, `industry`, `status`), caps each at 300 chars, 400s on a non-string, and 400s when nothing editable was sent. Pinned by two tests.

### Rate limits on the unmetered OpenAI proxies

`/api/tools-demo` (four public `/demo/*` pages) and `/api/recommend` called OpenAI on the owner's key with **no limit at all**. Both now use `lib/rateLimit.ts` exactly as `/api/demo` does: `checkDemoPerMinute` + `checkDemoPerDay` per IP, `checkDemoGlobalDaily` immediately before the paid call. `/api/recommend` also gained a 4,000-char body cap (413) and lost its silent `catch {}`.

Neither returns a bare 429 — the `/demo/*` clients don't check `res.ok`, so a 429 would render as "Sorry, could you say that again?", blaming the model for a limit we imposed. Instead:

- `/api/tools-demo` → 200, `{ reply: <"that's the free demo limit…">, limited: true, retryAfter }` + a `Retry-After` header
- `/api/recommend` → 200, the rules-based recommendation (which is the authoritative one — the model only rewrites prose) + `limited: true`

---

## 2. Env vars introduced (names only)

| Name | Where | Effect if unset |
|---|---|---|
| `AGENT_SUBSYSTEM_ENABLED` | `middleware.ts`, `lib/agent/guard.ts` | **unset everywhere today.** Whole agent subsystem 404s. This is the intended shipping state. |
| `AGENT_OWNER_EMAILS` | `lib/agent/guard.ts` | Only consulted when the switch is on. Unset → every agent API call 403s with a message naming this variable. |
| `E2E_BASE_URL` | `playwright.config.ts` | defaults to `http://localhost:3200` |
| `E2E_LIVE_DEMO` | `tests/e2e/demo.spec.ts` | unset → `/api/demo` is mocked, zero OpenAI spend. Set to `1` to exercise the real endpoint. |

Existing vars that became **load-bearing** rather than optional: `TWILIO_AUTH_TOKEN` (now required for any webhook to be accepted at all), `TWILIO_WEBHOOK_URL` / `NEXT_PUBLIC_APP_URL` (used to reconstruct the exact URL Twilio signed — a mismatch means every signature fails).

No secret was read, printed, or written anywhere in this lane's work.

---

## 3. Tests — what passes today and what does not

### `tests/api-guards.test.ts` — 50 tests, all passing

Covers: all 13 agent handlers 404 while disabled · `guardAgentApi` never touches NextAuth or Prisma while disabled · `PUT /api/agent/call` never reaches Twilio even with `TWILIO_*` configured · 403-no-allowlist, 401-anonymous, 403-not-owner, 401-on-session-error, owner passes (case-insensitive) · contacts serve data only to the owner · mass assignment rejected · middleware matcher contains `/api/agent/:path*` · middleware 404 bodies (JSON vs HTML with a link home) · webhook signature accept/reject/not-configured · status-callback route exists and answers 204 signed / 403 unsigned · `/api/tools-demo` 400s + rate-limit trip with a human message + per-IP isolation · `/api/recommend` 400/413/rate-limit/no-key · `/api/tts` same-origin 403.

`openai`, `twilio`, `@/lib/prisma`, `next-auth/next` and `@/lib/auth` are all mocked. **The suite makes no network call and spends nothing.**

### Playwright — 88 tests, 7 files, **not yet executed**

They compile and list clean, but I could not run them: the brief reserves `next build` and port 3200 for you. Treat every e2e result below as *unverified* until you run them.

| Spec | What it pins |
|---|---|
| `tests/e2e/home.spec.ts` | one `<h1>` · title/description/canonical · **no `href="#"`** · every internal homepage link resolves · primary CTA reaches `/create` and the form is there · every `navLinks` destination renders · header shows all five (desktop only) · 404 page has an `<h1>`, a link home and `noindex` |
| `tests/e2e/demo.spec.ts` | control room renders · quick prompt → **loading state** (send button disables) → an answer renders → the outcome panel fills · `fallback:true` shows the scripted-sample banner · a 500 from `/api/demo` still answers the visitor |
| `tests/e2e/lead-form.spec.ts` | step gating · required name + valid email · **one POST per submit, including a double click** · sending state disabled · explicit "Request received" · 502 shows the error block and never a fake success |
| `tests/e2e/pricing.spec.ts` | `/pricing` quotes every `packages.ts` price · no retired price string on 4 pages · `/llms.txt` agrees · no `"is From $"` prose defect · all JSON-LD parses |
| `tests/e2e/redirects.spec.ts` | every non-parameterised `next.config.js` redirect: 3xx → exact `Location` → destination 200 and **not itself a redirect** · robots disallows `/api/` and `/agent/` · sitemap parses, no dupes, all absolute · no sitemap URL is a redirect source |
| `tests/e2e/console.spec.ts` | zero console errors and zero failed same-origin requests on 8 pages · no horizontal overflow · visible focus ring on the first CTA |
| `tests/e2e/a11y.spec.ts` | axe WCAG 2.1 A/AA over `/`, `/demo`, `/pricing`, `/create`, `/ai-receptionist`, `/about` — **zero serious/critical** · `<main>` + `lang` on every page · every `<img>` has `alt` |

**Predicted failures on first run**, based on what the production smoke run already proved (§6) — check these before assuming a broken spec:

1. `home.spec.ts` "no dead links" — production still has one `href="#"` on `/pricing`, `/create`, `/about`, `/ai-receptionist`, `/faq`. Another lane may have fixed it on the branch; if not, this fails and it is a real defect.
2. `pricing.spec.ts` `/llms.txt` — production `/llms.txt` still carries `$2,500–5,000`.
3. `a11y.spec.ts` — never run before. Expect findings.
4. `console.spec.ts` — a hydration warning from `components/marketing/Reveal.tsx` was an open finding at wave start.

Every spec mocks the network it touches: `page.route()` on `/api/build-request` and `/api/demo`. **No e2e run creates a lead row, sends an email, or spends an OpenAI token.**

---

## 4. Commands you need to run

```bash
# 1. Install the two new devDependencies (already in package.json; the
#    package-lock is updated, node_modules on this machine is already correct).
npm install

# 2. Unit gate (this lane's 50 tests are in here)
npx tsc --noEmit
npm test

# 3. Build + start the server. E2E runs against YOUR server on 3200 —
#    playwright.config.ts deliberately has no `webServer` block so nothing
#    races you for the port.
npm run build
npx next start -p 3200        # leave running in a second terminal

# 4. E2E (Chromium 1234 is already installed under %LOCALAPPDATA%\ms-playwright,
#    matching @playwright/test 1.62.1 — no browser download needed)
npm run test:e2e                       # all 88, desktop + mobile
npm run test:e2e -- --project=desktop  # faster first pass
npm run test:e2e:a11y                  # axe only

# 5. Smoke — READ-ONLY, never POSTs. Run against prod BEFORE the deploy to
#    capture the baseline, and again after.
npm run smoke                                   # https://aibuiltbyhand.com
node scripts/smoke.mjs http://localhost:3200    # against your local build
node scripts/smoke.mjs https://<preview>.vercel.app
```

`tests/e2e/global-setup.ts` pings the base URL first and fails with the exact commands above if nothing is listening — you will not get 88 identical ECONNREFUSED traces.

Point Playwright elsewhere with `E2E_BASE_URL=https://<preview>.vercel.app npm run test:e2e`.

---

## 5. Owner decisions — do not resolve these yourself

### 5.1 🚩 `/api/agent/contacts` is returning 200 on production RIGHT NOW

Evidence, from `node scripts/smoke.mjs https://aibuiltbyhand.com` run today:

```
[security] GET /api/agent/contacts does NOT serve data — status 200
[security] GET /api/agent/calls is gated — status 200
[security] GET /api/agent/campaigns is gated — status 200
```

The body carried no contact fields, so the `Contact` table is empty *at this moment* — but the endpoint is open, and the first row written is public. This is not fixed until this branch is **deployed**, not merely merged. The fix is in the tree; the exposure is live.

I did not test `PUT /api/agent/call` against production. Doing so would place a real phone call. **Do not.** Whether `TWILIO_*` is set in Vercel Production cannot be determined from the repo — check the dashboard before deploying, and if it is set, treat the window between now and deploy as an open dialer.

### 5.2 🚩 The "Sarah" cold-caller — CRTC / National DNCL / CASL

A prominent `// ⚠️ OWNER DECISION REQUIRED` block now sits at the top of `lib/agent/conversationEngine.ts` with live line references. It is not softened and the file is not deleted. Summary of what it says:

1. **No AI disclosure.** `:163` and `:174` both open `"My name is Sarah"`. CRTC Unsolicited Telecommunications Rules require identification at the start of the call. The same file at `:313` sells the product on the grounds that it "introduces itself as your AI assistant rather than pretending to be a person".
2. **A refusal is not honoured.** `:152-154`: "not interested" / "don't call" / "remove" does not end the call — it asks another question. A stated refusal is a do-not-call request and must stop the call immediately and be persisted. **There is no internal do-not-call list anywhere in the repo.**
3. **No National DNCL scrub, no calling-hours enforcement, no registration.** `lib/agent/campaignManager.ts` dials a target list with no DNCL check.

Plus a fabrication risk: the pitch at `:310-317` claims "15+ languages" and "unlimited calls simultaneously", and `lib/agent/pricebook.ts` quotes monthly plans that contradict `lib/data/packages.ts`.

**`AGENT_SUBSYSTEM_ENABLED` must stay unset until 1–3 are fixed, an internal DNCL exists, and registration is in place.** That is Pavneet's call, not ours.

### 5.3 `lib/rateLimit.ts` — limiters I want but did not write

That file belongs to Lane C, so I reused `checkDemoPerMinute` / `checkDemoPerDay` / `checkDemoGlobalDaily`. **Consequence: `/demo`, `/demo/*` and the Solution Finder now share one per-IP budget** (3/min, 20/day), so a visitor who plays with the showroom has less allowance left for a product demo. Acceptable as a spend cap, wrong as a product decision.

Exact functions to add to `lib/rateLimit.ts` when someone owns it:

```ts
const toolsDemoIpMinute = new Map<string, Bucket>();
const toolsDemoIpDay = new Map<string, Bucket>();

/** 6 tools-demo messages per minute per IP (the /demo/* pages are chat-shaped). */
export function checkToolsDemoPerMinute(ip: string): RateResult {
  return take(toolsDemoIpMinute, ip, 6, 60_000);
}

/** 40 tools-demo messages per IP per day (TOOLS_DEMO_MAX_PER_IP_DAY). */
export function checkToolsDemoPerDay(ip: string): RateResult {
  const max = Number(process.env.TOOLS_DEMO_MAX_PER_IP_DAY || 40);
  return take(toolsDemoIpDay, ip, max, DAY);
}

/** Global daily backstop for the tools demos (TOOLS_DEMO_DAILY_REQUEST_CAP, default 300). */
let toolsDemoGlobalDay = { count: 0, resetAt: 0 };
export function checkToolsDemoGlobalDaily(): RateResult {
  const max = Number(process.env.TOOLS_DEMO_DAILY_REQUEST_CAP || 300);
  const now = Date.now();
  if (now >= toolsDemoGlobalDay.resetAt) toolsDemoGlobalDay = { count: 0, resetAt: now + DAY };
  if (toolsDemoGlobalDay.count >= max) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((toolsDemoGlobalDay.resetAt - now) / 1000)) };
  }
  toolsDemoGlobalDay.count++;
  return { ok: true, retryAfter: 0 };
}
```

Swapping them into `app/api/tools-demo/route.ts` is a three-line import change; `tests/api-guards.test.ts` will need its "3 requests then limited" counts adjusted to 6.

Also worth flagging: these limiters are **per serverless instance**, in memory, and reset on cold start. They are a floor against a single script, not a fortress. A real cap needs Vercel WAF or a KV store.

### 5.4 `.gitignore` — what I ignored and what I deliberately did not

`research/` is **already partly tracked — 124 files.** I did not ignore it. What I added:

```
/*.html   /*.zip   /*.jpg      # root-level design exports (2.7 MB HTML, 51 KB zip)
/logos/                        # 3.9 MB of brand PNGs, previously not covered by the root-only /*.png rule
research/**/screenshots/       # 127 untracked PNGs; zero tracked images under research/
research/**/*.png
research/**/*.jpeg
/playwright-report/  /test-results/  /blob-report/  /playwright/.cache/
```

Verified after the change:

- `git ls-files | git check-ignore --stdin -v` → **empty**. No file that is currently tracked became ignored.
- `git check-ignore -v public/founder.jpg` → **not ignored**, as instructed. The root-only `/*.jpg` rule does not reach into `public/`.
- `docs/design/screenshots/**` (40 deliberately-tracked jpegs) untouched.
- A `git add -A` can no longer stage a single `.png`, `.jpg`, `.jpeg`, `.zip` or root `.html`.

Explicit-path staging is still the rule. This is the seatbelt, not the brake.

### 5.5 Not fixed, out of my lane

- `app/global-error.tsx` has no `<title>`.
- No `loading.tsx` anywhere under `app/` — `/account` and `/dashboard` are blank waits.
- `app/agent/*` pages call their APIs with `alert()` and bare `console.error` on failure. Behind the kill switch now, so it is dormant, but it is still the wrong pattern if the subsystem is ever enabled.
- `components/AgentCallButton.tsx` never resets `isCalling`, so the button sticks disabled after a successful call. Same dormancy.
- `lib/agent/openaiConversationEngine.ts` is dead code (imported by nothing) and carries the same "My name is Sarah" line. Left in place — deleting it is an owner decision under the "do not delete the subsystem" rule.

---

## 6. Production smoke — baseline captured today

`node scripts/smoke.mjs https://aibuiltbyhand.com` → **135 / 159 checks passed** (verified twice; the first run was 134/159 before the homepage-canonical assertion was made trailing-slash tolerant). The failures are the pre-deploy baseline, not regressions from this wave:

| Group | Finding |
|---|---|
| security | `/api/agent/contacts`, `/api/agent/calls`, `/api/agent/campaigns` all **200 in production** — the live P0, fixed on this branch, not fixed until deploy |
| metadata | `og:image` missing on 14 sampled pages |
| content | one `href="#"` on `/pricing`, `/create`, `/about`, `/ai-receptionist`, `/faq` |
| content | `/llms.txt` still quotes the retired `$2,500–5,000` |
| redirects | ~48 sources answer 200 instead of 3xx — these are **new rules added on this branch** that production has not deployed yet, i.e. deploy lag, not defects. The script now prints that caveat inline. One real one: `/resources/best-ai-tools-for-small-business-canada` → `/resources/best-ai-tools-for-small-business` on prod, while the branch config says `/resources/best-ai-automations-for-service-businesses`. |

The script asserts security headers too — all five pass on production (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, `Permissions-Policy`, HSTS `max-age=63072000; includeSubDomains; preload`).

Re-run it against the preview URL after deploy. The `/api/agent/contacts` line flipping from FAIL to PASS is the single clearest proof the P0 is closed.

---

## 7. Files this lane touched

**New:** `lib/agent/guard.ts` · `lib/agent/twilioSignature.ts` · `app/api/agent/call/webhook/status/route.ts` · `tests/api-guards.test.ts` · `playwright.config.ts` · `tests/e2e/global-setup.ts` · `tests/e2e/{home,demo,lead-form,pricing,redirects,console,a11y}.spec.ts` · `scripts/smoke.mjs`

**Modified:** `middleware.ts` · all 6 `app/api/agent/**/route.ts` files · `app/api/tools-demo/route.ts` · `app/api/recommend/route.ts` · `lib/agent/conversationEngine.ts` (comment block only — no behaviour change) · `package.json` (devDependencies + scripts only; already swept into a commit by you) · `package-lock.json` · `.gitignore`

**Not touched:** `app/api/tts/route.ts` and `app/api/tools/route.ts` already had same-origin and paywall/rate-limit guards. They are covered by new tests, not new code.
