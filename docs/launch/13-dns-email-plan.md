# Email DNS for aibuiltbyhand.com — the exact changes, ready to run

**Status: PREPARED, NOT APPLIED.** Nothing here has been executed. No domain,
mailbox or plan has been purchased. Every record below needs your explicit go
before it is added, and the `vercel dns add` commands are written out so the
change is one copy-paste rather than a dashboard hunt.

---

## 1. What is actually true today

Measured 2026-08-30 against Google Public DNS (8.8.8.8), not from memory:

| Record | Query | Result |
|---|---|---|
| Nameservers | `NS aibuiltbyhand.com` | `ns1.vercel-dns.com`, `ns2.vercel-dns.com` |
| Mail exchanger | `MX aibuiltbyhand.com` | **none** (SOA returned) |
| SPF | `TXT aibuiltbyhand.com` | **none** (SOA returned) |
| Resend DKIM | `TXT resend._domainkey.aibuiltbyhand.com` | **none** (SOA returned) |
| DMARC | `TXT _dmarc.aibuiltbyhand.com` | **`v=DMARC1; p=none;`** — present |

Two things follow, and both are load-bearing:

1. **Vercel runs the DNS.** Records are added with `vercel dns add` or in the
   Vercel dashboard. Not Cloudflare, not the registrar's panel.
2. **`build@aibuiltbyhand.com` cannot receive mail and never could.** With no MX
   record, a message to that address bounces at the sending server. Publishing it
   anywhere on the site would be advertising a dead address, which is why
   `lib/data/site.ts` still uses the personal Gmail. Do not publish it until
   step 3 below is done and verified.

The DMARC record is the odd one out: it exists, but with no SPF and no DKIM to
authenticate against and no `rua=` reporting address, it currently does nothing
at all. Step 4 makes it useful.

**Reminder about what the site does today.** Resend sends exactly one email per
lead and it goes to *you*, from the shared `onboarding@resend.dev`, with the
visitor as reply-to. **No email is ever sent to the visitor**, and no page claims
one was. Step 2 is what would let that change; until then the visitor
confirmation stays off, deliberately.

---

## 2. Track A — send from your own domain (Resend domain verification)

**Buys you:** notification and, later, visitor-confirmation email that comes from
`build@aibuiltbyhand.com` instead of `onboarding@resend.dev`, and does not land
in spam. **Does not buy you:** the ability to *receive* at that address. That is
Track B, and they are independent.

**Cost: $0.** Resend's free tier covers 3,000 emails/month and domain
verification is free. No purchase required.

### Step 2a — add the domain in Resend

In the Resend dashboard → Domains → Add Domain → `aibuiltbyhand.com`, region
`us-east-1` (or `eu-west-1`; it only changes the DKIM host prefix Resend gives
you). Resend then shows you **three** records. **Use the values Resend shows you
— do not use a value from this document.** The DKIM public key is generated per
domain and any key written here would be wrong.

### Step 2b — add them to Vercel DNS

```bash
# 1. DKIM — the public key half of the signature. Resend gives you the exact
#    host and value; the host is usually "resend._domainkey" (us-east-1) or
#    "resend._domainkey" with a region-specific selector. COPY BOTH FROM RESEND.
vercel dns add aibuiltbyhand.com resend._domainkey TXT "p=<PASTE_THE_KEY_RESEND_SHOWS>"

# 2. SPF for the Resend sending subdomain (Resend sends from send.<domain>)
vercel dns add aibuiltbyhand.com send TXT "v=spf1 include:amazonses.com ~all"

# 3. MX for that same sending subdomain — this is for RETURN-PATH/bounces only.
#    It does NOT give you a mailbox and is not a substitute for Track B.
vercel dns add aibuiltbyhand.com send MX feedback-smtp.us-east-1.amazonses.com 10
```

### Step 2c — apex SPF

Only needed if anything ever sends **as `@aibuiltbyhand.com` from the apex**.
Add it when you set up Track B, and make it one record that lists every sender —
**a domain with two SPF TXT records fails SPF entirely**, which is worse than
having none.

```bash
# Resend only:
vercel dns add aibuiltbyhand.com @ TXT "v=spf1 include:amazonses.com ~all"

# Resend + Google Workspace, if you do Track B option 1 — ONE record, not two:
vercel dns add aibuiltbyhand.com @ TXT "v=spf1 include:amazonses.com include:_spf.google.com ~all"
```

### Step 2d — verify, then flip the app

Click Verify in Resend, then confirm from a machine, not from the dashboard:

```bash
nslookup -type=TXT resend._domainkey.aibuiltbyhand.com 8.8.8.8
nslookup -type=TXT send.aibuiltbyhand.com 8.8.8.8
```

