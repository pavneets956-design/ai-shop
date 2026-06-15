import type { LandingContent } from "./landing";

export const resources: LandingContent[] = [
  {
    slug: "how-much-does-ai-automation-cost",
    eyebrow: "Resource",
    h1: "How Much Does AI Automation Cost?",
    title: "How Much Does AI Automation Cost? | Handbuilt",
    description: "Real CAD price ranges for AI automation in 2026 — what drives cost, what you get at each tier, and when to build vs. buy.",
    answer: "For small businesses in Canada, AI automation projects typically run $1,000–$7,500+ CAD depending on complexity. A single-tool setup (chatbot, intake form, basic workflow) starts around $1,000. A full business system with custom integrations runs $3,500–$7,500. Ongoing support plans add $250/month. These are build-once costs — not per-seat SaaS fees.",
    sections: [
      {
        heading: "Price Ranges by Project Type",
        body: "Most small business AI projects fall into three tiers. The tier is determined by how many systems need to connect, whether you need custom logic, and how much human oversight the workflow requires.",
        bullets: [
          "Starter ($1,000 flat): One tool — AI intake form, chatbot on your website, or a single automated workflow. Works well for leads, FAQs, or basic scheduling.",
          "Business ($2,500–$5,000, typically $3,500): Multi-step system — e.g. AI receptionist + CRM sync + follow-up emails. Includes integrations with your existing tools.",
          "Custom (from $7,500): Industry-specific builds, complex data pipelines, or tools that replace a staff function entirely.",
          "Care Plan ($250/month): Ongoing updates, prompt tuning, monitoring, and priority support after launch.",
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
          "Custom AI build: $1,000–$7,500 one-time, then $0–$250/month maintenance",
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
        a: "Not necessarily. The build cost is one-time. You'll pay API fees (usually small) and optionally a $250/month care plan if you want ongoing updates and support. There's no forced subscription.",
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
        body: "Setup cost for an AI receptionist ranges from $1,000 (basic website chatbot) to $3,500–$5,000 for a full system with calendar integration, CRM sync, and SMS capability. Most small businesses in Canada land in the $1,000–$3,500 range. Ongoing costs are minimal — LLM API fees of $5–$30/month and an optional $250/month support plan.",
        bullets: [
          "Basic chatbot (website only): $1,000",
          "Full receptionist with calendar + CRM: $2,500–$3,500",
          "Phone-based AI receptionist: $3,500–$5,000+ (requires voice integration)",
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
          "Custom AI chatbot — $1,000–$3,500 one-time, trained on your actual content and connected to your systems",
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
          "Starting price for custom work: $1,000 (Starter) to $3,500 (Business tier)",
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
        a: "Some tuning is normal in the first 30–60 days as you see real customer questions. After that, most automations run with minimal changes unless your services or pricing change. A $250/month care plan covers updates and monitoring if you want that handled.",
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
];

export function getResource(slug: string): LandingContent | undefined {
  return resources.find((r) => r.slug === slug);
}
