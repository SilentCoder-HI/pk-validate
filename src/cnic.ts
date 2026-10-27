const CNIC_DIGITS = /^\d{13}$/;
const CNIC_FORMATTED = /^\d{5}-\d{7}-\d$/;

function digitsOnly(value: string): string {
  return value.replace(/-/g, "");
}

function hasCnicShape(value: string): boolean {
  return CNIC_DIGITS.test(value) || CNIC_FORMATTED.test(value);
}

/** Structural CNIC utilities. These functions do not verify identity or issuance. */
export const cnic = {
  /** Returns true for 13 digits, optionally formatted as 12345-1234567-1. */
  isValid(value: string): boolean {
    return typeof value === "string" && hasCnicShape(value);
  },

  /** Returns the canonical dashed representation, or null when the shape is invalid. */
  normalize(value: string): string | null {
    if (typeof value !== "string" || !hasCnicShape(value)) return null;
    const digits = digitsOnly(value);
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits[12]}`;
  },

  /** Alias for normalize: CNICs use the same canonical display format. */
  format(value: string): string | null {
    return this.normalize(value);
  },

  /** Masks the middle seven digits; returns null when the shape is invalid. */
  mask(value: string): string | null {
    const normalized = this.normalize(value);
    return normalized ? `${normalized.slice(0, 6)}*******-${normalized.at(-1)}` : null;
  },
};
