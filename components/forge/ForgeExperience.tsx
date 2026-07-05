"use client";

/**
 * /forge — the DOM layer of the cinematic single-page site.
 *
 * Architecture: real document scroll. The R3F scene sits in a fixed, pointer-
 * inert canvas behind everything; sections scroll over it. Scroll progress is
 * written to a ref (never state) and read by the scene at 60fps.
 *
 * All copy/products live in lib/data/forge.ts — edit there, not here.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Bot, Cpu, Workflow, Wrench } from "lucide-react";
import {
  audience,
  budgetOptions,
  lanes,
  products,
  steps,
  timelineOptions,
  type ForgeLane,
} from "@/lib/data/forge";
import "./forge.css";

const ForgeScene = dynamic(() => import("./ForgeScene"), { ssr: false, loading: () => null });

const LANE_ICONS: Record<ForgeLane["icon"], typeof Workflow> = {
  workflow: Workflow,
  wrench: Wrench,
  cpu: Cpu,
  bot: Bot,
};

/* Weighted-settle reveal used by every section. */
const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="forge-kicker">
      {n} — {children}
    </p>
  );
}

export default function ForgeExperience() {
  const reduced = useReducedMotion();
  const progress = useRef(0);
  const [tier, setTier] = useState<"full" | "lite" | "off" | null>(null);

  // Device tiering: reduced-motion → no canvas; coarse pointer/small → lite loop.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setTier("off");
    else if (window.matchMedia("(pointer: coarse), (max-width: 768px)").matches) setTier("lite");
    else setTier("full");
  }, []);

  // Native scroll → ref. Passive, no React re-renders.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("start")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="forge relative min-h-screen overflow-x-clip">
      {/* Layer 0 — the film frame. Fixed, inert, lazy-loaded after first paint. */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="forge-glow absolute inset-0" />
        {tier && tier !== "off" && <ForgeScene progress={progress} lite={tier === "lite"} />}
      </div>

      {/* Minimal own-chrome nav (global Navbar is gated off for /forge). */}
      <header className="fixed top-0 inset-x-0 z-20">
        <div className="bg-gradient-to-b from-[#0A0A0B]/90 to-transparent">
          <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
            <a href="/forge" className="forge-display text-base tracking-tight">
              aibuiltbyhand
            </a>
            <a
              href="#start"
              onClick={scrollToForm}
              className="text-sm text-[var(--forge-muted)] hover:text-[var(--forge-gold)] transition-colors duration-300"
            >
              Start a project
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ============ 1 · HERO — left copy, ingot owns the right third ============ */}
        <section className="min-h-screen flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
            <div className="max-w-[38rem] forge-scrim -m-10 p-10">
              <motion.h1
                className="forge-display text-[clamp(3.25rem,8.5vw,7rem)]"
                initial={reduced ? false : { opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              >
                AI, built
                <br />
                by hand.
              </motion.h1>
              <motion.p
                className="mt-7 max-w-[30rem] text-lg leading-relaxed text-[var(--forge-muted)]"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              >
                Custom AI systems, automations, and internal tools built for real
                businesses.
              </motion.p>
              <motion.div
                className="mt-10 flex flex-wrap items-center gap-7"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              >
                <a href="#start" onClick={scrollToForm} className="forge-cta">
                  Start a project
                </a>
                <a
                  href="#proof"
                  className="inline-flex items-center gap-2 text-sm text-[var(--forge-muted)] hover:text-[var(--forge-text)] transition-colors duration-300"
                >
                  See shipped products <ArrowDown size={15} strokeWidth={1.75} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============ 2 · POSITIONING — one statement, lots of air ============ */}
        <section className="py-44 md:py-56">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="max-w-4xl md:ml-[8%] forge-scrim -m-8 p-8">
              <p className="forge-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight">
                No hype. No generic wrappers.{" "}
                <span className="text-[var(--forge-gold)]">
                  Just tools that solve real business problems.
                </span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 3 · PROOF — the closer ============ */}
        <section id="proof" className="py-28 md:py-36">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <Kicker n="01">Proof</Kicker>
              <h2 className="forge-display mt-5 max-w-2xl text-4xl md:text-5xl">
                I don&rsquo;t sell AI theory. I ship working products.
              </h2>
            </Reveal>

            {/* Anchor card leads at double width — hierarchy, not a 3-equal row. */}
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {products.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                  <article className="forge-glass group flex h-full flex-col">
                    <div
                      className={`forge-slot relative overflow-hidden border-b border-[var(--forge-border)] ${
                        i === 0 ? "aspect-[21/9]" : "aspect-video"
                      }`}
                    >
                      {p.screenshot ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.screenshot}
                          alt={`${p.title} screenshot`}
                          className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="forge-display text-6xl text-[var(--forge-gold)] opacity-[0.14]">
                            {p.title.slice(0, 2)}
                          </span>
                        </div>
                      )}
                      <span className="absolute left-4 top-4 border border-[var(--forge-border)] bg-[#0A0A0B]/70 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.16em] text-[var(--forge-gold)]">
                        {p.tag}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="forge-display text-xl md:text-2xl">{p.title}</h3>
                        {p.href && (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${p.title}`}
                            className="text-[var(--forge-muted)] transition-colors duration-300 group-hover:text-[var(--forge-gold)]"
                          >
                            <ArrowUpRight size={19} strokeWidth={1.75} />
                          </a>
                        )}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--forge-muted)]">
                        {p.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4 · WHAT I BUILD — editorial rows, not equal cards ============ */}
        <section className="py-28 md:py-36">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-[2fr,3fr]">
              <Reveal>
                <Kicker n="02">Capability</Kicker>
                <h2 className="forge-display mt-5 text-4xl md:text-5xl">What I build</h2>
                <p className="mt-6 max-w-sm text-[var(--forge-muted)] leading-relaxed">
                  From automation to full custom software — if you can describe the
                  AI system, I build it. These lanes are examples, not a menu.
                </p>
              </Reveal>
              <div className="forge-scrim -m-4 p-4">
                {lanes.map((lane, i) => {
                  const Icon = LANE_ICONS[lane.icon];
                  return (
                    <Reveal key={lane.title} delay={i * 0.07}>
                      <div className="group flex gap-5 border-t border-[var(--forge-border)] py-7 last:border-b">
                        <Icon
                          size={20}
                          strokeWidth={1.5}
                          className="mt-1 shrink-0 text-[var(--forge-gold)]"
                        />
                        <div>
                          <h3 className="forge-display text-lg font-semibold">{lane.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--forge-muted)]">
                            {lane.description}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5 · WHO THIS IS FOR ============ */}
        <section className="py-32 md:py-40">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal className="max-w-3xl forge-scrim -m-8 p-8">
              <Kicker n="03">Fit</Kicker>
              <p className="mt-6 text-xl md:text-2xl leading-relaxed text-[var(--forge-muted)]">
                {audience}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 6 · HOW IT WORKS ============ */}
        <section className="py-28 md:py-36">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <Kicker n="04">Process</Kicker>
              <h2 className="forge-display mt-5 text-4xl md:text-5xl">How it works</h2>
            </Reveal>
            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1}>
                  <div className="relative border-t border-[var(--forge-border)] pt-6">
                    <span className="forge-display absolute -top-7 right-0 text-6xl font-bold text-[var(--forge-text)] opacity-[0.06]">
                      {s.n}
                    </span>
                    <h3 className="forge-display text-lg font-semibold">
                      <span className="text-[var(--forge-gold)]">{s.n}</span>&ensp;{s.title}
                    </h3>
                    <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-[var(--forge-muted)]">
                      {s.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7 · START A PROJECT ============ */}
        <section id="start" className="py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-[2fr,3fr]">
              <Reveal>
                <Kicker n="05">Start</Kicker>
                <h2 className="forge-display mt-5 text-4xl md:text-5xl">Start a project</h2>
                <p className="mt-6 max-w-sm text-[var(--forge-muted)] leading-relaxed">
                  Five questions. No call required, no obligation — describe the
                  problem and I&rsquo;ll tell you honestly whether it&rsquo;s worth
                  building.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <StartForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ============ 8 · FOOTER ============ */}
      <footer className="relative z-10 border-t border-[var(--forge-border)]">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-between gap-4">
          <span className="forge-display text-sm">aibuiltbyhand</span>
          <span className="text-xs text-[var(--forge-muted)]">
            © {new Date().getFullYear()} aibuiltbyhand. Built by hand in BC.
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Qualifying form — POSTs to the existing server-side lead route.     */
/* The destination inbox lives ONLY in server env (never shipped here).*/
/* ------------------------------------------------------------------ */

function StartForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Honeypot: bots fill the hidden field → pretend success, send nothing.
    if (data.company_website) {
      setStatus("sent");
      return;
    }
    delete data.company_website;
    setStatus("sending");
    try {
      const res = await fetch("/api/build-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "forge", ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="forge-panel p-8 md:p-10">
        <p className="forge-display text-2xl text-[var(--forge-gold)]">Received.</p>
        <p className="mt-4 max-w-md leading-relaxed text-[var(--forge-muted)]">
          I read every one of these myself and reply personally. Talk soon.
        </p>
      </div>
    );
  }

  const label = "block text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--forge-muted)]";

  return (
    <form onSubmit={onSubmit} className="forge-panel space-y-6 p-6 md:p-8">
      <div>
        <label htmlFor="f-business" className={label}>
          What does your business do?
        </label>
        <textarea id="f-business" name="business" required rows={2} className="forge-field mt-2" />
      </div>
      <div>
        <label htmlFor="f-tasks" className={label}>
          What task wastes the most time?
        </label>
        <textarea id="f-tasks" name="tasks" required rows={2} className="forge-field mt-2" />
      </div>
      <div>
        <label htmlFor="f-tools" className={label}>
          What tools do you already use?
        </label>
        <input id="f-tools" name="tools" type="text" className="forge-field mt-2" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="f-budget" className={label}>
            Budget range
          </label>
          <select id="f-budget" name="budget" required defaultValue="" className="forge-field mt-2">
            <option value="" disabled>
              Select…
            </option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-timeline" className={label}>
            Timeline
          </label>
          <select id="f-timeline" name="timeline" required defaultValue="" className="forge-field mt-2">
            <option value="" disabled>
              Select…
            </option>
            {timelineOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>
            Your name
          </label>
          <input id="f-name" name="name" type="text" required className="forge-field mt-2" />
        </div>
        <div>
          <label htmlFor="f-email" className={label}>
            Email
          </label>
          <input id="f-email" name="email" type="email" required className="forge-field mt-2" />
        </div>
      </div>
      {/* Honeypot — visually hidden, tab-skipped; humans never see it. */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden>
        <label htmlFor="f-hp">Company website</label>
        <input id="f-hp" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex items-center gap-5 pt-1">
        <button type="submit" disabled={status === "sending"} className="forge-cta disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send it"}
        </button>
        {status === "error" && (
          <p className="text-sm text-[var(--forge-ember)]">
            Something broke — try again, or email via the main site.
          </p>
        )}
      </div>
    </form>
  );
}
