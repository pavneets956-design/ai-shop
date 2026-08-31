# Pre-production handoff — 2026-08-30

**Branch `feat/site-transformation-2026-08-30`, HEAD `34fc510`, pushed. NOT merged. Production still
runs `482b5e8` (the security hotfix).** One production-merge approval is outstanding.

Preview: `https://ai-shop-anfksdj11-pavs-projects-2a8231d9.vercel.app` — you are SSO'd into Vercel, so
that link opens for you directly.

---

## 1. Existing-lead census — **BLOCKED, and it is the one thing I could not do**

`vercel env pull` returns an **empty string for all 41 secret variables** on this account, so there is
no `DATABASE_URL` reachable from this machine (`.env.local` holds only `CALCOM_API_KEY`). I could not
count the production leads.

This matters: `BuildRequest` and its dedupe migration **are** on `origin/main`, so the table has existed
in production since around 2026-07-14. If leads have arrived since, they are stored — and with
`RESEND_API_KEY` present in Production they were probably emailed, but nothing proves it either way.

**To unblock, one command.** Copy the pooled connection string from the Neon console, then:

```bash
POSTGRES_PRISMA_URL='postgres://...' node scripts/leads-report.mjs
```

Output is aggregates only — counts, timestamps, delivery status, no names or emails — so it is safe to
paste back. The secret never touches disk. `--detail` adds personal data (with a red banner first),
`--retry-queue` lists leads nobody was ever told about, `--json` for machine output.

---

## 2. Lead delivery — rebuilt

`emailed BOOLEAN` could not distinguish "never attempted" from "attempted and Resend refused", so a
failed notification left the lead in Neon with nothing able to retry it. And the only reader of that
table, `/agent/leads`, rendered a hard-coded `mockLeads` array behind a subsystem that answers 404 by
design. The durable store had no reader and no retry.

| Requirement | Where it lives |
|---|---|
| Reliable owner notification | `lib/leadNotify.ts` — send + templates + state machine in one module |
| Delivery status | `notifyStatus` = pending / sending / delivered / failed / skipped, plus attempts, claim time, notified time, last error, provider message id |
| Idempotent retry | `claimLeadForNotify()` — one atomic conditional `UPDATE`; only the caller that sees `count === 1` sends |
| Failure logging without PII | coarse `errorShape` + lead id; never a name, email, phone or typed text |
| Owner-only retrieval | `/admin/leads` (server component, queries Prisma after the auth check) and `scripts/leads-report.mjs` |
| No public lead-reading endpoint | there is **no** lead-reading API route at all, by design |
| Tests | 278 total, up from 238 |

The hourly worker is `/api/internal/lead-notify-retry` (`vercel.json`), authorised by `CRON_SECRET` or an
allowlisted owner session, 404 to everything else. A crashed attempt is reaped after five minutes so a
lead cannot be stranded in `sending`. Five attempts, then it stays `failed` and is surfaced in both
readers rather than retried forever.

### Proof, run against the real deployed preview

| Case | Result |
|---|---|
| Normal submission | `200 { ok:true, id, delivery:{persisted:true, emailed:false} }` |
| Same payload again | **identical id**, `deduped:true` — one row, one notification |
| Different lead | new id — not swallowed by the dedupe window |
| Honeypot | `200` but `persisted:false` — the bot sees success, nothing is stored, and the response says so |
| No contact details | `400` "Enter an email or a phone number so we can reply" |
| Cross-origin POST | `403` |

**The duplicate returning the same id is the persistence proof** — you cannot dedupe against a row that
is not in the database.

### What I could NOT prove, and why

`emailed:false` above is not a defect, it is a **configuration blocker**: `RESEND_API_KEY` exists only in
the Production environment, so a preview deployment physically cannot send. **Owner notification
delivery cannot be proven on preview until you add `RESEND_API_KEY` to Preview** — ideally with
`LEAD_TEST_SECRET` and `LEAD_TEST_NOTIFY_EMAIL` so test submissions go to a throwaway inbox instead of
your real one.

Same cause for `/admin/leads`: it renders "Could not verify your session" on preview because
`NEXTAUTH_SECRET` and `NEXTAUTH_URL` are Production-only, so `getServerSession` throws. Authorization is
proven by unit tests, not on the preview.

