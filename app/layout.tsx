import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChromeGate from "@/components/ChromeGate";
import JsonLd from "@/components/JsonLd";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/data/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

/**
 * Two families, down from five (Inter, Archivo, IBM Plex Mono, Quicksand,
 * JetBrains Mono) as of the 2026-08-01 Verseo rebuild.
 *
 * Inter is a variable font, so it covers every weight the retired display
 * faces were loaded for. Archivo/Quicksand/Plex are no longer fetched; their
 * CSS variables are aliased onto these two in globals.css so the 37 files
 * using `font-display`, the 14 using `font-mono`, and the direct
 * `var(--font-display)` references in components/experience/experience.css all
 * keep resolving without a single component edit.
 *
 * Quicksand in particular was working against the brief — a rounded, friendly
 * face reads "approachable app", not "precise, built by hand".
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
/**
 * Display face, restored 2026-08-30. Inter is an excellent text face and a
 * generic display face — at 52px with tight tracking it is the most
 * recognisable AI-startup signature there is. Archivo's squarer terminals and
 * larger x-height give headings the signage/industrial register the brand
 * claims ("handbuilt, practical, technically excellent"). One extra variable
 * woff2, latin subset; still three families against production's five.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["600", "700"],
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
  // NO `alternates.canonical` here, deliberately.
  //
  // A canonical set on the root layout is INHERITED by every route that does not
  // declare its own, which silently told Google that 11 routes (/login, /cart,
  // /dashboard, /products and the six /agent/* screens) were all duplicates of
  // the homepage. It is a landmine rather than a one-off bug: any new route that
  // forgets its own canonical inherits it too.
  //
  // The homepage declares its own at app/page.tsx. Every public route sets one
  // via its `metadata` or `generateMetadata`. Routes that emit none now
  // self-canonicalise, which is correct for app screens nobody should index.
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
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${jbMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Skip link. Without it a keyboard or screen-reader user tabbed the
            entire navigation on every one of ~235 routes before reaching any
            content (WCAG 2.4.1). Visually hidden until focused. */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {/* The `site-glow` div was removed 2026-08-30. Its CSS rule had already
            been reduced to `display: none` (globals.css), so this is dead markup
            being deleted, not a visual change. Depth comes from the
            surface/recess stacking and 1px hairline shadows instead of a
            blurred brand-coloured blob. */}
        <Providers>
          <JsonLd data={[organizationSchema(), websiteSchema()]} />
          <ChromeGate>
            <Navbar />
          </ChromeGate>
          <main id="main" className="min-h-screen">
            {children}
          </main>
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
