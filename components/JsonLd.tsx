// Renders structured data (GEO/SEO) as a single JSON-LD graph.
//
// Three things this does that the previous three-line version did not:
//
// 1. ONE "@graph" per script instead of a bare array of loose nodes. Nodes
//    reference each other by "@id" (WebPage -> WebSite -> Organization ->
//    Person), and a graph is how consumers are told those ids belong together.
//    Per-node "@context" keys are stripped; the graph carries the context once.
//
// 2. null / undefined / typeless entries are filtered out, so a suppressed node
//    (faqSchema() when the caller cannot assert the answers are in the rendered
//    HTML) simply never reaches the page — with no change to any call site.
//
// 3. "<" and the JS line terminators U+2028/U+2029 are escaped. Every string in
//    the graph is first-party today, but the day any user-supplied text reaches
//    schema, an unescaped "</script" inside JSON.stringify output is an XSS
//    vector. These are valid JSON string escapes, so the document still parses
//    to exactly the same value.
type Node = Record<string, unknown>;
export type JsonLdData = Node | null | undefined | (Node | null | undefined)[];

/** Escape characters that are unsafe inside an inline <script> body. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Collapse one or many nodes into a single @graph document.
 *
 * Nodes without an "@type" are dropped: a typeless JSON-LD node carries no
 * meaning, and lib/seo.ts uses exactly that as its "emit nothing" sentinel
 * (OMITTED_NODE) so a suppressed FAQPage never reaches the page.
 */
export function toGraph(data: JsonLdData): Node | null {
  const nodes = (Array.isArray(data) ? data : [data]).filter(
    (n): n is Node => Boolean(n) && typeof n === "object" && "@type" in (n as Node)
  );
  if (nodes.length === 0) return null;
  const graph = nodes.map((n) => {
    const copy: Node = { ...n };
    delete copy["@context"];
    return copy;
  });
  return { "@context": "https://schema.org", "@graph": graph };
}

export default function JsonLd({ data }: { data: JsonLdData }) {
  const doc = toGraph(data);
  if (!doc) return null;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(doc) }}
    />
  );
}
