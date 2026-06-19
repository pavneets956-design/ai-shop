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

// Tools Pro pricing (Phase C): Monthly $29/mo, Annual $19/mo billed yearly ($228/yr).
// The toggle shows ONE interval at a time, so there's no confusing "$19 $29 / mo".
//
// ⚠️ STRIPE: the Prices behind NEXT_PUBLIC_STRIPE_PRICE_MONTHLY / _ANNUAL MUST
// match these amounts — a $29/mo recurring Price and a $228/yr recurring Price.
// If they still point at the old $19/$190 founding Prices, checkout will charge
// the old amount (an undercharge, not an overcharge). Update them in Stripe +
// Vercel before relying on the new numbers.
export const toolsPlan = {
  name: "Tools Pro",
  tagline: "Every AI tool, unlimited — built and tuned by Handbuilt.",
  founding: "", // founding-deal framing retired — clean monthly/annual now
  intervals: [
    {
      id: "monthly",
      label: "Monthly",
      priceLabel: "$29",
      sublabel: "per month",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
    },
    {
      id: "annual",
      label: "Annual",
      priceLabel: "$19",
      sublabel: "per month, billed yearly — save 34%",
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
