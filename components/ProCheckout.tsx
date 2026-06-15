"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toolsPlan } from "@/lib/data/toolsPlan";

/**
 * Tools Pro plan card with monthly/annual toggle. Handles the full path:
 * not signed in → Google sign-in; signed in → Stripe Checkout. Reused by the
 * /tools/pro page and the per-tool paywall.
 */
export default function ProCheckout({ callbackUrl }: { callbackUrl?: string }) {
  const { status } = useSession();
  const [interval, setInterval] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = toolsPlan.intervals.find((i) => i.id === interval)!;
  const authed = status === "authenticated";

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

  return (
    <div className="glass-card spec-frame p-7 sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">{toolsPlan.name}</h3>
          <p className="mt-1 text-sm text-ink/55">{toolsPlan.tagline}</p>
        </div>
      </div>

      {/* Interval toggle */}
      <div className="mt-5 inline-flex rounded-lg border border-ink/10 bg-paper-2/60 p-1">
        {toolsPlan.intervals.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => setInterval(i.id)}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
              interval === i.id ? "bg-white text-ink shadow-sm" : "text-ink/55 hover:text-ink"
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="font-display text-4xl font-bold text-ink">{plan.priceLabel}</span>
        <span className="pb-1 text-sm text-ink/50">{plan.sublabel}</span>
      </div>

      <ul className="mt-6 space-y-3">
        {toolsPlan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px] text-ink/80">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-clay/[0.12] text-clay-dark">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={go}
        disabled={loading}
        className="btn-primary mt-7 w-full justify-center disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Starting…
          </>
        ) : authed ? (
          <>
            Get {toolsPlan.name} <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Sign in to subscribe <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
      <p className="mt-3 text-center text-xs text-ink/40">
        Cancel anytime. Secure checkout by Stripe.
      </p>
    </div>
  );
}
