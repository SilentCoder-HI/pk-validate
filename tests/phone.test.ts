import { describe, expect, it } from "vitest";
import { phone } from "../src/phone.js";

describe("phone", () => {
  it.each([
    ["0300-1234567", "+923001234567"],
    ["+92 300 1234567", "+923001234567"],
    ["0092-300-1234567", "+923001234567"],
    ["03001234567", "+923001234567"],
  ])("normalizes %s", (value, expected) => {
    expect(phone.isValid(value)).toBe(true);
    expect(phone.normalize(value)).toBe(expected);
  });

  it.each(["0300123456", "04001234567", "+1 300 1234567", "92300123456", "0300abc4567"]) (
    "rejects malformed phone %s",
    (value) => expect(phone.isValid(value)).toBe(false),
  );

  it("formats local presentation", () => {
    expect(phone.format("+923001234567")).toBe("0300-1234567");
  });
});
