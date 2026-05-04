/**
Formats table values for display.
- Missing values are shown as "-"
- Integers are shown without decimal places
- Decimal values are rounded to 3 decimal places
- Non-numeric text is returned unchanged
*/
export function formatValue(value: string | number | null): string {
  if (value === null || value === undefined || value === "") return "-";

  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toFixed(3);
  }

  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return Number.isInteger(numeric) ? String(numeric) : numeric.toFixed(3);
  }

  return value;
}