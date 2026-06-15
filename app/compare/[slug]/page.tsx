import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { comparisons, getComparison } from "@/lib/data/compare";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getComparison(params.slug);
  if (!c) return { title: "Comparison not found" };
  return landingMetadata("compare", c);
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = getComparison(params.slug);
  if (!c) notFound();
  return <LandingTemplate type="compare" content={c} />;
}
