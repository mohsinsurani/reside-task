import { useEffect, useMemo, useState } from "react";
import { FilterSelect } from "./components/FilterSelect";
import { IndicatorChart } from "./components/IndicatorChart";
import { IndicatorTable } from "./components/IndicatorTable";
import {
  buildTableRows,
  getAgeGroups,
  getCountries,
  getIndicators,
  getSummaryTypes,
} from "./lib/dataHelpers";
import type { DataRow, Metadata } from "./types/exercise";
import "./index.css";

/**
 * Main application component.
 * Tasks:
 1. Load local JSON data and metadata
 2. Store selected filter values
 3. Derive country, age group, summary type, and indicator options
 4. Render the table and optional chart visualisation
 */
function App() {
  const [data, setData] = useState<DataRow[]>([]);
  const [metadata, setMetadata] = useState<Metadata>({});

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedSummaryType, setSelectedSummaryType] = useState("");
  const [selectedIndicator, setSelectedIndicator] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  /**
   * Loads exercise data once when the app starts.
   *
   * The first available country, age group, summary type, and indicator are
   * selected automatically so the user immediately sees results.
   */
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const [dataResponse, metadataResponse] = await Promise.all([
        fetch("/exerciseData.json"),
        fetch("/exerciseMetadata.json"),
      ]);

      const dataJson: DataRow[] = await dataResponse.json();
      const metadataJson: Metadata = await metadataResponse.json();

      setData(dataJson);
      setMetadata(metadataJson);

      const countries = getCountries(dataJson);
      const firstCountry = countries[0] ?? "";

      const ages = getAgeGroups(dataJson, firstCountry);
      const summaries = getSummaryTypes(dataJson, firstCountry);
      const indicators = getIndicators(dataJson);

      setSelectedCountry(firstCountry);
      setSelectedAge(ages[0] ?? "");
      setSelectedSummaryType(summaries[0] ?? "");
      setSelectedIndicator(indicators[0] ?? "");

      setIsLoading(false);
    }

    loadData();
  }, []);

  /**
   * Derived filter options.
   *
   * useMemo avoids recalculating these values on every render unless the
   * underlying data or selected country changes.
   */
  const countries = useMemo(() => getCountries(data), [data]);

  const ageGroups = useMemo(
    () => getAgeGroups(data, selectedCountry),
    [data, selectedCountry]
  );

  const summaryTypes = useMemo(
    () => getSummaryTypes(data, selectedCountry),
    [data, selectedCountry]
  );

  const indicators = useMemo(() => getIndicators(data), [data]);

  /**
   * Rows displayed in the table and used by the chart.
   */
  const tableRows = useMemo(
    () =>
      buildTableRows(
        data,
        selectedCountry,
        selectedAge,
        selectedSummaryType,
        indicators
      ),
    [data, selectedCountry, selectedAge, selectedSummaryType, indicators]
  );

  /**
   * When country changes, reset dependent filters to valid values for
   * the newly selected country.
   */
  function handleCountryChange(country: string) {
    const ages = getAgeGroups(data, country);
    const summaries = getSummaryTypes(data, country);

    setSelectedCountry(country);
    setSelectedAge(ages[0] ?? "");
    setSelectedSummaryType(summaries[0] ?? "");
  }

  if (isLoading) {
    return (
      <main className="app">
        <h1>Dengue Infection Indicators</h1>
        <p>Loading indicator data...</p>
      </main>
    );
  }

  return (
    <main className="app">
      <header>
        <h1>Dengue Infection Indicators</h1>
        <p>View dengue infection indicator values for regions by country.</p>
      </header>

      <section className="filters">
        <FilterSelect
          label="Country"
          value={selectedCountry}
          options={countries}
          onChange={handleCountryChange}
        />

        <FilterSelect
          label="Age group"
          value={selectedAge}
          options={ageGroups}
          onChange={setSelectedAge}
        />

        <FilterSelect
          label="Summary type"
          value={selectedSummaryType}
          options={summaryTypes}
          onChange={setSelectedSummaryType}
        />

        <FilterSelect
          label="Chart indicator"
          value={selectedIndicator}
          options={indicators}
          onChange={setSelectedIndicator}
        />
      </section>

      <IndicatorTable rows={tableRows} indicators={indicators} metadata={metadata} />

      <IndicatorChart
        rows={tableRows}
        selectedIndicator={selectedIndicator}
        metadata={metadata}
      />
    </main>
  );
}

export default App;