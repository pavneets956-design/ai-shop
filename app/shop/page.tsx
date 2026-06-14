import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { featuredService, liveSaas, utmHref } from "@/lib/data/shop";

export const metadata: Metadata = {
  title: "Shop — What Handbuilt has shipped",
  description:
    "Custom AI built by hand for local businesses. The AI Receptionist done-for-you build, plus live SaaS from the same studio — COITracker and PayNudge.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden pb-12 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">The shop</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
              What Handbuilt <span className="text-gradient-brand">has shipped</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/60">
              Custom AI, built by hand for local businesses — and the same studio runs real
              SaaS in production. Here&apos;s what that looks like.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Featured: AI Receptionist (the one buyable offer) ---------- */}
      <section className="relative pb-8 pt-4">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="glass-card spec-frame overflow-hidden p-0">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Copy */}
                <div className="p-8 sm:p-10">
                  {featuredService.eyebrow && (
                    <span className="eyebrow">01 / {featuredService.eyebrow}</span>
                  )}
                  <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {featuredService.name}
                  </h2>
                  <p className="mt-3 text-lg text-ink/70">{featuredService.tagline}</p>
                  <p className="mt-2 text-sm text-ink/50">{featuredService.forWho}</p>

                  <ul className="mt-6 space-y-3">
                    {featuredService.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-[15px] text-ink/80">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-clay/[0.12] text-clay-dark">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <MagneticButton href="/create?package=starter">
                      Get the AI Receptionist <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                    {featuredService.demoHref && (
                      <Link href={featuredService.demoHref} className="btn-secondary">
                        Try it live <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-medium text-ink/60">
                    {featuredService.priceLabel}
                  </p>
                </div>

                {/* Visual / demo invite */}
                <div className="relative flex flex-col justify-center border-t border-ink/[0.06] bg-paper-2/60 p-8 sm:p-10 lg:border-l lg:border-t-0">
                  <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" aria-hidden />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-white px-3 py-1 text-xs font-semibold text-clay-dark">
                      <Sparkles className="h-3.5 w-3.5" /> Live demo
                    </div>
                    <p className="mt-4 font-display text-2xl font-semibold leading-snug text-ink">
                      You be the customer.
                    </p>
                    <p className="mt-2 text-sm text-ink/60">
                      Message the receptionist exactly like one of your customers would — see how it
                      answers, in your business&apos;s voice.
                    </p>
                    {featuredService.demoHref && (
                      <Link
                        href={featuredService.demoHref}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-clay-dark hover:text-clay"
                      >
                        Open the live demo <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Also handbuilt: live SaaS (proof rail) ---------- */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">02 / Also handbuilt</span>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Live SaaS, running in production
                </h2>
                <p className="mt-2 max-w-xl text-ink/55">
                  Real products from the same studio — proof this isn&apos;t just demos.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {liveSaas.map((item, i) => {
              const hasLink = Boolean(item.href);
              return (
                <Reveal key={item.id} delay={0.05 * i}>
                  <div className="glass-card border-glow flex h-full flex-col p-7">
                    {item.eyebrow && (
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                        {item.eyebrow}
                      </span>
                    )}
                    <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-[15px] text-ink/70">{item.tagline}</p>
                    <p className="mt-1 text-sm text-ink/45">{item.forWho}</p>

                    <ul className="mt-5 space-y-2">
                      {item.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-2.5 text-sm text-ink/75">
                          <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-clay/60" />
                          {o}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex items-center justify-between border-t border-ink/[0.06] pt-5">
                      <span className="text-sm font-medium text-ink/60">{item.priceLabel}</span>
                      {hasLink ? (
                        <a
                          href={utmHref(item.href, item.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-clay-dark hover:text-clay"
                        >
                          Live product <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link
                          href="/create"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-clay-dark hover:text-clay"
                        >
                          Ask about it <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Closing band ---------- */}
      <section className="relative border-t border-ink/[0.06] py-20 text-center sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Don&apos;t see your problem here?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              That&apos;s the point — everything Handbuilt makes is built around one business at a
              time. Tell me what&apos;s slowing you down and I&apos;ll build the system for it.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton href="/create">Tell me what you need</MagneticButton>
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
