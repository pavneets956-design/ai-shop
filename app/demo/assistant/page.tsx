import type { Metadata } from "next";
import DemoPageTemplate from "@/components/DemoPageTemplate";
import ToolChat from "@/components/ToolChat";

export const metadata: Metadata = {
  title: "Live Demo — AI Website Sales Assistant",
  description:
    "Try a real AI website assistant built by Handbuilt. Ask it anything like a website visitor — it answers your questions about the business and captures the lead.",
  alternates: { canonical: "/demo/assistant" },
};

export default function AssistantDemoPage() {
  return (
    <DemoPageTemplate
      title="Ask the website assistant"
      description="You're a visitor on a physio clinic's website. Ask about services, pricing or booking — see how it answers instead of leaving you guessing, then captures the lead."
      hint="A real, live AI assistant — trained on a business so it answers visitors and captures leads instead of letting them bounce."
      customize={[
        "Knowledge base (your site & docs)",
        "Tone & style (on-brand)",
        "Handoff rules (when to escalate)",
      ]}
      ctaLink="/create?build=ai-chatbot-for-website"
    >
      <ToolChat
        kind="assistant"
        business="Peak Performance Physio, a physiotherapy clinic"
        greeting="Hi! I'm the assistant for Peak Performance Physio. Ask me about our services, pricing, or booking and I'll help you out."
        suggestions={["Do you treat sports injuries?", "How much is a first session?", "Can I book this week?"]}
        label="AI Website Assistant — live"
        sub="Peak Performance Physio"
        placeholder="Ask a question like a website visitor…"
      />
    </DemoPageTemplate>
  );
}
