import { describe, expect, it } from "vitest";
import { cnic } from "../src/cnic.js";

describe("cnic", () => {
  it.each(["3520212345671", "35202-1234567-1"])("validates %s", (value) => {
    expect(cnic.isValid(value)).toBe(true);
    expect(cnic.normalize(value)).toBe("35202-1234567-1");
  });

  it.each(["3520-1234567-1", "352021234567", "35202-1234567-x", "35202 1234567 1"]) (
    "rejects malformed CNIC %s",
    (value) => expect(cnic.isValid(value)).toBe(false),
  );

  it("masks and formats structurally without interpreting digits", () => {
    expect(cnic.mask("35202-1234567-1")).toBe("35202-*******-1");
    expect(cnic.format("3520212345671")).toBe("35202-1234567-1");
  });
});
