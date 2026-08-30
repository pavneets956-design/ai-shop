# Case studies — three builds

> **Draft. Not sent, not published.** Every fact below traces to `research/transformation-2026-08-30/09-proof-founder-positioning.md` §A. Nothing here is a client engagement.

**Read this before using any of it:** all three are Pavneet's own businesses or own products. There is no client work. Each write-up carries that label in its first line and it must stay there — remove it and the whole set becomes a lie by omission. The honest frame is not "look at my clients", it is **"here are three systems I run myself, and here is exactly how they work."**

---

## 1. Ironwood Grounds — my own fence company

**Label: this is my own business, not a client.**
Live at ironwoodgrounds.ca. Cedar fences, gates, fence repair, hedge trimming and grounds care in South Surrey, White Rock and Delta. WorkSafeBC insured, fixed written quotes.

**The problem.** I am the crew. When the phone rings I am usually holding something with two hands, and the person calling about a fence does not leave a voicemail — they call the next name on the list. Quote requests arrived by whatever channel someone happened to use and got lost between them.

**What I built.**
- A static site with no framework and no build step, deployed on Vercel, with a quote form on six pages.
- A quote-intake endpoint: browser form → a dependency-free serverless function → validation, HTML escaping, a honeypot field, and a per-IP rate limit → the email provider → my business inbox.
- A self-hosted AI phone receptionist on a separate stack (Python with a voice pipeline, speech-to-text, a language model, text-to-speech, an Asterisk PBX and a SIP trunk on a single cloud box), driven by a config file rather than code — one config row per business.

**How the workflow runs.** An inbound call hits the phone number, the PBX hands it to the voice pipeline, the pipeline looks up which business that number belongs to, and it answers with the greeting and the AI disclosure line from that business's config. The config is the whole product: services offered, services **explicitly not offered**, nine service areas, FAQs, and the rules for booking, estimating and escalating. After the call it saves the transcript and the extracted lead, then emails me.

**What it connects to.** A real phone number on a SIP provider, an Asterisk PBX, a Postgres database for calls and leads, and a transactional email provider for the lead alert. The website quote form connects to email only — deliberately no analytics and no third-party calls in that path.

**What was tested.** A QA harness with seven suites plus a release-gate SEO check: analytics wiring, the business-card page, the HTTP contract, the 404, the quote endpoint, a full-site smoke run across three viewports, and the deploy config. Facts the owner confirmed are pinned in a test file so a rewrite cannot quietly change them. On the phone side, 87 Python tests passed at the last merge.

**What actually happened when it went live.** It took real calls in July and August 2026. One produced a lead email exactly as designed. It also taught me two things the hard way: a stretch of calls never reached the box at all because of an upstream delivery failure, and when the model provider retired the default model without warning, the receptionist greeted callers and then went silent. **Since 2026-08-27 the line is human-first — it rings my cell with a press-1 confirmation, then a voicemail box that emails me the recording — and the AI is out of the call path while I rebuild it.** I am not going to pretend otherwise.

**What I control.** All of it: the domain, the phone number, the box, the database, the email provider, the repository.

**What this proves.** Not that AI receptionists are magic. That I will put one on my own revenue line first, instrument it, catch it failing, and take it out of the path when it is not good enough. That is the standard I would hold a build for you to.

---

## 2. COITracker.co — my own product

**Label: this is my own product, not a client project.** Live at coitracker.co. Pre-revenue.

**The problem.** A small business that hires subcontractors collects Certificates of Insurance from each one, then tracks the expiry dates in a spreadsheet. The spreadsheet does not remind anybody, so a vendor's coverage lapses and nobody finds out until it matters.

**What I built.** A B2B SaaS: a vendor list, document upload, field extraction the user confirms against the document rather than trusting blindly, expiry reminders, one-click renewal requests to the vendor, and secure private document storage. A second line, VendorReady, adds AI-assisted certificate reading and sits behind a feature flag.

