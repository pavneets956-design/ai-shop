import type { Metadata } from "next";
import GlowBackground from "@/components/GlowBackground";
import ReceptionistDemo from "@/components/ReceptionistDemo";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Live Demo — Talk to an AI Receptionist",
  description:
    "Try a real, live AI receptionist built by AI Shop. Play the customer — ask for a quote, book a job, or describe an emergency — and see exactly what your callers would experience.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32">
      <GlowBackground variant="subtle" />
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <Reveal>
            <span className="eyebrow">Live demo</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Talk to an AI receptionist
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              No sign-up, no script. Pick a business, then message it like a customer would —
              this is the exact experience your callers would get.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ReceptionistDemo />
        </Reveal>
      </div>
    </section>
  );
}
