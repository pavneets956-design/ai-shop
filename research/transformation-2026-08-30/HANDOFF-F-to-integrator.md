# HANDOFF — Lane F → integrator

**Lane F:** privacy/terms accuracy · repository documentation · marketing launch package · root markdown triage
**Date:** 2026-08-30 · **Branch:** `feat/site-transformation-2026-08-30` (no git state changed by this lane)
**Gate run:** `npx tsc --noEmit` → 0 errors · `npx eslint app/privacy/page.tsx app/terms/page.tsx` → 0 issues. No build, no server, no git write.

---

## 1. Files changed, added, moved

### Rewritten (2)

| File | What changed |
|---|---|
| `app/privacy/page.tsx` | Complete rewrite. Was dated June 6, 2026 and disclosed 2 of 5 real processors. Now describes what the code actually does. See §2. |
| `app/terms/page.tsx` | Accuracy pass. Added the AI-demo disclaimer, the free-tools disclaimer, the "a request is not a booking" section, acceptable use for the AI endpoints, an accounts section, and a deliberate refusal to state ownership terms on a marketing page. See §3. |

Both keep the existing page shell (`section` → `max-w-3xl` container → local `Section` helper) and now compose `.v-*` utilities (`v-label`, `v-h1`, `v-h3`, `v-lead`, `v-body`, `v-small`, `v-link`, `v-card`, `v-hair`) instead of the class `legal-prose`, **which is not defined anywhere in `app/globals.css`** — it was a dead class on both pages and is now gone. No new component, no CSS added; `app/globals.css` was not touched.

### Added (18)

| File | What it is |
|---|---|
| `AGENTS.md` | New. Cross-tool instruction file: source-of-truth table + 17 verified traps + conventions. Traps only, no status, no counts, no branch names, no TODOs. |
| `docs/ROLLBACK.md` | New. The rollback anchor, both rollback paths, the migration warning, and how to verify against the live domain. |
| `docs/archive/README.md` | New. Index explaining why each archived file is history and what is authoritative instead. Carries the credential-shaped-string flags from §5. |
| `docs/launch/00-README.md` … `12-external-checklist.md` | New. 13 files. The marketing launch package. All drafts. |

### Replaced (2)

| File | What changed |
|---|---|
| `CLAUDE.md` | Reduced to one line: `@AGENTS.md`. The graphify block it used to hold now lives in `AGENTS.md` § "Orient in this order", where Cursor and Codex can read it too. |
| `README.md` | Complete rewrite. It was the original create-next-app-era marketplace README ("Automated Systems Marketplace", "Browse hundreds of AI automation systems", a `prisma db push` instruction that is wrong for this repo, and stale env examples). |

### Moved — 28 renames the integrator must stage

`git status` currently shows these as **deleted at root + a new untracked `docs/archive/`**. Staging them with `git add -A` is not safe here (see §6); stage the two paths explicitly:

```bash
git add -A docs/            # picks up archive/, launch/, ROLLBACK.md
git add -u                  # records the 28 root deletions as renames
```

Git detects the renames automatically once both sides are staged.

