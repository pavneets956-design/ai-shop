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
