import type { Metadata } from "next";
import { Inter, Archivo, IBM_Plex_Mono, Quicksand, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChromeGate from "@/components/ChromeGate";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/data/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// "Blueprint" type system: Archivo (engineered display) + IBM Plex Mono (spec labels).
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});
// Homepage "Molten Forge" type system: Quicksand (rounded premium sans) + JetBrains Mono (spec labels).
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Handbuilt AI | Custom AI Apps, Agents & Business Automation",
    template: "%s | Handbuilt AI",
  },
  description:
    "Handbuilt AI builds custom AI apps, agents, chatbots, automations, dashboards and business tools for companies and individuals who want practical AI systems that save time and grow revenue.",
  keywords: [
    "custom AI app development",
    "AI automation services",
    "AI agents for business",
    "AI chatbot for website",
    "AI receptionist for small business",
    "AI tools for local businesses",
    "custom business automation",
    "AI workflow automation",
    "build an AI app",
    "personal AI assistant app",
    "AI SaaS development",
    "AI dashboard builder",
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    alternateLocale: ["en_US", "en_AU", "en_NZ", "en_GB"],
    url: site.url,
    siteName: site.name,
    title: "Handbuilt AI | Custom AI Apps, Agents & Business Automation",
    description:
      "Tell us what you want AI to do. We design and build the system — apps, agents, automations and dashboards, around your exact workflow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handbuilt AI | Custom AI Apps, Agents & Business Automation",
    description:
      "Custom AI apps, agents, automations and dashboards — built around your exact workflow.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo-mark.svg", type: "image/svg+xml" },
      { url: "/logo.png" },
    ],
    apple: "/logo.png",
    shortcut: "/logo-mark.svg",
  },
  // Google Search Console ownership (meta-tag method). Public token, safe to commit.
  // Env var overrides the default if you ever re-verify with a new token.
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "TVFAeGkq2XrUDgo5XdPiS8b4vmnkrZjvhDJ8J9CJTiA",
    // Bing Webmaster Tools (meta-tag method). Set NEXT_PUBLIC_BING_SITE_VERIFICATION
    // in Vercel to the value Bing gives you, then "Verify". Tip: in Bing you can
    // also "Import from Google Search Console" instead of verifying from scratch.
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
      other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION },
    }),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${plexMono.variable} ${quicksand.variable} ${jbMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Brand ambient glow — soft red radial behind every page (matches the
            homepage). Fixed, -z-1: paints over the cream body but behind all page
            content, so opaque pages (e.g. the homepage) simply cover it. */}
        <div className="site-glow" aria-hidden />
        <Providers>
          <JsonLd data={[organizationSchema(), websiteSchema()]} />
          <ChromeGate>
            <Navbar />
          </ChromeGate>
          <main className="min-h-screen">{children}</main>
          <ChromeGate>
            <Footer />
          </ChromeGate>
        </Providers>
        {/* Cookieless product analytics (no consent banner needed). Failure-safe:
            never blocks rendering, the tools, or the lead flow. */}
        <Analytics />
      </body>
    </html>
  );
}
