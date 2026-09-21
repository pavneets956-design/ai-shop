import { test, expect } from "./safe-test";
test("interactive examples switch, and the 3D study responds to a keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const control = page.getByRole("slider", { name: "Rotate the 3D example" });
  await control.focus();
  await control.press("ArrowRight");
  await expect(control).toHaveValue("33");
  await expect(page.locator(".studio-cube")).toHaveAttribute(
    "style",
    /rotateY\(33deg\)/,
  );
  const calls = page.getByRole("button", {
    name: "Call answering",
    exact: true,
  });
  await calls.click();
  await expect(calls).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText("Fence repair · South Surrey", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Quote follow-up", exact: true })
    .click();
  await expect(
    page.getByText("Quote question · scheduling", { exact: true }),
  ).toBeVisible();
});
test("the studio pages fit the viewport", async ({ page }) => {
  for (const path of [
    "/",
    "/about",
    "/pricing",
    "/create",
    "/web-design-development",
  ]) {
    await page.goto(path);
    expect(
      await page
        .locator("html")
        .evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      path,
    ).toBe(true);
  }
});
test("the mobile menu can be opened, dismissed and used", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "mobile");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Websites", exact: true })
    .click();
  await expect(page).toHaveURL(/web-design-development/);
});
