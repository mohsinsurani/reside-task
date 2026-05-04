import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Metadata, TableRow } from "../types/exercise";
import { buildChartRows, getIndicatorLabel } from "../lib/dataHelpers";

type Props = {
  rows: TableRow[];
  selectedIndicator: string;
  metadata: Metadata;
};



/*
 * Shows a non-geographical visualisation of the selected indicator.
 * The chart ranks regions by indicator value and displays the top 20.
 * This helps public health users quickly identify regions with higher
 * dengue-related indicator values.
*/
export function IndicatorChart({ rows, selectedIndicator, metadata }: Props) {
  const chartRows = buildChartRows(rows, selectedIndicator).slice(0, 20);
  const label = getIndicatorLabel(selectedIndicator, metadata);

  return (
    <section>
      <h2>Top regions by selected indicator</h2>
      <p className="muted">
        Showing the top 20 regions for <strong>{label}</strong>.
      </p>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={chartRows} margin={{ top: 20, right: 24, bottom: 80, left: 32 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="regionId" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}