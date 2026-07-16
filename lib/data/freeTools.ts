// Registry for the FREE contractor tools suite (/tools). Each entry carries both
// the tool's identity AND its server-rendered SEO/AEO prose, so the page ranks
// and is answer-engine-quotable while the interactive calculator mounts as a
// client island. Add a tool = add an entry here (+ its calculator component +
// a redirect-free /tools/<slug> route via the [slug] catch-all).
//
// Canonical ownership (cross-domain, decided 2026-07-15): AiBBH owns contractor
// pricing / estimating / labour / quoting / job-profit / admin-efficiency /
// AI-readiness. Invoice/overdue-payment tools belong to PayNudge; COI/insurance
// tools to COITracker. The quote follow-up tool below is deliberately SALES /
// quote-stage only (never "invoice"/"overdue"/"payment reminder").
import type { Metadata } from "next";
import { site } from "./site";
import { faqSchema, breadcrumbSchema } from "../seo";

export interface ToolFaq {
  q: string;
  a: string;
}
export interface ToolSection {
  heading: string;
  body: string;
  bullets?: string[];
}
export interface ToolLink {
  label: string;
  href: string;
  external?: boolean;
  note?: string;
}

export interface ToolRegistryEntry {
  slug: string;
  order: number;
  // Hub card
  name: string;
  cardSummary: string;
  problem: string; // "recommend by business problem" line
  icon: string; // lucide key (lib/icons.ts)
  category: ToolCategory;
  // Page SEO / meta
  eyebrow: string;
  h1: string;
  title: string; // full <title> for OG
  description: string; // meta description (~150 chars)
  keywords: string[]; // 8–12 validated variants
  // AEO content
  answer: string; // 40–70 word direct answer
  whatItCalculates: string;
  methodology: ToolSection;
  workedExample: ToolSection;
  assumptions: string[];
  steps: string[];
  takeaways: string[];
  faqs: ToolFaq[];
  // Conversion
  ctaGoal: string; // /create?goal=<ctaGoal>&src=tool-<slug>
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  relatedServiceHref: string;
  relatedServiceLabel: string;
  // Internal links
  relatedToolSlugs: string[];
  // Schema
  schemaType: "SoftwareApplication" | "WebApplication";
  hasHowTo?: boolean;
}

export type ToolCategory =
  | "Pricing & profit"
  | "Sales & follow-up"
  | "Lead recovery & growth";

export const TOOL_CATEGORIES: { key: ToolCategory; blurb: string }[] = [
  { key: "Pricing & profit", blurb: "Price jobs and price people so every hour makes money." },
  { key: "Sales & follow-up", blurb: "Turn sent quotes into booked jobs without chasing." },
  { key: "Lead recovery & growth", blurb: "Stop leaving calls, leads and jobs on the table." },
];

