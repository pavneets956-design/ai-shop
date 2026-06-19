import type { Metadata } from "next";
import Showroom from "@/components/showroom/Showroom";

export const metadata: Metadata = {
  title: "AI Worker Showroom — Test a Real AI Worker",
  description:
    "Pick an AI worker, play the customer, and watch it turn the conversation into real business work — captured lead, next actions, and simulated CRM/SMS/calendar updates. Live demo, no real call, text, email or booking sent.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  // The Showroom owns its full-width layout (sticky-header-safe top offset +
  // 3-zone grid + CTA). Root layout already provides <main>; don't nest another.
  return <Showroom />;
}
