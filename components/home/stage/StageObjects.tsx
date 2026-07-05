"use client";

/**
 * Stage object sprites — dimensional SVG props for the AI-hand background film.
 * Spec: AI-HAND-BACKGROUND-GOD-PROMPT.md §1. Matte warm materials, real edge
 * thickness, soft top-left sheen, abstract text (never readable copy), no emoji.
 */

import { motion, type MotionValue } from "framer-motion";

/** Motion-driven inside the film; plain numbers in static contexts. */
type MV = MotionValue<number> | number;

const INK = "#191716";

/* Shared defs are duplicated per sprite (SVG ids must be unique per instance). */

function TextBar({ x, y, w, tone = "#D9CFC0", h = 7, rx = 3.5 }: { x: number; y: number; w: number; tone?: string; h?: number; rx?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={tone} />;
}

/* ── Phone slab (Calls) — carries the red "missed" badge dot ── */
export function PhoneSprite({
  redOpacity,
  goldOpacity,
  goldScale,
}: {
  redOpacity: MV;
  goldOpacity: MV;
  goldScale: MV;
}) {
  return (
    <svg width="126" height="232" viewBox="0 0 126 232" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="ph-body" x1="0" y1="0" x2="126" y2="232" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#332E2B" />
          <stop offset="0.5" stopColor="#26221F" />
          <stop offset="1" stopColor="#1B1815" />
        </linearGradient>
        <linearGradient id="ph-screen" x1="10" y1="12" x2="116" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#211D1A" />
          <stop offset="1" stopColor="#151210" />
        </linearGradient>
        <linearGradient id="ph-sheen" x1="0" y1="0" x2="60" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ph-red" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FF6B5A" />
          <stop offset="1" stopColor="#C0301F" />
        </radialGradient>
        <radialGradient id="ph-gold" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FFC466" />
          <stop offset="1" stopColor="#D97F02" />
        </radialGradient>
      </defs>

      {/* thickness edge */}
      <rect x="3" y="7" width="120" height="222" rx="22" fill="#0E0C0A" />
      {/* body */}
      <rect x="0" y="0" width="120" height="222" rx="22" fill="url(#ph-body)" />
      {/* left edge highlight */}
      <rect x="1.5" y="10" width="2" height="200" rx="1" fill="#FFFFFF" opacity="0.10" />
      {/* screen */}
      <rect x="8" y="10" width="104" height="202" rx="15" fill="url(#ph-screen)" />
      <rect x="8" y="10" width="104" height="202" rx="15" fill="url(#ph-sheen)" />

      {/* screen UI — missed call row */}
      <g transform="translate(20, 40)">
        {/* handset glyph, red while missed */}
        <motion.g style={{ opacity: redOpacity }}>
          <path
            d="M4.8 8.1c1.2 2.4 3.1 4.3 5.5 5.5l1.8-1.8c.25-.25.6-.32.9-.2 1 .33 2 .5 3.1.5.5 0 .9.4.9.9v3.1c0 .5-.4.9-.9.9C8.6 17 1.5 9.9 1.5 2.4c0-.5.4-.9.9-.9h3.1c.5 0 .9.4.9.9 0 1.05.17 2.1.5 3.1.1.32.04.66-.2.9L4.8 8.1z"
            fill="#E06452"
            transform="scale(1.15)"
          />
        </motion.g>
        <motion.g style={{ opacity: goldOpacity }}>
          <path
            d="M4.8 8.1c1.2 2.4 3.1 4.3 5.5 5.5l1.8-1.8c.25-.25.6-.32.9-.2 1 .33 2 .5 3.1.5.5 0 .9.4.9.9v3.1c0 .5-.4.9-.9.9C8.6 17 1.5 9.9 1.5 2.4c0-.5.4-.9.9-.9h3.1c.5 0 .9.4.9.9 0 1.05.17 2.1.5 3.1.1.32.04.66-.2.9L4.8 8.1z"
            fill="#E8A13B"
            transform="scale(1.15)"
          />
        </motion.g>
        <TextBar x={28} y={2} w={48} tone="#4A423C" h={6} />
        <TextBar x={28} y={13} w={32} tone="#37312C" h={5} />
      </g>

      <g transform="translate(20, 84)">
        <TextBar x={0} y={0} w={80} tone="#2E2925" h={22} rx={8} />
        <TextBar x={8} y={7} w={40} tone="#463E37" h={7} />
      </g>
      <g transform="translate(20, 118)">
        <TextBar x={0} y={0} w={80} tone="#2E2925" h={22} rx={8} />
        <TextBar x={8} y={7} w={52} tone="#463E37" h={7} />
      </g>
      <g transform="translate(20, 152)">
        <TextBar x={0} y={0} w={80} tone="#2E2925" h={22} rx={8} />
        <TextBar x={8} y={7} w={28} tone="#463E37" h={7} />
      </g>

      {/* notification badge — the red→gold dot */}
      <motion.g style={{ opacity: redOpacity }}>
        <circle cx="106" cy="16" r="11" fill="url(#ph-red)" />
        <circle cx="106" cy="16" r="11" fill="none" stroke="#FF9385" strokeOpacity="0.5" strokeWidth="1" />
        <text x="106" y="20.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFF4F0" fontFamily="inherit">3</text>
      </motion.g>
      <motion.g style={{ opacity: goldOpacity, scale: goldScale, transformBox: "fill-box", transformOrigin: "center" } as never}>
        <circle cx="106" cy="16" r="11" fill="url(#ph-gold)" />
        <path d="M100.5 16.2l3.6 3.6 6-6.6" stroke="#231A08" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </svg>
  );
}

/* ── Invoice sheet (Paperwork) — the hero prop the hand pinches ── */
export function InvoiceSprite() {
  return (
    <svg width="192" height="252" viewBox="0 0 192 252" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="inv-paper" x1="0" y1="0" x2="176" y2="248" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFEFA" />
          <stop offset="0.55" stopColor="#FBF6EC" />
          <stop offset="1" stopColor="#F1E8D9" />
        </linearGradient>
        <linearGradient id="inv-crease" x1="0" y1="0" x2="176" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0.42" stopColor="#8A8072" stopOpacity="0" />
          <stop offset="0.5" stopColor="#8A8072" stopOpacity="0.09" />
          <stop offset="0.58" stopColor="#FFFFFF" stopOpacity="0.20" />
          <stop offset="0.66" stopColor="#8A8072" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="inv-curl" x1="150" y1="0" x2="176" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EFE5D4" />
          <stop offset="1" stopColor="#D8CBB6" />
        </linearGradient>
      </defs>

      {/* thickness */}
      <path d="M6 8 h164 a6 6 0 0 1 6 6 v228 a6 6 0 0 1 -6 6 H12 a6 6 0 0 1 -6 -6 Z" fill="#DCD1BF" />
      {/* sheet, top-right corner clipped for curl */}
      <path d="M2 8 a6 6 0 0 1 6-6 h140 l26 26 v216 a6 6 0 0 1 -6 6 H8 a6 6 0 0 1 -6-6 Z" fill="url(#inv-paper)" />
      {/* fold crease */}
      <rect x="2" y="70" width="172" height="60" fill="url(#inv-crease)" />
      {/* curled corner */}
      <path d="M148 2 l26 26 h-20 a6 6 0 0 1 -6 -6 Z" fill="url(#inv-curl)" />
      <path d="M148 2 l26 26" stroke="#C7B9A2" strokeWidth="0.8" opacity="0.7" />

      {/* abstract document content */}
      <TextBar x={20} y={34} w={64} tone={INK} h={11} rx={4} />
      <TextBar x={20} y={56} w={40} tone="#C9BEAC" h={6} />
      <TextBar x={20} y={92} w={132} tone="#DED3C0" h={7} />
      <TextBar x={20} y={108} w={118} tone="#DED3C0" h={7} />
      <TextBar x={20} y={124} w={126} tone="#DED3C0" h={7} />
      <TextBar x={20} y={140} w={98} tone="#DED3C0" h={7} />
      <line x1="20" y1="170" x2="156" y2="170" stroke="#C9BEAC" strokeWidth="1.2" />
      <TextBar x={20} y={182} w={52} tone="#9B8E7A" h={8} />
      <TextBar x={112} y={180} w={44} tone={INK} h={12} rx={4} />
      <TextBar x={20} y={210} w={80} tone="#E4DAC8" h={6} />
    </svg>
  );
}

/* ── Calendar day-block (Paperwork) — carries a red conflict dot ── */
export function CalendarSprite({
  redOpacity,
  goldOpacity,
  goldScale,
}: {
  redOpacity: MV;
  goldOpacity: MV;
  goldScale: MV;
}) {
  return (
    <svg width="150" height="152" viewBox="0 0 150 152" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="cal-face" x1="0" y1="0" x2="144" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFEFB" />
          <stop offset="1" stopColor="#F3EBDD" />
        </linearGradient>
        <radialGradient id="cal-red" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FF6B5A" />
          <stop offset="1" stopColor="#C0301F" />
        </radialGradient>
        <radialGradient id="cal-gold" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FFC466" />
          <stop offset="1" stopColor="#D97F02" />
        </radialGradient>
      </defs>

      {/* thickness */}
      <rect x="5" y="7" width="140" height="144" rx="14" fill="#DCD1BF" />
      <rect x="1" y="1" width="140" height="144" rx="14" fill="url(#cal-face)" />
      {/* header band */}
      <path d="M1 15 a14 14 0 0 1 14-14 h112 a14 14 0 0 1 14 14 v22 H1 Z" fill={INK} />
      <circle cx="36" cy="1" r="4.5" fill="#F3EBDD" stroke="#5A524A" strokeWidth="2.5" />
      <circle cx="106" cy="1" r="4.5" fill="#F3EBDD" stroke="#5A524A" strokeWidth="2.5" />
      <TextBar x={16} y={14} w={44} tone="#4A423C" h={9} rx={4} />

      {/* day number */}
      <text x="20" y="86" fontSize="40" fontWeight="800" fill={INK} fontFamily="inherit" letterSpacing="-1">17</text>

      {/* booked slot */}
      <rect x="16" y="100" width="110" height="16" rx="6" fill="#EFE6D6" />
      <TextBar x={24} y={105} w={48} tone="#B4A891" h={6} />
      {/* empty slot */}
      <rect x="16" y="122" width="110" height="16" rx="6" fill="none" stroke="#D6CAB4" strokeWidth="1.4" strokeDasharray="4 4" />

      {/* conflict dot — red→gold */}
      <motion.g style={{ opacity: redOpacity }}>
        <circle cx="132" cy="108" r="7.5" fill="url(#cal-red)" />
      </motion.g>
      <motion.g style={{ opacity: goldOpacity, scale: goldScale, transformBox: "fill-box", transformOrigin: "center" } as never}>
        <circle cx="132" cy="108" r="7.5" fill="url(#cal-gold)" />
      </motion.g>
    </svg>
  );
}

const STAR = "M10 1.6l2.55 5.17 5.7.83-4.12 4.02.97 5.68L10 14.6l-5.1 2.7.97-5.68L1.75 7.6l5.7-.83L10 1.6z";

/* ── Review card (Proof) — stars dim in the mess, ignite amber when handled ── */
export function ReviewSprite({ starLit }: { starLit: MV }) {
  return (
    <svg width="176" height="126" viewBox="0 0 176 126" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="rev-face" x1="0" y1="0" x2="170" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFEFB" />
          <stop offset="1" stopColor="#F3EBDD" />
        </linearGradient>
        <linearGradient id="rev-star" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F2A93B" />
          <stop offset="1" stopColor="#D97F02" />
        </linearGradient>
      </defs>

      <rect x="5" y="6" width="166" height="120" rx="14" fill="#DCD1BF" />
      <rect x="1" y="1" width="166" height="120" rx="14" fill="url(#rev-face)" />

      {/* quote glyph */}
      <path d="M20 22 q0 -8 9 -9 v5 q-4 1 -4 4 h4 v9 h-9 Z M36 22 q0 -8 9 -9 v5 q-4 1 -4 4 h4 v9 h-9 Z" fill="#D9CBB2" />

      {/* stars: dim layer + amber layer crossfaded */}
      <g transform="translate(18, 44) scale(1.05)">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`d${i}`} d={STAR} transform={`translate(${i * 26}, 0)`} fill="#CFC5B4" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path key={`a${i}`} d={STAR} transform={`translate(${i * 26}, 0)`} fill="url(#rev-star)" style={{ opacity: starLit }} />
        ))}
      </g>

      <TextBar x={18} y={80} w={104} tone="#DED3C0" h={7} />
      <TextBar x={18} y={96} w={70} tone="#DED3C0" h={7} />
      <TextBar x={132} y={96} w={26} tone={INK} h={7} />
    </svg>
  );
}

