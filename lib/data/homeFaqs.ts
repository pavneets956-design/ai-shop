import { packagePriceLabel, carePlan } from "./packages";

/**
 * Homepage objection FAQ (2026-08-01 rebuild).
 *
 * Every question here is either a live People-Also-Ask question or a real
 * Reddit thread title collected on 2026-08-01 — see
 * research/search-demand/02-question-trees.md tree 8 and 05-customer-language.md.
 * Nothing is invented, and "does this replace employees?" is deliberately
 * excluded: "Will receptionists be replaced by AI?" is job-seeker intent, and
 * raising it unprompted on a sales page plants a fear the buyer didn't arrive
 * with.
 *
 * The cost answer is kept because `how much does an ai receptionist cost` and
 * `is an ai receptionist worth it` are the site's highest-intent queries
 * (21 first-party impressions at position ~46). Its figures come from
 * lib/data/packages.ts rather than being typed here — hand-typed copies are
 * what produced the P0 pricing contradiction.
 */
export const HOME_OBJECTIONS = [
  {
    q: "Will this annoy my customers?",
    a: "It answers in your business's voice, says it's an assistant when asked, and hands anything awkward straight to you. You approve exactly what it says before it ever speaks to a customer, and you can listen to the calls. If it isn't better than voicemail, it isn't worth installing.",
  },
  {
    q: "How much does an AI receptionist cost in Canada?",
    a: `A one-time install, not a subscription that runs forever. One AI worker is ${packagePriceLabel("starter")} CAD; a connected system of two to four is ${packagePriceLabel("business")} CAD. The care plan is optional, starts at $${carePlan.monthly}/mo, and only exists once something is installed.`,
  },
  {
    q: "Do I keep my phone number?",
    a: "Yes, and it stays in your name. We set the system up on the number you already advertise. If you stop working with us, the number is still yours and still yours to move.",
  },
  {
    q: "Who owns the system and the data?",
    a: "You do. Everything is built inside accounts registered to your business — your Google, your calendar, your CRM, your phone number. You can export your customer data whenever you want, without asking us.",
  },
  {
    q: "What happens if I cancel?",
    a: "The system is in your accounts, so it keeps running; we simply stop maintaining it. There's no contract term on the care plan and no exit fee. We'd rather you leave able to keep what you paid for.",
  },
  {
    q: "Does this work with the tools I already use?",
    a: "That's the usual job. Most contractors already pay for something that was never set up properly. We'd rather make Jobber, your calendar and your inbox work together than sell you another subscription.",
  },
  {
    q: "How long does installation take?",
    a: "A single worker is usually live in about a week. A connected system of two to four is normally two to three weeks, depending on how quickly we can get access to your accounts.",
  },
];

// Legacy homepage FAQ content — retained for the previous (now unrendered)
// MoltenForge landing. Not used by app/page.tsx since the 2026-08-01 rebuild.
export const HOME_FAQS = [
  {
    q: "How much does an AI receptionist cost in Canada?",
    a: "Subscription tools run about $50–$300/month, forever. A Handbuilt AI receptionist is a one-time install from $1,500 CAD — set up, tested, and tuned around your real services, prices, and calendar, then yours to own. An optional care plan ($99–$499/mo) covers hosting, monitoring, usage, and fixes.",
  },
  {
    q: "Aren’t cheap AI receptionists good enough?",
    a: "The software is cheap and often capable — many tools can answer calls, book jobs, and sync to a CRM. The hard part isn’t the tool; it’s the setup: your services, prices, service area, calendar rules, and the edge cases that decide whether it books correctly and sounds like you. That’s what I do — and I test it on real calls before it ever touches a customer.",
  },
  {
    q: "What do I own after the build?",
    a: "You own the prompts, workflows, documentation, and any custom code. Third-party tools like Jobber, Twilio, OpenAI, and hosting stay separate if they’re used. No lock-in — if you ever leave the care plan, the system is still yours and I hand over hosting and docs.",
  },
  {
    q: "How fast is it live?",
    a: "Single workers go live in about 5 business days. Multi-worker business systems take 1–3 weeks. You test a real working demo before you pay the final invoice.",
  },
  {
    q: "Do you work with my trade?",
    a: "Landscaping, lawn care, fencing, decks, cleaning, HVAC, plumbing, electrical, and general contracting — across Surrey, Delta, and the rest of BC. If your business runs on calls, quotes, and invoices, the same workers fit.",
  },
  {
    q: "Do I have to pay for the first call?",
    a: "No — it starts with a free 10-minute fit check to see if there’s a real system worth mapping. If we both agree there is, the $99 workflow audit is a paid 15-minute call where I map where you’re losing calls, quotes, and hours — and which worker fixes it first. That $99 is credited toward your build if you go ahead.",
  },
];
