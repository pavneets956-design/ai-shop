// Tools Pro — the paid plan that unlocks the self-serve AI tools.
// Displayed price MUST match the Stripe Price you create. Set the price IDs in
// env (NEXT_PUBLIC so the client can pass them to checkout):
//   NEXT_PUBLIC_STRIPE_PRICE_MONTHLY, NEXT_PUBLIC_STRIPE_PRICE_ANNUAL

export interface PlanInterval {
  id: "monthly" | "annual";
  label: string;
  priceLabel: string;
  /** Struck-through anchor (regular list price the founding deal is off). */
  anchorLabel?: string;
  sublabel: string;
  /** Stripe Price ID, from env. */
  priceId: string | undefined;
}

// Pricing: list price is $29/mo ($290/yr). Launch with a FOUNDING deal — first
// 20 members lock in $19/mo ($190/yr) for life. Create the Stripe Prices at the
// founding numbers ($19 / $190); when 20 are sold, create $29/$290 Prices and
// swap the env IDs (existing members keep their grandfathered price in Stripe).
export const toolsPlan = {
  name: "Tools Pro",
  tagline: "Every AI tool, unlimited — built and tuned by Handbuilt.",
  founding: "Founding price — first 20 members, locked in for life.",
  intervals: [
    {
      id: "monthly",
      label: "Monthly",
      priceLabel: "$19",
      anchorLabel: "$29",
      sublabel: "per month",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
    },
    {
      id: "annual",
      label: "Annual",
      priceLabel: "$190",
      anchorLabel: "$290",
      sublabel: "per year · 2 months free",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL,
    },
  ] as PlanInterval[],
  features: [
    "Unlimited use of every tool — proposals, quotes, SOPs, job ads, review replies, win-backs & more",
    "Premium outputs: longer, structured, ready to send",
    "Save your brand profile once — it prefills every tool",
    "Your full generation history, saved to your account",
    "Print / PDF export on every document",
    "New tools added regularly, included free",
  ],
} as const;
