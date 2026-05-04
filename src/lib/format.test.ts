import { describe, expect, it } from "vitest";
import { formatValue } from "./format";



/**
 * Unit tests for display formatting.
 *
 * These tests ensure raw data values are presented consistently in the UI,
 * especially missing values and decimal numbers.
*/
describe("formatValue", () => {
  it("returns dash for null or empty values", () => {
    expect(formatValue(null)).toBe("-");
    expect(formatValue("")).toBe("-");
  });

  it("formats integers without decimals", () => {
    expect(formatValue(10)).toBe("10");
  });

  it("formats decimal numbers to 3 decimal places", () => {
    expect(formatValue(8.14625)).toBe("8.146");
  });

  it("formats numeric strings", () => {
    expect(formatValue("4.56789")).toBe("4.568");
  });

  it("returns non-numeric strings unchanged", () => {
    expect(formatValue("standardDeviation")).toBe("standardDeviation");
  });
});