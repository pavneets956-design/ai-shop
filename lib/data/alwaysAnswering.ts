// "Missed Call, Caught" — /ai-front-desk experience. Single source of truth for
// BOTH the DOM copy and the JSON-LD (per the spec: acts + pricing + wage +
// dashboard constants live here as typed data, never inline in the client).

import { packages, carePlan } from "./packages";
import type { WorkerId } from "@/components/experience/expStore";

// ---------------------------------------------------------------------------
// Honest persuasion constants (§7). Editable, sourced, illustrative.
// Sources (verify before editing): BC receptionist ~$21–23/hr, ~$42–48k/yr
//   ca.indeed.com/career/receptionist/salaries/British-Columbia ; salaryexpert.com (Vancouver)
// Human answering services $800–2,400/mo; capped plans $235–290/mo (nextiva.com, wishup.co)
// AI-only competitors bill $29–300/mo RECURRING (dialzara.com, getnextphone.com)
// ---------------------------------------------------------------------------
export const WAGE = {
  partTimeReceptionistMonthly: 2000,
  fullTimeAnnual: 45000,
  answeringServiceMonthlyLow: 235,
  starterOneTime: packages[0].price, // $1,000 — stays in sync with site pricing data
  careMonthly: carePlan.monthly, // $250
};

// Dashboard = an ILLUSTRATIVE example week, clearly labelled — not a specific-customer claim.
export const SCORE = { inquiries: 12, quotes: 5, jobs: 3, invoices: 2 };

export const SCORE_ITEMS = [
  { value: SCORE.inquiries, label: "inquiries caught" },
  { value: SCORE.quotes, label: "quotes sent" },
  { value: SCORE.jobs, label: "jobs booked" },
  { value: SCORE.invoices, label: "invoices followed up" },
] as const;

// ---------------------------------------------------------------------------
// The workers + Act III pain buttons
// ---------------------------------------------------------------------------
export interface Worker {
  id: WorkerId;
  name: string;
  catches: string;
}

export const WORKERS: Worker[] = [
  { id: "receptionist", name: "Receptionist", catches: "Catches calls" },
  { id: "quote", name: "Quote", catches: "Catches estimates" },
  { id: "followup", name: "Follow-Up", catches: "Catches leads" },
  { id: "invoice", name: "Invoice", catches: "Catches payments" },
  { id: "custom", name: "Custom", catches: "Catches the rest" },
];

export const getWorker = (id: WorkerId) => WORKERS.find((w) => w.id === id) ?? WORKERS[0];

export interface Pain {
  id: string;
  label: string;
  worker: WorkerId;
  goal: string; // feeds /create?goal=
}

export const PAINS: Pain[] = [
  {
    id: "calls",
    label: "I miss calls while I'm on a job",
    worker: "receptionist",
    goal: "An AI receptionist that catches the calls I miss on the job",
  },
  {
    id: "quotes",
    label: "People ask for quotes and I forget to reply",
    worker: "quote",
    goal: "An AI quote worker that replies to estimate requests for me",
  },
  {
    id: "invoices",
    label: "My invoices sit unpaid for weeks",
    worker: "invoice",
    goal: "An AI invoice worker that follows up on unpaid invoices",
  },
  {
    id: "leads",
    label: "Leads go cold before I follow up",
    worker: "followup",
    goal: "An AI follow-up worker that keeps my leads warm",
  },
];

// ---------------------------------------------------------------------------
// Act II — the phone's own timestamped missed-call / notification log
// ---------------------------------------------------------------------------
export const MISSED_LOG = [
  { time: "7:12 AM", context: "loading the truck", item: "missed call — a new customer" },
  { time: "1:40 PM", context: "hands full under a sink", item: "a quote request" },
  { time: "6:30 PM", context: "dinner with family", item: "“you free this week?”" },
  { time: "Sat 9:20 AM", context: "your day off", item: "an unpaid invoice" },
] as const;

export const MISSED_MICRO_LINE =
  "Every one of these was a job — going to whoever answered first.";

// ---------------------------------------------------------------------------
// Act III — the on-screen catch transcript (also rendered as real DOM, §8)
// ---------------------------------------------------------------------------
export const CALLER_LABEL = "New customer · incoming";

