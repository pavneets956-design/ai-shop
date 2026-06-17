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
    delivery: 'Filled automatically. Download the completed PDF, ready to print and sign.',
  },
  {
    id: 'imm-5257',
    title: 'IMM 5257 — Application for a Temporary Resident Visa',
    method: 'guided',
    map: mapImm5257,
    superVisaRequired: true,
    delivery:
      'Guided fill: every answer is pre-computed for you. Open the official form in free Adobe Reader and copy each value across (about 2 minutes). One-click auto-fill is on the Pro plan.',
  },
];

export function getForm(id: string): RegisteredForm | undefined {
  return FORMS.find((f) => f.id === id);
}
