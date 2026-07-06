import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { creators } from "@/lib/data/creators";

export const metadata: Metadata = {
  title: "AI for Content Creators",
  description:
    "Custom AI systems for content creators — clipping, editing, scripts, repurposing, captions, voice, avatars and fan messaging. Built by hand around your channels, worldwide.",
  alternates: { canonical: "/creators" },
};

export default function Page() {
  return (
    <LandingHub
      type="creators"
      eyebrow="For Creators"
      title="AI Systems for Content Creators"
      intro="You make the content. AI can handle the clipping, editing, captions, repurposing, scheduling and DMs — built around your channels and your voice, so you post more without burning out. Done-for-you, delivered remotely, worldwide."
      items={creators}
    />
  );
}
