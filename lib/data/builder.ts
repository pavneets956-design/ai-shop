// Deterministic "Build my AI system" planner for the homepage hero console.
// Maps a business type + a free-text "what do you want off your plate?" to a
// tailored system blueprint + an ESTIMATE RANGE (never an exact auto-quote, so
// there's no scope/pricing liability). Zero API cost — runs fully client-side.
//
// EDIT the templates here to change what each system shows. No component changes.

export type BlueprintStep = { label: string; sub?: string };

export type IntentKey = "calls" | "quotes" | "leads" | "reviews" | "invoices" | "admin";

export type BuildPlan = {
  intent: IntentKey;
  system: string;     // e.g. "AI Receptionist + Booking"
  tagline: string;    // one warm line, business-flavored
  steps: BlueprintStep[];
  priceRange: string; // ALWAYS a range — clearly an estimate, not a quote
  timeline: string;
  impact: string;     // benefit label (hours saved / jobs closed / cash flow)
  connects: string;
  workingLabels: string[]; // staged "designing…" lines
};

export type BusinessType = { key: string; label: string; noun: string; sample: string };

// Business selector chips. `sample` pre-fills the input on pick / auto-demo.
export const businessTypes: BusinessType[] = [
  { key: "trades", label: "Trades", noun: "trades business", sample: "Answer my calls and book jobs" },
  { key: "landscaping", label: "Landscaping", noun: "landscaping company", sample: "Quote lawn jobs and chase the leads" },
  { key: "dental", label: "Dental / clinic", noun: "clinic", sample: "Stop missing calls and book appointments" },
  { key: "salon", label: "Salon / spa", noun: "salon", sample: "Take bookings and cut no-shows" },
  { key: "realestate", label: "Real estate", noun: "real estate business", sample: "Capture leads and follow up fast" },
  { key: "restaurant", label: "Restaurant", noun: "restaurant", sample: "Handle reservations and catering inquiries" },
];

// Keyword → intent. First match wins; order is specific → general.
const INTENT_RULES: { intent: IntentKey; re: RegExp }[] = [
  { intent: "invoices", re: /invoic|payment|overdue|unpaid|collect|owe/i },
  { intent: "reviews", re: /review|reputation|google|rating|feedback|star/i },
  { intent: "quotes", re: /quote|estimat|pricing|\bprice|bid|proposal/i },
  // "reserv" lives here on purpose: reservations are a booking action best served
  // by the Receptionist + Booking system, so restaurant language routes there.
  { intent: "calls", re: /call|phone|answer|reception|book|booking|appointment|reserv|schedul|no-?show|miss/i },
  { intent: "leads", re: /lead|follow|chase|nurtur|chat|website|\bdm\b|message|inquir|enquir|catering/i },
  { intent: "admin", re: /everything|all of it|admin|manage|organi|workflow|automate|run my|whole/i },
];

export function detectIntent(text: string): IntentKey {
  const t = (text || "").trim();
  if (!t) return "calls";
  for (const r of INTENT_RULES) if (r.re.test(t)) return r.intent;
  return "calls"; // sensible default — the #1 ask
}

type Template = (biz: BusinessType) => Omit<BuildPlan, "intent">;

