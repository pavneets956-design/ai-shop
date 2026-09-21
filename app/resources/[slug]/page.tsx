import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { resources, getResource } from "@/lib/data/resources";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getResource((await params).slug);
  if (!c) return { title: "Resource not found" };
  return landingMetadata("resource", c);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getResource((await params).slug);
  if (!c) notFound();
  return <LandingTemplate type="resource" content={c} />;
}
