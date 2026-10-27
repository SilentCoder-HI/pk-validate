/** Pakistani postal-code format helper; it does not confirm that a code exists. */
export const postalCode = {
  /** Accepts exactly five digits, with no leading zero (surrounding spaces ignored). */
  isValid(value: unknown): boolean {
    return typeof value === "string" && /^[1-9]\d{4}$/.test(value.trim());
  },
};
