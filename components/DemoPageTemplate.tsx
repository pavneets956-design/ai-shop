import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";

type DemoPageTemplateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  hint?: string;
  customize: string[];
  ctaText?: string;
  ctaLink: string;
  children: ReactNode;
};

export default function DemoPageTemplate({
  eyebrow = "Live demo",
  title,
  description,
  hint,
  customize,
  ctaText = "Get this installed",
  ctaLink,
  children,
}: DemoPageTemplateProps) {
  return (
    <section className="relative overflow-hidden pb-24 pt-32">
      <GlowBackground variant="subtle" />
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">{description}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>{children}</Reveal>

        {hint ? <p className="mt-3 text-center text-xs text-ink/40">{hint}</p> : null}

        <Reveal delay={0.2}>
          <div className="mt-10">
            <span className="eyebrow">What we customize</span>
            <ul className="mt-4 space-y-2">
              {customize.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink/70">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="glass mt-8 flex flex-col items-center gap-3 rounded-2xl p-6 text-center shadow-card">
            <p className="text-ink/80">
              This is the live tool — we tailor it to{" "}
              <span className="text-ink">your business</span> and install it for you.
            </p>
            <Link href={ctaLink} className="btn-primary">
              {ctaText} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
