# Tools Pro — Go-Live Runbook

**Updated 2026-06-16.** Tools Pro (5 AI tools, NextAuth login + Stripe subscription, free-1-per-tool
funnel, rate limits) is `tsc`-clean and `next build`-clean. It is **DEPLOYED to prod** (`main`, live on
aibuiltbyhand.com) but **intentionally non-functional** for login/checkout until the secrets below land.
Nothing goes live until **every var is in Vercel Production AND you redeploy** (env changes only apply to
new deployments).

The dashboard steps (Google / Stripe / Vercel) are **yours** — I can't touch them. I can drive the
Google + Stripe browser setup *with* you and set the non-secret vars; you paste the actual secrets.

---

## ✅ Already done (do NOT redo)

- **Database = Neon `ai-shop-db`** (NOT Supabase — free-cap forced the switch). Provisioned via the Vercel
  integration; `POSTGRES_PRISMA_URL` + `POSTGRES_URL_NON_POOLING` + `DATABASE_URL` auto-synced to
  Prod+Preview (Sensitive). Prisma reads `POSTGRES_PRISMA_URL`/`POSTGRES_URL_NON_POOLING` (see
  `prisma/schema.prisma`). **12 tables already created** — `prisma migrate deploy` runs in the build, so
  migrations auto-apply on every deploy. No manual migrate needed.
- **`NEXTAUTH_SECRET`** and **`NEXT_PUBLIC_APP_URL`** already set in Production.
- The old "rotate Supabase pw / NEXTAUTH_SECRET / RESEND_API_KEY" leak items are a **COITracker**
  concern, not AI Shop (AI Shop never had a Supabase DB). Not a blocker here.

---

## STEP 1 — Google OAuth (login). HARD blocker — Google is the only sign-in.

Google Cloud Console → APIs & Services → Credentials → **Create OAuth client ID** (Web application):
- Authorized redirect URI: `https://aibuiltbyhand.com/api/auth/callback/google`
- Copy **Client ID** → `GOOGLE_CLIENT_ID`, **Client secret** → `GOOGLE_CLIENT_SECRET`.

Also confirm **`NEXTAUTH_URL`** = `https://aibuiltbyhand.com` is in Vercel Production (NextAuth needs it
for callbacks).

---

## STEP 2 — Stripe: product + prices + webhook

Stripe → Products → **+ Add product**: "Tools Pro". Add **two recurring prices**, at the **FOUNDING**
numbers (the site shows $29/$290 struck-through as the anchor; founding deal = first 20 members):
- **Monthly $19 CAD** → copy `price_…` → `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY`
- **Annual $190 CAD** → copy `price_…` → `NEXT_PUBLIC_STRIPE_PRICE_ANNUAL`

(When 20 members are sold, create $29/$290 prices and swap these env IDs — Stripe grandfathers existing
subscribers at their original price.)

Stripe → Developers → API keys → **Secret key** (`sk_live_…`) → `STRIPE_SECRET_KEY`.

Stripe → Developers → Webhooks → **+ Add endpoint**:
- URL: `https://aibuiltbyhand.com/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.created`,
  `customer.subscription.updated`, `customer.subscription.deleted` (matches
  `app/api/stripe/webhook/route.ts`).
- Copy **Signing secret** (`whsec_…`) → `STRIPE_WEBHOOK_SECRET`.

---

## STEP 3 — Vercel env vars (Production), then REDEPLOY

Vercel → Settings → Environment Variables → **Production**:

| Var | Source | Breaks if missing |
|---|---|---|
| `GOOGLE_CLIENT_ID` | Step 1 | Google sign-in (→ no signups) |
| `GOOGLE_CLIENT_SECRET` | Step 1 | Google sign-in |
| `NEXTAUTH_URL` | `https://aibuiltbyhand.com` (confirm set) | OAuth callback |
| `STRIPE_SECRET_KEY` | Step 2 (`sk_live_…`) | checkout + billing portal |
| `STRIPE_WEBHOOK_SECRET` | Step 2 (`whsec_…`) | subscription status never updates |
| `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY` | Step 2 monthly `price_…` | monthly plan button |
| `NEXT_PUBLIC_STRIPE_PRICE_ANNUAL` | Step 2 annual `price_…` | annual plan button |
| `OPENAI_API_KEY` | OpenAI | tools serve canned fallback, not live AI |
| `OPENAI_MODEL` | optional, default `gpt-4o-mini` | — |
| `TOOLS_GLOBAL_DAILY_MAX` | optional, default `5000` | global daily generation backstop |

**Never set `TOOLS_DEV_UNLOCK` in Production** — it's a non-prod-only test flag (hard-gated to
`NODE_ENV!=='production'`, so it's inert in prod anyway, but don't add it).

After all vars are in → **Vercel → Deployments → Redeploy** (env changes don't apply to existing
deployments).

---

## STEP 4 — Verify live (deployed ≠ working)

1. `https://aibuiltbyhand.com/tools` loads; each tool page shows the generator (free-taste).
2. Run one tool unauthenticated → real AI output (not canned); a 2nd run of the same tool → upgrade card.
3. Sign in with Google → lands on `/account`.
4. `/tools/pro` → pick a plan → Stripe checkout opens at the right price ($19/$190).
5. Complete a purchase (use Stripe **test** keys first) → webhook fires → `/account` shows active →
   `/tools/pro` and every tool unlock (unlimited).
6. Billing portal opens from `/account`.

Only when 1–6 pass is Tools Pro actually live.

---

## Later (deferred, NOT now) — the "AI uses / recommends the tools" layer

Decided + parked 2026-06-16 (zero customers → wrong time to build). Architecture is locked in
`docs/ai-access-plan.md` — build it once revenue justifies it, in this order: JSON output mode on all 5
tools → subscriber API keys (Bearer) + free read-only discovery → OpenAPI 3.1 schema → one Custom GPT →
(only if a customer asks) an MCP server. Plus GEO question-intent pages to get recommended by AI.
