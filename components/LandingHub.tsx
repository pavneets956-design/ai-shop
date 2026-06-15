import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { getIcon } from "@/lib/icons";
import type { LandingContent, PageType } from "@/lib/data/landing";
import { landingPath } from "@/lib/data/landing";

export default function LandingHub({
  type,
  eyebrow,
  title,
  intro,
  items,
}: {
  type: PageType;
  eyebrow: string;
  title: string;
  intro: string;
  items: LandingContent[];
}) {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/65">{intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => {
              const Icon = item.icon ? getIcon(item.icon) : null;
              return (
                <Reveal key={item.slug} delay={(i % 6) * 0.04}>
                  <Link
                    href={landingPath(type, item.slug)}
                    className="border-glow glass-card group flex h-full flex-col"
                  >
                    <div className="flex items-center justify-between">
                      {Icon && (
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                          <Icon className="h-5 w-5" />
                        </span>
                      )}
                      <ArrowUpRight className="h-4 w-4 text-ink/20 transition group-hover:text-ink" />
                    </div>
                    <h2 className="mt-4 font-display text-lg font-semibold text-ink">{item.h1}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">
                      {item.description}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 text-center">
        <GlowBackground />
        <div className="mx-auto max-w-2xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Not sure which one you need?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 text-ink/60">
              Tell us what you want AI to do for your business and we&apos;ll send a plan and a fixed
              quote within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/create">Start a build</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
