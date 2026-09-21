import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { howtos, getHowto } from "@/lib/data/howto";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return howtos.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getHowto((await params).slug);
  if (!c) return { title: "Guide not found" };
  return landingMetadata("howto", c);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getHowto((await params).slug);
  if (!c) notFound();
  return <LandingTemplate type="howto" content={c} />;
}
