// S4 keyboard navigation audit: tab sequence, skip link, focus visibility,
// focus order vs visual order, mobile nav sheet trap.
import { chromium } from "@playwright/test";
import fs from "node:fs";

const BASE = "http://localhost:3200";
const PAGES = ["/", "/create", "/demo"];
const MAX_TABS = 220;

function describeFn() {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  // Toggle a synthetic blur-state read isn't reliable; instead capture outline/box-shadow
  // while focused (these are the two mechanisms almost all focus-visible styles use).
  const hasOutline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
  const hasBoxShadow = cs.boxShadow && cs.boxShadow !== "none";
  const hasRing = el.className && typeof el.className === "string" && /ring|focus-visible/.test(el.className);
  let selector = el.tagName.toLowerCase();
  if (el.id) selector += `#${el.id}`;
  else if (typeof el.className === "string" && el.className) selector += "." + el.className.trim().split(/\s+/).slice(0, 3).join(".");
  return {
    tag: el.tagName.toLowerCase(),
    selector,
    text: (el.textContent || el.getAttribute("aria-label") || el.getAttribute("placeholder") || "").trim().slice(0, 60),
    rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
    visible: rect.width > 0 && rect.height > 0 && cs.visibility !== "hidden" && cs.display !== "none",
    hasOutline,
    hasBoxShadow,
    hasRingClass: !!hasRing,
    outlineStyle: cs.outlineStyle,
    outlineWidth: cs.outlineWidth,
    outlineColor: cs.outlineColor,
    boxShadow: cs.boxShadow?.slice(0, 100),
  };
}

async function tabThrough(page, maxTabs) {
  const stops = [];
  const seen = new Set();
  for (let i = 0; i < maxTabs; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(describeFn);
    if (!info) break;
    stops.push(info);
    const key = `${info.selector}|${info.text}|${info.rect.x}|${info.rect.y}`;
    if (seen.has(key) && stops.length > 3) {
      // looped back to an element we've already seen — likely wrapped around the page
      stops.pop();
      break;
    }
    seen.add(key);
  }
  return stops;
}

async function run() {
  const browser = await chromium.launch();
  const out = {};

  for (const path of PAGES) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const stops = await tabThrough(page, MAX_TABS);

    // Check skip link behaviour: first stop should be the skip link; activate it.
    let skipLinkCheck = null;
    if (stops.length > 0) {
      const first = stops[0];
      const looksLikeSkip = /skip/i.test(first.text) || /skip-link/.test(first.selector);
      if (looksLikeSkip) {
        // reload and redo: tab once, press Enter, check focus moved to #main
        await page.goto(BASE + path, { waitUntil: "networkidle" });
        await page.waitForTimeout(300);
        await page.keyboard.press("Tab");
        const beforeActivate = await page.evaluate(describeFn);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(150);
        const afterActivate = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? { tag: el.tagName.toLowerCase(), id: el.id, isMain: el.id === "main" || el.closest?.("#main") === el } : null;
        });
        skipLinkCheck = { firstStop: first, looksLikeSkip, beforeActivate, afterActivate };
      } else {
        skipLinkCheck = { firstStop: first, looksLikeSkip: false };
      }
    }

    out[path] = { stops, skipLinkCheck, totalStops: stops.length };
    console.log(`${path}: ${stops.length} tab stops, first="${stops[0]?.text}" (${stops[0]?.selector})`);
    await context.close();
  }

  // ---- Mobile nav sheet trap check (on homepage) ----
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    // Find the mobile nav toggle button (hamburger) — look for a button in the header with no text.
    const toggle = await page.evaluate(() => {
      const header = document.querySelector("header");
      if (!header) return null;
      const btns = Array.from(header.querySelectorAll("button"));
      const candidate = btns.find((b) => b.textContent.trim() === "" && b.getBoundingClientRect().width > 0);
      if (!candidate) return null;
      let selector = candidate.tagName.toLowerCase();
      if (candidate.id) selector += `#${candidate.id}`;
      else selector += "." + (candidate.className || "").trim().split(/\s+/).slice(0, 2).join(".");
      return { selector, ariaLabel: candidate.getAttribute("aria-label"), ariaExpanded: candidate.getAttribute("aria-expanded") };
    });
    console.log("mobile nav toggle candidate:", JSON.stringify(toggle));

    let mobileNavResult = { toggleFound: !!toggle };
    if (toggle) {
      // Click it via keyboard: tab to it then press it. Simpler: click directly (still a real DOM interaction) then verify via keyboard.
      const handle = await page.$("header button");
      // find exact button matching aria-label if present
      let btnHandle = null;
      if (toggle.ariaLabel) {
        btnHandle = await page.$(`header button[aria-label="${toggle.ariaLabel}"]`);
      }
      btnHandle = btnHandle || handle;
      await btnHandle.focus();
      await page.keyboard.press("Enter");
      await page.waitForTimeout(400);

      const afterOpen = await page.evaluate(() => {
        const btn = document.activeElement;
        return {
          activeIsToggle: !!btn,
          bodyOverflow: getComputedStyle(document.body).overflow,
          dialogPresent: !!document.querySelector('[role="dialog"], [aria-modal="true"]'),
        };
      });
      console.log("after opening mobile nav:", JSON.stringify(afterOpen));

      // Tab through up to 25 stops and see if focus stays within the sheet / dialog
      const trapStops = [];
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press("Tab");
        const info = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el) return null;
          const dialog = el.closest?.('[role="dialog"], [aria-modal="true"], .mobile-nav, [data-mobile-nav]');
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40),
            insideDialog: !!dialog,
            rect: (() => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y) }; })(),
          };
        });
        trapStops.push(info);
      }
      mobileNavResult.trapStops = trapStops;

      // Now close via Escape and check focus returns to toggle
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      const afterClose = await page.evaluate(() => {
        const el = document.activeElement;
        return { tag: el?.tagName.toLowerCase(), text: (el?.textContent || el?.getAttribute("aria-label") || "").trim().slice(0, 40) };
      });
      mobileNavResult.afterEscapeClose = afterClose;
    }
    out["mobile-nav-sheet"] = mobileNavResult;
    await context.close();
  }

  await browser.close();
  fs.writeFileSync(new URL("./keyboard-results.json", import.meta.url), JSON.stringify(out, null, 2));
  console.log("wrote keyboard-results.json");
}

run();
