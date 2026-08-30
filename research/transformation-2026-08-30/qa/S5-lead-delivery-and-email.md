# S5 — Lead delivery architecture, email & DNS

**Repo:** `C:\Users\gillp\Documents\Claude\Projects\AI Shop`
**Branch:** `feat/site-transformation-2026-08-30` @ `8a2bd89` (origin/main merged in; security hotfix `482b5e8` is in prod)
**Date:** 2026-08-30
**Scope:** written plan only. **No DNS record, mailbox, provider signup, purchase, Resend API call or email send was made.** Every DNS claim below is quoted from a command actually run against `8.8.8.8` on 2026-08-30.

---

## THE ONE-PARAGRAPH ANSWER (read this if you read nothing else)

**Today, a lead lands in the Neon Postgres `BuildRequest` table and nowhere else you will ever look, and you are probably not being notified.** The route writes the row *before* it tries to email (`app/api/build-request/route.ts:182`), so the lead is durably safe. Then it tries to notify you via Resend (`:200`). That send goes **to** `LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com"` (`:411`) **from** `LEAD_FROM_EMAIL || "Handbuilt Leads <onboarding@resend.dev>"` (`:415`). `onboarding@resend.dev` is Resend's shared sandbox sender, and Resend only reliably delivers from it **to the email address on the Resend account itself** — so whether that mail reaches your Gmail depends entirely on whether `pavneets956@gmail.com` is the Resend account address, and that is not guaranteed. If the send fails, `sendNotification` returns `{ok:false}` and the request **still returns 200**, because `accepted = persist.ok || notify.ok` (`:216`) — the visitor correctly sees "Request received", and **you get silence**. There is **no admin UI, no dashboard, no cron digest and no alert** anywhere in this repo that reads `BuildRequest` back out (verified: zero references to `prisma.buildRequest` outside the route itself). And the structured log at `:166` deliberately carries **coarse metadata only** — no name, no email, no phone, no goal text — so **the Vercel log is no longer a recovery channel for lead content**. Net: the lead is safe in the database, but the only signal that a lead exists is an email that may not be arriving, and the only way to read one back is to query Postgres by hand. **After Resend domain verification plus `LEAD_FROM_EMAIL` pointed at your own verified domain, the notification becomes reliable and the gap closes.** That is the single highest-value fix in this document.

> ⚠️ **`resend-email-setup.md` at the repo root is STALE and contradicts the code in two places.** It says the notifier "currently sends from `leads@coitracker.co`" — it does not; the default is `onboarding@resend.dev` (`:415`). And it claims "every lead is also `console.log`'d … so nothing is ever lost even if email hiccups." That was true once; it is **false now**. The log was deliberately reduced to coarse metadata to keep PII out of the log drain (comment at `:27-30`). Do not rely on that document's safety claim. Supersede it with this file.

---

## 1. Current architecture, precisely

### 1.1 `POST /api/build-request` — the only lead endpoint

Node runtime (`:8`). Order of operations:

| # | Step | Line | Behaviour |
|---|---|---|---|
| 0a | Cross-origin rejection | `:86` | `Origin`/`Referer` host ≠ `Host` → **403**. A *missing* origin is deliberately allowed (comment `:79-85`: dropping a real lead is worse than accepting an unattributed one). |
| 0b | Per-IP rate limit | `:92` | `checkLeadPerMinute` then `checkLeadPerDay` (`lib/rateLimit.ts`). Defaults 5/min, 20/day (`LEAD_MAX_PER_IP_MIN`, `LEAD_MAX_PER_IP_DAY`). Breach → **429** + `Retry-After` (`:103`). Applied *before* parsing, so a malformed flood is cheap. |
| 0c | Body cap | `:43`, `:78-85` | `content-length` check, then real `Buffer.byteLength`. > 32 KB → **413**. Unparseable JSON → **400**. |
| 0d | Honeypot | `:54`, `:128` | Field `company_website`. Non-empty → warn-log and return **200** `{ok:true, delivery:{persisted:false, emailed:false}}` — persists nothing, sends nothing. Logged loudly (`:129`) so a false positive is never silent. |
| — | Schema | `:136` | Zod `.passthrough()` requiring **email OR phone**. Failure → **400**, one human sentence, no zod internals echoed. |
| — | Sanitize | `:146` | `sanitizePayload`: max 80 keys, 4000 chars per string, one nesting level, honeypot dropped, oversize strings truncated with a visible `… [truncated]` marker. |
| — | Phone-only sentinel | `:151`, `:547` | `BuildRequest.email` is `NOT NULL`, so a phone-only lead gets a deterministic `no-email+<hash>@lead.invalid` (RFC 2606 reserved TLD, `:63`). Nothing is ever addressed to it — `replyTo` is omitted entirely (`:428`). |
| 0e | Test mode | `:156`, `:494` | Header `x-lead-test: <LEAD_TEST_SECRET>`, **constant-time compared** (`timingSafeEqual`). A wrong/absent secret is treated as an ordinary lead — never an error, never a hint the mechanism exists. |
| — | Structured log | `:166` | `[AI-SHOP LEAD] received` — **coarse metadata ONLY**: source, kind, test flag, `contact: "email"\|"phone"`, `hasPhone`, `goalChars` (a *length*, not the text), field count, salted `ipHash`. **No PII. Not a durable store.** |
| **1** | **Persist FIRST** | **`:182`** | `persistLead()` → `BuildRequest` row. **This is the durability guarantee.** |
| — | Dedupe short-circuit | `:183` | If deduped: return 200 with `deduped:true`, `delivery:{persisted:true, emailed:false}` — **and return before emailing**, so a duplicate never double-notifies. |
| **2** | **Notify (best effort)** | **`:200`** | `sendNotification()` — never throws, returns a typed result. |
| — | Missing-key alarm | `:203` | In production, `RESEND_API_KEY` absent → `console.error` "lead persisted to DB but NO notification email was sent." |
| — | Delivery flag | `:210` | Non-blocking `update({emailed:true})`, `.catch()` swallowed — "the delivery flag is cosmetic; the lead is already safe". |
| **3** | **Accept** | **`:216`** | `accepted = persist.ok \|\| notify.ok`. **Either channel succeeding = 200.** |
| — | Dev mock | `:242` | `NODE_ENV !== "production"` only — i.e. true local `next dev`. Vercel preview **and** prod are both `production` (`:177-179`). Returns `ok:true, devMock:true` but **never claims delivery**. |
| — | **502** | **`:249`, `:259`** | Both channels failed in prod/preview → `console.error("CRITICAL: lead not accepted")` + **502** with a human sentence, so the UI shows retry/fallback instead of a false success. |

