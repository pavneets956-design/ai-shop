# AGENTS.md — orientation for any AI assistant working in this repo

> **Read this before any broad filesystem scan.** This file plus the knowledge graph will orient you faster than grepping ~240 routes. Token-sensitive owner.

## What this is

**Handbuilt AI** — the marketing and lead-generation site at https://aibuiltbyhand.com for a one-person AI studio in Surrey, BC. It sells done-for-you AI receptionists, automations and custom builds to trades and small businesses, runs a suite of free browser calculators, and captures enquiries through one form. It is not a marketplace, not a SaaS product, and has no dashboard a customer logs into.

Next.js 14 App Router · TypeScript · Tailwind · Prisma → Neon Postgres · Resend · OpenAI · NextAuth (Google) · Vercel Web Analytics · Vitest · Playwright.

`ROUTES.md` and the other guides in `docs/archive/` describe a marketplace era that no longer exists. Do not cite them.

## Orient in this order

1. `graphify query "<question>"` — the graph at `graphify-out/` is scoped and cheaper than grep. `graphify path "<A>" "<B>"` for relationships, `graphify explain "<concept>"` for a concept, `graphify-out/wiki/index.md` for broad navigation, `graphify-out/GRAPH_REPORT.md` only for whole-architecture questions. After changing code, `graphify update .` (AST-only, no API cost).
2. The source-of-truth table below.
3. `research/transformation-2026-08-30/` — eleven evidence reports, every claim carrying a `file:line`. `09-proof-founder-positioning.md` is the **only** register of facts that may be published about the founder or the work.
4. Only then, broader exploration.

## Source-of-truth files

| Domain | File | Why |
|---|---|---|
| Prices | `lib/data/packages.ts` | Every displayed price derives from here. Never hard-code one elsewhere. |
| Brand, contact, service area, nav, social links | `lib/data/site.ts` | Sitewide identity and schema identity both read it. |
| Every programmatic landing page | `lib/data/*.ts` → `lib/data/registry.ts` → `app/sitemap.ts`, `app/llms.txt/route.ts` | Adding a page means editing data, not adding a route. |
| Metadata, canonicals, JSON-LD builders | `lib/seo.ts` | One place, ~240 pages. |
| Redirects | `next.config.js` | Not `middleware.ts`, which only gates the agent subsystem. |
| Analytics + attribution contract | `lib/track.ts`, `lib/attribution.ts` | Both files open with the privacy contract. Read it before adding a prop. |
| What may be claimed publicly | `research/transformation-2026-08-30/09-proof-founder-positioning.md` | Anything not in there is unproven. |

## Traps that already cost a release

1. **Pages come from data, not routes.** `lib/data/*.ts` feed `registry.ts`, which feeds the sitemap and `llms.txt`. Services, industries and creators are split across `_services_b.ts`, `_industries_b.ts`, `_industries_c.ts`, `_creators_b.ts` — **grep all of them or you will fix half a defect.** The exceptions are the money pages (one thin route each) and the five free tools.

2. **`lib/data/packages.ts` is the only price.** Hand-typed copies in copy files are what produced repeated contradictions, including a page that displayed three different prices for one package. `scripts/seo-baseline.js` + `scripts/seo-diff.js` compare two crawl manifests and flag JSON-LD price movement — they are a **manual** regression check you run before a release, not a build gate. Nothing stops a bad price automatically.

3. **Never set `alternates.canonical` on the root layout.** `app/layout.tsx` records why: an inherited canonical silently told Google that eleven routes were duplicates of the homepage, and every future route that forgot its own canonical would inherit the same landmine. Every public page declares its own.

4. **`npm run build` is `prisma migrate deploy && next build`.** It needs `DATABASE_URL` and it *runs migrations*. Locally, use **`npx next build`** to compile without touching a database. A schema change is therefore a production migration that executes on the next production deploy — generate the SQL with `prisma migrate dev --create-only`, review it, commit it, and get an explicit owner GO before deploying.

5. **There is no calendar and no booking product.** `lib/data/site.ts` says so at length; `bookingUrl` is the request form. Copy must say "Request", never "Book a call" — that promises a scheduled call the site cannot deliver.

6. **`aibuiltbyhand.com` cannot send or receive mail.** No MX record, no SPF, no Resend DKIM (DNS checked 2026-08-30). So: no `@aibuiltbyhand.com` address may be published anywhere, Resend still sends from the shared `onboarding@resend.dev`, and the public contact address is the Gmail in `site.ts`. Check DNS before you reintroduce a branded address.

