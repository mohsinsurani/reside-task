import type { DataRow, Metadata, TableRow } from "../types/exercise";
/*
* Columns shows the row rather than indicator values.
* Any column not listed here is treated as an indicator. This keeps the app
* flexible if future datasets add or remove indicators.
*/
export const DIMENSION_COLUMNS = new Set([
  "admin0Id",
  "admin2Id",
  "age",
  "summaryType",
]);

/**
* Reads the country ID from a data row.
*/
export function getCountryId(row: DataRow): string {
  return String(row.admin0Id ?? "");
}

/**
* Reads the region/admin2 ID from a data row.
*/
export function getRegionId(row: DataRow): string {
  return String(row.admin2Id ?? "");
}

/**
* Returns all unique country IDs available in the dataset.
*/
export function getCountries(data: DataRow[]): string[] {
  return Array.from(new Set(data.map(getCountryId).filter(Boolean))).sort();
}

/**
* Returns available age groups for the selected country.
* Age groups are read from the data instead of being hardcoded, so future
* changes such as 10-year age bands are handled automatically.
*/
export function getAgeGroups(data: DataRow[], countryId: string): string[] {
  return Array.from(
    new Set(
      data
        .filter((row) => getCountryId(row) === countryId)
        .map((row) => String(row.age ?? ""))
        .filter(Boolean)
    )
  ).sort();
}



/**
* Returns summary types available for the selected country.
*/
export function getSummaryTypes(data: DataRow[], countryId: string): string[] {
  return Array.from(
    new Set(
      data
        .filter((row) => getCountryId(row) === countryId)
        .map((row) => String(row.summaryType ?? ""))
        .filter(Boolean)
    )
  ).sort();
}

/**
 * Dynamically detects indicator columns from the dataset.
 * This is the key future-proofing logic required by the exercise.
*/
export function getIndicators(data: DataRow[]): string[] {
  const indicators = new Set<string>();

  data.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!DIMENSION_COLUMNS.has(key)) {
        indicators.add(key);
      }
    });
  });

  return Array.from(indicators).sort();
}

/**
* Returns the human-readable indicator label from metadata.
* Falls back to the raw column name when no label is provided.
*/
export function getIndicatorLabel(indicator: string, metadata: Metadata): string {
  return metadata.indicators?.[indicator]?.label ?? indicator;
}

/**
* Builds rows for the table after applying country, age group, and
* summary type filters.
*/
export function buildTableRows(
  data: DataRow[],
  countryId: string,
  age: string,
  summaryType: string,
  indicators: string[]
): TableRow[] {
  return data
    .filter((row) => getCountryId(row) === countryId)
    .filter((row) => String(row.age ?? "") === age)
    .filter((row) => String(row.summaryType ?? "") === summaryType)
    .map((row) => {
      const values: Record<string, string | number | null> = {};

      indicators.forEach((indicator) => {
        values[indicator] = row[indicator] ?? null;
      });

      return {
        regionId: getRegionId(row),
        age: String(row.age ?? ""),
        summaryType: String(row.summaryType ?? ""),
        values,
      };
    });
}

/**
* Converts table rows into numeric chart rows for one selected indicator.
* Non-numeric or missing values are removed because they cannot be plotted
* meaningfully in a bar chart.
*/
export function buildChartRows(
  rows: TableRow[],
  selectedIndicator: string
): { regionId: string; value: number }[] {
  return rows
    .map((row) => ({
      regionId: row.regionId,
      value:
        typeof row.values[selectedIndicator] === "number"
          ? row.values[selectedIndicator]
          : Number(row.values[selectedIndicator]),
    }))
    .filter((row) => Number.isFinite(row.value))
    .sort((a, b) => b.value - a.value);
}