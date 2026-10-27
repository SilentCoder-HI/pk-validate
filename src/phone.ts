const LOCAL_MOBILE = /^03\d{9}$/;
const INTERNATIONAL_MOBILE = /^923\d{9}$/;

function compact(value: string): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^[+\d\s().-]+$/.test(trimmed)) return null;
  let digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) {
    if (!digits.startsWith("92")) return null;
  } else if (digits.startsWith("0092")) {
    digits = digits.slice(2);
  }
  return digits;
}

/** Pakistani mobile number utilities; checks shape, not assignment or reachability. */
export const phone = {
  /** Accepts 03xxxxxxxxx, +923xxxxxxxxx, or 00923xxxxxxxxx with common separators. */
  isValid(value: string): boolean {
    const digits = compact(value);
    return digits !== null && (LOCAL_MOBILE.test(digits) || INTERNATIONAL_MOBILE.test(digits));
  },

  /** Returns an E.164 number (+923xxxxxxxxx), or null when the shape is invalid. */
  normalize(value: string): string | null {
    const digits = compact(value);
    if (!digits) return null;
    if (LOCAL_MOBILE.test(digits)) return `+92${digits.slice(1)}`;
    if (INTERNATIONAL_MOBILE.test(digits)) return `+${digits}`;
    return null;
  },

  /** Returns the local display format 03xx-xxxxxxx, or null when invalid. */
  format(value: string): string | null {
    const normalized = this.normalize(value);
    if (!normalized) return null;
    const local = `0${normalized.slice(3)}`;
    return `${local.slice(0, 4)}-${local.slice(4)}`;
  },
};
