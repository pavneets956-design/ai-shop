import { SectionLabel } from "./primitives";
import Reveal from "./Reveal";

/**
 * What actually happens to one lead.
 *
 * Replaces the four generic "feature cards" that previously sat here. Those
 * were the most template-like block on the page: icon, title, three labelled
 * rows, arrow link — swap the copy and it could be any SaaS site.
 *
 * This is built instead as six purpose-built interface fragments showing a
 * single call move through the system. The visitor should be able to follow it
 * without reading a paragraph, and every frame should be recognisably a
 * CONTRACTOR's situation rather than a generic business one — a ladder, a
 * service area, a gutter job, a next-morning slot.
 *
 * Honesty constraints, deliberately observed:
 *  - no invented customer name; the caller is "New caller" and a masked number
 *  - no performance statistics anywhere in this section
 *  - the whole block is labelled as an illustration, twice
 *  - the times and job type are plausible detail, not a claimed outcome
 */

/* ── shared bits ─────────────────────────────────────────────────────────── */

function Frame({
  n,
  title,
  children,
  span = false,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={`v-card flex h-full flex-col p-5 ${span ? "sm:col-span-2" : ""}`}>
      <div className="flex items-baseline gap-3">
        {/* --v-accent on white measures 4.44:1 — just under the 4.5:1 needed
            for text this size. The press shade is the same red ramp and clears
            it comfortably. Rule: red TEXT below 18px uses --v-accent-press;
            --v-accent is for marks and fills, where 3:1 applies. */}
        <span
          className="font-mono text-[12px] font-medium tabular-nums"
          style={{ color: "var(--v-accent-press)" }}
        >
          {n}
        </span>
        <span className="text-[15px] font-medium" style={{ color: "var(--v-ink)" }}>
          {title}
        </span>
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
}

/** A thin inset panel — the "screen" the interface fragment sits on.
    h-full so every panel fills its grid cell; without it the shorter frames
    (04 in particular) left a visible band of dead space under the panel while
    the row stretched to the tallest sibling. */
function Screen({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`h-full rounded-[10px] p-3.5 ${className}`}
      style={{ backgroundColor: "var(--v-recess)", boxShadow: "inset 0 0 0 1px var(--v-hairline)" }}
    >
      {children}
    </div>
  );
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "ok" | "flag";
}) {
  const style =
    tone === "ok"
      ? { backgroundColor: "#fff", color: "var(--v-ink)", boxShadow: "0 0 0 1px var(--v-hairline-strong)" }
      : tone === "flag"
        ? { backgroundColor: "var(--v-accent-wash)", color: "var(--v-accent-press)" }
        : { backgroundColor: "#fff", color: "var(--v-muted)", boxShadow: "0 0 0 1px var(--v-hairline)" };
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[4px] px-2 py-1 text-[12px]" style={style}>
      {children}
    </span>
  );
}

/* ── the six frames ──────────────────────────────────────────────────────── */

function IncomingCall() {
  return (
    <Screen>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="v-micro">Incoming</p>
          <p className="mt-0.5 font-mono text-[15px] tabular-nums" style={{ color: "var(--v-ink)" }}>
            604 ••• 0148
          </p>
        </div>
        {/* ring indicator — three bars, static under reduced motion */}
        <span className="flex items-end gap-[3px]" aria-hidden="true">
          <span className="w-[3px] rounded-full v-ring-bar" style={{ height: 10, backgroundColor: "var(--v-accent)" }} />
          <span className="w-[3px] rounded-full v-ring-bar" style={{ height: 16, backgroundColor: "var(--v-accent)", animationDelay: "0.15s" }} />
          <span className="w-[3px] rounded-full v-ring-bar" style={{ height: 7, backgroundColor: "var(--v-accent)", animationDelay: "0.3s" }} />
        </span>
      </div>
      <p className="v-small mt-3 leading-snug">
        You&rsquo;re thirty feet up with both hands on a ladder.
      </p>
    </Screen>
  );
}

function AnsweredOnYourNumber() {
  return (
    <Screen>
      <div className="flex items-center gap-2">
        <span className="v-live-dot" aria-hidden="true" />
        <p className="v-micro">Answering</p>
      </div>
      <p className="mt-2 text-[15px] font-medium" style={{ color: "var(--v-ink)" }}>
        Your number. Your business name.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip tone="ok">604 ••• 0148</Chip>
        <Chip>not a new line</Chip>
        <Chip>in your name</Chip>
      </div>
    </Screen>
  );
}

