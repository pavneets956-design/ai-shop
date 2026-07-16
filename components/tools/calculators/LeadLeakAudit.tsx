"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LEAD_LEAK_CATEGORIES, scoreLeadLeak, type LeadLeakAnswers } from "@/lib/tools/leadLeakAudit";
import { trackTool } from "@/lib/track";
import { toolCtaHref, getFreeTool } from "@/lib/data/freeTools";
import {
  ResultsRegion, ResultCard, ResultStat, ResultBanner,
  CopyButton, PrintButton, ResetButton,
} from "../ui";
import { ToolResultCta } from "../ToolCta";

const SLUG = "contractor-lead-leak-audit";
const TOTAL = LEAD_LEAK_CATEGORIES.length;

const BAND_LABEL: Record<string, string> = {
  strong: "Strong",
  solid: "Solid",
  leaky: "Leaky",
  critical: "Critical",
};

// Honest, non-alarmist one-liners. No invented dollar figures, no fear-selling.
const BAND_LINE: Record<string, string> = {
  strong:
    "Your lead handling is tight. Keep the systems that are working — the lower-scoring areas below are just fine-tuning.",
  solid:
    "A solid setup with a few gaps. Tightening your lowest areas below will turn more of the leads you already get into booked jobs.",
  leaky:
    "Leads are slipping in more than one place. The areas below are ranked so you know what to fix first — and most start as a simple habit.",
  critical:
    "Several core areas are leaking at once. Start with the top areas below; fixing even one or two will make a noticeable difference.",
};

