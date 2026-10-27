import { describe, expect, it } from "vitest";
import { ntn } from "../src/ntn.js";

describe("ntn", () => {
  it("accepts 8-digit and 13-digit forms", () => {
    expect(ntn.isValid("1234567-8")).toBe(true);
    expect(ntn.isValid("12345678")).toBe(true);
    expect(ntn.isValid("35202-1234567-1")).toBe(true);
  });

  it.each(["1234567", "123456789", "ABC45678", "", null, 12345678])("rejects malformed input %s", (value) => {
    expect(ntn.isValid(value)).toBe(false);
  });

  it("formats both supported shapes", () => {
    expect(ntn.format("12345678")).toBe("1234567-8");
    expect(ntn.format("3520212345671")).toBe("35202-1234567-1");
    expect(ntn.format("bad")).toBeNull();
  });
});
