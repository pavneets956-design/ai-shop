import HomepageNew from "@/components/home/HomepageNew";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/data/faqs";
import { serviceSchema, faqSchema } from "@/lib/seo";

export default function Home() {
  const homeFaqs = faqs.slice(0, 7);

  return (
    <>
      <JsonLd data={[...serviceSchema(), faqSchema(homeFaqs)]} />
      <HomepageNew />
    </>
  );
}
