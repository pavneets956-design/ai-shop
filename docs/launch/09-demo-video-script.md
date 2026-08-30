# Demo video script — the AI Worker Showroom

> **Draft. Not recorded, not published.** This is a script for Pavneet to record himself.

**Target:** 2:00–2:30. Screen recording of `/demo` with his own voice over it. One take is fine; a video that sounds like a person beats a video that sounds produced.

**What you are recording:** the AI Worker Showroom. Six workers — AI Receptionist, Quote Agent, Lead Follow-Up, Invoice Nudge, Review Reply, Proposal Builder — across nine trades. The visitor picks a worker and an industry, then types as if they were the customer. **The session caps at 8 turns**, so plan the exchange; do not discover that mid-recording.

---

## Before you hit record

- [ ] Run through the exact exchange once, untraced, and check the model actually answers the way you want. It is a language model — it will not say the same thing twice. **If you cannot get a good take, cut the script to fit what it actually does. Do not re-record it as a mockup and present it as live.**
- [ ] Check the scripted-fallback banner is *not* showing. If the API key or the rate limit trips, the showroom falls back to a canned transcript and says so on screen. Recording that and calling it live is exactly the kind of lie this whole project exists to avoid.
- [ ] Browser at 1440 wide, zoom 100%, no bookmarks bar, no extensions, no other tabs, no notifications.
- [ ] Have a second take ready at 390 wide (phone) — most contractors will watch this on a phone.
- [ ] Type at a normal speed. Do not paste. Watching the words appear is what makes it read as real.

---

## The script

**[0:00–0:12] — Cold open on the demo page, nothing clicked yet.**

> This is the part of my site where you can try the thing before you talk to me. I'm going to use it the way a customer of yours would.

**[0:12–0:25] — Click "AI Receptionist". Click "Landscaping".**

> Six kinds of AI worker, nine trades. I'll take the receptionist for a landscaping company. Now I'm going to play the customer — I'm the person phoning in.

**[0:25–0:55] — Type, slowly, in the input:**

```
Hi, I need a quote for a cedar fence, about 80 feet, in South Surrey.
How much roughly and how soon could someone come look?
```

Let it answer. Do not talk over the response — let the viewer read it.

> Notice what it did there. It didn't just say "someone will call you back". It engaged with the actual job, and it's collecting what I'd need to quote it: the length, the material, where you are.

**[0:55–1:20] — Second message:**

```
Also, do you do chain link? And can you come Saturday?
```

> And here's the part I actually care about.

Let it answer.

> If chain link isn't a service that business offers, it says so, instead of booking an estimate somebody's going to have to phone up and cancel. That's not a limitation I'm apologising for — that's the feature. A receptionist that says yes to everything costs you more than no receptionist.

**[1:20–1:45] — Scroll to whatever the panel captured.**

> On the right it's pulling out the details a real receptionist would write on a pad — name, number, the service, the location. In a live build that lands in your inbox, or your CRM, or wherever you already work.
>
> And it's worth saying plainly: this is a demonstration. It hasn't called anyone, texted anyone, emailed anyone, or booked anything. Nothing here touches a real customer.

**[1:45–2:15] — Stop screen-sharing, or cut to a shot of him.**

> What you're seeing is trained on a made-up landscaping company. A real one gets trained on yours — your services, your prices, your hours, your service area, and the jobs you don't take.
>
> I built this for my own fence company first and put it on my actual business line before I offered it to anybody. It's one fixed quote in Canadian dollars, one person building it, and you own it when it's done.
>
> If you want one, there's a form on the site. Tell me what your phone does when you're on a job, and I'll tell you what I'd build.

**[end card, 3 seconds]**

> aibuiltbyhand.com
> Built by Pavneet Singh · Surrey, BC

---

## Do not say

- "Never miss another call." It is an absolute promise and it is false. His own receptionist missed calls when the carrier failed.
- Any number that was not measured — response times, conversion lifts, jobs booked, hours saved.
- "Trusted by contractors across BC." There are no customers.
- "AI-powered", "seamlessly", "unlock", "transform", "revolutionary", "cutting-edge".
- "Book a call." There is no calendar. The site says "Request".

## Where it goes

The site (near the demo), LinkedIn as a native upload rather than a YouTube link, a Google Business Profile post once the profile is verified, and as the reply when somebody asks "what does it actually sound like". ⟦Owner decision: YouTube as well? It creates a second entity to maintain — worth it only if he will post more than once.⟧
