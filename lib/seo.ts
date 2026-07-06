import type { Metadata } from "next";
import { site } from "./data/site";
import { packages, carePlan, formatPackagePrice, getPackage } from "./data/packages";
import type { LandingContent, PageType } from "./data/landing";
import { landingPath, landingBreadcrumb } from "./data/landing";

// Sitewide structured data (GEO/SEO). Rendered once in the root layout.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    description:
      "Handbuilt builds custom AI apps, agents, chatbots, automations, dashboards and business tools for companies that want practical AI systems that save time and grow revenue. Based in Surrey/Delta BC, Canada; delivered remotely to small businesses across Canada, the United States, Australia, New Zealand and the United Kingdom.",
    url: site.url,
    email: site.email,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    priceRange: "$$",
    // Local BC service area (AdministrativeArea) + explicit Countries served
    // remotely — a strong machine-readable signal for answer engines deciding
    // whether to cite us for a US / AU / NZ / UK query.
    areaServed: [
      ...site.serviceArea.map((name) => ({ "@type": "AdministrativeArea", name })),
      ...["United States", "Australia", "New Zealand", "United Kingdom"].map((name) => ({
        "@type": "Country",
        name,
      })),
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surrey",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    knowsAbout: [
      "Custom AI app development",
      "AI automation services",
      "AI agents for business",
      "AI chatbot for website",
      "AI receptionist for small business",
      "AI workflow automation",
      "AI SaaS development",
      "AI dashboard builder",
    ],
    sameAs: [site.social.github].filter((u) => u && u !== "#"),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function serviceSchema() {
  return packages.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.name,
    serviceType: "AI development & automation",
    description: p.tagline + " " + p.includes.join(". "),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: site.currency,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: p.price,
        priceCurrency: site.currency,
        valueAddedTaxIncluded: false,
      },
      description: formatPackagePrice(p),
      url: `${site.url}${p.cta.href}`,
    },
  }));
}

export function carePlanOffer() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: carePlan.name,
    description: carePlan.covers.join(". "),
    provider: { "@id": `${site.url}/#organization` },
    offers: {
      "@type": "Offer",
      price: carePlan.monthly,
      priceCurrency: site.currency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: carePlan.monthly,
        priceCurrency: site.currency,
        unitText: "MONTH",
      },
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}

// Shop storefront schema: a breadcrumb + an ItemList of the products as
// self-contained Service offers. Prices each product by its real billing model —
// a monthly UnitPriceSpecification for managed/hybrid systems, a one-time price
// for builds — so the offer never misrepresents a $349/mo system as a flat fee.
export function shopSchema(
  products: {
    name: string;
    outcome: string;
    packageId: "starter" | "business" | "custom";
    billing?: "one-time" | "managed" | "hybrid";
    priceLabel?: string;
    monthlyPrice?: number;
    setupPrice?: number;
  }[]
): Record<string, unknown>[] {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ready-to-install AI systems",
    itemListElement: products.map((p, i) => {
      const pkg = getPackage(p.packageId);
      // A recurring offer when there's a monthly; otherwise a one-time price.
      const offer = p.monthlyPrice
        ? {
            "@type": "Offer",
            price: p.monthlyPrice,
            priceCurrency: site.currency,
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.monthlyPrice,
              priceCurrency: site.currency,
              unitText: "MONTH",
            },
            description: p.priceLabel ?? (pkg ? formatPackagePrice(pkg) : undefined),
            url: `${site.url}/create`,
          }
        : (p.setupPrice ?? pkg?.price) != null
          ? {
              "@type": "Offer",
              price: p.setupPrice ?? pkg!.price,
              priceCurrency: site.currency,
              description: p.priceLabel ?? (pkg ? formatPackagePrice(pkg) : undefined),
              url: `${site.url}/create`,
            }
          : undefined;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: p.name,
          serviceType: "AI development & automation",
          description: p.outcome,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: "Worldwide",
          ...(offer && { offers: offer }),
        },
      };
    }),
  };
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
    ]),
    itemList,
  ];
}

// Assemble the full JSON-LD array for any programmatic landing page.
// Picks the primary entity type from content.schema, then always appends
// FAQPage (if FAQs) + BreadcrumbList. Keeps every page rich for AEO/GEO.
export function landingSchema(
  type: PageType,
  content: LandingContent,
  shortName?: string
): Record<string, unknown>[] {
  const url = `${site.url}${landingPath(type, content.slug)}`;
  const pkg = content.packageId ? getPackage(content.packageId) : undefined;
  const out: Record<string, unknown>[] = [];

  if (content.schema === "Service") {
    out.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: content.h1,
      serviceType: shortName ?? content.h1,
      description: content.answer,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "Worldwide",
      url,
      ...(pkg && {
        offers: {
          "@type": "Offer",
          price: pkg.price,
          priceCurrency: site.currency,
          description: formatPackagePrice(pkg),
          url: `${site.url}${pkg.cta.href}`,
        },
      }),
    });
  } else if (content.schema === "HowTo") {
    out.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: content.h1,
      description: content.answer,
      step: (content.steps ?? []).map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: s,
      })),
    });
  } else {
    // Article — for resource / comparison answer pages.
    out.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.h1,
      description: content.answer,
      author: { "@id": `${site.url}/#organization` },
      publisher: { "@id": `${site.url}/#organization` },
      mainEntityOfPage: url,
    });
  }

  if (content.faqs.length) out.push(faqSchema(content.faqs));
  out.push(breadcrumbSchema(landingBreadcrumb(type, content, shortName)));
  return out;
}

// Next.js Metadata for any landing page. Title goes through the root layout
// template ("%s | Handbuilt"), so we pass the bare H1 and use the full
// content.title for OpenGraph (which isn't templated).
export function landingMetadata(type: PageType, content: LandingContent): Metadata {
  const path = landingPath(type, content.slug);
  const url = `${site.url}${path}`;
  return {
    title: content.h1,
    description: content.description,
    keywords: content.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: content.title,
      description: content.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
    },
  };
}
