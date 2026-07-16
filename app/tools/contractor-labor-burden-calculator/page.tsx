import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import LaborBurdenCalculator from "@/components/tools/calculators/LaborBurdenCalculator";
import { getFreeTool, toolMetadata } from "@/lib/data/freeTools";

const entry = getFreeTool("contractor-labor-burden-calculator")!;

export const metadata: Metadata = toolMetadata(entry);

export default function Page() {
  return <ToolShell entry={entry} calculator={<LaborBurdenCalculator />} />;
}
