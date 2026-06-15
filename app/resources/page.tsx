import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { resources } from "@/lib/data/resources";

export const metadata: Metadata = {
  title: "AI Resources & Guides",
  description:
    "Plain-English answers on AI for small business — what it costs, what an AI receptionist is, the best tools, and real automation examples.",
  alternates: { canonical: "/resources" },
};

export default function Page() {
  return (
    <LandingHub
      type="resource"
      eyebrow="Resources"
      title="AI for Small Business, Explained"
      intro="Straight answers to what business owners actually ask about AI — costs, tools, and what's worth automating first."
      items={resources}
    />
  );
}
