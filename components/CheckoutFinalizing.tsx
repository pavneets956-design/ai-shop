"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * Shown right after a successful Stripe Checkout when the subscription record
 * hasn't landed yet (the webhook can arrive a beat after the redirect). Reloads
 * the page a few times so "active" appears without the user refreshing — and
 * gives up gracefully instead of looping forever if the webhook never comes.
 */
const MAX_TRIES = 5;
const KEY = "toolspro_finalize_tries";

export default function CheckoutFinalizing() {
  const [gaveUp, setGaveUp] = useState(false);

  useEffect(() => {
    const tries = Number(sessionStorage.getItem(KEY) || "0");
    if (tries >= MAX_TRIES) {
      setGaveUp(true);
      sessionStorage.removeItem(KEY);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem(KEY, String(tries + 1));
      window.location.reload();
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  if (gaveUp) {
    return (
      <div className="mb-6 rounded-xl border border-amber/30 bg-amber/[0.08] px-4 py-3 text-sm text-ink/75">
        Payment received — your subscription is taking a moment to activate. Refresh in a minute, or
        contact us if it doesn&apos;t show.
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-clay/20 bg-clay/[0.06] px-4 py-3 text-sm text-ink/75">
      <Loader2 className="h-4 w-4 flex-none animate-spin text-clay-dark" aria-hidden="true" />
      <span>
        <span className="font-semibold text-ink">Payment received.</span> Finalizing your Tools Pro
        subscription…
      </span>
    </div>
  );
}
