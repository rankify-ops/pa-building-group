/**
 * Australian numbers only: mobiles 04, landlines 02/03/07/08,
 * 1300/1800 and 13, with optional +61. Letters are rejected.
 */
export function isAustralianPhone(value) {
  if (typeof value !== "string") return false;
  const raw = value.trim();
  if (!raw) return false;
  if (/[A-Za-z]/.test(raw)) return false;
  if (/[^0-9+\s().-]/.test(raw)) return false;

  let digits = raw.replace(/\D/g, "");
  const plus = raw.charAt(0) === "+";
  if (plus) {
    if (!digits.startsWith("61")) return false;
    digits = `0${digits.slice(2)}`;
  } else if (digits.startsWith("61") && digits.length === 11) {
    digits = `0${digits.slice(2)}`;
  }

  if (/^0[23478]\d{8}$/.test(digits)) return true;
  if (/^1[38]00\d{6}$/.test(digits)) return true;
  if (/^13\d{4}$/.test(digits)) return true;
  return false;
}

export const PHONE_ERROR = "Enter an Australian phone number, with no letters.";
