import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "AI & Search Visibility Services",
  description:
    "Search visibility, AI receptionists, lead capture and custom automations for small businesses. Explore the work and request a review with Handbuilt AI.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <LandingHub
      type="service"
      eyebrow="AI Services"
      title="AI and Search Visibility for Small Businesses"
      intro="Help customers find you, handle incoming enquiries and simplify the work that follows. Explore a service and request a review of your setup."
      items={services}
    />
  );
}
