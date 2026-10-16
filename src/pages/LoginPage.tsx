import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { ApiError } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 400
          ? "Identifiants incorrects."
          : "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.",
      );
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Connexion</h1>
      <p>Connectez-vous pour proposer un produit.</p>

      <form className="form" onSubmit={handleSubmit}>
        {error && (
          <p role="alert" className="alert">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Connexion…" : "Se connecter"}
        </button>
        <small>Compte de test : emilys / emilyspass</small>
      </form>
    </section>
  );
}
