"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import MagneticButton from "./MagneticButton";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroCommandCenter() {
  return (
    <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pt-28 pb-12 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20">
      {/* Left — copy */}
      <div className="relative z-10 text-center lg:text-left">
        <motion.span {...fadeUp} transition={{ duration: 0.5 }} className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" />
          Personal AI studio · Surrey BC → worldwide
        </motion.span>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl"
        >
          AI that works for your business —{" "}
          <span className="text-clay">built by hand</span>, not bought off a shelf.
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/65 lg:mx-0"
        >
          Your personal AI studio. Custom apps, agents, and automations — built for what you
          actually do. Tell us the outcome; we design the system.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
        >
          <MagneticButton href="/demo">
            Try a live demo
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#finder" variant="secondary">
            Find my AI solution
          </MagneticButton>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink/45 lg:justify-start"
        >
          <span>From $1,000 CAD</span>
          <span className="h-1 w-1 rounded-full bg-ink/20" />
          <span>Live in days, not months</span>
          <span className="h-1 w-1 rounded-full bg-ink/20" />
          <span>You own what we build</span>
        </motion.div>
      </div>

      {/* Right — live receptionist preview */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-md"
      >
        <div className="animate-float-slow rounded-3xl border border-ink/10 bg-white p-5 shadow-card">
          {/* header */}
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-ink">AI Receptionist</span>
            </div>
            <span className="text-xs text-ink/40">Summit Plumbing</span>
          </div>

          {/* conversation */}
          <div className="space-y-3 py-4">
            <Bubble who="ai">Thanks for calling Summit Plumbing! How can I help today?</Bubble>
            <Bubble who="me">My water heater&apos;s leaking — can someone come out today?</Bubble>
            <Bubble who="ai">
              Sorry to hear that — I can get a tech to you this afternoon. What&apos;s the best number
              to reach you?
            </Bubble>
          </div>

          {/* footer status */}
          <div className="flex items-center gap-2 border-t border-ink/10 pt-3 text-xs text-ink/50">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            Job booked · details texted to you · calendar updated
          </div>
        </div>

        {/* floating accent chip */}
        <div className="absolute -right-3 -top-3 rotate-3 rounded-full border border-clay/20 bg-white px-3 py-1 text-xs font-semibold text-clay-dark shadow-card">
          Answers 24/7
        </div>
      </motion.div>
    </div>
  );
}

function Bubble({ who, children }: { who: "ai" | "me"; children: React.ReactNode }) {
  const mine = who === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          mine ? "bg-clay/15 text-ink" : "bg-paper-2 text-ink/80"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
