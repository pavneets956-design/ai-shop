// IMM 5645 (Family Information) field map.
//
// Section A: Applicant, Spouse/partner, Mother, Father.
// Section B: Children of the applicant (4 slots on page 1).
// Section C: Brothers & sisters of the applicant (7 slots on page 2).
//
// Hand-authored and auditable: every emitted FieldValue maps one source value to
// one verified PDF field name. No inference of field names at runtime.

import type { ApplicantFile, FamilyMember, FieldValue } from '../../engine/types';

const P = 'IMM_5645[0].page1[0].';

/** Build the standard 6 text fields + marital + accompany for a person at a given field-name base. */
function section(
  base: string,
  names: {
    name: string;
    dob: string;
    cob: string;
    address: string;
    occupation: string;
    marital: string;
    relationship?: string;
    yes?: string;
    no?: string;
  },
  label: string,
  m: FamilyMember | undefined,
  passportName?: boolean,
): FieldValue[] {
  if (!m) return [];
  const out: FieldValue[] = [];
  const push = (
    suffix: string,
    value: string | boolean,
    fieldLabel: string,
    source: FieldValue['source'] = 'user-entered',
    needsReview = false,
  ) => {
    if (value === '' || value == null) return;
    out.push({ field: base + suffix, value, label: `${label} — ${fieldLabel}`, source, needsReview });
  };

  push(names.name, m.fullName, 'Full name', passportName ? 'passport-mrz' : 'user-entered');
  if (names.relationship && m.relationship) push(names.relationship, m.relationship, 'Relationship');
  push(names.dob, m.dateOfBirth, 'Date of birth', passportName ? 'passport-mrz' : 'user-entered');
  push(names.cob, m.countryOfBirth, 'Country of birth', passportName ? 'passport-mrz' : 'user-entered');
  push(names.address, m.address, 'Present address');
  push(names.occupation, m.occupation, "Present occupation");
  if (m.maritalStatus) push(names.marital, m.maritalStatus, 'Marital status');
  if (names.yes && names.no && m.accompanying != null) {
    push(m.accompanying ? names.yes : names.no, true, 'Accompanying to Canada', 'user-entered');
  }
  return out;
}

export function mapImm5645(file: ApplicantFile): FieldValue[] {
  const values: FieldValue[] = [];

  // Application type (top of form).
  const appType = file.applicationType || 'Visitor';
  const typeField: Record<string, string> = {
    Visitor: 'Visitor[0]',
    Worker: 'Worker[0]',
    Student: 'Student[0]',
    Other: 'Other[0]',
  };
  values.push({
    field: `${P}Subform1[0].${typeField[appType]}`,
    value: true,
    label: `Application type — ${appType}`,
    source: 'user-entered',
  });

  // Section A — Applicant.
  values.push(
    ...section(
      `${P}SectionA[0].Applicant[0].`,
      { name: 'AppName[0]', dob: 'AppDOB[0]', cob: 'AppCOB[0]', address: 'AppAddress[0]', occupation: 'AppOccupation[0]', marital: 'ChildMStatus[0]' },
      'Applicant',
      file.applicant,
      true,
    ),
  );

  // Section A — Spouse / common-law partner.
  values.push(
    ...section(
      `${P}SectionA[0].Spouse[0].`,
      { name: 'SpouseName[0]', dob: 'SpouseDOB[0]', cob: 'SpouseCOB[0]', address: 'SpouseAddress[0]', occupation: 'SpouseOccupation[0]', marital: 'ChildMStatus[0]', yes: 'SpouseYes[0]', no: 'SpouseNo[0]' },
      'Spouse / partner',
      file.spouse,
    ),
  );

  // Section A — Mother.
  values.push(
    ...section(
      `${P}SectionA[0].Mother[0].`,
      { name: 'MotherName[0]', dob: 'MotherDOB[0]', cob: 'MotherCOB[0]', address: 'MotherAddress[0]', occupation: 'MotherOccupation[0]', marital: 'ChildMStatus[0]', yes: 'MotherYes[0]', no: 'MotherNo[0]' },
      'Mother',
      file.mother,
    ),
  );

  // Section A — Father.
  values.push(
    ...section(
      `${P}SectionA[0].Father[0].`,
      { name: 'FatherName[0]', dob: 'FatherDOB[0]', cob: 'FatherCOB[0]', address: 'FatherAddress[0]', occupation: 'FatherOccupation[0]', marital: 'ChildMStatus[0]', yes: 'FatherYes[0]', no: 'FatherNo[0]' },
      'Father',
      file.father,
    ),
  );

  // Section B — Children of the applicant (4 slots on page 1).
  const childNames = (i: number) => ({
    name: 'ChildName[0]', relationship: 'ChildRelationship[0]', dob: 'ChildDOB[0]',
    cob: 'ChildCOB[0]', address: 'ChildAddress[0]', occupation: 'ChildOccupation[0]',
    marital: 'ChildMStatus[0]', yes: 'ChildYes[0]', no: 'ChildNo[0]',
  });
  file.children.slice(0, 4).forEach((child, i) => {
    values.push(
      ...section(`${P}SectionB[0].Child[${i}].`, childNames(i), `Child ${i + 1}`, child),
    );
  });
  if (file.children.length > 4) {
    values.push({
      field: '__overflow_children__', value: String(file.children.length - 4),
      label: `${file.children.length - 4} extra child(ren) need a continuation sheet`,
      source: 'derived', needsReview: true,
    });
  }

  // Section C — Brothers & sisters (7 slots on page 2).
  file.siblings.slice(0, 7).forEach((sib, i) => {
    values.push(
      ...section(`${P}SectionC[0].Child[${i}].`, childNames(i), `Sibling ${i + 1}`, sib),
    );
  });
  if (file.siblings.length > 7) {
    values.push({
      field: '__overflow_siblings__', value: String(file.siblings.length - 7),
      label: `${file.siblings.length - 7} extra sibling(s) need a continuation sheet`,
      source: 'derived', needsReview: true,
    });
  }

  // Drop the internal overflow markers from the values that get written to the PDF.
  return values.filter((v) => !v.field.startsWith('__'));
}
