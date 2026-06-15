import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import ToolChat from "@/components/ToolChat";

export const metadata: Metadata = {
  title: "Live Demo — AI Website Sales Assistant",
  description:
    "Try a real AI website assistant built by Handbuilt. Ask it anything like a website visitor — it answers your questions about the business and captures the lead.",
  alternates: { canonical: "/demo/assistant" },
};

export default function AssistantDemoPage() {
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
              Ask the website assistant
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
              You&apos;re a visitor on a physio clinic&apos;s website. Ask about services, pricing or
              booking — see how it answers instead of leaving you guessing, then captures the lead.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ToolChat
            kind="assistant"
            business="Peak Performance Physio, a physiotherapy clinic"
            greeting="Hi! I'm the assistant for Peak Performance Physio. Ask me about our services, pricing, or booking and I'll help you out."
            suggestions={["Do you treat sports injuries?", "How much is a first session?", "Can I book this week?"]}
            label="AI Website Assistant — live"
            sub="Peak Performance Physio"
            placeholder="Ask a question like a website visitor…"
          />
        </Reveal>

        <p className="mt-3 text-center text-xs text-ink/35">
          A real, live AI assistant — trained on a business so it answers visitors and captures
          leads instead of letting them bounce.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-ink/[0.08] bg-white p-6 text-center shadow-card">
          <p className="text-ink/80">
            Want this answering visitors on <span className="text-ink">your</span> site and booking
            calls?
          </p>
          <Link href="/create?build=ai-chatbot-for-website" className="btn-primary">
            Build mine <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
