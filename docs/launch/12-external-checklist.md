# External checklist — the things only Pavneet can do

> **Nothing in this folder — including everything in this file — has been sent, posted, published, submitted, created, or scheduled.** No email was sent. No profile was created. No listing was submitted. No verification was started. Every item below is an action for the owner, described so he can do it, not a report of something done.

These are off-site actions. No amount of work in this repository can substitute for any of them, and several block work that is otherwise finished and waiting.

---

## 1. 🔴 Email — the domain cannot send or receive mail

**What it is.** DNS for `aibuiltbyhand.com`, checked 2026-08-30: **no MX record, no SPF, no Resend DKIM.** Only a `_dmarc` record exists, set to `p=none`.

**Why it matters.**
- **Any `@aibuiltbyhand.com` address black-holes mail.** Anyone who writes to `build@` or `hello@` gets nothing and hears nothing back. That is the worst possible failure for a lead — silent, invisible, and it looks like being ignored.
- Resend cannot send *as* the domain either, so the lead notification still goes out from the shared `onboarding@resend.dev` sender.
- The **lead confirmation email to the visitor is blocked entirely.** Someone submits the form, sees a success screen, and never receives anything.
- Outreach from a personal Gmail costs credibility with exactly the buyer he wants.

**What he must do.**
1. Choose a mailbox provider. **Cloudflare Email Routing** is free and forwards `@aibuiltbyhand.com` into his Gmail — about 20 minutes, and enough to stop the black hole. **Google Workspace** (~$8/month) gives a real mailbox he can send from and looks materially more professional.
2. Add the MX records the provider gives him, plus SPF.
3. Verify `aibuiltbyhand.com` in Resend and add the DKIM records it issues.
4. Set `LEAD_FROM_EMAIL` in the Vercel **Production** environment to the verified address.
5. Send one test to the new address and confirm it lands. Then submit the site's own form and confirm both emails arrive.

**Unblocks:** the branded contact address, the visitor confirmation email, credible outreach, and the removal of a personal Gmail from the site's structured data.

---

## 2. 🔴 Google Business Profile — created but never verified

**What it is.** A profile for "Handbuilt AI Studio" was created 2026-06-14 and sat around 87% complete. **It has never been video-verified**, so it does not appear in local results.

**Why it matters.** Google Business Profile is roughly a third of local-pack ranking weight. Without it the studio does not exist in the map results at all — and the site carries **19 location pages** whose entire purpose depends on a verified local entity. That work is built, deployed, and inert.

**What he must do.**
1. Decide the business name **first** (see item 4). The verified name is painful to change afterwards.
2. Open the Google Business Profile app on his phone and start video verification. It is a single continuous, unedited recording — typically the exterior or signage, the work area or equipment, and then proof of his connection to the business (a business licence, branded invoice, or the tools of the trade). It cannot be paused, and it cannot be re-shot from footage.
3. Submit and wait — days to weeks.
4. Once verified: complete the description (`02-bio-short.md` variant B), the service area, the categories, and add real photos.

**Unblocks:** local search, the map pack, GBP posts, review collection, and the 19 location pages.

**Note:** the studio publishes no phone number, and `778-850-1016` belongs to Ironwood Grounds. GBP strongly prefers one. ⟦Owner decision: separate line, no number, or the Ironwood number with the brand confusion that brings.⟧

---

## 3. 🔴 LinkedIn — no profile exists anywhere on disk

**What it is.** A search of this machine found no personal LinkedIn URL for Pavneet, and no company page for the brand. Every LinkedIn draft in this folder is written against a profile that does not yet exist.

**Why it matters.** For a solo builder with no client logos, LinkedIn is the cheapest credibility surface there is: it is what a bookkeeper checks before forwarding a referral, and what a contractor checks after reading a cold email. Its absence is felt hardest in exactly the channel he is best placed to use.

**What he must do.**
1. **Personal profile first.** Headline, About section (`03-bio-long.md`, LinkedIn variant), location Surrey BC, and the portrait at `public/founder.jpg`.
2. ⟦**Owner decision:** whether to list the employment history. The two résumés on disk disagree on dates for InnoServ and Precision Heat Treat. Publishing conflicting dates on a profile people cross-check is a credibility problem — pick one version or list neither.⟧
3. **Company page later.** An empty company page is worse than no company page. Add one when there is something to post to it.
4. Do not connect the GitHub profile yet — see item 6.

**Unblocks:** all five LinkedIn drafts, partner outreach credibility, and a `sameAs` entry that is a real person rather than only a code repository.

---

## 4. 🟡 The business name — three strings for one business

**What it is.** The code says "Handbuilt AI", the legal/trade name is "Handbuilt AI Studio", the domain is `aibuiltbyhand.com`, and the GBP listing uses a fourth variation of the same idea.

**Why it matters.** Search engines resolve a business into a single entity by matching name, address and contact details across sources. Four spellings across four surfaces splits that entity four ways, and it is the reason the brand has no search presence to speak of. It also blocks a clean `sameAs` graph.

**What he must do.** Pick one public form. Use it identically on the site, the GBP listing, LinkedIn, every directory, and every email signature. Do it **before** GBP verification — the verified name is the hardest one to change later.

