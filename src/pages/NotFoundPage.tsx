import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <h1>Cette page n'existe pas</h1>
      <Link to="/" className="button">
        Retour au catalogue
      </Link>
    </section>
  );
}
