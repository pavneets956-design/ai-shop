import { test, expect } from "@playwright/test";

/**
 * No console errors, no failed same-origin requests.
 *
 * A hydration mismatch, a 404 asset, or a thrown handler is invisible to a
 * human eyeballing the page but breaks interaction for real visitors. Nothing
 * has ever checked.
 */

const PAGES = [
  "/",
  "/demo",
  "/pricing",
  "/create",
  "/ai-receptionist",
  "/ai-receptionist-for-contractors",
  "/tools",
  "/about",
];

/**
 * Noise that is not a site defect:
 *  - Vercel Analytics is not served by `next start` locally.
 *  - NextAuth's session endpoint 500s without NEXTAUTH_SECRET in a local build.
 *  - React's dev-only "Download the React DevTools" notice.
 */
const IGNORED = [
  /_vercel\/insights/i,
  /_vercel\/speed-insights/i,
  /\/api\/auth\/session/i,
  /Download the React DevTools/i,
  /Failed to load resource.*favicon/i,
];

const ignored = (text: string) => IGNORED.some((re) => re.test(text));

for (const path of PAGES) {
  test(`${path} logs no console errors and loads every same-origin asset`, async ({ page, baseURL }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (!ignored(text)) consoleErrors.push(text);
    });
    page.on("pageerror", (err) => {
      if (!ignored(err.message)) consoleErrors.push(`pageerror: ${err.message}`);
    });
    page.on("response", (res) => {
      const url = res.url();
      if (baseURL && !url.startsWith(baseURL)) return;
      if (res.status() >= 400 && !ignored(url)) {
        failedRequests.push(`${res.status()} ${url}`);
      }
    });

    const res = await page.goto(path, { waitUntil: "networkidle" });
    expect(res?.status(), `${path} did not render`).toBeLessThan(400);

    expect(consoleErrors, `console errors on ${path}`).toEqual([]);
    expect(failedRequests, `failed same-origin requests on ${path}`).toEqual([]);
  });
}

test.describe("layout", () => {
  test("no page scrolls horizontally at its viewport width", async ({ page }) => {
    for (const path of ["/", "/demo", "/pricing", "/create"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      // A couple of px of sub-pixel rounding is not an overflow.
      expect(overflow, `${path} overflows horizontally by ${overflow}px`).toBeLessThanOrEqual(2);
    }
  });

  test("the first CTA on the homepage takes a visible focus ring", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator('a[href^="/create"]').first();
    await cta.focus();
    const outline = await cta.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.outlineStyle} ${s.outlineWidth} ${s.boxShadow}`;
    });
    expect(outline, "keyboard users need a visible focus indicator").not.toMatch(/^none 0px none$/);
  });
});
