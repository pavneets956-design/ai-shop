import { chromium } from "@playwright/test";

async function capture(page, url, selectorPredicate, name) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const handle = await page.evaluateHandle(selectorPredicate);
  const el = handle.asElement();
  if (!el) { console.log(name, "not found"); return; }
  await el.scrollIntoViewIfNeeded();
  const box = await el.boundingBox();
  const pad = 16;
  const clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 };
  await page.screenshot({ path: `research/transformation-2026-08-30/qa/_raw/s4/screens/${name}-unfocused.png`, clip });
  await el.focus();
  await page.waitForTimeout(150);
  await page.screenshot({ path: `research/transformation-2026-08-30/qa/_raw/s4/screens/${name}-focused.png`, clip });
  console.log("captured", name);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await capture(page, "http://localhost:3200/", () => document.querySelector('button[id*="tab-0"]'), "home-segmented-tab");
await capture(page, "http://localhost:3200/demo", () => document.querySelector("textarea"), "demo-textarea");
await capture(page, "http://localhost:3200/demo", () => Array.from(document.querySelectorAll("button")).find((b) => b.textContent.includes("Landscaping")), "demo-landscaping-chip");
await capture(page, "http://localhost:3200/demo", () => Array.from(document.querySelectorAll("button")).find((b) => b.textContent.includes("AI Receptionist") && b.textContent.includes("Answers")), "demo-ai-receptionist-tab");

await browser.close();
