// S4 accessibility axe scan — reads localhost:3200 (already-running prod build).
// Writes raw JSON results per page/viewport to qa/_raw/s4/axe-results.json
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

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
  "/definitely-not-real",
];

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
};

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function run() {
  const browser = await chromium.launch();
  const results = [];

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    for (const path of PAGES) {
      const context = await browser.newContext({ viewport: vp });
      const page = await context.newPage();
      const url = BASE + path;
      let status = null;
      try {
        const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        status = resp ? resp.status() : null;
        await page.waitForTimeout(500); // let any client hydration settle
        const axeResults = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        results.push({
          path,
          viewport: vpName,
          httpStatus: status,
          url,
          violations: axeResults.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            help: v.help,
            helpUrl: v.helpUrl,
            tags: v.tags,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              html: n.html,
              failureSummary: n.failureSummary,
            })),
          })),
          passes: axeResults.passes.length,
          incomplete: axeResults.incomplete.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, html: n.html })),
          })),
        });
        console.log(`OK ${vpName} ${path} status=${status} violations=${axeResults.violations.length}`);
      } catch (err) {
        results.push({ path, viewport: vpName, error: String(err) });
        console.error(`ERR ${vpName} ${path}: ${err.message}`);
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();
  fs.writeFileSync(
    new URL("./axe-results.json", import.meta.url),
    JSON.stringify(results, null, 2)
  );
  console.log("Wrote axe-results.json");
}

run();
