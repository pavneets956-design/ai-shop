// ⚠️ PRICE FLOORS — owner rule, 2026-08-30. Every one-time / setup price here
// must clear the tier floor in lib/data/packages.ts:
//     starter (a single done-for-you AI worker)  >= $1,500
//     business (a connected system)              >= $3,500
//     custom  (a full app)                       >= $10,000
// This file hand-types `priceLabel` and `setupPrice`, which is how five SKUs
// drifted under the floor AND under their own /services/<slug> page — and those
// figures are published to Google as JSON-LD `Offer` prices, not merely shown as
// prose. `tests/shop-pricing.test.ts` fails the build if any row drops below its
// floor again.
//
// RESOLVED 2026-08-30, owner instruction: `ai-customer-reactivation` moved
// $500 → $1,500 and the test exemption was deleted. The owner's test was "if it
// includes done-for-you work, raise it to $1,500; only keep $500 if it is
// honestly a narrowly scoped audit, template or add-on". It is not: Handbuilt
// segments the customer's list, WRITES the personalised email and SMS copy in
// their voice, SENDS the campaign and REPORTS on it. That is done-for-you
// labour, so it takes the floor. What it is NOT is an installed worker — the
// `starter` tag is a pricing bucket here, not a claim that a system is left
// running. The card, the /services page copy, its FAQ and the JSON-LD Offer
// were all moved in the same commit.
//
// STILL OPEN, owner decision — deliberately NOT changed here:
//   - The `managed` monthly SKUs ($99–$349/mo) are subscriptions, not builds, so
//     the build floors arguably should not apply to them at all.
//   - `components/creators/CreatorStudio.tsx` publishes SIX one-time creator
//     tool prices ($500, $500, $700, $700, $900, from $900) that are all under
//     the $1,500 done-for-you floor. They are prose only — no JSON-LD Offer —
//     and they are a different product line (creator software you own, not a
//     business AI worker), so they were left alone rather than tripled without
//     the owner's say-so. `tests/pricing-consistency.test.ts` names them.
//
// Shop storefront catalog — the "ready-to-install" lead products.
// Each maps to an existing /services/<slug> detail page (the SEO engine) where
// one exists, and to a live /demo or /tools page where available.
//
// PRICING MODEL (the important part):
//   - billing "one-time"  → a discrete build we install into the customer's OWN
//     stack and hand over. They run it on THEIR keys, so they pay usage directly
//     (BYOK) and our ongoing cost is ~$0. One-time fee = our build/expertise.
//   - billing "managed"   → an always-on system WE host and run. The AI/usage is
//     included in a monthly fee (no API keys, no surprise bills for the customer).
//   - billing "hybrid"    → a one-time setup/build fee + a monthly to run, monitor
//     and tune a system that keeps working after launch.
// `whoPaysUsage` + `usageNote` make this explicit on every product card so a buyer
// is never surprised by an OpenAI/Twilio bill.

export interface ShopProduct {
  /** Maps to a /services/<slug> landing page where `learnHref` is set. */
  slug: string;
  /** Result-named — describes the outcome, not the tech. */
  name: string;
  /** lucide-react icon name (see lib/icons.ts). */
  icon: string;
  accent: "electric" | "violet" | "cyan" | "gold";
  /** The pain, in the buyer's words. */
  problem: string;
  /** What it does + the result, first sentence. */
  outcome: string;
  forWho: string;
  /** Exact tool names the buyer already uses — makes it feel real. */
  integrations: string[];
  /** Fulfillment model. Handbuilt is done-for-you by default. */
  delivery: "Done-for-you" | "Done-with-you";
  /** Honest time-to-live. */
  timeToLaunch: string;
  /** Pricing model. */
  billing: "one-time" | "managed" | "hybrid";
  /** Headline price label (CAD) shown on the card. */
  priceLabel: string;
  /** Recurring monthly price (CAD) — drives schema + the card's monthly line. */
  monthlyPrice?: number;
  /** One-time setup/build price (CAD), for one-time + hybrid. */
  setupPrice?: number;
  /** Who carries the ongoing AI/usage cost. */
  whoPaysUsage: "customer" | "managed";
  /** One honest line on who pays usage — shown on the card. */
  usageNote: string;
  /** Pricing tier for cross-references + schema baseline. */
  packageId: "starter" | "business" | "custom";
  /** Live demo on this site, if one exists. */
  demoHref?: string;
  /** "How it works" detail page, if one exists (existing /services pages only). */
  learnHref?: string;
  /** Optional badge, e.g. for the flagship. */
  badge?: string;
}

