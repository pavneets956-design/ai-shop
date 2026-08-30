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
import {
  TrustStrip,
  DemoSection,
  ProofSection,
  FounderSection,
} from "@/components/marketing/ProofFounder";

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
    // Declared explicitly (rather than relying purely on the opengraph-image.tsx
    // file convention) because this page defines its own `openGraph` block, and
    // Next only auto-merges the file-convention image's alt text onto pages that
    // do NOT override `openGraph` themselves — verified 2026-08-05 by diffing
    // .next/server/app/index.html (no og:image:alt) against a page with no
    // openGraph override, e.g. about.html (has it). Keep in sync with
    // app/opengraph-image.alt.txt if that copy ever changes.
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Handbuilt AI — AI that works for your business, built by hand, not bought off a shelf. Surrey, BC — done-for-you AI receptionist and automation.",
      },
    ],
  },
  // Same reasoning as the openGraph.images comment above: declared explicitly
  // so the alt text actually reaches twitter:image:alt on this segment.
  twitter: {
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "Handbuilt AI — AI that works for your business, built by hand, not bought off a shelf. Surrey, BC — done-for-you AI receptionist and automation.",
      },
    ],
  },
};

/**
 * The homepage used to emit a SECOND identity node here — a `ProfessionalService`
 * at `#localbusiness` named "Handbuilt AI Studio" — while the root layout already
 * ships `#organization` named "Handbuilt AI" on all ~237 routes. Two schema
 * entities for one business is a split-identity signal, and it was the only page
 * on the site doing it.
 *
 * Deleted 2026-08-30. Everything it carried now lives on the single
 * `#organization` node in lib/seo.ts: the service-area address, the areaServed
 * list, and the offer catalogue (`packageOffers()`, priced from packages.ts
 * rather than from the hand-typed copy that used to sit here).
 */

export default function Home() {
  return (
    <>
      <JsonLd data={[...serviceSchema(), faqSchema(HOME_OBJECTIONS)]} />
      {/* Order is the conversion journey, not a component inventory:
          promise → what you can count on → prove it → the offer → who built it
          → what it costs → how it runs → objections → one decision.
          The demo sits third because it is the only proof that needs no trust
          to evaluate, and it was previously not linked from this page at all. */}
      <Hero />
      <TrustStrip />
      <DemoSection />
      <LiveCalcStrip />
      <ProblemSelector />
      <BeforeAfter />
      <WorkflowStory />
      <ProofSection />
      <FounderSection />
      <ProcessSteps />
      <PricingSection />
      <ToolShowcase />
      <LocalSection />
      <FaqSection items={HOME_OBJECTIONS} />
      <FinalCta />
    </>
  );
}
