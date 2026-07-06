import type { LandingContent } from "./landing";

// Local SEO / GEO pages. Handbuilt is built in Surrey/Delta BC and works with
// businesses across the Lower Mainland in person and remotely across Canada.
// No fabricated client counts, no fake addresses — the trust angle is honest:
// one local builder, fixed CAD pricing, real service area. Every scenario is
// hypothetical. related[] points only to pages that exist.
export const locations: LandingContent[] = [
  {
    slug: "ai-automation-agency-surrey-bc",
    eyebrow: "Location",
    h1: "AI Automation Agency in Surrey, BC",
    title: "AI Automation Agency in Surrey, BC | Handbuilt",
    description:
      "Handbuilt builds AI receptionists, chatbots, and automations for Surrey small businesses. Local builder, fixed CAD pricing from $1,500. Remote across Canada too.",
    answer:
      "Handbuilt is a one-person AI automation studio based in Surrey/Delta BC. Pavneet builds custom AI receptionists, quote agents, chatbots, and workflow automations for Surrey small businesses — trades, clinics, salons, real estate, and service companies. Fixed CAD pricing starts at $1,500. You talk to the builder, not a sales rep.",
    pain:
      "Most Surrey small businesses don't need another AI subscription — they need someone local who'll actually build the thing around how their business runs, stand behind it, and be reachable when something needs a tweak. Big agencies hand you off; generic SaaS half-fits and leaves the setup to you.",
    scenario:
      "Say a Surrey home-services company is fielding calls all day from job sites and losing the after-hours ones to voicemail. An AI receptionist could answer every call on the second ring, book the job, and text the customer a confirmation — while a follow-up agent chases quiet quotes until they turn into a yes or a no.\n\nThe exact payback depends on call volume and how many missed callers would have waited for a callback, but for a local trade the fastest wins are usually missed-call recovery and same-day quotes.",
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
        a: "A single AI worker (receptionist, chatbot, quote intake, or review replies) starts at $1,500 CAD and is usually live in about 5 business days. Larger multi-worker systems run $3,500–$7,500.",
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
      "AI receptionists, chatbots, and automations for Delta, Ladner, and Tsawwassen small businesses. Local builder in Surrey/Delta, fixed CAD pricing from $1,500.",
    answer:
      "Handbuilt builds custom AI workers for Delta businesses — including Ladner, Tsawwassen, and North Delta — from its Surrey/Delta base. AI receptionists, quote agents, chatbots, and follow-up automations, trained on your real business, with fixed CAD pricing starting at $1,500. One local builder, no agency handoff.",
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
        a: "Often the biggest win is handling the seasonal rush without hiring temporary admin. An AI receptionist or quote agent can absorb the busy months and simply sit quiet in the off-season, since there's no per-seat subscription forcing ongoing cost.",
      },
      {
        q: "What's the smallest thing you'll build?",
        a: "A single focused AI worker for $1,500 CAD — for example, one that answers calls and books jobs, or one that turns website inquiries into same-day quotes. It's the usual starting point before expanding.",
      },
      {
        q: "Can you connect to the tools I already use?",
        a: "In most cases yes — calendars, CRMs, booking systems, and web forms are common connections. Exact integrations are confirmed on the discovery call so nothing is promised that can't be delivered.",
      },
      {
        q: "Do I have to sign a monthly contract?",
        a: "No. The build is a one-time cost that you own. The $99/mo Care Plan is optional and can be added or dropped anytime.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-vancouver",
    eyebrow: "Location",
    h1: "AI Automation for Vancouver Businesses",
    title: "AI Automation for Vancouver Businesses | Handbuilt",
    description:
      "Custom AI receptionists, chatbots, and automations for Vancouver small businesses. Lower Mainland builder, fixed CAD pricing from $1,500, remote or in person.",
    answer:
      "Handbuilt builds custom AI workers for Vancouver small businesses — receptionists, chatbots, quote agents, and workflow automations trained on your real business. Based in the Lower Mainland with fixed CAD pricing from $1,500, it's a one-builder alternative to agencies and generic SaaS: you own what's built, and you talk to the person building it.",
    pain:
      "Vancouver businesses are pitched AI constantly, and most of it is either a generic subscription or an agency retainer that bills for a whole team. What's missing is someone who'll build one thing that fits your workflow, get it live quickly, and be straight about what AI can and can't do for you.",
    scenario:
      "Say a Vancouver clinic or studio is losing new-client inquiries because the front desk can't answer every call and message during busy hours. An AI receptionist and booking assistant could answer common questions, offer open appointment slots, confirm, and send reminders — so fewer prospects drift to the next result on Google.\n\nThe real gain depends on how many inquiries currently go unanswered, but for appointment-based Vancouver businesses that's often the leak worth closing first.",
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
    title: "AI Automation for Langley, BC Businesses | Handbuilt",
    description:
      "AI receptionists, quote agents, and automations for Langley small businesses and trades. Local Lower Mainland builder, fixed CAD pricing from $1,500.",
    answer:
      "Handbuilt builds custom AI workers for Langley businesses — City and Township — from its Surrey/Delta base. AI receptionists, quote agents, chatbots, and follow-up automations, trained on your real business, with fixed CAD pricing from $1,500. One local builder handles the whole thing, and you own what's built.",
    pain:
      "Langley's trades, home services, and growing local businesses often run on a phone that never stops and a quote list that never gets shorter. Adding admin staff is costly, and generic AI tools don't understand a contractor's schedule. A purpose-built AI worker handles the repetitive front-office load without new payroll.",
    scenario:
      "Say a Langley contractor is on job sites all day and misses a handful of new-customer calls every week, plus a stack of quote requests that don't get answered until the weekend. An AI receptionist could answer and book those calls in real time, while a quote agent turns inquiries into same-day priced quotes.\n\nThe payback depends on how many of those missed calls and slow quotes would have become jobs — but for a busy Langley trade, that's usually the first leak worth plugging.",
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
        a: "That's the point of building custom. The AI worker is set up around your services, pricing, and schedule, so it books and quotes the way you actually operate. There's a dedicated AI receptionist for contractors page with the specifics.",
      },
      {
        q: "How much does it cost to start?",
        a: "One AI worker is $1,500 CAD and usually live in about 5 business days. A connected multi-worker system runs $3,500–$7,500.",
      },
      {
        q: "Can it text customers back automatically?",
        a: "Yes — texting a caller a confirmation, a quote, or a follow-up is one of the most common setups. Exact channels are confirmed during scoping.",
      },
      {
        q: "Is there a lock-in?",
        a: "No. You own the build. The $99/mo Care Plan for monitoring and tweaks is optional.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-abbotsford",
    eyebrow: "Location",
    h1: "AI Automation in Abbotsford",
    title: "AI Automation for Abbotsford Businesses | Handbuilt",
    description:
      "AI receptionists, quote agents, and automations for Abbotsford and Fraser Valley businesses. Fixed CAD pricing from $1,500, remote or in person.",
    answer:
      "Handbuilt builds custom AI workers for Abbotsford and Fraser Valley businesses — receptionists, quote agents, chatbots, and follow-up automations trained on your real business. Fixed CAD pricing starts at $1,500, delivered remotely or in person from the nearby Surrey/Delta base. You work with one builder and own what's built.",
    pain:
      "Abbotsford runs on agriculture, trades, and family-owned businesses where the owner wears every hat. There's rarely time to research and wire up AI tools, and a generic subscription doesn't understand a Fraser Valley operation. A built-for-you AI worker takes the repetitive calls, quotes, and follow-ups off your plate.",
    scenario:
      "Say an Abbotsford trades or agricultural-services business gets seasonal surges of calls and quote requests that overwhelm whoever's near the phone. An AI receptionist could answer and triage every call, and a quote agent could send priced quotes the same day instead of the next week.\n\nWhether that's worth it depends on how many rushed-season leads currently go cold — but for a busy Fraser Valley business, catching those is usually the clearest win.",
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
        a: "No. The build is yours to keep. The $99/mo Care Plan is optional support, not a requirement.",
      },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-receptionist-surrey-bc",
    eyebrow: "Location",
    h1: "AI Receptionist in Surrey, BC",
    title: "AI Receptionist in Surrey, BC | Handbuilt",
    description:
      "A custom AI receptionist for Surrey businesses — answers calls, books jobs, and texts customers back. Built local, from $1,500 CAD, live in about 5 days.",
    answer:
      "An AI receptionist for a Surrey business answers inbound calls and messages, answers common questions, books appointments, and texts customers back — 24/7, without adding front-desk staff. Handbuilt builds it around your real services, prices, and hours from a Surrey/Delta base, for a fixed $1,500–$3,500 CAD, usually live in about 5 business days.",
    pain:
      "Every missed call in Surrey is a job that can go to the next business that picks up. Owners on the tools or with a full front desk can't catch every call, and after-hours inquiries go to voicemail and rarely call back. That lost pipeline is invisible — it never shows up as a number, so it's easy to ignore.",
    scenario:
      "Say a Surrey home-services company misses a handful of calls a day while crews are working, plus the evening callers who never leave a message. An AI receptionist could answer on the second ring, handle the common questions, book the job into the calendar, and text the customer a confirmation.\n\nThe value depends on how many of those callers would have waited for a callback versus moving on — but for most Surrey trades, missed-call recovery is where an AI receptionist earns its cost fastest.",
    steps: [
      "Discovery call — review your call types, hours, and booking process.",
      "Scoped proposal — a flat CAD price and exactly what the receptionist will handle.",
      "Build & test — trained on your services, pricing, FAQs, and calendar.",
      "Handoff & support — go live in about 5 days; optional $99/mo Care Plan.",
    ],
    gets: [
      "An AI receptionist trained on your Surrey business",
      "Answers calls and messages 24/7, on the second ring",
      "Books jobs and texts customers a confirmation",
      "Handles your common questions in your wording",
      "Connected to your calendar or booking tool",
      "Fixed CAD price, live in about 5 business days",
    ],
    sections: [
      {
        heading: "What a Surrey AI receptionist handles",
        body: "It picks up when you can't, answers the questions you get asked all day, captures the caller's details, books the appointment, and sends a text confirmation. For calls that genuinely need you — complex or sensitive ones — it takes a clear message and routes it so nothing important is lost.",
        bullets: [
          "Answering FAQs about services, pricing, hours, and area",
          "Booking appointments into your real calendar",
          "Capturing quote requests and new-customer details",
          "Texting callers a confirmation or follow-up",
          "Routing the calls that need a human to you",
        ],
      },
      {
        heading: "Why build it locally",
        body: "A Surrey builder who understands local trades sets up the receptionist around how you actually work — your service area, your pricing language, your booking flow — and is reachable directly when you want a change. You own the setup; there's no per-call SaaS meter running against you.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai receptionist surrey bc",
      "ai phone answering surrey",
      "virtual receptionist surrey",
      "ai call answering small business",
      "surrey ai receptionist cost",
    ],
    related: [
      { label: "AI Receptionist (overview)", href: "/ai-receptionist" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "AI Automation Agency in Surrey, BC", href: "/locations/ai-automation-agency-surrey-bc" },
      { label: "How Much Does an AI Receptionist Cost?", href: "/resources/ai-receptionist-cost" },
      { label: "Can AI Answer Business Phone Calls?", href: "/resources/can-ai-answer-business-phone-calls" },
    ],
    faqs: [
      {
        q: "Does the AI receptionist actually answer phone calls?",
        a: "Yes — it can answer live calls, handle the routine ones end to end, and route or take a message for the calls that need you. It can also handle website chat and text if you want the same assistant across channels.",
      },
      {
        q: "Will callers know it's AI?",
        a: "It's built to be helpful and clear rather than to pretend to be a specific person. Most routine callers just get their question answered and their booking made; anything it can't handle is routed to you.",
      },
      {
        q: "How much does an AI receptionist cost in Surrey?",
        a: "A focused AI receptionist build is typically $1,500–$3,500 CAD as a one-time cost, plus small ongoing AI usage fees and an optional $99/mo Care Plan. There's a full cost breakdown on the AI receptionist cost page.",
      },
      {
        q: "How long until it's live?",
        a: "Usually about 5 business days for a single receptionist worker, once you've shared your services, pricing, and hours.",
      },
      {
        q: "Can it book into my existing calendar?",
        a: "In most cases yes. Common calendar and booking tools connect directly; the exact integration is confirmed on the discovery call.",
      },
    ],
    schema: "Service",
    icon: "Phone",
  },
  {
    slug: "ai-chatbot-developer-vancouver",
    eyebrow: "Location",
    h1: "AI Chatbot Developer in Vancouver",
    title: "AI Chatbot Developer in Vancouver | Handbuilt",
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
      { label: "Custom Business Automation", href: "/services/custom-business-automation" },
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
];

export function getLocation(slug: string): LandingContent | undefined {
  return locations.find((l) => l.slug === slug);
}
