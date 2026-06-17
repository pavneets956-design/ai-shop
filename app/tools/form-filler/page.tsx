import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// The filler runs entirely in the browser (WASM OCR + PDF engine), so it must not SSR.
const FormFiller = dynamic(() => import('../../../tools/form-filler-ca/ui/FormFiller'), {
  ssr: false,
  loading: () => <p className="px-4 py-10 font-mono text-sm text-teal-400">Loading the filler…</p>,
});

export const metadata: Metadata = {
  title: 'Super Visa Form Filler — fill IMM 5257 & IMM 5645 on your device | Handbuilt',
  description:
    'Fill your Canadian super visa forms (IMM 5257 + IMM 5645) from your passport automatically. 100% private — your documents are processed in your browser and never uploaded.',
  alternates: { canonical: '/tools/form-filler' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <p className="font-mono text-xs uppercase tracking-widest text-amber-400">Handbuilt · Form Filler</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
            Canadian Super Visa — fill your forms without retyping
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
