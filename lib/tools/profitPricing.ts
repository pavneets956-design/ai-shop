// Contractor Profit & Pricing calculator — pure, deterministic, zero-token.
// Explains markup vs margin correctly and models cost-overrun risk.
import { clampNonNeg, round2, safeNum } from "./format";

export interface ProfitPricingInput {
  materials: number;
  laborHours: number;
  /** Employee cost per hour (loaded rate the contractor pays). */
  laborRate: number;
  subcontractor: number;
  equipment: number;
  /** Travel, disposal, permits, misc. */
  otherCosts: number;
  /** Allocated overhead (dollars) for this job. */
  overhead: number;
  contingencyPct: number;
  /** Desired NET margin on the selling price (%). */
  desiredMarginPct: number;
  /** Optional price the contractor is considering quoting. */
  proposedPrice?: number;
  currency?: string;
}

export type PriceVerdict = "below-cost" | "below-target" | "on-target" | "above-target";

export interface ProposedEval {
  price: number;
  profit: number;
  marginPct: number;
  markupPct: number;
  verdict: PriceVerdict;
  message: string;
}

export interface OverrunScenario {
  overrunPct: number;
  jobCost: number;
  profit: number;
  margin: number;
}

export interface ProfitPricingResult {
  laborCost: number;
  directCost: number;
  overhead: number;
  contingencyAmount: number;
  totalJobCost: number;
  breakEvenPrice: number;
  recommendedPrice: number;
  recommendedProfit: number;
  recommendedMargin: number;
  equivalentMarkupPct: number;
  proposed?: ProposedEval;
  overruns: OverrunScenario[];
  warnings: string[];
}

/** margin (profit/price) → markup (profit/cost), both as percentages. */
export function marginToMarkup(marginPct: number): number {
  const m = clampNonNeg(marginPct) / 100;
  if (m >= 1) return 0; // undefined; callers clamp margin below 100% first
  return round2((m / (1 - m)) * 100);
}

/** markup (profit/cost) → margin (profit/price), both as percentages. */
export function markupToMargin(markupPct: number): number {
  const k = clampNonNeg(markupPct) / 100;
  return round2((k / (1 + k)) * 100);
}

const MAX_MARGIN = 95;

export function computeProfitPricing(input: ProfitPricingInput): ProfitPricingResult {
  const warnings: string[] = [];

  const costFields = [
    input.materials, input.laborHours, input.laborRate, input.subcontractor,
    input.equipment, input.otherCosts, input.overhead, input.contingencyPct,
  ];
  if (costFields.some((v) => safeNum(v) < 0)) {
    warnings.push("Negative inputs were treated as 0.");
  }

  const materials = clampNonNeg(input.materials);
  const laborHours = clampNonNeg(input.laborHours);
  const laborRate = clampNonNeg(input.laborRate);
  const subcontractor = clampNonNeg(input.subcontractor);
  const equipment = clampNonNeg(input.equipment);
  const otherCosts = clampNonNeg(input.otherCosts);
  const overhead = clampNonNeg(input.overhead);
  const contingencyPct = clampNonNeg(input.contingencyPct);

  let desiredMarginPct = clampNonNeg(input.desiredMarginPct);
  if (desiredMarginPct >= 100) {
    warnings.push("Desired margin capped at 95% — a 100%+ margin is mathematically impossible.");
    desiredMarginPct = MAX_MARGIN;
  } else if (desiredMarginPct > MAX_MARGIN) {
    warnings.push("Desired margin above 95% was capped to keep the recommended price realistic.");
    desiredMarginPct = MAX_MARGIN;
  }

  const laborCost = round2(laborHours * laborRate);
  const directCost = round2(materials + laborCost + subcontractor + equipment + otherCosts);
  const baseCost = round2(directCost + overhead);
  const contingencyAmount = round2(baseCost * (contingencyPct / 100));
  const totalJobCost = round2(baseCost + contingencyAmount);
  const breakEvenPrice = totalJobCost;

  const m = desiredMarginPct / 100;
  const recommendedPrice = round2(totalJobCost / (1 - m));
  const recommendedProfit = round2(recommendedPrice - totalJobCost);
  const recommendedMargin = desiredMarginPct;
  const equivalentMarkupPct = marginToMarkup(desiredMarginPct);

  let proposed: ProposedEval | undefined;
  const hasProposed =
    input.proposedPrice !== undefined &&
    input.proposedPrice !== null &&
    Number.isFinite(safeNum(input.proposedPrice, NaN));
  if (hasProposed) {
    const price = clampNonNeg(input.proposedPrice);
    const profit = round2(price - totalJobCost);
    const marginPct = price > 0 ? round2((profit / price) * 100) : 0;
    const markupPct = totalJobCost > 0 ? round2((profit / totalJobCost) * 100) : 0;
    let verdict: PriceVerdict;
    let message: string;
    if (profit < 0) {
      verdict = "below-cost";
      message = "This price is below your true job cost — you would lose money on this job.";
    } else if (marginPct < desiredMarginPct - 1) {
      verdict = "below-target";
      message = `This price earns a ${marginPct}% margin, under your ${desiredMarginPct}% target.`;
    } else if (marginPct <= desiredMarginPct + 1) {
      verdict = "on-target";
      message = `This price is right on your ${desiredMarginPct}% target margin.`;
    } else {
      verdict = "above-target";
      message = `This price earns a ${marginPct}% margin, above your ${desiredMarginPct}% target — check it stays competitive.`;
    }
    proposed = { price, profit, marginPct, markupPct, verdict, message };
  }

  const sellPrice = proposed ? proposed.price : recommendedPrice;
  const overruns: OverrunScenario[] = [10, 20, 30].map((overrunPct) => {
    const jobCost = round2(totalJobCost * (1 + overrunPct / 100));
    const profit = round2(sellPrice - jobCost);
    const margin = sellPrice > 0 ? round2((profit / sellPrice) * 100) : 0;
    return { overrunPct, jobCost, profit, margin };
  });

  return {
    laborCost,
    directCost,
    overhead,
    contingencyAmount,
    totalJobCost,
    breakEvenPrice,
    recommendedPrice,
    recommendedProfit,
    recommendedMargin,
    equivalentMarkupPct,
    proposed,
    overruns,
    warnings,
  };
}
