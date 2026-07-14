// Unified content model for all programmatic SEO/AEO/GEO landing pages.
// One shape drives money / service / industry / compare / resource / how-to
// pages via a single <LandingTemplate>. Each page TYPE keeps its own data
// file (services.ts, industries.ts, ...) so schema + intent stay distinct,
// but they all conform to LandingContent and flow into one sitemap + one
// internal-link graph. Add rows to a data file → page + sitemap entry appear.

export type SchemaKind = "Service" | "HowTo" | "Article" | "Comparison";

export type PageType =
  | "money"
  | "service"
  | "industry"
  | "location"
  | "compare"
  | "resource"
  | "howto"
  | "creators";

export interface LandingSection {
  heading: string;
  /** Plain prose; split into paragraphs on blank lines. */
  body: string;
  bullets?: string[];
}

export interface LandingLink {
  label: string;
  href: string;
}

export interface ComparisonRow {
  factor: string;
  handbuilt: string;
  alternative: string;
}

export interface LandingContent {
  slug: string;
  /** Small mono label above the H1, e.g. "AI Service" / "Industry". */
  eyebrow: string;
  /** H1 — phrased as the query a buyer types or asks an LLM. */
  h1: string;
  /** <title> — unique, includes the primary keyword. */
  title: string;
  /** Meta description — unique, ~150 chars, buyer language. */
  description: string;
  /** Answer-first lead paragraph (LLM-citable, self-contained). */
  answer: string;
  /** The problem callout. */
  pain?: string;
  /** A concrete worked example with a named persona + numbers (anti-thin). */
  scenario?: string;
  /** "How it works" numbered steps. */
  steps?: string[];
  /** "What you get" checklist. */
  gets?: string[];
  /** Flexible prose blocks (industries, how-tos, resources). */
  sections?: LandingSection[];
  /** Comparison table (compare pages only). */
  comparison?: { alternativeLabel: string; rows: ComparisonRow[] };
  /** Recommended package — drives the price card + CTA target. */
  packageId?: "starter" | "business" | "custom";
  ctaLabel?: string;
  /** Optional geographic focus for Service schema (e.g. "Vancouver & the Lower Mainland, BC"). Defaults to "Worldwide". */
  areaServed?: string;
  keywords: string[];
  /** Internal links (hub→spoke). Enforce ≥2 to avoid orphans. */
  related: LandingLink[];
  faqs: { q: string; a: string }[];
  schema: SchemaKind;
  /** lucide icon key from lib/icons.ts. */
  icon?: string;
}

/** Path prefix per page type. */
export const TYPE_BASE: Record<PageType, string> = {
  money: "",
  service: "/services",
  industry: "/industries",
  location: "/locations",
  compare: "/compare",
  resource: "/resources",
  howto: "/how-to",
  creators: "/creators",
};

export const TYPE_LABEL: Record<PageType, string> = {
  money: "Services",
  service: "AI Services",
  industry: "Industries",
  location: "Locations",
  compare: "Compare",
  resource: "Resources",
  howto: "How-to Guides",
  creators: "For Creators",
};

/** Build the canonical path for a landing entry. */
export function landingPath(type: PageType, slug: string): string {
  const base = TYPE_BASE[type];
  return base ? `${base}/${slug}` : `/${slug}`;
}

/** Default breadcrumb trail for a landing entry. */
export function landingBreadcrumb(
  type: PageType,
  content: Pick<LandingContent, "slug" | "h1">,
  shortName?: string
): { name: string; path: string }[] {
  const crumbs: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
  if (type !== "money") {
    crumbs.push({ name: TYPE_LABEL[type], path: TYPE_BASE[type] });
  }
  crumbs.push({
    name: shortName ?? content.h1,
    path: landingPath(type, content.slug),
  });
  return crumbs;
}