/* ── Message bubble card (Calls/Proof bridge) — carries an unread red dot ── */
export function MessageSprite({
  redOpacity,
  goldOpacity,
  goldScale,
}: {
  redOpacity: MV;
  goldOpacity: MV;
  goldScale: MV;
}) {
  return (
    <svg width="170" height="112" viewBox="0 0 170 112" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="msg-face" x1="0" y1="0" x2="164" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFEFB" />
          <stop offset="1" stopColor="#F3EBDD" />
        </linearGradient>
        <radialGradient id="msg-red" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FF6B5A" />
          <stop offset="1" stopColor="#C0301F" />
        </radialGradient>
        <radialGradient id="msg-gold" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FFC466" />
          <stop offset="1" stopColor="#D97F02" />
        </radialGradient>
      </defs>

      <rect x="5" y="6" width="160" height="106" rx="14" fill="#DCD1BF" />
      <rect x="1" y="1" width="160" height="106" rx="14" fill="url(#msg-face)" />

      {/* chat bubble glyph */}
      <g transform="translate(16, 18)">
        <path
          d="M0 10 a10 10 0 0 1 10-10 h20 a10 10 0 0 1 10 10 v6 a10 10 0 0 1 -10 10 H14 l-9 8 v-9 A10 10 0 0 1 0 16 Z"
          fill="none"
          stroke={INK}
          strokeWidth="2.6"
        />
        <circle cx="12" cy="13" r="2.2" fill={INK} />
        <circle cx="20" cy="13" r="2.2" fill={INK} />
        <circle cx="28" cy="13" r="2.2" fill={INK} />
      </g>

      <TextBar x={68} y={26} w={72} tone="#B4A891" h={8} />
      <TextBar x={68} y={42} w={48} tone="#DED3C0" h={7} />
      <TextBar x={16} y={74} w={116} tone="#DED3C0" h={7} />

      {/* unread dot — red→gold */}
      <motion.g style={{ opacity: redOpacity }}>
        <circle cx="146" cy="20" r="8" fill="url(#msg-red)" />
      </motion.g>
      <motion.g style={{ opacity: goldOpacity, scale: goldScale, transformBox: "fill-box", transformOrigin: "center" } as never}>
        <circle cx="146" cy="20" r="8" fill="url(#msg-gold)" />
      </motion.g>
    </svg>
  );
}

