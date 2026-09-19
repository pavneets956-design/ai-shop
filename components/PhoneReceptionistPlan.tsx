import Link from "next/link";
import { Check, Phone } from "lucide-react";
import { packagePriceLabel, phonePlan } from "@/lib/data/packages";
export default function PhoneReceptionistPlan() {
  const rows = [
    { k: "Setup", v: packagePriceLabel("starter") + " CAD one-time" },
    { k: "Monthly service", v: "From $" + phonePlan.monthly + " CAD / month" },
    { k: "Provider usage", v: "Phone and AI usage charged separately" },
    { k: "Limits & fallback", v: "Agreed and tested as part of your scope" },
  ];
  return (
    <article className="glass-card flex h-full flex-col p-7 sm:p-8">
      <Phone className="mb-4 h-7 w-7 text-electric" aria-hidden="true" />
      <h3 className="text-2xl font-semibold text-ink">AI Phone Receptionist</h3>
      <p className="mt-2 text-sm text-ink-soft">
        A call flow built around your business, with a clear route back to a
        person.
      </p>
      <dl className="mt-6 divide-y divide-line rounded-xl border border-line">
        {rows.map((r) => (
          <div
            key={r.k}
            className="flex items-start justify-between gap-4 px-4 py-3"
          >
            <dt className="text-sm font-semibold text-ink">{r.k}</dt>
            <dd className="max-w-[60%] text-right text-sm text-ink-soft">
              {r.v}
            </dd>
          </div>
        ))}
      </dl>
      <ul className="mt-6 space-y-3">
        {[
          "Capture caller details and the reason for their call",
          "Answer agreed questions from your business information",
          "Route enquiries and send summaries through supported integrations",
          "Test normal calls, unclear requests and human handover",
        ].map((x) => (
          <li className="flex gap-3 text-sm text-ink-soft" key={x}>
            <Check
              className="h-4 w-4 shrink-0 text-electric"
              aria-hidden="true"
            />
            {x}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-ink-soft">
        {phonePlan.usage} Booking and text-message integrations depend on your
        accounts and agreed scope.
      </p>
      <Link
        href="/create?goal=AI%20Phone%20Receptionist"
        className="studio-button mt-6"
      >
        Discuss phone reception ↗
      </Link>
    </article>
  );
}
