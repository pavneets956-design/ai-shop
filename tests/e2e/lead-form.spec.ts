import { test, expect, type Page, type Route } from "@playwright/test";

/**
 * /create — the build-request form.
 *
 * `POST /api/build-request` has 18 unit tests; the FORM in front of it had
 * none. This pins the three things a lead form must never get wrong:
 *   1. step gating — you cannot advance past step 1 with an empty goal
 *   2. required contact fields — no submit without name + a valid email
 *   3. double-submit — one click, one POST, submit disabled while sending
 *   4. explicit success and explicit failure states (NO SILENT STATES)
 *
 * The POST is ALWAYS intercepted. This suite never creates a lead row and
 * never sends the owner an email.
 */

/** Intercept /api/build-request and count the POSTs that reached it. */
async function mockLeadApi(
  page: Page,
  opts: { status?: number; delayMs?: number } = {},
): Promise<{ count: () => number; bodies: () => unknown[] }> {
  let count = 0;
  const bodies: unknown[] = [];
  await page.route("**/api/build-request", async (route: Route) => {
    count++;
    try {
      bodies.push(route.request().postDataJSON());
    } catch {
      bodies.push(null);
    }
    if (opts.delayMs) await new Promise((r) => setTimeout(r, opts.delayMs));
    const status = opts.status ?? 200;
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(
        status === 200
          ? { ok: true, deduped: false, delivery: { persisted: true, emailed: false } }
          : { ok: false, error: "Could not record that request." },
      ),
    });
  });
  return { count: () => count, bodies: () => bodies };
}

async function fillGoalAndAdvance(page: Page) {
  const goal = page.locator("textarea").first();
  await goal.fill("Something that answers my phone and books jobs while I am on site");
  await page.getByRole("button", { name: /^Next/ }).click();
}

test.describe("/create build request form", () => {
  test("renders one h1 and the form", async ({ page }) => {
    await page.goto("/create");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("form")).toBeVisible();
  });

  test("cannot advance past step 1 with an empty goal", async ({ page }) => {
    await page.goto("/create");
    const next = page.getByRole("button", { name: /^Next/ });
    await expect(next).toBeDisabled();

    await page.locator("textarea").first().fill("Answer my phone");
    await expect(next).toBeEnabled();
  });

  test("requires a name and a valid email before it will submit", async ({ page }) => {
    const api = await mockLeadApi(page);
    await page.goto("/create");

    await fillGoalAndAdvance(page);
    await page.getByRole("button", { name: /^Next/ }).click(); // step 2 -> step 3

    const submit = page.getByRole("button", { name: /Send my build request/i });
    await expect(submit).toBeVisible();

    // Empty required fields: native validation blocks the POST, and the user's
    // typed data is never wiped.
    await submit.click();
    expect(api.count(), "submitted with empty required fields").toBe(0);

    // An invalid email is also refused.
    await page.getByPlaceholder("Your name").fill("QA Tester");
    await page.getByPlaceholder("you@business.com").fill("not-an-email");
    await submit.click();
    expect(api.count(), "submitted with an invalid email").toBe(0);
  });

  test("submits once, shows a sending state, and confirms explicitly", async ({ page }) => {
    const api = await mockLeadApi(page, { delayMs: 900 });
    await page.goto("/create");

    await fillGoalAndAdvance(page);
    await page.getByRole("button", { name: /^Next/ }).click();

    await page.getByPlaceholder("Your name").fill("QA Tester");
    await page.getByPlaceholder("you@business.com").fill("qa@example.com");

    const submit = page.getByRole("button", { name: /Send my build request/i });
    await submit.click();

    // Loading state, and the button is disabled so a second click cannot fire.
    await expect(page.getByRole("button", { name: /Sending/i })).toBeDisabled();

    // Success is stated, not implied by a silent form reset.
    await expect(page.getByText(/Request received/i)).toBeVisible({ timeout: 15_000 });
    expect(api.count(), "exactly one POST per submit").toBe(1);
  });

  test("a double click still produces exactly one POST", async ({ page }) => {
    const api = await mockLeadApi(page, { delayMs: 1_200 });
    await page.goto("/create");

    await fillGoalAndAdvance(page);
    await page.getByRole("button", { name: /^Next/ }).click();
    await page.getByPlaceholder("Your name").fill("QA Tester");
    await page.getByPlaceholder("you@business.com").fill("qa@example.com");

    const submit = page.getByRole("button", { name: /Send my build request/i });
    await submit.click({ force: true });
    await submit.click({ force: true }).catch(() => {
      /* the button is gone or disabled — that is the pass condition */
    });

    await expect(page.getByText(/Request received/i)).toBeVisible({ timeout: 15_000 });
    expect(api.count()).toBe(1);
  });

  test("a server failure is shown to the user with a next step", async ({ page }) => {
    await mockLeadApi(page, { status: 502 });
    await page.goto("/create");

    await fillGoalAndAdvance(page);
    await page.getByRole("button", { name: /^Next/ }).click();
    await page.getByPlaceholder("Your name").fill("QA Tester");
    await page.getByPlaceholder("you@business.com").fill("qa@example.com");
    await page.getByRole("button", { name: /Send my build request/i }).click();

    // Never a blank screen or a fake success.
    await expect(page.getByText(/Something went wrong/i)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Request received/i)).toHaveCount(0);
  });
});
