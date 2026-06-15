import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { comparisons } from "@/lib/data/compare";

export const metadata: Metadata = {
  title: "Compare Your Options",
  description:
    "Honest comparisons: custom AI vs off-the-shelf SaaS, AI receptionist vs hiring, automation vs a virtual assistant — and when each one actually makes sense.",
  alternates: { canonical: "/compare" },
};

export default function Page() {
  return (
    <LandingHub
      type="compare"
      eyebrow="Compare"
      title="Compare Your Options"
      intro="Straight comparisons with no strawmen — including when the cheaper or simpler option is the right call for your business."
      items={comparisons}
    />
  );
}
