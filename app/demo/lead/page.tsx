import type { Metadata } from "next";
import DemoPageTemplate from "@/components/DemoPageTemplate";
import ToolChat from "@/components/ToolChat";

export const metadata: Metadata = {
  title: "Live Demo — AI Lead Capture & Follow-Up",
  description:
    "Try a real AI lead assistant built by Handbuilt. Play a new enquiry and watch it reply instantly, qualify you, and capture your details — so no lead goes cold.",
  alternates: { canonical: "/demo/lead" },
};

export default function LeadDemoPage() {
  return (
    <DemoPageTemplate
      title="Watch a lead get qualified"
      description="You're a new enquiry to a renovation company. Message it like you just landed on their site — see how fast it replies, qualifies you, and grabs your details."
      hint="A real, live AI assistant — you're playing the lead. It replies instantly and follows up by email or text until they book."
      customize={[
        "Qualification questions",
        "Lead capture fields",
        "Follow-up email + SMS",
      ]}
      ctaLink="/create?build=ai-lead-capture-form"
    >
      <ToolChat
        kind="lead"
        business="Northside Renovations, a home renovation company"
        greeting="Hey, thanks for reaching out to Northside Renovations! 👋 What are you looking to get done?"
        suggestions={["I want a kitchen reno quote", "Just browsing for now", "How soon can you start?"]}
        label="AI Lead Assistant — live"
        sub="Northside Renovations"
        placeholder="Type as if you just enquired…"
      />
    </DemoPageTemplate>
  );
}
