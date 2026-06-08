import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import UseCaseBentoGrid from "@/components/UseCaseBentoGrid";
import FeaturedBuilds from "@/components/FeaturedBuilds";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Solutions — Apps, Agents, Automations & Custom Tools",
  description:
    "Explore what AI Shop can build: business automation, AI agents, customer communication, local service tools, personal AI apps, content engines, website AI, document analysis and custom SaaS.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={serviceSchema()} />

      <section className="relative overflow-hidden pb-16 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">Solutions</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
              Every kind of AI system,{" "}
              <span className="text-gradient-brand">built around you</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/60">
              Stop guessing which AI tool to use. Pick the outcome you want and we&apos;ll build the
              exact system for it — from a single automation to a full custom app.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/#finder">
                Find my AI solution <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4">
          <UseCaseBentoGrid />
        </div>
      </section>

      <section className="relative border-t border-ink/[0.06] py-20 sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Featured builds"
            title="Popular systems, ready to customize"
            subtitle="Each one is a starting point — we tailor it to your business, your tools and your voice."
          />
          <div className="mt-12">
            <FeaturedBuilds />
          </div>
        </div>
      </section>

      <section className="relative py-20 text-center sm:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Not sure which one fits?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              Use the AI Solution Finder or just tell us your goal — we&apos;ll map it to the right
              build and give you a price.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton href="/#finder">Find my solution</MagneticButton>
              <Link href="/pricing" className="btn-ghost">
                See pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
