// S4 accessibility audit: contrast, structure, touch targets, reduced-motion.
// Reads localhost:3200 only. Writes JSON per concern into qa/_raw/s4/.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import { parseCssColor, compositeOver, contrastRatio, samplePixelBackground } from "./lib-color.mjs";

const BASE = "http://localhost:3200";
const PAGES = [
  "/",
  "/demo",
  "/pricing",
  "/create",
  "/start",
  "/about",
  "/ai-receptionist",
  "/ai-receptionist-for-contractors",
  "/industries",
  "/tools",
  "/faq",
  "/use-cases/ai-receptionist-for-contractors",
];

// ---- in-page collection function (runs via page.evaluate) ----
function collectTextNodesFn() {
  function isVisible(el) {
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) === 0) return false;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    return true;
  }
  function cssPath(el) {
    if (!(el instanceof Element)) return "";
    const parts = [];
    let node = el;
    let depth = 0;
    while (node && node.nodeType === 1 && depth < 6) {
      let sel = node.nodeName.toLowerCase();
      if (node.id) {
        sel += `#${node.id}`;
        parts.unshift(sel);
        break;
      } else {
        const cls = (node.className && typeof node.className === "string")
          ? "." + node.className.trim().split(/\s+/).slice(0, 3).join(".")
          : "";
        const parent = node.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((c) => c.nodeName === node.nodeName);
          if (siblings.length > 1) {
            const idx = siblings.indexOf(node) + 1;
            sel += `:nth-of-type(${idx})`;
          }
        }
        sel += cls;
      }
      parts.unshift(sel);
      node = node.parentElement;
      depth++;
    }
    return parts.join(" > ");
  }

  function getEffectiveBackground(el) {
    // Walk from el upward collecting background layers; composite root->el.
    const layers = [];
    let node = el;
    let hasComplex = false;
    while (node) {
      const cs = getComputedStyle(node);
      const bgColorStr = cs.backgroundColor;
      const bgImage = cs.backgroundImage;
      const m = bgColorStr.match(/rgba?\(([^)]+)\)/i);
      let a = 0, r = 0, g = 0, b = 0;
      if (m) {
        const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
        r = parts[0]; g = parts[1]; b = parts[2]; a = parts.length > 3 ? parts[3] : 1;
      }
      if (bgImage && bgImage !== "none") hasComplex = true;
      if (a > 0) layers.push({ r, g, b, a });
      node = node.parentElement;
    }
    layers.reverse(); // root-most first
    let acc = { r: 255, g: 255, b: 255, a: 1 }; // default page canvas = white
    for (const layer of layers) {
      acc = {
        r: layer.r * layer.a + acc.r * acc.a * (1 - layer.a),
        g: layer.g * layer.a + acc.g * acc.a * (1 - layer.a),
        b: layer.b * layer.a + acc.b * acc.a * (1 - layer.a),
        a: layer.a + acc.a * (1 - layer.a),
      };
    }
    return { color: acc, hasComplex };
  }

  const all = document.body.querySelectorAll("*");
  const results = [];
  let idx = 0;
  for (const el of all) {
    if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH", "TEMPLATE"].includes(el.tagName)) continue;
    // direct text node children only (avoid double-counting nested containers)
    let ownText = "";
    for (const child of el.childNodes) {
      if (child.nodeType === 3) ownText += child.textContent;
    }
    ownText = ownText.trim();
    if (!ownText) continue;
    if (!isVisible(el)) continue;
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    // Include the element's own background (buttons/badges paint their own
    // fill directly behind their text), not just the container behind it.
    const { color: bgColor, hasComplex } = getEffectiveBackground(el);
    const fg = cs.color;
    const fgM = fg.match(/rgba?\(([^)]+)\)/i);
    let fgParsed = null;
    if (fgM) {
      const parts = fgM[1].split(",").map((s) => parseFloat(s.trim()));
      fgParsed = { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
    }
    el.setAttribute("data-s4-idx", String(idx));
    results.push({
      idx: idx++,
      selector: cssPath(el),
      text: ownText.slice(0, 80),
      fontSize: parseFloat(cs.fontSize),
      fontWeight: cs.fontWeight,
      fg: fgParsed,
      bg: bgColor,
      hasComplexBg: hasComplex,
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      tag: el.tagName.toLowerCase(),
      role: el.getAttribute("role"),
    });
  }
  return results;
}

function collectStructureFn() {
  const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((h) => ({
    level: parseInt(h.tagName[1], 10),
    text: h.textContent.trim().slice(0, 80),
    visible: h.getBoundingClientRect().width > 0,
  }));
  const landmarks = {
    banner: document.querySelectorAll('header, [role="banner"]').length,
    main: document.querySelectorAll('main, [role="main"]').length,
    contentinfo: document.querySelectorAll('footer, [role="contentinfo"]').length,
    navigation: document.querySelectorAll('nav, [role="navigation"]').length,
  };
  const imgs = Array.from(document.querySelectorAll("img")).map((img) => ({
    src: img.getAttribute("src")?.slice(0, 100),
    alt: img.getAttribute("alt"),
    hasAlt: img.hasAttribute("alt"),
    ariaHidden: img.getAttribute("aria-hidden"),
    role: img.getAttribute("role"),
  }));
  const iconButtons = Array.from(document.querySelectorAll("button, a")).filter((el) => {
    const text = el.textContent.trim();
    return text === "" && el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0;
  }).map((el) => ({
    tag: el.tagName.toLowerCase(),
    ariaLabel: el.getAttribute("aria-label"),
    ariaLabelledby: el.getAttribute("aria-labelledby"),
    title: el.getAttribute("title"),
    hasSvgTitle: !!el.querySelector("svg title"),
    outerHTMLSnippet: el.outerHTML.slice(0, 150),
  }));
  return {
    h1Count: headings.filter((h) => h.level === 1).length,
    headings,
    landmarks,
    lang: document.documentElement.getAttribute("lang"),
    imgs,
    iconButtons,
    title: document.title,
  };
}

