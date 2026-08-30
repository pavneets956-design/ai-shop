import type { FullConfig } from "@playwright/test";

/**
 * Fail fast, and fail legibly, when nothing is serving the base URL.
 *
 * Without this, running the suite against a server that isn't up produces a
 * wall of identical ECONNREFUSED stack traces with no hint about what to do —
 * a silent state in the test harness itself.
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL =
    config.projects[0]?.use?.baseURL ?? process.env.E2E_BASE_URL ?? "http://localhost:3200";

  const deadline = Date.now() + 15_000;
  let lastError = "";

  while (Date.now() < deadline) {
    try {
      const res = await fetch(baseURL, { redirect: "manual" });
      if (res.status < 500) return;
      lastError = `HTTP ${res.status}`;
    } catch (err) {
      lastError = (err as Error).message;
    }
    await new Promise((r) => setTimeout(r, 1_000));
  }

  throw new Error(
    [
      ``,
      `Nothing is serving ${baseURL} (last error: ${lastError}).`,
      ``,
      `The e2e suite runs against a build the integrator starts. In another terminal:`,
      ``,
      `    npm run build`,
      `    npx next start -p 3200`,
      ``,
      `Then re-run: npm run test:e2e`,
      `Or point somewhere else: E2E_BASE_URL=https://<preview>.vercel.app npm run test:e2e`,
      ``,
    ].join("\n"),
  );
}
