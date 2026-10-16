import { startTransition } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useCartCount } from "../hooks/useCart";

export default function Header() {
  const { user, logout } = useAuth();
  const count = useCartCount();
  const { pathname } = useLocation();

  function handleLogout() {
    if (pathname === "/proposer") {
      startTransition(() => {
        logout();
      });
    } else {
      logout();
    }
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        CABAS
      </Link>
      <nav aria-label="Navigation principale" className="nav">
        <NavLink to="/" end className="nav__desktop">
          Catalogue
        </NavLink>
        <NavLink to="/proposer" className="nav__desktop">
          Proposer un produit
        </NavLink>
        <NavLink to="/panier">
          Panier{" "}
          <span className="count">
            {count}
            <span className="sr-only"> produit{count > 1 ? "s" : ""}</span>
          </span>
        </NavLink>

        {user ? (
          <div className="user">
            <img
              className="avatar"
              src={user.image}
              alt={`Avatar de ${user.firstName}`}
              width={28}
              height={28}
            />
            <span className="user__name">{user.firstName}</span>
            <button type="button" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <NavLink to="/connexion">Se connecter</NavLink>
        )}
      </nav>
    </header>
  );
}
