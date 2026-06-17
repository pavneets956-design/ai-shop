// Client-side AcroForm filling via MuPDF (WASM). Verified to read AND write
// IRCC AcroForms (e.g. IMM 5645) where pdf-lib fails on the cross-reference
// structure. Runs identically in Node and the browser.
//
// fillAcroForm() takes the template bytes plus a list of FieldValues and returns
// the filled PDF bytes. Text -> setTextValue, dropdowns -> setChoiceValue,
// checkboxes -> toggle to the requested on/off state.

import type { FieldValue } from './types';

export interface FillReport {
  pdf: Uint8Array;
  applied: string[];
  missing: string[]; // field names we were asked to fill but couldn't find
}

/** Load the MuPDF module (dynamic import keeps the WASM out of the SSR bundle). */
async function loadMupdf() {
  const mod: any = await import('mupdf');
  return mod.default ?? mod;
}

export async function fillAcroForm(
  template: Uint8Array,
  values: FieldValue[],
): Promise<FillReport> {
  const mupdf = await loadMupdf();
  const doc = mupdf.PDFDocument.openDocument(template, 'application/pdf');

  const wanted = new Map(values.map((v) => [v.field, v.value]));
  const applied: string[] = [];
  const seen = new Set<string>();

  const pageCount = doc.countPages();
  for (let p = 0; p < pageCount; p++) {
    const page = doc.loadPage(p);
    for (const widget of page.getWidgets()) {
      const name = safe(() => widget.getName());
      if (!name || !wanted.has(name)) continue;
      seen.add(name);
      const value = wanted.get(name)!;
      const type = safe(() => widget.getFieldType()) || 'text';

      try {
        if (type === 'checkbox' || type === 'radiobutton') {
          const on = value === true || value === 'true' || value === 'On' || value === 'Yes';
          // toggle() flips state; only flip when current state disagrees with target.
          const current = safe(() => widget.getValue?.()) ?? 'Off';
          const isOn = current !== 'Off' && current !== '' && current !== false;
          if (on !== isOn) widget.toggle();
        } else if (type === 'combobox' || type === 'listbox') {
          widget.setChoiceValue(String(value));
        } else {
          widget.setTextValue(String(value));
        }
        widget.update();
        applied.push(name);
      } catch {
        // Leave it for the missing list so the review UI can flag it.
      }
    }
  }

  const buf = doc.saveToBuffer(''); // incremental=false: clean save
  const bytes: Uint8Array = buf.asUint8Array ? buf.asUint8Array() : (buf as Uint8Array);
  // Copy out of the WASM heap so the bytes survive after doc disposal.
  const pdf = new Uint8Array(bytes);

  const missing = values.map((v) => v.field).filter((f) => !seen.has(f));
  return { pdf, applied, missing };
}

function safe<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}
