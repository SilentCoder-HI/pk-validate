function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.replace(/\s/g, "").toUpperCase();
}

function mod97(input: string): number {
  let remainder = 0;
  for (const character of input) {
    const expanded = character >= "A" && character <= "Z"
      ? String(character.charCodeAt(0) - 55)
      : character;
    for (const digit of expanded) {
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
  }
  return remainder;
}

function hasValidShape(iban: string): boolean {
  return /^PK\d{2}[A-Z]{4}[A-Z0-9]{16}$/.test(iban);
}

/** Pakistani IBAN structural and mod-97 checksum helpers; not account verification. */
export const iban = {
  /** Accepts 24-character Pakistani IBANs with optional whitespace and case variation. */
  isValid(value: unknown): boolean {
    const normalized = clean(value);
    if (!normalized || !hasValidShape(normalized)) return false;
    return mod97(normalized.slice(4) + normalized.slice(0, 4)) === 1;
  },

  /** Returns a valid IBAN in four-character groups, or null for invalid input. */
  format(value: unknown): string | null {
    const normalized = clean(value);
    if (!normalized || !hasValidShape(normalized) || mod97(normalized.slice(4) + normalized.slice(0, 4)) !== 1) {
      return null;
    }
    return normalized.match(/.{1,4}/g)?.join(" ") ?? null;
  },

  /** Returns the bank code from a valid IBAN, or null for invalid input. */
  bankCode(value: unknown): string | null {
    const normalized = clean(value);
    return normalized && hasValidShape(normalized) && mod97(normalized.slice(4) + normalized.slice(0, 4)) === 1
      ? normalized.slice(4, 8)
      : null;
  },
};
