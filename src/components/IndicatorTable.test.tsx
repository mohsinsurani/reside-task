import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { IndicatorTable } from "./IndicatorTable";
import type { Metadata, TableRow } from "../types/exercise";

/**
 * Table rows used to test rendering of region-level indicator values.
*/
const rows: TableRow[] = [
  {
    regionId: "AGO.1_1",
    age: "0_4",
    summaryType: "mean",
    values: {
      forceOfInfection: 1.23456,
      hospitalAdmissions: 10,
    },
  },
];

/**
 * Metadata used to verify that indicator labels are shown instead of raw keys.
*/
const metadata: Metadata = {
  indicators: {
    forceOfInfection: {
      label: "Force of infection",
    },
    hospitalAdmissions: {
      label: "Hospital admissions",
    },
  },
};

/**
 * Component tests for the indicator table.
 *
 * These tests verify that the table:
 - uses metadata labels for indicator headers
 - displays formatted values
 - shows a useful empty state when no rows match the filters
*/
describe("IndicatorTable", () => {
  it("renders table headers using metadata labels", () => {
    render(
      <IndicatorTable
        rows={rows}
        indicators={["forceOfInfection", "hospitalAdmissions"]}
        metadata={metadata}
      />
    );

    expect(screen.getByText("Region ID")).toBeInTheDocument();
    expect(screen.getByText("Force of infection")).toBeInTheDocument();
    expect(screen.getByText("Hospital admissions")).toBeInTheDocument();
  });

  it("renders row values", () => {
    render(
      <IndicatorTable
        rows={rows}
        indicators={["forceOfInfection", "hospitalAdmissions"]}
        metadata={metadata}
      />
    );

    expect(screen.getByText("AGO.1_1")).toBeInTheDocument();
    expect(screen.getByText("0_4")).toBeInTheDocument();
    expect(screen.getByText("mean")).toBeInTheDocument();
    expect(screen.getByText("1.235")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("shows empty message when no rows are available", () => {
    render(
      <IndicatorTable
        rows={[]}
        indicators={["forceOfInfection"]}
        metadata={metadata}
      />
    );

    expect(screen.getByText("No data available.")).toBeInTheDocument();
  });
});