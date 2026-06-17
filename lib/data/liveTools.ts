// Demo scenarios for the homepage "Live AI Tools Lab".
// EDIT HERE to change what each tool shows — no component changes needed.
// Each tool: input (the trigger) -> output (what the AI produces) -> result (green outcome).
// `notif` (optional) shows an SMS landing on the owner's phone (receptionist only).

export type ChatMsg = { who: "ai" | "cust"; t: string };

export type ToolInput =
  | { kind: "text"; src: string; text: string }
  | { kind: "google"; name: string; meta: string; stars: number; time: string; text: string };

export type ToolOutput =
  | { type: "chat"; messages: ChatMsg[] }
  | { type: "quote"; title: string; svc: string; rows: [string, string][]; estLabel: string; est: string }
  | { type: "text"; head: string; text: string }
  | { type: "sms"; from: string; text: string; chip?: string }
  | { type: "proposal"; sections: [string, string][] }
  | { type: "gresponse"; biz: string; name: string; time: string; text: string };

export type LiveTool = {
  key: string;
  tab: string;
  name: string;
  workingText: string;
  input: ToolInput;
  output: ToolOutput;
  result: string;
  notif?: { title: string; text: string };
};

export const liveTools: LiveTool[] = [
  {
    key: "receptionist",
    tab: "Receptionist",
    name: "AI Receptionist",
    workingText: "Listening & triaging the call…",
    input: { kind: "text", src: "Incoming call · Northline Electric", text: "“Half my house lost power and the panel is buzzing.”" },
    output: {
      type: "chat",
      messages: [
        { who: "ai", t: "Please stay clear of the panel and don’t touch the breakers. I can get a licensed electrician out today, 1–3 PM. What’s the address and best callback number?" },
        { who: "cust", t: "88 Cedar Rd, 778-555-0190." },
        { who: "ai", t: "Booked — flagged priority, your on-call electrician is notified, and I’ve texted the customer a confirmation for 1–3 PM." },
      ],
    },
    notif: { title: "Northline Electric", text: "PRIORITY job — buzzing panel, 88 Cedar Rd. Booked today 1–3 PM. Callback: 778-555-0190." },
    result: "Priority job booked · electrician notified · customer confirmed",
  },
  {
    key: "quote",
    tab: "Quote",
    name: "Quote Generator",
    workingText: "Pricing scope & building quote…",
    input: { kind: "text", src: "Customer request", text: "Install 8 pot lights in living room, Surrey, standard ceiling, customer wants a clean finish." },
    output: {
      type: "quote",
      title: "Pot light installation",
      svc: "Electrical · residential",
      rows: [
        ["Scope", "Supply & install 8 LED pot lights, wiring check, cleanup"],
        ["Timeline", "1 day"],
        ["Terms", "Final price after site inspection"],
      ],
      estLabel: "Estimate",
      est: "$950–$1,250",
    },
    result: "Quote generated · PDF ready · follow-up scheduled",
  },
  {
    key: "review",
    tab: "Review Reply",
    name: "Review Reply Generator",
    workingText: "Drafting an on-brand reply…",
    input: { kind: "google", name: "Marcus T.", meta: "Local Guide · 14 reviews", stars: 5, time: "2 days ago", text: "Great service. They came same day and fixed our electrical issue fast. Highly recommend these guys." },
    output: { type: "gresponse", biz: "N", name: "Northline Electric", time: "just now", text: "Thank you so much for the kind review, Marcus! We’re really glad we could come out same day and get your electrical issue sorted quickly and safely. We appreciate you choosing Northline Electric." },
    result: "On-brand reply ready · reputation protected",
  },
  {
    key: "followup",
    tab: "Follow-Up",
    name: "Lead Follow-Up",
    workingText: "Writing a friendly follow-up…",
    input: { kind: "text", src: "Website lead · no booking yet", text: "Sarah submitted the contact form about a panel issue 2 hours ago — never booked a time." },
    output: { type: "sms", from: "You → Sarah", text: "Hi Sarah, just checking if you still need help with the panel issue. We have availability tomorrow afternoon if you’d like us to hold a spot for you.", chip: "Tap to book a time" },
    result: "Lead followed up · booking link sent · no lead forgotten",
  },
  {
    key: "invoice",
    tab: "Invoice Nudge",
    name: "Invoice Nudge",
    workingText: "Composing a polite reminder…",
    input: { kind: "text", src: "Invoice #1048 · 7 days overdue", text: "Invoice #1048 for $650 is outstanding — 7 days past due. Customer: Mike." },
    output: { type: "sms", from: "You → Mike", text: "Hi Mike, just a friendly reminder that invoice #1048 for $650 is still outstanding. You can pay securely with the link below — thank you!", chip: "Pay $650 securely →" },
    result: "Payment reminder sent · polite tone · payment link included",
  },
  {
    key: "proposal",
    tab: "Proposal",
    name: "Proposal Builder",
    workingText: "Structuring the proposal…",
    input: { kind: "text", src: "Customer request", text: "A small-business AI receptionist that answers calls and books jobs." },
    output: {
      type: "proposal",
      sections: [
        ["Problem", "Missed and after-hours calls turn into lost jobs and slow follow-up."],
        ["Recommended solution", "An AI receptionist that answers 24/7, triages, books into your calendar, and texts you every lead."],
        ["Scope", "Call/SMS answering, booking, owner notifications, CRM logging."],
        ["Timeline", "Live in ~5 business days."],
        ["Price", "$1,000 CAD setup · $250/mo care & hosting."],
        ["Next steps", "Approve → we connect your number & calendar → go live."],
      ],
    },
    result: "Proposal created · ready to send",
  },
];

