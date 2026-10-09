import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  packages,
  carePlan,
  phonePlan,
  PHONE_PRICE_LABEL,
  PHONE_PRICE_SENTENCE,
  BUILD_AND_PHONE_PRICING,
} from "@/lib/data/packages";
import { shopProducts } from "@/lib/data/shopProducts";
import { landingGroups } from "@/lib/data/registry";
import { landingPath } from "@/lib/data/landing";
import { useCases } from "@/lib/data/useCases";
import { faqs, pricingPageFaqs } from "@/lib/data/faqs";
import { HOME_OBJECTIONS } from "@/lib/data/homeFaqs";

/**
 * REPOSITORY-WIDE PRICING CONSISTENCY.
 *
 * `tests/shop-pricing.test.ts` pins the shop catalogue. This one pins the other
 * ~240 pages, because that is where the damage actually happened: a page once
 * displayed three different prices for one package, and hand-typed figures in
 * prose drifted below the figures in `lib/data/packages.ts` — which is the only
 * price in this codebase.
 *
 * WHAT IT CHECKS. Not every dollar sign on the site: most are competitor ranges,
 * calculator worked examples, or third-party subscription costs, and those are
 * legitimately arbitrary. It checks every figure that the copy presents as
 * OUR price, found through three shapes that this repo actually uses:
 *
 *   1. the `handbuilt:` column of a comparison-table row
 *   2. "...Handbuilt ... $X" within one clause
 *   3. "starts at / starting at $X"
 *
 * Any figure caught that way must be a real number from `packages.ts`, a real
 * care-plan or shop monthly, or an explicitly named exception below.
 *
 * WHEN THIS FAILS: do not add the number to the allowlist to make it green.
 * Either the copy is wrong (fix the copy) or `packages.ts` changed (then the
 * copy should be re-derived from it).
 */

// ---------------------------------------------------------------------------
// The allowed set, DERIVED from the source of truth — never hand-typed.
// ---------------------------------------------------------------------------

const buildPrices = new Set<number>();
for (const p of packages) {
  buildPrices.add(p.price);
  if (p.priceHigh) buildPrices.add(p.priceHigh);
  if (p.priceTypical) buildPrices.add(p.priceTypical);
}

const monthlyPrices = new Set<number>();
monthlyPrices.add(carePlan.monthly);
monthlyPrices.add(carePlan.annualMonthly);
// The phone receptionist's own figures — imported, never typed here.
buildPrices.add(phonePlan.setup);
monthlyPrices.add(phonePlan.monthly);
for (const s of shopProducts) {
  if (s.monthlyPrice) monthlyPrices.add(s.monthlyPrice);
  if (s.setupPrice) buildPrices.add(s.setupPrice);
}

/**
 * Figures that appear beside the word "Handbuilt" but are NOT a Handbuilt
 * price. Each is listed with why, so the list cannot quietly become a dumping
 * ground. Reviewed 2026-08-30.
 */
const NOT_OUR_PRICE = new Map<number, string>([
  [0, "the competitor's $0 setup / free-trial column, always the `alternative` side"],
  [100, "third-party hosting + API run-rate quoted as a range, e.g. $20–$100/mo"],
  [250, "agency hourly rate ($100–$250/hr) quoted as the alternative"],
  [300, "competitor platform fees, e.g. $20–$300/mo"],
  [500, "competitor onboarding / SaaS ranges, e.g. $50–$500+/mo"],
  [1000, "the low end of a competitor monthly-retainer range ($1,000–$10,000+/mo)"],
  [1200, "a YEARLY total computed from a competitor monthly, e.g. $1,200–$6,000+"],
  [6000, "the upper end of that same computed yearly total"],
  [50, "competitor SaaS floor, e.g. $50–$500+/mo"],
  [200, "human answering services, $200–$1,500+/mo"],
]);

const CREATOR_TOOL_COMPONENT_FILE = "components/creators/CreatorStudio.tsx";

// ---------------------------------------------------------------------------

function copyFiles(): string[] {
  const out: string[] = [];
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) out.push(p);
    }
  };
  ["lib/data", "app", "components"].forEach(walk);
  return out;
}

const amount = (raw: string) => Number(raw.replace(/,/g, ""));

type Hit = { file: string; line: number; value: number; text: string };

