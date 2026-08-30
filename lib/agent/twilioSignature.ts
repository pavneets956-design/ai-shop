/**
 * Twilio webhook signature validation.
 *
 * The voice webhooks under `/api/agent/call/webhook*` are the one part of the
 * agent subsystem that CANNOT require a session — Twilio's servers call them,
 * and Twilio has no login. So they are gated on Twilio's HMAC signature
 * instead: `X-Twilio-Signature` over the exact request URL plus the sorted
 * POST parameters, keyed by `TWILIO_AUTH_TOKEN`.
 *
 * Before this existed, anyone could POST to the webhook and get TwiML back.
 * That alone was harmless (it says "Test"), but an unvalidated webhook is the
 * standard way an attacker steers a voice bot, so it is closed here.
 *
 * Fail-closed in every ambiguous case: no auth token configured, no signature
 * header, unreadable body → NOT verified.
 *
 * URL RECONSTRUCTION MATTERS. The signature covers the URL Twilio dialled, not
 * the internal URL the platform hands the handler. Order of preference:
 *   1. `TWILIO_WEBHOOK_URL` (+ the sub-path) — the value actually registered
 *   2. `NEXT_PUBLIC_APP_URL` + pathname
 *   3. the request URL as received (local dev)
 */
import twilio from "twilio";

export interface TwilioVerification {
  ok: boolean;
  /** Machine-readable reason when `ok` is false. */
  reason?:
    | "not_configured"
    | "missing_signature"
    | "unreadable_body"
    | "bad_signature";
  /** Parsed form parameters — only trustworthy when `ok` is true. */
  params: Record<string, string>;
}

/** The public URL Twilio would have signed for this request. */
export function twilioCallbackUrl(pathname: string): string {
  const registered = process.env.TWILIO_WEBHOOK_URL;
  if (registered) {
    const base = registered.replace(/\/+$/, "");
    // The registered value is the voice webhook itself; status callbacks hang
    // off it as `${base}/status`.
    if (pathname.endsWith("/status")) return `${base}/status`;
    return base;
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) return `${appUrl.replace(/\/+$/, "")}${pathname}`;
  return "";
}

/**
 * Verify a Twilio webhook request. Consumes the request body, so call it once
 * and use the returned `params`.
 */
export async function verifyTwilioRequest(req: Request): Promise<TwilioVerification> {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) return { ok: false, reason: "not_configured", params: {} };

  const signature = req.headers.get("x-twilio-signature");
  if (!signature) return { ok: false, reason: "missing_signature", params: {} };

  let params: Record<string, string> = {};
  try {
    const raw = await req.text();
    const search = new URLSearchParams(raw);
    search.forEach((value, key) => {
      params[key] = value;
    });
  } catch {
    return { ok: false, reason: "unreadable_body", params: {} };
  }

  const pathname = (() => {
    try {
      return new URL(req.url).pathname;
    } catch {
      return "";
    }
  })();

  const url = twilioCallbackUrl(pathname) || req.url;

  let valid = false;
  try {
    valid = twilio.validateRequest(authToken, signature, url, params);
  } catch (err) {
    console.error("[twilio-signature] validation threw:", (err as Error)?.message);
    valid = false;
  }

  return valid ? { ok: true, params } : { ok: false, reason: "bad_signature", params: {} };
}
