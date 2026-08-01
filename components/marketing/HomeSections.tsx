import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { freeTools, toolPath } from "@/lib/data/freeTools";
import { packages, formatPackagePrice, carePlan } from "@/lib/data/packages";
import { Eyebrow, PegIcon, Recess, SectionHeading } from "./primitives";
import Reveal from "./Reveal";

/* ==========================================================================
   BEFORE / AFTER
   The reference tells its whole before/after story in one row: two flat
   "problem" cards and one elevated "solution" card. Reproduced structurally.
   ========================================================================== */

const BEFORE_A = ["Calls ring out while you're on a roof", "Voicemail nobody checks till 8pm", "The keen ones just call the next guy"];
const BEFORE_B = ["Quotes sent, then silence", "You meant to chase it on Sunday", "You already did the site visit for free"];
const AFTER = [
  "Every call answered, in your business's voice",
  "Follow-up goes out whether you remember or not",
  "Replies land with you, not in a system you can't see",
];

export function BeforeAfter() {
  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-surface)" }}>
      <div className="v-container">
        <Reveal>
          <SectionHeading
            eyebrow="the difference"
            title="Two things quietly cost you the most work."
            lead="Neither is a skills problem. Both are what happens when a two-person office is also a full-time trade."
          />
        </Reveal>
      </div>

      <Recess className="mt-12">
        <div className="v-container -mt-12 pb-12">
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal>
              <ProblemCard title="The phone" items={BEFORE_A} />
            </Reveal>
            <Reveal delay={80}>
              <ProblemCard title="The quote" items={BEFORE_B} />
            </Reveal>
            <Reveal delay={160}>
              <div className="v-card h-full p-6 md:p-7">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--v-r-control)]"
                  style={{ backgroundColor: "var(--v-ink)" }}
                >
                  <Check className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <h3 className="v-h3 mt-6">Once it&rsquo;s installed</h3>
                <ul className="mt-4 space-y-2.5">
                  {AFTER.map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <span className="mt-[9px] h-1 w-3 flex-none rounded-full" style={{ backgroundColor: "var(--v-accent)" }} aria-hidden="true" />
                      <span className="v-small" style={{ color: "var(--v-ink-2)" }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Recess>
    </section>
  );
}

function ProblemCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="v-card-flat h-full p-6 md:p-7">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--v-r-control)]"
        style={{ boxShadow: "0 0 0 1px var(--v-hairline-strong)" }}
      >
        <X className="h-5 w-5" style={{ color: "var(--v-muted)" }} aria-hidden="true" />
      </span>
      <h3 className="v-h3 mt-6" style={{ color: "var(--v-ink-2)" }}>{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5">
            <span className="mt-[11px] h-px w-3 flex-none" style={{ backgroundColor: "var(--v-muted-light)" }} aria-hidden="true" />
            <span className="v-small">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   WHAT GETS INSTALLED
   Named deliverables, not category language. Each card answers: the problem,
   what gets installed, what you own, what gets measured.
   ========================================================================== */

const SYSTEMS = [
  {
    glyph: "phone" as const,
    name: "AI receptionist",
    problem: "Calls go unanswered while you're working.",
    installed: "Answers your existing number, takes job details, checks your calendar and books.",
    owns: "Your phone number, in your name.",
    measured: "Calls answered, jobs booked.",
    href: "/ai-receptionist-for-contractors",
  },
  {
    glyph: "quote" as const,
    name: "Quote follow-up",
    problem: "Quotes go quiet and you never chase them.",
    installed: "Automatic follow-up on a schedule you set, stopping the moment they reply.",
    owns: "Your email and message history.",
    measured: "Replies, and quotes that turn into work.",
    href: "/ai-business-system",
  },
  {
    glyph: "review" as const,
    name: "Review requests",
    problem: "Good jobs never turn into reviews.",
    installed: "Asks after a finished job; unhappy replies come to you privately first.",
    owns: "Your Google profile and reply history.",
    measured: "Requests sent, reviews landed.",
    href: "/services/ai-review-engine",
  },
  {
    glyph: "office" as const,
    name: "Connected office",
    problem: "The same admin, retyped in three places.",
    installed: "Your intake, calendar, invoicing and CRM wired together so one entry updates all.",
    owns: "Every account stays yours.",
    measured: "Hours off the office week.",
    href: "/ai-business-system",
  },
];

export function SystemCards() {
  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-field)" }} id="what-we-install">
      <div className="v-container">
        <Reveal>
          <SectionHeading
            eyebrow="what gets installed"
            title="Four systems. Installed into what you already run."
            lead="Not software you have to learn. Set up around your real services, prices and calendar, then tested before it goes live."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.name} delay={i * 70}>
              <Link
                href={s.href}
                className="v-card v-card-hover group flex h-full flex-col p-6 focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
              >
                <PegIcon glyph={s.glyph} />
                <h3 className="v-h3 mt-6">{s.name}</h3>
                <p className="v-small mt-3 flex-1">{s.problem}</p>
                <dl className="mt-5 space-y-3 border-t pt-5" style={{ borderColor: "var(--v-hairline)" }}>
                  <Row label="Installed" value={s.installed} />
                  <Row label="You own" value={s.owns} />
                  <Row label="Measured" value={s.measured} />
                </dl>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium"
                  style={{ color: "var(--v-ink)" }}
                >
                  How it works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="v-micro uppercase tracking-wide">{label}</dt>
      <dd className="v-small mt-0.5" style={{ color: "var(--v-ink-2)" }}>{value}</dd>
    </div>
  );
}

