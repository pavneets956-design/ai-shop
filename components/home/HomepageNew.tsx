"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* ─── Design tokens (matches /v2 DOM extraction) ─── */
const AMBER = "#E88A00";
const INK = "#191716";
const PAPER = "#FAF7F2";

/* ─── Hero product cards ─── */
function HeroCards() {
  return (
    <div className="relative h-[420px] w-full select-none md:h-[500px]">
      {/* Center brand mark */}
      <div
        className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-2xl"
        style={{ background: INK }}
      >
        <span className="font-display text-2xl font-extrabold text-white">H</span>
      </div>
      <div
        className="absolute left-1/2 top-[58%] -translate-x-1/2 text-[9px] font-mono font-semibold uppercase tracking-[0.2em]"
        style={{ color: "#9B928A" }}
      >
        Assembling worker
      </div>

      {/* AI Receptionist status card — main, top-right */}
      <div
        className="absolute right-0 top-6 z-20 w-52 animate-[floatA_5s_ease-in-out_infinite] rounded-2xl border bg-white p-3.5 shadow-lg"
        style={{ borderColor: "#E8DED3" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: INK }}
          >
            <span className="text-[13px]">🎧</span>
          </div>
          <div>
            <div className="text-[12px] font-semibold" style={{ color: INK }}>AI Receptionist</div>
            <div className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: "#2F6B4F" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Live · answering
            </div>
          </div>
        </div>
        <div className="mt-2.5 space-y-1">
          {["Call answered & triaged", "Job booked, 1–3 PM", "Owner texted the lead"].map((t) => (
            <div key={t} className="flex items-center gap-1.5 text-[11px]" style={{ color: "#615A53" }}>
              <span style={{ color: "#2F6B4F" }}>✓</span> {t}
            </div>
          ))}
        </div>
      </div>

      {/* Notification cards — left */}
      <div
        className="absolute left-0 top-10 w-44 animate-[floatB_6s_ease-in-out_infinite] rounded-xl border bg-white p-3 shadow-md"
        style={{ borderColor: "#E8DED3" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[14px]">💬</span>
          <div>
            <div className="text-[11px] font-semibold" style={{ color: INK }}>New DM · "quote?"</div>
            <div className="text-[10px]" style={{ color: "#9B928A" }}>Instagram · 2 min ago</div>
          </div>
        </div>
      </div>

      <div
        className="absolute left-2 top-[44%] w-44 animate-[floatC_7s_ease-in-out_infinite] rounded-xl border bg-white p-3 shadow-md"
        style={{ borderColor: "#E8DED3" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[14px]">📵</span>
          <div>
            <div className="text-[11px] font-semibold" style={{ color: INK }}>Missed call</div>
            <div className="text-[10px]" style={{ color: "#9B928A" }}>7:42 PM · no voicemail</div>
          </div>
        </div>
      </div>

      {/* Bottom cards */}
      <div
        className="absolute bottom-16 left-8 w-44 animate-[floatA_5.5s_ease-in-out_0.5s_infinite] rounded-xl border bg-white p-3 shadow-md"
        style={{ borderColor: "#E8DED3" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[14px]">📅</span>
          <div>
            <div className="text-[11px] font-semibold" style={{ color: INK }}>Booking request</div>
            <div className="text-[10px]" style={{ color: "#9B928A" }}>Tue · 1–3 PM slot</div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-24 right-4 w-44 animate-[floatB_6.5s_ease-in-out_1s_infinite] rounded-xl border bg-white p-3 shadow-md"
        style={{ borderColor: "#E8DED3" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[14px]">🧾</span>
          <div>
            <div className="text-[11px] font-semibold" style={{ color: INK }}>Invoice #1048</div>
            <div className="text-[10px] font-medium" style={{ color: "#B42318" }}>$650 · 7 days late</div>
          </div>
        </div>
      </div>

      {/* Launches into pill row */}
      <div className="absolute bottom-4 right-0 flex items-center gap-1.5">
        <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.18em]" style={{ color: "#9B928A" }}>
          Launches into
        </span>
        {["📅 Calendar", "💬 SMS", "👤 CRM", "🧾 Invoices"].map((item) => (
          <span
            key={item}
            className="rounded-lg border px-2 py-0.5 text-[10px] font-semibold"
            style={{ borderColor: "#E8DED3", background: "#fff", color: INK }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated grid background ─── */
function GridBg({ dark = false }: { dark?: boolean }) {
  const color = dark ? "rgba(255,255,255,0.04)" : "rgba(25,23,22,0.05)";
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        maskImage: dark
          ? "radial-gradient(70% 60% at 50% 36%, #000 18%, transparent 78%)"
          : "radial-gradient(78% 72% at 72% 42%, #000 22%, transparent 76%)",
        WebkitMaskImage: dark
          ? "radial-gradient(70% 60% at 50% 36%, #000 18%, transparent 78%)"
          : "radial-gradient(78% 72% at 72% 42%, #000 22%, transparent 76%)",
        animation: "gridPan 26s linear infinite",
      }}
    />
  );
}

/* ─── Section label (mono, small caps) ─── */
function SectionLabel({ children, amber = false }: { children: React.ReactNode; amber?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]"
      style={{ color: amber ? AMBER : "#9B7A3A" }}
    >
      {amber && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: AMBER,
            boxShadow: `0 0 8px ${AMBER}`,
            animation: "blink 1.6s ease infinite",
          }}
        />
      )}
      {children}
    </div>
  );
}

/* ─── AI Worker product cards ─── */
const WORKERS = [
  {
    icon: "🎧",
    name: "AI Receptionist",
    tagline: "Answers calls, triages jobs, books appointments — 24/7.",
    tags: ["Calls", "SMS", "Calendar"],
    href: "/demo/ai-receptionist",
  },
  {
    icon: "📋",
    name: "Quote Generator",
    tagline: "Turns a text or DM into a professional estimate in 30 seconds.",
    tags: ["Quotes", "Email", "PDF"],
    href: "/demo/quote",
  },
  {
    icon: "🔁",
    name: "Follow-up Agent",
    tagline: "Re-activates cold leads and chases invoices automatically.",
    tags: ["SMS", "Email", "CRM"],
    href: "/demo/follow-up",
  },
  {
    icon: "💬",
    name: "AI Chatbot",
    tagline: "Answers FAQs, qualifies leads, and books calls from your website.",
    tags: ["Web", "Leads", "24/7"],
    href: "/ai-chatbot-development",
  },
];

function WorkerCard({ icon, name, tagline, tags, href }: (typeof WORKERS)[0]) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-[18px] border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ borderColor: "#E8DED3", boxShadow: "0 1px 0 rgba(25,23,22,0.04), 0 18px 40px -30px rgba(25,23,22,0.4)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
          style={{ background: "#FFF1DC", border: "1px solid #E8DED3" }}
        >
          {icon}
        </div>
        <div>
          <div className="font-display text-[15px] font-bold" style={{ color: INK }}>{name}</div>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "#615A53" }}>{tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t} className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: "#FAF7F2", color: "#9B7A3A", border: "1px solid #E8DED3" }}>{t}</span>
        ))}
      </div>
    </Link>
  );
}

