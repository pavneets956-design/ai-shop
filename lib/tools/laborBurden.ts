// Contractor Labor Burden calculator — pure, deterministic. The user supplies
// their own percentages/allocations; no province-specific legal rates are
// hardcoded. A planning tool, not payroll or legal advice.
import { clampNonNeg, round2, safeNum } from "./format";

export interface LaborBurdenInput {
  baseWage: number;
  payrollTaxPct: number;
  workersCompPct: number;
  benefitsPct: number;
  vacationPct: number;
  statHolidayPct: number;
  /** Annual $ allocation: insurance + tools/vehicle/uniform/training. */
  otherAnnualCost: number;
  /** Paid hours per year (default 2080). */
  paidHoursPerYear?: number;
  /** Productive/billable hours per year (default 1600). */
  billableHoursPerYear?: number;
  overheadPct: number;
  desiredMarginPct: number;
  proposedBillRate?: number;
  currency?: string;
}

export type RateVerdict = "below-cost" | "below-target" | "on-target" | "above-target";

export interface ProposedRateEval {
  rate: number;
  profitPerHour: number;
  marginPct: number;
  verdict: RateVerdict;
  message: string;
}

export interface LaborBurdenResult {
  paidHoursPerYear: number;
  billableHoursPerYear: number;
  burdenPct: number;
  trueHourlyCost: number;
  annualEmployeeCost: number;
  totalAnnualCost: number;
  burdenPercentage: number;
  costPerBillableHour: number;
  breakEvenBillRate: number;
  recommendedBillRate: number;
  recommendedMargin: number;
  profitPerBillableHour: number;
  proposed?: ProposedRateEval;
  warnings: string[];
}

const MAX_MARGIN = 95;

export function computeLaborBurden(input: LaborBurdenInput): LaborBurdenResult {
  const warnings: string[] = [];

  const wageFields = [
    input.baseWage, input.payrollTaxPct, input.workersCompPct, input.benefitsPct,
    input.vacationPct, input.statHolidayPct, input.otherAnnualCost, input.overheadPct,
  ];
  if (wageFields.some((v) => safeNum(v) < 0)) warnings.push("Negative inputs were treated as 0.");

  const baseWage = clampNonNeg(input.baseWage);
  const otherAnnualCost = clampNonNeg(input.otherAnnualCost);
  const overheadPct = clampNonNeg(input.overheadPct);
  const paidHours = clampNonNeg(input.paidHoursPerYear ?? 2080);
  const billableHours = clampNonNeg(input.billableHoursPerYear ?? 1600);

  const burdenPct =
    clampNonNeg(input.payrollTaxPct) +
    clampNonNeg(input.workersCompPct) +
    clampNonNeg(input.benefitsPct) +
    clampNonNeg(input.vacationPct) +
    clampNonNeg(input.statHolidayPct);

  let desiredMarginPct = clampNonNeg(input.desiredMarginPct);
  if (desiredMarginPct >= 100) {
    warnings.push("Desired margin capped at 95% — a 100%+ margin is mathematically impossible.");
    desiredMarginPct = MAX_MARGIN;
  } else if (desiredMarginPct > MAX_MARGIN) {
    warnings.push("Desired margin above 95% was capped to keep the recommended rate realistic.");
    desiredMarginPct = MAX_MARGIN;
  }

  const annualWage = baseWage * paidHours;
  const annualBurdenDollars = annualWage * (burdenPct / 100) + otherAnnualCost;
  const totalAnnualCost = annualWage + annualBurdenDollars;

  const trueHourlyCost = paidHours > 0 ? totalAnnualCost / paidHours : 0;
  const burdenPercentage = annualWage > 0 ? (annualBurdenDollars / annualWage) * 100 : 0;
  const costPerBillableHour = billableHours > 0 ? totalAnnualCost / billableHours : 0;
  const costWithOverhead = costPerBillableHour * (1 + overheadPct / 100);

  const m = desiredMarginPct / 100;
  const recommendedBillRate = costWithOverhead / (1 - m);
  const profitPerBillableHour = recommendedBillRate - costWithOverhead;

  let proposed: ProposedRateEval | undefined;
  const hasProposed =
    input.proposedBillRate !== undefined &&
    input.proposedBillRate !== null &&
    Number.isFinite(safeNum(input.proposedBillRate, NaN));
  if (hasProposed) {
    const rate = clampNonNeg(input.proposedBillRate);
    const profitPerHour = round2(rate - costWithOverhead);
    const marginPct = rate > 0 ? round2(((rate - costWithOverhead) / rate) * 100) : 0;
    let verdict: RateVerdict;
    let message: string;
    if (rate < costWithOverhead) {
      verdict = "below-cost";
      message = "This rate is below your true cost + overhead — you lose money on every billable hour.";
    } else if (marginPct < desiredMarginPct - 1) {
      verdict = "below-target";
      message = `This rate earns a ${marginPct}% margin, under your ${desiredMarginPct}% target.`;
    } else if (marginPct <= desiredMarginPct + 1) {
      verdict = "on-target";
      message = `This rate is on your ${desiredMarginPct}% target margin.`;
    } else {
      verdict = "above-target";
      message = `This rate earns a ${marginPct}% margin, above your ${desiredMarginPct}% target.`;
    }
    proposed = { rate, profitPerHour, marginPct, verdict, message };
  }

  return {
    paidHoursPerYear: paidHours,
    billableHoursPerYear: billableHours,
    burdenPct: round2(burdenPct),
    trueHourlyCost: round2(trueHourlyCost),
    annualEmployeeCost: round2(totalAnnualCost),
    totalAnnualCost: round2(totalAnnualCost),
    burdenPercentage: round2(burdenPercentage),
    costPerBillableHour: round2(costPerBillableHour),
    breakEvenBillRate: round2(costPerBillableHour),
    recommendedBillRate: round2(recommendedBillRate),
    recommendedMargin: desiredMarginPct,
    profitPerBillableHour: round2(profitPerBillableHour),
    proposed,
    warnings,
  };
}