/* ==========================================================================
   HOW IT WORKS — sticky panel on desktop, plain stack on mobile.
   The reference pins a demo panel at top:96px while step cards scroll past.
   Below lg we drop the sticky entirely: scroll-pinning on a phone is hostile
   to this audience. Spec section 15.
   ========================================================================== */

const STEPS = [
  {
    n: "01",
    title: "Find the leak",
    body: "We go through your calls, quotes and the admin that eats your evenings, and put a number on what's actually leaking.",
  },
  {
    n: "02",
    title: "Install the workflow",
    body: "Built around your real services, prices and calendar — inside your accounts, with your phone number. Tested before it answers a single customer.",
  },
  {
    n: "03",
    title: "Measure what changed",
    body: "A plain monthly note: calls answered, quotes followed up, work recovered. If it isn't earning, we say so.",
  },
];

export function ProcessSteps() {
  return (
    <section className="v-drafting v-section" id="how-it-works">
      <div className="v-container">
        <Reveal>
          <SectionHeading
            eyebrow="how it works"
            title="Three steps. Usually live in about a week."
            lead="No new platform for your crew to learn. Nothing changes hands except the work coming off your plate."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
          {/* sticky rail — desktop only */}
          <div className="lg:sticky lg:top-[calc(var(--v-nav-h)+32px)] lg:self-start">
            <div className="v-card p-6 md:p-7">
              <Eyebrow>what you actually get</Eyebrow>
              <p className="v-body mt-4">
                A system that runs in your accounts, a number to judge it by, and a person to call
                when it needs changing.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Your accounts, your data, your number",
                  "Export any time",
                  "Cancel any time — it keeps running",
                  "Based in Surrey, BC",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Check className="mt-1 h-4 w-4 flex-none" style={{ color: "var(--v-accent)" }} aria-hidden="true" />
                    <span className="v-small" style={{ color: "var(--v-ink-2)" }}>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/create" className="btn-primary mt-7 w-full">
                Book an AI opportunity review
              </Link>
            </div>
          </div>

          {/* steps */}
          <ol className="m-0 list-none space-y-5 p-0">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 90}>
                <div className="v-card p-6 md:p-8">
                  <span
                    className="inline-flex items-center rounded-[var(--v-r-control)] px-2.5 py-1 font-mono text-[13px] font-medium text-white"
                    style={{ backgroundColor: "var(--v-ink)" }}
                  >
                    {s.n}
                  </span>
                  <h3 className="v-h3 mt-5 text-[clamp(20px,2.4vw,26px)]">{s.title}</h3>
                  <p className="v-body mt-3">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FREE TOOLS — driven by the existing registry, so adding a tool adds a card.
   ========================================================================== */

export function ToolShowcase() {
  const tools = [...freeTools].sort((a, b) => a.order - b.order);
  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-surface)" }} id="tools">
      <div className="v-container">
        <Reveal>
          <SectionHeading
            eyebrow="free contractor tools"
            title="Use these whether you ever hire us or not."
            lead="No login, no email, no paywall. They run in your browser and nothing you type is sent to us."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <Reveal key={t.slug} delay={i * 60}>
              <Link
                href={toolPath(t.slug)}
                className="v-card v-card-hover group flex h-full flex-col p-6 focus:outline-none focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--v-accent)]"
              >
                <span className="v-micro uppercase tracking-wide">{t.category}</span>
                <h3 className="v-h3 mt-3 text-[20px]">{t.name}</h3>
                <p className="v-small mt-3 flex-1">{t.problem}</p>
                <span
                  className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium"
                  style={{ color: "var(--v-ink)" }}
                >
                  Open the tool
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/tools" className="v-link text-[15px]">
            See all free tools
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   PRICING — every figure comes from lib/data/packages.ts. Hand-typing prices
   here is exactly what produced the P0 contradiction that was just repaired.
   No monthly/annual toggle: the work is project-priced and a toggle would
   imply the subscription model this audience is actively avoiding.
   ========================================================================== */

export function PricingSection() {
  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-field)" }} id="pricing">
      <div className="v-container">
        <Reveal>
          <SectionHeading
            eyebrow="pricing"
            title="Project pricing, in Canadian dollars, on the page."
            lead="One-time build. The care plan is optional and only exists once something is installed."
          />
        </Reveal>
      </div>

      <Recess className="mt-12">
        <div className="v-container -mt-12 pb-12">
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((p, i) => {
              const featured = Boolean(p.highlight);
              return (
                <Reveal key={p.id} delay={i * 80}>
                  <div className={`${featured ? "v-card" : "v-card-flat"} flex h-full flex-col p-6 md:p-7`}>
                    <div className="flex items-start justify-between gap-3">
                      <PegIcon glyph={i === 0 ? "clock" : i === 1 ? "office" : "tools"} size={36} />
                      {featured && p.badge ? (
                        <span
                          className="rounded-[var(--v-r-control)] px-2.5 py-1 text-[12px] font-medium"
                          style={{ backgroundColor: "var(--v-accent-wash)", color: "var(--v-accent-press)" }}
                        >
                          {p.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="v-h3 mt-5 text-[26px]">{p.name}</h3>
                    <p className="v-small mt-1.5 italic">{p.tagline}</p>

                    <p
                      className="mt-5 font-mono text-[clamp(28px,3.4vw,40px)] font-medium leading-none tabular-nums"
                      style={{ color: "var(--v-ink)", letterSpacing: "-0.02em" }}
                    >
                      {formatPackagePrice(p)}
                    </p>
                    <p className="v-micro mt-2">CAD · {p.timeline}</p>

                    <Link
                      href={p.cta.href}
                      className={`${featured ? "btn-primary" : "btn-secondary"} mt-6 w-full`}
                    >
                      {p.cta.label}
                    </Link>

                    <ul className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: "var(--v-hairline)" }}>
                      {p.includes.map((inc) => (
                        <li key={inc} className="flex gap-2.5">
                          <span className="mt-[11px] h-px w-3 flex-none" style={{ backgroundColor: "var(--v-muted-light)" }} aria-hidden="true" />
                          <span className="v-small">{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="v-micro mt-5">{p.forWho}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="v-card mt-5 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[18px] font-medium" style={{ color: "var(--v-ink)" }}>
                  {carePlan.name} — from ${carePlan.monthly}/mo CAD
                </h3>
                <p className="v-small mt-1">
                  Optional, and only for systems we&rsquo;ve installed. Cancel any time — what&rsquo;s in
                  your accounts stays there.
                </p>
              </div>
              <Link href="/pricing" className="btn-secondary flex-none">
                Full pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </Recess>
    </section>
  );
}

/* ==========================================================================
   LOCAL — Surrey is the defensible claim. "Canadian" is not: Jobber is
   Canadian, and Google's own PAA asks whether it is. Spec section 7.
   ========================================================================== */

const AREAS = ["Surrey", "Delta", "Langley", "White Rock", "Burnaby", "New Westminster", "Coquitlam", "Richmond", "Abbotsford"];

export function LocalSection() {
  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-surface)" }}>
      <div className="v-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>where we work</Eyebrow>
            <h2 className="v-h2 mt-4 text-balance">Based in Surrey. We come to the job.</h2>
            <p className="v-body mt-5">
              Setup happens in your accounts, on your phone number, with your calendar in front of
              us. That is easier to do properly when we can sit at your table for an hour.
            </p>
            <p className="v-small mt-4">
              Outside the Lower Mainland? Most installs work remotely too — the review call is the
              same either way.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/create" className="btn-primary">
                Book an AI opportunity review
              </Link>
              {/* Real slug verified against lib/data/locations.ts — "/locations/surrey"
                  does not exist and 404s. Route names here must come from the
                  registry, not be guessed. */}
              <Link href="/locations/ai-receptionist-surrey-bc" className="btn-secondary">
                AI receptionist in Surrey
              </Link>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="v-card p-6 md:p-8">
              <p className="v-micro uppercase tracking-wide">Service area</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <li
                    key={a}
                    className="rounded-[var(--v-r-control)] px-3 py-1.5 text-[15px]"
                    style={{ backgroundColor: "var(--v-recess)", color: "var(--v-ink-2)", boxShadow: "0 0 0 1px var(--v-hairline)" }}
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <p className="v-small mt-6 border-t pt-5" style={{ borderColor: "var(--v-hairline)" }}>
                Working with roofing, exteriors, landscaping and general home-service contractors
                across the Lower Mainland.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FINAL CTA — inverted ink band. Three honest actions, no fake urgency.
   ========================================================================== */

export function FinalCta() {
  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-ink-invert)" }}>
      <div className="v-container">
        <div className="v-measure">
          <div className="flex justify-center">
            <p className="v-eyebrow" style={{ color: "var(--v-on-dark-muted)" }}>
              <span aria-hidden="true">[</span>
              <span>three ways to start</span>
              <span aria-hidden="true">]</span>
            </p>
          </div>
          <h2 className="v-h2 mt-4 text-balance" style={{ color: "var(--v-on-dark)" }}>
            Start with the free one.
          </h2>
          <p className="v-lead mt-4" style={{ color: "var(--v-on-dark-muted)" }}>
            You don&rsquo;t have to talk to anyone to get something useful out of this site.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[900px] gap-4 sm:grid-cols-3">
          <CtaCard href="/tools" title="Use a free tool" body="Five calculators. No signup." />
          <CtaCard href="/create" title="Book a review" body="We find the leak and price the fix." primary />
          <CtaCard href="/create?intent=design-partner" title="Apply as a design partner" body="Early build, lower price, honest write-up." />
        </div>
      </div>
    </section>
  );
}

function CtaCard({ href, title, body, primary }: { href: string; title: string; body: string; primary?: boolean }) {
  return (
    <Link
      href={href}
      className="group block rounded-[var(--v-r-card)] p-5 transition-colors focus:outline-none focus-visible:shadow-[0_0_0_2px_var(--v-ink-invert),0_0_0_4px_var(--v-accent)]"
      style={{
        backgroundColor: primary ? "#fff" : "rgba(255,255,255,0.06)",
        boxShadow: primary ? "none" : "inset 0 0 0 1px rgba(255,255,255,0.12)",
      }}
    >
      <span
        className="flex items-center gap-1.5 text-[17px] font-medium"
        style={{ color: primary ? "var(--v-ink)" : "var(--v-on-dark)" }}
      >
        {title}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
      <span
        className="mt-1.5 block text-[15px] leading-snug"
        style={{ color: primary ? "var(--v-muted)" : "var(--v-on-dark-muted)" }}
      >
        {body}
      </span>
    </Link>
  );
}
