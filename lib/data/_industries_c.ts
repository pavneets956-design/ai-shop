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
      "A three-therapist clinic misses a dozen calls a day during treatment hours, and roughly 15% of booked sessions no-show. We set up an AI line that answers every call, books assessments into their system, and sends intake forms automatically — plus reminder sequences that cut no-shows. Fuller schedules and a front desk that isn't drowning.",
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
      { label: "No-Show Reminder Automation", href: "/use-cases/no-show-reminder-automation" },
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
      "A solo chiropractor gets new-patient inquiries they can't answer while adjusting, and dozens of past patients who dropped off. We build AI that answers and books new patients instantly, plus a recall system that reaches lapsed patients with a friendly check-in. New bookings go up and dormant patients come back.",
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
      { q: "Can it help bring back patients who stopped coming?", a: "Yes — recall sequences reach lapsed patients with a friendly, on-brand check-in that's proven to reactivate a share of them without your front desk making calls all day." },
      { q: "Will it fit how my clinic books?", a: "We build around your visit types and booking tool so it books the right appointment length into the right slot." },
    ],
    schema: "Service",
    icon: "Stethoscope",
  },
  {
    slug: "barbershop-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Barbershops",
    title: "AI Automation for Barbershops & Barbers | Handbuilt",
    description:
      "AI booking, reminders and no-show protection for barbershops — keep every chair full and stop losing walk-in inquiries to voicemail. Built for you from $1,500.",
    answer:
      "AI automation for a barbershop handles bookings, reminders and rebooking so every chair stays full and no inquiry goes to voicemail. Handbuilt builds it around your barbers, services and booking app, so clients book themselves while you keep cutting.",
    pain: "A barber with clippers in hand can't answer the phone or DMs — so booking requests slip away, and no-shows leave expensive gaps between cuts.",
    scenario:
      "A four-chair shop gets booking requests by call and Instagram DM all day, but the barbers are cutting, not typing. We set up AI that answers and books across call and DM, sends reminders to cut no-shows, and nudges clients to rebook their next cut. Chairs stay full without anyone stopping mid-fade.",
    steps: [
      "We connect your booking app and each barber's schedule",
      "AI books across phone and Instagram/Facebook DMs",
      "Reminders reduce no-shows; rebooking nudges keep clients on cycle",
      "Walk-in and waitlist requests are captured, not lost",
    ],
    gets: [
      "Bookings answered across phone and social DMs",
      "No-show reminders that protect your chair time",
      "Automatic rebooking nudges",
      "Per-barber scheduling",
    ],
    packageId: "starter",
    ctaLabel: "Fill my chairs",
    keywords: [
      "ai automation for barbershops",
      "barber booking automation",
      "barbershop ai receptionist",
      "reduce no shows barber",
    ],
    related: [
      { label: "AI Automation for Salons", href: "/industries/salon-ai-automation" },
      { label: "AI Booking Assistant for Salons", href: "/use-cases/ai-booking-assistant-for-salons" },
      { label: "Instagram DM Automation", href: "/use-cases/instagram-dm-automation" },
    ],
    faqs: [
      { q: "Can it book from Instagram DMs?", a: "Yes — a lot of barber bookings start in DMs, so we can handle Instagram and Facebook messages alongside calls, subject to each platform's rules." },
      { q: "Does each barber get their own schedule?", a: "Yes. It books the right client with the right barber into the right slot, respecting each barber's hours and services." },
    ],
    schema: "Service",
    icon: "Scissors",
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
      { label: "Instagram DM Automation", href: "/use-cases/instagram-dm-automation" },
    ],
    faqs: [
      { q: "I'm an online coach — does this still fit?", a: "Yes. Whether you train in person, online or both, it captures inquiries and books consults so your DMs stop being a bottleneck." },
      { q: "Can it handle client check-ins too?", a: "It can automate reminders and routine admin. For content and program delivery, our coaching content system pairs well with this." },
    ],
    schema: "Service",
    icon: "TrendingUp",
  },
  {
    slug: "food-truck-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Food Trucks",
    title: "AI Automation for Food Trucks & Caterers | Handbuilt",
    description:
      "AI that handles catering inquiries, event bookings and location updates for food trucks — so you don't lose bookings while you're slammed at the window. From $1,500.",
    answer:
      "AI automation for a food truck handles catering and event inquiries, books gigs, and keeps customers updated on your location — so you don't lose bookings while you're slammed at the service window. Handbuilt builds it around your menu, service area and calendar.",
    pain: "The most profitable food-truck bookings — catering and events — come in by call and DM while you're busy serving, and a slow reply loses the gig to the next truck.",
    scenario:
      "A truck doing lunch service can't answer catering calls mid-rush, and event inquiries in the DMs sit for hours. We build AI that answers catering and event questions, captures the details, and books available dates — plus quick answers on today's location. Big-ticket bookings stop slipping away.",
    steps: [
      "We set up AI to answer catering and event inquiries",
      "It captures event details and checks your available dates",
      "It handles FAQs — menu, pricing range, service area, today's spot",
      "Booking requests come to you organised and ready to confirm",
    ],
    gets: [
      "Catering and event inquiries answered during service",
      "Event details captured and dates checked",
      "Menu, location and pricing FAQs handled",
      "More high-value bookings, fewer lost to slow replies",
    ],
    packageId: "starter",
    ctaLabel: "Catch more bookings",
    keywords: [
      "ai automation for food trucks",
      "food truck catering inquiry automation",
      "food truck booking automation",
      "ai for food truck business",
    ],
    related: [
      { label: "AI Automation for Restaurants", href: "/industries/restaurant-ai-automation" },
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
      { label: "AI Lead Capture Form", href: "/services/ai-lead-capture-form" },
    ],
    faqs: [
      { q: "Can it handle catering quotes?", a: "It captures the event details and can give a pricing range or route a full quote to you fast, so you never lose a catering lead to a slow reply." },
      { q: "Can customers ask where the truck is today?", a: "Yes — it can answer location and hours questions so you're not fielding the same message all day." },
    ],
    schema: "Service",
    icon: "Receipt",
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
      { label: "AI Automation for Photographers", href: "/industries/photographer-ai-automation" },
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
    slug: "photographer-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Photographers",
    title: "AI Automation for Photographers | Handbuilt",
    description:
      "AI that answers shoot inquiries, sends pricing, books sessions and follows up for photographers — so you shoot and edit instead of living in your inbox. From $1,500.",
    answer:
      "AI automation for a photographer answers inquiries, sends pricing and packages, books sessions, and follows up with leads — so you spend your time shooting and editing, not replying to the same questions. Handbuilt builds it around your packages and booking flow.",
    pain: "Photographers lose bookings in the gap between an inquiry and a reply — you're shooting or deep in edits, and by the time you answer, the client booked someone faster.",
    scenario:
      "A portrait and events photographer gets inquiries daily but only replies between shoots and edits. We build AI that answers instantly, sends the right package and pricing, books sessions, and follows up with people who don't book right away. Speed-to-reply goes up and so do bookings.",
    steps: [
      "We load your packages, pricing and availability",
      "AI answers inquiries and sends the right package instantly",
      "It books sessions into your calendar",
      "Follow-up sequences chase leads who go quiet",
    ],
    gets: [
      "Instant replies with the right package and pricing",
      "Sessions booked into your calendar",
      "Lead follow-up so slow replies stop costing bookings",
      "Less time in your inbox, more behind the camera",
    ],
    packageId: "starter",
    ctaLabel: "Book more shoots",
    keywords: [
      "ai automation for photographers",
      "photographer inquiry automation",
      "photography booking automation",
      "photographer lead follow up ai",
    ],
    related: [
      { label: "AI Automation for Videographers", href: "/industries/videographer-ai-automation" },
      { label: "AI Automation for Wedding Planners", href: "/industries/wedding-planner-ai-automation" },
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
    ],
    faqs: [
      { q: "Can it send my pricing automatically?", a: "Yes — it sends the right package and pricing based on what the client asks for, so you're not copy-pasting the same rates all week." },
      { q: "Will it match my brand voice?", a: "We train it on your tone so replies feel like you, not a generic auto-responder." },
    ],
    schema: "Service",
    icon: "Star",
  },
  {
    slug: "videographer-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Videographers",
    title: "AI Automation for Videographers | Handbuilt",
    description:
      "AI that handles project inquiries, quotes and booking for videographers — plus optional editing automation. Spend time on the craft, not the admin. From $1,500.",
    answer:
      "AI automation for a videographer handles project inquiries, sends quotes, books shoots, and follows up — and can extend into editing automation like clipping and captions. Handbuilt builds it around your services so admin stops eating your production time.",
    pain: "Videographers are buried in long edits, so inquiries and quote requests wait — and clients who need a fast answer book a competitor while you're in the timeline.",
    scenario:
      "A commercial and event videographer loses inquiries while deep in edits. We build AI that answers project questions, captures scope, sends a quote or books a call, and follows up. Optionally we automate the repetitive edit work — clips and captions — so both ends of the business speed up.",
    steps: [
      "We map your services, scope questions and pricing",
      "AI answers inquiries, captures project scope and quotes",
      "It books shoots and follows up with quiet leads",
      "Optional: automate clipping and captions for deliverables",
    ],
    gets: [
      "Project inquiries answered while you're editing",
      "Scope captured and quotes sent fast",
      "Shoots booked and leads followed up",
      "Optional editing automation for clips and captions",
    ],
    packageId: "business",
    ctaLabel: "Automate my studio",
    keywords: [
      "ai automation for videographers",
      "videographer inquiry automation",
      "video production booking ai",
      "videographer quote automation",
    ],
    related: [
      { label: "AI Automation for Photographers", href: "/industries/photographer-ai-automation" },
      { label: "AI Video Editing Automation", href: "/creators/ai-video-editing-automation" },
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
    ],
    faqs: [
      { q: "Can you automate my editing too?", a: "Yes — beyond the client-facing admin, we can automate repetitive edit steps like clipping, silence removal and captions. See our video editing automation build." },
      { q: "Does it handle custom project scoping?", a: "It captures the key scope details and either quotes from your ranges or books a call for bigger jobs, so nothing complex gets mis-quoted." },
    ],
    schema: "Service",
    icon: "Video",
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
      { label: "AI Document Analyzer for Law Firms", href: "/use-cases/ai-document-analyzer-for-law-firms" },
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
      { label: "AI Automation for Bookkeepers", href: "/industries/bookkeeper-ai-automation" },
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
    slug: "bookkeeper-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Bookkeepers",
    title: "AI Automation for Bookkeepers | Handbuilt",
    description:
      "AI that handles client onboarding, document chasing and routine questions for bookkeepers — so you keep books, not inboxes. Built for you from $1,500.",
    answer:
      "AI automation for a bookkeeper handles client onboarding, chases receipts and statements, and answers routine questions — so your time goes to the books instead of the back-and-forth. Handbuilt builds it around your client workflow and tools.",
    pain: "Bookkeepers lose billable hours to chasing clients for receipts and statements and answering the same questions every month — admin that scales badly as you add clients.",
    scenario:
      "A solo bookkeeper adds clients but drowns in month-end chasing for missing documents. We build AI that onboards new clients cleanly, requests and chases monthly documents, and answers routine questions. Adding clients stops meaning adding admin.",
    steps: [
      "We map your onboarding and monthly document workflow",
      "AI onboards new clients and sets expectations",
      "It requests and chases receipts and statements each period",
      "Routine client questions are answered automatically",
    ],
    gets: [
      "Clean, automated client onboarding",
      "Monthly document requests and chasing",
      "Routine questions handled",
      "More clients without more admin",
    ],
    packageId: "starter",
    ctaLabel: "Automate my bookkeeping admin",
    keywords: [
      "ai automation for bookkeepers",
      "bookkeeping client onboarding automation",
      "receipt chasing automation",
      "bookkeeper ai assistant",
    ],
    related: [
      { label: "AI Automation for Accountants", href: "/industries/accountant-ai-automation" },
      { label: "Client Onboarding Automation", href: "/use-cases/client-onboarding-automation" },
      { label: "AI Invoice Reminder System", href: "/services/ai-invoice-reminder-system" },
    ],
    faqs: [
      { q: "Can it handle month-end document chasing?", a: "Yes — that's one of the biggest wins. It requests the right documents each period and follows up on what's missing without you sending manual reminders." },
      { q: "Does it work with my accounting software?", a: "We build around common bookkeeping and accounting tools and confirm your exact stack before starting." },
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
      { label: "AI Proposal Generator", href: "/services/ai-proposal-generator" },
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
      { label: "Custom Business Automation", href: "/services/custom-business-automation" },
    ],
    faqs: [
      { q: "Can I resell what you build under my brand?", a: "Yes — we can build white-label AI systems you deliver to your clients as your own, so AI becomes a new revenue line for your agency." },
      { q: "Do you work with the agency, not just its clients?", a: "Both. We can automate your internal ops and/or build client-facing systems you resell. We scope which delivers the most value first." },
    ],
    schema: "Service",
    icon: "Megaphone",
  },
  {
    slug: "ecommerce-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for E-commerce Stores",
    title: "AI Automation for E-commerce Stores | Handbuilt",
    description:
      "AI that handles support, order questions, and abandoned-cart recovery for online stores — cut support load and recover lost sales. Built around your store.",
    answer:
      "AI automation for an e-commerce store answers support and order questions instantly, recovers abandoned carts, and handles returns and FAQs — so support load drops and lost sales come back. Handbuilt builds it around your store, catalog and policies.",
    pain: "Online stores lose sales two ways: shoppers with an unanswered question abandon the cart, and support tickets pile up faster than a small team can clear them.",
    scenario:
      "A store gets repetitive \"where's my order\" and sizing questions plus a stack of abandoned carts. We build AI trained on their catalog and policies that answers instantly on-site, recovers carts with timely nudges, and handles returns and FAQs. Support shrinks and recovered carts add real revenue.",
    steps: [
      "We train AI on your catalog, policies and common questions",
      "It answers support and product questions instantly on your store",
      "Abandoned-cart recovery brings shoppers back",
      "Returns and order-status questions are handled automatically",
    ],
    gets: [
      "Instant support trained on your store",
      "Abandoned-cart recovery",
      "Order-status and returns handled",
      "Lower support load, recovered sales",
    ],
    packageId: "business",
    ctaLabel: "Automate my store",
    keywords: [
      "ai automation for ecommerce",
      "ecommerce support automation",
      "abandoned cart recovery ai",
      "online store ai chatbot",
    ],
    related: [
      { label: "AI Chatbot for E-commerce", href: "/use-cases/ai-chatbot-for-ecommerce" },
      { label: "AI Automation for Retail Stores", href: "/industries/retail-store-ai-automation" },
      { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
    ],
    faqs: [
      { q: "Which platforms do you support?", a: "Shopify, WooCommerce, and other major carts with an API or integration. We confirm yours before building." },
      { q: "Can it actually recover abandoned carts?", a: "Yes — timely, relevant nudges recover a meaningful share of carts that would otherwise be lost, on top of cutting your support load." },
    ],
    schema: "Service",
    icon: "Boxes",
  },
  {
    slug: "retail-store-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Retail Stores",
    title: "AI Automation for Local Retail Stores | Handbuilt",
    description:
      "AI that answers product and hours questions, handles reservations and follows up with customers for local retail — capture the sales you're missing after hours.",
    answer:
      "AI automation for a local retail store answers product, stock and hours questions, handles holds and reservations, and follows up with customers — so you capture inquiries even when the shop is busy or closed. Handbuilt builds it around your inventory and hours.",
    pain: "Local shops lose sales to unanswered questions — \"do you have this in stock?\", \"are you open Sunday?\" — that come in when staff are with customers or after close.",
    scenario:
      "A retail store gets calls and messages about stock and hours all day, plus after-hours inquiries that go unanswered. We build AI that answers product and hours questions, places holds, and follows up with interested customers. Inquiries convert instead of walking to a competitor.",
    steps: [
      "We load your product info, stock approach and hours",
      "AI answers product, stock and hours questions across channels",
      "It handles holds, reservations and simple requests",
      "Follow-up brings interested customers back in",
    ],
    gets: [
      "Product and hours questions answered anytime",
      "Holds and reservations handled",
      "After-hours inquiries captured",
      "Customer follow-up that drives visits",
    ],
    packageId: "starter",
    ctaLabel: "Capture more sales",
    keywords: [
      "ai automation for retail stores",
      "retail store ai assistant",
      "local shop ai chatbot",
      "retail customer inquiry automation",
    ],
    related: [
      { label: "AI Automation for E-commerce", href: "/industries/ecommerce-ai-automation" },
      { label: "AI Website Assistant", href: "/services/ai-website-assistant" },
      { label: "Google Business Profile Lead Automation", href: "/use-cases/google-business-profile-lead-automation" },
    ],
    faqs: [
      { q: "Can it tell customers if something's in stock?", a: "It can answer based on how you manage stock — from a synced feed if available, or your general availability rules — and place holds for interested customers." },
      { q: "Does it work for a single-location shop?", a: "Yes. It's built for local retail specifically, focused on capturing the calls, messages and after-hours questions a busy shop misses." },
    ],
    schema: "Service",
    icon: "Building2",
  },
  {
    slug: "coach-ai-automation",
    eyebrow: "Industry",
    h1: "AI Automation for Coaches",
    title: "AI Automation for Coaches (Business Ops) | Handbuilt",
    description:
      "AI that captures leads, books discovery calls, and runs client admin for coaches — the operations side, so you coach instead of chasing. Built for you from $1,500.",
    answer:
      "AI automation for a coach handles the business operations — capturing leads, booking discovery calls, following up, and running client admin and onboarding — so your energy goes into coaching, not chasing. Handbuilt builds it around how you enroll and deliver.",
    pain: "Coaches are great at coaching and stretched thin on operations — leads slip, discovery calls don't get booked, and onboarding admin piles up between sessions.",
    scenario:
      "A coach gets inquiries from content and referrals but can't follow up fast enough while delivering sessions. We build AI that captures leads, books discovery calls, follows up with the undecided, and automates client onboarding. Enrollment gets smoother without stealing coaching time. (For the content and marketing side, our creator coaching content system pairs with this.)",
    steps: [
      "We map your enrollment and client-delivery process",
      "AI captures leads and books discovery calls",
      "Follow-up nurtures prospects toward enrolling",
      "Client onboarding and admin are automated",
    ],
    gets: [
      "Leads captured and discovery calls booked",
      "Follow-up that converts more inquiries",
      "Automated client onboarding",
      "Operations off your plate so you can coach",
    ],
    packageId: "starter",
    ctaLabel: "Automate my coaching business",
    keywords: [
      "ai automation for coaches",
      "coaching business automation",
      "coach lead and booking automation",
      "coach client onboarding automation",
    ],
    related: [
      { label: "AI Coaching Content System", href: "/creators/ai-coaching-content-system" },
      { label: "AI Automation for Consultants", href: "/industries/consultant-ai-automation" },
      { label: "Client Onboarding Automation", href: "/use-cases/client-onboarding-automation" },
    ],
    faqs: [
      { q: "How is this different from the coaching content system?", a: "This is the operations side — leads, booking, follow-up and onboarding. The creator coaching content system handles content, lead magnets and nurture. Many coaches want both; they connect cleanly." },
      { q: "I run group and 1:1 — does it handle both?", a: "Yes. We build around your specific offers and enrollment flow, whether that's 1:1, group programs or a mix." },
    ],
    schema: "Service",
    icon: "GraduationCap",
  },
];
