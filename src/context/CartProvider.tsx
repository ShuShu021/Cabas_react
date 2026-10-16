import { useEffect, useReducer, type ReactNode } from "react";
import { cartReducer } from "./cartReducer";
import { CART_STORAGE_KEY, loadCart } from "../utils/cart";
import {
  CartCountContext,
  CartDispatchContext,
  CartStateContext,
} from "./CartContext";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [entries, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(entries));
    } catch (error: unknown) {
      console.error(
        "Impossible de sauvegarder le panier dans le stockage local.",
        error,
      );
    }
  }, [entries]);

  return (
    <CartDispatchContext value={dispatch}>
      <CartStateContext value={entries}>
        <CartCountContext value={entries.length}>{children}</CartCountContext>
      </CartStateContext>
    </CartDispatchContext>
  );
}
