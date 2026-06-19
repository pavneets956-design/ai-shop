// ============================================================================
// Occupation-specific intake (Phase D).
//
// When a visitor picks their trade, the build-request form asks the RIGHT
// questions for that trade instead of a generic "what industry" chip. Trade ids
// match the showroom INDUSTRIES (lib/data/showroom.ts) so the showroom's
// "Get this installed" CTA can deep-link: /create?industry=<id>.
//
// Keep field sets tight (3-5) — this sits inside an existing multi-step form.
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

export const TRADES: Trade[] = [
  {
    id: "landscaping",
    label: "Landscaping",
    noun: "lawn & garden business",
    fields: [
      { key: "city", label: "City / service area", type: "text", placeholder: "e.g. Delta, BC" },
      { key: "services", label: "Services needed", type: "chips", options: ["Mowing", "Yard cleanup", "Hedges / trees", "Garden beds", "Snow removal", "Other"] },
      { key: "property", label: "Property type", type: "chips", options: ["Residential", "Commercial"] },
      { key: "frequency", label: "One-time or recurring", type: "chips", options: ["One-time", "Recurring"] },
    ],
  },
  {
    id: "plumbing",
    label: "Plumbing",
    noun: "plumbing business",
    fields: [
      { key: "issue", label: "What's the issue", type: "chips", options: ["Leak / water", "No hot water", "Blocked drain", "Install / replace", "Other"] },
      { key: "urgency", label: "Urgency", type: "chips", options: ["Emergency / today", "This week", "Flexible"] },
      { key: "address", label: "Service address / area", type: "text", placeholder: "Street + city" },
      { key: "safety", label: "Active water or gas issue?", type: "chips", options: ["Yes", "No"] },
      { key: "callback", label: "Best callback number", type: "text", placeholder: "Phone" },
    ],
  },
  {
    id: "electrical",
    label: "Electrical",
    noun: "electrical business",
    fields: [
      { key: "issue", label: "What's the issue", type: "chips", options: ["No power", "Panel upgrade", "New install", "Sparking / fault", "Other"] },
      { key: "urgency", label: "Urgency", type: "chips", options: ["Emergency / today", "This week", "Flexible"] },
      { key: "address", label: "Service address / area", type: "text", placeholder: "Street + city" },
      { key: "safety", label: "Any safety concern (smoke, sparks)?", type: "chips", options: ["Yes", "No"] },
      { key: "callback", label: "Best callback number", type: "text", placeholder: "Phone" },
    ],
  },
  {
    id: "cleaning",
    label: "Cleaning",
    noun: "cleaning business",
    fields: [
      { key: "service", label: "Type of clean", type: "chips", options: ["Home", "Office", "Move-in / out", "Deep clean"] },
      { key: "size", label: "Size", type: "text", placeholder: "e.g. 3 bed / 2 bath, or sq ft" },
      { key: "frequency", label: "How often", type: "chips", options: ["One-time", "Weekly", "Biweekly", "Monthly"] },
      { key: "city", label: "City / area", type: "text", placeholder: "City" },
    ],
  },
  {
    id: "dental",
    label: "Dental / Clinic",
    noun: "dental clinic",
    fields: [
      { key: "service", label: "Reason for visit", type: "chips", options: ["Cleaning / checkup", "Pain / emergency", "Cosmetic", "Treatment"] },
      { key: "patient", label: "Patient", type: "chips", options: ["New patient", "Existing patient"] },
      { key: "preferred", label: "Preferred date / time", type: "text", placeholder: "e.g. next week, mornings" },
      { key: "insurance", label: "Insurance", type: "chips", options: ["Have insurance", "Paying directly", "Not sure"] },
    ],
  },
  {
    id: "salon",
    label: "Salon",
    noun: "salon or spa",
    fields: [
      { key: "service", label: "Service", type: "chips", options: ["Cut", "Colour", "Styling", "Spa / other"] },
      { key: "datetime", label: "Preferred date / time", type: "text", placeholder: "e.g. Saturday afternoon" },
      { key: "stylist", label: "Stylist preference", type: "text", placeholder: "Anyone, or a name" },
      { key: "client", label: "New or returning", type: "chips", options: ["New client", "Returning client"] },
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    noun: "restaurant",
    fields: [
      { key: "request", label: "What for", type: "chips", options: ["Reservation", "Catering", "Private event", "Question"] },
      { key: "party", label: "Party size", type: "text", placeholder: "e.g. 6 people" },
      { key: "datetime", label: "Date / time", type: "text", placeholder: "e.g. Friday 7pm" },
      { key: "dietary", label: "Dietary notes", type: "text", placeholder: "Allergies / preferences" },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    noun: "real estate business",
    fields: [
      { key: "intent", label: "Looking to", type: "chips", options: ["Buy", "Sell", "Rent", "Get a valuation"] },
      { key: "area", label: "Area / neighbourhood", type: "text", placeholder: "City / area" },
      { key: "timeframe", label: "Timeframe", type: "chips", options: ["ASAP", "1-3 months", "Just exploring"] },
      { key: "callback", label: "Best callback number", type: "text", placeholder: "Phone" },
    ],
  },
  {
    id: "moving",
    label: "Moving",
    noun: "moving business",
    fields: [
      { key: "type", label: "Type of move", type: "chips", options: ["Local", "Long-distance", "Storage"] },
      { key: "route", label: "From → to", type: "text", placeholder: "e.g. Surrey → Vancouver" },
      { key: "date", label: "Move date", type: "text", placeholder: "e.g. end of month" },
      { key: "size", label: "Home size", type: "chips", options: ["Studio / 1BR", "2-3BR", "4BR+", "Office"] },
    ],
  },
  {
    id: "other",
    label: "Something else",
    noun: "business",
    fields: [
      { key: "about", label: "Tell us about the work", type: "text", placeholder: "What the job involves" },
      { key: "area", label: "City / area", type: "text", placeholder: "City" },
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
