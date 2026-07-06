import type { LandingContent } from "./landing";

export const resources: LandingContent[] = [
  {
    slug: "how-much-does-ai-automation-cost",
    eyebrow: "Resource",
    h1: "How Much Does AI Automation Cost?",
    title: "How Much Does AI Automation Cost? | Handbuilt",
    description: "Real CAD price ranges for AI automation in 2026 — what drives cost, what you get at each tier, and when to build vs. buy.",
    answer: "For small businesses in Canada, AI automation projects typically run $1,500–$10,000+ CAD depending on complexity. A single-tool setup (chatbot, intake form, basic workflow) starts around $1,500. A full business system with custom integrations runs $3,500–$7,500. Ongoing support plans add $99/month. These are build-once costs — not per-seat SaaS fees.",
    sections: [
      {
        heading: "Price Ranges by Project Type",
        body: "Most small business AI projects fall into three tiers. The tier is determined by how many systems need to connect, whether you need custom logic, and how much human oversight the workflow requires.",
        bullets: [
          "Starter ($1,500): One tool — AI intake form, chatbot on your website, or a single automated workflow. Works well for leads, FAQs, or basic scheduling.",
          "Business ($3,500–$7,500, typically $7,500): Multi-step system — e.g. AI receptionist + CRM sync + follow-up emails. Includes integrations with your existing tools.",
          "Custom (from $10,000): Industry-specific builds, complex data pipelines, or tools that replace a staff function entirely.",
          "Care Plan ($99/month): Ongoing updates, prompt tuning, monitoring, and priority support after launch.",
        ],
      },
      {
        heading: "What Drives the Price Up",
        body: "The biggest cost variables are integrations and custom logic. A chatbot that answers FAQ from a PDF is cheap. A chatbot that looks up job status from your field-service software, routes based on urgency, and emails a summary to the owner is not.",
        bullets: [
          "Number of integrations (CRM, calendar, accounting, field software)",
          "Whether you need a custom-trained model vs. a prompt-based wrapper",
          "Compliance requirements (healthcare, legal, finance add scope)",
          "How much existing documentation or data you can provide upfront",
          "Whether you need staff training or change management included",
        ],
      },
      {
        heading: "Off-the-Shelf vs. Custom Build",
        body: "Tools like Tidio, Zapier, or Make.com have free or low-cost tiers and can handle simple use cases. The gap shows up when your workflow is non-standard, your data lives in a niche platform, or you need the output to actually match your brand voice. Custom builds cost more upfront but don't hit per-seat pricing walls as you grow.",
        bullets: [
          "Off-the-shelf: $0–$200/month, fast setup, limited customization",
          "No-code automation (Zapier/Make): $20–$150/month, works for linear workflows",
          "Custom AI build: $1,500–$10,000 one-time, then $0–$499/month maintenance",
          "Break-even on custom vs. SaaS typically hits at 12–18 months",
        ],
      },
      {
        heading: "Hidden Costs to Plan For",
        body: "API usage fees from OpenAI, Anthropic, or similar providers are real but usually small for most small business volumes — typically $5–$50/month depending on traffic. You'll also want to budget time for your team to provide feedback during the first 30 days so the tool can be tuned.",
        bullets: [
          "LLM API fees: $5–$50/month at typical small business volume",
          "Third-party tool subscriptions (if new platforms are needed)",
          "Staff time for onboarding and feedback during the tuning period",
          "Future scope changes if your process evolves",
        ],
      },
    ],
    packageId: "business",
    ctaLabel: "Get a Quote",
    keywords: ["ai automation cost canada", "ai automation pricing small business", "how much does ai cost", "ai build cost cad", "small business ai budget"],
    related: [
      { label: "Pricing", href: "/pricing" },
      { label: "What Is An AI Receptionist", href: "/resources/what-is-an-ai-receptionist" },
      { label: "AI Automation Examples For Small Business", href: "/resources/ai-automation-examples-for-small-business" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
    ],
    faqs: [
      {
        q: "Is AI automation worth it for a small business?",
        a: "It depends on the problem. If you're spending 5+ hours a week on a repeatable task — answering the same questions, chasing leads, entering data — automation usually pays for itself within a year. If your process changes constantly or requires frequent judgment calls, the ROI is harder to justify.",
      },
      {
        q: "Do I pay monthly fees after the build?",
        a: "Not necessarily. The build cost is one-time. You'll pay API fees (usually small) and optionally a $99/month care plan if you want ongoing updates and support. There's no forced subscription.",
      },
      {
        q: "How long does a project take?",
        a: "A Starter project typically takes 1–2 weeks. A Business-tier project runs 3–6 weeks depending on integration complexity and how quickly your team can provide feedback.",
      },
      {
        q: "Can I start small and expand later?",
        a: "Yes. Most clients start with one tool — a chatbot or intake form — and add automations over time. It's usually cheaper to build the foundation right the first time, but starting small is a reasonable way to test before committing to a larger system.",
      },
    ],
    schema: "Article",
    icon: "Receipt",
  },
  {
    slug: "what-is-an-ai-receptionist",
    eyebrow: "Resource",
    h1: "What Is an AI Receptionist?",
    title: "What Is an AI Receptionist? | Handbuilt",
    description: "Plain-language explanation of what an AI receptionist does, what it can't do, what it costs, and whether it fits your business.",
    answer: "An AI receptionist is a software tool that handles inbound customer interactions — answering questions, collecting information, and routing requests — without a human on the other end. It typically runs on your website, via SMS, or through a phone system. It's not a human voice actor; it's a language model trained to respond consistently to common inquiries based on rules and context you provide.",
    sections: [
      {
        heading: "What an AI Receptionist Actually Does",
        body: "The core function is handling the first layer of contact so your staff doesn't have to. A well-built AI receptionist can handle a significant share of inbound volume for most service businesses — but \"significant share\" depends on how predictable your inquiries are.",
        bullets: [
          "Answers FAQs (hours, pricing, services, location)",
          "Collects lead information (name, contact, job type, urgency)",
          "Books appointments by connecting to your calendar",
          "Qualifies leads before routing to staff",
          "Sends confirmation emails or SMS after contact",
          "Escalates to a human when the request is outside its scope",
        ],
      },
      {
        heading: "What It Can't Do",
        body: "An AI receptionist is not a replacement for every human interaction. It works best on predictable, high-volume inquiries. Complex complaints, sensitive situations, and anything requiring professional judgment should route to a person.",
        bullets: [
          "Can't exercise professional judgment (legal, medical, financial decisions)",
          "Can't handle emotionally charged or escalated complaints without a handoff",
          "Can't access systems it's not connected to (field software, job history)",
          "Won't be perfect — it will occasionally misunderstand or give incomplete answers",
        ],
      },
      {
        heading: "What It Costs",
        body: "Setup cost for an AI receptionist ranges from $1,500 (basic website chatbot) to $3,500–$7,500 for a full system with calendar integration, CRM sync, and SMS capability. Most small businesses in Canada land in the $1,500–$3,500 range. Ongoing costs are minimal — LLM API fees of $5–$30/month and an optional $99/month support plan.",
        bullets: [
          "Basic chatbot (website only): $1,500",
          "Full receptionist with calendar + CRM: $2,500–$3,500",
          "Phone-based AI receptionist: $3,500–$7,500+ (requires voice integration)",
          "Monthly running cost: $5–$30 in API fees at typical small business volume",
        ],
      },
      {
        heading: "Who It's a Good Fit For",
        body: "Service businesses with predictable inbound volume get the clearest benefit. If you're a plumber, cleaner, dental clinic, or contractor fielding the same 10 questions every week while missing calls after hours, an AI receptionist pays for itself quickly.",
        bullets: [
          "Trades and home services (after-hours coverage, lead capture)",
          "Dental and medical clinics (appointment booking, FAQ)",
          "Cleaning and property services (quoting, scheduling)",
          "Any business that gets more calls/messages than staff can answer promptly",
        ],
      },
    ],
    packageId: "starter",
    ctaLabel: "See How It Works",
    keywords: ["ai receptionist small business", "what is an ai receptionist", "ai answering service canada", "ai chatbot receptionist", "automated receptionist cost"],
    related: [
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "AI Receptionist Setup", href: "/services/ai-receptionist-setup" },
      { label: "How Much Does AI Automation Cost", href: "/resources/how-much-does-ai-automation-cost" },
      { label: "Dental Clinic AI Automation", href: "/industries/dental-clinic-ai-automation" },
    ],
    faqs: [
      {
        q: "Does an AI receptionist answer phone calls?",
        a: "It can, but phone-based AI (voice AI) is more complex and expensive than a text-based chatbot. Most small businesses start with a website or SMS-based version, which handles the majority of inbound volume at lower cost.",
      },
      {
        q: "Will customers know they're talking to AI?",
        a: "That's your choice. We recommend being transparent — most customers don't mind talking to an AI for basic inquiries, and trying to hide it creates trust problems if they figure it out. The AI can say something like 'I'm an automated assistant — if you'd prefer to speak with someone, reply HUMAN.'",
      },
      {
        q: "What happens when the AI doesn't know the answer?",
        a: "It should be built to escalate gracefully — offer to connect the customer to a person, take a message, or direct them to a phone number. A good AI receptionist knows the boundaries of what it knows.",
      },
      {
        q: "How long does it take to set one up?",
        a: "A basic website chatbot can be live in 1–2 weeks. A full receptionist system with calendar and CRM integration typically takes 3–5 weeks, including the tuning period where we adjust responses based on real customer questions.",
      },
    ],
    schema: "Article",
    icon: "PhoneCall",
  },
  {
    slug: "best-ai-tools-for-small-business",
    eyebrow: "Resource",
    h1: "Best AI Tools for Small Businesses (2026)",
    title: "Best AI Tools for Small Businesses (2026) | Handbuilt",
    description: "Honest, category-by-category guide to AI tools small businesses actually use — what each does, what it costs, and where off-the-shelf ends and custom begins.",
    answer: "The most useful AI tools for small businesses in 2026 fall into six categories: writing and content, customer communication, scheduling and intake, workflow automation, bookkeeping assistance, and custom-built systems. No single tool does everything well. Most businesses run 2–4 tools plus one or two custom automations connecting them.",
    sections: [
      {
        heading: "Writing and Content",
        body: "AI writing tools are the most widely adopted category. They're useful for drafting emails, website copy, job descriptions, and social posts. The main providers are similar in quality — the difference is mostly in interface and pricing.",
        bullets: [
          "ChatGPT (OpenAI) — general-purpose, widely used, $20/month for Plus",
          "Claude (Anthropic) — strong for longer documents and nuanced tone, $20/month",
          "Jasper — marketing-focused wrapper on top of GPT, $39–$59/month",
          "Notion AI — useful if you already use Notion for docs, included in Notion plans",
          "Cost range: $0–$60/month depending on volume and plan",
        ],
      },
      {
        heading: "Customer Communication and Chatbots",
        body: "Off-the-shelf chatbot platforms work for businesses with simple, predictable FAQ. They struggle with anything that requires your data, your software integrations, or a consistent brand voice.",
        bullets: [
          "Tidio — popular for e-commerce and small service sites, free tier available, paid from $29/month",
          "Intercom — strong for SaaS and larger teams, expensive for SMB ($74+/month)",
          "Crisp — good value, $25–$95/month, decent AI features",
          "Custom AI chatbot — $1,500–$3,500 one-time, trained on your actual content and connected to your systems",
          "Best fit for custom: trades, clinics, service businesses with non-standard workflows",
        ],
      },
      {
        heading: "Workflow Automation",
        body: "These tools connect your apps and automate repetitive steps — send a confirmation when a form is submitted, add a lead to your CRM, notify your team in Slack. They're not AI in the \"thinking\" sense but handle a huge share of automation needs.",
        bullets: [
          "Zapier — most integrations, easiest to use, $20–$69/month for common use cases",
          "Make (formerly Integromat) — more powerful, steeper learning curve, $9–$29/month",
          "n8n — open-source, self-hostable, free if you run it yourself",
          "Custom AI workflow — worth it when logic is complex, data is sensitive, or you're hitting Zapier's limits",
        ],
      },
      {
        heading: "Where Custom Builds Fit",
        body: "Off-the-shelf tools cover most standard needs. Custom AI makes sense when your process doesn't fit a template, your data lives in a system that doesn't integrate well, or you need the tool to reflect your specific business logic — not a generic version of it.",
        bullets: [
          "Your workflow has conditional logic that Zapier can't express cleanly",
          "You need the AI to access proprietary data (job history, client notes, custom pricing)",
          "You want one coherent system instead of 5 disconnected tools",
          "You've outgrown a SaaS tool's limits and per-seat fees are adding up",
          "Starting price for custom work: $1,500 (Starter) to $3,500 (Business tier)",
        ],
      },
    ],
    packageId: "starter",
    ctaLabel: "Talk About Your Stack",
    keywords: ["best ai tools small business 2026", "ai tools canada small business", "small business automation tools", "ai software for small business", "ai tools comparison"],
    related: [
      { label: "How Much Does AI Automation Cost", href: "/resources/how-much-does-ai-automation-cost" },
      { label: "AI Automation Examples For Small Business", href: "/resources/ai-automation-examples-for-small-business" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Compare options", href: "/compare" },
    ],
    faqs: [
      {
        q: "Should I use off-the-shelf AI tools or build something custom?",
        a: "Start with off-the-shelf. If you're hitting the same limitation repeatedly — your data isn't there, the workflow doesn't fit, costs are climbing — that's when a custom build makes sense. Custom is not inherently better, just more specific.",
      },
      {
        q: "What AI tools are free for small businesses?",
        a: "ChatGPT has a free tier. Zapier's free plan supports 5 zaps. Tidio has a free chatbot tier. n8n is free to self-host. Most free tiers are enough to evaluate whether a category of tool helps you before paying.",
      },
      {
        q: "Do I need technical skills to use these tools?",
        a: "For the writing and communication tools, no. For workflow automation tools like Zapier or Make, some learning curve but no coding required. For custom builds, you don't need technical skills — that's what Handbuilt does.",
      },
      {
        q: "How do I know which AI tool is right for my business?",
        a: "Start with your most expensive recurring problem — the thing that costs the most staff time or loses you the most revenue. Find the tool that addresses that specifically. Resist buying a bundle of tools before you know what actually helps.",
      },
    ],
    schema: "Article",
    icon: "Sparkles",
  },
  {
    slug: "ai-automation-examples-for-small-business",
    eyebrow: "Resource",
    h1: "AI Automation Examples for Small Businesses",
    title: "AI Automation Examples for Small Businesses | Handbuilt",
    description: "Concrete AI automation examples by business type — trades, clinics, cleaning companies, retailers, and more. Real use cases, not hypotheticals.",
    answer: "AI automation for small businesses works best on high-volume, repetitive tasks with predictable inputs. The most common implementations are lead capture, appointment booking, follow-up sequences, intake forms, estimate generation, and FAQ responses. These run 24/7 without staff time once built.",
    sections: [
      {
        heading: "Trades and Home Services",
        body: "Plumbers, electricians, HVAC companies, and contractors deal with high inbound volume, after-hours calls, and repetitive quoting. Automation handles the first layer so the owner isn't the bottleneck.",
        bullets: [
          "AI intake form that captures job type, address, and urgency — routes emergency requests immediately",
          "Chatbot that answers \"how much does X cost?\" with honest ranges and books an estimate",
          "Automated follow-up SMS after a quote is sent (\"Still interested? Here's how to book\")",
          "After-hours lead capture that notifies the owner via text and auto-replies to the customer",
          "Job summary emails generated from field notes — saves 15–30 min per job on admin",
        ],
      },
      {
        heading: "Dental and Medical Clinics",
        body: "Clinics spend significant staff time on appointment scheduling, insurance questions, and patient reminders. Much of this is automatable without replacing the clinical relationship.",
        bullets: [
          "AI chatbot for booking new patient appointments and answering insurance FAQ",
          "Automated appointment reminders via SMS with confirm/cancel links",
          "Intake form that pre-collects health history before the first visit",
          "After-hours FAQ bot that captures after-hours requests for morning follow-up",
          "Review request automation sent 48 hours post-appointment",
        ],
      },
      {
        heading: "Cleaning and Property Services",
        body: "Cleaning businesses run on quotes and scheduling. AI can handle most of the quoting conversation and keep the calendar full without a human doing each booking manually.",
        bullets: [
          "AI quote calculator on the website — inputs square footage, service type, frequency → returns estimate",
          "Chatbot that qualifies leads (size, location, one-time vs. recurring) before human follow-up",
          "Automated onboarding sequence for new clients (what to expect, day-of instructions)",
          "Rebooking reminders for one-time clients after 4–8 weeks",
          "Feedback form sent after each clean, with escalation if rating is below threshold",
        ],
      },
      {
        heading: "Retail, Professional Services, and Others",
        body: "Beyond trades and clinics, automation applies across most service categories. The pattern is the same: identify the task your team does more than 20 times a week on autopilot, and evaluate whether AI can handle it.",
        bullets: [
          "Accountant / bookkeeper: AI intake for new client onboarding, document checklist emails",
          "Lawyer / notary: Initial inquiry chatbot that captures matter type and conflict-check info",
          "Restaurant / catering: AI catering inquiry form with auto-pricing by headcount",
          "Real estate agent: Listing inquiry chatbot that qualifies buyers before showing requests",
          "Gym / fitness studio: AI waitlist and class booking with automated drop-in reminders",
          "e-commerce: Order status chatbot that queries your Shopify store without staff involvement",
          "Event venue: AI availability checker and inquiry-to-quote automation",
          "Pet services (groomer, vet, boarding): Booking bot with breed/service routing logic",
        ],
      },
    ],
    packageId: "business",
    ctaLabel: "See What Fits Your Business",
    keywords: ["ai automation examples small business", "small business ai use cases", "ai automation ideas", "business automation examples canada", "ai for small business examples"],
    related: [
      { label: "Use cases", href: "/use-cases" },
      { label: "Plumber AI Automation", href: "/industries/plumber-ai-automation" },
      { label: "Cleaning Business AI Automation", href: "/industries/cleaning-business-ai-automation" },
      { label: "How Much Does AI Automation Cost", href: "/resources/how-much-does-ai-automation-cost" },
    ],
    faqs: [
      {
        q: "What's the easiest AI automation to start with?",
        a: "A website chatbot or AI intake form is typically the fastest to deploy and clearest to measure. It captures leads you'd otherwise miss and gives your team structured information instead of a voicemail. Most Starter projects are live in 1–2 weeks.",
      },
      {
        q: "Do these automations require ongoing maintenance?",
        a: "Some tuning is normal in the first 30–60 days as you see real customer questions. After that, most automations run with minimal changes unless your services or pricing change. A $99/month care plan covers updates and monitoring if you want that handled.",
      },
      {
        q: "Can I automate one thing first and expand later?",
        a: "Yes, and that's often the right approach. Start with the highest-volume pain point. Once you see it working, it's straightforward to layer on additional automations that connect to the same system.",
      },
      {
        q: "Will my customers accept talking to an AI?",
        a: "For practical tasks — booking, getting a price range, checking hours — most customers don't object to AI, especially if it responds quickly and accurately. The key is building it to be genuinely helpful, not just deflective. A bot that actually answers the question earns more trust than a phone that rings out.",
      },
    ],
    schema: "Article",
    icon: "Bot",
  },
{
  slug: "ai-receptionist-cost",
  icon: "Receipt",
  eyebrow: "Resource",
  h1: "How Much Does an AI Receptionist Cost?",
  title: "How Much Does an AI Receptionist Cost?",
  description: "Honest breakdown of AI receptionist pricing in Canada: one-time build fees, monthly SaaS tools, answering services, and what drives the difference.",
  answer: "A custom-built AI receptionist from a done-for-you studio like Handbuilt AI typically costs $1,500–$3,500 CAD as a one-time build fee — no monthly platform licence. Monthly SaaS AI receptionist tools run $50–$300/month. Human receptionists or answering services cost $800–$2,000/month. Ongoing LLM API usage for a small business is usually $5–$50/month.",
  sections: [
    {
      heading: "Three Ways to Get an AI Receptionist",
      body: "There are three main options, and the long-term costs look very different.",
      bullets: [
        "Custom build (e.g. Handbuilt AI): $1,500–$3,500 CAD one-time. A trained AI voice or chat agent built specifically for your business — your hours, services, and tone. No monthly platform fee beyond LLM API usage.",
        "SaaS receptionist platforms: $50–$300/month ongoing. Off-the-shelf tools you configure yourself. Lower upfront but generic, and setup is on you.",
        "Human receptionist or answering service: $800–$2,000+/month. Best judgment, highest cost, limited after-hours coverage unless you pay significantly more."
      ]
    },
    {
      heading: "What Drives the Build Price?",
      body: "For a custom-built AI receptionist, price depends on how many scenarios it needs to handle (FAQs, booking, quoting, emergency routing), whether it connects to your calendar or CRM, and whether it handles phone voice, chat, or both. A straightforward chat receptionist for a single-trade contractor typically lands around $1,500. A phone-and-chat system with live calendar booking and lead logging runs closer to $2,000–$2,500."
    },
    {
      heading: "Ongoing Costs After Build",
      body: "Once built, the main recurring cost is LLM API usage — what the underlying AI model charges per conversation. For a local service business handling 50–200 AI interactions per month, this is typically $5–$50/month. Handbuilt also offers an optional Care Plan at $99/month CAD for monitoring, prompt updates, and priority support."
    },
    {
      heading: "Best For / Not Best For",
      body: "A custom-built AI receptionist fits best when you regularly miss after-hours calls, answer the same questions repeatedly, or want 24/7 first-contact coverage without hiring. It is not the right fit for businesses with very low call volume (under 20 calls/month), where every call requires nuanced human judgment, or where sensitive complaints are the norm.",
    }
  ],
  packageId: "starter",
  ctaLabel: "Get a quote",
  keywords: ["ai receptionist cost", "ai receptionist price canada", "how much does an ai receptionist cost", "ai phone answering cost", "virtual receptionist cost canada"],
  related: [
    { label: "Is an AI Receptionist Worth It?", href: "/resources/is-ai-receptionist-worth-it" },
    { label: "AI Receptionist vs Human Receptionist", href: "/compare/ai-receptionist-vs-human-receptionist" },
    { label: "AI Receptionist vs Answering Service", href: "/compare/ai-receptionist-vs-answering-service" },
    { label: "AI Receptionist Pricing in Canada", href: "/compare/ai-receptionist-pricing-canada" },
    { label: "AI Receptionist Setup Service", href: "/services/ai-receptionist-setup" },
    { label: "Can AI Answer Business Phone Calls?", href: "/resources/can-ai-answer-business-phone-calls" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "Is there a monthly fee for a custom-built AI receptionist?",
      a: "No platform fee — you own the build. The only ongoing cost is LLM API usage ($5–$50/month typically) and the optional Care Plan at $99/month CAD if you want Handbuilt monitoring and updating it for you."
    },
    {
      q: "What's included in a $1,500 AI receptionist build?",
      a: "One AI worker trained on your FAQs, hours, services, and service area. It handles inbound inquiries, qualifies leads, and captures or routes contacts. Delivered live in roughly 5 business days."
    },
    {
      q: "Is a SaaS AI receptionist tool cheaper long-term?",
      a: "Often not. A $150/month SaaS tool costs $1,800/year — more than a custom build in year one, with less customization. The right pick depends on whether you want to configure it yourself or have it done properly for your business."
    },
    {
      q: "Do I pay per call?",
      a: "No per-call fee to Handbuilt. You pay LLM API costs directly at usage — typically small for local business call volumes. Handbuilt gives an honest estimate of expected API cost before you commit."
    },
    {
      q: "How does this compare to an answering service?",
      a: "Answering services typically charge $1–$3/minute or $200–$500/month for basic coverage. A custom-built AI receptionist has a one-time build cost and then very low ongoing usage — usually less than an answering service within the first year."
    }
  ],
  schema: "Article"
},
{
  slug: "is-ai-receptionist-worth-it",
  icon: "TrendingUp",
  eyebrow: "Resource",
  h1: "Is an AI Receptionist Worth It?",
  title: "Is an AI Receptionist Worth It?",
  description: "Honest ROI framing for Canadian service businesses: when an AI receptionist pays off, when it doesn't, and how to think about break-even without fake numbers.",
  answer: "An AI receptionist is worth it for most service businesses that regularly miss after-hours calls, repeat the same FAQ answers daily, or lose leads to faster-responding competitors. It's not worth it if call volume is very low. Break-even is typically reached by capturing one or two additional jobs per month that would otherwise have gone to voicemail.",
  pain: "You're missing calls while you're on a job, sleeping, or just busy — and you have no idea how many leads those missed calls represent.",
  sections: [
    {
      heading: "When It Pays Off",
      body: "An AI receptionist earns its keep when you are regularly unavailable to answer calls — during jobs, after hours, on weekends. It also delivers value when you spend significant time answering the same questions: pricing ranges, availability, service area, how to book. In these cases, the AI handles first contact 24/7, qualifies callers, and routes or books without your involvement."
    },
    {
      heading: "When It Doesn't Make Sense",
      body: "If you receive fewer than 20 inbound calls per month, or if almost every call requires your personal judgment to assess (complex custom quotes, sensitive situations, deep client relationship management), an AI receptionist adds less value. It's also not a fit if your customers expect and need to speak with a specific person — not a system."
    },
    {
      heading: "How to Think About Break-Even",
      body: "Consider a $1,500 build cost with $50/month ongoing. Think about what a single job is worth to your business — as a hypothetical, if your average job is $400–$800, capturing two or three additional jobs that would otherwise have gone to a missed call covers the build cost entirely. This is illustrative — your actual calculation depends on your average job value and how many calls you currently miss."
    },
    {
      heading: "Best For / Not Best For",
      body: "Here is a plain summary of who this fits and who it doesn't.",
      bullets: [
        "Best for: trades businesses, home services, contractors, clinics — anyone who gets calls while on-site and can't always answer in the moment.",
        "Not best for: very low-volume operations, businesses where every call is highly custom and complex, or where customers insist on speaking to the owner specifically."
      ]
    }
  ],
  packageId: "starter",
  ctaLabel: "Talk it through",
  keywords: ["is ai receptionist worth it", "ai receptionist roi", "ai receptionist small business", "virtual receptionist worth it canada"],
  related: [
    { label: "How Much Does an AI Receptionist Cost?", href: "/resources/ai-receptionist-cost" },
    { label: "AI Receptionist vs Human Receptionist", href: "/compare/ai-receptionist-vs-human-receptionist" },
    { label: "AI Receptionist vs Answering Service", href: "/compare/ai-receptionist-vs-answering-service" },
    { label: "Can AI Answer Business Phone Calls?", href: "/resources/can-ai-answer-business-phone-calls" },
    { label: "AI Receptionist Setup Service", href: "/services/ai-receptionist-setup" },
    { label: "AI Receptionist", href: "/ai-receptionist" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "What if I only get a few calls per week?",
      a: "At very low call volumes (under 20/month), the ROI is harder to justify. That said, if those few calls represent high-value jobs and you regularly miss them, even one saved call per month can recover the build cost quickly."
    },
    {
      q: "Will customers know they're talking to an AI?",
      a: "Depends on how it's built. A well-set-up AI receptionist can be transparent (\"Hi, I'm the AI assistant for XYZ Plumbing\") while still handling the call professionally. Most customers care more about getting a quick, helpful answer than who provides it."
    },
    {
      q: "What happens when the AI can't handle the call?",
      a: "It routes to you, takes a message, or books a callback — whichever you configure. The AI handles what it can; anything outside its scope goes to a human fallback. You define those boundaries during setup."
    },
    {
      q: "Is there a risk the AI gives wrong information?",
      a: "The AI is trained on the information you provide — your services, pricing ranges, hours, service area. It doesn't guess or make up answers; it sticks to what it's been given. Keeping that information current prevents wrong answers."
    },
    {
      q: "What's a realistic payback timeline?",
      a: "For most service businesses with consistent inbound call volume, the build cost is recovered within one to three months of operation — but this depends entirely on your average job value and actual missed-call rate. No invented numbers here — it's genuinely your calculation to make."
    }
  ],
  schema: "Article"
},
{
  slug: "can-ai-answer-business-phone-calls",
  icon: "PhoneCall",
  eyebrow: "Resource",
  h1: "Can AI Answer Business Phone Calls?",
  title: "Can AI Answer Business Phone Calls?",
  description: "Yes — AI voice agents can answer inbound business calls. Here's what they handle well, where their limits are, and how to set realistic expectations.",
  answer: "Yes — AI voice agents can answer inbound business phone calls, greet callers, handle common FAQs, qualify leads, capture contact details, and book appointments. They operate 24/7 with no hold time. Their practical limit: complex, emotional, or high-stakes calls should route to a human. For routine inbound call handling, AI is genuinely capable today.",
  sections: [
    {
      heading: "What AI Can Handle on a Business Call",
      body: "Modern AI voice agents can do more than most people expect.",
      bullets: [
        "Answer immediately — no hold music, no voicemail.",
        "Greet the caller with your business name and a natural opening.",
        "Answer FAQs: hours, service area, pricing ranges, availability.",
        "Qualify callers: what service do they need, where are they located, what's the timeline?",
        "Capture name, number, and job details for a callback.",
        "Book directly into your calendar if connected to a booking tool.",
        "Send a follow-up text with confirmation or next steps."
      ]
    },
    {
      heading: "Where AI Falls Short on Phone Calls",
      body: "AI voice agents are not a replacement for human judgment in every scenario. They struggle with highly complex or custom requests that require real-time problem-solving, emotionally charged conversations (complaints, disputes, emergencies), callers who refuse to engage with an automated system, and situations where trust depends on a real personal relationship. A good setup routes these to a human fallback automatically."
    },
    {
      heading: "How It Actually Works",
      body: "An AI voice agent uses a speech-to-text model to hear the caller, a language model to understand and respond, and text-to-speech to speak back. The conversation flows in real time. Call routing rules define what happens when the AI hits a limit — it can transfer, take a message, or book a callback. The full call can be logged and summarized automatically."
    },
    {
      heading: "Best For / Not Best For",
      body: "A straightforward summary of where AI phone answering makes sense.",
      bullets: [
        "Best for: service businesses with consistent inbound call volume, repetitive FAQ queries, and significant after-hours missed calls.",
        "Not best for: businesses where most calls are complex custom consultations, emotionally sensitive, or require owner-level judgment on every call."
      ]
    }
  ],
  packageId: "starter",
  ctaLabel: "See how it works",
  keywords: ["can ai answer phone calls", "ai answer business calls", "ai phone answering small business", "ai voice agent canada", "ai receptionist phone"],
  related: [
    { label: "How Much Does an AI Receptionist Cost?", href: "/resources/ai-receptionist-cost" },
    { label: "Is an AI Receptionist Worth It?", href: "/resources/is-ai-receptionist-worth-it" },
    { label: "AI Voice Agent", href: "/services/ai-voice-agent" },
    { label: "AI Receptionist Setup", href: "/services/ai-receptionist-setup" },
    { label: "AI Receptionist vs Answering Service", href: "/compare/ai-receptionist-vs-answering-service" },
    { label: "AI Receptionist", href: "/ai-receptionist" }
  ],
  faqs: [
    {
      q: "Is an AI voice agent the same as a traditional phone menu (IVR)?",
      a: "No — a traditional IVR presents a rigid menu (\"press 1 for sales\"). An AI voice agent holds a real conversation, understands natural language, and responds dynamically. Callers speak normally instead of pressing numbers."
    },
    {
      q: "Can the AI call back missed calls automatically?",
      a: "Yes — if configured. An AI agent can be set up to call back missed calls within minutes, introduce itself as the business's AI assistant, gather information, and route to a human or book a callback."
    },
    {
      q: "Will it sound robotic?",
      a: "Modern AI voice models sound natural for most business purposes — not perfect, but clearly intelligible and professional. Setting honest expectations with callers (\"Hi, I'm the AI assistant for...\") works better than pretending otherwise."
    },
    {
      q: "What languages can it handle?",
      a: "English reliably. Some platforms support French and Spanish with reasonable quality. For multilingual businesses in Canada, this is worth discussing before build — it's possible but requires setup and testing per language."
    },
    {
      q: "Can it handle emergency calls?",
      a: "It can detect emergency intent (e.g. \"I have a gas leak\") and immediately transfer to a live person. It should never be the last resort for a true emergency — always configure a clear escalation path and tell callers at the start that emergencies transfer immediately."
    }
  ],
  schema: "Article"
},
{
  slug: "can-ai-book-appointments",
  icon: "CalendarCheck",
  eyebrow: "Resource",
  h1: "Can AI Book Appointments?",
  title: "Can AI Book Appointments?",
  description: "Yes — AI booking assistants check availability, offer slots, confirm by text or email, and handle reminders automatically. Here's how it works and where the limits are.",
  answer: "Yes — AI booking assistants can check real-time calendar availability, offer open time slots, confirm bookings via text or email, and send automatic reminders. They handle reschedules and cancellations without human involvement. They integrate with Google Calendar, Calendly, and most booking tools. Their limit: they can't negotiate complex scheduling conflicts or resolve disputes.",
  sections: [
    {
      heading: "How AI Appointment Booking Works",
      body: "From the customer's side, the flow is simple. They message, text, or speak to your AI agent — through website chat, SMS, or phone. The AI checks your live calendar, offers available slots that match the request, confirms the booking, and sends a confirmation. Reschedules run through the same flow. No phone tag, no email chains, no manual calendar checking."
    },
    {
      heading: "Calendar and Booking Tool Integrations",
      body: "AI booking agents typically connect to Google Calendar, Outlook Calendar, Calendly, Acuity Scheduling, or trade-specific tools like Jobber. The integration reads your real availability, respects buffers and blocked times, and writes confirmed bookings directly into your calendar. You see everything in your normal calendar — no separate dashboard to manage."
    },
    {
      heading: "What It Can't Do",
      body: "There are real limits worth naming upfront.",
      bullets: [
        "Negotiate or reason about complex overlapping bookings that require human judgment.",
        "Handle booking disputes with an unhappy customer without a fallback to a human.",
        "Manage multiple team members' calendars without additional setup and logic.",
        "Guarantee a specific person handles the job unless that logic is explicitly built in."
      ]
    },
    {
      heading: "Best For / Not Best For",
      body: "A quick guide to whether AI booking is the right fit for your business.",
      bullets: [
        "Best for: service businesses with predictable appointment slots — contractors, cleaners, clinics, consultants, salons.",
        "Not best for: highly variable or custom scheduling where each booking requires owner review before confirmation."
      ]
    }
  ],
  packageId: "starter",
  ctaLabel: "Get this built",
  keywords: ["can ai book appointments", "ai appointment booking", "ai booking assistant small business", "automated appointment scheduling canada", "ai calendar booking"],
  related: [
    { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
    { label: "Can AI Answer Business Phone Calls?", href: "/resources/can-ai-answer-business-phone-calls" },
    { label: "How Much Does an AI Receptionist Cost?", href: "/resources/ai-receptionist-cost" },
    { label: "What Can AI Automate for a Small Business?", href: "/resources/what-can-ai-automate-small-business" },
    { label: "AI Receptionist", href: "/ai-receptionist" },
    { label: "Get Started", href: "/create" }
  ],
  faqs: [
    {
      q: "Can AI send appointment reminders automatically?",
      a: "Yes — reminders are a core part of AI booking. You can set them at 24 hours, 1 hour, and day-of. Messages can include job details, address, and a reschedule link if the customer needs to change."
    },
    {
      q: "What if the customer wants to reschedule?",
      a: "A well-built AI booking agent handles reschedules through the same flow — checks your updated availability, offers new slots, updates the calendar, and sends a revised confirmation to both sides."
    },
    {
      q: "Do I need to use a specific calendar app?",
      a: "Google Calendar and Outlook are most common. Calendly, Acuity, Jobber, and others are typically connectable too. Handbuilt confirms what works with your existing setup before building."
    },
    {
      q: "Can it book multiple service types with different durations?",
      a: "Yes — you define service types and their time blocks. The AI offers slots that fit the right duration for each service. A standard inspection is 1 hour, a deep clean is 3 hours — the AI knows which is which and books accordingly."
    },
    {
      q: "Will customers find it frustrating to book through AI?",
      a: "Most people find it faster than waiting on hold or trading emails. The experience depends on how the agent is built — a clunky FAQ bot frustrates; a well-trained booking agent that asks two questions and confirms a slot is smooth. Setup quality matters."
    }
  ],
  schema: "Article"
},
{
  slug: "ai-lead-follow-up-guide",
  icon: "Magnet",
  eyebrow: "Resource",
  h1: "AI Lead Follow-Up: A Small Business Guide",
  title: "AI Lead Follow-Up: A Small Business Guide",
  description: "How AI follow-up agents chase quiet leads by SMS and email, a 5-step playbook for small service businesses, and honest cost ranges to set expectations.",
  answer: "AI lead follow-up agents automatically contact new leads by SMS or email within minutes of an inquiry, then send scheduled follow-ups until they get a clear yes or no. For service businesses, fast first response is one of the highest-ROI automations available — the business that replies first usually wins the job, regardless of price.",
  pain: "You send quotes or get website inquiries, and then life gets busy. Three days later you remember to follow up — but the lead already hired someone else.",
  sections: [
    {
      heading: "Why Speed-to-Lead Matters",
      body: "When a homeowner needs a plumber, roofer, or cleaner, they often contact two or three businesses at once. The first one to respond — even with a simple acknowledgment — typically gets the job. An AI follow-up agent closes that gap by sending a personalized first reply within minutes of the inquiry, before you've even seen the notification."
    },
    {
      heading: "What an AI Follow-Up Agent Does",
      body: "The agent handles the repetitive first-contact work so you can focus on doing the work.",
      bullets: [
        "Sends an immediate acknowledgment when a lead comes in — form fill, missed call, or website chat.",
        "Asks one or two qualifying questions to gather details you'd want anyway.",
        "Follows up at set intervals (e.g. day 1, day 3, day 7) if there's no response.",
        "Stops automatically the moment the lead replies, books, or says no.",
        "Logs everything to your CRM or inbox so you have a clear record."
      ]
    },
    {
      heading: "A Simple 5-Step Playbook",
      body: "This works for most small service businesses without complex CRM setups.",
      bullets: [
        "1. Connect your lead source (website form, Google Business inquiry, missed call trigger) to the AI agent.",
        "2. Write your first message: short, personal, low-pressure — \"Hi [name], thanks for reaching out about [service]. What can I help you with?\"",
        "3. Set your follow-up schedule: Day 1 (immediate), Day 2 (gentle check-in), Day 5 (final follow-up before close).",
        "4. Define the stop condition: the agent stops messaging the moment the lead responds — yes, no, or reschedule.",
        "5. Review the agent's log weekly to spot patterns — which message gets replies, which leads go cold consistently."
      ]
    },
    {
      heading: "What It Costs",
      body: "A done-for-you AI lead follow-up agent from Handbuilt starts at $1,500 CAD as part of the AI Starter System. Combined with reception, booking, or CRM automations, it typically sits in the AI Business System at $3,500–$7,500 CAD. Ongoing LLM API costs for follow-up messaging are typically $5–$30/month for most small businesses."
    }
  ],
  packageId: "starter",
  ctaLabel: "Get this built",
  keywords: ["ai lead follow up", "automated lead follow up small business", "ai follow up agent", "lead follow up automation", "ai sms follow up canada"],
  related: [
    { label: "AI Lead Follow-Up Agent", href: "/ai-lead-follow-up-agent" },
    { label: "AI SMS Automation", href: "/services/ai-sms-automation" },
    { label: "AI Email Automation", href: "/services/ai-email-automation" },
    { label: "What Can AI Automate for a Small Business?", href: "/resources/what-can-ai-automate-small-business" },
    { label: "Hiring vs AI Automation", href: "/compare/hiring-vs-ai-automation" },
    { label: "Get Started", href: "/create" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "Will customers find automated follow-ups annoying?",
      a: "Done well, no — they find them helpful. The key is spacing and tone. One message a day for three days, stopping on reply, is normal business follow-up. Bombarding someone with three messages in one day is spam. Tone and timing matter."
    },
    {
      q: "Can it follow up from a missed call, not just a form fill?",
      a: "Yes — if configured. A missed call triggers an immediate SMS: \"Hi, I missed your call — I'm [Business Name]'s AI assistant. Can I help you book or answer a quick question?\" This recaptures calls you'd otherwise lose permanently."
    },
    {
      q: "What if the lead says they're not interested?",
      a: "The agent stops immediately and logs it as closed. No further messages. You can optionally configure a re-engagement sequence months later, but that's optional and your call."
    },
    {
      q: "Does it integrate with my CRM?",
      a: "Depends on your CRM. Common integrations include HubSpot, Pipedrive, Jobber, and simpler tools like Airtable or Notion. Handbuilt checks what you're already using before building."
    },
    {
      q: "Is this different from an email marketing campaign?",
      a: "Yes — this is triggered one-to-one follow-up, not a broadcast to your whole list. It fires because a specific person made a specific inquiry, and it stops when they respond. Email marketing is for your whole audience. This is for individual live leads."
    }
  ],
  schema: "Article"
},
{
  slug: "what-can-ai-automate-small-business",
  icon: "Sparkles",
  eyebrow: "Resource",
  h1: "What Can AI Automate for a Small Business?",
  title: "What Can AI Automate for a Small Business?",
  description: "Plain-language overview of what small businesses can automate with AI: calls, bookings, follow-ups, invoices, reviews, and what is genuinely not a fit.",
  answer: "Small businesses can automate inbound calls, appointment booking, quote requests, lead follow-up, invoice reminders, review requests, customer FAQ replies, and routine data entry — without hiring extra staff. AI works best on repetitive, high-volume tasks with clear rules. Complex judgment, sensitive conversations, and relationship-dependent work still need a human.",
  sections: [
    {
      heading: "What AI Can Automate",
      body: "These automations work reliably for small businesses right now.",
      bullets: [
        "Inbound calls and messages — answer, qualify, route, or book without you picking up.",
        "Appointment booking — check availability, offer slots, confirm, and send reminders.",
        "Quote requests — collect job details, generate a preliminary estimate, follow up automatically.",
        "Lead follow-up — SMS or email sequences that chase quiet leads until you get a yes or no.",
        "Invoice payment reminders — escalating messages that stop when payment is received.",
        "Review requests — send a review link automatically after a completed job.",
        "Customer FAQ replies — website chat or SMS that answers your 10 most-asked questions.",
        "Routine data entry — pull form submissions into a spreadsheet, CRM, or job management tool."
      ]
    },
    {
      heading: "What AI Handles Poorly",
      body: "Equally important: where not to lean on AI.",
      bullets: [
        "Complex custom quotes that require a site visit or professional judgment.",
        "Emotionally sensitive conversations — complaints, disputes, or crisis situations.",
        "Tasks that require relationship memory across many interactions without structured CRM context.",
        "Creative work that needs genuine taste or perspective.",
        "Legal, financial, or medical decisions — never delegate these to AI without qualified human oversight."
      ]
    },
    {
      heading: "How to Pick Your First Automation",
      body: "Start with your biggest bottleneck. Ask: what task do I repeat most often that follows a predictable pattern? Common first picks for service businesses are missed call recovery (highest impact, fastest to build), lead follow-up (often the biggest revenue leak), or appointment reminders (easiest to justify to yourself). Don't automate everything at once — one AI worker proven and running is better than three half-built tools."
    },
    {
      heading: "What It Costs",
      body: "A single AI automation starts at $1,500 CAD as the AI Starter System. A connected system — reception, booking, and follow-up working together — typically runs $3,500–$7,500 as the AI Business System. Custom apps with deeper integrations start from $10,000. Ongoing LLM API usage is typically $5–$50/month for most small businesses."
    }
  ],
  keywords: ["what can ai automate small business", "ai automation for small business", "business tasks ai can automate", "ai workflow automation small business", "automate small business canada"],
  related: [
    { label: "AI Automation Examples for Small Business", href: "/resources/ai-automation-examples-for-small-business" },
    { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" },
    { label: "AI Lead Follow-Up Guide", href: "/resources/ai-lead-follow-up-guide" },
    { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
    { label: "AI Automation Agency", href: "/ai-automation-agency" },
    { label: "How to Automate Invoice Reminders", href: "/how-to/automate-invoice-reminders" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "Do I need technical knowledge to use AI automation?",
      a: "Not if it's done for you. Handbuilt builds and hands over a working AI system — you interact with the result (calendar entries, notifications, logs), not the underlying technology. The technical side is handled entirely in the build."
    },
    {
      q: "Will AI automation replace my staff?",
      a: "It handles repetitive first-contact work so your team can focus on higher-value tasks. For most small businesses, the first AI workers complement existing staff rather than replacing them — handling after-hours coverage and admin that wasn't getting done anyway."
    },
    {
      q: "What's a realistic timeline from decision to live automation?",
      a: "A single AI worker typically goes live in 5 business days. A multi-worker system takes 2–3 weeks. Custom apps take 4–8 weeks. Actual timeline depends on how quickly you can provide the information needed to train the AI."
    },
    {
      q: "Can AI automation work for my specific trade?",
      a: "Almost certainly — call answering, booking, quote collection, and follow-up are relevant to plumbers, HVAC techs, electricians, cleaners, contractors, and most local service businesses. The specifics (your services, prices, service area, booking rules) are built in during setup."
    },
    {
      q: "What if the automation breaks or gives wrong information?",
      a: "The optional Care Plan at $99/month includes monitoring and updates. AI systems built on fixed, defined information don't drift — they give wrong answers only if the source information is wrong. Keeping your service and pricing info current prevents this."
    },
    {
      q: "Is this just a chatbot?",
      a: "A chatbot is one limited tool. A properly built AI system combines call handling, chat, booking, follow-up, and CRM logging into a connected flow. Calling it a chatbot is like calling a phone system a speakerphone."
    }
  ],
  schema: "Article"
}
];

export function getResource(slug: string): LandingContent | undefined {
  return resources.find((r) => r.slug === slug);
}
