import { useContext } from "react";
import {
  CartCountContext,
  CartDispatchContext,
  CartStateContext,
} from "../context/CartContext";

export function useCartState() {
  const state = useContext(CartStateContext);
  if (!state)
    throw new Error("useCartState doit être utilisé dans <CartProvider>");
  return state;
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch)
    throw new Error("useCartDispatch doit être utilisé dans <CartProvider>");
  return dispatch;
}
export function useCartCount() {
  return useContext(CartCountContext);
}
