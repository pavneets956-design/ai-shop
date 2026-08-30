"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react";
import { packages, packagePriceLabel } from "@/lib/data/packages";
import { shopProducts } from "@/lib/data/shopProducts";
import { TRADES, tradeById, intakeToLabels } from "@/lib/data/intake";
import { site } from "@/lib/data/site";
import { getAttribution } from "@/lib/attribution";
import { trackEvent, trackTool } from "@/lib/track";
import OccupationIntake from "@/components/intake/OccupationIntake";

/**
 * The build-request form — the site's only real lead path.
 *
 * REBUILT 2026-08-30. What changed and why:
 *  - It asked up to 14 questions before finding out who was filling it in, and
 *    the trade questions were the showroom's CUSTOMER intake, so a plumber was
 *    asked whether *he* had a gas leak. Step 1 is now four fields; everything
 *    else is an optional second step a visitor can skip and still submit.
 *  - One "email or phone" field. Either is accepted; the server requires at
 *    least one, not specifically an email.
 *  - Every field has a real <label htmlFor> bound to an input id. Required is
 *    stated in words, never in colour alone. Validation is inline, announced in
 *    a live region, and the submit button is NEVER disabled for invalid input —
 *    only while a request is in flight.
 *  - Every response the server can give has a designed state: success,
 *    duplicate, server error, rate limit, oversize, network failure.
 *
 * TRUTHFULNESS: no email is EVER sent to the visitor — the only notification
 * goes to the owner (app/api/build-request/route.ts). This form must therefore
 * never say "check your inbox", and it doesn't. Adding that line is blocked on
 * Resend domain verification; the site domain has no MX record today.
 */

// Budget bands are rendered from the pricing registry so they can never drift
// from the published package prices (they did: ~$1,000 / $2,500–$5,000 / $7,500+).
const budgets = [
  { id: "starter", label: `${packagePriceLabel("starter")} (one tool)` },
  { id: "business", label: `${packagePriceLabel("business")} (a system)` },
  { id: "custom", label: `${packagePriceLabel("custom")} (custom app)` },
  { id: "unsure", label: "Not sure yet" },
];

const timelines = [
  { id: "asap", label: "ASAP" },
  { id: "1month", label: "Within a month" },
  { id: "quarter", label: "This quarter" },
  { id: "exploring", label: "Just exploring" },
];

const STEPS = ["What you need", "Detail (optional)"] as const;

/**
 * Honeypot field name — mirrored in app/api/build-request/route.ts.
 *
 * Renamed from "company_website" 2026-08-30. That name is exactly what a
 * password manager or browser autofill reaches for, and a filled honeypot makes
 * the API discard the lead — so the trap was as likely to catch a real customer
 * as a bot. This name matches no autofill heuristic. The client also refuses to
 * render success when the API reports it stored and sent nothing, so even if
 * something does fill this, the visitor is told rather than quietly dropped.
 */
const HONEYPOT = "hb_form_token";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ContactKind = "email" | "phone" | "invalid";

/**
 * One field, either kind. An "@" means the visitor is trying to type an email,
 * so it is validated as one; otherwise it is read as a phone number. 7 digits is
 * the shortest real local number, 15 the E.164 ceiling.
 */
export function classifyContact(value: string): ContactKind {
  const v = value.trim();
  if (!v) return "invalid";
  if (v.includes("@")) return EMAIL_RE.test(v) ? "email" : "invalid";
  const digits = v.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "invalid";
  return /^[\d\s()+.\-]+$/.test(v) ? "phone" : "invalid";
}

type FieldKey = "name" | "contact" | "business" | "goal";
type Errors = Partial<Record<FieldKey, string>>;

type Result =
  | { kind: "ok"; contact: "email" | "phone"; deduped: boolean }
  | {
      kind: "error";
      variant: "server" | "network" | "rate-limit" | "too-large" | "rejected";
      message: string;
      retryAfter?: number;
    };

