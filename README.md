# aibuiltbyhand.com

The marketing and lead-generation site for **Handbuilt AI**, a one-person AI studio in Surrey, BC that builds AI receptionists, quote follow-up and back-office automation for trades and small businesses.

It is a website, not a product. There is no customer dashboard, no marketplace, and nothing is sold through it. It exists to explain the work, demonstrate it, and capture one enquiry.

**Working in this repo with an AI assistant? Read [`AGENTS.md`](./AGENTS.md) first** — it holds the traps that have already cost a release.

## What is on the site

- **~240 pages**, almost all generated from data files in `lib/data/` rather than hand-written routes.
- **Five free calculators** at `/tools` — missed-call cost, profit pricing, labour burden, quote follow-up, lead-leak audit. They run entirely in the browser; the numbers a visitor types never leave their machine.
- **An AI Worker Showroom** at `/demo` — pick a worker and a trade, type as the customer, see what it says. It is a simulation and it says so: no real call, text, email or booking.
- **One enquiry path** at `/create`, which persists to Postgres *before* it emails, so a mail failure cannot lose a lead.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · Prisma → Neon Postgres · Resend · OpenAI · NextAuth (Google) · Vercel Web Analytics · Vitest · Playwright · deployed on Vercel.

## Running it locally

```bash
npm install
npm run dev            # http://localhost:3000
```

Everything renders without a database except the enquiry form, which needs `DATABASE_URL`.

Environment variables live in `.env.local` (git-ignored). The names you may need:

| Variable | What it does | Needed for |
|---|---|---|
| `DATABASE_URL` | Neon Postgres connection | the enquiry form, any build via `npm run build` |
| `OPENAI_API_KEY` | powers the demo, the interview and the finder | live AI output — without it they fall back to canned copy |
| `RESEND_API_KEY` | lead notification email | production only |
| `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL` | who the lead email goes to and from | production only |
| `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google sign-in | the non-public signed-in area |

**Never commit a `.env` file, and never read one to retrieve a value.** Grep for the variable name instead.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | dev server |
| `npx tsc --noEmit` | type check |
| `npm test` | unit tests (vitest) |
| `npm run test:e2e` | end-to-end tests (Playwright) |
| `npx next build` | **build locally without touching a database** |
| `npm run build` | `prisma migrate deploy && next build` — **runs migrations.** This is the production build. |
| `npm run smoke` | smoke check against a running site |

> ⚠️ `npm run build` runs database migrations before it compiles. Use `npx next build` locally. A change under `prisma/migrations/` executes against the production database on the next production deploy — see [`docs/ROLLBACK.md`](./docs/ROLLBACK.md).

## Adding a page

You almost never add a route. Landing pages come from the data files in `lib/data/`, which feed `lib/data/registry.ts`, which feeds `app/sitemap.ts` and `app/llms.txt/route.ts`. Add an entry to the right data file and the page, the sitemap and the internal links follow.

Prices are the exception to nothing: **`lib/data/packages.ts` is the only place a price may be defined.** Hand-typed copies elsewhere are what produced a page that once displayed three different prices for one package.

## Documentation

| | |
|---|---|
| [`AGENTS.md`](./AGENTS.md) | How this repo works and what will bite you. Read before any broad scan. |
| [`docs/ROLLBACK.md`](./docs/ROLLBACK.md) | How to undo a bad production deploy, and how to verify it took. |
| [`docs/launch/`](./docs/launch/) | Marketing launch package — **all drafts, nothing sent or published.** |
| [`docs/archive/`](./docs/archive/) | Superseded setup and deployment guides. Historical only; do not follow them. |
| `research/transformation-2026-08-30/` | Evidence reports behind the current rebuild, every claim carrying a `file:line`. |
| `resend-email-setup.md` | Getting `aibuiltbyhand.com` able to send and receive mail. It currently cannot do either. |

## Two things to know before writing copy

1. **Nothing may be claimed that is not in `research/transformation-2026-08-30/09-proof-founder-positioning.md`.** No customer, testimonial, count, outcome, review or logo. There are no clients yet, the site says so, and an invented review has shipped here once already.
2. **There is no calendar.** The primary call to action is a request form. Copy says "Request", never "Book a call".
