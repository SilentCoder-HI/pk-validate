import { describe, expect, it } from "vitest";
import { iban } from "../src/iban.js";

describe("iban", () => {
  const valid = "PK36SCBL0000001123456702";

  it("accepts valid IBAN shape and checksum across casing and spacing", () => {
    expect(iban.isValid(valid)).toBe(true);
    expect(iban.isValid("pk36scbl0000001123456702")).toBe(true);
    expect(iban.isValid("PK36 SCBL 0000 0011 2345 6702")).toBe(true);
    expect(iban.isValid("PK93HABB0000000000000001")).toBe(true);
  });

  it("rejects checksum errors and malformed input", () => {
    for (const value of [
      "PK37SCBL0000001123456702",
      "PK36SCBL000000112345670",
      "PK36SCBL00000011234567022",
      "GB36SCBL0000001123456702",
      "PK36SCB10000001123456702",
      "",
      null,
      123,
    ]) {
      expect(iban.isValid(value)).toBe(false);
    }
  });

  it("formats and extracts the bank code only for a valid IBAN", () => {
    expect(iban.format(valid)).toBe("PK36 SCBL 0000 0011 2345 6702");
    expect(iban.bankCode(valid)).toBe("SCBL");
    expect(iban.format("bad")).toBeNull();
    expect(iban.bankCode("bad")).toBeNull();
  });
});
