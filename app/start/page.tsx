import type { Metadata } from "next";
import ConsultationCall from "@/components/ConsultationCall";

export const metadata: Metadata = {
  title: "Start your AI consultation — talk to the Handbuilt AI",
  description:
    "Have a quick call with the Handbuilt AI. Tell it about your business and it maps out a custom plan for an AI receptionist, website chat agent, lead engine, or a new AI-powered website — in about a minute.",
  alternates: { canonical: "/start" },
};

/**
 * The AI "call" experience. The ConsultationCall component renders a
 * full-screen overlay (z-100) above the global nav/footer for immersion.
 *
 * The text below stays in the server-rendered HTML so search engines and
 * AI answer-engines can read what this page is — the cinematic overlay
 * never costs us crawlable content (SEO/GEO requirement).
 */
export default function StartPage() {
  return (
    <>
      {/* Crawlable content (visually covered by the overlay, present in HTML) */}
      <section className="mx-auto max-w-3xl px-4 py-32">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          Start your AI consultation
        </h1>
        <p className="mt-5 text-lg text-ink/60">
          Talk to the Handbuilt AI for about a minute. It asks a few questions about your
          business, then hands you a custom plan and the right next step.
        </p>
        <h2 className="mt-10 text-2xl font-semibold text-ink">What Handbuilt can build for you</h2>
        <ul className="mt-4 space-y-2 text-ink/70">
          <li>AI receptionist that answers every call and books jobs, day or night.</li>
          <li>Website chat agent that talks to visitors 24/7 and turns them into bookings.</li>
          <li>Lead engine that qualifies and captures leads automatically.</li>
          <li>A fast, modern, AI-powered website built to rank and convert.</li>
        </ul>
        <p className="mt-8 text-ink/50">
          Serving local businesses in Surrey, BC and beyond.
        </p>
      </section>

      <ConsultationCall />
    </>
  );
}
