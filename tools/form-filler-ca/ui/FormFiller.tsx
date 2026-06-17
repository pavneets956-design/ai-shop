'use client';

// Form Filler CA — the full client-side flow in one component.
// Upload passport -> OCR/MRZ -> confirm details -> generate -> review -> download.
// All processing happens in this browser tab; nothing is uploaded.

import { useState } from 'react';
import type { ApplicantFile, FamilyMember, FillResult, MaritalStatus } from '../engine/types';
import { readPassport } from '../engine/pipeline';
import { buildSuperVisaPackage } from '../engine/pipeline';

const MARITAL: MaritalStatus[] = [
  'Single', 'Married', 'Common-law', 'Divorced', 'Legally separated', 'Widowed', 'Annulled marriage',
];

const emptyMember = (): FamilyMember => ({
  fullName: '', dateOfBirth: '', countryOfBirth: '', address: '', occupation: '',
  maritalStatus: '', relationship: '', accompanying: null,
});

type Step = 'intro' | 'details' | 'results';

export default function FormFiller() {
  const [step, setStep] = useState<Step>('intro');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const [applicant, setApplicant] = useState<FamilyMember>(emptyMember());
  const [spouse, setSpouse] = useState<FamilyMember>(emptyMember());
  const [mother, setMother] = useState<FamilyMember>(emptyMember());
  const [father, setFather] = useState<FamilyMember>(emptyMember());
  const [children, setChildren] = useState<FamilyMember[]>([]);
  const [siblings, setSiblings] = useState<FamilyMember[]>([]);
  const [passport, setPassport] = useState<ApplicantFile['passport']>();

  const [results, setResults] = useState<FillResult[]>([]);

  async function onPassport(file: File) {
    setError(''); setBusy('Reading passport on your device…');
    try {
      const id = await readPassport(file, (pct, status) =>
        setBusy(`Reading passport (${status} ${pct}%)…`));
      setPassport(id);
      // Pre-fill applicant from the validated MRZ.
      setApplicant((a) => ({
        ...a,
        fullName: id.fullName || a.fullName,
        dateOfBirth: id.dateOfBirth || a.dateOfBirth,
        countryOfBirth: id.nationality || a.countryOfBirth,
      }));
      if (!id.valid) {
        setError('Passport read, but some check digits failed — please verify the highlighted fields below.');
      }
      setStep('details');
    } catch (e: any) {
      setError(e?.message || 'Could not read that image. Enter the details manually below.');
      setStep('details');
    } finally {
      setBusy('');
    }
  }

  async function generate() {
    setError(''); setBusy('Filling your forms on your device…');
    try {
      const file: ApplicantFile = {
        applicant, spouse: filled(spouse) ? spouse : undefined,
        mother: filled(mother) ? mother : undefined, father: filled(father) ? father : undefined,
        children: children.filter(filled), siblings: siblings.filter(filled),
        applicationType: 'Visitor', passport,
      };
      const out = await buildSuperVisaPackage(file);
      setResults(out);
      setStep('results');
    } catch (e: any) {
      setError(e?.message || 'Something went wrong while filling the forms.');
    } finally {
      setBusy('');
    }
  }

  function download(r: FillResult) {
    const blob = new Blob([r.output as BlobPart], { type: r.contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = r.filename; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-100">
      <PrivacyBanner />

      {step === 'intro' && (
        <section className="mt-8 border border-slate-700 bg-slate-900/60 p-6">
          <h2 className="font-mono text-sm uppercase tracking-widest text-teal-400">Step 1 — Start</h2>
          <p className="mt-3 text-slate-300">
            Upload a photo or scan of the applicant&apos;s passport bio page. We read the machine-readable
            zone <em>on your device</em> to fill names, dates and passport details automatically. Or skip and
            type everything in.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <label className="cursor-pointer border border-teal-500 bg-teal-500/10 px-4 py-2 font-mono text-sm text-teal-300 hover:bg-teal-500/20">
              Upload passport
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => e.target.files?.[0] && onPassport(e.target.files[0])} />
            </label>
            <button onClick={() => setStep('details')}
              className="border border-slate-600 px-4 py-2 font-mono text-sm text-slate-300 hover:bg-slate-800">
              Enter details manually
            </button>
          </div>
        </section>
      )}

      {step === 'details' && (
        <section className="mt-8 space-y-6">
          <MemberCard title="Applicant (the parent applying)" m={applicant} set={setApplicant}
            badge={passport?.valid ? 'from passport ✓' : passport ? 'verify check digits' : undefined} />
          <MemberCard title="Spouse / common-law partner" m={spouse} set={setSpouse} accompany />
          <MemberCard title="Mother" m={mother} set={setMother} accompany />
          <MemberCard title="Father" m={father} set={setFather} accompany />

          <ListSection title="Children" items={children} set={setChildren} relationship accompany max={11} />
          <ListSection title="Brothers & sisters" items={siblings} set={setSiblings} relationship accompany max={7} />

          <div className="flex items-center gap-3">
            <button onClick={generate} disabled={!!busy || !applicant.fullName}
              className="border border-teal-500 bg-teal-500/20 px-5 py-2.5 font-mono text-sm text-teal-200 hover:bg-teal-500/30 disabled:opacity-40">
              Fill my forms
            </button>
            <span className="text-xs text-slate-500">{!applicant.fullName && 'Enter the applicant name to continue.'}</span>
          </div>
        </section>
      )}

      {step === 'results' && (
        <section className="mt-8 space-y-6">
          <h2 className="font-mono text-sm uppercase tracking-widest text-teal-400">Your forms are ready</h2>
          {results.map((r) => (
            <div key={r.formId} className="border border-slate-700 bg-slate-900/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-100">{r.formTitle}</h3>
                <button onClick={() => download(r)}
                  className="border border-amber-500 bg-amber-500/10 px-4 py-1.5 font-mono text-xs text-amber-300 hover:bg-amber-500/20">
                  Download {r.method === 'acroform' ? 'filled PDF' : 'answer sheet'}
                </button>
              </div>
              {r.notes.map((n, i) => <p key={i} className="mt-2 text-sm text-slate-400">{n}</p>)}
              <details className="mt-3">
                <summary className="cursor-pointer font-mono text-xs text-slate-500">Review {r.values.length} values</summary>
                <ul className="mt-2 space-y-1 text-sm">
                  {r.values.map((v, i) => (
                    <li key={i} className="flex justify-between gap-4 border-b border-slate-800 py-1">
                      <span className="text-slate-400">{v.label}</span>
                      <span className={v.needsReview ? 'text-amber-300' : 'text-slate-200'}>
                        {String(v.value)} {v.source === 'passport-mrz' && <span className="text-teal-500">·mrz</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
          <button onClick={() => setStep('details')}
            className="border border-slate-600 px-4 py-2 font-mono text-sm text-slate-300 hover:bg-slate-800">
            ← Back to edit
          </button>
        </section>
      )}

      {busy && <p className="mt-6 font-mono text-sm text-teal-300">{busy}</p>}
      {error && <p className="mt-6 border border-amber-700 bg-amber-900/30 p-3 text-sm text-amber-200">{error}</p>}
    </div>
  );
}

function filled(m: FamilyMember) {
  return !!(m.fullName && m.fullName.trim());
}

function PrivacyBanner() {
  return (
    <div className="border border-teal-800 bg-teal-950/40 p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-400">Private by design</p>
      <p className="mt-1 text-sm text-slate-300">
        Your passport and documents are processed <strong>entirely on this device</strong> and are never sent
        to our servers. Open your browser&apos;s Network tab and watch — nothing uploads.
      </p>
    </div>
  );
}

function Field({ label, value, onChange, badge, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; badge?: string; type?: string;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate-400">
        {label} {badge && <em className="not-italic text-teal-500">{badge}</em>}
      </span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-slate-100 focus:border-teal-500 focus:outline-none" />
    </label>
  );
}

function MemberCard({ title, m, set, accompany, relationship, badge }: {
  title: string; m: FamilyMember; set: (m: FamilyMember) => void;
  accompany?: boolean; relationship?: boolean; badge?: string;
}) {
  const u = (patch: Partial<FamilyMember>) => set({ ...m, ...patch });
  return (
    <div className="border border-slate-700 bg-slate-900/60 p-5">
      <h3 className="font-mono text-sm uppercase tracking-widest text-slate-200">{title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Full name (SURNAME, Given)" value={m.fullName} onChange={(v) => u({ fullName: v })} badge={badge} />
        {relationship && <Field label="Relationship" value={m.relationship || ''} onChange={(v) => u({ relationship: v })} />}
        <Field label="Date of birth (YYYY-MM-DD)" value={m.dateOfBirth} onChange={(v) => u({ dateOfBirth: v })} />
        <Field label="Country of birth" value={m.countryOfBirth} onChange={(v) => u({ countryOfBirth: v })} />
        <Field label="Present address" value={m.address} onChange={(v) => u({ address: v })} />
        <Field label="Occupation" value={m.occupation} onChange={(v) => u({ occupation: v })} />
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-wide text-slate-400">Marital status</span>
          <select value={m.maritalStatus} onChange={(e) => u({ maritalStatus: e.target.value as MaritalStatus })}
            className="mt-1 w-full border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-slate-100 focus:border-teal-500 focus:outline-none">
            <option value="">—</option>
            {MARITAL.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        {accompany && (
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wide text-slate-400">Accompanying to Canada?</span>
            <select value={m.accompanying == null ? '' : m.accompanying ? 'yes' : 'no'}
              onChange={(e) => u({ accompanying: e.target.value === '' ? null : e.target.value === 'yes' })}
              className="mt-1 w-full border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-slate-100 focus:border-teal-500 focus:outline-none">
              <option value="">—</option><option value="yes">Yes</option><option value="no">No</option>
            </select>
          </label>
        )}
      </div>
    </div>
  );
}

function ListSection({ title, items, set, relationship, accompany, max }: {
  title: string; items: FamilyMember[]; set: (m: FamilyMember[]) => void;
  relationship?: boolean; accompany?: boolean; max: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm uppercase tracking-widest text-teal-400">{title} ({items.length})</h3>
        {items.length < max && (
          <button onClick={() => set([...items, emptyMember()])}
            className="border border-slate-600 px-3 py-1 font-mono text-xs text-slate-300 hover:bg-slate-800">+ Add</button>
        )}
      </div>
      <div className="mt-3 space-y-4">
        {items.map((m, i) => (
          <div key={i} className="relative">
            <MemberCard title={`${title.replace(/s$/, '')} ${i + 1}`} m={m} relationship={relationship} accompany={accompany}
              set={(nm) => set(items.map((x, j) => (j === i ? nm : x)))} />
            <button onClick={() => set(items.filter((_, j) => j !== i))}
              className="absolute right-3 top-3 font-mono text-xs text-slate-500 hover:text-amber-400">remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