Only once Resend shows **Verified**, set in Vercel (Production and Preview):

```
LEAD_FROM_EMAIL = Handbuilt AI <build@aibuiltbyhand.com>
```

Nothing else in the code changes — `lib/leadNotify.ts` already reads that
variable and falls back to `onboarding@resend.dev`, so an unset or wrong value
degrades to today's working behaviour rather than breaking sending.

---

## 3. Track B — receive mail at build@aibuiltbyhand.com

This is what actually unblocks publishing the address. Three options; they are
mutually exclusive because **a domain has one MX set**.

### Option 1 — Google Workspace (recommended if you want a real mailbox)

You already live in Gmail; this is the same interface with your own domain, and
it can *send* as `build@` too.

**Cost: CAD $8.40/user/month** (Business Starter, list price at time of writing —
confirm at checkout, it changes).

```bash
vercel dns add aibuiltbyhand.com @ MX smtp.google.com 1
```

Then complete Google's domain verification (a TXT record they give you) and add
Google to the apex SPF as shown in 2c.

### Option 2 — email forwarding to your existing Gmail (cheapest, no mailbox)

Mail to `build@aibuiltbyhand.com` is forwarded to `pavneets956@gmail.com`. You
read and reply from Gmail. Replies come *from* the Gmail address unless you also
do Track A and configure Gmail's "send mail as".

**Cost: $0** on ImprovMX's free tier (one domain, unlimited aliases at time of
writing). Confirm current terms before relying on it.

```bash
vercel dns add aibuiltbyhand.com @ MX mx1.improvmx.com 10
vercel dns add aibuiltbyhand.com @ MX mx2.improvmx.com 20
```

Then add the alias `build@ → pavneets956@gmail.com` in the ImprovMX dashboard.

**Honest trade-off:** a free forwarder is a third party in the path of every
customer enquiry that arrives by email, with no SLA. For a business whose whole
promise is "you will reach a human", Option 1 is the more defensible choice.

### Option 3 — Zoho Mail free tier

A real mailbox at $0 for a single user, web/app access, custom domain.

```bash
vercel dns add aibuiltbyhand.com @ MX mx.zoho.com 10
vercel dns add aibuiltbyhand.com @ MX mx2.zoho.com 20
vercel dns add aibuiltbyhand.com @ MX mx3.zoho.com 50
```

Plus Zoho's own domain-verification TXT and `include:zoho.com` in the apex SPF.

### After whichever option — prove it before publishing the address

```bash
nslookup -type=MX aibuiltbyhand.com 8.8.8.8      # must list your provider
```

Then **send a real message to `build@aibuiltbyhand.com` from an outside account
and confirm it arrives.** Only after that:

- update `contactEmail` in `lib/data/site.ts`
- update the note in `app/privacy/page.tsx`
- delete trap #6 from `AGENTS.md`

Until that test message lands, the Gmail address stays.

---

## 4. Track C — make the DMARC record do something

Today's `v=DMARC1; p=none;` has no reporting address, so it produces no data and
enforces nothing. Once SPF and DKIM exist (Track A), replace it:

```bash
# Step 1 — monitor. Run for at least two weeks and read the reports.
vercel dns rm <record-id-for-_dmarc>   # find it with: vercel dns ls aibuiltbyhand.com
vercel dns add aibuiltbyhand.com _dmarc TXT "v=DMARC1; p=none; rua=mailto:pavneets956@gmail.com; fo=1"

# Step 2 — only after the reports show your own mail passing, tighten:
# "v=DMARC1; p=quarantine; rua=mailto:...; pct=100"
```

**Do not jump straight to `p=reject`.** With a misconfigured SPF that silently
bins your own outbound mail, and you would not find out from the site.

---

## 5. Order of operations

1. Track A (free, no purchase, no mailbox) → verified sending domain.
2. Set `LEAD_FROM_EMAIL`. Notifications now come from your own domain.
3. Decide Track B option 1/2/3. **This is the one that costs money.**
4. Add the MX records; send a real test message in; confirm it arrives.
5. Publish `build@aibuiltbyhand.com` in `site.ts` and the privacy page.
6. Track C, in the two steps given.
7. Only then consider a visitor confirmation email — and it still needs its own
   copy review, because it is the first message this business would ever send to
   a customer.

---

## 6. What stays off until all of this is done

- **The visitor confirmation email.** The lead form must keep saying only what is
  true: the request was received and stored. It must never say "check your inbox"
  for a message that was not sent.
- **`build@aibuiltbyhand.com` anywhere on the site.** No footer, no schema, no
  `sameAs`, no marketing draft in `docs/launch/`.