/** Every figure the copy presents as a Handbuilt price. */
function handbuiltPriceHits(): Hit[] {
  const hits: Hit[] = [];
  const patterns: RegExp[] = [
    // 1. the `handbuilt:` column of a comparison row
    /handbuilt:\s*"([^"]*)"/gi,
    // 2. "Handbuilt ... $X" inside one clause (stop at a sentence end)
    /Handbuilt[^.!?\n]{0,90}?\$\s?([\d][\d,]*)/g,
    // 3. an explicit "starts at" claim, which is always ours
    /start(?:s|ing)? at\s*(?:CAD\s*)?\$\s?([\d][\d,]*)/gi,
  ];

  for (const file of copyFiles()) {
    const rel = file.replace(/\\/g, "/");
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const re of patterns) {
        re.lastIndex = 0;
        for (const m of line.matchAll(re)) {
          // Pattern 1 yields a whole cell; pull every figure out of it.
          const scope = /^handbuilt:/i.test(m[0]) ? m[1] : m[1];
          const nums = /^handbuilt:/i.test(m[0])
            ? [...scope.matchAll(/\$\s?([\d][\d,]*)/g)].map((x) => amount(x[1]))
            : [amount(scope)];
          for (const value of nums) {
            if (!Number.isFinite(value)) continue;
            hits.push({ file: rel, line: i + 1, value, text: line.trim().slice(0, 160) });
          }
        }
      }
    });
  }
  return hits;
}

