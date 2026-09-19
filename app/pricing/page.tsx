import type { Metadata } from "next";
import Link from "next/link";
import ServicePackages from "@/components/ServicePackages";
import PhoneReceptionistPlan from "@/components/PhoneReceptionistPlan";
import JsonLd from "@/components/JsonLd";
import { pricingPageFaqs } from "@/lib/data/faqs";
import { serviceSchema, carePlanOffer, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — Websites, Apps & AI Builds",
  description:
    "Fixed-scope AI builds from $1,500 CAD, business systems from $3,500 and custom apps from $10,000. Websites and 3D experiences quoted to your project.",
  alternates: { canonical: "/pricing" },
};
export default function PricingPage() {
  const faqs = pricingPageFaqs();
  return (
    <>
      <JsonLd data={[...serviceSchema(), carePlanOffer(), faqSchema(faqs)]} />
      <section className="studio-page-hero studio-container">
        <p className="studio-eyebrow">Pricing & scope</p>
        <h1>
          A clear plan.
          <br />
          <span>A price agreed upfront.</span>
        </h1>
        <p>
          Start with the thing you need most. We agree what it does, what it
          costs and how we’ll know it works before the build starts.
        </p>
      </section>
      <section className="studio-page-section studio-container">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">AI & software</p>
            <h2>Three starting points.</h2>
          </div>
          <p>
            Prices in CAD. These are starting scopes; your written quote sets
            the final deliverables, timeline and any ongoing costs.
          </p>
        </div>
        <ServicePackages />
      </section>
      <section className="studio-page-section studio-container">
        <div className="studio-note-panel">
          <div>
            <p className="studio-eyebrow">Websites & interactive experiences</p>
            <h2>Designed around your project.</h2>
            <p>
              A landing page, a complete website and a 3D experience have
              different needs. Tell me about your pages, content, integrations
              and interactions for a project-specific quote.
            </p>
          </div>
          <Link
            href="/create?goal=Website%20or%203D%20experience"
            className="studio-button"
          >
            Discuss your website ↗
          </Link>
        </div>
      </section>
      <section className="studio-page-section studio-container">
        <div className="studio-section-heading">
          <div>
            <p className="studio-eyebrow">A separate service</p>
            <h2>Phone reception.</h2>
          </div>
          <p>
            Voice has its own setup, monthly service and provider usage. We
            scope the call flow, handover and limits before launch. The website
            demo is text only.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <PhoneReceptionistPlan />
        </div>
      </section>
      <section className="studio-section studio-faq studio-container">
        <div>
          <p className="studio-eyebrow">Before you decide</p>
          <h2>Pricing questions.</h2>
        </div>
        <div>
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="studio-final">
        <div className="studio-container">
          <p className="studio-eyebrow">Start with a conversation</p>
          <h2>What would you like to build?</h2>
          <p>Send a short outline. I’ll reply within one business day.</p>
          <Link href="/create" className="studio-button">
            Tell me about your idea ↗
          </Link>
        </div>
      </section>
    </>
  );
}
