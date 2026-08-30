import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright e2e configuration.
 *
 * THE SERVER IS NOT STARTED HERE — ON PURPOSE.
 * The build + `next start` are the integrator's gate (port 3200), and a second
 * process racing for that port produces confusing failures. Start it yourself:
 *
 *     npm run build                 # prisma migrate deploy && next build
 *     npx next start -p 3200        # leave running in another terminal
 *     npm run test:e2e              # this suite
 *
 * `tests/e2e/global-setup.ts` pings the base URL first and fails with a clear
 * message if nothing is listening, rather than 30 identical ECONNREFUSED errors.
 *
 * Point it somewhere else with E2E_BASE_URL (e.g. a Vercel preview URL). It
 * never POSTs anything real: `/api/build-request`, `/api/demo` and friends are
 * intercepted with `page.route()` in the specs, so the suite spends no OpenAI
 * tokens, sends no email, and writes no database rows.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  globalSetup: "./tests/e2e/global-setup.ts",
  reporter: process.env.CI
    ? [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]]
    : [["list"]],
  outputDir: "test-results",
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3200",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"] },
    },
  ],
});
