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
          "Business ($3,500–$7,500): Multi-step system — e.g. AI receptionist + CRM sync + follow-up emails. Includes integrations with your existing tools.",
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
      { label: "What an AI Receptionist Is", href: "/ai-receptionist" },
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
        a: "Yes. Most people start with one tool — a chatbot or intake form — and add automations over time. It's usually cheaper to build the foundation right the first time, but starting small is a reasonable way to test before committing to a larger system.",
      },
    ],
    schema: "Article",
    icon: "Receipt",
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
  description: "What AI call answering actually costs in Canada — one-time builds, monthly subscriptions and per-minute answering services compared, including the fees that are easy to miss.",
  answer: "In Canada an AI receptionist arrives in three price shapes. Subscription tools run roughly $49–299/mo, often with per-minute overages and a setup fee of $75–1,500. Traditional human answering services bill per minute or per call, commonly $200–500/mo at low volume and far more as you grow. A custom build is a one-time fee — from $1,500 CAD for a single worker, or $3,500–$7,500 for a connected system — with no platform licence afterwards. Which is cheapest depends almost entirely on your call volume and how long you plan to keep it.",
  pain: "Every vendor quotes a different unit — per month, per minute, per call, per resolution — so nothing is comparable and the number on the pricing page is rarely the number on the invoice.",
  sections: [
    {
      heading: "The three price shapes, and how to compare them",
      body: "The trick is to convert everything to a twelve-month figure before you compare anything, because the three models are designed to look cheap at different moments.",
      bullets: [
        "Subscription (Numa, Rosie, Goodcall, Smith.ai; in Canada Benny from about $99/mo, Mihron about CA$299/mo, VoiceFleet about CA$149/mo): roughly $49–299/mo plus overages. Cheapest to start, cancellable, and the bill moves with your call volume.",
        "Platform-bundled (Jobber's AI Receptionist at $99/mo, free on their Plus plan at roughly $499–599/mo; Housecall Pro's built-in features inside $59–329/mo): cheap if you already pay for the platform, useless outside it.",
        "Human answering service: billed per minute or per call, commonly $200–500/mo for light coverage. Best judgment on the line, worst scaling — volume is exactly what makes it expensive.",
        "Custom build: from $1,500 CAD once for a single worker, $3,500–$7,500 for a connected system. Highest day-one cost, no licence afterwards.",
      ],
    },
    {
      heading: "The fees that are easy to miss",
      body: "Almost every complaint about AI answering pricing traces back to one of four line items rather than the headline number.\n\nPer-minute overages are the big one. A plan with a bundle of included minutes prices your quiet month accurately and your busy month badly — and busy months are exactly when you are least able to notice a bill. Setup fees in this category run anywhere from $75 to $1,500 and are frequently not on the pricing page at all. Per-resolution billing, which some support-focused products use, means a spike in inbound genuinely does mean a spike in cost. And on a custom build the equivalent line is model usage — you pay the AI provider directly, typically $5–50/month at local-business call volumes, which is small but is not zero.\n\nBefore signing anything, ask for the per-minute rate, the overage rate, the setup fee, and what happens in a month with double your normal calls. A vendor who will not answer those four in writing is telling you something.",
    },
    {
      heading: "Where the arithmetic actually lands",
      body: "A subscription at $99/mo is $1,188 over a year, before overages. At $149/mo it is $1,788, and at CA$299/mo it is $3,588. A single-worker custom build is $1,500 CAD once.\n\nSo in year one a subscription is usually cheaper or level. The custom build wins from roughly year two onward, and it wins harder the longer you trade. That means the honest question is not 'which is cheaper' but 'how confident am I that this business is still running this system in three years, and how much do I care about owning it?' If the answer is 'not very', rent it. This page would rather say that than sell you a build you should not buy.",
    },
    {
      heading: "What drives the build price",
      body: "Scope, in four dimensions: how many scenarios it has to handle (FAQs, booking, quoting, emergency routing), whether it connects to a calendar or CRM, whether it handles voice as well as chat, and how many service areas and service types it needs to keep straight. Voice is the expensive one — a phone system has latency, interruption and audio-quality problems that a chat widget simply does not have.\n\nA straightforward chat receptionist for a single-trade contractor lands around $1,500. A phone-and-chat system with live calendar booking and lead logging is a Business AI System at $3,500–$7,500 CAD.",
    },
    {
      heading: "Best For / Not Best For",
      body: "A custom build fits when you regularly miss after-hours calls, answer the same questions daily, and expect to keep the system for years. It is the wrong purchase under roughly 20 calls a month, where every call needs nuanced human judgment, or where complaints are the normal inbound. At low volume a cancellable subscription is genuinely the better buy.",
    }
  ],
  packageId: "starter",
  ctaLabel: "Get a quote",
  keywords: ["ai receptionist cost", "ai receptionist price canada", "how much does an ai receptionist cost", "ai phone answering cost", "answering service cost canada", "ai answering service pricing"],
  related: [
    { label: "Is an AI Receptionist Worth It?", href: "/resources/is-ai-receptionist-worth-it" },
    { label: "AI Receptionist vs Virtual Receptionist", href: "/compare/ai-receptionist-vs-virtual-receptionist" },
    { label: "AI Receptionist vs Answering Service", href: "/compare/ai-receptionist-vs-answering-service" },
    { label: "AI Receptionist Pricing in Canada", href: "/compare/ai-receptionist-pricing-canada" },
    { label: "Free missed-call revenue calculator", href: "/tools/missed-call-revenue-calculator" },
    { label: "Can AI Answer Business Phone Calls?", href: "/resources/can-ai-answer-business-phone-calls" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "Is there a monthly fee for a custom-built AI receptionist?",
      a: "No platform fee — you own the build. The ongoing costs are model usage billed by the AI provider directly (typically $5–50/month at local-business volumes) and the optional Care Plan at $99/month CAD if you want it monitored and updated for you."
    },
    {
      q: "What is included in a $1,500 AI receptionist build?",
      a: "One AI worker trained on your FAQs, hours, services and service area, handling inbound inquiries, qualifying and either capturing or routing the contact. Roughly five business days to live. What it does not include is voice telephony on a complex multi-line setup — that is Business AI System scope."
    },
    {
      q: "Do I pay per call or per minute?",
      a: "Not to Handbuilt. That model belongs to the subscription and answering-service options, and it is the line item worth scrutinising there — ask specifically about the overage rate, not just the included minutes."
    },
    {
      q: "Is a subscription cheaper long-term?",
      a: "In year one, usually yes or close to level. A $99/mo plan is $1,188 a year against $1,500 once. From year two the build is ahead, and further ahead every year after. Genuinely depends on how long you expect to run it."
    },
    {
      q: "How do I work out what this is worth to me before I spend anything?",
      a: "Run the missed-call revenue calculator on this site. It runs in your browser, nothing is sent anywhere, and it takes about five minutes. If the number it gives you is small, that is a real answer and you should not buy any of this yet."
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
  description: "Honest ROI framing for Canadian service businesses: when an AI receptionist pays off, the two cases where the answer is no, and how to run the break-even yourself.",
  answer: "An AI receptionist is worth it for a service business that regularly misses after-hours calls, answers the same handful of questions every day, and loses work to whoever picks up first. It is not worth it below roughly 20 inbound calls a month, or where every call is a bespoke consultation. Break-even is normally one or two recovered jobs — which makes it a calculation about your average job value, not a matter of opinion.",
  pain: "You're missing calls while you're on a job, sleeping, or just busy — and you have no idea how many leads those missed calls represent.",
  sections: [
    {
      heading: "When It Pays Off",
      body: "An AI receptionist earns its keep when you are structurally unavailable — on a job, up a ladder, after hours, on a weekend. It earns it again when a real share of your calls are the same four questions: what do you charge, do you cover my area, when could you come, do you do this kind of work. Those are answerable from a config file, and answering them at 8pm is worth more than answering them well."
    },
    {
      heading: "Run the break-even yourself, in five minutes",
      body: "The arithmetic is simple enough that nobody should be quoting you a payback period. Take a $1,500 build with model usage running $5–50/month. Divide $1,500 by your average job value. That is how many recovered jobs it takes to pay for itself — for a business with an $800 average job, two of them.\n\nThen the real question: do you miss two jobs' worth of calls in a reasonable payback window? The missed-call revenue calculator on this site does exactly this, runs entirely in your browser, and sends nothing anywhere. Any specific payback figure quoted at you by a vendor who has not seen your call log is invented."
    },
    {
      heading: "Two businesses where the answer is no",
      body: "Being specific about this, because 'it depends' is not an answer.\n\nThe first is genuinely low volume. A shop taking fifteen calls a month, most of which it answers, is not losing enough to justify a build. A cancellable subscription is the better purchase, and possibly nothing at all is better still.\n\nThe second is the bespoke consult. If every inbound call is a long, exploratory conversation where the value is your judgment — a designer, a specialist trade quoting unusual work, anything where the caller is buying you specifically — an AI front door removes the thing they called for. Screening those calls costs more than the calls you miss.\n\nThere is a softer third case: a business whose customers are heavily non-English-speaking. English is what this handles reliably. Other languages are possible but should be tested against real calls before you commit, not after."
    },
    {
      heading: "What running one on a real line actually taught",
      body: "This is not theoretical here. A self-hosted AI phone receptionist was built and put on the live business line of a cedar-fence contracting business in July and August 2026. Three things it taught, none of which appear in vendor marketing:\n\nThe telephony breaks before the AI does. For several days, calls arrived as zero-second no-answers while the system itself was provably healthy — a delivery problem upstream of the software entirely. One caller tried fourteen times and never got through. If you take nothing else from this page: the AI is the least fragile part of an AI phone system.\n\nYour model can be retired underneath you. In August the provider retired the default model, and the result was an agent that answered, delivered its greeting, and then went dead mid-call — the worst possible failure, because the caller believes they have reached someone. Anything you buy or build needs monitoring that catches a silent agent, not just a down one.\n\nAnd the honest conclusion: as of late August 2026 the AI is out of the call path on that line, deliberately. It rings a real phone first. That is not a verdict that AI answering does not work — it is a verdict that on a business where every call is a several-thousand-dollar quote, the failure cost outweighed the coverage benefit while the reliability was still being established. Your volume and job value may put you on the other side of that line. That is the calculation."
    },
    {
      heading: "Best For / Not Best For",
      body: "A plain summary of who this fits and who it doesn't.",
      bullets: [
        "Best for: trades, home services, clinics and salons — high call volume, repeatable questions, and someone who cannot pick up because they are working.",
        "Not best for: under about 20 calls a month, businesses where every call is a custom consultation, or where the caller is specifically buying access to the owner.",
      ]
    }
  ],
  packageId: "starter",
  ctaLabel: "Talk it through",
  keywords: ["is ai receptionist worth it", "ai receptionist roi", "ai receptionist small business", "virtual receptionist worth it canada"],
  related: [
    { label: "How Much Does an AI Receptionist Cost?", href: "/resources/ai-receptionist-cost" },
    { label: "AI Receptionist vs Virtual Receptionist", href: "/compare/ai-receptionist-vs-virtual-receptionist" },
    { label: "AI Receptionist vs Answering Service", href: "/compare/ai-receptionist-vs-answering-service" },
    { label: "Free missed-call revenue calculator", href: "/tools/missed-call-revenue-calculator" },
    { label: "Can AI Answer Business Phone Calls?", href: "/resources/can-ai-answer-business-phone-calls" },
    { label: "AI Receptionist", href: "/ai-receptionist" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "What if I only get a few calls per week?",
      a: "Then the build is probably the wrong purchase and a cancellable subscription is the right one. The exception is high job value — if those few calls are five-figure work and you genuinely miss them, one recovered job changes the arithmetic entirely. Run the calculator rather than guessing."
    },
    {
      q: "Will customers know they're talking to an AI?",
      a: "They should, and it should say so in the first sentence — \"Hi, I'm the AI assistant for XYZ Plumbing\". Disclosing costs almost nothing and being caught not disclosing costs a great deal. It also gives the caller an obvious way to ask for a person, which is information you want."
    },
    {
      q: "What happens when the AI can't handle the call?",
      a: "It transfers, takes a message, or books a callback — you define which, per scenario, during setup. The boundaries are worth more thought than the greeting: an agent that guesses at the edge of its knowledge is worse than one that hands off early."
    },
    {
      q: "Is there a risk the AI gives wrong information?",
      a: "Yes, and the mitigation is scope rather than cleverness. It answers from the services, pricing ranges, hours and service area you supply, and it should be configured to say it does not know rather than improvise. The commonest real-world cause of a wrong answer is not the model — it is a price you changed six months ago and never updated in the config."
    },
    {
      q: "What's a realistic payback timeline?",
      a: "Divide the build cost by your average job value to get the number of recovered jobs needed, then check that against how many calls you actually miss. No honest figure can be quoted here without your call log — anyone offering one is guessing."
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
  description: "Yes — and here is what that actually looks like in practice, written from putting one on a real trades business line: what it handles, the four ways it breaks, and what it costs.",
  answer: "Yes. An AI voice agent can answer an inbound business call, greet the caller by your business name, answer the questions you have given it, qualify the job, capture the details and book into a connected calendar — around the clock, with no hold. The honest limits are that complex, emotional or high-stakes calls should route to a person, that it handles English reliably and other languages less so, and that the telephony around it fails more often than the AI does.",
  pain: "Every vendor page says yes and stops there. What a business owner needs to know is what it does when the audio is bad, when the caller talks over it, when it does not know the answer, and who gets told when it silently stops working.",
  sections: [
    {
      heading: "What AI Can Handle on a Business Call",
      body: "The routine inbound call is genuinely solved. What it does well is the shape of call that has a right answer sitting in a config file.",
      bullets: [
        "Answer immediately — no hold music, no voicemail.",
        "Greet the caller with your business name and a natural opening.",
        "Answer FAQs: hours, service area, pricing ranges, availability.",
        "Qualify: what service, what location, what timeline, how urgent.",
        "Capture name, number and job details for a callback.",
        "Book into your calendar if it is connected to a booking tool.",
        "Send a follow-up text with confirmation or next steps.",
      ]
    },
    {
      heading: "How it actually works under the hood",
      body: "Three models in a loop, plus telephony. Speech-to-text hears the caller, a language model decides what to say, text-to-speech says it — and the whole thing sits behind a phone line, which is the part most descriptions skip.\n\nA build of this shape put on a real cedar-fence business line in 2026 ran Deepgram for speech recognition, a hosted model for the reasoning, Deepgram's voice for playback, and Asterisk with a SIP trunk for the phone side. The business-specific part was not code — it was one configuration file per business, holding the services offered, the services explicitly NOT offered, the service areas, the FAQs, and the rules for when to book, when to take an estimate request, and when to escalate.\n\nThat 'services explicitly not offered' list is the single most useful field in the whole config. An agent that confidently says yes to work you do not do creates a worse problem than a missed call."
    },
    {
      heading: "The four ways it breaks in real life",
      body: "This section exists because vendor pages do not have one. All four were observed running an AI receptionist on a live trades line through July and August 2026.\n\nOne: the telephony fails before the AI does. For several days, calls arrived as zero-second no-answers while the agent itself was healthy — a delivery failure upstream of the software. One caller tried fourteen separate times and never got through. Nothing in the AI stack would have told you; only the carrier's call detail records did.\n\nTwo: your model gets retired underneath you. A provider deprecated the default model mid-August and the agent started answering, delivering its greeting, and then going silent mid-call. That is the worst failure mode available, because the caller believes they have reached a business. It ran that way for days before it was caught.\n\nThree: callers hang up during the greeting. Some people will not talk to a machine, and a seven-second call is a real outcome you should expect a share of.\n\nFour: bad audio and talk-over. Cell reception on a job site, hands-free in a truck, or a caller who interrupts mid-sentence all degrade recognition. Accents and trade vocabulary compound it.\n\nThe practical conclusion: whatever you buy or build needs monitoring that detects a silent agent, not just an offline one, and it needs a human fallback that triggers on failure rather than on request."
    },
    {
      heading: "Where AI Falls Short",
      body: "It is not a replacement for judgment. It struggles with genuinely complex or custom requests needing real-time problem solving, with emotionally charged calls — complaints, disputes, emergencies — and with callers who simply refuse to engage with an automated system. It is also weak where the relationship is the product and the caller rang specifically to speak to you.\n\nOn languages, the honest position is English reliably and everything else with testing. If a meaningful share of your callers speak another language, that needs testing against real calls before you commit rather than after."
    },
    {
      heading: "What it costs",
      body: "Three shapes. Subscription answering products run roughly $49–299/mo, usually with per-minute overages and a setup fee. Platform-bundled options like Jobber's are $99/mo if you already pay for the platform. A custom build is one-time from $1,500 CAD for a single worker, then model usage of roughly $5–50/month at local-business volumes. The full comparison, including the fees that are easy to miss, is on the cost page."
    },
    {
      heading: "Best For / Not Best For",
      body: "A straightforward summary of where AI phone answering makes sense.",
      bullets: [
        "Best for: consistent inbound volume, repetitive questions, and real after-hours missed calls.",
        "Not best for: mostly-complex consultations, emotionally sensitive work, or a business where every call needs the owner's judgment.",
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
    { label: "AI Receptionist Setup", href: "/ai-receptionist" },
    { label: "AI Receptionist vs Answering Service", href: "/compare/ai-receptionist-vs-answering-service" },
    { label: "AI Receptionist", href: "/ai-receptionist" }
  ],
  faqs: [
    {
      q: "Is an AI voice agent the same as a traditional phone menu (IVR)?",
      a: "No — an IVR presents a rigid menu (\"press 1 for sales\"). An AI voice agent holds a conversation, understands natural language, and responds dynamically. Callers speak normally instead of pressing numbers."
    },
    {
      q: "How fast does it answer, and how fast does it reply?",
      a: "It picks up on the first ring — that part is telephony, not AI. The reply latency between the caller finishing a sentence and the agent starting to speak is where the experience is won or lost, and it depends on the speech, language and voice models in the chain. No specific figure is quoted here because it has not been measured on a standard benchmark; ask any vendor for their number and then test it on a real call from a cell phone, not a desk line."
    },
    {
      q: "Can the AI call back missed calls automatically?",
      a: "Yes, if configured. A missed call can trigger a callback or an immediate SMS within minutes, introducing itself as the business's AI assistant and either gathering details or routing to a person."
    },
    {
      q: "Will it sound robotic?",
      a: "Current voice models are clearly intelligible and professional, and better than most people expect. They are not indistinguishable from a person and there is no reason to aim for that — opening with \"I'm the AI assistant for…\" sets the expectation honestly and gives the caller an easy way to ask for a human."
    },
    {
      q: "What languages can it handle?",
      a: "English reliably. Some platforms handle French or Spanish at reasonable quality. For a multilingual customer base this is worth testing against real calls before committing, because accents, code-switching and trade vocabulary are exactly where recognition degrades."
    },
    {
      q: "Can it handle emergency calls?",
      a: "It can detect emergency intent — a gas leak, a flood, no heat in winter — and transfer immediately to a person. It should never be the last line of defence for a genuine emergency. Configure an explicit escalation path and say at the start of the call that emergencies transfer straight through."
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
    { label: "AI Automation Examples for Small Business", href: "/resources/ai-automation-examples-for-small-business" },
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
    { label: "AI Automation Examples for Small Business", href: "/resources/ai-automation-examples-for-small-business" },
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
    },
    {
      q: "Does it know when to hand the lead to me?",
      a: "It hands off on rules you set, not on judgement. The usual triggers are: the lead replies at all, they ask about price beyond your published range, they mention a deadline or an emergency, or they type something the sequence has no answer for. Anything that fires a handoff stops the sequence and pings you. Automation does the chasing; you do the closing."
    }
  ],
  schema: "Article"
},
  {
    slug: "can-ai-clone-my-voice-legally",
    eyebrow: "Creator Guide",
    h1: "Can AI Clone My Voice Legally?",
    title: "Can AI Clone My Voice Legally? Consent & Rights | Handbuilt",
    description:
      "Cloning your own voice with consent is legitimate and common. Here's how voice cloning works legally for creators — consent, disclosure, platform rules and control.",
    answer:
      "Yes — cloning your own voice, with your consent, is legitimate and increasingly common for scaling narration. The legal lines are about consent and deception: cloning your own voice (or one you have explicit written rights to) is fine; cloning someone else's voice without permission, or using a clone to deceive, is not. Laws on voice and likeness vary by region.",
    sections: [
      {
        heading: "The rules that actually matter",
        body: "Voice-cloning problems are almost always consent and disclosure problems, not technology problems.",
        bullets: [
          "Clone only your own voice, or one you have explicit written permission to use",
          "Never use a clone to impersonate or deceive people",
          "Disclose synthetic audio where a platform or your audience expects it",
          "Keep control — approve outputs, and be able to revoke access",
        ],
      },
      {
        heading: "How we build it",
        body: "Handbuilt builds consent-first voice workflows: you record and approve a sample, scripts render in your voice for your review before anything publishes, and you control where it's used. We won't build impersonation or non-consensual clones. This is general information, not legal advice — confirm specifics for your jurisdiction.",
      },
    ],
    keywords: ["can ai clone my voice legally", "is voice cloning legal", "ai voice cloning consent", "legal ai voice for creators"],
    related: [
      { label: "AI Voice Cloning Workflow (Consent-First)", href: "/creators/ai-voice-cloning-workflow" },
      { label: "AI Text-to-Speech for Creators", href: "/creators/ai-text-to-speech-for-creators" },
      { label: "AI Avatar Video Creation", href: "/creators/ai-avatar-video-creation" },
    ],
    faqs: [
      { q: "Can I clone another creator's or celebrity's voice?", a: "No. We build voice cloning only for your own voice or a voice you have explicit written rights to. Cloning someone else's voice without consent risks serious legal and platform consequences." },
      { q: "Do I need to disclose that a voice is AI?", a: "Increasingly, yes — several platforms now require labelling synthetic media, and disclosure protects audience trust. We help you set this up correctly." },
    ],
    ctaLabel: "Discuss a voice workflow",
    schema: "Article",
    icon: "Mic"
  },
  {
    slug: "best-ai-tools-for-content-creators",
    eyebrow: "Creator Guide",
    h1: "Best AI Tools for Content Creators",
    title: "Best AI Tools for Content Creators (2026) | Handbuilt",
    description:
      "The most useful categories of AI tools for creators — clipping, editing, scripts, captions, repurposing, voice and scheduling — plus why a connected system beats ten apps.",
    answer:
      "The most useful AI tools for content creators fall into a few categories: clip generators, editing assistants, script and hook tools, caption/subtitle tools, repurposing engines, voice/TTS tools and scheduling automation. The tools themselves are cheap and plentiful — the real leverage comes from connecting the right ones into one workflow tuned to your voice, instead of juggling ten disconnected subscriptions.",
    sections: [
      {
        heading: "The categories that matter",
        body: "Rather than chase brand names that change monthly, pick by the job you need done.",
        bullets: [
          "Clip generators — turn long videos and podcasts into shorts",
          "Editing assistants — silence removal, cuts, reframing",
          "Script & hook tools — beat the blank page in your voice",
          "Caption & subtitle tools — for the muted majority of viewers",
          "Repurposing engines — one recording into a week of content",
          "Voice / TTS — narration and voiceover at scale (with consent)",
          "Scheduling — consistent posting without living in the apps",
        ],
      },
      {
        heading: "Why a system beats a pile of apps",
        body: "Any creator can subscribe to ten AI tools. The problem is they don't talk to each other, none of them sound like you by default, and maintaining them becomes its own job. A connected system — the right tools, wired together around your workflow and voice — is what actually saves you hours. That's what Handbuilt builds for creators.",
      },
    ],
    keywords: ["best ai tools for content creators", "ai tools for creators", "ai tools for youtubers", "creator ai stack"],
    related: [
      { label: "AI Tools for Content Creators", href: "/creators" },
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "AI Video Editing Automation", href: "/creators/ai-video-editing-automation" },
    ],
    faqs: [
      { q: "Which single AI tool is best for creators?", a: "There isn't one — it depends on your bottleneck. A clip generator helps a podcaster; an editing assistant helps a vlogger. The best results come from combining the right few into one workflow." },
      { q: "Do I need to be technical to use these?", a: "To assemble and maintain a connected system, usually yes — which is why we build and install it for you, tuned to your channels, so you just use it." },
    ],
    ctaLabel: "Build my creator system",
    schema: "Article",
    icon: "Sparkles"
  },
  {
    slug: "ai-chatbot-cost",
    eyebrow: "Cost Guide",
    h1: "How Much Does an AI Chatbot Cost?",
    title: "How Much Does an AI Chatbot Cost? (2026) | Handbuilt",
    description:
      "What a website AI chatbot really costs — the free tier, the subscription tier and a one-time custom build compared, plus the running costs nobody quotes upfront.",
    answer:
      "A website AI chatbot costs nothing at the DIY end, roughly $30–300/month as a subscription, or a one-time build from $1,500 CAD. The number most people miss is the running cost: a chatbot trained on your business calls a language model on every conversation, which at small-business traffic is typically a few dollars to a few tens of dollars a month, billed by the AI provider rather than by whoever built it.",
    pain: "Chatbot pricing pages quote a monthly number and stay quiet about message limits, seat counts and what happens to the bill when the bot gets popular.",
    sections: [
      {
        heading: "The three pricing tiers",
        body: "What you pay tracks how custom and how connected the chatbot is.",
        bullets: [
          "DIY widgets: free to about $50/mo — generic, you configure and maintain it, and it answers from whatever you paste in.",
          "SaaS chatbots: about $30–300/mo — better, templated, frequently priced per seat or per resolved conversation, and rented indefinitely.",
          "Custom build: one-time from $1,500 CAD — trained on your real services, pricing and FAQs, wired to your lead capture, and yours to keep.",
        ],
      },
      {
        heading: "The running cost nobody quotes",
        body: "Every AI chatbot answer costs a fraction of a cent to a few cents in model usage. At a few hundred conversations a month that is small — commonly $5–50/month — but it is not zero and it scales with traffic rather than with your revenue.\n\nOn a subscription this is buried inside the monthly fee, which is a real convenience, and it is also why per-resolution pricing exists and why a busy month costs more. On a build you hold the provider account and pay usage directly, which is cheaper and more transparent but means the bill is yours to watch. Neither is wrong; they are just different places to put the same cost.\n\nThe other running cost is maintenance, and it is the one that actually bites. A chatbot answering from prices you changed eight months ago is worse than no chatbot."
      },
      {
        heading: "What drives the price of a custom build",
        body: "Scope, in roughly this order of expense: how many distinct things it has to answer, whether it books as well as answers, whether it writes into a CRM, and whether it runs on your site only or also in social DMs. A single site chatbot trained on your FAQs sits at the lower end; one that qualifies a lead, books an appointment and files it into your CRM sits at the top of the Starter range or into a Business AI System at $3,500–$7,500 CAD.\n\nA flat CAD price is quoted after a short scoping conversation, because a quote given before anyone knows how many scenarios exist is a guess dressed as a price."
      },
      {
        heading: "Where chatbots waste money",
        body: "Two patterns, both common. The first is buying a chatbot when the traffic is not there — a site with forty visitors a month does not have a conversion problem a chatbot can fix, it has a traffic problem, and the money is better spent elsewhere. The second is a bot with no honest fallback: when it cannot answer, it must offer a real next step — a phone number, a form, a human — rather than looping. A gap in the bot's knowledge should cost a slower reply, not the lead."
      },
    ],
    keywords: ["ai chatbot cost", "how much does an ai chatbot cost", "ai chatbot pricing", "custom chatbot price", "website chatbot cost canada"],
    related: [
      { label: "AI Chatbot Development", href: "/ai-chatbot-development" },
      { label: "AI Chatbot for Website", href: "/services/ai-chatbot-for-website" },
      { label: "Custom AI Tool vs SaaS", href: "/compare/custom-ai-tool-vs-saas" },
      { label: "Try a live demo", href: "/demo" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Is a free chatbot good enough?", a: "For deflecting the same three FAQs, often yes, and there is no shame in starting there. It stops being enough when you want it trained on real pricing and service detail, qualifying leads properly, and writing into the tools you already use." },
      { q: "Are there ongoing costs on a custom build?", a: "You own the build, so there is no licence. There is model usage billed by the AI provider directly — typically $5–50/month at small-business traffic — and an optional $99/mo Care Plan if you want it monitored and kept current. No per-seat fees." },
      { q: "How do I know how much the usage will actually be?", a: "Multiply your expected conversations per month by a few cents and treat that as the ceiling for a normal site. If you are being quoted usage in the hundreds of dollars for a small-business website, ask what is generating that volume — it is usually bots crawling the widget, not customers." },
      { q: "Can I see one working before I buy?", a: "Yes — there is a live demo on this site you can talk to. It is a demo rather than a customer's production bot, and it says so." },
    ],
    packageId: "starter",
    ctaLabel: "Get a chatbot quote",
    schema: "Article",
    icon: "MessagesSquare"
  },
  {
    slug: "custom-ai-tool-cost",
    eyebrow: "Cost Guide",
    h1: "How Much Does a Custom AI Tool Cost?",
    title: "How Much Does a Custom AI Tool Cost? | Handbuilt",
    description:
      "Custom AI tool pricing explained — what a bespoke AI app or internal tool costs, what drives the price, and how it compares to paying SaaS fees forever.",
    answer:
      "A custom AI tool typically costs a one-time build fee rather than a monthly subscription. With Handbuilt, a focused custom AI tool or internal app starts around $3,500 CAD and scales with complexity, with larger systems in the $7,500–$10,000+ range. You own it outright — no per-seat fees that compound as you grow.",
    sections: [
      {
        heading: "What you're paying for",
        body: "A custom tool is priced by scope and integration, not by seats.",
        bullets: [
          "How many workflows and steps the tool handles",
          "Which systems it connects to (CRM, calendar, payments, docs)",
          "How much custom logic and data it needs",
          "Whether it's internal-only or customer-facing",
        ],
      },
      {
        heading: "Custom build vs SaaS over time",
        body: "SaaS is cheaper to start but bills forever and per seat. A custom tool is a larger upfront cost you own — so past a certain size or subscription stack, it's cheaper over a couple of years and fits your workflow exactly. We'll tell you honestly when SaaS is the smarter call.",
      },
    ],
    keywords: ["custom ai tool cost", "how much does a custom ai tool cost", "custom ai app pricing", "bespoke ai software cost"],
    related: [
      { label: "Custom AI App Development", href: "/custom-ai-app-development" },
      { label: "Custom AI Tool vs SaaS", href: "/compare/custom-ai-tool-vs-saas" },
      { label: "AI Integration Services", href: "/ai-integration-services" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      { q: "Why is it one-time instead of monthly?", a: "Because you own what we build. There may be small AI-provider usage costs and an optional Care Plan, but you're not renting the tool — it's yours." },
      { q: "How do I know if custom is worth it?", a: "Add up the SaaS subscriptions touching the same workflow. If they exceed roughly $250/mo, a custom tool often pays back inside 18 months — and fits exactly how you work." },
    ],
    packageId: "business",
    ctaLabel: "Get a custom quote",
    schema: "Article",
    icon: "AppWindow"
  },
  {
    slug: "small-business-ai-setup-cost",
    eyebrow: "Cost Guide",
    h1: "How Much Does It Cost to Set Up AI for a Small Business?",
    title: "Small Business AI Setup Cost (2026) | Handbuilt",
    description:
      "What it really costs a small business to set up AI — from a single AI worker to a full system — with honest CAD price ranges and what pays back fastest.",
    answer:
      "Setting up AI for a small business ranges from about $1,500 CAD for a single AI worker (like a receptionist or chatbot) to $3,500–$7,500 for a multi-worker system, and $10,000+ for a fully custom app. Most businesses start with the one automation tied to lost revenue and expand once it's paying for itself.",
    sections: [
      {
        heading: "Typical setup costs by scope",
        body: "You don't need to buy everything at once — most start small.",
        bullets: [
          "Single AI worker (receptionist, chatbot, quote agent): from $1,500 CAD",
          "Multi-worker system (calls + follow-up + booking): $3,500–$7,500",
          "Fully custom AI app or internal tool: $10,000+",
          "Optional ongoing Care Plan: $99/mo for monitoring and tweaks",
        ],
      },
      {
        heading: "Where to start for the fastest payback",
        body: "For most small businesses, the fastest return is stopping lost leads — a missed-call recovery or AI receptionist, or a lead follow-up agent. Start there, measure the recovered revenue, and add the next piece. A short discovery call pinpoints your fastest payback.",
      },
    ],
    keywords: ["small business ai setup cost", "cost to set up ai for business", "ai setup pricing small business", "how much to add ai to my business"],
    related: [
      { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
      { label: "How Much Does AI Automation Cost?", href: "/resources/how-much-does-ai-automation-cost" },
      { label: "AI Automation Packages & Pricing", href: "/pricing" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
    ],
    faqs: [
      { q: "Do I have to build the whole system at once?", a: "No — most businesses start with one AI worker tied to lost revenue, prove the payback, then expand. It keeps the upfront cost low and the return clear." },
      { q: "Are there hidden monthly fees?", a: "You own what we build. There may be small AI-provider usage costs and an optional $99/mo Care Plan, but no mandatory per-seat subscriptions." },
    ],
    packageId: "starter",
    ctaLabel: "Get a setup quote",
    schema: "Article",
    icon: "Receipt"
  },
  {
    slug: "can-ai-send-quotes-automatically",
    eyebrow: "Guide",
    h1: "Can AI Send Quotes Automatically?",
    title: "Can AI Send Quotes Automatically? | Handbuilt",
    description:
      "Yes — AI can capture a request, apply your pricing rules, and send a quote in minutes. Here's how automated quoting works and where a human still signs off.",
    answer:
      "Yes — AI can capture a quote request, ask the right qualifying questions, apply your pricing rules, and send a professional quote in minutes instead of days. For anything complex or high-value, it can prepare the quote and route it to you to approve before it goes out. Handbuilt builds this around your services and pricing.",
    sections: [
      {
        heading: "How automated quoting works",
        body: "The AI turns an inquiry into a quote using your rules, not guesswork.",
        bullets: [
          "Captures the request from a call, form or message",
          "Asks the qualifying questions your quotes depend on",
          "Applies your pricing logic and options",
          "Sends the quote, or routes it to you to approve first",
        ],
      },
      {
        heading: "Why speed wins quotes",
        body: "The business that quotes first usually wins the job. Automated quoting means a lead that comes in at 9pm gets a real quote before a competitor even sees the message — while you keep control over pricing and final approval on the big ones.",
      },
    ],
    keywords: ["can ai send quotes automatically", "ai quote automation", "automated quoting", "ai generate quotes for business"],
    related: [
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
      { label: "AI Lead Follow-Up for Contractors", href: "/ai-lead-follow-up-agent" },
      { label: "How to Automate Quote Requests", href: "/how-to/automate-quote-requests" },
    ],
    faqs: [
      { q: "Will it quote wrong on complex jobs?", a: "For anything outside clear rules, it prepares the quote and hands it to you to approve — so complex or high-value jobs still get your eyes before they go out." },
      { q: "Does it use my actual pricing?", a: "Yes — it applies your real pricing rules and options, so quotes are consistent and on-brand every time." },
    ],
    ctaLabel: "Automate my quoting",
    schema: "Article",
    icon: "Receipt"
  },
  {
    slug: "can-ai-run-my-customer-support",
    eyebrow: "Guide",
    h1: "Can AI Run My Customer Support?",
    title: "Can AI Run My Customer Support? | Handbuilt",
    description:
      "Yes — AI can handle the bulk of customer support instantly, 24/7, and escalate the rest to your team. Here's what it handles well and where humans still matter.",
    answer:
      "Yes — AI can handle a large share of customer support: answering common questions from your own help content, tracking orders, handling returns and FAQs, and escalating anything complex or sensitive to your team. Handbuilt builds it trained on your real support material so answers are accurate and on-brand, 24/7.",
    sections: [
      {
        heading: "What AI support handles well",
        body: "The repetitive majority of tickets are a great fit for automation.",
        bullets: [
          "Common questions answered from your help docs",
          "Order status, returns and account basics",
          "Instant responses around the clock",
          "Consistent, on-brand answers every time",
        ],
      },
      {
        heading: "Where humans still matter",
        body: "Complex, sensitive or high-stakes issues should reach a person, and good AI support knows when to escalate rather than guess. The goal isn't to remove your team — it's to free them from the repetitive 70% so they handle the cases that actually need a human.",
      },
    ],
    keywords: ["can ai run my customer support", "ai customer support", "automate customer support", "ai support agent for business"],
    related: [
      { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
      { label: "AI Chatbot for Your Website", href: "/services/ai-chatbot-for-website" },
    ],
    faqs: [
      { q: "Will it give wrong answers?", a: "It answers from your real support content rather than the open internet, and escalates anything it isn't confident about — which keeps answers accurate and avoids confident mistakes." },
      { q: "Does it replace my support team?", a: "No — it handles the repetitive majority so your team focuses on the complex and sensitive cases that genuinely need a person." },
    ],
    ctaLabel: "Automate my support",
    schema: "Article",
    icon: "Headset"
  },
  {
    slug: "what-is-an-ai-worker",
    eyebrow: "Guide",
    h1: "What Is an AI Worker?",
    title: "What Is an AI Worker? (Plain-English Guide) | Handbuilt",
    description:
      "An AI worker is a system that does a specific job in your business — answering calls, following up leads, booking appointments — automatically. Here's how they work.",
    answer:
      "An AI worker is a system set up to do a specific, repetitive job in your business — like answering calls, following up with leads, booking appointments, or replying to reviews — automatically and around the clock. Unlike a generic chatbot, an AI worker is trained on your business and connected to your tools so it produces a real outcome, not just conversation.",
    sections: [
      {
        heading: "Examples of AI workers",
        body: "Each one owns a single job you'd otherwise do by hand or hire for.",
        bullets: [
          "An AI receptionist that answers and books every call",
          "A lead follow-up agent that chases quotes and inquiries",
          "A booking agent that fills and manages your calendar",
          "A review agent that requests and responds to reviews",
        ],
      },
      {
        heading: "AI worker vs chatbot",
        body: "A chatbot chats; an AI worker gets a job done. The difference is training and connection — an AI worker knows your business and plugs into your phone, CRM, calendar and forms, so it books the appointment or captures the lead rather than just answering a question. You can start with one and add more over time.",
      },
    ],
    keywords: ["what is an ai worker", "ai worker meaning", "ai employee for business", "ai worker vs chatbot"],
    related: [
      { label: "AI Business System", href: "/ai-business-system" },
      { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
      { label: "AI Employee vs Human Assistant", href: "/compare/hiring-vs-ai-automation" },
      { label: "AI Automation Examples", href: "/resources/ai-automation-examples-for-small-business" },
    ],
    faqs: [
      { q: "Is an AI worker the same as an employee?", a: "It does a defined job like an employee would, around the clock, but it's a system you own — not a person. Most businesses use AI workers to handle repetitive work so their people focus on higher-value tasks." },
      { q: "Can I start with just one?", a: "Yes — most businesses start with a single AI worker tied to lost revenue, then add more as it proves its value." },
    ],
    ctaLabel: "Get an AI worker",
    schema: "Article",
    icon: "Bot"
  },
  {
    slug: "best-ai-tools-for-contractors",
    eyebrow: "Guide",
    h1: "Best AI Tools for Contractors",
    title: "Best AI Tools for Contractors (2026) | Handbuilt",
    description:
      "A working contractor's list of the AI and software tools that actually earn their keep on a trades business — what each costs, who it suits, and who should skip it.",
    answer:
      "For a trades business the AI tools worth paying for cluster into six jobs: answering the phone, scheduling and dispatch, quoting, chasing quiet quotes, collecting reviews, and documenting the job. Named tools worth looking at are Jobber and Housecall Pro for the field-service core, an AI answering service such as Benny or Numa if the phone is your leak, CompanyCam for job photos, and QuickBooks for the money. Most contractors do not need all six on day one — they need whichever one is losing them jobs this month.",
    pain:
      "Every 'best AI tools' list for contractors is the same ten affiliate links written by somebody who has never quoted a fence. What a working trade needs is a shorter list, honest prices, and a straight answer about which of these you can safely ignore.",
    sections: [
      {
        heading: "How this list was picked — and what has actually been tested",
        body:
          "Reviewed August 2026. This is written from running a cedar-fence contracting business in South Surrey and building software for trades, not from a affiliate dashboard. Being straight about the evidence behind each entry, because most lists are not:\n\nTools that have been built against directly: Jobber, QuickBooks, Square and Stripe all have working OAuth and sync integrations in PayNudge, one of the products behind this studio — so the claims about what their APIs will and will not give you are firsthand. A self-hosted AI phone receptionist was built and put on a real cedar-fence business line in July and August 2026, so the section on answering services is written from operating one, including the parts that broke.\n\nTools listed but NOT independently bench-tested: Housecall Pro, ServiceTitan, CompanyCam and the standalone answering services. Those entries describe what the vendor publishes and what the market consistently reports. Prices move — check the vendor's own page before you commit to anything here.",
        bullets: [
          "Selection criteria: does it plug a leak a trade can actually name (a missed call, a quiet quote, an unpaid invoice)?",
          "Does it work on a phone, one-handed, with dirty hands? If it needs a desk, a trade will not use it",
          "Is the price legible before you talk to a salesperson? Quote-only pricing is a tax on small shops",
          "What happens when it breaks at 4pm on a Friday — is there a fallback, or does the job just vanish?",
        ],
      },
      {
        heading: "1. Answering the phone",
        body:
          "This is where trades lose the most money, because the caller who reaches voicemail dials the next name on the list. Three shapes of product exist here and they cost very differently.\n\nJobber's AI Receptionist is a $99/mo add-on and comes bundled free on their Plus plan (roughly $499–599/mo at time of writing). Best for: shops already living inside Jobber. Not for: anyone who wants the receptionist to reach outside Jobber, because it cannot.\n\nStandalone AI answering services — Numa, Rosie, Goodcall, Smith.ai, and in Canada Benny (askbenny.ca, from about $99/mo), Mihron AI (about CA$299/mo) and VoiceFleet (about CA$149/mo) — generally run $49–249/mo plus per-minute overages, with setup fees anywhere from $75 to $1,500. Best for: getting something live this week. Not for: anyone whose call volume is spiky, because the overage line is where the bill surprises you. Read the per-minute rate before the headline price.\n\nA built and owned system is the third shape and it is what this studio sells, so weigh that accordingly: a one-time build instead of a subscription, from $1,500 CAD for a single worker. Best for: a shop that plans to still be trading in three years and would rather buy than rent. Not for: anyone who needs it live tomorrow, or whose call volume is under roughly 20 a month — at that volume a subscription you can cancel is the smarter buy, and this page would rather say so than sell you something.",
      },
      {
        heading: "2. Field-service management (the scheduling and dispatch core)",
        body:
          "Jobber and Housecall Pro are the two most trades shops land on. Jobber is Canadian, published tiers, strong quoting and client-hub flow; Housecall Pro publishes roughly $59–329/mo depending on seats and features and leans a little harder on marketing tooling. ServiceTitan is the enterprise option — quote-only pricing, built for shops with a dispatch desk and multiple crews, and genuinely overkill for a two-truck operation.\n\nBest for: any shop past about three crews, where the scheduling is the bottleneck. Not for: a one-person operation with fifteen jobs a week — a calendar and a notebook is honestly fine, and the monthly fee buys you nothing until the coordination hurts.",
      },
      {
        heading: "3. Quoting, and 4. chasing the quotes that go quiet",
        body:
          "Most FSM platforms quote well enough. The gap is almost never producing the quote — it is the follow-up nobody has time to do. In fencing the quote cycle runs long and most competitors send one quote and never touch it again, which is exactly why a follow-up sequence is the cheapest win available to a trade.\n\nWhat matters in a follow-up tool: does it stop the moment the customer replies, does it handle a STOP properly, and does it log what was sent. A sequence that keeps texting somebody who already said yes will cost you the job it was supposed to save.",
      },
      {
        heading: "5. Reviews, 6. photos and documentation, and the money",
        body:
          "For reviews, the important thing is not which tool you pick but that you do not screen who gets asked. Sending the review request only to customers you expect to be happy breaks Google's policies and can cost you the reviews you already have. Any tool that markets 'sentiment routing' or 'catch the bad ones first' is selling you a compliance problem.\n\nCompanyCam is the standard answer for job photos with automatic tagging by address — genuinely useful on a warranty dispute two years later. Check their current per-user price on their own site.\n\nQuickBooks is where most trades end up for the money, and its API is one of the more workable ones — that is a firsthand assessment from building a sync against it. Square and Stripe are both straightforward if you take card on site.",
      },
      {
        heading: "Free calculators, before you buy anything",
        body:
          "Five no-login calculators are published on this site, they run entirely in your browser, and nothing is sent anywhere. Run the missed-call one before you buy any answering product — if the number it gives you is small, you have just saved yourself a subscription.",
        bullets: [
          "Missed-call revenue calculator — what unanswered calls are actually costing you",
          "Contractor profit and pricing calculator — whether your rates carry your overhead",
          "Labour burden calculator — the real hourly cost of an employee",
          "Quote follow-up generator — writes the follow-up you keep not sending",
          "Lead-leak audit — where inquiries are dropping out of your pipeline",
        ],
      },
      {
        heading: "When it is worth connecting them into one system",
        body:
          "Ten apps that do not talk to each other create admin rather than removing it. The case for connecting them arrives when you can name the specific handoff that keeps failing — the call that never became a lead row, the finished job that never triggered a review request, the quote nobody chased. Until you can name that handoff, buy one tool, use it properly, and leave the rest alone. Connecting systems is what this studio builds, from $1,500 CAD for a single worker and $3,500–$7,500 for a connected set, but it is the second purchase, not the first.",
      },
    ],
    keywords: ["best ai tools for contractors", "ai tools for contractors", "ai for trades business", "contractor automation tools", "ai answering service for contractors"],
    related: [
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
      { label: "Contractor AI Automation", href: "/industries/contractor-ai-automation" },
      { label: "AI Lead Follow-Up for Contractors", href: "/ai-lead-follow-up-agent" },
      { label: "Missed-Call Automation", href: "/use-cases/missed-call-automation" },
      { label: "Free missed-call revenue calculator", href: "/tools/missed-call-revenue-calculator" },
      { label: "What an AI receptionist costs", href: "/resources/ai-receptionist-cost" },
    ],
    faqs: [
      { q: "I'm a one-person operation — which tool first?", a: "Whatever is losing you jobs this month, and for most solo trades that is the phone. Run the missed-call calculator on this site first. If it says you are losing one job a month, fix the phone. If it says you are losing almost nothing, fix the quote follow-up instead and leave the phone alone." },
      { q: "Do I need Jobber before any of this is useful?", a: "No. Jobber is a scheduling and invoicing core, not a prerequisite. A missed-call system, a quote follow-up sequence and a review flow all work against a plain calendar and an email inbox. Jobber earns its money when coordinating crews starts costing you more time than the subscription does." },
      { q: "Do I need to be techy to use these?", a: "To use them, no. To wire them together, yes — which is the honest reason done-for-you setup exists as a service. If you enjoy this kind of thing, the vendor documentation is genuinely good and you can absolutely do it yourself." },
      { q: "Why are there no star ratings or a 'winner' on this list?", a: "Because a ranking would be invented. Four of the tools here have been built against directly and the rest have not been bench-tested, so what is offered is what each one is for and who should skip it. A list that crowns a winner across every trade and every call volume is not telling you the truth about how different those businesses are." },
    ],
    ctaLabel: "See contractor AI",
    schema: "Article",
    icon: "Hammer"
  },
  {
    slug: "best-ai-automations-for-service-businesses",
    eyebrow: "Guide",
    h1: "Best AI Automations for Service Businesses",
    title: "Best AI Automations for Service Businesses | Handbuilt",
    description:
      "The five automations worth building for an appointment- or lead-driven business, what each one actually does, the order to build them in, and the ones to skip.",
    answer:
      "The automations that repay a service business fastest are, in order: missed-call text-back, instant lead reply, appointment reminders, quote follow-up, and review requests. Build one at a time, starting with whichever leak you can name a number for. Every one of these is a small, boring piece of plumbing — the value is in it firing every single time, not in the AI being clever.",
    pain:
      "You have read the listicles. They all name the same five automations and none of them tells you which to build first, what breaks, or which ones are not worth the effort for a business your size.",
    sections: [
      {
        heading: "The five that are worth it, in build order",
        body:
          "This ordering is deliberate. Each one is cheap to build only because the one before it already exists, and each is measurable on its own before you add the next.",
        bullets: [
          "1. Missed-call text-back — an unanswered call fires an SMS inside a minute. Cheapest possible build, biggest single leak for anyone who works with their hands.",
          "2. Instant lead reply — a form fill or a message gets an answer in seconds rather than next morning, because the first business to reply usually wins the job.",
          "3. Appointment reminders — cuts the no-shows that empty a booked calendar, which matters far more for clinics and salons than for trades.",
          "4. Quote follow-up — chases the quotes that go quiet until you get a yes or a no. Highest value where the quote cycle is long.",
          "5. Review requests — fires after a job closes, gives every customer the same link, and copies you on the reply.",
        ],
      },
      {
        heading: "What makes these actually work — and it is not the AI",
        body:
          "Almost none of the value here is in the language model. It is in the plumbing being reliable, and that is where most DIY builds fall over.\n\nA worked example from a reminder system built for invoices: the send has to be claimed in the database BEFORE the email goes out, not after. Claim it after, and two overlapping cron runs will both decide the invoice is due and your customer gets chased twice in one morning. Claiming it first means the second run collides on a unique index and does nothing. That single ordering decision is the difference between an automation your customers tolerate and one that embarrasses you.\n\nThe same principle covers the rest of it: does it stop the instant the customer replies, does a STOP actually stop it, does a failed send surface somewhere a human will see it. A silent failure is worse than no automation, because you will keep believing the follow-up is happening.",
      },
      {
        heading: "Which one to build first, honestly",
        body:
          "Do not automate all five. Pick the leak you can put a number against.\n\nIf you work on the tools and miss calls, it is the missed-call text-back — nothing else you build will beat it. If your calendar is the constraint and people no-show, it is reminders. If you quote a lot and hear nothing back, it is quote follow-up. If you do great work and have four reviews, it is the review flow.\n\nIf you genuinely cannot name which one, that is a signal to measure before you build. The free calculators on this site will do it in about five minutes and cost nothing.",
      },
      {
        heading: "The ones to skip",
        body:
          "AI-written social posts and AI-written blog content are the two most commonly sold automations to service businesses and the two least likely to produce a booked job. They are cheap to sell because they are easy to demo. Nothing on this site will pretend a weekly auto-generated post competes with answering your phone.\n\nAlso skip anything that promises to screen which customers get asked for a review. It breaks Google's policies and it can cost you the reviews you already have.",
      },
    ],
    keywords: ["best ai automations for service businesses", "ai automation service business", "top ai automations small business", "service business automation ideas", "ai automation for small business"],
    related: [
      { label: "AI Automation Examples for Small Business", href: "/resources/ai-automation-examples-for-small-business" },
      { label: "Done-for-You AI Automation", href: "/done-for-you-ai-automation" },
      { label: "Missed-Call Automation", href: "/use-cases/missed-call-automation" },
      { label: "Appointment & No-Show Reminder Automation", href: "/use-cases/appointment-reminder-automation" },
      { label: "Free contractor calculators", href: "/tools" },
    ],
    faqs: [
      { q: "Which automation should I start with?", a: "The one plugging the leak you can put a number against. If you cannot name the number, measure first — the missed-call calculator on this site takes about five minutes and will tell you whether the phone is even your problem." },
      { q: "Can these connect to my existing tools?", a: "Usually. Jobber, QuickBooks, Square and Stripe all have workable APIs and have been built against directly. Some tools are harder than their marketing suggests, so compatibility gets confirmed during scoping rather than promised upfront." },
      { q: "What is the most common way these break?", a: "Silently. The send fails, nobody is told, and the owner keeps believing the follow-up is going out. Any automation worth building needs its failures surfaced somewhere a human actually looks — an alert email at minimum." },
      { q: "Is this worth it for a business with very low volume?", a: "Often not. Under roughly twenty inbound calls or leads a month, the arithmetic on a build rarely works and a cancellable subscription is the better buy. That is a genuine answer, not a negotiating position." },
    ],
    ctaLabel: "Find my fastest win",
    schema: "Article",
    icon: "Sparkles"
  }
];

export function getResource(slug: string): LandingContent | undefined {
  return resources.find((r) => r.slug === slug);
}
