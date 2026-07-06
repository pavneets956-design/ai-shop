import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "AI Automation by Location",
  description:
    "AI automation, receptionists and custom apps for small businesses in Surrey, Delta, Vancouver and across the Lower Mainland — built by hand, remote across Canada. From $1,500 CAD.",
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
