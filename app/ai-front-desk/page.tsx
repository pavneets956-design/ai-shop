import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import MissedCallCaught from "@/components/experience/MissedCallCaught";
import { site } from "@/lib/data/site";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import { FAQ, SUMMARY_PARAGRAPH } from "@/lib/data/alwaysAnswering";
import { packages } from "@/lib/data/packages";

// Fraunces is scoped to this route (act headlines only) — the global type
// system (Archivo/Inter/Plex Mono) is untouched elsewhere.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    absolute: "AI Front Desk for Service Businesses — Handbuilt in BC | Always Answering",
  },
  description:
    "Handbuilt builds AI front desks for service businesses in Surrey, Delta & Metro Vancouver — AI receptionists, quote responders, lead follow-up and invoice chasers that catch the calls you can't take. One-time builds from $1,000 CAD.",
  keywords: [
    "AI receptionist",
    "AI front desk for service businesses",
    "never miss a call",
    "AI receptionist BC",
    "missed call answering service",
    "AI answering for trades",
  ],
  alternates: { canonical: "/ai-front-desk" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Front Desk for Service Businesses — Handbuilt in BC",
    description:
      "Never miss the job because you missed the call. AI workers that answer, quote, follow up and chase invoices while your hands are full — built one at a time in BC.",
    url: `${site.url}/ai-front-desk`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Front Desk for Service Businesses — Handbuilt in BC",
    description:
      "Never miss the job because you missed the call. AI workers that catch what slips while your hands are full.",
  },
};

function frontDeskSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Front Desk for Service Businesses",
    serviceType: "AI receptionist & front-desk automation",
    description: SUMMARY_PARAGRAPH,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: ["Surrey", "Delta", "Metro Vancouver", "British Columbia"].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    url: `${site.url}/ai-front-desk`,
    offers: packages.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: site.currency,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: p.price,
        priceCurrency: site.currency,
        valueAddedTaxIncluded: false,
      },
      url: `${site.url}${p.cta.href}`,
    })),
  };
}

export default function AiFrontDeskPage() {
  return (
    <div className={fraunces.variable}>
      <JsonLd
        data={[
          frontDeskSchema(),
          faqSchema(FAQ.map((f) => ({ q: f.q, a: f.a }))),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Front Desk", path: "/ai-front-desk" },
          ]),
        ]}
      />
      <MissedCallCaught />
    </div>
  );
}