const TEMPLATES: Record<IntentKey, Template> = {
  calls: (biz) => ({
    system: "AI Receptionist + Booking",
    tagline: `Never miss a call at your ${biz.noun} again.`,
    steps: [
      { label: "Incoming call or text", sub: `A customer contacts your ${biz.noun}` },
      { label: "AI receptionist answers", sub: "24/7, on-brand, in your voice" },
      { label: "Qualifies the job", sub: "Asks the right questions, flags urgent ones" },
      { label: "Books into your calendar", sub: "Real-time availability, no double-booking" },
      { label: "Texts you the lead", sub: "Full details, the moment it happens" },
    ],
    priceRange: "$1,000–$2,500",
    timeline: "≈ 5 business days",
    impact: "~12 hrs/week saved",
    connects: "Phone · SMS · Google Calendar · your CRM",
    workingLabels: ["Mapping your call flow…", "Matching AI workers…", "Estimating scope…"],
  }),
  quotes: (biz) => ({
    system: "AI Quote Agent",
    tagline: `Turn vague requests into priced quotes — without the back-and-forth.`,
    steps: [
      { label: "Customer asks for a price", sub: `Form, text, or DM to your ${biz.noun}` },
      { label: "AI collects the details", sub: "Job type, size, photos, location, timing" },
      { label: "Drafts a clear estimate", sub: "Your pricing rules, your format" },
      { label: "Sends it for your OK", sub: "You approve, AI delivers" },
      { label: "Schedules the follow-up", sub: "So no quote goes cold" },
    ],
    priceRange: "$1,000–$2,500",
    timeline: "≈ 5 business days",
    impact: "~8 hrs/week saved",
    connects: "Website form · email · CRM · Google Sheets",
    workingLabels: ["Reading your quote process…", "Building the intake…", "Estimating scope…"],
  }),
  leads: (biz) => ({
    system: "AI Lead Follow-Up",
    tagline: `Reply in seconds, not hours — and close more of what comes in.`,
    steps: [
      { label: "A lead comes in", sub: `Website, chat, or DM to your ${biz.noun}` },
      { label: "AI replies in seconds", sub: "Friendly, instant, never asleep" },
      { label: "Answers their questions", sub: "And handles objections" },
      { label: "Pushes toward booking", sub: "Sends a link, holds a time" },
      { label: "Notifies you", sub: "With the full conversation" },
    ],
    priceRange: "$1,500–$3,000",
    timeline: "1–2 weeks",
    impact: "Replies in under 60 seconds",
    connects: "Website chat · SMS · email · CRM · calendar",
    workingLabels: ["Mapping your lead flow…", "Wiring the follow-ups…", "Estimating scope…"],
  }),
  reviews: (biz) => ({
    system: "AI Review Manager",
    tagline: `Protect your reputation on autopilot.`,
    steps: [
      { label: "A new review lands", sub: `On your ${biz.noun}'s Google profile` },
      { label: "AI drafts an on-brand reply", sub: "Warm, specific, never robotic" },
      { label: "You approve in one tap", sub: "Or let it auto-post" },
      { label: "Asks happy customers", sub: "To leave a review, at the right moment" },
    ],
    priceRange: "$1,000–$2,000",
    timeline: "≈ 5 business days",
    impact: "More reviews from happy customers",
    connects: "Google Business · email · SMS",
    workingLabels: ["Reading your brand voice…", "Setting up replies…", "Estimating scope…"],
  }),
  invoices: (biz) => ({
    system: "AI Invoice Reminder",
    tagline: `Get paid faster — without the awkward chasing.`,
    steps: [
      { label: "An invoice goes overdue", sub: `For your ${biz.noun}` },
      { label: "AI sends a polite nudge", sub: "Your tone, your timing" },
      { label: "Includes a pay link", sub: "One tap to settle up" },
      { label: "Escalates gently", sub: "Until it's paid — never rude" },
      { label: "Marks it paid", sub: "And stops automatically" },
    ],
    priceRange: "$1,500–$3,000",
    timeline: "1–2 weeks",
    impact: "Faster cash flow",
    connects: "QuickBooks · Stripe · Square · SMS · email",
    workingLabels: ["Reading your billing flow…", "Writing the reminders…", "Estimating scope…"],
  }),
  admin: (biz) => ({
    system: "AI Business System",
    tagline: `One connected system for the whole ${biz.noun}.`,
    steps: [
      { label: "Calls & messages come in", sub: "Across every channel" },
      { label: "AI triages, books & quotes", sub: "The front desk that never sleeps" },
      { label: "Follows up on every lead", sub: "Nothing slips" },
      { label: "Chases unpaid invoices", sub: "Politely, automatically" },
      { label: "Reports to you weekly", sub: "What happened, what's next" },
    ],
    priceRange: "$2,500–$5,000",
    timeline: "2–3 weeks",
    impact: "~15 hrs/week saved",
    connects: "Phone · CRM · calendar · payments · email",
    workingLabels: ["Mapping your whole workflow…", "Connecting the AI workers…", "Estimating scope…"],
  }),
};

export function buildPlan(businessKey: string, text: string): BuildPlan {
  const biz = businessTypes.find((b) => b.key === businessKey) || businessTypes[0];
  const intent = detectIntent(text);
  return { intent, ...TEMPLATES[intent](biz) };
}

// ---- "Talk to them, then take them to the right page" routing -------------
// Maps a detected intent to the best REAL destination on the site: a primary
// page (the thing that fits what they asked for) plus a matching live demo /
// build path. The talking AI call (ConsultationCall) uses this to END by
// sending the visitor to the exact page they want — instead of dead-ending on
// a generic plan card. Every href below is a route that actually exists.

export type IntentRoute = {
  system: string; // recommended build, human-readable (also the plan label)
  primaryLabel: string; // dominant CTA label
  primaryHref: string; // the right page for this intent
  demoLabel: string; // secondary CTA label
  demoHref: string; // matching live demo / build path
};

const INTENT_ROUTES: Record<IntentKey, IntentRoute> = {
  calls: {
    system: "AI Receptionist",
    primaryLabel: "See your AI Receptionist",
    primaryHref: "/ai-receptionist",
    demoLabel: "Try the live demo",
    demoHref: "/demo",
  },
  quotes: {
    system: "AI Quote Agent",
    primaryLabel: "Try your Quote Agent live",
    primaryHref: "/demo/quote",
    demoLabel: "Get this built",
    demoHref: "/create",
  },
  leads: {
    system: "Lead & Chat Agent",
    primaryLabel: "See your Lead & Chat Agent",
    primaryHref: "/ai-chatbot-development",
    demoLabel: "Try the live demo",
    demoHref: "/demo/lead",
  },
  reviews: {
    system: "AI Review Manager",
    primaryLabel: "See how this fits your business",
    primaryHref: "/ai-business-system",
    demoLabel: "Get this built",
    demoHref: "/create",
  },
  invoices: {
    system: "AI Invoice Reminder",
    primaryLabel: "Try the Invoice Nudge live",
    primaryHref: "/demo/nudge",
    demoLabel: "Get this built",
    demoHref: "/create",
  },
  admin: {
    system: "AI Business System",
    primaryLabel: "See the AI Business System",
    primaryHref: "/ai-business-system",
    demoLabel: "Try a live demo",
    demoHref: "/demo",
  },
};

export function routeForIntent(intent: IntentKey): IntentRoute {
  return INTENT_ROUTES[intent];
}

// Map a free-text "what they want" answer straight to its destination.
export function routeForWant(text: string): IntentRoute {
  return INTENT_ROUTES[detectIntent(text)];
}
