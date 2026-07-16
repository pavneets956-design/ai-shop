// Contractor Lead-Leak Audit — deterministic scored self-assessment (NOT an
// AI chatbot). 12 areas, each scored 0–3, averaged to a 0–100 score. Transparent
// scoring, no fear-based copy, useful even if the visitor never contacts us.

export interface LeakCategoryOption {
  points: number; // 0 (biggest leak) .. 3 (handled)
  label: string;
}

export interface LeakCategory {
  key: string;
  label: string;
  question: string;
  options: LeakCategoryOption[];
  manualFix: string;
  automateFix: string;
}

export type LeadLeakAnswers = Record<string, number>;

export interface CategoryScore {
  key: string;
  label: string;
  points: number;
  score: number; // 0..100
  manualFix: string;
  automateFix: string;
}

export type LeakBand = "strong" | "solid" | "leaky" | "critical";

export interface LeadLeakResult {
  overall: number;
  band: LeakBand;
  byCategory: CategoryScore[];
  topLeaks: CategoryScore[];
  answeredCount: number;
  completeness: number; // % of 12 areas answered
}

export const LEAD_LEAK_CATEGORIES: LeakCategory[] = [
  {
    key: "missed-calls",
    label: "Missed calls",
    question: "When a call comes in during work hours, what usually happens?",
    options: [
      { points: 3, label: "Always answered live, or a system texts the caller back instantly" },
      { points: 2, label: "Answered most of the time; a few slip to voicemail" },
      { points: 1, label: "Often goes to voicemail, checked later that day" },
      { points: 0, label: "Missed calls pile up and sometimes never get returned" },
    ],
    manualFix: "Assign one person to answer or return every call within business hours, and check voicemail twice a day.",
    automateFix: "An AI receptionist answers 24/7 and texts missed callers back within seconds.",
  },
  {
    key: "response-time",
    label: "Lead response time",
    question: "How fast do you reply to a brand-new lead (call, form, or text)?",
    options: [
      { points: 3, label: "Within about 5 minutes" },
      { points: 2, label: "Within an hour" },
      { points: 1, label: "Same day" },
      { points: 0, label: "A day or more, or whenever I get to it" },
    ],
    manualFix: "Make a rule to acknowledge every new lead within the hour, even just a quick reply.",
    automateFix: "Auto-reply the instant a lead lands, then route it straight to you.",
  },
  {
    key: "after-hours",
    label: "After-hours coverage",
    question: "What happens to calls and leads after hours or on weekends?",
    options: [
      { points: 3, label: "Captured and answered automatically" },
      { points: 2, label: "Captured, then followed up the next morning" },
      { points: 1, label: "Voicemail only, and it's hit or miss" },
      { points: 0, label: "Lost — there's no coverage" },
    ],
    manualFix: "Record a clear after-hours voicemail with a next-day promise, and check it first thing.",
    automateFix: "An AI receptionist qualifies or books after-hours leads while you sleep.",
  },
  {
    key: "web-form-response",
    label: "Web-form response",
    question: "When someone fills out your website form, how fast are they contacted?",
    options: [
      { points: 3, label: "Instantly and automatically" },
      { points: 2, label: "Within a couple of hours" },
      { points: 1, label: "Same day" },
      { points: 0, label: "Slowly, or not at all" },
    ],
    manualFix: "Have form submissions texted to your phone and reply within the hour.",
    automateFix: "Instant auto-reply plus a follow-up sequence on every form fill.",
  },
  {
    key: "quote-follow-up",
    label: "Quote follow-up",
    question: "After you send a quote or estimate, how do you follow up?",
    options: [
      { points: 3, label: "A planned sequence over the following days and weeks" },
      { points: 2, label: "I follow up once or twice" },
      { points: 1, label: "Only if I happen to remember" },
      { points: 0, label: "I don't — I wait for them to call me" },
    ],
    manualFix: "Follow up 1 day, 3 days, and about a week after every quote.",
    automateFix: "Automated quote follow-up messages that run until the customer replies.",
  },
  {
    key: "lead-ownership",
    label: "Lead ownership",
    question: "Is it always clear who owns each lead until it's won or lost?",
    options: [
      { points: 3, label: "Yes — every lead has an owner and a next step" },
      { points: 2, label: "Mostly" },
      { points: 1, label: "Sometimes things fall through the cracks" },
      { points: 0, label: "No real system — leads get dropped" },
    ],
    manualFix: "Keep every lead in one list with a named owner and the next action.",
    automateFix: "A simple pipeline that assigns and tracks every lead automatically.",
  },
  {
    key: "reminders",
    label: "Follow-up reminders",
    question: "Do you get reminded to follow up before a lead goes cold?",
    options: [
      { points: 3, label: "Yes, automatically" },
      { points: 2, label: "I set my own reminders" },
      { points: 1, label: "Rarely" },
      { points: 0, label: "Never — I rely on memory" },
    ],
    manualFix: "Set a calendar reminder for every open lead's next touch.",
    automateFix: "Automatic tasks and reminders so no follow-up slips.",
  },
  {
    key: "pipeline-visibility",
    label: "Pipeline visibility",
    question: "Can you see all your open leads and where each one stands right now?",
    options: [
      { points: 3, label: "Yes, in one view" },
      { points: 2, label: "Mostly, across a couple of places" },
      { points: 1, label: "Only in my head or scattered notes" },
      { points: 0, label: "No — I can't see my pipeline" },
    ],
    manualFix: "Track leads in a single spreadsheet with a clear status column.",
    automateFix: "A live pipeline board that updates as leads move.",
  },
  {
    key: "appointment-confirmation",
    label: "Appointment confirmation",
    question: "Do you confirm appointments and estimates before they happen?",
    options: [
      { points: 3, label: "Yes, with automatic reminders" },
      { points: 2, label: "I text or call to confirm" },
      { points: 1, label: "Sometimes" },
      { points: 0, label: "No — and I get no-shows" },
    ],
    manualFix: "Text a confirmation the day before every appointment.",
    automateFix: "Automated appointment reminders that cut no-shows.",
  },
  {
    key: "stale-lead-recovery",
    label: "Stale-lead recovery",
    question: "What happens to leads that went quiet weeks or months ago?",
    options: [
      { points: 3, label: "I run a planned re-engagement sequence" },
      { points: 2, label: "I reach out occasionally" },
      { points: 1, label: "I rarely revisit them" },
      { points: 0, label: "They're gone for good" },
    ],
    manualFix: "Once a month, message old quotes to see if the timing has changed.",
    automateFix: "An automated re-activation campaign to old leads.",
  },
  {
    key: "review-requests",
    label: "Review requests",
    question: "Do you ask happy customers for a review after the job?",
    options: [
      { points: 3, label: "Yes, every time and automatically" },
      { points: 2, label: "I ask most of the time" },
      { points: 1, label: "Only occasionally" },
      { points: 0, label: "I don't ask" },
    ],
    manualFix: "Ask for a review at job completion and text the review link.",
    automateFix: "An automatic review request after every completed job.",
  },
  {
    key: "measurement",
    label: "Measurement & attribution",
    question: "Do you know where your leads and won jobs actually come from?",
    options: [
      { points: 3, label: "Yes — I track lead source and close rate" },
      { points: 2, label: "Roughly" },
      { points: 1, label: "Not really" },
      { points: 0, label: "No idea" },
    ],
    manualFix: "Ask every lead how they found you and log it.",
    automateFix: "Track lead source and conversion automatically.",
  },
];

