import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingTemplate from "@/components/LandingTemplate";
import { services, getService } from "@/lib/data/services";
import { landingMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getService(params.slug);
  if (!c) return { title: "Service not found" };
  return landingMetadata("service", c);
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = getService(params.slug);
  if (!c) notFound();
  return <LandingTemplate type="service" content={c} />;
}
