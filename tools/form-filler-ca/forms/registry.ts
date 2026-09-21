// Registry of supported forms. Add a new form = add a folder with its map and
// register one entry here. Nothing else in the engine or UI changes.

import type { ApplicantFile, FieldValue } from '../engine/types';
import { mapImm5645 } from './imm-5645/map';
import { mapImm5257 } from './imm-5257/map';

export interface RegisteredForm {
  id: string;
  title: string;
  method: 'acroform' | 'guided';
  /** Public URL the browser fetches the template from (acroform forms only). */
  templateUrl?: string;
  map: (file: ApplicantFile) => FieldValue[];
  superVisaRequired: boolean;
  /** Short note shown in the UI about how this form is delivered. */
  delivery: string;
}

export const FORMS: RegisteredForm[] = [
  {
    id: 'imm-5645',
    title: 'IMM 5645 — Family Information',
    method: 'acroform',
    templateUrl: '/form-templates/imm-5645.pdf',
    map: mapImm5645,
    superVisaRequired: true,
    delivery: 'Download the PDF with the details you entered, then review it and complete any missing information.',
  },
  {
    id: 'imm-5257',
    title: 'IMM 5257 — Application for a Temporary Resident Visa',
    method: 'guided',
    map: mapImm5257,
    superVisaRequired: true,
    delivery:
      'Download an answer sheet based on the details you entered. Copy the values into the official IMM 5257 form in Adobe Reader, review them and complete any remaining questions. This tool does not fill the IMM 5257 PDF directly.',
  },
];

export function getForm(id: string): RegisteredForm | undefined {
  return FORMS.find((f) => f.id === id);
}
