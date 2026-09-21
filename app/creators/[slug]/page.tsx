import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { creators, getCreator } from "@/lib/data/creators";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return creators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCreator((await params).slug);
  if (!c) return { title: "Page not found" };
  return landingMetadata("creators", c);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCreator((await params).slug);
  if (!c) notFound();
  return <LandingTemplate type="creators" content={c} />;
}
