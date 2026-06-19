"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Homepage "Talk to our AI" invite.
 *
 * Auto-appears over the homepage a moment after load so the talking AI call is
 * front-and-center — but it is deliberately a *tap-to-start* invite, NOT the old
 * auto-launching voice overlay (that one auto-blasted audio on load and was slow
 * + blocking). No audio plays here. Tapping "Start the call" routes into the
 * real, verified call at /start (the <ConsultationCall /> experience).
 *
 * Skip / ✕ / Esc / backdrop all dismiss it, and we remember the dismissal for
 * the session so it never nags the same visitor twice.
 */

const SEEN_KEY = "hb_call_invite_seen";
const SHOW_DELAY_MS = 1400;

export default function CallInvite() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const startRef = useRef<HTMLButtonElement | null>(null);

  // Auto-appear once per session, after a short delay.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage blocked — just show once */
    }
    if (seen) return;
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Move focus to the primary action + wire Esc-to-close while open.
  useEffect(() => {
    if (!open) return;
    startRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const remember = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* no-op */
    }
  };

  const dismiss = () => {
    remember();
    setOpen(false);
  };

  const startCall = () => {
    remember();
    setOpen(false);
    router.push("/start");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-invite-title"
    >
      {/* soft backdrop — click to dismiss */}
      <button
        type="button"
        aria-label="Close"
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-ink/35 backdrop-blur-[2px] animate-fade-in"
      />

      {/* card */}
      <div className="relative m-3 w-full max-w-sm rounded-2xl border border-ink/10 bg-paper-card p-6 text-center shadow-card animate-slide-up sm:m-0">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* pulsing call icon */}
        <span className="relative mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-clay text-paper-card">
          <span className="absolute inset-0 animate-pulse-glow rounded-full bg-clay/40" aria-hidden="true" />
          <svg className="relative" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>

        <h2 id="call-invite-title" className="font-display text-xl font-semibold text-ink">
          Talk to our AI now
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Tell it what&apos;s wasting your time and it maps out a custom AI plan for your
          business — in about a minute. No forms first.
        </p>

        <button
          ref={startRef}
          type="button"
          onClick={startCall}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-clay px-5 py-3 font-semibold text-paper-card shadow-glow transition hover:bg-clay-dark"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          Start the call
        </button>

        <button
          type="button"
          onClick={dismiss}
          className="mt-3 text-sm font-medium text-ink-soft underline-offset-4 transition hover:text-ink hover:underline"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
