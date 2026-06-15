import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import AccountActions from "@/components/AccountActions";
import { getSubStatus } from "@/lib/subscription";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const sub = await getSubStatus();
  if (!sub.authed) redirect("/login");

  const runs = sub.userId
    ? await prisma.toolRun
        .findMany({
          where: { userId: sub.userId },
          orderBy: { createdAt: "desc" },
          take: 12,
          select: { id: true, tool: true, title: true, createdAt: true },
        })
        .catch(() => [])
    : [];

  const renews = sub.currentPeriodEnd
    ? sub.currentPeriodEnd.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <section className="relative pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <span className="eyebrow">Your account</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {sub.email}
          </h1>
        </Reveal>

        {/* Subscription status */}
        <Reveal delay={0.05}>
          <div className="mt-8 glass-card spec-frame p-7">
            {sub.subscribed ? (
              <>
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-semibold">Tools Pro — active</span>
                </div>
                <p className="mt-2 text-sm text-ink/60">
                  Every tool is unlocked.{renews ? ` Renews ${renews}.` : ""}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href="/tools" className="btn-primary">
                    Open the tools <ArrowRight className="h-4 w-4" />
                  </Link>
                  <AccountActions canManage />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-ink/60">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold text-ink">No active subscription</span>
                </div>
                <p className="mt-2 text-sm text-ink/60">
                  Subscribe to Tools Pro to unlock every tool, unlimited.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href="/tools/pro" className="btn-primary">
                    See Tools Pro <ArrowRight className="h-4 w-4" />
                  </Link>
                  <AccountActions canManage={false} />
                </div>
              </>
            )}
          </div>
        </Reveal>

        {/* History */}
        <Reveal delay={0.1}>
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-ink">Recent generations</h2>
            {runs.length === 0 ? (
              <p className="mt-3 text-sm text-ink/50">
                Nothing yet — anything you generate in the tools shows up here.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-ink/[0.06] overflow-hidden rounded-xl border border-ink/[0.08] bg-white">
                {runs.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{r.title || r.tool}</p>
                      <p className="text-xs text-ink/45">{r.tool}</p>
                    </div>
                    <span className="flex-none text-xs text-ink/40">
                      {r.createdAt.toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
