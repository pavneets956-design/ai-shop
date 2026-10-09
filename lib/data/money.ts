import type { LandingContent } from "./landing";
import { webDesignService } from "./studioServices";
import {
  phonePlan,
  PHONE_PRICE_LABEL,
  PHONE_PRICE_SENTENCE,
  PHONE_SCOPE_SENTENCE,
  PHONE_MONTHLY_SENTENCE,
  PHONE_EXCLUSIONS_SENTENCE,
} from "./packages";

export const moneyPages: LandingContent[] = [
  webDesignService,
  {
    slug: "ai-automation-agency",
    eyebrow: "AI Build",
    h1: "AI Automation Agency for Small Businesses",
    title: "AI Automation Agency for Small Businesses | Handbuilt",
    description: "Handbuilt is a solo AI studio in Surrey BC. We build custom AI tools and automations for Canadian small businesses — you talk to the builder, not a sales rep.",
    answer: "Handbuilt is a one-person AI automation studio that builds custom AI tools directly for small businesses. No account managers, no offshore handoffs — Pavneet builds it, you own it. Packages start at $1,500 CAD. Based in Surrey BC, serving Canada and remote clients worldwide.",
    pain: "Most small businesses know AI could save them hours every week. The problem isn't the technology — it's finding someone who'll actually build it for your specific workflow instead of selling you a generic subscription that half-fits.",
    scenario: "Say a plumbing company fields the same five questions all week by phone and email — easily 10–12 hours of interruptions, plus the after-hours calls that go to voicemail and never call back. An AI receptionist and quote intake system could claw most of that time back and stop the missed-call jobs from leaking to whoever picks up first. The exact lift depends on call volume and how many of those callers would have waited for a callback, but missed-call recovery and repetitive-FAQ handling are usually where the fastest payback is.",
    steps: [
      "Discovery call — 30 minutes to map your biggest time drains and figure out which AI tool has the fastest payback.",
      "Scoped proposal — A flat-price proposal with exactly what gets built, what it connects to, and what the outcome looks like.",
      "Build & test — Pavneet builds it, connects it to your real data, and tests it against your actual workflows — not a demo environment.",
      "Handoff & support — You get the working system, documentation, and a Care Plan option ($99/mo) if you want ongoing updates and monitoring.",
    ],
    gets: [
      "A custom AI tool built around your exact workflow — not a template",
      "You own the code and the system outright",
      "One person accountable for everything, start to finish",
      "Flat pricing with no surprise invoices",
      "Canadian business, Canadian pricing in CAD",
      "Integration with the tools you already use (CRMs, forms, booking systems)",
    ],
    sections: [
      {
        heading: "What an AI automation studio actually does",
        body: "An AI automation studio is not a software subscription. It's a build engagement: you bring your problem, we build something that solves it. For a small business, that might mean an AI that answers website inquiries and books appointments, a system that qualifies leads before they hit your inbox, or an internal tool that turns 3-hour admin tasks into a 10-minute review. The deliverable is a working system, not a login to someone else's platform.",
      },
      {
        heading: "Why solo studio beats big agency for small business",
        body: "A large agency will assign a project manager, a strategist, a developer, and a QA team — and charge accordingly. At Handbuilt, you talk to the person writing the code from day one. That means faster decisions, no telephone-game misunderstandings, and a builder who actually cares whether the thing works after launch. The trade-off is that we take on fewer projects at once. That's intentional.",
      },
      {
        heading: "Who we work with",
        body: "Trades and home services (plumbers, electricians, HVAC, cleaning), local professional services (clinics, real estate, law offices), and small product or e-commerce businesses looking to stop doing repetitive work by hand. If you have a process that repeats more than a few times a day, there's probably an AI approach that pays for itself inside 90 days.",
      },
    ],
    packageId: "business",
    ctaLabel: "Request a Free AI Opportunity Review",
    keywords: ["AI automation agency Canada", "small business AI tools", "AI automation Surrey BC", "custom AI for small business", "AI workflow automation Canada"],
    related: [
      { label: "AI Business System", href: "/ai-business-system" },
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Is Handbuilt a big agency or a freelancer?",
        a: "Neither, exactly. It's a solo studio — one builder, Pavneet, doing the work. No subcontractors, no offshore team. That keeps quality consistent and communication fast.",
      },
      {
        q: "Do you work with businesses outside BC?",
        a: "Yes. Most work is done remotely. We serve clients across Canada and internationally. Time zone gaps are manageable with async communication.",
      },
      {
        q: "What if I don't know what I need — just that I'm wasting time?",
        a: "That's actually the most common starting point. Send a request describing the time drain and you'll get a reply by email. Part of the engagement is figuring out which AI approach has the fastest payback for your specific situation.",
      },
      {
        q: "What do projects cost?",
        a: "The Starter AI Setup is $1,500 CAD. A Business AI System (2–4 connected tools) runs $3,500–$7,500 CAD. Custom AI apps starts at $10,000 CAD. All prices are flat — no hourly billing.",
      },
    ],
    schema: "Service",
    icon: "Rocket",
  },
  {
    slug: "custom-ai-app-development",
    eyebrow: "AI Build",
    h1: "Custom AI App Development",
    title: "Custom AI App Development | Handbuilt",
    description: "Custom AI apps built from scratch starting at $10,000 CAD. MVPs, internal tools, and customer portals — you own the code, no SaaS lock-in.",
    answer: "Handbuilt builds custom AI-powered applications from scratch, starting at $10,000 CAD. That includes MVPs you want to validate, internal tools your team will actually use, and customer-facing portals. You own the source code and can take it anywhere. Built by one developer who stays accountable through launch and beyond.",
    pain: "You have an idea for an AI-powered tool — or a real internal problem that off-the-shelf software doesn't solve. But every agency quote comes back at $50K+ for a discovery phase alone, and no-code platforms hit a ceiling the moment you need something non-standard.",
    scenario: "Consider a property management company needing a tenant intake portal that answers lease questions, collects maintenance requests, and routes urgent issues to the right staff automatically. Off-the-shelf help desk tools don't fit — they're built for SaaS support teams, not property managers with a mix of routine requests and genuine emergencies. A custom AI portal scoped to that exact workflow could bring average response time from a few hours down to minutes per ticket, while keeping the human in the loop only for situations that actually need judgment.",
    steps: [
      "Requirements mapping — We define the core user flows, the AI's role in each one, and what integrations the app needs — before any code is written.",
      "Scoped MVP build — We build the smallest version that proves the idea works — fast feedback, real data, no wasted scope.",
      "Iteration & integration — Based on real use, we extend the app: more AI features, deeper integrations, UI refinements.",
      "Deployment & handoff — You get the full source code, deployment instructions, and documentation. Ongoing updates available on the AI Care Plan at $99/mo.",
    ],
    gets: [
      "Full source code ownership — no SaaS lock-in, ever",
      "AI built into the actual user flows, not bolted on as a widget",
      "A developer who understands both the business problem and the AI layer",
      "Flat project pricing starting at $10,000 CAD",
      "MVP-first approach so you validate before over-building",
      "Clean handoff with docs so your team can maintain it",
    ],
    sections: [
      {
        heading: "What's included in a custom AI app build",
        body: "A custom app engagement at Handbuilt covers product scoping, UI/UX design (functional, not just pretty), front-end and back-end development, AI model integration (LLM APIs, vector search, retrieval-augmented generation, or fine-tuned models depending on the use case), third-party API connections, and deployment to a production environment. You do not pay per seat, per API call beyond your own API keys, or per feature. The deliverable is software you own.",
      },
      {
        heading: "What we build",
        body: "Internal tools (staff dashboards, document processors, AI-assisted workflows), customer-facing portals (intake forms, AI chat with account context, booking systems with AI triage), MVPs for B2B SaaS ideas you want to validate before raising money or hiring a team, and specialized automation apps that don't fit any existing category. If it involves AI and it's a real app — not a chatbot widget — this is the right service.",
      },
      {
        heading: "Who this is for",
        body: `Business owners with a specific problem that existing software doesn't solve well, and founders with an AI product idea they want to validate without committing to a $100K+ build. Budget-wise, this is the right fit if you have $7,500–25,000 CAD to invest and want to own the outcome. If your need is simpler — a chatbot or an intake form — the Starter or Business packages are a better starting point; for calls, the AI Phone Receptionist is a separate ${PHONE_PRICE_LABEL} CAD offer.`,
      },
    ],
    packageId: "custom",
    ctaLabel: "Discuss Your App Idea",
    keywords: ["custom AI app development Canada", "AI software development small business", "build AI app Canada", "custom AI tool developer", "AI MVP development Canada"],
    related: [
      { label: "AI Automation Agency", href: "/ai-automation-agency" },
      { label: "Complete AI Business System", href: "/ai-business-system" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What's the minimum budget for a custom AI app?",
        a: "Custom AI app builds starts at $10,000 CAD. Projects with more integrations, larger user bases, or more complex AI requirements typically run $12,000–25,000 CAD. We scope a flat price before work begins.",
      },
      {
        q: "Do I own the code when it's done?",
        a: "Yes, completely. You receive the full source code and can host it, modify it, or hand it to another developer. There's no ongoing platform fee tied to your app existing.",
      },
      {
        q: "How long does a custom build take?",
        a: "An MVP with a focused scope typically takes 4–8 weeks. More complex apps with multiple integrations or multiple user roles take 8–16 weeks. Timeline is scoped with the proposal.",
      },
      {
        q: "Can you work with my existing tech stack?",
        a: "Usually yes. Most custom work is built in Next.js/TypeScript with a Supabase or Postgres backend, but the stack adapts to what you already have if there's a good reason to.",
      },
    ],
    schema: "Service",
    icon: "Boxes",
  },
  {
    slug: "ai-chatbot-development",
    eyebrow: "AI Build",
    h1: "Custom AI Chatbot Development",
    title: "Custom AI Chatbot Development | Vancouver & BC | Handbuilt",
    description: "Custom AI chatbot development for Vancouver and BC businesses from $1,500 CAD. Live in about 5 business days — trained on your services, your policies, your voice.",
    answer: "Handbuilt builds custom AI chatbots for small business websites and internal tools, starting at $1,500 CAD. Each chatbot is trained on your actual business content — your services, pricing, FAQs, and policies — so it answers like someone who knows your business, not like a generic customer service bot.",
    pain: "Generic chatbot platforms give you a template that says \"Hi! How can I help you today?\" and then either fails to answer or routes the visitor to a contact form anyway. Your customers leave. The tool adds no value. You turn it off after 60 days.",
    scenario: "Picture a dental clinic adding an AI chatbot trained on their services, insurance FAQ, booking process, and office policies. A well-trained chatbot on a clinic site can reasonably handle the majority of incoming chat inquiries without human intervention — the questions are predictable and the answers don't change often. After-hours questions that previously went unanswered until morning get handled on the spot. The exact self-serve rate depends on how much of your chat traffic is standard FAQ versus unusual requests.",
    steps: [
      "Content audit — We gather your services list, FAQs, pricing (if public), policies, and any common customer questions. This becomes the chatbot's training base.",
      "Build & train — We build the chatbot, train it on your content, and tune its responses to match your tone — direct, friendly, or professional depending on your brand.",
      "Website integration — We embed it on your site with a branded widget that fits your design. Connects to your booking tool or CRM if needed.",
      "Test & refine — You review a set of test conversations. We adjust tone, coverage gaps, and any answers that aren't quite right before going live.",
    ],
    gets: [
      "A chatbot trained on your specific business content",
      "After-hours coverage without after-hours staffing cost",
      "Seamless handoff to human or booking link when the bot reaches its limit",
      "Branded widget that matches your website design",
      "Plain English editing — update your chatbot's knowledge without technical help",
      "Flat price starting at $1,500 CAD, no per-conversation fees",
    ],
    sections: [
      {
        heading: "Custom chatbot vs. chatbot builder platform",
        body: "Platforms like Tidio, Intercom's Fin, or Drift's AI bots are fast to set up and fine for large companies with dedicated support teams. For a small business, they have three problems: monthly fees that stack up ($100–400/mo+), limited ability to train on your specific content without significant manual effort, and a one-size-fits-all answer style that doesn't sound like you. A Handbuilt chatbot is trained on your content specifically, priced as a flat build, and doesn't cost you a monthly platform fee to keep running.",
      },
      {
        heading: "What your chatbot can handle",
        body: "Service and pricing questions, appointment and booking inquiries (with a link or direct integration to your booking system), FAQ coverage (insurance, location, hours, policies), lead capture (name, email, what they need — routed to your CRM or inbox), and after-hours coverage so a visitor at 11pm gets useful information instead of silence. What it doesn't do: replace human judgment for complex or sensitive conversations. Those get flagged and handed to you.",
      },
      {
        heading: "Who this is for",
        body: "Local service businesses with websites that get traffic but low conversion — dental clinics, real estate agents, contractors, legal offices, clinics, home services. Also internal-use cases: small teams who want an AI that knows the employee handbook, product catalog, or internal policies without having to call someone to ask. The $1,500 Starter package is the right fit for most single-location businesses.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a Chatbot Quote",
    keywords: ["AI chatbot development Canada", "custom chatbot for small business", "website chatbot Surrey BC", "AI chatbot trained on my business", "chatbot development Canada"],
    related: [
      { label: "AI Receptionist Setup", href: "/ai-receptionist" },
      { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
      { label: "AI Lead Capture Form", href: "/services/ai-lead-capture-form" },
      { label: "AI Automation Agency", href: "/ai-automation-agency" },
    ],
    faqs: [
      {
        q: "How long does it take to build a custom AI chatbot?",
        a: "About 5 business days for a standard chatbot. Pavneet trains it on your business data, tests it against real customer questions, and installs it on your site.",
      },
      {
        q: "How is this different from just using ChatGPT on my website?",
        a: "ChatGPT doesn't know anything about your business unless you feed it that information carefully. A Handbuilt chatbot is built with your content embedded, your tone configured, and your specific use case in mind — plus it integrates with your site and tools, not just a generic chat interface.",
      },
      {
        q: "What if my information changes — new services, updated pricing?",
        a: "Updates are part of the AI Care Plan at $99/mo. If you're not on a care plan, updates are billed at a flat rate per update session. How often you need one depends on how much your prices, services or hours change.",
      },
      {
        q: "Will the chatbot ever give wrong answers?",
        a: "AI chatbots can make mistakes, especially for edge cases not covered in their training content. That's why we build in a fallback: anything the bot isn't confident about gets handed to a human or prompts the visitor to call/email. We tune this threshold during testing.",
      },
      {
        q: "Does the $1,500 price include ongoing hosting?",
        a: "The $1,500 Starter covers the build and first-month setup. Ongoing is either self-hosted (your own API keys, minimal cost) or covered under the $99/mo AI Care Plan, which includes hosting, monitoring, and updates.",
      },
    ],
    schema: "Service",
    icon: "MessagesSquare",
  },
  {
updatedAt: "2026-09-27",
secondaryCta: {
  "label": "Read the cost guide",
  "href": "/resources/ai-receptionist-cost"
},
    slug: "ai-receptionist",
    eyebrow: "AI Build",
    h1: "AI Receptionist for Small Businesses",
    title: "AI Receptionist for Small Businesses | Handbuilt AI",
    description: `AI phone receptionist for small businesses: ${PHONE_PRICE_LABEL} CAD launch pricing, ${phonePlan.includedMinutes} minutes included, tested human fallback. Request a setup review.`,
    answer: `An AI phone receptionist answers your line with approved information, takes the caller's details and reason for calling, and emails you a summary — with a tested route back to a person. ${PHONE_PRICE_SENTENCE}`,
    pain: "A missed enquiry needs a reliable next step. A natural-sounding answer is not enough if the details never reach you or a caller cannot ask for a person.",
    scenario: "Illustrative example: a trades business wants after-hours enquiries recorded for review. The agreed workflow asks about the job and service area, records a callback request and notifies the owner. It does not confirm availability or a price that the owner has not authorised.",
    steps: [
  "Map common questions, approved answers and services you do not provide.",
  "Confirm the channel, integration requirements and what needs a person.",
  "Build the agreed intake and notification flow with visible failure handling.",
  "Test ordinary requests, unclear answers, out-of-area work and requests for a person."
],
    gets: phonePlan.setupIncludes,
    sections: [
  {
    "heading": "What the price includes",
    "body": `${PHONE_SCOPE_SENTENCE}\n\n${PHONE_MONTHLY_SENTENCE}\n\n${PHONE_EXCLUSIONS_SENTENCE} Website or text intake is a different build with its own price.`
  },
  {
    "heading": "Make the handoff part of the design",
    "body": "Decide what happens when someone asks for a person, provides unclear information, raises an urgent issue or requests work outside the service area. The specification should identify who receives the request and which commitments the system is allowed to make.\n\nA calendar request is not a confirmed appointment unless an actual scheduling integration checks availability and completes confirmation. The Handbuilt request form itself does not book a call."
  },
  {
    "heading": "Test the enquiry, not just the greeting",
    "body": "Use representative scenarios and inspect the resulting record and notification. Include interruptions, a request for a human, incomplete contact details and an unavailable dependency. Define how the owner learns about a failure.\n\nPavneet built an AI phone receptionist for his own Ironwood Grounds business. The proof record documents that the AI was taken out of the call path in August 2026 while reliability was being evaluated. That is why the fallback deserves as much attention as the conversation."
  },
  {
    "heading": "When a simpler workflow is enough",
    "body": "If your main problem is a few web requests that need a callback, a clear form and reliable notification may be sufficient. If most calls require your personal judgement, consider human answering or a message-taking flow. Start with the actual missed work and your capacity to respond, rather than buying a system because it is called AI."
  }
],
    packageId: "phone",
    ctaLabel: "Request a receptionist review",
    keywords: ["AI receptionist local business Canada", "after hours answering service AI", "AI receptionist for contractors", "missed call AI chatbot", "automated receptionist small business BC", "ai answering service setup", "ai receptionist for small business", "ai phone answering service", "automated receptionist setup", "ai call answering business"],
    related: [
  {
    "label": "AI receptionist costs",
    "href": "/resources/ai-receptionist-cost"
  },
  {
    "label": "Is it worth it for your business?",
    "href": "/resources/is-ai-receptionist-worth-it"
  },
  {
    "label": "Phone or answering service?",
    "href": "/compare/ai-receptionist-vs-answering-service"
  },
  {
    "label": "AI receptionist in Surrey, BC",
    "href": "/locations/ai-receptionist-surrey-bc"
  },
  {
    "label": "Getting customers to find you",
    "href": "/services/ai-search-visibility"
  }
],
    faqs: [
  {
    "q": "How much does the AI phone receptionist cost?",
    "a": `${PHONE_PRICE_SENTENCE} It is a separate offer from the Starter build.`
  },
  {
    "q": "Can it book appointments?",
    "a": "Calendar booking is not part of the standard receptionist. It takes a callback request for you to confirm. Connecting a real scheduling system is quoted separately."
  },
  {
    "q": "Can I keep my current number?",
    "a": "That depends on your provider and routing options. We check the existing setup before promising forwarding, number transfer or a particular call flow."
  },
  {
    "q": "What happens when the AI cannot answer?",
    "a": "The implementation needs an agreed handoff, message-taking or fallback path. We define and test that path instead of expecting the system to improvise."
  }
],
    schema: "Service",
    icon: "PhoneCall",
  },
  {
    slug: "ai-business-system",
    eyebrow: "Services",
    h1: "Complete AI Business System",
    title: "Complete AI Business System | Handbuilt",
    description: "2–4 connected AI tools that run the repetitive parts of your business as one system. $3,500–$7,500 CAD. The flagship Handbuilt package.",
    answer: "The Handbuilt AI Business System connects 2–4 AI tools into one coherent system: inquiry handling, lead capture, appointment booking, CRM updates, and follow-up — all automated and talking to each other. Priced at $3,500–$7,500 CAD, it's built for small businesses ready to stop doing the same five tasks by hand every day.",
    pain: "You've added tools over the years — a CRM here, a booking plugin there, a form tool somewhere else. None of them talk to each other. Data entry happens twice. Leads fall through gaps between tools. You spend hours a week on tasks that should run themselves.",
    scenario: "Say a real estate agent runs three separate tools: a contact form, a CRM she updates manually, and a calendar she books by email. A connected AI Business System could automatically capture new leads from the website, qualify them, add them to the CRM with a lead score, and send a personalized follow-up — all before she sees the notification. Lead response time could drop from several hours to under 3 minutes. How many additional consultations that converts depends on lead volume and source quality, but faster response on real estate leads is consistently one of the highest-leverage changes a solo agent can make.",
    steps: [
      "Systems audit — We map every tool you use, every manual step in your workflow, and every place data gets entered more than once. This is where we find the highest-value automation targets.",
      "System design — We design 2–4 connected AI components — usually a customer-facing AI (receptionist or chatbot), a CRM automation layer, and a follow-up or admin tool — that work as one system.",
      "Build & integration — Each component is built and integrated with your existing tools. We test the end-to-end flow with real data before you see it.",
      "Handoff & training — You get a working system, a plain-English guide to what each part does, and the option to add the $99/mo AI Care Plan for ongoing updates and monitoring.",
    ],
    gets: [
      "2–4 AI components built to work together as a single system",
      "End-to-end automation from first contact to booked appointment or closed lead",
      "CRM and calendar integration so data flows without manual entry",
      "One builder accountable for the whole system, not a different vendor per tool",
      "Flat project price of $3,500–$7,500 CAD",
      "A system you own — not a subscription to someone else's platform",
    ],
    sections: [
      {
        heading: "What a typical system includes",
        body: "Most Business AI System builds include three layers: a customer-facing AI (website chatbot or AI receptionist that handles inquiries and captures leads), an automation layer (connects your forms, CRM, and calendar — auto-populates records, triggers follow-ups, routes by lead type), and an admin AI (answers internal questions, summarizes lead activity, prepares daily briefings). The exact combination depends on your business type. A dental clinic's system looks different from a real estate agent's — both are built from the same discovery session.",
      },
      {
        heading: "How the components talk to each other",
        body: "Each component in the system is connected via your existing tools (most commonly Google Workspace, Calendly, HubSpot, or a simple Supabase database if you don't have a CRM). When a lead fills out a form, the AI qualifies them, updates the CRM, books a time slot, and sends a confirmation — without any of that bouncing through your hands first. If a step requires your judgment (high-value opportunity, complaint, something unusual), the system flags it and routes it to you with full context already attached.",
      },
      {
        heading: "Why this is the flagship package",
        body: "Single AI tools are useful. A system of connected AI tools compounds. When your receptionist, your CRM automation, and your follow-up tool all know about the same lead and share the same data, the time savings are multiplicative — not additive. The trade-off is real either way: starting with one worker is cheaper and proves the idea on your own phone; starting at the system level costs more up front and skips a second setup later.",
      },
    ],
    packageId: "business",
    ctaLabel: "Design My Business System",
    keywords: ["AI business system for small business", "connected AI tools Canada", "small business automation system", "AI CRM automation Canada", "business process automation AI BC"],
    related: [
      { label: "AI Automation Agency", href: "/ai-automation-agency" },
      { label: "AI CRM Automation", href: "/services/ai-crm-automation" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What's the difference between this and the Starter package?",
        a: `The Starter AI Setup ($1,500) is a single focused tool — usually a chatbot or quote intake. (A phone receptionist on its own is the separate ${PHONE_PRICE_LABEL} CAD AI Phone Receptionist.) The Business AI System ($3,500–$7,500) connects 2–4 tools into one end-to-end workflow. The Starter is great for solving one problem. The System is for businesses ready to automate a whole workflow.`,
      },
      {
        q: "Do I need to replace my current tools?",
        a: "Usually not. The system is built to work with what you already have — your CRM, your calendar, your forms. If a tool is the source of the problem (e.g., no CRM at all), we'll recommend a simple one and build around it, but the goal is to improve your workflow, not force a stack change.",
      },
      {
        q: "How long does a system build take?",
        a: "Typically 4–6 weeks from the systems audit to launch. More complex builds with multiple integrations can take 6–8 weeks. Everything is scoped before work starts so there are no surprises.",
      },
      {
        q: "What happens after launch?",
        a: "You have a fully working system you own. The optional AI Care Plan at $99/mo covers monitoring, updates as your business changes, and a monthly check-in to make sure everything is still performing. Without a care plan, updates are available at a flat rate per session.",
      },
    ],
    schema: "Service",
    icon: "Layers",
  },
{
    slug: "done-for-you-ai-automation",
    eyebrow: "AI Service",
    h1: "Done-for-You AI Automation for Small Business",
    title: "Done-for-You AI Automation for Small Business",
    description: "Handbuilt builds and installs AI automation for small businesses. Fixed CAD pricing, one builder, no DIY hassle. Surrey BC, serving Canada and remote.",
    answer: "Handbuilt builds and installs custom AI automation directly into your small business — phones, CRM, scheduling, follow-ups. No DIY tools, no agency handoff. One builder does the work, you own the result. AI Business System packages start at $3,500 CAD with a flat price locked before work begins. Surrey BC, serving Canada and remote.",
    pain: "You’ve seen the AI demos. You know automation could save hours every week. But every tool needs setup, every setup needs integrations, and every integration breaks something else. You don’t have a developer on staff, and you don’t have 40 hours to learn a no-code platform. The tool itself is cheap — making it actually work inside your business is the hard part.",
    scenario: "Imagine a renovation company with a 3-person office. They spend two hours a day on quote follow-ups, appointment confirmations, and answering the same ten questions by phone. They tried a chatbot builder — it took a weekend and still couldn’t pull from their price list.\n\nIn this hypothetical scenario, Handbuilt would scope the three highest-impact automations, build them on the company’s real data, and hand over a system that runs without anyone logging into a new dashboard. The office team gets those two hours back. That’s the difference between advice and installation.",
    steps: [
      "Discovery call — Pavneet learns your workflows, tools, and where time is leaking. No pitch deck, no sales team.",
      "Scoped flat-price proposal — You get a fixed CAD price, a clear list of what gets built, and a timeline. No hourly billing, no scope creep.",
      "Build & test on your real data — Pavneet builds it, connects it to your actual CRM, calendar, and phone system, and tests it against real scenarios — not a demo environment.",
      "Handoff + optional Care Plan — You own the system outright. Training walkthrough included. Optional $99/mo Care Plan for ongoing tuning and support."
    ],
    gets: [
      "AI workers built around your actual business processes, not templates",
      "Connected to your existing tools — CRM, calendar, phone, email, whatever you already use",
      "Tested on your real data before handoff, not a demo dataset",
      "Fixed CAD pricing locked before any work begins",
      "One builder, one point of contact — no account managers, no offshore handoffs",
      "Full ownership — no vendor lock-in, no per-seat SaaS fees after delivery"
    ],
    sections: [
      {
        heading: "Why DIY AI Fails Most Small Businesses",
        body: "No-code platforms are great for demos. They fall apart in production. The gap between “look, it responds” and “it pulls from my price list, checks my calendar, and texts the customer back” is where most small businesses stall. That gap is integration, edge-case handling, and data formatting — unglamorous work that no YouTube tutorial covers. Done-for-you means you skip the gap entirely.",
        bullets: [
          "No-code tools require you to maintain the automations yourself — and debug them when they break",
          "Hiring a developer costs $80–$150/hr with no guaranteed outcome or fixed timeline",
          "Agencies layer in project managers and offshore teams that dilute accountability",
          "Handbuilt gives you one builder who does the work, a flat price, and a working system"
        ]
      },
      {
        heading: "What Actually Gets Automated",
        body: "Every engagement starts with which tasks eat the most time for the least value. Common automations Handbuilt installs:",
        bullets: [
          `Phone answering — an AI receptionist that takes caller details and emails you a summary (the separate ${PHONE_PRICE_LABEL} CAD AI Phone Receptionist)`,
          "Lead follow-up — SMS and email sequences that chase every inquiry until you get a yes or no",
          "Quote and estimate generation from intake forms",
          "Appointment scheduling and confirmation reminders",
          "Customer FAQ handling on your website via trained chatbot",
          "CRM data entry and pipeline updates from inbound messages"
        ]
      },
      {
        heading: "How Pricing Works — No Surprises",
        body: "Handbuilt uses fixed CAD pricing. You know the cost before work begins. AI Starter System: $1,500 CAD for one AI worker, live in about 5 business days. AI Business System: $3,500–$7,500 CAD for 2–4 workers, typically 2–3 weeks. Custom AI App: from $10,000 CAD for larger builds, 4–8 weeks. Every project includes a scoped proposal with the exact deliverables and price. No hourly billing. No change-order games."
      }
    ],
    packageId: "business" as const,
    ctaLabel: "Request a free AI opportunity review",
    keywords: [
      "done for you ai automation",
      "ai automation for small business",
      "custom ai automation canada",
      "small business ai setup",
      "ai automation agency surrey bc"
    ],
    related: [
      { label: "AI Business System", href: "/ai-business-system" },
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Custom AI Tool vs SaaS", href: "/compare/custom-ai-tool-vs-saas" }
    ],
    faqs: [
      {
        q: "How much does done-for-you AI automation cost?",
        a: "AI Starter System is $1,500 CAD for one AI worker. AI Business System runs $3,500–$7,500 CAD for 2–4 workers. Custom AI App starts at $10,000 CAD. You get a fixed price in your proposal before any work begins — no hourly billing."
      },
      {
        q: "What tools and platforms do you integrate with?",
        a: "Whatever you already use. Common integrations include Google Workspace, Outlook, Jobber, Housecall Pro, ServiceTitan, Square, QuickBooks, and most CRMs. If it has an API or accepts webhooks, it can likely be connected."
      },
      {
        q: "How long does it take to build?",
        a: "AI Starter System: roughly 5 business days. AI Business System: 2–3 weeks. Custom AI App: 4–8 weeks. Timeline is scoped in your proposal and depends on the number of integrations and workflows."
      },
      {
        q: "Do I need technical skills to use the finished system?",
        a: "No. The system runs on its own once installed. You get a training walkthrough covering how to check on it, adjust settings, and handle edge cases. If you want ongoing help, the $99/mo Care Plan covers that."
      },
      {
        q: "What’s the difference between this and using a no-code tool myself?",
        a: "You skip the learning curve, the integration debugging, and the maintenance. No-code tools are the raw materials — done-for-you means someone builds the house. The AI tool itself is cheap; the value is making it work correctly with your actual business data and systems."
      },
      {
        q: "Do I own the system when it’s done?",
        a: "Yes. Full ownership, no vendor lock-in, no recurring platform fees from Handbuilt. The system runs on your accounts and infrastructure. If you stop working with Handbuilt, everything keeps running."
      },
      {
        q: "What does the Care Plan include?",
        a: "From $99/mo CAD for a single AI worker, scaling with the size of the system. Covers hosting, uptime monitoring, usage tracking with cost alerts, and up to an hour of tweaks a month. It’s optional — many clients run their systems independently after handoff."
      },
      {
        q: "What if I already tried AI tools and they didn’t work?",
        a: "That’s the most common starting point. The tools probably worked fine in isolation — the failure was usually in connecting them to your real workflows, data formats, and edge cases. That’s exactly the gap Handbuilt fills."
      }
    ],
    schema: "Service" as const,
    icon: "Workflow"
  },

  {
    slug: "ai-receptionist-for-contractors",
    eyebrow: "AI Build",
    h1: "AI Receptionist for Contractors",
    title: "AI Receptionist for Contractors in BC | Handbuilt",
    description: `AI phone receptionist for contractors: answers your line, takes job details and a callback request, emails you a summary. ${PHONE_PRICE_LABEL} CAD launch pricing.`,
    answer: `An AI receptionist for contractors answers your business line while you’re on the job site, takes the caller’s details and what the job is, records a callback request and emails you a summary — with a tested fallback to you or voicemail. ${PHONE_PRICE_SENTENCE} Built by Handbuilt in Surrey BC.`,
    pain: "You’re on a roof, under a sink, or inside a panel box when your phone rings. You can’t answer. The caller hangs up, Googles the next contractor, and books with them instead. Voicemail doesn’t help — most callers won’t leave one. Every missed call is a lost job, and you’re losing them every day you’re out doing the actual work.",
    scenario: "Imagine a fencing contractor running a 4-person crew in the Fraser Valley. Between April and October, the phone rings 15–20 times a day. Half those calls come in while the crew is on site. The contractor’s wife handles calls when she can, but she has her own job. They’re losing an estimated 5–8 leads a week to missed calls and slow callbacks.\n\nIn this hypothetical scenario, Handbuilt would set up an AI receptionist on the contractor’s line that answers when the crew can’t, asks what the caller needs and where the job is, records a callback request and emails the contractor a summary. Anything it can’t handle goes to the agreed fallback. The contractor calls back with the details already in hand instead of playing voicemail tag.",
    steps: [
      "Setup review — Pavneet learns your trade, your services, your service area and how calls come in today.",
      `Fixed setup — ${PHONE_PRICE_LABEL} CAD launch pricing, for one number, one routing flow and one language, with the approved answers written down before anything is built.`,
      "Build & test — the receptionist is configured with your approved FAQs, services and greeting, and test calls cover normal requests, unclear callers and the fallback to a person.",
      "Handover — it goes on your line only after the test calls pass. The monthly fee covers operation, maintenance, the included minutes and small changes."
    ],
    gets: [
      "Your line answered when you can’t pick up, with your business name and greeting",
      "Caller name, contact details, reason for calling and callback request captured",
      "An emailed summary of each handled call",
      "Approved answers about your services and service area",
      "A configured and tested fallback to you or voicemail",
      `Month-to-month: ${PHONE_PRICE_LABEL} CAD, ${phonePlan.includedMinutes} minutes included`
    ],
    sections: [
      {
        heading: "Why Contractors Lose Jobs to Missed Calls",
        body: "Speed matters in trades. When a homeowner’s pipe bursts or their fence blows down, they often call several contractors. If nobody picks up, many callers move on rather than leave a voicemail. An AI receptionist gives the caller a real answer and gets their details to you, so the callback starts from a recorded request instead of a missed call.",
        bullets: [
          "Many callers won’t leave a voicemail",
          "A late callback with no notes means starting from scratch",
          "A shared answering service doesn’t know your trade or your service area"
        ]
      },
      {
        heading: "What the AI Receptionist Actually Does",
        body: "It’s not a phone tree. It’s not “press 1 for service.” The receptionist follows an agreed call flow using information you approve:",
        bullets: [
          "Answers calls with your business name and greeting",
          "Asks what the caller needs — new install, repair, quote, or emergency",
          "Answers approved questions about your services and service area",
          "Records the caller’s name, contact details, reason and callback request",
          "Emails you a summary so you know what’s coming before you call back",
          "Hands off to the tested fallback when a caller needs a person"
        ]
      },
      {
        heading: "What it does not do",
        body: `It uses your approved information and does not quote unapproved prices. ${PHONE_EXCLUSIONS_SENTENCE}`
      }
    ],
    packageId: "phone" as const,
    ctaLabel: "Request a receptionist review",
    keywords: [
      "ai receptionist for contractors",
      "ai answering service for trades",
      "contractor phone answering ai",
      "ai receptionist for plumbers",
      "ai phone answering hvac",
      "missed calls contractor"
    ],
    related: [
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "Plumber AI Automation", href: "/industries/plumber-ai-automation" },
      { label: "HVAC AI Automation", href: "/industries/hvac-ai-automation" },
      { label: "What Is an AI Receptionist?", href: "/resources/what-is-an-ai-receptionist" },
      { label: "AI Receptionist vs Human Receptionist", href: "/compare/ai-receptionist-vs-human-receptionist" }
    ],
    faqs: [
      {
        q: "How much does an AI receptionist for contractors cost?",
        a: `${PHONE_PRICE_SENTENCE} ${PHONE_MONTHLY_SENTENCE}`
      },
      {
        q: "Will my customers know they’re talking to AI?",
        a: "We recommend the greeting says so. The receptionist follows an agreed call flow and offers the caller a way to reach a person."
      },
      {
        q: "Can it put jobs straight into my calendar?",
        a: "Not in the standard receptionist. It records a callback request and emails you the details so you can confirm the time. Calendar booking can be quoted separately."
      },
      {
        q: "What happens if a caller has a question it can’t answer?",
        a: "It records the question, tells the caller you’ll follow up, and includes it in the emailed summary — or hands off to the agreed fallback. It only answers from the information you approved."
      },
      {
        q: "Does it work after hours and on weekends?",
        a: "It can answer outside your business hours if that is the routing you choose. The fallback for calls it cannot handle is configured and tested before go-live."
      },
      {
        q: "How long does setup take?",
        a: "The timeline is confirmed in the setup review and depends on your phone provider and call forwarding. It goes live only after the test calls pass."
      },
      {
        q: "I already use an answering service. Why switch?",
        a: "You may not need to. A human service is better when most calls need judgement. The AI receptionist suits predictable calls: it answers from approved information, records the details and emails you a summary, at a fixed monthly price with included minutes."
      },
      {
        q: "Which trades does this work for?",
        a: "Any trade that books jobs by phone: plumbing, electrical, HVAC, roofing, fencing, landscaping, painting, general contracting. The receptionist is trained on your specific services, not a generic script."
      }
    ],
    schema: "Service" as const,
    icon: "Phone"
  },

  {
updatedAt: "2026-09-27",
secondaryCta: {
  "label": "See the quote-request guide",
  "href": "/how-to/automate-quote-requests"
},
    slug: "ai-lead-follow-up-agent",
    eyebrow: "AI Build",
    h1: "AI Lead Follow-Up for Incoming Enquiries",
    title: "AI Lead Follow-Up for Small Businesses | Handbuilt AI",
    description: "Record incoming enquiries, notify the right person and define the next response. Request a review of your lead follow-up workflow.",
    answer: "A lead follow-up workflow records incoming requests, notifies the right person and supports the next response under rules you approve. Handbuilt reviews where enquiries arrive, which tools you use and where follow-up gets lost before proposing the automation.",
    pain: "When a request arrives during a job, it is easy to forget which details are missing or whether anyone has replied. A sent acknowledgement is not the same as a handled enquiry.",
    scenario: "Illustrative workflow: a website quote request is saved and the owner is notified. A draft response asks for the missing job details. The owner reviews the draft, replies and marks the next step. A duplicate submission is attached to the same opportunity rather than counted as another prospect.",
    steps: [
  "Map incoming channels and the information each request needs.",
  "Define acknowledgements, draft replies and actions requiring review.",
  "Connect the agreed systems with duplicate and failure handling.",
  "Test notification, reply, stop and handoff conditions before release."
],
    gets: [
  "A scoped incoming-enquiry workflow",
  "Clear notification and response responsibilities",
  "Defined stop conditions and human review",
  "Testing of failures and duplicate requests"
],
    sections: [
  {
    "heading": "Keep acquisition and follow-up separate",
    "body": "This service handles enquiries that reach your business. It does not promise to generate a list of new prospects or send unsolicited campaigns. If customers are not finding the business, the first task may be website and search visibility work.\n\nFor existing requests, identify the point where the process stalls: missing information, delayed acknowledgement, an unread inbox or no record of the next action."
  },
  {
    "heading": "Decide what may happen automatically",
    "body": "An acknowledgement, a draft reply and a binding quote are different actions. Define which messages may be sent, which need a person and when follow-up must stop. Make sure the workflow uses current information and respects the customer's communication preferences.\n\nThe implementation should not keep contacting someone after the opportunity is closed or a stop request is recorded. The exact channel and message rules are part of the scope."
  },
  {
    "heading": "Make failures visible",
    "body": "If an email cannot be sent, a useful workflow records the problem and provides a recovery route. If a tool connection expires, someone needs to know. Decide how retries work and how repeated submissions are identified.\n\nWe test the record, notification and owner handoff together. A successful API response by itself does not prove that an owner received and acted on the request."
  },
  {
    "heading": "Measure the next useful business step",
    "body": "Track distinct prospects, fit, replies, quotes and paid work in the private lead system. Keep tests and spam out of demand counts. A generated message should not mark a job won.\n\nUse the results to decide whether the workflow saves useful effort. If volume is low, a simple shared status list and a reliable form notification may solve the immediate problem."
  }
],
    packageId: "starter" as const,
    ctaLabel: "Request a follow-up review",
    keywords: [
      "ai lead follow up agent",
      "automated lead follow up",
      "ai lead nurturing small business",
      "speed to lead ai",
      "ai lead response system",
      "ai sms follow up"
    ],
    related: [
  {
    "label": "Automate quote requests",
    "href": "/how-to/automate-quote-requests"
  },
  {
    "label": "Lead capture forms",
    "href": "/services/ai-lead-capture-form"
  },
  {
    "label": "Track where leads came from",
    "href": "/how-to/track-where-your-customers-found-you"
  },
  {
    "label": "Improve discovery",
    "href": "/services/ai-search-visibility"
  }
],
    faqs: [
  {
    "q": "Will this find new customers for me?",
    "a": "This service focuses on handling incoming enquiries. Improving discovery or running an acquisition campaign is a separate task."
  },
  {
    "q": "Can it connect to my CRM?",
    "a": "We review the specific product, account access and supported integration before promising a connection. Include the tools you use in the request."
  },
  {
    "q": "Does every response need AI?",
    "a": "No. A fixed acknowledgement or a straightforward routing rule may be enough. Use AI where it adds a defined capability that can be checked."
  },
  {
    "q": "How are duplicate leads handled?",
    "a": "The workflow needs an agreed way to identify repeated requests about the same opportunity. The rule depends on your channels and records and is tested during implementation."
  }
],
    schema: "Service" as const,
    icon: "MessageSquare"
  },

  {
    slug: "ai-chatbot-for-small-business",
    eyebrow: "AI Build",
    h1: "AI Chatbot for Small Business",
    title: "AI Chatbot Built for Your Small Business",
    description: "Custom AI chatbot trained on your services, pricing, and FAQs. Answers customers and captures leads 24/7. From $1,500 CAD. Handbuilt, Surrey BC.",
    answer: "A custom AI chatbot trained on your services, pricing, hours, and FAQs answers customer questions and captures leads on your website 24/7. Not a generic widget — built around your actual business. Starts at $1,500 CAD. Built by Handbuilt in Surrey BC, serving Canada and remote clients worldwide.",
    pain: "Your website gets traffic, but most visitors leave without reaching out. They had a question about your pricing, your hours, or whether you serve their area — and your site didn’t answer it fast enough. A contact form feels like shouting into a void. A phone call during business hours isn’t always convenient. So they bounce, and you never know they were there.",
    scenario: "Imagine a dental clinic with a website that gets 800 visits a month. About 15 of those visitors book through the online form. The rest leave. The clinic’s FAQ page covers the basics, but patients still want to ask specific questions: “Do you take Pacific Blue Cross?” “How much is a crown without insurance?” “Can I get a same-week appointment?” Those questions go unanswered at 9 PM on a Wednesday.\n\nIn this hypothetical scenario, Handbuilt would install a chatbot trained on the clinic’s full service list, insurance policies, pricing ranges, and availability. A visitor asks a question, gets an accurate answer in seconds, and gets prompted to book. The clinic captures leads it was already paying to attract but quietly losing.",
    steps: [
      "Discovery call — Pavneet learns your services, pricing, common customer questions, and what your website visitors typically need. 20 minutes.",
      "Scoped flat-price proposal — Fixed CAD price, a clear list of what the chatbot will know and do, and a go-live timeline. No hourly billing.",
      "Build & test on your real business data — Pavneet trains the chatbot on your actual services, pricing, hours, service areas, and FAQs, then tests it against real customer questions.",
      "Handoff + optional Care Plan — The chatbot goes live on your website. You get a walkthrough and can update its knowledge base anytime. Optional $99/mo Care Plan for ongoing tuning."
    ],
    gets: [
      "AI chatbot trained on your specific services, pricing, hours, and FAQs — not generic responses",
      "Lead capture built in — collects name, email, and what the visitor needs when they’re ready",
      "24/7 availability on your website, answering questions when you can’t",
      "Installed on your existing site — WordPress, Squarespace, Next.js, Wix, or custom",
      "Honest answers only — trained to say “I don’t know, let me connect you” rather than make things up",
      "One-time build fee starting at $1,500 CAD — no per-message charges"
    ],
    sections: [
      {
        heading: "Not a Generic Widget — Trained on Your Business",
        body: "Most chatbot tools give you a blank box and tell you to “add your knowledge base.” That’s the whole problem. The tool is cheap — making it actually accurate about your services, your pricing, and your edge cases is the work. Handbuilt trains the chatbot on your real business data so it gives answers your staff would give, not vague auto-generated responses.",
        bullets: [
          "Knows your full service list, not just what’s on your homepage",
          "Answers pricing questions with the ranges and caveats you’d give in person",
          "Understands your service area and availability",
          "Trained to escalate gracefully when it doesn’t know the answer"
        ]
      },
      {
        heading: "Captures Leads You’re Already Paying For",
        body: "If you’re running Google Ads, SEO, or social media, you’re paying to get people to your website. Most of them leave without doing anything. A chatbot that answers their question in the moment and prompts them to book or leave their info converts traffic you already have. You don’t need more traffic — you need to stop losing the visitors you’ve got.",
        bullets: [
          "Engages visitors who won’t fill out a contact form",
          "Captures lead info mid-conversation when the visitor is warm",
          "Qualifies inquiries so you get context, not just a name and email",
          "Sends lead notifications to you in real time"
        ]
      },
      {
        heading: "Chatbot or AI receptionist — which do you need?",
        body: "A chatbot is best when your customers reach you online and want quick answers or to book on your website. If most of your leads come in by phone — especially in the trades — an AI receptionist that answers calls may pay back faster, and the two work well together. Not sure which fits? The fastest way to find out is a short discovery call, where we look at where your leads actually come from before recommending anything."
      }
    ],
    packageId: "starter" as const,
    ctaLabel: "Get your custom chatbot",
    keywords: [
      "ai chatbot for small business",
      "small business chatbot",
      "custom ai chatbot",
      "ai chatbot for website small business",
      "business chatbot canada"
    ],
    related: [
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "AI Chatbot for Website", href: "/services/ai-chatbot-for-website" },
      { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
      { label: "ChatGPT vs Custom AI Agent", href: "/compare/chatgpt-vs-custom-ai-agent" },
      { label: "What Can AI Automate for Small Business?", href: "/resources/what-can-ai-automate-small-business" }
    ],
    faqs: [
      {
        q: "How is this different from ChatGPT or a free chatbot widget?",
        a: "ChatGPT is a general-purpose AI that knows nothing about your business. Free widgets are blank templates you have to configure yourself. This chatbot is trained specifically on your services, pricing, hours, and FAQs so it gives accurate, business-specific answers from day one."
      },
      {
        q: "How much does a custom AI chatbot cost?",
        a: "$1,500 CAD for a standard small business chatbot. More complex setups with booking integrations, multi-language support, or CRM connections may fall in the $3,500–$7,500 range. You get a fixed price before work begins."
      },
      {
        q: "Does it work on my existing website?",
        a: "Yes. It installs on WordPress, Squarespace, Wix, Shopify, Next.js, or any custom site. Pavneet handles the installation — you don’t need a developer."
      },
      {
        q: "What if the chatbot doesn’t know the answer?",
        a: "It says so honestly. It’s trained to tell the visitor it doesn’t have that information and to offer to connect them with you directly. It never fabricates answers."
      },
      {
        q: "Can it book appointments or capture leads?",
        a: "Yes to both. It can collect visitor details mid-conversation and send them to you, and it can connect to your calendar or booking system to schedule directly."
      },
      {
        q: "How long does it take to build?",
        a: "About 5 business days for a standard chatbot. Pavneet trains it on your business data, tests it against real customer questions, and installs it on your site."
      },
      {
        q: "Do I need to update it when my services or pricing change?",
        a: "You can update its knowledge base yourself — the process is straightforward. Or the $99/mo Care Plan covers ongoing updates and tuning so you don’t have to think about it."
      },
      {
        q: "Can the chatbot answer in more than one language?",
        a: "Yes — it can be set up to respond in multiple languages if your customers need that. Multi-language support is one of the add-ons that can move a build toward the $3,500–$7,500 range, so it’s scoped on the discovery call."
      }
    ],
    schema: "Service" as const,
    icon: "Bot"
  },
{
    slug: "remote-ai-development",
    eyebrow: "How We Work",
    h1: "Remote AI Development for Small Businesses",
    title: "Remote AI Development — US, Canada, AU & NZ | Handbuilt",
    description:
      "How Handbuilt builds custom AI systems remotely for small businesses in the US, Canada, Australia and New Zealand — timezones, currency, handoff and support, explained.",
    answer:
      "Handbuilt builds custom AI systems remotely for small businesses across Canada, the US, Australia and New Zealand. You work directly with one builder — Pavneet, based in Surrey/Delta BC — over calls, email and a shared plan. Pricing is fixed in CAD (often cheaper than US rates), with USD, AUD and NZD invoicing on request. A single AI worker is live in about 5 business days.",
    pain:
      "Hiring a remote developer usually means an agency middleman, an offshore team you can't reach, or a freelancer who goes quiet halfway through. For a small business owner, the real risk isn't the timezone — it's not knowing who's actually accountable, whether the thing will work, and what it will truly cost once it's built.",
    scenario:
      "Say a small business owner in the US or Australia wants an AI receptionist but has been burned by an offshore agency that took a deposit and disappeared. Working with Handbuilt, they get on a 30-minute call in their own timezone, receive a flat quote in CAD with a USD or AUD figure on request, and watch the same person who quoted it build and test the system on their real business.\n\nBecause it's one builder rather than a relay of account managers, decisions are fast and nothing gets lost in translation. The distance stops mattering once you're talking to the person doing the actual work.",
    steps: [
      "Discovery call in your timezone — 30 minutes to map where you're losing calls, quotes, or hours, and which AI worker pays back fastest.",
      "Flat-price proposal — a fixed CAD price (with a USD, AUD or NZD figure on request), the exact scope, and a timeline. No hourly billing.",
      "Build & test on your real data — Pavneet builds it, connects it to your actual tools, and tests it against your real workflow before you ever see a customer touch it.",
      "Remote handoff & support — you get the working system, documentation, and an optional Care Plan for monitoring and updates, all handled asynchronously.",
    ],
    gets: [
      "One builder accountable for the whole project — no agency relay, no offshore handoff",
      "Fixed pricing in CAD, with USD / AUD / NZD invoicing on request",
      "Scheduling that fits your business hours, wherever you are",
      "Async updates and a shared plan — you're never chasing a status",
      "You own the finished system outright — code, data, and all",
      "Remote handoff with documentation and an optional Care Plan",
    ],
    sections: [
      {
        heading: "How remote delivery actually works",
        body: "Almost every build happens over calls, email and a shared written plan — the same way it would if the builder were across town. You don't need to be technical, install anything, or manage a team. You describe your business and your problem; Pavneet scopes it, builds it, tests it on your real data, and hands over a working system. The only thing distance changes is that meetings are scheduled instead of walk-ins.",
      },
      {
        heading: "Timezones aren't a problem",
        body: "Handbuilt runs on Pacific Time (Surrey/Delta BC). That overlaps a full US business day, and most of the East Coast morning and afternoon. For Australia and New Zealand there's roughly a one-day offset, which is handled the way good remote teams always handle it: scheduled calls at a time that works for you, and async progress in between so the build never waits on the clock.",
      },
      {
        heading: "Currency and invoicing",
        body: "Prices are fixed in Canadian dollars. For most US, UK, Australian and NZ buyers that's a quiet advantage — the Canadian dollar typically trades below the US dollar, so a CAD price is often lower than an equivalent US or Australian quote for the same work. If you'd rather see and pay in your own currency, USD, AUD and NZD invoicing is available on request.",
        bullets: [
          "Fixed CAD pricing — no hourly billing, no scope-creep invoices",
          "USD / AUD / NZD figures and invoicing available on request",
          "A single AI worker starts at $1,500 CAD; multi-worker systems $3,500–$7,500; custom apps from $10,000",
          "Optional Care Plan from $99/mo for ongoing monitoring and updates",
        ],
      },
      {
        heading: "Who this is for",
        body: "Small and local businesses in the United States, Canada, Australia, New Zealand and the UK that want a done-for-you AI system — a receptionist, quote agent, chatbot, follow-up or invoice worker — without hiring an agency or a full-time developer. If you'd work with a great local builder but can't find one, a remote one who picks up the phone is the next best thing.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Start a remote build",
    keywords: [
      "remote ai developer",
      "hire remote ai developer",
      "outsource ai automation",
      "remote ai development small business",
      "ai developer for us business",
      "remote ai automation australia",
    ],
    related: [
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Do you work with businesses in the US, Australia and New Zealand?",
        a: "Yes. Handbuilt is based in Surrey/Delta BC, Canada, and delivers remotely to small businesses across Canada, the US, Australia, New Zealand and the UK. The process is identical wherever you are — a call, a flat quote, a build, and a handoff.",
      },
      {
        q: "What timezone are you in, and does that slow things down?",
        a: "Pacific Time. That fully overlaps US business hours and the UK morning; Australia and NZ run about a day offset, handled with scheduled calls and async progress in between. Timezone rarely affects the timeline — a single AI worker is still typically live in about 5 business days.",
      },
      {
        q: "How do payment and currency work if I'm not in Canada?",
        a: "Prices are quoted and fixed in CAD, which is often cheaper than a US or Australian equivalent for the same work. If you'd prefer, a USD, AUD or NZD figure and invoice is available on request. There's no hourly billing — you know the full price before any work starts.",
      },
      {
        q: "Isn't it risky to hire someone in another country?",
        a: "The risk with remote work is usually a middleman or an unreachable team — not the distance itself. Here you work directly with the one person building your system, start to finish. You own the finished code and data outright, so there's no lock-in either.",
      },
      {
        q: "Do I need to be technical or install anything?",
        a: "No. You describe your business and your problem; everything technical is handled in the build. You interact with the result — booked appointments, sent quotes, notifications — not the underlying system.",
      },
      {
        q: "How do we communicate during the build?",
        a: "Scheduled calls at a time that works for you, plus email and a shared written plan you can check anytime. You're never left chasing a status update, and decisions go straight to the person doing the work.",
      },
    ],
    schema: "Service",
    icon: "Globe",
  },
  {
    slug: "ai-integration-services",
    eyebrow: "Core Service",
    h1: "AI Integration Services for Business",
    title: "AI Integration Services for Business | Handbuilt",
    description:
      "We integrate AI into the tools and workflows your business already runs on — calls, CRM, forms, email, booking and more. Done-for-you, from $1,500 CAD.",
    answer:
      "AI integration services connect AI into the systems your business already uses — your phone, CRM, forms, email, calendar and internal tools — so it does real work inside your actual workflow instead of sitting in a separate app. Handbuilt scopes, builds and installs the integration for you, starting at $1,500 CAD, and you own the result.",
    pain: "The AI tools are everywhere and cheap; the hard part is wiring them into how your business actually runs so they save real time. That integration work is exactly what most businesses can't do themselves — and what generic SaaS leaves to you.",
    scenario:
      "A service business has a phone line, a CRM, a booking tool and a website form that don't talk to each other. We integrate AI across them: calls get answered and logged, form leads get instant follow-up, bookings sync to the calendar, and the CRM stays up to date automatically. The tools they already pay for finally work as one system.",
    steps: [
      "We map your current tools, data and the workflow you want AI inside of",
      "We scope exactly what gets integrated and the outcome, at a flat price",
      "We build and connect the AI into your real stack, and test it live",
      "We hand it over — you own it — with an optional Care Plan for upkeep",
    ],
    gets: [
      "AI wired into the tools you already use",
      "One connected system instead of disconnected apps",
      "Built around your real data and workflow",
      "You own the integration outright",
    ],
    sections: [
      {
        heading: "What we integrate AI into",
        body: "If it's part of how your business runs, it can usually be integrated. Common ones:",
        bullets: [
          "Phone and SMS — AI answering, routing and follow-up",
          "CRM and pipelines — auto-logging, enrichment, updates",
          "Website, forms and chat — instant capture and qualification",
          "Email, calendar and booking — scheduling and reminders",
          "Internal tools and docs — an assistant trained on your knowledge",
        ],
      },
      {
        heading: "Why integration is the real value",
        body: "Anyone can sign up for an AI app. The leverage comes from AI doing work inside your existing systems — so leads, bookings and data flow automatically instead of needing a human to copy things between tools. That connective work is the craft, and it's what we do.",
      },
    ],
    packageId: "business",
    ctaLabel: "Scope my integration",
    keywords: [
      "ai integration services",
      "ai integration for business",
      "integrate ai into my business",
      "done for you ai integration",
    ],
    related: [
      { label: "AI Automation Agency", href: "/ai-automation-agency" },
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Custom Business Automation", href: "/services/custom-business-automation" },
    ],
    faqs: [
      { q: "Do you integrate with the tools I already use?", a: "That's the point — we build around your existing stack (CRM, phone, calendar, forms, email and more) rather than making you switch. We confirm exactly what's supported in the discovery call." },
      { q: "What if my tools don't have a direct integration?", a: "We can usually bridge them with automation platforms or custom connections. If something genuinely can't be integrated, we'll tell you upfront and propose the closest workable path." },
      { q: "Do I own the integration?", a: "Yes — you own what we build. The optional $99/mo Care Plan covers monitoring and tweaks but isn't required to keep using it." },
    ],
    schema: "Service",
    icon: "Boxes",
  },
  {
    slug: "ai-automation-canada",
    eyebrow: "Core Service",
    h1: "AI Automation Services in Canada",
    title: "AI Automation Services in Canada | Handbuilt",
    description:
      "Done-for-you AI automation for Canadian businesses — receptionists, chatbots, lead follow-up and custom systems. Fixed CAD pricing, delivered remotely nationwide.",
    answer:
      `Handbuilt provides done-for-you AI automation for businesses across Canada — AI receptionists, chatbots, lead follow-up, quote and booking automation, and custom AI tools. Based in BC and delivered remotely nationwide, with fixed CAD pricing — custom builds from $1,500, the AI phone receptionist at ${PHONE_PRICE_LABEL} — and one builder accountable start to finish.`,
    pain: "Canadian small businesses want practical AI that actually works in their operation — not a US-priced agency retainer or a generic SaaS tool that half-fits. Finding someone who'll build the real thing, in CAD, and stand behind it is the hard part.",
    scenario:
      "A business in Alberta, Ontario or the Maritimes wants AI to stop missed-call losses and slow lead follow-up. We scope it over video, build the system around their real services and tools, test it live, and hand it over — same process whether they're in Surrey or Halifax. Fixed CAD pricing, no surprise US-dollar invoices.",
    steps: [
      "Discovery call over video — map where time and leads leak",
      "Scoped proposal — a flat CAD price and a clear outcome",
      "Build & test — around your real business, wherever you are in Canada",
      "Handoff & support — you own it, with an optional $99/mo Care Plan",
    ],
    gets: [
      "Done-for-you AI built around your business",
      "Fixed CAD pricing, no currency surprises",
      "Delivered remotely anywhere in Canada",
      "One accountable builder, not an agency queue",
    ],
    sections: [
      {
        heading: "AI automation for Canadian businesses",
        body: "From BC to Ontario and beyond, the fastest-payback automations are the same: stop losing leads to missed calls and slow replies, and take repetitive admin off your team.",
        bullets: [
          "AI receptionists and missed-call recovery",
          "Lead follow-up and quote/booking automation",
          "Website and social chat that captures and qualifies",
          "Custom AI tools and workflow automation",
        ],
      },
      {
        heading: "Local roots, national (and global) reach",
        body: "Handbuilt is based in the Surrey/Delta area of BC and serves businesses across Canada — and worldwide — remotely. The build is identical wherever you are: discovery over video, the system built around your real operation, support a message away.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation canada",
      "ai automation services canada",
      "ai for small business canada",
      "done for you ai automation canada",
    ],
    related: [
      { label: "Remote AI Development", href: "/remote-ai-development" },
      { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
      { label: "AI Automation in Toronto, ON", href: "/locations/ai-automation-toronto-on" },
      { label: "AI Automation in Calgary, AB", href: "/locations/ai-automation-calgary-ab" },
    ],
    faqs: [
      { q: "Do you work with businesses outside BC?", a: "Yes — we serve businesses across Canada (and internationally) remotely. Discovery is over video and the build is the same as a local one." },
      { q: "Is pricing in Canadian dollars?", a: "Yes — fixed CAD pricing. A single AI worker starts at $1,500 CAD; larger multi-worker systems run $3,500–$7,500." },
      { q: "How long does it take?", a: "A single AI worker is usually live in about 5 business days; larger systems take a few weeks depending on scope." },
    ],
    schema: "Service",
    icon: "MapPin",
  },
];

export function getMoneyPage(slug: string): LandingContent | undefined {
  return moneyPages.find((m) => m.slug === slug);
}
