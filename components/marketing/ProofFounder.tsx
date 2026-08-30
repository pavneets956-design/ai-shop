import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading, SectionLabel } from "./primitives";
import Reveal from "./Reveal";
import { site } from "@/lib/data/site";

/**
 * Trust, proof and founder — the three sections the site was missing.
 *
 * ═══ THE EVIDENCE RULE FOR THIS FILE ═══
 * Every factual claim below is drawn from the verified register in
 * research/transformation-2026-08-30/09-proof-founder-positioning.md, which was
 * built by reading the actual repositories and live sites on this machine.
 *
 * Deliberately NOT here, because none of it is true:
 *   · client logos, testimonials, star ratings, review counts
 *   · customer counts, revenue, "booked X jobs", "increased Y by Z%"
 *   · case-study outcomes — there are no clients yet, and the page says so
 *   · call volumes. The Ironwood receptionist's measured call count exists and
 *     is real, but "call volume" is exactly the class of number a reader cannot
 *     check, so it stays off the page until the owner publishes it himself.
 *
 * The honest position is stronger than a manufactured one: he has three live
 * systems he runs himself, and one of them is his own trades business.
 */

/* ──────────────────────────────────────────────────────────────────────────
   Trust strip — six checkable statements, immediately under the hero.
   Each is verifiable by the reader or by asking him; none is a metric.
   ────────────────────────────────────────────────────────────────────────── */
const TRUST = [
  "Built in Surrey & Delta, BC",
  "One builder, discovery to deployment",
  "Fixed CAD quote before work starts",
  "Tested on real calls before handover",
  "You keep your number, data and accounts",
  "Support from the person who built it",
];