export const TRANSCRIPT = [
  { who: "ai", text: "Thanks for calling — I can get that booked for you…" },
  { who: "caller", text: "Great — could someone come out Thursday morning?" },
  { who: "ai", text: "Thursday works. I've got you down — confirmation is on its way." },
] as const;

// ---------------------------------------------------------------------------
// The seven acts — copy is FINAL (§4), reproduced verbatim.
// Headlines carry exactly one amber-italic accent word.
// ---------------------------------------------------------------------------
export interface Act {
  n: number;
  roman: string;
  kicker: string;
  h: [string, string, string]; // [before, accent word, after]
  lede: string;
}

export const ACTS: Act[] = [
  {
    n: 1,
    roman: "I",
    kicker: "THE PROMISE",
    h: ["Never miss the ", "job", " because you missed the call."],
    lede: "Handbuilt AI agents answer calls, capture leads, send quotes, follow up, and handle admin while you're working, driving, sleeping, or busy with customers.",
  },
  {
    n: 2,
    roman: "II",
    kicker: "THE CALL YOU CAN'T TAKE",
    h: ["Business comes in when you ", "can't", " answer."],
    lede: "You can't be on a ladder and on the phone. So the calls, quotes, and leads that arrive while you're busy just… slip.",
  },
  {
    n: 3,
    roman: "III",
    kicker: "CAUGHT",
    h: ["Watch it get ", "caught", "."],
    lede: "Tell us what keeps slipping. The right worker catches it — every time, while your hands stay full.",
  },
  {
    n: 4,
    roman: "IV",
    kicker: "THE STUDIO",
    h: ["Not generated. ", "Handbuilt", "."],
    lede: "No template farm. No reseller. One builder shapes each worker — wireframe to working — around your actual business.",
  },
  {
    n: 5,
    roman: "V",
    kicker: "WHAT A CAUGHT WEEK LOOKS LIKE",
    h: ["While you were busy, it was ", "working", "."],
    lede: "You never stopped. Neither did it. Here's a week it caught for you while your hands were full:",
  },
  {
    n: 6,
    roman: "VI",
    kicker: "WHAT YOU CAN HAND OVER",
    h: ["Answered calls, ", "honest", " prices."],
    lede: "Three ways to start — every one installed, wired in, and yours. Prices in CAD, no surprises.",
  },
  {
    n: 7,
    roman: "VII",
    kicker: "ALWAYS ANSWERING",
    h: ["Your business, ", "always", " answering."],
    lede: "Phone down, hands free — and nothing slipped. Tell me what keeps landing on you while you're busy, and you'll get a clear build plan and a fixed CAD price, usually within a day.",
  },
];

export const ACT1_CTA_SUBLINE = "Your business keeps moving even when your hands are full.";

// Crawlable summary paragraph near the top (§8) — what / for whom / where / price band.
export const SUMMARY_PARAGRAPH =
  "Handbuilt is a one-person AI studio in Surrey & Delta, BC that builds AI front desks for service businesses — AI receptionists, quote responders, lead follow-up and invoice chasers that catch the calls and messages you can't take. Installed and wired into your tools, from $1,000 to $7,500+ CAD, one-time.";

// ---------------------------------------------------------------------------
// Act VI — pricing cards (numbers stay in sync with lib/data/packages.ts)
// ---------------------------------------------------------------------------
const nf = new Intl.NumberFormat("en-CA");
const starter = packages.find((p) => p.id === "starter")!;
const business = packages.find((p) => p.id === "business")!;
const custom = packages.find((p) => p.id === "custom")!;

export interface Tier {
  id: string;
  name: string;
  price: string;
  tagline: string;
  bullets: string[];
  cta: { label: string; href: string };
  badge?: string;
  wageAnchor?: string;
}

