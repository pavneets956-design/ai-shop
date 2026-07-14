// Programmatic GEO/SEO pages: one per [solution] × [industry].
// Each renders answer-first content + FAQPage + Service schema at /use-cases/[slug].
// Add rows here to expand surface area — the page template handles the rest.

export interface UseCase {
  slug: string;
  solution: string;
  industry: string;
  question: string; // H1 — phrased as the query people type/ask an LLM
  answer: string; // answer-first lead paragraph (LLM-citable)
  pain: string;
  steps: string[];
  gets: string[];
  packageId: "starter" | "business" | "custom";
  relatedBuilds: string[];
  keywords: string[];
  faqs: { q: string; a: string }[];
}

export const useCases: UseCase[] = [
  {
    slug: "lead-capture-ai-for-real-estate",
    solution: "AI Lead Follow-Up Agent",
    industry: "Real Estate",
    question: "How can a real estate agent capture and follow up on leads with AI?",
    answer:
      "An AI lead agent for real estate replies to every inquiry within seconds, qualifies the buyer or seller, and follows up automatically until they book a viewing or call. Handbuilt builds this as a Business AI System from $3,500 CAD, connected to your CRM and calendar.",
    pain: "In real estate, the agent who replies first usually wins the client — but you can't watch your inbox during showings. Leads go cold in minutes.",
    steps: [
      "New leads from your site, portals or ads hit the agent instantly",
      "It replies in seconds, asks the right qualifying questions",
      "It books viewings and follows up until they respond",
      "Qualified, ready leads land in your CRM",
    ],
    gets: [
      "Sub-minute lead response, 24/7",
      "Automatic buyer/seller qualification",
      "Persistent follow-up until they book",
      "Everything synced to your CRM",
    ],
    packageId: "business",
    relatedBuilds: ["ai-lead-follow-up-agent", "ai-website-chatbot"],
    keywords: [
      "ai lead follow up real estate",
      "real estate ai assistant",
      "ai for realtors lead capture",
      "automated lead response real estate",
    ],
    faqs: [
      {
        q: "Does it work with my existing CRM?",
        a: "Yes — it integrates with most common real estate CRMs and calendars so leads flow into the tools you already use.",
      },
    ],
  },
  {
    slug: "ai-chatbot-for-restaurants",
    solution: "AI Website Chatbot",
    industry: "Restaurants",
    question: "How do I add an AI chatbot to my restaurant website?",
    answer:
      "An AI chatbot for restaurants answers questions about hours, menu, reservations, allergens and location instantly — and takes booking or catering requests. Handbuilt trains one on your menu and details and adds it to your site, starting at $1,500 CAD.",
    pain: "Restaurants get the same handful of questions all day — hours, do you take reservations, is there parking — pulling staff off the floor to answer DMs and calls.",
    steps: [
      "We train the bot on your menu, hours, location and policies",
      "We add it to your website (and DMs if you want)",
      "It answers guests instantly and takes booking requests",
      "It hands off catering or large-party requests to you",
    ],
    gets: [
      "Instant answers to repeat questions",
      "Reservation & catering request capture",
      "Less time on the phone during service",
      "Works on your site and social DMs",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-website-chatbot", "ai-customer-support-bot"],
    keywords: [
      "ai chatbot for restaurants",
      "restaurant website chatbot",
      "ai reservations bot",
      "ai for restaurant customer service",
    ],
    faqs: [
      {
        q: "Can it take reservations?",
        a: "It can capture reservation and catering requests and either send them to you or book directly if you use an online reservation system.",
      },
    ],
  },
  {
    slug: "ai-receptionist-for-clinics",
    solution: "AI Receptionist",
    industry: "Clinics & Health",
    question: "How can a clinic use an AI receptionist to handle calls and bookings?",
    answer:
      "An AI receptionist for clinics answers patient calls and messages, books and reschedules appointments, sends reminders to cut no-shows, and answers routine questions about hours and services. Handbuilt builds it from $1,500 CAD, or as a connected system from $3,500 CAD.",
    pain: "Front desks are overwhelmed — phones ringing while patients wait, no-shows eating the schedule, and after-hours calls going unanswered.",
    steps: [
      "We train it on your services, providers and policies",
      "It answers calls/messages and books or reschedules",
      "It sends automatic appointment reminders",
      "Complex or clinical questions route to your staff",
    ],
    gets: [
      "24/7 patient call & message handling",
      "Automated booking and rescheduling",
      "No-show reminders",
      "Less front-desk overload",
    ],
    packageId: "business",
    relatedBuilds: ["ai-receptionist", "ai-customer-support-bot"],
    keywords: [
      "ai receptionist for clinic",
      "ai appointment booking medical",
      "reduce no shows clinic ai",
      "ai phone system healthcare",
    ],
    faqs: [
      {
        q: "Is patient information handled carefully?",
        a: "Yes — builds are scoped to keep sensitive data secure and route any clinical questions to your trained staff rather than answering them automatically.",
      },
    ],
  },
  {
    slug: "ai-invoice-reminders-for-small-business",
    solution: "AI Invoice Reminder System",
    industry: "Small Business",
    question: "How do I automate invoice reminders and get paid faster?",
    answer:
      "An AI invoice reminder system tracks your unpaid invoices and automatically nudges clients — politely, on a schedule — until they pay, then stops. Handbuilt sets this up from $1,500 CAD, connected to your invoicing tool.",
    pain: "Chasing late payments is awkward, time-consuming, and easy to forget — so invoices sit unpaid for weeks longer than they should.",
    steps: [
      "We connect it to your invoicing or accounting tool",
      "It watches for overdue invoices",
      "It sends polite, escalating reminders on schedule",
      "It stops the moment an invoice is paid",
    ],
    gets: [
      "Automatic, polite payment chasing",
      "Faster average payment times",
      "No awkward manual follow-ups",
      "Clear view of who still owes you",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-invoice-reminder-system", "ai-business-dashboard"],
    keywords: [
      "automate invoice reminders",
      "ai get paid faster",
      "overdue invoice automation",
      "ai accounts receivable small business",
    ],
    faqs: [
      {
        q: "Will it sound pushy to my clients?",
        a: "No — the tone and schedule are set by you. Reminders start friendly and escalate gently, in your brand voice.",
      },
    ],
  },
  {
    slug: "custom-ai-app-for-startups",
    solution: "Custom AI App",
    industry: "Startups & Founders",
    question: "How do I build a custom AI app or SaaS MVP?",
    answer:
      "Handbuilt builds custom AI apps and SaaS MVPs end to end — user accounts, database, payments, admin panel and custom AI logic — on a modern stack you fully own. Builds start from $10,000 CAD and typically ship in 4–8 weeks, scoped on a call.",
    pain: "Founders waste months and tens of thousands hiring agencies or piecing together no-code tools that break the moment they get traction.",
    steps: [
      "We scope your idea into a buildable MVP on a call",
      "We design the app, data model and AI logic",
      "We build, connect and deploy it",
      "You launch — and you own the code",
    ],
    gets: [
      "A real, deployable app — not a prototype",
      "Custom AI logic on your data",
      "Auth, database, payments, admin panel",
      "Full code ownership, no lock-in",
    ],
    packageId: "custom",
    relatedBuilds: ["ai-personal-planner", "ai-business-dashboard"],
    keywords: [
      "build a custom ai app",
      "ai saas mvp development",
      "custom ai software developer",
      "build an ai startup product",
    ],
    faqs: [
      {
        q: "Do I own the code?",
        a: "Yes. Custom apps are built on an ownable stack and the code is yours — no proprietary platform you can't leave.",
      },
    ],
  },
  {
    slug: "ai-receptionist-for-dentists",
    solution: "AI Receptionist",
    industry: "Dental Practices",
    question: "How can a dental practice use an AI receptionist to book patients and cut no-shows?",
    answer:
      "An AI receptionist for dental practices answers patient calls and texts, books and reschedules cleanings and checkups, and sends automatic reminders that cut no-shows. Handbuilt trains it on your services, providers and hours, starting at $1,500 CAD, or as a connected system from $3,500 CAD.",
    pain: "Dental front desks juggle ringing phones, walk-ins and recall calls — and every no-show is a wasted chair-hour that can't be sold back.",
    steps: [
      "We train it on your treatments, providers, hours and policies",
      "It answers calls and texts and books or reschedules",
      "It sends recall and appointment reminders automatically",
      "Anything clinical routes straight to your team",
    ],
    gets: [
      "24/7 patient call & text answering",
      "Automated booking, recalls & reminders",
      "Fewer no-shows and empty chairs",
      "A calmer, less overloaded front desk",
    ],
    packageId: "business",
    relatedBuilds: ["ai-receptionist", "ai-customer-support-bot"],
    keywords: [
      "ai receptionist for dentists",
      "dental appointment booking ai",
      "reduce dental no shows",
      "ai phone answering dental office",
    ],
    faqs: [
      {
        q: "Can it handle recall reminders for cleanings?",
        a: "Yes — it can automatically reach out when patients are due for cleanings or checkups and book them straight in.",
      },
    ],
  },
  {
    slug: "ai-booking-assistant-for-salons",
    solution: "AI Booking Assistant",
    industry: "Salons & Beauty",
    question: "How do I get an AI booking assistant for my salon or spa?",
    answer:
      "An AI booking assistant for salons answers DMs, calls and texts, books appointments into your calendar, and sends reminders so clients actually show up. Handbuilt sets one up trained on your services and stylists, starting at $1,500 CAD.",
    pain: "Salons lose bookings to missed DMs and after-hours messages, and no-shows quietly eat the schedule every week.",
    steps: [
      "We train it on your services, stylists, prices and hours",
      "It answers Instagram DMs, texts and calls",
      "It books clients into your calendar instantly",
      "It sends reminders to cut no-shows",
    ],
    gets: [
      "Instant replies on DMs, text and phone",
      "Bookings synced to your calendar",
      "Automatic no-show reminders",
      "More booked chairs, less admin",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-website-chatbot"],
    keywords: [
      "ai booking assistant for salon",
      "salon instagram dm automation",
      "ai appointment booking beauty",
      "reduce salon no shows ai",
    ],
    faqs: [
      {
        q: "Can it reply to my Instagram DMs?",
        a: "Yes — it can answer Instagram and other DMs, quote your services, and book clients without you touching your phone.",
      },
    ],
  },
  {
    slug: "ai-chatbot-for-ecommerce",
    solution: "AI Website Chatbot",
    industry: "E-commerce",
    question: "How do I add an AI chatbot to my e-commerce store?",
    answer:
      "An AI chatbot for e-commerce answers product, sizing, shipping and returns questions instantly, recommends products, and recovers carts — trained on your catalog and policies. Handbuilt adds one to your store starting at $1,500 CAD.",
    pain: "Online shoppers bounce when they can't get a quick answer about sizing, stock or shipping — and every unanswered question is a lost sale.",
    steps: [
      "We train it on your catalog, shipping and returns policies",
      "We add it to your store (Shopify, Woo, custom, etc.)",
      "It answers shoppers and recommends products",
      "It captures emails and nudges abandoned carts",
    ],
    gets: [
      "Instant product, shipping & returns answers",
      "Product recommendations that lift AOV",
      "Cart recovery & email capture",
      "Fewer support tickets",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-website-chatbot", "ai-customer-support-bot"],
    keywords: [
      "ai chatbot for ecommerce",
      "shopify ai chatbot",
      "ai product recommender store",
      "ai customer support ecommerce",
    ],
    faqs: [
      {
        q: "Does it work with Shopify?",
        a: "Yes — it works with Shopify, WooCommerce and custom stores, trained on your real product catalog.",
      },
    ],
  },
  {
    slug: "ai-content-engine-for-creators",
    solution: "AI Content Engine",
    industry: "Creators & Coaches",
    question: "How do I build an AI content engine in my own brand voice?",
    answer:
      "An AI content engine for creators writes, repurposes and schedules posts, newsletters and scripts in your exact brand voice — turning one idea into a week of content. Handbuilt builds it as a Business AI System from $3,500 CAD.",
    pain: "Creators burn out producing content manually, and generic AI tools spit out bland copy that sounds nothing like them.",
    steps: [
      "We train it on your voice, topics and best-performing content",
      "You drop in an idea, transcript or long-form piece",
      "It generates posts, captions, emails and scripts",
      "It queues everything ready to schedule",
    ],
    gets: [
      "Content in your real brand voice",
      "One idea repurposed into many formats",
      "A consistent posting pipeline",
      "Hours back every week",
    ],
    packageId: "business",
    relatedBuilds: ["ai-content-engine", "ai-personal-planner"],
    keywords: [
      "ai content engine brand voice",
      "ai content repurposing tool",
      "ai for creators content",
      "custom ai writing assistant",
    ],
    faqs: [
      {
        q: "Will it actually sound like me?",
        a: "Yes — it's trained on your existing content and voice, not a generic model, so the output reads like you wrote it.",
      },
    ],
  },
  {
    slug: "automate-admin-for-accountants",
    solution: "Business Automation",
    industry: "Accountants & Bookkeepers",
    question: "How can accountants automate admin and client follow-ups with AI?",
    answer:
      "AI automation for accountants chases missing client documents, sends deadline reminders, drafts routine client emails, and keeps your data in sync — so you spend time on work that bills, not admin. Handbuilt builds this as a Business AI System from $3,500 CAD.",
    pain: "Tax and bookkeeping seasons drown firms in document-chasing and repetitive client emails that eat billable hours.",
    steps: [
      "We map your recurring admin and document workflows",
      "It chases missing documents and signatures automatically",
      "It sends deadline and reminder emails on schedule",
      "It keeps client data synced across your tools",
    ],
    gets: [
      "Automated document & signature chasing",
      "Deadline and reminder automation",
      "Drafted routine client emails",
      "More billable hours, less admin",
    ],
    packageId: "business",
    relatedBuilds: ["ai-invoice-reminder-system", "ai-business-dashboard"],
    keywords: [
      "ai automation for accountants",
      "automate bookkeeping admin",
      "ai document chasing accounting",
      "ai for tax firm workflow",
    ],
    faqs: [
      {
        q: "Can it integrate with my accounting software?",
        a: "Yes — it can connect to common accounting and document tools so reminders and syncing happen automatically.",
      },
    ],
  },
  {
    slug: "ai-document-analyzer-for-law-firms",
    solution: "AI Document Analyzer",
    industry: "Law Firms",
    question: "How can a law firm use AI to analyze documents and contracts?",
    answer:
      "An AI document analyzer for law firms reads contracts and case files, summarizes them, answers questions about their contents, and flags key clauses — securely, on your documents. Handbuilt builds this as a Custom AI App from $10,000 CAD, scoped on a call.",
    pain: "Lawyers and paralegals lose hours manually reading, summarizing and searching long documents for the clauses that matter.",
    steps: [
      "We scope your document types and confidentiality needs",
      "We build a secure analyzer trained on your documents",
      "It summarizes, answers questions and flags clauses",
      "Your team reviews — the AI does the heavy reading",
    ],
    gets: [
      "Instant document & contract summaries",
      "Ask-your-documents Q&A",
      "Key clause and risk flagging",
      "Hours saved per matter",
    ],
    packageId: "custom",
    relatedBuilds: ["ai-business-dashboard", "ai-personal-planner"],
    keywords: [
      "ai document analyzer law firm",
      "ai contract review tool",
      "ai legal document summary",
      "custom ai for lawyers",
    ],
    faqs: [
      {
        q: "Is our confidential data kept secure?",
        a: "Yes — builds are scoped for confidentiality, and the analyzer runs on your documents without exposing them publicly.",
      },
    ],
  },
  {
    slug: "ai-receptionist-for-real-estate",
    solution: "AI Receptionist",
    industry: "Real Estate",
    question: "Can a real estate agent get an AI receptionist to answer buyer and seller calls?",
    answer:
      "An AI receptionist for real estate answers buyer and seller calls and texts 24/7, qualifies them, books showings and valuations, and texts you the hot ones. Handbuilt builds it from $1,500 CAD, or as a full lead system from $3,500 CAD.",
    pain: "Agents are in showings and meetings all day — and a missed call is often a buyer or listing that goes to the next agent.",
    steps: [
      "We train it on your listings, areas and process",
      "It answers calls and texts and qualifies the lead",
      "It books showings and valuations to your calendar",
      "It texts you qualified, ready leads instantly",
    ],
    gets: [
      "24/7 call & text answering",
      "Buyer/seller qualification",
      "Showings booked automatically",
      "No more lost-call lost-deals",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-lead-follow-up-agent"],
    keywords: [
      "ai receptionist for real estate",
      "ai answering service realtor",
      "real estate missed call automation",
      "ai for real estate agents calls",
    ],
    faqs: [
      {
        q: "Can it qualify buyers before sending them to me?",
        a: "Yes — it asks your qualifying questions first, so you only get pinged for leads worth your time.",
      },
    ],
  },
  {
    slug: "ai-support-bot-for-saas",
    solution: "AI Customer Support Bot",
    industry: "SaaS & Startups",
    question: "How do I add an AI customer support bot to my SaaS product?",
    answer:
      "An AI support bot for SaaS resolves common product questions instantly from your docs, deflects tickets, and escalates the hard ones to your team with full context. Handbuilt builds it from $3,500 CAD as a Business AI System.",
    pain: "Early SaaS teams drown in repetitive support tickets that pull engineers and founders away from building.",
    steps: [
      "We train it on your docs, help center and past tickets",
      "We embed it in your app and help widget",
      "It resolves common questions instantly",
      "It escalates complex issues with full context",
    ],
    gets: [
      "Instant answers from your docs",
      "Major ticket deflection",
      "Context-rich escalation to humans",
      "Support that scales without headcount",
    ],
    packageId: "business",
    relatedBuilds: ["ai-customer-support-bot", "ai-website-chatbot"],
    keywords: [
      "ai support bot for saas",
      "ai ticket deflection",
      "ai help center chatbot",
      "ai customer support startup",
    ],
    faqs: [
      {
        q: "Can it escalate to a human when it can't help?",
        a: "Yes — when it hits something it can't resolve, it hands off to your team with the full conversation and context.",
      },
    ],
  },
  {
    slug: "personal-ai-assistant-app",
    solution: "Personal AI App",
    industry: "Busy Professionals",
    question: "Can you build me a personal AI assistant app for my life?",
    answer:
      "Yes — Handbuilt builds private personal AI apps: a daily planner, finance tracker, or assistant that organizes your tasks, goals and reminders around how you actually live. Personal apps start from $10,000 CAD as a Custom AI App, scoped on a call.",
    pain: "Off-the-shelf productivity apps never fit how you actually work, and stitching together five tools just creates more overhead.",
    steps: [
      "We scope what you want it to do on a call",
      "We design the app, data model and AI logic",
      "We build, deploy and tune it to your routine",
      "You use it — and you own it",
    ],
    gets: [
      "An app built around your life, not a template",
      "AI that plans, tracks and reminds",
      "Private and yours alone",
      "Full ownership, no subscriptions to a third party",
    ],
    packageId: "custom",
    relatedBuilds: ["ai-personal-planner", "ai-business-dashboard"],
    keywords: [
      "build personal ai assistant app",
      "custom ai planner app",
      "personal ai productivity app",
      "ai life assistant custom",
    ],
    faqs: [
      {
        q: "Is it private to me?",
        a: "Yes — a personal app is built for you alone, on your data, with no public access.",
      },
    ],
  },
  {
    slug: "missed-call-automation",
    solution: "Missed-Call Text-Back",
    industry: "Local Service Businesses",
    question: "How do I stop losing business from missed calls?",
    answer:
      "Missed-call automation instantly texts back anyone whose call you couldn't answer — \"Sorry we missed you, how can we help?\" — so the lead starts a conversation instead of calling your competitor. Handbuilt sets it up on your business number, so no missed call turns into a lost job.",
    pain: "Most people who reach voicemail never leave one — they just call the next business. Every missed call is a lead you paid to generate and then lost in silence.",
    steps: [
      "We connect the automation to your business phone number",
      "A missed call triggers an instant, on-brand text back",
      "The AI answers questions, qualifies, and books or routes to you",
      "You see every recovered lead instead of an empty voicemail box",
    ],
    gets: [
      "Instant text-back on every missed call",
      "Conversations started before the lead moves on",
      "Qualified and booked, or routed to you",
      "No more silent lost leads",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-lead-follow-up-agent"],
    keywords: [
      "missed call automation",
      "missed call text back",
      "stop losing missed calls",
      "auto text missed calls small business",
    ],
    faqs: [
      { q: "How fast does the text go out?", a: "Within seconds of the missed call, while the person is still holding their phone — which is exactly why it recovers so many leads." },
      { q: "Can it book the job, not just text?", a: "Yes — the follow-up conversation can qualify the lead and book directly into your calendar, or hand off to you for anything complex." },
    ],
  },
  {
    slug: "estimate-follow-up-automation",
    solution: "Estimate Follow-Up",
    industry: "Contractors & Home Services",
    question: "How do I follow up on estimates that go quiet?",
    answer:
      "Estimate follow-up automation chases every quote you send until it turns into a yes or a no — with timely, on-brand check-ins — so deals don't die from silence. Handbuilt builds it around your quoting process so your close rate goes up without you remembering to nudge everyone.",
    pain: "Contractors send estimates and then get busy — the follow-up that closes half of quiet quotes never happens, and the job goes to whoever chased.",
    steps: [
      "We connect to how you send estimates",
      "Automated, on-brand follow-ups go out on a proven cadence",
      "The AI answers questions and handles objections",
      "Hot responses are routed to you to close",
    ],
    gets: [
      "Every estimate followed up automatically",
      "A proven multi-touch cadence, not one-and-done",
      "Questions and objections handled",
      "A higher close rate with zero extra effort",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-lead-follow-up-agent", "ai-quote-generator"],
    keywords: [
      "estimate follow up automation",
      "quote follow up automation",
      "contractor estimate follow up",
      "automate quote follow up",
    ],
    faqs: [
      { q: "Won't automated follow-up feel pushy?", a: "It's designed to feel like a helpful, human check-in on your cadence and tone — persistent but polite. You control how many touches and how often." },
      { q: "Does it know when someone already replied?", a: "Yes — it stops the sequence the moment a lead responds and routes them to you, so no one gets chased after they've answered." },
    ],
  },
  {
    slug: "no-show-reminder-automation",
    solution: "No-Show Reduction",
    industry: "Clinics, Salons & Appointment Businesses",
    question: "How do I reduce no-shows and last-minute cancellations?",
    answer:
      "No-show reminder automation sends timely reminders and easy confirm/reschedule options before every appointment, and fills gaps from a waitlist when someone cancels — so empty slots stop costing you money. Handbuilt builds it around your booking system.",
    pain: "Every no-show is a slot you can't sell twice. For appointment-based businesses, a 15% no-show rate is a direct, recurring hit to revenue.",
    steps: [
      "We connect to your booking or scheduling system",
      "Reminders go out on a schedule proven to reduce no-shows",
      "Clients confirm or reschedule in one tap",
      "Cancelled slots are offered to a waitlist automatically",
    ],
    gets: [
      "Timely appointment reminders",
      "One-tap confirm and reschedule",
      "Waitlist fill for cancellations",
      "Fewer empty, unsellable slots",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-business-system"],
    keywords: [
      "no show reminder automation",
      "reduce no shows",
      "appointment no show automation",
      "cut no shows clinic salon",
    ],
    faqs: [
      { q: "How much can it reduce no-shows?", a: "Timely reminders with easy reschedule options meaningfully cut no-shows for most appointment businesses. The waitlist fill recovers revenue from the cancellations that still happen." },
      { q: "Does it work with my booking tool?", a: "We build around common scheduling and practice-management tools and confirm your exact system before starting." },
    ],
  },
  {
    slug: "appointment-reminder-automation",
    solution: "Appointment Reminders",
    industry: "Service & Appointment Businesses",
    question: "How do I automate appointment reminders and confirmations?",
    answer:
      "Appointment reminder automation sends confirmations and reminders by text and email, lets clients confirm or reschedule themselves, and keeps your calendar accurate — without your team making reminder calls. Handbuilt builds it around your booking flow.",
    pain: "Manual reminder calls and texts eat front-desk time, and the ones that get skipped turn into no-shows and confused double-bookings.",
    steps: [
      "We connect to your calendar or booking system",
      "Confirmations and reminders send automatically",
      "Clients confirm, cancel or reschedule themselves",
      "Your calendar stays accurate with no manual calls",
    ],
    gets: [
      "Automatic confirmations and reminders",
      "Self-serve reschedule and cancel",
      "Front-desk time back",
      "A calendar that stays accurate",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-business-system"],
    keywords: [
      "appointment reminder automation",
      "automated appointment reminders",
      "appointment confirmation automation",
      "reminder texts for appointments",
    ],
    faqs: [
      { q: "Text, email or both?", a: "Whatever your clients respond to best — usually text with email backup. We set the channels and timing to fit your audience." },
      { q: "Can clients reschedule themselves?", a: "Yes — reminders include easy confirm and reschedule options, which cuts no-shows and saves your team the back-and-forth." },
    ],
  },
  {
    slug: "google-business-profile-lead-automation",
    solution: "Google Business Profile Leads",
    industry: "Local Businesses",
    question: "How do I capture and respond to Google Business Profile leads automatically?",
    answer:
      "Google Business Profile lead automation answers the messages and questions that come through your Google listing instantly, captures the lead, and follows up — so the customers who find you on Maps don't slip away while you're busy. Handbuilt builds it around your services.",
    pain: "Your Google Business Profile is often where local customers first reach out — and a slow reply to a Google message or question sends them straight to a competitor down the list.",
    steps: [
      "We connect to your Google Business Profile messaging and Q&A",
      "Inquiries get instant, on-brand answers",
      "Leads are captured and qualified",
      "Bookings or hot leads are routed to you",
    ],
    gets: [
      "Instant replies to Google messages and questions",
      "Leads from Maps captured, not missed",
      "Qualification and booking",
      "Faster response than nearby competitors",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-automation-agency"],
    keywords: [
      "google business profile lead automation",
      "google business messages automation",
      "gmb lead automation",
      "respond to google messages automatically",
    ],
    faqs: [
      { q: "Does this help my local ranking?", a: "Fast, consistent responses to Google messages and questions support engagement signals, and — more directly — they stop you losing the local searchers who message you first." },
      { q: "Can it answer the Q&A on my listing?", a: "It can help keep common questions answered and capture the people who reach out, so your profile actively converts instead of sitting passive." },
    ],
  },
  {
    slug: "instagram-dm-automation",
    solution: "Instagram DM Automation",
    industry: "Local & Social-First Businesses",
    question: "How do I automate Instagram DMs for my business?",
    answer:
      "Instagram DM automation answers common questions, captures leads, and books appointments from your DMs — so the inquiries that start on Instagram don't sit unanswered for hours. Handbuilt builds it within Instagram's rules, around your services and voice.",
    pain: "For a lot of local and social-first businesses, Instagram DMs are where sales start — but replying to every \"how much?\" and \"are you available?\" while running the business is impossible.",
    steps: [
      "We map your common DM questions and booking flow",
      "The AI answers FAQs and captures details in your voice",
      "It books appointments or routes real conversations to you",
      "Everything stays within Instagram's automation rules",
    ],
    gets: [
      "Common DM questions answered instantly",
      "Leads captured from Instagram",
      "Appointments booked from DMs",
      "Real conversations still reach you",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-chatbot-development", "ai-receptionist"],
    keywords: [
      "instagram dm automation",
      "automate instagram dms business",
      "instagram lead automation",
      "book appointments from instagram dm",
    ],
    faqs: [
      { q: "Is DM automation allowed on Instagram?", a: "Within Instagram's API and automation policies, yes — we build to stay compliant and tell you upfront what's allowed for your account." },
      { q: "Will it feel impersonal to my followers?", a: "It handles the repetitive questions fast and hands genuine conversations to you, so followers get quick answers without losing the personal touch where it matters." },
    ],
  },
  {
    slug: "facebook-lead-automation",
    solution: "Facebook Lead Automation",
    industry: "Businesses Running Facebook Ads",
    question: "How do I follow up with Facebook lead ads instantly?",
    answer:
      "Facebook lead automation responds to every Facebook and Instagram lead-ad submission within seconds, qualifies them, and books or routes the good ones — so the leads you're paying for don't go cold. Handbuilt connects it to your ad forms and CRM.",
    pain: "Facebook leads go cold within minutes, but most businesses follow up hours later — so the ad spend is wasted on leads that already forgot they filled out the form.",
    steps: [
      "We connect to your Facebook/Instagram lead forms",
      "New leads get an instant, on-brand response",
      "The AI qualifies and books or routes hot leads",
      "Everything logs to your CRM automatically",
    ],
    gets: [
      "Second-by-second lead response",
      "Higher return on your ad spend",
      "Qualification and booking",
      "Leads logged to your CRM",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-lead-follow-up-agent", "ai-automation-agency"],
    keywords: [
      "facebook lead automation",
      "facebook lead ads follow up",
      "instant facebook lead response",
      "automate facebook ad leads",
    ],
    faqs: [
      { q: "Why does speed matter so much for Facebook leads?", a: "Interest drops off fast — responding within minutes instead of hours dramatically improves the odds a lead engages. Automation makes instant response possible without staffing for it." },
      { q: "Does it work with Instagram lead ads too?", a: "Yes — it handles lead-form submissions across Facebook and Instagram and routes them the same way." },
    ],
  },
  {
    slug: "ai-operations-assistant",
    solution: "AI Operations Assistant",
    industry: "Small Business Operations",
    question: "Can AI act as an operations assistant for my business?",
    answer:
      "An AI operations assistant handles the recurring internal work that keeps a business running — status updates, routing requests, chasing tasks, answering team questions from your docs, and pulling simple reports — so your team spends less time coordinating and more time doing. Handbuilt builds it around your workflows.",
    pain: "As a business grows, coordination overhead — who's doing what, where's that file, what's the status — quietly eats a chunk of everyone's day and slows the whole team down.",
    steps: [
      "We map your recurring internal operations and bottlenecks",
      "We build an assistant that routes, chases and reports",
      "It answers team questions from your SOPs and docs",
      "It plugs into the tools your team already uses",
    ],
    gets: [
      "Recurring internal coordination automated",
      "Team questions answered from your own docs",
      "Task chasing and simple reporting handled",
      "Less overhead, faster execution",
    ],
    packageId: "business",
    relatedBuilds: ["ai-business-system", "done-for-you-ai-automation"],
    keywords: [
      "ai operations assistant",
      "ai for business operations",
      "internal operations automation",
      "ai ops assistant small business",
    ],
    faqs: [
      { q: "How is this different from an AI receptionist?", a: "A receptionist faces your customers; an operations assistant faces your team — handling the internal coordination, routing and reporting that keep the business running." },
      { q: "Can it answer from our internal docs?", a: "Yes — we train it on your SOPs and internal knowledge so your team gets accurate answers without pinging each other all day." },
    ],
  },
  {
    slug: "ai-sop-generator",
    solution: "AI SOP Generator",
    industry: "Growing & Hiring Businesses",
    question: "How can AI help me document SOPs and processes?",
    answer:
      "An AI SOP generator turns how you already do things into clear, consistent standard operating procedures — from a quick description or a screen recording — so you can train staff and delegate without writing documentation from scratch. Handbuilt builds it around your business.",
    pain: "The knowledge that runs your business lives in your head, which makes hiring, delegating and consistency painful — but sitting down to write SOPs never makes it to the top of the list.",
    steps: [
      "We set up a fast way to capture how a task is done",
      "The AI drafts a clear, structured SOP in your format",
      "You review and approve; it's stored where your team can find it",
      "New processes get documented as you go, not never",
    ],
    gets: [
      "SOPs drafted from a description or recording",
      "Consistent, structured documentation",
      "Easier hiring, training and delegation",
      "A process library that actually gets built",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-document-generator", "ai-business-system"],
    keywords: [
      "ai sop generator",
      "ai standard operating procedure generator",
      "document processes with ai",
      "sop automation small business",
    ],
    faqs: [
      { q: "Do I have to write anything?", a: "No — you describe the task or record yourself doing it, and the AI drafts the SOP. You just review and approve." },
      { q: "Where do the SOPs live?", a: "Wherever your team already works — a docs tool, wiki or shared drive — so they're actually found and used, not buried." },
    ],
  },
  {
    slug: "client-onboarding-automation",
    solution: "Client Onboarding Automation",
    industry: "Service Businesses & Professionals",
    question: "How do I automate client onboarding?",
    answer:
      "Client onboarding automation gives every new client a smooth, consistent start — welcome messages, intake forms, document collection, scheduling and next steps — without your team doing it by hand each time. Handbuilt builds it around your onboarding process.",
    pain: "A messy or slow onboarding sets the wrong tone and eats staff time, and doing it manually for every client means it's inconsistent and things fall through the cracks.",
    steps: [
      "We map your ideal onboarding from signed to started",
      "New clients get automated welcomes and intake forms",
      "Documents are requested and chased automatically",
      "Kickoff scheduling and next steps are handled",
    ],
    gets: [
      "A consistent, professional onboarding every time",
      "Intake forms and documents collected automatically",
      "Kickoff scheduling handled",
      "Staff time back and nothing missed",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-business-system", "ai-intake-form-builder"],
    keywords: [
      "client onboarding automation",
      "automate client onboarding",
      "new client onboarding workflow",
      "onboarding automation service business",
    ],
    faqs: [
      { q: "Does it work for any service business?", a: "Yes — we build around your specific onboarding steps, whether you're an agency, clinic, bookkeeper, coach or professional firm." },
      { q: "Can it collect documents and signatures?", a: "It requests and chases the documents you need and can connect to your forms and e-sign tools so onboarding completes without manual follow-up." },
    ],
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

// ---------- Live demo config ----------
// Conversational use cases get an embedded, working AI-receptionist demo.
// Derived from solution + industry so we don't hand-author every entry.
export interface UseCaseDemo {
  business: string; // persona string passed to /api/demo
  greeting: string; // first assistant line
  suggestions: string[]; // quick-prompt chips
}

const CONVERSATIONAL: Record<string, "receptionist" | "booking" | "chatbot" | "lead" | "support"> = {
  "AI Receptionist": "receptionist",
  "AI Booking Assistant": "booking",
  "AI Website Chatbot": "chatbot",
  "AI Lead Follow-Up Agent": "lead",
  "AI Customer Support Bot": "support",
};

const SAMPLE_BUSINESS: Record<string, string> = {
  "Contractors & Trades": "Summit Plumbing & Heating, a contracting & trades business",
  "Real Estate": "Westside Realty, a real estate agency",
  Restaurants: "The Corner Table, a restaurant",
  "Clinics & Health": "Brightside Family Clinic, a health clinic",
  "Dental Practices": "Brightsmile Dental, a dental practice",
  "Salons & Beauty": "Luxe Hair & Spa, a salon and spa",
  "E-commerce": "Northgoods, an online store",
  "SaaS & Startups": "Flowdesk, a SaaS product",
};

export function getUseCaseDemo(uc: UseCase): UseCaseDemo | null {
  const kind = CONVERSATIONAL[uc.solution];
  if (!kind) return null;

  const business = SAMPLE_BUSINESS[uc.industry] ?? `a ${uc.industry.toLowerCase()} business`;
  const name = business.split(",")[0];
  const ecommerce = uc.industry === "E-commerce";

  const presets = {
    receptionist: {
      greeting: `Thanks for calling ${name}! This is the AI receptionist — how can I help you today?`,
      suggestions: ["Ask for a quote", "Book an appointment", "It's urgent", "What are your hours?"],
    },
    booking: {
      greeting: `Hi, you've reached ${name}! I can get you booked in — what are you after?`,
      suggestions: ["Book an appointment", "What are your prices?", "Any openings today?", "Reschedule"],
    },
    chatbot: ecommerce
      ? {
          greeting: `Hi! 👋 You're chatting with ${name} — happy to help with your order or our products.`,
          suggestions: ["Where's my order?", "What's your return policy?", "Help me pick a size", "Is this in stock?"],
        }
      : {
          greeting: `Hi! 👋 You're chatting with ${name}'s assistant — how can I help?`,
          suggestions: ["Do you take reservations?", "What are your hours?", "Where are you located?", "Book a table"],
        },
    lead: {
      greeting: `Hi, thanks for reaching out to ${name}! Are you looking to buy, sell, or book a viewing?`,
      suggestions: ["Book a viewing", "Is it still available?", "What's the price?", "I'm selling my home"],
    },
    support: {
      greeting: `Hi! You're chatting with ${name}'s support assistant — what can I help with?`,
      suggestions: ["How do I reset my password?", "I have a billing question", "Something's not working", "Talk to a human"],
    },
  };

  return { business, ...presets[kind] };
}
