import type { LandingContent } from "./landing";
import {
  phonePlan,
  PHONE_SETUP_PRICE,
  PHONE_MONTHLY_PRICE,
  PHONE_OVERAGE_PRICE,
  PHONE_PRICE_LABEL,
  PHONE_PRICE_SENTENCE,
  PHONE_SCOPE_SENTENCE,
  PHONE_MONTHLY_SENTENCE,
  PHONE_EXCLUSIONS_SENTENCE,
} from "./packages";

export const comparisons: LandingContent[] = [
  {
    slug: "custom-ai-tool-vs-saas",
    eyebrow: "Compare",
    h1: "Custom AI Tool vs Off-the-Shelf SaaS",
    title: "Custom AI Tool vs Off-the-Shelf SaaS | Handbuilt",
    description: "SaaS is faster to start. Custom AI fits your exact workflow. Here is when each makes sense for a small business.",
    answer:
      "If your process fits a SaaS product's assumptions, use the SaaS — it is cheaper and ready today. When your workflow does not fit, you spend months on workarounds and still do not get what you need. A custom AI tool from Handbuilt starts at CAD $3,500 and is built around exactly how your business runs, not a generic template.",
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
        { factor: "Upfront cost", handbuilt: "CAD $3,500–$7,500 one-time", alternative: "$0–$100 setup, often free trial" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan CAD $99/mo", alternative: "$30–$500+/mo per seat, recurring forever" },
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
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
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
      "DIY is viable if you have developer experience and time to invest. For most small business owners, the real cost is 40–80 hours learning tools, building, and debugging — while your business sits still. Handbuilt charges CAD $1,500–$3,500 to take that entire burden off your plate and ship something that actually runs.",
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
        { factor: "Cash cost", handbuilt: "CAD $1,500 (one worker) to $3,500–$7,500 (connected system)", alternative: "Tool subscriptions: $0–$100/mo" },
        { factor: "Time cost", handbuilt: "1–3 weeks, minimal from you", alternative: "40–100+ hours of your own time" },
        { factor: "Technical skill needed", handbuilt: "None", alternative: "Medium to high depending on complexity" },
        { factor: "Reliability", handbuilt: "Tested, monitored, maintained", alternative: "Depends entirely on your skill and time" },
        { factor: "Support when it breaks", handbuilt: "Care Plan available at $99/mo", alternative: "You fix it yourself" },
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
          "Yes. Handbuilt delivers documented builds. If you want ongoing support, the Care Plan covers maintenance and changes at CAD $99/mo.",
      },
    ],
    schema: "Comparison",
    icon: "Workflow",
  },
  {
    slug: "ai-chatbot-vs-live-chat",
    eyebrow: "Compare",
    h1: "AI Chatbot vs Live Chat with Staff",
    title: "AI Chatbot vs Live Chat with Staff | Handbuilt",
    description: "Live chat is better when conversations are complex. AI chatbots handle routine questions faster and at lower cost. Here is how to choose.",
    answer:
      "Live chat with staff wins on nuance and relationship. An AI chatbot wins on cost and consistency for the predictable 70–80% of visitor questions. For most small business websites, a Handbuilt chatbot (CAD $1,500) handles common questions, qualifies leads, and books calls — so your team only talks to people who are genuinely ready.",
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
        { factor: "Setup cost", handbuilt: "CAD $1,500 one-time", alternative: "Staff training + live chat software: $200–$800" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan $99/mo", alternative: "Staff time: 5–20 hrs/week depending on volume" },
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
      "A virtual assistant is more flexible — they can handle unexpected tasks, use judgment, and adapt on the fly. AI automation is better for workflows that are predictable and repetitive. If you have a specific task you do the same way every week, Handbuilt builds automation for it at CAD $1,500–$3,500 and eliminates the recurring VA cost entirely.",
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
        { factor: "Setup cost", handbuilt: "CAD $1,500 (one worker) to $3,500–$7,500 (connected system), one-time", alternative: "Onboarding: $0–$500" },
        { factor: "Monthly cost", handbuilt: "Optional Care Plan $99/mo", alternative: "CAD $400–$2,500/mo depending on hours" },
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
      "Templates and no-code builders are excellent for standard use cases — landing pages, simple forms, basic chatbots. When your requirements include proprietary logic, sensitive data handling, or deep integration with your own systems, a custom build from Handbuilt (from CAD $10,000) is the only route that gives you real ownership and control.",
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
        { factor: "Upfront cost", handbuilt: "CAD $10,000+ for complex custom apps", alternative: "$0–$500, often free to start" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan $99/mo", alternative: "$20–$300/mo platform fees, rising with usage" },
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
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What counts as a 'custom' project vs a standard build?",
        a:
          "Custom projects have proprietary logic, unique integrations, or are built for resale or client delivery. Standard builds follow predictable patterns — Handbuilt has packages for those starting at CAD $1,500.",
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
      "Manual admin has no setup cost, which is why most small businesses default to it. The real cost is time — typically 5–15 hours per week on tasks that follow the same pattern every time. A Handbuilt workflow automation (CAD $1,500–$3,500) eliminates that recurring cost. Payback is usually under 6 months.",
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
        { factor: "Setup cost", handbuilt: "CAD $1,500 (one worker) to $3,500–$7,500 (connected system), one-time", alternative: "$0" },
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
          "Automation can be updated. The Care Plan at CAD $99/mo covers changes and maintenance. One-off updates are also available outside the plan.",
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
      "Hiring is the right answer when the work requires human judgment, relationship, or adaptability. AI automation is the right answer when the work is predictable and repeatable. Before hiring, it is worth asking: is this work I am considering hiring for fundamentally varied, or does it follow a pattern? A Handbuilt automation at CAD $1,500–$3,500 can replace 10–20 hrs/week of repeatable work. A hire costs CAD $40,000–$70,000/year.",
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
          "Payroll would exceed CAD $3,500/mo for this role",
          "The work happens outside business hours or needs instant turnaround",
        ],
      },
    ],
    comparison: {
      alternativeLabel: "Hiring another employee",
      rows: [
        { factor: "Upfront cost", handbuilt: "CAD $1,500 (one worker) to $3,500–$7,500 (connected system), one-time", alternative: "Recruiting + onboarding: $2,000–$8,000+" },
        { factor: "Ongoing cost", handbuilt: "Optional Care Plan $99/mo", alternative: "CAD $3,500–$6,000+/mo salary + benefits" },
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
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
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
{
  slug: "ai-receptionist-vs-virtual-receptionist",
  eyebrow: "Compare",
  h1: "AI Receptionist or Virtual Receptionist — Which Fits Your Business?",
  title: "AI Receptionist vs Virtual Receptionist",
  description: `Honest comparison of AI receptionists and virtual receptionist services for Canadian small businesses: cost model, coverage and real trade-offs. Handbuilt: ${PHONE_PRICE_LABEL} CAD.`,
  answer: `A virtual receptionist is a real person answering remotely — warm, flexible, and long-established. An AI receptionist is software that follows an agreed call flow, takes the caller's details and hands off to a person when needed. If your calls follow predictable patterns, AI handles them well. If every call is unique and emotional, a human wins. ${PHONE_PRICE_SENTENCE}`,
  pain: "You are paying a monthly fee for a virtual receptionist and wondering whether AI could handle the routine calls.",
  sections: [
    {
      heading: "When a virtual receptionist is the right call",
      body: "Virtual receptionists shine when callers need genuine empathy, when conversations regularly go off-script, or when your industry demands a human voice for trust. If you take only a handful of calls a day, the human touch may be worth the fee. Some regulated industries also require a real person on the line for compliance reasons."
    },
    {
      heading: "When Handbuilt wins",
      body: "If most calls follow a pattern — service questions, quote requests, business hours, callback requests — an AI receptionist answers them from approved information and emails you a summary, at a fixed monthly price with included minutes.",
      bullets: [
        "Answers outside business hours if that is the routing you choose",
        `Fixed monthly fee with ${phonePlan.includedMinutes} AI-handled minutes included; extra minutes ${PHONE_OVERAGE_PRICE} each`,
        "Call flow written around your services, service area and greeting",
        "A configured and tested fallback to a person or voicemail"
      ]
    },
    {
      heading: "What it does not include",
      body: PHONE_EXCLUSIONS_SENTENCE
    }
  ],
  comparison: {
    alternativeLabel: "Virtual receptionist",
    rows: [
      { factor: "Upfront cost", handbuilt: `${PHONE_SETUP_PRICE} CAD fixed setup`, alternative: "Varies by provider; check current published pricing" },
      { factor: "Ongoing cost", handbuilt: `${PHONE_MONTHLY_PRICE} CAD/month, ${phonePlan.includedMinutes} minutes included, then ${PHONE_OVERAGE_PRICE}/min`, alternative: "Recurring monthly fee, often tied to call volume" },
      { factor: "Availability", handbuilt: "Hours you choose, with a tested fallback", alternative: "Business hours typical; after-hours often extra" },
      { factor: "Fit to your workflow", handbuilt: "Call flow written around your approved answers", alternative: "General scripts with some customization" },
      { factor: "What you receive", handbuilt: "Emailed summary of each handled call", alternative: "Message relay; varies by provider" },
      { factor: "Judgement on unusual calls", handbuilt: "Hands off to a person", alternative: "A person handles it directly" },
      { factor: "Contract", handbuilt: "Month-to-month, taxes extra", alternative: "Varies by provider" }
    ]
  },
  packageId: "phone",
  ctaLabel: "Get a fixed quote",
  keywords: ["ai receptionist vs virtual receptionist", "virtual receptionist alternative", "ai phone answering canada", "ai receptionist cost"],
  related: [
    { label: "What an AI Receptionist Is", href: "/ai-receptionist" },
    { label: "AI Receptionist Cost in Canada", href: "/resources/ai-receptionist-cost" },
    { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
    { label: "Is an AI Receptionist Worth It?", href: "/resources/is-ai-receptionist-worth-it" },
    { label: "AI Receptionist Setup Service", href: "/ai-receptionist" }
  ],
  faqs: [
    {
      q: "Can an AI receptionist handle complex or emotional calls?",
      a: "It depends on the call. AI handles structured interactions well — FAQs, details capture, callback requests. For calls needing real empathy or nuanced judgment, a human receptionist is still better. The AI receptionist answers what it is approved to and hands off what it cannot."
    },
    {
      q: "Is an AI receptionist cheaper long-term?",
      a: `Compare your current invoice with the AI terms. ${PHONE_PRICE_SENTENCE} Whether that is cheaper depends on your call volume and how many calls genuinely need a person.`
    },
    {
      q: "What happens to calls the AI cannot handle?",
      a: "They go to the agreed fallback — you, your team or voicemail. The fallback is configured and tested before go-live."
    },
    {
      q: "Will callers know they are talking to AI?",
      a: "We recommend the greeting says so. Callers should always have a clear route to a person."
    },
    {
      q: "Can I switch from a virtual receptionist to AI gradually?",
      a: "Yes. A common approach is running AI for after-hours calls first, then expanding coverage once you see how it performs. Handbuilt can configure the handoff so the transition is low-risk."
    }
  ],
  schema: "Comparison",
  icon: "Phone"
},
{
  slug: "ai-receptionist-vs-answering-service",
  eyebrow: "Compare",
  h1: "AI Receptionist vs Answering Service — Which Pricing Model Fits?",
  title: "AI Receptionist vs Traditional Answering Service",
  description: `AI receptionist versus a traditional answering service: honest cost and capability breakdown for Canadian small businesses. Handbuilt: ${PHONE_PRICE_LABEL} CAD.`,
  answer: `Answering services usually bill by the minute, the call or a monthly plan with overages. Handbuilt's AI receptionist has a fixed setup and a fixed monthly fee with included minutes. If you need a human for every caller, the answering service wins. If most calls are routine, the AI receptionist may suit you. ${PHONE_PRICE_SENTENCE}`,
  pain: "Your answering service bill moves with call volume, and busy months cost the most. You want more predictable costs without losing call coverage.",
  sections: [
    {
      heading: "When an answering service is the right call",
      body: "Answering services work well when you receive a low, steady volume of calls and each one is different enough to need a human ear. They require no setup beyond a script handoff, and there is no technology to maintain. At low volume, a usage-based service can be cheaper than any setup fee."
    },
    {
      heading: "When Handbuilt wins",
      body: `The AI receptionist's monthly fee includes ${phonePlan.includedMinutes} AI-handled minutes, so a typical small-business month has a known cost; minutes beyond that are ${PHONE_OVERAGE_PRICE} each, and you can see that rate before you sign.\n\nThe second difference is consistency of a specific kind: it delivers the same approved answers every time. It is not an advantage over a human on the calls that need judgment, and it is worth being clear about which of your calls are which before choosing.`,
      bullets: [
        `${phonePlan.includedMinutes} AI-handled minutes a month included; ${PHONE_OVERAGE_PRICE} per extra minute`,
        "Consistent delivery of your approved answers every time",
        "Emailed summary of each handled call",
        "A configured and tested fallback to a person or voicemail"
      ]
    },
    {
      heading: "What it does not include",
      body: PHONE_EXCLUSIONS_SENTENCE
    }
  ],
  comparison: {
    alternativeLabel: "Answering service",
    rows: [
      { factor: "Upfront cost", handbuilt: `${PHONE_SETUP_PRICE} CAD fixed setup`, alternative: "Varies by provider; check current published pricing" },
      { factor: "Ongoing cost", handbuilt: `${PHONE_MONTHLY_PRICE} CAD/month with ${phonePlan.includedMinutes} minutes included`, alternative: "Per-minute, per-call or plan-plus-overage, depending on provider" },
      { factor: "Beyond the included amount", handbuilt: `${PHONE_OVERAGE_PRICE} CAD per extra AI-handled minute`, alternative: "Overage rates vary by provider" },
      { factor: "Judgement on unusual calls", handbuilt: "Hands off to the agreed fallback", alternative: "A person handles it directly" },
      { factor: "What you receive", handbuilt: "Emailed summary of each handled call", alternative: "Message relay via email or text" },
      { factor: "Contract", handbuilt: "Month-to-month, taxes extra", alternative: "Varies by provider" }
    ]
  },
  packageId: "phone",
  ctaLabel: "Get a fixed quote",
  keywords: ["ai receptionist vs answering service", "answering service alternative", "ai phone receptionist canada", "per minute answering service replacement"],
  related: [
    { label: "Can AI Answer Business Phone Calls?", href: "/resources/can-ai-answer-business-phone-calls" },
    { label: "AI Receptionist Cost in Canada", href: "/resources/ai-receptionist-cost" },
    { label: "AI Receptionist Service", href: "/ai-receptionist" },
    { label: "Is an AI Receptionist Worth It?", href: "/resources/is-ai-receptionist-worth-it" },
    { label: "AI Voice Agent Service", href: "/services/ai-voice-agent" }
  ],
  faqs: [
    {
      q: "How does an AI receptionist handle calls differently from a human operator?",
      a: "An AI receptionist follows a call flow you approve — greeting, the caller's reason, details capture, callback request, fallback — and executes it consistently every time. A human operator listens and improvises. The AI is more consistent for structured calls; the human is better when the conversation is truly unpredictable."
    },
    {
      q: "What if my call volume is low — is AI still worth it?",
      a: "Compare your current monthly bill with the AI's fixed monthly fee. If your answering service already costs less than that and handles your calls well, the math may favour keeping it."
    },
    {
      q: "Can the AI receptionist take messages and send them to me?",
      a: "Yes. It records the caller's name, contact details, reason and callback request and emails you a summary. Text-message forwarding and CRM logging are not included and are quoted separately."
    },
    {
      q: "What happens during a service outage?",
      a: "The honest answer is that both models fail sometimes and the thing that matters is what happens next. No specific uptime figure is quoted here, because the number depends on the telephony carrier, the model provider and the hosting — three parties, none of them this studio. What is configurable, and what you should insist on, is the fallback: calls roll to a cell or to voicemail when the agent is unreachable, and somebody is alerted. Worth asking any vendor specifically about the silent-failure case — an agent that answers, greets the caller and then stops responding, which is the failure that actually costs you a customer."
    }
  ],
  schema: "Comparison",
  icon: "Phone"
},
{
updatedAt: "2026-09-27",
  slug: "chatgpt-vs-custom-ai-agent",
  eyebrow: "Compare",
  h1: "Custom AI Agent vs ChatGPT — When Generic Is Not Enough",
  title: "Custom AI Agent vs ChatGPT for Your Business",
  description: "ChatGPT is great for personal use. A custom AI agent is built for your business — your data, your tools, your guardrails. Honest comparison.",
  answer: "ChatGPT is a powerful general tool, but it does not know your products, cannot access your systems, and has no guardrails. A custom AI agent is trained on your data, wired into your tools, and follows rules you set. If you just need quick answers for yourself, use ChatGPT. For customer-facing work, Handbuilt builds custom agents from CAD $3,500.",
  pain: "You are copying data into ChatGPT manually and wishing it could just plug into your systems and act on its own.",
  sections: [
{
  "heading": "Using ChatGPT and being found through ChatGPT are different tasks",
  "body": "An owner using an assistant to draft a reply is a different situation from a customer asking an assistant to recommend a business. The first concerns your workflow; the second concerns discovery and accurate public information.\n\nChoose the work that matches the problem. A custom internal agent does not automatically make the business more visible in public answers. A visibility review does not by itself connect ChatGPT to your private business systems."
},
    {
      heading: "When ChatGPT is the right call",
      body: "ChatGPT is excellent for personal productivity — drafting emails, summarizing documents, brainstorming, writing code snippets. If you are the only user and the stakes are low, a $20–$200/mo ChatGPT subscription covers a lot of ground. It requires no build time, no developer, and no setup beyond signing up."
    },
    {
      heading: "When Handbuilt wins",
      body: "When the AI needs to face your customers, pull from your specific data, connect to your CRM or booking system, and follow business rules you define, a raw ChatGPT subscription falls apart. A custom agent knows your products, speaks in your brand voice, enforces guardrails, and takes actions — not just answers questions.",
      bullets: [
        "Grounded in your actual business data — products, pricing, policies",
        "Integrated with your CRM, calendar, inventory, or ticketing system",
        "Guardrails prevent off-topic or harmful responses to customers",
        "Takes actions: books appointments, creates tickets, routes leads",
        "Runs on your domain, under your brand, with your terms"
      ]
    }
  ],
  comparison: {
    alternativeLabel: "Raw ChatGPT",
    rows: [
      { factor: "Upfront cost", handbuilt: "From CAD $3,500 one-time build", alternative: "Typically $0 (free tier) to $200/mo subscription" },
      { factor: "Ongoing cost", handbuilt: "Optional Care Plan CAD $99/mo", alternative: "Around $20–$200/mo per seat, plus API costs if applicable" },
      { factor: "Knowledge of your business", handbuilt: "Trained on your data, products, and policies", alternative: "Generic — knows nothing about your business" },
      { factor: "Integrations", handbuilt: "Built into your CRM, calendar, and business tools", alternative: "Plugins and GPTs exist but limited; no deep integration" },
      { factor: "Customer-facing ready", handbuilt: "Yes — branded, guardrailed, action-capable", alternative: "No — designed for personal use, not customer interactions" },
      { factor: "Ownership", handbuilt: "You own the agent and its configuration", alternative: "OpenAI controls the platform, model, and pricing" }
    ]
  },
  packageId: "business",
  ctaLabel: "Get a fixed quote",
  keywords: ["chatgpt vs custom ai agent", "custom ai chatbot", "chatgpt for business", "build custom ai agent canada"],
  related: [
{
  "label": "Get your business found in ChatGPT",
  "href": "/resources/get-your-business-recommended-by-chatgpt"
},
{
  "label": "SEO, AEO and GEO explained",
  "href": "/resources/geo-aeo-explained-for-local-business"
},
    { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
    { label: "Custom AI App Development", href: "/custom-ai-app-development" },
    { label: "AI Chatbot for Website", href: "/services/ai-chatbot-for-website" },
    { label: "Best AI Automations for Service Businesses", href: "/resources/best-ai-automations-for-service-businesses" },
    { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" }
  ],
  faqs: [
    {
      q: "Can I just use a ChatGPT custom GPT for my business?",
      a: "Custom GPTs are a step up from raw ChatGPT, but they still cannot access your live data, take actions in your systems, or enforce strict guardrails. They work for simple FAQ-style use cases. For anything involving integrations or customer-facing interactions, a purpose-built agent is more reliable."
    },
    {
      q: "How does a custom AI agent know my business information?",
      a: "Handbuilt feeds your agent with your product catalog, pricing, policies, FAQs, and any other documentation you provide. The agent retrieves relevant context for each conversation so its answers are grounded in your actual business, not generic knowledge."
    },
    {
      q: "What happens if the AI gives a wrong answer to a customer?",
      a: "Guardrails limit what the agent can say and do. It is configured to stay within your documented facts, and when it does not know something, it escalates to you instead of guessing. No AI is perfect, but a well-configured agent with guardrails is far safer than raw ChatGPT."
    },
    {
      q: "Is it more expensive than a ChatGPT subscription?",
      a: "Upfront, yes — a custom agent starts at CAD $3,500. But a ChatGPT subscription does not do the same job. The fair comparison is the cost of hiring someone to manually handle what the agent automates. Over months, the custom build often pays for itself."
    },
    {
      q: "Can I still use ChatGPT alongside a custom agent?",
      a: "Absolutely. Many business owners use ChatGPT for personal tasks — drafting, research, brainstorming — while running a custom agent for customer-facing work. They solve different problems."
    }
  ],
  schema: "Comparison",
  icon: "Bot"
},
{
  slug: "gohighlevel-ai-vs-custom-ai-automation",
  eyebrow: "Compare",
  h1: "GoHighLevel AI vs Custom-Built Automation — Platform or Ownership?",
  title: "GoHighLevel AI vs Custom-Built AI Automation",
  description: "GoHighLevel bundles AI with CRM and marketing tools. When you need AI that works your way, custom wins. Honest comparison for small businesses.",
  answer: "GoHighLevel bundles CRM, funnels, email, SMS, and AI into one monthly subscription — great for agencies and marketers that fit its model. If your business needs AI that works differently from what GHL offers, or you want to own the system outright, a custom build avoids the lock-in. Handbuilt builds custom AI automations from CAD $3,500.",
  pain: "GoHighLevel does a lot, but the AI features do not quite fit how your business actually works — and you are paying monthly for features you never use.",
  sections: [
    {
      heading: "When GoHighLevel is the right call",
      body: "GHL is strong when you want an all-in-one platform for CRM, email, SMS, funnels, and basic AI — especially if you run a marketing agency or a business that fits its templates. The bundled approach means less integration work, and the community and marketplace offer pre-built workflows. If the platform's assumptions match your business, you avoid a lot of custom development.",
      bullets: [
        "All-in-one CRM, marketing, and communication platform",
        "Pre-built templates and marketplace workflows",
        "Active community with shared playbooks",
        "Good fit for agencies managing multiple client accounts"
      ]
    },
    {
      heading: "When Handbuilt wins",
      body: "When your business does not fit GHL's templates — different data models, unusual workflows, industry-specific logic — you spend more time working around the platform than working with it. A custom AI automation does exactly what your business needs, integrates with the tools you already use, and belongs to you. No monthly platform fee, no feature bloat.",
      bullets: [
        "AI logic built around your exact business process, not a template",
        "Integrates with your existing tools instead of replacing them",
        "No monthly platform subscription for features you do not use",
        "You own the system — no vendor lock-in or forced migrations"
      ]
    }
  ],
  comparison: {
    alternativeLabel: "GoHighLevel AI",
    rows: [
      { factor: "Upfront cost", handbuilt: "From CAD $3,500 one-time build", alternative: "Typically $0 setup (subscription-based)" },
      { factor: "Ongoing cost", handbuilt: "Optional Care Plan CAD $99/mo", alternative: "Around $97–$497+/mo depending on plan, at time of writing" },
      { factor: "AI flexibility", handbuilt: "Custom logic, any model, any data source", alternative: "Platform AI features — capable but constrained to GHL's framework" },
      { factor: "Fit to your workflow", handbuilt: "Built around your exact business process", alternative: "Best when your workflow matches GHL's templates" },
      { factor: "Integrations", handbuilt: "Any system with an API", alternative: "Strong within GHL ecosystem; external integrations vary" },
      { factor: "Ownership", handbuilt: "You own the code and data", alternative: "Platform-dependent; data and workflows live inside GHL" },
      { factor: "Who controls pricing/uptime", handbuilt: "You — fixed build, your infrastructure", alternative: "GHL — subscription pricing, platform uptime" }
    ]
  },
  packageId: "business",
  ctaLabel: "Get a fixed quote",
  keywords: ["gohighlevel ai alternative", "gohighlevel vs custom automation", "ghl ai agent", "custom ai crm automation canada"],
  related: [
    { label: "AI CRM Automation", href: "/services/ai-crm-automation" },
    { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
    { label: "AI Automation Agency Pricing", href: "/compare/ai-automation-agency-pricing" },
    { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" },
    { label: "AI Automation Agency", href: "/ai-automation-agency" }
  ],
  faqs: [
    {
      q: "Is GoHighLevel good for non-agency businesses?",
      a: "It can work, but GHL was designed with agencies and marketers in mind. If your business model does not revolve around funnels, drip campaigns, and client sub-accounts, you may find yourself paying for features you never touch. Evaluate whether its structure fits your actual workflow before committing."
    },
    {
      q: "Can I use GoHighLevel's CRM and add custom AI on top?",
      a: "Yes, that is a viable approach. Handbuilt can build a custom AI layer that connects to GHL via its API, so you keep the CRM you already know and add AI that does exactly what GHL's built-in AI cannot. This is a common pattern."
    },
    {
      q: "What does GoHighLevel AI actually do?",
      a: "At time of writing, GHL offers AI-powered conversation bots, review response automation, and content generation within its platform. The features are evolving. Check their current documentation for the latest capabilities, as the AI offering has been changing frequently."
    },
    {
      q: "Is a custom build more expensive than a year of GHL?",
      a: "Depends on the GHL plan. At around $97–$497/mo, a year costs roughly $1,200–$6,000+. A Handbuilt custom automation starts at CAD $3,500 one-time. The custom build often breaks even within a year and costs less afterward, especially if you do not need the full GHL platform."
    },
    {
      q: "What if I want to leave GoHighLevel later?",
      a: "Migrating away from an all-in-one platform is always harder than leaving a single tool. Your contacts, funnels, workflows, and automations live inside GHL. With a custom build, you own the code and data from day one — migration risk is lower."
    }
  ],
  schema: "Comparison",
  icon: "Layers"
},
{
  slug: "intercom-fin-alternative-small-business",
  eyebrow: "Compare",
  h1: "Small Business Alternative to Intercom Fin",
  title: "Intercom Fin Alternative for Small Business",
  description: "Intercom Fin is powerful but priced per resolution. For small businesses, a fixed-price custom AI support agent may be the better fit. Honest look.",
  answer: "Intercom Fin is a capable AI support agent backed by a mature platform — but it prices per resolution and targets mid-market and up. For a small business handling a few hundred support conversations a month, that model gets expensive fast. Handbuilt builds a fixed-price custom support agent from CAD $3,500 that you own outright.",
  pain: "Intercom Fin looks perfect until you see the per-resolution pricing and realize what it would cost at your volume.",
  sections: [
    {
      heading: "When Intercom Fin is the right call",
      body: "Intercom is a mature, well-engineered platform with years of product development behind it. Fin, its AI agent, resolves support queries using your help center content with minimal setup. If you already use Intercom for live chat, have a large help center, and your support volume justifies the per-resolution pricing, Fin delivers real value with almost no build time.",
      bullets: [
        "Minimal setup if you already use Intercom and have a help center",
        "Backed by a mature, battle-tested support platform",
        "Continuous improvements from a well-funded product team",
        "Strong reporting and analytics built in"
      ]
    },
    {
      heading: "When Handbuilt wins",
      body: "If you are a small business, Intercom's base platform cost plus per-resolution AI pricing can exceed what makes sense for your support volume. A custom-built support agent costs a fixed fee, connects to your actual systems — not just a help center — and can take actions like booking, refunds, or ticket creation. No per-resolution billing, no platform subscription.",
      bullets: [
        "Fixed build cost — no per-resolution or per-seat fees",
        "Connected to your real systems, not just FAQ articles",
        "Takes actions: books, updates orders, creates tickets",
        "Sized for small business support volumes, not enterprise"
      ]
    }
  ],
  comparison: {
    alternativeLabel: "Intercom Fin",
    rows: [
      { factor: "Upfront cost", handbuilt: "From CAD $3,500 one-time build", alternative: "Typically $0 for Fin setup (requires Intercom subscription)" },
      { factor: "Ongoing cost", handbuilt: "Optional Care Plan CAD $99/mo", alternative: "Intercom base plan + per-resolution Fin fee (check current pricing)" },
      { factor: "Pricing model", handbuilt: "Fixed — no per-conversation or per-resolution charges", alternative: "Per resolution; cost scales with support volume" },
      { factor: "Integrations", handbuilt: "Built into your existing tools — CRM, booking, inventory", alternative: "Strong within Intercom ecosystem; external integrations available" },
      { factor: "Time to live", handbuilt: "Typically 2–3 weeks", alternative: "Hours to days if you already have Intercom + help center content" },
      { factor: "Ownership", handbuilt: "You own the agent — runs on your infrastructure", alternative: "Platform-dependent; stops when subscription ends" },
      { factor: "Best fit for", handbuilt: "Small businesses wanting fixed-cost AI support", alternative: "Mid-market to enterprise teams already on Intercom" }
    ]
  },
  packageId: "business",
  ctaLabel: "Get a fixed quote",
  keywords: ["intercom fin alternative", "intercom fin small business", "ai support agent small business", "intercom fin pricing alternative"],
  related: [
    { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
    { label: "AI Chatbot for Small Business", href: "/ai-chatbot-for-small-business" },
    { label: "AI Chatbot for Website", href: "/services/ai-chatbot-for-website" },
    { label: "AI Chatbot vs AI Receptionist", href: "/compare/ai-chatbot-vs-ai-receptionist" },
    { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" }
  ],
  faqs: [
    {
      q: "How does Intercom Fin's per-resolution pricing work?",
      a: "At time of writing, Fin charges per resolved conversation — meaning each time the AI successfully handles a support query without handing off to a human. The exact price per resolution has changed; check Intercom's current pricing page. For high-volume support, costs can add up quickly."
    },
    {
      q: "Can a custom agent match Fin's quality?",
      a: "Fin benefits from Intercom's years of support tooling and is well-polished out of the box. A custom agent takes more upfront work to reach the same baseline, but it can be tailored to your exact product and workflows in ways Fin cannot. The trade-off is build time versus flexibility."
    },
    {
      q: "Do I need to leave Intercom entirely to use a custom agent?",
      a: "No. Some businesses keep Intercom for live chat and ticketing while routing AI-handled queries through a custom agent. Handbuilt can build alongside your existing tools rather than replacing them."
    },
    {
      q: "What if my support volume grows — does the custom agent scale?",
      a: "Yes. A custom agent handles increased volume without per-resolution pricing increases. If you need more sophisticated logic or new integrations as you grow, those are scoped additions to the existing system, not tier upgrades."
    },
    {
      q: "Is Intercom Fin really too expensive for small businesses?",
      a: "It depends on your volume and what you consider expensive. The platform subscription plus per-resolution fees can easily reach several hundred dollars a month for a small team. For some, that is fine. For others, especially with tight margins, a fixed-cost alternative makes more sense. Run the numbers against your actual support volume."
    }
  ],
  schema: "Comparison",
  icon: "Headset"
},
{
    slug: "ai-chatbot-vs-ai-receptionist",
    eyebrow: "Compare",
    h1: "AI Chatbot or AI Receptionist — Which One Do You Need?",
    title: "AI Chatbot vs AI Receptionist: Which Fits?",
    description:
      `Comparing AI chatbots and AI receptionists: when each fits, how each is priced at Handbuilt (phone receptionist ${PHONE_PRICE_LABEL} CAD; chatbots are one-time builds), and how to decide.`,
    answer:
      "An AI chatbot handles text-based conversations on your website — answering questions and capturing leads via chat. An AI receptionist answers phone calls, takes the caller's details and reason for calling, and emails you a summary. Choose a chatbot if most enquiries come through your website; choose a receptionist if your customers prefer to call.",
    pain: "You know you want AI handling customer contact, but you are not sure whether to start with chat or voice.",
    sections: [
      {
        heading: "When an AI chatbot is the better fit",
        body: "A chatbot works best when your customers already find you online and want quick answers without picking up the phone.",
        bullets: [
          "Most of your leads come through your website or social media",
          "Customers ask repeatable questions (pricing, hours, service areas)",
          "You want 24/7 lead capture with automatic follow-up",
          "Your booking flow is straightforward — one calendar, a few service types",
        ],
      },
      {
        heading: "When an AI receptionist is the better fit",
        body: "A voice receptionist fits when your customers expect to call and talk to someone — common in trades, healthcare, and professional services.",
        bullets: [
          "A significant portion of your leads come in by phone",
          "Missed calls are costing you jobs (contractors, clinics, law offices)",
          "You need message-taking and a tested route back to a person",
          "Customers want to describe their problem verbally, not type it out",
        ],
      },
      {
        heading: "Cost at Handbuilt",
        body: `They are priced differently. A chatbot is a one-time Starter build from $1,500 CAD that you own. The phone receptionist is a separate offer with a monthly fee. ${PHONE_PRICE_SENTENCE}\n\n${PHONE_EXCLUSIONS_SENTENCE}`,
      },
      {
        heading: "Can you run both?",
        body: "Yes. Some businesses start with a chatbot on their website, then add a receptionist once they see the value. Each is priced on its own terms; connecting them to a shared calendar or lead pipeline is a separately scoped build.",
      },
    ],
    comparison: {
      alternativeLabel: "AI Receptionist",
      rows: [
        {
          factor: "Channel",
          handbuilt: "Website chat widget (text)",
          alternative: "Phone calls (voice)",
        },
        {
          factor: "Best for",
          handbuilt: "Online leads, FAQ deflection",
          alternative: "Missed-call recovery, phone-heavy industries",
        },
        {
          factor: "Handles phone calls?",
          handbuilt: "No — text and chat only",
          alternative: "Yes — answers, takes messages, hands off to a person",
        },
        {
          factor: "Captures leads",
          handbuilt: "Collects name, email, and intent via chat",
          alternative: "Collects caller info and reason for call",
        },
        {
          factor: "Typical Handbuilt cost",
          handbuilt: "From $1,500 CAD (one-time)",
          alternative: `${PHONE_PRICE_LABEL} CAD, ${phonePlan.includedMinutes} minutes included`,
        },
      ],
    },
    packageId: "phone",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai chatbot vs ai receptionist",
      "chatbot or receptionist for business",
      "ai chatbot for small business",
      "ai receptionist vs chatbot",
      "chat vs voice ai",
    ],
    related: [
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "Website Chatbot Service", href: "/services/ai-chatbot-for-website" },
      { label: "AI Voice Agent", href: "/services/ai-voice-agent" },
    ],
    faqs: [
      {
        q: "Can an AI chatbot answer phone calls?",
        a: "No. A chatbot is text-based — it lives on your website or messaging apps. If you need something that picks up the phone, you need an AI receptionist or voice agent.",
      },
      {
        q: "Which one is cheaper to build?",
        a: `The receptionist has the lower setup fee but a monthly charge. A basic chatbot is a one-time build from $1,500 CAD. The AI phone receptionist is ${PHONE_PRICE_LABEL} CAD, month-to-month. Extra receptionist features such as calendar booking or CRM writes are quoted separately.`,
      },
      {
        q: "Do I need both?",
        a: "Not necessarily. If almost all your customer contact is online, start with a chatbot. If the phone is your main channel, start with a receptionist. You can always add the other later.",
      },
      {
        q: "What ongoing costs are there after the build?",
        a: `For a chatbot, Handbuilt charges a one-time build fee; hosting and AI usage depend on your volume. For the phone receptionist: ${PHONE_MONTHLY_SENTENCE}`,
      },
      {
        q: "How long does setup take?",
        a: "A chatbot is typically ready in about 5 business days. A phone receptionist's timeline depends on your phone provider and forwarding, and it goes live only after test calls pass.",
      },
    ],
    schema: "Comparison" as const,
  },

  {
    slug: "best-ai-receptionist-small-business-canada",
    eyebrow: "Compare",
    h1: "Finding the Right AI Receptionist for Your Small Business",
    title: "Best AI Answering Service for a Canadian Small Business",
    description:
      "What to look for in an AI receptionist for a Canadian small business. Honest comparison of monthly SaaS apps versus custom-built solutions like Handbuilt.",
    answer:
      `The best AI receptionist for a small business in Canada depends on your call volume, the calls you need handled, and budget. Self-serve subscription apps work for simple call flows; check each provider's current published pricing, included usage and overage terms. Handbuilt's AI Phone Receptionist is set up for you around your approved answers. ${PHONE_PRICE_SENTENCE} Named options worth pricing against each other include Benny, VoiceFleet and Mihron AI, and Jobber offers one to its subscribers.`,
    pain: "You are missing calls and losing jobs, but the AI receptionist market is confusing — dozens of apps, wildly different pricing, and no clear way to compare.",
    sections: [
      {
        heading: "What to look for in an AI receptionist",
        body: "Not every AI receptionist is built the same. Before you compare products, know what actually matters for a small business.",
        bullets: [
          "Natural-sounding voice that does not frustrate callers",
          "Handles your specific services and scheduling (not just generic call routing)",
          "Integrates with your existing calendar and CRM or lead pipeline",
          "Clear pricing — per-minute, per-call, or flat rate",
          "Canadian data handling if that matters for your industry",
          "Ability to transfer live calls to you when needed",
        ],
      },
      {
        heading: "Monthly SaaS receptionist apps",
        body: "There are a growing number of AI receptionist subscription products, priced by call volume and features — check current published pricing rather than an old comparison table. These are generally best for businesses with simple, repeatable call flows. Setup is usually fast, but customization is limited to what the platform offers and you configure it yourself.",
      },
      {
        heading: "A done-for-you AI receptionist",
        body: `Handbuilt sets the receptionist up for you. ${PHONE_SCOPE_SENTENCE}\n\n${PHONE_PRICE_SENTENCE} ${PHONE_MONTHLY_SENTENCE}`,
      },
      {
        heading: "Best for / Not best for (Handbuilt)",
        body: `Handbuilt's receptionist suits a business that wants its line answered from approved information, with caller details emailed and a tested fallback, without configuring software itself. It is not the best fit if a self-serve app already handles your calls well, or if you need multi-location routing. ${PHONE_EXCLUSIONS_SENTENCE}`,
      },
      {
        heading: "Questions to ask any provider",
        body: "Whether you go SaaS or custom, ask these before signing up.",
        bullets: [
          "What happens when the AI cannot answer a question? (Transfer? Voicemail? Nothing?)",
          "Can I update the script or knowledge base myself, or do I need to pay for changes?",
          "What are the real per-minute or per-call costs on top of the subscription?",
          "Do I own the recordings and data, or does the provider?",
          "What does cancellation or migration look like?",
        ],
      },
    ],
    packageId: "phone",
    ctaLabel: "Request a receptionist review",
    keywords: [
      "best ai receptionist small business canada",
      "ai receptionist for small business",
      "ai phone answering canada",
      "ai receptionist comparison",
      "small business ai receptionist",
    ],
    related: [
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "Is an AI Receptionist Worth It?", href: "/resources/is-ai-receptionist-worth-it" },
      { label: "AI Receptionist vs Answering Service", href: "/compare/ai-receptionist-vs-answering-service" },
      { label: "AI Receptionist Cost", href: "/resources/ai-receptionist-cost" },
    ],
    faqs: [
      {
        q: "How much does an AI receptionist cost in Canada?",
        a: `It depends on the model: subscription apps, human answering services and done-for-you setups all price differently, so compare current published terms. ${PHONE_PRICE_SENTENCE}`,
      },
      {
        q: "Can an AI receptionist handle complex booking logic?",
        a: "Handbuilt's standard receptionist does not book: it qualifies the caller (job type, urgency, service area) and records a callback request. Calendar booking is quoted separately.",
      },
      {
        q: "Will callers know they are talking to AI?",
        a: "Modern AI voices are natural-sounding, but most callers can tell. Transparency is generally better — a brief disclosure at the start builds trust rather than eroding it.",
      },
      {
        q: "Do I need a Canadian provider?",
        a: "Not necessarily, but if your industry has data-residency requirements (healthcare, legal), ask where call recordings and caller data are stored. Handbuilt is based in Surrey, BC.",
      },
      {
        q: "What if the AI cannot help a caller?",
        a: "A well-built receptionist should be able to transfer to a live person, take a message, or offer a callback. Ask any provider how they handle edge cases before committing.",
      },
      {
        q: "How long does it take to set up?",
        a: "Self-serve apps can be live quickly if you configure them yourself. A Handbuilt receptionist's timeline depends on your phone provider and forwarding; it goes live only after test calls pass.",
      },
    ],
    schema: "Comparison" as const,
  },

  {
secondaryCta: {
  "label": "Understand the cost components",
  "href": "/resources/ai-receptionist-cost"
},
updatedAt: "2026-09-27",
gets: [],
comparison: {
  "alternativeLabel": "Subscription or human service",
  "rows": [
    {
      "factor": "Fit",
      "handbuilt": "One business, one number, one routing flow and one language, set up for you.",
      "alternative": "Evaluate the specific provider's supported tasks and handoff."
    },
    {
      "factor": "Costs",
      "handbuilt": `${PHONE_SETUP_PRICE} CAD setup, then ${PHONE_MONTHLY_PRICE} CAD/month with ${phonePlan.includedMinutes} minutes included; ${PHONE_OVERAGE_PRICE}/extra minute. Taxes extra.`,
      "alternative": "Check current setup, recurring, usage and cancellation charges."
    },
    {
      "factor": "Maintenance",
      "handbuilt": `Operation, maintenance, fault correction and up to ${phonePlan.includedChangeMinutes} minutes of small changes a month included.`,
      "alternative": "Provider support and business responsibilities defined by its terms."
    },
    {
      "factor": "Contract",
      "handbuilt": "Month-to-month.",
      "alternative": "Check the cancellation terms."
    }
  ]
},
scenario: "Illustrative comparison: you need after-hours phone message-taking with a human callback. A web-chat package does not meet that requirement by itself. Compare phone-capable proposals against the same call scenarios and the same expected usage before evaluating their cost.",
    slug: "ai-receptionist-pricing-canada",
    eyebrow: "Compare",
    h1: "What Does an AI Receptionist Actually Cost in Canada?",
    title: "AI Receptionist Pricing in Canada: Compare the Options",
    description: "Compare an AI subscription, a custom intake build and human answering by channel, included usage, support, currency and exit terms.",
    answer: `Compare Canadian AI receptionist options by the same job: which channel they handle, what usage is included, how they reach a person and who supports failures. A subscription, a done-for-you setup and a human answering service may have very different scope. ${PHONE_PRICE_SENTENCE}`,
    pain: "Prices that refer to different channels, usage limits and support arrangements are not directly comparable.",
    sections: [
  {
    "heading": "Option one: an existing subscription",
    "body": "An existing product can be a practical choice when its supported workflow matches the business. Check the included channel, usage allowance, overage charges and integration limits in the current vendor terms. Ask what you retain when you cancel.\n\nDo not assume every subscription is restrictive or every integration works. Test the specific service against your own questions and handoff requirements."
  },
  {
    "heading": "Option two: a done-for-you AI receptionist",
    "body": `Handbuilt's AI Phone Receptionist is set up for you and run for a monthly fee. ${PHONE_SCOPE_SENTENCE}\n\n${PHONE_MONTHLY_SENTENCE} ${PHONE_EXCLUSIONS_SENTENCE}`
  },
  {
    "heading": "Option three: human answering",
    "body": "A human answering service may suit requests that need flexibility or a personal conversation. Check its current availability, scripts, escalation, pricing basis and what information it sends back to you. A person answering still needs accurate business instructions.\n\nCompare the same representative scenarios across options, including an unclear enquiry, a request outside your service area and a caller asking for the owner."
  },
  {
    "heading": "Use a like-for-like quote checklist",
    "body": "State the required channel, expected usage, service hours and integrations. Ask each provider to identify setup, recurring and variable charges; currency; support; cancellation; and access ownership. Review the actual terms rather than relying on an old comparison table.\n\nChoose the option that fits the work and your ability to maintain it. There is no vendor price range or universal cheapest option established by this page."
  }
],
    packageId: "phone",
    ctaLabel: "Request an option review",
    keywords: [
      "ai receptionist pricing canada",
      "ai receptionist cost",
      "how much does ai receptionist cost",
      "ai phone answering pricing",
      "ai receptionist canada price",
    ],
    related: [
  {
    "label": "AI receptionist costs",
    "href": "/resources/ai-receptionist-cost"
  },
  {
    "label": "AI receptionist service",
    "href": "/ai-receptionist"
  },
  {
    "label": "Is it worth it?",
    "href": "/resources/is-ai-receptionist-worth-it"
  },
  {
    "label": "Current build packages",
    "href": "/pricing"
  }
],
    faqs: [
  {
    "q": "Are prices on this page in Canadian dollars?",
    "a": "Handbuilt's prices are in CAD, taxes extra. Other providers' quotes must be checked for their stated currency."
  },
  {
    "q": "Which option is cheapest?",
    "a": "That depends on the actual scope, usage, support and current terms. This page does not claim a universally cheapest provider."
  },
  {
    "q": "Are there ongoing fees with Handbuilt's receptionist?",
    "a": `Yes. ${PHONE_MONTHLY_SENTENCE} Phone and AI usage for the first ${phonePlan.includedMinutes} minutes is included in that fee.`
  }
],
    schema: "Comparison" as const,
  },

  {
    slug: "ai-automation-agency-pricing",
    eyebrow: "Compare",
    h1: "What Does AI Automation Actually Cost in Canada?",
    title: "AI Automation Pricing: What It Actually Costs",
    description:
      "What AI automation costs in Canada across pricing models: hourly agencies, monthly retainers, SaaS tools, and fixed-price builds. Handbuilt: $1,500–$10,000+ CAD.",
    answer:
      "AI automation pricing in Canada varies widely by model. Hourly agencies typically charge around $100–$250+/hr, monthly retainers range from roughly $1,000 to $10,000+/mo, SaaS automation subscriptions run about $20–$500+/mo, and fixed-price builds like Handbuilt range from $1,500–$10,000+ CAD one-time. The best model depends on scope, whether you need ongoing changes, and how much you want to own.",
    pain: "You have been quoted everything from $500 to $50,000 for AI automation and have no frame of reference for what is reasonable.",
    sections: [
      {
        heading: "Hourly agencies and freelancers",
        body: "The traditional model. You pay for time, not outcomes. AI-focused agencies and freelancers in Canada typically charge around $100–$250+/hr at time of writing, though rates vary based on seniority and specialization.",
        bullets: [
          "Typical range: ~$100–$250+/hr",
          "Good for ongoing, evolving projects where scope is hard to define upfront",
          "Risk: hours can expand beyond your budget if scope is not tightly managed",
          "You may or may not own the resulting code depending on the contract",
        ],
      },
      {
        heading: "Monthly retainers",
        body: "Some agencies and consultancies offer a fixed monthly fee for a set number of hours or deliverables. Retainers in Canada for AI automation work generally range from around $1,000 to $10,000+/mo depending on the agency and scope.",
        bullets: [
          "Typical range: ~$1,000–$10,000+/mo",
          "Predictable monthly spend with some flexibility on what gets built",
          "Best for businesses that need ongoing automation work month over month",
          "Watch for retainers where you are paying for availability, not output",
        ],
      },
      {
        heading: "SaaS automation platforms",
        body: "Tools like Zapier, Make, and similar platforms let you build automations yourself with a visual interface. Subscription costs typically range from about $20 to $500+/mo depending on the platform, plan tier, and number of tasks or operations.",
        bullets: [
          "Typical range: ~$20–$500+/mo (platform subscription)",
          "Fast to set up for simple, linear workflows",
          "Limited when you need custom logic, AI reasoning, or complex branching",
          "You are renting the platform — your automations live there, not with you",
        ],
      },
      {
        heading: "Fixed-price custom builds",
        body: "A builder scopes the project, quotes a fixed price, and delivers a working system. Handbuilt operates this way: $1,500 CAD for a single AI worker (Starter), $3,500–$7,500 for multi-worker systems (Business), and $10,000+ for full custom AI applications. You own the result. Optional Care Plan at $99/mo if you want ongoing maintenance.",
        bullets: [
          "Handbuilt Starter: $1,500 CAD (1 worker, ~5 days)",
          "Handbuilt Business: $3,500–$7,500 CAD (2–4 workers, 2–3 weeks)",
          "Handbuilt Custom App: from $10,000 CAD",
          "Optional Care Plan: $99/mo for ongoing maintenance",
          "You own the code — no platform lock-in",
        ],
      },
      {
        heading: "How to compare quotes",
        body: "When you get quotes from different providers, make sure you are comparing the same things.",
        bullets: [
          "One-time vs recurring — a $3,000 one-time build is very different from $3,000/mo",
          "What is included — does the quote cover training, testing, and deployment?",
          "Ownership — do you own the code, or are you licensing it?",
          "Ongoing costs — hosting, API usage, and maintenance are separate from the build",
          "Scope — how many automations, integrations, or AI workers are included?",
          "Change requests — what happens when you need to adjust something after delivery?",
        ],
      },
      {
        heading: "Best for / Not best for (Handbuilt fixed-price)",
        body: "Fixed-price works well when you know what you want built, you want a predictable cost, and you prefer owning the result. It is not the best fit if your needs are truly undefined and evolving weekly, or if you need a large team working full-time on an ongoing platform.",
      },
    ],
    packageId: "business",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "ai automation pricing canada",
      "ai automation cost",
      "ai automation agency pricing",
      "how much does ai automation cost",
      "ai automation agency canada",
    ],
    related: [
      { label: "AI Automation Agency", href: "/ai-automation-agency" },
      { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
      { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" },
      { label: "Custom AI vs SaaS", href: "/compare/custom-ai-tool-vs-saas" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Why is the price range so wide across providers?",
        a: "AI automation covers everything from a simple email notification to a full AI agent handling customer interactions. A one-trigger Zapier flow and a custom AI receptionist with CRM integration are different orders of complexity.",
      },
      {
        q: "Is fixed-price or hourly better?",
        a: "Fixed-price is better when you can define the scope upfront. Hourly is better when the project is exploratory and the scope will shift. If a provider cannot give you a fixed quote, it may mean the scope is genuinely unclear — or that they prefer open-ended billing.",
      },
      {
        q: "What ongoing costs should I expect after the build?",
        a: "Hosting, AI API usage, and any third-party services (telephony, email sending, etc.). For a small business, these typically run $20–$100/mo. Handbuilt offers an optional $99/mo Care Plan if you want someone maintaining it for you.",
      },
      {
        q: "Can I start small and expand later?",
        a: "Yes. Handbuilt’s Starter tier ($1,500) gets you one working AI automation. If it delivers value, you can add more workers or upgrade to a Business build without starting over.",
      },
      {
        q: "Do I own the code?",
        a: "At Handbuilt, yes — you own everything that is built. Not all agencies work this way. Always clarify code ownership before signing a contract.",
      },
    ],
    schema: "Comparison" as const,
  },

  {
    slug: "make-vs-zapier-vs-custom-ai-automation",
    eyebrow: "Compare",
    h1: "Make vs Zapier vs Custom AI: Picking the Right Automation",
    title: "Make vs Zapier vs Custom AI: Which to Pick",
    description:
      "Zapier vs Make vs custom AI automation: honest comparison of cost, flexibility, and ownership to help you pick the right automation approach for your business.",
    answer:
      "Zapier is best for quick, linear automations with minimal setup. Make handles visual multi-step workflows at a lower per-task cost at higher volumes. A custom AI build offers full logic control, AI reasoning, and ownership — best when off-the-shelf connectors cannot handle your workflow. Most small businesses start with Zapier or Make, then consider custom when they hit the platform’s limits.",
    pain: "You are automating more and more with Zapier or Make, but costs are climbing and you keep hitting limits on what the platform can do.",
    sections: [
      {
        heading: "Zapier: quick, linear, no-code",
        body: "Zapier is the most popular automation platform for a reason — it is fast to set up and connects to thousands of apps. It works best for simple trigger-action workflows: when X happens, do Y.",
        bullets: [
          "Best for: straightforward automations (new form submission → add to CRM → send email)",
          "Pricing: free tier available; paid plans typically start around $20–$30/mo and scale with task volume (at time of writing)",
          "Strengths: huge app library, minimal learning curve, reliable for simple flows",
          "Limits: gets expensive at high task volumes; complex branching and conditional logic can be clunky; AI capabilities are add-ons, not native",
          "Ownership: your automations live on Zapier — if you leave, you rebuild elsewhere",
        ],
      },
      {
        heading: "Make (formerly Integromat): visual, multi-step, cheaper at volume",
        body: "Make gives you a visual canvas for building automations with branching, loops, and error handling. It is more flexible than Zapier for complex workflows and generally cheaper per operation at higher volumes.",
        bullets: [
          "Best for: multi-step workflows with conditionals (if job type is X, route to calendar A; otherwise send a quote)",
          "Pricing: free tier available; paid plans typically start around $9–$16/mo with more operations per dollar than Zapier (at time of writing)",
          "Strengths: visual flow builder, better for complex logic, more cost-effective at scale",
          "Limits: steeper learning curve than Zapier; still constrained to the connectors and modules available; AI features are evolving but not as mature as dedicated AI tooling",
          "Ownership: same as Zapier — your workflows live on the platform",
        ],
      },
      {
        heading: "Custom AI build: full control and ownership",
        body: "A custom build means a developer writes automation code tailored to your exact workflow, with full AI capabilities (natural language processing, decision-making, context awareness) baked in from the start. Handbuilt builds these at fixed prices in CAD.",
        bullets: [
          "Best for: workflows that need AI reasoning (qualifying leads, interpreting unstructured requests, making routing decisions based on context), or workflows where Zapier/Make connectors do not exist",
          "Handbuilt pricing: Starter $1,500 (1 automation, ~5 days); Business $3,500–$7,500 (multi-workflow system); Custom App from $10,000",
          "Strengths: full logic control, native AI, you own the code, no per-task platform fees",
          "Limits: higher upfront cost; requires a builder; changes need development work (or the $99/mo Care Plan)",
          "Ownership: you own everything — the code, the data, the deployment",
        ],
      },
      {
        heading: "When to stay on Zapier or Make",
        body: "If your automations are working, your costs are manageable, and you are not hitting platform limits, there is no reason to switch. Many businesses run happily on Zapier or Make for years. Custom makes sense when the platform is costing more than the build would, when you need AI that the platform does not offer, or when you want to stop renting and start owning.",
      },
      {
        heading: "When to go custom",
        body: "Consider a custom build when you run into one or more of these situations.",
        bullets: [
          "Your monthly Zapier/Make bill exceeds what a one-time build would cost",
          "You need AI to interpret, decide, or generate — not just move data between apps",
          "The connector you need does not exist, or the existing one is too limited",
          "You want to own the automation and not depend on a third-party platform’s pricing changes",
          "Your workflow has complex branching that is painful to maintain in a visual builder",
        ],
      },
      {
        heading: "Can you use them together?",
        body: "Yes. Some businesses keep simple automations on Zapier or Make while building custom AI for the workflows those platforms cannot handle. There is no rule that says you have to pick one approach for everything.",
      },
    ],
    packageId: "business",
    ctaLabel: "Get a fixed quote",
    keywords: [
      "make vs zapier vs custom ai",
      "zapier vs make",
      "custom ai automation vs zapier",
      "zapier alternative custom build",
      "make vs zapier for small business",
    ],
    related: [
      { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
      { label: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
      { label: "AI Automation Examples for Small Business", href: "/resources/ai-automation-examples-for-small-business" },
    ],
    faqs: [
      {
        q: "Is Zapier or Make better for a small business?",
        a: "For simple automations, Zapier is easier to start with. For more complex workflows or higher volumes, Make is usually more cost-effective. Both are solid choices — it depends on your workflow complexity and budget.",
      },
      {
        q: "When does custom become cheaper than Zapier or Make?",
        a: "When your monthly platform bill consistently exceeds the one-time build cost divided over your expected usage period. If you are paying $200/mo on Zapier, a $1,500 Starter build pays for itself in about eight months and a $3,500 Business build in about eighteen.",
      },
      {
        q: "Can a custom build do everything Zapier does?",
        a: "In principle, yes — custom code can connect to any API. In practice, Zapier’s pre-built connectors save time for simple integrations. Custom is stronger for complex logic and AI; Zapier is stronger for quick connector-based flows.",
      },
      {
        q: "What if I outgrow Zapier later?",
        a: "You can migrate specific workflows to custom without abandoning Zapier entirely. Handbuilt can rebuild your most complex or expensive automations as owned code while you keep the simple ones on Zapier.",
      },
      {
        q: "Does Handbuilt maintain custom automations after delivery?",
        a: "Optionally. The $99/mo Care Plan covers ongoing maintenance, monitoring, and changes. Without it, you own the code and can maintain it yourself or hire anyone to update it.",
      },
      {
        q: "Can AI automations handle tasks that Zapier and Make cannot?",
        a: "Yes. AI can interpret unstructured text (emails, voicemails, form submissions), make judgment calls (qualify a lead, categorize a request), and generate responses — tasks that rule-based connectors are not designed for.",
      },
    ],
    schema: "Comparison" as const,
  },
];

export function getComparison(slug: string): LandingContent | undefined {
  return comparisons.find((c) => c.slug === slug);
}