export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "AI STARTER",
    price: `$${nf.format(starter.price)} CAD+`,
    tagline: "One AI worker, live in days — receptionist, quote intake, or review replies.",
    bullets: [
      "1 AI worker, fully installed",
      "Wired into your existing tools",
      "Live in ~5 business days",
    ],
    wageAnchor: `A part-time receptionist: ~$${nf.format(WAGE.partTimeReceptionistMonthly)}/mo, every month. This: $${nf.format(starter.price)} once — it never clocks out.`,
    cta: { label: "Get this built", href: "/create?package=starter" },
  },
  {
    id: "business",
    name: "AI BUSINESS",
    price: `$${nf.format(business.price)} – $${nf.format(business.priceHigh ?? 5000)}`,
    tagline: "2–4 connected workers in one workflow, with a simple owner dashboard.",
    bullets: [
      "2–4 connected workers",
      "Receptionist + quote + follow-up",
      "Owner dashboard & reporting",
    ],
    badge: "MOST BUSINESSES START HERE",
    cta: { label: "Plan my system", href: "/create?package=business" },
  },
  {
    id: "custom",
    name: "CUSTOM AI APP",
    price: `$${nf.format(custom.price)} CAD+`,
    tagline: "A full app or internal platform you own — MVP, client portal, custom flows.",
    bullets: [
      "Custom build — you own it",
      "SaaS MVP or client portal",
      "Built around your process",
    ],
    cta: { label: "Get this built", href: "/create?package=custom" },
  },
];

export const PRICING_FOOTNOTE = `Optional Care Plan from $${nf.format(carePlan.monthly)}/mo — monitoring, updates, and improvements. Prices in CAD.`;

// Honesty guardrail (§7): never imply "$0/month forever".
export const OWNERSHIP_LINE = "A hire quits, gets sick, takes vacation. You own this one.";
export const RUNNING_COST_LINE = `$${nf.format(starter.price)} to build + your own low running cost, or $${nf.format(carePlan.monthly)}/mo managed.`;

// ---------------------------------------------------------------------------
// Act V dashboard label (§7 — illustrative, never a specific-customer claim)
// ---------------------------------------------------------------------------
export const DASHBOARD_LABEL = "AN EXAMPLE WEEK — ILLUSTRATIVE, YOUR VOLUME WILL VARY";

// ---------------------------------------------------------------------------
// FAQ (Act III pains → Q&A) — feeds faqSchema, rendered as real DOM in Act III.
// ---------------------------------------------------------------------------
export const FAQ = [
  {
    q: "I miss calls while I'm on a job — what can Handbuilt build for that?",
    a: "An AI Receptionist that answers your business line when you can't, greets the caller, captures the job details, and books or routes it — so a missed call becomes a booked job instead of a voicemail. Installed from $1,000 CAD one-time.",
  },
  {
    q: "People ask for quotes and I forget to reply — can AI handle that?",
    a: "Yes — a Quote worker takes the request (from calls, forms, or texts), gathers the details you'd normally chase, and sends the estimate or tees it up for your approval, usually the same day.",
  },
  {
    q: "My invoices sit unpaid for weeks — what does the Invoice worker do?",
    a: "It follows up on unpaid invoices for you with polite, persistent reminders on a schedule you set, and flags the ones that need a human call. You stop being the collections department.",
  },
  {
    q: "Leads go cold before I follow up — how does the Follow-Up worker help?",
    a: "It replies to new leads in minutes, answers their first questions, and keeps nudging until they book or say no — while you're still on the ladder. Speed-to-lead is usually the whole game.",
  },
  {
    q: "Is this a monthly subscription?",
    a: `No forced subscription: builds are one-time ($1,000–$7,500+ CAD) and you own them. You cover your own low running costs, or add the optional Care Plan from $${nf.format(carePlan.monthly)}/mo for monitoring, updates, and improvements.`,
  },
] as const;

// ---------------------------------------------------------------------------
// Act V — the pull-back pings (each tagged by its worker, flipped to caught)
// ---------------------------------------------------------------------------
export const WEEK_PINGS = [
  { worker: "Receptionist", text: "Tue 9:41 AM — new call answered, job details captured" },
  { worker: "Quote", text: "Wed 2:15 PM — estimate request replied to, quote sent" },
  { worker: "Follow-Up", text: "Thu 8:03 AM — Monday's lead nudged, appointment booked" },
  { worker: "Invoice", text: "Fri 10:30 AM — invoice #241 reminder sent, paid same day" },
] as const;

export const FOOTER_LINES = [
  "Built by Pavneet in Surrey/Delta, BC · real builder, no agency handoff",
  "© 2026 Handbuilt",
] as const;
