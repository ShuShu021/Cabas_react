import { Link } from "react-router";
import type { CartEntry } from "../types";
import { useCartDispatch } from "../hooks/useCart";
import { formatPrice, getFinalPrice } from "../utils/price";
import { getLineTotal } from "../utils/cart";
import QuantitySelector from "./QuantitySelector";

export default function CartLine({ entry }: { entry: CartEntry }) {
  const dispatch = useCartDispatch();

  return (
    <li className="cart-line">
      <img src={entry.thumbnail} alt="" width={64} height={64} />
      <div>
        <Link to={`/produits/${entry.productId}`}>{entry.title}</Link>
        <p>{formatPrice(getFinalPrice(entry))} l'unité</p>
      </div>
      <div className="cart-line__actions">
        <QuantitySelector
          value={entry.quantity}
          max={entry.stock}
          label={entry.title}
          onChange={(quantity) =>
            dispatch({
              type: "UPDATE_QUANTITY",
              productId: entry.productId,
              quantity,
            })
          }
        />
        <strong>{formatPrice(getLineTotal(entry))}</strong>
        <button
          type="button"
          aria-label={`Retirer ${entry.title} du panier`}
          onClick={() =>
            dispatch({ type: "REMOVE_PRODUCT", productId: entry.productId })
          }
        >
          Retirer
        </button>
      </div>
    </li>
  );
}