// EDIT pricing/outcome copy here.
export const outcomes: { v: string; l: string }[] = [
  { v: "$9K–$24K", l: "Missed-call revenue recovered / year" },
  { v: "5+ hrs", l: "Owner time saved every week" },
  { v: "20–30%", l: "More jobs closed with fast follow-up" },
  { v: "100%", l: "Local, owned by you & secure" },
];

export const pricingTiers: { tag: string; price: string; small?: string; desc: string; feat?: boolean }[] = [
  { tag: "AI Starter System", price: "From $1,000", small: " CAD", desc: "One AI worker live in days — receptionist, chatbot, quote intake, or review replies." },
  { tag: "AI Business System · most popular", price: "$2,500–$5,000", desc: "2–4 connected AI workers — receptionist + quote + follow-up + dashboard, wired to your tools.", feat: true },
  { tag: "Custom AI App", price: "From $7,500", desc: "A full app or internal platform you own — SaaS MVP, client portal, custom workflows." },
];

// Ready-to-install AI systems — homepage "Start with one AI worker" section.
// icon `key` reuses the ICONS map in LiveAIHome.tsx.
export type System = {
  key: string; name: string; problem: string; outcome: string;
  connects: string; price: string; time: string; cta: string; href: string;
};
export const systems: System[] = [
  { key: "receptionist", name: "AI Receptionist", problem: "Missed calls, repeated questions, slow replies.", outcome: "Customers get answers and you get clean lead details.", connects: "Website · SMS · WhatsApp · Instagram DM · email", price: "From $1,000 CAD", time: "Live in ~5 business days", cta: "Get this built", href: "/create" },
  { key: "quote", name: "AI Quote Agent", problem: "Customers send vague requests and you waste time chasing details.", outcome: "The AI collects job type, photos, size, location, timing, and budget.", connects: "Website form · email · CRM · Google Sheets", price: "From $1,000 CAD", time: "Live in ~5 business days", cta: "Get this built", href: "/create" },
  { key: "followup", name: "AI Lead Follow-Up Agent", problem: "Leads go cold because nobody follows up fast enough.", outcome: "The AI follows up, answers questions, and pushes them toward booking.", connects: "Email · SMS · CRM · calendar", price: "From $1,500 CAD", time: "Live in 1–2 weeks", cta: "Get this built", href: "/create" },
  { key: "invoice", name: "AI Invoice Reminder Agent", problem: "Unpaid invoices waste your time and cash flow.", outcome: "Polite reminders go out automatically until the invoice is paid.", connects: "QuickBooks · Stripe · Square · email · SMS", price: "From $1,500 CAD", time: "Live in 1–2 weeks", cta: "Get this built", href: "/create" },
  { key: "proposal", name: "AI Admin System", problem: "Your business runs through scattered texts, emails, forms, and spreadsheets.", outcome: "One connected workflow for intake, follow-up, reminders, and reporting.", connects: "CRM · calendar · email · forms · payments", price: "From $2,500 CAD", time: "Live in 2–3 weeks", cta: "Plan my system", href: "/create" },
];

// "Who it's for" tiles — one concrete use case each. Linked to the industries hub.
export const industries: { name: string; use: string }[] = [
  { name: "Landscaping", use: "Quote requests, photos, measurements, follow-ups." },
  { name: "Lawn care", use: "Recurring bookings, seasonal reminders, fast quotes." },
  { name: "Plumbing", use: "Emergency triage, after-hours calls, job booking." },
  { name: "Electrical", use: "Priority call triage, quotes, scheduling." },
  { name: "HVAC", use: "Seasonal demand, maintenance reminders, quick quotes." },
  { name: "Roofing", use: "Inspection requests, photo intake, estimate follow-ups." },
  { name: "Cleaning", use: "Recurring bookings, quote intake, reminders." },
  { name: "Moving", use: "Size/date/location intake, instant quotes, follow-ups." },
  { name: "Pest control", use: "Service requests, recurring plans, callbacks." },
  { name: "Dental clinics", use: "Appointment questions, intake, missed-call capture." },
  { name: "Salons", use: "Bookings, no-show reminders, service questions." },
  { name: "Restaurants", use: "Catering inquiries, FAQs, group bookings." },
  { name: "Auto detailing", use: "Package quotes, bookings, reminders." },
  { name: "Real estate", use: "Lead capture, showing requests, fast follow-up." },
];
