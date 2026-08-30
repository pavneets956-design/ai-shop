# S1 — Adversarial Security Verification

**Target:** https://aibuiltbyhand.com (production) + local production build at http://localhost:3200
**Repo:** `feat/site-transformation-2026-08-30` @ `8c32924`
**Date:** 2026-08-30 (UTC probes ~19:52Z)
**Method:** read-only against production (GET/HEAD, plus PUT/POST to `/api/agent/*` ONLY to confirm refusal); any method against localhost.

## VERDICT: **CLOSED**

The `/api/agent/*` hole is closed on production and in the `8c32924` build. Two independent locks stand in front of every handler: an edge kill switch in `middleware.ts` (404s the whole subsystem unless `AGENT_SUBSYSTEM_ENABLED === "true"`, which is set nowhere) and an in-handler `guardAgentApi()` that fails closed. Every enumerated route returns 404 to every method and every bypass I tried. No secrets in the tree or the browser bundle. No real Twilio number is exposed. One material discrepancy worth flagging (prod is running an OLDER commit than `8c32924` — see §7) and three low-severity observations (§8), none of which reopen the hole.

---

## 1. Production re-verification of the agent fix

Routes enumerated from the filesystem:
- API (`app/api/agent/**`): `businesses/search`, `call`, `call/webhook`, `call/webhook/status`, `calls`, `campaigns`, `contacts`, `contacts/[id]`
- Pages (`app/agent/**`): `/agent`, `/agent/calls`, `/agent/campaigns`, `/agent/contacts`, `/agent/leads`, `/agent/leads/[id]`, `/agent/settings`

### API — GET/HEAD (production)
Every path, both methods → **404**, body `{"error":"Not found"}` (21 bytes), `content-type: application/json`. No data, no stack.

| Path | GET | HEAD |
|---|---|---|
| /api/agent | 404 | 404 |
| /api/agent/businesses/search | 404 | 404 |
| /api/agent/call | 404 | 404 |
| /api/agent/call/webhook | 404 | 404 |
| /api/agent/call/webhook/status | 404 | 404 |
| /api/agent/calls | 404 | 404 |
| /api/agent/campaigns | 404 | 404 |
| /api/agent/contacts | 404 | 404 |
| /api/agent/contacts/1 | 404 | 404 |

### API — mutating methods (production, permitted only to confirm refusal)
All refused with **404** (never 200/201/500 with data). Stopped-condition not triggered — nothing returned other than 404.

| Method | Path | Status |
|---|---|---|
| PUT | /api/agent/call (dial arbitrary number) | 404 |
| POST | /api/agent/contacts (create) | 404 |
| PUT | /api/agent/contacts/1 (mass-assign) | 404 |
| DELETE | /api/agent/contacts/1 | 404 |
| PUT | /api/agent/campaigns (autodial) | 404 |
| POST | /api/agent/campaigns | 404 |
| POST | /api/agent/call/webhook (no sig) | 404 |
| POST | /api/agent/call/webhook/status (no sig) | 404 |
| POST | /api/agent/businesses/search | 404 |

### Pages — GET/HEAD (production)
All → **404** with the middleware's self-contained HTML 404 (852 bytes, `noindex,nofollow`, link home). No page renders, no CRM data.

## 1a. Bypass battery (all FAILED to bypass)