**Response shape** (`:224-230`): `{ ok, id, contact, test?, delivery: { persisted, emailed } }`. `delivery.emailed` reports the **OWNER notification** — it is explicitly *not* a visitor confirmation (header comment `:21-25`).

**Failure-combination matrix:**

| DB | Email | HTTP | Body | Owner learns? | Lead safe? |
|---|---|---|---|---|---|
| ✅ | ✅ | 200 | `delivery:{persisted:true, emailed:true}` | ✅ inbox | ✅ |
| ✅ | ❌ | **200** | `delivery:{persisted:true, emailed:false}` | ❌ **only a `console.error` in Vercel logs** | ✅ DB only |
| ❌ | ✅ | 200 | `delivery:{persisted:false, emailed:true}` | ✅ inbox | ✅ email only |
| ❌ | ❌ | **502** | human retry sentence | ✅ `CRITICAL` log line | ❌ **lost — visitor is told to retry** |
| dedupe | n/a | 200 | `deduped:true` | ❌ (first submit already notified) | ✅ |
| honeypot | n/a | 200 | `persisted:false, emailed:false` | warn log only | n/a (bot) |

**Row 2 is today's normal case, and it is the whole problem.**

### 1.2 Persistence and the dedupe fingerprint

`persistLead` (`:286`) — **never throws**; a DB failure returns `{ok:false}` so email can still accept the lead.

- **`fingerprint`** (`:354`) = `sha256(email | goal||want | tasks | name | source||type)`, each value trimmed, whitespace-collapsed, lower-cased. **Content-based, not just email** — two genuinely different enquiries from the same address are never merged.
- **`dedupeKey`** = `fingerprint:<floor(Date.now()/600000)>` (`:294`) — fingerprint + 10-minute bucket, with a **UNIQUE index** (`prisma/schema.prisma:219`).
- Fast path: `findFirst(fingerprint, createdAt >= now-10min)` avoids a doomed insert on the common rapid-resubmit.
- Race path: a concurrent identical insert loses on P2002 and is **resolved to the winner's row** (`:329-340`) — at most one row and one email.

`model BuildRequest` (`prisma/schema.prisma:205-229`) stores: `id` (cuid), `name?`, `email` (**NOT NULL**), `phone?`, `source?`, `kind?`, `goal? @db.Text`, `fingerprint?`, `dedupeKey? @unique`, **`payload Json` — the full raw submission, nothing dropped**, `status` default `"new"`, `emailed Boolean` default `false`, `createdAt`. Indexed on `email`, `createdAt`, `status`, `fingerprint`.

A **test** submission is marked in *both* `source` (`test:<source>`, `:315`) and `status` (`"test"`, `:321`) — trivially purgeable via `WHERE status = 'test'`.

### 1.3 The notification email

`sendNotification` (`:395`):
1. `isTest && !LEAD_TEST_NOTIFY_EMAIL` → `{ok:false, reason:"test_skipped"}` (`:403`) — **test leads never touch the real inbox**.
2. No `RESEND_API_KEY` → `{ok:false, reason:"no_key"}` (`:405-406`).
3. `to` = `LEAD_TEST_NOTIFY_EMAIL || LEAD_NOTIFY_EMAIL || "pavneets956@gmail.com"` (`:411`).
4. `from` = `LEAD_FROM_EMAIL || "Handbuilt Leads <onboarding@resend.dev>"` (`:415`).
5. `replyTo` = the visitor's real address, **omitted entirely on a phone-only lead** (`:428`).
6. **Resend v4 does not throw on a non-2xx** — it returns `{error}`. The code inspects it (`:436`) rather than assuming success. This is correct and load-bearing; do not "simplify" it into a try/catch.

### 1.4 What is deliberately NOT logged

- **The lead body.** The header comment (`:27-30`) records that this endpoint *used to* `JSON.stringify` the entire lead — email, phone, the full `/start` transcript — into Vercel logs on every request. That was removed.
- **Raw IPs** — only a salted, truncated `hashIp` (`:482-487`, salt `LEAD_IP_SALT`).
- **Raw errors** — `errorShape()` (`:554`) emits `{name, code, message}` only, because a raw Prisma error can echo submitted values into the log drain.

**Consequence for recovery: the Vercel log tells you a lead *happened*; it cannot tell you *who* it was.** Only the DB can. This is the right privacy call, but it means the DB is now a single point of recovery.

### 1.5 `POST /api/consultation`

**Disabled, and it never touches lead storage at all.**
- Returns **404** unless `CONSULTATION_API_ENABLED === "true"` (`app/api/consultation/route.ts:154-156`).
- Cross-origin → 403 (`:157`).
- In-memory per-IP limit, 24 req/min (`:55-69`) — per-instance only, so it is a floor, not a ceiling.
- It is a **conversation** endpoint (returns `{reply, chips, briefPatch, done}`), **not** a lead endpoint: **no DB write, no email**. Degrades to `{fallback:true}` (`:194`, `:252`) with no key or on error.
- Its own header (`:9-20`) records it has **no caller** — `/start` (`components/ConsultationCall.tsx`) is fully scripted and calls only `/api/tts` and `/api/build-request`.

**Nothing in the email/DNS work depends on this endpoint. Leave it off.**

### 1.6 The three front-end callers

