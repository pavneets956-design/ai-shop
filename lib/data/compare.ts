import type { LandingContent } from "./landing";

export const comparisons: LandingContent[] = [
  {
    slug: "custom-ai-tool-vs-saas",
    eyebrow: "Compare",
    h1: "Custom AI Tool vs Off-the-Shelf SaaS",
    title: "Custom AI Tool vs Off-the-Shelf SaaS | Handbuilt",
    description: "SaaS is faster to start. Custom AI fits your exact workflow. Here is when each makes sense for a small business.",
    answer:
      "If your process fits a SaaS product's assumptions, use the SaaS — it is cheaper and ready today. When your workflow does not fit, you spend months on workarounds and still do not get what you need. A custom AI tool from Handbuilt starts at CAD $2,500 and is built around exactly how your business runs, not a generic template.",
    sections: [
      {
        heading: "When the off-the-shelf option is fine",
        body: "SaaS tools are the right call when your needs are standard. If a $30/month subscription does 90% of what you need, buying it is sensible.",
        bullets: [
          "Your workflow matches what the tool was designed for",
          "You have fewer than 5 employees and low process complexity",
          "You want to validate a need before investing in custom",
          "Budget is tight and a monthly subscription is manageable",
        ],
      },
      {
        heading: "When a custom build wins",
        body: "Custom makes sense when the SaaS workarounds cost more than the build — in time, integrations, or ongoing subscription fees.",
        bullets: [
          "You are duct-taping three SaaS tools together to fake one workflow",
          "The off-the-shelf tool does not connect to your existing software",
          "You are paying per-seat fees that compound as you grow",
          "Your process has rules or data the generic tool cannot handle",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Off-the-shelf SaaS",
      rows: [
        { factor: "Upfront cost", handbuilt: "CAD $2,500–$5,000 one-time", alternative: "$0–$100 setup, often free trial" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan CAD $250/mo", alternative: "$30–$500+/mo per seat, recurring forever" },
        { factor: "Fit to your workflow", handbuilt: "Built exactly to your process", alternative: "You adapt to the tool's assumptions" },
        { factor: "Integrations", handbuilt: "Connected to your existing stack", alternative: "Limited to the vendor's native integrations" },
        { factor: "Time to live", handbuilt: "1–3 weeks", alternative: "Same day to 1 week" },
        { factor: "Ownership", handbuilt: "You own the code and data", alternative: "Vendor controls pricing, features, and uptime" },
      ],
    },
    packageId: "business",
    ctaLabel: "Get a scoped quote",
    keywords: ["custom ai tool", "saas vs custom software", "build vs buy ai", "small business ai tool"],
    related: [
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "Compare: Custom AI App vs Template", href: "/compare/custom-ai-app-vs-template" },
      { label: "Services: Custom Business Automation", href: "/services/custom-business-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "How do I know if custom is worth it for my business?",
        a:
          "Add up your current SaaS subscriptions that touch the same workflow. If they exceed CAD $250/mo, a custom tool often pays back in under 18 months — and you stop paying monthly forever.",
      },
      {
        q: "Can Handbuilt integrate with tools I already use?",
        a:
          "Yes. Most projects connect to tools like Google Workspace, Notion, Airtable, Stripe, or Zapier. Integration scope is scoped in the discovery call.",
      },
      {
        q: "What if I want to start with SaaS and switch later?",
        a:
          "That is a reasonable path. Many clients start with a SaaS tool to validate the need, then come to Handbuilt when the limitations become clear.",
      },
    ],
    schema: "Comparison",
    icon: "Layers",
  },
  {
    slug: "ai-automation-agency-vs-diy",
    eyebrow: "Compare",
    h1: "AI Automation Agency vs DIY",
    title: "AI Automation Agency vs DIY (Build It Yourself) | Handbuilt",
    description: "DIY AI tools are cheap to start but expensive in time. Here is an honest look at when to hire out and when to build it yourself.",
    answer:
      "DIY is viable if you have developer experience and time to invest. For most small business owners, the real cost is 40–80 hours learning tools, building, and debugging — while your business sits still. Handbuilt charges CAD $1,000–$3,500 to take that entire burden off your plate and ship something that actually runs.",
    sections: [
      {
        heading: "When DIY makes sense",
        body: "If you have technical ability and enjoy building, DIY gives you full control at low cost. Some use cases are simple enough to wire up in a weekend.",
        bullets: [
          "You have coding or no-code tool experience",
          "The automation is low stakes — a broken workflow costs you minutes, not customers",
          "You enjoy tinkering and have time for it",
          "The task is simple enough for Zapier or Make without custom logic",
        ],
      },
      {
        heading: "When hiring an agency wins",
        body: "Most small business owners underestimate the time DIY takes. A professional build is faster, more reliable, and does not consume your core working hours.",
        bullets: [
          "You have tried DIY and hit a wall with the technical parts",
          "Your time is worth more than the build cost",
          "The automation involves your customer data or revenue — errors are costly",
          "You need it done in weeks, not months of evenings",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "DIY (build it yourself)",
      rows: [
        { factor: "Cash cost", handbuilt: "CAD $1,000–$3,500", alternative: "Tool subscriptions: $0–$100/mo" },
        { factor: "Time cost", handbuilt: "1–3 weeks, minimal from you", alternative: "40–100+ hours of your own time" },
        { factor: "Technical skill needed", handbuilt: "None", alternative: "Medium to high depending on complexity" },
        { factor: "Reliability", handbuilt: "Tested, monitored, maintained", alternative: "Depends entirely on your skill and time" },
        { factor: "Support when it breaks", handbuilt: "Care Plan available at $250/mo", alternative: "You fix it yourself" },
        { factor: "Speed to live", handbuilt: "1–3 weeks", alternative: "1–6 months for complex builds" },
      ],
    },
    packageId: "business",
    ctaLabel: "Talk through your build",
    keywords: ["ai automation agency", "diy ai automation", "hire vs build ai", "no-code ai automation"],
    related: [
      { label: "AI Business System", href: "/ai-business-system" },
      { label: "Services: AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Compare: AI Workflow Automation vs Manual Admin", href: "/compare/ai-workflow-automation-vs-manual-admin" },
      { label: "How It Works", href: "/how-to" },
    ],
    faqs: [
      {
        q: "What tools does Handbuilt use to build automations?",
        a:
          "Depending on the project: Python, Next.js, OpenAI APIs, Make, n8n, Supabase, and direct API integrations. You do not need to know any of them.",
      },
      {
        q: "Can I maintain the automation myself after it is built?",
        a:
          "Yes. Handbuilt delivers documented builds. If you want ongoing support, the Care Plan covers maintenance and changes at CAD $250/mo.",
      },
    ],
    schema: "Comparison",
    icon: "Workflow",
  },
  {
    slug: "ai-receptionist-vs-human-receptionist",
    eyebrow: "Compare",
    h1: "AI Receptionist vs Hiring a Human Receptionist",
    title: "AI Receptionist vs Human Receptionist | Handbuilt",
    description: "A human receptionist handles nuance better. An AI receptionist works 24/7 for a fraction of the cost. Here is the honest trade-off.",
    answer:
      "A human receptionist is genuinely better at complex, emotional, or unusual situations. If your front desk handles sensitive conversations daily, do not replace that role with AI. But for routine call answering, booking, FAQs, and after-hours coverage, an AI receptionist from Handbuilt (CAD $1,000 setup) covers the predictable 80% at a cost no hire can match.",
    sections: [
      {
        heading: "When a human receptionist is the right call",
        body: "Some front-desk work requires human judgment. AI is not the answer for every scenario.",
        bullets: [
          "Calls regularly involve emotionally sensitive topics",
          "Your clients expect and value a personal relationship with staff",
          "Calls are highly varied and unpredictable in nature",
          "You operate in a regulated environment requiring human accountability",
        ],
      },
      {
        heading: "When an AI receptionist wins",
        body: "For the predictable, repeatable part of your call volume, AI is faster, cheaper, and always available.",
        bullets: [
          "High call volume of routine questions, bookings, or confirmations",
          "You are missing calls after hours or during busy periods",
          "You want to reduce front-desk cost without reducing coverage",
          "Your call types are consistent enough to script well",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Hiring a human receptionist",
      rows: [
        { factor: "Setup cost", handbuilt: "CAD $1,000 one-time", alternative: "Recruiting, onboarding: $500–$2,000+" },
        { factor: "Monthly cost", handbuilt: "Optional Care Plan $250/mo", alternative: "CAD $3,000–$4,500/mo salary + benefits" },
        { factor: "Availability", handbuilt: "24/7, including weekends and holidays", alternative: "Business hours, with sick days and turnover" },
        { factor: "Complex call handling", handbuilt: "Limited — handles scripted scenarios well", alternative: "Excellent — human judgment and empathy" },
        { factor: "Consistency", handbuilt: "Same answer every time", alternative: "Varies by staff and day" },
        { factor: "Scalability", handbuilt: "Handles volume spikes without extra cost", alternative: "Requires hiring during busy periods" },
      ],
    },
    packageId: "starter",
    ctaLabel: "See the AI receptionist setup",
    keywords: ["ai receptionist", "virtual receptionist small business", "ai vs human receptionist", "automated phone answering"],
    related: [
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "Services: AI Receptionist Setup", href: "/services/ai-receptionist-setup" },
      { label: "Industries: Dental Clinic AI Automation", href: "/industries/dental-clinic-ai-automation" },
      { label: "Compare: AI Automation vs Virtual Assistant", href: "/compare/ai-automation-vs-virtual-assistant" },
    ],
    faqs: [
      {
        q: "What happens when a caller asks something the AI cannot handle?",
        a:
          "The AI can be configured to escalate — transfer to a human, take a message, or book a callback. It does not leave callers stranded.",
      },
      {
        q: "How long does it take to set up?",
        a: "Typically one week from kickoff to live. Handbuilt handles the configuration, scripting, and testing.",
      },
      {
        q: "Will callers know they are talking to an AI?",
        a:
          "That depends on your preference. Handbuilt can configure either — a disclosed AI assistant or a more natural-sounding voice. Disclosure is generally the more trusted approach.",
      },
    ],
    schema: "Comparison",
    icon: "PhoneCall",
  },
  {
    slug: "ai-chatbot-vs-live-chat",
    eyebrow: "Compare",
    h1: "AI Chatbot vs Live Chat with Staff",
    title: "AI Chatbot vs Live Chat with Staff | Handbuilt",
    description: "Live chat is better when conversations are complex. AI chatbots handle routine questions faster and at lower cost. Here is how to choose.",
    answer:
      "Live chat with staff wins on nuance and relationship. An AI chatbot wins on cost and consistency for the predictable 70–80% of visitor questions. For most small business websites, a Handbuilt chatbot (CAD $1,000) handles common questions, qualifies leads, and books calls — so your team only talks to people who are genuinely ready.",
    sections: [
      {
        heading: "When live chat with staff is worth it",
        body: "If your sales conversations require trust-building and customization, a human is often the better closer.",
        bullets: [
          "High-ticket sales where relationship and trust matter significantly",
          "Complex questions that require judgment and real-time research",
          "You already have staff available and the volume justifies it",
          "Your clients expect to negotiate or discuss unusual needs",
        ],
      },
      {
        heading: "When an AI chatbot makes more sense",
        body: "Most website chat is repetitive. An AI handles the repeatable questions so your team focuses on the work that actually needs them.",
        bullets: [
          "Most incoming questions are variations of the same 10–15 topics",
          "You want 24/7 coverage without staffing evenings and weekends",
          "You need to qualify or route leads before a human gets involved",
          "Staff time is better spent on delivery than on answering FAQs",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Live chat with staff",
      rows: [
        { factor: "Setup cost", handbuilt: "CAD $1,000 one-time", alternative: "Staff training + live chat software: $200–$800" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan $250/mo", alternative: "Staff time: 5–20 hrs/week depending on volume" },
        { factor: "Availability", handbuilt: "24/7 instant response", alternative: "Business hours only, unless you staff evenings" },
        { factor: "Complex query handling", handbuilt: "Limited to trained scenarios", alternative: "Handles any question a human can answer" },
        { factor: "Response time", handbuilt: "Instant", alternative: "Seconds to minutes depending on staff load" },
        { factor: "Consistency", handbuilt: "Same answer every time", alternative: "Varies by agent" },
      ],
    },
    packageId: "starter",
    ctaLabel: "See the chatbot in action",
    keywords: ["ai chatbot for website", "live chat vs chatbot", "ai customer support chatbot", "small business chatbot"],
    related: [
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "Services: AI Chatbot for Website", href: "/services/ai-chatbot-for-website" },
      { label: "Services: AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
      { label: "Compare: AI Automation vs Virtual Assistant", href: "/compare/ai-automation-vs-virtual-assistant" },
    ],
    faqs: [
      {
        q: "Can the chatbot hand off to a human mid-conversation?",
        a:
          "Yes. It can be set to escalate to email, a booking link, or a live chat queue when the question goes beyond its training.",
      },
      {
        q: "How do you train the chatbot on my business?",
        a:
          "Handbuilt works through a discovery session to capture your FAQs, services, pricing, and tone. The chatbot is trained on that content, not a generic template.",
      },
    ],
    schema: "Comparison",
    icon: "Bot",
  },
  {
    slug: "ai-automation-vs-virtual-assistant",
    eyebrow: "Compare",
    h1: "AI Automation vs Hiring a Virtual Assistant",
    title: "AI Automation vs Hiring a Virtual Assistant | Handbuilt",
    description: "Virtual assistants handle varied tasks well. AI automation handles one workflow repeatedly, faster and cheaper. Here is the honest split.",
    answer:
      "A virtual assistant is more flexible — they can handle unexpected tasks, use judgment, and adapt on the fly. AI automation is better for workflows that are predictable and repetitive. If you have a specific task you do the same way every week, Handbuilt builds automation for it at CAD $1,000–$3,500 and eliminates the recurring VA cost entirely.",
    sections: [
      {
        heading: "When a virtual assistant is the better fit",
        body: "VAs bring flexibility and judgment that AI cannot replicate for varied or unpredictable work.",
        bullets: [
          "Your tasks vary significantly week to week",
          "The work requires human judgment, context, or relationship",
          "You need someone to manage email, calls, and admin all in one role",
          "You are not sure yet what your highest-leverage task to automate is",
        ],
      },
      {
        heading: "When AI automation beats a VA",
        body: "Defined, repeatable workflows are exactly where automation earns its cost back fast.",
        bullets: [
          "The same task runs weekly or daily with the same inputs",
          "Data entry, report generation, follow-up emails, or scheduling",
          "You want the task done instantly, not within a workday",
          "The VA cost for this one task exceeds $250/mo",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Hiring a virtual assistant",
      rows: [
        { factor: "Setup cost", handbuilt: "CAD $1,000–$3,500 one-time", alternative: "Onboarding: $0–$500" },
        { factor: "Monthly cost", handbuilt: "Optional Care Plan $250/mo", alternative: "CAD $400–$2,500/mo depending on hours" },
        { factor: "Task flexibility", handbuilt: "Fixed to the automated workflow", alternative: "High — can handle varied, unscripted work" },
        { factor: "Speed of execution", handbuilt: "Instant, runs on schedule", alternative: "During their working hours" },
        { factor: "Errors and consistency", handbuilt: "Consistent once tested", alternative: "Depends on VA quality and familiarity" },
        { factor: "Scalability", handbuilt: "Runs the same task 1x or 1,000x", alternative: "More hours needed as volume grows" },
      ],
    },
    packageId: "business",
    ctaLabel: "Scope your automation",
    keywords: ["ai automation vs virtual assistant", "replace va with automation", "small business workflow automation", "automate repetitive tasks"],
    related: [
      { label: "AI Business System", href: "/ai-business-system" },
      { label: "Services: AI Admin Assistant", href: "/services/ai-admin-assistant" },
      { label: "Compare: AI Workflow Automation vs Manual Admin", href: "/compare/ai-workflow-automation-vs-manual-admin" },
      { label: "Compare: Hiring vs AI Automation", href: "/compare/hiring-vs-ai-automation" },
    ],
    faqs: [
      {
        q: "Can automation replace my VA entirely?",
        a:
          "Usually not entirely. Automation handles the repeatable parts well. VAs are better for varied, judgment-driven work. Many clients automate specific tasks while keeping a part-time VA for the rest.",
      },
      {
        q: "What kinds of tasks does Handbuilt automate most often?",
        a:
          "Appointment follow-ups, lead intake, invoice reminders, report generation, data entry between systems, and after-hours inquiry routing.",
      },
    ],
    schema: "Comparison",
    icon: "Sparkles",
  },
  {
    slug: "custom-ai-app-vs-template",
    eyebrow: "Compare",
    h1: "Custom AI App vs Template / No-Code Builder",
    title: "Custom AI App vs Template or No-Code Builder | Handbuilt",
    description: "No-code templates are fast and cheap to start. Custom AI apps handle complexity and ownership that templates cannot. Here is when each fits.",
    answer:
      "Templates and no-code builders are excellent for standard use cases — landing pages, simple forms, basic chatbots. When your requirements include proprietary logic, sensitive data handling, or deep integration with your own systems, a custom build from Handbuilt (from CAD $7,500) is the only route that gives you real ownership and control.",
    sections: [
      {
        heading: "When a template or no-code builder is fine",
        body: "No-code tools have come a long way. For straightforward use cases, they ship fast and cost little.",
        bullets: [
          "Your requirements fit a standard use case (FAQ bot, lead form, basic dashboard)",
          "Speed to market matters more than custom logic",
          "You have limited budget and want to validate before committing",
          "The tool you need already exists as a polished SaaS product",
        ],
      },
      {
        heading: "When a custom AI app is the right investment",
        body: "Custom makes sense when your competitive advantage comes from the software itself, not just from using it.",
        bullets: [
          "Your workflow involves proprietary data or logic that cannot be templated",
          "You need integrations the template vendor does not support",
          "You are building for clients or resale — you need to own the IP",
          "Template vendors have increased pricing or shut down, costing you twice",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Template / no-code builder",
      rows: [
        { factor: "Upfront cost", handbuilt: "CAD $7,500+ for complex custom apps", alternative: "$0–$500, often free to start" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan $250/mo", alternative: "$20–$300/mo platform fees, rising with usage" },
        { factor: "Custom logic", handbuilt: "Unlimited — built to your spec", alternative: "Limited to what the platform supports" },
        { factor: "Data ownership", handbuilt: "Full — your code, your database", alternative: "Vendor holds your data; export may be limited" },
        { factor: "Integration depth", handbuilt: "Any API or system you can describe", alternative: "Constrained to native integrations" },
        { factor: "Time to live", handbuilt: "3–8 weeks for complex builds", alternative: "Hours to a few days" },
      ],
    },
    packageId: "custom",
    ctaLabel: "Discuss your custom app",
    keywords: ["custom ai app development", "no-code vs custom development", "build vs template ai app", "bespoke ai application"],
    related: [
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "Compare: Custom AI Tool vs SaaS", href: "/compare/custom-ai-tool-vs-saas" },
      { label: "Services: Custom Business Automation", href: "/services/custom-business-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What counts as a 'custom' project vs a standard build?",
        a:
          "Custom projects have proprietary logic, unique integrations, or are built for resale or client delivery. Standard builds follow predictable patterns — Handbuilt has packages for those starting at CAD $1,000.",
      },
      {
        q: "Do I own the code at the end?",
        a:
          "Yes. Handbuilt transfers full code ownership on project completion. You can host it yourself, hand it to another developer, or extend it independently.",
      },
      {
        q: "How long does a custom AI app take to build?",
        a:
          "Typically 3–8 weeks depending on scope. Handbuilt scopes the project before taking a deposit so you know what you are getting before work starts.",
      },
    ],
    schema: "Comparison",
    icon: "Boxes",
  },
  {
    slug: "ai-workflow-automation-vs-manual-admin",
    eyebrow: "Compare",
    h1: "AI Workflow Automation vs Doing Admin Manually",
    title: "AI Workflow Automation vs Manual Admin | Handbuilt",
    description: "Manual admin is free to start but expensive over time. AI workflow automation converts recurring hours into a one-time build cost.",
    answer:
      "Manual admin has no setup cost, which is why most small businesses default to it. The real cost is time — typically 5–15 hours per week on tasks that follow the same pattern every time. A Handbuilt workflow automation (CAD $1,000–$3,500) eliminates that recurring cost. Payback is usually under 6 months.",
    sections: [
      {
        heading: "When manual admin is still reasonable",
        body: "Not everything is worth automating. Some tasks are rare enough or varied enough that manual is the honest answer.",
        bullets: [
          "The task happens fewer than a few times per month",
          "Each instance is significantly different — no pattern to automate",
          "The task requires human judgment or client relationship",
          "You have not done it enough times yet to know the consistent pattern",
        ],
      },
      {
        heading: "When automation wins",
        body: "Predictable, recurring admin work is the clearest case for automation. Every hour saved weekly compounds over months.",
        bullets: [
          "The same steps repeat weekly or daily with minimal variation",
          "The work is tedious but critical — errors are costly",
          "Staff hours on this task could be redirected to billable work",
          "The task happens outside business hours (reminders, follow-ups, reports)",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Doing admin manually",
      rows: [
        { factor: "Setup cost", handbuilt: "CAD $1,000–$3,500 one-time", alternative: "$0" },
        { factor: "Ongoing time cost", handbuilt: "Near zero after launch", alternative: "5–15 hrs/week depending on volume" },
        { factor: "Error rate", handbuilt: "Consistent once tested", alternative: "Human error increases with fatigue and volume" },
        { factor: "After-hours coverage", handbuilt: "Runs on schedule, any time", alternative: "Only during working hours" },
        { factor: "Scalability", handbuilt: "Volume increases with no extra time cost", alternative: "More volume = more hours = more staff" },
        { factor: "Auditability", handbuilt: "Logged, traceable, reportable", alternative: "Depends on staff habit and documentation" },
      ],
    },
    packageId: "business",
    ctaLabel: "Calculate your time savings",
    keywords: ["ai workflow automation", "automate admin tasks", "small business process automation", "reduce manual work ai"],
    related: [
      { label: "Services: AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Services: AI Admin Assistant", href: "/services/ai-admin-assistant" },
      { label: "Compare: AI Automation vs Virtual Assistant", href: "/compare/ai-automation-vs-virtual-assistant" },
      { label: "Use Cases", href: "/use-cases" },
    ],
    faqs: [
      {
        q: "How do I identify which admin tasks are worth automating?",
        a:
          "Track what you or your team repeat most often. If a task takes more than 1 hour per week and follows a consistent pattern, it is a strong candidate. Handbuilt can walk through your workflow in a 30-minute discovery call.",
      },
      {
        q: "What if my process changes after the automation is built?",
        a:
          "Automation can be updated. The Care Plan at CAD $250/mo covers changes and maintenance. One-off updates are also available outside the plan.",
      },
    ],
    schema: "Comparison",
    icon: "Workflow",
  },
  {
    slug: "hiring-vs-ai-automation",
    eyebrow: "Compare",
    h1: "Hiring Another Employee vs AI Automation",
    title: "Hiring vs AI Automation for Small Business | Handbuilt",
    description: "Hiring adds capability and judgment. AI automation handles defined, repeatable work at a fraction of the cost. Here is how to choose.",
    answer:
      "Hiring is the right answer when the work requires human judgment, relationship, or adaptability. AI automation is the right answer when the work is predictable and repeatable. Before hiring, it is worth asking: is this work I am considering hiring for fundamentally varied, or does it follow a pattern? A Handbuilt automation at CAD $1,000–$3,500 can replace 10–20 hrs/week of repeatable work. A hire costs CAD $40,000–$70,000/year.",
    sections: [
      {
        heading: "When hiring is the right move",
        body: "Some growth problems genuinely need a person. More clients, more complexity, and relationship-driven work all require human capacity.",
        bullets: [
          "The role involves client relationships, sales, or service delivery",
          "The work varies significantly and requires on-the-fly judgment",
          "You need someone to manage other systems and staff",
          "Growth requires capacity that automation alone cannot provide",
        ],
      },
      {
        heading: "When automation is worth trying first",
        body: "Many small businesses hire to solve a volume problem that automation could have handled for a fraction of the cost.",
        bullets: [
          "The bottleneck is a specific, repeatable task — not general capacity",
          "You are considering hiring primarily for admin, follow-up, or data tasks",
          "Payroll would exceed CAD $2,500/mo for this role",
          "The work happens outside business hours or needs instant turnaround",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Hiring another employee",
      rows: [
        { factor: "Upfront cost", handbuilt: "CAD $1,000–$3,500 one-time", alternative: "Recruiting + onboarding: $2,000–$8,000+" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan $250/mo", alternative: "CAD $3,500–$6,000+/mo salary + benefits" },
        { factor: "Task flexibility", handbuilt: "Fixed to defined workflows", alternative: "High — adapts to new tasks and situations" },
        { factor: "Availability", handbuilt: "24/7, no holidays or sick days", alternative: "Business hours, with PTO and turnover risk" },
        { factor: "Scalability", handbuilt: "Same cost regardless of volume", alternative: "Requires additional hires as volume grows" },
        { factor: "Risk", handbuilt: "Low — defined scope, fixed cost", alternative: "Hiring mismatch, turnover, and training costs" },
      ],
    },
    packageId: "business",
    ctaLabel: "Scope what automation can handle",
    keywords: ["hiring vs ai automation", "automate instead of hire", "small business staffing alternative", "ai replace admin role"],
    related: [
      { label: "AI Automation Agency", href: "/ai-automation-agency" },
      { label: "Compare: AI Automation vs Virtual Assistant", href: "/compare/ai-automation-vs-virtual-assistant" },
      { label: "Services: Custom Business Automation", href: "/services/custom-business-automation" },
      { label: "Solutions", href: "/solutions" },
    ],
    faqs: [
      {
        q: "Is this about replacing employees or avoiding hiring?",
        a:
          "Mostly avoiding a hire for repeatable work that does not need a person. Handbuilt does not position automation as a tool to fire existing staff — it is about handling growth without adding payroll.",
      },
      {
        q: "What if the automation cannot handle everything the role would?",
        a:
          "That is common. Automation often handles 60–80% of what a role would do. Clients frequently combine a part-time hire with automation — getting the capacity of a full-time role at a lower cost.",
      },
      {
        q: "How quickly does the automation pay back compared to a hire?",
        a:
          "A CAD $3,500 build paying back against a $4,000/mo role breaks even in under 30 days. Even against a part-time role at $1,500/mo, payback is typically under 3 months.",
      },
    ],
    schema: "Comparison",
    icon: "Sparkles",
  },
];

export function getComparison(slug: string): LandingContent | undefined {
  return comparisons.find((c) => c.slug === slug);
}
