import type { Metadata } from "next";
import Link from "next/link";
import GlowBackground from "@/components/GlowBackground";
import ServicePackages from "@/components/ServicePackages";
import PhoneReceptionistPlan from "@/components/PhoneReceptionistPlan";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { pricingPageFaqs } from "@/lib/data/faqs";
import { serviceSchema, carePlanOffer, faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — Custom AI Builds from $1,500 CAD",
  description:
    "Clear, fair pricing for custom AI. Starter AI Setup from $1,500 CAD, Business AI System from $3,500, Custom AI App from $10,000, plus an optional $99/mo AI Care Plan.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const pricingFaqs = pricingPageFaqs();

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
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ink/45">
              Priced in CAD — often cheaper than US rates. USD, AUD &amp; NZD invoicing on request.
              Built remotely for small businesses across Canada, the US, Australia &amp; New Zealand.{" "}
              <Link href="/remote-ai-development" className="text-ink/70 underline underline-offset-2 hover:text-ink">
                How remote builds work
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <ServicePackages />
        </div>
      </section>

      {/* Also available — the AI Phone Receptionist plan (setup + minutes). */}
      <section className="relative border-t border-ink/[0.06] py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4">
          <SectionHeading eyebrow="Also available" title="AI Phone Receptionist" />
          <div className="mt-10">
            <PhoneReceptionistPlan />
          </div>
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