function DetailsCaptured() {
  const rows = [
    ["Job", "Gutter replacement"],
    ["Property", "Single family, two storey"],
    ["Area", "Cloverdale"],
  ];
  return (
    <Screen>
      <p className="v-micro">Captured on the call</p>
      <dl className="mt-2.5 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-3">
            <dt className="v-micro w-[62px] flex-none">{k}</dt>
            <dd
              className="flex-1 text-[14px]"
              style={{ color: "var(--v-ink)", boxShadow: "inset 0 -1px 0 var(--v-hairline)" }}
            >
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </Screen>
  );
}

function Qualified() {
  return (
    <Screen>
      <p className="v-micro">Checked before booking</p>
      <div className="mt-2.5 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span className="v-small">Inside your service area</span>
          <Chip tone="ok">Cloverdale ✓</Chip>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="v-small">Urgency</span>
          <Chip>Not an emergency</Chip>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="v-small">Job type you take</span>
          <Chip tone="ok">Yes ✓</Chip>
        </div>
      </div>
    </Screen>
  );
}

function Booked() {
  const slots = [
    { t: "Wed 2:00 PM", state: "busy" },
    { t: "Thu 9:00 AM", state: "picked" },
    { t: "Thu 1:00 PM", state: "free" },
  ];
  return (
    <Screen>
      <p className="v-micro">Straight into your calendar</p>
      <ul className="mt-2.5 space-y-1.5">
        {slots.map((s) => {
          const picked = s.state === "picked";
          const busy = s.state === "busy";
          return (
            <li
              key={s.t}
              className="flex items-center justify-between gap-3 rounded-[4px] px-2.5 py-2 text-[13px]"
              // The busy row was --v-muted-light (3.44:1) to look de-emphasised.
              // Unavailability is already carried by the strikethrough and the
              // "on a job" label, so it does not need to be carried by low
              // contrast as well. --v-muted clears 4.5:1.
              style={{
                backgroundColor: picked ? "var(--v-ink)" : "#fff",
                color: picked ? "#fff" : busy ? "var(--v-muted)" : "var(--v-ink-2)",
                boxShadow: picked ? "none" : "0 0 0 1px var(--v-hairline)",
                textDecoration: busy ? "line-through" : "none",
              }}
            >
              <span className="font-mono tabular-nums">{s.t}</span>
              <span className="text-[11px] uppercase tracking-wide">
                {picked ? "booked" : busy ? "on a job" : "free"}
              </span>
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}

function SummaryToYou() {
  return (
    <Screen className="h-full">
      <p className="v-micro">Lands on your phone</p>
      <div
        className="mt-2.5 rounded-[10px] p-3"
        style={{ backgroundColor: "#fff", boxShadow: "0 0 0 1px var(--v-hairline)" }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="v-micro font-medium" style={{ color: "var(--v-ink)" }}>
            Handbuilt AI
          </span>
          <span className="v-micro font-mono">now</span>
        </div>
        <p className="mt-1.5 text-[13.5px] leading-snug" style={{ color: "var(--v-ink-2)" }}>
          Gutter replacement, Cloverdale. Two storey. Booked Thu 9:00 AM.
          Caller asked about eavestrough guards — worth quoting.
        </p>
      </div>
      <p className="v-micro mt-2.5">Reply to reach them. Nothing to log in to.</p>
    </Screen>
  );
}

/* ── section ─────────────────────────────────────────────────────────────── */

const FRAMES = [
  { n: "01", title: "A call comes in", body: <IncomingCall /> },
  { n: "02", title: "Answered on your number", body: <AnsweredOnYourNumber /> },
  { n: "03", title: "Details taken", body: <DetailsCaptured /> },
  { n: "04", title: "Qualified", body: <Qualified /> },
  { n: "05", title: "Booked", body: <Booked /> },
  { n: "06", title: "You get the summary", body: <SummaryToYou /> },
];

export default function WorkflowStory() {
  return (
    <section
      className="v-section"
      style={{ backgroundColor: "var(--v-field)" }}
      id="what-we-install"
      aria-labelledby="workflow-h"
    >
      <div className="v-container">
        <Reveal>
          <div className="v-measure">
            <div className="flex justify-center">
              <SectionLabel>one call, end to end</SectionLabel>
            </div>
            <h2 id="workflow-h" className="v-h2 mt-5 text-balance">
              What happens while you&rsquo;re on the roof.
            </h2>
            <p className="v-lead mt-4">
              Six steps, about four minutes, none of them yours. This is the whole system — there
              is no second product.
            </p>
          </div>
        </Reveal>

        <ol className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {FRAMES.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 70} className="h-full">
              <Frame n={f.n} title={f.title}>
                {f.body}
              </Frame>
            </Reveal>
          ))}
        </ol>

        <p className="v-micro mt-6 text-center">
          Illustration of the installed workflow. Sample job details — not a customer, and not a
          performance claim.
        </p>
      </div>
    </section>
  );
}
