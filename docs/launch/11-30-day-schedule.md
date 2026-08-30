# 30-day organic launch schedule

> **Draft plan. Nothing scheduled, nothing sent, nothing published.**

**Who this is for:** one person who also runs a fence company and ships software. It assumes **1–2 hours a day on marketing, five days a week** — roughly 30 working hours across the month. Anything more ambitious than that will be abandoned in week two, which is worse than a smaller plan finished.

**Sequenced by dependency, not by enthusiasm.** Three things gate almost everything else:

| Blocker | Blocks | Owner-only? |
|---|---|---|
| No MX record on `aibuiltbyhand.com` | Every branded email address, the lead confirmation email, credible outreach | Yes — DNS + a mailbox provider |
| Google Business Profile never video-verified | All local search, every GBP post, the local pack | Yes — a video on his phone |
| No LinkedIn profile found | Every LinkedIn post, partner outreach credibility | Yes — he has to create it |

Each one takes under an hour and unlocks a week of work. They go first. Details in `12-external-checklist.md`.

---

## Week 1 — Unblock the foundation

The goal this week is that a stranger can find him, verify he is real, and reach him. Nothing published yet.

| Day | Task | Time | Unblocks |
|---|---|---|---|
| 1 | **Email.** Add MX for `aibuiltbyhand.com` (Cloudflare Email Routing forwarding to Gmail is free and takes 20 minutes; Google Workspace is ~$8/mo if he wants real sending). Verify the domain in Resend and set the sender variable in Vercel Production. | 1h | Branded contact, lead confirmation emails, outreach credibility |
| 2 | **Google Business Profile.** Record the video verification walkthrough and submit. Approval takes days to weeks, which is exactly why it goes on day 2, not day 20. | 45m | Local pack, GBP posts, the map |
| 3 | **LinkedIn personal profile.** Headline, About (`03-bio-long.md`), location Surrey BC, photo (`public/founder.jpg`). No company page yet — a personal profile with a face outperforms an empty company page. | 1h | Every LinkedIn action after this |
| 4 | **Decide the name.** "Handbuilt AI" vs "Handbuilt AI Studio" vs "AI Built By Hand". Pick one, write it down, use it everywhere from here. Doing this on day 4 rather than day 24 saves rewriting every profile. | 30m | Every listing, every profile, the search entity |
| 5 | **Demo video.** Record it (`09-demo-video-script.md`). Check the live-vs-scripted banner before recording. | 2h | The single most reusable asset in this plan |

**Week 1 gate:** an email to the branded address arrives; the GBP verification is submitted; the LinkedIn profile is public; the video file exists.

---

## Week 2 — Prove he exists

First public output. Volume is deliberately low — one thing at a time, done properly.

| Day | Task | Time |
|---|---|---|
| 6 | **LinkedIn post 1** — the "I put an AI receptionist on my own line and took it back off" story (`05-linkedin-posts.md`). This is the identity post; everything else builds on it. | 45m |
| 7 | **Directory listings, batch 1.** Same name, same address, same phone, same description on every one. Consistency matters more than count. | 1h |
| 8 | **Reply to 3 real questions** in r/Contractors, r/smallbusiness or a BC-local sub. **Answers only, no promotion.** Reddit ranks on 30 of 34 Canadian search results for these queries, so this is a real channel — and one self-promotional post gets the account burned. | 1h |
| 9 | **Directory listings, batch 2** + submit the site to Bing Webmaster Tools. | 1h |
| 10 | **LinkedIn post 2** — the missed-call insight post. No product mention until the last line. | 45m |

**Week 2 gate:** two posts live, listings consistent, three genuine Reddit answers, zero promotional posts.

---

## Week 3 — Outreach and partners

Only now, once someone who receives an email can look him up and find something.

| Day | Task | Time |
|---|---|---|
| 11 | **Build the outreach list.** 20 local trades businesses whose email is publicly published on their own site. **Record the URL and a screenshot for each — that record is the CASL consent basis.** | 1h |
| 12 | **Send 5 contractor emails,** by hand, personalised (`07-outreach-contractor.md`). Log every one. | 1h |
| 13 | **LinkedIn post 3** — the "how I made double-sending impossible" build post. Shows the work without selling. | 45m |
| 14 | **Send 5 partner emails** (`08-outreach-referral-partner.md`). Fill in the referral terms first — do not send a blank offer. | 1h |
| 15 | **Send 5 more contractor emails.** Follow up on nothing yet. | 45m |

**Week 3 gate:** 10 contractor emails, 5 partner emails, all logged with consent basis; one post; no follow-ups sent early.

---

## Week 4 — Repeat what worked, and be honest about what did not

| Day | Task | Time |
|---|---|---|
| 16 | **Follow up once** on week-3 sends that got no reply at all. Three sentences. Anyone who replied anything, including "no", is done. | 45m |
| 17 | **LinkedIn post 4** — the anti-hype post ("I don't think most trades businesses should buy AI right now"). | 45m |
| 18 | **GBP post 1** if verification cleared. If it did not, chase the verification instead — that is the higher-value hour. | 30m |
| 19 | **Send 10 more emails**, split between contractors and partners, using whichever subject line got opened. | 1.5h |
| 20 | **LinkedIn post 5** — the direct offer. Only now, after four posts of substance. | 45m |

**Week 4 gate:** 25 outreach emails sent in total, five posts live, GBP either verified or actively chased.

---

## Day 30 — Review, honestly

Write down the real numbers, not the encouraging ones:

- Emails sent · replies · replies that were not "no" · calls that happened
- Post impressions and, more usefully, **comments from actual contractors** rather than from other builders
- Site sessions, demo starts, form submissions — from Vercel Analytics. **Confirm Web Analytics is actually enabled on the project first; the component is inert until the dashboard toggle is on.**
- Google Search Console: clicks and impressions against the pre-launch baseline

**The only question that matters at day 30: did one real conversation with a paying prospect happen?** If yes, do more of whatever produced it. If no, the problem is the offer or the list, not the volume — and doubling the sends will not fix either.

---

## What is deliberately not in this plan

- **Paid ads.** No conversion data exists; spending here is buying noise.
- **A blog.** The site already has ~240 pages, several of which compete with each other. Adding more before the existing ones earn a click is negative work.
- **A company LinkedIn page.** An empty one is worse than none. Add it when there is something to post to it.
- **The lead magnet** (`10-lead-magnet-concept.md`). It converts traffic, and there is not enough traffic yet for it to convert. Week 5 at the earliest.
- **A newsletter.** Nothing to send, nobody to send it to, and a CASL surface for no return.
- **Cold calling.** The outbound-calling code in this repository ships disabled, and the CRTC unsolicited-telecommunications regime is a separate legal question from CASL. Not this month, and not without a decision.
