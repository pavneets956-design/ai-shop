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
      "Handbuilt builds custom AI apps, agents, chatbots, automations, dashboards and business tools for companies and individuals who want practical AI systems that save time and grow revenue.",
    url: site.url,
    email: site.email,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    priceRange: "$$",
    areaServed: site.serviceArea.map((name) => ({ "@type": "AdministrativeArea", name })),
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
