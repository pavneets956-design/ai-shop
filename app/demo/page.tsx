import type { Metadata } from "next";
import DemoPageTemplate from "@/components/DemoPageTemplate";
import ReceptionistDemo from "@/components/ReceptionistDemo";

export const metadata: Metadata = {
  title: "Live Demo — Talk to an AI Receptionist",
  description:
    "Try a real, live AI receptionist built by Handbuilt. Play the customer — ask for a quote, book a job, or describe an emergency — and see exactly what your callers would experience.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <DemoPageTemplate
      title="Talk to an AI receptionist"
      description="No sign-up, no script. Pick a business, then message it like a customer would — this is the exact experience your callers would get."
      customize={[
        "Business hours & rules",
        "Call flows & triage",
        "Calendar + booking integration",
      ]}
      ctaText="Get my AI receptionist"
      ctaLink="/create"
    >
      <ReceptionistDemo />
    </DemoPageTemplate>
  );
}