---

## 5. 🟡 Directory listings — none found

**What it is.** No directory listings for the business were found in any research pass.

**Why it matters.** Consistent name/address/phone citations across directories are a core local-search signal and one of the few that a competitor cannot take away. They are also free.

**What he must do.** After the name decision and GBP verification, list on: Bing Places, Apple Business Connect, Yelp Canada, Yellow Pages Canada, the Surrey Board of Trade, and any BC or Canadian small-business directory that accepts a service-area business. **Identical name, address and phone on every one** — a mismatched citation is worse than a missing one.

---

## 6. 🟡 GitHub — the profile contradicts the site

**What it is.** `github.com/pavneets956-design` resolves, but the account name is **"hydratag"**, the bio reads "HydraTag water tracking", and the flagship public repository is described as *"AI Shop — Marketplace with AI Sales Agent"* — the abandoned 2026-06 marketplace concept. The site's own social links point at that repository.

**Why it matters.** It is currently linked in `sameAs` as the only social profile, so it is the one identity signal the site emits — and it says the business is a marketplace run by someone called hydratag.

**What he must do.** ⟦Owner decision, one of two:⟧ clean it up — real name, real bio, location, and either a pinned honest repository or the AI Shop repo re-described accurately — **or** remove it from `lib/data/site.ts` so the site stops pointing at it. Leaving it as-is is the only option that is actively harmful.

---

## 7. 🟡 Reviews — from real customers only

**What it is.** Handbuilt AI has no reviews anywhere, because it has no customers. Ironwood Grounds has four Google reviews on its own separate profile.

**Why it matters.** Reviews are the single largest missing trust signal, and the temptation to bridge the gap dishonestly is the highest-consequence risk in this entire launch. **A fabricated review is fraud, gets a profile suspended, and would destroy the one thing this positioning is built on.** The site has already shipped an invented review card once; it must not happen again.

**What he must do.**
1. Nothing, until there is a paying customer. There is no honest shortcut.
2. When the first build ships: ask that customer directly, by name, in a personal message, after the system has been running for two weeks — not on handover day.
3. Ask for a review of the specific thing they experienced, and let them write whatever they write. **Never draft it for them, never gate the request on whether they are happy, and never route unhappy customers away from the review form** — review gating is against Google's policies, and this site removed a gating flow once already.
4. Ironwood's four reviews belong to Ironwood. They must never be presented as reviews of the AI studio.

---

## 8. 🟡 Case-study consent — nothing consented exists

**What it is.** The most compelling proof available is the phone line: real inbound calls, transcripts, and one lead email from July–August 2026.

**Why it matters.** **Nothing from that line has consent to be published.** The calls and leads tables contain callers' personal information. A recording of a real caller cannot be published without that caller's permission, and no such permission exists.

**What he must do.** Publish nothing from the phone line. The existing homepage audio is a text-to-speech re-creation of the greeting script, correctly labelled a sample — **keep that label.** If a real recording is ever wanted, it needs the caller's explicit, recorded consent, obtained at the time. Going forward, the disclosure line at the start of a call is the place to handle that.

---

## 9. 🟢 Verify Vercel Web Analytics is actually on

**What it is.** The analytics component is mounted on every page, but it is inert until Web Analytics is enabled in the project dashboard. Custom events are dropped on the Hobby plan; the team reports as **Pro**, so the old "Hobby drops events" note in the code is probably stale — but neither the toggle state nor whether any event has ever landed can be verified from here.

**Why it matters.** Every measurement in the 30-day plan assumes this works. If it is off, day 30 has no numbers and the review is guesswork.

**What he must do.** Vercel dashboard → team *Pav's Projects* → project *ai-shop* → **Analytics**. If it offers "Enable", it is off — turn it on. If it shows data, open the events view and look for `tool_calculated` from 2026-07-16 onward. Two minutes.

---

## 10. 🟢 Search Console — re-baseline after the release

**What it is.** Search Console is live and verified, and the sitemap is submitted.

**What he must do.** On the day the transformation deploys, record the current clicks, impressions and average position so there is a real before/after. Then resubmit the sitemap and request indexing for the pages whose URLs or content changed materially. Expect four to eight weeks before the effect is legible; do not judge it at day 14.

---

## Priority order

| | Item | Effort | Why first |
|---|---|---|---|
| 1 | Email / MX (#1) | ~1h | Unblocks every other channel; a black-holed address is actively losing leads today |
| 2 | GBP video verification (#2) | ~45m + wait | Approval takes weeks — start the clock now |
| 3 | Name decision (#4) | ~30m | Everything downstream bakes it in |
| 4 | LinkedIn profile (#3) | ~1h | Gates five finished drafts |
| 5 | Analytics check (#9) | ~2m | Everything else is unmeasurable without it |
| 6 | GitHub (#6) | ~30m | It currently contradicts the site |
| 7 | Directories (#5) | ~2h | Needs #4 and #2 done first |
| 8 | Reviews (#7), consent (#8) | — | Wait for a real customer. There is no shortcut and no substitute. |
