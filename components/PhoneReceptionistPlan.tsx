import Link from "next/link";
import { Check, Phone } from "lucide-react";
import {
  phonePlan,
  PHONE_SETUP_PRICE,
  PHONE_MONTHLY_PRICE,
  PHONE_OVERAGE_PRICE,
  PHONE_EXCLUSIONS_SENTENCE,
} from "@/lib/data/packages";

// Every figure here comes from `phonePlan`. The JSON-LD Offer (lib/seo.ts
// phoneOffer) states the same terms, so this card is what makes it truthful.
export default function PhoneReceptionistPlan() {
  const rows = [
    { k: "Setup", v: `${PHONE_SETUP_PRICE} CAD one-time, fixed` },
    { k: "Monthly service", v: `${PHONE_MONTHLY_PRICE} CAD / month, ${phonePlan.term}` },
    { k: "Included minutes", v: `${phonePlan.includedMinutes} AI-handled minutes / month` },
    { k: "Extra minutes", v: `${PHONE_OVERAGE_PRICE} CAD per minute` },
    { k: "Small changes", v: `Up to ${phonePlan.includedChangeMinutes} min / month, no rollover` },
    { k: "Taxes", v: "Extra" },
  ];
  return (
    <article className="glass-card flex h-full flex-col p-7 sm:p-8" id="phone">
      <Phone className="mb-4 h-7 w-7 text-electric" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
        {phonePlan.pricingLabel}
      </p>
      <h3 className="mt-1 text-2xl font-semibold text-ink">{phonePlan.name}</h3>
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
      <p className="mt-6 text-sm font-semibold text-ink">Setup includes</p>
      <ul className="mt-3 space-y-3">
        {phonePlan.setupIncludes.map((x) => (
          <li className="flex gap-3 text-sm text-ink-soft" key={x}>
            <Check
              className="h-4 w-4 shrink-0 text-electric"
              aria-hidden="true"
            />
            {x}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm font-semibold text-ink">Monthly includes</p>
      <ul className="mt-3 space-y-3">
        {phonePlan.monthlyIncludes.map((x) => (
          <li className="flex gap-3 text-sm text-ink-soft" key={x}>
            <Check
              className="h-4 w-4 shrink-0 text-electric"
              aria-hidden="true"
            />
            {x}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-ink-soft">{PHONE_EXCLUSIONS_SENTENCE}</p>
      <Link
        href="/create?package=phone&goal=AI%20Phone%20Receptionist"
        className="studio-button mt-6"
      >
        Discuss phone reception ↗
      </Link>
    </article>
  );
}
