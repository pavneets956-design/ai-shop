import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { getMoneyPage } from "@/lib/data/money";
import { landingMetadata } from "@/lib/seo";

const SLUG = "ai-lead-follow-up-agent";
const content = getMoneyPage(SLUG);

export const metadata: Metadata = content
  ? landingMetadata("money", content)
  : { title: "Not found" };

export default function Page() {
  if (!content) notFound();
  return <LandingTemplate type="money" content={content} />;
}
