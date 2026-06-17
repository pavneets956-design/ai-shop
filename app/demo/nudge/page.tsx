import type { Metadata } from "next";
import DemoPageTemplate from "@/components/DemoPageTemplate";
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
    <DemoPageTemplate
      title="Draft a payment reminder"
      description="Enter an overdue invoice and get a polite, on-brand nudge in seconds — the kind this tool sends automatically on a schedule until you're paid."
      hint="The real tool sends these for you automatically — on a schedule, on-brand — until the invoice is paid."
      customize={[
        "Invoice template & terms",
        "Payment links",
        "Escalation schedule",
      ]}
      ctaLink="/create?build=ai-invoice-reminder-system"
    >
      <ToolGenerator
        kind="nudge"
        businesses={BUSINESSES}
        fields={FIELDS}
        submitLabel="Draft the reminder"
        resultTitle="Reminder draft"
        copyable
      />
    </DemoPageTemplate>
  );
}
