import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/data/site";
import { serviceSchema, faqSchema } from "@/lib/seo";
import { HOME_OBJECTIONS } from "@/lib/data/homeFaqs";
import Hero from "@/components/marketing/Hero";
import LiveCalcStrip from "@/components/marketing/LiveCalcStrip";
import { ProblemSelector, FaqSection } from "@/components/marketing/Interactive";
import WorkflowStory from "@/components/marketing/WorkflowStory";
import {
  BeforeAfter,
  ProcessSteps,
  ToolShowcase,
  PricingSection,
  LocalSection,
  FinalCta,
} from "@/components/marketing/HomeSections";

/**
 * Homepage.
 *
 * Built to docs/design/HOMEPAGE-BUILD-SPEC.md, whose every messaging decision
 * cites research/search-demand/. The two facts that shaped it:
 *
 *  - 38.4% of first-party GSC impressions are the AI-receptionist cluster;
 *    quotes/estimates earn 1.8% and missed-call terms 0.5%. The hero leads
 *    with the receptionist, not with quote follow-up.
 *  - The only two AI-Overview-free SERPs found in 34 were Surrey-local, so
 *    the local qualifier is in the eyebrow and has its own section.
 *
 * Structural rules: no testimonials, no client logos, no invented statistics,
 * no monthly/annual toggle. Prices render from lib/data/packages.ts.
 */

export const metadata: Metadata = {
  title: {
    absolute: "AI Receptionist for Contractors in Surrey & Metro Vancouver | Handbuilt AI",
  },
  description:
    "We install AI receptionists and quote follow-up for contractors in Surrey, Delta, Langley and Metro Vancouver — inside the phone number and accounts you already own. From $1,500 CAD. Free contractor calculators, no signup.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Receptionist for Contractors in Surrey & Metro Vancouver | Handbuilt AI",
    description:
      "Missed calls become booked jobs. We install an AI receptionist into the phone number and accounts you already own — from $1,500 CAD.",
    url: site.url,
    type: "website",
  },
};

/**
 * LocalBusiness (service-area) + Offer catalogue. Region-only address (SAB).
 * UNCHANGED from the previous homepage: the offer prices here are validated by
 * scripts/seo-diff.js, which fails the build on any JSON-LD price movement.
 */
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
      <JsonLd data={[...serviceSchema(), localBusinessSchema, faqSchema(HOME_OBJECTIONS)]} />
      <Hero />
      <LiveCalcStrip />
      <ProblemSelector />
      <BeforeAfter />
      <WorkflowStory />
      <ProcessSteps />
      <ToolShowcase />
      <PricingSection />
      <LocalSection />
      <FaqSection items={HOME_OBJECTIONS} />
      <FinalCta />
    </>
  );
}