| Caller | Line | Truthfulness |
|---|---|---|
| `components/BuildRequestForm.tsx` | `:210` | ✅ **Exemplary.** Branches on 429 / 413 / 400+403 / `!res.ok \|\| data.ok !== true` / network, each with its own human message and retained input. Success screen says **"There's no automatic confirmation email — this screen is your receipt."** (`:373`). |
| `components/ConsultationCall.tsx` | `:424` | ✅ Truthful. `leadStatus` (`:177`) drives four rendered states — `sending` / `sent` / `no-email` / `failed` (`:813-834`). Failure releases the guard so the user can retry (`:445`). Comments at `:173-176` and `:534-539` explicitly forbid restoring "your plan has been sent" until a visitor email exists **and** the domain has MX. |
| `components/SolutionFinder.tsx` | `:61` | ❌ **DEFECT — silent state.** `await fetch(...)` with **no status check**, a `catch` that swallows everything (`:66-68`), then `setSaved(true)` unconditionally (`:69`). A 429, 502 or network failure still renders success. **This is the one remaining place the site can lie about a lead.** Fix in the same pass — mirror `BuildRequestForm`'s branching. |

---

## 2. DNS — the actual current truth

All commands run 2026-08-30 via `Resolve-DnsName -Server 8.8.8.8`. Output quoted verbatim (trimmed to material fields).

### 2.1 Nameservers — the finding that reshapes everything

```
===== aibuiltbyhand.com NS =====
NameHost     : ns1.vercel-dns.com
NameHost     : ns2.vercel-dns.com
Name         : aibuiltbyhand.com
Type         : NS
TTL          : 21600
```

```
===== aibuiltbyhand.com SOA =====
PrimaryServer          : ns1.vercel-dns.com
Administrator          : hostmaster.nsone.net
SerialNumber           : 1781473045
Name                   : aibuiltbyhand.com
Type                   : SOA
TTL                    : 3600
```

**`aibuiltbyhand.com` DNS is hosted at Vercel** (Vercel DNS runs on NS1 — hence the `nsone.net` admin contact). Records are managed in **Vercel → Domains → aibuiltbyhand.com → DNS Records**, *not* at a registrar panel and *not* at Cloudflare.

> **Direct consequence: Cloudflare Email Routing is NOT a drop-in option.** Email Routing requires the zone to sit on Cloudflare's authoritative nameservers. Adopting it means moving **all** DNS for the domain — including the live site's `A` records — from Vercel to Cloudflare. That is a change to the entire zone, not "add a free mailbox". Costed and risk-assessed as **Option B** in §3.

### 2.2 Apex

```
===== aibuiltbyhand.com A =====
Address      : 216.150.16.129   TTL : 1800
Address      : 216.150.1.193    TTL : 1800
```
(Vercel anycast. The live site.)

```
===== aibuiltbyhand.com MX =====
QueryType              : SOA          <-- authority section, NO ANSWER
PrimaryServer          : ns1.vercel-dns.com
```
**→ NO MX RECORD.** Nothing can receive mail at `@aibuiltbyhand.com`. Mail to `build@aibuiltbyhand.com` bounces.

```
===== aibuiltbyhand.com TXT =====
QueryType              : SOA          <-- authority section, NO ANSWER
```
**→ NO TXT AT APEX ⇒ NO SPF RECORD AT ALL.**

```
===== aibuiltbyhand.com CNAME =====
QueryType              : SOA          <-- correct; an apex cannot be a CNAME
```

### 2.3 Mail-authentication records

```
===== _dmarc.aibuiltbyhand.com TXT =====
Name    : _dmarc.aibuiltbyhand.com
Type    : TXT
TTL     : 60
Strings : {v=DMARC1; p=none;}
Section : Answer
```
**→ DMARC EXISTS, `p=none`.** TTL **60** against the zone's 600/1800 elsewhere — hand-added, and it is the *only* mail record present. There is no `rua=` reporting address, so it produces **no visibility whatsoever** today. `p=none` is the correct starting posture: with no SPF and no DKIM, every message claiming your domain fails DMARC alignment, and `p=none` is the only reason that is not already causing rejections.

```
===== resend._domainkey.aibuiltbyhand.com TXT =====   -> SOA (no answer)
===== resend._domainkey.aibuiltbyhand.com CNAME ===== -> SOA (no answer)
```
**→ NO RESEND DKIM. The domain is NOT verified in Resend.**

```
===== send.aibuiltbyhand.com MX =====   -> SOA (no answer)
===== send.aibuiltbyhand.com TXT =====  -> SOA (no answer)
```
**→ Resend's sending subdomain does not exist.**

```
===== www.aibuiltbyhand.com CNAME =====      -> SOA (no answer)
===== mail.aibuiltbyhand.com A =====         -> SOA (no answer)
===== _domainkey.aibuiltbyhand.com TXT =====  -> SOA (no answer)
```

### 2.4 Summary

| Record | Required for | Present? | Value |
|---|---|---|---|
| `MX` @ apex | **Receiving** mail | ❌ NO | — |
| `TXT` SPF @ apex | Sending auth | ❌ NO | — |
| `TXT` `resend._domainkey` | Resend DKIM | ❌ NO | — |
| `MX` `send.` | Resend bounce feedback | ❌ NO | — |
| `TXT` SPF `send.` | Resend SPF | ❌ NO | — |
| `TXT` `_dmarc` | DMARC policy | ✅ **YES** | `v=DMARC1; p=none;` (TTL 60) |
| `A` @ apex | The website | ✅ YES | `216.150.16.129`, `216.150.1.193` |
| `NS` | DNS host | ✅ **Vercel** | `ns1/ns2.vercel-dns.com` |

**Everything except DMARC and the site itself must be built from zero.**

---

## 3. The runbook — three honest options

### 3.0 Two things to settle before touching DNS

**(a) Sending and receiving are separate problems.** Resend gives you **sending** only — it will never let you *receive* mail at `build@aibuiltbyhand.com`. A mailbox provider gives you **receiving**. You need both only if you want a real `@aibuiltbyhand.com` inbox. **You can fix the notification problem with Resend alone and zero mailbox spend** — see Option A0.

**(b) The SPF merge rule — the single most common way to break this.**
> **A domain may have exactly ONE SPF TXT record.** Two `v=spf1` TXT records at the same name is a **PermError** under RFC 7208 §4.6.4, and a PermError makes SPF fail for *every* sender — including the one that was working before. You must **merge all senders into one string**, e.g. `v=spf1 include:_spf.google.com include:amazonses.com ~all`. Never add a second `v=spf1` line "for Resend".

Note the mechanism limit too: SPF allows **max 10 DNS-lookup mechanisms**; each `include:` costs at least one. Two includes is fine — just don't keep stacking them.

