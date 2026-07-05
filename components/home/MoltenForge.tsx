"use client";

/**
 * MoltenForge — Handbuilt landing page ("Molten Forge Light").
 * Red & white premium-Apple aesthetic. Faithful port of the design handoff,
 * rebuilt for 2026 positioning: the cheap AI tool is real; making it work
 * correctly for YOUR business is the hard part.
 *
 * Overrides vs the raw handoff:
 *  - "handled." and "Yours." render RED (was green). Green now only appears
 *    inside authentic in-phone iOS UI (message bubbles, call waveform, tiles).
 *  - No fake "call my AI live now" terminal — removed per "don't show a live
 *    demo unless it works."
 *  - Receptionist demo is a labelled SAMPLE. Set RECEPTIONIST_AUDIO_SRC to a
 *    real recording (drop the mp3 in /public/demo/) to add a play button.
 */

import { useEffect, useRef, useState } from "react";
import { HOME_FAQS } from "@/lib/data/homeFaqs";

/* ─── tokens ─────────────────────────────────────────────────── */
const QS = "var(--font-quicksand), 'Quicksand', ui-rounded, system-ui, sans-serif";
const MONO = "var(--font-jbmono), 'JetBrains Mono', ui-monospace, monospace";
const APPLE = "-apple-system, 'SF Pro Display', 'Helvetica Neue', system-ui, sans-serif";
const RED_GRAD = "linear-gradient(180deg, #FF6961, #E0362C)";
const redText: React.CSSProperties = {
  backgroundImage: RED_GRAD,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

/* ─── config ─────────────────────────────────────────────────── */
const AUDIT_HREF = "mailto:build@aibuiltbyhand.com?subject=Free%2010-min%20fit%20check";
const buildHref = (s: string) =>
  `mailto:build@aibuiltbyhand.com?subject=${encodeURIComponent(s)}`;
// Sample recording of the Ironwood Grounds AI receptionist greeting (Kokoro TTS
// re-creation of the real greeting script — labelled "sample", not the literal
// production voice). Swap in a real exported call recording anytime. Empty
// string = the screen falls back to a labelled illustration (no fake live claim).
const RECEPTIONIST_AUDIO_SRC = "/demo/receptionist-call.mp3";

/* ─── data ───────────────────────────────────────────────────── */
type Bubble = { align: string; bg: string; color: string; text: string };
const bub = (side: "l" | "r", text: string): Bubble => ({
  align: side === "r" ? "flex-end" : "flex-start",
  bg: side === "r" ? "#34C759" : "#E9E9EB",
  color: side === "r" ? "#FFFFFF" : "#1D1D1F",
  text,
});

type LogRow = { k: string; v: string; c: string };
type DemoRaw = {
  part: string;
  label: string;
  type: "call" | "mail" | "review" | "sms" | "dash";
  name: string;
  copy: string;
  bestFor: string;
  price: string;
  time: string;
  msgs?: Bubble[];
  log: LogRow[];
};

const DEMOS_RAW: DemoRaw[] = [
  {
    part: "HB-001",
    label: RECEPTIONIST_AUDIO_SRC ? "AI RECEPTIONIST · SAMPLE CALL" : "AI RECEPTIONIST · SAMPLE UI",
    type: "call",
    name: "AI Receptionist",
    copy: "Every call answered on ring two — booked, quoted, and confirmed by text while you stay on the mower.",
    bestFor: "Best for: shops missing calls out on the job site.",
    price: "from $1,500 CAD",
    time: "live in ~5 days",
    log: [
      { k: "CALL ANSWERED", v: "RING 2", c: "#1D1D1F" },
      { k: "SLOT BOOKED", v: "THU 09:00", c: "#1D1D1F" },
      { k: "QUOTE DRAFTED", v: "$180.00 CAD", c: "#248A3D" },
    ],
  },
  {
    part: "HB-002",
    label: "AI QUOTE AGENT · WEBSITE LEAD",
    type: "mail",
    name: "AI Quote Agent",
    copy: "Turns “can you price this?” into a sent, priced quote the same day — not the same week.",
    bestFor: "Best for: trades losing jobs to slow quotes.",
    price: "from $1,500 CAD",
    time: "live in ~5 days",
    log: [
      { k: "LEAD SOURCE", v: "WEBSITE FORM", c: "#1D1D1F" },
      { k: "QUOTE SENT IN", v: "4 MIN", c: "#1D1D1F" },
      { k: "SEASON VALUE", v: "$3,360 CAD", c: "#248A3D" },
    ],
  },
  {
    part: "HB-003",
    label: "AI REVIEW REPLIER · GOOGLE",
    type: "review",
    name: "AI Review Replier",
    copy: "Every Google review answered in your voice within hours — the free marketing most owners never get to.",
    bestFor: "Best for: owners with no time for Google reviews.",
    price: "from $1,500 CAD",
    time: "live in ~5 days",
    log: [
      { k: "REVIEW SPOTTED", v: "08:12", c: "#1D1D1F" },
      { k: "REPLY POSTED", v: "08:34", c: "#1D1D1F" },
      { k: "TONE", v: "YOURS", c: "#248A3D" },
    ],
  },
  {
    part: "HB-004",
    label: "AI FOLLOW-UP AGENT · SMS",
    type: "sms",
    name: "AI Follow-Up Agent",
    copy: "Chases every quote that went quiet — politely, relentlessly — until it’s a yes or a no.",
    bestFor: "Best for: quiet quotes that never get chased.",
    price: "from $1,500 CAD",
    time: "live in 1–2 weeks",
    msgs: [
      bub("r", "“Hi Mark — did the hedge-trimming quote land okay? I can hold Friday’s slot until tonight.”"),
      bub("l", "“Friday works. Book it.”"),
    ],
    log: [
      { k: "QUOTE Q-2189", v: "WON", c: "#248A3D" },
      { k: "DAYS SILENT", v: "6 → 0", c: "#1D1D1F" },
      { k: "FOLLOW-UPS SENT", v: "2", c: "#1D1D1F" },
    ],
  },
  {
    part: "HB-005",
    label: "AI INVOICE AGENT · SMS",
    type: "sms",
    name: "AI Invoice Agent",
    copy: "Sends invoices the moment a job closes and nudges late payers — so you never chase money at 10pm.",
    bestFor: "Best for: evenings lost to chasing payment.",
    price: "from $1,500 CAD",
    time: "live in 1–2 weeks",
    msgs: [
      bub("r", "“Friendly nudge — invoice #1042 ($320) is 7 days overdue. Card link: pay.ironwood.ca/1042”"),
      bub("l", "“Paid just now — sorry about that!”"),
    ],
    log: [
      { k: "INVOICE #1042", v: "PAID", c: "#248A3D" },
      { k: "CHASED FOR", v: "0 EVENINGS", c: "#1D1D1F" },
      { k: "OVERDUE BOOK", v: "−$320", c: "#1D1D1F" },
    ],
  },
  {
    part: "HB-006",
    label: "AI ADMIN SYSTEM · WEEKLY DIGEST",
    type: "dash",
    name: "AI Admin System",
    copy: "The whole back office on one screen — every call, quote, and invoice accounted for, nothing missed.",
    bestFor: "Best for: owners who want one screen for everything.",
    price: "from $3,500 CAD",
    time: "live in 2–3 weeks",
    log: [
      { k: "CALLS ANSWERED", v: "31 / 31", c: "#1D1D1F" },
      { k: "QUOTES SENT", v: "12", c: "#1D1D1F" },
      { k: "COLLECTED", v: "$4,120 CAD", c: "#248A3D" },
      { k: "REVIEWS REPLIED", v: "6", c: "#1D1D1F" },
    ],
  },
];

const WORKERS_CATALOG = [
  { num: "HB-001", name: "AI Receptionist", desc: "Answers every call, books the job, texts the customer back.", best: "Missed calls on the job site", price: "from $1,500", time: "~5 days" },
  { num: "HB-002", name: "AI Quote Agent", desc: "Turns inquiries into priced, sendable quotes — same day.", best: "Jobs lost to slow quotes", price: "from $1,500", time: "~5 days" },
  { num: "HB-003", name: "AI Review Replier", desc: "Replies to every Google review in your voice, within hours.", best: "No time for Google reviews", price: "from $1,500", time: "~5 days" },
  { num: "HB-004", name: "AI Follow-Up Agent", desc: "Chases every quote that went quiet until it’s a yes or a no.", best: "Quotes that go silent", price: "from $1,500", time: "1–2 wks" },
  { num: "HB-005", name: "AI Invoice Agent", desc: "Sends invoices, nudges late payers, flags what’s overdue.", best: "Chasing payment at night", price: "from $1,500", time: "1–2 wks" },
  { num: "HB-006", name: "AI Admin System", desc: "The whole back office — calls, quotes, invoices, one dashboard.", best: "One screen for everything", price: "from $3,500", time: "2–3 wks" },
];

type Tier = { label: string; price: string; range?: string; suffix: string; sub: string; desc: string; cta: string; subject: string; featured: boolean };
const TIERS: Tier[] = [
  { label: "AI STARTER WORKER", price: "$1,500", suffix: "+ CAD", sub: "ONE-TIME BUILD", desc: "One worker — receptionist, quote agent, or review replier — installed, wired in, tested, and live in about 5 days.", cta: "Start here", subject: "AI Starter Worker", featured: false },
  { label: "AI RECEPTIONIST INSTALL", price: "$1,500", range: "–$2,500", suffix: " CAD", sub: "ONE-TIME BUILD", desc: "Your phone line answered, jobs booked, callers texted back — set up around your services, prices, and calendar.", cta: "Book the install", subject: "AI Receptionist Install", featured: false },
  { label: "AI BUSINESS SYSTEM", price: "$3,500", range: "–$7,500", suffix: " CAD", sub: "ONE-TIME BUILD", desc: "2–4 connected workers plus an owner dashboard — calls, quotes, invoices, and follow-ups in one place.", cta: "Start a build", subject: "AI Business System", featured: true },
  { label: "CUSTOM AI APP", price: "$10,000", suffix: "+ CAD", sub: "ONE-TIME BUILD", desc: "A full app or customer portal, built for how your business actually runs. Yours outright — code and all.", cta: "Scope it with me", subject: "Custom AI App", featured: false },
];

// Optional monthly care plans — NOT required to own the system. Priced by the
// complexity of what's being monitored/maintained (see the framing copy above
// the grid). Growth Care carries a range because integrations vary.
type CarePlan = { label: string; price: string; range?: string; desc: string };
const CARE: CarePlan[] = [
  { label: "LIGHT CARE", price: "$99", desc: "For simple receptionist or review systems." },
  { label: "STANDARD CARE", price: "$199", desc: "For call, quote, booking, and follow-up workflows." },
  { label: "GROWTH CARE", price: "$399", range: "–$499", desc: "For multi-worker systems with CRM, invoices, dashboard, and deeper integrations." },
];

const INTERNAL_LINKS = [
  { label: "AI receptionist Canada", href: "/ai-receptionist" },
  { label: "AI receptionist for contractors", href: "/use-cases/ai-receptionist-for-contractors" },
  { label: "AI receptionist for landscapers", href: "/industries/landscaping-ai-automation" },
  { label: "Jobber AI setup", href: "/services/ai-receptionist-setup" },
  { label: "AI quote agent", href: "/services/ai-quote-generator" },
  { label: "AI invoice follow-up", href: "/services/ai-invoice-reminder-system" },
  { label: "AI automation Surrey BC", href: "/ai-automation-agency" },
  { label: "AI automation Delta BC", href: "/industries/contractor-ai-automation" },
];

/* ─── css (keyframes, responsive vars, hover, reduced-motion) ── */
const CSS = `
.mf-root{--phoneScale:1;--demoGap:72px;--demoH2mb:48px;--demoTextMinH:320px;}
@media(max-width:1024px){.mf-root{--phoneScale:0.85;--demoGap:44px;}}
@media(max-width:640px){.mf-root{--phoneScale:0.56;--demoGap:18px;--demoH2mb:18px;--demoTextMinH:250px;}}
@keyframes mfEmber{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes mfOrbit{0%{transform:translate(0,36px) scale(1.12);opacity:1;z-index:6}12.5%{transform:translate(152px,26px) scale(1.03);opacity:1;z-index:6}25%{transform:translate(215px,0) scale(.9);opacity:.95;z-index:4}37.5%{transform:translate(152px,-26px) scale(.78);opacity:.7;z-index:1}50%{transform:translate(0,-36px) scale(.7);opacity:.55;z-index:1}62.5%{transform:translate(-152px,-26px) scale(.78);opacity:.7;z-index:1}75%{transform:translate(-215px,0) scale(.9);opacity:.95;z-index:4}87.5%{transform:translate(-152px,26px) scale(1.03);opacity:1;z-index:6}100%{transform:translate(0,36px) scale(1.12);opacity:1;z-index:6}}
@keyframes mfWave{0%,100%{height:6px}50%{height:24px}}
@keyframes mfLiveIn{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
@keyframes mfColorShift{0%,100%{color:#34C759}50%{color:#FF453A}}
.mf-root ::selection{background:rgba(255,69,58,.22);color:#1D1D1F}
.mf-sec{padding:100px 32px;}
.mf-hero{padding:104px 32px 88px;}
.mf-navlink{color:#1D1D1F;text-decoration:none;transition:opacity .15s;}
.mf-navlink:hover{opacity:.55;}
.mf-cta,.mf-cta-lg,.mf-cta-xl,.mf-nav-cta{transition:box-shadow .2s,filter .2s;}
.mf-nav-cta:hover{box-shadow:0 4px 18px rgba(255,69,58,.4);filter:brightness(1.04);}
.mf-cta:hover{box-shadow:0 6px 30px rgba(255,69,58,.5),0 8px 24px rgba(0,0,0,.08);filter:brightness(1.04);}
.mf-cta-lg:hover{box-shadow:0 5px 24px rgba(255,69,58,.48);filter:brightness(1.04);}
.mf-cta-xl:hover{box-shadow:0 6px 36px rgba(255,69,58,.55),0 10px 28px rgba(0,0,0,.08);filter:brightness(1.04);}
.mf-outline{transition:border-color .2s,color .2s;}
.mf-outline:hover{border-color:rgba(255,69,58,.6);}
.mf-secondary{transition:border-color .2s,background .2s;}
.mf-secondary:hover{border-color:rgba(255,69,58,.5);background:rgba(255,69,58,.04);}
.mf-row{transition:background .2s;}
.mf-row:hover{background:rgba(255,69,58,.045);}
.mf-link{color:#1D1D1F;text-decoration:none;border-bottom:1px solid rgba(255,69,58,.3);transition:color .15s,border-color .15s;white-space:nowrap;}
.mf-link:hover{color:#E0362C;border-color:#E0362C;}
@media(max-width:640px){
 .mf-sec{padding:60px 20px;}
 .mf-hero{padding:52px 20px 52px;}
 .mf-card{padding:26px 22px!important;}
 .mf-h1{font-size:clamp(38px,11vw,60px)!important;}
}
@media(prefers-reduced-motion:reduce){
 .mf-orbit{animation:none!important;}
 .mf-wave span{animation:none!important;height:15px!important;}
 .mf-ember{animation:none!important;}
 .mf-root [style*="mfLiveIn"]{animation:none!important;}
}
`;

/* ─── icons ──────────────────────────────────────────────────── */
const GmailIcon = ({ s = 20 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M1.636 21h3.819V11.73L0 7.638v11.726C0 20.268.732 21 1.636 21z" />
    <path fill="#34A853" d="M18.545 21h3.819c.904 0 1.636-.732 1.636-1.636V7.638l-5.455 4.091z" />
    <path fill="#FBBC04" d="M18.545 7.638v4.091L24 7.638V6.82c0-2.023-2.309-3.178-3.927-1.964z" />
    <path fill="#EA4335" d="M5.455 11.73V7.638L12 12.548l6.545-4.91v4.091L12 16.64z" />
    <path fill="#C5221F" d="M0 6.82v.818l5.455 4.091V7.638L3.927 4.855C2.309 3.642 0 4.797 0 6.82z" />
  </svg>
);
const PhoneGlyph = ({ s = 19, fill = "#FFFFFF" }: { s?: number; fill?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path fill={fill} d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);
const CalendarGlyph = ({ s = 19 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#E5484D" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
  </svg>
);
const MessagesGlyph = ({ s = 19 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#FFFFFF" d="M12 2C6.48 2 2 5.94 2 10.8c0 2.8 1.49 5.29 3.81 6.9-.13 1.17-.57 2.48-1.5 3.49-.18.2-.04.52.23.5 2.06-.17 3.68-.98 4.77-1.77.86.21 1.76.33 2.69.33 5.52 0 10-3.94 10-8.8S17.52 2 12 2z" />
  </svg>
);
const ClockGlyph = ({ s = 26 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#FFFFFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
  </svg>
);
const GoogleG = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
  </svg>
);
const MicGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#1D1D1F" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
  </svg>
);
const SpeakerGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#1D1D1F" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);
const LogoMark = ({ s = 30 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="44" height="44" rx="4" fill="#1D1D1F" stroke="#3A3A3C" strokeWidth="1.5" />
    <path d="M16 14 V34" stroke="#F5F5F7" strokeWidth="4.4" strokeLinecap="round" />
    <path d="M32 14 V34" stroke="#F5F5F7" strokeWidth="4.4" strokeLinecap="round" />
    <path d="M16 24 H32" stroke="#FF3B30" strokeWidth="4.4" strokeLinecap="round" />
    <circle cx="32" cy="14" r="2.8" fill="#FF3B30" />
  </svg>
);

/* ─── phone chrome ───────────────────────────────────────────── */
function StatusBar({ dark }: { dark: boolean }) {
  const c = dark ? "#fff" : "#000";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "21px 30px 0", boxSizing: "border-box", width: "100%" }}>
      <span style={{ fontFamily: APPLE, fontWeight: 600, fontSize: 17, color: c }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} /><rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} /><rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} /><rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} /></svg>
        <svg width="27" height="13" viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" /><rect x="2" y="2" width="20" height="9" rx="2" fill={c} /><path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4" /></svg>
      </div>
    </div>
  );
}