function collectTouchTargetsFn() {
  const els = Array.from(document.querySelectorAll("a, button, input, select, textarea, [role='button'], [tabindex]"));
  const items = els
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && cs.display !== "none" && cs.visibility !== "hidden";
    })
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        text: el.textContent.trim().slice(0, 40),
        selector: (() => {
          let s = el.tagName.toLowerCase();
          if (el.id) s += `#${el.id}`;
          else if (typeof el.className === "string" && el.className) s += "." + el.className.trim().split(/\s+/).slice(0, 2).join(".");
          return s;
        })(),
        x: rect.x, y: rect.y, width: rect.width, height: rect.height,
      };
    });
  return items;
}

async function run() {
  const browser = await chromium.launch();
  const contrastAll = [];
  const structureAll = [];
  const touchAll = [];
  const reducedMotionAll = [];

  for (const path of PAGES) {
    // ---- DESKTOP: contrast + structure ----
    {
      const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      const page = await context.newPage();
      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(400);
      const nodes = await page.evaluate(collectTextNodesFn);
      const structure = await page.evaluate(collectStructureFn);
      structureAll.push({ path, viewport: "desktop", ...structure });

      // resolve contrast: analytic where possible, pixel-sample for complex bg
      for (const n of nodes) {
        if (!n.fg) continue;
        let bgColor = n.bg;
        let method = "analytic";
        if (n.hasComplexBg) {
          try {
            const handle = await page.$(`[data-s4-idx="${n.idx}"]`);
            const buf = await handle.screenshot();
            const sampled = samplePixelBackground(buf);
            bgColor = { r: sampled.r, g: sampled.g, b: sampled.b, a: 1 };
            method = `pixel-sample(coverage=${sampled.coverage.toFixed(2)})`;
          } catch (e) {
            method = `pixel-sample-failed: ${e.message.split("\n")[0]}`;
          }
        }
        const fgOpaque = n.fg.a < 1 ? compositeOver(n.fg, bgColor) : n.fg;
        const ratio = contrastRatio(fgOpaque, bgColor);
        const isBold = parseInt(n.fontWeight, 10) >= 700;
        const isLarge = n.fontSize >= 24 || (n.fontSize >= 18.66 && isBold);
        const required = isLarge ? 3.0 : 4.5;
        contrastAll.push({
          path,
          viewport: "desktop",
          selector: n.selector,
          text: n.text,
          fontSize: n.fontSize,
          fontWeight: n.fontWeight,
          isLarge,
          required,
          fg: n.fg,
          bg: bgColor,
          method,
          ratio: Math.round(ratio * 100) / 100,
          pass: ratio >= required,
        });
      }
      await context.close();
    }

    // ---- MOBILE: contrast + touch targets ----
    {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(400);
      const structure = await page.evaluate(collectStructureFn);
      structureAll.push({ path, viewport: "mobile", ...structure });
      const touch = await page.evaluate(collectTouchTargetsFn);
      touchAll.push({ path, items: touch });

      const nodes = await page.evaluate(collectTextNodesFn);
      for (const n of nodes) {
        if (!n.fg) continue;
        let bgColor = n.bg;
        let method = "analytic";
        if (n.hasComplexBg) {
          try {
            const handle = await page.$(`[data-s4-idx="${n.idx}"]`);
            const buf = await handle.screenshot();
            const sampled = samplePixelBackground(buf);
            bgColor = { r: sampled.r, g: sampled.g, b: sampled.b, a: 1 };
            method = `pixel-sample(coverage=${sampled.coverage.toFixed(2)})`;
          } catch (e) {
            method = `pixel-sample-failed: ${e.message.split("\n")[0]}`;
          }
        }
        const fgOpaque = n.fg.a < 1 ? compositeOver(n.fg, bgColor) : n.fg;
        const ratio = contrastRatio(fgOpaque, bgColor);
        const isBold = parseInt(n.fontWeight, 10) >= 700;
        const isLarge = n.fontSize >= 24 || (n.fontSize >= 18.66 && isBold);
        const required = isLarge ? 3.0 : 4.5;
        contrastAll.push({
          path,
          viewport: "mobile",
          selector: n.selector,
          text: n.text,
          fontSize: n.fontSize,
          fontWeight: n.fontWeight,
          isLarge,
          required,
          fg: n.fg,
          bg: bgColor,
          method,
          ratio: Math.round(ratio * 100) / 100,
          pass: ratio >= required,
        });
      }
      await context.close();
    }
    console.log(`done ${path}`);
  }

  await browser.close();
  fs.writeFileSync(new URL("./contrast-results.json", import.meta.url), JSON.stringify(contrastAll, null, 2));
  fs.writeFileSync(new URL("./structure-results.json", import.meta.url), JSON.stringify(structureAll, null, 2));
  fs.writeFileSync(new URL("./touch-results.json", import.meta.url), JSON.stringify(touchAll, null, 2));
  console.log("wrote contrast/structure/touch results");
}

run();
