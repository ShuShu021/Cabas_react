import type { CartEntry } from "../types";

export type CartAction =
  | { type: "ADD_PRODUCT"; entry: Omit<CartEntry, "quantity"> }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "REMOVE_PRODUCT"; productId: number }
  | { type: "CLEAR" };

export function cartReducer(
  state: CartEntry[],
  action: CartAction,
): CartEntry[] {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const { entry } = action;
      if (entry.stock < 1) return state;
      if (state.some((e) => e.productId === entry.productId)) return state;
      return [...state, { ...entry, quantity: 1 }];
    }
    case "UPDATE_QUANTITY":
      return state.map((e) =>
        e.productId === action.productId
          ? { ...e, quantity: Math.max(1, Math.min(action.quantity, e.stock)) } // borné [1, stock]
          : e,
      );
    case "REMOVE_PRODUCT":
      return state.filter((e) => e.productId !== action.productId);
    case "CLEAR":
      return [];
  }
}
