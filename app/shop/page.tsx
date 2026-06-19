import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles, Plug, Clock, Wallet } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { shopSchema } from "@/lib/seo";
import { getIcon } from "@/lib/icons";
import { liveSaas, utmHref } from "@/lib/data/shop";
import { shopProducts, shopIndustries } from "@/lib/data/shopProducts";

export const metadata: Metadata = {
  title: "Shop — AI tools you can actually install into your business",
  description:
    "Ready-to-install AI tools for local businesses, built for you in days. AI receptionist, quote generator, lead follow-up, website sales assistant and invoice nudges — plus live SaaS from the same studio.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <JsonLd data={shopSchema(shopProducts)} />
      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden pb-12 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">The shop</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
              AI tools you can actually{" "}
              <span className="text-gradient-brand">install into your business</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/60">
              Pick a ready-made AI system, connect it to the tools you already use, and start
              saving time in days — not months. Built by hand, one business at a time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Free self-serve tools banner ---------- */}
      <section className="relative pb-4">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <Link
              href="/tools"
              className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-paper-2/60 p-6 transition hover:border-line-strong sm:flex-row sm:items-center"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line bg-white text-ink">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    Prefer to do it yourself? Get Tools Pro.
                  </p>
                  <p className="mt-1 text-sm text-ink/60">
                    Proposals, quotes, review replies and more — every AI tool, unlimited, from
                    $19/mo.
                  </p>
                </div>
              </div>
              <span className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-ink">
                See Tools Pro
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Top advisory: help picking ---------- */}
      <section className="relative pb-4 pt-4">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="glass-card flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
              <div>
                <span className="eyebrow">Need help picking?</span>
                <p className="mt-3 max-w-2xl text-[15px] text-ink/75">
                  Not sure which system fits? Start with the AI Receptionist or Quote Agent — they
                  solve the most common missed-revenue problems.
                </p>
              </div>
              <Link href="/create" className="btn-secondary flex-none text-sm">
                Get a recommendation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Band 1: Ready-to-install AI tools ---------- */}
      <section className="relative pb-8 pt-4">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <span className="eyebrow">01 / Ready-to-install AI systems</span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Systems that pay for themselves
            </h2>
            <p className="mt-2 max-w-xl text-ink/55">
              Each one solves a specific, expensive problem. Some are a one-time build you own and
              run on your own accounts; the always-on ones we host and run for a flat monthly — no
              API keys, no surprise bills.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {shopProducts.map((p, i) => {
              const Icon = getIcon(p.icon);
              const billingLabel =
                p.billing === "managed"
                  ? "Monthly · we run it"
                  : p.billing === "hybrid"
                    ? "Setup + monthly"
                    : "One-time build";
              return (
                <Reveal key={p.slug} delay={0.04 * i}>
                  <div className="glass-card spec-frame flex h-full flex-col p-7">
                    {/* Head */}
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-ink/[0.08] bg-paper-2/70 text-ink">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-xl font-semibold text-ink">{p.name}</h3>
                          {p.badge && (
                            <span className="rounded-full border border-line bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-ink/40">
                          {p.delivery} · {billingLabel}
                        </p>
                      </div>
                    </div>

                    {/* Problem → outcome */}
                    <p className="mt-5 text-sm text-ink/55">
                      <span className="font-semibold text-ink/70">The problem: </span>
                      {p.problem}
                    </p>
                    <p className="mt-2 text-[15px] text-ink/80">{p.outcome}</p>
                    <p className="mt-3 text-sm text-ink/45">{p.forWho}</p>

                    {/* Integrations */}
                    <div className="mt-5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                        <Plug className="h-3.5 w-3.5" /> Connects with
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.integrations.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-ink/[0.08] bg-paper-2/60 px-2.5 py-1 text-xs font-medium text-ink/65"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer: who-pays-usage disclosure + price + time + CTAs */}
                    <div className="mt-auto pt-6">
                      <div className="mb-4 flex items-start gap-2 rounded-xl border border-ink/[0.06] bg-paper-2/40 px-3 py-2.5">
                        <Wallet className="mt-0.5 h-3.5 w-3.5 flex-none text-ink/35" aria-hidden="true" />
                        <p className="text-xs leading-relaxed text-ink/55">{p.usageNote}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-ink/[0.06] pt-5">
                        <span className="text-sm font-semibold text-ink/75">{p.priceLabel}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-ink/45">
                          <Clock className="h-3.5 w-3.5" /> {p.timeToLaunch}
                        </span>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Link
                          href={`/create?build=${p.slug}`}
                          className="btn-primary inline-flex items-center justify-center gap-1.5 text-sm"
                        >
                          Get it built <ArrowRight className="h-4 w-4" />
                        </Link>
                        {p.demoHref && (
                          <Link href={p.demoHref} className="btn-secondary text-sm">
                            Try it live <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                      {p.learnHref && (
                        <Link
                          href={p.learnHref}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink/45 transition hover:text-ink"
                        >
                          How it works <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 text-center text-sm text-ink/50">
              One-time builds run on your own accounts — you own them outright. Managed systems are
              hosted and run by us, AI usage included.{" "}
              <Link href="/pricing" className="font-semibold text-ink hover:text-ink">
                See full pricing
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Band 2: Built for these businesses ---------- */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <span className="eyebrow">02 / Built for these businesses</span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Tuned for how your trade actually works
            </h2>
            <p className="mt-2 max-w-xl text-ink/55">
              Same tools, configured around your jobs, pricing and busy season.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {shopIndustries.map((ind, i) => (
              <Reveal key={ind.slug} delay={0.02 * i}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="glass-card group flex items-center justify-between px-4 py-3.5 text-sm font-medium text-ink/75 transition hover:text-ink"
                >
                  {ind.label}
                  <ArrowUpRight className="h-4 w-4 text-ink/30 transition group-hover:text-ink" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Band 3: Live proof ---------- */}
      <section className="relative pb-4">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <span className="eyebrow">03 / Live proof</span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Real SaaS, running in production
            </h2>
            <p className="mt-2 max-w-xl text-ink/55">
              Not the things you buy here — the proof the same studio ships and runs real software.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {liveSaas.map((item, i) => (
              <Reveal key={item.id} delay={0.05 * i}>
                <div className="glass-card border-glow flex h-full flex-col p-7">
                  {item.eyebrow && (
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                      {item.eyebrow}
                    </span>
                  )}
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{item.name}</h3>
                  <p className="mt-2 text-[15px] text-ink/70">{item.tagline}</p>
                  <p className="mt-1 text-sm text-ink/45">{item.forWho}</p>

                  <ul className="mt-5 space-y-2">
                    {item.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ink/40" />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-ink/[0.06] pt-5">
                    <span className="text-sm font-medium text-ink/60">{item.priceLabel}</span>
                    {item.href ? (
                      <a
                        href={utmHref(item.href, item.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-ink"
                      >
                        Live product <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href="/create"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-ink"
                      >
                        Ask about it <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Band 4: Tools Pro vs done-for-you AI System ---------- */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <span className="eyebrow">Two ways to work with us</span>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Self-serve Tools Pro vs done-for-you AI System
            </h2>
            <p className="mt-2 max-w-xl text-ink/55">
              Move fast on your own, or have the whole system built and connected for you.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {/* Tools Pro column */}
              <div className="glass-card flex h-full flex-col p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                  Self-serve
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">Tools Pro</h3>
                <dl className="mt-6 space-y-4">
                  <div className="border-t border-ink/[0.06] pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                      Price
                    </dt>
                    <dd className="mt-1 text-sm text-ink/80">$19/mo, unlimited</dd>
                  </div>
                  <div className="border-t border-ink/[0.06] pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                      Setup
                    </dt>
                    <dd className="mt-1 text-sm text-ink/80">Use it today, no setup</dd>
                  </div>
                  <div className="border-t border-ink/[0.06] pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                      Integrations
                    </dt>
                    <dd className="mt-1 text-sm text-ink/80">You configure</dd>
                  </div>
                  <div className="border-t border-ink/[0.06] pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                      Support
                    </dt>
                    <dd className="mt-1 text-sm text-ink/80">Docs &amp; updates</dd>
                  </div>
                  <div className="border-t border-ink/[0.06] pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                      Best for
                    </dt>
                    <dd className="mt-1 text-sm text-ink/80">Daily business writing &amp; quick tools</dd>
                  </div>
                </dl>
              </div>

              {/* AI System column — amber accent */}
              <div className="glass-card flex h-full flex-col border-line-strong p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  Done for you
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">AI System</h3>
                <dl className="mt-6 space-y-4">
                  <div className="border-t border-line pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      Price
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      from $1,000 one-time — or hosted from $129/mo
                    </dd>
                  </div>
                  <div className="border-t border-line pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      Setup
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      Installed for you in ~5 days–3 weeks
                    </dd>
                  </div>
                  <div className="border-t border-line pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      Integrations
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">Built &amp; connected by Handbuilt</dd>
                  </div>
                  <div className="border-t border-line pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      Support
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      Dedicated setup + optional Care Plan ($250/mo)
                    </dd>
                  </div>
                  <div className="border-t border-line pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      Best for
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-ink">
                      Automating calls, quotes &amp; follow-ups
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/tools/pro" className="btn-secondary text-sm">
                Explore Tools Pro <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/create" className="btn-primary text-sm">
                Start a build <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Closing band ---------- */}
      <section className="relative border-t border-ink/[0.06] py-20 text-center sm:py-28">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink">
              <Sparkles className="h-3.5 w-3.5" /> Not sure which one?
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Tell me what&apos;s slowing you down
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              Answer a couple of questions and I&apos;ll map the exact system for your business —
              what to build, what it connects to, and what it costs.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticButton href="/create">
                Find my AI system <ArrowRight className="h-4 w-4" />
              </MagneticButton>
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
