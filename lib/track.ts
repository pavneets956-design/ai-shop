// Privacy-safe analytics wrapper around Vercel Analytics (cookieless, no consent
// banner needed). Non-blocking + failure-safe: the calculators, lead flow, demo
// and page rendering MUST keep working when analytics is blocked, unsupported,
// or on a plan where custom events are dropped.
//
// NEVER send names, emails, phone numbers, addresses, exact financial inputs,
// prompt text, or any free text a visitor typed — only slugs, ids, counts and
// coarse bands. `assertSafeProps` enforces the shape in development and in the
// unit tests; it is a no-op cost in production.
import { track as vercelTrack } from "@vercel/analytics";
import { getAttribution } from "@/lib/attribution";

/** Free-tool events (pre-existing). */
export type ToolEvent =
  | "tool_calculated"
  | "tool_cta_clicked"
  | "tool_shared"
  | "lead_from_tool";

/** Conversion-path events. One name per meaningful visitor action. */
export type SiteEvent =
  | "hero_demo_click"
  | "hero_contact_click"
  | "demo_started"
  | "demo_prompt_used"
  | "demo_completed"
  | "pricing_cta_click"
  | "form_started"
  | "form_step_completed"
  | "form_validation_error"
  | "form_submitted"
  | "email_click"
  | "calendar_click"
  | "phone_click";

export type TrackedEvent = ToolEvent | SiteEvent;

type SafeProps = Record<string, string | number | boolean | null>;

/**
 * Prop keys that would carry personal or free-text data. A key matching any of
 * these is dropped, loudly in development. Add to this list, never remove.
 */
const BANNED_KEY = /(name|email|phone|address|message|prompt|text|query|note|content|body|input|value)/i;

/** Values are capped so a stray string can never become a payload. */
const MAX_VALUE = 64;

function sanitize(props: SafeProps | undefined, event: string): SafeProps | undefined {
  if (!props) return undefined;
  const out: SafeProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (BANNED_KEY.test(k)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[track] dropped unsafe prop "${k}" on "${event}" — see lib/track.ts`);
      }
      continue;
    }
    out[k] = typeof v === "string" ? v.slice(0, MAX_VALUE) : v;
  }
  return out;
}

/** Exported for the unit test — the guarantee is worth asserting, not assuming. */
export function safeProps(props: SafeProps | undefined, event = "test"): SafeProps | undefined {
  return sanitize(props, event);
}

function send(event: TrackedEvent, props?: SafeProps, withAttribution = false): void {
  try {
    const base = sanitize(props, event) ?? {};
    if (typeof window !== "undefined") {
      base.page = window.location.pathname.slice(0, MAX_VALUE);
    }
    if (withAttribution) {
      const a = getAttribution();
      if (a.utm_source) base.utm_source = a.utm_source;
      if (a.utm_medium) base.utm_medium = a.utm_medium;
      if (a.utm_campaign) base.utm_campaign = a.utm_campaign;
      if (a.referrer_host) base.referrer_host = a.referrer_host;
      if (a.device) base.device = a.device;
    }
    vercelTrack(event, base);
  } catch {
    // Analytics must never break the page.
  }
}

/** Free-tool events. Kept as its own name so existing call sites don't move. */
export function trackTool(event: ToolEvent, props?: SafeProps): void {
  send(event, props);
}

/**
 * Conversion-path events. Attribution (utm/referrer/device) rides along so a
 * lead can be traced to the campaign that produced it without a cookie.
 */
export function trackEvent(event: SiteEvent, props?: SafeProps): void {
  send(event, props, true);
}
