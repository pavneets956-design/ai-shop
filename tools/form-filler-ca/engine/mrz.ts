// Deterministic passport parsing from the Machine Readable Zone (MRZ).
// No AI: the MRZ has check digits, so identity data either validates or it doesn't.
// A transposed digit fails a real visa application — a model must never touch these fields.

import { parse as parseMrz } from 'mrz';
import type { PassportIdentity } from './types';

// Minimal ISO 3166 alpha-3 -> country name map for the nationalities we commonly see.
// Unknown codes fall back to the raw code (shown to the user to confirm/edit).
const COUNTRY: Record<string, string> = {
  IND: 'India',
  CAN: 'Canada',
  USA: 'United States',
  GBR: 'United Kingdom',
  PAK: 'Pakistan',
  PHL: 'Philippines',
  CHN: 'China',
  NGA: 'Nigeria',
  MEX: 'Mexico',
  IRN: 'Iran',
  LKA: 'Sri Lanka',
  BGD: 'Bangladesh',
  NPL: 'Nepal',
  FRA: 'France',
  DEU: 'Germany',
  AUS: 'Australia',
  ZAF: 'South Africa',
  BRA: 'Brazil',
  KEN: 'Kenya',
  UKR: 'Ukraine',
};

/** Convert an MRZ YYMMDD date to YYYY-MM-DD, inferring the century. */
function expandDate(yymmdd: string | null | undefined, kind: 'birth' | 'expiry'): string {
  if (!yymmdd || !/^\d{6}$/.test(yymmdd)) return '';
  const yy = Number(yymmdd.slice(0, 2));
  const mm = yymmdd.slice(2, 4);
  const dd = yymmdd.slice(4, 6);
  // Birth dates are in the past; expiry dates are near-future. Pivot accordingly.
  const century = kind === 'birth' ? (yy > 30 ? 1900 : 2000) : 2000;
  return `${century + yy}-${mm}-${dd}`;
}

function formatName(surname: string, given: string): string {
  const s = (surname || '').replace(/\s+/g, ' ').trim();
  const g = (given || '').replace(/\s+/g, ' ').trim();
  // Title-case to match how IRCC forms display names, but keep surname uppercase.
  const titleGiven = g
    .toLowerCase()
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
  return s ? `${s.toUpperCase()}, ${titleGiven}` : titleGiven;
}

/**
 * Parse the two/three MRZ lines from a passport into a validated identity.
 * Accepts the raw MRZ text (newline-separated) as read by OCR or pasted.
 */
export function parsePassportMrz(rawMrz: string): PassportIdentity {
  const lines = rawMrz
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, '').toUpperCase())
    .filter((l) => l.length > 20);

  const warnings: string[] = [];
  const empty: PassportIdentity = {
    surname: '',
    givenNames: '',
    fullName: '',
    passportNumber: '',
    nationalityCode: '',
    nationality: '',
    dateOfBirth: '',
    sex: '',
    expiryDate: '',
    valid: false,
    warnings,
  };

  if (lines.length < 2) {
    warnings.push('Could not find the two machine-readable lines at the bottom of the passport.');
    return empty;
  }

  let result;
  try {
    result = parseMrz(lines.slice(-2)); // last two lines are the TD3 passport MRZ
  } catch (e) {
    warnings.push('The machine-readable zone could not be read. Try a clearer, straight scan.');
    return empty;
  }

  const f = result.fields;
  const surname = f.lastName || '';
  const given = f.firstName || '';
  const sexRaw = (f.sex || '').toUpperCase();
  const sex = sexRaw === 'MALE' ? 'M' : sexRaw === 'FEMALE' ? 'F' : (sexRaw[0] as PassportIdentity['sex']) || '';

  // Surface each failed check digit so the user knows exactly which field to verify.
  if (!result.valid) {
    for (const d of result.details) {
      if (d.valid === false) {
        warnings.push(`Check digit failed for "${d.label}" — verify this field against the passport.`);
      }
    }
  }

  const code = (f.nationality || '').toUpperCase();

  return {
    surname,
    givenNames: given,
    fullName: formatName(surname, given),
    passportNumber: (f.documentNumber || '').toUpperCase(),
    nationalityCode: code,
    nationality: COUNTRY[code] || code,
    dateOfBirth: expandDate(f.birthDate, 'birth'),
    sex,
    expiryDate: expandDate(f.expirationDate, 'expiry'),
    valid: result.valid,
    warnings,
  };
}