export const freeTools: ToolRegistryEntry[] = [
  // 1 — PROFIT & PRICING ------------------------------------------------------
  {
    slug: "contractor-profit-pricing-calculator",
    order: 1,
    name: "Contractor Profit & Pricing Calculator",
    cardSummary: "Price a job from true cost, target margin and overrun risk — and see markup vs margin done right.",
    problem: "You're not sure what to charge, or your quotes feel like guesswork.",
    icon: "TrendingUp",
    category: "Pricing & profit",
    eyebrow: "Free tool · No signup",
    h1: "Contractor Profit & Pricing Calculator",
    title: "Contractor Profit & Pricing Calculator (Free, No Signup)",
    description:
      "Free contractor pricing calculator: enter materials, labour, overhead and target margin to get your true job cost, break-even and recommended price — markup vs margin explained.",
    keywords: [
      "contractor pricing calculator",
      "contractor profit margin calculator",
      "job costing calculator for contractors",
      "construction markup calculator",
      "contractor estimate calculator",
      "contractor job profit calculator",
      "service pricing calculator",
      "construction pricing calculator",
      "contractor markup vs margin",
      "profitable job pricing calculator",
    ],
    answer:
      "Add up your true job cost — materials, labour, subs, equipment, overhead and a contingency — then divide by (1 − your target margin) to get the price you should charge. This free calculator does that instantly, shows your break-even, and explains why a 30% margin is a 42.9% markup, not a 30% markup.",
    whatItCalculates:
      "It turns your job costs and a target profit margin into a recommended selling price, then stress-tests it. You get your true job cost, break-even price, recommended price, dollar profit, margin, the equivalent markup, a comparison against any price you're considering, and what happens to your profit if costs run 10%, 20% or 30% over.",
    methodology: {
      heading: "The formulas (nothing hidden)",
      body:
        "Direct cost = materials + (labour hours × labour rate) + subcontractors + equipment + other. Add allocated overhead, then add a contingency percentage to get your total true job cost. Your break-even price equals that total. To hit a target margin, price = total cost ÷ (1 − margin). Margin is profit ÷ price; markup is profit ÷ cost — they are not the same number.",
      bullets: [
        "Break-even price = total true job cost (zero profit).",
        "Recommended price = total cost ÷ (1 − target margin).",
        "Margin = profit ÷ price. Markup = profit ÷ cost.",
        "A 30% margin = a 42.9% markup on cost.",
      ],
    },
    workedExample: {
      heading: "Worked example",
      body:
        "Sarah runs a small reno crew. A bathroom job has $2,000 materials, 40 labour hours at $45/hr ($1,800), $300 equipment and $200 in permits/disposal, plus $500 overhead. At a 10% contingency her true job cost is $5,280. To hit a 30% margin she should charge $7,542.86 — a $2,262.86 profit, which is a 42.9% markup. If she'd quoted $6,000, she'd only make a 12% margin, and a 20% cost overrun would push her into a loss.",
    },
    assumptions: [
      "Labour rate is your loaded cost per hour (wage + burden), not the wage alone — use the Labor Burden Calculator to find it.",
      "Overhead is the slice of your monthly fixed costs you're allocating to this one job.",
      "Contingency covers the normal surprises; it isn't profit.",
      "Results are planning estimates, not a guarantee of what a customer will pay.",
    ],
    steps: [
      "Enter your material, labour, subcontractor, equipment and other job costs.",
      "Add the overhead you're allocating and a contingency percentage.",
      "Set your target profit margin.",
      "Optionally type a price you're considering to see if it hits your target.",
      "Read your recommended price, profit, margin and the cost-overrun scenarios.",
    ],
    takeaways: [
      "Price from cost and margin, not gut feel.",
      "Margin and markup are different — quoting a 30% markup when you meant a 30% margin quietly costs you money.",
      "Always leave a contingency; a 20% overrun can erase a thin margin.",
    ],
    faqs: [
      {
        q: "What's the difference between markup and margin?",
        a: "Margin is profit as a percentage of the price (profit ÷ price). Markup is profit as a percentage of cost (profit ÷ cost). A 30% margin equals a 42.9% markup. Mixing them up is one of the most common ways contractors underprice.",
      },
      {
        q: "What profit margin should a contractor aim for?",
        a: "It varies by trade and risk, but many contractors target a 20–40% net margin per job after covering labour, materials, overhead and a contingency. Enter your own target — the tool shows the price and markup it implies.",
      },
      {
        q: "Should overhead be part of the job cost?",
        a: "Yes. If you only price direct costs, your overhead comes out of your profit. Allocate a fair share of your monthly fixed costs to each job so your margin is real.",
      },
      {
        q: "Is this calculator really free with no signup?",
        a: "Yes. It runs entirely in your browser, needs no account, and nothing you type is uploaded or saved on our servers.",
      },
    ],
    ctaGoal: "contractor-pricing",
    ctaHeading: "Want your pricing to run itself?",
    ctaBody:
      "We build custom quoting and job-costing systems that price jobs consistently, so every estimate you send already protects your margin.",
    ctaLabel: "Get a free workflow fit check",
    relatedServiceHref: "/services/ai-quote-generator",
    relatedServiceLabel: "AI quote & estimate automation",
    relatedToolSlugs: ["contractor-labor-burden-calculator", "contractor-quote-follow-up-generator", "missed-call-revenue-calculator"],
    schemaType: "SoftwareApplication",
    hasHowTo: true,
  },

  // 2 — QUOTE FOLLOW-UP -------------------------------------------------------
  {
    slug: "contractor-quote-follow-up-generator",
    order: 2,
    name: "Contractor Quote Follow-Up Generator",
    cardSummary: "Generate a full, respectful follow-up sequence for a quote you already sent — SMS and email, ready to copy.",
    problem: "You send quotes and then they go quiet, and following up feels awkward.",
    icon: "MessagesSquare",
    category: "Sales & follow-up",
    eyebrow: "Free tool · No signup · No AI tokens",
    h1: "Contractor Quote Follow-Up Generator",
    title: "Contractor Quote Follow-Up Generator (Free SMS & Email Templates)",
    description:
      "Free quote follow-up generator for contractors: get a friendly, non-pushy sequence of SMS and email messages to follow up after sending an estimate — copy, paste, send.",
    keywords: [
      "contractor quote follow up template",
      "contractor estimate follow up text",
      "quote follow up email",
      "follow up after sending estimate",
      "contractor sales follow up",
      "estimate reminder text message",
      "roofing estimate follow up",
      "plumbing quote follow up",
      "landscaping quote follow up",
      "ghosted estimate follow up",
    ],
    answer:
      "After you send a quote, follow up on a light schedule: confirm they got it, check in on day 1–2, offer to answer questions, ask about timing, then a final no-pressure check-in — and re-open cold quotes weeks later. This free tool writes that whole sequence for your trade in your choice of SMS or email, ready to copy and send.",
    whatItCalculates:
      "It builds a complete, human follow-up sequence for an estimate you've already sent: a quote-receipt confirmation, a first follow-up, a question-handling message, a timing/start-date nudge, a final check-in, a cold-quote re-opener and a respectful close-the-loop. Each message comes in SMS and/or email, with recommended timing and separate copy buttons.",
    methodology: {
      heading: "How the messages are built",
      body:
        "Every message is generated from reviewed templates and simple rules — no AI, no tokens, nothing sent to a server. Your inputs (name, trade, tone, financing, dates) are slotted into wording that stays polite and specific. SMS versions are kept short and flag when they'd run past a single text. There's no false scarcity and no manipulative pressure — just clear, timely reminders.",
      bullets: [
        "100% deterministic templates — the same inputs always produce the same messages.",
        "Tone options: friendly, straightforward, urgent-but-respectful, or a final check-in.",
        "SMS length awareness so you know when a text splits into two.",
        "This is a SALES/quote follow-up — for chasing unpaid invoices, use a payment reminder tool instead.",
      ],
    },
    workedExample: {
      heading: "Worked example",
      body:
        "Mike, a roofer, quoted a roof replacement three days ago and hasn't heard back. He picks the friendly tone and SMS + email. The tool returns a short text — “Hi Mike's customer, just checking you received my roofing quote. Any questions I can answer?” — plus a matching email, and five more steps timed over the next few weeks, ending with a respectful message that leaves the door open without nagging.",
    },
    assumptions: [
      "This tool is for following up on a quote/estimate before the job — not for collecting on an invoice.",
      "Timing is a sensible default; adjust to your customer and job size.",
      "Everything is generated and copied in your browser; nothing you type is stored or sent to us.",
    ],
    steps: [
      "Enter the customer's first name, your trade and the job type.",
      "Pick a tone and whether you want SMS, email or both.",
      "Add optional details — quote/expiry dates, start date, financing, a custom note.",
      "Generate the sequence and copy each message with its own button.",
      "Send them on the suggested schedule, adjusting to fit the customer.",
    ],
    takeaways: [
      "Most quotes are lost to silence, not price — a planned follow-up wins jobs.",
      "Two to five polite touches beat one, as long as they're spaced and specific.",
      "You never need false urgency; timely and human converts better.",
    ],
    faqs: [
      {
        q: "How many times should I follow up on a quote?",
        a: "A sequence of about 3–5 touches over two to four weeks works well: a receipt confirmation, an early check-in, a question-handling message, a timing nudge and a final polite check-in — then a cold re-opener later if needed.",
      },
      {
        q: "Is this the same as an invoice or payment reminder?",
        a: "No. This tool follows up on a quote or estimate to win the job. Chasing money on an unpaid invoice is a different task with different wording — use a dedicated payment reminder tool for that.",
      },
      {
        q: "Does it use AI or cost anything?",
        a: "No AI and no cost. The messages come from reviewed templates with your details slotted in, generated entirely in your browser. There's no signup and nothing is uploaded.",
      },
      {
        q: "Can I use these as text messages?",
        a: "Yes. Every step has an SMS version kept short, and the tool flags when a message would run longer than a single text so you can trim it.",
      },
    ],
    ctaGoal: "quote-follow-up",
    ctaHeading: "Want every quote followed up automatically?",
    ctaBody:
      "We set up systems that follow up on every estimate for you — on schedule, in your voice — so quotes stop slipping through the cracks while you're on the tools.",
    ctaLabel: "Automate your quote follow-up",
    relatedServiceHref: "/services/ai-crm-automation",
    relatedServiceLabel: "AI follow-up & CRM automation",
    relatedToolSlugs: ["contractor-lead-leak-audit", "contractor-profit-pricing-calculator", "missed-call-revenue-calculator"],
    schemaType: "WebApplication",
    hasHowTo: true,
  },

  // 3 — MISSED-CALL ROI -------------------------------------------------------
  {
    slug: "missed-call-revenue-calculator",
    order: 3,
    name: "Missed-Call Revenue Calculator",
    cardSummary: "See the revenue slipping out of missed calls — and what an AI receptionist would need to recover to pay for itself.",
    problem: "You miss calls when you're on the tools, and you don't know what it's costing you.",
    icon: "PhoneCall",
    category: "Lead recovery & growth",
    eyebrow: "Free tool · No signup",
    h1: "Missed-Call Revenue & AI Receptionist ROI Calculator",
    title: "Missed-Call Revenue Calculator (AI Receptionist ROI) — Free",
    description:
      "Free missed-call revenue calculator: estimate the jobs and revenue you lose to missed calls, plus the payback on an AI receptionist — with every assumption visible and editable.",
    keywords: [
      "missed call revenue calculator",
      "missed call cost calculator",
      "AI receptionist ROI calculator",
      "answering service ROI calculator",
      "contractor missed calls",
      "missed lead calculator",
      "revenue lost from missed calls",
      "phone answering ROI",
      "contractor call answering",
      "AI phone receptionist calculator",
    ],
    answer:
      "Multiply your monthly calls by the share you miss, the share that are genuine prospects, your close rate and your average job value to estimate the revenue at risk. This free calculator does that, then shows conservative, likely and optimistic recovery scenarios and how quickly an AI receptionist would pay for itself — with every assumption editable.",
    whatItCalculates:
      "It estimates how many calls you miss each month, how many were genuine leads, the jobs and revenue that likely slip away, and what you could recover. It then shows a break-even — how many recovered jobs cover an AI receptionist's setup cost — and an estimated payback period. Every number is an estimate you control, not a hidden industry stat.",
    methodology: {
      heading: "The formula (and your assumptions)",
      body:
        "Missed calls/month = calls × % missed. Qualified leads = missed calls × % genuine prospects. Jobs lost = qualified leads × close rate. Revenue at risk = jobs lost × average job value. Recovered revenue = revenue at risk × the share of calls you think an AI receptionist could recover. We show that at three visible rates — conservative, likely and optimistic — rather than baking in an exaggerated number.",
      bullets: [
        "Every input is yours — we don't hide inflated defaults inside the math.",
        "Conservative / likely / optimistic scenarios flex the recovery rate you set.",
        "Break-even = setup cost ÷ average job value (jobs needed to pay it back).",
        "Results are estimates to guide a decision, not guaranteed outcomes.",
      ],
    },
    workedExample: {
      heading: "Worked example",
      body:
        "A plumbing shop takes ~50 calls a week and misses 20% of them. About 70% are genuine prospects and they close 40% at an average job value of $1,200. That's roughly 43 missed calls a month, 30 qualified leads and 12 lost jobs — about $14,500 in revenue at risk every month. Recovering even a conservative share pays back a $1,500 AI receptionist setup in a matter of weeks.",
    },
    assumptions: [
      "These are planning estimates based on the numbers you enter — not a promise of recovered revenue.",
      "Not every missed call is a lost job; that's why you set a 'genuine prospect' and 'recoverable' rate.",
      "Recovery rates are shown as editable scenarios so you can be as cautious as you like.",
    ],
    steps: [
      "Enter your call volume and the percentage you miss.",
      "Set what share are genuine prospects, your close rate and average job value.",
      "Set how much of those calls you think could be recovered.",
      "Optionally add an AI receptionist setup cost to see payback.",
      "Read your revenue at risk and conservative-to-optimistic recovery.",
    ],
    takeaways: [
      "Missed calls are usually a bigger leak than contractors think.",
      "The math is only as strong as your inputs — keep them honest.",
      "Even conservative recovery often pays back call-answering fast.",
    ],
    faqs: [
      {
        q: "How much revenue do missed calls actually cost?",
        a: "It depends entirely on your call volume, close rate and job value — which is why this tool asks for your numbers instead of quoting a scary industry figure. Enter your own and see a range you can trust.",
      },
      {
        q: "What is a realistic call recovery rate for an AI receptionist?",
        a: "Rather than assume one, the tool lets you set a recoverable rate and shows conservative, likely and optimistic scenarios around it, so the estimate reflects your caution, not ours.",
      },
      {
        q: "Is an AI receptionist worth it for a contractor?",
        a: "If you regularly miss calls while on a job, recovering even a few per month can cover the cost. The break-even and payback figures here help you decide with your own numbers.",
      },
      {
        q: "Does this store my numbers?",
        a: "No. Everything is calculated in your browser. Nothing you enter is uploaded or saved unless you choose to contact us through the separate form.",
      },
    ],
    ctaGoal: "missed-call-recovery",
    ctaHeading: "Never miss a job-winning call again",
    ctaBody:
      "Our AI receptionist answers every call 24/7, texts back missed callers in seconds, and books or qualifies the job — so the revenue in this calculator stops leaking.",
    ctaLabel: "See how the AI receptionist works",
    relatedServiceHref: "/ai-receptionist",
    relatedServiceLabel: "AI receptionist for contractors",
    relatedToolSlugs: ["contractor-lead-leak-audit", "contractor-quote-follow-up-generator", "contractor-profit-pricing-calculator"],
    schemaType: "SoftwareApplication",
    hasHowTo: true,
  },

  // 4 — LABOR BURDEN ----------------------------------------------------------
  {
    slug: "contractor-labor-burden-calculator",
    order: 4,
    name: "Contractor Labor Burden Calculator",
    cardSummary: "Find what an employee really costs per hour — and the billable rate that actually makes money.",
    problem: "You bill a wage-based rate and wonder why the crew's hours don't add up to profit.",
    icon: "Users",
    category: "Pricing & profit",
    eyebrow: "Free tool · No signup",
    h1: "Contractor Labor Burden Calculator",
    title: "Contractor Labor Burden Calculator — True Employee Cost (Free)",
    description:
      "Free labour burden calculator for contractors: turn a base wage, payroll costs, benefits and billable hours into your true hourly cost, burden %, break-even and recommended billing rate.",
    keywords: [
      "contractor labor burden calculator",
      "labour burden calculator canada",
      "true employee cost calculator",
      "construction labor burden calculator",
      "contractor hourly rate calculator",
      "employee cost per hour calculator",
      "billable rate calculator",
      "payroll burden calculator",
      "labor markup calculator",
      "construction labor cost calculator",
    ],
    answer:
      "Your true labour cost is more than the wage: add payroll taxes, workers' comp, benefits, paid time off and per-hour allocations for insurance and equipment, then spread it over the hours you can actually bill. This free calculator turns a base wage into your real hourly cost, your burden percentage and the billing rate you need to hit your margin.",
    whatItCalculates:
      "It converts a base wage plus your own burden percentages and annual costs into the true cost of an employee — per paid hour and per year — then divides by billable hours to show what each productive hour really costs. From there it gives your burden percentage, a break-even billing rate and a recommended rate that covers overhead and your target margin.",
    methodology: {
      heading: "How the rate is built",
      body:
        "Annual wage = base wage × paid hours. Add your burden percentages (payroll, workers' comp, benefits, vacation, stat holidays) plus annual dollar costs (insurance, tools, vehicle, training). Divide the total by billable hours — not paid hours — because you only earn on the hours you bill. Add overhead and divide by (1 − target margin) for a recommended rate. You enter every percentage; no province-specific rates are assumed.",
      bullets: [
        "True hourly cost = total annual cost ÷ paid hours.",
        "Cost per billable hour = total annual cost ÷ billable hours.",
        "Recommended rate = (cost + overhead) ÷ (1 − target margin).",
        "You supply the percentages — this is a planning tool, not payroll or legal advice.",
      ],
    },
    workedExample: {
      heading: "Worked example",
      body:
        "An electrician pays a journeyman $30/hr. Add 26% in combined burden (payroll, comp, benefits, vacation, stat) plus $6,000/yr in insurance and truck costs, over 2,080 paid hours: the true cost is about $40.68/hr — a 36% burden. But only ~1,600 hours are billable, so each billable hour actually costs about $52.89. With 15% overhead and a 25% target margin, the recommended billing rate is about $81/hr — well above the $65 they were charging.",
    },
    assumptions: [
      "You enter your own percentages — no province-specific tax or comp rates are hardcoded.",
      "Billable hours are the productive hours you can actually invoice, always fewer than paid hours.",
      "This is a planning tool, not payroll, tax or legal advice — verify rates with your accountant.",
    ],
    steps: [
      "Enter the base hourly wage.",
      "Add your burden percentages: payroll, workers' comp, benefits, vacation, stat holidays.",
      "Add annual dollar costs (insurance, tools, vehicle, training) and paid vs billable hours.",
      "Set overhead and your target margin.",
      "Read your true cost, burden %, break-even and recommended billing rate.",
    ],
    takeaways: [
      "An employee costs far more than their wage — often 25–40% more.",
      "Bill over billable hours, not paid hours, or you underprice every job.",
      "A wage-plus-a-bit rate is how contractors quietly lose money on labour.",
    ],
    faqs: [
      {
        q: "What is labour burden?",
        a: "Labour burden is everything an employee costs beyond their wage: payroll taxes, workers' comp, benefits, paid time off, insurance and equipment allocations. Expressed as a percentage of the base wage, it's often 25–40% or more.",
      },
      {
        q: "Why divide by billable hours instead of paid hours?",
        a: "You pay for every hour but only earn on the hours you can bill. Spreading the full cost over fewer billable hours reveals the true cost you must recover in your rate — otherwise unbilled time comes out of profit.",
      },
      {
        q: "Does this use Canadian payroll rates?",
        a: "No rates are hardcoded. You enter your own percentages, so it works for any province or country. It's a planning tool — confirm exact rates with your accountant.",
      },
      {
        q: "Is it free and private?",
        a: "Yes. It runs in your browser with no signup, and nothing you enter is uploaded or stored.",
      },
    ],
    ctaGoal: "labor-costing",
    ctaHeading: "Want your true costs built into every quote?",
    ctaBody:
      "We build custom estimating systems that bake your real labour burden and overhead into every quote automatically, so your rates are right without the spreadsheet.",
    ctaLabel: "Get a free workflow fit check",
    relatedServiceHref: "/custom-ai-app-development",
    relatedServiceLabel: "Custom estimating & business systems",
    relatedToolSlugs: ["contractor-profit-pricing-calculator", "missed-call-revenue-calculator", "contractor-quote-follow-up-generator"],
    schemaType: "SoftwareApplication",
    hasHowTo: true,
  },

  // 5 — LEAD-LEAK AUDIT -------------------------------------------------------
  {
    slug: "contractor-lead-leak-audit",
    order: 5,
    name: "Contractor Lead-Leak Audit",
    cardSummary: "A 12-point self-check that scores where leads slip away and gives you a prioritised fix list.",
    problem: "Leads come in but not enough turn into booked jobs, and you're not sure where they're lost.",
    icon: "Search",
    category: "Lead recovery & growth",
    eyebrow: "Free tool · No signup",
    h1: "Contractor Lead-Leak Audit",
    title: "Contractor Lead-Leak Audit — Score Your Lead Handling (Free)",
    description:
      "Free contractor lead-leak audit: answer 12 quick questions to score how well you capture and follow up on leads, find your top three leaks, and get a prioritised action plan.",
    keywords: [
      "contractor lead follow up audit",
      "contractor lead conversion checklist",
      "missed lead audit",
      "contractor sales process checklist",
      "lead response time calculator",
      "contractor lead management checklist",
      "service business lead conversion",
      "contractor follow up process",
      "lead leakage calculator",
      "sales follow up checklist",
    ],
    answer:
      "Leads leak at predictable points: missed calls, slow responses, no after-hours coverage, weak quote follow-up, no reminders and no review requests. This free audit scores your handling across 12 of those areas, surfaces your three biggest leaks, and gives you a prioritised plan with a manual fix and an automation option for each.",
    whatItCalculates:
      "It's a deterministic scored self-assessment — not a chatbot. You answer one question for each of 12 lead-handling areas, and it produces an overall score out of 100, a score for every area, your top three leaks, and an action plan that shows both how to fix each leak by hand and where automation would help.",
    methodology: {
      heading: "How scoring works",
      body:
        "Each of the 12 areas is scored 0–3 based on your answer, then converted to a 0–100 score and averaged into an overall score. Lower-scoring areas are ranked as your top leaks. Bands are simple: 80+ is strong, 60–79 solid, 40–59 leaky, under 40 critical. It's fully deterministic — the same answers always give the same result — and we never claim a precise dollar figure you didn't provide.",
      bullets: [
        "12 areas: missed calls, response time, after-hours, web-form response, quote follow-up, lead ownership, reminders, pipeline visibility, appointment confirmation, stale-lead recovery, review requests, measurement.",
        "Each area scored 0–3, averaged to a 0–100 score.",
        "Top three leaks come with a manual fix and an automate-this option.",
        "No fear-based numbers — just an honest score and next steps.",
      ],
    },
    workedExample: {
      heading: "Worked example",
      body:
        "A landscaping crew scores well on doing good work but answers honestly that they rarely follow up on quotes, have no after-hours coverage and never ask for reviews. Their overall score lands at 45 — 'leaky'. The audit flags those three as the top leaks and hands back a plan: follow up every quote on a set schedule, add an after-hours catch, and text a review link at job completion — with the automation option for each.",
    },
    assumptions: [
      "The audit reflects the answers you give — answer honestly for a useful score.",
      "It won't claim an exact lost-revenue figure unless you provide the numbers elsewhere.",
      "Recommendations are useful whether or not you ever contact us.",
    ],
    steps: [
      "Answer one honest question for each of the 12 lead-handling areas.",
      "Get your overall score and a score for every area.",
      "See your top three leaks ranked by impact.",
      "Follow the action plan — fix by hand or automate each one.",
      "Re-run it in a few months to see your score climb.",
    ],
    takeaways: [
      "Most lost jobs leak from a handful of fixable gaps, not one big failure.",
      "Speed and follow-up are usually the biggest wins.",
      "You can fix most leaks manually first — automate the ones that keep slipping.",
    ],
    faqs: [
      {
        q: "What is a lead leak?",
        a: "A lead leak is any point where a potential job slips away — a missed call, a slow reply, a quote never followed up, an appointment never confirmed. Small leaks across several areas add up to a lot of lost work.",
      },
      {
        q: "How is my score calculated?",
        a: "Each of 12 lead-handling areas is scored 0–3 from your answer, converted to a 0–100 score and averaged. Your lowest areas become your top leaks. It's fully deterministic and explained on the page.",
      },
      {
        q: "Is this an AI chatbot?",
        a: "No. It's a fixed, transparent scoring tool that runs in your browser. Same answers, same score — no AI, no tokens, no signup.",
      },
      {
        q: "Will it tell me exactly how much money I'm losing?",
        a: "Only if you give it enough numbers elsewhere. We won't invent a precise dollar figure — the audit focuses on where you're leaking and what to do about it.",
      },
    ],
    ctaGoal: "lead-recovery",
    ctaHeading: "Plug your biggest leaks on autopilot",
    ctaBody:
      "We build the systems behind a high score — instant call answering, automatic follow-up, reminders and review requests — so leads stop slipping while you're on the job.",
    ctaLabel: "Get a free workflow fit check",
    relatedServiceHref: "/ai-receptionist",
    relatedServiceLabel: "AI receptionist & admin automation",
    relatedToolSlugs: ["missed-call-revenue-calculator", "contractor-quote-follow-up-generator", "contractor-profit-pricing-calculator"],
    schemaType: "WebApplication",
    hasHowTo: false,
  },
];

