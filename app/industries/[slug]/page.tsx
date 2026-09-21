import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { industries, getIndustry } from "@/lib/data/industries";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getIndustry((await params).slug);
  if (!c) return { title: "Industry not found" };
  return landingMetadata("industry", c);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getIndustry((await params).slug);
  if (!c) notFound();
  return <LandingTemplate type="industry" content={c} />;
}
