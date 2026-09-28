import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { resources } from "@/lib/data/resources";

export const metadata: Metadata = {
  title: "AI & Search Visibility Resources",
  description:
    "Practical guides to AI search visibility, local business listings, website enquiries and business automation. Find the next useful step for your business.",
  alternates: { canonical: "/resources" },
};

export default function Page() {
  return (
    <LandingHub
      type="resource"
      eyebrow="Resources"
      title="Getting Found and Putting AI to Work"
      intro="Straight answers about search visibility, website enquiries, costs and what is worth automating. Start with the problem your business needs to solve."
      items={resources}
    />
  );
}
