// ============================================================================
// Trade context for the build-request form.
//
// These questions are about the VISITOR'S OWN BUSINESS. That is the whole point
// of the 2026-08-30 rewrite: this file used to hold the *customer-side* intake
// schema borrowed from the showroom demo, so a plumber filling in a B2B lead
// form was asked "What's the issue — Leak / water", "Service address", and
// "Active water or gas issue?" — i.e. we asked the plumber whether HE had a gas
// leak. Nothing here may ask a question that only makes sense if the person
// filling the form is the customer rather than the owner.
//
// Two questions per trade, both OPTIONAL, both chips (no typing on a phone).
// They exist because they change what gets built: what the business actually
// sells, and which channel the work arrives on.
//
// Trade ids still match the showroom INDUSTRIES (lib/data/showroom.ts) so the
// showroom's "Get this installed" CTA can deep-link: /create?industry=<id>.
// ============================================================================

export type IntakeFieldType = "text" | "chips";

export interface IntakeField {
  key: string;
  label: string;
  type: IntakeFieldType;
  options?: string[]; // for chips
  placeholder?: string; // for text
}

export interface Trade {
  id: string;
  label: string;
  /** lead `goal` seed when arriving from the showroom with this trade. */
  noun: string;
  fields: IntakeField[];
}

/**
 * Asked of every trade in the same words — the answer decides which channel the
 * AI worker has to live on, which is the single biggest scoping input there is.
 */
const ENQUIRY_CHANNEL: IntakeField = {
  key: "enquiries",
  label: "How do new enquiries reach you today?",
  type: "chips",
  options: ["Phone calls", "Website form", "Text / WhatsApp", "Email", "Social DMs"],
};

const work = (options: string[]): IntakeField => ({
  key: "work",
  label: "What kind of work do you take on?",
  type: "chips",
  options,
});

export const TRADES: Trade[] = [
  {
    id: "landscaping",
    label: "Landscaping",
    noun: "lawn & garden business",
    fields: [
      work(["Maintenance contracts", "One-off jobs", "Design / installs", "Snow & seasonal"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    noun: "plumbing business",
    fields: [
      work(["Emergency callouts", "Service & repair", "Renos / installs", "New construction"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "electrical",
    label: "Electrical",
    noun: "electrical business",
    fields: [
      work(["Service calls", "Panel & rewires", "Renos / installs", "Commercial contracts"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "cleaning",
    label: "Cleaning",
    noun: "cleaning business",
    fields: [
      work(["Recurring residential", "Commercial / offices", "Move-in / move-out", "Deep cleans"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "dental",
    label: "Dental / Clinic",
    noun: "dental clinic",
    fields: [
      work(["General practice", "Specialist referrals", "Cosmetic", "Walk-in / urgent"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "salon",
    label: "Salon",
    noun: "salon or spa",
    fields: [
      work(["Hair", "Nails / beauty", "Spa treatments", "Barbering"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    noun: "restaurant",
    fields: [
      work(["Dine-in & reservations", "Takeout / delivery", "Catering", "Private events"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    noun: "real estate business",
    fields: [
      work(["Residential sales", "Rentals / property management", "Commercial", "New developments"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "moving",
    label: "Moving",
    noun: "moving business",
    fields: [
      work(["Local moves", "Long-distance", "Office / commercial", "Storage"]),
      ENQUIRY_CHANNEL,
    ],
  },
  {
    id: "other",
    label: "Something else",
    noun: "business",
    fields: [
      work(["Services", "Retail / e-commerce", "Trades / field work", "Professional services"]),
      ENQUIRY_CHANNEL,
    ],
  },
];

export const tradeById = (id: string): Trade | undefined => TRADES.find((t) => t.id === id);

/** Build the labelled intake object the lead email renders ({ "City": "Delta" }). */
export function intakeToLabels(trade: Trade, values: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of trade.fields) {
    const v = values[f.key];
    if (v && v.trim()) out[f.label] = v.trim();
  }
  return out;
}
