import type { Metadata } from "next";
import GlowBackground from "@/components/GlowBackground";
import WhyAIShop from "@/components/WhyAIShop";
import HowItWorks from "@/components/HowItWorks";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About Handbuilt — Your Personal AI Studio",
  description:
    "Handbuilt is a personal AI studio in Surrey, BC, building custom AI apps, agents and automations for businesses and individuals worldwide. One builder, your whole AI department.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">About</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
              A personal AI studio, not a{" "}
              <span className="text-gradient-brand">software factory</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">
              Handbuilt exists for one reason: most people know AI could help their business or life,
              but have no idea what to actually build — and the agencies that do cost a fortune and
              move slowly. So we made it simple. You describe the outcome you want. We design, build
              and ship the AI system that delivers it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-lg leading-relaxed text-ink/70">
          <Reveal>
            <p>
              Based in Surrey, BC and working with clients worldwide, Handbuilt is built around a
              simple belief: AI should be practical, not hype. The best AI system isn&apos;t the
              flashiest one — it&apos;s the one that quietly answers your phone, follows up on your
              leads, or runs the admin you hate, every single day.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Because it&apos;s one builder — not a chain of account managers and offshore teams —
              what you ask for is what gets built. Fast. Tuned to how you actually work. And yours to
              own.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="relative border-t border-ink/[0.06] py-20 sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="How we work" title="What you can count on" />
          <div className="mt-12">
            <WhyAIShop />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="The process" title="Idea to live system, in four steps" />
          <div className="mt-16">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 text-center sm:py-24">
        <GlowBackground />
        <div className="mx-auto max-w-2xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Let&apos;s build something that works
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 text-ink/60">
              Tell us your goal, or just reach out at{" "}
              <a href={`mailto:${site.email}`} className="underline hover:text-ink">
                {site.email}
              </a>
              .
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
