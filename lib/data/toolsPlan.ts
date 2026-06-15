// Tools Pro — the paid plan that unlocks the self-serve AI tools.
// Displayed price MUST match the Stripe Price you create. Set the price IDs in
// env (NEXT_PUBLIC so the client can pass them to checkout):
//   NEXT_PUBLIC_STRIPE_PRICE_MONTHLY, NEXT_PUBLIC_STRIPE_PRICE_ANNUAL

export interface PlanInterval {
  id: "monthly" | "annual";
  label: string;
  priceLabel: string;
  sublabel: string;
  /** Stripe Price ID, from env. */
  priceId: string | undefined;
}

export const toolsPlan = {
  name: "Tools Pro",
  tagline: "Every AI tool, unlimited — built and tuned by Handbuilt.",
  intervals: [
    {
      id: "monthly",
      label: "Monthly",
      priceLabel: "$19",
      sublabel: "per month",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
    },
    {
      id: "annual",
      label: "Annual",
      priceLabel: "$190",
      sublabel: "per year · 2 months free",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL,
    },
  ] as PlanInterval[],
  features: [
    "Unlimited use of every tool — proposals, quotes, review replies, briefs, reminders",
    "Premium outputs: longer, structured, ready to send",
    "Save your brand profile once — it prefills every tool",
    "Your full generation history, saved to your account",
    "Print / PDF export on every document",
    "New tools added regularly, included free",
  ],
} as const;
