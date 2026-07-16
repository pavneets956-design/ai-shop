import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import MissedCallCalculator from "@/components/tools/calculators/MissedCallCalculator";
import { getFreeTool, toolMetadata } from "@/lib/data/freeTools";

const entry = getFreeTool("missed-call-revenue-calculator")!;

export const metadata: Metadata = toolMetadata(entry);

export default function Page() {
  return <ToolShell entry={entry} calculator={<MissedCallCalculator />} />;
}
