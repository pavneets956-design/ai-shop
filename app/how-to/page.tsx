import type { Metadata } from "next";
import LandingHub from "@/components/LandingHub";
import { howtos } from "@/lib/data/howto";

export const metadata: Metadata = {
  title: "How-to Guides",
  description:
    "Practical how-to guides for small business owners: add an AI chatbot, automate quote requests, set up an AI receptionist, automate customer replies, and more.",
  alternates: { canonical: "/how-to" },
};

export default function Page() {
  return (
    <LandingHub
      type="howto"
      eyebrow="How-to Guides"
      title="How to Put AI to Work in Your Business"
      intro="Step-by-step guides you can follow yourself — and a faster way to get it done if you'd rather we build it."
      items={howtos}
    />
  );
}
