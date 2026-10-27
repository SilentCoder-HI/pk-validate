import { describe, expect, it } from "vitest";
import { postalCode } from "../src/postalCode.js";

describe("postalCode", () => {
  it("accepts five-digit codes with surrounding whitespace", () => {
    expect(postalCode.isValid("44000")).toBe(true);
    expect(postalCode.isValid(" 54000 ")).toBe(true);
  });

  it.each(["4400", "440000", "04400", "44A00", 44000, null])("rejects malformed input %s", (value) => {
    expect(postalCode.isValid(value)).toBe(false);
  });
});
