import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import ProCheckout from "@/components/ProCheckout";
import { getIcon } from "@/lib/icons";
import { selfServeTools } from "@/lib/data/tools";

export const metadata: Metadata = {
  title: "Tools Pro — Every AI Business Tool, Unlimited",
  description:
    "One subscription unlocks every Handbuilt AI tool: proposal generator, quote & estimate generator, review reply writer, business brief generator and invoice reminders. Built and tuned by hand.",
  alternates: { canonical: "/tools/pro" },
};

export default function ToolsProPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32">
      <GlowBackground variant="hero" />
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
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
              The tools that write your proposals, price your jobs, reply to reviews and chase your
              invoices — built and tuned by hand, unlimited use, one price.
            </p>
          </Reveal>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Plan */}
          <Reveal>
            <ProCheckout callbackUrl="/tools/pro" />
          </Reveal>

          {/* What's inside */}
          <Reveal delay={0.08}>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">What&apos;s inside</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {selfServeTools.map((t) => {
                  const Icon = getIcon(t.icon);
                  return (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="glass-card group flex flex-col p-5 transition hover:-translate-y-0.5"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/[0.08] bg-paper-2/70 text-clay-dark">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <h3 className="mt-3 font-display text-base font-semibold text-ink">
                        {t.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink/60">{t.tagline}</p>
                    </Link>
                  );
                })}
                <div className="spec-frame flex flex-col justify-center bg-paper-2/60 p-5">
                  <p className="text-sm font-semibold text-ink">+ more added regularly</p>
                  <p className="mt-1 text-sm text-ink/55">New tools land in Pro automatically.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Done-for-you bridge */}
        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-ink/[0.08] bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                Want it fully automated instead?
              </h2>
              <p className="mt-1 text-ink/60">
                Pro is hands-on. The shop has the done-for-you systems — built into your business
                and run for you.
              </p>
            </div>
            <Link href="/shop" className="btn-secondary shrink-0">
              Visit the shop <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 text-center text-sm text-ink/50">
            Questions first?{" "}
            <Link href="/create" className="font-semibold text-clay-dark hover:text-clay">
              Talk to Handbuilt <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
