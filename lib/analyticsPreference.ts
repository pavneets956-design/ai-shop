// Browser-local preference only. Never send this flag or an owner identity to analytics.
export const ANALYTICS_EXCLUDED_KEY = "hb_analytics_excluded_v1";

export function isAnalyticsExcludedPath(path: string): boolean {
  return ["/admin", "/agent", "/login", "/analytics-preferences"].some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function readAnalyticsExcluded(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ANALYTICS_EXCLUDED_KEY) === "1";
}

/** False on blocked storage: analytics may be dropped, but the site must work. */
export function analyticsAllowed(path?: string): boolean {
  if (typeof window === "undefined") return true;
  if (isAnalyticsExcludedPath(path ?? window.location.pathname)) return false;
  try {
    return !readAnalyticsExcluded();
  } catch {
    return false;
  }
}

/** Let the preference UI report storage failure rather than claim it saved. */
export function setAnalyticsExcluded(excluded: boolean): void {
  if (excluded) window.localStorage.setItem(ANALYTICS_EXCLUDED_KEY, "1");
  else window.localStorage.removeItem(ANALYTICS_EXCLUDED_KEY);
  if (readAnalyticsExcluded() !== excluded) throw new Error("Preference was not saved");
}

/** Shared by automatic page views and provider-level custom events. */
export function filterAnalyticsEvent<T extends { url: string }>(event: T): T | null {
  try {
    const path = new URL(event.url, window.location.origin).pathname;
    return analyticsAllowed(path) ? event : null;
  } catch {
    return null;
  }
}
