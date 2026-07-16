"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { computeProfitPricing, type ProfitPricingInput } from "@/lib/tools/profitPricing";
import { formatCurrency, formatPercent, safeNum } from "@/lib/tools/format";
import { encodeToolState, decodeToolState } from "@/lib/tools/urlState";
import { trackTool } from "@/lib/track";
import { toolCtaHref, getFreeTool } from "@/lib/data/freeTools";
import {
  CalculatorLayout, FieldGrid, CurrencyField, NumberField, PercentField, SelectField,
  ResultsRegion, ResultCard, ResultStat, ResultBanner, ScenarioTable,
  CopyButton, PrintButton, ResetButton, ShareButton,
} from "../ui";
import { ToolResultCta } from "../ToolCta";

const SLUG = "contractor-profit-pricing-calculator";

const DEFAULTS = {
  materials: "", laborHours: "", laborRate: "", subcontractor: "", equipment: "",
  otherCosts: "", overhead: "", contingencyPct: "10", desiredMarginPct: "30",
  proposedPrice: "", currency: "CAD",
};
type FormState = typeof DEFAULTS;

const URL_MAP = {
  mat: "number", lh: "number", lr: "number", sub: "number", eq: "number",
  oth: "number", ovh: "number", con: "number", mar: "number", pp: "number", cur: "string",
} as const;

