import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import ToolChat from "@/components/ToolChat";

export const metadata: Metadata = {
  title: "Live Demo — AI Lead Capture & Follow-Up",
  description:
    "Try a real AI lead assistant built by Handbuilt. Play a new enquiry and watch it reply instantly, qualify you, and capture your details — so no lead goes cold.",
  alternates: { canonical: "/demo/lead" },
};

export default function LeadDemoPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32">
      <GlowBackground variant="subtle" />
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <Reveal>
            <span className="eyebrow">Live demo</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Watch a lead get qualified
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
              You&apos;re a new enquiry to a renovation company. Message it like you just landed on
              their site — see how fast it replies, qualifies you, and grabs your details.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ToolChat
            kind="lead"
            business="Northside Renovations, a home renovation company"
            greeting="Hey, thanks for reaching out to Northside Renovations! 👋 What are you looking to get done?"
            suggestions={["I want a kitchen reno quote", "Just browsing for now", "How soon can you start?"]}
            label="AI Lead Assistant — live"
            sub="Northside Renovations"
            placeholder="Type as if you just enquired…"
          />
        </Reveal>

        <p className="mt-3 text-center text-xs text-ink/35">
          A real, live AI assistant — you&apos;re playing the lead. It replies instantly and follows
          up by email or text until they book.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-ink/[0.08] bg-white p-6 text-center shadow-card">
          <p className="text-ink/80">
            Want this replying to <span className="text-ink">your</span> leads in seconds, day or
            night?
          </p>
          <Link href="/create?build=ai-lead-capture-form" className="btn-primary">
            Build mine <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
