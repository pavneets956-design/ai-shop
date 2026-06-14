// Central site config — single source of truth for brand, contact, SEO.
export const site = {
  name: "Handbuilt",
  legalName: "Handbuilt AI Studio",
  tagline: "AI that works for your business — built by hand, not bought off a shelf.",
  subTagline:
    "Your personal AI studio. Custom apps, agents, and automations — built for what you actually do.",
  url: "https://aibuiltbyhand.com", // custom domain — bought 2026-06-14
  // Owner / local SEO (GEO). Update with real public business details before launch.
  owner: "Pavneet",
  email: "pavneets956@gmail.com",
  region: "Surrey, BC",
  country: "CA",
  serviceArea: ["Surrey", "Vancouver", "Greater Vancouver", "British Columbia", "Canada", "Remote / Worldwide"],
  currency: "CAD",
  social: {
    twitter: "#",
    instagram: "#",
    linkedin: "#",
    github: "https://github.com/pavneets956-design/ai-shop",
  },
  // Booking link for the "Book a call" CTA. Drop in a Cal.com / Calendly URL.
  bookingUrl: "/create", // TODO: replace with Cal.com/Calendly link once set up
};

export const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Live Demo", href: "/demo" },
  { label: "Solutions", href: "/solutions" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
] as const;
