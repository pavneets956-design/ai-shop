"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { computeMissedCall, type MissedCallInput } from "@/lib/tools/missedCall";
import { formatCurrency, formatNumber, formatPercent, safeNum } from "@/lib/tools/format";
import { encodeToolState, decodeToolState } from "@/lib/tools/urlState";
import { trackTool } from "@/lib/track";
import { toolCtaHref, getFreeTool } from "@/lib/data/freeTools";
import {
  CalculatorLayout, FieldGrid, CurrencyField, NumberField, PercentField, SelectField,
  ResultsRegion, ResultCard, ResultStat, ResultBanner, ScenarioTable,
  CopyButton, PrintButton, ResetButton, ShareButton,
} from "../ui";
import { ToolResultCta } from "../ToolCta";

const SLUG = "missed-call-revenue-calculator";

const DEFAULTS = {
  callsPerPeriod: "", period: "week", missedPct: "", genuinePct: "", closeRate: "",
  avgJobValue: "", currentAnsweringCost: "", recoverableRate: "", aiSetupCost: "", currency: "CAD",
};
type FormState = typeof DEFAULTS;

const URL_MAP = {
  cpp: "number", per: "string", mis: "number", gen: "number", clo: "number",
  ajv: "number", cac: "number", rec: "number", set: "number", cur: "string",
} as const;

const scenarioLabel: Record<string, string> = {
  conservative: "Conservative", likely: "Likely", optimistic: "Optimistic",
};

