import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { featuredBuilds } from "@/lib/data/solutions";
import { getIcon } from "@/lib/icons";

const accentStyles: Record<string, { bg: string; text: string }> = {
  electric: { bg: "from-ink/[0.06] to-ink/[0.02]", text: "text-ink" },
  violet: { bg: "from-ink/[0.06] to-ink/[0.02]", text: "text-ink" },
  cyan: { bg: "from-ink/[0.06] to-ink/[0.02]", text: "text-ink" },
  gold: { bg: "from-ink/[0.06] to-ink/[0.02]", text: "text-ink" },
};

const nf = new Intl.NumberFormat("en-CA");

export default function FeaturedBuilds() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {featuredBuilds.map((b, idx) => {
        const Icon = getIcon(b.icon);
        const a = accentStyles[b.accent];
        return (
          <Reveal key={b.slug} delay={(idx % 4) * 0.06}>
            <Link
              href="/create"
              className="border-glow glass-card group flex h-full flex-col"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-gradient-to-br ${a.bg} ${a.text}`}>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 flex items-center gap-1 font-semibold text-ink">
                {b.title}
                <ArrowUpRight className="h-4 w-4 text-ink/20 transition group-hover:text-ink" />
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/35">{b.forWho}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{b.what}</p>
              <p className="mt-4 text-sm font-medium text-ink/80">From ${nf.format(b.startsAt)} CAD</p>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
