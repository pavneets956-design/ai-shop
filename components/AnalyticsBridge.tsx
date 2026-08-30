"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { trackEvent, type SiteEvent } from "@/lib/track";

/**
 * The one client island that makes the analytics contract real.
 *
 * Before this existed, `lib/track.ts` declared 13 conversion events and only
 * four ever fired — all four inside the lead form. The hero CTAs, the demo, the
 * pricing buttons and every email link were unmeasured, and `captureAttribution()`
 * had no call site at all, so a visitor arriving on `/?utm_source=…` lost the
 * campaign entirely: the form called `getAttribution()` at submit time, which
 * captured `landing_path: "/create"` — the page they finished on, not the one
 * they arrived on.
 *
 * Two jobs, both cheap:
 *
 * 1. Capture first-touch attribution on first load, before anything else can
 *    navigate. It only writes once per session, so the campaign that brought
 *    someone in survives their whole journey.
 *
 * 2. ONE delegated click listener for the whole document. Any element can opt
 *    in with `data-track="event_name"` — including server components, which is
 *    the point: a `<Link data-track="hero_demo_click">` stays a server component
 *    instead of every CTA becoming a client boundary. `mailto:` and `tel:` links
 *    are picked up automatically without needing the attribute.
 *
 * Failure-safe throughout: analytics must never be the reason a link stops
 * working, so everything is wrapped and the listener is passive.
 */

const KNOWN: ReadonlySet<string> = new Set<SiteEvent>([
  "hero_demo_click",
  "hero_contact_click",
  "demo_started",
  "demo_prompt_used",
  "demo_completed",
  "pricing_cta_click",
  "form_started",
  "form_step_completed",
  "form_validation_error",
  "form_submitted",
  "email_click",
  "calendar_click",
  "phone_click",
]);

export default function AnalyticsBridge() {
  useEffect(() => {
    try {
      captureAttribution();
    } catch {
      /* storage blocked — attribution is optional, the page is not */
    }

    const onClick = (e: MouseEvent) => {
      try {
        const target = e.target as Element | null;
        if (!target || typeof target.closest !== "function") return;

        const tagged = target.closest<HTMLElement>("[data-track]");
        if (tagged) {
          const name = tagged.dataset.track;
          // Only fire names the contract knows about — a typo should be a
          // no-op, not a junk row in the dashboard.
          if (name && KNOWN.has(name)) {
            trackEvent(name as SiteEvent, {
              cta_id: tagged.dataset.trackId ?? null,
            });
          }
          return;
        }

        const link = target.closest<HTMLAnchorElement>("a[href]");
        if (!link) return;
        const href = link.getAttribute("href") ?? "";
        if (href.startsWith("mailto:")) {
          // The address itself is never sent — only that a mail link was used.
          trackEvent("email_click", { cta_id: link.dataset.trackId ?? null });
        } else if (href.startsWith("tel:")) {
          trackEvent("phone_click", { cta_id: link.dataset.trackId ?? null });
        }
      } catch {
        /* never let a tracking failure interfere with the click itself */
      }
    };

    document.addEventListener("click", onClick, { passive: true, capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