| From (repo root) | To |
|---|---|
| `AI-HAND-BACKGROUND-GOD-PROMPT.md` | `docs/archive/AI-HAND-BACKGROUND-GOD-PROMPT.md` |
| `CHATGPT_SUMMARY.md` | `docs/archive/CHATGPT_SUMMARY.md` |
| `DATABASE_SETUP.md` | `docs/archive/DATABASE_SETUP.md` |
| `DEPLOYMENT.md` | `docs/archive/DEPLOYMENT.md` |
| `MISSED-CALL-CAUGHT-GOD-PROMPT.md` | `docs/archive/MISSED-CALL-CAUGHT-GOD-PROMPT.md` |
| `NEXTAUTH_SETUP.md` | `docs/archive/NEXTAUTH_SETUP.md` |
| `OPENAI_SETUP.md` | `docs/archive/OPENAI_SETUP.md` |
| `PREVIEW_LEADS.md` | `docs/archive/PREVIEW_LEADS.md` |
| `PRICEBOOK_UPGRADE_COMPLETE.md` | `docs/archive/PRICEBOOK_UPGRADE_COMPLETE.md` |
| `PRODUCTION_LAUNCH.md` | `docs/archive/PRODUCTION_LAUNCH.md` |
| `PROJECT_OVERVIEW.md` | `docs/archive/PROJECT_OVERVIEW.md` |
| `QUICK_DATABASE_SETUP.md` | `docs/archive/QUICK_DATABASE_SETUP.md` |
| `QUICK_DEPLOY.md` | `docs/archive/QUICK_DEPLOY.md` |
| `QUICK_START_COLD_CALLING.md` | `docs/archive/QUICK_START_COLD_CALLING.md` |
| `QUIET-HOURS-GOD-PROMPT.md` | `docs/archive/QUIET-HOURS-GOD-PROMPT.md` |
| `README_AGENT.md` | `docs/archive/README_AGENT.md` |
| `README_COLD_CALLING.md` | `docs/archive/README_COLD_CALLING.md` |
| `REBUILD_NOTES.md` | `docs/archive/REBUILD_NOTES.md` |
| `ROUTES.md` | `docs/archive/ROUTES.md` |
| `SETUP.md` | `docs/archive/SETUP.md` |
| `SETUP_CHECKLIST.md` | `docs/archive/SETUP_CHECKLIST.md` |
| `START_SERVER.md` | `docs/archive/START_SERVER.md` |
| `TOOLS-PRO-GO-LIVE.md` | `docs/archive/TOOLS-PRO-GO-LIVE.md` |
| `TROUBLESHOOTING_404.md` | `docs/archive/TROUBLESHOOTING_404.md` |
| `TWILIO_QUICK_SETUP.md` | `docs/archive/TWILIO_QUICK_SETUP.md` |
| `TWILIO_SETUP.md` | `docs/archive/TWILIO_SETUP.md` |
| `UPGRADES_COMPLETE.md` | `docs/archive/UPGRADES_COMPLETE.md` |
| `gbp-setup-pack.md` | `docs/launch/gbp-setup-pack.md` |

**Nothing was deleted.** Every file moved.

**Root markdown before: 31 files. After: 4** — `README.md`, `AGENTS.md`, `CLAUDE.md`, `resend-email-setup.md`.

### One file deliberately left at root

`resend-email-setup.md` — it is the **only** root markdown referenced from shipped code: `lib/data/site.ts` has a comment "Swap this the day a mailbox exists — see resend-email-setup.md". `lib/data/*` belongs to another lane, so moving the file would break a reference I could not fix. If that comment is updated to `docs/resend-email-setup.md` in the same commit, the file can move too. Otherwise leaving it at root is correct.

---

## 2. Privacy mismatches fixed, with evidence

Source: `07-analytics-privacy.md` §4. Every item verified against the code on the branch as it stands today, not against the report alone — three items had already changed under other lanes and are recorded accurately.

