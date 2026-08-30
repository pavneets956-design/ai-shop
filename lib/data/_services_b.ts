import type { LandingContent } from "./landing";

export const servicesB: LandingContent[] = [
  {
    slug: "ai-intake-form-builder",
    eyebrow: "AI Service",
    h1: "AI Intake Form Builder",
    title: "AI Intake Form Builder | Handbuilt",
    description: "Smart intake forms that ask the right follow-up questions, qualify leads automatically, and route submissions to your inbox or CRM. From $1,500 CAD.",
    answer: "A standard contact form collects a name and email and stops there. Handbuilt builds AI-powered intake forms that adapt their questions based on what the visitor types — qualifying budget, scope, and timeline before you ever pick up the phone. Submissions route to your inbox, CRM, or calendar. Starts at $1,500 CAD.",
    pain: "Generic contact forms waste your time on tire-kickers and miss key details that would let you quote fast.",
    scenario: "Take a Langley kitchen renovation contractor spending roughly 45 minutes on every inquiry call just gathering measurements and budget range before they can even scope the job. An adaptive intake form collecting room dimensions, material preferences, and rough budget upfront could cut that first call to maybe 15 minutes — and filter out the leads who are nowhere near budget before they ever reach the phone. The exact time savings depend on how much your current process front-loads qualification.",
    steps: [
      "We map the questions that matter most for your quoting or intake process",
      "We build conditional logic so the form asks smarter follow-ups based on each answer",
      "Completed submissions route to your inbox, CRM, or trigger a calendar invite",
      "We test on real traffic and refine in the first two weeks"
    ],
    gets: [
      "Adaptive intake form with conditional question logic",
      "Auto-routing to inbox, CRM, or calendar",
      "Lead qualification score on every submission",
      "Embed code for your website or landing page"
    ],
    packageId: "starter",
    ctaLabel: "Build my intake form",
    keywords: [
      "ai intake form builder",
      "smart lead qualification form",
      "automated intake form small business",
      "ai contact form for contractors"
    ],
    related: [
      { label: "AI Lead Capture Form", href: "/services/ai-lead-capture-form" },
      { label: "AI Quote Generator", href: "/services/ai-quote-generator" },
      { label: "Contractor AI Automation", href: "/industries/contractor-ai-automation" },
      { label: "Pricing", href: "/pricing" }
    ],
    faqs: [
      { q: "How is this different from a regular form builder like Typeform?", a: "Standard form builders follow a fixed script. This form uses AI logic to branch based on answers — so a visitor who selects 'commercial' sees different follow-up questions than one who selects 'residential', without you building every branch manually." },
      { q: "Where do the submissions go?", a: "Anywhere you want — your email, a CRM like HubSpot or Jobber, a Google Sheet, or a Slack channel. We set up the routing as part of the build." }
    ],
    schema: "Service",
    icon: "FileSearch",
  },
  {
    slug: "ai-sales-assistant",
    eyebrow: "AI Service",
    h1: "AI Sales Assistant",
    title: "AI Sales Assistant | Handbuilt",
    description: "An AI sales assistant that qualifies leads, sends follow-ups, and keeps warm prospects engaged — so no deal goes cold from neglect. From $3,500 CAD.",
    answer: "Sales opportunities go cold when follow-up slips. Handbuilt builds an AI sales assistant that monitors your pipeline, sends the right message at the right stage, qualifies inbound leads with smart questions, and alerts you only when a prospect is ready to talk price. Typically $3,500 CAD as part of the Business AI System.",
    pain: "The leads you already paid to generate go cold because follow-up is manual, inconsistent, and easy to skip when you're busy on the job.",
    scenario: "Say a commercial cleaning company quotes roughly 20 new prospects a month but closes fewer than 4 — a 20% close rate that's partly a price issue and partly prospects going quiet after one email with no follow-up. An AI sales assistant sending a short sequence of value-touch emails and a check-in text over two weeks keeps those deals from dying silently. The lift in close rate depends on why those deals were going cold, but consistently following up on warm leads almost always moves the number.",
    steps: [
      "We map your current sales stages and the typical questions at each one",
      "We write follow-up sequences for each stage and outcome",
      "The assistant monitors your CRM or inbox and fires messages based on deal status",
      "Hot leads trigger an alert to you; cold ones stay in nurture automatically"
    ],
    gets: [
      "Automated lead qualification and follow-up sequences",
      "CRM or inbox integration to track deal stage",
      "Real-time alerts when a prospect re-engages",
      "Monthly pipeline report with open and conversion rates"
    ],
    packageId: "business",
    ctaLabel: "Stop losing warm leads",
    keywords: [
      "ai sales assistant small business",
      "automated sales follow up ai",
      "ai lead nurture system",
      "ai crm follow up automation"
    ],
    related: [
      { label: "AI CRM Automation", href: "/services/ai-crm-automation" },
      { label: "AI Lead Capture Form", href: "/services/ai-lead-capture-form" },
      { label: "Real Estate Agent AI Automation", href: "/industries/real-estate-agent-ai-automation" },
      { label: "Pricing", href: "/pricing" }
    ],
    faqs: [
      { q: "Does this replace my CRM?", a: "No — it works with whatever CRM you already use. If you're not using one yet, we'll set up a simple pipeline as part of the build." },
      { q: "Will prospects know they're talking to AI?", a: "The messages are written in your voice and sent from your email or number. We'll discuss your preference on disclosure during the brief — some clients want a note that replies are automated, others prefer not to." },
      { q: "What if a prospect replies with a complex question?", a: "The assistant handles common objections and questions from your prepared knowledge base. Anything outside that scope gets flagged and routed to you." }
    ],
    schema: "Service",
    icon: "TrendingUp",
  },
  {
    slug: "ai-admin-assistant",
    eyebrow: "AI Service",
    h1: "AI Admin Assistant",
    title: "AI Admin Assistant | Handbuilt",
    description: "An AI that handles scheduling, inbox triage, data entry, and routine admin tasks — so you stop drowning in low-value work. From $3,500 CAD.",
    answer: "Repetitive admin — sorting emails, entering data, confirming appointments, chasing documents — is work that needs to happen but doesn't need you personally. Handbuilt builds an AI admin assistant that handles the routine layer of your back office and surfaces only the decisions that need a human. Typically $3,500 CAD as part of the Business AI System.",
    pain: "Every hour you spend on data entry, inbox sorting, and appointment confirmations is an hour not spent on work that actually grows the business.",
    scenario: "Picture a sole-practitioner accountant spending roughly 90 minutes a day on client email triage, document request follow-ups, and appointment reminders — structured, repeating work that takes real time but doesn't need a professional to do it. An AI admin assistant handling all three could reclaim most of that time: drafting email responses for review, chasing missing documents on a schedule, sending SMS reminders before each appointment. The exact recovery depends on client volume and how consistent the patterns are, but 60–75 minutes a day is a reasonable ballpark for a practice this size.",
    steps: [
      "We audit the 5–10 admin tasks that eat the most time each week",
      "We build automations for each task and connect them to your existing tools",
      "The assistant operates in the background and surfaces exceptions for your review",
      "We check in at day 30 to add tasks or adjust workflows"
    ],
    gets: [
      "Automated inbox triage and draft replies",
      "Appointment reminders and document request follow-ups",
      "Data entry automation connected to your tools",
      "Exception alerts when something needs a human decision"
    ],
    packageId: "business",
    ctaLabel: "Clear my admin backlog",
    keywords: [
      "ai admin assistant small business",
      "automate admin tasks ai",
      "ai back office automation",
      "virtual ai admin for small business"
    ],
    related: [
      { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
      { label: "AI Email Automation", href: "/services/ai-email-automation" },
      { label: "Salon AI Automation", href: "/industries/salon-ai-automation" },
      { label: "Pricing", href: "/pricing" }
    ],
    faqs: [
      { q: "What tools does it connect to?", a: "Google Workspace, Outlook, Calendly, Jobber, QuickBooks, and most common small-business tools. We confirm compatibility during the discovery call." },
      { q: "Does it have access to my email permanently?", a: "We use read-only access for triage and draft replies in a staging folder for your approval. It does not send anything without your explicit sign-off unless you opt into that later." }
    ],
    schema: "Service",
    icon: "Bot",
  },
  {
    slug: "ai-document-generator",
    eyebrow: "AI Service",
    h1: "AI Document Generator",
    title: "AI Document Generator | Handbuilt",
    description: "Generate contracts, service agreements, SOPs, and client docs in seconds from a form — consistent, on-brand, and ready to sign. From $1,500 CAD.",
    answer: "Writing the same contract or service agreement from scratch every time is slow and inconsistent. Handbuilt builds an AI document generator that takes a short form — client name, scope, price, dates — and outputs a formatted, brand-consistent document ready to send or sign. Starts at $1,500 CAD.",
    pain: "Copy-pasting last week's contract and forgetting to change the client name is how mistakes happen — and how unprofessional documents end up in front of clients.",
    scenario: "Take a Chilliwack home inspector drafting a new inspection agreement for every booking — roughly 12 a week — by editing a Word template by hand each time. An AI document generator pulling details from the booking could produce each agreement in seconds, with the client's name, property address, and scope pre-filled and a PDF ready to send. At 12 agreements a week, that's a meaningful chunk of time that currently requires zero judgment but consumes it anyway.",
    steps: [
      "We audit the documents you produce repeatedly and identify the variable fields",
      "We build a template and a simple input form to populate them",
      "The generator outputs a formatted PDF or Google Doc ready to send or e-sign",
      "We add your logo, fonts, and clause library"
    ],
    gets: [
      "AI document generator for your most-used document types",
      "Branded PDF or Google Doc output",
      "Auto-send to client on completion",
      "Clause library for scope variations"
    ],
    packageId: "starter",
    ctaLabel: "Generate docs instantly",
    keywords: [
      "ai document generator small business",
      "automated contract generator",
      "ai service agreement creator",
      "auto generate business documents"
    ],
    related: [
      { label: "AI Quote & Proposal Generator", href: "/services/ai-quote-generator" },
      { label: "AI Invoice Reminder System", href: "/services/ai-invoice-reminder-system" },
      { label: "HVAC AI Automation", href: "/industries/hvac-ai-automation" },
      { label: "Pricing", href: "/pricing" }
    ],
    faqs: [
      { q: "Can it handle different contract types?", a: "Yes. We build one template per document type you need — service agreement, change order, scope letter, whatever you use most. Each has its own input form." },
      { q: "Does it support e-signatures?", a: "We can connect to DocuSign, HelloSign, or Adobe Sign to send the document for signature immediately after generation — no downloading and re-uploading." }
    ],
    schema: "Service",
    icon: "PenTool",
  },
  {
    slug: "ai-voice-agent",
    eyebrow: "AI Service",
    h1: "AI Voice Agent",
    title: "AI Voice Agent | Handbuilt",
    description: "A phone agent that answers calls, qualifies leads, takes messages, and books appointments — 24/7, no hold music. From $3,500 CAD.",
    answer: "Missed calls are missed revenue, and hiring a receptionist to cover after-hours isn't feasible for most small businesses. Handbuilt builds an AI voice agent that answers your business line, handles common caller questions, qualifies leads, and books appointments directly into your calendar — day or night. Typically $3,500 CAD as part of the Business AI System.",
    pain: "A call that goes to voicemail at 7pm is a lead that calls your competitor at 7:01pm.",
    scenario: "Say a Surrey HVAC company is missing roughly 8–10 calls a week outside business hours — mostly homeowners calling when the heat stops working and who will dial the next result in Google if they hit voicemail. An AI voice agent answering after hours, collecting the address and problem description, and slotting an emergency or next-day booking into the dispatch system could recover most of those calls. The dollar value depends on average job size, but for a shop doing furnace repairs and heat pump service, 8–10 recovered jobs a month adds up quickly.",
    steps: [
      "We script the call flow based on your most common caller types and questions",
      "We configure the voice agent on your existing business number (no new number needed)",
      "It connects to your calendar or dispatch system to book in real time",
      "We review call transcripts at day 14 and refine any weak spots"
    ],
    gets: [
      "AI voice agent on your existing business line",
      "Live calendar or dispatch booking during the call",
      "Call transcript and summary to your inbox after each call",
      "Escalation to your mobile for urgent situations"
    ],
    packageId: "business",
    ctaLabel: "Get my calls answered",
    keywords: [
      "ai voice agent small business",
      "ai phone answering service",
      "automated phone receptionist",
      "ai call answering after hours"
    ],
    related: [
      { label: "AI Receptionist Setup", href: "/services/ai-receptionist-setup" },
      { label: "AI Calendar Booking Agent", href: "/services/ai-calendar-booking-agent" },
      { label: "HVAC AI Automation", href: "/industries/hvac-ai-automation" },
      { label: "Pricing", href: "/pricing" }
    ],
    faqs: [
      { q: "Does it use my existing phone number?", a: "Yes. We forward your line to the AI agent during off-hours (or all hours if you want) — callers dial the same number they always have." },
      { q: "How natural does it sound?", a: "Modern AI voice is conversational enough that most callers don't realize they're talking to an agent — especially for structured tasks like booking and info collection. We test it thoroughly before go-live." },
      { q: "What happens if the caller has a complex issue?", a: "The agent takes a message with all the relevant details and routes it to you immediately. It does not attempt to handle situations outside its defined scope." }
    ],
    schema: "Service",
    icon: "PhoneCall",
  },
  {
    slug: "ai-workflow-automation",
    eyebrow: "AI Service",
    h1: "AI Workflow Automation",
    title: "AI Workflow Automation | Handbuilt",
    description: "Connect your tools and automate the manual steps between them — no more copy-paste between apps or chasing the same data in two places. From $3,500 CAD.",
    answer: "Most small businesses run on 5–10 apps that don't talk to each other — so someone (usually you) manually moves data between them all day. Handbuilt maps your actual workflow and builds AI-powered automations that connect your tools, eliminate the manual steps, and flag exceptions for human review. Typically $3,500 CAD as part of the Business AI System.",
    pain: "Manual data transfer between apps is the hidden full-time job inside every small business — and it's entirely automatable.",
    scenario: "Imagine a Maple Ridge pest control company running Jobber for scheduling, QuickBooks for invoicing, and Gmail for client communication — three separate apps with no connection. Office staff might be manually re-entering job details into QuickBooks after every completed job and sending follow-up emails by hand. Workflow automation tying those three together could eliminate that manual transfer entirely: job data moves to QuickBooks at job close, follow-up email fires automatically. The time saved depends on job volume, but at 20+ jobs a week the re-entry alone is a significant daily drain.",
    steps: [
      "We walk your actual daily workflow step by step and identify every manual transfer",
      "We prioritize the 3–5 automations with the highest time savings",
      "We build and test each automation with real data before going live",
      "We monitor for errors in the first 30 days and fix edge cases as they appear"
    ],
    gets: [
      "Custom workflow automations between your existing tools",
      "Error monitoring and exception alerts",
      "Documentation of every automation built",
      "30-day support window after go-live"
    ],
    packageId: "business",
    ctaLabel: "Automate my workflow",
    keywords: [
      "ai workflow automation small business",
      "business process automation canada",
      "automate apps small business",
      "workflow automation for service business"
    ],
    related: [
      { label: "AI CRM Automation", href: "/services/ai-crm-automation" },
      { label: "AI Invoice Reminder System", href: "/services/ai-invoice-reminder-system" },
      { label: "Pest Control AI Automation", href: "/industries/pest-control-ai-automation" },
      { label: "Pricing", href: "/pricing" }
    ],
    faqs: [
      { q: "Which tools can you connect?", a: "Most common small-business tools — Jobber, QuickBooks, Xero, HubSpot, Google Workspace, Outlook, Slack, Stripe, and hundreds more via standard APIs. We confirm compatibility upfront." },
      { q: "What if an automation breaks when a tool updates?", a: "We build monitoring into every automation. If a connection breaks, you get an alert and we fix it — covered under the 30-day support window, and available as an ongoing retainer after that." }
    ],
    schema: "Service",
    icon: "Workflow",
  },
  {
    "slug": "ai-review-engine",
    "eyebrow": "AI Service",
    "icon": "MessagesSquare",
    "schema": "Service",
    "ctaLabel": "Set up my Review Engine",
    "h1": "How do I get more Google reviews without chasing customers?",
    "title": "AI Review Engine: Automatic Google Reviews on Autopilot | Handbuilt",
    "description": "An AI Review Engine that asks every finished customer for an honest review, gives everyone the same Google link, and copies you on the feedback. From $1,000 to set up, then $49/mo.",
    "answer": "An AI Review Engine is a managed system that asks every customer for a review after their job finishes, invites all of them to review it publicly using the same link, and copies you on what they say so you can follow up on problems directly. It does not screen anyone out of reviewing. Handbuilt builds it on your real jobs and runs it for you — connected to Google Business, Twilio SMS and Gmail. It costs from $1,000 CAD to set up, then $49/mo to run.",
    "pain": "You ask for reviews when you remember to, which is rarely — so most satisfied customers never leave one. Your rating ends up built on a handful of replies instead of the work you actually do.",
    "scenario": "Take a Langley HVAC outfit closing maybe 12 to 15 service calls a week. The owner means to ask for reviews but is on the next call before the van's even packed up, so a strong month brings in two or three. With a Review Engine, every completed call triggers a text an hour later: a quick \"how did we do?\" Everyone gets the same one-tap link to the Google profile, and every reply is copied to the owner's inbox — so the rare unhappy one reaches them directly as well, not instead. A shop in that range could plausibly move from a trickle of reviews to a steadier flow each week — the exact lift depends on job volume and how happy the customer base already is.",
    "steps": [
      "We connect the Engine to Google Business, your SMS line (Twilio) and Gmail, and to your job or invoicing tool so it knows when a job is done",
      "Each finished job triggers a short review request by text or email in your brand voice",
      "Every customer gets the same direct Google review link, and their reply is copied to you so problems reach you too",
      "We watch the numbers and tune timing and wording so more requests turn into posted reviews"
    ],
    "gets": [
      "A review request fired automatically after every finished job, by SMS and/or email",
      "Honest-feedback flow: one review link for everyone, plus a private channel so you hear about problems",
      "Connected to Google Business, Twilio SMS and Gmail — we set it all up",
      "A monthly report of requests sent, reviews posted and issues caught early"
    ],
    "keywords": [
      "ai review engine",
      "get more google reviews automatically",
      "automated google review requests",
      "review management for local business",
      "sentiment review routing"
    ],
    "related": [
      {
        "label": "AI Review Request System",
        "href": "/services/ai-review-engine"
      },
      {
        "label": "Free review reply generator",
        "href": "/tools/review-reply-generator"
      },
      {
        "label": "AI SMS Automation",
        "href": "/services/ai-sms-automation"
      },
      {
        "label": "Pricing",
        "href": "/pricing"
      }
    ],
    "faqs": [
      {
        "q": "How is this different from the simpler AI Review Request System?",
        "a": "The Review Request System sends the ask and points every customer to your Google link. The Review Engine adds a private feedback channel alongside that same link — so you hear about a problem directly as well, not instead — and it's a managed service we run and tune each month for $49, rather than a one-time build."
      },
      {
        "q": "Can it really stop bad reviews from landing on Google?",
        "a": "It does not, and it should not — screening who gets asked to review breaks Google's policies. Everyone gets the same review link. What it adds is a private reply channel, so an unhappy customer can tell you directly as well as publicly, and you get the chance to make it right. Most upset customers just want the problem fixed."
      },
      {
        "q": "What does it need to connect to?",
        "a": "Google Business — to pull your profile's review link, not to post anything; only a customer can post a review, and no tool can do it for them. Then Twilio for the text messages and Gmail for the email requests and your private alerts. We set up every connection during the build, so you don't touch any technical settings."
      }
    ],
  },
  {
    "slug": "ai-customer-reactivation",
    "eyebrow": "AI Service",
    "h1": "How do I win back past customers with AI?",
    "title": "AI Customer Re-Activation Campaigns | Handbuilt",
    "description": "Turn your old customer list into booked repeat jobs with an AI win-back campaign over email and text. Personalized, run on your own list, from $500 per campaign.",
    "answer": "AI customer re-activation turns the people who already hired you into your cheapest source of new work. Handbuilt takes your past-customer list and writes a personalized win-back campaign — email plus text — that reminds each person you exist, references what they bought, and gives them an easy reason to book again. It runs as a one-off campaign on your own list and messaging, from $500 per campaign.",
    "pain": "The cheapest job you can book is from someone who already paid you and liked the work. But most owners never reach back out, so that list of past customers just sits in a spreadsheet while you spend on ads chasing strangers.",
    "scenario": "Take a Coquitlam house-cleaning company sitting on a list of maybe 300 past clients, most of whom haven't booked in a year. Roughly hedging, even a handful coming back for a one-time deep clean could more than cover the campaign cost. We'd write a short, warm message — \"it's been a while, here's a returning-client spot this month\" — send it by email and text, and route the replies straight to their booking. The point is to wake up people who already trust them, not to buy new attention.",
    "steps": [
      "You hand us your customer list — a spreadsheet export, your CRM, or even a pile of old invoices",
      "We segment it by how long it's been and what each person bought, then write personalized email and text messages in your voice",
      "We send the campaign over email and text using your own contacts, with a clear reason to rebook",
      "Replies and bookings come straight back to you, and we report which messages pulled the most jobs"
    ],
    "gets": [
      "A win-back campaign written for your real list and your services",
      "Personalized email and text messages, segmented by customer history",
      "Sent on your own list and accounts — Twilio for text, Gmail or Mailchimp for email",
      "A simple report on opens, replies and jobs booked from the campaign"
    ],
    "ctaLabel": "Plan my win-back campaign",
    "keywords": [
      "ai customer reactivation campaign",
      "win back past customers small business",
      "reactivate old customer list",
      "repeat business automation",
      "customer win-back email and text"
    ],
    "related": [
      {
        "label": "Customer Re-Activation message writer (free tool)",
        "href": "/tools/customer-reactivation"
      },
      {
        "label": "AI SMS Automation",
        "href": "/services/ai-sms-automation"
      },
      {
        "label": "AI automation for cleaning businesses",
        "href": "/industries/cleaning-business-ai-automation"
      },
      {
        "label": "Pricing",
        "href": "/pricing"
      }
    ],
    "faqs": [
      {
        "q": "What do I need to give you to run this?",
        "a": "Your past-customer list in whatever form you have it — a spreadsheet, a CRM export, or old invoices we can pull names and numbers from. The more it shows what each person bought and when, the more personal we can make the messages."
      },
      {
        "q": "Will this annoy my customers?",
        "a": "These are people who already hired you, and the message is short, friendly and easy to opt out of. We send to your own list, space the email and text so nobody gets hit twice, and keep the tone like a check-in, not a sales blast."
      },
      {
        "q": "Is the $500 a monthly fee?",
        "a": "No. It's priced per campaign, so you pay for a single win-back send on your list. If it pays for itself you can run another one each quarter, but there's no ongoing subscription unless you want one."
      }
    ],
    "schema": "Service",
    "icon": "CalendarCheck",
  },
  {
    "slug": "ai-operations-dashboard",
    "eyebrow": "AI Service",
    "icon": "BarChart3",
    "schema": "Service",
    "h1": "Can I get one dashboard that answers who owes me money and which jobs are behind?",
    "title": "AI Operations Dashboard for Small Business | Handbuilt",
    "description": "One hosted dashboard you ask in plain English. It pulls from QuickBooks, your CRM, and your calendar to answer who owes money and what's behind. $1,500 setup, from $199/mo.",
    "answer": "The answers to \"who owes me money,\" \"which jobs are behind,\" and \"which leads are hottest\" usually live in three or four different apps that don't talk to each other. Handbuilt builds you one hosted dashboard you ask in plain English — it pulls live from your invoicing, jobs, and leads and answers in seconds. We host it and run the AI usage, so there's nothing for you to maintain. $1,500 to set up, then from $199/mo all in.",
    "pain": "The numbers that run your business are scattered across QuickBooks, a CRM, and a calendar that don't talk — so getting one straight answer means opening five tabs and doing the math in your head.",
    "scenario": "Take an Abbotsford fencing contractor running QuickBooks for invoicing, a CRM for leads, and Google Calendar for the crew schedule — roughly 25 active jobs at a time and a handful of overdue invoices they keep meaning to chase. To answer \"what's owed and what's running late this week,\" the owner tends to flip between three apps on a Sunday night and still miss things. One dashboard that pulls from all three lets them type \"show me overdue invoices over 30 days and any job booked but not started\" and get the list straight away. How much time that saves depends on how messy the current spreadsheet habit is, but most owners in this spot are trading a recurring weekly scramble for a single question.",
    "steps": [
      "We connect to your QuickBooks, your CRM, Google Calendar, and Stripe with read access",
      "We map your data so 'overdue,' 'behind,' and 'hot lead' mean what you mean",
      "We build the hosted dashboard and a plain-English question box on top of it",
      "We host it, include the AI usage in your monthly, and adjust as your business changes"
    ],
    "gets": [
      "One hosted dashboard pulling live from invoicing, jobs, and leads",
      "A plain-English question box — ask, don't build reports",
      "Connections to QuickBooks, your CRM, Google Calendar, and Stripe",
      "Hosting and AI usage included in the flat monthly"
    ],
    "ctaLabel": "Get my dashboard",
    "keywords": [
      "ai operations dashboard small business",
      "quickbooks crm dashboard for contractors",
      "plain english business dashboard",
      "ai dashboard who owes me money",
      "small business kpi dashboard ai"
    ],
    "related": [
      {
        "label": "AI Business Analyst",
        "href": "/services/ai-business-analyst"
      },
      {
        "label": "AI CRM Automation",
        "href": "/services/ai-crm-automation"
      },
      {
        "label": "AI Invoice Reminder System",
        "href": "/services/ai-invoice-reminder-system"
      },
      {
        "label": "Pricing",
        "href": "/pricing"
      }
    ],
    "faqs": [
      {
        "q": "What tools does it connect to?",
        "a": "QuickBooks for invoicing, your existing CRM, Google Calendar for scheduling, and Stripe for payments. If you run a tool we haven't named, we confirm whether it has a connection before we start — most common small-business tools do."
      },
      {
        "q": "Do I need to learn a reporting tool?",
        "a": "No. You type a question the way you'd ask a bookkeeper — 'who's more than 30 days overdue' or 'which jobs are booked but haven't started' — and the dashboard answers from your live data. There are no charts to build."
      },
      {
        "q": "Is the $199/mo the full cost?",
        "a": "Yes. The $1,500 covers the build and the connections. The $199/mo is all in — we host the dashboard and the AI usage is included, so there's no separate API bill or hosting fee to manage."
      }
    ],
  },
  {
    "slug": "ai-business-analyst",
    "eyebrow": "AI Service",
    "icon": "FileSearch",
    "schema": "Service",
    "h1": "Why was revenue down this month? Ask the AI Business Analyst",
    "title": "AI Business Analyst | Handbuilt",
    "description": "Ask why revenue moved and get an answer that checks your invoices, jobs, and payments — with the numbers shown, never guessed. Add-on from $99/mo.",
    "answer": "\"Why was revenue down this month?\" is a question most owners feel but can't see without hours in a spreadsheet. The AI Business Analyst is an add-on to your Handbuilt Operations Dashboard: you ask a plain question and it checks your invoices, jobs, and payments, then explains what actually changed — always showing the exact numbers it used. If it can't verify something, it says so rather than guessing. Hosted, AI included, from $99/mo on top of your dashboard.",
    "pain": "You can feel a slow month in your bank balance, but figuring out why means an evening in spreadsheets you don't have — so the real cause stays a guess.",
    "scenario": "Take a Surrey electrical contractor who notices revenue is down maybe 15% from last month and has no time to dig into why. They ask the Analyst, and it pulls the actual figures: say job count held steady around 40, but the average invoice dropped because a big commercial job that closed in May had no equivalent in June, and three invoices are still unpaid past 30 days. Instead of a hunch, they get the breakdown with every number on screen — and a clear next step: chase the overdue invoices. How useful any given answer is depends on how clean the underlying data is, which is why the Analyst flags anything it can't confirm.",
    "steps": [
      "The Analyst connects to your QuickBooks, Stripe, and CRM through your existing Operations Dashboard",
      "You ask a question in plain words — like why revenue moved, which jobs paid late, or what changed since last quarter",
      "It queries your real invoices, jobs, and payments and writes a plain-language answer with the numbers it used shown alongside",
      "Anything it can't verify from your data, it tells you it can't verify — it never fills the gap with a guess"
    ],
    "gets": [
      "Plain-language answers to revenue and operations questions, on demand",
      "Every answer shows the actual invoices, jobs, and payment figures behind it",
      "Honest 'I can't verify that' when the data isn't there — no fabricated numbers",
      "Connects to QuickBooks, Stripe, and your CRM through your Operations Dashboard"
    ],
    "ctaLabel": "Add the Analyst",
    "keywords": [
      "ai business analyst small business",
      "why was revenue down this month",
      "ask questions about my business data",
      "ai financial analysis for contractors",
      "operations dashboard add on"
    ],
    "related": [
      {
        "label": "AI Operations Dashboard",
        "href": "/services/ai-operations-dashboard"
      },
      {
        "label": "AI Invoice Reminder System",
        "href": "/services/ai-invoice-reminder-system"
      },
      {
        "label": "AI CRM Automation",
        "href": "/services/ai-crm-automation"
      },
      {
        "label": "Pricing",
        "href": "/pricing"
      }
    ],
    "faqs": [
      {
        "q": "Do I need the Operations Dashboard to use this?",
        "a": "Yes. The Analyst is an add-on that reads the data your Operations Dashboard already pulls together from QuickBooks, Stripe, and your CRM. It's $99/mo on top of the dashboard — we set up both together if you don't have the dashboard yet."
      },
      {
        "q": "Can it make up a number if it doesn't have the data?",
        "a": "No, and that's the point. Every answer shows the real figures it pulled. If your data doesn't cover what you asked — say a payment hasn't synced yet — it tells you it can't verify that rather than inventing a figure. You can trust what it shows because it shows its work."
      },
      {
        "q": "What kind of questions can I actually ask?",
        "a": "Things you'd otherwise dig through spreadsheets for: why revenue was up or down, which jobs are still unpaid, how this month compares to last, which service makes the most money. It answers from your invoices, jobs, and payments — not general advice."
      }
    ],
  },
  {
    "slug": "ai-receptionist-os",
    "eyebrow": "AI Service",
    "schema": "Service",
    "icon": "Headphones",
    "h1": "What is an AI Receptionist OS for a local business?",
    "title": "AI Receptionist OS — Your Whole Front Desk on Autopilot | Handbuilt",
    "description": "One hosted system that answers calls and texts, books jobs, sends quotes, chases reviews and follows up with every lead — on one dashboard. $1,500 onboarding, then from $349/mo, calls included.",
    "answer": "AI Receptionist OS is Handbuilt's flagship: one hosted system that runs your front desk, so leads stop falling into the gaps between five separate tools. It answers calls and texts, books jobs into your calendar, sends quotes, chases reviews, and follows up with every lead automatically — all on one dashboard, with nothing for you to stitch together. It's meant to cover the kind of front-desk work you'd otherwise hand to a part-time receptionist or a patchwork of separate apps. Pricing is $1,500 onboarding, then from $349/mo, fully hosted with calls and AI usage included.",
    "pain": "You've patched together a receptionist, a texting app, a booking link, a review tool and a follow-up reminder — and leads still slip through the cracks between them because nothing talks to anything else.",
    "scenario": "Take a busy Surrey HVAC company fielding maybe 40–50 calls and a dozen website and text inquiries a week, with one person trying to answer the phone, send quotes and remember to follow up — usually while on a job. A few calls a week go to voicemail, a couple of quotes never get sent, and review requests almost never happen. Running it all through one Receptionist OS means the calls get answered and booked, the quote goes out the same day, every closed job triggers a review ask, and any lead that goes quiet gets a follow-up text — all visible on one screen instead of five apps. The exact lift depends on how many leads are currently falling through the gaps, but closing those gaps is usually where the recovered revenue sits.",
    "steps": [
      "We map your whole front desk — how calls, texts, quotes, bookings and follow-ups flow today — and where leads currently leak",
      "We connect the pieces: Twilio for calls and SMS, Google Calendar for booking, your CRM, Stripe for deposits, and Google Business for reviews",
      "We configure the AI to answer, qualify, book, quote and chase reviews in your voice, with rules you approve before go-live",
      "We host and run it on one dashboard, watch the first 30 days of live conversations, and tune the flows that need it"
    ],
    "gets": [
      "A hosted system that answers calls and texts, books jobs, sends quotes and chases reviews",
      "Automatic follow-up on every lead so none goes cold from neglect",
      "One dashboard showing every call, message, booking and review in one place",
      "Integrations with Twilio, Google Calendar, your CRM, Stripe and Google Business — calls and AI usage included in the monthly fee"
    ],
    "ctaLabel": "Build my Receptionist OS",
    "keywords": [
      "ai receptionist os",
      "all in one ai receptionist small business",
      "ai front desk system for local business",
      "ai answering and booking system",
      "ai receptionist with reviews and follow up"
    ],
    "related": [
      {
        "label": "AI Receptionist Setup",
        "href": "/services/ai-receptionist-setup"
      },
      {
        "label": "AI Voice Agent",
        "href": "/services/ai-voice-agent"
      },
      {
        "label": "AI Review Engine",
        "href": "/services/ai-review-engine"
      },
      {
        "label": "Pricing",
        "href": "/pricing"
      }
    ],
    "faqs": [
      {
        "q": "How is this different from the single AI Receptionist Setup?",
        "a": "AI Receptionist Setup is the entry point — one AI that answers and books calls. Receptionist OS is the whole front desk: calls, texts, booking, quotes, reviews and lead follow-up running together on one dashboard, fully hosted and managed. If you just need calls answered, start with the setup; if you want the entire front desk on autopilot, this is it."
      },
      {
        "q": "What does the $349/mo actually cover?",
        "a": "Hosting, the AI usage, and the call minutes for normal local-business volume are all included — no separate Twilio or AI bills to manage. Onboarding is a one-time $1,500 to map your flow and connect your tools. Very high call volume can move the monthly tier up; we tell you where you'd land before you commit."
      },
      {
        "q": "Will it work with the tools I already use?",
        "a": "Yes. It connects to Twilio for calls and texts, Google Calendar for booking, Stripe for deposits, Google Business for reviews, and most common CRMs like Jobber or HubSpot. We confirm compatibility during onboarding and set up the connections for you."
      }
    ],
  },
];
