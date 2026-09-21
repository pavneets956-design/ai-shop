import { test, expect } from "@playwright/test";

test("form filler loads its browser-only engine and supports manual entry", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/tools/form-filler");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["content-security-policy"]).toContain("connect-src 'self'");
  await page.getByRole("button", { name: "Enter details manually", exact: true }).click();
  await expect(page.getByText("Applicant (the parent applying)", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Fill my forms", exact: true })).toBeDisabled();
  expect(errors).toEqual([]);
});