**(c) Which name the SPF goes on.** Resend's own records live on the **`send.` subdomain**, so Resend's SPF is `v=spf1 include:amazonses.com ~all` on `send.aibuiltbyhand.com` — **that is a different name from the apex** and therefore **not** a conflict with a Google Workspace SPF on the apex. The merge rule bites only when two records share a name. Confirm the exact host Resend shows you in its dashboard before you assume.

---

### Option A0 — **Resend-only. No mailbox. RECOMMENDED FIRST MOVE.**

**Fixes:** owner notification reliability, sender reputation, DKIM, SPF, and unblocks the visitor confirmation email.
**Does not fix:** you still cannot *receive* at `@aibuiltbyhand.com`. Your published contact address stays `pavneets956@gmail.com`.
**Cost: $0.** Resend's free tier covers this volume comfortably; you already have an account. No mailbox provider, no nameserver move.
**Risk to the live site: essentially zero** — every record is on a *new* name (`send.`, `resend._domainkey`, `_dmarc`). **Nothing touches the apex `A` records.**
**Time: ~20 min of clicking + up to 1–24 h propagation (Vercel TTLs are short, usually minutes).**

**Why this first:** it is the entire fix for "I'm not being told about leads", it is free, and it is the *prerequisite* for both other options anyway. Do it before you decide anything about a mailbox.

**Steps, in order:**

1. **Resend → Domains → Add Domain → `aibuiltbyhand.com`.** Choose the region closest to you (`us-east-1` is fine). Resend generates a **unique DKIM key — you must copy the values from that screen; nobody can generate them for you.**
2. Resend shows you 3 records. In **Vercel → Domains → aibuiltbyhand.com → DNS Records**, add them **exactly as shown**:

   | # | Type | Name | Value | Priority | TTL |
   |---|---|---|---|---|---|
   | 1 | `MX` | `send` | `feedback-smtp.<region>.amazonses.com` *(copy exact from Resend)* | `10` | 60 |
   | 2 | `TXT` | `send` | `v=spf1 include:amazonses.com ~all` | — | 60 |
   | 3 | `TXT` | `resend._domainkey` | `p=MIGfMA0GCSq...` *(the long key from Resend — copy verbatim, no line breaks)* | — | 60 |

   **Order does not matter among these three** — they are independent names, and Resend checks all three at once. Use **TTL 60** while setting up so a typo is cheap to correct; raise to 3600 once verified.
3. **Verify each record from your own machine before clicking Verify** (avoids a failed check you then misdiagnose):
   ```powershell
   Resolve-DnsName -Name send.aibuiltbyhand.com -Type MX  -Server 8.8.8.8
   Resolve-DnsName -Name send.aibuiltbyhand.com -Type TXT -Server 8.8.8.8
   Resolve-DnsName -Name resend._domainkey.aibuiltbyhand.com -Type TXT -Server 8.8.8.8
   ```
   Each must return `Section : Answer`. **`Section : Authority` + `QueryType : SOA` means the record is not there yet** — that is exactly what every lookup in §2 returned.
4. **Resend → Domains → Verify.** Wait for status **Verified** (green).
5. **Rotate the API key.** The current `RESEND_API_KEY` is scoped to `coitracker.co` and, per `resend-email-setup.md`, leaked into a transcript. Delete it; create a new **account-wide** key (one key can send from any verified domain in the account, covering both brands). **Do not paste it into chat or any file** — enter it directly in the Vercel dashboard.
6. Set the env vars in §4, **redeploy**, then run the §7 test.

**DKIM gotcha:** Vercel's DNS UI can wrap or trim a long TXT value. After adding record 3, re-query it and confirm the returned string matches the Resend dashboard **character for character**. A truncated DKIM key verifies as "not found" and produces a very confusing debugging session.

---

### Option A — **Mailbox at Vercel DNS (forwarding). Cheapest real inbox.**

Adds `build@aibuiltbyhand.com` as a **forwarding address** into your Gmail, keeping DNS at Vercel. Providers that work this way need only an `MX` + a `TXT`, both added at Vercel — **no nameserver move**.

**What actually changes:** you add MX records at the **apex** (which currently has none, so nothing is displaced) and one apex SPF TXT.
**Cost:** free tier exists on the common forwarders; a paid tier is typically a few dollars a month for send-as. **Verify the current price on the provider's own pricing page before signing up — I did not verify pricing live, and nothing is to be purchased without your approval.**
**Risk to the live site: LOW.** Apex `MX` and apex `TXT` are *different record types* from the apex `A` records — adding them does not disturb the website. **The only real hazard is fat-fingering the apex `A` records while you are in that screen. Don't touch them.**
**Time: ~20 min + propagation.**

**Honest limitation, same as Cloudflare's:** plain forwarding is **receive-only**. You can read mail sent to `build@aibuiltbyhand.com`, but you cannot *reply as* that address without an additional SMTP send-as configuration (which most forwarders charge for). Until that exists, replying from Gmail reveals `pavneets956@gmail.com` — which is fine, because that is already your published address.

**Steps, in order (order matters here):**

1. **Add the apex SPF FIRST**, before any MX. Adding MX without SPF creates a window where your domain can receive mail but has no sending policy — harmless, but doing SPF first means you only wait for propagation once.
   - Type `TXT`, Name `@`, Value `v=spf1 include:<provider-spf-host> ~all`, TTL 60.
   - **If you later add Google Workspace or any second sender, MERGE into this one record. Never create a second `v=spf1`.**
2. **Add the provider's MX records at the apex**, all of them, with the exact priorities the provider lists. Missing a lower-priority backup MX causes intermittent, hard-to-diagnose delivery gaps.
3. **Verify:** `Resolve-DnsName -Name aibuiltbyhand.com -Type MX -Server 8.8.8.8` must now return `Section : Answer` rows instead of the SOA in §2.2.
4. **Create the alias** `build@aibuiltbyhand.com → pavneets956@gmail.com` in the provider's dashboard.
5. **Send yourself one test** from an outside address and confirm arrival **and** that it is not in spam.
6. **Only then** may `build@aibuiltbyhand.com` appear anywhere on the site. Until step 5 passes, it is a dead address and publishing it loses leads.
7. Do **Option A0** as well (Resend still handles *sending*; the forwarder only handles *receiving*).