export function TrustStrip() {
  return (
    <section aria-label="What you can count on" style={{ backgroundColor: "var(--v-field)" }}>
      <div className="v-container py-5">
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-2.5 p-0">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 flex-none rounded-[1px]"
                style={{ backgroundColor: "var(--v-accent)" }}
                aria-hidden="true"
              />
              <span className="v-small" style={{ color: "var(--v-ink-2)" }}>
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Proof — three systems that exist, that you can open in a browser.
   ────────────────────────────────────────────────────────────────────────── */
type Build = {
  name: string;
  status: string;
  href: string;
  problem: string;
  built: string;
  stack: string;
  tested: string;
  owns: string;
};

const BUILDS: Build[] = [
  {
    name: "Ironwood Grounds",
    status: "Live · my own fence company",
    href: "https://ironwoodgrounds.ca",
    problem:
      "I run a cedar-fence business in South Surrey. On a post-hole day nobody answers the phone, and a quote that goes quiet is a job someone else does.",
    built:
      "The back office first: a quote form that emails me and fails loudly instead of silently, and a self-hosted AI phone receptionist that I put on the real business line in July.",
    stack: "Python · pipecat · Asterisk · VoIP.ms · a quote form wired to email",
    tested:
      "A 7-suite check runs over the site before anything ships, and the receptionist has its own automated test suite.",
    owns:
      "It is my number and my line. On 27 August I took the AI back out of the call path while I rebuild the call flow — which is the honest state of it today, and the reason I will not tell you an AI receptionist is finished the day it answers its first call.",
  },
  {
    name: "COITracker",
    status: "Live · my own product",
    href: "https://coitracker.co",
    problem:
      "Small businesses that hire subtrades have to keep every vendor's insurance certificate current, and they find out it lapsed when something has already gone wrong.",
    built:
      "Upload a certificate, confirm the fields it read back, then get reminded 30, 14 and 7 days before it expires. Two scheduled jobs do the chasing.",
    stack: "Next.js · Supabase · Stripe · Resend · two daily crons",
    tested:
      "A large automated test suite, including a set of deliberately awkward PDFs the reader has to refuse rather than guess at.",
    owns: "Free for the first handful of vendors, then a flat monthly price.",
  },
  {
    name: "PayNudge",
    status: "Live · my own product",
    href: "https://paynudge.xyz",
    problem:
      "Service businesses send an invoice and then feel rude about chasing it, so it sits there.",
    built:
      "Reminders on day 1, day 3 and day 7 that stop the moment the invoice is paid — so nobody gets nagged after paying.",
    stack: "Syncs with Jobber, QuickBooks, Square and Stripe · scheduled jobs",
    tested: "Its own automated test suite, run before each deploy.",
    owns: "One plan, one flat monthly price in CAD.",
  },
];

export function ProofSection() {
  return (
    <section className="v-section" id="proof" style={{ backgroundColor: "var(--v-surface)" }}>
      <div className="v-container">
        <SectionHeading
          align="left"
          eyebrow="what I have actually built"
          title="Three systems I run myself."
          lead={
            <>
              No client logos and no testimonials — I don&rsquo;t have clients yet, and I&rsquo;m not
              going to invent them. What I can show you is software that is live right now, most of
              it holding up my own businesses.
            </>
          }
        />

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3">
          {BUILDS.map((b, i) => (
            <Reveal key={b.name} delay={i * 60}>
              <article className="v-card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="v-h3">{b.name}</h3>
                  <span
                    className="v-micro whitespace-nowrap rounded-[4px] px-2 py-1 font-medium"
                    style={{
                      backgroundColor: "var(--v-accent-wash)",
                      color: "var(--v-accent-press)",
                    }}
                  >
                    Live
                  </span>
                </div>
                <p className="v-micro mt-1">{b.status}</p>

                <dl className="mt-5 space-y-4">
                  {(
                    [
                      ["The problem", b.problem],
                      ["What I built", b.built],
                      ["What it connects to", b.stack],
                      ["How it was tested", b.tested],
                      ["Who controls it", b.owns],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <dt className="v-micro font-medium" style={{ color: "var(--v-ink)" }}>
                        {label}
                      </dt>
                      <dd className="v-small mt-1" style={{ color: "var(--v-ink-2)" }}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={b.href}
                  className="v-link mt-6 inline-flex min-h-[44px] items-center gap-1.5 self-start text-[15px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open {b.name}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="v-small mt-8 max-w-[46rem]" style={{ color: "var(--v-ink-2)" }}>
          Everything else on this site that looks like a customer story is an illustration, and it
          is labelled as one. When there is a real one, it will have a name on it.
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Founder — the site said "one builder" for months without ever saying who.
   ────────────────────────────────────────────────────────────────────────── */
export function FounderSection() {
  return (
    <section className="v-section" id="founder" style={{ backgroundColor: "var(--v-field)" }}>
      <div className="v-container">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-14">
          <div className="max-w-[260px]">
            <Image
              src="/founder.jpg"
              alt="Pavneet Singh, founder of Handbuilt AI"
              width={560}
              height={560}
              sizes="(min-width: 1024px) 260px, 200px"
              className="w-full rounded-[var(--v-r-panel)]"
              style={{ boxShadow: "var(--v-shadow-card)" }}
              priority={false}
            />
          </div>

          <div>
            <SectionLabel>the one builder</SectionLabel>
            <h2 className="v-h2 mt-5 text-balance">
              Built by {site.founder}, in Surrey, BC.
            </h2>

            <div className="mt-5 max-w-[42rem] space-y-4">
              <p className="v-body">
                I&rsquo;m one person, and you deal with me from the first conversation to the day it
                goes live. There is no account manager, no offshore team, and nobody who will hand
                your project to someone who has never spoken to you.
              </p>
              <p className="v-body">
                I run a cedar-fence company in South Surrey, so I know exactly what a missed call on
                a Tuesday afternoon costs — that is why I built an AI receptionist for my own line
                before I offered one to anyone else. Alongside it I build and run two live products:{" "}
                <a href="https://coitracker.co" className="v-link" target="_blank" rel="noopener noreferrer">
                  COITracker
                </a>{" "}
                and{" "}
                <a href="https://paynudge.xyz" className="v-link" target="_blank" rel="noopener noreferrer">
                  PayNudge
                </a>
                .
              </p>
              <p className="v-body">
                I work in TypeScript, Next.js and Supabase, with Stripe for payments and Resend for
                email, and I test on real calls before handing anything over.
              </p>
              <p className="v-body" style={{ color: "var(--v-ink)" }}>
                What I won&rsquo;t do: invent a customer, quote a number I didn&rsquo;t measure, or
                promise you&rsquo;ll never miss a call again. I&rsquo;ll tell you what a build does,
                what it doesn&rsquo;t, and what it costs to keep running.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/about" className="btn-secondary">
                More about how I work
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="v-link inline-flex min-h-[44px] items-center text-[15px]"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Demo — the strongest asset on the site, previously unreachable from the
   homepage and absent from the primary navigation.
   ────────────────────────────────────────────────────────────────────────── */
export function DemoSection() {
  return (
    <section className="v-section" id="demo" style={{ backgroundColor: "var(--v-surface)" }}>
      <div className="v-container">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
          <div>
            <SectionLabel>try it before you talk to me</SectionLabel>
            <h2 className="v-h2 mt-5 text-balance">
              Talk to the receptionist yourself. No form first.
            </h2>
            <p className="v-lead mt-4 max-w-[38rem]">
              Pick the worker and the trade, then type what one of your customers would actually
              say. You&rsquo;ll see the reply, the details it captured, and the summary that would
              land on your phone.
            </p>

            <ul className="v-body mt-6 max-w-[38rem] list-none space-y-2.5 p-0">
              {[
                "Six workers — reception, quotes, follow-up, invoices, reviews, proposals",
                "Nine trades, so the answers use your vocabulary and not a generic script",
                "Every booking, text and CRM update in the demo is simulated, and labelled as simulated",
                "No signup, no email, nothing gated",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span
                    className="mt-[9px] h-1.5 w-1.5 flex-none rounded-[1px]"
                    style={{ backgroundColor: "var(--v-accent)" }}
                    aria-hidden="true"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/demo" className="btn-primary">
                Try the live AI demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="v-card p-6">
            <p className="v-label">what you&rsquo;ll see</p>
            <ol className="mt-5 list-none space-y-5 p-0">
              {[
                ["You type", "“My hot water tank is leaking, can someone come today?”"],
                ["It answers", "Asks the two things it needs, then offers the next real slot."],
                ["It captures", "Name · phone · service · urgency · address · preferred time"],
                ["You get", "A one-paragraph summary of the call, with what to do next."],
              ].map(([k, v], i) => (
                <li key={k} className="flex gap-4">
                  <span
                    className="v-micro mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-[4px] font-medium"
                    style={{ backgroundColor: "var(--v-recess)", color: "var(--v-ink)" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="v-micro font-medium" style={{ color: "var(--v-ink)" }}>
                      {k}
                    </span>
                    <span className="v-small mt-1 block" style={{ color: "var(--v-ink-2)" }}>
                      {v}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
