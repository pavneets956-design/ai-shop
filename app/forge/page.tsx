import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import ForgeExperience from "@/components/forge/ForgeExperience";

// Display face for /forge only — the rest of the site keeps its Blueprint stack.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-forge-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI, built by hand — custom AI systems for real businesses",
  description:
    "Custom AI systems, automations, and internal tools built for real businesses. Shipped products, not ChatGPT wrappers. Tell me your problem — I build the system, it runs.",
  alternates: { canonical: "/forge" },
  openGraph: {
    title: "AI, built by hand.",
    description:
      "Custom AI systems, automations, and internal tools built for real businesses.",
  },
};

export default function ForgePage() {
  return (
    <div className={spaceGrotesk.variable}>
      <ForgeExperience />
    </div>
  );
}
