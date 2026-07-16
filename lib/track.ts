// Privacy-safe analytics wrapper around Vercel Analytics (cookieless, no consent
// banner needed). Non-blocking + failure-safe: the calculators, lead flow, and
// page rendering MUST keep working when analytics is blocked, unsupported, or on
// a plan where custom events are dropped (Vercel Hobby). NEVER send names, emails,
// phone numbers, addresses, exact financial inputs, or any free-text — only the
// tool slug and coarse, non-sensitive metadata (e.g. a result band).
import { track as vercelTrack } from "@vercel/analytics";

export type ToolEvent =
  | "tool_calculated"
  | "tool_cta_clicked"
  | "tool_shared"
  | "lead_from_tool";

type SafeProps = Record<string, string | number | boolean | null>;

export function trackTool(event: ToolEvent, props?: SafeProps): void {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break the tool.
  }
}
