"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { computeLaborBurden, type LaborBurdenInput } from "@/lib/tools/laborBurden";
import { formatCurrency, formatPercent, safeNum } from "@/lib/tools/format";
import { encodeToolState, decodeToolState } from "@/lib/tools/urlState";
import { trackTool } from "@/lib/track";
import { toolCtaHref, getFreeTool } from "@/lib/data/freeTools";
import {
  CalculatorLayout, FieldGrid, CurrencyField, NumberField, PercentField, SelectField,
  ResultsRegion, ResultCard, ResultStat, ResultBanner,
  CopyButton, PrintButton, ResetButton, ShareButton,
} from "../ui";
import { ToolResultCta } from "../ToolCta";

const SLUG = "contractor-labor-burden-calculator";

const DEFAULTS = {
  baseWage: "", payrollTaxPct: "", workersCompPct: "", benefitsPct: "", vacationPct: "",
  statHolidayPct: "", otherAnnualCost: "", paidHoursPerYear: "2080", billableHoursPerYear: "1600",
  overheadPct: "", desiredMarginPct: "25", proposedBillRate: "", currency: "CAD",
};
type FormState = typeof DEFAULTS;

const URL_MAP = {
  bw: "number", pt: "number", wc: "number", ben: "number", vac: "number", stat: "number",
  oth: "number", ph: "number", bh: "number", ovh: "number", mar: "number", pr: "number", cur: "string",
} as const;

