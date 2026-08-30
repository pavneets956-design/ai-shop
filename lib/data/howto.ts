import type { LandingContent } from "./landing";

export const howtos: LandingContent[] = [
  {
    slug: "add-ai-chatbot-to-website",
    eyebrow: "How-to",
    h1: "How to Add an AI Chatbot to Your Website",
    title: "How to Add an AI Chatbot to Your Website | Handbuilt",
    description:
      "A practical guide to adding an AI chatbot to your small business website — from choosing the right tool to going live in under a week.",
    answer:
      "Pick a chatbot platform (or build with an API), train it on your business info, embed a script tag on your site, and connect it to your inbox or CRM. Most small businesses can go live in 3–5 days. The hard part is writing good responses — not the tech.",
    pain:
      "Most small business websites sit there silently after hours. Visitors ask a question in a contact form, wait two days for a reply, and book someone else. A human can't monitor chat 24/7 without hiring staff.",
    steps: [
      "List the 10 questions customers ask most often — your chatbot will answer these first.",
      "Choose your platform: embedded widget (Tidio, Intercom) for speed, or custom GPT-powered build for full control over tone and logic.",
      "Write your knowledge base: business hours, service areas, pricing ranges, and what makes you different.",
      "Configure the fallback: decide what happens when the bot doesn't know — email capture, phone number, or live handoff.",
      "Paste the embed script into your site's <head> or footer. On WordPress this is a plugin; on Webflow/Squarespace it's a custom code block.",
      "Test 20 real questions from real customers. Fix the gaps in your knowledge base.",
      "Monitor the first two weeks: check which questions the bot couldn't answer and add them to the training data.",
    ],
    sections: [
      {
        heading: "The manual way (and why it breaks)",
        body: "Most small businesses handle website inquiries through a contact form that routes to an email inbox. Someone checks it once or twice a day. By the time you reply, the lead has moved on. After-hours? Nothing. The visitor bounces. You never knew they were there.",
        bullets: [
          "Average contact form response time: 24–48 hours",
          "Leads answered within five minutes convert far better than leads answered the next day — the widely-cited figure is 9× from the Harvard Business Review lead-response study (2011). It is an old study and the exact multiple is worth treating as directional, not gospel; the direction has never been in dispute",
          "No record of what questions came in, so you can't improve",
        ],
      },
      {
        heading: "What tools you need",
        body: "You have two paths: off-the-shelf widgets or a custom build. Off-the-shelf (Tidio, Crisp, Intercom Fin) gets you live faster but locks you into their pricing and limits your bot's intelligence. A custom GPT-powered build (OpenAI API + your own prompt + a thin UI layer) gives you full control but takes more setup time.",
        bullets: [
          "Off-the-shelf widget: $0–$50/month, live in a day, limited customization",
          "Custom GPT build: one-time build cost + ~$20–$50/month in API fees, fully on-brand",
          "CRM or email integration: so every chat lead lands somewhere you'll actually see it",
        ],
      },
      {
        heading: "What it costs to set up",
        body: "DIY with an off-the-shelf widget: free to $50/month ongoing, 1–3 days of your own time to configure. DIY custom build: 20–40 hours of dev time plus API costs. Hiring Handbuilt: Starter package at $1,500 CAD — includes chatbot build, knowledge base setup, embed, and two weeks of monitoring. You get a working chatbot faster than you'd finish the DIY research.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a chatbot built for $1,500 CAD",
    keywords: [
      "add ai chatbot to website",
      "website chatbot for small business",
      "ai chat widget canada",
      "chatbot setup surrey bc",
    ],
    related: [
      { label: "AI Chatbot Development", href: "/services/ai-chatbot-for-website" },
      { label: "Plumber AI Automation", href: "/industries/plumber-ai-automation" },
      { label: "Pricing", href: "/pricing" },
      { label: "Start a Project", href: "/create" },
    ],
    faqs: [
      {
        q: "Do I need a developer to add a chatbot to my website?",
        a: "For off-the-shelf widgets, no — you paste a script tag and you're done. For a custom GPT-powered chatbot with your own branding and logic, you need some dev work. That's what Handbuilt handles.",
      },
      {
        q: "Will the chatbot work on mobile?",
        a: "Yes. Any properly embedded chat widget is responsive. Test it yourself on your phone before going live — it's the first thing your customers will use.",
      },
      {
        q: "What happens when the chatbot doesn't know the answer?",
        a: "You configure a fallback: typically the bot asks for the visitor's name and email, or shows your phone number. A gap in the bot's knowledge should cost you a slower reply, not the lead.",
      },
    ],
    schema: "HowTo",
    icon: "MessagesSquare",
  },
  {
    slug: "automate-quote-requests",
    eyebrow: "How-to",
    h1: "How to Automate Quote Requests for a Small Business",
    title: "How to Automate Quote Requests for a Small Business | Handbuilt",
    description:
      "Stop manually pricing every job. Here's how to build an AI-powered quote form that collects scope, calculates estimates, and emails the customer automatically.",
    answer:
      "Build a smart intake form that asks the right scoping questions, pass the answers through a pricing logic layer (spreadsheet formula or GPT prompt), and send an automated quote email. The customer gets a number in minutes; you get a qualified lead with full job details.",
    pain:
      "Small service businesses price jobs over the phone or by email — one at a time. Every quote is a 15-minute conversation you have to schedule, repeat for no-shows, and manually follow up on. Evenings and weekends go unanswered. You lose jobs to whoever replies first.",
    steps: [
      "Map your pricing variables: what inputs change your price? Square footage, job type, location, timeline urgency, number of units.",
      "Build a scoping form with conditional logic — only show fields that are relevant based on earlier answers (Typeform, Tally, or a custom form).",
      "Write your pricing rules as a spreadsheet formula or a GPT prompt that takes the form inputs and returns a price range.",
      "Connect the form to an automation layer (Make, Zapier, or n8n) that passes answers to your pricing logic.",
      "Draft your quote email template — include the price range, what's included, and a clear next step (book a call, pay deposit, etc.).",
      "Set up the send: when the form submits, the automation emails the customer within 60 seconds.",
      "Log every quote to a spreadsheet or CRM so you can follow up and track close rate.",
    ],
    sections: [
      {
        heading: "The manual way (and why it breaks)",
        body: "The typical small business quote flow: customer calls or emails, you play phone tag, you ask the same 8 questions you always ask, you hang up and do the math, you send a quote 24 hours later. By then the customer has three other quotes. Your conversion rate is a coin flip, and you wasted an hour on every job you didn't win.",
        bullets: [
          "Average quote turnaround for service businesses: 1–3 days",
          "Customers who receive quotes within an hour are significantly more likely to accept",
          "No record of lost quotes means you can't see patterns or improve your close rate",
        ],
      },
      {
        heading: "What tools you need",
        body: "You need three pieces: a form, a pricing engine, and an email sender. The form can be Typeform, Tally, or a custom-coded intake page. The pricing engine is either a Google Sheets formula or a GPT prompt with your pricing rules baked in. The email sender is your existing email (Gmail, Outlook) triggered through Make or Zapier.",
        bullets: [
          "Form builder: Tally (free), Typeform ($25–$50/month), or custom build",
          "Automation layer: Make (free tier), Zapier ($20+/month), or n8n (self-hosted free)",
          "Email: Gmail or any SMTP sender via the automation",
        ],
      },
      {
        heading: "What it costs to set up",
        body: "DIY: 10–20 hours to map your pricing, build the form, wire the automation, and test edge cases. Tools cost $0–$70/month ongoing. Hiring Handbuilt: Starter package at $1,500 CAD covers the full quote automation — form, pricing logic, email template, and CRM logging. Whether that pays for itself in a month or a quarter depends on your job value and how many quotes currently go quiet — the missed-call calculator will tell you from your own numbers.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get quote automation built for $1,500 CAD",
    keywords: [
      "automate quote requests small business",
      "ai quote generator canada",
      "automated pricing form",
      "quote automation surrey bc",
    ],
    related: [
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
      { label: "Cleaning Business AI Automation", href: "/industries/cleaning-business-ai-automation" },
      { label: "Pricing", href: "/pricing" },
      { label: "Start a Project", href: "/create" },
    ],
    faqs: [
      {
        q: "Can AI pricing replace my judgment on complex jobs?",
        a: "For standard jobs, yes — your pricing rules are consistent enough to automate. For complex or custom jobs, the form flags them as 'needs review' and routes to you. You stop doing the easy quotes manually; you still handle the exceptions.",
      },
      {
        q: "What if my pricing changes seasonally?",
        a: "You update the pricing rules in one place — the spreadsheet or the GPT prompt — and every future quote reflects the new rates. No chasing old templates.",
      },
      {
        q: "Will customers trust an automated quote?",
        a: "Yes, if it's fast and accurate. Customers don't care whether a human or a system produced the number — they care that it arrived in 60 seconds with a clear scope of what's included.",
      },
    ],
    schema: "HowTo",
    icon: "Receipt",
  },
  {
    slug: "create-ai-receptionist-for-small-business",
    eyebrow: "How-to",
    h1: "How to Create an AI Receptionist for a Small Business",
    title: "How to Create an AI Receptionist for a Small Business | Handbuilt",
    description:
      "Learn how to set up an AI receptionist that answers calls, books appointments, and captures leads — without hiring staff or missing after-hours inquiries.",
    answer:
      "An AI receptionist is a voice or text agent that answers inbound calls or messages, collects caller information, answers common questions, and books appointments directly into your calendar. You need a voice AI provider (or phone + chat combo), a calendar integration, and a script trained on your business. Setup takes 3–7 days.",
    pain:
      "A ringing phone during a job is a problem. You can't answer, the caller hangs up, and they dial the next business on Google. Hiring a part-time receptionist runs around $18–$22/hour in BC and still leaves evenings and weekends uncovered. Every missed call after hours is a lead that usually never calls back.",
    steps: [
      "Define what your receptionist needs to handle: appointment booking, pricing questions, service area check, emergency triage, or all of the above.",
      "Write your call script — the 8–12 things callers ask most, and your answers. This becomes the AI's knowledge base.",
      "Choose your channel: voice AI (phone number that answers calls), SMS auto-reply, or web chat. Most businesses start with one.",
      "Select a platform: Bland.ai, Synthflow, or Vapi for voice; a GPT-powered chat agent for text. Connect it to your phone number or website.",
      "Integrate your calendar (Google Calendar, Calendly, or your booking system) so the AI can check availability and book slots in real time.",
      "Set your escalation rule: when the AI can't answer or the caller is frustrated, it texts you immediately or routes to voicemail with a transcript.",
      "Run 20 test calls with real scenarios. Refine the script. Go live.",
    ],
    sections: [
      {
        heading: "The manual way (and why it breaks)",
        body: "The alternative to an AI receptionist is you — or a human you pay. You're on a job site, phone rings, you ignore it. Or you answer, drop what you're doing, and give a rushed response. After 5pm or on weekends, nobody answers at all. The caller books somewhere else within 10 minutes.",
        bullets: [
          "Part-time cover is not cheap: 20 hrs/week at BC's current minimum wage is over $1,000/month in gross wages alone, before payroll costs, holiday pay or cover for sick days — look up today's rate on the BC government's Employment Standards page and do the multiplication for your own hours",
          "Human receptionists can't work 24/7 without shift premiums",
          "Every missed call is a missed revenue opportunity — most callers do not leave voicemails",
        ],
      },
      {
        heading: "What tools you need",
        body: "For voice AI: a platform like Bland.ai or Synthflow that connects to a phone number, a script, and a calendar integration. For text/chat: a GPT-powered agent connected to your site or SMS line. You'll also need a calendar system the AI can write to — Google Calendar works for most small businesses.",
        bullets: [
          "Voice AI platform: $50–$200/month depending on call volume",
          "Calendar integration: Google Calendar (free) or Calendly ($10–$20/month)",
          "Phone number: use your existing number via forwarding, or get a new number ($2–$5/month)",
        ],
      },
      {
        heading: "How to actually test it before it touches a customer",
        body: "Step 7 says run 20 test calls. Here is what those calls should be, because testing the happy path proves almost nothing.\n\nCall it from a cell phone with one bar, not from your desk. Call it from a truck with the window down. Interrupt it mid-sentence. Ask something it has no answer for and watch whether it says so or improvises — improvising is the failure you are looking for. Ask for a service you do not offer and check that it declines rather than agreeing. Name a suburb just outside your service area. Trigger the emergency phrase and confirm the transfer actually reaches a ringing phone. Then hang up during the greeting and confirm the call is still logged.\n\nWrite the expected outcome for each of those before you dial, and treat a wrong answer as a config gap rather than a model problem — it almost always is.",
      },
      {
        heading: "What goes wrong once it is live",
        body: "From running one of these on a live trades line through July and August 2026, in order of how much damage each did.\n\nThe phone layer failed while the agent was healthy: calls arrived as zero-second no-answers for several days, and one caller tried fourteen times without ever getting through. Nothing in the AI stack reported it — only the carrier's call detail records showed it. Whatever you run, watch the call records, not just the application.\n\nThe model provider retired the default model mid-August, and the agent began answering, delivering its greeting, then falling silent mid-call. A caller who reaches a greeting believes they have reached a business, which makes a silent agent worse than an offline one. Monitor for calls that connect but produce no transcript.\n\nAnd some callers simply will not speak to a machine and hang up during the greeting. That is a normal share of traffic, not a defect.",
      },
      {
        heading: "What it costs to set up",
        body: "DIY: 15–30 hours to build the script, configure the platform, connect the calendar and test it properly. Ongoing: $50–$200/month in platform fees. Done-for-you from Handbuilt: the Starter package at $1,500 CAD covers the script, platform setup, calendar integration, escalation routing and a round of live testing. The honest case for DIY is that the platform documentation is good and this is a learnable weekend project. The honest case against it is the testing section above — most DIY builds ship the happy path and discover the rest from a customer.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get an AI receptionist set up for $1,500 CAD",
    keywords: [
      "ai receptionist small business canada",
      "automated phone answering service bc",
      "ai appointment booking surrey",
      "virtual receptionist setup",
    ],
    related: [
      { label: "AI Receptionist Setup", href: "/services/ai-receptionist-setup" },
      { label: "Dental Clinic AI Automation", href: "/industries/dental-clinic-ai-automation" },
      { label: "What an AI Receptionist Is", href: "/ai-receptionist" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "Can the AI receptionist book appointments without my input?",
        a: "Yes — if you connect it to a calendar with real-time availability, it can confirm and book slots directly. You get a notification; the customer gets a confirmation. You're never in the loop unless something flags for review.",
      },
      {
        q: "What happens if the caller speaks French or has a heavy accent?",
        a: "Modern voice AI handles accents reasonably well. French support depends on the platform — Bland.ai and Vapi both support multilingual configs. If your customer base is bilingual, flag that at the start and we build for it.",
      },
      {
        q: "Will it sound robotic?",
        a: "Current voice models (ElevenLabs, PlayHT and similar) are clearly intelligible and sound professional. They are not indistinguishable from a person, and building toward that is the wrong goal — open with \"I'm the AI assistant for…\" instead. The script matters far more than the voice model: a natural, well-scoped script with honest limits beats a better voice reading a worse one.",
      },
    ],
    schema: "HowTo",
    icon: "PhoneCall",
  },
  {
    slug: "automate-customer-replies",
    eyebrow: "How-to",
    h1: "How to Automate Customer Replies with AI",
    title: "How to Automate Customer Replies with AI | Handbuilt",
    description:
      "A step-by-step guide to automating email and chat replies for your small business — without sounding like a bot or losing customer trust.",
    answer:
      "Connect your inbox or chat platform to an AI agent trained on your tone, your FAQs, and your policies. The agent drafts or sends replies for routine questions — order status, hours, pricing, complaints — and flags anything complex for a human. The result is same-minute response times without hiring support staff.",
    pain:
      "Customer messages pile up. You answer the same five questions every day. One slow reply turns into a negative Google review. Hiring a customer service person costs $35,000–$50,000/year in BC for someone reliable enough to trust on their own. Most small businesses are caught between 'answer everything yourself' and 'can't afford help.'",
    steps: [
      "Audit one month of customer messages: list every question that came in and tag duplicates. You'll find 5–8 questions make up 70–80% of volume.",
      "Write authoritative answers to each — specific, accurate, and in your actual voice. These become the AI's source of truth.",
      "Choose where to deploy: email inbox (Gmail/Outlook), web chat, Instagram DMs, or SMS. Start with your highest-volume channel.",
      "Pick your integration path: native AI inbox tools (Front, Intercom, Freshdesk) for speed, or a custom GPT agent via API for full control.",
      "Set confidence thresholds: messages the AI is confident about get auto-replied; lower-confidence messages get a draft for your review; anything flagged as complaint or urgent routes to you immediately.",
      "Train on edge cases: run 50 sample messages through the system, check where it goes wrong, and update the knowledge base.",
      "Monitor weekly for the first month: track auto-reply rate, customer satisfaction, and escalation rate. Tune from there.",
    ],
    sections: [
      {
        heading: "The manual way (and why it breaks)",
        body: "You check your inbox when you have time — between jobs, at lunch, at 10pm. Response time averages hours, sometimes a day. The customer already messaged a competitor. When volume spikes (a promo, a bad review going viral, a seasonal rush), you fall further behind. You're not slow because you don't care — you're slow because you're running the whole business.",
        bullets: [
          "Customers increasingly expect a same-day reply — many won't wait more than an hour before messaging someone else",
          "A slow reply to a complaint is how a private problem turns into a public negative review",
          "Answering the same questions repeatedly is the highest-cost, lowest-value use of your time",
        ],
      },
      {
        heading: "What tools you need",
        body: "You need an inbox or chat platform that supports AI or automation hooks, a knowledge base (can be a simple Google Doc to start), and an automation layer to wire them together. If you use Gmail, Zapier + OpenAI API covers most cases. If you use a helpdesk (Freshdesk, Front), they have native AI features. For Instagram or SMS, you need a platform with those channel integrations.",
        bullets: [
          "Gmail + Zapier + OpenAI: ~$30–$60/month, handles email auto-reply",
          "Freshdesk or Front with AI: $15–$60/agent/month, built-in AI features",
          "Custom GPT agent (Business package): full control, any channel, custom tone — $3,500–$7,500 CAD build",
        ],
      },
      {
        heading: "What it costs to set up",
        body: "DIY email automation: 10–20 hours setup, $30–$60/month ongoing. DIY multi-channel: 30–60 hours, more complexity, higher chance of breaking. Hiring Handbuilt: Business package at $3,500–$7,500 CAD covers multi-channel setup, knowledge base build, confidence routing, complaint escalation, and a month of tuning. The math works if you're currently spending more than 30 minutes a day on routine replies — and most business owners are.",
      },
    ],
    packageId: "business",
    ctaLabel: "Get customer reply automation built",
    keywords: [
      "automate customer replies ai",
      "ai email automation small business canada",
      "automated inbox replies surrey bc",
      "customer support ai setup",
    ],
    related: [
      { label: "AI Customer Support Agent", href: "/services/ai-customer-support-agent" },
      { label: "AI Email Automation", href: "/services/ai-email-automation" },
      { label: "How Much Does AI Automation Cost", href: "/resources/how-much-does-ai-automation-cost" },
      { label: "Pricing", href: "/pricing" },
    ],
    faqs: [
      {
        q: "What if the AI sends a wrong answer to a customer?",
        a: "Set a confidence threshold so low-confidence replies go to draft, not auto-send. For high-stakes categories (refunds, complaints, legal questions), always route to a human. The goal isn't 100% automation — it's automating the easy 70% so you have time for the hard 30%.",
      },
      {
        q: "Can it match my writing style?",
        a: "Yes. You feed the system 20–30 examples of your actual replies and it learns your tone — casual, formal, friendly, clipped. It shouldn't sound like a generic support bot. If it does, the examples weren't specific enough.",
      },
      {
        q: "Will customers know they're talking to AI?",
        a: "That depends on your policy. Canada has no blanket rule forcing you to label AI in a customer-service email, but the rules move — check the current position before you rely on it. Our recommendation is to disclose anyway, because getting caught hiding it costs more trust than declaring it ever does. A one-line footer such as 'This reply was drafted with AI assistance' is enough, and it also gives the customer an obvious reason to ask for a human."
      },
    ],
    schema: "HowTo",
    icon: "Workflow",
  },
{
  slug: "automate-invoice-reminders",
  eyebrow: "How-to",
  h1: "How to Automate Invoice Reminders",
  title: "How to Automate Invoice Reminders",
  description: "Step-by-step guide to automating invoice payment reminders for small businesses — connect your invoicing tool, set a schedule, and stop chasing by hand.",
  answer: "To automate invoice reminders, connect your invoicing tool (QuickBooks, Wave, FreshBooks) to an automation layer, define a reminder schedule, write escalating message templates, and set a stop trigger that fires when payment is recorded. The system checks daily and sends the next message in sequence — without you touching it.",
  pain: "You forget to follow up on overdue invoices, or you find it awkward to chase clients for money — so late payments stay late longer than they should.",
  steps: [
    "Connect your invoicing tool — QuickBooks, Wave, FreshBooks, Jobber, or a spreadsheet — to the automation layer. This becomes the single source of truth for invoice status: sent, overdue, or paid.",
    "Define your reminder schedule. A typical sequence: 3 days before due (friendly heads-up), day-of (payment due today), 3 days overdue (gentle nudge), 7 days overdue (firm follow-up), 14 days overdue (escalation or manual handoff).",
    "Draft polite, escalating message templates. Start warm at the heads-up stage ('Just a friendly reminder — your invoice for [job] is due soon'). Get firmer at the overdue stages. Include a direct payment link in every message.",
    "Set up the auto-send trigger and the stop condition. The automation checks invoice status daily, sends the next message in sequence if the invoice is still unpaid, and stops the moment the invoicing tool marks it paid. No over-sending.",
    "Test with a real invoice before full rollout. Send yourself the complete sequence, confirm the payment link works, and verify the stop condition fires when you mark the invoice paid.",
    "After the first month, review which messages get the fastest payment responses and adjust timing or tone accordingly — then leave the system running."
  ],
  gets: [
    "Invoices get followed up on every time, not just when you remember.",
    "Awkward payment chasing is handled by the system — not a personal conversation.",
    "You see which clients are consistently late and can adjust terms proactively.",
    "Faster average payment time with less mental overhead."
  ],
  sections: [
    {
      heading: "Why Manual Invoice Follow-Up Fails",
      body: "Most small business owners forget to chase late invoices — not because they don't care, but because they're busy doing the actual work. The reminder falls off the to-do list, the client assumes no one noticed, and a 30-day net quietly becomes a 60-day net. Automating the sequence removes the memory dependency entirely."
    },
    {
      heading: "Tools That Work for Small Businesses",
      body: "You don't need expensive software to automate invoice reminders.",
      bullets: [
        "QuickBooks or FreshBooks + Zapier or Make.com: trigger messages when invoice status changes to overdue.",
        "Wave (free invoicing) + a simple automation tool: same principle at lower cost.",
        "Jobber (for contractors): has built-in client notification sequences that Handbuilt can extend into a full reminder system.",
        "A Google Sheet + automation layer: works for very simple setups with low invoice volume and no dedicated accounting tool."
      ]
    },
    {
      heading: "The Handbuilt Option",
      body: "Handbuilt builds done-for-you invoice reminder systems as part of the AI Starter System, starting at $1,500 CAD. It connects to your existing invoicing tool, writes the message sequences in your voice, configures the stop-on-payment logic, and hands over a running system. You don't configure anything — it just works."
    },
    {
      heading: "What This Won't Do",
      body: "Automated reminders work for straightforward payment situations. They don't replace a hard conversation with a client who is disputing an invoice, handle formal collections escalation, or manage any legal payment enforcement. Those situations still need a human — and possibly a lawyer."
    }
  ],
  packageId: "starter",
  ctaLabel: "Get this built",
  keywords: ["automate invoice reminders", "invoice reminder automation small business", "automated payment reminders", "invoice follow up automation canada", "small business invoice automation"],
  related: [
    { label: "AI Invoice Reminder System", href: "/services/ai-invoice-reminder-system" },
    { label: "AI Automation Examples for Small Business", href: "/resources/ai-automation-examples-for-small-business" },
    { label: "AI Lead Follow-Up Guide", href: "/resources/ai-lead-follow-up-guide" },
    { label: "AI Email Automation", href: "/services/ai-email-automation" },
    { label: "How to Automate Customer Replies", href: "/how-to/automate-customer-replies" },
    { label: "AI Automation Agency", href: "/ai-automation-agency" },
    { label: "Pricing", href: "/pricing" }
  ],
  faqs: [
    {
      q: "What if the client disputes the invoice?",
      a: "The automation can only follow up — it cannot resolve disputes. If a client replies with a dispute, the sequence stops and you handle it manually. That is the right call — dispute resolution needs a human."
    },
    {
      q: "Will automated reminders damage client relationships?",
      a: "Not if they're written politely. Most people appreciate a polite reminder — they're busy too. A friendly, clearly automated message is far less awkward than a tense personal phone call two months later. Tone matters more than the fact that it's automated."
    },
    {
      q: "Can I set different schedules for different clients?",
      a: "Yes — with a bit of setup, you can tag clients or invoice types with different sequences. New clients get a gentler sequence; repeat late-payers get a tighter one. Handbuilt can configure this logic during the build."
    },
    {
      q: "What if the client pays between scheduled messages?",
      a: "The stop condition fires the moment payment is recorded in your invoicing tool. If a client pays at 11pm on a Tuesday, the next morning's reminder does not send. The system checks status before every message goes out."
    },
    {
      q: "Does this work for recurring invoices?",
      a: "Yes — recurring invoices generate new reminder sequences each billing cycle. As long as the invoicing tool marks each invoice separately, the automation treats each one independently."
    }
  ],
  schema: "HowTo"
},
  {
    slug: "automate-review-requests",
    eyebrow: "How-to",
    h1: "How to Automate Review Requests",
    title: "How to Automate Review Requests (Step by Step) | Handbuilt",
    description:
      "How to ask every finished customer for a review automatically, and how to do it without breaking Google's rules — the compliance line, the timing, and what actually lifts response rates.",
    answer:
      "To automate review requests, fire a short personalised ask as soon as a job closes, send it by text or email with a one-tap link to your review page, and follow up once if nobody responds. The rule that matters more than any of the mechanics: send the same link to every customer. Filtering who gets asked based on how happy you think they are is review gating, it breaks Google's policies, and it can cost you the reviews you already have.",
    pain:
      "You do good work and have a handful of reviews, because asking feels awkward and you are onto the next job before you remember. Meanwhile the one unhappy customer you ever had found the review page without any prompting at all.",
    steps: [
      "Pick the trigger — job completed, invoice paid, or appointment finished. Closest to the moment of satisfaction wins.",
      "Wait a short, deliberate delay — long enough that the crew has left, short enough that the job is still fresh. An hour or two suits most trades.",
      "Send a short, personalised request by text or email that references the actual job, not a generic template.",
      "Link straight to your Google review page so it is one tap, not a search.",
      "Send the same link to everyone. No screening, no satisfaction question deciding who gets asked.",
      "Offer a private feedback channel alongside the public link, so an unhappy customer can reach you directly as well — not instead.",
      "Follow up once, politely, after a day or two. Then stop.",
    ],
    gets: [
      "An automatic ask after every finished job, by SMS and/or email",
      "One-tap links that remove the friction most people never get past",
      "A single gentle follow-up that catches the non-responders",
      "A private channel so problems reach you directly as well as publicly",
    ],
    sections: [
      {
        heading: "The compliance line, stated plainly",
        body: "This is the part most review-automation marketing gets wrong, so here it is directly.\n\nAsking every customer for an honest review is fine and encouraged. Asking only the customers you predict will say something nice is review gating. Google's policies prohibit it, and the enforcement risk is not theoretical — it can affect the reviews already on your profile, which is a far worse outcome than having fewer reviews.\n\nThe common dressed-up version is a tool that asks 'how did we do?' first and only shows the Google link to people who answer positively, routing everyone else to a private form. That is gating with an extra step. If a product sells you 'sentiment routing' or 'catch the unhappy ones before they post', that is what it means.\n\nThe compliant pattern is genuinely simple: everyone gets the same link, and you additionally give them a private way to tell you if something went wrong. Both, not either.",
      },
      {
        heading: "Why timing and routing matter",
        body: "Ask when the customer is happiest — right after the work is done — and make leaving the review effortless. Most review requests fail on friction rather than goodwill: a customer who has to open Google, search your business name and find the review button will not do it from a job site parking lot, no matter how pleased they are.\n\nThe private channel is worth as much as the public one. It is how you hear about a problem while you can still fix it, and a customer who feels heard privately often posts publicly anyway.",
      },
      {
        heading: "What no tool can do for you",
        body: "No system can post a review on a customer's behalf. Only the customer can, from their own account — that is enforced by the platform, not a limitation of the software. Any product implying otherwise is describing something that does not exist, or something you do not want any part of.\n\nWhat automation actually does is narrow: it makes sure the ask goes out every single time, worded well, at the right moment, with the friction removed. That is the entire mechanism. It is also, in practice, the thing that never happens manually.",
      },
    ],
    keywords: ["how to automate review requests", "automate google reviews", "review request automation", "get more reviews automatically", "review gating google policy"],
    related: [
      { label: "AI Review Engine", href: "/services/ai-review-engine" },
      { label: "Google Business Profile Lead Automation", href: "/use-cases/google-business-profile-lead-automation" },
      { label: "Best AI Automations for Service Businesses", href: "/resources/best-ai-automations-for-service-businesses" },
    ],
    faqs: [
      { q: "Does automating reviews violate Google's rules?", a: "Automating the ask does not. Filtering who gets asked does. Send every customer the same link and you are inside the rules; screen for likely-positive customers first and you are not, however the tool describes it." },
      { q: "What about the customer who is going to leave one star?", a: "They get the same link as everyone else, and they also get a private channel that reaches you directly. You lose the ability to suppress them and gain the ability to hear about the problem early. That trade is both the compliant option and, over a year of reviews, the better one." },
      { q: "Which platforms can it request reviews on?", a: "Most commonly Google, since that is what affects local search. Facebook or an industry site can be added where they matter for your trade. Note the wording: it requests reviews and directs customers to the right page — it cannot post them." },
      { q: "How many requests should I send?", a: "The initial ask and one follow-up. Beyond that the return collapses and you start annoying people who already decided. Stop after two." },
    ],
    ctaLabel: "Automate my reviews",
    schema: "HowTo",
    icon: "Star"
  }
];

export function getHowto(slug: string): LandingContent | undefined {
  return howtos.find((h) => h.slug === slug);
}
