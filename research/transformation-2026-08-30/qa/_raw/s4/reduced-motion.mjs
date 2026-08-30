// S4 reduced-motion check: emulate prefers-reduced-motion:reduce and confirm
// nothing animates (reveal, live dot, FAQ marker, spinners) and nothing is
// hidden as a result.
import { chromium } from "@playwright/test";
import { decodePNG } from "./lib-color.mjs";
import fs from "node:fs";

function diffPct(bufA, bufB) {
  const a = decodePNG(bufA), b = decodePNG(bufB);
  if (a.width !== b.width || a.height !== b.height) return { error: "size-mismatch" };
  let diff = 0;
  const total = a.width * a.height;
  for (let i = 0; i < total; i++) {
    const o = i * a.channels;
    const d = Math.abs(a.data[o] - b.data[o]) + Math.abs(a.data[o + 1] - b.data[o + 1]) + Math.abs(a.data[o + 2] - b.data[o + 2]);
    if (d > 15) diff++;
  }
  return { pct: (diff / total) * 100, diff, total };
}

const browser = await chromium.launch();
const results = {};

// ---- 1. Homepage: v-reveal never arms; below-fold sections should be visible immediately ----
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://localhost:3200/", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const revealState = await page.evaluate(() => {
    const reveals = Array.from(document.querySelectorAll(".v-reveal"));
    return {
      total: reveals.length,
      armed: reveals.filter((el) => el.hasAttribute("data-armed")).length,
      anyOpacityZero: reveals.some((el) => parseFloat(getComputedStyle(el).opacity) === 0),
      anyInvisible: reveals.some((el) => {
        const r = el.getBoundingClientRect();
        return getComputedStyle(el).visibility === "hidden" && r.width > 0;
      }),
    };
  });
  results.homepageReveal = revealState;

  // scroll to a below-fold section and confirm no ongoing animation (screenshot diff over 400ms)
  await page.evaluate(() => window.scrollTo(0, 3500));
  await page.waitForTimeout(200);
  const clip = { x: 0, y: 0, width: 1280, height: 800 };
  const shot1 = await page.screenshot({ clip });
  await page.waitForTimeout(400);
  const shot2 = await page.screenshot({ clip });
  results.homepageBelowFoldStatic = diffPct(shot1, shot2);

  await context.close();
}

// ---- 2. Homepage: live dot (.v-live-dot under WorkflowStory / #how-it-works) ----
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://localhost:3200/", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const dotHandle = await page.$(".v-live-dot");
  if (dotHandle) {
    await dotHandle.scrollIntoViewIfNeeded();
    const anim = await dotHandle.evaluate((el) => getComputedStyle(el).animationName + " / " + getComputedStyle(el).animationDuration);
    const box = await dotHandle.boundingBox();
    const clip = { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 10), width: box.width + 20, height: box.height + 20 };
    const s1 = await page.screenshot({ clip });
    await page.waitForTimeout(500);
    const s2 = await page.screenshot({ clip });
    results.liveDot = { found: true, computedAnimation: anim, diff: diffPct(s1, s2) };
  } else {
    results.liveDot = { found: false };
  }
  await context.close();
}

// ---- 3. FAQ marker (/faq and homepage FAQ) ----
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://localhost:3200/faq", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const markerHandle = await page.$(".faq-marker");
  if (markerHandle) {
    await markerHandle.scrollIntoViewIfNeeded();
    const before = await markerHandle.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { transitionDuration: cs.transitionDuration };
    });
    const box = await markerHandle.boundingBox();
    const clip = { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 10), width: box.width + 20, height: box.height + 20 };
    const s1 = await page.screenshot({ clip });
    // click the parent summary to trigger open/close transition, if any
    const summary = await page.evaluateHandle((el) => el.closest("summary") || el.closest("details")?.querySelector("summary"), markerHandle);
    const summaryEl = summary.asElement();
    if (summaryEl) await summaryEl.click();
    await page.waitForTimeout(50);
    const sMid = await page.screenshot({ clip });
    await page.waitForTimeout(400);
    const s2 = await page.screenshot({ clip });
    results.faqMarker = {
      found: true,
      before,
      diffImmediate: diffPct(s1, sMid), // should be near-instant (no animated transition) under reduced motion
      diffAfterSettle: diffPct(sMid, s2), // should be ~0 (no ongoing animation after the click)
    };
  } else {
    results.faqMarker = { found: false };
  }
  await context.close();
}

// ---- 4. Spinners: /create loading skeleton + /demo "Sending" spinner (Loader2 animate-spin) ----
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://localhost:3200/create", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const spinnerInfo = await page.evaluate(() => {
    const spinEls = Array.from(document.querySelectorAll(".animate-spin"));
    return spinEls.map((el) => ({
      cls: el.className,
      animationDuration: getComputedStyle(el).animationDuration,
      animationName: getComputedStyle(el).animationName,
    }));
  });
  results.createSpinnerCandidates = spinnerInfo;
  await context.close();
}

await browser.close();
fs.writeFileSync(new URL("./reduced-motion-results.json", import.meta.url), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