/* ─── Pricing ─── */
const TIERS = [
  {
    name: "AI Starter System",
    price: "$1,000",
    period: "one-time · CAD",
    description: "One focused AI worker installed into your workflow. Ideal starting point.",
    features: ["1 AI worker (receptionist, quote, follow-up, or chat)", "Connected to your existing tools", "Real demo before you pay", "1 revision round included"],
    cta: "Start a build",
    href: "/start",
    featured: false,
  },
  {
    name: "AI Business System",
    price: "$2,500–5,000",
    period: "one-time · CAD",
    description: "Multiple connected workers + custom logic for your specific workflow.",
    features: ["2–4 coordinated AI workers", "Custom intake, routing & escalation", "Integrated with your CRM / invoicing", "3-month post-launch support"],
    cta: "Talk about your business",
    href: "/start",
    featured: true,
  },
  {
    name: "Custom AI App",
    price: "$7,500+",
    period: "one-time + $250/mo care · CAD",
    description: "A fully custom AI product — dashboard, API, or internal tool.",
    features: ["Full-stack AI application", "Bespoke AI logic & data model", "Production deploy + monitoring", "Ongoing Care plan included"],
    cta: "Get a scoping call",
    href: "/start",
    featured: false,
  },
];

function PricingCard({ tier }: { tier: (typeof TIERS)[0] }) {
  return (
    <div
      className="relative flex flex-col rounded-[20px] p-7"
      style={{
        background: tier.featured ? INK : "#fff",
        border: tier.featured ? "none" : "1px solid #E8DED3",
        boxShadow: tier.featured
          ? `0 24px 60px -20px rgba(25,23,22,0.5)`
          : "0 18px 40px -32px rgba(25,23,22,0.4)",
      }}
    >
      {tier.featured && (
        <div
          className="mb-4 inline-flex self-start rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
          style={{ background: AMBER, color: INK }}
        >
          Most popular
        </div>
      )}
      <div className="font-mono text-[11px] uppercase tracking-[0.07em]" style={{ color: tier.featured ? "#B7AEA4" : "#9B928A" }}>
        {tier.name}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-[32px] font-extrabold leading-none" style={{ color: tier.featured ? "#fff" : INK }}>
          {tier.price}
        </span>
      </div>
      <div className="text-[11px]" style={{ color: tier.featured ? "#9B928A" : "#B7AEA4" }}>{tier.period}</div>
      <p className="mt-4 text-[13px] leading-relaxed" style={{ color: tier.featured ? "#B7AEA4" : "#615A53" }}>
        {tier.description}
      </p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: tier.featured ? "#D7C6B5" : "#615A53" }}>
            <span style={{ color: tier.featured ? AMBER : "#2F6B4F", marginTop: 2 }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <Link
        href={tier.href}
        className="mt-7 flex items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-bold transition-all duration-200"
        style={
          tier.featured
            ? { background: AMBER, color: INK }
            : { background: "transparent", border: "1px solid #E8DED3", color: INK }
        }
      >
        {tier.cta} <span>→</span>
      </Link>
    </div>
  );
}

