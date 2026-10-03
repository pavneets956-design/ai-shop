import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsPreferences from "@/components/AnalyticsPreferences";

export const metadata: Metadata = {
  title: "Analytics preferences",
  description: "Choose whether visits from this browser are included in Handbuilt AI website analytics.",
  alternates: { canonical: "/analytics-preferences" },
  robots: { index: false, follow: true },
};

export default function AnalyticsPreferencesPage() {
  return (
    <section className="relative pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <span className="v-label">This browser</span>
        <h1 className="v-h1 mt-5 font-display">Analytics preferences</h1>
        <p className="v-lead mt-6">Exclude your own visits when reviewing or testing the site so they do not inflate visitor and enquiry reports.</p>
        <p className="mt-4 text-ink/75">This choice applies to future analytics in this browser on this website. It stays until you change it or clear site storage. Set it separately on each device and browser. It does not delete past analytics or prevent a request form from sending.</p>
        <AnalyticsPreferences />
        <p className="mt-6 text-sm text-ink/70">This preference page, sign-in pages and administration pages are always excluded. Standard hosting logs still apply.</p>
        <div className="mt-8 flex gap-6"><Link href="/">Return home</Link><Link href="/privacy">Privacy policy</Link></div>
      </div>
    </section>
  );
}
