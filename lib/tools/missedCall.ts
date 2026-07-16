// Missed-Call Revenue & AI-Receptionist ROI calculator — pure, deterministic.
// Every assumption is an explicit input; recovery scenarios use documented,
// visible multipliers (not hidden industry stats). Outputs are estimates.
import { clampNonNeg, round2 } from "./format";

const WEEKS_PER_MONTH = 4.33;

export interface MissedCallInput {
  callsPerPeriod: number;
  period: "week" | "month";
  missedPct: number;
  /** % of missed calls that are genuine prospective customers. */
  genuinePct: number;
  closeRate: number;
  avgJobValue: number;
  /** Current answering / receptionist cost per month (context). */
  currentAnsweringCost: number;
  /** Estimated % of missed calls an AI receptionist could recover. */
  recoverableRate: number;
  aiSetupCost?: number;
  currency?: string;
}

export interface RecoveryScenario {
  key: "conservative" | "likely" | "optimistic";
  rate: number;
  recoveredJobs: number;
  recoveredRevenueMonthly: number;
  recoveredRevenueAnnual: number;
}

export interface MissedCallResult {
  callsPerMonth: number;
  missedCallsPerMonth: number;
  missedQualifiedLeads: number;
  jobsLostPerMonth: number;
  revenueAtRiskMonthly: number;
  revenueAtRiskAnnual: number;
  scenarios: RecoveryScenario[];
  jobsToBreakEven: number;
  paybackMonths: number;
  currentAnsweringCost: number;
}

const clampPct = (v: number) => Math.min(100, clampNonNeg(v));

export function computeMissedCall(input: MissedCallInput): MissedCallResult {
  const missedPct = clampPct(input.missedPct);
  const genuinePct = clampPct(input.genuinePct);
  const closeRate = clampPct(input.closeRate);
  const avgJobValue = clampNonNeg(input.avgJobValue);
  const recoverableRate = clampPct(input.recoverableRate);
  const aiSetupCost = clampNonNeg(input.aiSetupCost ?? 0);
  const currentAnsweringCost = clampNonNeg(input.currentAnsweringCost);

  const callsPerMonth =
    input.period === "week" ? clampNonNeg(input.callsPerPeriod) * WEEKS_PER_MONTH : clampNonNeg(input.callsPerPeriod);

  const missedCallsFull = callsPerMonth * (missedPct / 100);
  const qualifiedFull = missedCallsFull * (genuinePct / 100);
  const jobsLostFull = qualifiedFull * (closeRate / 100);
  const revenueAtRiskMonthlyFull = jobsLostFull * avgJobValue;

  // Documented, visible recovery multipliers around the user's estimate.
  const rates: Array<{ key: RecoveryScenario["key"]; rate: number }> = [
    { key: "conservative", rate: clampPct(recoverableRate * 0.6) },
    { key: "likely", rate: clampPct(recoverableRate) },
    { key: "optimistic", rate: clampPct(recoverableRate * 1.4) },
  ];

  const scenarios: RecoveryScenario[] = rates.map(({ key, rate }) => {
    const recoveredRevenueMonthlyFull = revenueAtRiskMonthlyFull * (rate / 100);
    return {
      key,
      rate: round2(rate),
      recoveredJobs: round2(jobsLostFull * (rate / 100)),
      recoveredRevenueMonthly: round2(recoveredRevenueMonthlyFull),
      recoveredRevenueAnnual: round2(recoveredRevenueMonthlyFull * 12),
    };
  });

  const likelyMonthlyFull = revenueAtRiskMonthlyFull * (clampPct(recoverableRate) / 100);
  const jobsToBreakEven = avgJobValue > 0 && aiSetupCost > 0 ? Math.ceil(aiSetupCost / avgJobValue) : 0;
  const paybackMonths = aiSetupCost > 0 && likelyMonthlyFull > 0 ? round2(aiSetupCost / likelyMonthlyFull) : 0;

  return {
    callsPerMonth: round2(callsPerMonth),
    missedCallsPerMonth: round2(missedCallsFull),
    missedQualifiedLeads: round2(qualifiedFull),
    jobsLostPerMonth: round2(jobsLostFull),
    revenueAtRiskMonthly: round2(revenueAtRiskMonthlyFull),
    revenueAtRiskAnnual: round2(revenueAtRiskMonthlyFull * 12),
    scenarios,
    jobsToBreakEven,
    paybackMonths,
    currentAnsweringCost,
  };
}
