import { Link, NavLink } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        CABAS
      </Link>
      <nav aria-label="Navigation principale" className="nav">
        <NavLink to="/" end>
          Catalogue
        </NavLink>
        <NavLink to="/proposer">Proposer un produit</NavLink>
        <NavLink to="/panier">Panier</NavLink>
        <NavLink to="/connexion">Se connecter</NavLink>
      </nav>
    </header>
  );
}
