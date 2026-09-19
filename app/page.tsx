import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import StudioHome from "@/components/studio/StudioHome";
import { serviceSchema, faqSchema } from "@/lib/seo";
import { HOME_OBJECTIONS } from "@/lib/data/homeFaqs";
import { site } from "@/lib/data/site";
const title = "Custom Websites, Apps & AI Systems | Handbuilt AI · Surrey, BC";
const description =
  "Custom websites, interactive 3D experiences, web apps and AI agents. Work directly with an independent builder in Surrey, BC, from idea to launch.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: site.url,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Handbuilt AI — Custom websites, apps and AI systems. Surrey, BC.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image.png"],
  },
};
export default function Home() {
  return (
    <>
      <JsonLd data={[...serviceSchema(), faqSchema(HOME_OBJECTIONS)]} />
      <StudioHome />
    </>
  );
}