**How the workflow runs.** Upload a certificate and it goes through an ordered chain of readers, deterministic first: fillable-form fields, then positioned text, then — only if that tenant has permitted it — a vision model. The first reader that does not abstain wins. **If every reader abstains, the product abstains. It never guesses a date.** Every run writes an immutable, versioned audit record naming the reader and model that produced the answer. A daily scheduled job scans expiries and sends reminders at 30, 14 and 7 days out.

**What it connects to.** Payments, transactional email, an authentication and database provider with row-level security and private file storage, error monitoring, and two scheduled jobs.

**What was tested.** 76 test files, plus 13 adversarial PDF fixtures — blank, prompt-injection, rotated, handwritten, foreign-language, wrong document type — which exist specifically to prove the reader refuses rather than invents. CI runs type checks, linting, the unit suite, and a database smoke test against real Postgres. A smoke check against a real production build is a mandatory gate before any promotion.

**Scale.** 260 commits, 32 database migrations.

**Honest status.** Two authenticated users — me and one real free-tier user — one vendor, one certificate. Pre-revenue. Pricing is free for 10 vendors, then $29/month.

**What this proves.** I can build and operate a real multi-tenant SaaS end to end, and I design AI features that refuse to answer rather than fabricate — which is the exact failure mode that makes AI dangerous in a business workflow.

---

## 3. PayNudge — my own product

**Label: this is my own product, not a client project.** Live at paynudge.xyz. Near-zero customers.

**The problem.** Small service businesses chase overdue invoices by hand, or do not chase them at all, because the follow-up is awkward and easy to forget.

**What I built.** Invoice entry plus CSV import, a dashboard, and a three-step automatic email cadence — friendly at day 1 past due, firmer at day 3, final at day 7 — that stops the moment the client pays. For text messages it generates a one-tap link that opens the merchant's own phone with the message drafted; the merchant sends it themselves. That was a deliberate decision: no telephony provider, no compliance surface, no per-message billing.

**How the workflow runs.** A daily scheduled job wakes up, the engine decides per invoice what is due, and — this is the part that matters — **the send is claimed by an atomic database insert before the email goes out.** A duplicate claim collides at the database level, so two concurrent runs physically cannot double-send a reminder to a customer. A second daily job pulls invoice state from the connected tools. A third enforces data retention: records are redacted after a year and deleted after three.

**What it connects to.** Jobber, QuickBooks, Square and Stripe — a full OAuth flow and a sync module for each. Payments, transactional email, error monitoring, product analytics.

**What was tested.** 31 test files, registered by hand so nothing runs by accident, including regression locks that fail the build if the removed telephony provider ever comes back, if demo mode stops failing closed, if analytics starts carrying personal data, or if the accessibility contract breaks. A commit hook rejects any commit labelled a fix that does not cite its evidence.

**Scale.** 257 commits, 16 database migrations. The Stripe App marketplace listing was submitted on 2026-08-27 and is in review.

**Honest status.** Three real signups, all of which bounced at the same step. That is the whole customer history and I am not going to dress it up.

**What this proves.** Integrations with the exact tools a contractor already uses, and a bias toward making the dangerous failure impossible at the database level rather than merely unlikely in code.

---

## The line that goes under all three

> No client logos. I do not have any yet. These are the three systems I run myself, and I will show you the code, the tests and the failures for any of them.

## Assets and their conditions

Screenshots exist for all three (paths listed in `09-proof-founder-positioning.md` §A). **None has been checked for real customer data or for staleness.** Before anything is published:
- Ironwood: shots must come from the live site, not the pre-redesign build.
- PayNudge: the seed data is fictional. Label every screenshot "sample data".
- COITracker: check every frame for the one real free-tier user's information.
- The receptionist: **never screenshot the calls or leads tables — they contain callers' personal information.** Nothing from the phone line may be published without that caller's consent, which does not currently exist.
- The homepage audio sample is a text-to-speech re-creation of the greeting script, not a recording of a real call. It must stay labelled as a sample wherever it appears.
