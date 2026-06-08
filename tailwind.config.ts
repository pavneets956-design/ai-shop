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
        // Warm editorial palette — ivory paper, warm ink, single clay accent.
        paper: {
          DEFAULT: "#FAF7F2", // base background (warm ivory)
          2: "#F2ECE2", // deeper alternating section
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#1F1B16", // warm near-black text
          soft: "#6F665C", // warm muted text
        },
        clay: {
          DEFAULT: "#C75D43", // primary accent (terracotta/clay)
          dark: "#A8482F",
          soft: "#E8A38C",
        },
        // Legacy tokens kept as warm fallbacks so any unswept refs still compile.
        obsidian: { DEFAULT: "#FAF7F2", 50: "#F2ECE2", 100: "#F2ECE2", 200: "#EAE3D8" },
        electric: "#C75D43",
        violet: { glow: "#C75D43" },
        cyan: { glow: "#D97757" },
        gold: { soft: "#C28A3A" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
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
        "brand-gradient": "linear-gradient(120deg, #C75D43 0%, #D97757 100%)",
      },
      boxShadow: {
        // Warm, soft, restrained shadows (no neon glow).
        glow: "0 12px 40px -16px rgba(199,93,67,0.30)",
        "glow-violet": "0 14px 44px -16px rgba(199,93,67,0.32)",
        "glow-cyan": "0 14px 44px -16px rgba(217,119,87,0.30)",
        card: "0 1px 2px rgba(31,27,22,0.04), 0 14px 34px -16px rgba(31,27,22,0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
