// Contractor Quote Follow-Up generator — 100% deterministic templates, NO LLM.
// SALES / quote lane only: chasing a sent estimate before the job. This is NOT
// invoice/payment-reminder territory (that's a different tool). Human, non-spammy
// language, no false scarcity, no manipulative pressure.

export type FollowUpTone = "friendly" | "straightforward" | "urgent" | "final";
export type FollowUpChannel = "sms" | "email" | "both";

export interface QuoteFollowUpInput {
  firstName?: string;
  trade?: string;
  jobType?: string;
  quoteDate?: string;
  expirationDate?: string;
  startDate?: string;
  tone: FollowUpTone;
  channel: FollowUpChannel;
  financingAvailable?: boolean;
  customDetail?: string;
  businessName?: string;
}

export interface SmsVariant {
  body: string;
  length: number;
  segments: number;
}
export interface EmailVariant {
  subject: string;
  body: string;
}
export interface FollowUpMessage {
  id: string;
  label: string;
  timingHint: string;
  sms?: SmsVariant;
  email?: EmailVariant;
}
export interface QuoteFollowUpResult {
  sequence: FollowUpMessage[];
}

/** GSM-style segment count: 1 up to 160 chars, then 153-char concatenated parts. */
export function smsSegments(text: string): number {
  const len = text.length;
  if (len === 0) return 0;
  if (len <= 160) return 1;
  return Math.ceil(len / 153);
}

const toneClose: Record<FollowUpTone, string> = {
  friendly: "Thanks so much — happy to answer anything at all.",
  straightforward: "Thanks — just let me know how you'd like to proceed.",
  urgent: "A quick reply helps me hold your spot on the schedule.",
  final: "No pressure at all either way — just closing the loop.",
};

interface StepDef {
  id: string;
  label: string;
  timingHint: string;
  sms: (c: Ctx) => string;
  subject: (c: Ctx) => string;
  emailBody: (c: Ctx) => string;
}

interface Ctx {
  name: string;
  trade: string;
  tradeText: string;
  jobSuffix: string;
  startDate?: string;
  expirationDate?: string;
  financing: boolean;
  customDetail?: string;
  quoteDate?: string;
}

