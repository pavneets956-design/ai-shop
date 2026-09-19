import { Suspense } from "react";
import type { Metadata } from "next";
import BuildRequestForm from "@/components/BuildRequestForm";
export const metadata: Metadata = {
  title: "Start a Project — Websites, Apps & AI Systems",
  description:
    "Tell Pavneet about your website, app or AI project. Four short questions, then a personal reply within one business day. Independent builder in Surrey, BC.",
  alternates: { canonical: "/create" },
};
export default function CreatePage() {
  return (
    <section className="studio-container pb-24">
      <div className="studio-page-hero">
        <p className="studio-eyebrow">Start a conversation</p>
        <h1>
          Tell me what
          <br />
          <span>you’d like to build.</span>
        </h1>
        <p>
          Four questions. A rough idea is enough. I’ll reply within one business
          day to work through the scope and next steps with you.
        </p>
      </div>
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-xl border border-ink/10 bg-ink/[0.02]" />
          }
        >
          <BuildRequestForm />
        </Suspense>
      </div>
    </section>
  );
}
