import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3200/start", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// Is the underlying header logo link present and what's its visibility state?
const info = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll("a")).filter((a) =>
    a.textContent.trim().includes("Handbuilt AI") || a.className.includes("hbc-exit")
  );
  return links.map((a) => {
    const rect = a.getBoundingClientRect();
    const cs = getComputedStyle(a);
    const topElAtPoint = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    return {
      text: a.textContent.trim(),
      className: a.className,
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      display: cs.display,
      visibility: cs.visibility,
      zIndex: cs.zIndex,
      position: cs.position,
      tabIndex: a.tabIndex,
      isTopElementAtCenter: topElAtPoint === a || a.contains(topElAtPoint),
      elementActuallyOnTop: topElAtPoint ? topElAtPoint.outerHTML.slice(0, 100) : null,
    };
  });
});
console.log(JSON.stringify(info, null, 2));

// Now actually tab through from the top and record what receives focus first few stops
await page.keyboard.press("Tab");
for (let i = 0; i < 6; i++) {
  const active = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 40),
      className: typeof el.className === "string" ? el.className.slice(0, 60) : "",
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      visible: rect.width > 0 && rect.height > 0,
    };
  });
  console.log("TAB STOP", i, JSON.stringify(active));
  await page.keyboard.press("Tab");
}

await browser.close();
