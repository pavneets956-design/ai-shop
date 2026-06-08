import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCommandCenter from "@/components/HeroCommandCenter";
import GlowBackground from "@/components/GlowBackground";
import IndustryStrip from "@/components/IndustryStrip";
import SolutionFinder from "@/components/SolutionFinder";
import UseCaseBentoGrid from "@/components/UseCaseBentoGrid";
import HowItWorks from "@/components/HowItWorks";
import ServicePackages from "@/components/ServicePackages";
import FeaturedBuilds from "@/components/FeaturedBuilds";
import WhyAIShop from "@/components/WhyAIShop";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import ConsultationCall from "@/components/ConsultationCall";
import { faqs } from "@/lib/data/faqs";
import { serviceSchema, faqSchema } from "@/lib/seo";

export default function Home() {
  const homeFaqs = faqs.slice(0, 7);

  return (
    <>
      <JsonLd data={[...serviceSchema(), faqSchema(homeFaqs)]} />

      {/* Voice-led AI call layered OVER the full homepage. All marketing
          content + JSON-LD below stays server-rendered for SEO/GEO; the
          overlay is dismissible ("Skip") to reveal the site beneath. */}
      <ConsultationCall onHomepage />


      {/* HERO */}
      <section className="relative overflow-hidden">
        <GlowBackground variant="hero" />
        <HeroCommandCenter />
        {/* industry strip */}
        <div className="mx-auto max-w-7xl px-4 pb-10">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-ink/35">
            Built for businesses like yours
          </p>
          <IndustryStrip />
        </div>
      </section>

      {/* SOLUTION FINDER */}
      <section id="finder" className="relative scroll-mt-20 py-20 sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="AI Solution Finder"
            title="What do you want AI to do for you?"
            subtitle="Pick your goal, answer two quick questions, and get a recommended build and price in seconds. No guessing which tool to use."
          />
          <div className="mt-12">
            <SolutionFinder />
          </div>
        </div>
      </section>

      {/* BUSINESS USE CASES (bento) */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="What we build"
            title="AI systems for real businesses"
            subtitle="From answering your phone to running a full custom app — here's the range of what AI Shop can build around your workflow."
          />
          <div className="mt-12">
            <UseCaseBentoGrid />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative border-y border-ink/[0.06] py-20 sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="How it works"
            title="From idea to working AI — in four steps"
            subtitle="No tech knowledge required. You tell us the outcome; we handle everything else."
          />
          <div className="mt-16">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Packages"
            title="Pricing that's easy to say yes to"
            subtitle="Clear, fair pricing in CAD. Start small with one tool, or go all the way to a custom app you own."
          />
          <div className="mt-12">
            <ServicePackages />
          </div>
        </div>
      </section>

      {/* FEATURED BUILDS */}
      <section className="relative border-t border-ink/[0.06] py-20 sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Featured builds"
            title="AI systems we can build for you"
            subtitle="Proven, ready-to-build systems — each one customized to your business. Tap any to request it."
          />
          <div className="mt-12">
            <FeaturedBuilds />
          </div>
        </div>
      </section>

      {/* WHY AI SHOP */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Why AI Shop"
            title="One builder. Your whole AI department."
            subtitle="No agency overhead, no offshore handoffs, no hype. Just systems that work, built around what you actually do."
          />
          <div className="mt-12">
            <WhyAIShop />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-ink/[0.06] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-12">
            <FAQSection items={homeFaqs} />
          </div>
          <div className="mt-8 text-center">
            <Link href="/faq" className="btn-ghost mx-auto">
              See all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <GlowBackground />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              Have an idea? Let&apos;s turn it into an{" "}
              <span className="text-gradient-brand">AI system</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink/60">
              Tell us the outcome. We&apos;ll design the system, build it, and get it live — usually
              in days.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton href="/create">
                Start my AI build <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="#finder" variant="secondary">
                Find my solution first
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
