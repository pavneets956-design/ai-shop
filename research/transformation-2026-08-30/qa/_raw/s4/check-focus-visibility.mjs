// Deep-dive: for every tab stop across /, /create, /demo, capture the FULL
// (untruncated) outline + box-shadow, and the effective background behind
// the element, then determine whether the focus ring actually paints a
// visible (>=3:1 contrast, per SC 1.4.11) ring against that background.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import { parseCssColor, contrastRatio } from "./lib-color.mjs";

const BASE = "http://localhost:3200";
const PAGES = ["/", "/create", "/demo"];
const MAX_TABS = 220;

function getEffectiveBgFn(el) {
  let node = el;
  let acc = { r: 255, g: 255, b: 255, a: 1 };
  const layers = [];
  while (node) {
    const cs = getComputedStyle(node);
    const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/i);
    if (m) {
      const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
      const a = parts.length > 3 ? parts[3] : 1;
      if (a > 0) layers.push({ r: parts[0], g: parts[1], b: parts[2], a });
    }
    node = node.parentElement;
  }
  layers.reverse();
  for (const layer of layers) {
    acc = {
      r: layer.r * layer.a + acc.r * acc.a * (1 - layer.a),
      g: layer.g * layer.a + acc.g * acc.a * (1 - layer.a),
      b: layer.b * layer.a + acc.b * acc.a * (1 - layer.a),
      a: layer.a + acc.a * (1 - layer.a),
    };
  }
  return acc;
}

function describeFocusFn() {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  let selector = el.tagName.toLowerCase();
  if (el.id) selector += `#${el.id}`;
  else if (typeof el.className === "string" && el.className) selector += "." + el.className.trim().split(/\s+/).slice(0, 3).join(".");
  // parse individual box-shadow layers (comma-separated at top level; box-shadow
  // values don't nest parens across layers except inside rgb()/rgba())
  const bg = getEffectiveBgFnInline(el);
  return {
    selector,
    text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40),
    rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
    outlineStyle: cs.outlineStyle,
    outlineWidth: cs.outlineWidth,
    outlineColor: cs.outlineColor,
    outlineOffset: cs.outlineOffset,
    boxShadowFull: cs.boxShadow,
    effectiveBg: bg,
  };
  function getEffectiveBgFnInline(e) { return getEffectiveBgFn(e); }
}

async function run() {
  const browser = await chromium.launch();
  const out = {};
  for (const path of PAGES) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    // need getEffectiveBgFn defined in-page too
    await page.addInitScript(getEffectiveBgFn.toString().replace("function getEffectiveBgFn", "window.__getEffectiveBgFn = function"));
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const stops = [];
    for (let i = 0; i < MAX_TABS; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        let selector = el.tagName.toLowerCase();
        if (el.id) selector += `#${el.id}`;
        else if (typeof el.className === "string" && el.className) selector += "." + el.className.trim().split(/\s+/).slice(0, 3).join(".");
        return {
          selector,
          text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40),
          rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
          outlineStyle: cs.outlineStyle,
          outlineWidth: cs.outlineWidth,
          outlineColor: cs.outlineColor,
          boxShadowFull: cs.boxShadow,
          effectiveBg: window.__getEffectiveBgFn(el),
        };
      });
      if (!info) break;
      stops.push(info);
      if (stops.length > 3) {
        const key = `${info.selector}|${info.text}|${info.rect.x}|${info.rect.y}`;
        const dupIdx = stops.findIndex((s, idx) => idx < stops.length - 1 && `${s.selector}|${s.text}|${s.rect.x}|${s.rect.y}` === key);
        if (dupIdx !== -1) { stops.pop(); break; }
      }
    }
    out[path] = stops;
    console.log(`${path}: captured ${stops.length} stops`);
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(new URL("./focus-visibility-raw.json", import.meta.url), JSON.stringify(out, null, 2));
  console.log("wrote focus-visibility-raw.json");
}

run();
