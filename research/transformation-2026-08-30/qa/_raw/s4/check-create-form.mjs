import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://localhost:3200/create", { waitUntil: "networkidle" });
await page.waitForTimeout(400);

// Inspect initial field wiring (before any submit attempt)
const initial = await page.evaluate(() => {
  const controls = Array.from(document.querySelectorAll("input, textarea, select")).map((c) => ({
    id: c.id,
    tag: c.tagName.toLowerCase(),
    hasLabel: !!document.querySelector(`label[for="${c.id}"]`),
    ariaDescribedby: c.getAttribute("aria-describedby"),
    ariaInvalid: c.getAttribute("aria-invalid"),
    ariaRequired: c.getAttribute("aria-required"),
  }));
  return controls;
});
console.log("initial field wiring:", JSON.stringify(initial, null, 2));

// Find and click Send without filling anything
const sendBtn = await page.$('button[type="submit"]');
const disabledBefore = await sendBtn.isDisabled();
console.log("submit button disabled before any input:", disabledBefore);

await sendBtn.click();
await page.waitForTimeout(400);

const afterSubmitAttempt = await page.evaluate(() => {
  const liveRegions = Array.from(document.querySelectorAll('[aria-live]')).map((r) => ({
    ariaLive: r.getAttribute("aria-live"),
    text: r.textContent.trim(),
    srOnly: r.className.includes("sr-only"),
  }));
  const controls = Array.from(document.querySelectorAll("input, textarea, select")).map((c) => ({
    id: c.id,
    ariaDescribedby: c.getAttribute("aria-describedby"),
    ariaInvalid: c.getAttribute("aria-invalid"),
  }));
  const activeEl = document.activeElement;
  const errorTexts = Array.from(document.querySelectorAll('[id$="-error"]')).map((e) => ({ id: e.id, text: e.textContent.trim() }));
  const summaryBanner = document.querySelector(".text-danger")?.textContent?.trim();
  return {
    liveRegions,
    controls,
    activeElement: activeEl ? { tag: activeEl.tagName, id: activeEl.id } : null,
    errorTexts,
    summaryBanner,
  };
});
console.log("after submit attempt with empty form:", JSON.stringify(afterSubmitAttempt, null, 2));

const disabledAfter = await sendBtn.isDisabled();
console.log("submit button disabled AFTER failed validation:", disabledAfter);

// Check colour-only signalling: is "required" text present (not just colour)?
const requiredLabelText = await page.evaluate(() => {
  const labels = Array.from(document.querySelectorAll("label"));
  return labels.map((l) => l.textContent.trim()).filter((t) => /required|optional/i.test(t));
});
console.log("label required/optional text samples:", JSON.stringify(requiredLabelText.slice(0, 5)));

await browser.close();
