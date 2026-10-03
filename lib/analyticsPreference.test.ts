import { afterEach, describe, expect, it, vi } from "vitest";
import { ANALYTICS_EXCLUDED_KEY, analyticsAllowed, filterAnalyticsEvent, setAnalyticsExcluded } from "./analyticsPreference";

const { trackMock } = vi.hoisted(() => ({ trackMock: vi.fn() }));
vi.mock("@vercel/analytics", () => ({ track: trackMock }));
import { trackEvent, trackTool } from "./track";

function browser() {
  const values = new Map<string, string>();
  const localStorage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => { values.set(key, value); }),
    removeItem: vi.fn((key: string) => { values.delete(key); }),
  };
  const mock = { location: { pathname: "/", origin: "https://aibuiltbyhand.com" }, localStorage };
  vi.stubGlobal("window", mock);
  return mock;
}

afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks(); });

describe("owner/browser analytics exclusion", () => {
  it("blocks automatic views and both custom-event wrappers, then permits them after inclusion", () => {
    const mock = browser();
    const pageview = { type: "pageview", url: "https://aibuiltbyhand.com/create" };
    expect(filterAnalyticsEvent(pageview)).toBe(pageview);
    setAnalyticsExcluded(true);
    expect(mock.localStorage.getItem(ANALYTICS_EXCLUDED_KEY)).toBe("1");
    expect(filterAnalyticsEvent(pageview)).toBeNull();
    trackEvent("lead_received", { form: "build_request" });
    trackTool("tool_shared");
    expect(trackMock).not.toHaveBeenCalled();
    setAnalyticsExcluded(false);
    expect(filterAnalyticsEvent(pageview)).toBe(pageview);
    trackEvent("lead_received", { form: "build_request" });
    expect(trackMock).toHaveBeenCalledOnce();
  });

  it.each(["/admin/leads", "/agent", "/agent/contacts", "/login", "/analytics-preferences"])("excludes %s even without a browser preference", (path) => {
    const mock = browser();
    mock.location.pathname = path;
    expect(analyticsAllowed()).toBe(false);
    expect(filterAnalyticsEvent({ url: `https://aibuiltbyhand.com${path}?callbackUrl=/create` })).toBeNull();
    trackEvent("form_started");
    expect(trackMock).not.toHaveBeenCalled();
  });

  it("keeps similar public paths eligible", () => {
    browser();
    expect(analyticsAllowed("/resources/admin-automation")).toBe(true);
    expect(analyticsAllowed("/agentic-workflow")).toBe(true);
  });

  it("drops analytics safely when storage is blocked and surfaces preference-save failure", () => {
    const mock = browser();
    mock.localStorage.getItem.mockImplementation(() => { throw new Error("blocked"); });
    expect(analyticsAllowed()).toBe(false);
    expect(() => trackEvent("form_started")).not.toThrow();
    expect(trackMock).not.toHaveBeenCalled();
    expect(() => setAnalyticsExcluded(true)).toThrow();
  });
});
