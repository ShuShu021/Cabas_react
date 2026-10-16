export default function Loader({ label = "Chargement…" }: { label?: string }) {
  return (
    <p role="status" className="state">
      {label}
    </p>
  );
}
