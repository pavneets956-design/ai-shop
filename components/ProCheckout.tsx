"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toolsPlan } from "@/lib/data/toolsPlan";

/**
 * Tools Pro plan card with monthly/annual toggle. Handles the full path:
 * not signed in → Google sign-in; signed in → Stripe Checkout. Reused by the
 * /tools/pro page and the per-tool paywall.
 *
 * `prices` (when passed by a server component via getToolsPlanPrices) carries
 * the LIVE amounts read from Stripe, so the shown price always matches what
 * checkout charges. Falls back to the static toolsPlan labels when absent.
 */
type LivePrices = {
  monthly: { priceLabel: string; sublabel: string } | null;
  annual: { priceLabel: string; sublabel: string } | null;
} | null;

export default function ProCheckout({
  callbackUrl,
  prices,
}: {
  callbackUrl?: string;
  prices?: LivePrices;
}) {
  const { status } = useSession();
  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = toolsPlan.intervals.find((i) => i.id === billingInterval)!;
  // Prefer the live Stripe amount; fall back to the static label.
  const live = prices ? (billingInterval === "monthly" ? prices.monthly : prices.annual) : null;
  const priceLabel = live?.priceLabel ?? plan.priceLabel;
  const sublabel = live?.sublabel ?? plan.sublabel;
  const authed = status === "authenticated";
  // True once at least one Stripe Price ID is configured in env.
  const billingConfigured = toolsPlan.intervals.some((i) => i.priceId);

  const go = async () => {
    setError(null);
    if (!authed) {
      signIn("google", { callbackUrl: callbackUrl || "/tools/pro" });
      return;
    }
    if (!plan.priceId) {
      setError("Billing isn't fully set up yet — check back shortly.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Couldn't start checkout. Try again.");
        setLoading(false);
      }
    } catch {
      setError("Couldn't start checkout. Try again.");
      setLoading(false);
    }
  };

  // Block the CTA only once we KNOW the user is signed in but billing is
  // unconfigured — a logged-out user should still get the sign-in step.
  const billingBlocked = authed && !billingConfigured;

  return (
    <div className="glass-card spec-frame p-7 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">{toolsPlan.name}</h3>
          <p className="mt-1 text-sm text-ink/55">{toolsPlan.tagline}</p>
        </div>
      </div>

      {/* Interval toggle */}
      <div
        role="radiogroup"
        aria-label="Billing interval"
        className="mt-5 inline-flex rounded-lg border border-ink/10 bg-paper-2/60 p-1"
      >
        {toolsPlan.intervals.map((i) => (
          <button
            key={i.id}
            type="button"
            role="radio"
            aria-checked={billingInterval === i.id}
            onClick={() => setBillingInterval(i.id)}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
              billingInterval === i.id ? "bg-white text-ink shadow-sm" : "text-ink/55 hover:text-ink"
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="font-display text-4xl font-bold text-ink">{priceLabel}</span>
        <span className="pb-1 text-sm text-ink/50">{sublabel}</span>
      </div>
      {toolsPlan.founding && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
          {toolsPlan.founding}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {toolsPlan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px] text-ink/80">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-white">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-card-sm border border-line bg-paper-2 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-soft">
        Tools Pro is <span className="font-semibold text-ink">text-only tools</span> — no phone minutes.
        The phone <span className="font-semibold text-ink">AI Receptionist</span> (live call answering) is a
        separate plan with its own setup, monthly and included minutes.
      </p>

      <button
        onClick={go}
        disabled={loading || billingBlocked}
        className="btn-primary mt-7 w-full justify-center disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Starting…
          </>
        ) : authed ? (
          <>
            Get {toolsPlan.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        ) : (
          <>
            Sign in to subscribe <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      {billingBlocked && (
        <p className="mt-3 text-center text-sm text-ink/55">
          Checkout is opening soon — Tools Pro billing is being finalized. Sign-in works now;
          you&apos;ll be able to subscribe here shortly.
        </p>
      )}
      {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
      <p className="mt-3 text-center text-xs text-ink/40">
        Cancel anytime. Secure checkout by Stripe.
      </p>
    </div>
  );
}
