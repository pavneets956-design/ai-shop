// Ground-truth check: screenshot each ambiguous element unfocused vs focused
// and diff pixel counts to see if ANYTHING visibly changes (any CSS mechanism).
import { chromium } from "@playwright/test";
import { decodePNG } from "./lib-color.mjs";

function diffCount(bufA, bufB) {
  const a = decodePNG(bufA), b = decodePNG(bufB);
  if (a.width !== b.width || a.height !== b.height) return { error: "size-mismatch", aw: a.width, ah: a.height, bw: b.width, bh: b.height };
  let diff = 0;
  const total = a.width * a.height;
  for (let i = 0; i < total; i++) {
    const o = i * a.channels;
    const dr = Math.abs(a.data[o] - b.data[o]);
    const dg = Math.abs(a.data[o + 1] - b.data[o + 1]);
    const db = Math.abs(a.data[o + 2] - b.data[o + 2]);
    if (dr + dg + db > 15) diff++; // small threshold to ignore AA noise
  }
  return { diffPixels: diff, totalPixels: total, pct: (diff / total) * 100 };
}

async function checkOne(page, url, selectorPredicate, label) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const handle = await page.evaluateHandle(selectorPredicate);
  const el = handle.asElement();
  if (!el) {
    console.log(label, "-> element not found");
    return;
  }
  await el.scrollIntoViewIfNeeded();
  // pad the capture region a bit to catch outlines/shadows drawn outside the box
  const box = await el.boundingBox();
  const pad = 12;
  const clip = { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 };
  const before = await page.screenshot({ clip });
  await el.focus();
  await page.waitForTimeout(150);
  const after = await page.screenshot({ clip });
  const d = diffCount(before, after);
  console.log(label, "->", JSON.stringify(d));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await checkOne(
  page,
  "http://localhost:3200/",
  () => document.getElementById(":R1kv4q:-tab-0") || document.querySelector('button[id*="tab-0"]'),
  "/ segmented-tab-0"
);
await checkOne(
  page,
  "http://localhost:3200/",
  () => Array.from(document.querySelectorAll("a.v-card.v-card-hover")).find(Boolean),
  "/ free-tool-card"
);
await checkOne(
  page,
  "http://localhost:3200/demo",
  () => Array.from(document.querySelectorAll("button")).find((b) => b.textContent.includes("Landscaping")),
  "/demo landscaping-chip"
);
await checkOne(
  page,
  "http://localhost:3200/demo",
  () => document.querySelector("textarea"),
  "/demo textarea"
);
await checkOne(
  page,
  "http://localhost:3200/demo",
  () => Array.from(document.querySelectorAll("button")).find((b) => b.textContent.includes("AI Receptionist") && b.textContent.includes("Answers")),
  "/demo AI-Receptionist-tab"
);
await checkOne(
  page,
  "http://localhost:3200/",
  () => Array.from(document.querySelectorAll("a")).find((a) => a.className.includes("btn-secondary") && a.textContent.includes("How the install works")),
  "/ btn-secondary"
);

await browser.close();
