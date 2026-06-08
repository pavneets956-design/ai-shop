"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReceptionistChat from "./ReceptionistChat";

const BUSINESSES = [
  { id: "trades", chip: "Plumber / Trades", name: "Summit Plumbing & Heating", desc: "Summit Plumbing & Heating, a plumbing & heating company" },
  { id: "clinic", chip: "Dental Clinic", name: "Brightsmile Dental", desc: "Brightsmile Dental, a dental clinic" },
  { id: "salon", chip: "Salon / Spa", name: "Luxe Hair & Spa", desc: "Luxe Hair & Spa, a hair salon and spa" },
  { id: "restaurant", chip: "Restaurant", name: "The Corner Table", desc: "The Corner Table, a restaurant" },
  { id: "realestate", chip: "Real Estate", name: "Westside Realty", desc: "Westside Realty, a real estate agency" },
];

const SUGGESTIONS = ["Ask for a quote", "Book a job", "It's an emergency", "What are your hours?"];

const greeting = (name: string) =>
  `Thanks for calling ${name}! This is the AI receptionist — how can I help you today?`;

export default function ReceptionistDemo() {
  const [biz, setBiz] = useState(BUSINESSES[0]);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Business picker */}
      <div className="mb-4">
        <p className="field-label mb-2">This AI receptionist works for:</p>
        <div className="flex flex-wrap gap-2">
          {BUSINESSES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBiz(b)}
              className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 ${
                biz.id === b.id
                  ? "border-clay/60 bg-clay/15 text-ink"
                  : "border-ink/10 bg-white text-ink/60 hover:border-ink/25 hover:text-ink"
              }`}
            >
              {b.chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat — remounts on business change to reset the conversation */}
      <ReceptionistChat
        key={biz.id}
        business={biz.desc}
        greeting={greeting(biz.name)}
        suggestions={SUGGESTIONS}
        sub={biz.name}
      />

      {/* Honest framing + CTA */}
      <p className="mt-3 text-center text-xs text-ink/35">
        This is a real, live AI receptionist — you&apos;re playing the customer. Pick a business above,
        then ask for a quote, book a job, or describe an emergency.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-ink/[0.08] bg-white p-6 text-center shadow-card">
        <p className="text-ink/80">
          Want one of these answering <span className="text-ink">your</span> calls — trained on your
          business, booking into your calendar?
        </p>
        <Link href="/create" className="btn-primary">
          Build mine <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
