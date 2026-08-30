import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import FAQSection from "@/components/FAQSection";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { getIcon } from "@/lib/icons";
import { getPackage, formatPackagePrice } from "@/lib/data/packages";
import { site } from "@/lib/data/site";
import { landingSchema } from "@/lib/seo";
import {
  type LandingContent,
  type PageType,
  landingBreadcrumb,
} from "@/lib/data/landing";

function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((p, i) => (
        <p key={i} className={className}>
          {p}
        </p>
      ))}
    </>
  );
}

export default function LandingTemplate({
  type,
  content,
  shortName,
}: {
  type: PageType;
  content: LandingContent;
  shortName?: string;
}) {
  const pkg = content.packageId ? getPackage(content.packageId) : undefined;
  const ctaHref = content.packageId
    ? `/create?package=${content.packageId}`
    : "/create";
  const ctaLabel = content.ctaLabel ?? "Start a build";
  const crumbs = landingBreadcrumb(type, content, shortName);
  const Icon = content.icon ? getIcon(content.icon) : null;

  return (
    <>
      <JsonLd data={landingSchema(type, content, shortName)} />

      {/* HERO — answer-first */}
      <section className="relative overflow-hidden pb-12 pt-10 md:pt-14">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--v-muted)" }}>
              {crumbs.slice(0, -1).map((c) => (
                <span key={c.path} className="flex items-center gap-2">
                  <Link
                    href={c.path}
                    className="inline-flex min-h-[44px] items-center hover:text-ink"
                  >
                    {c.name}
                  </Link>
                  <span>/</span>
                </span>
              ))}
              <span aria-current="page" style={{ color: "var(--v-ink-2)" }}>{crumbs[crumbs.length - 1].name}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3">
              {Icon && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <Icon className="h-5 w-5" />
                </span>
              )}
              <span className="eyebrow">{content.eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {content.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{content.answer}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={ctaHref}>
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <Link href="/demo" className="btn-ghost">
                Not sure what you need? Try it yourself first
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE PROBLEM */}
      {content.pain && (
        <section className="relative py-12">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <div className="glass rounded-2xl border-l-2 border-l-electric/60 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">The problem</p>
                <p className="mt-3 text-lg leading-relaxed text-ink/80">{content.pain}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* WORKED EXAMPLE */}
      {content.scenario && (
        <section className="relative py-12">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <div className="glass-card">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  What this looks like in practice
                </p>
                <div className="mt-3 space-y-4 text-ink/75 leading-relaxed">
                  <Paragraphs text={content.scenario} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      {content.steps && content.steps.length > 0 && (
        <section className="relative py-12">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                How it works
              </h2>
            </Reveal>
            {/* `as="li"` matters: an <ol> whose direct children are <div>
                wrappers fails the axe `list` AND `listitem` rules, and a screen
                reader stops announcing it as a numbered list. */}
            <ol className="mt-8 space-y-4">
              {content.steps.map((s, i) => (
                <Reveal key={s} delay={i * 0.05} as="li" className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-ink/75">{s}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* FLEXIBLE PROSE SECTIONS */}
      {content.sections && content.sections.length > 0 && (
        <section className="relative py-12">
          <div className="mx-auto max-w-3xl space-y-12 px-4">
            {content.sections.map((sec, i) => (
              <Reveal key={sec.heading} delay={i * 0.04}>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {sec.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-ink/75">
                    <Paragraphs text={sec.body} />
                  </div>
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="mt-4 space-y-3">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-ink/80">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      {content.comparison && (
        <section className="relative py-12">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <div className="glass-card overflow-hidden p-0">
                <div className="grid grid-cols-[1fr] border-b border-ink/10 text-sm font-semibold text-ink sm:grid-cols-3">
                  <div className="hidden p-4 sm:block" style={{ color: "var(--v-muted)" }}>
                    &nbsp;
                  </div>
                  <div className="p-4">Handbuilt</div>
                  <div className="hidden p-4 sm:block" style={{ color: "var(--v-ink-2)" }}>
                    {content.comparison.alternativeLabel}
                  </div>
                </div>
                {content.comparison.rows.map((r) => (
                  <div
                    key={r.factor}
                    className="grid grid-cols-[1fr] border-b border-ink/[0.06] text-sm last:border-0 sm:grid-cols-3"
                  >
                    <div className="px-4 pb-1 pt-4 font-medium sm:p-4" style={{ color: "var(--v-ink)" }}>
                      {r.factor}
                    </div>
                    <div
                      className="flex items-start gap-2 px-4 py-2 sm:p-4"
                      style={{ color: "var(--v-ink-2)" }}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--v-accent)" }}
                        aria-hidden="true"
                      />
                      <span>
                        {/* The column headers are hidden below 640px, so each cell
                            names its own side — otherwise the two answers stack
                            with nothing to say which is which. */}
                        <span className="v-micro mr-1.5 font-semibold sm:hidden" style={{ color: "var(--v-ink)" }}>
                          Handbuilt:
                        </span>
                        {r.handbuilt}
                      </span>
                    </div>
                    <div
                      className="flex items-start gap-2 px-4 pb-4 pt-2 sm:p-4"
                      style={{ color: "var(--v-muted)" }}
                    >
                      <X
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--v-muted)" }}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="v-micro mr-1.5 font-semibold sm:hidden" style={{ color: "var(--v-ink)" }}>
                          {content.comparison!.alternativeLabel}:
                        </span>
                        {r.alternative}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* WHAT YOU GET + PRICE */}
      {(content.gets?.length || pkg) && (
        <section className="relative py-12">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 lg:grid-cols-2">
            {content.gets && content.gets.length > 0 && (
              <Reveal>
                <div className="glass-card h-full">
                  <h2 className="font-display text-2xl font-semibold text-ink">What you get</h2>
                  <ul className="mt-5 space-y-3">
                    {content.gets.map((g) => (
                      <li key={g} className="flex items-start gap-3 text-ink/80">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {pkg && (
              <Reveal delay={0.08}>
                <div className="border-glow glass-card flex h-full flex-col">
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                    Recommended package
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{pkg.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-semibold text-gradient-brand">
                      {formatPackagePrice(pkg)}
                    </span>
                    <span className="text-sm text-ink-soft">{site.currency}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{pkg.timeline}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    Fixed price in CAD · USD / AUD / NZD quotes on request. Built remotely for small
                    businesses across Canada, the US, Australia &amp; New Zealand.
                  </p>
                  <p className="mt-4 flex-1 text-sm text-ink-soft">{pkg.tagline}</p>
                  <Link href={ctaHref} className="btn-primary mt-6 w-full">
                    {ctaLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* RELATED / INTERNAL LINKS */}
      {content.related.length > 0 && (
        <section className="relative py-12">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">Related</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.related.map((r, i) => (
                <Reveal key={r.href} delay={i * 0.05}>
                  <Link
                    href={r.href}
                    className="border-glow glass-card group flex items-center justify-between gap-4"
                  >
                    <span className="font-medium text-ink">{r.label}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/20 transition group-hover:text-ink" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="relative border-t border-ink/[0.06] py-16">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <h2 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
                Common questions
              </h2>
            </Reveal>
            <FAQSection items={content.faqs} />
          </div>
        </section>
      )}

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
            <p className="mx-auto mt-4 text-ink-soft">
              Tell us about your setup and we&apos;ll send a plan and a fixed quote within one
              business day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href={ctaHref}>
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
