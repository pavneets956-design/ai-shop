"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { CreditCard, Loader2, LogOut } from "lucide-react";

/** Manage-billing (Stripe portal) + sign-out actions for the account page. */
export default function AccountActions({ canManage }: { canManage: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manage = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else {
        setError(data.error || "Couldn't open billing.");
        setLoading(false);
      }
    } catch {
      setError("Couldn't open billing.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {canManage && (
        <button onClick={manage} disabled={loading} className="btn-secondary disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
          Manage billing
        </button>
      )}
      <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-ghost">
        <LogOut className="h-4 w-4" /> Sign out
      </button>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
