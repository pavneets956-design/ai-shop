import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { getIcon } from "@/lib/icons";
import { selfServeTools } from "@/lib/data/tools";

export const metadata: Metadata = {
  title: "AI Tools for Small Businesses — Tools Pro by Handbuilt",
  description:
    "AI tools for local and small businesses: proposal generator, quote & estimate generator, Google review reply writer, business brief generator and invoice reminders. One Tools Pro subscription unlocks them all.",
  alternates: { canonical: "/tools" },
};

export default function ToolsHubPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pb-10 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">Tools Pro</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
              Every AI tool. <span className="text-gradient-brand">One subscription.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/60">
              Generate proposals, quotes, review replies, briefs and reminders in seconds — built
              and tuned by hand. Unlimited use from $19/mo. When you&apos;re ready to put one on
              autopilot, we build it into your business.
            </p>
          </Reveal>
          <Reveal delay={0.13}>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/tools/pro" className="btn-primary">
                Get Tools Pro <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="btn-ghost">
                Already a member? Sign in
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tools grid */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {selfServeTools.map((t, i) => {
              const Icon = getIcon(t.icon);
              return (
                <Reveal key={t.slug} delay={0.04 * i}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="glass-card group flex h-full flex-col p-7 transition hover:-translate-y-0.5"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/[0.08] bg-paper-2/70 text-clay-dark">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 font-display text-xl font-semibold text-ink">{t.name}</h2>
                    <p className="mt-2 text-[15px] text-ink/70">{t.tagline}</p>
                    <p className="mt-2 text-sm text-ink/45">{t.problem}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-clay-dark">
                      Open tool
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}

            {/* Done-for-you bridge card */}
            <Reveal delay={0.04 * selfServeTools.length}>
              <div className="spec-frame flex h-full flex-col justify-center bg-paper-2/60 p-7">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-clay/20 bg-white px-3 py-1 text-xs font-semibold text-clay-dark">
                  <Sparkles className="h-3.5 w-3.5" /> Done for you
                </span>
                <p className="mt-4 font-display text-xl font-semibold text-ink">
                  Want these running automatically?
                </p>
                <p className="mt-2 text-sm text-ink/60">
                  The shop has the done-for-you versions — built, connected and tuned for your
                  business.
                </p>
                <Link
                  href="/shop"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-dark hover:text-clay"
                >
                  Visit the shop <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative border-t border-ink/[0.06] py-20 text-center sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Pro tool today, full system tomorrow
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              Use the tools as much as you like on Pro. When one becomes part of how you work,
              we&apos;ll build it into your business — automated and connected to everything you
              already use.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton href="/create">
                Build my AI system <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <Link href="/shop" className="btn-ghost">
                Browse the shop <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
