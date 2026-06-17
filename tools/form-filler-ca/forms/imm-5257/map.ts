// IMM 5257 (Application for a Temporary Resident Visa) — guided map.
//
// IMM 5257 is an XFA "dynamic" form: its field layer renders only in Adobe, so no
// browser library can reliably WRITE it. Rather than risk a silently-wrong write to
// a real visa application, the free tier produces a GUIDED value sheet — every answer
// the form asks for, pre-computed from the passport + applicant data and clearly
// labelled — so the user fills the official 5257 in free Adobe Reader in a couple of
// minutes instead of researching each field cold.
//
// One-click 5257 auto-fill (writing the XFA datasets) is the Pro/server tier, which
// uses an Adobe-grade engine that can read the XFA schema.

import type { ApplicantFile, FieldValue } from '../../engine/types';

export function mapImm5257(file: ApplicantFile): FieldValue[] {
  const a = file.applicant;
  const pp = file.passport;
  const out: FieldValue[] = [];
  const add = (
    label: string,
    value: string | boolean,
    source: FieldValue['source'] = 'user-entered',
    needsReview = false,
  ) => {
    if (value === '' || value == null) return;
    out.push({ field: `guided:${label}`, value, label, source, needsReview });
  };

  // Identity block — straight from the passport MRZ (check-digit validated).
  add('Full name (Family name, Given name)', a.fullName, pp ? 'passport-mrz' : 'user-entered');
  add('Sex', pp?.sex || '', pp ? 'passport-mrz' : 'user-entered');
  add('Date of birth (YYYY-MM-DD)', a.dateOfBirth, pp ? 'passport-mrz' : 'user-entered');
  add('Country of birth', a.countryOfBirth, pp ? 'passport-mrz' : 'user-entered');
  add('Citizenship', pp?.nationality || '', pp ? 'passport-mrz' : 'user-entered');
  add('Current marital status', a.maritalStatus || '', 'user-entered');

  // Passport block.
  add('Passport number', pp?.passportNumber || '', pp ? 'passport-mrz' : 'user-entered');
  add('Passport country of issue', pp?.nationality || '', pp ? 'passport-mrz' : 'user-entered', true);
  add('Passport expiry date (YYYY-MM-DD)', pp?.expiryDate || '', pp ? 'passport-mrz' : 'user-entered');

  // Contact / residence — user-supplied.
  add('Present address', a.address, 'user-entered');
  add('Current occupation', a.occupation, 'user-entered');

  return out;
}