---

### Option B — **Move DNS to Cloudflare, use Email Routing. Free, but it moves the whole zone.**

**What actually has to change:** **the nameservers for the entire domain.** You would recreate every existing record in Cloudflare — at minimum the apex `A` records `216.150.16.129` and `216.150.1.193` and the `_dmarc` TXT — then change the NS at your registrar from `ns1/ns2.vercel-dns.com` to Cloudflare's pair.
**Cost: $0** for both Cloudflare DNS and Email Routing.
**Risk to the live site: MEDIUM — the highest of the three.** This is the only option that can take the website down. Failure modes: a missed record; the apex `A` values mistyped; Cloudflare's orange-cloud proxy left **on** for the apex (which puts Cloudflare in front of Vercel — usually undesirable and occasionally breaks TLS or Vercel's own domain verification); and an NS change that propagates over up to 48 h during which the two zones must agree.
**Time: 45–90 min + up to 48 h NS propagation.**

**Same honest limitation as Option A:** Cloudflare Email Routing is **forward-only**. It **cannot send, and cannot "send as"** — Cloudflare documents this explicitly. You would still need Resend (Option A0) for outbound and would still reply from Gmail.

**Verdict: not worth it here.** You gain a free forwarder you can get without moving DNS, and you take on the only real risk of breaking a live site. **Choose Option B only if you separately want Cloudflare's DNS/WAF for other reasons.**

If you do it anyway, the non-negotiable order is:
1. Create the Cloudflare zone; let it import records; **diff the imported set against Vercel's list by hand** — the importer misses records.
2. Confirm the apex `A` records are present, correct, and **DNS-only (grey cloud)**.
3. **Lower TTLs at Vercel to 60 and wait for the old TTL to expire *before* switching NS.** Skipping this is what causes multi-hour outages.
4. Only then change NS at the registrar.
5. Wait until `Resolve-DnsName -Type NS` returns Cloudflare's nameservers, and the site still loads.
6. **Only after that**, enable Email Routing and add its MX + SPF.
7. Re-add Resend's records (they do not survive the move automatically).

---

### Option C — **Google Workspace, records at Vercel DNS. A real mailbox.**

**What actually changes:** 5 apex MX records + an apex SPF TXT + a Google DKIM TXT, all added at **Vercel** — **no nameserver move**.
**Cost:** paid, **per user per month** (Business Starter tier). **I did not verify the current Canadian price and will not quote a number I cannot cite — check `workspace.google.com/pricing` before you buy. Nothing is to be purchased without your explicit approval.**
**Risk to the live site: LOW** — same as Option A; new record types on the apex, `A` records untouched.
**Time: ~45 min + propagation + Google's verification step.**

**What you get that A and B cannot:** a genuine mailbox with **send-as**, so `build@aibuiltbyhand.com` can both receive *and* be the address you reply from. For a studio selling to businesses, replying from a branded domain instead of a Gmail address is a real credibility gain — that is the actual reason to pick this, not the storage.

**Steps, in order:**
1. Sign up, choose `aibuiltbyhand.com`, complete Google's **domain-ownership verification** (a `TXT` at the apex — add it at Vercel; it does not conflict with SPF because it is not a `v=spf1` string).
2. Create the user `build@aibuiltbyhand.com` (or `pav@`) **before** adding MX — mail arriving at a domain with no mailbox bounces.
3. **Add the SPF TXT at the apex, merged:** `v=spf1 include:_spf.google.com ~all`. If Option A0 is already done, Resend's SPF lives on `send.` and does **not** need merging here — but if you ever put a sender on the apex, merge then.
4. **Add all 5 Google MX records at the apex** with their exact priorities. Add every one; the backups matter.
5. Turn on **DKIM** in the Google Admin console (Apps → Google Workspace → Gmail → Authenticate email), generate the key, and add the `TXT` at `google._domainkey` at Vercel. **DKIM is off by default in Workspace — this step is skipped constantly.**
6. Verify with `Resolve-DnsName` for MX, apex TXT, and `google._domainkey`, all returning `Section : Answer`.
7. Send an inbound test **and** an outbound test; confirm both.
8. Do **Option A0** as well — Workspace sends your *personal* mail; Resend sends your *application's* mail. Keep them separate.

---

### 3.4 DMARC progression

You already have `v=DMARC1; p=none;`. **Do not tighten it yet** — with no SPF and no DKIM, moving to `quarantine` today would quarantine your own mail.

| Stage | Record (TXT at `_dmarc`) | Move only when |
|---|---|---|
| **Now** | `v=DMARC1; p=none;` | — |
| **Step 1 — add reporting** | `v=DMARC1; p=none; rua=mailto:pavneets956@gmail.com; fo=1;` | Do this **immediately**, in the same sitting as Option A0. It costs nothing and is the only way you will ever *see* whether SPF/DKIM pass. Right now you are flying blind. |
| **Step 2 — quarantine** | `v=DMARC1; p=quarantine; pct=25; rua=mailto:...;` | **Only after** ≥ 2 weeks of `rua` reports show **100 % of your legitimate mail passing SPF *or* DKIM with alignment**. Start at `pct=25` so a mistake affects a quarter of mail, not all of it. Then 50 → 100. |
| **Step 3 — reject** | `v=DMARC1; p=reject; rua=mailto:...;` | **Only after** ≥ 2 weeks at `p=quarantine; pct=100` with zero legitimate failures. |

**Before each move, check:** every sending source is enumerated (Resend, and Workspace if adopted); the `rua` reports show no unexplained passing-source gaps; and you have not added a new sender (a form tool, a newsletter, a CRM) since the last check. **Adding a sender resets the clock.**

---

## 4. Vercel Production env vars

Set in **Vercel → Project → Settings → Environment Variables**, scope **Production**. Names and intended values only — **no secret values appear in this document.**

