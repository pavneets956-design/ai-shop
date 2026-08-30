# LinkedIn — five post drafts

> **Draft. Not sent, not published.** No LinkedIn profile was created and nothing was posted. A personal LinkedIn URL for Pavneet was not found anywhere on disk, and no company page exists — see `12-external-checklist.md`.

**Format notes.** First line is the hook; LinkedIn truncates around 140–200 characters on mobile, so it has to stand alone. No hashtag spam — two at most, or none. No links in the body of the first three (LinkedIn suppresses reach on link posts); put the link in the first comment or leave it out. Every post below is a true story, told plainly.

---

## Post 1 — The one that establishes who he is

> I run a cedar-fence company in South Surrey. Last summer I put an AI receptionist on my own business line.
>
> Not a demo. The real number, the one on the truck.
>
> It answered with my services, my prices, my hours, and — the part I actually cared about — the jobs I do not take. If someone called about a chain-link fence it said no, politely, instead of booking me an estimate I would have to cancel.
>
> Here is what happened. It took a handful of real calls. One of them turned into a lead email that landed in my inbox exactly the way I designed it. And then two things broke: a stretch of calls never reached my server at all because of a problem upstream at the carrier, and the model provider retired the model I was using without telling me, so callers got a greeting followed by silence.
>
> So on August 27th I took it out of the call path. The line now rings my cell first, with a voicemail box that emails me the recording, and the AI stays off until I trust it again.
>
> I am telling you this because I build these for other trades businesses now, and the sales version of this story would leave out the second half. The second half is the reason to hire me.

---

## Post 2 — The insight post (no product mention until the last line)

> The reason a missed call costs a contractor money is not the call. It is the seven minutes.
>
> Someone needs a fence. They search, they find three names, they call the first one. If nobody picks up they do not leave a voicemail — they call the second name. By the time you are off the ladder and calling back, they have already booked with somebody who was standing next to a phone.
>
> Every fix for this is really a fix for those seven minutes:
>
> — An answering service picks up, but reads from a script that does not know your prices.
> — Voicemail-to-text tells you about the job you already lost.
> — Missed-call text-back gets the first message in, which is genuinely the cheapest real fix.
> — A system trained on your actual services can answer the question, capture the details, and tell them what you charge — and, more usefully, tell them when you are not the right person to call.
>
> The last one is what I build. But the honest ranking is that order, and if missed-call text-back solves it for you, do that and keep your money.

---

## Post 3 — The one that shows the work

> I built an invoice-chasing tool, and the hardest part had nothing to do with AI.
>
> The feature is simple: an overdue invoice gets a friendly reminder on day 1, a firmer one on day 3, a final one on day 7, and everything stops the moment the client pays.
>
> The hard part is that a scheduled job can run twice. A deploy overlaps a cron, a retry fires, two servers wake up at once — and your customer gets the same "your invoice is overdue" email twice in one minute. That is not a bug you apologise for. That is the customer deciding you are not careful with their name.
>
> So the send is claimed by a database insert before the email goes out. A second attempt collides on a unique key and dies. Not "unlikely to double-send" — physically cannot.
>
> Most of the work in a business automation is like this. Not the clever part. The part where you make the embarrassing failure impossible instead of rare.

---

## Post 4 — The anti-hype post

> I do not think most trades businesses should buy AI right now.
>
> I build it for a living, so read that however you like. But here is the test I use before I will take the job:
>
> 1. Does the thing you want automated happen the same way every time? If it changes with the customer, the season and your mood, an AI will do it inconsistently too — just faster.
> 2. Can you write down what it should say no to? Everyone can describe what they want it to do. Almost nobody can describe what it must refuse. If you cannot, it will say yes to work you do not want.
> 3. Is it actually costing you money today, in a number you could write on a napkin? Missed calls, yes. Quotes going cold, yes. "Sounding modern", no.
> 4. Do you have somewhere for the output to land? An AI that captures a lead into nothing has moved the problem, not solved it.
>
> If it fails any of those, the honest advice is a phone system change, a shared inbox, or a part-time person. I would rather tell you that than sell you a system you will switch off in six weeks.

---

## Post 5 — The direct offer

> I am looking for the first two trades businesses in the Lower Mainland to build an AI office system for.
>
> What that means concretely: your phone gets answered by something that knows your services, your prices, your hours and the jobs you do not take. Your quotes get followed up on a schedule instead of when you remember. The whole thing is connected to the tools you already use — Jobber, QuickBooks, Square, whatever you are on.
>
> How I work: one fixed quote in Canadian dollars before anything starts. One person builds it, and that person is me. You own the system when it is done. I test it on real calls before it goes anywhere near a customer of yours.
>
> What I am not: I have no client case studies yet. You would be the first. What I do have is my own fence company, whose back office I built and broke and rebuilt, and two live software products I run myself.
>
> ⟦Owner decision: name the terms here — discounted price, or full price in exchange for a named case study and a recorded call. Research 09 flags this as an open call.⟧
>
> Starter systems start at $1,500. If you want to talk, message me and tell me what your phone does when you are on a job.

---

## Publishing notes

- **Nothing here is scheduled.** Posting is his action, on his account.
- Post 1 and Post 5 are the two that matter. Post 1 builds the identity; Post 5 makes the ask. Do not run Post 5 first — the offer only works after the story.
- Suggested order and spacing in `11-30-day-schedule.md`.
- Reddit is on 30 of 34 Canadian search results for these queries. The same stories work in r/Contractors, r/smallbusiness and BC-local subs, **but only as answers to somebody's actual question, never as a post about himself.** A self-promotional post there costs the account.