function DeviceFrame({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <div style={{ position: "relative", width: 262, height: 554 }}>
      <div
        style={{
          position: "relative", zIndex: 3, width: 422, height: 894, padding: 10, boxSizing: "border-box",
          transform: "scale(0.62)", transformOrigin: "top left", borderRadius: 58,
          background: "linear-gradient(145deg, #4A4A4E, #2A2A2E 40%, #16161A)",
          boxShadow: "0 34px 70px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.18)",
        }}
      >
        <span style={{ position: "absolute", left: -3, top: 190, width: 4, height: 34, borderRadius: 2, background: "#3A3A3C" }} />
        <span style={{ position: "absolute", left: -3, top: 248, width: 4, height: 62, borderRadius: 2, background: "#3A3A3C" }} />
        <span style={{ position: "absolute", left: -3, top: 322, width: 4, height: 62, borderRadius: 2, background: "#3A3A3C" }} />
        <span style={{ position: "absolute", right: -3, top: 270, width: 4, height: 96, borderRadius: 2, background: "#3A3A3C" }} />
        <div style={{ width: 402, height: 874, borderRadius: 48, overflow: "hidden", position: "relative", background: dark ? "#000" : "#F2F2F7" }}>
          <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 126, height: 37, borderRadius: 24, background: "#000", zIndex: 50 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}><StatusBar dark={dark} /></div>
          <div style={{ height: "100%" }}>{children}</div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 60, height: 34, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 8, pointerEvents: "none" }}>
            <div style={{ width: 139, height: 5, borderRadius: 100, background: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.25)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Scale wrapper: responsive --phoneScale on a 262x554 box. */
function PhoneScaleBox({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ width: "calc(262px * var(--phoneScale, 1))", height: "calc(554px * var(--phoneScale, 1))", ...style }}>
      <div style={{ transform: "scale(var(--phoneScale, 1))", transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

const LOCK_NOTIFS = [
  { icon: <GmailIcon s={20} />, tile: "#FFFFFF", name: "Gmail", time: "22:41", body: <>1,200 unread — new leads buried under old quotes.</> },
  { icon: <PhoneGlyph s={19} />, tile: "linear-gradient(180deg, #5CD768, #2FB84E)", name: "Phone", time: "21:58", body: <><span style={{ color: "#FF6961" }}>12 missed calls</span> today. 3 were new customers.</> },
  { icon: <CalendarGlyph s={19} />, tile: "#FFFFFF", name: "Calendar", time: "21:15", body: <>8 appointments unattended this week.</> },
  { icon: <MessagesGlyph s={19} />, tile: "linear-gradient(180deg, #5CD768, #2FB84E)", name: "Messages", time: "20:36", body: <>47 unread. “Did you get my quote request?”</> },
];

function LockScreen() {
  return (
    <div style={{ height: "100%", boxSizing: "border-box", background: "linear-gradient(180deg, #17130E 0%, #0B0A08 100%)", padding: "74px 14px 44px", display: "flex", flexDirection: "column", gap: 10, fontFamily: APPLE }}>
      <div style={{ textAlign: "center", margin: "10px 0 14px" }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Thursday, July 2</div>
        <div style={{ fontSize: 78, fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>22:47</div>
      </div>
      {LOCK_NOTIFS.map((n) => (
        <div key={n.name} style={{ background: "rgba(72,72,80,0.5)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderRadius: 20, padding: "12px 14px", display: "flex", gap: 11, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: n.tile, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>{n.name}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{n.time}</span>
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.35, marginTop: 2 }}>{n.body}</div>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>+ 38 more notifications</div>
    </div>
  );
}

type OrbitIcon = { tile: string; border?: string; badge?: string; badgeRight?: number; icon?: React.ReactNode; cal?: boolean; img?: string; alt?: string };
const ORBIT: OrbitIcon[] = [
  { tile: "#FFFFFF", border: "1px solid #E8E8ED", badge: "1200", badgeRight: -12, icon: <GmailIcon s={28} /> },
  { tile: "linear-gradient(180deg, #5CD768, #2FB84E)", badge: "12", badgeRight: -9, icon: <PhoneGlyph s={26} /> },
  { tile: "linear-gradient(180deg, #5CD768, #2FB84E)", badge: "47", badgeRight: -9, icon: <MessagesGlyph s={26} /> },
  { tile: "#FFFFFF", border: "1px solid #E8E8ED", badge: "8", badgeRight: -9, cal: true },
  { tile: "#1D1D1F", badge: "5", badgeRight: -9, icon: <ClockGlyph s={26} /> },
  { tile: "#FFFFFF", border: "1px solid #E8E8ED", img: "https://www.google.com/s2/favicons?domain=coitracker.co&sz=128", alt: "COI Tracker" },
  { tile: "#FFFFFF", border: "1px solid #E8E8ED", img: "https://www.google.com/s2/favicons?domain=paynudge.xyz&sz=128", alt: "PayNudge" },
];

/* ─── main ───────────────────────────────────────────────────── */
export default function MoltenForge() {
  const [slide, setSlide] = useState(0);
  const [seg, setSeg] = useState(0);
  const [tick, setTick] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Synchronous compute (no rAF gate): the math is trivial and setState
    // dedupes, so this stays cheap while working in every environment.
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const total = Math.max(1, el.offsetHeight - vh);
      const top = el.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / total));
      const s = Math.round(Math.min(1, Math.max(0, 1 - top / (vh * 0.9))) * 100) / 100;
      const sg = Math.min(5, Math.max(0, Math.floor(p * 6)));
      setSlide((prev) => (prev !== s ? s : prev));
      setSeg((prev) => (prev !== sg ? sg : prev));
    };
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(timer);
    };
  }, []);

  const e = 1 - Math.pow(1 - slide, 3);
  const phoneTransform = `translate(${((1 - e) * 38).toFixed(2)}vw, ${((1 - e) * -12).toFixed(2)}vh)`;
  const phoneOpacity = Math.min(1, slide * 2.2);
  const tsec = 42 + tick;
  const recTime = ("0" + Math.floor(tsec / 60)).slice(-2) + ":" + ("0" + (tsec % 60)).slice(-2);

  const demos = DEMOS_RAW.map((d, i) => {
    const act = seg === i;
    const base = (n: number) => (act ? `mfLiveIn 0.5s ease ${n}s both` : "none");
    return {
      ...d,
      act,
      msgs: (d.msgs || []).map((m, j) => ({ ...m, anim: act ? `mfLiveIn 0.5s ease ${(0.2 + j * 0.7).toFixed(2)}s both` : "none" })),
      a1: base(0.05), a2: base(0.3), a3: base(0.6), a4: base(0.95), a5: base(1.3), a6: base(1.6),
      on: act ? 1 : 0, ptr: act ? "auto" : "none", tickBg: act ? "#E0362C" : "#D2D2D7",
    };
  });

  const waveDelays = [-0.9, -0.3, -0.7, -0.15, -0.55, -0.95, -0.4, -0.8, -0.25, -0.65, -0.05, -0.5];

  const eyebrow = { fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 20 } as React.CSSProperties;
  const h2 = { fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 700, color: "#1D1D1F", margin: "0 0 56px" } as React.CSSProperties;

  const renderScreenBody = (d: (typeof demos)[number]) => {
    switch (d.type) {
      case "call":
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ width: 74, height: 74, borderRadius: "50%", background: "linear-gradient(180deg, #5CD768, #2FB84E)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 34px rgba(52,199,89,0.35)", animation: d.a1 }}>
              <PhoneGlyph s={34} />
            </div>
            <div style={{ textAlign: "center", animation: d.a2 }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#1D1D1F", fontFamily: APPLE }}>AI Receptionist</div>
              <div style={{ fontSize: 13, color: "#8E8E93", marginTop: 4, fontFamily: APPLE }}>{RECEPTIONIST_AUDIO_SRC ? "Sample call · Ironwood Grounds" : "Answering a new call · Surrey, BC"}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: "#FF3B30", animation: d.a3 }}>
              <span className="mf-ember" style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF3B30", animation: "mfEmber 1.4s ease-in-out infinite", display: "inline-block" }} />
              REC {recTime}
            </div>
            <div className="mf-wave" style={{ display: "flex", alignItems: "center", gap: 4, height: 28, animation: d.a4 }}>
              {waveDelays.map((del, i) => (
                <span key={i} style={{ width: 4, borderRadius: 2, background: "#34C759", height: 10, animation: `mfWave 1.1s ease-in-out ${del}s infinite` }} />
              ))}
            </div>
            {RECEPTIONIST_AUDIO_SRC ? (
              <audio controls preload="none" style={{ width: "88%", animation: d.a5 }}>
                <source src={RECEPTIONIST_AUDIO_SRC} type="audio/mpeg" />
              </audio>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 6, animation: d.a5 }}>
                <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#F2F2F7", display: "flex", alignItems: "center", justifyContent: "center" }}><MicGlyph /></span>
                <span style={{ width: 52, height: 52, borderRadius: "50%", background: "#FF3B30", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(255,59,48,0.4)", transform: "rotate(135deg)" }}><PhoneGlyph s={24} /></span>
                <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#F2F2F7", display: "flex", alignItems: "center", justifyContent: "center" }}><SpeakerGlyph /></span>
              </div>
            )}
          </div>
        );
      case "mail":
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, fontFamily: APPLE }}>
            <div style={{ paddingBottom: 8, borderBottom: "1px solid #E8E8ED", fontSize: 13, color: "#8E8E93", animation: d.a1 }}>To: <span style={{ color: "#007AFF" }}>dan.k@ladnerlawns.ca</span></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1D1D1F", animation: d.a2 }}>Your mowing quote — Q-2214</div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: "#1D1D1F", animation: d.a3 }}>Hi Dan — here’s the quote for the 6,000 sq ft lawn in Ladner, cut biweekly:</div>
            <div style={{ border: "1px solid #E8E8ED", borderRadius: 12, overflow: "hidden", animation: d.a4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 14px", borderBottom: "1px solid #F0F0F2", fontSize: 13.5 }}><span style={{ color: "#8E8E93" }}>Biweekly mowing</span><span style={{ color: "#1D1D1F", fontWeight: 600 }}>$140 / visit</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 14px", borderBottom: "1px solid #F0F0F2", fontSize: 13.5 }}><span style={{ color: "#8E8E93" }}>Season · 12 visits</span><span style={{ color: "#1D1D1F", fontWeight: 600 }}>$1,680</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "11px 14px", fontSize: 13.5 }}><span style={{ color: "#8E8E93" }}>Price locked</span><span style={{ color: "#248A3D", fontWeight: 600 }}>30 days</span></div>
            </div>
            <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 7, background: "rgba(52,199,89,0.12)", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "#248A3D", animation: d.a5 }}>✓ Sent 4 min after inquiry</div>
          </div>
        );
      case "review":
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, fontFamily: APPLE }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, animation: d.a1 }}>
              <GoogleG s={18} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F" }}>Ironwood Grounds Ltd</span>
              <span style={{ fontSize: 12, color: "#8E8E93", marginLeft: "auto" }}>Reviews</span>
            </div>
            <div style={{ display: "flex", gap: 10, animation: d.a2 }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#7B1FA2", color: "#FFFFFF", fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>S</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F" }}>Sarah M.</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}><span style={{ color: "#FBBC04", fontSize: 13, letterSpacing: "1px" }}>★★★★★</span><span style={{ fontSize: 12, color: "#8E8E93" }}>2 hours ago</span></div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#1D1D1F", marginTop: 6 }}>Great crew, lawn looks amazing. Booked them for the whole summer.</div>
              </div>
            </div>
            <div style={{ marginLeft: 46, background: "#F5F5F7", borderRadius: 12, padding: "10px 12px", animation: d.a4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 12.5, fontWeight: 600, color: "#1D1D1F" }}>Response from the owner</span><span style={{ fontSize: 11.5, color: "#8E8E93" }}>just now</span></div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: "#1D1D1F", marginTop: 4 }}>Thanks, Sarah — the crew will be glad to hear it. See you every second Tuesday!</div>
            </div>
            <div style={{ animation: `${d.a5}, mfColorShift 6s ease-in-out infinite`, alignSelf: "flex-start", marginLeft: 46, display: "flex", alignItems: "center", gap: 7, background: "rgba(52,199,89,0.12)", borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "#248A3D" }}>
              <span className="mf-ember" style={{ width: 6, height: 6, borderRadius: "50%", background: "#34C759", animation: "mfEmber 1.6s ease-in-out infinite", display: "inline-block" }} />Replied automatically · 08:34
            </div>
          </div>
        );
      case "dash":
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, fontFamily: APPLE }}>
            <div style={{ fontSize: 13, color: "#8E8E93", animation: d.a1 }}>Week of June 29 — all clear</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, animation: d.a2 }}>
              {[{ n: "31/31", l: "Calls answered", c: "#1D1D1F" }, { n: "12", l: "Quotes sent", c: "#1D1D1F" }, { n: "$4,120", l: "Collected", c: "#248A3D" }, { n: "6", l: "Reviews replied", c: "#1D1D1F" }].map((s) => (
                <div key={s.l} style={{ border: "1px solid #E8E8ED", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.n}</div>
                  <div style={{ fontSize: 11.5, color: "#8E8E93", marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case "sms":
        return (
          <>
            {d.msgs.map((m, j) => (
              <div key={j} style={{ alignSelf: m.align, maxWidth: "88%", background: m.bg, borderRadius: 16, padding: "12px 15px", fontSize: 14.5, lineHeight: 1.45, color: m.color, animation: m.anim, fontFamily: APPLE }}>{m.text}</div>
            ))}
          </>
        );
    }
  };

  const PhoneScreens = () => (
    <div style={{ position: "relative", height: "100%", background: "#FFFFFF" }}>
      {demos.map((d) => (
        <div key={d.part} style={{ position: "absolute", inset: 0, opacity: d.on, pointerEvents: d.ptr as React.CSSProperties["pointerEvents"], transition: "opacity 0.45s ease", background: "#FFFFFF", padding: "80px 16px 44px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 13, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid #E8E8ED" }}>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#8E8E93" }}>{d.label}</span>
            <span className="mf-ember" style={{ width: 7, height: 7, borderRadius: "50%", background: "#34C759", boxShadow: "0 0 8px rgba(52,199,89,0.8)", animation: "mfEmber 1.8s ease-in-out infinite", display: "inline-block" }} />
          </div>
          {renderScreenBody(d)}
          <div style={{ animation: d.a6, marginTop: "auto", borderTop: "1px dashed #E8E8ED", paddingTop: 14, display: "flex", flexDirection: "column", gap: 9, fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.04em" }}>
            {d.log.map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#8E8E93" }}>{row.k}</span><span style={{ color: row.c }}>{row.v}</span></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mf-root" id="top" style={{ minHeight: "100vh", background: "#FFFFFF", color: "#1D1D1F", fontFamily: QS, position: "relative", overflow: "clip" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* grain */}
      <div style={{ position: "fixed", inset: 0, zIndex: 60, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px 180px" }} />

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #E8E8ED" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "12px 24px", minHeight: 68, boxSizing: "border-box", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px 24px" }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <LogoMark s={30} />
            <span style={{ color: "#1D1D1F", fontWeight: 700, fontSize: 17, letterSpacing: "0.02em" }}>HANDBUILT&nbsp;AI</span>
          </a>
          <nav style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 22px", fontFamily: MONO, fontSize: 12, letterSpacing: "0.08em" }}>
            <a className="mf-navlink" href="#workers">WORKERS</a>
            <a className="mf-navlink" href="#pricing">PRICING</a>
            <a className="mf-navlink" href="#faq">FAQ</a>
          </nav>
          <a className="mf-nav-cta" href={AUDIT_HREF} style={{ background: RED_GRAD, color: "#FFFFFF", fontWeight: 600, fontSize: 14, padding: "10px 20px", borderRadius: 12, textDecoration: "none", boxShadow: "0 2px 10px rgba(255,69,58,0.28)", whiteSpace: "nowrap" }}>Book a fit check</a>
        </div>
      </header>

      {/* HERO */}
      <section className="mf-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -220, left: "50%", transform: "translateX(-50%)", width: 980, height: 560, background: "radial-gradient(ellipse at center, rgba(255,69,58,0.12) 0%, rgba(255,69,58,0.04) 45%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 22, height: 1, background: "linear-gradient(90deg, #E0362C, transparent)", display: "inline-block" }} />
              HANDBUILT AI WORKERS · SURREY / DELTA, BC
            </div>
            <h1 className="mf-h1" style={{ fontSize: "clamp(46px, 6.4vw, 88px)", lineHeight: 0.99, letterSpacing: "-0.035em", fontWeight: 700, color: "#1D1D1F", margin: "0 0 26px", textWrap: "balance" }}>
              Missed calls, late quotes, invoice chasing — <span style={redText}>handled.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "#1D1D1F", maxWidth: 540, margin: "0 0 36px", textWrap: "pretty" }}>
              Done-for-you AI receptionist and admin systems for contractors and local service businesses in BC. Installed, tested, and tuned around your real services, prices, calendar, and workflow.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginBottom: 34 }}>
              <a className="mf-cta" href={AUDIT_HREF} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: RED_GRAD, color: "#FFFFFF", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 20px rgba(255,69,58,0.35), 0 8px 24px rgba(0,0,0,0.08)" }}>Find my first AI worker <span aria-hidden="true">→</span></a>
              <a className="mf-secondary" href="#workers" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid #D2D2D7", color: "#1D1D1F", fontWeight: 600, fontSize: 16, padding: "16px 26px", borderRadius: 12, textDecoration: "none" }}>See the AI workers</a>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12, lineHeight: 2, letterSpacing: "0.05em", color: "#1D1D1F" }}>Built in Surrey / Delta, BC&nbsp;&nbsp;·&nbsp;&nbsp;Free 10-min fit check&nbsp;&nbsp;·&nbsp;&nbsp;Live in ~5 business days&nbsp;&nbsp;·&nbsp;&nbsp;From $1,500 CAD</div>
          </div>
          {/* orbit phone */}
          <div style={{ position: "relative", minHeight: "calc(680px * var(--phoneScale, 1))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 46%, rgba(255,69,58,0.09), transparent 70%)", pointerEvents: "none" }} />
            <PhoneScaleBox>
              <div style={{ position: "relative", width: 262, height: 554 }}>
                <div style={{ position: "relative", zIndex: 3 }}><DeviceFrame dark><LockScreen /></DeviceFrame></div>
                {ORBIT.map((o, i) => (
                  <div key={i} className="mf-orbit" style={{ position: "absolute", top: "50%", left: "50%", width: 56, height: 56, margin: "-28px 0 0 -28px", animation: `mfOrbit 35s linear infinite`, animationDelay: `${-5 * i}s`, willChange: "transform" }}>
                    <div style={{ position: "relative", width: 56, height: 56, borderRadius: 14, background: o.tile, border: o.border, boxShadow: "0 12px 28px rgba(0,0,0,0.14)", display: "flex", flexDirection: o.cal ? "column" : "row", alignItems: "center", justifyContent: "center", overflow: o.img ? "hidden" : "visible" }}>
                      {o.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={o.img} alt={o.alt} width={34} height={34} style={{ borderRadius: 8 }} />
                      ) : o.cal ? (
                        <>
                          <span style={{ fontFamily: APPLE, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: "#E5484D", lineHeight: 1 }}>THU</span>
                          <span style={{ fontFamily: APPLE, fontSize: 24, fontWeight: 600, color: "#1D1D1F", lineHeight: 1.1 }}>2</span>
                        </>
                      ) : (
                        o.icon
                      )}
                      {o.badge && (
                        <span style={{ position: "absolute", top: -9, right: o.badgeRight, minWidth: 24, height: 24, padding: "0 7px", boxSizing: "border-box", borderRadius: 12, background: "#FF3B30", color: "#FFFFFF", fontFamily: APPLE, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(255,59,48,0.35)" }}>{o.badge}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </PhoneScaleBox>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(255,69,58,0.4) 50%, transparent 95%)" }} />

      {/* DEMOS — sticky parallax */}
      <section id="demos" style={{ background: "#FFFFFF", position: "relative" }}>
        <div ref={trackRef} style={{ height: "460vh" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px" }}>
            <div style={{ maxWidth: 1240, margin: "0 auto", width: "100%" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 14 }}>01 / SEE THEM WORK</div>
              <h2 style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 700, color: "#1D1D1F", margin: "0 0 12px" }}>Same phone. Watch them work.</h2>
              <div style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.5, letterSpacing: "0.06em", color: "#8E8E93", marginBottom: "var(--demoH2mb, 48px)" }}>Sample workflows based on a real local contractor setup — not live customer data.</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--demoGap, 72px)", alignItems: "center" }}>
                <div style={{ flex: "none", width: "calc(262px * var(--phoneScale, 1))", height: "calc(554px * var(--phoneScale, 1))", transform: phoneTransform, opacity: phoneOpacity, willChange: "transform, opacity" }}>
                  <div style={{ transform: "scale(var(--phoneScale, 1))", transformOrigin: "top left" }}>
                    <DeviceFrame dark={false}><PhoneScreens /></DeviceFrame>
                  </div>
                </div>
                {/* narrative */}
                <div style={{ flex: "1 1 280px", minWidth: "min(280px, 100%)" }}>
                  <div style={{ position: "relative", minHeight: "var(--demoTextMinH, 320px)" }}>
                    {demos.map((d) => (
                      <div key={d.part} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", opacity: d.on, pointerEvents: d.ptr as React.CSSProperties["pointerEvents"], transition: "opacity 0.45s ease" }}>
                        <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 16 }}>{d.part}</div>
                        <h3 style={{ fontSize: "clamp(30px, 3.6vw, 48px)", lineHeight: 1.04, letterSpacing: "-0.02em", fontWeight: 700, color: "#1D1D1F", margin: "0 0 16px" }}>{d.name}</h3>
                        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#1D1D1F", maxWidth: 460, margin: "0 0 14px", textWrap: "pretty" }}>{d.copy}</p>
                        <div style={{ display: "inline-flex", alignSelf: "flex-start", fontFamily: MONO, fontSize: 11, letterSpacing: "0.06em", color: "#E0362C", background: "rgba(255,69,58,0.07)", borderRadius: 999, padding: "5px 11px", marginBottom: 18 }}>{d.bestFor}</div>
                        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.06em", color: "#1D1D1F" }}>{d.price} · {d.time}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 36 }}>
                    {demos.map((d) => (
                      <span key={d.part} style={{ width: 26, height: 3, borderRadius: 2, background: d.tickBg, transition: "background 0.3s", display: "inline-block" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — THE CHEAP-BOT QUESTION */}
      <section className="mf-sec" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,69,58,0.06), transparent 60%), #F5F5F7" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={eyebrow}>02 / THE CHEAP-BOT QUESTION</div>
          <h2 style={{ ...h2, margin: "0 0 22px", maxWidth: 760, textWrap: "balance" }}>Why not just buy the cheap AI receptionist?</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#1D1D1F", maxWidth: 720, margin: "0 0 48px" }}>
            Cheap AI receptionists are real — some answer calls, book jobs, even sync to your CRM. The software isn’t the hard part. Setting it up around <em>your</em> services, prices, calendar rules, and edge cases — and keeping it right as your business changes — is.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <div className="mf-card" style={{ background: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 18, padding: "36px 34px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 26 }}>THE DIY TOOL</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18, fontSize: 16, lineHeight: 1.55, color: "#1D1D1F" }}>
                {["The software may answer calls and book jobs.", "You configure the scripts, services, prices, calendar rules, and edge cases.", "You connect the apps and test the whole flow yourself.", "If it misbooks or gives bad info, you find out from the customer.", "Support is usually docs, chat, or a ticket queue."].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 14 }}><span style={{ color: "#C7C7CC", fontFamily: MONO, flexShrink: 0 }}>✕</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="mf-card" style={{ position: "relative", background: "#FFFFFF", border: "1px solid rgba(255,69,58,0.45)", borderRadius: 18, padding: "36px 34px", boxShadow: "0 8px 30px rgba(255,69,58,0.12), inset 0 1px 0 rgba(255,105,97,0.25)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 26 }}>THE HANDBUILT INSTALL</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18, fontSize: 16, lineHeight: 1.55, color: "#1D1D1F" }}>
                {["I set it up around your services, prices, service area, calendar, and rules.", "I run real test calls before it ever touches a customer.", "I connect the workflow: call → request → quote → booking → invoice → follow-up.", "I tune it when your services, prices, or process change.", "You deal with the builder who installed it — not a ticket queue."].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 14 }}><span style={{ color: "#1D1D1F", fontFamily: MONO, flexShrink: 0 }}>▸</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — THE WORKERS */}
      <section id="workers" className="mf-sec" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,69,58,0.05), transparent 60%), #FFFFFF" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={eyebrow}>03 / THE WORKERS</div>
          <h2 style={h2}>Six workers. Pick your first hire.</h2>
          <div style={{ border: "1px solid #E8E8ED", borderRadius: 18, overflow: "hidden", background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px", padding: "14px 28px", borderBottom: "1px solid #E8E8ED", background: "#FAFAFC", fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: "#1D1D1F" }}>
              <span style={{ flex: "0 0 60px" }}>PART №</span>
              <span style={{ flex: "1 1 200px", minWidth: 0 }}>WORKER</span>
              <span style={{ flex: "0 1 auto", marginLeft: "auto", display: "flex", gap: 20 }}><span style={{ minWidth: 110, textAlign: "right" }}>BUILD FEE</span><span style={{ minWidth: 68, textAlign: "right" }}>LIVE IN</span></span>
            </div>
            {WORKERS_CATALOG.map((w) => (
              <div key={w.num} className="mf-row" style={{ display: "flex", flexWrap: "wrap", gap: "10px 20px", padding: "22px 28px", borderBottom: "1px solid #F0F0F2", alignItems: "baseline" }}>
                <span style={{ flex: "0 0 60px", fontFamily: MONO, fontSize: 12, color: "#1D1D1F" }}>{w.num}</span>
                <span style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <span style={{ display: "block", color: "#1D1D1F", fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>{w.name}</span>
                  <span style={{ display: "block", color: "#1D1D1F", fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>{w.desc}</span>
                  <span style={{ display: "inline-block", marginTop: 8, fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.06em", color: "#E0362C", background: "rgba(255,69,58,0.07)", borderRadius: 999, padding: "3px 9px" }}>BEST FOR: {w.best.toUpperCase()}</span>
                </span>
                <span style={{ flex: "0 1 auto", marginLeft: "auto", display: "flex", gap: 20, alignItems: "baseline" }}>
                  <span style={{ minWidth: 110, textAlign: "right", fontFamily: MONO, fontSize: 15, fontWeight: 700, color: "#1D1D1F" }}>{w.price}</span>
                  <span style={{ minWidth: 68, textAlign: "right", fontFamily: MONO, fontSize: 12, color: "#1D1D1F" }}>{w.time}</span>
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, fontFamily: MONO, fontSize: 12, color: "#1D1D1F", letterSpacing: "0.05em" }}>All prices CAD, fixed before the build starts. No hourly billing.</div>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(255,69,58,0.4) 50%, transparent 95%)" }} />

      {/* 04 — PRICING */}
      <section id="pricing" className="mf-sec" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,69,58,0.06), transparent 60%), #F5F5F7" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={eyebrow}>04 / PRICING</div>
          <h2 style={{ ...h2, margin: "0 0 32px" }}>One build fee. You own it.</h2>

          {/* audit lead-in */}
          <div className="mf-card" style={{ background: "#FFFFFF", border: "1px solid rgba(255,69,58,0.45)", borderRadius: 18, padding: "24px 30px", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between", boxShadow: "0 8px 30px rgba(255,69,58,0.10)" }}>
            <div style={{ minWidth: 260, flex: 1 }}>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 8 }}>START HERE · FREE 10-MIN FIT CHECK</div>
              <div style={{ color: "#1D1D1F", fontSize: 18, fontWeight: 600 }}>A free 10-min fit check to see if there’s a real system worth mapping — no pressure, no pitch.</div>
              <div style={{ color: "#1D1D1F", fontSize: 14, marginTop: 6 }}>If we both agree there is, the $99 workflow audit maps it — credited toward your build.</div>
            </div>
            <a className="mf-cta" href={AUDIT_HREF} style={{ background: RED_GRAD, color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: "14px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 3px 16px rgba(255,69,58,0.32)", whiteSpace: "nowrap" }}>Book my fit check →</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(258px, 1fr))", gap: 24, alignItems: "stretch" }}>
            {TIERS.map((t) => (
              <div key={t.label} className="mf-card" style={{ position: "relative", background: "#FFFFFF", border: t.featured ? "1px solid rgba(255,69,58,0.55)" : "1px solid #E8E8ED", borderRadius: 18, padding: "36px 30px", display: "flex", flexDirection: "column", boxShadow: t.featured ? "0 10px 36px rgba(255,69,58,0.14), inset 0 1px 0 rgba(255,105,97,0.3)" : "0 2px 12px rgba(0,0,0,0.04)" }}>
                {t.featured && <div style={{ position: "absolute", top: -11, left: 30, background: RED_GRAD, color: "#FFFFFF", fontFamily: MONO, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", padding: "5px 12px", borderRadius: 8, boxShadow: "0 2px 10px rgba(255,69,58,0.35)" }}>MOST BUILDS</div>}
                <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 18 }}>{t.label}</div>
                <div style={{ fontFamily: MONO, fontSize: 32, fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.01em" }}>{t.price}{t.range && <span style={{ fontSize: 18, color: "#1D1D1F" }}>{t.range}</span>}<span style={{ fontSize: 15, color: "#1D1D1F" }}>{t.suffix}</span></div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "#1D1D1F", letterSpacing: "0.08em", margin: "6px 0 22px" }}>{t.sub}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "#1D1D1F", margin: "0 0 26px", flexGrow: 1 }}>{t.desc}</p>
                <a className={t.featured ? "mf-cta-lg" : "mf-outline"} href={buildHref(t.subject)} style={t.featured
                  ? { display: "block", textAlign: "center", background: RED_GRAD, color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: 14, borderRadius: 12, textDecoration: "none", boxShadow: "0 3px 16px rgba(255,69,58,0.32)" }
                  : { display: "block", textAlign: "center", border: "1px solid #D2D2D7", color: "#1D1D1F", fontWeight: 600, fontSize: 15, padding: 14, borderRadius: 12, textDecoration: "none" }}>{t.cta}</a>
              </div>
            ))}
          </div>

          {/* optional care plan */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent 4%, rgba(255,69,58,0.35) 50%, transparent 96%)", margin: "48px 0 40px" }} />
          <div style={{ maxWidth: 760, marginBottom: 30 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#E0362C", background: "rgba(255,69,58,0.07)", borderRadius: 999, padding: "5px 12px", marginBottom: 16 }}>OPTIONAL · CARE PLAN</div>
            <h3 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 700, color: "#1D1D1F", margin: "0 0 14px", textWrap: "balance" }}>You do not need a care plan to own the system.</h3>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#1D1D1F", margin: 0, maxWidth: 640, textWrap: "pretty" }}>
              The care plan is for owners who want it monitored, tuned, updated, and fixed when tools, prices, calendars, scripts, or integrations change.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(258px, 1fr))", gap: 24, alignItems: "stretch" }}>
            {CARE.map((c) => (
              <div key={c.label} className="mf-card" style={{ background: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 18, padding: "32px 30px", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 18 }}>{c.label}</div>
                <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.01em" }}>{c.price}{c.range && <span style={{ fontSize: 17, color: "#1D1D1F" }}>{c.range}</span>}<span style={{ fontSize: 14, color: "#1D1D1F" }}>/mo CAD</span></div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "#1D1D1F", margin: "22px 0 0" }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* ownership */}
          <div style={{ marginTop: 24, fontFamily: MONO, fontSize: 12.5, lineHeight: 1.7, color: "#1D1D1F", letterSpacing: "0.02em", maxWidth: 900 }}>
            You own the prompts, workflows, documentation, and custom code. Third-party tools like Jobber, Twilio, OpenAI, and hosting stay separate if used. No lock-in.
          </div>
        </div>
      </section>

      {/* 05 — HONEST FIT */}
      <section id="fit" className="mf-sec" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,69,58,0.05), transparent 60%), #FFFFFF" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={eyebrow}>05 / HONEST FIT</div>
          <h2 style={{ ...h2, margin: "0 0 22px", maxWidth: 760, textWrap: "balance" }}>Who this is — and isn’t — for.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#1D1D1F", maxWidth: 680, margin: "0 0 48px" }}>
            I’d rather say no now than sell you a system that won’t pay for itself. Here’s the honest cut.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <div className="mf-card" style={{ background: "#FFFFFF", border: "1px solid rgba(255,69,58,0.45)", borderRadius: 18, padding: "36px 34px", boxShadow: "0 8px 30px rgba(255,69,58,0.12), inset 0 1px 0 rgba(255,105,97,0.25)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 26 }}>A GOOD FIT IF</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18, fontSize: 16, lineHeight: 1.55, color: "#1D1D1F" }}>
                {["You lose real work when calls go to voicemail while you’re on the job.", "You want calls, quotes, bookings, and follow-ups working as one system — not five apps you babysit.", "You’d rather one builder set it up right and tune it than wire it together yourself."].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 14 }}><span style={{ color: "#1D1D1F", fontFamily: MONO, flexShrink: 0 }}>▸</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="mf-card" style={{ background: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 18, padding: "36px 34px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 26 }}>PROBABLY NOT FOR YOU IF</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18, fontSize: 16, lineHeight: 1.55, color: "#1D1D1F" }}>
                {["You only need a basic message-taking bot.", "You never miss a call and your admin is already handled.", "You want to configure and maintain everything yourself."].map((t) => (
                  <li key={t} style={{ display: "flex", gap: 14 }}><span style={{ color: "#C7C7CC", fontFamily: MONO, flexShrink: 0 }}>✕</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FAQ */}
      <section id="faq" className="mf-sec" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,69,58,0.06), transparent 60%), #F5F5F7" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={eyebrow}>06 / STRAIGHT ANSWERS</div>
          <h2 style={h2}>Asked before you asked.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "40px 56px" }}>
            {HOME_FAQS.map((f) => (
              <div key={f.q}>
                <h3 style={{ color: "#1D1D1F", fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 12px" }}>{f.q}</h3>
                <p style={{ color: "#1D1D1F", fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
          {/* internal links */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #E8E8ED" }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: "#1D1D1F", marginBottom: 16 }}>EXPLORE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 22px", fontSize: 14.5 }}>
              {INTERNAL_LINKS.map((l) => (
                <a key={l.href} className="mf-link" href={l.href}>{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section style={{ position: "relative", background: "#FFFFFF", padding: "132px 32px 112px", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", bottom: -260, left: "50%", transform: "translateX(-50%)", width: 900, height: 520, background: "radial-gradient(ellipse at center, rgba(255,69,58,0.14) 0%, rgba(255,69,58,0.04) 45%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
          <h2 style={{ fontSize: "clamp(44px, 6vw, 84px)", lineHeight: 1.0, letterSpacing: "-0.035em", fontWeight: 700, color: "#1D1D1F", margin: 0, textWrap: "balance" }}>One calm desk. <span style={redText}>Yours.</span></h2>
          <a className="mf-cta-xl" href={AUDIT_HREF} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: RED_GRAD, color: "#FFFFFF", fontWeight: 700, fontSize: 17, padding: "20px 40px", borderRadius: 12, textDecoration: "none", boxShadow: "0 4px 24px rgba(255,69,58,0.4), 0 10px 28px rgba(0,0,0,0.08)" }}>Book my workflow audit <span aria-hidden="true">→</span></a>
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: "#1D1D1F" }}>USUALLY LIVE WITHIN 5 BUSINESS DAYS</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #E8E8ED", padding: 32, background: "#F5F5F7" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "16px 32px", justifyContent: "space-between", alignItems: "center", fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.06em", color: "#1D1D1F" }}>
          <span>© 2026 HANDBUILT AI · BY AI BUILT BY HAND · AIBUILTBYHAND.COM</span>
          <span>ONE BUILDER · SURREY / DELTA, BC · BUILD@AIBUILTBYHAND.COM</span>
        </div>
      </footer>
    </div>
  );
}
