import { useMemo } from "react";
import { Link } from "react-router";
import { useCartDispatch, useCartState } from "../hooks/useCart";
import { getCartSummary } from "../utils/cart";
import { formatPrice } from "../utils/price";
import CartLine from "../components/CartLine";
import EmptyState from "../components/EmptyState";

const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? "s" : ""}`;

export default function CartPage() {
  const entries = useCartState();
  const dispatch = useCartDispatch();
  const summary = useMemo(() => getCartSummary(entries), [entries]);

  if (entries.length === 0) {
    return (
      <section>
        <h1>Mon panier</h1>
        <EmptyState message="Votre panier est vide.">
          <Link to="/" className="button">
            Retour au catalogue
          </Link>
        </EmptyState>
      </section>
    );
  }

  return (
    <section>
      <h1>Mon panier</h1>
      <p>
        {plural(summary.productCount, "produit")} ·{" "}
        {plural(summary.itemCount, "article")} · Total{" "}
        <strong>{formatPrice(summary.total)}</strong>
      </p>
      <ul className="cart-list">
        {entries.map((entry) => (
          <CartLine key={entry.productId} entry={entry} />
        ))}
      </ul>
      <button type="button" onClick={() => dispatch({ type: "CLEAR" })}>
        Vider le panier
      </button>
    </section>
  );
}
