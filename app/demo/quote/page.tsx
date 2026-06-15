import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import ToolGenerator, { type GenBusiness, type GenField } from "@/components/ToolGenerator";

export const metadata: Metadata = {
  title: "Live Demo — AI Quote Generator",
  description:
    "Try a real AI quote generator built by Handbuilt. Describe a job and get an instant ballpark estimate plus a clean lead summary — exactly what your customers would get on your site.",
  alternates: { canonical: "/demo/quote" },
};

const BUSINESSES: GenBusiness[] = [
  { id: "landscaping", chip: "Landscaping", desc: "Greenline Landscaping, a landscaping company" },
  { id: "cleaning", chip: "Cleaning", desc: "Sparkle Clean Co, a home cleaning company" },
  { id: "painting", chip: "Painting", desc: "TrueCoat Painting, a painting company" },
  { id: "moving", chip: "Movers", desc: "Lift & Go Movers, a moving company" },
];

const FIELDS: GenField[] = [
  {
    key: "service",
    label: "What do you need?",
    type: "text",
    placeholder: "e.g. Weekly lawn maintenance for a 1/4-acre yard",
    required: true,
  },
  {
    key: "details",
    label: "Job details",
    type: "textarea",
    placeholder: "Size, condition, access, anything special the quote should account for…",
    required: true,
  },
  {
    key: "timeline / location",
    label: "Timeline & location (optional)",
    type: "text",
    placeholder: "e.g. Need it within 2 weeks, Surrey BC",
  },
];

export default function QuoteDemoPage() {
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
              Get an instant quote
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
              Pick a business, describe a job, and watch the AI return a ballpark estimate plus a
              clean lead summary — the exact experience your customers would get on your site.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ToolGenerator
            kind="quote"
            businesses={BUSINESSES}
            fields={FIELDS}
            submitLabel="Get my estimate"
            resultTitle="Your instant estimate"
          />
        </Reveal>

        <p className="mt-3 text-center text-xs text-ink/35">
          Estimates are rough ballparks framed for the owner to confirm — never fake guaranteed
          prices. That honesty is built into the tool.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-ink/[0.08] bg-white p-6 text-center shadow-card">
          <p className="text-ink/80">
            Want this turning your website visitors into{" "}
            <span className="text-ink">priced, qualified leads</span> automatically?
          </p>
          <Link href="/create?build=ai-quote-generator" className="btn-primary">
            Build mine <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
