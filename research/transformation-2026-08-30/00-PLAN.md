# Site Transformation Op — 2026-08-30 — Live Plan

**Directive:** owner god-prompt (Desktop `New Text Document (2).txt`) — implement, test, deploy, verify, report. Not another audit.
**Branch:** `feat/site-transformation-2026-08-30` (cut from `fix/dead-social-link` @ `e732d98`, then merged `origin/main`).
**Rollback anchor:** production = `origin/main` = `3031d36baae51b05cca0db14557217f1fc5ff9fd` (2026-07-15, "Merge pull request #2"). Vercel MCP cannot see project `prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv` (404/403 — token scope), so the rollback is *git-level*: re-promote the `3031d36` deployment from the Vercel dashboard, or `git revert -m 1 <merge-sha>` on `main`.
**Baseline (before any change):** `tsc` 0 errors · `vitest` 9 files / 114 tests pass · prod `/` 200, title "AI Receptionist & Admin Systems for BC Contractors | Handbuilt AI" · sitemap 216 `<loc>`, all `lastmod` = `2026-07-16T05:19:47.431Z` · `www` → apex is **307**.

## 🚨 Blockers / owner-only items (verified 2026-08-30)
1. **36 commits of fixes have never been merged/deployed** — prod still runs 2026-07-15 code. Merge approval is his.
2. **`aibuiltbyhand.com` cannot receive email.** DNS (Resolve-DnsName, 2026-08-30): **no MX**, **no SPF/TXT**, **no Resend DKIM** (`resend._domainkey`), only `_dmarc` = `v=DMARC1; p=none;`. ⇒ `build@aibuiltbyhand.com` must NOT be published; Resend still sends from `onboarding@resend.dev`; lead confirmation email stays blocked. Fix = mailbox provider (Google Workspace / Cloudflare Email Routing) + Resend domain verification + `LEAD_FROM_EMAIL` in Vercel Production.
3. **No calendar integration** — `.env.local` has a `CALCOM_API_KEY` name but no code references Cal.com. CTAs must say "Request", not "Book".
4. **`/api/agent/*` unauthenticated + cold-call script says "My name is Sarah"** — product/legal decision (CRTC DNCL, CASL). Not shipping new; decision needed.
5. **GBP not created**; all `site.social` links are `#`. Off-site foundation is owner-action.
6. **Vercel Analytics plan** — custom events are dropped on Hobby. Cannot verify plan from here.

## Owner-supplied assets found (untracked — never `git add .`)
- `public/founder.jpg` — real portrait 560×560, added 2026-08-05. **Will be used** for the founder section (flag for approval in the final report).
- `logos/1–4.png` (~1 MB each, 2026-07-06) — logo candidates; evaluate vs `public/` logo.
- `Handbuilt-Website design1.html` (2026-06-29, amber palette) and `The Quiet Hours*.html` — historical, pre-Molten-Forge; not the direction.
- `AI Built By Hand final design rotating.zip` — the 2026-07-04 Molten Forge handoff (already implemented).

## Full scope enumeration (sized BEFORE the fleet — memory rule)
| # | Dimension | Wave-1 owner | Status |
|---|---|---|---|
| 1 | Repo/architecture, chrome duplication, brand/email/dead-link consistency, dead code, API auth surface | A1 | running |
| 2 | Crawl + 216-URL inventory (status/canonical/title/desc/H1/words/links/schema/prices) + GSC join | A2 (only agent that builds/starts app) | running |
| 3 | Content quality, cannibalization, per-URL keep/improve/merge/redirect/noindex, claims audit, priority-page outlines | A3 | running |
| 4 | UX/CRO journey, lead-form UX, demo UX, WCAG 2.2 AA audit | A4 | running |
| 5 | Design tokens, grey-text contrast, motion/opacity-hidden, template unification, responsive risks, asset weight, OG image | A5 | running |
| 6 | Schema unification, metadata, sitemap lastmod design, robots, 29 redirects, www 307, IndexNow, llms.txt | A6 | running |
| 7 | Analytics events map, UTM/attribution, privacy-policy accuracy, event tests | A7 | running |
| 8 | Test inventory, API risk table, secret exposure, error states, build/deploy safety, prod smoke spec | A8 | running |
| 9 | Verified proof register (COITracker, PayNudge, Ironwood Grounds, others), founder facts, positioning synthesis, launch-checklist inputs | A9 | running |
| 10 | Baseline screenshots (7 viewports × 12 pages) + Lighthouse (7 pages × mobile/desktop) on prod | A10 | running |
| 11 | Lead pipeline end-to-end (/create, /start, API, Resend, dedupe) + demo pipeline + safe test mode | A11 | running |
| 12 | Pricing sweep repo-wide (stale strings) | A2 crawl + A3 claims | running |
| 13 | Search Console fresh pull via Chrome | deferred — owner-supplied numbers used; needs his Google session | — |
| 14 | Performance optimisation (fonts, bundle, three.js, images) | wave 2 — from A5 + A10 | pending |
| 15 | Marketing launch package (docs) | wave 2 | pending |
| 16 | External launch checklist (GBP, LinkedIn, directories) | wave 2 — from A9 | pending |
| 17 | AGENTS.md for the repo (traps only) | wave 2 — from A1 | pending |
| 18 | Deploy: push → preview verify → owner approval → merge → prod verify → GSC | wave 3 — **push/merge/deploy require his explicit GO** | pending |

## Wave 2 — implementation (file ownership assigned after wave-1 reports land)
Planned lanes: (a) design system + global chrome + homepage; (b) lead form + API + attribution; (c) demo/showroom states; (d) SEO: seo.ts / sitemap / robots / redirects / schema; (e) content registries + priority pages; (f) tests + e2e harness; (g) docs: launch package, AGENTS.md, checklist.
Gate before commit: tsc 0 · vitest green · `next build` 0 · crawl of local build shows 0 stale prices, unique titles, 1 H1, self-canonicals · a11y scan · Lighthouse on local build · screenshots at 7 viewports.

## Log
- 2026-08-30 10:25 baseline tsc/vitest green; branch created; 11 agents launched; origin/main merged (empty tree diff).
- 2026-08-30 wave 1 complete — all 11 reports on disk. 4 agents reported "failed" on a Fable rate limit but
  HAD written their files first; verified on disk rather than trusting the notification, and stopped 2
  needless reruns. Only A5 genuinely died and was relaunched.
- 2026-08-30 wave 2 — 6 implementation lanes (design by me; SEO, lead, content, security/tests, docs by
  agent), disjoint file ownership, integrator commits by path because all lanes share one working tree.
- 2026-08-30 wave 2 complete, 50 commits. FINAL GATE, all measured on the local production build:
  tsc 0 · vitest 232/232 · next build exit 0 (214 pages) · Playwright 89/89 across desktop Chromium and
  mobile WebKit · scripts/smoke.mjs 158/158 · zero horizontal overflow at 7 widths ·
  Lighthouse a11y 87-96 -> 100 everywhere, /ai-receptionist mobile perf 82 -> 96 (LCP 4.1s -> 2.7s).
- ⛔ STOPPED AT THE RELEASE GATE. Push, merge and deploy are owner-approval-only (global CLAUDE.md §4).
  Nothing has been pushed. Production still runs 3031d36.
