import type { LandingContent } from "./landing";

export const industriesB: LandingContent[] = [
  {
    slug: "real-estate-agent-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Real Estate Agents",
    title: "AI Automation for Real Estate Agents | Handbuilt",
    description:
      "Respond to buyer and seller leads in seconds, auto-qualify inquiries, and book showings — all without hiring an assistant. Built for Canadian realtors.",
    answer:
      "Handbuilt builds AI systems for real estate agents that respond to new leads within 60 seconds, qualify buyers by budget and timeline, and book showings directly into your calendar — starting at CAD $3,500. Most realtors lose leads because manual follow-up is too slow; this closes that gap.",
    pain:
      "A lead fills out a form at 10 pm on a Saturday. You see it Monday morning — but they already booked with the agent who texted them at 10:01. Speed-to-lead is the single biggest predictor of conversion in real estate, and most solo agents and small teams can't staff for it.",
    scenario:
      "Say a solo Vancouver Island realtor is missing roughly 3 in 10 inbound leads because replies don't go out fast enough — the lead came in at 10 PM Saturday and the agent saw it Monday morning. An AI lead-response and qualification flow could bring first-contact time down to under 2 minutes, around the clock. How many additional consultations that converts depends on the lead source and price point, but speed-to-lead is consistently one of the highest-leverage variables in real estate conversion.",
    steps: [
      "Handbuilt audits your current lead sources (web form, Realtor.ca, direct DM, referral) and maps the gaps.",
      "We build an AI that responds instantly, asks qualifying questions (budget, timeline, pre-approved?), and logs answers to your CRM.",
      "A booking agent offers available showing slots and confirms directly with the buyer — no back-and-forth.",
      "You get a daily digest of qualified leads, booked showings, and any conversations that need your personal touch.",
    ],
    gets: [
      "Sub-2-minute first response to every inbound lead, 24/7",
      "Automatic lead qualification so you spend time only on serious buyers",
      "Showing bookings that land straight in your calendar",
      "CRM records updated without manual data entry",
    ],
    sections: [
      {
        heading: "Where AI helps a real estate agent business",
        body: "Real estate runs on response speed and follow-through. AI handles the parts that are time-sensitive but not relationship-sensitive:",
        bullets: [
          "Instant lead response on web forms, listing inquiries, and social DMs — day or night",
          "Buyer pre-qualification questions (budget, timeline, financing status) before you ever pick up the phone",
          "Automated showing scheduler that syncs with your calendar and sends confirmations",
          "Follow-up sequences for cold leads who go quiet after initial contact",
          "Post-showing check-in messages and offer-update nudges",
          "Review request sent to closed clients automatically",
        ],
      },
      {
        heading: "What it costs",
        body: "Most real estate AI setups fall under the Business AI System package at CAD $3,500 (range $3,500–$7,500 depending on integrations). That covers lead response, qualification, booking, and CRM sync. A full custom buyer or listing portal starts at $10,000. There are no monthly platform fees from Handbuilt — you pay for what was built, once.",
        bullets: [
          "Business AI System: CAD $3,500–$7,500 (typically $7,500) — lead capture, qualification, booking, CRM",
          "Custom AI App: from CAD $7,500 — full client portal, listing alerts, document generation",
          "One-time build fee; you own everything",
        ],
      },
    ],
    packageId: "business",
    ctaLabel: "Book a free 20-min call",
    keywords: [
      "real estate agent AI automation",
      "AI lead follow-up for realtors",
      "realtor chatbot Canada",
      "automated showing booking AI",
    ],
    related: [
      { label: "Lead Capture AI for Real Estate", href: "/use-cases/lead-capture-ai-for-real-estate" },
      { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
      { label: "AI CRM Automation", href: "/services/ai-crm-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Which CRMs can the AI sync with?",
        a:
          "We build integrations with Follow Up Boss, HubSpot, kvCORE, Wise Agent, and most platforms that offer a webhook or API. If you use a spreadsheet today, we can automate that too — then help you migrate to a proper CRM as a second phase.",
      },
      {
        q: "Will buyers know they're talking to an AI?",
        a:
          "The AI introduces itself as your digital assistant — it does not pretend to be you. Most buyers are fine with it for the initial exchange; you step in for anything that needs judgment or negotiation. Handbuilt sets the handoff rules based on how you work.",
      },
      {
        q: "How fast can this go live?",
        a:
          "A standard lead-response and booking setup takes 2–3 weeks from kickoff to live. That includes connecting your lead sources, configuring the qualification questions, and testing the booking flow with your calendar.",
      },
    ],
    schema: "Service",
    icon: "Magnet",
  },
  {
    slug: "dental-clinic-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Dental Clinics",
    title: "AI Automation for Dental Clinics | Handbuilt",
    description:
      "Cut no-shows, fill last-minute cancellations, and handle after-hours booking requests — without adding front-desk headcount. Built for Canadian dental practices.",
    answer:
      "Handbuilt builds AI systems for dental clinics that send automated appointment reminders, fill cancelled slots from a waitlist, answer common patient questions after hours, and handle new-patient intake — starting at CAD $3,500. No-shows and unfilled chairs are the margin killers most clinics accept as normal; they don't have to be.",
    pain:
      "A dental clinic runs on a tight hourly schedule. One no-show at 2 pm means that chair sits empty for an hour — lost revenue that can't be recovered. Meanwhile, the front desk is fielding calls about office hours, parking, and whether you take their insurance plan, leaving less time to actually fill the gap.",
    scenario:
      "Consider a two-dentist clinic averaging 6–8 no-shows per week — each one an empty chair for an hour. A three-touch reminder sequence (72 hours, 24 hours, 2 hours before) plus an automated waitlist text when a cancellation comes in could plausibly cut that to 2–3 per week. The exact reduction depends on your patient population and how early they're reminded, but adding the 2-hour touchpoint before the appointment tends to have an outsized effect on same-day no-shows.",
    steps: [
      "Handbuilt maps your current booking system (Dentrix, Jane App, phone-only, etc.) and identifies where patients fall off.",
      "We build reminder and confirmation sequences over SMS and email, with a one-tap confirm or cancel link.",
      "A cancellation trigger fires automatically, texts your waitlist, and books the first person who responds.",
      "An after-hours chat handles FAQs (insurance accepted, new-patient process, emergency contacts) and captures booking requests for morning review.",
    ],
    gets: [
      "Automated 3-touch reminder sequence per appointment",
      "Waitlist auto-fill when a cancellation comes in",
      "After-hours FAQ and intake capture so nothing falls through overnight",
      "Front desk freed from repetitive call volume",
    ],
    sections: [
      {
        heading: "Where AI helps a dental clinic business",
        body: "Dental clinics have predictable, recurring appointment cycles — which makes them well-suited for automation. The highest-ROI areas:",
        bullets: [
          "Appointment reminders at 72h, 24h, and 2h — with confirm/cancel links that update the schedule automatically",
          "Waitlist management: cancelled slot triggers an instant text to the next person on the list",
          "Recall campaigns: patients due for a cleaning get a nudge at the right interval without front-desk effort",
          "New-patient intake form collected before arrival — medical history, insurance info, chief concern",
          "After-hours chatbot answering insurance questions, directions, and emergency-contact routing",
          "Post-visit review request sent automatically a day after the appointment",
        ],
      },
      {
        heading: "What it costs",
        body: "Most dental clinic setups land in the Business AI System range at CAD $3,500 (range $3,500–$7,500). That covers reminders, waitlist, intake, and after-hours chat. Integration with practice management software (Dentrix, Jane App) is included in scoping — some platforms charge their own API fees which we flag upfront.",
        bullets: [
          "Business AI System: CAD $3,500–$7,500 (typically $7,500) — reminders, waitlist, intake, FAQ bot",
          "Custom AI App: from CAD $7,500 — full patient portal, insurance verification workflow, multi-location",
          "One-time build fee; no ongoing Handbuilt subscription",
        ],
      },
    ],
    packageId: "business",
    ctaLabel: "Book a free 20-min call",
    keywords: [
      "dental clinic AI automation",
      "AI appointment reminders dental",
      "no-show reduction dental practice",
      "dental chatbot Canada",
    ],
    related: [
      { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
      { label: "AI SMS Automation", href: "/services/ai-sms-automation" },
      { label: "AI Intake Form Builder", href: "/services/ai-intake-form-builder" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Can this connect to Dentrix or Jane App?",
        a:
          "Jane App has a solid API and webhook support — Handbuilt integrates with it directly. Dentrix is more closed; we typically work around it using email-parsed triggers or a lightweight middleware layer. We scope the exact approach before any contract is signed.",
      },
      {
        q: "What happens if a patient cancels via the reminder link?",
        a:
          "The slot is marked open in the system and the waitlist trigger fires immediately. The first waitlist patient who confirms gets booked; everyone else gets a polite 'slot filled' message. You see the updated schedule in real time.",
      },
      {
        q: "Is patient data handled securely?",
        a:
          "Handbuilt uses data flows that keep patient information within your existing systems wherever possible. We follow PIPEDA requirements and can work within your existing compliance setup. We don't store health data on Handbuilt infrastructure.",
      },
    ],
    schema: "Service",
    icon: "CalendarCheck",
  },
  {
    slug: "salon-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Salons & Barbershops",
    title: "AI Automation for Salons & Barbershops | Handbuilt",
    description:
      "Let clients book their preferred stylist, get reminded automatically, and join a waitlist when you're full — without tying up the phone. Built for Canadian salons.",
    answer:
      "Handbuilt builds AI systems for salons and barbershops that handle online booking by stylist, send SMS reminders, manage a digital waitlist, and answer after-hours questions about services and pricing — starting at CAD $3,500. If you're still taking bookings by phone or DM, you're losing clients to salons that let them book at midnight.",
    pain:
      "Salons run on stylist-specific bookings — a client doesn't just want an appointment, they want their person at the right time. Managing that across three or four stylists via phone, Instagram DM, and a paper book means double-bookings, missed requests, and a receptionist who can't step away from the desk.",
    scenario:
      "Take a four-chair salon handling bookings through a mix of phone calls and Instagram DMs, with stylists getting double-booked roughly twice a week because there's no single source of truth. Per-stylist online booking with automated confirmation and a 24-hour SMS reminder would likely eliminate most of those conflicts — the double-booking problem is almost always a visibility problem, not a volume problem. The front desk time recovered from managing conflicts and confirming appointments by hand could easily run 60–90 minutes a day for a salon this size.",
    steps: [
      "Handbuilt reviews your current booking method and service menu to map stylist availability and service durations.",
      "We configure an AI booking flow — client picks service, picks stylist, picks time — with real-time availability.",
      "Confirmation goes out immediately; a reminder fires 24 hours before with a confirm or reschedule link.",
      "After-hours messages asking about pricing, services, or availability get answered by the AI and routed to a booking link.",
    ],
    gets: [
      "Per-stylist online booking that updates availability in real time",
      "Automated SMS confirmation and 24-hour reminder per appointment",
      "After-hours AI that answers service and pricing questions",
      "Digital waitlist for fully booked days with automatic notification when a slot opens",
    ],
    sections: [
      {
        heading: "Where AI helps a salon or barbershop business",
        body: "Salons have high repeat-visit rates and stylist loyalty — the right automation protects that relationship while reducing admin load:",
        bullets: [
          "Online booking by stylist, service, and time — available 24/7 without phone tag",
          "Automated confirmation and 24-hour SMS reminder with a one-tap reschedule option",
          "Waitlist: fully-booked slots trigger an automatic notification when a cancellation opens",
          "After-hours chatbot answering pricing, service descriptions, colour policy, and parking",
          "Automated review request sent the day after the appointment",
          "Recall nudge for clients who haven't rebooked in 8–10 weeks",
        ],
      },
      {
        heading: "What it costs",
        body: "Most salon setups land in the Business AI System range at CAD $3,500 (range $3,500–$7,500 depending on number of stylists and integrations). We work with Square Appointments, Vagaro, Fresha, and custom setups. One-time build fee — no ongoing Handbuilt cost.",
        bullets: [
          "Business AI System: CAD $3,500–$7,500 (typically $7,500) — booking, reminders, waitlist, FAQ bot",
          "Custom AI App: from CAD $7,500 — loyalty tracking, multi-location, staff scheduling overlay",
          "One-time fee; you own the setup",
        ],
      },
    ],
    packageId: "business",
    ctaLabel: "Book a free 20-min call",
    keywords: [
      "salon AI automation",
      "barbershop booking AI",
      "hair salon appointment reminders",
      "AI booking system for salons Canada",
    ],
    related: [
      { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
      { label: "AI SMS Automation", href: "/services/ai-sms-automation" },
      { label: "AI Review Request System", href: "/services/ai-review-request-system" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Can clients still request a specific stylist when booking online?",
        a:
          "Yes — stylist selection is built into the booking flow. The AI shows each stylist's available slots separately so clients pick their person first, then the time. If their preferred stylist is fully booked, they can join the waitlist for that specific stylist.",
      },
      {
        q: "What booking platforms do you integrate with?",
        a:
          "We work with Square Appointments, Vagaro, Fresha, and Acuity. If you're using a spreadsheet or paper book, we can migrate you to one of those platforms as part of the project scope.",
      },
      {
        q: "What if a client wants to book through Instagram?",
        a:
          "We set up an auto-reply on your Instagram DMs that sends a direct booking link when someone asks about appointments. They go from DM to booked slot without you touching it.",
      },
    ],
    schema: "Service",
    icon: "CalendarCheck",
  },
  {
    slug: "restaurant-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Restaurants",
    title: "AI Automation for Restaurants | Handbuilt",
    description:
      "Handle reservation requests, answer menu and allergen questions, and confirm large-party bookings automatically — without putting customers on hold. For Canadian restaurants.",
    answer:
      "Handbuilt builds AI systems for restaurants that take reservation requests 24/7, answer common questions about menu items, allergens, and hours, and send confirmation messages — starting at CAD $3,500. If your host stand is fielding the same five questions on every Friday call, that's time and staff bandwidth that can be automated.",
    pain:
      "A busy restaurant gets 30–50 calls on a Friday afternoon — half of them are 'do you have gluten-free options?' or 'what time do you close?' The host is pulled away from the floor to answer questions that never change, while actual reservation calls wait on hold and sometimes hang up.",
    scenario:
      "Imagine a casual dining restaurant missing an estimated 12–15 reservation calls per weekend because the line is busy with FAQ calls — hours, menu questions, parking. An AI handling those FAQ calls via SMS or web chat and capturing reservation requests could free the host for floor work and stop the missed-call leak. How much of that capacity you'd recover depends on your call mix, but for restaurants where a meaningful share of calls are answerable with static information, the host's time and the missed-reservation rate both tend to improve.",
    steps: [
      "Handbuilt reviews your current reservation method (phone, OpenTable, Resy, walk-in only) and call volume patterns.",
      "We build an AI that handles inbound FAQ questions via SMS or web chat and captures reservation requests with party size, date, and contact info.",
      "Confirmation messages go out automatically; large-party requests get flagged for manual approval before confirming.",
      "The AI syncs confirmed reservations to your existing system or a simple dashboard the host can see in real time.",
    ],
    gets: [
      "24/7 reservation request capture via SMS and web chat",
      "Instant answers to hours, menu, allergen, and parking questions",
      "Automated confirmation messages with date, time, and party size",
      "Large-party flagging so you approve before it's locked in",
    ],
    sections: [
      {
        heading: "Where AI helps a restaurant business",
        body: "Restaurants live on throughput and guest experience. AI covers the high-volume, repetitive communication so your team focuses on service:",
        bullets: [
          "Reservation intake via web chat and SMS — captures party size, date, time, and special requests",
          "Automated confirmation and reminder message sent the morning of the reservation",
          "FAQ handling: hours, menu highlights, allergen information, dress code, parking, corkage policy",
          "Large-party or private-event inquiry capture with a structured form and staff notification",
          "No-show follow-up for repeat guests with a rebooking offer",
          "Post-visit review request sent automatically after the reservation date",
        ],
      },
      {
        heading: "What it costs",
        body: "Most restaurant setups fall under the Business AI System at CAD $3,500 (range $3,500–$7,500). That covers reservation capture, confirmation, FAQ bot, and a basic dashboard. Integration with OpenTable or Resy is available and scoped upfront — those platforms charge their own fees.",
        bullets: [
          "Business AI System: CAD $3,500–$7,500 (typically $7,500) — reservations, FAQ, confirmations",
          "Custom AI App: from CAD $7,500 — full ordering integration, loyalty program, multi-location",
          "One-time build fee from Handbuilt",
        ],
      },
    ],
    packageId: "business",
    ctaLabel: "Book a free 20-min call",
    keywords: [
      "restaurant AI automation",
      "AI reservation system restaurant",
      "restaurant chatbot Canada",
      "automated restaurant FAQ bot",
    ],
    related: [
      { label: "AI Chatbot for Restaurants", href: "/use-cases/ai-chatbot-for-restaurants" },
      { label: "AI Receptionist Setup", href: "/services/ai-receptionist-setup" },
      { label: "AI SMS Automation", href: "/services/ai-sms-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Can the AI actually take a reservation, or does it just collect info?",
        a:
          "For most restaurant setups, the AI captures the request and sends a confirmation once a staff member approves it — this keeps you in control of the book. If you want fully automated confirmation for standard table sizes (2–4 guests), we can configure that with rules you set (times, availability windows, party size caps).",
      },
      {
        q: "What about allergen questions — how accurate is it?",
        a:
          "The AI only answers allergen questions based on information you provide and approve. We build the FAQ knowledge base from your menu and have you review it before it goes live. It will not guess or infer allergen information — if something isn't in the approved list, it tells the guest to call or ask the server.",
      },
      {
        q: "Does it work with OpenTable or Resy?",
        a:
          "We can push reservation data into OpenTable via their API and Resy through available integrations. The exact approach depends on your subscription tier with those platforms — we scope it before the project starts so there are no surprises.",
      },
    ],
    schema: "Service",
    icon: "MessagesSquare",
  },
  {
    slug: "auto-detailing-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Auto Detailing Shops",
    title: "AI Automation for Auto Detailing Shops | Handbuilt",
    description:
      "Quote by vehicle type automatically, fill your booking calendar without back-and-forth texts, and follow up on estimates that never converted. For Canadian detailers.",
    answer:
      "Handbuilt builds AI systems for auto detailing shops that generate quotes based on vehicle type and service tier, book confirmed slots into your calendar, and follow up on unanswered estimates — starting at CAD $3,500. Most detailers spend 30–60 minutes a day on quote requests that could be handled automatically.",
    pain:
      "An auto detailing quote depends on the vehicle — a full-size SUV takes longer than a coupe, a ceramic coat costs more than a basic wash. Every quote request means a back-and-forth: 'What car do you have? What service? When do you want to come in?' That loop eats time that should be spent detailing.",
    scenario:
      "Say a mobile detailer fields roughly 20 inquiries a week via Instagram DM and text — each one requiring 3–4 back-and-forth messages over hours to nail down the vehicle, the service, and a time. An AI quote flow where the customer selects vehicle type, picks a service package, gets an instant price, and books the slot could compress that to under 5 minutes per inquiry. At 20 inquiries a week, that's a meaningful daily time recovery and a faster path to a confirmed booking while the client is still engaged.",
    steps: [
      "Handbuilt documents your service menu and pricing by vehicle class (sedan, SUV/truck, van, exotic) and service tier (basic wash, full interior/exterior, ceramic coat, etc.).",
      "An AI quote form is embedded on your site or shared as a link — customer selects vehicle and service, gets an instant price.",
      "On quote acceptance, the AI offers available booking slots and sends a confirmation with deposit instructions if applicable.",
      "Unanswered quotes get an automated follow-up at 24 hours and 72 hours; booked clients get a reminder the day before.",
    ],
    gets: [
      "Instant AI quotes by vehicle type and service tier — no back-and-forth",
      "Booking calendar fills automatically when a quote is accepted",
      "Automated follow-up on quotes that didn't convert",
      "Day-before reminder to reduce no-shows",
    ],
    sections: [
      {
        heading: "Where AI helps an auto detailing business",
        body: "Auto detailing has a predictable quote structure — vehicle + service = price. That predictability makes it highly automatable:",
        bullets: [
          "Instant quote generator: customer inputs vehicle type and service tier, gets a price in seconds",
          "Online booking on quote acceptance — time slot confirmed without any phone call",
          "Automated follow-up sequence for estimates that weren't booked (24h and 72h nudge)",
          "Day-before appointment reminder via SMS",
          "After-service review request sent automatically",
          "Upsell prompt for add-ons (interior protection, paint sealant) included in the confirmation message",
        ],
      },
      {
        heading: "What it costs",
        body: "Auto detailing AI setups typically fall in the Business AI System range at CAD $3,500 (range $3,500–$7,500 depending on service complexity and mobile vs. shop setup). A Starter AI Setup at CAD $1,500 covers quote form + basic booking if you want to start simple.",
        bullets: [
          "Starter AI Setup: CAD $1,500 — AI quote form + calendar booking link, no follow-up automation",
          "Business AI System: CAD $3,500–$7,500 (typically $7,500) — quote, booking, follow-up, reminders, reviews",
          "One-time build fee; you keep everything",
        ],
      },
    ],
    packageId: "business",
    ctaLabel: "Book a free 20-min call",
    keywords: [
      "auto detailing AI automation",
      "AI quote generator detailing",
      "detailing shop booking automation",
      "auto detail chatbot Canada",
    ],
    related: [
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
      { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
      { label: "AI Review Request System", href: "/services/ai-review-request-system" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What if my pricing varies — can the AI handle exceptions?",
        a:
          "Yes. We build in a 'contact for custom quote' fallback for vehicles or situations outside your standard pricing matrix (exotics, heavily soiled vehicles, fleet jobs). The AI handles the standard cases automatically and flags the edge cases for you to handle personally.",
      },
      {
        q: "Can this work for a mobile detailing operation without a fixed location?",
        a:
          "Absolutely — mobile detailers are actually a strong fit. The quote flow works via a link you share anywhere (Instagram bio, Google Business Profile, text). The booking step can capture the client's address and map it to your service area before confirming.",
      },
      {
        q: "How do deposits work with automated booking?",
        a:
          "If you require a deposit to hold a slot, we integrate with Stripe or Square so the client pays the deposit as part of the booking confirmation step. The slot isn't marked as booked until the deposit clears — which also reduces no-shows significantly.",
      },
    ],
    schema: "Service",
    icon: "Sparkles",
  },
{
  slug: "fence-company-ai-automation",
  eyebrow: "Industry",
  schema: "Service" as const,
  icon: "Wrench",
  h1: "AI Automation for Fence Companies",
  title: "AI Tools for Fence Companies — Quotes & Follow-Ups",
  description: "An AI worker for your fence company handles quote requests, missed calls, and follow-ups while you're on site. Fixed CAD pricing, built in Surrey BC.",
  answer: "A fence company AI setup handles inbound calls, captures quote details, and follows up on cold estimates automatically. Two or three connected workers, starting at $1,500 CAD. You stop losing jobs to whoever picks up the phone first.",
  pain: "Fence installs keep you off-site for hours. By the time you check your phone, the caller has already booked with someone else. Quote requests pile up, follow-up emails don't happen, and the prospects who needed a fence last week have moved on.",
  scenario: `Say a fencing company runs two crews during peak season. Between measuring and installing, the owner fields 8–12 inbound calls a day — many of them asking the same things about pricing per linear foot, timing, and materials. An AI receptionist could answer those calls, collect job details (footage, fence type, gate count, timing), and send the owner a clean lead card instead of a pile of voicemails.\n\nA follow-up worker could automatically ping the quotes that go quiet after 3–4 days with a short, friendly message. The exact lift depends on call volume and how many callers would have waited for a callback versus calling someone else. In a trade where a single job is worth several thousand dollars, one recovered lead covers the system cost.`,
  steps: [
    "Discovery call — we map your quote intake flow, job types, and where leads go quiet",
    "Scoped proposal — a fixed-price plan for the workers you actually need",
    "Build and test — connected to your phone or form, tested with real scenarios before handoff",
    "Handoff and optional Care Plan — you own the system; ongoing updates available for $99/mo CAD"
  ],
  gets: [
    "AI receptionist that answers calls and collects job details while you're installing",
    "Quote intake that captures footage, fence type, and timing — no back-and-forth",
    "Follow-up worker that pings cold quotes automatically at set intervals",
    "Missed-call text-back so off-site hours don't cost you leads",
    "Clean job summaries delivered to your phone or inbox",
    "A system you own outright — no ongoing platform fees unless you want the Care Plan"
  ],
  sections: [
    {
      heading: "What an AI worker does for a fence company",
      body: "A fence company AI setup typically runs two or three workers: one answers the phone and collects lead details, one handles quote intake questions (footage, materials, gates, site type), and one follows up with prospects who went quiet after receiving a quote. None of these require you to be near your phone.",
      bullets: [
        "AI receptionist — answers inbound calls, captures lead info, texts back missed calls",
        "Quote intake worker — asks the right questions to scope a job before you visit",
        "Follow-up agent — sends 2–3 touchpoints to quotes that haven't responded"
      ]
    },
    {
      heading: "Which workers pay back first",
      body: "In a seasonal, high-volume trade like fencing, the receptionist pays back fastest — it catches the calls you miss on-site. The follow-up agent is close behind: fence jobs have long quote cycles and most competitors don't follow up at all. Even one recovered job typically covers the cost of the system.",
    },
    {
      heading: "Built around your real jobs",
      body: "We don't drop in a generic chatbot. We map your actual job types (wood privacy, chain link, vinyl, commercial), your typical quote range, and your service area before building anything. The intake form asks the questions you'd ask on a site visit. The follow-up messages sound like you wrote them.",
    }
  ],
  packageId: "business" as const,
  ctaLabel: "Get this built for your business",
  keywords: [
    "fence company AI automation",
    "AI receptionist for fence contractors",
    "fence quote intake automation",
    "missed call recovery fencing business",
    "AI follow-up for fence company"
  ],
  related: [
    { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
    { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
    { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
    { label: "Roofing AI Automation", href: "/industries/roofing-ai-automation" },
    { label: "Contractor AI Automation", href: "/industries/contractor-ai-automation" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "Will this work with my existing phone number?",
      a: "Yes — we route calls from your current number through the AI system. You keep your number; callers get a live response instead of voicemail."
    },
    {
      q: "What if I only want the receptionist, not the follow-up worker?",
      a: "The AI Starter System at $1,500 CAD covers one worker. If you just want missed-call handling and basic quote intake, that's the right fit. You can add more workers later if the volume justifies it."
    },
    {
      q: "Can it quote jobs automatically?",
      a: "It can collect everything needed to quote — footage, fence type, gates, site details — and send you a clean summary. Actual pricing decisions stay with you. The goal is to cut the back-and-forth, not replace your judgment."
    },
    {
      q: "How long does setup take?",
      a: "The AI Starter System (one worker) is typically live in about 5 business days. The AI Business System with 2–4 workers takes 2–3 weeks."
    },
    {
      q: "Do I need a CRM?",
      a: "No. If you have one, we connect to it. If you don't, leads and job summaries go to your email or a spreadsheet. You don't need to change how your business runs."
    },
    {
      q: "What does it cost?",
      a: "AI Starter System is $1,500 CAD. The AI Business System — what most fence companies use for quote intake plus follow-up — is $3,500–$7,500 CAD, typically $7,500. Optional Care Plan is $99/mo."
    }
  ]
},
{
  slug: "deck-builder-ai-automation",
  eyebrow: "Industry",
  schema: "Service" as const,
  icon: "Home",
  h1: "AI Automation for Deck Builders",
  title: "AI Automation for Deck Builders — Quotes & Booking",
  description: "An AI system for deck builders handles detailed quote intake, site-visit booking, and long-cycle follow-ups. Fixed CAD pricing, built by Handbuilt AI in Surrey BC.",
  answer: "Deck builder AI automation captures detailed project specs upfront, books site visits, and keeps long-cycle prospects warm with automatic follow-ups. Packages start at $3,500 CAD. You spend less time chasing and more time building.",
  pain: "Deck projects take weeks to close — and that's if the lead doesn't ghost you after the first quote. Gathering material specs, square footage, and railing preferences by phone wastes hours. Then the prospect disappears for two weeks and you have to remember to follow up.",
  scenario: `Say a deck builder regularly sends out 8–10 quotes a month. Getting to each quote requires two or three phone calls just to gather specs — size, materials, whether they want a pergola, how many levels, when they want to start. An AI intake worker could capture all of that upfront via a form or call, so the builder shows up to the site visit already knowing what they're pricing.\n\nFor quotes that go quiet after the estimate, an automatic follow-up sequence could send 2–3 messages spaced a week apart. The exact conversion lift depends on the builder's typical sales cycle and how many leads actually respond to follow-up. But in a trade where a single deck project is worth $15,000–$40,000, even modest improvement in follow-up response rates compounds fast.`,
  steps: [
    "Discovery call — we map your intake questions, quote process, and where prospects drop off",
    "Scoped proposal — fixed price covering intake, booking, and follow-up workers",
    "Build and test — connected to your calendar and contact system, tested before handoff",
    "Handoff and optional Care Plan — you own it; $99/mo CAD for ongoing updates"
  ],
  gets: [
    "AI quote intake that collects specs (size, materials, timeline) before the site visit",
    "Calendar booking worker so prospects can schedule visits without a phone call",
    "Automated follow-up sequence for quotes that go quiet",
    "Missed-call text-back during busy build days",
    "Clean project briefs delivered before every site visit",
    "A system you own — no monthly platform dependency"
  ],
  sections: [
    {
      heading: "What an AI worker does for a deck builder",
      body: "Deck projects have long sales cycles and detail-heavy quotes. An AI setup for a deck builder typically handles three things: gathering project specs upfront (so site visits aren't discovery trips), booking the site visit directly into the builder's calendar, and following up with prospects who received a quote but went quiet.",
      bullets: [
        "Quote intake worker — captures size, materials, railing type, timeline, and budget range",
        "Calendar booking agent — lets prospects schedule site visits 24/7",
        "Follow-up agent — nurtures cold quotes with timed, personal-sounding messages"
      ]
    },
    {
      heading: "Which workers pay back first",
      body: "For deck builders, the follow-up agent often pays back fastest. Most competitors send one quote and wait. A three-touch follow-up sequence — sent automatically at day 3, 7, and 14 — keeps you in front of prospects without any manual effort. The intake worker saves time on every site visit, which adds up quickly during peak season.",
    },
    {
      heading: "Built around your project types",
      body: "We don't ask you to adapt to a generic system. Before building, we map your typical project types (composite, wood, multi-level, pergolas), your service area, and your quote process. The intake form asks what you'd ask. The follow-up messages match how you communicate.",
    }
  ],
  packageId: "business" as const,
  ctaLabel: "Get this built for your business",
  keywords: [
    "deck builder AI automation",
    "AI quote intake for deck contractors",
    "deck builder follow-up automation",
    "AI booking system for deck builders",
    "deck contractor lead automation BC"
  ],
  related: [
    { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
    { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
    { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
    { label: "Fence Company AI Automation", href: "/industries/fence-company-ai-automation" },
    { label: "Contractor AI Automation", href: "/industries/contractor-ai-automation" },
    { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" }
  ],
  faqs: [
    {
      q: "What kind of specs can the intake worker collect?",
      a: "Whatever you need for a quote — square footage, deck height, material preference, railing type, number of levels, pergola or shade structure, estimated start date, and budget range. We build the intake questions around your actual quoting process."
    },
    {
      q: "Can it connect to my existing calendar?",
      a: "Yes — we connect to Google Calendar, Calendly, or similar tools. Prospects pick a time, it lands in your calendar, and you both get a confirmation."
    },
    {
      q: "My sales cycle is 3–4 weeks. Will follow-up automation annoy prospects?",
      a: "The sequence is spaced and written to sound human, not pushy. A typical setup might be: a thank-you on day 1, a check-in on day 5, and a last-touch on day 14. You review and approve the messages before anything goes out."
    },
    {
      q: "What does it cost?",
      a: "The AI Business System — the right fit for deck builders needing intake, booking, and follow-up — is $3,500–$7,500 CAD, typically $7,500 flat. Optional Care Plan is $99/mo."
    },
    {
      q: "How long does setup take?",
      a: "Two to three weeks for the AI Business System with 2–4 connected workers. We don't rush it — we test the intake questions and follow-up sequences with you before going live."
    },
    {
      q: "I'm a solo builder — is this overkill?",
      a: "Not necessarily. A solo builder running 8–10 active quotes benefits from the intake and follow-up automation just as much as a larger operation — maybe more, since there's no office staff to handle the admin."
    }
  ]
},
{
  slug: "painter-ai-automation",
  eyebrow: "Industry",
  schema: "Service" as const,
  icon: "Paintbrush",
  h1: "AI Automation for Painters",
  title: "AI Automation for Painters — Quotes, Reviews & Leads",
  description: "AI workers for painters handle quote intake, call overflow, follow-up on cold estimates, and review requests. Fixed CAD pricing, built by Handbuilt AI in Surrey BC.",
  answer: "A painter AI setup handles high call volume, captures quote details for small and large jobs, follows up on estimates, and automatically asks satisfied customers for reviews. Starts at $1,500 CAD. Seasonal call spikes no longer mean missed revenue.",
  pain: "Painting businesses run on volume — many small jobs, tight margins, and a constant flow of inbound quote requests. During peak season you're painting and your phone is ringing. Answering every call, quoting every job, and remembering to ask for reviews takes more time than the jobs themselves.",
  scenario: `Say a residential painting company does 4–6 jobs a week during the spring and summer rush. Between crew management and on-site work, the owner misses 3–4 calls a day. Some of those callers leave messages; most just call the next painter in search results. An AI receptionist could answer those calls, ask the right scoping questions (interior or exterior, square footage, number of rooms, prep needed), and send a clean summary to the owner.\n\nAfter a job wraps up, an automated review request sent 2–3 days later could meaningfully increase the number of Google reviews the business receives. Reviews are the main trust signal for painting businesses — more reviews typically means higher map-pack rankings and more inbound calls. The exact conversion rate varies, but the ask costs nothing once it's automated.`,
  steps: [
    "Discovery call — we map your quote intake questions, job types, and review request timing",
    "Scoped proposal — fixed price covering the workers you need (receptionist, intake, reviews)",
    "Build and test — connected to your phone or form, reviewed with you before going live",
    "Handoff and optional Care Plan — you own it; $99/mo for ongoing adjustments"
  ],
  gets: [
    "AI receptionist that handles call overflow and captures quote details",
    "Quote intake that scopes interior or exterior jobs without a callback",
    "Follow-up worker for estimates that go quiet after a week",
    "Automated review request sent after job completion",
    "Missed-call text-back during on-site hours",
    "A system you own — no platform subscription required"
  ],
  sections: [
    {
      heading: "What an AI worker does for a painting business",
      body: "Painting businesses deal with high call volume, many small quotes, and strong dependence on word-of-mouth and reviews. An AI setup typically covers three areas: catching inbound calls and scoping jobs, following up on quotes that don't close quickly, and asking happy customers for a review at the right moment.",
      bullets: [
        "AI receptionist — answers calls, collects scope details, texts back missed calls",
        "Quote intake worker — asks interior/exterior, square footage, surface prep, timeline",
        "Review request agent — sends a short message 2–3 days after job completion"
      ]
    },
    {
      heading: "Why reviews matter more for painters than most trades",
      body: "Painting is a high-trust, high-volume trade. Most homeowners search locally and pick from the top 3–5 results. More recent Google reviews directly influence where you rank in the map pack. An automated review request — sent at the right time, in plain language — removes the awkwardness of asking in person and captures feedback while the job is still fresh.",
    },
    {
      heading: "Starter or Business — which is right?",
      body: "The AI Starter System ($1,500 CAD) works well for a solo painter who mainly needs missed-call handling and basic intake. The AI Business System ($3,500–$7,500 CAD) is the right fit if you're running a crew, handling volume quotes, and want intake plus follow-up plus review requests all connected.",
    }
  ],
  packageId: "starter" as const,
  ctaLabel: "Get this built for your business",
  keywords: [
    "painter AI automation",
    "AI receptionist for painting company",
    "painting business quote intake automation",
    "AI review request system painters",
    "missed call recovery painting contractor"
  ],
  related: [
    { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
    { label: "AI Review Request System", href: "/services/ai-review-request-system" },
    { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
    { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
    { label: "Contractor AI Automation", href: "/industries/contractor-ai-automation" },
    { label: "AI Automation Examples", href: "/resources/ai-automation-examples-for-small-business" }
  ],
  faqs: [
    {
      q: "I'm one painter — is this worth it for me?",
      a: "The AI Starter System at $1,500 CAD is built for exactly this. One worker — a receptionist that answers calls and captures quote details — can recover the jobs you're missing while you're on a ladder."
    },
    {
      q: "Can the AI scope a painting job accurately?",
      a: "It can collect the information needed to quote — interior vs. exterior, number of rooms or square footage, surface condition, prep scope, and timeline. Actual pricing stays with you. The goal is getting the right info before a callback, not replacing your site assessment."
    },
    {
      q: "What does the review request look like?",
      a: "A short, plain-language text or email — something like 'Thanks for having us in — if you're happy with the work, a quick Google review means a lot.' We write it to sound like you, not like a survey. You approve it before it goes out."
    },
    {
      q: "What does it cost?",
      a: "AI Starter System is $1,500 CAD. The AI Business System covering intake, follow-up, and review requests is $3,500–$7,500 CAD, typically $7,500. Optional Care Plan is $99/mo."
    },
    {
      q: "How long does setup take?",
      a: "The Starter (one worker) is live in about 5 business days. The Business System takes 2–3 weeks."
    },
    {
      q: "Will this work with my iPhone — I don't have a business phone system?",
      a: "Yes. We can set up a separate business number that forwards to your personal phone when needed, and routes through the AI first. No complicated hardware required."
    }
  ]
},
{
  slug: "clinic-ai-automation",
  eyebrow: "Industry",
  schema: "Service" as const,
  icon: "Stethoscope",
  h1: "AI Automation for Clinics & Medical Offices",
  title: "AI Automation for Clinics — Booking & Front-Desk",
  description: "AI front-desk automation for clinics: appointment booking, reminders, after-hours intake, and patient admin. Front-desk scope only — no medical advice. Fixed CAD pricing.",
  answer: "A clinic AI front-desk system handles appointment booking, sends reminders to reduce no-shows, manages after-hours intake, and answers common administrative questions. Starts at $3,500 CAD. Front-desk and admin scope only — the AI does not give medical advice.",
  pain: "Clinic front desks spend a large portion of every day handling the same calls: booking appointments, confirming times, answering questions about hours and location, and managing cancellations. After hours, calls go to voicemail and patients book elsewhere or show up without a confirmed slot.",
  scenario: `Say a physiotherapy clinic fields 40–60 calls a day during peak hours. Most are appointment requests, reschedules, and questions about parking or insurance coverage. Two front-desk staff handle this alongside check-ins and administrative paperwork — meaning phones often go unanswered during busy periods. An AI receptionist could handle routine booking requests, confirm appointment details, and send automated reminders to reduce no-shows.\n\nAfter-hours calls are particularly high-value: patients who can't reach a clinic during the day often book with whoever responds first. An AI that answers after hours, captures the appointment request, and confirms it by text means those patients don't leave for the next clinic in search results. The exact impact depends on call volume and how many after-hours requests currently go unanswered.`,
  steps: [
    "Discovery call — we map your booking flow, common patient questions, and after-hours needs",
    "Scoped proposal — fixed price, admin and front-desk scope defined clearly upfront",
    "Build and test — connected to your calendar system, tested with realistic scenarios",
    "Handoff and optional Care Plan — $99/mo CAD for ongoing adjustments and updates"
  ],
  gets: [
    "AI receptionist handling routine booking calls and appointment questions",
    "Automated appointment reminders reducing no-shows",
    "After-hours intake capturing appointment requests when staff are unavailable",
    "FAQ handling for hours, location, insurance questions, and directions",
    "New patient intake form collection before the first visit",
    "A system that stays strictly within front-desk and admin scope — no clinical decisions"
  ],
  sections: [
    {
      heading: "What a clinic AI worker handles — and what it doesn't",
      body: "A clinic AI system is scoped strictly to front-desk and administrative tasks: booking, reminders, directions, hours, general FAQ, and intake form collection. It does not triage symptoms, give medical guidance, provide clinical recommendations, or handle anything requiring a regulated health professional. Patients asking clinical questions are directed to call or speak with staff.",
      bullets: [
        "Appointment booking and rescheduling",
        "Automated reminders (text or email)",
        "After-hours intake and callback requests",
        "New patient intake form delivery",
        "FAQ: hours, location, parking, accepted insurance"
      ]
    },
    {
      heading: "Privacy and data handling",
      body: "Patient data is handled carefully. We discuss data residency, retention, and access controls during scoping. We are not a covered entity under PIPEDA/PHIPA and cannot provide compliance guarantees — your clinic's compliance obligations remain with you and your legal/privacy advisors. We build around the constraints you provide and flag anything that needs your review.",
    },
    {
      heading: "Which clinics benefit most",
      body: "Clinics with high call volume, limited front-desk capacity, and a significant after-hours call load see the clearest return. Physiotherapy, chiropractic, massage therapy, and specialist offices all fit this profile. Larger multi-practitioner practices can particularly benefit from the booking and reminder system reducing no-shows across multiple schedules.",
    }
  ],
  packageId: "business" as const,
  ctaLabel: "Get this built for your business",
  keywords: [
    "clinic AI automation BC",
    "AI receptionist for medical office",
    "AI appointment booking for clinic",
    "after-hours patient intake automation",
    "AI front-desk system for healthcare"
  ],
  related: [
    { label: "AI Receptionist", href: "/ai-receptionist" },
    { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
    { label: "AI Intake Form Builder", href: "/services/ai-intake-form-builder" },
    { label: "Dental Clinic AI Automation", href: "/industries/dental-clinic-ai-automation" },
    { label: "AI Admin Assistant", href: "/services/ai-admin-assistant" },
    { label: "What Is an AI Receptionist", href: "/resources/what-is-an-ai-receptionist" }
  ],
  faqs: [
    {
      q: "Does the AI give medical advice or triage patients?",
      a: "No. The system is scoped strictly to front-desk and administrative tasks. It books appointments, sends reminders, answers questions about hours and location, and collects intake forms. If a patient asks a clinical question, it directs them to call or speak with a staff member."
    },
    {
      q: "Is this PIPEDA or PHIPA compliant?",
      a: "We are not a covered entity and cannot provide compliance guarantees. We build within the constraints you define — data residency preferences, what information is collected, how it's stored — and flag anything that needs your privacy advisor's review. Compliance obligations remain with your clinic."
    },
    {
      q: "Can it integrate with our booking software?",
      a: "We connect to most common scheduling platforms. During discovery we'll confirm whether your system has an API or integration path. If it does, we build the connection. If not, we can route requests to your staff via email or text."
    },
    {
      q: "What happens when a patient calls after hours?",
      a: "The AI answers, captures the appointment request or message, and confirms it with the patient by text. Staff review the requests the next morning. Patients who would otherwise have hung up and called elsewhere get a response."
    },
    {
      q: "What does it cost?",
      a: "The AI Business System for a clinic — covering booking, reminders, and after-hours intake — is $3,500–$7,500 CAD, typically $7,500 flat. Optional Care Plan is $99/mo."
    },
    {
      q: "How long does setup take?",
      a: "Two to three weeks. Clinics require careful scoping — we take time to define scope, test intake flows, and confirm data handling before going live."
    }
  ]
},
{
  slug: "mortgage-broker-ai-automation",
  eyebrow: "Industry",
  schema: "Service" as const,
  icon: "Building2",
  h1: "AI Automation for Mortgage Brokers",
  title: "AI Automation for Mortgage Brokers — Lead & Intake",
  description: "AI tools for mortgage brokers handle lead follow-up, document intake, and call booking. Admin and lead handling only — not financial advice. Fixed CAD pricing, Surrey BC.",
  answer: "A mortgage broker AI system captures new leads instantly, follows up before they go cold, collects intake documents, and books discovery calls automatically. Packages start at $3,500 CAD. Admin and lead handling only — not financial or mortgage advice.",
  pain: "Mortgage leads are time-sensitive. A prospect who fills out an online form at 9pm and doesn't hear back until the next morning has often already called two other brokers. Following up fast, collecting intake docs, and booking calls without manual back-and-forth is the difference between closing the file and losing it.",
  scenario: `Say a mortgage broker gets 15–25 inbound leads a month from their website and referrals. Each lead requires a follow-up call within hours, a document collection request (employment letter, recent pay stubs, property details), and a booked discovery call. Handling this manually across a full book of business means slower response times and leads that go cold before the first real conversation.\n\nAn AI lead capture and follow-up system could respond to new leads within minutes, send a document collection form automatically, and offer calendar booking for the discovery call — all without the broker having to do anything until the call itself. The exact conversion lift depends on how many leads the broker currently loses to slow response. In a trade where a single file generates $3,000–$6,000+ in commission, the math on speed-to-lead is compelling.`,
  steps: [
    "Discovery call — we map your lead flow, intake documents, and booking process",
    "Scoped proposal — fixed price covering lead response, document intake, and calendar booking",
    "Build and test — tested with real lead scenarios before handoff",
    "Handoff and optional Care Plan — you own the system; $99/mo for updates"
  ],
  gets: [
    "Instant lead response — new form submissions trigger a follow-up within minutes",
    "Document intake automation collecting employment, income, and property details",
    "Calendar booking so leads can schedule discovery calls without a back-and-forth",
    "Follow-up sequence for leads that don't respond to the first contact",
    "Lead qualification questions that flag pre-approval readiness before your call",
    "A system you own — no CRM subscription required unless you want one"
  ],
  sections: [
    {
      heading: "What an AI worker does for a mortgage broker",
      body: "A mortgage broker AI setup focuses on two high-value areas: speed-to-lead and intake efficiency. The system responds to new leads automatically, asks initial qualification questions, collects the documents you need for a file, and books the discovery call into your calendar — before a competitor responds.",
      bullets: [
        "Lead capture and instant response to new inquiries",
        "Document intake form delivery and follow-up",
        "Calendar booking agent for discovery calls",
        "Nurture sequence for leads not yet ready to proceed"
      ]
    },
    {
      heading: "What it doesn't do — important",
      body: "This system handles administrative and lead-management tasks only. It does not provide mortgage advice, rate quotes, pre-approval assessments, or any regulated activity. It does not represent itself as a licensed mortgage professional. All advice and product recommendations come from you, the licensed broker.",
    },
    {
      heading: "Built around your process",
      body: "Every broker works differently — some run solo, some have an assistant, some use specific CRMs. We build around your actual workflow: your intake questions, your document checklist, your calendar availability. Nothing generic drops into your business uninvited.",
    }
  ],
  packageId: "business" as const,
  ctaLabel: "Get this built for your business",
  keywords: [
    "mortgage broker AI automation",
    "AI lead follow-up mortgage broker",
    "mortgage intake automation BC",
    "speed to lead mortgage broker AI",
    "AI document intake mortgage"
  ],
  related: [
    { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
    { label: "AI Lead Capture Form", href: "/services/ai-lead-capture-form" },
    { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
    { label: "Real Estate Agent AI Automation", href: "/industries/real-estate-agent-ai-automation" },
    { label: "AI SMS Automation", href: "/services/ai-sms-automation" },
    { label: "AI Chatbot for Small Business", href: "/ai-chatbot-for-small-business" }
  ],
  faqs: [
    {
      q: "Does the AI give mortgage or financial advice?",
      a: "No. It handles admin and lead management only — responding to inquiries, collecting documents, booking calls. It does not quote rates, assess qualification, or make any regulated recommendations. That stays with you."
    },
    {
      q: "How fast does it respond to a new lead?",
      a: "Typically within a couple of minutes of form submission, regardless of time of day. Speed-to-lead is one of the highest-leverage improvements for most brokers — the system is built to respond before a competitor does."
    },
    {
      q: "Can it collect sensitive documents?",
      a: "It delivers a secure intake link and tracks completion. Actual document upload goes through a secure form or your existing document portal — we connect to what you already use. We discuss data handling during scoping."
    },
    {
      q: "Will it work with my CRM?",
      a: "If your CRM has an API, we connect to it. If you don't have one, leads and intake data route to your email. We scope this during discovery so there are no surprises."
    },
    {
      q: "What does it cost?",
      a: "The AI Business System — covering lead response, intake automation, and calendar booking — is $3,500–$7,500 CAD, typically $7,500 flat. Optional Care Plan is $99/mo."
    },
    {
      q: "How long does setup take?",
      a: "Two to three weeks. Mortgage intake has specific requirements and we take time to test the lead flow end-to-end before you go live."
    },
    {
      q: "I already have an assistant — do I still need this?",
      a: "An AI system handles the high-volume, repetitive leg work (first response, document reminders, booking) so your assistant can focus on file management and client service. They're complementary, not competing."
    }
  ]
},
{
  slug: "insurance-broker-ai-automation",
  eyebrow: "Industry",
  schema: "Service" as const,
  icon: "ShieldCheck",
  h1: "AI Automation for Insurance Brokers",
  title: "AI Automation for Insurance Brokers — Leads & Renewal",
  description: "AI workers for insurance brokers handle quote intake, renewal reminders, and lead follow-up. Front-desk and lead scope only. Fixed CAD pricing, built in Surrey BC.",
  answer: "An insurance broker AI setup handles inbound quote requests, sends renewal reminders to existing clients, follows up on cold leads, and answers common FAQ questions. Packages start at $3,500 CAD. Front-desk and lead handling only — not insurance advice.",
  pain: "Insurance brokers run on renewals and referrals — but both require consistent follow-up that's hard to do manually across a full book of business. New quote requests need a fast response before the client goes direct online. Renewal reminders need to go out at exactly the right time. Neither happens reliably without automation.",
  scenario: `Say an insurance brokerage handles a mix of home, auto, and commercial policies. During renewal season, the team manually pulls reports and sends emails or calls — a time-intensive process that still misses clients who should have heard from them 60 days out. An AI renewal reminder system could send timed messages at 90, 60, and 30 days before renewal, flag non-responses for the broker, and handle basic FAQs (what's covered, how to update a vehicle, how to add a driver) automatically.\n\nFor new inbound quote requests — from the website or referrals — an AI intake worker could capture the prospect's coverage type, current provider, and timing, and book a call before the prospect fills out a direct insurer's form. The exact conversion rate varies by line of business and how quickly the broker currently responds. In a renewals-heavy book, the reminder system alone can reduce lapse rates meaningfully.`,
  steps: [
    "Discovery call — we map your renewal cycle, quote intake flow, and common client questions",
    "Scoped proposal — fixed price for intake, renewals, lead follow-up, and FAQ workers",
    "Build and test — tested against your real renewal timing and lead types before handoff",
    "Handoff and optional Care Plan — you own it; $99/mo for ongoing updates"
  ],
  gets: [
    "Renewal reminder sequence at 90/60/30 days out — automatic, timed to your book",
    "Inbound quote intake capturing coverage type, current provider, and timing",
    "Lead follow-up for prospects who requested a quote but didn't book a call",
    "FAQ handling for common questions about coverage, policy changes, and billing",
    "Missed-call text-back so prospects don't go direct while you're with a client",
    "A system you own — no CRM dependency unless you want the integration"
  ],
  sections: [
    {
      heading: "What an AI worker does for an insurance broker",
      body: "An insurance broker AI setup focuses on three areas: keeping existing clients engaged through renewal season, capturing new quote requests faster than direct insurers do, and handling the FAQ volume that clogs up phone and email. All within front-desk and lead-management scope.",
      bullets: [
        "Renewal reminder agent — timed messages before policy expiry, flags non-responses",
        "Quote intake worker — captures coverage type, current provider, and call booking",
        "Lead follow-up agent — nurtures cold prospects who requested a quote",
        "FAQ worker — handles common questions without pulling a broker off another file"
      ]
    },
    {
      heading: "What it doesn't do — important",
      body: "This system is scoped to administrative and lead-management tasks. It does not provide insurance advice, recommend products, assess risk, or represent itself as a licensed insurance professional. It does not bind coverage or make any regulated decisions. All advice, product recommendations, and coverage decisions come from you.",
    },
    {
      heading: "Built around your book of business",
      body: "Every brokerage has different renewal timing, line-of-business mix, and client communication preferences. We build the renewal reminders around your actual cycle, write the FAQ answers in your voice, and scope the intake questions to your product lines. Nothing generic — it should sound like your office.",
    }
  ],
  packageId: "business" as const,
  ctaLabel: "Get this built for your business",
  keywords: [
    "insurance broker AI automation",
    "AI renewal reminders insurance broker",
    "insurance quote intake automation BC",
    "AI lead follow-up insurance broker",
    "insurance brokerage AI front-desk"
  ],
  related: [
    { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
    { label: "AI Lead Capture Form", href: "/services/ai-lead-capture-form" },
    { label: "AI SMS Automation", href: "/services/ai-sms-automation" },
    { label: "Mortgage Broker AI Automation", href: "/industries/mortgage-broker-ai-automation" },
    { label: "AI Website Assistant", href: "/services/ai-website-assistant" },
    { label: "AI Lead Follow-Up Guide", href: "/resources/ai-lead-follow-up-guide" }
  ],
  faqs: [
    {
      q: "Does the AI give insurance advice or recommend products?",
      a: "No. It handles admin and lead management only — capturing quote requests, sending renewal reminders, answering FAQ questions about hours and process. All advice, product recommendations, and coverage decisions stay with you."
    },
    {
      q: "Can it handle my renewal book across hundreds of clients?",
      a: "Yes — the renewal reminder system is built to run automatically across your entire book based on policy dates. We connect to your data source (spreadsheet, CRM export, or policy management system) and the sequence runs without manual pull reports."
    },
    {
      q: "What if a client asks a complex coverage question?",
      a: "The FAQ worker handles common, predictable questions. For anything that requires professional judgment, it directs the client to call or email the broker. It's explicit about being administrative support, not an insurance advisor."
    },
    {
      q: "Will it work with my existing broker management system?",
      a: "It depends on the system's API access. During discovery we'll assess the integration path. If a direct connection isn't feasible, we work with exports or email-based triggers instead."
    },
    {
      q: "What does it cost?",
      a: "The AI Business System for an insurance broker — covering renewals, intake, and follow-up — is $3,500–$7,500 CAD, typically $7,500 flat. Optional Care Plan is $99/mo."
    },
    {
      q: "How long does setup take?",
      a: "Two to three weeks. Renewal reminders need to be mapped to your actual policy cycle, so we take time to set up the timing correctly before going live."
    },
    {
      q: "I'm a solo broker — is this worth it at my volume?",
      a: "It depends on your book size and how much renewal and lead follow-up time you're currently spending manually. If you're managing 200+ policies and doing follow-up by hand, the time savings is real. We can scope a smaller Starter System if you want to start with one worker."
    }
  ]
}
];
