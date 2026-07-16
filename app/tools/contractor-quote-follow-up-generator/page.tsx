import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import QuoteFollowUpGenerator from "@/components/tools/calculators/QuoteFollowUpGenerator";
import { getFreeTool, toolMetadata } from "@/lib/data/freeTools";

const entry = getFreeTool("contractor-quote-follow-up-generator")!;

export const metadata: Metadata = toolMetadata(entry);

export default function Page() {
  return <ToolShell entry={entry} calculator={<QuoteFollowUpGenerator />} />;
}
