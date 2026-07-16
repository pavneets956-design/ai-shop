import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import { getIcon } from "@/lib/icons";
import {
  type ToolRegistryEntry,
  type ToolSection,
  toolJsonLd,
  toolCtaHref,
  relatedTools,
  toolPath,
} from "@/lib/data/freeTools";
import { ToolCtaLink } from "./ToolCta";

function paras(body: string) {
  return body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function ProseSection({ section }: { section: ToolSection }) {
  return (
    <section>
      <h2 className="font-display text-section-sm font-bold text-ink">{section.heading}</h2>
      {paras(section.body).map((p, i) => (
        <p key={i} className="mt-3 text-body text-ink/80">
          {p}
        </p>
      ))}
      {section.bullets && (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-body text-ink/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function ToolShell({ entry, calculator }: { entry: ToolRegistryEntry; calculator: ReactNode }) {
  const Icon = getIcon(entry.icon);
  const related = relatedTools(entry);
  const ctaHref = toolCtaHref(entry);

  return (
    <>
      <JsonLd data={toolJsonLd(entry)} />

      {/* Hero — answer-first, tool near the top */}
      <header className="border-b border-line bg-paper-2/60">
        <div className="mx-auto max-w-container px-4 pb-10 pt-8 sm:px-6 sm:pt-10">
          <nav aria-label="Breadcrumb" className="mb-6 text-small text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/tools" className="hover:text-ink">Free Tools</Link></li>
              <li aria-hidden>/</li>
              <li className="text-ink" aria-current="page">{entry.name}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 text-tiny-label font-mono uppercase tracking-wider text-clay-dark">
            <Icon size={15} aria-hidden />
            {entry.eyebrow}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-hero-sm font-bold leading-tight text-ink sm:text-section">
            {entry.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-ink/80">{entry.answer}</p>
        </div>
      </header>

      {/* The calculator */}
      <section aria-label={`${entry.name} tool`} className="scroll-mt-header">
        <div className="mx-auto max-w-container px-4 py-8 sm:px-6 sm:py-10">
          {calculator}
          <p className="mt-4 text-small text-muted">
            Free · no signup · calculations stay in your browser — nothing you type is uploaded unless you send the separate contact form.
          </p>
        </div>
      </section>

      {/* Prose — server-rendered for crawlability + AEO */}
      <div className="mx-auto max-w-container px-4 pb-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="max-w-3xl space-y-10">
            <section>
              <h2 className="font-display text-section-sm font-bold text-ink">What this tool calculates</h2>
              <p className="mt-3 text-body text-ink/80">{entry.whatItCalculates}</p>
            </section>

            <ProseSection section={entry.methodology} />
            <ProseSection section={entry.workedExample} />

            <section>
              <h2 className="font-display text-section-sm font-bold text-ink">How to use it</h2>
              <ol className="mt-4 space-y-2.5">
                {entry.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-body text-ink/80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-tiny-label font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-card border border-line bg-paper-2 p-5 sm:p-6">
              <h2 className="font-display text-card-title font-bold text-ink">Key takeaways</h2>
              <ul className="mt-3 space-y-2">
                {entry.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-2.5 text-body text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-section-sm font-bold text-ink">Assumptions &amp; limitations</h2>
              <ul className="mt-4 space-y-2">
                {entry.assumptions.map((a, i) => (
                  <li key={i} className="flex gap-2.5 text-small text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-section-sm font-bold text-ink">Questions contractors ask</h2>
              <div className="mt-4 divide-y divide-line rounded-card border border-line bg-white">
                {entry.faqs.map((f, i) => (
                  <details key={i} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body font-semibold text-ink">
                      {f.q}
                      <span className="text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="mt-3 text-body text-ink/80">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar — conversion + internal links */}
          <aside className="space-y-6 lg:sticky lg:top-header lg:self-start">
            <div className="rounded-card border border-clay/20 bg-clay-soft/50 p-5">
              <h2 className="font-display text-card-title font-bold text-ink">{entry.ctaHeading}</h2>
              <p className="mt-2 text-small text-ink/80">{entry.ctaBody}</p>
              <ToolCtaLink href={ctaHref} slug={entry.slug} className="mt-4 w-full">
                {entry.ctaLabel}
              </ToolCtaLink>
              <Link
                href={entry.relatedServiceHref}
                className="mt-3 block text-center text-small font-semibold text-clay-dark hover:underline"
              >
                {entry.relatedServiceLabel} →
              </Link>
            </div>

            {related.length > 0 && (
              <div className="rounded-card border border-line bg-white p-5">
                <h2 className="text-tiny-label font-mono uppercase tracking-wider text-muted">Related free tools</h2>
                <ul className="mt-3 space-y-3">
                  {related.map((t) => {
                    const RIcon = getIcon(t.icon);
                    return (
                      <li key={t.slug}>
                        <Link href={toolPath(t.slug)} className="group flex gap-3">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-card-sm bg-paper-2 text-ink">
                            <RIcon size={16} aria-hidden />
                          </span>
                          <span>
                            <span className="block text-small font-semibold text-ink group-hover:text-clay-dark">{t.name}</span>
                            <span className="block text-small text-muted">{t.problem}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="pt-1">
                    <Link href="/tools" className="text-small font-semibold text-clay-dark hover:underline">
                      All free tools →
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Closing CTA band */}
      <section className="border-t border-line bg-ink">
        <div className="mx-auto max-w-container px-4 py-12 text-center sm:px-6">
          <h2 className="mx-auto max-w-2xl font-display text-section-sm font-bold text-white">{entry.ctaHeading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-body text-white/70">{entry.ctaBody}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <ToolCtaLink href={ctaHref} slug={entry.slug}>
              {entry.ctaLabel}
            </ToolCtaLink>
            <Link href={entry.relatedServiceHref} className="text-small font-semibold text-white/80 hover:text-white">
              {entry.relatedServiceLabel} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
