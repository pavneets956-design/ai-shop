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
        body: "Most real estate AI setups fall under the Business AI System package at CAD $3,500 (range $2,500–$5,000 depending on integrations). That covers lead response, qualification, booking, and CRM sync. A full custom buyer or listing portal starts at $7,500. There are no monthly platform fees from Handbuilt — you pay for what was built, once.",
        bullets: [
          "Business AI System: CAD $2,500–$5,000 (typically $3,500) — lead capture, qualification, booking, CRM",
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
        body: "Most dental clinic setups land in the Business AI System range at CAD $3,500 (range $2,500–$5,000). That covers reminders, waitlist, intake, and after-hours chat. Integration with practice management software (Dentrix, Jane App) is included in scoping — some platforms charge their own API fees which we flag upfront.",
        bullets: [
          "Business AI System: CAD $2,500–$5,000 (typically $3,500) — reminders, waitlist, intake, FAQ bot",
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
        body: "Most salon setups land in the Business AI System range at CAD $3,500 (range $2,500–$5,000 depending on number of stylists and integrations). We work with Square Appointments, Vagaro, Fresha, and custom setups. One-time build fee — no ongoing Handbuilt cost.",
        bullets: [
          "Business AI System: CAD $2,500–$5,000 (typically $3,500) — booking, reminders, waitlist, FAQ bot",
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
        body: "Most restaurant setups fall under the Business AI System at CAD $3,500 (range $2,500–$5,000). That covers reservation capture, confirmation, FAQ bot, and a basic dashboard. Integration with OpenTable or Resy is available and scoped upfront — those platforms charge their own fees.",
        bullets: [
          "Business AI System: CAD $2,500–$5,000 (typically $3,500) — reservations, FAQ, confirmations",
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
        body: "Auto detailing AI setups typically fall in the Business AI System range at CAD $3,500 (range $2,500–$5,000 depending on service complexity and mobile vs. shop setup). A Starter AI Setup at CAD $1,000 covers quote form + basic booking if you want to start simple.",
        bullets: [
          "Starter AI Setup: CAD $1,000 — AI quote form + calendar booking link, no follow-up automation",
          "Business AI System: CAD $2,500–$5,000 (typically $3,500) — quote, booking, follow-up, reminders, reviews",
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
];
