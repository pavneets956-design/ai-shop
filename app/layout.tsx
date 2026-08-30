import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChromeGate from "@/components/ChromeGate";
import JsonLd from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/data/site";
import { identityGraph } from "@/lib/seo";

/**
 * Three families, each with one job — down from the five (Inter, Archivo,
 * IBM Plex Mono, Quicksand, JetBrains Mono) that production still ships.
 *
 * Inter = text. Archivo = display. JetBrains Mono = annotation and numerals.
 * Quicksand and IBM Plex are gone for good; `--font-quicksand` stays aliased in
 * globals.css so no unswept reference breaks. Quicksand in particular worked
 * against the brief — a rounded, friendly face reads "approachable app", not
 * "precise, built by hand".
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
    // No `url` here, deliberately. A root-layout og:url is INHERITED by every
    // page that does not declare its own openGraph block, so 24 static routes
    // were telling every scraper their canonical social URL was the homepage.
    // Pages that need one set it via staticMetadata()/landingMetadata().
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
  // NO `robots` here, deliberately — same trap as `alternates.canonical` above.
  // `index, follow` is the crawler default, so the tag added nothing on 214
  // pages, but it was INHERITED by app/not-found.tsx, which meant every 404
  // shipped two robots tags: Next's own `noindex` and this `index, follow`.
  // Pages that genuinely need a directive declare their own.
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
        {/* No <SessionProvider> here.
            It wrapped every route on the site and its only job was to serve
            `useSession()`, which after this release has zero live call sites —
            the Navbar dropped it, and the last consumer (ProCheckout, behind
            the unreferenced ToolPaywall) was dead code from the retired Tools
            Pro product. Mounting it cost every page load two requests to
            /api/auth/session plus the next-auth client bundle. `signIn()` and
            `signOut()` on /login and /account do not need the provider. */}
        <JsonLd data={identityGraph()} />
        <ChromeGate>
          <Navbar />
        </ChromeGate>
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        {/* Cookieless product analytics (no consent banner needed). Failure-safe:
            never blocks rendering, the tools, or the lead flow. */}
        <Analytics />
      </body>
    </html>
  );
}
