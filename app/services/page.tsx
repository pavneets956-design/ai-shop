import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "AI Services",
  description:
    "Custom AI tools for small businesses — chatbots, AI receptionists, lead capture, quote generators, automations and more. Built by hand, from $1,500 CAD.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <LandingHub
      type="service"
      eyebrow="AI Services"
      title="AI Services for Small Businesses"
      intro="Pick the AI tool you need — or combine a few into one system. Every build is trained on your real business and built by hand, starting at $1,500 CAD."
      items={services}
    />
  );
}
