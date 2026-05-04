import type { Metadata, TableRow } from "../types/exercise";
import { getIndicatorLabel } from "../lib/dataHelpers";
import { formatValue } from "../lib/format";

type Props = {
  rows: TableRow[];
  indicators: string[];
  metadata: Metadata;
};

/*
* Displays dengue indicator values in a table.
* Indicator columns are generated dynamically from the dataset rather than
* hardcoded. This allows new indicators in future data versions to appear
* automatically in the UI.
*/
export function IndicatorTable({ rows, indicators, metadata }: Props) {
  return (
    <section>
      <h2>Indicator table</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Region ID</th>
              <th>Age group</th>
              <th>Summary type</th>
              {indicators.map((indicator) => (
                <th key={indicator}>{getIndicatorLabel(indicator, metadata)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.regionId}-${row.age}-${row.summaryType}`}>
                <td>{row.regionId}</td>
                <td>{row.age}</td>
                <td>{row.summaryType}</td>

                {indicators.map((indicator) => (
                  <td key={indicator}>{formatValue(row.values[indicator])}</td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3 + indicators.length}>No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}