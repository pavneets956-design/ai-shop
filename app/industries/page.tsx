import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { industries } from "@/lib/data/industries";

export const metadata: Metadata = {
  title: "AI Automation by Industry",
  description:
    "AI automation built for your trade — plumbers, electricians, dental clinics, cleaners, real estate, restaurants and more. Trained on how your business actually runs.",
  alternates: { canonical: "/industries" },
};

export default function Page() {
  return (
    <LandingHub
      type="industry"
      eyebrow="Industries"
      title="AI Automation Built for Your Industry"
      intro="Every trade loses money in different places. Find how AI fits the way your business actually runs — then we build it, from $1,000 CAD."
      items={industries}
    />
  );
}
