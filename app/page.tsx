import LiveAIHome from "@/components/home/LiveAIHome";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/data/faqs";
import { serviceSchema, faqSchema } from "@/lib/seo";

export default function Home() {
  const homeFaqs = faqs.slice(0, 7);

  return (
    <>
      {/* SEO structured data — preserved from prior homepage */}
      <JsonLd data={[...serviceSchema(), faqSchema(homeFaqs)]} />
      {/* The live flow-field hero (LiveAIHome) is the homepage. The auto-launching
          "Talk to the AI" call invite was removed per the redesign brief — it
          blocked the hero and read orange; the call still lives at /start. */}
      <LiveAIHome />
    </>
  );
}
