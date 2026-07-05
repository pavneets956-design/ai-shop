/**
 * /forge — all editable content for the cinematic single-page site.
 *
 * To add product #4/#5/#6: append one object to `products`. Nothing else to touch.
 * `[EDIT]` marks copy Pavneet should confirm/replace. `screenshot` is a path under
 * /public (e.g. "/forge/coitracker.png") — leave null to show the branded slot.
 */

export type ForgeProduct = {
  title: string;
  /** One line. Concrete outcome > adjectives. */
  description: string;
  /** Path under /public, or null for the placeholder slot. */
  screenshot: string | null;
  /** Optional live link. */
  href: string | null;
  /** Short status/category tag shown on the card, e.g. "LIVE SAAS". */
  tag: string;
  /** The anchor product renders larger (first card spans 2 columns). */
};

export const products: ForgeProduct[] = [
  {
    title: "COITracker",
    description:
      "Tracks vendor certificates of insurance and chases expiries automatically — live B2B SaaS used in production.",
    screenshot: null, // [EDIT] drop a real UI screenshot at public/forge/coitracker.png and set "/forge/coitracker.png"
    href: "https://coitracker.co",
    tag: "LIVE SAAS",
  },
  {
    title: "PayNudge",
    description:
      "[EDIT] One line on PayNudge — automated payment follow-ups that recover overdue invoices without the awkward chase.",
    screenshot: null, // [EDIT] public/forge/paynudge.png
    href: null,
    tag: "SHIPPED",
  },
  {
    title: "RoomRush",
    description:
      "[EDIT] One line on RoomRush — a live shared-screen party game every phone in the room joins in seconds.",
    screenshot: null, // [EDIT] public/forge/roomrush.png
    href: null,
    tag: "SHIPPED",
  },
];

export type ForgeLane = {
  title: string;
  description: string;
  /** Lucide icon name rendered by the section (kept as data so lanes stay one-array-editable). */
  icon: "workflow" | "wrench" | "cpu" | "bot";
};

export const lanes: ForgeLane[] = [
  {
    title: "Workflow & payment automation",
    description:
      "Invoices chased, documents filed, follow-ups sent — the manual loop your team does weekly, running on its own.",
    icon: "workflow",
  },
  {
    title: "Custom internal tools",
    description:
      "The dashboard, tracker, or portal your business actually needs — not the closest off-the-shelf compromise.",
    icon: "wrench",
  },
  {
    title: "Custom AI software",
    description:
      "Full products built around your data and your rules, from intake form to production deploy.",
    icon: "cpu",
  },
  {
    title: "AI agents & integrations",
    description:
      "Agents that read, decide, and act inside the tools you already use — email, CRM, calendars, spreadsheets.",
    icon: "bot",
  },
];

export const audience =
  "Built for contractors, service businesses, agencies, clinics, real estate teams, and small businesses drowning in manual work.";

export const steps = [
  {
    n: "01",
    title: "Tell me your problem",
    description: "The task that eats your week, in plain words. No spec required.",
  },
  {
    n: "02",
    title: "I build the system",
    description: "Designed, built, and tested by hand around your exact workflow.",
  },
  {
    n: "03",
    title: "It runs",
    description: "Deployed, monitored, and doing the work while you do yours.",
  },
] as const;

export const budgetOptions = [
  "Under $750 — small automation",
  "$750–$2,500",
  "$2,500–$7,500",
  "$7,500+",
] as const;

export const timelineOptions = [
  "ASAP",
  "Within a month",
  "Next few months",
  "Just exploring",
] as const;
