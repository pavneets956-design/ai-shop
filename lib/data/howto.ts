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
          "Leads who get a reply within 5 minutes are 9× more likely to convert (Harvard Business Review, 2011 — still holds)",
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
        a: "You configure a fallback: typically the bot asks for the visitor's name and email, or shows your phone number. The goal is to never lose a lead just because the bot hit a gap.",
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
        body: "DIY: 10–20 hours to map your pricing, build the form, wire the automation, and test edge cases. Tools cost $0–$70/month ongoing. Hiring Handbuilt: Starter package at $1,500 CAD covers the full quote automation — form, pricing logic, email template, and CRM logging. Most clients recover the cost within the first month from leads they would have lost overnight.",
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
          "BC minimum wage 2024: $17.40/hour — a part-time receptionist (20 hrs/week) costs $1,400+/month",
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
        heading: "What it costs to set up",
        body: "DIY: 15–30 hours to build the script, configure the platform, connect the calendar, and test. Ongoing: $50–$200/month in platform fees. Hiring Handbuilt: Starter package at $1,500 CAD — script, platform setup, calendar integration, escalation routing, and one round of live testing. You get a working receptionist faster than you'd finish reading the platform docs.",
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
      { label: "What Is an AI Receptionist", href: "/resources/what-is-an-ai-receptionist" },
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
        a: "Current voice AI (ElevenLabs, PlayHT voices) sounds close to human in normal conversation. Callers sometimes can't tell. The bigger factor is the script — a natural, conversational script matters more than the voice model.",
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
        a: "That depends on your policy. In Canada there's no legal requirement to disclose AI in customer service emails (as of 2024), but being transparent builds more trust than trying to hide it. Most of our clients use a light footer note: 'This reply was drafted with AI assistance.' Customers rarely object.",
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
    { label: "What Can AI Automate for a Small Business?", href: "/resources/what-can-ai-automate-small-business" },
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
      a: "Not if they're written politely. Most clients appreciate a reminder — they're busy too. A friendly, clearly automated message is far less awkward than a tense personal phone call two months later. Tone matters more than the fact that it's automated."
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
    slug: "automate-youtube-shorts",
    eyebrow: "How-to",
    h1: "How to Automate YouTube Shorts From Your Long Videos",
    title: "How to Automate YouTube Shorts (Step by Step) | Handbuilt",
    description:
      "Turn every long video into a week of Shorts automatically. A step-by-step way to clip, caption, reframe and schedule Shorts from your existing content.",
    answer:
      "To automate YouTube Shorts, set up a pipeline that scans each long video for high-retention, self-contained moments, clips them, adds captions, reframes them to vertical, and queues them as Shorts for review. Done right, one long upload becomes 5–10 Shorts a week with only a quick approval step from you.",
    steps: [
      "Define what makes a strong clip for your channel — a hook, a payoff, a self-contained point.",
      "Use a clip-detection tool (or a built pipeline) to scan each long video for those moments.",
      "Auto-caption each clip and reframe it from horizontal to vertical 9:16.",
      "Draft a short title and hook for each clip so it stands alone in the feed.",
      "Queue the clips as Shorts on a schedule and review them before they publish.",
    ],
    gets: [
      "5–10 Shorts from every long video",
      "Captions and vertical reframing done automatically",
      "A steady discovery feed without extra filming",
    ],
    sections: [
      {
        heading: "Do it with tools, or have it built",
        body: "You can stitch this together with off-the-shelf clip tools if you're comfortable maintaining them. If you'd rather it just run, Handbuilt builds the whole pipeline around your channel and clip style so you only approve the output.",
      },
    ],
    keywords: ["how to automate youtube shorts", "automate shorts from long videos", "youtube shorts automation", "repurpose long video to shorts"],
    related: [
      { label: "AI YouTube Shorts Automation", href: "/creators/ai-youtube-shorts-automation" },
      { label: "AI Content Repurposing System", href: "/creators/ai-content-repurposing-system" },
      { label: "AI Tools for Content Creators", href: "/creators/ai-tools-for-content-creators" },
    ],
    faqs: [
      { q: "How many Shorts can one long video make?", a: "Typically 5–10, depending on length and how many self-contained moments it has. A 20-minute video usually yields a week's worth." },
      { q: "Will this hurt my long-form views?", a: "Used well, Shorts drive new viewers to your long-form. Queue clips that tease the full video rather than give everything away." },
    ],
    ctaLabel: "Automate my Shorts",
    schema: "HowTo",
    icon: "Youtube"
  },
  {
    slug: "build-faceless-content-system",
    eyebrow: "How-to",
    h1: "How to Build a Faceless Content System",
    title: "How to Build a Faceless Content System (Step by Step) | Handbuilt",
    description:
      "A step-by-step blueprint for a faceless channel that produces at volume — research, scripts, licensed voiceover, visuals, editing and publishing, safely monetisable.",
    answer:
      "To build a faceless content system, connect five stages into one pipeline: topic research, scripting, licensed voiceover, visual assembly, and editing plus publishing. The key to lasting is using original scripts and licensed voices and assets so the channel stays monetisation-safe, and keeping a human approval step on quality.",
    steps: [
      "Pick a defined niche and format so every video follows a repeatable template.",
      "Set up topic research that feeds a scripting step in a consistent voice.",
      "Convert scripts to voiceover using a properly licensed voice (or a consented clone of your own).",
      "Assemble visuals and b-roll from licensed or original sources to match the script.",
      "Automate the edit, then queue finished videos for your review and scheduled upload.",
    ],
    gets: [
      "A repeatable research → script → voice → visuals → edit pipeline",
      "Licensed voice and assets so the channel is safe to monetise",
      "Volume without doing every step by hand",
    ],
    sections: [
      {
        heading: "Staying monetisable",
        body: "Faceless channels get demonetised when they rely on reused content, unlicensed assets or low-effort mass production. Original scripting, licensed voices and assets, and a human quality check are what keep a faceless channel eligible and growing. Handbuilt builds the full system with those guardrails in place.",
      },
    ],
    keywords: ["how to build a faceless content system", "faceless youtube channel automation", "faceless content system", "automate faceless channel"],
    related: [
      { label: "AI Faceless Channel Automation", href: "/creators/ai-faceless-channel-automation" },
      { label: "AI Text-to-Speech for Creators", href: "/creators/ai-text-to-speech-for-creators" },
      { label: "AI Script Writing System", href: "/creators/ai-script-writing-system" },
    ],
    faqs: [
      { q: "Are faceless channels allowed to monetise?", a: "Yes, when the content is original and adds value. Platforms penalise reused or low-effort mass-produced content, not faceless formats themselves." },
      { q: "Do I need to be technical to run one?", a: "To build and maintain the pipeline, usually yes. Handbuilt builds it for you so you direct the channel and approve videos without wiring the tools yourself." },
    ],
    ctaLabel: "Build my faceless system",
    schema: "HowTo",
    icon: "Film"
  },
  {
    slug: "automate-missed-calls",
    eyebrow: "How-to",
    h1: "How to Automate Missed Calls for Your Business",
    title: "How to Automate Missed Calls (Step by Step) | Handbuilt",
    description:
      "Stop losing jobs to voicemail. A step-by-step way to automatically text back every missed call and turn it into a booked lead instead of a lost one.",
    answer:
      "To automate missed calls, set up a system that instantly texts back anyone whose call you couldn't answer, then uses AI to answer their questions, qualify them, and book or route the lead. Done right, a missed call becomes a live conversation within seconds instead of a lost customer who never leaves a voicemail.",
    steps: [
      "Connect a missed-call trigger to your business phone number.",
      "Set an instant, on-brand text-back — \"Sorry we missed you, how can we help?\"",
      "Add an AI assistant to answer questions and qualify the lead in the text thread.",
      "Let it book the job into your calendar, or route hot leads to you.",
      "Track recovered leads so you can see the missed-call revenue you're now keeping.",
    ],
    gets: [
      "Instant text-back on every missed call",
      "Leads engaged before they call a competitor",
      "Booking or routing built in",
      "Visibility into recovered revenue",
    ],
    sections: [
      {
        heading: "DIY or done-for-you",
        body: "Some phone systems and CRMs offer basic missed-call text-back you can set up yourself. For AI that actually answers, qualifies and books — trained on your business — Handbuilt builds the full system on your number so nothing falls through.",
      },
    ],
    keywords: ["how to automate missed calls", "missed call text back setup", "automate missed call follow up", "stop losing missed calls"],
    related: [
      { label: "Missed-Call Automation", href: "/use-cases/missed-call-automation" },
      { label: "AI Receptionist", href: "/ai-receptionist" },
      { label: "AI Receptionist for Contractors", href: "/ai-receptionist-for-contractors" },
    ],
    faqs: [
      { q: "How fast does the text go out?", a: "Within seconds of the missed call, while the caller still has their phone in hand — which is exactly why it recovers so many leads." },
      { q: "Can it book the job, not just text?", a: "Yes — with an AI assistant in the thread, it can qualify the lead and book directly into your calendar, or hand complex cases to you." },
    ],
    ctaLabel: "Automate my missed calls",
    schema: "HowTo",
    icon: "Phone"
  },
  {
    slug: "automate-review-requests",
    eyebrow: "How-to",
    h1: "How to Automate Review Requests",
    title: "How to Automate Review Requests (Step by Step) | Handbuilt",
    description:
      "Get more 5-star reviews on autopilot. A step-by-step way to automatically ask happy customers for reviews at the right moment and grow your local reputation.",
    answer:
      "To automate review requests, trigger a personalised ask right after a job is completed or an appointment ends, send it by text or email with a direct link to your review page, and follow up once if there's no response. Timing and a one-tap link are what turn happy customers into the reviews that win local search.",
    steps: [
      "Pick the trigger — job completed, invoice paid, or appointment finished.",
      "Send a short, personalised request by text or email with a direct review link.",
      "Make it one tap — link straight to your Google (or preferred) review page.",
      "Follow up once, politely, if there's no response after a day or two.",
      "Route any unhappy feedback to you privately before it becomes a public review.",
    ],
    gets: [
      "Automatic review asks at the perfect moment",
      "One-tap links that lift response rates",
      "A gentle follow-up that catches non-responders",
      "Private routing for unhappy feedback",
    ],
    sections: [
      {
        heading: "Why timing and routing matter",
        body: "Ask at the moment a customer is happiest — right after the work is done — and make leaving a review effortless. Routing unhappy feedback to you first (rather than straight to a public page) lets you fix issues privately and protects your rating. We build both into the flow.",
      },
    ],
    keywords: ["how to automate review requests", "automate google reviews", "review request automation", "get more reviews automatically"],
    related: [
      { label: "AI Review Request System", href: "/services/ai-review-request-system" },
      { label: "Google Business Profile Lead Automation", href: "/use-cases/google-business-profile-lead-automation" },
      { label: "Best AI Automations for Service Businesses", href: "/resources/best-ai-automations-for-service-businesses" },
    ],
    faqs: [
      { q: "Does automating reviews violate Google's rules?", a: "Asking all customers for honest reviews is fine; selectively soliciting only positive ones or gating reviews can violate platform policies. We build a compliant flow that asks everyone and routes concerns to you privately." },
      { q: "Which platforms can it request reviews on?", a: "Most commonly Google, plus others like Facebook or industry sites. We point the flow at wherever reviews matter most for your business." },
    ],
    ctaLabel: "Automate my reviews",
    schema: "HowTo",
    icon: "Star"
  }
];

export function getHowto(slug: string): LandingContent | undefined {
  return howtos.find((h) => h.slug === slug);
}
