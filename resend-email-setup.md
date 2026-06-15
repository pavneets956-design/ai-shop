# Email setup — make leads send from aibuiltbyhand.com (Resend)

**Why:** the lead notifier (`app/api/build-request/route.ts`) currently sends from
`leads@coitracker.co` on the aibuiltbyhand.com site. It works today only because
Gmail won't bounce mail you send to yourself — but a cross-brand SPF/DKIM mismatch
will land it in spam the moment deliverability tightens or you forward a thread.
Fix = verify your own domain + flip one env var. **No code change needed.**

The code is already solid: `replyTo` is the lead's address (hit Reply → you're
talking to them), and every lead is also `console.log`'d (Vercel → Logs) so nothing
is ever lost even if email hiccups.

---

## Step 1 — Add + verify aibuiltbyhand.com in Resend (~15 min + DNS propagation)

1. Resend dashboard → **Domains** → **Add Domain** → `aibuiltbyhand.com`.
2. Resend shows you **3–4 DNS records** (values are unique to your domain —
   copy them from the dashboard, I can't generate the DKIM key). They'll look like:
   - **MX** on `send.aibuiltbyhand.com` → `feedback-smtp.<region>.amazonses.com` (priority 10)
   - **TXT (SPF)** on `send.aibuiltbyhand.com` → `v=spf1 include:amazonses.com ~all`
   - **TXT (DKIM)** on `resend._domainkey.aibuiltbyhand.com` → `p=MIGf...` (long key)
   - *(recommended)* **TXT (DMARC)** on `_dmarc.aibuiltbyhand.com` → `v=DMARC1; p=none;`
3. Add those records at your domain registrar / DNS host (where aibuiltbyhand.com
   DNS lives — same place you pointed it at Vercel).
4. Back in Resend, click **Verify**. Wait until status = **Verified** (green).

## Step 2 — Rotate the leaked Resend API key

The old `RESEND_API_KEY` (scoped to coitracker.co) leaked into a setup transcript.
1. Resend → **API Keys** → delete the old "Vercel Integration" key.
2. Create a new key (account-wide is fine — one key can send from any verified
   domain in the account, so it'll cover both coitracker.co and aibuiltbyhand.com).
3. Put the new key in Vercel → Project → Settings → Environment Variables →
   `RESEND_API_KEY` (Production). **Do not paste it into chat or any file.**

## Step 3 — Point the from-address at your own domain

In Vercel → Environment Variables (Production), set:

| Variable | Value |
|---|---|
| `LEAD_FROM_EMAIL` | `Handbuilt <leads@aibuiltbyhand.com>` |
| `LEAD_NOTIFY_EMAIL` | `pavneets956@gmail.com` *(already the default — only set if changing)* |

`leads@aibuiltbyhand.com` does **not** need to be a real mailbox — it's just the
verified sending identity. Replies go to the lead's address via `replyTo`.

## Step 4 — Redeploy + test

1. **Redeploy** (env vars only apply to new deployments).
2. Submit a real test on the live site (`/create` form or `/start`).
3. Confirm: (a) email lands in your inbox **from leads@aibuiltbyhand.com**, not
   spam; (b) hitting **Reply** addresses the test lead, not yourself.
4. Delete the test lead afterward.

---

## What we deliberately did NOT do (and why)

- **No HTML email template / logo / autoresponder.** They don't move conversion
  for a solo founder fielding leads; the from-domain does. Revisit later if you
  want a "got it, I'll reply within X hrs" autoreply to the lead.
- **No CRM / DB persistence.** Already deferred — v1 emails the brief + logs it.

## Verify checklist
- [ ] aibuiltbyhand.com shows **Verified** in Resend
- [ ] Old leaked API key deleted, new key in Vercel
- [ ] `LEAD_FROM_EMAIL` = `Handbuilt <leads@aibuiltbyhand.com>` in Vercel Production
- [ ] Redeployed
- [ ] Test lead arrived from your domain, not spam, Reply works