| Variable | Intended value | Required? | Notes |
|---|---|---|---|
| `LEAD_FROM_EMAIL` | `Handbuilt Leads <leads@aibuiltbyhand.com>` | **Yes, after A0** | The one flag that flips off the sandbox sender. Overrides the default at `:415`. **The mailbox need not exist** — this is a *sending identity* on a Resend-verified domain. Set it **only after** Resend shows Verified; setting it earlier makes every send fail. |
| `LEAD_NOTIFY_EMAIL` | `pavneets956@gmail.com` | Optional | Already the hard-coded default (`:411`). Set it explicitly anyway so the destination is visible in the dashboard rather than buried in code. |
| `RESEND_API_KEY` | *(the new account-wide key)* | **Yes** | Rotate per §3 Option A0 step 5. Enter directly in the Vercel UI. |
| `LEAD_TEST_SECRET` | *(a long random string)* | **Yes, for §7** | Enables the `x-lead-test` header path (`:494`). Without it, `isTestRequest` always returns false and **your test lead becomes a real lead**. |
| `LEAD_TEST_NOTIFY_EMAIL` | `pavneets956@gmail.com` *(temporarily)* | For §7 only | Without it, test sends are **skipped entirely** (`:403`, `reason:"test_skipped"`) — so you would prove persistence but learn nothing about email. **Unset it after testing** so future test traffic stays silent. |
| `LEAD_IP_SALT` | *(a random string)* | Recommended | Falls back to the literal `"handbuilt-lead"` (`:484`), which makes the IP hash guessable. |
| `LEAD_MAX_PER_IP_MIN` / `_DAY` | leave unset | No | Defaults 5/min, 20/day are sane. |
| `CONSULTATION_API_ENABLED` | **leave unset** | No | Must stay off. Setting it to `"true"` opens an unauthenticated endpoint that spends OpenAI credits. |

**A redeploy is mandatory. Vercel env vars apply only to *new* deployments** — changing a variable does not affect the running one. After setting them: **Vercel → Deployments → latest Production → Redeploy** (or push a commit). Then run §7 against production.

---

## 5. Visitor confirmation email — designed, and gated

### 5.1 The gate (non-negotiable)

**This must NOT ship before Resend reports `aibuiltbyhand.com` Verified AND a live send from the verified domain has been observed arriving.**

The reason is the asymmetry: today the site tells the visitor *"There's no automatic confirmation email — this screen is your receipt"* (`BuildRequestForm.tsx:373`), which is **true and costs nothing**. If you ship a confirmation before verification, the send fails (unverified domain → Resend rejects), and the visitor is told to check an inbox that will stay empty. **A promised email that never arrives is worse than no promise** — it converts a satisfied lead into someone who believes you are broken or ignoring them, and it does so silently. `ConsultationCall.tsx:534-539` already carries this rule as a code comment; honour it.

### 5.2 The rule that must govern the implementation

