import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import FAQSection from "@/components/FAQSection";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { getIcon } from "@/lib/icons";
import ReceptionistChat from "@/components/ReceptionistChat";
import { useCases, getUseCase, getUseCaseDemo } from "@/lib/data/useCases";
import { getPackage, formatPackagePrice } from "@/lib/data/packages";
import { getBuild } from "@/lib/data/solutions";
import { site } from "@/lib/data/site";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const uc = getUseCase(params.slug);
  if (!uc) return { title: "Use case not found" };
  return {
    title: `${uc.solution} for ${uc.industry}`,
    description: uc.answer,
    keywords: uc.keywords,
    alternates: { canonical: `/use-cases/${uc.slug}` },
    openGraph: {
      title: `${uc.solution} for ${uc.industry} | Handbuilt`,
      description: uc.answer,
      url: `${site.url}/use-cases/${uc.slug}`,
    },
  };
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
  const uc = getUseCase(params.slug);
  if (!uc) notFound();

  const pkg = getPackage(uc.packageId)!;
  const builds = uc.relatedBuilds.map(getBuild).filter(Boolean);
  const demo = getUseCaseDemo(uc);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${uc.solution} for ${uc.industry}`,
    serviceType: uc.solution,
    description: uc.answer,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: site.currency,
      description: formatPackagePrice(pkg),
    },
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: uc.question,
    step: uc.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
  };

  return (
    <>
      <JsonLd
        data={[
          serviceLd,
          howToLd,
          faqSchema(uc.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Use Cases", path: "/use-cases" },
            { name: `${uc.solution} for ${uc.industry}`, path: `/use-cases/${uc.slug}` },
          ]),
        ]}
      />

      {/* HERO — answer-first */}
      <section className="relative overflow-hidden pb-12 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <nav className="mb-6 flex items-center gap-2 text-sm text-ink/40">
              <Link href="/use-cases" className="hover:text-ink">
                Use Cases
              </Link>
              <span>/</span>
              <span className="text-ink/60">{uc.industry}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {uc.question}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            {/* answer-first paragraph — LLM-citable */}
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{uc.answer}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={`/create?package=${uc.packageId}`}>
                Request this build <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <Link href="/#finder" className="btn-ghost">
                Not sure? Use the finder
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="relative py-14">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="glass rounded-2xl border-l-2 border-l-electric/60 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-ink/40">The problem</p>
              <p className="mt-3 text-lg leading-relaxed text-ink/80">{uc.pain}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRY IT LIVE — embedded working demo (conversational use cases only) */}
      {demo && (
        <section className="relative py-14">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <div className="mb-6 text-center">
                <span className="eyebrow">Try it live</span>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  See it work — you&apos;re the customer
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-ink/60">
                  This is a real, working AI for a sample {uc.industry.toLowerCase()} business. Ask it
                  what your own customers would — it&apos;s the exact experience they&apos;d get.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ReceptionistChat
                business={demo.business}
                greeting={demo.greeting}
                suggestions={demo.suggestions}
                sub={demo.business.split(",")[0]}
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="relative py-14">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">How it works</h2>
          </Reveal>
          <ol className="mt-8 space-y-4">
            {uc.steps.map((s, i) => (
              <Reveal key={s} delay={i * 0.05}>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-ink/75">{s}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* WHAT YOU GET + PRICE */}
      <section className="relative py-14">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full">
              <h2 className="font-display text-2xl font-semibold text-ink">What you get</h2>
              <ul className="mt-5 space-y-3">
                {uc.gets.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-ink/80">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-glow glass-card flex h-full flex-col">
              <p className="text-xs uppercase tracking-[0.18em] text-ink/40">Recommended package</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-gradient-brand">
                  {formatPackagePrice(pkg)}
                </span>
                <span className="text-sm text-ink/40">CAD</span>
              </div>
              <p className="mt-1 text-sm text-ink/40">{pkg.timeline}</p>
              <p className="mt-4 flex-1 text-sm text-ink/60">{pkg.tagline}</p>
              <Link href={`/create?package=${uc.packageId}`} className="btn-primary mt-6 w-full">
                Request this build <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RELATED BUILDS */}
      {builds.length > 0 && (
        <section className="relative py-14">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Related builds</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {builds.map((b, i) => {
                const Icon = getIcon(b!.icon);
                return (
                  <Reveal key={b!.slug} delay={i * 0.06}>
                    <Link href="/create" className="border-glow glass-card group flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-clay/20 to-clay/20 text-clay">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 font-semibold text-ink">
                          {b!.title}
                          <ArrowUpRight className="h-4 w-4 text-ink/20 transition group-hover:text-ink" />
                        </span>
                        <span className="block text-sm text-ink/55">{b!.what}</span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="relative border-t border-ink/[0.06] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Common questions
            </h2>
          </Reveal>
          <FAQSection items={uc.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 text-center">
        <GlowBackground />
        <div className="mx-auto max-w-2xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Want this built for your business?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 text-ink/60">
              Tell us about your setup and we&apos;ll send a plan and a fixed quote within one
              business day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href={`/create?package=${uc.packageId}`}>
                Request this build <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
