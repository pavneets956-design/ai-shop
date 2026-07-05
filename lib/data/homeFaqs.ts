// Homepage FAQ content — shared by the client landing (MoltenForge) for render
// and by the server page (app/page.tsx) for FAQPage JSON-LD. Kept in a plain
// (non-"use client") module so the server component can .map() over it safely.
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
