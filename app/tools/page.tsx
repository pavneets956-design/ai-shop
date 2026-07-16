import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getIcon } from "@/lib/icons";
import {
  freeToolsByOrder,
  TOOL_CATEGORIES,
  MORE_FREE_TOOLS,
  TOOLS_HUB,
  toolPath,
  toolsHubMetadata,
  toolsHubJsonLd,
} from "@/lib/data/freeTools";

export const metadata: Metadata = toolsHubMetadata();

export default function ToolsHubPage() {
  return (
    <>
      <JsonLd data={toolsHubJsonLd()} />

      {/* Hero */}
      <header className="border-b border-line bg-paper-2/60">
        <div className="mx-auto max-w-container px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <p className="text-tiny-label font-mono uppercase tracking-wider text-clay-dark">{TOOLS_HUB.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-hero-sm font-bold leading-tight text-ink sm:text-section">
            {TOOLS_HUB.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-ink/80">{TOOLS_HUB.answer}</p>
        </div>
      </header>

      {/* Recommend by problem */}
      <section className="mx-auto max-w-container px-4 py-10 sm:px-6">
        <h2 className="text-tiny-label font-mono uppercase tracking-wider text-muted">Start with your problem</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {freeToolsByOrder.map((t) => (
            <li key={t.slug}>
              <Link
                href={toolPath(t.slug)}
                className="group flex items-start gap-2 rounded-card-sm border border-line bg-white px-4 py-3 transition-colors hover:border-clay/40 hover:bg-clay-soft/30"
              >
                <span className="text-clay">→</span>
                <span className="text-body text-ink/80">
                  “{t.problem}” <span className="font-semibold text-ink group-hover:text-clay-dark">{t.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Tool cards by category */}
      {TOOL_CATEGORIES.map((cat) => {
        const tools = freeToolsByOrder.filter((t) => t.category === cat.key);
        if (tools.length === 0) return null;
        return (
          <section key={cat.key} className="mx-auto max-w-container px-4 pb-4 sm:px-6">
            <div className="mb-4">
              <h2 className="font-display text-section-sm font-bold text-ink">{cat.key}</h2>
              <p className="mt-1 text-small text-muted">{cat.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => {
                const Icon = getIcon(t.icon);
                return (
                  <Link
                    key={t.slug}
                    href={toolPath(t.slug)}
                    className="group flex flex-col rounded-card border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-clay/40"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-card-sm bg-ink text-white">
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-card-title font-bold text-ink group-hover:text-clay-dark">{t.name}</h3>
                    <p className="mt-2 flex-1 text-small text-ink/75">{t.cardSummary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-clay-dark">
                      Open tool <span aria-hidden>→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Why free / intro content (not thin) */}
      <section className="mx-auto max-w-container px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="font-display text-section-sm font-bold text-ink">Genuinely free tools, built for contractors</h2>
          <p className="text-body text-ink/80">
            Every tool here runs entirely in your browser. There’s no account to create, no email to enter before you see
            results, and nothing you type is uploaded or stored on our servers. Bookmark them, use them on the truck, and
            come back whenever you’re pricing a job, chasing a quote, or wondering where your leads are going.
          </p>
          <p className="text-body text-ink/80">
            We build these because the same problems come up on every job: pricing that doesn’t leave money on the table,
            follow-up that actually happens, and calls that don’t get missed. When you’d rather have those handled
            automatically instead of by hand, that’s what we do —{" "}
            <Link href="/ai-receptionist" className="font-semibold text-clay-dark hover:underline">AI receptionists</Link>,{" "}
            <Link href="/services/ai-crm-automation" className="font-semibold text-clay-dark hover:underline">follow-up automation</Link>, and{" "}
            <Link href="/custom-ai-app-development" className="font-semibold text-clay-dark hover:underline">custom business systems</Link>{" "}
            built around how you actually work.
          </p>
        </div>
      </section>

      {/* More free business tools (cross-domain, our other sites) */}
      <section className="border-t border-line bg-paper-2/60">
        <div className="mx-auto max-w-container px-4 py-10 sm:px-6">
          <h2 className="font-display text-card-title font-bold text-ink">More free business tools</h2>
          <p className="mt-1 text-small text-muted">Free tools we built on our other sites — handy for running the back office.</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {MORE_FREE_TOOLS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-card-sm border border-line bg-white px-4 py-3 transition-colors hover:border-clay/40"
                >
                  <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-muted group-hover:text-clay-dark" aria-hidden />
                  <span>
                    <span className="block text-small font-semibold text-ink group-hover:text-clay-dark">{l.label}</span>
                    {l.note && <span className="block text-small text-muted">{l.note}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-ink">
        <div className="mx-auto max-w-container px-4 py-12 text-center sm:px-6">
          <h2 className="mx-auto max-w-2xl font-display text-section-sm font-bold text-white">
            Rather have this handled for you?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body text-white/70">
            Tell us what’s eating your time. We’ll design a system that prices, follows up, and answers the phone so you
            don’t have to.
          </p>
          <div className="mt-6">
            <Link href="/create?src=tools-hub" className="btn-primary">Get a free workflow fit check</Link>
          </div>
        </div>
      </section>
    </>
  );
}