const STEPS: StepDef[] = [
  {
    id: "receipt",
    label: "Quote receipt confirmation",
    timingHint: "Send right after you deliver the quote.",
    sms: (c) =>
      `Hi ${c.name}, thanks for the chance to quote your ${c.trade} project${c.jobSuffix}. I've sent the details over — shout if anything's unclear.`,
    subject: (c) => `Your ${c.trade} quote`,
    emailBody: (c) =>
      `Hi ${c.name},\n\nThanks for the opportunity to quote your ${c.trade} project${c.jobSuffix}. ` +
      `I've put everything together and sent it your way${c.quoteDate ? ` (sent ${c.quoteDate})` : ""}.` +
      (c.expirationDate ? `\n\nThis quote is valid until ${c.expirationDate}; it expires after that date, so let me know if you'd like to lock it in.` : "") +
      `\n\nIf anything's unclear or you'd like me to adjust the scope, just reply here.`,
  },
  {
    id: "first-follow-up",
    label: "First follow-up",
    timingHint: "1–2 days after the quote.",
    sms: (c) => `Hi ${c.name}, just checking you received my ${c.trade} quote. Any questions I can answer?`,
    subject: (c) => `Quick check-in on your ${c.trade} quote`,
    emailBody: (c) =>
      `Hi ${c.name},\n\nJust making sure my ${c.trade} quote landed with you and wasn't buried in a busy inbox. ` +
      `Happy to walk through any line item or answer questions.` +
      (c.customDetail ? `\n\nYou mentioned: ${c.customDetail}` : "") +
      (c.financing ? `\n\nWe also offer financing options if that would make the ${c.trade} project easier to move forward.` : ""),
  },
  {
    id: "question-handling",
    label: "Question-handling follow-up",
    timingHint: "3–4 days after, if you haven't heard back.",
    sms: (c) => `Hi ${c.name}, happy to tweak the ${c.trade} quote to fit your budget or timeline. What would help?`,
    subject: (c) => `Anything I can clear up on your ${c.trade} quote?`,
    emailBody: (c) =>
      `Hi ${c.name},\n\nSometimes a quote raises a few questions — cost, materials, or how the work would go. ` +
      `I'm glad to explain anything or adjust the ${c.trade} scope so it fits what you need.`,
  },
  {
    id: "timing",
    label: "Timing / start-date follow-up",
    timingHint: "About a week after the quote.",
    sms: (c) =>
      `Hi ${c.name}, checking your timing on the ${c.trade} work. ${c.startDate ? `Still aiming for around ${c.startDate}?` : `When were you hoping to start?`}`,
    subject: (c) => `Timing for your ${c.trade} project`,
    emailBody: (c) =>
      `Hi ${c.name},\n\nWanted to check in on timing for the ${c.trade} work. ` +
      (c.startDate
        ? `You mentioned aiming to start around ${c.startDate} — I can still line that up if it works for you.`
        : `If you have a rough start window in mind, let me know and I'll fit it into the schedule.`),
  },
  {
    id: "final-check-in",
    label: "Final check-in",
    timingHint: "10–14 days after the quote.",
    sms: (c) => `Hi ${c.name}, last check-in on your ${c.trade} quote — no pressure, just let me know if it's still on your radar.`,
    subject: (c) => `Last check-in on your ${c.trade} quote`,
    emailBody: (c) =>
      `Hi ${c.name},\n\nI don't want to crowd your inbox, so this is my last check-in on the ${c.trade} quote. ` +
      `If it's still something you're weighing, I'm here. If the timing isn't right, no problem at all.`,
  },
  {
    id: "cold-reopening",
    label: "Cold-quote reopening",
    timingHint: "3–6 weeks later, for quotes that went quiet.",
    sms: (c) => `Hi ${c.name}, circling back on the ${c.trade} quote from a while ago. If the timing's better now, I'd be glad to help.`,
    subject: (c) => `Still thinking about your ${c.trade} project?`,
    emailBody: (c) =>
      `Hi ${c.name},\n\nIt's been a little while since I sent your ${c.trade} quote. Projects often come back around when the timing's right — ` +
      `if now's better, I'd be happy to revisit the numbers and get you on the schedule.`,
  },
  {
    id: "respectful-close",
    label: "Respectful close-the-loop",
    timingHint: "If there's still no reply — closes the loop, leaves the door open.",
    sms: (c) => `Hi ${c.name}, I'll close out the ${c.trade} quote for now so I'm not filling your inbox. Reach out anytime — the door's open.`,
    subject: (c) => `Closing the loop on your ${c.trade} quote`,
    emailBody: (c) =>
      `Hi ${c.name},\n\nI'll close this out for now so I'm not cluttering your inbox. It was a pleasure putting the ${c.trade} quote together. ` +
      `If anything changes down the road, just reach out — the door's always open.`,
  },
];

export function generateQuoteFollowUps(input: QuoteFollowUpInput): QuoteFollowUpResult {
  const name = input.firstName?.trim() || "there";
  const trade = input.trade?.trim() || "your project";
  const jobType = input.jobType?.trim();
  const jobSuffix = jobType ? ` (${jobType})` : "";
  const close = toneClose[input.tone] ?? toneClose.friendly;
  const signature = input.businessName?.trim() ? `\n\n– ${input.businessName.trim()}` : "";

  const ctx: Ctx = {
    name,
    trade,
    tradeText: trade,
    jobSuffix,
    startDate: input.startDate?.trim() || undefined,
    expirationDate: input.expirationDate?.trim() || undefined,
    financing: !!input.financingAvailable,
    customDetail: input.customDetail?.trim() || undefined,
    quoteDate: input.quoteDate?.trim() || undefined,
  };

  const wantSms = input.channel === "sms" || input.channel === "both";
  const wantEmail = input.channel === "email" || input.channel === "both";

  const sequence: FollowUpMessage[] = STEPS.map((step) => {
    const msg: FollowUpMessage = { id: step.id, label: step.label, timingHint: step.timingHint };
    if (wantSms) {
      const body = step.sms(ctx);
      msg.sms = { body, length: body.length, segments: smsSegments(body) };
    }
    if (wantEmail) {
      const body = `${step.emailBody(ctx)}\n\n${close}${signature}`;
      msg.email = { subject: step.subject(ctx), body };
    }
    return msg;
  });

  return { sequence };
}
