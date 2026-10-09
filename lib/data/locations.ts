import type { LandingContent } from "./landing";
import {
  BUILD_AND_PHONE_PRICING,
  PHONE_PRICE_LABEL,
  PHONE_PRICE_SENTENCE,
  PHONE_SCOPE_SENTENCE,
  PHONE_EXCLUSIONS_SENTENCE,
} from "./packages";

// Local SEO / GEO pages. Handbuilt is built in Surrey/Delta BC and works with
// businesses across the Lower Mainland in person and remotely across Canada.
// No fabricated client counts, no fake addresses — the trust angle is honest:
// one local builder, fixed CAD pricing, real service area. Every scenario is
// hypothetical. related[] points only to pages that exist.
export const locations: LandingContent[] = [
  {
updatedAt: "2026-09-27",
    slug: "ai-automation-agency-surrey-bc",
    eyebrow: "Location",
    h1: "AI Automation Agency in Surrey, BC",
    title: "AI Automation Agency in Surrey, BC | Handbuilt",
    description:
      `Handbuilt builds AI receptionists, chatbots, and automations for Surrey small businesses. Local builder, fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    answer:
      `Handbuilt is a one-person AI automation studio based in Surrey/Delta BC. Pavneet builds custom AI receptionists, quote agents, chatbots, and workflow automations for Surrey small businesses — trades, clinics, salons, real estate, and service companies. Fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}. You talk to the builder, not a sales rep.`,
    pain:
      "Most Surrey small businesses don't need another AI subscription — they need someone local who'll actually build the thing around how their business runs, stand behind it, and be reachable when something needs a tweak. Big agencies hand you off; generic SaaS half-fits and leaves the setup to you.",
    scenario:
      "Say a Surrey home-services company is fielding calls all day from job sites and losing the after-hours ones to voicemail. An AI receptionist could answer when the crew can't, take the caller's details and callback request, and email the owner a summary — while a separately built follow-up agent chases quiet quotes until they turn into a yes or a no.\n\nThe exact payback depends on call volume and how many missed callers would have waited for a callback, but for a local trade the fastest wins are usually missed-call recovery and same-day quotes.",
    steps: [
      "Discovery call — 30 minutes to map where your time and leads leak, and which AI worker pays back fastest.",
      "Scoped proposal — a flat CAD price with exactly what gets built, what it connects to, and the outcome.",
      "Build & test — Pavneet builds it around your real services, prices, and hours, and tests it on your actual workflow.",
      "Handoff & support — you get the working system plus an optional $99/mo Care Plan for monitoring and tweaks.",
    ],
    gets: [
      "A custom AI worker built around your Surrey business — not a template",
      "One local builder accountable start to finish",
      "Fixed CAD pricing, no surprise invoices",
      "Trained on your real services, pricing, hours, and FAQs",
      "Connected to the tools you already use (calendar, CRM, forms)",
      "In-person or fully remote — whichever you prefer",
    ],
    sections: [
{
  "heading": "Search visibility and enquiries in Surrey, BC",
  "body": "If prospective customers are not finding the business, an answering workflow may not be the first task. Review the service information, actual area covered and the route from a search result to a received request. Use Surrey, BC clearly where location matters so the business is not confused with another Surrey.\n\nHandbuilt can scope website and search-information improvements alongside enquiry handling. The proposal separates discovery work from receptionist or automation integrations and explains what will be checked."
},
      {
        heading: "Who we build for in Surrey",
        body: "Surrey runs on service businesses — trades and home services, clinics and dental offices, salons, restaurants, real estate, and local professional services. If your team repeats the same phone calls, quotes, bookings, and follow-ups every day, there's usually an AI worker that pays for itself inside the first season.",
        bullets: [
          "Trades & home services: plumbing, HVAC, electrical, roofing, fencing, cleaning",
          "Clinics, dental, and health offices needing front-desk and booking help",
          "Salons, restaurants, and appointment-based businesses",
          "Real estate, mortgage, and insurance brokers who live on speed-to-lead",
        ],
      },
      {
        heading: "Why local matters here",
        body: "You're not opening a support ticket with an offshore team. You're working with one builder in the Lower Mainland who picks up, understands a Surrey trade's schedule and pricing, and can meet in person if that's easier. The trade-off is that Handbuilt takes on fewer projects at once — that's intentional, so each build gets done properly.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation agency surrey bc",
      "ai automation surrey",
      "ai receptionist surrey",
      "ai for small business surrey",
      "surrey ai developer",
    ],
    related: [
{
  "label": "AI search visibility service",
  "href": "/services/ai-search-visibility"
},
{
  "label": "Business profile checklist",
  "href": "/resources/google-business-profile-checklist-for-trades"
},
      { label: "AI Receptionist in Surrey, BC", href: "/locations/ai-receptionist-surrey-bc" },
      { label: "Custom AI Apps in Surrey", href: "/locations/custom-ai-apps-surrey" },
      { label: "AI Automation in Delta, BC", href: "/locations/ai-automation-delta-bc" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Are you actually based in Surrey?",
        a: "Yes — Handbuilt is run by Pavneet out of the Surrey/Delta area. Most work is done remotely, but for local businesses an in-person discovery or handoff meeting is easy to arrange.",
      },
      {
        q: "Do you only work with Surrey businesses?",
        a: "No. Surrey and the Lower Mainland are home base, but builds are delivered remotely across Canada. The process is the same whether you're down the road or in another province.",
      },
      {
        q: "What does it cost to get started?",
        a: `A single AI worker (chatbot, quote intake, or review replies) starts at $1,500 CAD and is usually live in about 5 business days. Larger multi-worker systems run $3,500–$7,500. The AI phone receptionist is priced separately at ${PHONE_PRICE_LABEL} CAD launch pricing.`,
      },
      {
        q: "Which AI worker should a Surrey business start with?",
        a: "Usually the one tied to lost revenue — for most local trades that's an AI receptionist to stop missed-call jobs, or a quote agent to send same-day quotes. The discovery call is there to figure out the fastest payback for your specific setup.",
      },
      {
        q: "Do I own what you build?",
        a: "Yes. You own the system and the setup outright. The optional $99/mo Care Plan covers hosting, monitoring, and monthly tweaks, but it's not required to keep using what you paid for.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-delta-bc",
    eyebrow: "Location",
    h1: "AI Automation in Delta, BC",
    title: "AI Automation for Delta, BC Businesses | Handbuilt",
    description:
      `AI receptionists, chatbots, and automations for Delta, Ladner, and Tsawwassen small businesses. Local builder in Surrey/Delta, fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    answer:
      `Handbuilt builds custom AI workers for Delta businesses — including Ladner, Tsawwassen, and North Delta — from its Surrey/Delta base. AI receptionists, quote agents, chatbots, and follow-up automations, trained on your real business, with fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}. One local builder, no agency handoff.`,
    pain:
      "Delta's mix of trades, farms, marine, and local shops runs lean — often the owner is the receptionist, the salesperson, and the one chasing invoices at night. Off-the-shelf AI tools rarely fit that reality, and hiring more admin is expensive. A purpose-built AI worker fills the gaps without adding payroll.",
    scenario:
      "Say a Ladner landscaping company gets a wave of spring quote requests it can't return fast enough, and a few after-hours calls slip to voicemail every week. An AI quote agent could turn each inquiry into a same-day priced quote, and an AI receptionist could catch the calls that would otherwise go to whoever answers first.\n\nHow much that's worth depends on how many of those quiet leads would have booked — but slow quotes and missed calls are usually where a seasonal local business leaks the most.",
    steps: [
      "Discovery call — map your busiest time drains and the leads most likely to slip.",
      "Scoped proposal — a flat CAD price and a clear picture of what gets built.",
      "Build & test — trained on your Delta business's real services, prices, and calendar.",
      "Handoff & support — working system, plus an optional $99/mo Care Plan.",
    ],
    gets: [
      "An AI worker built for how your Delta business actually runs",
      "One builder in the Lower Mainland, reachable directly",
      "Fixed CAD pricing with no per-seat fees",
      "Trained on your services, pricing, and hours",
      "Connected to your existing calendar, CRM, or forms",
      "Remote or in-person — your call",
    ],
    sections: [
      {
        heading: "Built for Delta's local businesses",
        body: "Ladner, Tsawwassen, and North Delta are full of owner-run trades, home services, clinics, and shops where every missed call or slow quote is a real job lost. Handbuilt focuses on the one or two automations that recover the most time or revenue first, rather than selling you a platform you have to learn.",
        bullets: [
          "Trades and seasonal services (landscaping, cleaning, HVAC, fencing)",
          "Clinics, dental, and appointment-based businesses",
          "Local retail and professional services",
          "Real estate and brokers who need fast lead follow-up",
        ],
      },
      {
        heading: "Same builder, whether you're in Delta or beyond",
        body: "Delta and neighbouring Surrey are home base, so in-person meetings are simple. But every build is delivered the same careful way remotely too — most of the work happens over calls, email, and a shared plan, so location never limits the quality of the result.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation delta bc",
      "ai receptionist delta",
      "ai for small business ladner tsawwassen",
      "delta bc ai developer",
      "ai automation lower mainland",
    ],
    related: [
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "AI Automation in Langley, BC", href: "/locations/ai-automation-langley-bc" },
      { label: "AI for Landscaping", href: "/industries/landscaping-ai-automation" },
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Do you serve Ladner and Tsawwassen specifically?",
        a: "Yes. Handbuilt is based in the Surrey/Delta area, so all of Delta — Ladner, Tsawwassen, and North Delta — is home turf. In-person meetings are easy; remote works just as well.",
      },
      {
        q: "I'm a seasonal business — is AI worth it year-round?",
        a: "Often the biggest win is handling the seasonal rush without hiring temporary admin. A quote agent is a one-time build that can sit quiet in the off-season. The AI phone receptionist has a monthly fee, but it is month-to-month rather than a long contract.",
      },
      {
        q: "What's the smallest thing you'll build?",
        a: `A single focused AI worker for $1,500 CAD — for example, one that turns website inquiries into same-day quotes. For calls, the AI phone receptionist is a separate offer at ${PHONE_PRICE_LABEL} CAD launch pricing.`,
      },
      {
        q: "Can you connect to the tools I already use?",
        a: "In most cases yes — calendars, CRMs, booking systems, and web forms are common connections. Exact integrations are confirmed on the discovery call so nothing is promised that can't be delivered.",
      },
      {
        q: "Do I have to sign a monthly contract?",
        a: "Not for a build — that is a one-time cost that you own, and the $99/mo Care Plan is optional. The AI phone receptionist is the exception: it has a monthly fee, month-to-month.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-vancouver",
    eyebrow: "Location",
    h1: "AI Automation for Vancouver Businesses",
    title: "AI Chatbots & Answering Services for Vancouver Businesses | Handbuilt",
    description:
      `Custom AI receptionists, chatbots, and automations for Vancouver small businesses. Lower Mainland builder, fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    answer:
      `Handbuilt builds custom AI workers for Vancouver small businesses — receptionists, chatbots, quote agents, and workflow automations trained on your real business. Based in the Lower Mainland with fixed CAD pricing (${BUILD_AND_PHONE_PRICING}), it's a one-builder alternative to agencies and generic SaaS: you own what's built, and you talk to the person building it.`,
    pain:
      "Vancouver businesses are pitched AI constantly, and most of it is either a generic subscription or an agency retainer that bills for a whole team. What's missing is someone who'll build one thing that fits your workflow, get it live quickly, and be straight about what AI can and can't do for you.",
    scenario:
      "Say a Vancouver clinic or studio is losing new-client inquiries because the front desk can't answer every call and message during busy hours. An AI phone receptionist could answer common questions and take callers' details, and a separately scoped booking assistant could offer open appointment slots and send reminders — so fewer prospects drift to the next result on Google.\n\nThe real gain depends on how many inquiries currently go unanswered, but for appointment-based Vancouver businesses that's often the leak worth closing first.",
    steps: [
      "Discovery call — pinpoint the workflow costing you the most time or leads.",
      "Scoped proposal — flat CAD price, clear scope, and expected outcome.",
      "Build & test — trained on your real services and tested on your actual process.",
      "Handoff & support — you own the system; optional $99/mo Care Plan available.",
    ],
    gets: [
      "A custom AI worker fitted to your Vancouver business",
      "Direct access to the builder — no account managers",
      "Fixed CAD pricing instead of open-ended retainers",
      "Trained on your services, pricing, and hours",
      "Integrated with your existing calendar, CRM, or site",
      "Delivered fully remote, or in person around the Lower Mainland",
    ],
    sections: [
      {
        heading: "AI that fits a Vancouver business",
        body: "From clinics and salons to trades, restaurants, real estate, and professional services, the common thread is repetitive front-office work: answering the same questions, booking, quoting, and following up. Handbuilt builds the specific AI worker that removes the most of that work for you — not a one-size platform.",
        bullets: [
          "Appointment businesses: clinics, dental, salons, studios",
          "Home services and trades across the city",
          "Real estate, mortgage, and insurance brokers",
          "Restaurants and local retail handling constant inquiries",
        ],
      },
      {
        heading: "Remote-first, Lower Mainland based",
        body: "Most Vancouver builds happen remotely — calls, email, and a shared plan — which keeps things fast and keeps costs down. Because Handbuilt is based nearby in Surrey/Delta, in-person meetings are still an option when they help.",
      },
    ],
    packageId: "business",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation vancouver",
      "ai receptionist vancouver",
      "ai chatbot developer vancouver",
      "ai for small business vancouver",
      "vancouver ai automation agency",
    ],
    related: [
      { label: "AI Chatbot Developer in Vancouver", href: "/locations/ai-chatbot-developer-vancouver" },
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "AI Booking & Bookings", href: "/services/ai-calendar-booking-agent" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Do you have a Vancouver office?",
        a: "Handbuilt is based in Surrey/Delta, not downtown Vancouver, and works with Vancouver businesses remotely and in person. Most projects run remotely; in-person meetings are easy to arrange across the Lower Mainland.",
      },
      {
        q: "How is this different from a Vancouver AI agency?",
        a: "You work directly with one builder instead of a project manager and a team. That means faster decisions and fixed CAD pricing rather than a monthly retainer — the trade-off being fewer projects taken on at once.",
      },
      {
        q: "How fast can something go live?",
        a: "A single AI worker is typically live in about 5 business days. A connected multi-worker system usually takes 2–3 weeks depending on integrations.",
      },
      {
        q: "Can you build something customer-facing on our website?",
        a: "Yes — a website chatbot or booking assistant trained on your business is one of the most common Vancouver requests. See the chatbot developer page for detail.",
      },
      {
        q: "What will it cost?",
        a: "One AI worker starts at $1,500 CAD. A full business system with 2–4 connected workers runs $3,500–$7,500, and a fully custom app starts at $10,000.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-langley-bc",
    eyebrow: "Location",
    h1: "AI Automation in Langley, BC",
    title: "AI Answering Service & Automation in Langley, BC | Handbuilt",
    description:
      `AI receptionists, quote agents, and automations for Langley small businesses and trades. Local Lower Mainland builder, fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    answer:
      `Handbuilt builds custom AI workers for Langley businesses — City and Township — from its Surrey/Delta base. AI receptionists, quote agents, chatbots, and follow-up automations, trained on your real business, with fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}. One local builder handles the whole thing.`,
    pain:
      "Langley's trades, home services, and growing local businesses often run on a phone that never stops and a quote list that never gets shorter. Adding admin staff is costly, and generic AI tools don't understand a contractor's schedule. A purpose-built AI worker handles the repetitive front-office load without new payroll.",
    scenario:
      "Say a Langley contractor is on job sites all day and misses a handful of new-customer calls every week, plus a stack of quote requests that don't get answered until the weekend. An AI receptionist could answer those calls and email the contractor each caller's details and callback request, while a separately built quote agent turns inquiries into same-day priced quotes.\n\nThe payback depends on how many of those missed calls and slow quotes would have become jobs — but for a busy Langley trade, that's usually the first leak worth plugging.",
    steps: [
      "Discovery call — find where calls, quotes, and follow-ups are slipping.",
      "Scoped proposal — a flat CAD price and a clear build scope.",
      "Build & test — trained on your Langley business's real services and prices.",
      "Handoff & support — working system, optional $99/mo Care Plan.",
    ],
    gets: [
      "An AI worker built around your Langley business",
      "One builder accountable end to end",
      "Fixed CAD pricing, no per-seat fees",
      "Trained on your services, pricing, and hours",
      "Connected to your calendar, CRM, or forms",
      "Remote or in-person across the Lower Mainland",
    ],
    sections: [
      {
        heading: "Made for Langley trades and local businesses",
        body: "Langley has a heavy concentration of trades and home services alongside clinics, retail, and professional offices. The fastest wins are almost always the same: stop missing calls, send quotes faster, and follow up on leads that go quiet. Handbuilt builds the specific worker that does that for your business.",
        bullets: [
          "Contractors and trades: HVAC, electrical, plumbing, roofing, fencing, decks",
          "Home and property services",
          "Clinics, dental, and appointment businesses",
          "Real estate and brokers who need speed-to-lead",
        ],
      },
      {
        heading: "Local builder, honest scope",
        body: "You get one builder in the Lower Mainland who's straight about what AI will and won't do for your business, prices it flat in CAD, and builds it around your real workflow. In-person meetings are simple given the short distance from Surrey/Delta.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation langley bc",
      "ai receptionist langley",
      "ai for contractors langley",
      "langley ai developer",
      "ai automation fraser valley",
    ],
    related: [
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "AI Automation in Abbotsford", href: "/locations/ai-automation-abbotsford" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "AI for Contractors", href: "/industries/contractor-ai-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Do you cover both Langley City and the Township?",
        a: "Yes — all of Langley is within the Lower Mainland service area. Handbuilt is based nearby in Surrey/Delta, so in-person meetings are straightforward and remote delivery is always available.",
      },
      {
        q: "I'm a contractor — will this actually fit how I work?",
        a: "That's the point of building around your business. The AI worker is set up with your services, service area and approved answers. There's a dedicated AI receptionist for contractors page with the specifics, including what the phone receptionist does not do.",
      },
      {
        q: "How much does it cost to start?",
        a: `One focused custom build starts at $1,500 CAD and is usually live in about 5 business days. A connected multi-worker system runs $3,500–$7,500. ${PHONE_PRICE_SENTENCE}`,
      },
      {
        q: "Can it text customers back automatically?",
        a: "Not as part of the AI phone receptionist, which emails you a call summary. Text-message follow-up is a separate build, quoted on its own after the channel and consent rules are confirmed.",
      },
      {
        q: "Is there a lock-in?",
        a: "No. You own a build, and the $99/mo Care Plan is optional. The AI phone receptionist is month-to-month.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-abbotsford",
    eyebrow: "Location",
    h1: "AI Automation in Abbotsford",
    title: "AI Answering Service & Automation in Abbotsford, BC | Handbuilt",
    description:
      `AI receptionists, quote agents, and automations for Abbotsford and Fraser Valley businesses. Fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    answer:
      `Handbuilt builds custom AI workers for Abbotsford and Fraser Valley businesses — receptionists, quote agents, chatbots, and follow-up automations trained on your real business. Fixed CAD pricing (${BUILD_AND_PHONE_PRICING}), delivered remotely or in person from the nearby Surrey/Delta base. You work with one builder.`,
    pain:
      "Abbotsford runs on agriculture, trades, and family-owned businesses where the owner wears every hat. There's rarely time to research and wire up AI tools, and a generic subscription doesn't understand a Fraser Valley operation. A built-for-you AI worker takes the repetitive calls, quotes, and follow-ups off your plate.",
    scenario:
      "Say an Abbotsford trades or agricultural-services business gets seasonal surges of calls and quote requests that overwhelm whoever's near the phone. An AI receptionist could answer and triage calls, and a separately built quote agent could send priced quotes the same day instead of the next week.\n\nWhether that's worth it depends on how many rushed-season leads currently go cold — but for a busy Fraser Valley business, catching those is usually the clearest win.",
    steps: [
      "Discovery call — map the busiest, most repetitive parts of your day.",
      "Scoped proposal — flat CAD price and a clear scope.",
      "Build & test — trained on your real services and tested on your workflow.",
      "Handoff & support — you own it; optional $99/mo Care Plan.",
    ],
    gets: [
      "An AI worker built for your Abbotsford business",
      "One builder handling the whole project",
      "Fixed CAD pricing, no per-seat subscriptions",
      "Trained on your services, pricing, and hours",
      "Connected to your existing tools",
      "Remote delivery, with in-person options nearby",
    ],
    sections: [
      {
        heading: "Built for Fraser Valley businesses",
        body: "Abbotsford's mix of agriculture, trades, home services, clinics, and local retail shares the same pressure points: calls that get missed, quotes that go out too slow, and leads that never get chased. Handbuilt builds the one AI worker that removes the most of that load for your specific operation.",
        bullets: [
          "Trades and home services",
          "Agricultural and seasonal service businesses",
          "Clinics, dental, and appointment-based businesses",
          "Local retail and professional services",
        ],
      },
      {
        heading: "Distance is not a problem",
        body: "Abbotsford is an easy remote build — most of the work happens over calls, email, and a shared plan. Because Handbuilt is based in Surrey/Delta, an in-person meeting in the Fraser Valley is still simple when it helps.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation abbotsford",
      "ai receptionist abbotsford",
      "ai for small business fraser valley",
      "abbotsford ai developer",
      "ai automation bc",
    ],
    related: [
      { label: "AI Automation in Langley, BC", href: "/locations/ai-automation-langley-bc" },
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Do you work with Abbotsford businesses if you're based in Surrey?",
        a: "Yes. Abbotsford and the Fraser Valley are part of the regular service area. Most builds are delivered remotely, and in-person meetings are easy given the short drive from Surrey/Delta.",
      },
      {
        q: "My business is seasonal — does that change anything?",
        a: "Mainly for the better: an AI worker can absorb your peak-season rush without you hiring temporary staff, and there's no per-seat fee forcing cost in the quiet months since the build is a one-time purchase.",
      },
      {
        q: "What's the entry price?",
        a: "$1,500 CAD for one AI worker, usually live in about 5 business days. Multi-worker systems run $3,500–$7,500, and custom apps starts at $10,000.",
      },
      {
        q: "Will it connect to the software I already use?",
        a: "Usually yes — calendars, CRMs, and web forms are common. The exact integrations are confirmed on the discovery call.",
      },
      {
        q: "Is a monthly plan required?",
        a: "Not for a build — it is yours to keep, and the $99/mo Care Plan is optional. The AI phone receptionist does have a monthly fee, month-to-month.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    "updatedAt": "2026-10-03",
    "eyebrow": "Local business systems",
    "schema": "Service",
    "ctaLabel": "Request a scoped proposal",
    "ctaHeading": "Start with the enquiry you want to handle better",
    "ctaDescription": "Send your website, service area and an example of the request or task you want help with. Pavneet will review the fit and reply with a proposed next step.",
    "slug": "ai-receptionist-surrey-bc",
    "packageId": "phone",
    "h1": "AI Receptionist in Surrey, BC",
    "title": "AI Receptionist in Surrey, BC",
    "searchTitle": "AI Receptionist Surrey BC | Call Handling & Setup",
    "description": `AI receptionist for Surrey businesses: handle routine calls, capture requests and hand callers to a person. ${PHONE_PRICE_LABEL} CAD launch pricing.`,
    "answer": `Handbuilt AI sets up AI phone receptionists for Surrey businesses that need help with incoming calls. Start with the calls you miss, the questions you repeat and the requests that need a person. Pavneet, a builder based in Surrey, configures the call flow, tests the handoff and runs test calls before handover. ${PHONE_PRICE_SENTENCE}`,
    "pain": "When you are working on a job, answering every call may be difficult. A useful receptionist needs to do more than reply quickly: it must collect the right details, respect your service area and give callers a reliable route to a person.",
    "steps": [
      "Send your website, hours, service area and the calls you want help with.",
      "Review the proposed scope, existing phone tools and what needs a human.",
      "Build and test routine questions, missed-call handling and notification delivery.",
      "Approve the tested workflow and receive handover instructions."
    ],
    "gets": [
      "A defined call or enquiry workflow",
      "Answers based on the business information you approve",
      "Request details and a tested human handoff",
      `Fixed terms: ${PHONE_PRICE_LABEL} CAD, month-to-month`
    ],
    "sections": [
      {
        "heading": "Handle requests without promising a booking",
        "body": "For a Surrey trades business, a useful first step may be collecting the type of job, the area and a callback request. The assistant should not promise availability, an estimate or a confirmed visit that your business has not approved.\n\nIf you want calendar booking, we first check the calendar provider, availability rules and what confirmation really means. That integration is agreed separately in the scope.",
        "bullets": [
          "Routine questions about services, hours and areas served",
          "Quote requests for a person to review",
          "Clear escalation when a question is outside the approved information"
        ]
      },
      {
        "heading": "Built by a trades business owner",
        "body": "Pavneet runs Ironwood Grounds, his own fence business, and built and tested an AI phone receptionist on its business line. He later moved that line to a human-first setup.\n\nThat hands-on work informs how he scopes call routing, handles delivery failures and tests the route back to a person. Read more about his background on the About page."
      },
      {
        "heading": "Check the actual phone setup before launch",
        "body": "A website text demo can show a conversation, but it does not verify your business phone line. Your setup needs tests of call routing, unanswered calls, summary delivery and the path back to a person, and it goes live only after those test calls pass. The launch date is confirmed once your phone provider and forwarding are checked."
      },
      {
        "heading": "What the price covers",
        "body": `${PHONE_SCOPE_SENTENCE}\n\n${PHONE_EXCLUSIONS_SENTENCE}`
      },
      {
        "heading": "If the problem is getting found",
        "body": "A receptionist helps with enquiries that already arrive. If few people discover your business, review the service information and search visibility first. Our AI search visibility service covers how customers find and understand the business on Google and in AI answers."
      }
    ],
    "secondaryCta": {
      "label": "See the builder’s background",
      "href": "/about"
    },
    "keywords": [
      "ai receptionist surrey bc",
      "ai phone answering surrey",
      "virtual receptionist surrey",
      "surrey ai receptionist setup"
    ],
    "related": [
      {
        "label": "AI receptionist scope and options",
        "href": "/ai-receptionist-for-contractors"
      },
      {
        "label": "Help customers find you in AI answers",
        "href": "/services/ai-search-visibility"
      },
      {
        "label": "AI receptionist costs",
        "href": "/resources/ai-receptionist-cost"
      },
      {
        "label": "Meet Pavneet",
        "href": "/about"
      }
    ],
    "faqs": [
      {
        "q": "Can you connect an AI receptionist to my business phone?",
        "a": "A phone workflow can be scoped after reviewing your current provider and routing. We confirm which connections are supported and test the real call path before handover."
      },
      {
        "q": "Will callers know they are speaking with AI?",
        "a": "The greeting should clearly identify the assistant as AI. Callers need a clear route to a person when the assistant cannot help."
      },
      {
        "q": "How much does an AI receptionist cost in Surrey?",
        "a": PHONE_PRICE_SENTENCE
      },
      {
        "q": "Can it book appointments?",
        "a": "Not in the standard receptionist — it captures a callback request for your team to confirm. A calendar integration is quoted separately after checking availability rules and what confirmation means."
      },
      {
        "q": "How do I get started?",
        "a": "Send a request with your website, hours, service area and examples of the calls you want help with. We reply with a proposed next step; the request form does not reserve a meeting."
      }
    ],
    "icon": "Phone"
  },
  {
    slug: "ai-chatbot-developer-vancouver",
    eyebrow: "Location",
    h1: "AI Chatbot Developer in Vancouver",
    title: "Custom AI Chatbot Development in Vancouver, BC | Handbuilt",
    description:
      "Custom AI chatbots for Vancouver businesses — trained on your services to answer customers and capture leads 24/7. Fixed CAD pricing from $1,500.",
    answer:
      "Handbuilt is a Lower Mainland AI chatbot developer building custom website and messaging chatbots for Vancouver businesses. Each bot is trained on your real services, pricing, hours, and FAQs to answer customers and capture leads around the clock. Fixed CAD pricing starts at $1,500, and you own the finished bot — not a rented widget.",
    pain:
      "A generic chatbot widget that answers everything with \"I'll connect you to a human\" just annoys Vancouver customers and adds no value. What actually helps is a bot that knows your business, gives real answers, and captures the lead's details when someone's ready to buy — without a monthly per-conversation meter.",
    scenario:
      "Say a Vancouver service business gets steady website traffic but few inquiries because visitors can't get a quick answer after hours. A chatbot trained on the business could answer the common pre-sales questions, qualify the visitor, and capture their details or book a call — turning quiet traffic into actual leads.\n\nThe lift depends on how much of your traffic arrives with a question you already answer by email — but that's often where a well-built chatbot pays back.",
    steps: [
      "Discovery call — review your site, your FAQs, and what a good lead looks like.",
      "Scoped proposal — a flat CAD price and the exact scope of the bot.",
      "Build & test — trained on your content and tested against real questions.",
      "Handoff & support — embedded on your site; optional $99/mo Care Plan.",
    ],
    gets: [
      "A chatbot trained on your Vancouver business, not a generic script",
      "Answers pre-sales questions accurately, 24/7",
      "Captures leads and can book calls or appointments",
      "Embedded on your website or messaging channels",
      "You own the build — no per-conversation SaaS meter",
      "Fixed CAD pricing from $1,500",
    ],
    sections: [
      {
        heading: "What a custom Vancouver chatbot does",
        body: "It answers the questions your customers actually ask, in your wording, and hands off cleanly when a human is genuinely needed. Instead of a decision-tree bot, it uses a language model grounded in your real business content, so answers are relevant rather than robotic — and it captures the lead when the conversation is ready.",
        bullets: [
          "Answering service, pricing, hours, and area questions",
          "Qualifying visitors and capturing their contact details",
          "Booking a call or appointment when there's intent",
          "Routing genuinely complex questions to you",
        ],
      },
      {
        heading: "Local developer, real ownership",
        body: "You work directly with the developer building the bot, and you keep the finished system. For deeper needs — connecting the chatbot to your CRM, booking tool, or a custom workflow — it can grow into a larger AI system rather than hitting a plan ceiling.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai chatbot developer vancouver",
      "custom chatbot vancouver",
      "website chatbot small business vancouver",
      "ai chatbot for business bc",
      "vancouver chatbot development",
    ],
    related: [
      { label: "AI Chatbot for Small Business", href: "/ai-chatbot-for-small-business" },
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "AI Chatbot for Your Website", href: "/services/ai-chatbot-for-website" },
      { label: "AI Automation for Vancouver Businesses", href: "/locations/ai-automation-vancouver" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What kind of chatbot do you build?",
        a: "A custom chatbot grounded in your own business content — services, pricing, hours, and FAQs — so it gives real answers instead of generic ones. It can live on your website and, if you want, your messaging channels.",
      },
      {
        q: "Do you work with Vancouver businesses in person?",
        a: "Handbuilt is based in Surrey/Delta and works with Vancouver businesses both remotely and in person. Most chatbot builds run remotely since everything needed is your website content and answers.",
      },
      {
        q: "How much does a custom chatbot cost?",
        a: "A focused chatbot starts at $1,500 CAD as a one-time build, plus small AI usage fees. Connecting it to your CRM or booking system, or building a larger multi-worker system, runs $3,500–$7,500.",
      },
      {
        q: "Can the chatbot capture leads, not just answer questions?",
        a: "Yes — capturing the visitor's details and booking a call or appointment when there's intent is a core part of the build. That's usually where the return comes from.",
      },
      {
        q: "Do I own the chatbot?",
        a: "Yes. You own the finished build rather than renting a widget with a per-conversation fee. The optional $99/mo Care Plan covers monitoring and updates.",
      },
    ],
    schema: "Service",
    icon: "MessageSquare",
  },
  {
    slug: "custom-ai-apps-surrey",
    eyebrow: "Location",
    h1: "Custom AI Apps in Surrey",
    title: "Custom AI App Development in Surrey | Handbuilt",
    description:
      "Custom AI apps, portals, and internal tools for Surrey and BC businesses. Built by one developer around your data and rules. From $10,000 CAD, you own the code.",
    answer:
      "Handbuilt builds custom AI apps for Surrey businesses — internal tools, customer portals, and AI-powered software built around your data, rules, and workflow. It's a done-for-you build by one local developer, starting at $10,000 CAD, on a modern stack you own outright. Best when off-the-shelf tools no longer fit how you operate.",
    pain:
      "When a Surrey business outgrows spreadsheets and stitched-together SaaS, the usual options are a costly agency or an offshore team you can't reach. Both make it hard to get software that actually matches your process. A single local developer building around your real workflow is often the more direct path.",
    scenario:
      "Say a Surrey company is running a core part of its operation across spreadsheets, email, and three subscriptions that don't talk to each other — and staff waste hours reconciling them. A custom AI app could unify that into one tool with the AI logic, database, and admin built for exactly how the business runs.\n\nWhat it's worth depends on how many hours that manual juggling costs each week, but consolidating a broken process is often where custom software pays back.",
    steps: [
      "Discovery call — map the workflow, data, and rules the app has to handle.",
      "Scoped proposal — a clear plan and price, typically starting from $10,000 CAD.",
      "Build & test — the app, database, and AI logic built and tested on your real process.",
      "Handoff & support — you own the code; 60 days support plus an optional Care Plan.",
    ],
    gets: [
      "A custom app, portal, or internal tool built for your business",
      "AI logic built around your real data and rules",
      "Accounts, database, admin, and integrations as needed",
      "Built on a modern stack you own — code and all",
      "One local developer accountable for the whole build",
      "60 days of support after launch",
    ],
    sections: [
      {
        heading: "When a custom AI app is the right call",
        body: "Custom makes sense once the workarounds cost more than the build — when you're duct-taping SaaS tools together, paying per-seat fees that compound, or handling a process no off-the-shelf product supports. Below that threshold, a smaller AI worker or an existing tool is usually the smarter start, and Handbuilt will say so.",
        bullets: [
          "You've outgrown spreadsheets and disconnected subscriptions",
          "Your process has rules or data a generic tool can't handle",
          "You need a customer portal or internal tool that's truly yours",
          "You want to own the software, not rent it forever",
        ],
      },
      {
        heading: "Local build, full ownership",
        body: "You work directly with the developer, in person around Surrey and the Lower Mainland or remotely, and you keep everything that's built. There's no lock-in to a proprietary platform — the app runs on a modern stack you control.",
      },
    ],
    packageId: "custom",
    ctaLabel: "Scope a custom build",
    keywords: [
      "custom ai app development surrey",
      "custom software developer surrey bc",
      "ai app builder surrey",
      "custom ai tools bc",
      "internal tool developer surrey",
    ],
    related: [
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "Custom AI Tool vs Off-the-Shelf SaaS", href: "/compare/custom-ai-tool-vs-saas" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What counts as a custom AI app?",
        a: "Anything beyond a single AI worker — a customer portal, an internal tool, or a small piece of software with AI logic, a database, and admin built around your specific process. It starts where templates and off-the-shelf tools stop fitting.",
      },
      {
        q: "How much does a custom AI app cost?",
        a: "Custom builds starts at $10,000 CAD and are scoped on a call, since the price depends on the features, integrations, and data involved. You get a flat proposal before any work begins.",
      },
      {
        q: "Do I own the code?",
        a: "Yes — the app is built on a modern stack you own outright, with no lock-in to a proprietary platform. You're free to host it and extend it however you like.",
      },
      {
        q: "Can we start smaller and grow into an app?",
        a: "Often that's the smart path — start with one AI worker to prove the value, then expand into a custom app once the requirements are clear. Handbuilt will tell you honestly if you don't need a full build yet.",
      },
      {
        q: "Are you available to meet in Surrey?",
        a: "Yes. Handbuilt is based in the Surrey/Delta area, so in-person discovery and handoff meetings are easy. Remote delivery is available across Canada.",
      },
    ],
    schema: "Service",
    icon: "AppWindow",
  },
  {
    "updatedAt": "2026-10-03",
    "eyebrow": "Local business systems",
    "schema": "Service",
    "ctaLabel": "Request a scoped proposal",
    "ctaHeading": "Start with the enquiry you want to handle better",
    "ctaDescription": "Send your website, service area and an example of the request or task you want help with. Pavneet will review the fit and reply with a proposed next step.",
    "slug": "ai-automation-burnaby-bc",
    "h1": "AI Automation for Small Business in Burnaby, BC",
    "title": "AI Automation for Small Business in Burnaby, BC",
    "searchTitle": "AI Automation for Small Business in Burnaby, BC",
    "description": "AI automation for Burnaby small businesses: organise enquiries, prepare quote details and reduce repeated admin. A scoped build from an independent Surrey studio.",
    "answer": "Handbuilt AI helps Burnaby small businesses connect the repeated steps between an enquiry and a useful response. That might mean collecting quote details, drafting a reply for approval or organising follow-up tasks. You work directly with Pavneet, an independent builder based in Surrey, starting with one workflow and a scoped CAD quote.",
    "pain": "Copying the same information between your inbox, forms and work tools makes it easy to lose a request. Start by identifying the repeated step and who needs to check the result before adding automation.",
    "steps": [
      "Send an example of the repeated task and the tools you use.",
      "Agree one workflow, its limits and a fixed scope before work starts.",
      "Test normal requests, incomplete information and provider failures.",
      "Receive the workflow, instructions and a clear route for changes."
    ],
    "gets": [
      "One workflow built around your existing tools where supported",
      "A clear human approval or handoff point",
      "Visible success and failure states",
      "An agreed scope and CAD quote before the build"
    ],
    "sections": [
      {
        "heading": "Choose a small workflow you can verify",
        "body": "A Burnaby service business might receive quote requests by form and email, then manually turn each one into a task. An illustrative first automation could organise the approved details and prepare a reply for the owner to review. This illustrative workflow would be reviewed against your actual tools and approval process.",
        "bullets": [
          "Collect the details needed to assess a quote request",
          "Prepare a draft response for human approval",
          "Route an enquiry to the person responsible",
          "Flag a failed step instead of silently losing the request"
        ]
      },
      {
        "heading": "Keep business decisions with a person",
        "body": "The scope should say which details come from a known source, which outputs need approval and what happens when information is missing. An automation should not invent prices, promise availability or accept a job on your behalf unless the approved workflow explicitly supports that decision."
      },
      {
        "heading": "One local builder, with a clear scope",
        "body": "Handbuilt AI is based in Surrey and serves Burnaby. Work can be reviewed remotely using your actual workflow and tools. Pavneet also runs Ironwood Grounds, his own contracting business, and built its website and quote-request workflow. That practical experience informs the attention to request handling and day-to-day business tasks."
      },
      {
        "heading": "Getting found and handling enquiries are different jobs",
        "body": "If the website receives few relevant visits, start with the service information and discovery path. Our AI search visibility service reviews how customers find and understand a business on Google and in AI answers. Once requests arrive, automation can help organise the next step."
      }
    ],
    "secondaryCta": {
      "label": "Explore workflow automation",
      "href": "/done-for-you-ai-automation"
    },
    "keywords": [
      "ai automation small business burnaby",
      "ai automation burnaby",
      "burnaby workflow automation",
      "ai for small business burnaby bc"
    ],
    "related": [
      {
        "label": "Workflow automation scope",
        "href": "/done-for-you-ai-automation"
      },
      {
        "label": "AI search visibility for local businesses",
        "href": "/services/ai-search-visibility"
      },
      {
        "label": "Published packages and pricing",
        "href": "/pricing"
      },
      {
        "label": "Meet Pavneet",
        "href": "/about"
      }
    ],
    "faqs": [
      {
        "q": "Are you based in Burnaby?",
        "a": "Handbuilt AI is based in Surrey and serves Burnaby businesses. The workflow review and build can be handled remotely."
      },
      {
        "q": "Which task should I automate first?",
        "a": "Start with a repeated, clearly defined task whose result you can check. Send an example and the tools involved so we can assess whether automation is a useful fit."
      },
      {
        "q": "What does a small-business automation cost?",
        "a": "The quote depends on the workflow, integrations and approval steps. Review the published packages for a starting point, then request a scope that identifies build work and ongoing provider costs."
      },
      {
        "q": "Will this get my business recommended by ChatGPT?",
        "a": "Workflow automation handles work inside your business. Improving how people find your business in AI answers is a separate service, linked from this page. Recommendations cannot be guaranteed."
      }
    ],
    "icon": "MapPin"
  },
  {
    slug: "ai-automation-richmond-bc",
    eyebrow: "Location",
    h1: "AI Automation in Richmond, BC",
    title: "AI Answering Service & Automation in Richmond, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for Richmond businesses — retail, restaurants, real estate and import/export. Multilingual-capable, fixed CAD pricing.",
    answer:
      `Handbuilt builds custom AI receptionists, chatbots and automations for Richmond businesses — retail, restaurants, real estate, and import/export firms. Multi-language conversations can be scoped for a chatbot or custom build; the standard AI phone receptionist covers one language. Built from nearby Surrey/Delta with fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    pain: "Richmond businesses serve a busy, multilingual customer base — and a call or message answered slowly, or only in one language, is a customer who takes their business elsewhere.",
    scenario:
      "A Richmond real estate agent and a nearby restaurant both lose inquiries that come in while they're busy — some in English, some not. An AI assistant answers instantly, in the customer's language, captures the lead or booking, and routes anything complex to a person. In a market this competitive and diverse, speed and language coverage win.",
    steps: [
      "Discovery call — map where leads and time leak, and the fastest-payback AI worker.",
      "Scoped proposal — a flat CAD price and a clear outcome.",
      "Build & test — built on your real services, hours and languages, tested on your workflow.",
      "Handoff & support — the working system plus an optional $99/mo Care Plan.",
    ],
    gets: [
      "AI that can converse with customers in multiple languages",
      "A custom worker built around your Richmond business",
      "One accountable local builder",
      "Fixed CAD pricing, in-person or remote",
    ],
    sections: [
      {
        heading: "Who we build for in Richmond",
        body: "Richmond's economy spans retail and restaurants, real estate, professional services, and trade/import businesses. Where customers repeat the same questions, bookings and follow-ups — often across languages — an AI worker removes the bottleneck.",
        bullets: [
          "Retail and restaurants serving a diverse, multilingual customer base",
          "Real estate and mortgage brokers who live on speed-to-lead",
          "Import/export and professional service firms",
          "Clinics, salons and appointment-based businesses",
        ],
      },
      {
        heading: "Multilingual matters here",
        body: "AI assistants can answer and book in more than one language, which is a real advantage in Richmond. We set up whatever language mix fits your customers so no inquiry is lost to a language gap — with a person for anything the AI shouldn't handle alone.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation richmond bc",
      "ai receptionist richmond",
      "multilingual ai for business richmond",
      "richmond ai developer",
    ],
    related: [
      { label: "AI Automation in Vancouver", href: "/locations/ai-automation-vancouver" },
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Can the AI handle other languages?", a: "English is what it handles reliably today. It can take a booking in another language, but we do not promise the same quality — accents, code-switching and trade vocabulary are where it slips. If a large share of your Richmond customers call in Cantonese, Mandarin or Punjabi, tell us during scoping and we will test it against real calls before you commit rather than after." },
      { q: "Are you local to Richmond?", a: "Handbuilt is run from nearby Surrey/Delta. Most work is remote, and an in-person meeting is easy to arrange for Richmond businesses." },
      { q: "What does it cost to start?", a: `A focused custom build starts at $1,500 CAD, usually live in about 5 business days. One Richmond-specific thing worth raising before you buy: a large share of Richmond businesses serve customers who prefer Cantonese or Mandarin, and English is what this handles reliably. That is a real constraint, not a hedge — if a meaningful share of your calls are not in English, it needs testing against your actual calls during scoping rather than after handover; larger systems run $3,500–$7,500. ${PHONE_PRICE_SENTENCE}` },
    ],
    schema: "Service",
    icon: "MapPin",
  },

  {
    slug: "ai-automation-new-westminster-bc",
    eyebrow: "Location",
    h1: "AI Automation in New Westminster, BC",
    title: "AI Automation in New Westminster, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for New Westminster businesses — professional services, clinics, and the Uptown/Columbia small-business districts. Fixed CAD pricing.",
    answer:
      `Handbuilt builds custom AI receptionists, chatbots and workflow automations for New Westminster businesses — professional services, clinics, and the small-business districts around Uptown and Columbia Street. Built from nearby Surrey/Delta with fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    pain: "New West's small professional and service firms punch above their weight but run lean — so the same phone calls, intake and follow-ups eat the hours that should go to billable work.",
    scenario:
      "A New Westminster professional practice loses new-client inquiries to voicemail and spends staff time on repetitive intake questions. An AI assistant answers inquiries, screens and books, and gathers intake details before the first meeting — freeing the team for the work only they can do.",
    steps: [
      "Discovery call — map the bottlenecks and the fastest-payback worker.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services and intake process.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Inquiries and intake handled without staff time",
      "A custom worker built around your New West business",
      "One accountable local builder",
      "Fixed CAD pricing, in-person or remote",
    ],
    sections: [
      {
        heading: "Who we build for in New Westminster",
        body: "New West's economy leans on professional services, clinics, and independent businesses in its walkable districts. Where teams repeat the same calls, intake and follow-ups, an AI worker frees up real time.",
        bullets: [
          "Professional services — legal, accounting, consulting",
          "Clinics and health practices",
          "Uptown and Columbia Street small businesses",
          "Appointment-based and service firms",
        ],
      },
      {
        heading: "Lean teams, less admin",
        body: "A short hop from Surrey/Delta, so in-person works if you want it. The point is simple: take the repetitive front-desk and intake work off a small team so their time goes to clients, not coordination.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation new westminster",
      "ai receptionist new westminster bc",
      "ai for professional services new west",
      "new westminster ai developer",
      "ai automation coquitlam",
      "ai receptionist coquitlam",
      "ai for tri-cities business",
      "coquitlam ai developer"],
    related: [
      { label: "AI Automation in Burnaby, BC", href: "/locations/ai-automation-burnaby-bc" },
      { label: "AI Automation in Vancouver", href: "/locations/ai-automation-vancouver" },
      { label: "AI Automation for Law Firms", href: "/industries" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Are you based in New Westminster?", a: "Handbuilt is run from nearby Surrey/Delta — a short trip to New West. Most work is remote, with in-person meetings easy to arrange." },
      { q: "Do you work with professional practices?", a: "Yes — intake, screening, booking and client admin are among the highest-value automations for legal, accounting and consulting firms." },
      { q: "What does it cost?", a: `A focused custom build starts at $1,500 CAD, usually live in about 5 business days. ${PHONE_PRICE_SENTENCE}` },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-white-rock-bc",
    eyebrow: "Location",
    h1: "AI Automation in White Rock, BC",
    title: "AI Answering Service & Automation in White Rock, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for White Rock and South Surrey — wellness, hospitality, real estate and local retail. Right next door, fixed CAD pricing.",
    answer:
      `Handbuilt builds custom AI receptionists, chatbots and automations for White Rock and South Surrey businesses — wellness and clinics, hospitality, real estate, and waterfront retail. Home base is right next door in Surrey/Delta, so local support is genuinely local, with fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    pain: "White Rock's wellness, hospitality and retail businesses live on bookings and walk-in inquiries — and the ones missed while staff are with customers, or after hours, are gone for good.",
    scenario:
      "A White Rock wellness clinic and a waterfront restaurant both lose bookings that come in while they're busy. An AI assistant answers and books instantly, sends reminders to cut no-shows, and captures after-hours inquiries. In an appointment- and reservation-driven town, that's steady revenue that used to slip away.",
    steps: [
      "Discovery call — find the fastest-payback worker for your business.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services and hours.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Bookings and inquiries captured, even after hours",
      "No-show reminders that protect your schedule",
      "A custom worker built around your White Rock business",
      "A builder right next door — easy in-person",
    ],
    sections: [
      {
        heading: "Who we build for in White Rock & South Surrey",
        body: "The area runs on wellness and health practices, hospitality, real estate, and independent retail. Where bookings and inquiries are the lifeblood, an AI worker makes sure none are missed.",
        bullets: [
          "Wellness, physio, dental and health clinics",
          "Restaurants, cafés and hospitality on and near the waterfront",
          "Real estate serving South Surrey and White Rock",
          "Independent retail and appointment-based businesses",
        ],
      },
      {
        heading: "As local as it gets",
        body: "White Rock is on Handbuilt's doorstep — home base is right next door in Surrey/Delta — so in-person discovery and handoff are genuinely easy. You work with one local builder, not a remote agency.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation white rock",
      "ai receptionist white rock bc",
      "ai for business south surrey",
      "white rock ai developer",
    ],
    related: [
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "AI Automation in Delta, BC", href: "/locations/ai-automation-delta-bc" },
      { label: "Appointment & No-Show Reminder Automation", href: "/use-cases/appointment-reminder-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Are you actually near White Rock?", a: "Yes — home base is right next door in Surrey/Delta, so in-person discovery and handoff are easy. This is as local as it gets." },
      { q: "Good fit for a wellness clinic or restaurant?", a: "Very — booking, reminders and after-hours inquiry capture are among the highest-payback automations for appointment- and reservation-driven businesses." },
      { q: "What does it cost?", a: `A focused custom build starts at $1,500 CAD, usually live in about 5 business days. White Rock and South Surrey are the one part of Metro Vancouver where an in-person meeting is genuinely easy — this studio is run from Surrey/Delta and works in this catchment directly, so scoping does not have to happen over video. ${PHONE_PRICE_SENTENCE}` },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-maple-ridge-bc",
    eyebrow: "Location",
    h1: "AI Automation in Maple Ridge, BC",
    title: "AI Automation in Maple Ridge, BC | Handbuilt",
    description:
      `AI receptionists, quote agents and automations for Maple Ridge and Pitt Meadows trades and home services. Fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    answer:
      `Handbuilt builds custom AI receptionists, quote agents and automations for Maple Ridge and Pitt Meadows businesses — trades, contractors, landscaping and home services that run on phone calls and quotes. Built from Surrey/Delta with fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    pain: "Maple Ridge's trades and home-service businesses are out on jobs and acreage all day — so calls go to voicemail and quotes go un-chased, and the job goes to whoever called the customer back first.",
    scenario:
      "A Maple Ridge landscaping and a contracting business both lose calls while crews are on site, and forget to follow up on estimates. An AI receptionist answers when the crew can't and emails each caller's details and callback request; a separately built estimate follow-up agent chases quiet quotes to a yes or no.",
    steps: [
      "Discovery call — find where jobs and time leak, and the fastest-payback worker.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services, prices and service area.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Every call answered while crews are on site",
      "Estimates followed up automatically",
      "A custom worker built around your Maple Ridge business",
      "Fixed CAD pricing, in-person or remote",
    ],
    sections: [
      {
        heading: "Who we build for in Maple Ridge & Pitt Meadows",
        body: "This is trades and home-services country — contractors, landscapers, and service businesses covering a wide, semi-rural area. When the owner and crews are on the tools, an AI worker keeps the phone and the quote pipeline moving.",
        bullets: [
          "Contractors and home builders",
          "Landscaping, lawn care and property maintenance",
          "Plumbing, HVAC, electrical and cleaning",
          "Service businesses covering a wide area",
        ],
      },
      {
        heading: "Built for businesses on the move",
        body: "Maple Ridge and Pitt Meadows cover a lot of ground, and crews aren't at a desk. The whole point is a worker that answers, books and follows up while you're out working — with one accountable builder from nearby Surrey/Delta behind it.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation maple ridge",
      "ai receptionist maple ridge bc",
      "ai for contractors pitt meadows",
      "maple ridge ai developer",
    ],
    related: [
      { label: "AI Automation in Coquitlam, BC", href: "/locations/ai-automation-new-westminster-bc" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "AI Lead Follow-Up for Contractors", href: "/ai-lead-follow-up-agent" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Do you cover Pitt Meadows too?", a: "Yes — Maple Ridge and Pitt Meadows both. Handbuilt is run from Surrey/Delta, with in-person meetings arrangeable." },
      { q: "I run a trade and I'm never at a desk — how does this help?", a: "That's exactly who it's for: the AI answers and books while your crews work, and chases estimates you'd otherwise forget. You just show up to booked jobs." },
      { q: "What does it cost?", a: `A focused custom build starts at $1,500 CAD, usually live in about 5 business days. ${PHONE_PRICE_SENTENCE}` },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-chilliwack-bc",
    eyebrow: "Location",
    h1: "AI Automation in Chilliwack, BC",
    title: "AI Automation in Chilliwack, BC | Handbuilt",
    description:
      "AI receptionists, quote agents and automations for Chilliwack and the Fraser Valley — trades, agriculture-adjacent and local service businesses. Fixed CAD pricing.",
    answer:
      `Handbuilt builds custom AI receptionists, quote agents and automations for Chilliwack and Fraser Valley businesses — trades, home services, agriculture-adjacent and local service companies. Delivered remotely (with the same hands-on build) from Surrey/Delta, fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    pain: "Chilliwack businesses often can't get the same tech help as the metro core — so they either overpay a big-city agency that hands them off, or make do with generic tools that half-fit.",
    scenario:
      "A Chilliwack trades business loses after-hours calls and never follows up on quotes. An AI receptionist answers after hours and emails each caller's details and callback request; a separately built follow-up agent chases estimates. It doesn't matter that the builder is an hour west — the system is built around this business and delivered remotely, start to finish.",
    steps: [
      "Discovery call — over video; map where leads and time leak.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services and service area.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Big-city AI builds without the big-city runaround",
      "A custom worker built around your Chilliwack business",
      "One accountable builder, delivered remotely",
      "Fixed CAD pricing, no surprise invoices",
    ],
    sections: [
      {
        heading: "Who we build for in Chilliwack & the Fraser Valley",
        body: "The Valley runs on trades, home services, agriculture-adjacent businesses and local service companies. Where the same calls, quotes and follow-ups repeat, an AI worker pays back fast — no matter how far from the metro core you are.",
        bullets: [
          "Contractors, trades and home services",
          "Agriculture-adjacent and equipment businesses",
          "Local retail and service companies",
          "Clinics and appointment-based businesses",
        ],
      },
      {
        heading: "Remote, but genuinely hands-on",
        body: "Chilliwack is about an hour from home base, so this is delivered remotely — but that changes nothing about the build. It's still one builder scoping, building and testing the system around your real business, reachable when you need a tweak.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation chilliwack",
      "ai receptionist chilliwack bc",
      "ai for business fraser valley",
      "chilliwack ai developer",
    ],
    related: [
      { label: "AI Automation in Abbotsford", href: "/locations/ai-automation-abbotsford" },
      { label: "Remote AI Development", href: "/remote-ai-development" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "You're not in Chilliwack — does that matter?", a: "Not for the work. Discovery is over video, the build is done around your real business, and support is a message away. Plenty of Valley businesses prefer this to a big-city agency." },
      { q: "Do you cover the wider Fraser Valley?", a: "Yes — Chilliwack, Abbotsford and the surrounding Valley, delivered remotely from Surrey/Delta." },
      { q: "What does it cost?", a: `A focused custom build starts at $1,500 CAD, usually live in about 5 business days. ${PHONE_PRICE_SENTENCE}` },
    ],
    schema: "Service",
    icon: "MapPin",
  },

  {
    slug: "ai-automation-edmonton-ab",
    eyebrow: "Location",
    h1: "AI Automation in Edmonton, AB",
    title: "AI Automation in Edmonton, AB | Handbuilt",
    description:
      `AI receptionists, chatbots and automations for Edmonton businesses, delivered remotely from BC. Fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    answer:
      `Handbuilt builds custom AI receptionists, chatbots, quote agents and automations for Edmonton businesses — trades and home services, professional firms, and growing SMBs. Delivered remotely from British Columbia, with the same hands-on build and fixed CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
    pain: "Edmonton's service businesses run on responsiveness — through long winters and busy seasons alike, the calls and inquiries missed while the team is heads-down are revenue that quietly disappears.",
    scenario:
      "An Edmonton trades business loses calls during jobs and lets quotes go cold. An AI receptionist answers and records callback requests; a separately built follow-up agent chases estimates to a decision. Built from BC, run on Edmonton time, around this specific business.",
    steps: [
      "Discovery call — over video; map the fastest-payback worker.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services and hours.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Calls and quotes captured, on Edmonton time",
      "A custom worker built around your business",
      "One accountable builder, delivered remotely",
      "Fixed CAD pricing, no surprises",
    ],
    sections: [
      {
        heading: "Who we build for in Edmonton",
        body: "Edmonton's SMBs span trades and home services, professional firms, clinics and local service businesses. Where daily calls, quotes and follow-ups repeat, an AI worker removes the bottleneck without adding staff.",
        bullets: [
          "Trades and home services",
          "Professional and B2B service firms",
          "Clinics, salons and appointment-based businesses",
          "SMBs scaling without extra headcount",
        ],
      },
      {
        heading: "Remote delivery, identical build",
        body: "Based in BC, building for Edmonton remotely — discovery over video, the system built around your real operation, support a message away. Same process and accountability as a local build.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation edmonton",
      "ai receptionist edmonton",
      "ai for small business edmonton ab",
      "edmonton ai developer",
    ],
    related: [
      { label: "Remote AI Development Across Canada", href: "/remote-ai-development" },
      { label: "AI Automation Canada", href: "/ai-automation-canada" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Can a BC builder serve an Edmonton business?", a: "Yes — the build is remote by design and identical to a local one: discovery over video, built around your real business, support always reachable." },
      { q: "Is everything in CAD?", a: `Yes — fixed CAD pricing. A focused custom build starts at $1,500 CAD, usually live in about 5 business days. ${PHONE_PRICE_SENTENCE}` },
      { q: "Where should I start?", a: "Usually with the automation tied to lost revenue — a receptionist or follow-up agent. The discovery call pinpoints it." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
];

export function getLocation(slug: string): LandingContent | undefined {
  return locations.find((l) => l.slug === slug);
}