export default function LaborBurdenCalculator() {
  const [f, setF] = useState<FormState>(DEFAULTS);
  const set = (k: keyof FormState) => (v: string) => setF((s) => ({ ...s, [k]: v }));
  const tracked = useRef(false);

  useEffect(() => {
    const d = decodeToolState(window.location.search.replace(/^\?/, ""), URL_MAP);
    if (Object.keys(d).length === 0) return;
    setF((s) => ({
      ...s,
      baseWage: d.bw != null ? String(d.bw) : s.baseWage,
      payrollTaxPct: d.pt != null ? String(d.pt) : s.payrollTaxPct,
      workersCompPct: d.wc != null ? String(d.wc) : s.workersCompPct,
      benefitsPct: d.ben != null ? String(d.ben) : s.benefitsPct,
      vacationPct: d.vac != null ? String(d.vac) : s.vacationPct,
      statHolidayPct: d.stat != null ? String(d.stat) : s.statHolidayPct,
      otherAnnualCost: d.oth != null ? String(d.oth) : s.otherAnnualCost,
      paidHoursPerYear: d.ph != null ? String(d.ph) : s.paidHoursPerYear,
      billableHoursPerYear: d.bh != null ? String(d.bh) : s.billableHoursPerYear,
      overheadPct: d.ovh != null ? String(d.ovh) : s.overheadPct,
      desiredMarginPct: d.mar != null ? String(d.mar) : s.desiredMarginPct,
      proposedBillRate: d.pr != null ? String(d.pr) : s.proposedBillRate,
      currency: d.cur === "USD" ? "USD" : "CAD",
    }));
  }, []);

  const input: LaborBurdenInput = useMemo(
    () => ({
      baseWage: safeNum(f.baseWage), payrollTaxPct: safeNum(f.payrollTaxPct), workersCompPct: safeNum(f.workersCompPct),
      benefitsPct: safeNum(f.benefitsPct), vacationPct: safeNum(f.vacationPct), statHolidayPct: safeNum(f.statHolidayPct),
      otherAnnualCost: safeNum(f.otherAnnualCost), paidHoursPerYear: safeNum(f.paidHoursPerYear),
      billableHoursPerYear: safeNum(f.billableHoursPerYear), overheadPct: safeNum(f.overheadPct),
      desiredMarginPct: safeNum(f.desiredMarginPct),
      proposedBillRate: f.proposedBillRate.trim() === "" ? undefined : safeNum(f.proposedBillRate), currency: f.currency,
    }),
    [f]
  );
  const r = useMemo(() => computeLaborBurden(input), [input]);
  const cur = f.currency;
  const money = (n: number) => formatCurrency(n, cur);

  useEffect(() => {
    if (!tracked.current && r.totalAnnualCost > 0) {
      tracked.current = true;
      trackTool("tool_calculated", { tool: SLUG });
    }
  }, [r.totalAnnualCost]);

  function share() {
    const qs = encodeToolState({
      bw: input.baseWage, pt: input.payrollTaxPct, wc: input.workersCompPct, ben: input.benefitsPct,
      vac: input.vacationPct, stat: input.statHolidayPct, oth: input.otherAnnualCost, ph: input.paidHoursPerYear,
      bh: input.billableHoursPerYear, ovh: input.overheadPct, mar: input.desiredMarginPct,
      pr: input.proposedBillRate, cur: cur === "USD" ? "USD" : "",
    });
    const path = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", path);
    navigator.clipboard?.writeText(window.location.origin + path).catch(() => {});
    trackTool("tool_shared", { tool: SLUG });
  }

  const proposedTone = r.proposed
    ? r.proposed.verdict === "on-target" || r.proposed.verdict === "above-target" ? "good" : "warn"
    : "neutral";
  const summary = [
    `Labour burden — ${cur}`,
    `True hourly cost: ${money(r.trueHourlyCost)}  (burden ${formatPercent(r.burdenPercentage)})`,
    `Cost per billable hour: ${money(r.costPerBillableHour)}`,
    `Break-even bill rate: ${money(r.breakEvenBillRate)}`,
    `Recommended bill rate: ${money(r.recommendedBillRate)} (${formatPercent(r.recommendedMargin, 0)} margin)`,
    r.proposed ? `Your rate ${money(r.proposed.rate)}: ${r.proposed.message}` : "",
  ].filter(Boolean).join("\n");
  const entry = getFreeTool(SLUG)!;

  return (
    <CalculatorLayout
      form={
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <CurrencyField label="Base hourly wage" value={f.baseWage} onChange={set("baseWage")} />
          <p className="text-tiny-label font-mono uppercase tracking-wider text-muted">Burden (your own % of wage)</p>
          <FieldGrid>
            <PercentField label="Payroll taxes" value={f.payrollTaxPct} onChange={set("payrollTaxPct")} />
            <PercentField label="Workers' comp" value={f.workersCompPct} onChange={set("workersCompPct")} />
            <PercentField label="Benefits" value={f.benefitsPct} onChange={set("benefitsPct")} />
            <PercentField label="Vacation / PTO" value={f.vacationPct} onChange={set("vacationPct")} />
            <PercentField label="Stat holidays" value={f.statHolidayPct} onChange={set("statHolidayPct")} />
            <CurrencyField label="Insurance, tools, vehicle (annual)" value={f.otherAnnualCost} onChange={set("otherAnnualCost")} />
          </FieldGrid>
          <p className="text-tiny-label font-mono uppercase tracking-wider text-muted">Hours &amp; targets</p>
          <FieldGrid>
            <NumberField label="Paid hours / year" value={f.paidHoursPerYear} onChange={set("paidHoursPerYear")} hint="e.g. 2080 full-time" />
            <NumberField label="Billable hours / year" value={f.billableHoursPerYear} onChange={set("billableHoursPerYear")} hint="Productive, always fewer" />
            <PercentField label="Overhead" value={f.overheadPct} onChange={set("overheadPct")} />
            <PercentField label="Target profit margin" value={f.desiredMarginPct} onChange={set("desiredMarginPct")} />
            <CurrencyField label="A rate you're considering" value={f.proposedBillRate} onChange={set("proposedBillRate")} hint="Optional, per hour" />
          </FieldGrid>
          <SelectField label="Currency" value={f.currency} onChange={set("currency")} options={[{ value: "CAD", label: "CAD ($)" }, { value: "USD", label: "USD ($)" }]} />
          <div className="flex flex-wrap gap-2 pt-1">
            <ResetButton onClick={() => setF(DEFAULTS)} />
            <ShareButton onShare={share} />
          </div>
        </form>
      }
      results={
        <ResultsRegion className="space-y-4">
          <div className="print-area space-y-4">
            <ResultCard>
              <div className="grid grid-cols-2 gap-3">
                <ResultStat label="True hourly cost" value={money(r.trueHourlyCost)} sub={`${formatPercent(r.burdenPercentage)} burden`} />
                <ResultStat label="Cost per billable hour" value={money(r.costPerBillableHour)} />
                <ResultStat label="Recommended bill rate" value={money(r.recommendedBillRate)} sub={`at ${formatPercent(r.recommendedMargin, 0)} margin`} emphasis />
                <ResultStat label="Profit / billable hour" value={money(r.profitPerBillableHour)} sub={`break-even ${money(r.breakEvenBillRate)}`} />
              </div>
              <p className="mt-3 text-tiny-label text-muted">Annual cost of this employee: {money(r.annualEmployeeCost)}</p>
            </ResultCard>

            {r.proposed && (
              <ResultBanner tone={proposedTone}>
                <span className="font-semibold">Your rate {money(r.proposed.rate)}:</span> {r.proposed.message}{" "}
                <span className="text-muted">({money(r.proposed.profitPerHour)}/hr profit · {formatPercent(r.proposed.marginPct)} margin)</span>
              </ResultBanner>
            )}

            {r.warnings.length > 0 && (
              <ResultBanner tone="warn">
                <ul className="space-y-1">{r.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul>
              </ResultBanner>
            )}
            <p className="text-tiny-label text-muted">Planning tool only — not payroll, tax or legal advice. Verify rates with your accountant.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <CopyButton text={summary} label="Copy results" />
            <PrintButton />
          </div>

          <ToolResultCta href={toolCtaHref(entry)} slug={SLUG} heading={entry.ctaHeading} body={entry.ctaBody} label={entry.ctaLabel} />
        </ResultsRegion>
      }
    />
  );
}
