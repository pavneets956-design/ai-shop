import { Suspense } from "react";
import type { Metadata } from "next";
import GlowBackground from "@/components/GlowBackground";
import BuildRequestForm from "@/components/BuildRequestForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Start a Build — Request Your Custom AI System",
  description:
    "Tell us what you want to build and get a plan and quote within one business day. Custom AI apps, agents, automations and business tools from Handbuilt.",
  alternates: { canonical: "/create" },
};

export default function CreatePage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32">
      <GlowBackground variant="subtle" />
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <Reveal>
            <span className="eyebrow">Start a build</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Tell us what you want to build
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
              Answer a few quick questions. You&apos;ll get a real reply with a plan and a quote
              within one business day — no obligation.
            </p>
          </Reveal>
        </div>

        <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl border border-ink/10 bg-ink/[0.02]" />}>
          <BuildRequestForm />
        </Suspense>
      </div>
    </section>
  );
}
