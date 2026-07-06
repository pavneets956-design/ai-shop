import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { creators, getCreator } from "@/lib/data/creators";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return creators.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCreator(params.slug);
  if (!c) return { title: "Page not found" };
  return landingMetadata("creators", c);
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = getCreator(params.slug);
  if (!c) notFound();
  return <LandingTemplate type="creators" content={c} />;
}
