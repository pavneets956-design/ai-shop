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
    slug: "ai-receptionist-for-contractors",
    solution: "AI Receptionist",
    industry: "Contractors & Trades",
    question: "How do I get an AI receptionist for my contracting business?",
    answer:
      "An AI receptionist for contractors answers every call and text 24/7 — even while you're on a roof or under a sink — books the job, captures the details and texts them to you instantly. AI Shop builds and trains one on your services, pricing and service area, live in about 5 business days, starting at $1,000 CAD.",
    pain: "Trades lose thousands in jobs every month to missed calls and voicemails customers never leave. The first contractor to pick up usually wins the job.",
    steps: [
      "We learn your services, pricing, hours and service area",
      "We set up an AI line that answers calls and texts in your voice",
      "It qualifies the job, books it, and texts you the details",
      "You show up to work that's already scheduled",
    ],
    gets: [
      "24/7 call & text answering",
      "Instant job booking synced to your calendar",
      "Lead details texted to you in real time",
      "No more missed-call lost jobs",
    ],
    packageId: "starter",
    relatedBuilds: ["ai-receptionist", "ai-lead-follow-up-agent"],
    keywords: [
      "ai receptionist for contractors",
      "ai answering service for trades",
      "missed call automation contractor",
      "ai phone answering small business",
    ],
    faqs: [
      {
        q: "Can the AI receptionist book jobs into my calendar?",
        a: "Yes — it can sync directly to Google Calendar or your scheduling tool and book qualified jobs automatically.",
      },
      {
        q: "Does it sound robotic to my customers?",
        a: "No. It's trained on your business and speaks naturally. Most callers can't tell, and the hard calls get routed to you.",
      },
    ],
  },
  {
    slug: "lead-capture-ai-for-real-estate",
    solution: "AI Lead Follow-Up Agent",
    industry: "Real Estate",
    question: "How can a real estate agent capture and follow up on leads with AI?",
    answer:
      "An AI lead agent for real estate replies to every inquiry within seconds, qualifies the buyer or seller, and follows up automatically until they book a viewing or call. AI Shop builds this as a Business AI System from $2,500 CAD, connected to your CRM and calendar.",
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
      "An AI chatbot for restaurants answers questions about hours, menu, reservations, allergens and location instantly — and takes booking or catering requests. AI Shop trains one on your menu and details and adds it to your site, starting at $1,000 CAD.",
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
      "An AI receptionist for clinics answers patient calls and messages, books and reschedules appointments, sends reminders to cut no-shows, and answers routine questions about hours and services. AI Shop builds it from $1,000 CAD, or as a connected system from $2,500 CAD.",
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
      "An AI invoice reminder system tracks your unpaid invoices and automatically nudges clients — politely, on a schedule — until they pay, then stops. AI Shop sets this up from $1,000 CAD, connected to your invoicing tool.",
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
      "AI Shop builds custom AI apps and SaaS MVPs end to end — user accounts, database, payments, admin panel and custom AI logic — on a modern stack you fully own. Builds start from $7,500 CAD and typically ship in 4–8 weeks, scoped on a call.",
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
      "An AI receptionist for dental practices answers patient calls and texts, books and reschedules cleanings and checkups, and sends automatic reminders that cut no-shows. AI Shop trains it on your services, providers and hours, starting at $1,000 CAD, or as a connected system from $2,500 CAD.",
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
      "An AI booking assistant for salons answers DMs, calls and texts, books appointments into your calendar, and sends reminders so clients actually show up. AI Shop sets one up trained on your services and stylists, starting at $1,000 CAD.",
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
      "An AI chatbot for e-commerce answers product, sizing, shipping and returns questions instantly, recommends products, and recovers carts — trained on your catalog and policies. AI Shop adds one to your store starting at $1,000 CAD.",
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
      "An AI content engine for creators writes, repurposes and schedules posts, newsletters and scripts in your exact brand voice — turning one idea into a week of content. AI Shop builds it as a Business AI System from $2,500 CAD.",
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
      "AI automation for accountants chases missing client documents, sends deadline reminders, drafts routine client emails, and keeps your data in sync — so you spend time on work that bills, not admin. AI Shop builds this as a Business AI System from $2,500 CAD.",
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
      "An AI document analyzer for law firms reads contracts and case files, summarizes them, answers questions about their contents, and flags key clauses — securely, on your documents. AI Shop builds this as a Custom AI App from $7,500 CAD, scoped on a call.",
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
      "An AI receptionist for real estate answers buyer and seller calls and texts 24/7, qualifies them, books showings and valuations, and texts you the hot ones. AI Shop builds it from $1,000 CAD, or as a full lead system from $2,500 CAD.",
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
      "An AI support bot for SaaS resolves common product questions instantly from your docs, deflects tickets, and escalates the hard ones to your team with full context. AI Shop builds it from $2,500 CAD as a Business AI System.",
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
      "Yes — AI Shop builds private personal AI apps: a daily planner, finance tracker, or assistant that organizes your tasks, goals and reminders around how you actually live. Personal apps start from $7,500 CAD as a Custom AI App, scoped on a call.",
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
];

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}
