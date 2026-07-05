import type { Metadata } from "next";
import MoltenForge from "@/components/home/MoltenForge";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/data/site";
import { HOME_FAQS } from "@/lib/data/homeFaqs";
import { serviceSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "AI Receptionist & Admin Systems for BC Contractors | Handbuilt AI",
  },
  description:
    "Done-for-you AI receptionist and admin systems for contractors and local service businesses in Surrey, Delta, and BC. Installed, tested, and tuned around your real services, prices, calendar, and workflow. One-time build from $1,500 CAD — you own it.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Receptionist & Admin Systems for BC Contractors | Handbuilt AI",
    description:
      "The cheap AI tool is easy. Making it work correctly for your business is the hard part. Done-for-you AI workers for BC trades — from $1,500 CAD.",
    url: site.url,
    type: "website",
  },
};

// LocalBusiness (service-area) + Offer catalogue. Region-only address (SAB business).
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#localbusiness`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  description:
    "Done-for-you AI receptionist and business automation for contractors and local service businesses in BC.",
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Delta" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
    { "@type": "Country", name: "Canada" },
  ],
  address: { "@type": "PostalAddress", addressRegion: "BC", addressCountry: "CA" },
  priceRange: "$99–$10,000+ CAD",
  knowsAbout: [
    "AI receptionist",
    "AI quote agent",
    "AI invoice follow-up",
    "Jobber AI setup",
    "AI automation for contractors",
  ],
  makesOffer: [
    { name: "AI Workflow Audit", price: "99", desc: "15-minute workflow audit, credited toward the build." },
    { name: "AI Starter Worker", price: "1500", desc: "One AI worker installed, wired in, and tested." },
    { name: "AI Receptionist Install", price: "1500", desc: "AI receptionist set up around your services, prices, and calendar." },
    { name: "AI Business System", price: "3500", desc: "2–4 connected workers plus an owner dashboard." },
    { name: "Custom AI App", price: "10000", desc: "A full custom app or customer portal — you own the code." },
  ].map((o) => ({
    "@type": "Offer",
    name: o.name,
    price: o.price,
    priceCurrency: "CAD",
    description: o.desc,
    availability: "https://schema.org/InStock",
    itemOffered: { "@type": "Service", name: o.name, serviceType: "AI automation for local service businesses" },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={[...serviceSchema(), localBusinessSchema, faqSchema(HOME_FAQS)]} />
      <MoltenForge />
    </>
  );
}
