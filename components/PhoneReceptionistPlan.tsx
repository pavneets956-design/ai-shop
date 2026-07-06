import Link from "next/link";
import { Check, Phone } from "lucide-react";

/**
 * AI Phone Receptionist — the SEPARATE plan (Phase C). Distinct from text-only
 * Tools Pro: this answers real phone calls (Twilio), so it carries setup +
 * monthly + usage. Numbers are the real anchors — Starter setup ($1,000) and
 * the Care Plan ($250/mo) — and call minutes are passed through at provider
 * cost (no invented per-minute rate, no markup), with a spend cap you set.
 */

const rows: { k: string; v: string }[] = [
  { k: "Setup", v: "from $1,000 one-time" },
  { k: "Monthly", v: "from $250 / mo" },
  { k: "Phone number", v: "Your own dedicated line, included" },
  { k: "Call minutes", v: "Billed at provider (Twilio) cost — no markup" },
  { k: "Overage", v: "Pay-as-you-go at cost" },
  { k: "Hard cap", v: "Set a monthly spend cap — calls roll to voicemail/booking past it" },
];

const includes = [
  "Answers calls 24/7 in your business's voice",
  "Books jobs, captures leads, routes urgent calls",
  "Texts the caller a confirmation / booking link",
  "Sends you a summary of every call",
];

export default function PhoneReceptionistPlan() {
  return (
    <div className="glass-card spec-frame flex h-full flex-col p-7 sm:p-8">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-xl border border-line bg-paper-2 text-ink">
          <Phone className="h-[18px] w-[18px]" />
        </span>
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">AI Phone Receptionist</h3>
          <p className="text-sm text-ink/55">Live call answering — its own plan, with setup + minutes.</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-paper-2/50">
        <dl className="divide-y divide-line">
          {rows.map((r) => (
            <div key={r.k} className="flex items-start justify-between gap-4 px-4 py-2.5">
              <dt className="text-sm font-semibold text-ink">{r.k}</dt>
              <dd className="max-w-[62%] text-right text-sm text-ink/65">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {includes.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px] text-ink/80">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ink text-white">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs text-ink/40">
        Twilio passthrough means you only pay for what you use. Exact setup is scoped on a quick call —
        no surprise minute charges, ever.
      </p>
      <Link
        href="/create?goal=AI%20Phone%20Receptionist%20%E2%80%94%20answer%20and%20book%20calls"
        className="btn-primary mt-5 w-full"
      >
        Book a setup call
      </Link>
    </div>
  );
}