> **The UI may only claim what the API confirmed.** The route already returns `delivery: { persisted, emailed }` (`:229`). A visitor confirmation must add a **separate** field — e.g. `delivery.confirmationSent` — and the success screen must render "We've emailed a copy to <address>" **only when that field is literally `true`**. It must never infer delivery from `ok:true`, from `persisted`, or from `emailed` (which reports the **owner** notification, not the visitor's). When the confirmation fails but the lead persisted, the correct screen is today's copy — "Request received… this screen is your receipt" — **not** an error, because the lead *is* safe.

### 5.3 Trigger

Fire **only** when all four hold: (a) the lead persisted or the owner notification succeeded (`accepted === true`, `:216`); (b) the submission carries a **real** email — `realEmail` is set, i.e. **not** the `@lead.invalid` sentinel (`:151`, `:547`); (c) `isTest === false`, or a test inbox is configured; (d) `persist.deduped === false` — **a repeat submit inside the 10-minute window must not re-send**, matching the existing owner-notification behaviour at `:183`. Send it **after** persistence and **in parallel with or after** the owner notification — never before the DB write, and never in a way that can throw and take down the 200.

### 5.4 Copy

**Subject:** `We've got your request — Handbuilt AI`

**From:** `Pavneet at Handbuilt <leads@aibuiltbyhand.com>` · **Reply-To:** `pavneets956@gmail.com`

```
Hi {{name|there}},

Thanks for sending this over — it's landed with me, not a queue.

Here's what you asked for:
  {{goal}}

I read every one of these myself. You'll hear back from me within one
business day with a plan and a straight answer on price.

If it's urgent, just reply to this email — it comes straight to me.

— Pavneet
Handbuilt AI · Surrey, BC
aibuiltbyhand.com
```

**Rules this copy obeys:** no invented timeline beyond the one the site already commits to ("within one business day", matching `BuildRequestForm.tsx:368`); no fabricated client counts or results; no "your plan is attached" (nothing is attached); a working reply path; and it reinforces the one true differentiator — a person reads it. Keep the plain-text part in sync with any HTML version; text-only is acceptable and lands better.

**Do not add** an unsubscribe link — this is a **transactional** message responding to a user-initiated request, not marketing. Adding marketing furniture to a transactional mail muddies its classification. Equally: **do not** later reuse this trigger to send anything promotional, or it stops being transactional and CASL consent rules apply.

---

## 6. Retry / failure handling and persistence

### 6.1 What already protects a lead (do not regress these)

1. **DB write before email** (`:182` before `:200`) — a Resend outage, missing key, expired key or rate limit can never lose a lead.
2. **`payload Json` stores the full raw submission** (`schema.prisma:220`) — nothing is dropped, so a lead is fully reconstructable from the row.
3. **Atomic dedupe** via the `dedupeKey` unique index (`:294`, `schema.prisma:219`) — safe under concurrent submits.
4. **Truthful 502** when both channels fail (`:259`) — the visitor is asked to retry instead of being falsely reassured.
5. **Resend's `{error}` return is inspected** (`:436`), not assumed.
6. **`emailed` flag** (`schema.prisma:222`) — a durable marker of which leads were successfully notified.

### 6.2 What is still missing

| Gap | Severity | Fix | Migration? |
|---|---|---|---|
| **No way to read leads back.** Zero `prisma.buildRequest` reads outside the route; no admin page (verified by search). | **HIGH** | Minimal auth-gated `/admin/leads` page, or a saved query in the Neon console. | **No** |
| **DB-fail + email-OK is invisible.** Row 3 of the matrix: the lead exists **only** in an email. If that mail is deleted, the lead is gone — and the coarse log (`:166`) cannot reconstruct it. | **HIGH** | The notification email already contains the full lead body. **Treat the notification inbox as a durable store: never delete lead emails, and add a Gmail filter + label so they cannot be lost in the noise.** | **No** |
| **Email failure never reaches a human.** `notify.ok === false` produces only a `console.error` (`:203`) in a log nobody watches. | **HIGH** | See §6.3 — the retry proposal covers it. | Optional |
| **No retry.** A transient Resend 429/5xx is a permanent notification loss for that lead. | **MEDIUM** | See §6.3. | Optional |
| **`SolutionFinder.tsx:61` reports success unconditionally.** | **MEDIUM** | Check `res.ok` and `data.ok`; mirror `BuildRequestForm`. | **No** |
| **DMARC has no `rua`.** No visibility into auth failures. | **MEDIUM** | One-line TXT edit (§3.4 step 1). | **No** |
| **`emailed` cannot distinguish "not yet tried" from "tried and failed".** Both are `false`. | **LOW** | See §6.3 nullable columns. | **Yes — additive** |

### 6.3 Safest retry design, given `prisma migrate deploy` runs in the build

`package.json:7` is `"build": "prisma migrate deploy && next build"`. **A migration therefore runs as part of every Vercel build, against that environment's `POSTGRES_URL_NON_POOLING` (`schema.prisma:13`). A failing migration fails the build and blocks the deploy.** So: **any migration is a production step, not a code change.** Treat it with deploy-level care — additive and nullable only, never a rename, never a `NOT NULL` without a default, never a drop.

**Recommended, in ascending order of cost. Stop as early as it solves your problem.**

**Tier 0 — no code, no migration (do this today, 10 minutes).**
Gmail filter on the notification subject (`New Handbuilt …`, `:429`) → label **Leads**, never auto-delete, star it. Plus a saved SQL query in the Neon console:
```sql
SELECT "createdAt", name, email, phone, source, goal, emailed
FROM "BuildRequest"
WHERE status <> 'test'
ORDER BY "createdAt" DESC
LIMIT 50;
```
This alone closes the "I can't find my leads" gap.

**Tier 1 — in-request retry (small, no migration).**
Wrap `sendNotification` in 2 retries with backoff (~1 s, ~3 s) for **transient** failures only — `reason === "provider_error"` or `"exception"`, **never** `"no_key"` (retrying a missing key just burns 4 s of function time). Keep the total under the function timeout. This converts most transient Resend blips into successful notifications. **No schema change.**

**Tier 2 — a sweeper for what still failed (needs the additive migration).**
Add **nullable** columns to `BuildRequest`:
```prisma
notifyAttempts   Int?      // times the owner notification was tried
lastNotifyError  String?   // coarse reason: no_key | provider_error | exception
notifiedAt       DateTime? // when it actually succeeded
```
All three nullable ⇒ safe over existing rows, matching the precedent set for `fingerprint`/`dedupeKey` (`schema.prisma:213-219`). Then a Vercel Cron (e.g. every 15 min) selects `WHERE emailed = false AND status = 'new' AND createdAt > now() - interval '3 days'` and retries, capping `notifyAttempts` at ~5. **This also becomes the alerting channel**: if any row is still unnotified after N attempts, the cron sends *you* a single digest — which is the missing "surface it to a human" piece.

> **Deployment note for Tier 2:** the migration lands the moment the branch builds. Verify it against a **preview** deployment (Neon `preview` branch) before it reaches Production, and confirm `prisma migrate deploy` exits 0 in the preview build log before merging.

### 6.4 How to find a lead that only reached one place

- **DB only (email failed):** the Neon query above. `emailed = false` rows are exactly the leads you were never told about. **Run this query once right now, before any other work — if there are unnotified rows sitting there, those are real people who contacted you and got no reply.**
- **Email only (DB failed):** the Gmail **Leads** label. The message body carries the full lead. Cross-check against the DB by email address; if absent, the DB write failed and the mail is the only copy.
- **Neither (the 502 path):** Vercel → Logs → search `CRITICAL: lead not accepted`. This gives you the **timestamp and the failure reasons but *not* the person** — the log is coarse by design (`:166`). Nothing can recover that lead; the visitor was correctly told to retry. **The frequency of this line is your alarm bell.**
- **Was it a test?** `WHERE status = 'test'` (`:321`), and `source` is prefixed `test:` (`:315`).

---

## 7. The 5-minute "does it actually work?" test

**Runs against production. Sends nothing to any third party. Creates rows that are marked as tests and are trivially deletable.**

**Prerequisites:** `LEAD_TEST_SECRET` set, `LEAD_TEST_NOTIFY_EMAIL` set to your own address, **and a redeploy completed after setting them.**

> Without `LEAD_TEST_SECRET`, `isTestRequest` returns false (`:497`) and **your test is stored as a real lead**. Without `LEAD_TEST_NOTIFY_EMAIL`, the send is skipped (`:403`) and you prove persistence but learn **nothing** about email — which is the thing you are trying to test.

**Step 1 — DNS is actually live (30 s).**
```powershell
Resolve-DnsName -Name send.aibuiltbyhand.com -Type MX  -Server 8.8.8.8
Resolve-DnsName -Name send.aibuiltbyhand.com -Type TXT -Server 8.8.8.8
Resolve-DnsName -Name resend._domainkey.aibuiltbyhand.com -Type TXT -Server 8.8.8.8
Resolve-DnsName -Name _dmarc.aibuiltbyhand.com -Type TXT -Server 8.8.8.8
```
**PASS = all four show `Section : Answer`.** `Section : Authority` with `QueryType : SOA` = the record is not there. (If you did Option A or C, also check `-Name aibuiltbyhand.com -Type MX`.)

**Step 2 — Resend says Verified (15 s).** Dashboard → Domains → `aibuiltbyhand.com` → status green. **Do not proceed on "pending".**

**Step 3 — the happy path (60 s).** Replace `<SECRET>` with the value you set (paste it into the terminal only; it is not a long-lived credential, but do not commit it):
```powershell
$body = '{"type":"build-request","name":"Test Lead","email":"pavneets956@gmail.com","business":"Test Co","goal":"S5 end-to-end delivery check","source":"s5-test"}'
Invoke-RestMethod -Method POST -Uri "https://aibuiltbyhand.com/api/build-request" `
  -Headers @{ "Content-Type"="application/json"; "x-lead-test"="<SECRET>"; "Origin"="https://aibuiltbyhand.com" } `
  -Body $body | ConvertTo-Json
```
**PASS =** `ok: true`, **`test: true`** (proves the secret matched — if this is missing you just created a real lead), an `id`, and **`delivery: { persisted: true, emailed: true }`**.
- `emailed: false` → the send failed. Check Vercel logs for `Resend returned an error`, and confirm `LEAD_FROM_EMAIL` matches the verified domain.
- `persisted: false` → a DB problem; check `POSTGRES_PRISMA_URL`.

**Step 4 — the email arrived (60 s).** Check your inbox **and spam**. Confirm: it is **from `leads@aibuiltbyhand.com`**, not `onboarding@resend.dev`; the subject starts **`[TEST]`** (`:420`); and **hitting Reply addresses the test lead, not yourself** (`replyTo`, `:428`). In Gmail use **Show original** and confirm **`SPF: PASS`**, **`DKIM: PASS`**, **`DMARC: PASS`**. *This header check is the actual proof — a mail landing in the inbox is not.*

**Step 5 — dedupe works (30 s).** Run **the exact same command again**. **PASS =** `deduped: true` and `emailed: false`, and **no second email arrives** (`:183`).

**Step 6 — the failure path is honest (30 s).** Post a body with neither email nor phone:
```powershell
Invoke-WebRequest -Method POST -Uri "https://aibuiltbyhand.com/api/build-request" `
  -Headers @{ "Content-Type"="application/json"; "Origin"="https://aibuiltbyhand.com" } `
  -Body '{"type":"build-request","name":"No Contact"}' -SkipHttpErrorCheck | Select StatusCode, Content
```
**PASS = 400** with `Enter an email or a phone number so we can reply` (`:139`). Nothing is stored, nothing is sent.

**Step 7 — clean up (30 s).** In Neon:
```sql
SELECT id, "createdAt", email, source, status, emailed
FROM "BuildRequest" WHERE status = 'test' ORDER BY "createdAt" DESC;
DELETE FROM "BuildRequest" WHERE status = 'test' AND source LIKE 'test:s5-test%';
```
Then **unset `LEAD_TEST_NOTIFY_EMAIL` in Vercel and redeploy**, so future test traffic is silent again.

**Step 8 — the real form, once (60 s).** Submit `/create` in a browser with your own address, no test header. Confirm the notification arrives and the success screen still reads *"There's no automatic confirmation email — this screen is your receipt."* Delete the row afterwards. **This is the only step that exercises the real user path**; the header tests do not.

---

## What Pavneet must do, in order

Nothing below has been done. Nothing is to be purchased or changed without your go-ahead.

| # | Action | Where | Time | Cost | Blocks |
|---|---|---|---|---|---|
| **0** | **Run the Neon query in §6.4 and see whether unnotified real leads are already sitting there.** Do this before anything else. | Neon console | 5 min | $0 | — |
| **1** | Gmail filter + **Leads** label on `New Handbuilt` subjects; never auto-delete. | Gmail | 5 min | $0 | — |
| **2** | Add `rua=mailto:pavneets956@gmail.com; fo=1;` to the existing `_dmarc` TXT. | Vercel DNS | 5 min | $0 | — |
| **3** | **Resend → Add Domain `aibuiltbyhand.com`**; add the 3 records (MX `send`, TXT `send`, TXT `resend._domainkey`) at TTL 60. | Resend + Vercel DNS | 20 min | **$0** | 4 |
| **4** | Verify each record with `Resolve-DnsName`, then click **Verify** in Resend. | PowerShell | 10 min + propagation | $0 | 5 |
| **5** | **Rotate `RESEND_API_KEY`** (the current one leaked and is scoped to coitracker.co); create an account-wide key. | Resend + Vercel | 10 min | $0 | 6 |
| **6** | Set `LEAD_FROM_EMAIL`, `LEAD_NOTIFY_EMAIL`, `LEAD_TEST_SECRET`, `LEAD_TEST_NOTIFY_EMAIL`, `LEAD_IP_SALT` → **Redeploy**. | Vercel | 10 min | $0 | 7 |
| **7** | **Run the §7 test plan.** | PowerShell + Gmail | 5 min | $0 | 8, 9 |
| **8** | Fix the `SolutionFinder.tsx:61` silent success. | Code | 20 min | $0 | — |
| **9** | Raise the new DNS TTLs from 60 → 3600 once stable. | Vercel DNS | 5 min | $0 | — |
| — | *— everything above is free and low-risk. Stop here if you only want reliable notifications. —* | | | | |
| **10** | **DECISION: do you want a real `@aibuiltbyhand.com` inbox?** If no, you are done. | — | — | — | 11 |
| **11a** | *If yes, cheap:* **Option A** — forwarder at Vercel DNS (apex SPF first, then MX). **Verify current pricing before signing up.** | Vercel DNS | 20 min | free tier / low $ — **your approval required** | — |
| **11b** | *If yes, with send-as:* **Option C** — Google Workspace, records at Vercel DNS, **DKIM enabled manually**. **Verify price at `workspace.google.com/pricing`.** | Google + Vercel DNS | 45 min | paid/user/mo — **your approval required** | — |
| **11c** | *Option B (move DNS to Cloudflare)* — **not recommended.** Free, but the only option that risks the live site, and still forward-only. | — | 90 min + 48 h | $0 | — |
| **12** | **Only after #7 passes:** build the visitor confirmation email per §5, with the `delivery.confirmationSent` rule. | Code | 2 h | $0 | — |
| **13** | Optional: Tier 1 retry (no migration), then Tier 2 sweeper + cron (**additive nullable migration = a production step**). | Code + Neon | 3–4 h | $0 | — |
| **14** | Delete or rewrite `resend-email-setup.md` — it is stale and its safety claim is now false. | Repo | 5 min | $0 | — |

**Critical path to "I reliably hear about every lead": steps 0–7. Free, about an hour of work plus DNS propagation, and no risk to the live site.**