describe("repository-wide pricing consistency", () => {
  it("packages.ts still holds the floors the owner set on 2026-08-30", () => {
    // If any of these move, every assertion below moves with them — which is
    // the point. Hard-coded here ONLY because this is the owner's stated rule,
    // and a silent downgrade of a floor is exactly what must fail.
    expect(packages.find((p) => p.id === "starter")?.price).toBe(1500);
    expect(packages.find((p) => p.id === "business")?.price).toBe(3500);
    expect(packages.find((p) => p.id === "custom")?.price).toBe(10000);
  });

  it("every figure the copy presents as a Handbuilt price is a real price", () => {
    const offenders = handbuiltPriceHits().filter((h) => {
      if (buildPrices.has(h.value)) return false;
      if (monthlyPrices.has(h.value)) return false;
      if (NOT_OUR_PRICE.has(h.value)) return false;
      return true;
    });

    const report = offenders
      .map((o) => `  ${o.file}:${o.line}  $${o.value.toLocaleString()}\n      ${o.text}`)
      .join("\n");

    expect(
      offenders,
      offenders.length
        ? `These figures read as a Handbuilt price but match nothing in packages.ts, ` +
            `carePlans, or the shop catalogue. Fix the copy — do not widen the allowlist ` +
            `unless the number genuinely belongs to a competitor or an example:\n${report}`
        : ""
    ).toEqual([]);
  });

  it("no BUILD shop SKU contradicts packages.ts", () => {
    // Build billing only. A `managed` subscription prices on a different axis
    // — the build cost is amortised into the monthly — so it is checked on
    // first-year value by the next test instead. The phone receptionist is not
    // a tier: it is pinned to phonePlan by equality in shop-pricing.test.ts,
    // never laundered through a build floor it was never meant to clear.
    for (const s of shopProducts) {
      if (s.billing === "managed") continue;
      if (!s.setupPrice) continue;
      if (s.packageId === phonePlan.id) continue;
      const floor = packages.find((p) => p.id === s.packageId)?.price;
      expect(floor, `${s.packageId} must exist in packages.ts`).toBeDefined();
      expect(
        s.setupPrice >= floor!,
        `${s.slug}: $${s.setupPrice} is below the ${s.packageId} floor of $${floor}`
      ).toBe(true);
    }
  });

  it("a managed SKU clears its tier floor on FIRST-YEAR value, not on setup alone", () => {
    // The right rule for a subscription, and the reason `managed` was exempted
    // from the build-floor test rather than fixed.
    //
    // A managed SKU can charge a $1,500 setup under a $3,500 `business` tag,
    // which reads as under-floor if you look only at the setup fee. It is not:
    // a managed system recovers the build through the monthly, so the floor a
    // subscription has to clear is setup + 12 months.
    //   ai-operations-dashboard 1500 + 12x199 = $3,888  vs $3,500 floor
    // (ai-receptionist-os was removed from the shop 2026-10-08 — it was the
    // phone receptionist at a contradictory price; see shopProducts.ts.) Enforcing the correct rule is better than
    // pinning a false alarm, and this still fails if someone ships a $99/mo
    // "connected system" with a token setup fee.
    for (const s of shopProducts) {
      if (s.billing !== "managed") continue;

      // An ADD-ON is priced on top of a host product and has no independent
      // floor — `ai-business-analyst` is "From $99/mo · add-on", launching as an
      // "Add-on to your dashboard". Its `business` packageId groups it with the
      // dashboard it attaches to; it is not a claim to be a $3,500 system. It
      // must say so in BOTH fields, so the exemption cannot be taken by a SKU
      // that merely mentions the word in passing.
      if (/add-on/i.test(s.priceLabel)) {
        expect(
          /add-on/i.test(s.timeToLaunch),
          `${s.slug} is priced as an add-on but its timeToLaunch ("${s.timeToLaunch}") does not say so`
        ).toBe(true);
        continue;
      }

      const floor = packages.find((p) => p.id === s.packageId)?.price;
      if (!floor) continue;
      const firstYear = (s.setupPrice ?? 0) + (s.monthlyPrice ?? 0) * 12;
      expect(
        firstYear >= floor,
        `${s.slug}: first-year value is $${firstYear} (setup $${s.setupPrice ?? 0} + 12 x $${
          s.monthlyPrice ?? 0
        }/mo) but the ${s.packageId} floor is $${floor}`
      ).toBe(true);
    }
  });

  it("the reactivation campaign is no longer under the starter floor", () => {
    const p = shopProducts.find((x) => x.slug === "ai-customer-reactivation");
    expect(p?.setupPrice).toBe(1500);
    // The prose on the service page must agree with the card. This is the exact
    // failure mode that produced three prices for one package.
    const services = fs.readFileSync("lib/data/_services_b.ts", "utf8");
    const block = services.slice(services.indexOf('"slug": "ai-customer-reactivation"'));
    const end = block.indexOf('"slug": "', 40);
    const scoped = end > 0 ? block.slice(0, end) : block;
    expect(scoped.includes("$500"), "the reactivation page still says $500 somewhere").toBe(false);
    expect(scoped.includes("$1,500")).toBe(true);
  });

  it("the creator tools are COMPONENT prices and the page reconciles them to the floor", () => {
    // `CreatorStudio.tsx` lists six one-time creator tools at $500–$900, which
    // reads as six prices under the $1,500 done-for-you floor. It is not a
    // contradiction: these are components, and the block ends with the
    // reconciling sentence "Bundle any three into one wired system — that's the
    // $1,500 Starter build". Three at $500 is exactly $1,500, so the component
    // ladder and the tier floor agree.
    //
    // THE REAL RISK is that reconciling sentence being edited away, leaving six
    // sub-floor numbers on a page with nothing tying them to the Starter price.
    // That is what this test guards, along with the cheapest component being no
    // lower than one-third of the floor — the price at which "bundle three"
    // stops adding up.
    const src = fs.readFileSync(CREATOR_TOOL_COMPONENT_FILE, "utf8");
    const list = src.slice(src.indexOf("const PRICES = ["));
    const values = [...list.slice(0, list.indexOf("];")).matchAll(/\$\s?([\d][\d,]*)/g)].map((m) =>
      amount(m[1])
    );
    expect(values.length, "the creator PRICES list changed shape — re-check the bundle maths").toBe(6);

    const starterFloor = packages.find((p) => p.id === "starter")!.price;
    expect(
      Math.min(...values) * 3 >= starterFloor,
      `the cheapest creator component is $${Math.min(
        ...values
      )}; three of them is less than the $${starterFloor} Starter build the page says they add up to`
    ).toBe(true);

    expect(
      src.includes("that&apos;s the $1,500 Starter build") ||
        src.includes("that's the $1,500 Starter build"),
      "the sentence reconciling the component prices to the $1,500 Starter build is gone — " +
        "without it the page shows six sub-floor prices and no explanation"
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// AI PHONE RECEPTIONIST — a distinct offer, not a build tier.
// ---------------------------------------------------------------------------

/** Landing rows the e2e phone-offer spec also targets. */
const RECEPTIONIST_SLUG = /receptionist|phone-answering|voice-agent/i;

/** Claims the approved offer does not make. Each was live on the site. */
const FORBIDDEN_RECEPTIONIST_CLAIMS: [RegExp, string][] = [
  [/no monthly (fee|contract)/i, "the receptionist has a monthly fee"],
  [/unlimited (calls|support|minutes)/i, "minutes are capped; extra minutes are charged"],
  [/provider usage (is )?(additional|charged separately)|plus (phone and AI )?provider usage/i,
    "usage for the included minutes is inside the monthly fee"],
  [/calls? (and AI usage )?included/i, "only the included minutes are; extra minutes are charged"],
  [/\$(129|250|349)\b/, "a retired receptionist monthly price"],
  [/books? (jobs|the job|appointments) (directly|in real time|into your calendar)/i,
    "booking is not included; it is quoted separately"],
  [/guarantee/i, "no outcome, uptime or job-booking guarantees"],
];

function receptionistCopy(): { where: string; text: string }[] {
  const rows: { where: string; text: string }[] = [];
  for (const g of landingGroups) {
    for (const it of g.items) {
      if (!RECEPTIONIST_SLUG.test(it.slug)) continue;
      rows.push({ where: landingPath(g.type, it.slug), text: JSON.stringify(it) });
    }
  }
  for (const u of useCases) {
    if (!RECEPTIONIST_SLUG.test(u.slug)) continue;
    rows.push({ where: `/use-cases/${u.slug}`, text: JSON.stringify(u) });
  }
  for (const p of shopProducts) {
    if (p.packageId !== phonePlan.id) continue;
    rows.push({ where: `/shop#${p.slug}`, text: JSON.stringify(p) });
  }
  return rows;
}

describe("AI phone receptionist pricing contract", () => {
  it("phonePlan holds the owner-approved launch terms", () => {
    // Hard-coded ONLY here, because this is the owner's approved offer and a
    // silent change to any term must fail loudly.
    expect(phonePlan.setup).toBe(750);
    expect(phonePlan.monthly).toBe(179);
    expect(phonePlan.includedMinutes).toBe(300);
    expect(phonePlan.overagePerMinute).toBe(0.25);
    expect(phonePlan.includedChangeMinutes).toBe(30);
    expect(phonePlan.term).toBe("month-to-month");
  });

  it("the reusable labels are derived from phonePlan and state every term", () => {
    expect(PHONE_PRICE_LABEL).toBe("$750 setup + $179/month");
    for (const part of ["$750", "$179", "300", "$0.25", "Taxes extra", "month-to-month", "Launch pricing".toLowerCase()]) {
      expect(PHONE_PRICE_SENTENCE.toLowerCase()).toContain(part.toLowerCase());
    }
    expect(BUILD_AND_PHONE_PRICING).toContain(`$${packages[0].price.toLocaleString("en-CA")}`);
    expect(BUILD_AND_PHONE_PRICING).toContain(PHONE_PRICE_LABEL);
  });

  it("the receptionist is never mixed into the build catalogue", () => {
    // It must not be a ServicePackage: that would drag the $750 setup into
    // the build floor, priceRange and every tier test.
    expect(packages.some((p) => (p.id as string) === phonePlan.id)).toBe(false);
    expect(Math.min(...packages.map((p) => p.price))).toBe(1500);
  });

  it("every receptionist landing page and use case recommends the phone offer", () => {
    const wrong: string[] = [];
    for (const g of landingGroups) {
      for (const it of g.items) {
        if (RECEPTIONIST_SLUG.test(it.slug) && it.packageId !== phonePlan.id) {
          wrong.push(`${landingPath(g.type, it.slug)} → ${it.packageId ?? "(none)"}`);
        }
      }
    }
    for (const u of useCases) {
      if (RECEPTIONIST_SLUG.test(u.slug) && u.packageId !== phonePlan.id) {
        wrong.push(`/use-cases/${u.slug} → ${u.packageId}`);
      }
    }
    expect(wrong, "these receptionist pages show a build-tier price card").toEqual([]);
  });

  it("receptionist copy makes none of the out-of-scope claims", () => {
    const hits: string[] = [];
    for (const { where, text } of receptionistCopy()) {
      for (const [re, why] of FORBIDDEN_RECEPTIONIST_CLAIMS) {
        const m = text.match(re);
        if (m) hits.push(`${where}: "${m[0]}" — ${why}`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("site and pricing FAQs quote the phone terms, not the Starter floor", () => {
    const all = [...faqs, ...pricingPageFaqs(), ...HOME_OBJECTIONS];
    const phone = all.filter((f) => /phone reception|phone receptionist/i.test(f.q + f.a));
    expect(phone.length).toBeGreaterThan(0);
    for (const f of phone) {
      expect(f.a, `"${f.q}" mentions phone reception without the $${phonePlan.monthly} fee`).toContain(
        `$${phonePlan.monthly}`
      );
      expect(f.a).not.toMatch(/provider usage/i);
    }
  });

  it("no source sentence presents the $1,500 build floor as a receptionist price", () => {
    // A sentence may mention receptionists and the build floor together only if
    // it also carries the phone terms (a PHONE_* or BUILD_AND_PHONE_* constant).
    const offenders: string[] = [];
    for (const file of copyFiles()) {
      const rel = file.replace(/\\/g, "/");
      if (rel.includes("/agent/")) continue; // dark subsystem, 404 in production
      const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
        for (const sentence of line.split(/(?<=[.!?])\s+/)) {
          if (!/receptionist/i.test(sentence)) continue;
          if (!/\$\s?1,500\b/.test(sentence)) continue;
          if (/\$\{(PHONE_|BUILD_AND_PHONE_)/.test(sentence)) continue;
          offenders.push(`${rel}:${i + 1}  ${sentence.trim().slice(0, 140)}`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });
});