export default function ProfitPricingCalculator() {
  const [f, setF] = useState<FormState>(DEFAULTS);
  const set = (k: keyof FormState) => (v: string) => setF((s) => ({ ...s, [k]: v }));
  const tracked = useRef(false);

  // Hydrate from a shared URL (non-sensitive numbers only).
  useEffect(() => {
    const d = decodeToolState(window.location.search.replace(/^\?/, ""), URL_MAP);
    if (Object.keys(d).length === 0) return;
    setF((s) => ({
      ...s,
      materials: d.mat != null ? String(d.mat) : s.materials,
      laborHours: d.lh != null ? String(d.lh) : s.laborHours,
      laborRate: d.lr != null ? String(d.lr) : s.laborRate,
      subcontractor: d.sub != null ? String(d.sub) : s.subcontractor,
      equipment: d.eq != null ? String(d.eq) : s.equipment,
      otherCosts: d.oth != null ? String(d.oth) : s.otherCosts,
      overhead: d.ovh != null ? String(d.ovh) : s.overhead,
      contingencyPct: d.con != null ? String(d.con) : s.contingencyPct,
      desiredMarginPct: d.mar != null ? String(d.mar) : s.desiredMarginPct,
      proposedPrice: d.pp != null ? String(d.pp) : s.proposedPrice,
      currency: d.cur === "USD" ? "USD" : "CAD",
    }));
  }, []);

  const input: ProfitPricingInput = useMemo(
    () => ({
      materials: safeNum(f.materials), laborHours: safeNum(f.laborHours), laborRate: safeNum(f.laborRate),
      subcontractor: safeNum(f.subcontractor), equipment: safeNum(f.equipment), otherCosts: safeNum(f.otherCosts),
      overhead: safeNum(f.overhead), contingencyPct: safeNum(f.contingencyPct), desiredMarginPct: safeNum(f.desiredMarginPct),
      proposedPrice: f.proposedPrice.trim() === "" ? undefined : safeNum(f.proposedPrice), currency: f.currency,
    }),
    [f]
  );
  const r = useMemo(() => computeProfitPricing(input), [input]);
  const cur = f.currency;
  const money = (n: number, whole = false) => formatCurrency(n, cur, whole);

  useEffect(() => {
    if (!tracked.current && r.totalJobCost > 0) {
      tracked.current = true;
      trackTool("tool_calculated", { tool: SLUG });
    }
  }, [r.totalJobCost]);

  function share() {
    const qs = encodeToolState({
      mat: input.materials, lh: input.laborHours, lr: input.laborRate, sub: input.subcontractor,
      eq: input.equipment, oth: input.otherCosts, ovh: input.overhead, con: input.contingencyPct,
      mar: input.desiredMarginPct, pp: input.proposedPrice, cur: cur === "USD" ? "USD" : "",
    });
    const path = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", path);
    navigator.clipboard?.writeText(window.location.origin + path).catch(() => {});
    trackTool("tool_shared", { tool: SLUG });
  }

  const summary = [
    `Contractor pricing — ${cur}`,
    `True job cost: ${money(r.totalJobCost)}`,
    `Break-even price: ${money(r.breakEvenPrice)}`,
    `Recommended price (${formatPercent(r.recommendedMargin, 0)} margin): ${money(r.recommendedPrice)}`,
    `Profit: ${money(r.recommendedProfit)}  ·  Markup: ${formatPercent(r.equivalentMarkupPct)}`,
    r.proposed ? `Your price ${money(r.proposed.price)}: ${r.proposed.message}` : "",
  ].filter(Boolean).join("\n");

  const hasResult = r.totalJobCost > 0 || r.directCost > 0;
  const proposedTone = r.proposed
    ? r.proposed.verdict === "on-target" || r.proposed.verdict === "above-target" ? "good" : "warn"
    : "neutral";
  const entry = getFreeTool(SLUG)!;

  return (
    <CalculatorLayout
      form={
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <FieldGrid>
            <CurrencyField label="Materials" value={f.materials} onChange={set("materials")} />
            <CurrencyField label="Subcontractors" value={f.subcontractor} onChange={set("subcontractor")} />
            <NumberField label="Labour hours" value={f.laborHours} onChange={set("laborHours")} hint="Employee hours on the job" />
            <CurrencyField label="Labour cost / hour" value={f.laborRate} onChange={set("laborRate")} hint="Loaded cost, not just wage" />
            <CurrencyField label="Equipment / rentals" value={f.equipment} onChange={set("equipment")} />
            <CurrencyField label="Travel, permits, disposal, misc" value={f.otherCosts} onChange={set("otherCosts")} />
            <CurrencyField label="Allocated overhead" value={f.overhead} onChange={set("overhead")} />
            <PercentField label="Contingency" value={f.contingencyPct} onChange={set("contingencyPct")} />
            <PercentField label="Target profit margin" value={f.desiredMarginPct} onChange={set("desiredMarginPct")} />
            <CurrencyField label="Price you're considering" value={f.proposedPrice} onChange={set("proposedPrice")} hint="Optional" />
          </FieldGrid>
          <SelectField
            label="Currency"
            value={f.currency}
            onChange={set("currency")}
            options={[{ value: "CAD", label: "CAD ($)" }, { value: "USD", label: "USD ($)" }]}
          />
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
                <ResultStat label="True job cost" value={money(r.totalJobCost)} sub={`incl. ${money(r.contingencyAmount)} contingency`} />
                <ResultStat label="Break-even price" value={money(r.breakEvenPrice)} />
                <ResultStat label={`Recommended price`} value={money(r.recommendedPrice)} sub={`at ${formatPercent(r.recommendedMargin, 0)} margin`} emphasis />
                <ResultStat label="Profit" value={money(r.recommendedProfit)} sub={`${formatPercent(r.equivalentMarkupPct)} markup`} />
              </div>
            </ResultCard>

            {r.proposed && (
              <ResultBanner tone={proposedTone}>
                <span className="font-semibold">Your price {money(r.proposed.price)}:</span> {r.proposed.message}{" "}
                <span className="text-muted">({formatPercent(r.proposed.marginPct)} margin · {formatPercent(r.proposed.markupPct)} markup)</span>
              </ResultBanner>
            )}

            {hasResult && (
              <ResultCard>
                <h3 className="text-tiny-label font-mono uppercase tracking-wider text-muted">If costs run over</h3>
                <div className="mt-3">
                  <ScenarioTable
                    caption="Profit and margin if job costs overrun"
                    columns={["Overrun", "Job cost", "Profit", "Margin"]}
                    rows={r.overruns.map((o) => [
                      `+${o.overrunPct}%`,
                      money(o.jobCost),
                      { text: money(o.profit), tone: o.profit < 0 ? "warn" : "good" },
                      { text: formatPercent(o.margin), tone: o.profit < 0 ? "warn" : "good" },
                    ])}
                  />
                </div>
              </ResultCard>
            )}

            {r.warnings.length > 0 && (
              <ResultBanner tone="warn">
                <ul className="space-y-1">
                  {r.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
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
