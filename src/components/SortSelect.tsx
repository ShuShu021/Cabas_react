import { SORT_OPTIONS, type SortKey } from "../utils/catalog";

interface Props {
  value: SortKey;
  onChange: (sort: SortKey) => void;
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <div className="field">
      <label htmlFor="sort" className="sr-only">
        Trier par
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
