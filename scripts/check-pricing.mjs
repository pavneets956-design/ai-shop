// Pricing consistency guard (no dependencies) — runs as the first step of `build`.
// Prevents the two retired pricing eras ($1,000 floor / $2,500–5,000 Business band /
// $250 Care Plan) from silently returning to LIVE landing copy, and asserts that
// lib/data/packages.ts (the single source of truth) still holds the canonical numbers.
// Canonical (CAD): Starter $1,500 · Business $3,500–$7,500 · Custom $10,000 · Care $99/mo.
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");
const fail = [];

// 1) packages.ts single source of truth is intact.
const pkg = read("lib/data/packages.ts");
const soT = [
  [/id:\s*"starter"[\s\S]*?price:\s*1500/, "starter price must be 1500"],
  [/id:\s*"business"[\s\S]*?price:\s*3500/, "business price must be 3500"],
  [/id:\s*"business"[\s\S]*?priceHigh:\s*7500/, "business priceHigh must be 7500"],
  [/id:\s*"custom"[\s\S]*?price:\s*10000/, "custom price must be 10000"],
  [/monthly:\s*99/, "carePlan.monthly must be 99"],
];
for (const [re, msg] of soT) if (!re.test(pkg)) fail.push(`packages.ts: ${msg}`);

// 2) LIVE landing data must not carry the retired Business band "$2,500–5,000".
const bandFiles = [
  "lib/data/money.ts",
  "lib/data/industries.ts",
  "lib/data/_industries_b.ts",
  "components/BuildRequestForm.tsx",
];
const retiredBand = /\$2,500\s*[–—-]\s*\$?5,000/;
for (const f of bandFiles) {
  if (retiredBand.test(read(f))) {
    fail.push(`${f}: retired Business band "$2,500–5,000" found (canonical is $3,500–$7,500)`);
  }
}

// 3) Care Plan must never be priced at $250/mo in landing money/industries data
//    (the /shop managed phone plan and compare.ts market thresholds are separate and NOT scanned).
for (const f of ["lib/data/money.ts", "lib/data/industries.ts", "lib/data/_industries_b.ts"]) {
  const s = read(f);
  if (/Care Plan[\s\S]{0,50}\$250\s*\/?\s*mo/i.test(s) || /\$250\s*\/?\s*mo[\s\S]{0,50}Care Plan/i.test(s)) {
    fail.push(`${f}: Care Plan priced at $250/mo (canonical is $99/mo)`);
  }
}

if (fail.length) {
  console.error("✖ Pricing consistency check FAILED:\n" + fail.map((x) => "  - " + x).join("\n"));
  process.exit(1);
}
console.log("✓ Pricing consistency check passed (packages.ts SoT intact; no retired pricing in live landing data).");
