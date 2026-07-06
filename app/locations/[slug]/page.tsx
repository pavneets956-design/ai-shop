import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { locations, getLocation } from "@/lib/data/locations";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getLocation(params.slug);
  if (!c) return { title: "Location not found" };
  return landingMetadata("location", c);
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = getLocation(params.slug);
  if (!c) notFound();
  return <LandingTemplate type="location" content={c} />;
}
