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
  {
    slug: "ai-automation-burnaby-bc",
    eyebrow: "Location",
    h1: "AI Automation in Burnaby, BC",
    title: "AI Automation in Burnaby, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for Burnaby businesses — from Metrotown retail to Brentwood service firms. Local Lower Mainland builder, fixed CAD pricing.",
    answer:
      "Handbuilt builds custom AI receptionists, chatbots, quote agents and workflow automations for Burnaby businesses — retail around Metrotown, service and professional firms in Brentwood and Lougheed, clinics and trades across the city. Run from nearby Surrey/Delta, so you get a local builder and fixed CAD pricing from $1,500.",
    pain: "Burnaby businesses compete in one of the busiest markets in the Lower Mainland — a missed call or a slow reply doesn't just lose a sale, it hands it to a competitor a few blocks away.",
    scenario:
      "A Burnaby clinic near Metrotown fields calls it can't answer during treatment and loses after-hours inquiries to voicemail. An AI receptionist answers every call, books appointments into their system, and texts confirmations — while a follow-up agent keeps quiet leads warm. The fastest wins here are usually missed-call recovery and instant booking.",
    steps: [
      "Discovery call — 30 minutes to find where leads and time leak, and which AI worker pays back fastest.",
      "Scoped proposal — a flat CAD price with exactly what's built and the outcome.",
      "Build & test — built around your real services, prices and hours, tested on your workflow.",
      "Handoff & support — the working system plus an optional $99/mo Care Plan.",
    ],
    gets: [
      "A custom AI worker built around your Burnaby business, not a template",
      "One accountable local builder, start to finish",
      "Fixed CAD pricing, no surprise invoices",
      "In-person or fully remote — your call",
    ],
    sections: [
      {
        heading: "Who we build for in Burnaby",
        body: "Burnaby runs on a dense mix of retail, professional services, clinics, restaurants and trades. If your team repeats the same calls, quotes, bookings and follow-ups every day, there's usually an AI worker that pays for itself fast.",
        bullets: [
          "Metrotown and Brentwood retail and service businesses",
          "Clinics, dental and health offices needing front-desk help",
          "Restaurants and appointment-based businesses",
          "Trades and home services across the city",
        ],
      },
      {
        heading: "Local, without the agency runaround",
        body: "Burnaby is a short drive from home base in Surrey/Delta, so an in-person discovery or handoff is easy if you want it — but most of the work is remote either way. You deal with one builder who picks up, not an offshore support queue.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation burnaby",
      "ai receptionist burnaby",
      "ai for small business burnaby bc",
      "burnaby ai developer",
    ],
    related: [
      { label: "AI Automation in Vancouver", href: "/locations/ai-automation-vancouver" },
      { label: "AI Automation in Coquitlam, BC", href: "/locations/ai-automation-coquitlam-bc" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Are you based in Burnaby?", a: "Handbuilt is run from the nearby Surrey/Delta area — a short drive from Burnaby. Most work is remote, but an in-person meeting is easy to arrange for local businesses." },
      { q: "What does it cost?", a: "A single AI worker starts at $1,500 CAD and is usually live in about 5 business days. Larger multi-worker systems run $3,500–$7,500." },
      { q: "Which AI worker should I start with?", a: "Usually the one tied to lost revenue — for most Burnaby businesses that's an AI receptionist or a quote agent. The discovery call pinpoints the fastest payback for you." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-richmond-bc",
    eyebrow: "Location",
    h1: "AI Automation in Richmond, BC",
    title: "AI Automation in Richmond, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for Richmond businesses — retail, restaurants, real estate and import/export. Multilingual-capable, fixed CAD pricing.",
    answer:
      "Handbuilt builds custom AI receptionists, chatbots and automations for Richmond businesses — retail, restaurants, real estate, and import/export firms — and can handle customer conversations in multiple languages, which matters in Richmond's diverse market. Built from nearby Surrey/Delta with fixed CAD pricing from $1,500.",
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
      { q: "Can the AI handle other languages?", a: "Yes — AI assistants can converse and book in multiple languages. We set up the mix that matches your Richmond customer base." },
      { q: "Are you local to Richmond?", a: "Handbuilt is run from nearby Surrey/Delta. Most work is remote, and an in-person meeting is easy to arrange for Richmond businesses." },
      { q: "What does it cost to start?", a: "A single AI worker starts at $1,500 CAD, usually live in about 5 business days; larger systems run $3,500–$7,500." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-coquitlam-bc",
    eyebrow: "Location",
    h1: "AI Automation in Coquitlam, BC",
    title: "AI Automation in Coquitlam, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for Coquitlam and the Tri-Cities — trades, clinics, and family-run service businesses. Local builder, fixed CAD pricing.",
    answer:
      "Handbuilt builds custom AI receptionists, quote agents, chatbots and automations for Coquitlam and Tri-Cities businesses — home services and trades, clinics, salons, and family-run service companies. Built from nearby Surrey/Delta with fixed CAD pricing from $1,500.",
    pain: "Coquitlam's family-run and trades businesses are stretched thin — the owner is on the tools or with a customer, so calls, quotes and follow-ups slip through the cracks and jobs go to whoever answered first.",
    scenario:
      "A Coquitlam home-services company loses after-hours calls to voicemail and forgets to follow up on quotes. An AI receptionist answers every call and books the job; a follow-up agent chases quiet quotes until they close. For a busy Tri-Cities trade, that's real revenue recovered from the phone alone.",
    steps: [
      "Discovery call — find where time and leads leak, and the fastest-payback worker.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services, prices and hours.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Every call and quote captured, even when you're on a job",
      "A custom worker built around your Coquitlam business",
      "One accountable local builder",
      "Fixed CAD pricing, in-person or remote",
    ],
    sections: [
      {
        heading: "Who we build for in the Tri-Cities",
        body: "Coquitlam, Port Coquitlam and Port Moody run on trades, home services, clinics and family businesses. If the same calls, quotes, bookings and follow-ups repeat every day, an AI worker usually pays for itself inside the first season.",
        bullets: [
          "Trades and home services: plumbing, HVAC, electrical, landscaping, cleaning",
          "Clinics, dental and health offices",
          "Salons and appointment-based businesses",
          "Family-run service and retail businesses",
        ],
      },
      {
        heading: "One builder who picks up",
        body: "The Tri-Cities are an easy drive from Surrey/Delta, so in-person is on the table — but the work is remote-friendly either way. You get one builder accountable start to finish, not a handoff to a support desk.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation coquitlam",
      "ai receptionist coquitlam",
      "ai for tri-cities business",
      "coquitlam ai developer",
    ],
    related: [
      { label: "AI Automation in Burnaby, BC", href: "/locations/ai-automation-burnaby-bc" },
      { label: "AI Automation in Maple Ridge, BC", href: "/locations/ai-automation-maple-ridge-bc" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Do you cover the whole Tri-Cities?", a: "Yes — Coquitlam, Port Coquitlam and Port Moody. Handbuilt is run from nearby Surrey/Delta, with in-person meetings easy to arrange." },
      { q: "I'm a solo tradesperson — is this worth it?", a: "Often especially so — when you're the one on the tools, an AI receptionist that answers and books while you work usually pays for itself in recovered jobs." },
      { q: "What does it cost?", a: "A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
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
      "Handbuilt builds custom AI receptionists, chatbots and workflow automations for New Westminster businesses — professional services, clinics, and the small-business districts around Uptown and Columbia Street. Built from nearby Surrey/Delta with fixed CAD pricing from $1,500.",
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
    ],
    related: [
      { label: "AI Automation in Burnaby, BC", href: "/locations/ai-automation-burnaby-bc" },
      { label: "AI Automation in Vancouver", href: "/locations/ai-automation-vancouver" },
      { label: "AI Automation for Law Firms", href: "/industries/law-firm-ai-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Are you based in New Westminster?", a: "Handbuilt is run from nearby Surrey/Delta — a short trip to New West. Most work is remote, with in-person meetings easy to arrange." },
      { q: "Do you work with professional practices?", a: "Yes — intake, screening, booking and client admin are among the highest-value automations for legal, accounting and consulting firms." },
      { q: "What does it cost?", a: "A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-white-rock-bc",
    eyebrow: "Location",
    h1: "AI Automation in White Rock, BC",
    title: "AI Automation in White Rock, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for White Rock and South Surrey — wellness, hospitality, real estate and local retail. Right next door, fixed CAD pricing.",
    answer:
      "Handbuilt builds custom AI receptionists, chatbots and automations for White Rock and South Surrey businesses — wellness and clinics, hospitality, real estate, and waterfront retail. Home base is right next door in Surrey/Delta, so local support is genuinely local, with fixed CAD pricing from $1,500.",
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
      { label: "No-Show Reminder Automation", href: "/use-cases/no-show-reminder-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Are you actually near White Rock?", a: "Yes — home base is right next door in Surrey/Delta, so in-person discovery and handoff are easy. This is as local as it gets." },
      { q: "Good fit for a wellness clinic or restaurant?", a: "Very — booking, reminders and after-hours inquiry capture are among the highest-payback automations for appointment- and reservation-driven businesses." },
      { q: "What does it cost?", a: "A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
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
      "AI receptionists, quote agents and automations for Maple Ridge and Pitt Meadows — trades, contractors, landscaping and home services. Fixed CAD pricing from $1,500.",
    answer:
      "Handbuilt builds custom AI receptionists, quote agents and automations for Maple Ridge and Pitt Meadows businesses — trades, contractors, landscaping and home services that run on phone calls and quotes. Built from Surrey/Delta with fixed CAD pricing from $1,500.",
    pain: "Maple Ridge's trades and home-service businesses are out on jobs and acreage all day — so calls go to voicemail and quotes go un-chased, and the job goes to whoever called the customer back first.",
    scenario:
      "A Maple Ridge landscaping and a contracting business both lose calls while crews are on site, and forget to follow up on estimates. An AI receptionist answers every call and books the job; an estimate follow-up agent chases quiet quotes to a yes or no. For a trade running on volume, that's jobs recovered straight from the phone.",
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
      { label: "AI Automation in Coquitlam, BC", href: "/locations/ai-automation-coquitlam-bc" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "Estimate Follow-Up Automation", href: "/use-cases/estimate-follow-up-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Do you cover Pitt Meadows too?", a: "Yes — Maple Ridge and Pitt Meadows both. Handbuilt is run from Surrey/Delta, with in-person meetings arrangeable." },
      { q: "I run a trade and I'm never at a desk — how does this help?", a: "That's exactly who it's for: the AI answers and books while your crews work, and chases estimates you'd otherwise forget. You just show up to booked jobs." },
      { q: "What does it cost?", a: "A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
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
      "Handbuilt builds custom AI receptionists, quote agents and automations for Chilliwack and Fraser Valley businesses — trades, home services, agriculture-adjacent and local service companies. Delivered remotely (with the same hands-on build) from Surrey/Delta, fixed CAD pricing from $1,500.",
    pain: "Chilliwack businesses often can't get the same tech help as the metro core — so they either overpay a big-city agency that hands them off, or make do with generic tools that half-fit.",
    scenario:
      "A Chilliwack trades business loses after-hours calls and never follows up on quotes. An AI receptionist answers every call and books the job; a follow-up agent chases estimates. It doesn't matter that the builder is an hour west — the system is built around this business and delivered remotely, start to finish.",
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
      { q: "What does it cost?", a: "A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-victoria-bc",
    eyebrow: "Location",
    h1: "AI Automation in Victoria, BC",
    title: "AI Automation in Victoria, BC | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for Victoria and Vancouver Island businesses — hospitality, professional services and clinics. Delivered remotely, fixed CAD pricing.",
    answer:
      "Handbuilt builds custom AI receptionists, chatbots and automations for Victoria and Vancouver Island businesses — hospitality and tourism, professional services, and clinics. Delivered fully remotely from the mainland, with the same hands-on build and fixed CAD pricing from $1,500.",
    pain: "Victoria's tourism and service businesses swing between slammed and quiet — and during the busy stretches, missed calls and unanswered inquiries are lost revenue no one has time to recover.",
    scenario:
      "A Victoria tour operator and a downtown clinic both get more inquiries than they can answer in peak season. An AI assistant answers and books instantly, handles the repeat questions, and captures after-hours inquiries — so the busy season converts instead of overwhelming the team.",
    steps: [
      "Discovery call — over video; map the fastest-payback worker.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services and seasonal patterns.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Inquiries answered through peak season",
      "A custom worker built around your Victoria business",
      "One accountable builder, delivered remotely",
      "Fixed CAD pricing across the water",
    ],
    sections: [
      {
        heading: "Who we build for in Victoria",
        body: "Victoria and the Island run on tourism and hospitality, professional services, clinics, and independent businesses. Where inquiries and bookings spike seasonally, an AI worker absorbs the load without seasonal hiring.",
        bullets: [
          "Tourism, tours and hospitality",
          "Professional services and government-adjacent firms",
          "Clinics and health practices",
          "Independent retail and appointment-based businesses",
        ],
      },
      {
        heading: "Island business, mainland build",
        body: "Being across the water changes nothing about how the system is built. Discovery is over video, the build is done around your real business, and support is a message away — one builder, accountable start to finish.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation victoria bc",
      "ai receptionist victoria",
      "ai for business vancouver island",
      "victoria ai developer",
    ],
    related: [
      { label: "AI Automation in Vancouver", href: "/locations/ai-automation-vancouver" },
      { label: "Remote AI Development", href: "/remote-ai-development" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Do you have anyone on the Island?", a: "Handbuilt is run from the mainland (Surrey/Delta) and delivers to Victoria fully remotely. Discovery is over video and the build is identical to a local one." },
      { q: "Good fit for a seasonal tourism business?", a: "Yes — an AI worker absorbs peak-season inquiry spikes without seasonal hiring, then keeps working through the quiet months." },
      { q: "What does it cost?", a: "A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-calgary-ab",
    eyebrow: "Location",
    h1: "AI Automation in Calgary, AB",
    title: "AI Automation in Calgary, AB | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for Calgary businesses — trades, professional services and SMBs. Delivered remotely from BC, fixed CAD pricing from $1,500.",
    answer:
      "Handbuilt builds custom AI receptionists, chatbots, quote agents and automations for Calgary businesses — trades and home services, professional firms, and growing SMBs. Delivered remotely from British Columbia, with the same hands-on build and fixed CAD pricing from $1,500.",
    pain: "Calgary businesses compete hard for every lead — and a missed call or a slow response during a busy day is a customer who's already dialing the next name on the list.",
    scenario:
      "A Calgary home-services company loses after-hours calls and doesn't follow up on quotes fast enough. An AI receptionist answers every call and books the job; a follow-up agent chases quiet estimates. Being built from BC changes nothing — the system runs on Calgary time, around this business.",
    steps: [
      "Discovery call — over video; map where leads and time leak.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services, prices and hours.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Every call and quote captured, on Calgary time",
      "A custom worker built around your business",
      "One accountable builder, delivered remotely",
      "Fixed CAD pricing, no surprise invoices",
    ],
    sections: [
      {
        heading: "Who we build for in Calgary",
        body: "Calgary's SMB base spans trades and home services, professional and energy-adjacent firms, clinics and local service businesses. Where the same calls, quotes and follow-ups repeat daily, an AI worker pays for itself quickly.",
        bullets: [
          "Trades and home services",
          "Professional and B2B service firms",
          "Clinics, salons and appointment-based businesses",
          "Growing SMBs that need to scale without headcount",
        ],
      },
      {
        heading: "Remote delivery, identical build",
        body: "We're based in BC and build for Calgary businesses remotely — discovery over video, the system built around your real operation, support a message away. Same process, same accountability as a local build.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation calgary",
      "ai receptionist calgary",
      "ai for small business calgary ab",
      "calgary ai developer",
    ],
    related: [
      { label: "AI Automation in Edmonton, AB", href: "/locations/ai-automation-edmonton-ab" },
      { label: "Remote AI Development", href: "/remote-ai-development" },
      { label: "AI Automation Canada", href: "/ai-automation-canada" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "You're in BC — can you really serve Calgary?", a: "Yes. The build is remote by design: discovery over video, the system built around your real business, and support always a message away. The process is identical to a local one." },
      { q: "Is pricing in CAD?", a: "Yes — fixed CAD pricing. A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
      { q: "Which worker should I start with?", a: "Usually the one tied to lost revenue — an AI receptionist or a follow-up agent. The discovery call finds your fastest payback." },
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
      "AI receptionists, chatbots and automations for Edmonton businesses — trades, service firms and SMBs. Delivered remotely from BC, fixed CAD pricing from $1,500.",
    answer:
      "Handbuilt builds custom AI receptionists, chatbots, quote agents and automations for Edmonton businesses — trades and home services, professional firms, and growing SMBs. Delivered remotely from British Columbia, with the same hands-on build and fixed CAD pricing from $1,500.",
    pain: "Edmonton's service businesses run on responsiveness — through long winters and busy seasons alike, the calls and inquiries missed while the team is heads-down are revenue that quietly disappears.",
    scenario:
      "An Edmonton trades business loses calls during jobs and lets quotes go cold. An AI receptionist answers and books every call; a follow-up agent chases estimates to a decision. Built from BC, run on Edmonton time, around this specific business.",
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
      { label: "AI Automation in Calgary, AB", href: "/locations/ai-automation-calgary-ab" },
      { label: "Remote AI Development", href: "/remote-ai-development" },
      { label: "AI Automation Canada", href: "/ai-automation-canada" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Can a BC builder serve an Edmonton business?", a: "Yes — the build is remote by design and identical to a local one: discovery over video, built around your real business, support always reachable." },
      { q: "Is everything in CAD?", a: "Yes — fixed CAD pricing. A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
      { q: "Where should I start?", a: "Usually with the automation tied to lost revenue — a receptionist or follow-up agent. The discovery call pinpoints it." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
  {
    slug: "ai-automation-toronto-on",
    eyebrow: "Location",
    h1: "AI Automation in Toronto, ON",
    title: "AI Automation in Toronto, ON | Handbuilt",
    description:
      "AI receptionists, chatbots and automations for Toronto and GTA businesses — service firms, agencies, clinics and SMBs. Delivered remotely from BC, fixed CAD pricing.",
    answer:
      "Handbuilt builds custom AI receptionists, chatbots, quote agents and automations for Toronto and GTA businesses — service firms, agencies, clinics and growing SMBs. Delivered remotely from British Columbia, with the same hands-on build and fixed CAD pricing from $1,500.",
    pain: "In a market as competitive as Toronto, response speed is everything — a lead that waits even an hour for a reply has usually already engaged with a competitor who answered instantly.",
    scenario:
      "A Toronto service business and a GTA clinic both lose inquiries that arrive faster than the team can answer. An AI assistant answers and books instantly, qualifies leads, and captures after-hours inquiries — so in a crowded market, this business is the one that responds first.",
    steps: [
      "Discovery call — over video; map where leads and time leak.",
      "Scoped proposal — flat CAD price, clear outcome.",
      "Build & test — around your real services and hours.",
      "Handoff & support — working system plus optional $99/mo Care Plan.",
    ],
    gets: [
      "Instant response in a market where speed wins",
      "A custom worker built around your Toronto business",
      "One accountable builder, delivered remotely",
      "Fixed CAD pricing, no surprise invoices",
    ],
    sections: [
      {
        heading: "Who we build for in Toronto & the GTA",
        body: "Toronto's SMB and service economy is vast — professional firms, agencies, clinics, trades and local service businesses. In a market this competitive, the fastest, most consistent responder wins, and that's exactly what an AI worker delivers.",
        bullets: [
          "Service and professional firms",
          "Agencies (including white-label AI to resell)",
          "Clinics and appointment-based businesses",
          "Trades and local service businesses across the GTA",
        ],
      },
      {
        heading: "Remote delivery, identical build",
        body: "Based in BC and building for Toronto remotely — discovery over video, the system built around your real business, support a message away. In a fast market, being remote is no disadvantage: the AI responds instantly, 24/7.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation toronto",
      "ai receptionist toronto",
      "ai for small business toronto gta",
      "toronto ai developer",
    ],
    related: [
      { label: "AI Automation Canada", href: "/ai-automation-canada" },
      { label: "Remote AI Development", href: "/remote-ai-development" },
      { label: "AI Automation for Agencies", href: "/industries/agency-ai-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Can a BC studio serve Toronto?", a: "Yes — the build is remote by design and identical to a local one. In Toronto's fast market, the AI's instant 24/7 response is the real advantage, wherever the builder sits." },
      { q: "Do you work with GTA agencies?", a: "Yes — including white-label AI systems agencies resell to their own clients. See our agency automation page." },
      { q: "Is pricing in CAD?", a: "Yes — fixed CAD pricing. A single AI worker starts at $1,500 CAD, usually live in about 5 business days." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
];

export function getLocation(slug: string): LandingContent | undefined {
  return locations.find((l) => l.slug === slug);
}