export default function MissedCallCalculator() {
  const [f, setF] = useState<FormState>(DEFAULTS);
  const set = (k: keyof FormState) => (v: string) => setF((s) => ({ ...s, [k]: v }));
  const tracked = useRef(false);

  useEffect(() => {
    const d = decodeToolState(window.location.search.replace(/^\?/, ""), URL_MAP);
    if (Object.keys(d).length === 0) return;
    setF((s) => ({
      ...s,
      callsPerPeriod: d.cpp != null ? String(d.cpp) : s.callsPerPeriod,
      period: d.per === "month" ? "month" : "week",
      missedPct: d.mis != null ? String(d.mis) : s.missedPct,
      genuinePct: d.gen != null ? String(d.gen) : s.genuinePct,
      closeRate: d.clo != null ? String(d.clo) : s.closeRate,
      avgJobValue: d.ajv != null ? String(d.ajv) : s.avgJobValue,
      currentAnsweringCost: d.cac != null ? String(d.cac) : s.currentAnsweringCost,
      recoverableRate: d.rec != null ? String(d.rec) : s.recoverableRate,
      aiSetupCost: d.set != null ? String(d.set) : s.aiSetupCost,
      currency: d.cur === "USD" ? "USD" : "CAD",
    }));
  }, []);

  const input: MissedCallInput = useMemo(
    () => ({
      callsPerPeriod: safeNum(f.callsPerPeriod), period: f.period === "month" ? "month" : "week",
      missedPct: safeNum(f.missedPct), genuinePct: safeNum(f.genuinePct), closeRate: safeNum(f.closeRate),
      avgJobValue: safeNum(f.avgJobValue), currentAnsweringCost: safeNum(f.currentAnsweringCost),
      recoverableRate: safeNum(f.recoverableRate),
      aiSetupCost: f.aiSetupCost.trim() === "" ? undefined : safeNum(f.aiSetupCost), currency: f.currency,
    }),
    [f]
  );
  const r = useMemo(() => computeMissedCall(input), [input]);
  const cur = f.currency;
  const money = (n: number) => formatCurrency(n, cur);

  useEffect(() => {
    if (!tracked.current && r.revenueAtRiskMonthly > 0) {
      tracked.current = true;
      trackTool("tool_calculated", { tool: SLUG });
    }
  }, [r.revenueAtRiskMonthly]);

  function share() {
    const qs = encodeToolState({
      cpp: input.callsPerPeriod, per: input.period === "month" ? "month" : "", mis: input.missedPct,
      gen: input.genuinePct, clo: input.closeRate, ajv: input.avgJobValue, cac: input.currentAnsweringCost,
      rec: input.recoverableRate, set: input.aiSetupCost, cur: cur === "USD" ? "USD" : "",
    });
    const path = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", path);
    navigator.clipboard?.writeText(window.location.origin + path).catch(() => {});
    trackTool("tool_shared", { tool: SLUG });
  }

  const likely = r.scenarios.find((s) => s.key === "likely");
  const hasResult = r.revenueAtRiskMonthly > 0;
  const summary = [
    `Missed-call revenue — ${cur}`,
    `Missed calls/mo: ${formatNumber(r.missedCallsPerMonth)}  ·  Qualified leads: ${formatNumber(r.missedQualifiedLeads)}`,
    `Jobs lost/mo: ${formatNumber(r.jobsLostPerMonth)}`,
    `Revenue at risk: ${money(r.revenueAtRiskMonthly)}/mo (${money(r.revenueAtRiskAnnual)}/yr)`,
    likely ? `Likely recovery: ${money(likely.recoveredRevenueMonthly)}/mo` : "",
    r.paybackMonths > 0 ? `Payback on setup: ~${r.paybackMonths} months` : "",
  ].filter(Boolean).join("\n");

  const entry = getFreeTool(SLUG)!;

  return (
    <CalculatorLayout
      form={
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <FieldGrid>
            <NumberField label="Calls you get" value={f.callsPerPeriod} onChange={set("callsPerPeriod")} hint="Total incoming" />
            <SelectField label="Per" value={f.period} onChange={set("period")} options={[{ value: "week", label: "Per week" }, { value: "month", label: "Per month" }]} />
            <PercentField label="% you miss" value={f.missedPct} onChange={set("missedPct")} />
            <PercentField label="% genuine prospects" value={f.genuinePct} onChange={set("genuinePct")} hint="Of missed calls" />
            <PercentField label="Your close rate" value={f.closeRate} onChange={set("closeRate")} />
            <CurrencyField label="Average job value" value={f.avgJobValue} onChange={set("avgJobValue")} />
            <PercentField label="% you could recover" value={f.recoverableRate} onChange={set("recoverableRate")} hint="With call answering" />
            <CurrencyField label="Current answering cost" value={f.currentAnsweringCost} onChange={set("currentAnsweringCost")} hint="Per month, optional" />
            <CurrencyField label="AI receptionist setup" value={f.aiSetupCost} onChange={set("aiSetupCost")} hint="Optional — for payback" />
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
                <ResultStat label="Missed calls / month" value={formatNumber(r.missedCallsPerMonth)} />
                <ResultStat label="Missed qualified leads" value={formatNumber(r.missedQualifiedLeads)} />
                <ResultStat label="Jobs lost / month" value={formatNumber(r.jobsLostPerMonth)} />
                <ResultStat label="Revenue at risk / month" value={money(r.revenueAtRiskMonthly)} sub={`${money(r.revenueAtRiskAnnual)} / year`} emphasis />
              </div>
            </ResultCard>

            {hasResult && (
              <ResultCard>
                <h3 className="text-tiny-label font-mono uppercase tracking-wider text-muted">If you recover missed calls</h3>
                <div className="mt-3">
                  <ScenarioTable
                    caption="Recovered revenue by scenario"
                    columns={["Scenario", "Recovery", "Per month", "Per year"]}
                    rows={r.scenarios.map((s) => [
                      scenarioLabel[s.key],
                      formatPercent(s.rate, 0),
                      { text: money(s.recoveredRevenueMonthly), tone: "good" },
                      money(s.recoveredRevenueAnnual),
                    ])}
                  />
                </div>
                <p className="mt-3 text-tiny-label text-muted">Recovery rates flex your own estimate — conservative 0.6×, likely 1×, optimistic 1.4× (capped at 100%).</p>
              </ResultCard>
            )}

            {r.paybackMonths > 0 && (
              <ResultBanner tone="good">
                <span className="font-semibold">Break-even:</span> about {r.jobsToBreakEven} recovered job{r.jobsToBreakEven === 1 ? "" : "s"} covers the setup cost — an estimated payback of ~{r.paybackMonths} month{r.paybackMonths === 1 ? "" : "s"} at the likely scenario.
              </ResultBanner>
            )}
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
