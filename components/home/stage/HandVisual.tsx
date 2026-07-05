"use client";

/**
 * Phase-1 hand visual — spec: AI-HAND-BACKGROUND-GOD-PROMPT.md §5 + §8.
 * Prefers a real render at /public/hand/hero-hand.png (transparent, ~1040×720,
 * pinch point at left-center — e.g. an AI-generated or Blender still of an
 * off-white ceramic hand with brushed-metal joints, thumb+index mid-pinch,
 * soft studio light from upper-right). Falls back to the stylized SVG below.
 * Phase 2 replaces this whole layer with the baked Blender alpha sequence.
 */

import { useState } from "react";

export default function HandVisual() {
  const [imgOk, setImgOk] = useState(true);
  if (imgOk) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/hand/hero-hand.png"
        alt=""
        width={520}
        height={360}
        draggable={false}
        onError={() => setImgOk(false)}
        style={{ display: "block", width: 520, height: "auto" }}
      />
    );
  }
  return <HandSvg />;
}

/* Stylized ceramic hand — dimensional editorial illustration, not realism. */
function HandSvg() {
  return (
    <svg width="520" height="360" viewBox="0 0 520 360" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="hnd-ceramic" x1="0" y1="120" x2="60" y2="290" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FAF6EF" />
          <stop offset="0.55" stopColor="#E2D6C2" />
          <stop offset="1" stopColor="#B5A68D" />
        </linearGradient>
        <linearGradient id="hnd-finger" x1="0" y1="160" x2="0" y2="215" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBF8F2" />
          <stop offset="0.6" stopColor="#E7DBC8" />
          <stop offset="1" stopColor="#BAAA8F" />
        </linearGradient>
        <linearGradient id="hnd-thumb" x1="0" y1="190" x2="0" y2="262" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F0E8D9" />
          <stop offset="1" stopColor="#AE9E83" />
        </linearGradient>
        <linearGradient id="hnd-curl" x1="250" y1="200" x2="250" y2="268" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E2D5C0" />
          <stop offset="1" stopColor="#A2937B" />
        </linearGradient>
        <linearGradient id="hnd-metal" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#DAD4CA" />
          <stop offset="0.35" stopColor="#A49C90" />
          <stop offset="0.55" stopColor="#C6BEB2" />
          <stop offset="0.8" stopColor="#948C80" />
          <stop offset="1" stopColor="#B8B0A4" />
        </linearGradient>
        <radialGradient id="hnd-sheen" cx="0.3" cy="0.2" r="0.9">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── forearm (cropped by frame right) ── */}
      <path d="M446 150 L520 144 L520 266 L446 258 C 436 236 436 176 446 150 Z" fill="url(#hnd-ceramic)" />
      <path d="M446 150 L520 144 L520 168 L448 172 Z" fill="#FFFFFF" opacity="0.18" />
      {/* wrist cuff — brushed metal */}
      <rect x="432" y="146" width="22" height="118" rx="11" fill="url(#hnd-metal)" />
      <rect x="436" y="150" width="3" height="110" rx="1.5" fill="#FFFFFF" opacity="0.25" />

      {/* ── curled middle/ring/pinky, behind index & above thumb ── */}
      <g>
        <rect x="268" y="204" width="78" height="36" rx="18" fill="url(#hnd-curl)" transform="rotate(-4 307 222)" />
        <rect x="282" y="230" width="70" height="32" rx="16" fill="url(#hnd-curl)" transform="rotate(-2 317 246)" />
        <rect x="296" y="254" width="60" height="27" rx="13.5" fill="url(#hnd-curl)" transform="rotate(1 326 267)" />
        {/* AO between curls */}
        <path d="M276 238 q 40 8 74 2" stroke="#8F8272" strokeWidth="3" opacity="0.26" fill="none" />
        <path d="M292 260 q 34 7 62 2" stroke="#8F8272" strokeWidth="3" opacity="0.24" fill="none" />
      </g>

      {/* ── palm ── */}
      <path
        d="M438 152 C 392 140 340 142 310 160 C 290 172 283 192 287 214 C 292 242 318 260 356 264 C 392 268 424 262 438 256 C 448 232 448 176 438 152 Z"
        fill="url(#hnd-ceramic)"
      />
      <ellipse cx="380" cy="178" rx="52" ry="26" fill="url(#hnd-sheen)" />
      {/* palm-index knuckle seam */}
      <path d="M312 164 C 302 180 300 198 306 214" stroke="#A79A87" strokeWidth="1.2" opacity="0.6" fill="none" />

      {/* ── index finger — extended toward the pinch ── */}
      <path
        d="M312 162 C 258 152 160 166 96 176 C 80 178.5 71 186 72.5 195 C 74 204 85 208.5 100 206.5 C 158 199 254 192 310 206 C 322 196 322 172 312 162 Z"
        fill="url(#hnd-finger)"
      />
      {/* index top light */}
      <path d="M306 164 C 254 155 164 168 100 178 C 90 179.5 84 183 82 187 C 140 176 260 163 306 170 Z" fill="#FFFFFF" opacity="0.30" />
      {/* index joint seams */}
      <path d="M214 165 C 211 176 211 188 214 198" stroke="#A79A87" strokeWidth="1.1" opacity="0.65" fill="none" />
      <path d="M148 172 C 146 181 146 191 148 200" stroke="#A79A87" strokeWidth="1" opacity="0.6" fill="none" />
      {/* index metal joint band */}
      <rect x="206" y="163" width="9" height="38" rx="4.5" fill="url(#hnd-metal)" opacity="0.9" transform="rotate(-2 210 182)" />

      {/* ── thumb — rising to meet the index ── */}
      <path
        d="M356 262 C 312 264 250 252 196 240 C 152 230 122 224 104 219 C 89 215 80.5 208 84 200.5 C 87.5 193 99 191.5 113 195 C 160 206 236 222 288 231 C 322 237 348 246 358 252 C 360 256 359 260 356 262 Z"
        fill="url(#hnd-thumb)"
      />
      {/* thumb joint seam + band */}
      <path d="M216 226 C 213 233 212 240 214 246" stroke="#A79A87" strokeWidth="1" opacity="0.6" fill="none" />
      <rect x="206" y="226" width="8" height="24" rx="4" fill="url(#hnd-metal)" opacity="0.85" transform="rotate(-12 210 238)" />

      {/* AO where thumb meets palm */}
      <path d="M340 254 C 320 250 300 244 284 238" stroke="#8F8272" strokeWidth="4" opacity="0.22" fill="none" />
      {/* AO under index (gap shading toward thumb) */}
      <path d="M290 208 C 230 198 150 202 104 207" stroke="#8F8272" strokeWidth="3" opacity="0.22" fill="none" />

      {/* fingertip pads — subtle ceramic tip caps */}
      <ellipse cx="86" cy="191" rx="15" ry="12" fill="url(#hnd-finger)" />
      <ellipse cx="82" cy="188" rx="8" ry="6" fill="#FFFFFF" opacity="0.35" />
      <ellipse cx="99" cy="207" rx="14" ry="11" fill="url(#hnd-thumb)" />
    </svg>
  );
}
