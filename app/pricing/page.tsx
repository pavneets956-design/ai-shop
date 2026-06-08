import type { Metadata } from "next";
import GlowBackground from "@/components/GlowBackground";
import ServicePackages from "@/components/ServicePackages";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { faqsByCategory } from "@/lib/data/faqs";
import { serviceSchema, carePlanOffer, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — Custom AI Builds from $1,000 CAD",
  description:
    "Clear, fair pricing for custom AI. Starter AI Setup from $1,000 CAD, Business AI System from $2,500, Custom AI App from $7,500, plus an optional $250/mo AI Care Plan.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const pricingFaqs = faqsByCategory("pricing").concat(faqsByCategory("process"));

  return (
    <>
      <JsonLd data={[...serviceSchema(), carePlanOffer(), faqSchema(pricingFaqs)]} />

      <section className="relative overflow-hidden pb-12 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">Pricing</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              Pricing that&apos;s easy to <span className="text-gradient-brand">say yes</span> to
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink/60">
              Real prices in CAD — no &ldquo;contact us for everything.&rdquo; Start with one tool or
              go all the way to a custom app you own. A part-time admin costs more every month than a
              whole system costs once.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <ServicePackages />
        </div>
      </section>

      <section className="relative border-t border-ink/[0.06] py-20 sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="FAQ" title="Pricing & process questions" />
          <div className="mt-12">
            <FAQSection items={pricingFaqs} />
          </div>
        </div>
      </section>

      <section className="relative py-20 text-center sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Get a fixed quote, free
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              Tell us what you want built and we&apos;ll send a clear plan and price within one
              business day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/create">Start a build</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
