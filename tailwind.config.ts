import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral studio palette; legacy token names keep older routes consistent.
        paper: {
          DEFAULT: "#ffffff", // base background (cool near-white)
          2: "#F5F5F7", // soft cool surface (alternating sections / soft fills)
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#171b24", // near-black text
          hover: "#303744", // ink-surface hover
          soft: "#606977", // muted cool gray
        },
        // "clay" token name kept (used site-wide) — now holds the COBALT ACCENT.
        clay: {
          DEFAULT: "#2854df", // cobalt accent (CTA, active, one hero highlight)
          dark: "#2045b8", // primary hover
          soft: "#edf2ff", // soft cobalt fill
        },
        // Amber token — cobalt ramp, reserved for CTAs (the single "spark").
        amber: {
          DEFAULT: "#2854df",
          dark: "#2045b8",
          soft: "#edf2ff",
        },
        // Cool muted text + borders + semantic accents (used sparingly per the system).
        muted: { DEFAULT: "#606977", light: "#667286" },
        line: { DEFAULT: "#e0e5ed", strong: "#cbd3df" },
        success: "#2F6B4F", // only for "captured / complete"
        danger: "#B42318", // only for urgent jobs
        // Legacy tokens remapped to the neutral/cobalt palette so any unswept refs stay coherent.
        obsidian: { DEFAULT: "#ffffff", 50: "#F5F5F7", 100: "#F5F5F7", 200: "#e0e5ed" },
        electric: "#2854df",
        violet: { glow: "#2854df" },
        cyan: { glow: "#6289ee" },
        gold: { soft: "#6289ee" },
      },
      fontFamily: {
        // One text family. `display` is retained as a token (37 files use it)
        // but now resolves to Inter — hierarchy comes from weight and tracking,
        // not from a second face. See app/layout.tsx for why.
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jbmono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // Design-system type scale (Doc 2). Apply with text-hero / text-section / etc.
      // Quicksand tops out at 700, so hero titles use 700 (its boldest weight).
      fontSize: {
        hero: ["64px", { lineHeight: "0.95", fontWeight: "700", letterSpacing: "-0.02em" }],
        "hero-lg": ["56px", { lineHeight: "0.96", fontWeight: "700", letterSpacing: "-0.02em" }],
        "hero-md": ["46px", { lineHeight: "0.98", fontWeight: "700", letterSpacing: "-0.02em" }],
        "hero-sm": ["38px", { lineHeight: "1.0", fontWeight: "700", letterSpacing: "-0.015em" }],
        section: ["42px", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.02em" }],
        "section-sm": ["32px", { lineHeight: "1.08", fontWeight: "700", letterSpacing: "-0.015em" }],
        "card-title": ["22px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.01em" }],
        "body-lg": ["20px", { lineHeight: "1.55" }],
        body: ["16px", { lineHeight: "1.55" }],
        small: ["13px", { lineHeight: "1.4" }],
        "tiny-label": ["11px", { lineHeight: "1.2", letterSpacing: "0.06em" }],
        btn: ["15px", { lineHeight: "1", fontWeight: "700" }],
        nav: ["14px", { lineHeight: "1", fontWeight: "600" }],
      },
      maxWidth: {
        container: "1180px", // main page container
        wide: "1280px", // wide sections
      },
      spacing: {
        header: "72px", // sticky header height (single source of truth)
        "section-y": "96px", // desktop section vertical padding
      },
      borderRadius: {
        card: "24px",
        "card-sm": "18px",
        btn: "14px",
        input: "14px",
        phone: "44px",
      },
      height: {
        header: "72px",
        btn: "56px",
        input: "52px",
        chip: "42px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "slide-up": "slideUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 9s ease-in-out infinite",
        "float-slow": "float 14s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "spin-slow": "spin 28s linear infinite",
        "spin-slower": "spin 60s linear infinite",
        "grid-pan": "gridPan 30s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        marquee: "marquee 40s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "border-beam": "borderBeam 6s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-14px) rotate(1.5deg)" },
          "66%": { transform: "translateY(9px) rotate(-1.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        gridPan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate(-4%, 3%) scale(1.1)", opacity: "0.9" },
        },
        borderBeam: {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Premium near-black gradient. Every badge/number/icon-tile using
        // bg-brand-gradient reads as ink (NOT red) — red is reserved for CTAs.
        "brand-gradient": "linear-gradient(135deg, #2A2A2E 0%, #1D1D1F 100%)",
      },
      boxShadow: {
        // Warm-premium shadow scale (design system): no harsh black, no random sizes.
        card: "0 20px 60px rgba(29,29,31,0.07)", // soft card
        glow: "0 12px 24px rgba(40,84,223,0.28)", // primary-button red glow
        phone: "0 30px 90px rgba(29,29,31,0.18)", // demo phone
        "glow-violet": "0 16px 40px -20px rgba(25,23,22,0.18)",
        "glow-cyan": "0 16px 40px -20px rgba(25,23,22,0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
