// Orchestrates the whole client-side flow: passport -> identity, identity + user
// data -> ApplicantFile, ApplicantFile -> per-form FieldValues -> filled output.
//
// Every step runs in the browser. No document bytes are ever sent to a server.

import type { ApplicantFile, FillResult } from './types';
import { ocrPassportMrz } from './ocr';
import { parsePassportMrz } from './mrz';
import { fillAcroForm } from './fill';
import { FORMS, type RegisteredForm } from '../forms/registry';

/** OCR a passport image and parse its MRZ into a validated identity. */
export async function readPassport(image: Blob, onProgress?: (pct: number, status: string) => void) {
  const mrzText = await ocrPassportMrz(image, onProgress);
  return parsePassportMrz(mrzText);
}

/** Fetch a bundled template as bytes (browser fetch from /public). */
async function loadTemplate(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load form template (${url}): ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

/** Produce the output for a single registered form from the applicant file. */
export async function buildForm(form: RegisteredForm, file: ApplicantFile): Promise<FillResult> {
  const values = form.map(file);

  if (form.method === 'acroform' && form.templateUrl) {
    const template = await loadTemplate(form.templateUrl);
    const { pdf, missing } = await fillAcroForm(template, values);
    const notes: string[] = [];
    if (missing.length) notes.push(`${missing.length} field(s) could not be placed — check the review list.`);
    return {
      formId: form.id,
      formTitle: form.title,
      method: 'acroform',
      output: pdf,
      filename: `${form.id}-filled.pdf`,
      contentType: 'application/pdf',
      values,
      notes,
    };
  }

  // Guided forms: emit a printable value sheet (UTF-8 text) the user copies into Adobe.
  const sheet = buildGuidedSheet(form, values);
  return {
    formId: form.id,
    formTitle: form.title,
    method: 'guided',
    output: new TextEncoder().encode(sheet),
    filename: `${form.id}-answers.txt`,
    contentType: 'text/plain;charset=utf-8',
    values,
    notes: [form.delivery],
  };
}

function buildGuidedSheet(form: RegisteredForm, values: { label: string; value: string | boolean; needsReview?: boolean }[]): string {
  const lines = [
    form.title,
    '='.repeat(form.title.length),
    'Open the official form in free Adobe Reader and enter these values:',
    '',
  ];
  for (const v of values) {
    const flag = v.needsReview ? '  [verify]' : '';
    lines.push(`${v.label}: ${v.value}${flag}`);
  }
  lines.push('', 'Your documents were processed entirely on your device. Nothing was uploaded.');
  return lines.join('\n');
}

/** Build every super-visa-required form for the applicant file. */
export async function buildSuperVisaPackage(file: ApplicantFile): Promise<FillResult[]> {
  const required = FORMS.filter((f) => f.superVisaRequired);
  const results: FillResult[] = [];
  for (const form of required) {
    results.push(await buildForm(form, file));
  }
  return results;
}
