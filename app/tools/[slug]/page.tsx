import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import Reveal from "@/components/Reveal";
import ToolGenerator from "@/components/ToolGenerator";
import ToolPaywall from "@/components/ToolPaywall";
import { selfServeTools, getTool } from "@/lib/data/tools";
import { site } from "@/lib/data/site";
import { getSubStatus } from "@/lib/subscription";

// Gated content depends on the signed-in user — never statically cache it.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return selfServeTools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return {};
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `${site.url}/tools/${tool.slug}`,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const sub = await getSubStatus();
  // Free-taste funnel: a first-time visitor gets one free run of this tool before
  // the subscription gate. The API enforces it; here we just decide what to show.
  const usedFree = (cookies().get("tp_free")?.value || "").split(",").filter(Boolean);
  const freeAvailable = !sub.subscribed && !usedFree.includes(tool.kind);
  const showGenerator = sub.subscribed || freeAvailable;
  const others = selfServeTools.filter((t) => t.slug !== tool.slug).slice(0, 4);

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.seoDescription,
    url: `${site.url}/tools/${tool.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "19", priceCurrency: "CAD" },
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <section className="relative overflow-hidden pb-24 pt-32">
        <GlowBackground variant="subtle" />
        <div className="mx-auto max-w-3xl px-4">
          {/* Hero */}
          <div className="mb-9 text-center">
            <Reveal>
              <span className="eyebrow">Tools Pro</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {tool.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-xl text-lg text-ink/60">{tool.tagline}</p>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="mx-auto mt-2 max-w-xl text-sm text-ink/45">{tool.problem}</p>
            </Reveal>
          </div>

          {/* The tool — or the paywall once the free run is spent */}
          <Reveal delay={0.16}>
            {showGenerator ? (
              <>
                {!sub.subscribed && (
                  <div className="mb-4 flex items-center gap-3 rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm text-ink/75">
                    <Sparkles className="h-4 w-4 flex-none text-ink" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-ink">Your first one&apos;s on us.</span>{" "}
                      Try it free — Tools Pro unlocks unlimited use of every tool.
                    </span>
                  </div>
                )}
                <ToolGenerator
                  kind={tool.kind}
                  endpoint="/api/tools"
                  fields={tool.fields}
                  submitLabel={tool.submitLabel}
                  resultTitle={tool.resultTitle}
                  copyable={tool.copyable}
                  printable={tool.printable}
                  upgradeHref="/tools/pro"
                />
                <p className="mt-3 text-center text-xs text-ink/35">
                  Output is a starting draft — review it before you send. We never invent prices,
                  facts or guarantees you didn&apos;t provide.
                  {sub.subscribed ? (
                    <>
                      {" "}
                      Saved to your{" "}
                      <Link href="/account" className="font-semibold text-ink hover:text-ink">
                        history
                      </Link>
                      .
                    </>
                  ) : null}
                </p>
              </>
            ) : (
              <ToolPaywall toolName={tool.name} callbackUrl={`/tools/${tool.slug}`} />
            )}
          </Reveal>

          {/* Done-for-you bridge */}
          <div className="mt-12 rounded-2xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-8">
            <span className="eyebrow">Want it on autopilot?</span>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
              Have Handbuilt build this into your business
            </h2>
            <p className="mt-2 text-ink/60">
              Tools Pro is hands-on — you run it. The done-for-you version runs automatically:
              connected to your inbox, calendar, CRM and payments, trained on your business.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                href={`/create?build=${tool.funnelBuild}`}
                className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-ink"
              >
                Start a build <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 font-semibold text-ink/50 hover:text-ink"
              >
                See all systems <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* More tools */}
          <div className="mt-12">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-ink" />
              <p className="field-label">More Pro tools</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {others.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tools/${t.slug}`}
                  className="glass-card group flex items-center justify-between p-4 text-sm font-medium text-ink/75 transition hover:text-ink"
                >
                  {t.name}
                  <ArrowUpRight className="h-4 w-4 text-ink/30 transition group-hover:text-ink" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
