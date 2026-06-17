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
      {/* The interactive hero "Build my AI system" console replaces the old
          auto-launching voice overlay (it was slow + blocking). The talking AI
          call is still one non-blocking click away at /start, linked from the
          hero builder. */}
      <LiveAIHome />
    </>
  );
}