/* ── Mute background props — silhouettes for depth, never touched ── */
export function ReceiptProp() {
  return (
    <svg width="86" height="210" viewBox="0 0 86 210" fill="none" style={{ display: "block" }}>
      <path
        d="M8 6 Q 43 -4 78 6 L74 196 l-8 10 -8-8 -8 8 -8-8 -8 8 -8-8 -8 8 -8-10 Z"
        fill="#F6EFE2"
        stroke="#E2D6C2"
        strokeWidth="1"
      />
      {[28, 46, 64, 82, 100, 118].map((y) => (
        <rect key={y} x="20" y={y} width={y % 36 === 0 ? 34 : 46} height="6" rx="3" fill="#E0D4BF" />
      ))}
      <rect x="20" y="148" width="46" height="8" rx="4" fill="#CBBFA8" />
    </svg>
  );
}

export function StickyProp() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="sticky-g" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBEECB" />
          <stop offset="1" stopColor="#EEDCA9" />
        </linearGradient>
      </defs>
      <path d="M4 8 a6 6 0 0 1 6-6 h100 a6 6 0 0 1 6 6 v78 l-26 30 H10 a6 6 0 0 1 -6-6 Z" fill="url(#sticky-g)" />
      <path d="M116 86 l-26 30 v-24 a6 6 0 0 1 6-6 Z" fill="#DCC988" opacity="0.9" />
      <rect x="18" y="26" width="70" height="7" rx="3.5" fill="#C8B27E" />
      <rect x="18" y="42" width="52" height="7" rx="3.5" fill="#C8B27E" />
    </svg>
  );
}

export function CrumpleProp() {
  return (
    <svg width="130" height="120" viewBox="0 0 130 120" fill="none" style={{ display: "block" }}>
      <defs>
        <radialGradient id="crumple-g" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#FBF6EA" />
          <stop offset="0.7" stopColor="#EBE0CC" />
          <stop offset="1" stopColor="#D3C5AC" />
        </radialGradient>
      </defs>
      <path
        d="M24 34 L52 12 L84 18 L112 40 L118 72 L96 102 L58 110 L28 96 L12 66 Z"
        fill="url(#crumple-g)"
      />
      <path d="M52 12 L60 48 L24 34 M84 18 L60 48 L112 40 M60 48 L46 82 L12 66 M60 48 L92 78 L118 72 M46 82 L58 110 M92 78 L96 102"
        stroke="#B7A88D" strokeWidth="1" opacity="0.55" fill="none" />
    </svg>
  );
}
