import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import ServicePackages from "@/components/ServicePackages";
import PhoneReceptionistPlan from "@/components/PhoneReceptionistPlan";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { toolsPlan } from "@/lib/data/toolsPlan";
import { getToolsPlanPrices } from "@/lib/stripe";
import { pricingPageFaqs } from "@/lib/data/faqs";
import { serviceSchema, carePlanOffer, faqSchema } from "@/lib/seo";

// Re-read the live Stripe Tools Pro price hourly (single source of truth).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pricing — Custom AI Builds from $1,000 CAD",
  description:
    "Clear, fair pricing for custom AI. Starter AI Setup from $1,000 CAD, Business AI System from $2,500, Custom AI App from $7,500, plus an optional $250/mo AI Care Plan.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const pricingFaqs = pricingPageFaqs();
  const toolsPrices = await getToolsPlanPrices();
  const toolsMonthly = toolsPrices?.monthly?.priceLabel ?? "$29";

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

      {/* Two more ways to work with Handbuilt — self-serve tools vs phone. */}
      <section className="relative border-t border-ink/[0.06] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading eyebrow="Also available" title="Two more ways to get AI" />
          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
            {/* Tools Pro — text-only self-serve */}
            <div className="glass-card spec-frame flex h-full flex-col p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-ink">{toolsPlan.name}</h3>
              <p className="mt-1 text-sm text-ink/55">Self-serve AI tools you run yourself — text only, no phone.</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="font-display text-4xl font-bold text-ink">{toolsMonthly}</span>
                <span className="pb-1 text-sm text-ink/50">/mo · annual billing available</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {toolsPlan.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-ink/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-white">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/tools/pro" className="btn-secondary mt-6 w-full">
                Explore Tools Pro
              </Link>
            </div>

            {/* AI Phone Receptionist — separate plan with setup + minutes */}
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
