import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3200/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);

// Keyboard-activate the toggle (Tab to header button, then Enter)
const toggle = await page.$('header button[aria-label="Open menu"]');
await toggle.focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(400);

const rightAfterOpen = await page.evaluate(() => {
  const el = document.activeElement;
  return { tag: el?.tagName, text: (el?.textContent || el?.getAttribute("aria-label") || "").trim().slice(0, 40) };
});
console.log("focus immediately after opening (keyboard):", JSON.stringify(rightAfterOpen));

// Try pressing Escape right away
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
const afterEscapeImmediate = await page.evaluate(() => {
  const btn = document.querySelector('header button[aria-label]');
  return {
    ariaExpanded: btn?.getAttribute("aria-expanded"),
    activeTag: document.activeElement?.tagName,
    activeText: (document.activeElement?.textContent || "").trim().slice(0, 40),
  };
});
console.log("state after Escape (right after open, before tabbing away):", JSON.stringify(afterEscapeImmediate));

// If still open, tab to find the X close button and activate it
if (afterEscapeImmediate.ariaExpanded === "true") {
  // Tab forward until we find a button with "X" / close-like label, max 10 tabs from toggle
  await toggle.focus();
  let foundClose = false;
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tag: el?.tagName,
        aria: el?.getAttribute?.("aria-label"),
        text: (el?.textContent || "").trim().slice(0, 20),
      };
    });
    if (info.aria && /close/i.test(info.aria)) {
      foundClose = true;
      await page.keyboard.press("Enter");
      await page.waitForTimeout(300);
      const afterClose = await page.evaluate(() => {
        const btn = document.querySelector('header button[aria-label]');
        return {
          ariaExpanded: btn?.getAttribute("aria-expanded"),
          activeIsToggle: document.activeElement === btn,
          activeTag: document.activeElement?.tagName,
          activeAria: document.activeElement?.getAttribute?.("aria-label"),
        };
      });
      console.log("closed via X button; state after:", JSON.stringify(afterClose));
      break;
    }
  }
  if (!foundClose) console.log("Could not find an explicit close/X button within 10 tabs from toggle.");
}

await browser.close();
