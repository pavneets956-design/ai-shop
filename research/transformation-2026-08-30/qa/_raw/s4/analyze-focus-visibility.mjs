import fs from "node:fs";
import { parseCssColor, contrastRatio } from "./lib-color.mjs";

const raw = JSON.parse(fs.readFileSync(new URL("./focus-visibility-raw.json", import.meta.url)));

function parseBoxShadowLayers(str) {
  // box-shadow computed value: comma-separated layers, each like
  // "rgb(r, g, b) 0px 0px 0px 2px" or "rgba(r,g,b,a) Xpx Ypx Zpx Wpx [inset]"
  // Split on commas NOT inside parens.
  const layers = [];
  let depth = 0, cur = "";
  for (const ch of str) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) { layers.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) layers.push(cur.trim());
  return layers.map((layer) => {
    const colorMatch = layer.match(/rgba?\([^)]+\)/i);
    const color = colorMatch ? parseCssColor(colorMatch[0]) : null;
    const nums = layer.replace(colorMatch ? colorMatch[0] : "", "").trim().split(/\s+/).filter(Boolean);
    // order: offsetX offsetY blur spread (inset if present, may appear before color)
    const spread = nums.length >= 4 ? parseFloat(nums[3]) : 0;
    const blur = nums.length >= 3 ? parseFloat(nums[2]) : 0;
    return { color, spread, blur, raw: layer };
  });
}

const report = {};
for (const [path, stops] of Object.entries(raw)) {
  const findings = [];
  for (const s of stops) {
    const bg = s.effectiveBg;
    let bestRingContrast = 0;
    let bestRingDesc = null;

    // Outline
    if (s.outlineStyle !== "none") {
      const oc = parseCssColor(s.outlineColor);
      const ow = parseFloat(s.outlineWidth);
      if (oc && ow > 0 && oc.a > 0) {
        const ratio = contrastRatio(oc, bg);
        const effRatio = ratio * oc.a + 1 * (1 - oc.a); // rough: alpha<1 dilutes toward "no contrast" (1:1)
        if (effRatio > bestRingContrast) { bestRingContrast = effRatio; bestRingDesc = `outline ${s.outlineWidth} ${s.outlineColor}`; }
      }
    }

    // Box-shadow layers (only non-inset ones with spread>0 act as a visible ring)
    if (s.boxShadowFull && s.boxShadowFull !== "none") {
      const layers = parseBoxShadowLayers(s.boxShadowFull);
      for (const layer of layers) {
        if (!layer.color) continue;
        if (layer.spread <= 0 && layer.blur <= 0) continue; // a 0/0/0/0 shadow paints nothing
        if (layer.color.a <= 0) continue; // fully transparent
        const ratio = contrastRatio(layer.color, bg);
        const effRatio = ratio * layer.color.a + 1 * (1 - layer.color.a);
        if (effRatio > bestRingContrast) { bestRingContrast = effRatio; bestRingDesc = `box-shadow ${layer.raw}`; }
      }
    }

    findings.push({
      selector: s.selector,
      text: s.text,
      rect: s.rect,
      effectiveBg: bg,
      bestRingContrast: Math.round(bestRingContrast * 100) / 100,
      bestRingDesc,
      passes3to1: bestRingContrast >= 3,
    });
  }
  report[path] = findings;
}

fs.writeFileSync(new URL("./focus-visibility-analysis.json", import.meta.url), JSON.stringify(report, null, 2));

for (const [path, findings] of Object.entries(report)) {
  const fails = findings.filter((f) => !f.passes3to1);
  console.log(`${path}: ${findings.length} stops, ${fails.length} with focus-ring contrast < 3:1`);
  for (const f of fails.slice(0, 30)) {
    console.log("  ", f.selector, JSON.stringify(f.text), "ring=" + f.bestRingContrast + ":1", f.bestRingDesc, "bg=" + JSON.stringify(f.effectiveBg));
  }
}
