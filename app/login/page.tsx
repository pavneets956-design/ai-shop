"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, Chrome } from "lucide-react";
import GlowBackground from "@/components/GlowBackground";
import { LogoMark } from "@/components/Logo";

function LoginInner() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/account";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24">
      <GlowBackground variant="subtle" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              Handbuilt
            </span>
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink">
            Sign in to Tools Pro
          </h1>
          <p className="mt-2 text-ink/55">
            Access every AI tool, your saved brand profile, and your generation history.
          </p>
        </div>

        <div className="glass-card spec-frame p-8">
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-ink/15 bg-white px-4 py-3 font-semibold text-ink transition hover:border-line-strong hover:bg-paper-2"
          >
            <Chrome className="h-5 w-5 text-ink" />
            Continue with Google
          </button>
          <p className="mt-5 text-center text-xs text-ink/40">
            Secure sign-in. We only use your email to manage your account and subscription.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/tools/pro"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/50 transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Tools Pro
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
