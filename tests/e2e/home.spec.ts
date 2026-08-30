import { test, expect, type Page } from "@playwright/test";
import { navLinks } from "../../lib/data/site";

/**
 * Homepage + primary navigation.
 *
 * The gap this closes (08-tests-prod-risk.md §1.2): the site's primary
 * conversion links had no test at all. A `/create` CTA that 404s, or an
 * `href="#"` that goes nowhere, would have shipped unnoticed — and did, twice
 * (the dead social links, the `/#how-it-works` anchor in the global header).
 */

/** Every same-origin link on the page, de-duplicated, hash/query stripped. */
async function internalHrefs(page: Page, scope = "body"): Promise<string[]> {
  const hrefs = await page.locator(`${scope} a[href]`).evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).getAttribute("href") || ""),
  );
  const paths = hrefs
    .filter((h) => h.startsWith("/"))
    .map((h) => h.split("#")[0])
    .filter((h) => h.length > 0);
  return [...new Set(paths)];
}

test.describe("homepage", () => {
  test("renders exactly one <h1>", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).not.toBeEmpty();
  });

  test("has a title, description and canonical", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/\S/);
    const description = await page.locator('head meta[name="description"]').getAttribute("content");
    expect(description?.trim().length ?? 0).toBeGreaterThan(30);
    const canonical = await page.locator('head link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();
  });

  test("contains no dead links (href=\"#\" or empty)", async ({ page }) => {
    await page.goto("/");
    const dead = await page.locator('a[href="#"], a[href=""]').count();
    expect(dead, 'a link to "#" costs more trust than a missing link').toBe(0);
  });

  test("every internal link on the homepage resolves without a 404", async ({ page, request }) => {
    await page.goto("/");
    const paths = await internalHrefs(page);
    expect(paths.length).toBeGreaterThan(5);

    const broken: string[] = [];
    for (const path of paths) {
      const res = await request.get(path, { maxRedirects: 5 });
      if (res.status() >= 400) broken.push(`${path} -> ${res.status()}`);
    }
    expect(broken, "homepage links that do not resolve").toEqual([]);
  });

  test("the primary CTA leads to /create and the form is there", async ({ page }) => {
    await page.goto("/");
    // `.first()` alone picks the header CTA, which lives inside the collapsed
    // mobile sheet and is correctly hidden at phone widths. Take the first
    // VISIBLE one so this asserts what a real visitor can actually click.
    const cta = page.locator('a[href^="/create"]:visible').first();
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL(/\/create/);
    await expect(page.locator("form")).toBeVisible();
  });
});

test.describe("primary navigation", () => {
  test("every nav destination in site.ts renders a page with an <h1>", async ({ page }) => {
    for (const link of navLinks) {
      const res = await page.goto(link.href);
      expect(res?.status(), `${link.label} -> ${link.href}`).toBeLessThan(400);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });

  test("the header exposes every nav link (desktop)", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "mobile collapses the nav into a menu");
    await page.goto("/");
    for (const link of navLinks) {
      await expect(
        page.locator("header").locator(`a[href="${link.href}"]`).first(),
        `header is missing ${link.label}`,
      ).toBeVisible();
    }
  });
});

test.describe("404", () => {
  test("an unknown route answers 404 with a real page and a way home", async ({ page }) => {
    const res = await page.goto(`/this-route-does-not-exist-${Date.now()}`);
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('a[href="/"]').first()).toBeVisible();
    const robots = await page.locator('head meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });
});
