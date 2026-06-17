// Shared types for the Form Filler CA tool.
// Everything here is framework-agnostic and browser-safe (no Node APIs).

/** A person parsed deterministically from a passport MRZ (check-digit validated). */
export interface PassportIdentity {
  surname: string;
  givenNames: string;
  /** "SURNAME, Given Names" — the format IRCC forms expect. */
  fullName: string;
  passportNumber: string;
  /** ISO 3166 alpha-3 as printed in the MRZ (e.g. "IND"). */
  nationalityCode: string;
  /** Human-readable country (e.g. "India"), resolved from the code when known. */
  nationality: string;
  /** YYYY-MM-DD */
  dateOfBirth: string;
  sex: 'M' | 'F' | 'X' | '';
  /** YYYY-MM-DD */
  expiryDate: string;
  /** Every MRZ check digit passed. If false, do not trust the values. */
  valid: boolean;
  /** Per-field confidence/validity notes for the review UI. */
  warnings: string[];
}

/** A relative entered/derived for the family-information form (IMM 5645). */
export interface FamilyMember {
  /** "SURNAME, Given" */
  fullName: string;
  /** YYYY-MM-DD or free text if unknown. */
  dateOfBirth: string;
  countryOfBirth: string;
  /** Present address (city, country). */
  address: string;
  occupation: string;
  maritalStatus: MaritalStatus | '';
  /** Relationship to the applicant (Section B/C only): "Son", "Daughter", "Brother"... */
  relationship?: string;
  /** "Will this person accompany the applicant to Canada?" */
  accompanying?: boolean | null;
}

export type MaritalStatus =
  | 'Annulled marriage'
  | 'Common-law'
  | 'Divorced'
  | 'Legally separated'
  | 'Married'
  | 'Married-physically present'
  | 'Married-not physically present'
  | 'Single'
  | 'Widowed';

/** The complete data bag a user assembles before mapping it onto forms. */
export interface ApplicantFile {
  applicant: FamilyMember;
  spouse?: FamilyMember;
  mother?: FamilyMember;
  father?: FamilyMember;
  /** Children of the applicant (Section B). */
  children: FamilyMember[];
  /** Siblings of the applicant (Section C). */
  siblings: FamilyMember[];
  /** Application type the applicant is in Canada / applying for. */
  applicationType?: 'Visitor' | 'Worker' | 'Student' | 'Other';
  /** Raw passport parse kept for the review screen + audit. */
  passport?: PassportIdentity;
}

/** A single value destined for a named PDF form field, with provenance for review. */
export interface FieldValue {
  /** Fully-qualified PDF field name. */
  field: string;
  value: string | boolean;
  /** Where the value came from — shown in the review gate. */
  source: 'passport-mrz' | 'user-entered' | 'derived' | 'ocr';
  /** Human label for the review UI. */
  label: string;
  /** True if this should be double-checked (low OCR confidence, inferred, etc.). */
  needsReview?: boolean;
}

/** Result of filling one form. */
export interface FillResult {
  formId: string;
  formTitle: string;
  /** 'acroform' = we wrote the PDF directly; 'xfa-import' = we produced a data file for Adobe. */
  method: 'acroform' | 'xfa-import' | 'guided';
  /** The filled PDF (acroform) or the import data file (xfa-import). */
  output: Uint8Array;
  /** Suggested download filename. */
  filename: string;
  /** MIME type of `output`. */
  contentType: string;
  /** Field values applied, for the review screen. */
  values: FieldValue[];
  /** User-facing notes (e.g. "open in Adobe Reader and Import Data"). */
  notes: string[];
}

/** Definition of a supported form in the registry. */
export interface FormDefinition {
  id: string;
  title: string;
  /** How this form gets filled. */
  method: 'acroform' | 'xfa-import' | 'guided';
  /** Path to the bundled template, relative to the form folder. */
  templatePath: string;
  /** Map an ApplicantFile onto concrete field values for this form. */
  map: (file: ApplicantFile) => FieldValue[];
  /** True when this form is required for a standard super visa application. */
  superVisaRequired: boolean;
}
