import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { locations } from "@/lib/data/locations";
import { BUILD_AND_PHONE_PRICING } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "AI Automation by Location",
  description:
    `AI automation, receptionists and custom apps for small businesses in Surrey, Delta, Vancouver and across the Lower Mainland. CAD pricing: ${BUILD_AND_PHONE_PRICING}.`,
  alternates: { canonical: "/locations" },
};

export default function Page() {
  return (
    <LandingHub
      type="location"
      eyebrow="Locations"
      title="AI Automation Near You"
      intro="Built in Surrey/Delta BC, working with businesses across the Lower Mainland and remotely across Canada. Same builder, same fixed CAD pricing, wherever you are — starting at $1,500."
      items={locations}
    />
  );
}
