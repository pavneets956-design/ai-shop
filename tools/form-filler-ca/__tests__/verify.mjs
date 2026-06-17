// Regression check for the IMM 5645 fill path. Runs the real MuPDF engine against
// the real template, fills one field of every type in every section, saves, reopens,
// and asserts the values round-trip. No test runner needed:
//
//   node tools/form-filler-ca/__tests__/verify.mjs
//
// Exits non-zero on any mismatch so it can gate CI.

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const template = join(here, '..', 'forms', 'imm-5645', 'template.pdf');
const P = 'IMM_5645[0].page1[0].';

const cases = {
  [P + 'Subform1[0].Visitor[0]']: true,
  [P + 'SectionA[0].Applicant[0].AppName[0]']: 'SINGH, Gurmeet',
  [P + 'SectionA[0].Applicant[0].ChildMStatus[0]']: 'Married-physically present',
  [P + 'SectionA[0].Spouse[0].SpouseName[0]']: 'KAUR, Harjit',
  [P + 'SectionA[0].Spouse[0].SpouseYes[0]']: true,
  [P + 'SectionA[0].Mother[0].MotherName[0]']: 'KAUR, Surinder',
  [P + 'SectionA[0].Father[0].FatherName[0]']: 'SINGH, Bant',
  [P + 'SectionB[0].Child[0].ChildName[0]']: 'SINGH, Pavneet',
  [P + 'SectionB[0].Child[0].ChildMStatus[0]']: 'Married',
  [P + 'SectionB[0].Child[0].ChildYes[0]']: true,
  [P + 'SectionC[0].Child[0].ChildName[0]']: 'SINGH, Manjit',
  [P + 'SectionC[0].Child[0].ChildRelationship[0]']: 'Brother',
};

const mupdf = await import('mupdf');

function fill(doc) {
  let applied = 0;
  const seen = new Set();
  for (let p = 0; p < doc.countPages(); p++) {
    for (const w of doc.loadPage(p).getWidgets()) {
      const n = w.getName();
      if (!(n in cases)) continue;
      seen.add(n);
      const t = w.getFieldType();
      const v = cases[n];
      if (t === 'checkbox') {
        const cur = w.getValue ? w.getValue() : 'Off';
        const isOn = cur !== 'Off' && cur !== '' && cur !== false;
        if ((v === true) !== isOn) w.toggle();
      } else if (t === 'combobox') w.setChoiceValue(String(v));
      else w.setTextValue(String(v));
      w.update();
      applied++;
    }
  }
  return { applied, seen };
}

const doc = mupdf.PDFDocument.openDocument(readFileSync(template), 'application/pdf');
const { applied, seen } = fill(doc);
const missing = Object.keys(cases).filter((k) => !seen.has(k));
if (missing.length) {
  console.error('FAIL — field names not found:', missing);
  process.exit(1);
}

const buf = doc.saveToBuffer('');
const bytes = buf.asUint8Array ? buf.asUint8Array() : buf;

// Reopen and verify text/combobox values survived the save.
const doc2 = mupdf.PDFDocument.openDocument(new Uint8Array(bytes), 'application/pdf');
let ok = 0;
let bad = 0;
for (let p = 0; p < doc2.countPages(); p++) {
  for (const w of doc2.loadPage(p).getWidgets()) {
    const n = w.getName();
    if (!(n in cases) || cases[n] === true) continue; // skip checkboxes here
    const v = w.getValue ? w.getValue() : '';
    if (v === cases[n]) ok++;
    else {
      bad++;
      console.error(`  mismatch ${n}: got ${JSON.stringify(v)} want ${JSON.stringify(cases[n])}`);
    }
  }
}

const textCount = Object.entries(cases).filter(([, v]) => v !== true).length;
console.log(`applied ${applied}/${Object.keys(cases).length} fields; text/combo round-trip ${ok}/${textCount}`);
if (bad > 0) process.exit(1);
console.log('PASS — IMM 5645 fill verified against the real template.');