export default function BuildRequestForm() {
  const params = useSearchParams();
  const reduceMotion = useReducedMotion();

  const presetPackage = params.get("package") ?? "";
  const presetBuild = shopProducts.find((p) => p.slug === params.get("build"));
  // ?goal= lets the homepage hero builder / free tools carry the intent in as the goal.
  const presetGoal = params.get("goal") ?? "";
  // ?industry= (from the showroom "Get this installed" CTA) preselects the trade.
  const presetIndustry = tradeById(params.get("industry") ?? "")?.id ?? "";
  // ?src= carries acquisition attribution (e.g. "tool-missed-call-revenue-calculator")
  // from a free-tool CTA. Non-sensitive machine tag — never a customer field; passed
  // straight through to durable storage + the lead notification, never shown as an input.
  const presetSrc = params.get("src") ?? "";
  // ?category= / ?outcome= were previously read by nobody and silently dropped.
  // They are machine tags from /solutions and the finder — carried as entry
  // metadata so the owner can see which page produced the lead.
  const presetCategory = params.get("category") ?? "";
  const presetOutcome = params.get("outcome") ?? "";

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    business: "",
    goal: presetBuild ? `${presetBuild.name} — ${presetBuild.outcome}` : presetGoal,
    industry: presetIndustry,
    budget: packages.some((p) => p.id === presetPackage)
      ? presetPackage
      : presetBuild?.packageId ?? "",
    timeline: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [intake, setIntake] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<Result | null>(null);

  const startedRef = useRef(false);
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);
  const [focusField, setFocusField] = useState<FieldKey | null>(null);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_started", {
      form: "build_request",
      preset_src: presetSrc || null,
      preset_package: presetPackage || null,
      preset_industry: presetIndustry || null,
    });
  };

  const set = (k: string, v: string) => {
    markStarted();
    setForm((s) => ({ ...s, [k]: v }));
    // Clear a field's error the moment the visitor starts fixing it — never
    // leave a red message under a field the person is actively correcting.
    if (k in errors) setErrors((e) => ({ ...e, [k as FieldKey]: undefined }));
  };

  const trade = tradeById(form.industry);
  const isLast = step === STEPS.length - 1;

  const go = (nextStep: number) => {
    setDir(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Tell us your name so we know who we're replying to.";
    const kind = classifyContact(form.contact);
    if (!form.contact.trim()) {
      e.contact = "Add an email or a phone number — either one is fine.";
    } else if (kind === "invalid") {
      e.contact = form.contact.includes("@")
        ? "That email doesn't look complete — check for a typo."
        : "That doesn't look like an email or a phone number.";
    }
    if (!form.business.trim()) e.business = "What's the business called, or what do you do?";
    if (!form.goal.trim()) e.goal = "Tell us what you'd like the AI to take off your plate.";
    return e;
  }

  const goToDetail = () => {
    trackEvent("form_step_completed", { form: "build_request", step: 1, total: STEPS.length });
    go(1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    markStarted();
    const found = validate();
    setAttempted(true);
    setErrors(found);
    if (Object.keys(found).length) {
      for (const field of Object.keys(found)) {
        trackEvent("form_validation_error", { form: "build_request", step, field });
      }
      // Send focus to the first thing that needs fixing. Every required field
      // lives on step 0, so come back to it first — nothing typed is wiped, and
      // the focus lands after the step has actually rendered (the step
      // transition unmounts the other step, so focusing synchronously here
      // would silently do nothing).
      if (step !== 0) go(0);
      setFocusField(Object.keys(found)[0] as FieldKey);
      return;
    }

    setStatus("sending");
    setResult(null);

    const kind = classifyContact(form.contact);
    const intakeLabels = trade ? intakeToLabels(trade, intake) : {};

    try {
      const res = await fetch("/api/build-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "build-request",
          name: form.name.trim(),
          // Exactly one of these is set — the server requires at least one.
          ...(kind === "email"
            ? { email: form.contact.trim() }
            : { phone: form.contact.trim() }),
          business: form.business.trim(),
          goal: form.goal.trim(),
          ...(trade ? { industry: trade.label } : {}),
          ...(form.budget ? { budget: form.budget } : {}),
          ...(form.timeline ? { timeline: form.timeline } : {}),
          ...(Object.keys(intakeLabels).length ? { intake: intakeLabels } : {}),
          // Acquisition context. Machine tags only — never anything typed.
          ...(presetSrc ? { src: presetSrc } : {}),
          ...(presetCategory ? { entryCategory: presetCategory } : {}),
          ...(presetOutcome ? { entryOutcome: presetOutcome } : {}),
          ...getAttribution(),
          // Honeypot: only a bot can have filled this.
          [HONEYPOT]: honeypot,
        }),
      });

      let data: Record<string, unknown> | null = null;
      try {
        data = (await res.json()) as Record<string, unknown>;
      } catch {
        /* a body-less or non-JSON response is handled by the status checks below */
      }
      const serverMessage = typeof data?.error === "string" ? data.error : "";

      if (res.status === 429) {
        const retryAfter = Number(data?.retryAfter) || 60;
        setResult({
          kind: "error",
          variant: "rate-limit",
          retryAfter,
          message:
            serverMessage ||
            "Too many requests from this connection. Give it a minute and try again.",
        });
        setStatus("error");
        trackEvent("form_submitted", { form: "build_request", result: "error", status: 429 });
        return;
      }

      if (res.status === 413) {
        setResult({
          kind: "error",
          variant: "too-large",
          message: serverMessage || "That's too long to send. Trim it down and try again.",
        });
        setStatus("error");
        trackEvent("form_submitted", { form: "build_request", result: "error", status: 413 });
        return;
      }

      if (res.status === 400 || res.status === 403) {
        setResult({
          kind: "error",
          variant: "rejected",
          message: serverMessage || "We couldn't read that submission. Check the fields and try again.",
        });
        setStatus("error");
        trackEvent("form_submitted", { form: "build_request", result: "error", status: res.status });
        return;
      }

      if (!res.ok || data?.ok !== true) {
        setResult({
          kind: "error",
          variant: "server",
          // Render the server's own sentence when it gave one — it is written for
          // a human and is more specific than anything this component can guess.
          message:
            serverMessage ||
            "Something went wrong on our end and your request wasn't saved.",
        });
        setStatus("error");
        trackEvent("form_submitted", {
          form: "build_request",
          result: "error",
          status: res.status,
        });
        return;
      }

      // ── Never render success unless something actually happened. ──────────
      // The API answers 200 {ok:true, delivery:{persisted:false, emailed:false}}
      // when the honeypot trips — it stores nothing and sends nothing. Branching
      // on `res.ok`/`data.ok` alone showed a real person the full "Request
      // received" screen while their enquiry was discarded. A browser autofill
      // or password manager touching the hidden field is enough to trigger it.
      // `delivery` is the API's own description of what it did; trust that.
      const delivery = (data as { delivery?: { persisted?: boolean; emailed?: boolean } })
        .delivery;
      const nothingHappened =
        delivery !== undefined && delivery.persisted !== true && delivery.emailed !== true;
      if (nothingHappened) {
        setResult({
          kind: "error",
          variant: "rejected",
          message:
            "That didn't go through — the form flagged the submission and nothing was saved. " +
            "It may have been a browser autofill filling a hidden field. Email me directly and " +
            "I'll pick it up from there.",
        });
        setStatus("error");
        trackEvent("form_submitted", {
          form: "build_request",
          result: "rejected_no_delivery",
          status: res.status,
        });
        return;
      }

      const contact = data.contact === "phone" ? "phone" : "email";
      setResult({ kind: "ok", contact, deduped: data.deduped === true });
      setStatus("done");
      trackEvent("form_submitted", {
        form: "build_request",
        result: "ok",
        status: res.status,
        deduped: data.deduped === true,
        contact,
        budget: form.budget || null,
        timeline: form.timeline || null,
        industry: form.industry || null,
      });
      if (presetSrc.startsWith("tool-")) {
        // Declared in lib/track.ts since the free-tools build and never once
        // fired — a defined-but-dead event is a dashboard lie. It fires here, on
        // a real lead that came from a tool CTA.
        trackTool("lead_from_tool", { form: "build_request", src: presetSrc });
      }
    } catch {
      setResult({
        kind: "error",
        variant: "network",
        message:
          "We couldn't reach the server. Check your connection and try again — everything you typed is still here.",
      });
      setStatus("error");
      trackEvent("form_submitted", { form: "build_request", result: "error", status: 0 });
    }
  };

  // Move focus to the confirmation so a screen-reader user is told it happened.
  useEffect(() => {
    if (status === "done") doneHeadingRef.current?.focus();
  }, [status]);

  // Focus the first invalid field once step 0 is on screen again.
  useEffect(() => {
    if (!focusField || step !== 0) return;
    const t = window.setTimeout(() => {
      document.getElementById(`br-${focusField}`)?.focus();
      setFocusField(null);
    }, 260); // just past the 220ms step transition
    return () => window.clearTimeout(t);
  }, [focusField, step]);

  // ---------------------------------------------------------------- success --
  if (status === "done" && result?.kind === "ok") {
    const firstName = form.name.trim().split(" ")[0];
    const replyBy =
      result.contact === "phone"
        ? `call or text ${form.contact.trim()}`
        : `reply to ${form.contact.trim()}`;
    return (
      <div className="border-glow glass mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper-2 text-ink">
          <Check className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2
          ref={doneHeadingRef}
          tabIndex={-1}
          className="mt-5 font-display text-2xl font-semibold text-ink focus:outline-none"
        >
          {result.deduped ? "Already received." : "Request received."}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink">
          {result.deduped
            ? `We already have this one${firstName ? `, ${firstName}` : ""} — no need to send it twice. I'll ${replyBy} within one business day with a plan and a quote.`
            : `Thanks${firstName ? `, ${firstName}` : ""} — I'll read what you want to build and ${replyBy} within one business day with a plan and a quote.`}
        </p>
        {/* The site sends nothing to the visitor. Say so rather than let them
            wait on an inbox that will stay empty. */}
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft">
          There&apos;s no automatic confirmation email — this screen is your receipt.
        </p>
        <p className="mt-4 text-sm text-ink-soft">
          Need it sooner? Email{" "}
          <a href={`mailto:${site.email}`} className="underline decoration-1 underline-offset-2 hover:text-ink">
            {site.email}
          </a>
        </p>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  // ------------------------------------------------------------------ form --
  return (
    <form
      onSubmit={submit}
      noValidate
      aria-busy={status === "sending"}
      className="border-glow glass mx-auto max-w-2xl rounded-3xl p-5 sm:p-9"
    >
      {/* Honeypot. display:none keeps password managers and autofill out of it;
          tabIndex/aria-hidden keep keyboard and screen-reader users out. A value
          here means a bot, and the server stores nothing. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT}>Company website (leave this empty)</label>
        <input
          id={HONEYPOT}
          name={HONEYPOT}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Progress — 2 steps, the second optional. */}
      <div className="mb-7">
        <ol className="flex items-center justify-between gap-2">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={label} className="flex flex-1 items-center last:flex-none">
                <button
                  type="button"
                  onClick={() => i < step && go(i)}
                  disabled={i > step}
                  aria-current={active ? "step" : undefined}
                  className={`flex min-h-[44px] items-center gap-2 rounded-md px-1 text-sm ${
                    i < step ? "cursor-pointer hover:bg-ink/[0.04]" : "cursor-default"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      done || active
                        ? "border-ink bg-ink text-white"
                        : "border-ink/50 bg-white text-ink-soft"
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                  </span>
                  <span className={i <= step ? "text-ink" : "text-ink-soft"}>
                    {label}
                    <span className="sr-only">
                      {active ? " (current step)" : done ? " (completed)" : ""}
                    </span>
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`mx-3 h-px flex-1 ${i < step ? "bg-ink/50" : "bg-ink/20"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Validation summary. Assertive so it is announced the moment a submit
          attempt fails, and it names the count so nothing is a mystery. */}
      <div aria-live="assertive" className="sr-only">
        {attempted && errorCount > 0
          ? `${errorCount} ${errorCount === 1 ? "answer needs" : "answers need"} fixing before this can send.`
          : ""}
      </div>
      {attempted && errorCount > 0 && (
        <p className="mb-6 rounded-md border border-danger/30 bg-danger/[0.08] px-4 py-3 text-sm text-danger">
          {errorCount === 1
            ? "One answer needs fixing before this can send — it's marked below."
            : `${errorCount} answers need fixing before this can send — they're marked below.`}
        </p>
      )}

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={reduceMotion ? false : { opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: dir * -24 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="space-y-7"
          >
            {step === 0 && (
              <>
                <Field
                  id="br-name"
                  label="Your name"
                  required
                  error={errors.name}
                >
                  {(p) => (
                    <input
                      {...p}
                      autoFocus
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Your name"
                      className="field min-h-[44px] border-ink/50"
                    />
                  )}
                </Field>

                <Field
                  id="br-contact"
                  label="Email or phone"
                  required
                  hint="Whichever you'd rather be reached on. One is enough."
                  error={errors.contact}
                >
                  {(p) => (
                    <input
                      {...p}
                      inputMode="email"
                      autoComplete="email"
                      value={form.contact}
                      onChange={(e) => set("contact", e.target.value)}
                      placeholder="you@business.com or 604 555 0100"
                      className="field min-h-[44px] border-ink/50"
                    />
                  )}
                </Field>

                <Field
                  id="br-business"
                  label="Business name, or what you do"
                  required
                  error={errors.business}
                >
                  {(p) => (
                    <input
                      {...p}
                      autoComplete="organization"
                      value={form.business}
                      onChange={(e) => set("business", e.target.value)}
                      placeholder="e.g. Delta Plumbing, or 'I run a two-van plumbing crew'"
                      className="field min-h-[44px] border-ink/50"
                    />
                  )}
                </Field>

                <Field
                  id="br-goal"
                  label="What are you trying to automate?"
                  required
                  hint="Plain words are fine — the problem, not the solution."
                  error={errors.goal}
                >
                  {(p) => (
                    <textarea
                      {...p}
                      rows={3}
                      value={form.goal}
                      onChange={(e) => set("goal", e.target.value)}
                      placeholder="e.g. Something that answers my phone and books jobs while I'm on site"
                      className="field resize-none border-ink/50"
                    />
                  )}
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <p className="text-sm text-ink-soft">
                  All optional. Skip straight to sending if you&apos;d rather — it doesn&apos;t
                  change the reply you get.
                </p>

                <ChipGroup
                  legend="What's your trade or industry?"
                  options={TRADES}
                  value={form.industry}
                  onPick={(v) => set("industry", v === form.industry ? "" : v)}
                />

                {trade && trade.fields.length > 0 && (
                  <OccupationIntake
                    trade={trade}
                    values={intake}
                    onChange={(k, v) => setIntake((s) => ({ ...s, [k]: v }))}
                  />
                )}

                <ChipGroup
                  legend="Budget range"
                  options={budgets}
                  value={form.budget}
                  onPick={(v) => set("budget", v === form.budget ? "" : v)}
                />

                <ChipGroup
                  legend="Timeline"
                  options={timelines}
                  value={form.timeline}
                  onPick={(v) => set("timeline", v === form.timeline ? "" : v)}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Every failure the server can produce has its own sentence and its own
          next step. Nothing typed is ever cleared by an error. */}
      {status === "error" && result?.kind === "error" && (
        <div
          role="alert"
          className="mt-6 rounded-md border border-danger/30 bg-danger/[0.08] px-4 py-3 text-sm text-danger"
        >
          <p>{result.message}</p>
          <p className="mt-2 text-danger">
            {result.variant === "rate-limit" ? (
              <>Try again in about {result.retryAfter}s, or email </>
            ) : (
              <>Your answers are still on this page — press Send again, or email </>
            )}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Build request")}`}
              className="underline decoration-1 underline-offset-2"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <p className="mt-6 text-sm text-ink-soft">
        No spam, no obligation. Your answers are stored so we can reply, and nothing else —{" "}
        <a href="/privacy" className="underline decoration-1 underline-offset-2 hover:text-ink">
          privacy
        </a>
        .
      </p>

      {/* Nav. The submit button is NEVER disabled for invalid input — only while
          a request is in flight. Invalid input is answered inline, not by a
          dead button the visitor cannot diagnose. */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary ml-auto order-last"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Send my request
            </>
          )}
        </button>
        {!isLast && (
          <button
            type="button"
            onClick={goToDetail}
            disabled={status === "sending"}
            className="btn-ghost"
          >
            Add detail first <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <p className="mt-3 text-right text-sm text-ink-soft" aria-live="polite">
        {status === "sending" ? "Sending your request…" : ""}
      </p>
    </form>
  );
}

/**
 * A labelled field. The label is a real <label htmlFor> bound to the control's
 * id; hint and error text are wired through aria-describedby; the error also
 * sets aria-invalid. "Required" is spelled out in words — colour alone never
 * carries the meaning.
 */
function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-required"?: boolean;
  }) => React.ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
        {label}{" "}
        <span className="font-normal text-ink-soft">{required ? "(required)" : "(optional)"}</span>
      </label>
      {hint && (
        <p id={hintId} className="mb-2 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required || undefined,
      })}
      {error && (
        <p id={errId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * A single-select chip group inside a real <fieldset>/<legend>, so a screen
 * reader announces the question before the options. Chips carry aria-pressed and
 * a 44px minimum target. Picking the active chip clears it — nothing here is
 * required, so every answer must be un-answerable.
 */
function ChipGroup({
  legend,
  options,
  value,
  onPick,
}: {
  legend: string;
  options: { id: string; label: string }[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-ink">
        {legend} <span className="font-normal text-ink-soft">(optional)</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(o.id)}
              className={`min-h-[44px] rounded-full border px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 ${
                on
                  ? "border-ink bg-ink text-white"
                  : "border-ink/50 bg-white text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