**Visitor confirmation email stays off. `build@aibuiltbyhand.com` is published nowhere.**

---

## 3. Preview QA — **48 / 48 pass on the deployed preview**

147/147 sitemap URLs 200 · 59/59 redirects one hop 308 → 200, no chains · six agent paths 404 · retry
worker 404 unauthenticated and on a wrong bearer · four demo routes still 200 and out of the sitemap ·
`/shop` shows $1,500 not $500 · portrait serves on `/` and `/about`.

### Lighthouse on the deployed preview

| Page / form factor | Perf | **A11y** | **Best practices** | SEO |
|---|---|---|---|---|
| home mobile | 97 | **100** | **100** | see note |
| home desktop | 96 | **100** | **100** | see note |
| about mobile | 98 | **100** | **100** | see note |
| about desktop | **100** \* | **100** | **100** | see note |
| /ai-receptionist mobile | 93 | **100** | **100** | see note |
| /create mobile | 96 | **100** | **100** | see note |

\* the first about-desktop run read 75 on a **cold start**; two re-runs gave 100 (LCP 0.5 s, 0.8 s).

**Best Practices is 100 on the real deployment**, up from 96 locally — the earlier 96 was
`/_vercel/insights/script.js` 404ing off-Vercel, exactly as suspected, now confirmed rather than assumed.

**SEO reads 58–61 on preview and that is not a defect.** Vercel sends `X-Robots-Tag: noindex` on every
preview deployment, so Lighthouse fails `is-crawlable`, and it fetches `robots.txt` without the bypass
header so `robots-txt` fails too. SEO is **100** on the byte-identical local production build.

### Attribution and analytics, verified in a real browser

A hit on `/ai-receptionist?utm_source=qa_test&utm_medium=preview&utm_campaign=handoff&gclid=QA123` stored:

```json
{"utm_source":"qa_test","utm_medium":"preview","utm_campaign":"handoff","gclid":"QA123",
 "landing_path":"/ai-receptionist","device":"desktop","first_seen":"2026-08-31"}
```

It **survived navigation to `/` without being overwritten** — first-touch works, and `landing_path` is
the real landing page rather than `/create`. Machine tags only, no PII. Five `[data-track]` elements on
the homepage.

### Responsive

Playwright passes at 320 / 375 / 390 / 768 / 1024 / 1280 / 1440 with zero horizontal overflow, on
desktop Chromium and mobile WebKit, against the identical build; Lighthouse mobile emulation on the
actual preview reports CLS 0. **No physical device was used** — I am not claiming a real-device check.

### The bypass secret

Created with your approval, used, and **deleted**. Verified dead: the same header now gets a 302 to
`vercel.com/sso-api`. Every local copy was shredded.

**One thing to know:** I clicked the reveal control before copying it, so the value rendered on screen
and was captured in a session screenshot. That is why deleting it was mandatory rather than optional. It
is gone, and nothing else was exposed — but it is worth knowing it happened.

---

## 4. Consolidation — sitemap **164 → 147**

Your brief said "14 merges … 164 to 146", quoting the S3 report's summary line. **That line contradicts
its own evidence table**, which contains 13 MERGE rows, 4 REMOVE rows and 3 KEEP rows. 164 − 13 − 4 =
**147**. The table is the evidence; the summary was off by one. I delivered 13 + 4.

- **7 off-ICP industry pages** — law firm, wedding planner, personal trainer, gym, agency → `/industries`;
  physiotherapy and chiropractor → the 912-word clinic page, a better target than the hub.
- **4 thin `/demo/*` pages** (111–141 words) leave the sitemap. **The routes are kept** and stay linked
  from `/demo`, which ranks at position 3.7.
- Plus 2 creator pages, 2 locations, 2 services.
- **3 existing redirects pointed at pages that just became redirect sources** and were repointed in the
  same commit, so no chain exists. Each merged page's keywords were folded into its destination.

**Not cut**, though they are the same off-ICP ~350-word class: accountant (position 4.0), consultant
(3.0) and immigration-consultant (6.0) are protected by the evidence gate.

Final breakdown: industries 25 · services 20 · top-level and money pages 20 · resources 18 · compare 18 ·
locations 16 · use-cases 9 · how-to 7 · tools 6 · creators 5 · homepage 1 · shop 1 · demo 1.

---

