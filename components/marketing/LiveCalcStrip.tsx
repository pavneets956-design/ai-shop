"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { computeMissedCall } from "@/lib/tools/missedCall";
import { Eyebrow, WindowChrome } from "./primitives";

/**
 * The trust slot.
 *
 * The reference template puts a customer-logo strip directly under the hero.
 * We have no customers, and a fabricated logo row is forbidden. A working
 * calculator is the one form of proof this business owns outright — it can be
 * tested on the spot and cannot be faked.
 *
 * Uses the SAME `computeMissedCall` as /tools/missed-call-revenue-calculator,
 * which is covered by lib/tools/missedCall.test.ts, so the number here can
 * never drift from the full tool.
 *
 * Two of the five model inputs are held at documented defaults to keep this to
 * three controls; both are stated on screen rather than hidden.
 */

const QUALIFIED_PCT = 70; // share of missed calls that are real prospects
const CLOSE_RATE = 40; // share of those you'd win

const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export default function LiveCalcStrip() {
  const uid = useId();
  const [calls, setCalls] = useState(120);
  const [missedPct, setMissedPct] = useState(25);
  const [jobValue, setJobValue] = useState(1200);

  const result = useMemo(
    () =>
      computeMissedCall({
        callsPerPeriod: calls,
        period: "month",
        missedPct,
        genuinePct: QUALIFIED_PCT,
        closeRate: CLOSE_RATE,
        avgJobValue: jobValue,
        currentAnsweringCost: 0,
        recoverableRate: 60,
      }),
    [calls, missedPct, jobValue],
  );

  const annual = result.revenueAtRiskAnnual;
  const jobs = result.jobsLostPerMonth;

  return (
    <section className="v-recess v-section-tight py-14 md:py-16" aria-labelledby={`${uid}-h`}>
      <div className="v-container">
        <div className="v-measure">
          <div className="flex justify-center">
            <Eyebrow>test us before you call</Eyebrow>
          </div>
          <h2 id={`${uid}-h`} className="v-h2 mt-4 text-balance">
            Work out what the missed ones are worth.
          </h2>
          <p className="v-lead mt-4">
            No login, no email, no results page you have to unlock. Move the sliders.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[900px]">
          <WindowChrome label="missed-call check — runs in your browser">
            <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
              {/* ---- controls ---- */}
              <div className="p-5 sm:p-7">
                <Field
                  id={`${uid}-calls`}
                  label="Calls a month"
                  value={calls}
                  display={String(calls)}
                  min={20}
                  max={600}
                  step={10}
                  onChange={setCalls}
                />
                <Field
                  id={`${uid}-missed`}
                  label="Share you don't get to"
                  value={missedPct}
                  display={`${missedPct}%`}
                  min={5}
                  max={70}
                  step={1}
                  onChange={setMissedPct}
                />
                <Field
                  id={`${uid}-value`}
                  label="Average job"
                  value={jobValue}
                  display={cad.format(jobValue)}
                  min={200}
                  max={15000}
                  step={100}
                  onChange={setJobValue}
                />

                <p className="v-micro mt-6 leading-relaxed">
                  Assumes {QUALIFIED_PCT}% of missed calls are real prospects and you&rsquo;d win{" "}
                  {CLOSE_RATE}% of those.{" "}
                  <Link href="/tools/missed-call-revenue-calculator" className="v-link">
                    Change those assumptions
                  </Link>{" "}
                  in the full tool.
                </p>
              </div>

              {/* ---- result ---- */}
              <div
                className="flex flex-col justify-center p-5 sm:p-7"
                style={{
                  backgroundColor: "var(--v-recess)",
                  boxShadow: "inset 1px 0 0 var(--v-hairline)",
                }}
              >
                <p className="v-micro uppercase tracking-wide">Walking away each year</p>
                <p
                  aria-live="polite"
                  className="mt-2 font-mono text-[clamp(30px,5vw,42px)] font-medium leading-none tabular-nums"
                  style={{ color: "var(--v-ink)", letterSpacing: "-0.02em" }}
                >
                  {cad.format(annual)}
                </p>
                <p className="v-small mt-3 leading-snug">
                  Roughly {jobs.toFixed(1)} jobs a month you never hear about.
                </p>

                <Link href="/create" className="btn-primary mt-6 w-full">
                  Get this checked properly
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="v-micro mt-3">An estimate from your numbers — not a quote.</p>
              </div>
            </div>
          </WindowChrome>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium" style={{ color: "var(--v-ink)" }}>
          {label}
        </label>
        <span className="font-mono text-[15px] tabular-nums" style={{ color: "var(--v-ink)" }}>
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="v-range mt-3 w-full"
      />
    </div>
  );
}
