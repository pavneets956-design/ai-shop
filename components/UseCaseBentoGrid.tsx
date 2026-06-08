import Link from "next/link";
import Reveal from "./Reveal";
import { solutionCategories } from "@/lib/data/solutions";
import { getIcon } from "@/lib/icons";

// Bento layout — first two tiles are larger for visual rhythm.
const spans = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
  "",
];

export default function UseCaseBentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {solutionCategories.map((c, idx) => {
        const Icon = getIcon(c.icon);
        const feature = idx === 0;
        return (
          <Reveal key={c.slug} delay={(idx % 4) * 0.05} className={spans[idx] ?? ""}>
            <Link
              href={`/create?category=${c.slug}`}
              className="border-glow glass-card group flex h-full flex-col"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-clay/20 to-clay/20 text-clay">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className={`mt-4 font-semibold text-ink ${feature ? "text-2xl" : "text-lg"}`}>
                {c.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">{c.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.examples.slice(0, feature ? 4 : 2).map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-ink/10 bg-ink/[0.03] px-2.5 py-1 text-xs text-ink/55"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
