import { site } from "./data/site";
import { packages, carePlan, formatPackagePrice } from "./data/packages";

// Sitewide structured data (GEO/SEO). Rendered once in the root layout.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    description:
      "AI Shop builds custom AI apps, agents, chatbots, automations, dashboards and business tools for companies and individuals who want practical AI systems that save time and grow revenue.",
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
