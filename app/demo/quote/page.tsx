import type { Metadata } from "next";
import DemoPageTemplate from "@/components/DemoPageTemplate";
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
    <DemoPageTemplate
      title="Get an instant quote"
      description="Pick a business, describe a job, and watch the AI return a ballpark estimate plus a clean lead summary — the exact experience your customers would get on your site."
      hint="Estimates are rough ballparks framed for the owner to confirm — never fake guaranteed prices. That honesty is built into the tool."
      customize={[
        "Your services & pricing data",
        "Estimate formula",
        "Lead capture fields",
      ]}
      ctaLink="/create?build=ai-quote-generator"
    >
      <ToolGenerator
        kind="quote"
        businesses={BUSINESSES}
        fields={FIELDS}
        submitLabel="Get my estimate"
        resultTitle="Your instant estimate"
      />
    </DemoPageTemplate>
  );
}
