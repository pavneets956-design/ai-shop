import LiveAIHome from "@/components/home/LiveAIHome";
import ConsultationCall from "@/components/ConsultationCall";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/data/faqs";
import { serviceSchema, faqSchema } from "@/lib/seo";

export default function Home() {
  const homeFaqs = faqs.slice(0, 7);

  return (
    <>
      {/* SEO structured data — preserved from prior homepage */}
      <JsonLd data={[...serviceSchema(), faqSchema(homeFaqs)]} />
      {/* "Talking" AI call overlay — greets on load (free browser voice, tap for sound),
          skippable; sessionStorage flag stops it re-nagging the same visitor. */}
      <ConsultationCall onHomepage />
      <LiveAIHome />
    </>
  );
}
