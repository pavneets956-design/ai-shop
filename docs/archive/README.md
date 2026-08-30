# Archive — historical documents, superseded

**Nothing in this folder is current. Do not follow any instruction in it and do not cite it as the state of the project.** These files were moved here from the repository root on 2026-08-30 because they were being read by every agent session and were actively misleading.

They are kept, not deleted, because several record real decisions and the reasoning behind them.

## What is authoritative instead

| Question | Read |
|---|---|
| How this repo works, and what traps to avoid | `/AGENTS.md` |
| How to run it | `/README.md` |
| How to undo a bad deploy | `/docs/ROLLBACK.md` |
| What may be claimed publicly | `research/transformation-2026-08-30/09-proof-founder-positioning.md` |
| Prices | `lib/data/packages.ts` |
| Every current route | `lib/data/registry.ts` and `app/sitemap.ts` |
| Getting email working on the domain | `/resend-email-setup.md` |
| Google Business Profile setup | `/docs/launch/gbp-setup-pack.md` |

## Why each file is here

**The marketplace era.** The project began in June 2026 as an AI-systems marketplace with products, a cart, a creator dashboard and a sales agent. It is now a marketing and lead-generation site for a one-person studio. Everything describing that first concept is history.
`ROUTES.md` · `PROJECT_OVERVIEW.md` · `CHATGPT_SUMMARY.md` · `REBUILD_NOTES.md` · `UPGRADES_COMPLETE.md` · `PRICEBOOK_UPGRADE_COMPLETE.md`

**Setup guides written against a database and stack that has since changed.** Several tell you to run `prisma db push`, which is wrong here — the build runs `prisma migrate deploy`.
`SETUP.md` · `SETUP_CHECKLIST.md` · `DATABASE_SETUP.md` · `QUICK_DATABASE_SETUP.md` · `NEXTAUTH_SETUP.md` · `OPENAI_SETUP.md` · `START_SERVER.md` · `TROUBLESHOOTING_404.md`

**Deployment guides that predate the current Vercel setup** and instruct you to set `TWILIO_*` variables, which must not be set in any environment.
`DEPLOYMENT.md` · `PRODUCTION_LAUNCH.md` · `QUICK_DEPLOY.md`

**The cold-calling agent.** The subsystem still exists in the codebase but ships disabled behind a kill switch and an owner allowlist, and the persona and CASL/CRTC questions are unresolved. These documents describe operating it as a product.
`README_AGENT.md` · `README_COLD_CALLING.md` · `QUICK_START_COLD_CALLING.md` · `TWILIO_SETUP.md` · `TWILIO_QUICK_SETUP.md` · `PREVIEW_LEADS.md`

**Tools Pro**, a subscription product retired on 2026-07-06. The Stripe and auth code was left dormant and reversible; `/tools` was reclaimed for the free calculators.
`TOOLS-PRO-GO-LIVE.md`

**Design god-prompts.** Historical creative direction. `AI-HAND-BACKGROUND-GOD-PROMPT.md` and `MISSED-CALL-CAUGHT-GOD-PROMPT.md` describe an amber palette that was replaced by the current red-and-white system. `QUIET-HOURS-GOD-PROMPT.md` was never built; a shorter variant lives at `docs/design/specs/quiet-hours-god-prompt.md`.

## ⚠️ Credential-shaped strings in these files

Every one checked on 2026-08-30 is a **placeholder** (`your_account_sid`, `ACxxxxx`, `YOUR_TWILIO_AUTH_TOKEN`), not a live secret. Two things still deserve the owner's attention:

1. **A real Twilio phone number** — a `+1 310` area-code DID (Los Angeles) — appears in `CHATGPT_SUMMARY.md`, `DEPLOYMENT.md`, `PRODUCTION_LAUNCH.md`, `QUICK_DEPLOY.md`, `README_AGENT.md`, `README_COLD_CALLING.md`, `SETUP_CHECKLIST.md`, `TWILIO_QUICK_SETUP.md` and `TWILIO_SETUP.md`. It is a phone number, not a credential, but it is in a **public GitHub repository**. If that number is still provisioned, it can be dialled.
2. **Postgres connection-string examples** in `CHATGPT_SUMMARY.md`, `DATABASE_SETUP.md`, `DEPLOYMENT.md`, `PRODUCTION_LAUNCH.md`, `QUICK_DATABASE_SETUP.md` and `QUICK_DEPLOY.md`. They read as illustrative, but a connection string in a public repo is worth one look each before this is forgotten.

**Never copy a credential-shaped string out of these files into a new one.** If any turns out to be live, rotate it — removing it from a file does not remove it from git history.
