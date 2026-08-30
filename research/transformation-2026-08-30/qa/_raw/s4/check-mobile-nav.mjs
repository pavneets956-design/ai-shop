import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3200/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);

const btn = await page.$('header button[aria-label="Open menu"]');
await btn.click();
await page.waitForTimeout(500);

await page.screenshot({ path: "research/transformation-2026-08-30/qa/_raw/s4/mobile-nav-open.png" });

const domInfo = await page.evaluate(() => {
  // Find candidate nav-sheet containers: elements that appeared/changed, look for fixed-position panels
  const all = Array.from(document.querySelectorAll("*"));
  const fixedPanels = all.filter((el) => {
    const cs = getComputedStyle(el);
    return cs.position === "fixed" && el.getBoundingClientRect().height > 100;
  }).map((el) => ({
    tag: el.tagName.toLowerCase(),
    cls: typeof el.className === "string" ? el.className.slice(0, 100) : "",
    role: el.getAttribute("role"),
    ariaModal: el.getAttribute("aria-modal"),
    zIndex: getComputedStyle(el).zIndex,
    rect: el.getBoundingClientRect(),
  }));
  const toggleBtn = document.querySelector('header button[aria-label]');
  return {
    fixedPanels,
    toggleAriaExpanded: toggleBtn?.getAttribute("aria-expanded"),
    bodyOverflow: getComputedStyle(document.body).overflow,
  };
});
console.log(JSON.stringify(domInfo, null, 2));

// Check: is "Try the live AI demo" (a link far down the page, per earlier trap test)
// actually visible right now, or hidden behind the open panel?
const visCheck = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll("a")).filter((a) => a.textContent.trim() === "Try the live AI demo");
  return links.map((a) => {
    const rect = a.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2, centerY = rect.y + rect.height / 2;
    const topEl = document.elementFromPoint(centerX, centerY);
    return {
      rect,
      inViewport: rect.top >= 0 && rect.top < window.innerHeight,
      topElementAtItsCenter: topEl ? topEl.outerHTML.slice(0, 100) : null,
      isSelfOnTop: topEl === a || a.contains(topEl),
    };
  });
});
console.log("visCheck:", JSON.stringify(visCheck, null, 2));

await browser.close();
