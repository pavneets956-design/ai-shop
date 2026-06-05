"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Boxes,
  Magnet,
  Receipt,
  PenTool,
  Sparkles,
  CalendarCheck,
  ArrowRight,
  Search,
} from "lucide-react";
import MagneticButton from "./MagneticButton";

const modules = [
  { icon: PhoneCall, label: "AI Receptionist", className: "left-[2%] top-[14%]", delay: 0, accent: "#4F8CFF" },
  { icon: Boxes, label: "Custom App", className: "right-[3%] top-[8%]", delay: 0.6, accent: "#22D3EE" },
  { icon: Magnet, label: "Lead Agent", className: "left-[6%] bottom-[16%]", delay: 1.2, accent: "#8B5CF6" },
  { icon: Receipt, label: "Invoice Reminder", className: "right-[5%] bottom-[12%]", delay: 0.3, accent: "#F5C16C" },
  { icon: PenTool, label: "Content Engine", className: "left-[20%] top-[2%]", delay: 0.9, accent: "#22D3EE" },
  { icon: Sparkles, label: "Personal Assistant", className: "right-[20%] bottom-[2%]", delay: 1.5, accent: "#8B5CF6" },
  { icon: CalendarCheck, label: "Booking System", className: "left-[40%] bottom-[6%]", delay: 1.8, accent: "#4F8CFF" },
];

const prompts = [
  "answer my phone 24/7",
  "follow up on every lead",
  "stop chasing invoices",
  "build me a custom app",
  "write my content",
  "book my appointments",
];

export default function HeroCommandCenter() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % prompts.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-28 pb-12 sm:pt-32 lg:grid-cols-2 lg:gap-8 lg:pb-20">
      {/* Left — copy */}
      <div className="relative z-10 text-center lg:text-left">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]" />
          Personal AI studio · Surrey BC → worldwide
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          AI that works for your business —{" "}
          <span className="text-gradient-brand">built by hand</span>, not bought off a shelf.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60 lg:mx-0"
        >
          Your personal AI studio. Custom apps, agents, and automations — built for what you
          actually do. Tell us the outcome; we design the system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
        >
          <MagneticButton href="#finder">
            Find my AI solution
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/solutions" variant="secondary">
            See what we can build
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/40 lg:justify-start"
        >
          <span>From $750 CAD</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>Live in days, not months</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>You own what we build</span>
        </motion.div>
      </div>

      {/* Right — command center */}
      <div className="perspective relative h-[420px] sm:h-[480px] lg:h-[560px]">
        {/* orbit rings */}
        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-spin-slower sm:h-[420px] sm:w-[420px]" />
        <div className="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] animate-spin-slow sm:h-[300px] sm:w-[300px]" />

        {/* central orb / prompt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute left-1/2 top-1/2 z-20 w-[78%] max-w-xs -translate-x-1/2 -translate-y-1/2"
        >
          <div className="border-glow glass relative rounded-2xl p-5 text-center shadow-glow-violet">
            <div
              className="absolute inset-0 -z-10 rounded-2xl opacity-70 blur-2xl"
              style={{ background: "radial-gradient(circle at 50% 40%, rgba(139,92,246,0.45), transparent 70%)" }}
            />
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
              <Search className="h-5 w-5 text-electric" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">What do you want AI to do?</p>
            <div className="mt-2 h-7 overflow-hidden">
              <motion.p
                key={i}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-base font-medium text-white"
              >
                “{prompts[i]}”
              </motion.p>
            </div>
            <Link
              href="#finder"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              Show me <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* floating module cards */}
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + m.delay * 0.15 }}
              className={`absolute ${m.className} animate-float`}
              style={{ animationDelay: `${m.delay}s` }}
            >
              <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 shadow-card">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: `${m.accent}22`, color: m.accent }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap text-xs font-medium text-white/85">{m.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
