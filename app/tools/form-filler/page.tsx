import type { Metadata } from 'next';
import FormFiller from '@/tools/form-filler-ca/ui/ClientFormFiller';

export const metadata: Metadata = {
  title: 'Super Visa Forms — IMM 5645 PDF & IMM 5257 answer sheet | Handbuilt',
  description:
    'Prepare an IMM 5645 PDF and an IMM 5257 answer sheet from the details you enter. Your documents are processed in your browser and never uploaded. Review both outputs before use.',
  alternates: { canonical: '/tools/form-filler' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400">Handbuilt · Form Filler</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
            Prepare your Canadian Super Visa forms
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Upload the applicant&apos;s passport, confirm the details, and download a filled
            IMM 5645 plus a guided answer sheet for IMM 5257. Everything happens on your device.
          </p>
        </div>
      </div>
      <FormFiller />
    </main>
  );
}
