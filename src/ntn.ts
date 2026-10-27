function toDigits(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const digits = value.trim().replace(/[\s-]/g, "");
  return /^\d{8}$/.test(digits) || /^\d{13}$/.test(digits) ? digits : null;
}

/** Structural NTN format helpers; they do not confirm FBR registration. */
export const ntn = {
  /** Accepts an 8-digit NTN or a 13-digit CNIC-based individual NTN. */
  isValid(value: unknown): boolean {
    return toDigits(value) !== null;
  },

  /** Formats 8 digits as 1234567-8 and 13 as a CNIC; otherwise returns null. */
  format(value: unknown): string | null {
    const digits = toDigits(value);
    if (!digits) return null;
    return digits.length === 8
      ? `${digits.slice(0, 7)}-${digits.slice(7)}`
      : `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
  },
};
