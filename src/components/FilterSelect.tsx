/*
 * Reusable dropdown filter component.
 * Used for country, age group, summary type, and indicator selection.
 * The component is controlled by the parent, so it receives the selected
 * value and sends changes back through onChange.
*/
type Props = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export function FilterSelect({ label, value, options, onChange }: Props) {
  return (
    <div className="control">
      <label>{label}</label>

      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}