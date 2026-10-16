import { CATEGORIES } from "../utils/catalog";

interface Props {
  value: string; // slug, '' = toutes
  onChange: (slug: string) => void;
}

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="field">
      <label htmlFor="category" className="sr-only">
        Catégorie
      </label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {CATEGORIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}
