"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  generateQuoteFollowUps,
  type QuoteFollowUpInput,
  type FollowUpTone,
  type FollowUpChannel,
} from "@/lib/tools/quoteFollowUp";
import { trackTool } from "@/lib/track";
import { toolCtaHref, getFreeTool } from "@/lib/data/freeTools";
import {
  CalculatorLayout, FieldGrid, TextField, SelectField, ToggleField,
  ResultsRegion, ResultCard, CopyButton, PrintButton, ResetButton,
} from "../ui";
import { ToolResultCta } from "../ToolCta";

const SLUG = "contractor-quote-follow-up-generator";

const DEFAULTS = {
  firstName: "",
  trade: "",
  jobType: "",
  tone: "friendly",
  channel: "both",
  financingAvailable: false,
  quoteDate: "",
  expirationDate: "",
  startDate: "",
  customDetail: "",
  businessName: "",
};
type FormState = typeof DEFAULTS;

const TONE_OPTIONS = [
  { value: "friendly", label: "Friendly" },
  { value: "straightforward", label: "Straightforward" },
  { value: "urgent", label: "Urgent but respectful" },
  { value: "final", label: "Final check-in" },
];

const CHANNEL_OPTIONS = [
  { value: "sms", label: "SMS (text)" },
  { value: "email", label: "Email" },
  { value: "both", label: "Both" },
];

export default function QuoteFollowUpGenerator() {
  const [f, setF] = useState<FormState>(DEFAULTS);
  const setStr = (k: keyof FormState) => (v: string) => setF((s) => ({ ...s, [k]: v }));
  const tracked = useRef(false);

  const input: QuoteFollowUpInput = useMemo(
    () => ({
      firstName: f.firstName,
      trade: f.trade,
      jobType: f.jobType,
      quoteDate: f.quoteDate,
      expirationDate: f.expirationDate,
      startDate: f.startDate,
      tone: f.tone as FollowUpTone,
      channel: f.channel as FollowUpChannel,
      financingAvailable: f.financingAvailable,
      customDetail: f.customDetail,
      businessName: f.businessName,
    }),
    [f]
  );

  const { sequence } = useMemo(() => generateQuoteFollowUps(input), [input]);

  // Fire once on first meaningful input. Never send names or message content —
  // only the tool slug (these messages contain a customer name = PII).
  useEffect(() => {
    if (!tracked.current && (f.firstName.trim() !== "" || f.trade.trim() !== "")) {
      tracked.current = true;
      trackTool("tool_calculated", { tool: SLUG });
    }
  }, [f.firstName, f.trade]);

  const entry = getFreeTool(SLUG)!;

  return (
    <CalculatorLayout
      form={
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <FieldGrid>
            <TextField label="Customer first name" value={f.firstName} onChange={setStr("firstName")} placeholder="e.g. Jordan" hint="Personalises every message" />
            <TextField label="Trade" value={f.trade} onChange={setStr("trade")} placeholder="e.g. roofing" hint="Fills in “your ___ quote”" />
            <TextField label="Job type" value={f.jobType} onChange={setStr("jobType")} placeholder="e.g. full re-roof" hint="Optional detail" />
            <TextField label="Business name" value={f.businessName} onChange={setStr("businessName")} placeholder="e.g. North Shore Roofing" hint="Optional — signs off your emails" />
          </FieldGrid>

          <FieldGrid>
            <SelectField label="Tone" value={f.tone} onChange={setStr("tone")} options={TONE_OPTIONS} hint="Sets how each message closes" />
            <SelectField label="Channel" value={f.channel} onChange={setStr("channel")} options={CHANNEL_OPTIONS} hint="Text, email, or both" />
          </FieldGrid>

          <FieldGrid>
            <TextField label="Quote sent date" value={f.quoteDate} onChange={setStr("quoteDate")} placeholder="e.g. Mar 4" hint="Optional" />
            <TextField label="Quote expires" value={f.expirationDate} onChange={setStr("expirationDate")} placeholder="e.g. Mar 18" hint="Optional" />
            <TextField label="Target start date" value={f.startDate} onChange={setStr("startDate")} placeholder="e.g. early April" hint="Optional" />
            <TextField label="Detail to reference" value={f.customDetail} onChange={setStr("customDetail")} placeholder="e.g. the skylight add-on" hint="Optional — a note they raised" />
          </FieldGrid>

          <ToggleField
            label="We offer financing"
            checked={f.financingAvailable}
            onChange={(v) => setF((s) => ({ ...s, financingAvailable: v }))}
            hint="Mentions financing in the first follow-up"
          />

          <div className="flex flex-wrap gap-2 pt-1">
            <ResetButton onClick={() => setF(DEFAULTS)} />
            <PrintButton />
          </div>
        </form>
      }
      results={
        <ResultsRegion className="space-y-4">
          <div className="print-area space-y-4">
            {sequence.map((msg, i) => (
              <ResultCard key={msg.id}>
                <div className="flex items-baseline gap-2">
                  <span className="text-tiny-label font-mono tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-card-title font-bold text-ink">{msg.label}</h3>
                </div>
                <p className="mt-1 text-small font-mono text-muted">{msg.timingHint}</p>

                {msg.sms && (
                  <div className="mt-4">
                    <div className="text-tiny-label font-mono uppercase tracking-wider text-clay-dark">Text</div>
                    <p className="mt-1.5 whitespace-pre-line break-words rounded-card-sm border border-line bg-paper-2 p-3.5 text-body text-ink">
                      {msg.sms.body}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <CopyButton text={msg.sms.body} label="Copy text" />
                      <span className="text-small text-muted">
                        {msg.sms.segments} text{msg.sms.segments === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                )}

                {msg.email && (
                  <div className="mt-4">
                    <div className="text-tiny-label font-mono uppercase tracking-wider text-clay-dark">Email</div>
                    <div className="mt-1.5 rounded-card-sm border border-line bg-paper-2 p-3.5">
                      <p className="break-words text-body font-semibold text-ink">{msg.email.subject}</p>
                      <p className="mt-2 whitespace-pre-line break-words text-body text-ink">{msg.email.body}</p>
                    </div>
                    <div className="mt-2">
                      <CopyButton text={`${msg.email.subject}\n\n${msg.email.body}`} label="Copy email" />
                    </div>
                  </div>
                )}
              </ResultCard>
            ))}
          </div>

          <ToolResultCta href={toolCtaHref(entry)} slug={SLUG} heading={entry.ctaHeading} body={entry.ctaBody} label={entry.ctaLabel} />
        </ResultsRegion>
      }
    />
  );
}
