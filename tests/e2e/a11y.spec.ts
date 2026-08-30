import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automated accessibility scan (axe-core).
 *
 * The audit found ZERO accessibility coverage of any kind — no landmark, label,
 * focus or contrast check anywhere. This asserts no SERIOUS or CRITICAL
 * violation on the six pages that carry the funnel.
 *
 * Scope note: axe catches roughly a third of real WCAG problems. A green run
 * here is a floor, not a certificate — keyboard traversal and screen-reader
 * order still need a human pass.
 */

const PAGES = ["/", "/demo", "/pricing", "/create", "/ai-receptionist", "/about"];

/** WCAG 2.1 A/AA, which is what the site should be held to. */
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const path of PAGES) {
  test(`${path} has no serious or critical accessibility violations`, async ({ page }) => {
    const res = await page.goto(path, { waitUntil: "networkidle" });
    expect(res?.status(), `${path} did not render`).toBeLessThan(400);

    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    // Print something a human can act on rather than a bare count.
    const report = blocking.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
    }));

    expect(report, `serious/critical a11y violations on ${path}`).toEqual([]);
  });
}

test.describe("structural a11y", () => {
  test("every page has a main landmark and a document language", async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", /\w/);
      expect(await page.locator("main").count(), `${path} has no <main>`).toBeGreaterThan(0);
    }
  });

  test("every image on the funnel pages has an alt attribute", async ({ page }) => {
    const missing: string[] = [];
    for (const path of PAGES) {
      await page.goto(path);
      const srcs = await page
        .locator("img:not([alt])")
        .evaluateAll((els) => els.map((e) => (e as HTMLImageElement).currentSrc || e.getAttribute("src") || "?"));
      missing.push(...srcs.map((s) => `${path}: ${s}`));
    }
    expect(missing, "images with no alt attribute").toEqual([]);
  });
});
