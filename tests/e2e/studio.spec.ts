import { test, expect } from "./safe-test";
import AxeBuilder from "@axe-core/playwright";
test("RoomRush reveals its full panel on hover and releases the side cards immediately", async ({ page, isMobile }) => {
  test.skip(isMobile, "Touch layouts show the panels without overlap");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const room = page.getByRole("link", { name: /Explore RoomRush/ });
  await room.scrollIntoViewIfNeeded();
  await room.hover({ position: { x: 200, y: 35 } });
  await expect.poll(() => room.evaluate(el => getComputedStyle(el).zIndex)).toBe("4");
  await expect.poll(() => room.evaluate(el => getComputedStyle(el).transform)).toBe("matrix(1.035, 0, 0, 1.035, 0, -12)");
  expect(await room.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return el.contains(document.elementFromPoint(bounds.left + 20, bounds.bottom - 70));
  })).toBe(true);
  await page.getByRole("heading", { name: "A few things I’ve built" }).hover();
  await expect.poll(() => room.evaluate(el => getComputedStyle(el).zIndex)).toBe("1");
  await room.focus();
  await expect.poll(() => room.evaluate(el => getComputedStyle(el).zIndex)).toBe("4");
});
test("RoomRush animates, pauses by keyboard, and stops offscreen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const canvas = page.locator("#work canvas");
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toBeVisible();
  const frame = () => canvas.evaluate((el: HTMLCanvasElement) => el.toDataURL());
  const first = await frame();
  await expect.poll(frame).not.toBe(first);
  const pause = page.getByRole("button", { name: "Pause showcase animation" });
  await pause.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Play showcase animation" })).toHaveAttribute("aria-pressed", "true");
  const still = await frame();
  await page.waitForTimeout(420);
  expect(await frame()).toBe(still);
  await page.keyboard.press("Enter");
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(frame).not.toBe(still);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const offscreen = await frame();
  await page.waitForTimeout(420);
  expect(await frame()).toBe(offscreen);
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(frame).not.toBe(offscreen);
});
test("reduced motion keeps the snakes still and follows preference changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const canvas = page.locator("#work canvas");
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toBeVisible();
  await expect(page.getByRole("button", { name: "Animation paused for reduced motion" })).toBeDisabled();
  const frame = () => canvas.evaluate((el: HTMLCanvasElement) => el.toDataURL());
  const first = await frame();
  await page.waitForTimeout(420);
  expect(await frame()).toBe(first);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(frame).not.toBe(first);
});
test("failed artwork leaves a visible fallback and a working product link", async ({ page }) => {
  await page.route("**/showcase/roomrush/approved-art.webp", route => route.abort());
  await page.goto("/");
  await expect(page.getByText("Preview unavailable. Explore RoomRush ↗")).toBeVisible();
  await expect(page.locator("#work canvas")).toBeHidden();
  await expect(page.getByRole("link", { name: /Explore RoomRush/ })).toHaveAttribute("href", "https://playroomrush.com");
});
test("missing canvas support preserves a static illustration", async ({ page }) => {
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  await page.goto("/");
  await expect(page.getByText("Static preview · Explore RoomRush ↗")).toBeVisible();
  await expect(page.locator("#work img")).toBeVisible();
  await expect(page.locator("#work canvas")).toBeHidden();
});
test("the showcase is accessible, links each product once and fits small viewports", async ({ page }) => {
  await page.goto("/");
  for (const href of ["https://playroomrush.com", "https://coitracker.co", "https://paynudge.xyz"]) {
    await expect(page.locator('main a[href="' + href + '"]')).toHaveCount(1);
  }
  await page.getByRole("link", { name: "Explore the work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#showcase-title")).toBeInViewport();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations.filter(v => v.impact === "serious" || v.impact === "critical")).toEqual([]);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.locator("html").evaluate(el => el.scrollWidth <= el.clientWidth + 1), "overflow at " + width).toBe(true);
    const nextTop = await page.locator("#what-we-build").evaluate(el => el.getBoundingClientRect().top);
    const bottoms = await page.locator("#work a").evaluateAll(els => els.map(el => el.getBoundingClientRect().bottom));
    expect(Math.max(...bottoms), "showcase overlaps next section at " + width).toBeLessThan(nextTop);
  }
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
