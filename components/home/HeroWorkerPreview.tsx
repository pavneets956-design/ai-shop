import Link from "next/link";

/**
 * Premium "Live AI worker" hero preview (Doc 2 spec). A calm, spacious static
 * card that PROVES the AI does business work: a short exchange → a captured job
 * → next actions → one CTA. Restrained orange (live dot + CTA only); status uses
 * the semantic success color. Replaces the old cluttered builder console.
 */

const captured: [string, string][] = [
  ["Service", "Lawn mowing"],
  ["Area", "Delta, BC"],
  ["Urgency", "This week"],
];

const nextActions = ["Quote visit suggested", "Owner notified", "Follow-up text drafted"];

function Tick() {
  return (
    <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-paper-2 text-ink-soft">
      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export default function HeroWorkerPreview() {
  return (
    <div className="w-full rounded-card border border-line bg-white p-6 shadow-card">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-clay" />
          </span>
          <span className="text-tiny-label font-semibold uppercase text-ink-soft">Live AI worker</span>
        </div>
        <span className="text-small text-muted-light">builds in real time</span>
      </div>

      {/* short exchange */}
      <div className="mt-5 space-y-2.5">
        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-paper-2 px-4 py-3 text-small leading-relaxed text-ink">
          Need lawn mowing in Delta. Front and back yard, this week.
        </div>
        <div className="ml-auto max-w-[94%] rounded-2xl rounded-br-md border border-line bg-white px-4 py-3 text-small leading-relaxed text-ink">
          Sure — I can help. What&apos;s your address, rough yard size, and do you want one-time or recurring service?
        </div>
      </div>

      {/* captured job */}
      <div className="mt-5 rounded-card-sm border border-line bg-paper-2 p-4">
        <div className="text-tiny-label font-semibold uppercase text-muted-light">What the AI captured</div>
        <dl className="mt-3 space-y-2">
          {captured.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-small">
              <dt className="text-ink-soft">{k}</dt>
              <dd className="font-medium text-ink">{v}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between text-small">
            <dt className="text-ink-soft">Status</dt>
            <dd className="inline-flex items-center gap-1.5 font-semibold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Ready for quote
            </dd>
          </div>
        </dl>
      </div>

      {/* next actions */}
      <ul className="mt-4 space-y-2">
        {nextActions.map((a) => (
          <li key={a} className="flex items-center gap-2.5 text-small text-ink-soft">
            <Tick /> {a}
          </li>
        ))}
      </ul>

      <Link
        href="/create?goal=AI%20Receptionist%20%2B%20Booking%20%E2%80%94%20capture%20jobs%20like%20this"
        className="btn-primary mt-6 w-full"
      >
        Start with this setup
      </Link>
    </div>
  );
}