## 5. Pricing — resolved

Floors held: starter **$1,500**, business **$3,500**, custom **$10,000**. Nothing reverted to $1,000.

`ai-customer-reactivation` **$500 → $1,500**, and the test exemption was deleted rather than emptied. By
your own test it includes done-for-you work — we segment the list, write the email and SMS copy in their
voice, send, and report. Card, service-page prose, its FAQ and the JSON-LD Offer all moved together.

`tests/pricing-consistency.test.ts` is the repository-wide check: every figure the copy presents as *our*
price must exist in `packages.ts`, `carePlan` or the shop catalogue, with the allowed set derived rather
than hand-typed.

**It surfaced two things I initially reported as under-floor defects. Both were my framing error, and I
corrected the rules rather than leaving you false homework:**

1. A **managed** SKU recovers the build through the monthly, so its floor is setup + 12 months, not the
   setup fee alone. `ai-receptionist-os` is $5,688 and `ai-operations-dashboard` $3,888 against a $3,500
   floor — both clear it inside year one. `managed` is no longer exempt, it is checked on the right axis.
2. The six creator tools at $500–$900 are **components**, and that block already ends "Bundle any three
   into one wired system — that's the $1,500 Starter build". Three at $500 is exactly $1,500. The test
   now guards that reconciling sentence, which is the thing actually at risk.

---

## 6. Cold calling — still off

`AGENT_SUBSYSTEM_ENABLED` is set in **no** Vercel environment, and no `TWILIO_*` variable exists
anywhere. Six agent paths return 404 on the live preview. No action was taken and none is needed.

---

## 7. Portrait — your call

Both placements render correctly: 260×260 on `/`, 320×320 on `/about`, alt text "Pavneet Singh, founder
of Handbuilt AI", `/founder.jpg` serving 200 `image/jpeg`, 43,949 bytes.

**That is a technical check, not an aesthetic approval, and it is not mine to give.**

- Homepage: `https://ai-shop-anfksdj11-pavs-projects-2a8231d9.vercel.app/`
- About: `https://ai-shop-anfksdj11-pavs-projects-2a8231d9.vercel.app/about`

---

## 8. DNS — prepared, nothing applied

Measured against 8.8.8.8, not recalled: NS = `ns1/ns2.vercel-dns.com` (**Vercel runs the DNS**, not
Cloudflare), **MX none**, **apex SPF none**, **`resend._domainkey` none**. One correction to the notes:
**DMARC does exist** — `v=DMARC1; p=none;` — it is simply inert with no SPF, no DKIM and no `rua`.

`docs/launch/13-dns-email-plan.md` has the exact `vercel dns add` commands for sending (Resend, $0), for
receiving (Google Workspace ~$8.40/mo, ImprovMX free, or Zoho free), and the two-step DMARC path.
Nothing purchased, nothing changed.

---

## 9. Remaining blockers

1. **Production lead census** — needs the Neon connection string (§1).
2. **`RESEND_API_KEY` is Production-only** — owner-notification delivery cannot be proven on preview.
3. **`NEXTAUTH_SECRET` / `NEXTAUTH_URL` / `NEXT_PUBLIC_APP_URL` are Production-only** — `/admin/leads`
   authorization cannot be exercised on preview.
4. **`OWNER_EMAILS` is set nowhere.** Set it before or with the merge, or the lead inbox locks you out.
5. **`CRON_SECRET` is set nowhere.** Without it the hourly retry worker cannot authenticate and will
   never drain the queue. `/admin/leads` shows a banner saying so.
6. **`npm run build` runs `prisma migrate deploy`**, so merging executes migration
   `20260830150000_add_lead_notification_status` against production. It is additive, backfilled from
   `emailed`, and reversible — but it is a production schema change and needs your explicit go.
7. **Portrait sign-off** (§7).
8. **No MX on the domain** (§8).

---

## 10. Gate at `34fc510`

`tsc` 0 · `vitest` **278/278** · `npx next build` 201 pages · Playwright **89/89** · `smoke.mjs`
**158/158** · preview QA **48/48** · 147/147 sitemap URLs 200 · 59/59 redirects one hop to a 200.

**Requesting approval to merge to `main` and deploy to production.** Rollback target for the current
production is `3031d36`; `docs/ROLLBACK.md` has the procedure.
