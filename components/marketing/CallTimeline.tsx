import { WindowChrome } from "./primitives";

/**
 * Hero product visual — a purpose-built contractor call timeline.
 *
 * Deliberately NOT a generic SaaS dashboard, a robot, or a chart of invented
 * metrics. It shows one believable sequence: a call arrives while the owner is
 * on site, the receptionist answers, the job is booked, the owner is told.
 *
 * Every value is fictional and the card says so out loud. Nothing here implies
 * a customer result.
 */

const STEPS = [
  {
    time: "4:52 PM",
    title: "Incoming call",
    detail: "604-555-0117 — new number",
    tone: "neutral" as const,
  },
  {
    time: "4:52 PM",
    title: "You're on a roof in Cloverdale",
    detail: "Nobody free to pick up",
    tone: "risk" as const,
  },
  {
    time: "4:52 PM",
    title: "Answered on the second ring",
    detail: "Takes the job details, checks your calendar",
    tone: "good" as const,
  },
  {
    time: "4:56 PM",
    title: "Booked — Thursday, 9:00 AM",
    detail: "Gutter replacement estimate, Cloverdale",
    tone: "good" as const,
  },
  {
    time: "4:56 PM",
    title: "Texted to you",
    detail: "“New booking Thu 9am. Reply STOP to cancel.”",
    tone: "good" as const,
  },
];

function Dot({ tone }: { tone: "neutral" | "risk" | "good" }) {
  const color =
    tone === "risk" ? "var(--v-accent)" : tone === "good" ? "var(--v-ink)" : "var(--v-muted-light)";
  return (
    <span
      aria-hidden="true"
      className="relative z-10 mt-[7px] block h-2.5 w-2.5 flex-none rounded-full ring-4 ring-white"
      style={{ backgroundColor: color }}
    />
  );
}

export default function CallTimeline() {
  return (
    <figure className="m-0">
      <WindowChrome label="one call — example, not a customer result">
        <ol className="relative m-0 list-none space-y-0 p-5 sm:p-6">
          {/* the connecting rail */}
          <span
            aria-hidden="true"
            className="absolute left-[25px] top-8 bottom-8 w-px sm:left-[29px]"
            style={{ backgroundColor: "var(--v-hairline-strong)" }}
          />
          {STEPS.map((s, i) => (
            <li key={s.title} className={`flex gap-4 ${i === 0 ? "" : "pt-5"}`}>
              <Dot tone={s.tone} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="v-micro font-mono tabular-nums">{s.time}</span>
                  <span
                    className="text-[15px] font-medium leading-snug"
                    style={{ color: "var(--v-ink)" }}
                  >
                    {s.title}
                  </span>
                </div>
                <p className="v-small mt-1 leading-snug">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6"
          style={{ backgroundColor: "var(--v-recess)", boxShadow: "inset 0 1px 0 var(--v-hairline)" }}
        >
          <span className="v-micro">Your number. Your calendar. Your customer list.</span>
          <span className="v-micro font-mono">4 min, no missed job</span>
        </div>
      </WindowChrome>
      <figcaption className="v-micro mt-3 text-center">
        Illustrative example using made-up details — not a customer result.
      </figcaption>
    </figure>
  );
}
