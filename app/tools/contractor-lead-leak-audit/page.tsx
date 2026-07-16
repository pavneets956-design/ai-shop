import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import LeadLeakAudit from "@/components/tools/calculators/LeadLeakAudit";
import { getFreeTool, toolMetadata } from "@/lib/data/freeTools";

const entry = getFreeTool("contractor-lead-leak-audit")!;

export const metadata: Metadata = toolMetadata(entry);

export default function Page() {
  return <ToolShell entry={entry} calculator={<LeadLeakAudit />} />;
}