| # | Mismatch (A7 §4) | Evidence | How the new page handles it |
|---|---|---|---|
| M1 | **OpenAI entirely undisclosed.** Six endpoints send visitor-typed text to OpenAI; `/api/demo` asks the model to extract `name, phone, email, service, location` (`app/api/demo/route.ts:50`). Routes now share `lib/ai/core.ts`: `/api/demo`, `/api/consultation`, `/api/tts` (`route.ts:126-131`, model `gpt-4o-mini-tts`), `/api/recommend`, `/api/tools-demo`, `/api/tools` (dormant). | file:line, read today | Its own section, naming OpenAI, the US, and — explicitly — that **typing a real phone number into the demo sends a real phone number to OpenAI**, because that is the thing being demonstrated. Plus: it never places a call/text/email/booking, and extracted details are not stored unless the visitor submits the form. |
| M2 | **Vercel Web Analytics undisclosed.** Mounted `app/layout.tsx:9,153`. Old policy mentioned only "request logs such as IP address and browser type". | file:line | Its own section: cookieless, why there is no consent banner, what it records, and that named events carry only machine tags — never a name, email, phone, or free text. |
| M3 | **Neon Postgres undisclosed.** `prisma/schema.prisma` `model BuildRequest`; write at `app/api/build-request/route.ts`. | file:line | Named in the processor list, with the reason it exists (an enquiry survives an email failure) and a retention line. |
| M4 | **Google sign-in / NextAuth undisclosed.** `lib/auth.ts`, `app/login/page.tsx`, `SessionProvider` mounted for every visitor via `components/Providers.tsx` ← `app/layout.tsx:139`. | file:line | Cookies section: no advertising or cross-site cookies exist; the only ones are Google sign-in session cookies, and only if the visitor signs in. States what Google returns and that it is stored. |
| M5 | **No cookie section at all.** | — | Added, per M4. |
| M6 | **Full lead PII in Vercel runtime logs — ALREADY FIXED by another lane.** `app/api/build-request/route.ts:163-172` now logs source, kind, test flag, contact channel, hasPhone, `goalChars`, field count and a **hashed** IP. The comment at :161-162 records that it "used to log the entire lead (email, phone, the full /start transcript)". | read today | Documented as it now is: coarse metadata plus a one-way IP hash, and an explicit sentence that name, email, phone and enquiry text are **not** written to the logs. The policy describes the fixed behaviour, not the old defect. |
| M7 | **Stripe undisclosed.** `lib/stripe.ts`; `app/api/stripe/checkout/route.ts:14-16` returns 503 without a key and requires a session; its only caller (`components/ProCheckout.tsx`) is unreachable (A1 §d.4). | file:line | Listed and labelled honestly: payment code exists, **no payment is taken through the site today, there is no reachable checkout**, and the policy changes in the same release if that changes. |
| M8 | **Twilio / the agent CRM.** | read today | **Deliberately not disclosed.** It is not a visitor data flow, and it is now unreachable: `middleware.ts` returns 404 for `/agent/*` and `/api/agent/*` unless `AGENT_SUBSYSTEM_ENABLED === "true"` (set nowhere), and `lib/agent/guard.ts` additionally requires a session on `AGENT_OWNER_EMAILS`. Disclosing a disabled internal tool in a visitor privacy policy is noise. **If that flag is ever set, the policy needs a section in the same commit** — recorded as trap 13 in `AGENTS.md` and in the file header comment. |
| — | **Browser storage undisclosed** (not in A7 §4 because `lib/attribution.ts` did not exist then). Now real: `sessionStorage` key `hb_attr_v1`, holding UTM params, `gclid`, `referrer_host`, `landing_path`, `device`, `first_seen`. Values capped at 120 chars; every accessor failure-safe. Read into the lead body at `components/BuildRequestForm.tsx:223`. | read today | Its own section: exactly what is in it, that it holds no personal information and no typed query string, that it is not a cookie, that it dies with the tab, and that it is attached to an enquiry if one is submitted. |
| — | **Retention was one vague sentence.** | — | Broken into five explicit lines: enquiries (until deletion is requested — **stated plainly that there is no automatic deletion schedule today**), logs (host's window), analytics (aggregate, nothing to delete), browser record (dies with the tab), AI providers (their own policies). |
| — | **Accuracy nit, A7 §4.3:** `components/tools/ToolCta.tsx:53` says "nothing you enter is uploaded" — true of the values, but a `tool_calculated` beacon does fire. | file:line | The free-tools section states both: the numbers never leave the browser, and an anonymous count that the tool was used is recorded. **The `ToolCta.tsx` string itself is another lane's file and was not touched** — flagged in §7. |
| — | **Disclosed-but-not-used:** A7 §4.2 found none. Vercel and Resend are both real. | — | Both retained. |

**Date:** June 6, 2026 → **August 30, 2026** on both pages.

The file header comment on `app/privacy/page.tsx` carries the processor → file mapping and the rule that a new processor means editing the page in the same commit. That rule is also trap 17 in `AGENTS.md`.

---

## 3. Terms — what changed and why

Added: what the site is · a request is not a booking and there is no calendar · the AI demos are simulations whose output can be wrong and must not receive confidential or third-party personal information · the free tools are planning aids, not financial/tax/legal advice · prices are starting estimates in CAD and a sent quote does not change · **what transfers at handover is set by the project agreement, not by this page** · acceptable use of the AI endpoints, including that they cost real money per request and may be throttled or blocked · accounts and the fact that nothing is sold through the site · changes-to-terms.

Kept and reworded: quotes and estimates · site IP · as-is · limitation of liability (now explicitly not overriding a signed project agreement) · BC governing law · contact.

The ownership section is deliberately non-committal. `09-proof-founder-positioning.md` §C-2 blocks any ownership claim until the owner defines what actually transfers for a multi-tenant receptionist. Terms that promise something the delivery cannot is worse than terms that defer to the contract.

---

## 4. Launch package — 13 files in `docs/launch/`

`00-README.md` (index + the rules every draft obeys) · `01-elevator-pitch.md` · `02-bio-short.md` (4 lengths) · `03-bio-long.md` (site + LinkedIn variants) · `04-case-studies.md` (Ironwood Grounds, COITracker, PayNudge) · `05-linkedin-posts.md` (5) · `06-gbp-posts.md` (3) · `07-outreach-contractor.md` · `08-outreach-referral-partner.md` · `09-demo-video-script.md` · `10-lead-magnet-concept.md` · `11-30-day-schedule.md` · `12-external-checklist.md` · plus the relocated `gbp-setup-pack.md`.

- **Every factual claim traces to `09-proof-founder-positioning.md`.** No invented customer, testimonial, metric, outcome, review or credential appears anywhere.
- **Every case study is labelled "my own business / my own product, not a client"** in its first line, and the "no client case studies yet" line appears in the pitch, both bios, all three case studies, both outreach emails and one LinkedIn post. The absence of clients is stated, not hidden.
- **The receptionist is described in its honest current state:** it ran on the real Ironwood line in July–August 2026, one call produced a lead email, it failed twice (an upstream carrier delivery failure and a retired model), and **since 2026-08-27 the AI is out of the call path**. No call counts are quoted as outcomes.
- **Prices are the `packages.ts` values only** — Starter from $1,500, Business $3,500–$7,500, Custom from $10,000, Care Plan from $99/mo.
- **CASL:** `07-outreach-contractor.md` opens with a compliance section covering the consent bases (implied via conspicuous publication, implied via an existing business relationship, express), the mandatory sender identification, the 60-day-valid contact method, the unsubscribe that must be actioned within 10 business days, and the record-keeping. Both email templates carry sender ID, contact, an unsubscribe line and a `⟦mailing address⟧` placeholder. It also flags that **an AI voice agent for cold outreach is a separate CRTC/DNCL regime**, not a CASL question.
- **`⟦bracketed⟧` marks every open owner decision** — the public name form, "Pavneet" vs "Pavneet Singh", the CASL mailing address, the referral-partner terms, whether to publish the employment history (the two résumés disagree on dates), GitHub, the first-two-clients offer, and the GBP phone number.

**Nothing was sent, posted, published, scheduled, submitted, or created.** No profile exists that did not exist before. `12-external-checklist.md` says this in its first line.

---

## 5. ⚠️ Credential-shaped strings found (flagged, never copied)

Scanned all 31 original root markdown files. **Every credential value is a placeholder** — `your_account_sid`, `ACxxxxx`, `YOUR_TWILIO_AUTH_TOKEN`, `your_auth_token_here`. None was transcribed into any new file. Three things still need the owner's eyes, given `pavneets956-design/ai-shop` is a **public** GitHub repository:

1. **A real Twilio phone number, area code `+1 310` (Los Angeles)** — one distinct number, in 9 files, now all under `docs/archive/`:
   `CHATGPT_SUMMARY.md:359` · `DEPLOYMENT.md:41,64` · `PRODUCTION_LAUNCH.md:74,104` · `QUICK_DEPLOY.md:47,71` · `README_AGENT.md:75` · `README_COLD_CALLING.md:67,246` · `SETUP_CHECKLIST.md:17` · `TWILIO_QUICK_SETUP.md:12` · `TWILIO_SETUP.md:24,34,181`.
   Not a credential, but a dialable number in a public repo. If the DID is still provisioned, decide whether to release it.

2. **Postgres connection-string examples** (`postgresql://…`): `CHATGPT_SUMMARY.md:352` · `DATABASE_SETUP.md:29,70,77,82` · `DEPLOYMENT.md:36` · `PRODUCTION_LAUNCH.md:70` · `QUICK_DATABASE_SETUP.md:25,34` · `QUICK_DEPLOY.md:43` · plus the old `README.md:42` (now rewritten away, but still in git history). They read as illustrative. Worth one look each.

3. **`NEXTAUTH_SECRET=` in the old `README.md:44`** — the value is roughly 7 characters, far too short to be a real NextAuth secret, so almost certainly a placeholder. It is gone from the rewritten README. Confirm, and if it was ever real, **rotate** — deleting a line does not remove it from history.

Removing a string from a working file never removes it from git history. If any of the above turns out to be live, rotation is the only fix.

---

## 6. Notes for the integrator

- **`git add -A` at the repo root is dangerous here** and always has been. Untracked owner assets sit there: `public/founder.jpg`, `logos/`, `AI Built By Hand final design rotating.zip`, `Handbuilt-Website design1.html`, `The Quiet Hours.html`, `Quiet Hours 2nd Variant (standalone).html`. Stage explicit paths. This is trap 10 in `AGENTS.md`.
- **Suggested commit split** (Lane F is cleanly separable into three):
  1. `docs(privacy,terms): describe what the code actually does` — `app/privacy/page.tsx`, `app/terms/page.tsx`
  2. `docs(repo): AGENTS.md, README, rollback runbook, archive 28 stale root docs` — `AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/ROLLBACK.md`, `docs/archive/**`, the 28 renames
  3. `docs(launch): marketing launch package — drafts only` — `docs/launch/**`
- **`docs/ROLLBACK.md` verification marker:** the legal pages carry an explicit date string. `curl -s https://aibuiltbyhand.com/privacy | grep -o "Last updated: [^<]*"` returns `June 6, 2026` on the old production build and `August 30, 2026` on the new one. That is the cleanest rollback check available and the runbook uses it — **if a later lane changes the date format on those pages, update `docs/ROLLBACK.md` in the same commit.**
- **Rollback anchor re-verified today, not taken from the brief:** `git rev-parse origin/main` = `3031d36baae51b05cca0db14557217f1fc5ff9fd`, dated Wed Jul 15 22:18:24 2026 -0700, "Merge pull request #2 from pavneets956-design/free-contractor-tools". `git rev-list --count 3031d36..origin/main` = 0, so it is the tip. HEAD is **42 commits ahead**. ⚠️ Note that `git log` through the `rtk` proxy **hides merge commits** — it displays `b58f93e` as the top of `origin/main`. Trust `git rev-parse`, not `git log`, for the tip.

## 7. Outside Lane F — for whoever owns these files

1. **`components/tools/ToolCta.tsx:53`** says "nothing you enter is uploaded unless you submit the contact form". Accurate about the values, but a `tool_calculated` beacon does fire. A7 §4.3 suggests: *"The numbers you enter never leave your browser. We count that the tool was used — nothing else."* The privacy page now states both facts; the component string should match.
2. **`lib/data/site.ts`** comment references `resend-email-setup.md` at the repo root. If that comment is updated to `docs/resend-email-setup.md`, the file can move out of the root with everything else.
3. **`app/about/page.tsx`** — `09-proof-founder-positioning.md` §E4 flags "working with clients worldwide" (`:48`) and "for businesses and individuals worldwide" (`:13`) for removal. Not Lane F's file; verify another lane took them.

## 8. Owner-only — nothing in this repo can substitute

Full detail in `docs/launch/12-external-checklist.md`, priority-ordered. Summary:

1. **`aibuiltbyhand.com` has no MX record** — no branded address can receive mail, and the visitor lead-confirmation email stays blocked. ~1 hour of DNS work unblocks the most.
2. **Google Business Profile created 2026-06-14, never video-verified** — no local presence, and 19 built location pages are inert behind it. Only he can record the verification.
3. **No LinkedIn profile exists** — five finished post drafts have nowhere to go.
4. **The business name exists in four forms** across the site, the code, the domain and the GBP listing. Decide before GBP verification; the verified name is the hardest to change.
5. **Verify Vercel Web Analytics is enabled** on the `ai-shop` project — the component is inert until the dashboard toggle is on, and the whole 30-day measurement plan depends on it. Two minutes.
6. **GitHub profile currently contradicts the site** (named "hydratag", repo described as a marketplace) and is the site's only `sameAs` entry.
7. **Reviews and case-study consent** — nothing exists and there is no honest shortcut. Nothing from the phone line may be published; those records contain callers' personal information.

## 9. Commands run

```
git status --short                 # read-only
git branch --show-current          # read-only
git log / rev-parse / rev-list / merge-base / show -s   # read-only
grep, find, ls, sed, awk, cat      # read-only inspection
mkdir -p docs/archive
mv <28 files>                      # filesystem moves, NOT git mv
npx tsc --noEmit                   # 0 errors
npx eslint app/privacy/page.tsx app/terms/page.tsx   # 0 issues
```

No `next build`, no dev server, no `git add`/`commit`/`checkout`/`stash`/`push`. No file outside Lane F ownership was modified.
