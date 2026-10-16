interface Props {
  value: number;
  max: number;
  min?: number;
  label: string;
  onChange: (quantity: number) => void;
}

export default function QuantitySelector({
  value,
  max,
  min = 1,
  label,
  onChange,
}: Props) {
  return (
    <div className="quantity" role="group" aria-label={`Quantité de ${label}`}>
      <button
        type="button"
        aria-label="Diminuer la quantité"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