// Cross-domain "more free business tools" — genuinely adjacent tools on the
// founder's other sites, in THEIR lane (canonical ownership, decided 2026-07-15).
// Not reciprocal footer spam: one tasteful section on the hub only, descriptive
// anchors, external rel handled by the component.
export const MORE_FREE_TOOLS: ToolLink[] = [
  {
    label: "Find Expired COIs — vendor insurance spreadsheet scanner",
    href: "https://coitracker.co/find-expired-cois",
    external: true,
    note: "Managing subcontractor insurance? Spot expired certificates in seconds. (COITracker)",
  },
  {
    label: "Payment Reminder Generator — chase an unpaid invoice",
    href: "https://paynudge.xyz/tools/payment-reminder-generator",
    external: true,
    note: "Already did the work and waiting to get paid? Write a firm-but-friendly reminder. (PayNudge)",
  },
];

// ---- lookups --------------------------------------------------------------
export const freeToolsByOrder = [...freeTools].sort((a, b) => a.order - b.order);
export const freeToolSlugs = freeTools.map((t) => t.slug);
export function getFreeTool(slug: string): ToolRegistryEntry | undefined {
  return freeTools.find((t) => t.slug === slug);
}
export function toolPath(slug: string): string {
  return `/tools/${slug}`;
}
export function relatedTools(entry: ToolRegistryEntry): ToolRegistryEntry[] {
  return entry.relatedToolSlugs
    .map((s) => getFreeTool(s))
    .filter((t): t is ToolRegistryEntry => Boolean(t));
}
/** /create link carrying tool source + goal attribution (preserves nothing sensitive). */
export function toolCtaHref(entry: ToolRegistryEntry): string {
  return `/create?goal=${encodeURIComponent(entry.ctaGoal)}&src=tool-${encodeURIComponent(entry.slug)}`;
}

