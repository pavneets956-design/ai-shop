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
        body: "DIY with an off-the-shelf widget: free to $50/month ongoing, 1–3 days of your own time to configure. DIY custom build: 20–40 hours of dev time plus API costs. Hiring Handbuilt: Starter package at $1,000 CAD flat — includes chatbot build, knowledge base setup, embed, and two weeks of monitoring. You get a working chatbot faster than you'd finish the DIY research.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get a chatbot built for $1,000 CAD",
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
        body: "DIY: 10–20 hours to map your pricing, build the form, wire the automation, and test edge cases. Tools cost $0–$70/month ongoing. Hiring Handbuilt: Starter package at $1,000 CAD flat covers the full quote automation — form, pricing logic, email template, and CRM logging. Most clients recover the cost within the first month from leads they would have lost overnight.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get quote automation built for $1,000 CAD",
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
        body: "DIY: 15–30 hours to build the script, configure the platform, connect the calendar, and test. Ongoing: $50–$200/month in platform fees. Hiring Handbuilt: Starter package at $1,000 CAD flat — script, platform setup, calendar integration, escalation routing, and one round of live testing. You get a working receptionist faster than you'd finish reading the platform docs.",
      },
    ],
    packageId: "starter",
    ctaLabel: "Get an AI receptionist set up for $1,000 CAD",
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
          "Custom GPT agent (Business package): full control, any channel, custom tone — $2,500–$5,000 CAD build",
        ],
      },
      {
        heading: "What it costs to set up",
        body: "DIY email automation: 10–20 hours setup, $30–$60/month ongoing. DIY multi-channel: 30–60 hours, more complexity, higher chance of breaking. Hiring Handbuilt: Business package at $2,500–$5,000 CAD covers multi-channel setup, knowledge base build, confidence routing, complaint escalation, and a month of tuning. The math works if you're currently spending more than 30 minutes a day on routine replies — and most business owners are.",
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
];

export function getHowto(slug: string): LandingContent | undefined {
  return howtos.find((h) => h.slug === slug);
}
