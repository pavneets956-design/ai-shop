import { test as base } from "@playwright/test";

export * from "@playwright/test";

// Page-level mocks take precedence over this context guard. Production checks
// can exercise recovery states without sending leads, AI requests or analytics.
export const test = base.extend<{ safeProductionNetwork: void }>({
  safeProductionNetwork: [async ({ context }, use) => {
    if (process.env.E2E_PRODUCTION_CHECK === "1") {
      if (process.env.E2E_LIVE_DEMO === "1") throw new Error("Paid live demo tests are forbidden in production verification");
      await context.route("**/*", async (route) => {
        const request = route.request();
        const path = new URL(request.url()).pathname;
        if (path.startsWith("/_vercel/insights/") || path.startsWith("/_vercel/speed-insights/")) {
          await route.fulfill({ status: 204 });
        } else if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
          await route.abort("blockedbyclient");
        } else {
          await route.continue();
        }
      });
    }
    await use();
  }, { auto: true }],
});
