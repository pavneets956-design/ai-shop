import type { Metadata } from "next";
import CreatorStudio from "@/components/creators/CreatorStudio";
import JsonLd from "@/components/JsonLd";
import { creators } from "@/lib/data/creators";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "AI for Content Creators",
  description:
    "Custom AI systems for content creators — clipping, editing, scripts, repurposing, captions, voice, avatars and fan messaging. Built by hand around your channels, worldwide.",
  alternates: { canonical: "/creators" },
};

// ItemList of the 20 creator builds (hub → spoke) + breadcrumb for the dark hub.
const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI Systems for Content Creators",
  itemListElement: creators.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${site.url}/creators/${c.slug}`,
    name: c.h1,
  })),
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "For Creators", item: `${site.url}/creators` },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={[itemList, breadcrumb]} />
      <CreatorStudio />
    </>
  );
}
