/**
 * Props for the CountrySelector component
 * 
 * @property countries - List of available country IDs (e.g., ["AGO", "BRA"])
 * @property selectedCountry - Currently selected country ID
 * @property onChange - Callback triggered when user selects a new country
 */
type Props = {
  countries: string[];
  selectedCountry: string;
  onChange: (country: string) => void;
};

/**
 * CountrySelector
 * 
 * Dropdown component that allows the user to select a country.
 * 
 * This is a controlled component:
 - The selected value is managed by the parent (App.tsx)
 - Any change is propagated via the onChange callback
 */
export function CountrySelector({ countries, selectedCountry, onChange }: Props) {
  return (
    <div className="control">
      {/* Label associated with the select element for accessibility */}
      <label htmlFor="country">Country</label>

      {/* 
        Controlled <select> element:
        - value comes from parent state
        - onChange updates parent state
      */}
      <select
        id="country"
        value={selectedCountry}
        onChange={(event) => onChange(event.target.value)}
      >
        {/* Dynamically render options from country list */}
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}