import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { howtos, getHowto } from "@/lib/data/howto";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return howtos.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getHowto(params.slug);
  if (!c) return { title: "Guide not found" };
  return landingMetadata("howto", c);
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = getHowto(params.slug);
  if (!c) notFound();
  return <LandingTemplate type="howto" content={c} />;
}
