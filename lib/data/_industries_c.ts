import type { LandingContent } from "./landing";

// Industry landing pages, batch C (Phase 2). Concatenated into `industries` by
// industries.ts. Each page targets a distinct trade/profession with its own
// pain, worked example and workflows — no city-swap or template padding.
export const industriesC: LandingContent[] = [
  {
    slug: "physiotherapy-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Physiotherapy Clinics",
    title: "AI Automation for Physiotherapy Clinics | Handbuilt",
    description:
      "AI that answers calls, books assessments, and chases no-shows for physio clinics — so your front desk isn't buried and your schedule stays full. From $1,500.",
    answer:
      "AI automation for a physiotherapy clinic handles the front-desk load — answering calls, booking assessments, sending intake forms, and reducing no-shows with reminders — so your therapists treat instead of chasing paperwork. Handbuilt builds it around your booking system and your treatment types, live in about a week.",
    pain: "A physio clinic loses money two ways at once: reception can't answer every call while treating patients, and empty slots from no-shows are revenue that never comes back.",
    scenario:
      "Example scenario, not a customer result: a three-therapist clinic can miss a run of calls during treatment hours, and no-shows leave slots that never come back. We'd set up an AI line that answers every call, books assessments into their system, and sends intake forms automatically — plus reminder sequences that cut no-shows. Fuller schedules and a front desk that isn't drowning.",
    steps: [
      "We map your appointment types, therapists and booking tool",
      "AI answers calls and texts, books assessments and sends intake forms",
      "Reminder sequences reduce no-shows and fill cancellations from a waitlist",
      "Everything syncs to your existing schedule so nothing is double-booked",
    ],
    gets: [
      "Calls and booking requests answered during treatment hours",
      "Automated intake forms before the first visit",
      "No-show reminders and waitlist fill",
      "Synced to your practice-management software",
    ],
    packageId: "starter",
    ctaLabel: "Automate my clinic",
    keywords: [
      "ai automation for physiotherapy",
      "physio clinic ai receptionist",
      "reduce no shows physiotherapy",
      "ai booking for physio clinic",
    ],
    related: [
      { label: "AI Automation for Clinics", href: "/industries/clinic-ai-automation" },
      { label: "AI Automation for Chiropractors", href: "/industries/chiropractor-ai-automation" },
      { label: "Appointment & No-Show Reminder Automation", href: "/use-cases/appointment-reminder-automation" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
    ],
    faqs: [
      { q: "Does it work with my practice-management software?", a: "It connects to common clinic and booking tools so appointments land in your existing schedule. We confirm your exact stack in the discovery call." },
      { q: "Is patient information handled carefully?", a: "Yes — we design intake and messaging to keep patient data secure and only collect what your booking flow needs. We'll align to your clinic's privacy requirements." },
    ],
    schema: "Service",
    icon: "Stethoscope",
  },
  {
    slug: "chiropractor-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Chiropractors",
    title: "AI Automation for Chiropractic Clinics | Handbuilt",
    description:
      "AI reception, booking and recall for chiropractic clinics — capture new patients, keep adjustment schedules full, and cut no-shows. Built for you from $1,500.",
    answer:
      "AI automation for a chiropractic clinic captures new-patient calls, books adjustments, runs recall for lapsed patients, and reduces no-shows — so your table stays busy without the front desk chasing everyone. Handbuilt builds it around your visit types and booking system.",
    pain: "Chiropractic revenue depends on visit frequency, but reactivating patients who quietly stop coming and answering new-patient calls mid-adjustment is more than one front desk can do.",
    scenario:
      "Example scenario, not a customer result: a solo chiropractor can't answer new-patient inquiries while adjusting, and past patients quietly drop off. We'd build AI that answers and books new patients instantly, plus a recall system that reaches lapsed patients with a friendly check-in. New bookings go up and dormant patients come back.",
    steps: [
      "We set up AI call and text answering that books new patients fast",
      "We build recall sequences for patients who've lapsed",
      "Reminders cut no-shows and keep the adjustment schedule full",
      "Bookings sync to your existing calendar",
    ],
    gets: [
      "New-patient inquiries captured, not missed",
      "Automated recall for lapsed patients",
      "No-show reminders",
      "Synced to your booking software",
    ],
    packageId: "starter",
    ctaLabel: "Automate my clinic",
    keywords: [
      "ai automation for chiropractors",
      "chiropractic ai receptionist",
      "patient recall automation chiropractic",
      "chiropractor booking automation",
    ],
    related: [
      { label: "AI Automation for Physiotherapy", href: "/industries/physiotherapy-ai-automation" },
      { label: "AI Automation for Clinics", href: "/industries/clinic-ai-automation" },
      { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
    ],
    faqs: [
      { q: "Can it help bring back patients who stopped coming?", a: "Yes — a recall sequence reaches lapsed patients with a friendly, on-brand check-in so your front desk isn't making those calls by hand. How many come back depends entirely on why they stopped: a patient who moved away will not return no matter how good the message is, and we have no reactivation rate to quote you. What the system guarantees is that the ask actually goes out, which is the part that usually doesn't happen." },
      { q: "Will it fit how my clinic books?", a: "We build around your visit types and booking tool so it books the right appointment length into the right slot." },
    ],
    schema: "Service",
    icon: "Stethoscope",
  },
  {
    slug: "gym-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Gyms & Fitness Studios",
    title: "AI Automation for Gyms & Fitness Studios | Handbuilt",
    description:
      "AI that answers membership inquiries, books trials, and wins back cancelling members for gyms and studios — 24/7. Built around your funnel from $1,500.",
    answer:
      "AI automation for a gym or studio answers membership inquiries around the clock, books trial classes and tours, and runs win-back for members who cancel — so leads don't go cold and churn doesn't quietly bleed revenue. Handbuilt builds it around your membership funnel.",
    pain: "Gym leads go cold fast — someone motivated at 10pm won't wait for a callback tomorrow — and every cancelled membership is recurring revenue walking out the door.",
    scenario:
      "A studio gets inquiries at all hours but staff only reply during open hours, and members cancel with no follow-up. We build AI that answers instantly, books a trial class on the spot, and runs a win-back flow for cancellations. Hot leads convert while they're hot, and some cancellations are saved.",
    steps: [
      "We connect your class schedule and membership system",
      "AI answers inquiries 24/7 and books trials and tours instantly",
      "Lead follow-up keeps prospects warm until they join",
      "Win-back sequences reach members who cancel or lapse",
    ],
    gets: [
      "24/7 inquiry answering and trial booking",
      "Lead follow-up so prospects don't go cold",
      "Cancellation win-back flows",
      "Synced to your class and membership tools",
    ],
    packageId: "business",
    ctaLabel: "Grow my gym",
    keywords: [
      "ai automation for gyms",
      "gym lead automation",
      "fitness studio ai booking",
      "gym membership win back automation",
    ],
    related: [
      { label: "AI Automation for Personal Trainers", href: "/industries/personal-trainer-ai-automation" },
      { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
      { label: "Facebook Lead Automation", href: "/use-cases/facebook-lead-automation" },
    ],
    faqs: [
      { q: "Can it book trial classes automatically?", a: "Yes — it books trials and tours directly into your schedule the moment someone inquires, so you catch them at peak motivation." },
      { q: "Does the win-back really save members?", a: "It won't save everyone, but a timely, on-brand check-in recovers a meaningful share of cancellations that would otherwise just disappear." },
    ],
    schema: "Service",
    icon: "TrendingUp",
  },
  {
    slug: "personal-trainer-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Personal Trainers",
    title: "AI Automation for Personal Trainers & Coaches | Handbuilt",
    description:
      "AI that captures leads, books consults, and follows up for personal trainers — so you coach instead of chasing DMs. Built around your business from $1,500.",
    answer:
      "AI automation for a personal trainer captures inquiries, books consults, follows up with leads, and handles client admin — so you spend time training, not chasing DMs. Handbuilt builds it around how you sell and deliver coaching.",
    pain: "Trainers grow through DMs and referrals, but replying to every inquiry, booking consults and following up while also coaching is exactly what caps how many clients you can take.",
    scenario:
      "An online-and-in-person trainer gets inquiries across Instagram and their site but can't reply fast enough between sessions. We build AI that answers, books a consult, and follows up with people who don't book right away. More consults booked, fewer leads lost to slow replies.",
    steps: [
      "We connect your inquiry channels and calendar",
      "AI answers and books consults from DMs, site and calls",
      "Follow-up sequences chase leads who go quiet",
      "Client admin and reminders are handled automatically",
    ],
    gets: [
      "Inquiries answered fast across DMs and site",
      "Consults booked automatically",
      "Lead follow-up so nothing slips",
      "Less admin between sessions",
    ],
    packageId: "starter",
    ctaLabel: "Book more clients",
    keywords: [
      "ai automation for personal trainers",
      "personal trainer lead automation",
      "fitness coach ai assistant",
      "trainer dm automation",
    ],
    related: [
      { label: "AI Automation for Gyms", href: "/industries/gym-ai-automation" },
      { label: "AI Coaching Content System", href: "/creators/ai-coaching-content-system" },
      { label: "Facebook & Instagram Lead Automation", href: "/use-cases/facebook-lead-automation" },
    ],
    faqs: [
      { q: "I'm an online coach — does this still fit?", a: "Yes. Whether you train in person, online or both, it captures inquiries and books consults so your DMs stop being a bottleneck." },
      { q: "Can it handle client check-ins too?", a: "It can automate reminders and routine admin. For content and program delivery, our coaching content system pairs well with this." },
    ],
    schema: "Service",
    icon: "TrendingUp",
  },
  {
    slug: "wedding-planner-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Wedding Planners",
    title: "AI Automation for Wedding Planners | Handbuilt",
    description:
      "AI that qualifies wedding inquiries, books discovery calls and nurtures couples for planners — so no dream booking slips through your inbox. Built for you.",
    answer:
      "AI automation for a wedding planner qualifies inquiries, books discovery calls, and nurtures couples through a long decision window — so high-value bookings don't get lost in a busy inbox. Handbuilt builds it around your packages and your booking process.",
    pain: "Wedding bookings are high-value but slow to decide, and a planner juggling live events can't reply fast to new inquiries or nurture couples over months without dropping some.",
    scenario:
      "A planner gets inquiries while running weekend events, and couples take months to decide. We build AI that responds fast, qualifies by date, budget and style, books a discovery call, and nurtures couples with helpful touches until they book. Fewer leads lost to slow replies and long timelines.",
    steps: [
      "We map your packages, ideal client and booking flow",
      "AI qualifies inquiries by date, budget and style",
      "It books discovery calls and sends your info",
      "Nurture sequences keep couples warm until they decide",
    ],
    gets: [
      "Fast, on-brand replies to every inquiry",
      "Inquiries qualified by date, budget and style",
      "Discovery calls booked automatically",
      "Long-cycle nurture so couples don't drift",
    ],
    packageId: "starter",
    ctaLabel: "Book more weddings",
    keywords: [
      "ai automation for wedding planners",
      "wedding planner lead automation",
      "wedding inquiry qualification ai",
      "wedding planner booking automation",
    ],
    related: [
      { label: "AI Automation by Industry", href: "/industries" },
      { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
      { label: "AI Lead Capture Form", href: "/services/ai-lead-capture-form" },
    ],
    faqs: [
      { q: "Can it check my date availability?", a: "Yes — it can qualify by date so you only spend time on couples whose day you can actually take." },
      { q: "Weddings take months to book — does the follow-up handle that?", a: "That's exactly what the nurture sequence is for: staying helpfully in touch across a long decision window so couples remember you when they're ready." },
    ],
    schema: "Service",
    icon: "CalendarCheck",
  },
  {
    slug: "immigration-consultant-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Immigration Consultants",
    title: "AI Automation for Immigration Consultants | Handbuilt",
    description:
      "AI that qualifies inquiries, books consults, and handles document intake for immigration consultants — so you focus on cases, not repetitive questions. From $1,500.",
    answer:
      "AI automation for an immigration consultant qualifies inquiries by program, books paid consults, and streamlines document intake — so your time goes to casework, not answering the same eligibility questions. Handbuilt builds it around your services and intake process.",
    pain: "Immigration consultants get flooded with repetitive eligibility questions and unqualified inquiries, which buries the serious clients ready to pay for a consult.",
    scenario:
      "A consultant fields dozens of daily messages asking the same program questions, most from people who won't proceed. We build AI that answers common eligibility questions, qualifies inquiries by program and situation, and books paid consults with the serious ones — plus a smoother document intake. Less noise, more booked consults.",
    steps: [
      "We map your services, programs and consult process",
      "AI answers common questions and qualifies by program",
      "It books paid consultations with qualified inquiries",
      "Document intake is guided and organised before the consult",
    ],
    gets: [
      "Repetitive eligibility questions handled automatically",
      "Inquiries qualified by program and situation",
      "Paid consults booked with serious clients",
      "Cleaner document intake",
    ],
    packageId: "business",
    ctaLabel: "Automate my practice",
    keywords: [
      "ai automation for immigration consultants",
      "immigration consultant lead qualification",
      "immigration consult booking ai",
      "rcic automation",
    ],
    related: [
      { label: "AI Automation for Law Firms", href: "/industries/law-firm-ai-automation" },
      { label: "AI Intake Form Builder", href: "/services/ai-intake-form-builder" },
      { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
    ],
    faqs: [
      { q: "Will the AI give immigration advice?", a: "No — it handles general information, qualification and booking, and routes anything requiring professional judgement to you. It won't give regulated advice." },
      { q: "Can it collect documents securely?", a: "It guides clients through what's needed and organises intake; we design it to keep sensitive documents handled securely and only collect what your process requires." },
    ],
    schema: "Service",
    icon: "ShieldCheck",
  },
  {
    slug: "law-firm-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Law Firms",
    title: "AI Automation for Law Firms & Solo Lawyers | Handbuilt",
    description:
      "AI intake, client screening and booking for law firms — capture every potential client and qualify matters before they reach your desk. Built for you.",
    answer:
      "AI automation for a law firm captures new-client inquiries, screens and qualifies matters, books consultations, and handles intake — so no potential client is lost and your team's time goes to billable work. Handbuilt builds it around your practice areas and intake criteria.",
    pain: "For a law firm, a missed or slow-answered inquiry is a lost client who simply calls the next firm — and manual intake of unqualified matters wastes expensive staff time.",
    scenario:
      "A small firm loses after-hours inquiries and spends paralegal time screening matters that don't fit. We build AI that answers inquiries 24/7, screens by practice area and conflict basics, books consults for qualified matters, and gathers intake details. Fewer lost clients, less wasted screening.",
    steps: [
      "We map your practice areas and intake criteria",
      "AI answers inquiries and screens matters 24/7",
      "It books consultations for qualified potential clients",
      "Structured intake details are gathered before the consult",
    ],
    gets: [
      "Every inquiry captured, including after hours",
      "Matters screened by practice area and fit",
      "Consultations booked for qualified clients",
      "Structured intake ready for your team",
    ],
    packageId: "business",
    ctaLabel: "Automate my intake",
    keywords: [
      "ai automation for law firms",
      "law firm client intake automation",
      "legal intake ai",
      "lawyer lead qualification ai",
    ],
    related: [
      { label: "AI Automation for Accountants", href: "/industries/accountant-ai-automation" },
      { label: "AI Intake Form Builder", href: "/services/ai-intake-form-builder" },
    ],
    faqs: [
      { q: "Does it give legal advice?", a: "No. It handles intake, screening and booking, and routes anything requiring legal judgement to your lawyers. It never provides legal advice." },
      { q: "Can it run a basic conflict check?", a: "It can gather the details needed to flag potential conflicts for your team to review, so screening starts before the consult." },
    ],
    schema: "Service",
    icon: "ShieldCheck",
  },
  {
    slug: "accountant-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Accountants",
    title: "AI Automation for Accountants & CPAs | Handbuilt",
    description:
      "AI that handles client questions, document collection and deadline reminders for accounting firms — reclaim time during tax season. Built for you from $1,500.",
    answer:
      "AI automation for an accounting firm answers routine client questions, chases missing documents, and sends deadline reminders — so your team focuses on the work only they can do, especially at tax time. Handbuilt builds it around your services and client workflow.",
    pain: "Accountants lose enormous time to the same client questions and to chasing documents that clients forget to send — a drag that becomes a crisis during tax season.",
    scenario:
      "A firm spends tax season answering \"what do you need from me?\" and hunting for missing paperwork. We build AI that answers common client questions, sends personalised document checklists, chases what's missing, and reminds clients of deadlines. Staff reclaim hours during the busiest weeks of the year.",
    steps: [
      "We map your services, document needs and client workflow",
      "AI answers routine client questions",
      "It sends document checklists and chases what's missing",
      "Deadline reminders go out automatically",
    ],
    gets: [
      "Routine client questions answered automatically",
      "Document collection chased without staff time",
      "Deadline reminders for clients",
      "Breathing room during tax season",
    ],
    packageId: "business",
    ctaLabel: "Automate my firm",
    keywords: [
      "ai automation for accountants",
      "accounting firm client automation",
      "tax document collection automation",
      "cpa ai assistant",
    ],
    related: [
      { label: "Automate Admin for Accountants", href: "/use-cases/automate-admin-for-accountants" },
      { label: "AI Document Generator", href: "/services/ai-document-generator" },
    ],
    faqs: [
      { q: "Can it chase clients for missing documents?", a: "Yes — it sends a personalised checklist and follows up on what's outstanding, so your team stops spending tax season hunting paperwork." },
      { q: "Is client financial data kept secure?", a: "We design intake and messaging to handle sensitive data securely and collect only what your workflow needs, aligned to your firm's requirements." },
    ],
    schema: "Service",
    icon: "Receipt",
  },
  {
    slug: "consultant-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Consultants",
    title: "AI Automation for Consultants | Handbuilt",
    description:
      "AI that qualifies leads, books discovery calls and handles proposals for independent consultants — so you spend time on clients, not admin. Built for you.",
    answer:
      "AI automation for a consultant qualifies inbound leads, books discovery calls, and speeds up proposals and onboarding — so your billable time isn't eaten by admin and follow-up. Handbuilt builds it around your niche and sales process.",
    pain: "Independent consultants sell and deliver at the same time, so leads go cold, follow-ups slip, and proposal admin steals hours that should be billable.",
    scenario:
      "A solo consultant gets referrals and inbound but can't follow up fast while delivering client work. We build AI that qualifies leads, books discovery calls, and drafts proposals from your templates. The pipeline keeps moving even in your busiest delivery weeks.",
    steps: [
      "We map your ideal client, offer and sales process",
      "AI qualifies leads and books discovery calls",
      "It follows up with prospects who go quiet",
      "Proposal drafts and onboarding are sped up from your templates",
    ],
    gets: [
      "Leads qualified and discovery calls booked",
      "Follow-up that keeps the pipeline warm",
      "Faster proposals from your templates",
      "Selling that continues while you deliver",
    ],
    packageId: "starter",
    ctaLabel: "Automate my pipeline",
    keywords: [
      "ai automation for consultants",
      "consultant lead qualification ai",
      "consulting proposal automation",
      "independent consultant ai assistant",
    ],
    related: [
      { label: "AI Automation for Agencies", href: "/industries/agency-ai-automation" },
      { label: "AI Quote & Proposal Generator", href: "/services/ai-quote-generator" },
      { label: "AI Sales Assistant", href: "/services/ai-sales-assistant" },
    ],
    faqs: [
      { q: "Can it draft proposals?", a: "Yes — it drafts from your templates and the discovery details so you send tailored proposals faster and follow up automatically." },
      { q: "Will it fit my specific consulting niche?", a: "We build around your offer, ideal client and process, so qualification and messaging match your niche rather than a generic template." },
    ],
    schema: "Service",
    icon: "BarChart3",
  },
  {
    slug: "agency-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Agencies",
    title: "AI Automation for Marketing & Creative Agencies | Handbuilt",
    description:
      "AI that handles lead intake, client reporting and internal ops for agencies — plus white-label AI builds you can resell. Built around your workflow.",
    answer:
      "AI automation for an agency streamlines lead intake, client onboarding, reporting and internal operations — and can include white-label AI systems you resell to your own clients. Handbuilt builds it around your services and delivery, so your team scales without adding headcount.",
    pain: "Agencies drown in operational drag — intake, onboarding, reporting, status updates — that eats margin, while clients increasingly ask for AI the agency can't build itself.",
    scenario:
      "A marketing agency loses hours to client reporting and onboarding, and gets AI requests it has to turn down. We automate their internal ops — intake, onboarding, recurring reports — and optionally build white-label AI systems they resell. Margins improve and they add an AI line to their offer.",
    steps: [
      "We map your services, delivery and internal bottlenecks",
      "We automate lead intake, onboarding and recurring reporting",
      "We streamline internal ops and status updates",
      "Optional: white-label AI builds you resell to clients",
    ],
    gets: [
      "Automated intake, onboarding and reporting",
      "Less operational drag on margins",
      "Optional white-label AI to resell",
      "Scale delivery without adding headcount",
    ],
    packageId: "business",
    ctaLabel: "Scale my agency",
    keywords: [
      "ai automation for agencies",
      "agency operations automation",
      "white label ai for agencies",
      "marketing agency ai systems",
    ],
    related: [
      { label: "AI Automation for Consultants", href: "/industries/consultant-ai-automation" },
      { label: "AI for Content Creators", href: "/creators/ai-tools-for-content-creators" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
    ],
    faqs: [
      { q: "Can I resell what you build under my brand?", a: "Yes — we can build white-label AI systems you deliver to your clients as your own, so AI becomes a new revenue line for your agency." },
      { q: "Do you work with the agency, not just its clients?", a: "Both. We can automate your internal ops and/or build client-facing systems you resell. We scope which delivers the most value first." },
    ],
    schema: "Service",
    icon: "Megaphone",
  },
];
