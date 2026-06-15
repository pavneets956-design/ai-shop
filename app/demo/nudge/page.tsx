import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import ToolGenerator, { type GenBusiness, type GenField } from "@/components/ToolGenerator";

export const metadata: Metadata = {
  title: "Live Demo — AI Invoice & Payment Nudge",
  description:
    "Try a real AI payment-reminder writer built by Handbuilt. Enter an overdue invoice and get a polite, on-brand nudge ready to send — no awkward phone calls.",
  alternates: { canonical: "/demo/nudge" },
};

const BUSINESSES: GenBusiness[] = [
  { id: "contractor", chip: "Contractor", desc: "a contracting business" },
  { id: "agency", chip: "Agency / Freelance", desc: "a creative agency" },
  { id: "studio", chip: "Studio / Services", desc: "a local service studio" },
];

const FIELDS: GenField[] = [
  { key: "client", label: "Client name", type: "text", placeholder: "e.g. Dave at Marlin Cafe", required: true },
  { key: "amount", label: "Amount owed", type: "text", placeholder: "e.g. $1,250", required: true },
  { key: "days overdue", label: "Days overdue", type: "text", placeholder: "e.g. 14" },
  {
    key: "tone",
    label: "Tone",
    type: "select",
    options: ["Friendly first reminder", "Firm but polite", "Final notice (still professional)"],
    required: true,
  },
];

export default function NudgeDemoPage() {
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
              Draft a payment reminder
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">
              Enter an overdue invoice and get a polite, on-brand nudge in seconds — the kind this
              tool sends automatically on a schedule until you&apos;re paid.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ToolGenerator
            kind="nudge"
            businesses={BUSINESSES}
            fields={FIELDS}
            submitLabel="Draft the reminder"
            resultTitle="Reminder draft"
            copyable
          />
        </Reveal>

        <p className="mt-3 text-center text-xs text-ink/35">
          The real tool sends these for you automatically — on a schedule, on-brand — until the
          invoice is paid.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-ink/[0.08] bg-white p-6 text-center shadow-card">
          <p className="text-ink/80">
            Want to <span className="text-ink">stop chasing payments</span> and get invoices paid
            faster?
          </p>
          <Link href="/create?build=ai-invoice-reminder-system" className="btn-primary">
            Build mine <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
