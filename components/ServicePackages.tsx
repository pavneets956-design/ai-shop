import Link from "next/link";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import { packages, carePlan, formatPackagePrice } from "@/lib/data/packages";

const accentRing: Record<string, string> = {
  electric: "shadow-glow",
  violet: "shadow-glow-violet",
  cyan: "shadow-glow-cyan",
};

export default function ServicePackages({ showCarePlan = true }: { showCarePlan?: boolean }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {packages.map((p, idx) => (
          <Reveal key={p.id} delay={idx * 0.08}>
            <div
              className={`border-glow glass-card flex h-full flex-col ${
                p.highlight ? `border-clay/40 ${accentRing[p.accent]}` : ""
              }`}
            >
              {p.badge && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  {p.badge}
                </span>
              )}
              <h3 className="text-xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-ink/50">{p.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-ink">
                  {formatPackagePrice(p)}
                </span>
                {p.priceFormat !== "quote" && <span className="text-sm text-ink/40">CAD</span>}
              </div>
              <p className="mt-1 text-xs text-ink/40">
                {p.timeline}
                {p.priceTypical ? ` · most land around $${p.priceTypical.toLocaleString()}` : ""}
              </p>

              <p className="mt-4 text-sm text-ink/60">
                <span className="text-ink/40">For:</span> {p.forWho}
              </p>

              <ul className="mt-5 flex-1 space-y-3">
                {p.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.cta.href}
                className={`mt-7 ${p.highlight ? "btn-primary" : "btn-secondary"} w-full`}
              >
                {p.cta.label}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      {showCarePlan && (
        <Reveal delay={0.1}>
          <div className="border-glow glass mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl p-6 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-lg font-semibold text-ink">{carePlan.name}</h3>
                <span className="font-display text-2xl font-semibold text-gradient-brand">
                  ${carePlan.monthly}
                  <span className="text-sm font-normal text-ink/40">/mo</span>
                </span>
                <span className="text-xs text-ink/40">
                  (or ${carePlan.annualMonthly}/mo billed annually)
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm text-ink/55">
                {carePlan.covers.join(" · ")}
              </p>
            </div>
            <Link href="/create?package=care" className="btn-secondary whitespace-nowrap">
              Add a Care Plan
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