// ---- hub meta -------------------------------------------------------------
export const TOOLS_HUB = {
  eyebrow: "Free contractor tools · No signup",
  h1: "Free Contractor Business Tools",
  title: "Free Contractor Business Tools — Pricing, Follow-Up & Lead Tools (No Signup)",
  description:
    "Free, no-signup tools for contractors and local service businesses: price jobs, calculate labour burden, generate quote follow-ups, and find where leads leak. Everything runs in your browser.",
  answer:
    "These free tools help contractors price jobs profitably, cost their labour, follow up on quotes, and stop losing leads — all in your browser, with no account and nothing to install. Pick a tool by the problem you're trying to solve below.",
  keywords: [
    "free contractor tools",
    "contractor business tools",
    "free tools for contractors",
    "contractor calculators",
    "contractor pricing tools",
    "free tools for tradespeople",
  ],
};

// ---- SEO helpers ----------------------------------------------------------
export function toolMetadata(entry: ToolRegistryEntry): Metadata {
  const path = toolPath(entry.slug);
  const url = `${site.url}${path}`;
  return {
    title: entry.h1,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: path },
    openGraph: { title: entry.title, description: entry.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: entry.title, description: entry.description },
  };
}

export function toolsHubMetadata(): Metadata {
  const url = `${site.url}/tools`;
  return {
    title: TOOLS_HUB.h1,
    description: TOOLS_HUB.description,
    keywords: TOOLS_HUB.keywords,
    alternates: { canonical: "/tools" },
    openGraph: { title: TOOLS_HUB.title, description: TOOLS_HUB.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: TOOLS_HUB.title, description: TOOLS_HUB.description },
  };
}

export function toolJsonLd(entry: ToolRegistryEntry): Record<string, unknown>[] {
  const url = `${site.url}${toolPath(entry.slug)}`;
  const out: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": entry.schemaType,
      name: entry.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (web browser)",
      description: entry.description,
      url,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: 0, priceCurrency: site.currency },
      provider: { "@id": `${site.url}/#organization` },
    },
  ];
  if (entry.hasHowTo && entry.steps.length) {
    out.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use the ${entry.name}`,
      description: entry.answer,
      step: entry.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
    });
  }
  if (entry.faqs.length) out.push(faqSchema(entry.faqs));
  out.push(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Free Tools", path: "/tools" },
      { name: entry.name, path: toolPath(entry.slug) },
    ])
  );
  return out;
}

export function toolsHubJsonLd(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: TOOLS_HUB.h1,
      description: TOOLS_HUB.description,
      url: `${site.url}/tools`,
      hasPart: freeToolsByOrder.map((t) => ({
        "@type": entry_type(t),
        name: t.name,
        url: `${site.url}${toolPath(t.slug)}`,
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Free Tools", path: "/tools" },
    ]),
  ];
}

function entry_type(t: ToolRegistryEntry): string {
  return t.schemaType;
}
