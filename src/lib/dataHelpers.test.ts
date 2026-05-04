import { describe, expect, it } from "vitest";
import {
  buildChartRows,
  buildTableRows,
  getAgeGroups,
  getCountries,
  getIndicators,
  getSummaryTypes,
} from "./dataHelpers";
import type { DataRow } from "../types/exercise";

/**
 * Small mock dataset used to test data transformation logic.
 *
 * It includes:
 - multiple countries
 - multiple regions
 - multiple age groups
 - different summary types
 - numeric and null indicator values
 */
const mockData: DataRow[] = [
  {
    admin0Id: "AGO",
    admin2Id: "AGO.1_1",
    age: "0_4",
    summaryType: "mean",
    forceOfInfection: 1.2,
    hospitalAdmissions: 10,
  },
  {
    admin0Id: "AGO",
    admin2Id: "AGO.1_2",
    age: "5_9",
    summaryType: "mean",
    forceOfInfection: 2.5,
    hospitalAdmissions: 20,
  },
  {
    admin0Id: "BRA",
    admin2Id: "BRA.1_1",
    age: "0_4",
    summaryType: "standardDeviation",
    forceOfInfection: 0.5,
    hospitalAdmissions: null,
  },
];

/**
 * Unit tests for dataset helper functions.
 *
 * These functions are the core logic of the application:
 * they detect filters, identify indicators dynamically, and prepare data
 * for the table and chart components.
*/
describe("dataHelpers", () => {
  it("extracts unique country IDs", () => {
    expect(getCountries(mockData)).toEqual(["AGO", "BRA"]);
  });

  it("extracts age groups for selected country", () => {
    expect(getAgeGroups(mockData, "AGO")).toEqual(["0_4", "5_9"]);
  });

  it("extracts summary types for selected country", () => {
    expect(getSummaryTypes(mockData, "AGO")).toEqual(["mean"]);
  });

  it("detects indicator columns dynamically", () => {
    expect(getIndicators(mockData)).toEqual([
      "forceOfInfection",
      "hospitalAdmissions",
    ]);
  });

  it("builds filtered table rows", () => {
    const rows = buildTableRows(
      mockData,
      "AGO",
      "0_4",
      "mean",
      ["forceOfInfection", "hospitalAdmissions"]
    );

    expect(rows).toEqual([
      {
        regionId: "AGO.1_1",
        age: "0_4",
        summaryType: "mean",
        values: {
          forceOfInfection: 1.2,
          hospitalAdmissions: 10,
        },
      },
    ]);
  });

  it("builds chart rows for selected indicator", () => {
    const tableRows = buildTableRows(
      mockData,
      "AGO",
      "5_9",
      "mean",
      ["forceOfInfection", "hospitalAdmissions"]
    );

    expect(buildChartRows(tableRows, "forceOfInfection")).toEqual([
      {
        regionId: "AGO.1_2",
        value: 2.5,
      },
    ]);
  });
});