export const shopProducts: ShopProduct[] = [
  {
    slug: "ai-receptionist-setup",
    name: "AI Receptionist",
    icon: "PhoneCall",
    accent: "electric",
    problem: "You miss calls while you're on a job — and those callers dial the next business on the list.",
    outcome:
      "Answers every call and text 24/7, captures the job details, books the appointment into your calendar, and texts back every missed call before the lead goes cold.",
    forWho: "Trades, clinics, salons & local services losing leads to voicemail.",
    integrations: ["Twilio", "Google Calendar", "Your website"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    billing: "managed",
    priceLabel: "From $129/mo · we run it",
    monthlyPrice: 129,
    whoPaysUsage: "managed",
    usageNote:
      "We host the line and include the AI + call usage — one flat monthly, no API keys or surprise phone bills.",
    packageId: "starter",
    demoHref: "/demo",
    learnHref: "/ai-receptionist",
  },
  {
    slug: "ai-quote-generator",
    name: "AI Quote Generator",
    icon: "TrendingUp",
    accent: "gold",
    problem: "Website visitors send vague “how much?” messages, then go cold before you can reply.",
    outcome:
      "Asks the right questions, returns a smart estimate range, and sends you a clean lead with budget, location and urgency.",
    forWho: "Landscapers, movers, cleaners, painters & contractors who quote a lot.",
    integrations: ["Website form", "Google Sheets", "Stripe", "Your CRM"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    billing: "one-time",
    priceLabel: "$1,500 · built for you",
    setupPrice: 1500,
    whoPaysUsage: "customer",
    usageNote:
      "Installed on your own website + accounts — you own it outright and pay any usage directly (usually a few dollars a month).",
    packageId: "starter",
    demoHref: "/demo/quote",
    learnHref: "/services/ai-quote-generator",
  },
  {
    slug: "ai-lead-capture-form",
    name: "AI Lead Capture & Follow-Up",
    icon: "Magnet",
    accent: "violet",
    problem: "New leads sit in your inbox too long, and warm quotes never get a second touch.",
    outcome:
      "Replies instantly, qualifies the lead, and follows up by email or text until they book — so nothing goes cold.",
    forWho: "Anyone losing revenue to slow replies and no follow-up.",
    integrations: ["Gmail / Outlook", "Twilio SMS", "HubSpot / GoHighLevel"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in 2–3 weeks",
    billing: "hybrid",
    priceLabel: "From $3,500 + $99/mo",
    setupPrice: 3500,
    monthlyPrice: 99,
    whoPaysUsage: "customer",
    usageNote:
      "Built into your CRM + messaging on your own accounts; the monthly covers running, monitoring and tuning the follow-up sequences.",
    packageId: "business",
    demoHref: "/demo/lead",
    learnHref: "/services/ai-lead-capture-form",
  },
  {
    slug: "ai-chatbot-for-website",
    name: "AI Website Sales Assistant",
    icon: "Bot",
    accent: "electric",
    problem: "Your website just sits there — visitors leave with questions instead of booking.",
    outcome:
      "A chatbot trained on your business answers FAQs, explains your services, and captures the lead or books the call.",
    forWho: "Any business whose website should be selling, not just informing.",
    integrations: ["Any website", "Gmail", "Google Calendar"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    billing: "one-time",
    priceLabel: "$1,500 · built for you",
    setupPrice: 1500,
    whoPaysUsage: "customer",
    usageNote:
      "Installed on your site and your own OpenAI key — you own it; usage (typically a few dollars a month) is billed to you directly.",
    packageId: "starter",
    demoHref: "/demo/assistant",
    learnHref: "/services/ai-chatbot-for-website",
  },
  {
    slug: "ai-invoice-reminder-system",
    name: "AI Invoice & Payment Nudge",
    icon: "Receipt",
    accent: "cyan",
    problem: "You hate chasing unpaid invoices — so you put it off and get paid late.",
    outcome:
      "Sends polite, on-brand reminders on a schedule until the invoice is paid. No awkward phone calls.",
    forWho: "Service businesses & contractors tired of chasing payments.",
    integrations: ["Stripe", "QuickBooks", "Gmail"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~5 days",
    billing: "one-time",
    priceLabel: "$1,500 · built for you",
    setupPrice: 1500,
    whoPaysUsage: "customer",
    usageNote:
      "Runs on your own Stripe/QuickBooks + email — you own it outright; usage is negligible and billed to you directly.",
    packageId: "starter",
    demoHref: "/demo/nudge",
    learnHref: "/services/ai-invoice-reminder-system",
  },
  {
    slug: "ai-review-engine",
    name: "AI Review Engine",
    icon: "MessagesSquare",
    accent: "violet",
    problem: "You don't ask for reviews consistently, so most happy customers never leave one and your rating under-represents the work.",
    outcome:
      "After every finished job it asks every customer for an honest review, gives everyone the same Google link, and copies you on the feedback so you can follow up.",
    forWho: "Local businesses who live and die by their Google rating.",
    integrations: ["Google Business", "Twilio SMS", "Gmail"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~1 week",
    billing: "hybrid",
    priceLabel: "$1,500 + $49/mo",
    setupPrice: 1500,
    monthlyPrice: 49,
    whoPaysUsage: "customer",
    usageNote:
      "Set up on your Google + messaging accounts; the monthly covers running the request sequence and keeping it tuned.",
    packageId: "starter",
    demoHref: "/tools/review-reply-generator",
    learnHref: "/services/ai-review-engine",
  },
  {
    slug: "ai-customer-reactivation",
    name: "AI Customer Re-Activation",
    icon: "CalendarCheck",
    accent: "gold",
    problem: "Last year's customers are your cheapest source of new jobs — and you've never reached back out.",
    outcome:
      "We turn your past-customer list into a personalized win-back campaign — email and text — that books repeat jobs from people who already trust you.",
    forWho: "Cleaners, detailers, landscapers & clinics with a list sitting idle.",
    integrations: ["Your customer list", "Twilio SMS", "Gmail / Mailchimp"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in ~3 days",
    billing: "one-time",
    priceLabel: "From $1,500 · per campaign",
    setupPrice: 1500,
    whoPaysUsage: "customer",
    usageNote:
      "Run as a one-off campaign on your own list + messaging — you pay only for the texts/emails actually sent (your accounts).",
    packageId: "starter",
    demoHref: "/tools/customer-reactivation",
    learnHref: "/services/ai-customer-reactivation",
  },
  {
    slug: "ai-operations-dashboard",
    name: "AI Operations Dashboard",
    icon: "BarChart3",
    accent: "cyan",
    problem: "Who owes you money? What jobs are behind? Which leads are hottest? The answers are scattered across five apps.",
    outcome:
      "One dashboard you can ask in plain English — it pulls from your invoicing, jobs and leads and answers, so you stop digging through apps.",
    forWho: "Owners running on QuickBooks, a CRM and a calendar that don't talk.",
    integrations: ["QuickBooks", "Your CRM", "Google Calendar", "Stripe"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in 2–3 weeks",
    billing: "managed",
    priceLabel: "From $199/mo + setup",
    monthlyPrice: 199,
    setupPrice: 1500,
    whoPaysUsage: "managed",
    usageNote:
      "We host it and include the AI — one monthly fee, connected to the systems you already use. No keys to manage.",
    packageId: "business",
    learnHref: "/services/ai-operations-dashboard",
  },
  {
    slug: "ai-business-analyst",
    name: "AI Business Analyst",
    icon: "FileSearch",
    accent: "violet",
    problem: "“Why was revenue down this month?” — you feel it, but you can't see why without hours in spreadsheets.",
    outcome:
      "Ask it a question and it checks your invoices, jobs and payments, then explains what changed — with the numbers it used, never a guess.",
    forWho: "Owners who want answers, not another chart to interpret.",
    integrations: ["QuickBooks", "Stripe", "Your CRM"],
    delivery: "Done-for-you",
    timeToLaunch: "Add-on to your dashboard",
    billing: "managed",
    priceLabel: "From $99/mo · add-on",
    monthlyPrice: 99,
    whoPaysUsage: "managed",
    usageNote:
      "An add-on to the Operations Dashboard — hosted by us, AI included in the monthly. Every answer is sourced from your data, never made up.",
    packageId: "business",
    learnHref: "/services/ai-business-analyst",
  },
  {
    slug: "ai-receptionist-os",
    name: "AI Receptionist OS",
    icon: "Headphones",
    accent: "electric",
    problem: "You're stitching together a receptionist, texting, booking, reviews and follow-ups — and still losing leads in the gaps.",
    outcome:
      "One system that answers calls and texts, books jobs, sends quotes, chases reviews and follows up with every lead — run for you, on one dashboard, instead of five tools that don't talk to each other.",
    forWho: "Busy local businesses ready to run the whole front desk on autopilot.",
    integrations: ["Twilio", "Google Calendar", "Your CRM", "Stripe", "Google Business"],
    delivery: "Done-for-you",
    timeToLaunch: "Live in 1–2 weeks",
    billing: "managed",
    priceLabel: "From $349/mo + setup",
    monthlyPrice: 349,
    setupPrice: 1500,
    whoPaysUsage: "managed",
    usageNote:
      "Fully hosted and run by us — calls, texts, booking, reviews and follow-ups in one monthly. No API keys, no surprise bills.",
    packageId: "business",
    badge: "Flagship",
    demoHref: "/start",
    learnHref: "/services/ai-receptionist-os",
  },
];

// Industry tiles — each maps to an existing /industries/<slug> page.
export const shopIndustries: { slug: string; label: string }[] = [
  { slug: "landscaping-ai-automation", label: "Landscaping" },
  { slug: "lawn-care-ai-automation", label: "Lawn care" },
  { slug: "plumber-ai-automation", label: "Plumbers" },
  { slug: "electrician-ai-automation", label: "Electricians" },
  { slug: "hvac-ai-automation", label: "HVAC" },
  { slug: "roofing-ai-automation", label: "Roofers" },
  { slug: "contractor-ai-automation", label: "Contractors" },
  { slug: "cleaning-business-ai-automation", label: "Cleaning" },
  { slug: "moving-company-ai-automation", label: "Movers" },
  { slug: "dental-clinic-ai-automation", label: "Clinics" },
  { slug: "salon-ai-automation", label: "Salons" },
  { slug: "auto-detailing-ai-automation", label: "Auto detailing" },
];
