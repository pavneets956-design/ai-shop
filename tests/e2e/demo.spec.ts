import { test, expect, type Page } from "./safe-test";

/**
 * /demo — the AI Worker Showroom.
 *
 * The site's strongest proof asset and, until now, completely untested. What
 * this pins:
 *   - a loading state appears while the answer is in flight (NO SILENT STATES)
 *   - the answer actually renders in the phone transcript
 *   - the scripted-sample banner appears when the server degrades (`fallback`),
 *     which is the honesty contract the R1 review forced
 *
 * `/api/demo` is intercepted by default so the suite spends no OpenAI tokens
 * and is deterministic. Set E2E_LIVE_DEMO=1 to hit the real endpoint instead.
 */

const LIVE = process.env.E2E_LIVE_DEMO === "1";

function demoPayload(assistantMessage: string) {
  return {
    assistantMessage,
    capturedFields: {
      name: "Jordan", phone: "604-555-0134", email: null, service: "Lawn install",
      location: "Surrey", urgency: "This week", budget: null, preferredTime: "Friday AM",
      missingInfo: ["email"],
    },
    leadSummary: "Lawn install in Surrey, wants a quote this week.",
    nextActions: ["Text the customer a booking link", "Add the job to Friday"],
    systemEvents: ["SMS confirmation queued (simulated)", "Calendar hold created (simulated)"],
    suggestedReplies: ["What does it cost?", "Can you come Friday?"],
    cta: { show: true, label: "Build mine", href: "/create" },
  };
}

async function mockDemo(page: Page, opts: { fallback?: boolean; delayMs?: number } = {}) {
  await page.route("**/api/demo", async (route) => {
    if (opts.delayMs) await new Promise((r) => setTimeout(r, opts.delayMs));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        response: demoPayload("Happy to help — I can get you booked in for Friday morning."),
        ...(opts.fallback ? { fallback: true } : {}),
      }),
    });
  });
}

test.describe("/demo showroom", () => {
  test("renders the control room, the phone and one h1", async ({ page }) => {
    await page.goto("/demo");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByText("Pick an AI worker")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
  });

  test("a quick prompt shows a loading state, then renders a real answer", async ({ page }) => {
    if (!LIVE) await mockDemo(page, { delayMs: 600 });
    await page.goto("/demo");

    const sendButton = page.getByRole("button", { name: "Send" });
    const transcriptBefore = await page.locator("main").innerText();

    // The quick prompts sit under "Quick test prompts" in the control room.
    const prompt = page.locator("button", { hasText: /\?$/ }).first();
    await prompt.click();

    // Loading: the composer's send button is disabled while `busy` is true and
    // the prompt buttons disable with it. That IS the loading state.
    await expect(sendButton).toBeDisabled({ timeout: 3_000 });

    // Answer: something new lands in the transcript.
    await expect
      .poll(async () => (await page.locator("main").innerText()).length, {
        timeout: LIVE ? 30_000 : 15_000,
        message: "no assistant turn ever rendered",
      })
      .toBeGreaterThan(transcriptBefore.length);

    // And the panel fills in — a captured lead, not just a chat bubble.
    await expect(page.getByText(/Jordan|Lead|captur/i).first()).toBeVisible({ timeout: 15_000 });
  });

  test("announces a scripted fallback instead of passing it off as the model", async ({ page }) => {
    test.skip(LIVE, "fallback is a mocked server condition");
    await mockDemo(page, { fallback: true });
    await page.goto("/demo");

    await page.locator("button", { hasText: /\?$/ }).first().click();

    await expect(page.locator('[role="status"]').filter({ hasText: /scripted sample/i })).toBeVisible({
      timeout: 15_000,
    });
  });

  test("a failing /api/demo still answers the visitor (degrades, never blanks)", async ({ page }) => {
    test.skip(LIVE, "deliberate server failure");
    await page.route("**/api/demo", (route) => route.fulfill({ status: 500, body: "boom" }));
    await page.goto("/demo");

    await page.locator("button", { hasText: /\?$/ }).first().click();

    // Client-side script fallback + the honest banner.
    await expect(page.locator('[role="status"]').filter({ hasText: /scripted sample/i })).toBeVisible({
      timeout: 15_000,
    });
  });
});
