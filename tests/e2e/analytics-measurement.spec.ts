import { test, expect, type Page } from "./safe-test";
import AxeBuilder from "@axe-core/playwright";

async function captureAnalytics(page: Page) {
  // Prevent all provider traffic. Observe calls to the SDK queue locally.
  await page.route("**/*vercel*/*", (route) => route.fulfill({ status: 204 }));
  await page.addInitScript(() => {
    const state = window as unknown as { captured: string[]; va: (action: string, payload: { name?: string }) => void };
    state.captured = [];
    state.va = (action, payload) => { if (action === "event" && payload?.name) state.captured.push(payload.name); };
  });
}

async function sendMockRequest(page: Page, response: object, status = 200) {
  await page.route("**/api/build-request", (route) => route.fulfill({ status, contentType: "application/json", body: JSON.stringify(response) }));
  await page.goto("/create");
  await page.locator("#br-name").fill("Analytics Test");
  await page.locator("#br-contact").fill("analytics-test@example.com");
  await page.locator("#br-business").fill("Test fixture");
  await page.locator("#br-goal").fill("Test an enquiry workflow using a mocked API response.");
  await page.getByRole("button", { name: /^Send my request/i }).click();
}

const events = (page: Page) => page.evaluate(() => (window as unknown as { captured: string[] }).captured);

test("new delivered requests emit one receipt event; duplicate and failed requests do not", async ({ page }) => {
  await captureAnalytics(page);
  for (const example of [
    { body: { ok: true, delivery: { persisted: true, emailed: false }, deduped: false }, status: 200, received: true },
    { body: { ok: true, delivery: { persisted: false, emailed: true }, deduped: false }, status: 200, received: true },
    { body: { ok: true, delivery: { persisted: true }, deduped: true }, status: 200, received: false },
    { body: { ok: true, delivery: { persisted: false, emailed: false } }, status: 200, received: false },
    { body: { ok: true }, status: 200, received: false },
    { body: { ok: false, error: "Request failed" }, status: 500, received: false },
  ]) {
    await sendMockRequest(page, example.body, example.status);
    await expect.poll(async () => (await events(page)).includes("form_submitted")).toBe(true);
    expect((await events(page)).filter((name) => name === "lead_received")).toHaveLength(example.received ? 1 : 0);
    if (example.received) await expect(page.getByRole("heading", { name: "Request received.", exact: true })).toBeVisible();
    else if (!("deduped" in example.body && example.body.deduped)) await expect(page.getByRole("heading", { name: "Request received.", exact: true })).toHaveCount(0);
    if (example.status === 200 && !("delivery" in example.body)) {
      await expect(page.getByText(/couldn't confirm whether your request arrived/)).toBeVisible();
      await expect(page.locator("#br-goal")).toHaveValue("Test an enquiry workflow using a mocked API response.");
    }
  }
});

test("owner preference survives navigation and reload while requests still work", async ({ page }) => {
  await captureAnalytics(page);
  await page.goto("/analytics-preferences");
  await page.getByRole("button", { name: "Exclude this browser", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Saved.");
  await page.reload();
  await expect(page.getByRole("status")).toContainText("excluded");
  expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `test-results/analytics-preferences-${test.info().project.name}.png`, fullPage: false });
  await sendMockRequest(page, { ok: true, delivery: { persisted: true }, deduped: false });
  await expect(page.getByRole("heading", { name: "Request received.", exact: true })).toBeVisible();
  expect(await events(page)).toEqual([]);
  await page.goto("/analytics-preferences");
  await page.getByRole("button", { name: "Include this browser", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("included");
});

test("blocked storage gives a visible recovery message", async ({ page }) => {
  await captureAnalytics(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } });
  });
  await page.goto("/analytics-preferences");
  await expect(page.getByRole("alert").filter({ hasText: "storage is unavailable" })).toBeVisible();
  await page.getByRole("button", { name: "Exclude this browser", exact: true }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Could not save" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home", exact: true })).toBeVisible();
});
