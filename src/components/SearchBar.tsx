interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="field field--search">
      <label htmlFor="search" className="sr-only">
        Rechercher un produit
      </label>
      <input
        id="search"
        type="search"
        placeholder="Rechercher un produit…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