const bandFor = (overall: number): LeakBand =>
  overall >= 80 ? "strong" : overall >= 60 ? "solid" : overall >= 40 ? "leaky" : "critical";

const catIndex = (key: string) => LEAD_LEAK_CATEGORIES.findIndex((c) => c.key === key);

export function scoreLeadLeak(answers: LeadLeakAnswers): LeadLeakResult {
  const byCategory: CategoryScore[] = [];
  for (const c of LEAD_LEAK_CATEGORIES) {
    const raw = answers[c.key];
    if (typeof raw !== "number" || !Number.isInteger(raw) || raw < 0 || raw > 3) continue;
    byCategory.push({
      key: c.key,
      label: c.label,
      points: raw,
      score: Math.round((raw / 3) * 100),
      manualFix: c.manualFix,
      automateFix: c.automateFix,
    });
  }

  const answeredCount = byCategory.length;
  const overall = answeredCount
    ? Math.round(byCategory.reduce((s, c) => s + c.score, 0) / answeredCount)
    : 0;
  const band = bandFor(overall);
  const topLeaks = [...byCategory]
    .sort((a, b) => a.score - b.score || catIndex(a.key) - catIndex(b.key))
    .slice(0, 3);
  const completeness = Math.round((answeredCount / LEAD_LEAK_CATEGORIES.length) * 100);

  return { overall, band, byCategory, topLeaks, answeredCount, completeness };
}