export default function LeadLeakAudit() {
  const [answers, setAnswers] = useState<LeadLeakAnswers>({});
  const tracked = useRef(false);

  const result = useMemo(() => scoreLeadLeak(answers), [answers]);

  // Fire once, the first time the visitor has answered anything. No answer
  // content is sent — only the tool slug and the coarse result band.
  useEffect(() => {
    if (!tracked.current && result.answeredCount > 0) {
      tracked.current = true;
      trackTool("tool_calculated", { tool: SLUG, band: result.band });
    }
  }, [result.answeredCount, result.band]);

  const hasResult = result.answeredCount > 0;
  // Only surface areas that are genuinely leaking — never label a perfect area a "leak".
  const realLeaks = result.topLeaks.filter((l) => l.score < 100).slice(0, 3);
  const entry = getFreeTool(SLUG)!;

  const summary = [
    "Contractor Lead-Leak Audit",
    `Overall score: ${result.overall}/100 (${BAND_LABEL[result.band]})`,
    result.completeness < 100 ? `Answered ${result.answeredCount} of ${TOTAL} areas.` : null,
    "",
    realLeaks.length ? "Top leaks to fix first:" : "Result:",
    ...(realLeaks.length
      ? realLeaks.map((leak, i) =>
          [
            `${i + 1}. ${leak.label} (${leak.score}/100)`,
            `   Fix it by hand: ${leak.manualFix}`,
            `   Automate this: ${leak.automateFix}`,
          ].join("\n")
        )
      : ["No leaks found in the areas you answered — your lead handling looks tight."]),
  ]
    .filter((l) => l !== null)
    .join("\n");

  return (
    <div className="space-y-8">
      {/* Quiz */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-paper-2 p-4">
          <p className="text-small text-muted">
            Answer each question honestly. No signup — nothing you pick is uploaded.
          </p>
          <p className="shrink-0 text-small font-semibold text-ink" aria-live="polite">
            {result.answeredCount} <span className="text-muted">/ {TOTAL} answered</span>
          </p>
        </div>

        {LEAD_LEAK_CATEGORIES.map((cat, i) => (
          <fieldset
            key={cat.key}
            className="rounded-card border border-line bg-white p-5 shadow-card sm:p-6"
          >
            <legend className="float-none mb-4 w-full p-0">
              <span className="block">
                <span className="font-mono text-tiny-label uppercase tracking-wider text-clay-dark">
                  Area {i + 1} of {TOTAL}
                </span>{" "}
                <span className="font-display text-card-title font-bold text-ink">{cat.label}</span>
              </span>
              <span className="mt-1.5 block text-body text-ink/80">{cat.question}</span>
            </legend>

            <div className="space-y-2">
              {cat.options.map((opt) => {
                const id = `${cat.key}-${opt.points}`;
                const checked = answers[cat.key] === opt.points;
                return (
                  <label
                    key={opt.points}
                    htmlFor={id}
                    className={`flex cursor-pointer items-start gap-3 rounded-card-sm border p-3 text-small transition-colors ${
                      checked ? "border-clay bg-clay-soft" : "border-line bg-white hover:bg-paper-2"
                    }`}
                  >
                    <input
                      id={id}
                      type="radio"
                      name={cat.key}
                      value={opt.points}
                      checked={checked}
                      onChange={() => setAnswers((a) => ({ ...a, [cat.key]: opt.points }))}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer border-line accent-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-2"
                    />
                    <span className="text-ink">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </form>

      {/* Results */}
      <ResultsRegion className="space-y-4">
        {!hasResult ? (
          <ResultCard>
            <p className="text-body text-ink/80">
              Answer the questions above to see your overall score, your top leaks, and a fix for each.
            </p>
          </ResultCard>
        ) : (
          <>
            <div className="print-area space-y-4">
              <ResultCard>
                <div className="grid gap-4 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center">
                  <ResultStat
                    label="Overall score (out of 100)"
                    value={String(result.overall)}
                    sub={BAND_LABEL[result.band]}
                    emphasis
                  />
                  <div>
                    <p className="text-body text-ink/80">{BAND_LINE[result.band]}</p>
                    {result.completeness < 100 && (
                      <p className="mt-2 text-small text-muted">
                        You&apos;ve answered {result.answeredCount} of {TOTAL} areas — finish the rest
                        for a complete score.
                      </p>
                    )}
                  </div>
                </div>
              </ResultCard>

              {realLeaks.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="font-display text-section-sm font-bold text-ink">
                    Your top {realLeaks.length === 1 ? "leak" : `${realLeaks.length} leaks`} to fix first
                  </h2>
                  {realLeaks.map((leak, i) => (
                    <ResultCard key={leak.key}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-tiny-label font-mono uppercase tracking-wider text-muted">
                            Leak {i + 1}
                          </div>
                          <h3 className="mt-1 font-display text-card-title font-bold text-ink">
                            {leak.label}
                          </h3>
                        </div>
                        <div className="shrink-0 rounded-card-sm border border-line bg-paper-2 px-3 py-1.5 text-center">
                          <div className="font-display text-card-title font-bold tabular-nums text-ink">
                            {leak.score}
                          </div>
                          <div className="text-tiny-label font-mono uppercase tracking-wider text-muted">
                            / 100
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-card-sm border border-line bg-paper-2 p-4">
                          <div className="text-tiny-label font-mono uppercase tracking-wider text-muted">
                            Fix it by hand
                          </div>
                          <p className="mt-1.5 text-small text-ink/80">{leak.manualFix}</p>
                        </div>
                        <div className="rounded-card-sm border border-clay/20 bg-clay-soft p-4">
                          <div className="text-tiny-label font-mono uppercase tracking-wider text-clay-dark">
                            Automate this
                          </div>
                          <p className="mt-1.5 text-small text-ink/80">{leak.automateFix}</p>
                        </div>
                      </div>
                    </ResultCard>
                  ))}
                </div>
              ) : (
                <ResultBanner tone="good">
                  No leaks found in the areas you answered — your lead handling looks tight. Keep those
                  systems running.
                </ResultBanner>
              )}

              <ResultCard>
                <h3 className="text-tiny-label font-mono uppercase tracking-wider text-muted">
                  Area-by-area scores
                </h3>
                <ul className="mt-3 divide-y divide-line/60">
                  {result.byCategory.map((c) => (
                    <li key={c.key} className="flex items-center justify-between gap-4 py-2">
                      <span className="text-small text-ink">{c.label}</span>
                      <span className="shrink-0 text-small font-semibold tabular-nums text-ink">
                        {c.score}
                        <span className="text-muted">/100</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </ResultCard>
            </div>

            <div className="flex flex-wrap gap-2">
              <ResetButton onClick={() => setAnswers({})} />
              <CopyButton text={summary} label="Copy results" />
              <PrintButton />
            </div>

            <ToolResultCta
              href={toolCtaHref(entry)}
              slug={SLUG}
              heading={entry.ctaHeading}
              body={entry.ctaBody}
              label={entry.ctaLabel}
            />
          </>
        )}
      </ResultsRegion>
    </div>
  );
}
