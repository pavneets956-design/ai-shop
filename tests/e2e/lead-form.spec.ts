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

/**
 * Fill every required field on step 1. There is no "Next" gate: the whole point
 * of the rebuild is that a visitor can submit after four fields, and the second
 * step is optional. Written against the form as it actually renders — the
 * earlier version of this file assumed a "Next" button and a disabled submit,
 * neither of which exists (nor should: disabling submit on invalid input hides
 * the reason from the person who needs it).
 */
async function fillStepOne(page: Page) {
  await page.locator("#br-name").fill("Pat Reynolds");
  await page.locator("#br-contact").fill("pat@example.com");
  await page.locator("#br-business").fill("Reynolds Plumbing");
  await page
    .locator("#br-goal")
    .fill("Something that answers my phone and books jobs while I am on site");
}

const submit = (page: Page) => page.getByRole("button", { name: /^Send my request/i });

test.describe("/create build request form", () => {
  test("renders one h1 and the form", async ({ page }) => {
    await page.goto("/create");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("form")).toBeVisible();
  });

  test("asks for contact details before anything else", async ({ page }) => {
    await page.goto("/create");
    // Four required fields, each with a real programmatic label — the previous
    // form asked up to 14 questions before it asked who was filling it in.
    for (const id of ["#br-name", "#br-contact", "#br-business", "#br-goal"]) {
      const field = page.locator(id);
      await expect(field).toBeVisible();
      const labelText = await page.locator(`label[for="${id.slice(1)}"]`).textContent();
      expect(labelText, `${id} has a visible label`).toBeTruthy();
    }
    // The optional second step must be reachable but never required.
    await expect(page.getByRole("button", { name: /Add detail first/i })).toBeVisible();
  });

  test("refuses an incomplete submission and says why, without wiping input", async ({ page }) => {
    const api = await mockLeadApi(page);
    await page.goto("/create");
    await page.locator("#br-name").fill("Pat Reynolds");
    await page.locator("#br-contact").fill("not-an-email-or-phone");

    // Submit stays ENABLED — an insensitive button tells the visitor nothing.
    await expect(submit(page)).toBeEnabled();
    await submit(page).click();

    // No request left the browser, an error is announced, and the typed data
    // is still there.
    expect(api.count(), "an invalid form must not POST").toBe(0);
    await expect(page.locator('[aria-invalid="true"]').first()).toBeVisible();
    await expect(page.locator("#br-name")).toHaveValue("Pat Reynolds");
    await expect(page.locator("#br-contact")).toHaveValue("not-an-email-or-phone");
  });

  test("submits once, shows a sending state, and confirms explicitly", async ({ page }) => {
    const api = await mockLeadApi(page, { delayMs: 400 });
    await page.goto("/create");
    await fillStepOne(page);
    await submit(page).click();

    // Sending state exists and blocks a second submit (NO SILENT STATES).
    // The button's LABEL changes to "Sending…" while in flight, so asserting
    // that the "Send my request" button is disabled would look for an element
    // that no longer exists. Assert the sending affordance itself.
    const sending = page.getByRole("button", { name: /Sending/i });
    await expect(sending).toBeVisible();
    await expect(sending).toBeDisabled();
    // Explicit confirmation, not a silent form reset.
    await expect(page.getByText(/thanks|got it|received|reply/i).first()).toBeVisible({
      timeout: 15000,
    });
    expect(api.count(), "exactly one POST").toBe(1);
  });

  test("a double click still produces exactly one POST", async ({ page }) => {
    const api = await mockLeadApi(page, { delayMs: 600 });
    await page.goto("/create");
    await fillStepOne(page);
    const btn = submit(page);
    await btn.click();
    await btn.click({ force: true, timeout: 2000 }).catch(() => {
      /* already disabled — that is the pass condition */
    });
    await page.waitForTimeout(1200);
    expect(api.count(), "double click must not double-submit").toBe(1);
  });

  test("a server failure is shown to the user with a next step", async ({ page }) => {
    await mockLeadApi(page, { status: 500 });
    await page.goto("/create");
    await fillStepOne(page);
    await submit(page).click();

    // A failure must never render as success, and must offer a way through —
    // the email address is the fallback path.
    await expect(page.getByText(/didn.t go through|couldn.t|problem|try again/i).first()).toBeVisible(
      { timeout: 15000 },
    );
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  });

  test("the honeypot field is present and hidden from real users", async ({ page }) => {
    await page.goto("/create");
    const pot = page.locator("#company_website");
    await expect(pot).toHaveCount(1);
    await expect(pot).not.toBeVisible();
  });
});
