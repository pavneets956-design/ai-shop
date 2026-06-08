import type { Metadata } from "next";
import GlowBackground from "@/components/GlowBackground";
import FAQSection from "@/components/FAQSection";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/data/faqs";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ — Custom AI Apps, Agents & Automation",
  description:
    "Answers to common questions about building custom AI tools: what AI Shop can build, how much it costs, how long it takes, whether you own the code, and how to start.",
  alternates: { canonical: "/faq" },
};

const groups = [
  { key: "general", label: "General" },
  { key: "pricing", label: "Pricing" },
  { key: "process", label: "Process" },
  { key: "technical", label: "Technical" },
] as const;

export default function FAQPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />

      <section className="relative overflow-hidden pb-10 pt-32">
        <GlowBackground variant="hero" />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <span className="eyebrow">FAQ</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Everything you might ask
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
              Straight answers about what we build, what it costs, and how it works.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl space-y-16 px-4">
          {groups.map((g) => {
            const items = faqs.filter((f) => f.category === g.key);
            if (!items.length) return null;
            return (
              <div key={g.key}>
                <SectionHeading title={g.label} align="left" />
                <div className="mt-8">
                  <FAQSection items={items} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-ink">Still have a question?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 text-ink/60">
              Ask it directly — start a build request and tell us what you&apos;re thinking.
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
