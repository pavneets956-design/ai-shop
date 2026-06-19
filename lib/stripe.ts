import Stripe from "stripe";

/**
 * Server-only Stripe client. Lazily constructed so the app builds/boots even
 * when STRIPE_SECRET_KEY isn't set yet (routes that need it return a clear
 * error instead of crashing at import time).
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  _stripe = new Stripe(key, { apiVersion: "2023-10-16" });
  return _stripe;
}

/** Base URL for building Stripe redirect URLs. */
export function appUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "https://aibuiltbyhand.com"
  ).replace(/\/$/, "");
}

// ---------------------------------------------------------------------------
// Live Tools Pro price display — STRIPE IS THE SINGLE SOURCE OF TRUTH.
//
// We read the actual amount from the configured Price objects and show THAT, so
// the displayed price can never drift from what checkout charges. Change the
// price in Stripe (or point the env Price ID at a new Price) and the site
// reflects it automatically — no code change, no redeploy, no mismatch.
// Falls back to the static labels in lib/data/toolsPlan.ts when Stripe isn't
// reachable (e.g. local dev without a key).
// ---------------------------------------------------------------------------

export type IntervalPrice = { priceLabel: string; sublabel: string };
export type ToolsPlanPrices = { monthly: IntervalPrice | null; annual: IntervalPrice | null };

function fmtPrice(p: Stripe.Price | null): IntervalPrice | null {
  if (!p || p.unit_amount == null || !p.recurring) return null;
  const amt = p.unit_amount / 100;
  const dollars = Number.isInteger(amt) ? `$${amt}` : `$${amt.toFixed(2)}`;
  if (p.recurring.interval === "year") {
    const perMo = Math.round(amt / 12);
    return { priceLabel: dollars, sublabel: `per year · about $${perMo}/mo` };
  }
  return { priceLabel: dollars, sublabel: "per month" };
}

export async function getToolsPlanPrices(): Promise<ToolsPlanPrices | null> {
  const stripe = getStripe();
  const monthlyId = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY;
  const annualId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL;
  if (!stripe || (!monthlyId && !annualId)) return null;
  try {
    const [m, a] = await Promise.all([
      monthlyId ? stripe.prices.retrieve(monthlyId) : Promise.resolve(null),
      annualId ? stripe.prices.retrieve(annualId) : Promise.resolve(null),
    ]);
    return { monthly: fmtPrice(m), annual: fmtPrice(a) };
  } catch (e) {
    console.error("[stripe] price fetch failed:", (e as Error)?.message);
    return null;
  }
}
