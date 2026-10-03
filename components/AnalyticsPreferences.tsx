"use client";

import { useEffect, useState } from "react";
import { readAnalyticsExcluded, setAnalyticsExcluded } from "@/lib/analyticsPreference";

export default function AnalyticsPreferences() {
  const [excluded, setExcluded] = useState<boolean | null>(null);
  const [message, setMessage] = useState("Checking this browser’s preference…");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const current = readAnalyticsExcluded();
      setExcluded(current);
      setMessage(current ? "Visits from this browser are excluded." : "Visits from this browser are included.");
    } catch {
      setError(true);
      setMessage("Browser storage is unavailable. Analytics is suppressed while storage cannot be read. You can retry saving below.");
    }
  }, []);

  function save(next: boolean) {
    try {
      setAnalyticsExcluded(next);
      setExcluded(next);
      setError(false);
      setMessage(next ? "Saved. Future visits and events from this browser are excluded." : "Saved. Future visits and events from this browser are included.");
    } catch {
      setError(true);
      setMessage("Could not save this preference. Allow site storage in your browser and try again.");
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-ink/15 bg-white/60 p-6">
      <p role={error ? "alert" : "status"} aria-live="polite">{message}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn-primary" onClick={() => save(true)} disabled={excluded === true && !error}>
          Exclude this browser
        </button>
        <button type="button" className="btn-ghost" onClick={() => save(false)} disabled={excluded === false && !error}>
          Include this browser
        </button>
      </div>
    </div>
  );
}
