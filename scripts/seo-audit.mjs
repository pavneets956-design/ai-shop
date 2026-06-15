// Live SEO/AEO QA crawl. Pulls every URL from /sitemap.xml and asserts the
// on-page essentials. Run against the local production server or live.
//   node scripts/seo-audit.mjs http://localhost:3100
import fs from "node:fs";

const BASE = process.argv[2] || "http://localhost:3100";
const PROD = "https://aibuiltbyhand.com";

const out = [];
const log = (s) => {
  out.push(s);
  console.log(s);
};

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  const body = res.status === 200 ? await res.text() : "";
  return { status: res.status, body };
}

function checkPage(path, html) {
  const issues = [];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) issues.push(`H1 count = ${h1s} (want 1)`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (!title.trim()) issues.push("missing <title>");
  if (!/<meta name="description" content="[^"]+"/.test(html))
    issues.push("missing meta description");
  if (!/<link rel="canonical"/.test(html)) issues.push("missing canonical");
  if (!/application\/ld\+json/.test(html)) issues.push("missing JSON-LD");
  if (!/href="[^"]*\/create/.test(html)) issues.push("missing /create CTA");
  return { title, issues };
}

const main = async () => {
  log(`# SEO Live Audit — ${BASE}`);
  log(`Run: ${new Date().toISOString()}`);
  log("");

  // robots + sitemap + llms
  const robots = await get("/robots.txt");
  log(`- robots.txt: ${robots.status}${/Sitemap:/i.test(robots.body) ? " ✓ has Sitemap:" : " ✗ NO Sitemap line"}`);
  const llms = await get("/llms.txt");
  log(`- llms.txt: ${llms.status}${/Handbuilt/.test(llms.body) ? " ✓" : " ✗ missing brand"}`);
  const indexnow = await get("/ac88d1565466f5394f041d46f2546ce7.txt");
  log(`- IndexNow key file: ${indexnow.status}${indexnow.body.trim() === "ac88d1565466f5394f041d46f2546ce7" ? " ✓" : " ✗"}`);

  const sm = await get("/sitemap.xml");
  const urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(PROD, "")
  );
  log(`- sitemap.xml: ${sm.status}, ${urls.length} URLs`);
  log("");

  const titles = new Map();
  const failures = [];
  let ok = 0;

  for (const path of urls) {
    const { status, body } = await get(path);
    if (status !== 200) {
      failures.push(`${path} → HTTP ${status}`);
      continue;
    }
    const { title, issues } = checkPage(path, body);
    if (title) titles.set(title, [...(titles.get(title) || []), path]);
    if (issues.length) failures.push(`${path} → ${issues.join("; ")}`);
    else ok++;
  }

  // duplicate titles
  const dupes = [...titles.entries()].filter(([, paths]) => paths.length > 1);

  log(`## Results`);
  log(`- Pages crawled: ${urls.length}`);
  log(`- Clean (all checks pass): ${ok}`);
  log(`- Pages with issues: ${failures.length}`);
  log(`- Duplicate <title>s: ${dupes.length}`);
  log("");
  if (failures.length) {
    log(`### Issues`);
    failures.forEach((f) => log(`- ${f}`));
    log("");
  }
  if (dupes.length) {
    log(`### Duplicate titles`);
    dupes.forEach(([t, paths]) => log(`- "${t}" → ${paths.join(", ")}`));
    log("");
  }
  log(failures.length === 0 && dupes.length === 0 ? "ALL CHECKS PASSED ✓" : "REVIEW ISSUES ABOVE");

  fs.mkdirSync("seo", { recursive: true });
  fs.writeFileSync("seo/seo-live-audit-report.md", out.join("\n"));
};

main();
