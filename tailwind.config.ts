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
        // "Blueprint" palette — cool drafting paper, slate-navy ink, teal accent, amber CTA.
        paper: {
          DEFAULT: "#F4F5F7", // base background (cool drafting white)
          2: "#E9ECF1", // deeper alternating section
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#1C2B3A", // slate navy text
          soft: "#5B6B7A", // muted slate
        },
        // "clay" token name kept (used site-wide) but now holds the TEAL accent.
        clay: {
          DEFAULT: "#2F6F6A", // primary accent (deep teal)
          dark: "#255A55",
          soft: "#9FC7C2",
        },
        // Amber — reserved for CTAs only (the single "spark").
        amber: {
          DEFAULT: "#E8A13C",
          dark: "#CE8B2B",
          soft: "#F4CF94",
        },
        // Legacy tokens remapped to the Blueprint palette so any unswept refs stay coherent.
        obsidian: { DEFAULT: "#F4F5F7", 50: "#E9ECF1", 100: "#E9ECF1", 200: "#DDE2E9" },
        electric: "#2F6F6A",
        violet: { glow: "#2F6F6A" },
        cyan: { glow: "#3E8C85" },
        gold: { soft: "#E8A13C" },
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
        "brand-gradient": "linear-gradient(120deg, #2F6F6A 0%, #3E8C85 100%)",
      },
      boxShadow: {
        // Blueprint — crisp, structural, low-blur shadows (no soft warm halo).
        glow: "0 10px 30px -18px rgba(28,43,58,0.28)",
        "glow-violet": "0 12px 34px -18px rgba(47,111,106,0.28)",
        "glow-cyan": "0 12px 34px -18px rgba(47,111,106,0.24)",
        card: "0 1px 0 rgba(28,43,58,0.06), 0 10px 26px -18px rgba(28,43,58,0.22)",
      },
    },
  },
  plugins: [],
};
export default config;
