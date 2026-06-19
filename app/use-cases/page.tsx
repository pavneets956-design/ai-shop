import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { useCases } from "@/lib/data/useCases";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Use Cases by Industry — Receptionists, Lead Agents & More",
  description:
    "Real AI build guides by industry: AI receptionists for contractors and clinics, lead capture for real estate, chatbots for restaurants, invoice automation, custom AI apps and more.",
  alternates: { canonical: "/use-cases" },
};

export default function UseCasesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Use Cases", path: "/use-cases" },
        ])}
      />

      <section className="relative overflow-hidden pb-12 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">Use cases</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              How AI fits <span className="text-gradient-brand">your industry</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/60">
              Practical guides on exactly what we&apos;d build for your kind of business — what it
              does, how it works, and what it costs.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {useCases.map((u, idx) => (
              <Reveal key={u.slug} delay={(idx % 2) * 0.06}>
                <Link href={`/use-cases/${u.slug}`} className="border-glow glass-card group flex h-full flex-col">
                  <p className="text-xs uppercase tracking-wide text-muted">{u.industry}</p>
                  <h2 className="mt-2 flex items-center gap-1 font-display text-xl font-semibold text-ink">
                    {u.solution}
                    <ArrowUpRight className="h-4 w-4 text-ink/20 transition group-hover:text-ink" />
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/55">{u.answer.split(". ")[0]}.</p>
                  <span className="mt-4 text-sm font-medium text-ink/70 group-hover:text-ink">
                    Read the guide →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <MagneticButton href="/#finder">Find my AI solution</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