/* ─── Main page ─── */
export default function HomepageNew() {
  return (
    <>
      <style>{`
        @keyframes gridPan {
          0%   { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(-4px); }
          50%       { transform: translateY(6px); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(4px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
        [data-reveal] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ── Section 1: Hero ───────────────────────────────────── */}
      <section
        id="top"
        className="relative overflow-hidden"
        style={{ background: PAPER, minHeight: "calc(100vh - 64px)" }}
      >
        <GridBg />
        {/* bottom vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 50% 120%, rgba(25,23,22,0.1), transparent 55%)" }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
            {/* Left: copy */}
            <div data-reveal className="max-w-[560px]">
              {/* pill */}
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.05em]"
                style={{ background: "rgba(255,248,239,0.8)", borderColor: "#E8DED3", color: "#6F6862", boxShadow: "0 2px 8px rgba(25,23,22,0.04)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" style={{ boxShadow: "0 0 0 3px rgba(15,169,104,0.18)" }} />
                Built in BC · Installed, not advised
              </div>

              {/* headline */}
              <h1
                className="font-display font-extrabold leading-[0.96] tracking-[-0.028em]"
                style={{ fontSize: "clamp(40px, 5.8vw, 70px)", color: INK }}
              >
                Your busywork
                <br />goes in.
                <br />A working
                <br />
                <span style={{ color: AMBER, textDecoration: "underline", textDecorationColor: `${AMBER}50`, textUnderlineOffset: "4px" }}>
                  AI worker
                </span>
                <br />comes out.
              </h1>

              {/* subtext */}
              <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed" style={{ color: "#615A53" }}>
                We take the calls, texts, quotes, and invoices that eat your day — and build them into one real AI worker, wired into your tools and live in days.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/start"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: INK }}
                >
                  Start a build
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2.5 rounded-full border px-5 py-3.5 text-[14px] font-semibold transition-all duration-200 hover:border-amber-400"
                  style={{ borderColor: "#E8DED3", color: INK }}
                >
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[11px]"
                    style={{ background: AMBER, color: INK }}
                  >
                    ▶
                  </span>
                  Try the live demo
                </Link>
              </div>

              {/* trust bar */}
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]" style={{ color: "#9B928A" }}>
                <span className="flex items-center gap-1.5"><span style={{ color: "#2F6B4F" }}>✓</span> Fixed CAD pricing</span>
                <span>·</span>
                <span>Real demos, not mockups</span>
                <span>·</span>
                <span className="font-semibold" style={{ color: "#615A53" }}>one builder, no agency handoff</span>
              </div>
            </div>

            {/* Right: floating cards */}
            <div data-reveal className="hidden md:block" style={{ transitionDelay: "0.1s" }}>
              <HeroCards />
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.34em]" style={{ color: "rgba(25,23,22,0.35)" }}>Scroll</span>
          <div className="h-6 w-px animate-pulse" style={{ background: "rgba(25,23,22,0.2)" }} />
        </div>
      </section>

      {/* ── Section 2: Live Demo ──────────────────────────────── */}
      <section
        id="demo"
        className="relative overflow-hidden py-24"
        style={{ background: INK, color: "#F6EFE6" }}
      >
        <GridBg dark />
        {/* amber glow */}
        <div
          className="pointer-events-none absolute right-[-5%] top-[-10%] h-[70%] w-[55%]"
          style={{ background: "radial-gradient(rgba(232,137,12,0.16), transparent 65%)", filter: "blur(50px)" }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14">
            {/* Left: copy */}
            <div data-reveal>
              <SectionLabel amber>Live demo</SectionLabel>
              <h2
                className="mt-4 font-display font-extrabold leading-none tracking-[-0.024em]"
                style={{ fontSize: "clamp(31px, 4.2vw, 50px)", color: "#F6EFE6" }}
              >
                Try the AI before<br />you buy it.
              </h2>
              <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed" style={{ color: "#B7AEA4" }}>
                Pretend you&rsquo;re the customer. Each worker answers, triages, and acts — exactly like it will for your actual business.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-opacity hover:opacity-90"
                  style={{ background: AMBER, color: INK }}
                >
                  Talk to the AI →
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-[14px] font-semibold transition-all hover:border-amber-500/50"
                  style={{ borderColor: "rgba(246,239,230,0.16)", color: "#B7AEA4" }}
                >
                  See all demos
                </Link>
              </div>
            </div>

            {/* Right: demo persona cards */}
            <div data-reveal className="grid gap-3" style={{ transitionDelay: "0.08s" }}>
              {[
                { icon: "🎧", title: "AI Receptionist", sub: "Miss a call? It answers, triages, and books.", href: "/demo/ai-receptionist" },
                { icon: "📋", title: "Quote Generator", sub: "Type what the job is. Get a quote draft in 30s.", href: "/demo/quote" },
                { icon: "💬", title: "Lead Chatbot", sub: "Your website captures and qualifies the lead.", href: "/ai-chatbot-development" },
              ].map((d) => (
                <Link
                  key={d.title}
                  href={d.href}
                  className="group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 hover:border-amber-500/40 hover:bg-white/5"
                  style={{ borderColor: "rgba(246,239,230,0.1)", background: "rgba(255,255,255,0.03)" }}
                >
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                    style={{ background: "rgba(232,137,12,0.15)", border: "1px solid rgba(232,137,12,0.25)" }}
                  >
                    {d.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-[14px] font-bold" style={{ color: "#F6EFE6" }}>{d.title}</div>
                    <div className="mt-0.5 text-[12px]" style={{ color: "#9B928A" }}>{d.sub}</div>
                  </div>
                  <span className="text-[#9B928A] transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: AI Workers ─────────────────────────────── */}
      <section id="systems" className="relative py-24" style={{ background: PAPER }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div data-reveal className="max-w-[660px]">
            <SectionLabel>Ready-to-deploy AI workers</SectionLabel>
            <h2
              className="mt-3 font-display font-extrabold leading-none tracking-[-0.024em]"
              style={{ fontSize: "clamp(31px, 4.2vw, 50px)", color: INK }}
            >
              Start with one AI worker.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#615A53" }}>
              Fixed-scope workers we customize for your business — installed in the tools you already use, not bolted on as another app to babysit.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal style={{ transitionDelay: "0.05s" }}>
            {WORKERS.map((w) => (
              <WorkerCard key={w.name} {...w} />
            ))}
          </div>
          <div className="mt-8 text-center" data-reveal style={{ transitionDelay: "0.1s" }}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-semibold text-[14px] transition-opacity hover:opacity-70"
              style={{ color: INK }}
            >
              See all ready-made systems →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 4: Pricing ────────────────────────────────── */}
      <section id="pricing" className="relative py-24" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1120px] px-6">
          <div data-reveal className="mx-auto max-w-[660px] text-center">
            <SectionLabel>Pricing</SectionLabel>
            <h2
              className="mt-3 font-display font-extrabold leading-none tracking-[-0.024em]"
              style={{ fontSize: "clamp(31px, 4.2vw, 50px)", color: INK }}
            >
              Simple, fixed CAD pricing.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#615A53" }}>
              You&rsquo;re not buying prompts or a PDF strategy. You&rsquo;re buying a working AI system, installed for your business.
            </p>
          </div>
          <div className="mt-12 grid items-center gap-5 md:grid-cols-3" data-reveal style={{ transitionDelay: "0.05s" }}>
            {TIERS.map((t) => (
              <PricingCard key={t.name} tier={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA ────────────────────────────────────── */}
      <section
        id="start"
        className="relative flex flex-col items-center justify-center overflow-hidden py-32 text-center"
        style={{ background: INK }}
      >
        <GridBg dark />
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[55%] w-[60%] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(rgba(232,137,12,0.18), transparent 64%)", filter: "blur(60px)" }}
        />

        <div className="relative z-10 mx-auto max-w-[780px] px-6">
          {/* builder bio */}
          <div data-reveal className="mx-auto mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13px]" style={{ borderColor: "rgba(246,239,230,0.16)", background: "rgba(246,239,230,0.03)", color: "#B7AEA4" }}>
            <span
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-display text-[13px] font-extrabold"
              style={{ background: AMBER, color: INK }}
            >
              P
            </span>
            Built by <strong style={{ color: "#F6EFE6" }}>Pavneet</strong> in Surrey/Delta, BC &middot; real builder, no agency handoff
          </div>

          <h2
            data-reveal
            className="font-display font-extrabold leading-[1.02] tracking-[-0.026em]"
            style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "#F6EFE6", transitionDelay: "0.05s" }}
          >
            Tell us what you want<br />off your plate.
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed"
            style={{ color: "#B7AEA4", transitionDelay: "0.1s" }}
          >
            No commitment. Takes 2 minutes. We&rsquo;ll respond with a real plan — not a sales email.
          </p>

          <div data-reveal className="mt-9 flex flex-wrap items-center justify-center gap-3" style={{ transitionDelay: "0.15s" }}>
            <Link
              href="/start"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold transition-all duration-200 hover:opacity-90"
              style={{ background: AMBER, color: INK }}
            >
              Start a build
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-4 text-[14px] font-semibold transition-all hover:border-amber-500/50"
              style={{ borderColor: "rgba(246,239,230,0.2)", color: "#B7AEA4" }}
            >
              See demos first
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll-reveal observer */}
      <RevealObserver />
    </>
  );
}

function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
