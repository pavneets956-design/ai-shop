import type { Metadata } from "next";
import ConsultationCall from "@/components/ConsultationCall";

export const metadata: Metadata = {
  title: "The AI Builder — a one-minute guided plan for your business",
  description:
    "Answer six questions about your business and the AI Builder maps a workflow and a costed plan on screen — AI receptionist, chat agent, quote agent, lead follow-up or invoice reminders. A fixed script, not a chatbot. Nothing is emailed to you.",
  alternates: { canonical: "/start" },
};

/**
 * The AI Builder. The ConsultationCall component renders a full-screen overlay
 * (z-100) above the global nav/footer for immersion.
 *
 * The text below stays in the server-rendered HTML so search engines and AI
 * answer-engines can read what this page is — the overlay never costs us
 * crawlable content (SEO/GEO requirement).
 *
 * TRUTHFULNESS: this page is a DETERMINISTIC SCRIPT (see ConsultationCall's
 * header comment and lib/data/builder.ts). It is not a language model, it does
 * not call /api/consultation, and it emails the visitor nothing. Both the
 * crawlable copy and the pre-tap gate copy have to say so — the previous
 * wording ("talk to the Handbuilt AI", "your plan has been sent to you") sold it
 * as something it is not.
 */
export default function StartPage() {
  return (
    <>
      {/* Crawlable content (visually covered by the overlay, present in HTML) */}
      <section className="mx-auto max-w-3xl px-4 py-32">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
          The AI Builder — a one-minute plan for your business
        </h1>
        <p className="mt-5 text-lg text-ink">
          Six questions about how your business runs, then your email at the end. The AI
          Builder puts the workflow and a costed plan on screen, then points you at the right
          page to go to next.
        </p>
        <h2 className="mt-10 text-2xl font-semibold text-ink">What this actually is</h2>
        <ul className="mt-4 space-y-2 text-ink-soft">
          <li>
            A fixed script, not a chatbot — the same questions every time, and the same pricing
            quoted on the pricing page.
          </li>
          <li>It reads the questions aloud, but every word is also on screen. Sound is optional.</li>
          <li>About a minute: four taps and four short typed answers.</li>
          <li>
            Nothing is emailed to you. At the end you can send your answers to Pavneet, and he
            replies within one business day.
          </li>
        </ul>
        <h2 className="mt-10 text-2xl font-semibold text-ink">What it can recommend</h2>
        <ul className="mt-4 space-y-2 text-ink-soft">
          <li>AI receptionist that answers every call and books jobs, day or night.</li>
          <li>Website chat agent that talks to visitors 24/7 and turns them into bookings.</li>
          <li>Lead follow-up that replies to a new enquiry before it goes cold.</li>
          <li>Quote agent and invoice reminders that run without you.</li>
        </ul>
        <p className="mt-8 text-ink-soft">Serving local businesses in Surrey, BC and beyond.</p>
      </section>

      <ConsultationCall />
    </>
  );
}
