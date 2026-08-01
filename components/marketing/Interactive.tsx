"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Eyebrow, WindowChrome } from "./primitives";

/* ==========================================================================
   PROBLEM SELECTOR
   Three choices, not six. Labels are contractor-situational rather than
   category language — see research/search-demand/10 section 4.
   Wrapped in window chrome the way the reference wraps its use-case accordion.
   ========================================================================== */

const PROBLEMS = [
  {
    key: "calls",
    label: "I'm missing calls while I'm on site",
    body:
      "The phone rings when both hands are busy. By the time you listen to voicemail they've already called someone else.",
    fix: "An AI receptionist on your existing number — answers, takes the details, books into your calendar, texts you.",
    toolLabel: "See what missed calls cost you",
    toolHref: "/tools/missed-call-revenue-calculator",
    pageHref: "/ai-receptionist-for-contractors",
  },
  {
    key: "quotes",
    label: "My quotes go quiet",
    body:
      "You did the site visit, you wrote the quote, and then nothing. Chasing it is the job you never get to on a Sunday night.",
    fix: "Automatic follow-up on a schedule you choose, in your voice, that stops the second they reply.",
    toolLabel: "Write a follow-up now",
    toolHref: "/tools/contractor-quote-follow-up-generator",
    pageHref: "/ai-business-system",
  },
  {
    key: "admin",
    label: "I'm doing admin at 9pm",
    body:
      "Invoices, reminders, review requests, retyping the same job into three places. It's the part nobody quoted for.",
    fix: "The repetitive pieces wired together so one entry updates everything, and the chasing runs itself.",
    toolLabel: "Find the leak",
    toolHref: "/tools/contractor-lead-leak-audit",
    pageHref: "/ai-business-system",
  },
];

export function ProblemSelector() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const current = PROBLEMS[active];

  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-field)" }}>
      <div className="v-container">
        <div className="v-measure">
          <div className="flex justify-center">
            <Eyebrow>start where it hurts</Eyebrow>
          </div>
          <h2 className="v-h2 mt-4 text-balance">Which one is costing you the most right now?</h2>
        </div>

        <div className="mx-auto mt-10 max-w-[980px]">
          <WindowChrome label={current.label}>
            <div role="tablist" aria-label="Pick the problem you have" className="flex flex-col sm:flex-row">
              {PROBLEMS.map((p, i) => {
                const selected = i === active;
                return (
                  <button
                    key={p.key}
                    id={`${uid}-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`${uid}-panel-${i}`}
                    onClick={() => setActive(i)}
                    className="flex-1 px-5 py-4 text-left text-[15px] font-medium transition-colors focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--v-accent)]"
                    style={{
                      color: selected ? "var(--v-ink)" : "var(--v-muted)",
                      backgroundColor: selected ? "var(--v-surface)" : "transparent",
                      boxShadow: selected
                        ? "inset 0 -2px 0 var(--v-accent)"
                        : "inset 0 -1px 0 var(--v-hairline)",
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {PROBLEMS.map((p, i) => (
              <div
                key={p.key}
                id={`${uid}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${i}`}
                hidden={i !== active}
                className="p-6 md:p-8"
              >
                <p className="v-body">{p.body}</p>
                <div className="mt-6 rounded-[var(--v-r-card)] p-5" style={{ backgroundColor: "var(--v-recess)" }}>
                  <p className="v-micro uppercase tracking-wide">What we install</p>
                  <p className="v-body mt-2">{p.fix}</p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href={p.toolHref} className="btn-primary">
                    {p.toolLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={p.pageHref} className="btn-secondary">
                    How the install works
                  </Link>
                </div>
              </div>
            ))}
          </WindowChrome>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   OBJECTIONS + FAQ
   Two-column accordion, the reference's pattern. Every question here is a
   live PAA question or a real Reddit thread title — see
   research/search-demand/02 tree 8 and 05. Nothing invented, and deliberately
   NOT including "does this replace employees", which is job-seeker intent.
   ========================================================================== */

export interface QA {
  q: string;
  a: string;
}

export function FaqSection({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  const renderCol = (col: QA[], offset: number) => (
    <div className="space-y-3">
      {col.map((item, ci) => {
        const i = ci * 2 + offset;
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={isOpen ? "v-card overflow-hidden" : "overflow-hidden rounded-[var(--v-r-card)]"}
            style={isOpen ? undefined : { boxShadow: "0 0 0 1px var(--v-hairline)" }}
          >
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-a-${i}`}
                id={`${uid}-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--v-accent)]"
              >
                <span className="text-[17px] font-medium" style={{ color: "var(--v-ink)" }}>
                  {item.q}
                </span>
                <span
                  className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-[var(--v-r-control)]"
                  style={{ boxShadow: "0 0 0 1px var(--v-hairline-strong)" }}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <div
              id={`${uid}-a-${i}`}
              role="region"
              aria-labelledby={`${uid}-q-${i}`}
              hidden={!isOpen}
              className="px-5 pb-5"
            >
              <p className="v-body">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="v-section" style={{ backgroundColor: "var(--v-field)" }} id="faq">
      <div className="v-container">
        <div className="v-measure">
          <div className="flex justify-center">
            <Eyebrow>the questions people actually ask</Eyebrow>
          </div>
          <h2 className="v-h2 mt-4 text-balance">Straight answers, before you call.</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1000px] gap-3 md:grid-cols-2 md:gap-5">
          {renderCol(left, 0)}
          {renderCol(right, 1)}
        </div>

        <p className="v-small mt-8 text-center">
          Something not covered?{" "}
          <Link href="/faq" className="v-link">
            Read the full FAQ
          </Link>
        </p>
      </div>
    </section>
  );
}