| Technique | Path/Header | Result |
|---|---|---|
| CVE-2025-29927 middleware skip | `x-middleware-subrequest: middleware` (single + 5-chain + `src/middleware`) | 404 — patched (Next 14.2.33 ≥ 14.2.25) |
| Trailing slash | `/api/agent/contacts/` | 308 → `/api/agent/contacts` → 404 |
| Double slash | `/api//agent/contacts` | 308 → `/api/agent/contacts` → 404 |
| Query string | `?x=1` | 404 |
| Next data param | `?__nextDataReq=1` | 404 |
| RSC param / header | `?_rsc=abc12`, `RSC: 1` | 404 |
| Encoded dot | `/api/agent/%2e/contacts` | 404 |
| Encoded traversal | `/api/agent/x/%2e%2e/contacts` | 404 |
| Path traversal | `/api/agent/contacts/../contacts` | 404 |
| Encoded sep | `/api/agent%2fcontacts` | 404 (app 404, route unresolved) |
| Dot-slash prefix | `/./api/agent/contacts` | 404 (app 404) |
| Null byte | `/api/agent/contacts%00` | 400 Bad Request |
| Fragment / `.json` suffix | `#`, `.json` | 404 |
| Case variation | `/API/Agent/contacts`, `/api/Agent/contacts`, `/api/AGENT/CONTACTS` | 404 (Next filesystem routing is case-sensitive on Vercel → route does not resolve; returns the site's styled app 404, NOT the handler). See §8 note 1. |

The 308 redirects were followed: both land on the canonical lowercase path, which the middleware 404s. No redirect leaks to a data-bearing endpoint.

Localhost (`8c32924`) reproduces the same: every agent path 404s to GET/PUT/POST, the CVE header does nothing, pages return the HTML 404. Confirms the fix is in the code under review, not just prod config.

## 2. Rest of the public API surface (production, unauthenticated GET)

| Path | Status | Notes |
|---|---|---|
| /api/auth/session | 200 `{}` | NextAuth standard, no session → empty. Expected/public. |
| /api/auth/providers | 200 | Lists Google provider — public by NextAuth design. |
| /api/auth/csrf | 200 | CSRF token — public by NextAuth design. |
| /api/build-request | 405 | POST-only. |
| /api/consultation | 405 | POST-only. |
| /api/demo | 405 | POST-only. |
| /api/recommend | 405 | POST-only. |
| /api/stripe/checkout | 405 | POST-only. |
| /api/stripe/portal | 405 | POST-only. |
| /api/stripe/webhook | 405 | POST-only. |
| /api/tools-demo | 405 | POST-only (has per-IP rate limiting per tests). |
| /api/tools | 405 | POST-only. |
| /api/tts | 405 | POST-only (Origin/Referer gated per tests). |
| /api/indexnow | 500 (prod) / 503 (code) | See §7 + §8 note 2 — refuses without `?secret=`; leaks only an env-var name, no data/stack. |

No unauthenticated endpoint returned CRM data, PII, or a stack trace.

## 3. Guard deep-dive (localhost / source)

**Kill switch cannot be defeated by casing/whitespace.** `agentSubsystemEnabled()` = `process.env.AGENT_SUBSYSTEM_ENABLED === "true"` (exact string). `"TRUE"`, `"1"`, `" true"` all → `false` → subsystem stays 404. Fail-closed. (`lib/agent/guard.ts:38-40`.)

**`guardAgentApi()` fails closed on every branch** (`lib/agent/guard.ts`):
- switch off → 404 (`agentDisabledResponse`)
- allowlist empty → 403 with remediation text
- session import/lookup throws → `catch` → 401 (comment: "must never read as authorised")
- no email → 401; email not on allowlist → 403
- owner match → `null` (proceed)

**All 13 guarded handlers return the guard result, not merely compute it** — read in full. Each begins, before ANY body parse / DB call / side effect:
```
const denied = await guardAgentApi();
if (denied) return denied;
```
Confirmed with `await` present (no missing-await fail-open):
- `businesses/search` POST (10-11), PUT (51-52)
- `call` POST (9-10), PUT (40-41)
- `calls` GET (8-9), POST (31-32)
- `campaigns` GET (12-13), POST (30-31), PUT (63-64)
- `contacts` GET (8-9), POST (29-30)
- `contacts/[id]` DELETE (11-12), PUT (37-38)

Mass-assignment fix is live in `contacts/[id]` PUT: field allowlist `["company","contactName","phone","email","industry","status"]`, type-checked, `.slice(0,300)`, 400 on empty — no raw `data: body` into Prisma (`route.ts:50-73`).

**Twilio signature check:** uses `twilio.validateRequest` → `scmp` (constant-time compare) internally (`node_modules/twilio/lib/webhooks/webhooks.js:149`). `verifyTwilioRequest` fails closed on: no `TWILIO_AUTH_TOKEN` (`not_configured`), missing header (`missing_signature`), unreadable body, thrown validation, bad signature — all → `ok:false` → handler returns 403, never TwiML (`lib/agent/twilioSignature.ts`, `app/api/agent/call/webhook/route.ts:44-53`).

No agent-lib module (`callManager`, `businessDiscovery`, `campaignManager`, `prisma.contact`, etc.) is imported by any route OUTSIDE `app/api/agent/**` — no unguarded backdoor into the same data.

Test coverage exists and matches the model: `tests/api-guards.test.ts` asserts 404-not-401 while disabled, no DB/session consulted while off, fail-closed 403/401 paths, JSON-not-redirect for anon, mass-assignment rejection, and all Twilio fail-closed cases.

## 4. Secrets sweep (working tree, excl node_modules/.next/.git)

- Key-shaped strings (`sk_live_/sk_test_`, `sk-`, `whsec_`, `re_`, `AC[0-9a-f]{32}`, `cal_live_`, `SG.`): **no true positives.** The 7 `re_…` hits (`re_housecall`, `re_expecting`, `re_aggregate`) are English words in keyword-research data, not Resend keys.
- JWT-shaped (`eyJ….….`): **none.** Single `eyJ…` hits in `research/.../lighthouse/*.report.json` are base64 data blobs (decode to `{"`+binary, zero dots → not JWTs), i.e. Lighthouse artifacts.
- `NEXT_PUBLIC_*`: all browser-safe by design — `GOOGLE/BING_SITE_VERIFICATION`, `APP_URL`, `STRIPE_PRICE_MONTHLY/ANNUAL` (public price IDs). No secret exposed as `NEXT_PUBLIC`.
- No `.env*` files are tracked (`git ls-files` clean); `.gitignore` covers `.env*`, `.env`, and plaintext dumps like `env.local.txt`.
- **Browser bundle (`.next/static`, 111 files):** no secret prefixes, no server env-var names (`TWILIO_AUTH_TOKEN`, `STRIPE_SECRET`, `RESEND_API_KEY`, `OPENAI_API_KEY`, `NEXTAUTH_SECRET`, `INDEXNOW_PING_SECRET`), no `postgres://` / `sk-proj-`. Clean.

## 5. The "exposed Twilio number"

**Not present at this commit.** Every Twilio doc under `docs/archive/` (`TWILIO_SETUP.md`, `TWILIO_QUICK_SETUP.md`, `README_COLD_CALLING.md`) uses only the placeholder `+1234567890`. Exhaustive digit scan of `docs/archive/` found no real phone number.

The one real number in the repo is `778-850-1016`, in `docs/launch/06-gbp-posts.md:69` and `docs/launch/12-external-checklist.md:66` — **not** under `docs/archive/`, **not** a Twilio line: the docs themselves state it "belongs to Ironwood Grounds" (a third party) and is an open owner decision for GBP.

Reachability: NIL. `docs/` is not served — `/docs/archive/TWILIO_SETUP.md`, `/docs/launch/06-gbp-posts.md`, `/README.md` all 404 on prod. Sitemap contains zero `docs/archive/twilio/778` references. The number appears nowhere in served code (`app/`, `components/`, `lib/`, `public/`).

## 6. Production headers

All five required headers present and applied uniformly across `/` (200), a 404, and the agent API 404:

| Header | Value |
|---|---|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `SAMEORIGIN` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |

No `X-Powered-By`. `Server: Vercel` only (no framework version). No stack trace or version string in any body. Site-wide CSP is intentionally absent except the strict CSP scoped to `/tools/form-filler/*` (§8 note 3).

## 7. Material discrepancy — production is NOT running `8c32924`

`GET /api/indexnow` on prod returned **500** `{"ok":false,"error":"INDEXNOW_PING_SECRET not configured"}`. The source at `8c32924` returns **503** `{"ok":false,"error":"not_configured","message":"IndexNow is not configured…"}` (`app/api/indexnow/route.ts:24-40`). Different status AND body ⇒ **production is serving an earlier commit** — consistent with prod having received only the security hotfix (PR #3 / `482b5e8`), not the full transformation branch. This does not affect the verdict: the agent subsystem is closed on BOTH prod and `8c32924`. It does mean "prod == this branch" should not be assumed for anything else.

## 8. Low-severity observations (do NOT reopen the hole)

1. **Middleware matcher is case-sensitive** (`isAgentPath` compares literal `/api/agent`). `/API/Agent/*` bypasses the *matcher*, so the middleware doesn't run — but Next.js filesystem routing is also case-sensitive on Vercel, so the request never resolves to a handler (returns the app's 404). The in-handler `guardAgentApi()` is the backstop if routing ever changed. Verified 404 on prod. Defense-in-depth nit, not a vuln.
2. **`/api/indexnow` info disclosure:** an unauthenticated GET reveals the env-var name `INDEXNOW_PING_SECRET` and its configured/unconfigured state. No data, no stack. Cosmetic.
3. **Webhook GET handlers are unauthenticated when the switch is ON:** `GET /api/agent/call/webhook` and `.../status` return a plain-text 200 reachability string with no session and no signature (guarded only by the kill switch). Harmless (no data, no action) and moot while the subsystem ships dark, but worth knowing before enabling.
4. **`/api/agent/contacts` POST** returns raw `error?.message` in its 500 body (`route.ts:65-68`); full `error` object is gated behind `NODE_ENV === "development"`. Since the route is double-locked and Prisma messages are low-signal, this is minor — but the message string is echoed even in prod.

## Evidence artifacts
Raw probe logs: `research/transformation-2026-08-30/qa/_raw/` — `prod-baseline.txt`, `prod-bypass.txt`, `prod-bypass2.txt`, `prod-otherapi.txt`, `prod-headers.txt`, `local-agent.txt`.