7. **Never fabricate — this repo has done it and shipped it.** A homepage card carried an invented five-star Google review with a made-up customer name; another block quoted an invoice link on a domain the business does not own; the About page claimed "clients worldwide" when no client exists. No customer, testimonial, count, outcome, review, logo or credential goes into copy unless it is registered in `09-proof-founder-positioning.md`.

8. **Structured data must match what a human sees on the page.** A price, an FAQ answer or a rating in JSON-LD that is not visible in the rendered HTML is a manual-action risk, and this site has emitted interpolated FAQ answers that read as broken sentences.

9. **Secrets:** `.env*.local`, `env.local.txt` and `env*.txt` are gitignored. Never read them to retrieve a value — grep for the variable *name*. A live Cal.com key once sat in plaintext in `env.local.txt` and was caught only just before a commit. The Search Console verification token and the IndexNow key are public by design; nothing else is.

10. **Untracked owner assets sit at the repo root** — the founder portrait, logo candidates, design ZIPs, standalone HTML mockups. **`git add -A` / `git add .` is dangerous here.** Stage explicit paths, always.

11. **Production is `origin/main`, and local `main` has been stale behind it.** Always `git fetch` first and diff `origin/main..HEAD`. A long-lived branch of fixes has more than once sat unmerged while a bug was being "investigated" in production.

12. **Windows: stop a dev server by PID, never by process name.** `netstat -ano | findstr :3000`, then `taskkill /PID <pid> /F`. Killing `node.exe` by name takes down every other project's server on this machine.

13. **The outbound-calling agent subsystem ships dark.** `middleware.ts` returns 404 for `/agent/*` and `/api/agent/*` unless `AGENT_SUBSYSTEM_ENABLED === "true"`, and each handler additionally requires a session on the `AGENT_OWNER_EMAILS` allowlist. Do not set that flag or any `TWILIO_*` variable in a Vercel environment: the script has the AI introduce itself with a human name, and the CASL / CRTC question is an unresolved owner decision. Until then it is dead weight, not a feature.

14. **Rate limits are a floor, not a fortress.** `lib/rateLimit.ts` is in-memory and per-instance; it resets on a cold start. Every public OpenAI-backed route spends the owner's money per request. Anything new that reaches a paid API needs a limit in code *and* a Vercel WAF rule.

15. **Two `Reveal` components exist** — `components/Reveal.tsx` (framer-motion) and `components/marketing/Reveal.tsx` (CSS only). The homepage must stay framer-free; importing the wrong one silently adds the bundle back.

16. **`/tools/form-filler` is CSP- and webpack-coupled.** `next.config.js` gives that path its own Content-Security-Policy header *and* the WASM/`node:` shim it needs. Moving or renaming the route means moving both, in the same commit.

17. **The privacy policy is code documentation.** `app/privacy/page.tsx` names every processor that receives visitor data and every browser-storage key. Adding a third party, an analytics prop, or a stored field means editing that page in the same commit. It went fourteen months describing two processors out of five.

## Conventions

- **No fabrication, anywhere.** Cite a real source or omit it.
- **Drafts only.** No sends, merges, deploys, force-pushes or pushes without explicit per-action owner approval. Marketing drafts live in `docs/launch/` and are dispatched by the owner, never by an agent.
- **No silent states.** Every user-facing surface ships its loading, error, empty and failure states in the same commit as the feature. "Nothing happened on screen" is a bug even when the backend succeeded. `app/error.tsx`, `app/global-error.tsx` and `app/not-found.tsx` must stay styled and must link home.
- **Analytics payloads carry machine tags only** — slugs, ids, bands, counts. Never a name, email, phone, or anything a visitor typed. Both `lib/track.ts` and `lib/attribution.ts` state this at the top of the file, and tests pin it.
- **CASL applies to every Canadian outreach message** drafted in this repo: real sender identification, a real mailing or contact point, a working unsubscribe path, and consent or a documented existing business relationship.
- **Gate before claiming done:** `npx tsc --noEmit`, `npx vitest run`, `npx next build`, then the production smoke check. Code that compiles is not done; a merged PR is not done.
- **No volatile state in this file.** Status, counts, branch names, roadmaps and open work belong in the project memory or a working document, not here.

## Rollback

`docs/ROLLBACK.md`. Read it before touching production.
