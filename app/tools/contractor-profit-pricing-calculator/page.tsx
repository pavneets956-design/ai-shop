import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import ProfitPricingCalculator from "@/components/tools/calculators/ProfitPricingCalculator";
import { getFreeTool, toolMetadata } from "@/lib/data/freeTools";

const entry = getFreeTool("contractor-profit-pricing-calculator")!;

export const metadata: Metadata = toolMetadata(entry);

export default function Page() {
  return <ToolShell entry={entry} calculator={<ProfitPricingCalculator />} />;
}
