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
        // "Handbuilt" palette — WARM PREMIUM: cream paper, black ink, a single
        // orange action color (no blue SaaS, no neon AI). Token NAMES kept so all
        // existing classes inherit the new palette automatically.
        paper: {
          DEFAULT: "#FAF7F2", // base background (warm cream)
          2: "#FFF8EF", // soft warm surface (alternating sections / soft fills)
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#191716", // near-black warm text
          soft: "#6F6862", // muted warm gray
        },
        // "clay" token name kept (used site-wide) — now holds the PRIMARY ORANGE.
        clay: {
          DEFAULT: "#E88A00", // primary orange (CTA, active, one hero highlight)
          dark: "#C96F00", // primary hover
          soft: "#FFF1DC", // soft orange fill
        },
        // Amber — same orange ramp, reserved for CTAs (the single "spark").
        amber: {
          DEFAULT: "#E88A00",
          dark: "#C96F00",
          soft: "#FFF1DC",
        },
        // Warm borders + semantic accents (used sparingly per the design system).
        line: { DEFAULT: "#E8DED3", strong: "#D7C6B5" },
        success: "#2F6B4F", // only for "captured / complete"
        danger: "#B42318", // only for urgent jobs
        // Legacy tokens remapped to the warm palette so any unswept refs stay coherent.
        obsidian: { DEFAULT: "#FAF7F2", 50: "#FFF8EF", 100: "#FFF8EF", 200: "#E8DED3" },
        electric: "#E88A00",
        violet: { glow: "#E88A00" },
        cyan: { glow: "#F3C482" },
        gold: { soft: "#F3C482" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Archivo", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
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
        "brand-gradient": "linear-gradient(120deg, #E88A00 0%, #C96F00 100%)",
      },
      boxShadow: {
        // Warm-premium shadow scale (design system): no harsh black, no random sizes.
        card: "0 20px 60px rgba(25,23,22,0.07)", // soft card
        glow: "0 12px 24px rgba(232,138,0,0.22)", // primary-button orange glow
        phone: "0 30px 90px rgba(25,23,22,0.18)", // demo phone
        "glow-violet": "0 16px 40px -20px rgba(25,23,22,0.18)",
        "glow-cyan": "0 16px 40px -20px rgba(25,23,22,0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
