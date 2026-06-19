import LiveAIHome from "@/components/home/LiveAIHome";
import CallInvite from "@/components/home/CallInvite";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/data/faqs";
import { serviceSchema, faqSchema } from "@/lib/seo";

export default function Home() {
  const homeFaqs = faqs.slice(0, 7);

  return (
    <>
      {/* SEO structured data — preserved from prior homepage */}
      <JsonLd data={[...serviceSchema(), faqSchema(homeFaqs)]} />
      {/* The interactive hero "Build my AI system" console is the main homepage. */}
      <LiveAIHome />
      {/* Front-and-center, skippable invite to the talking AI call. It is
          tap-to-start (no auto-audio) so it won't repeat the old auto-launching
          overlay's slow/blocking problem; "Start the call" routes to /start. */}
      <CallInvite />
    </>
  );
}
