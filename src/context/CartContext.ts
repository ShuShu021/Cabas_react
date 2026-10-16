import { createContext, type Dispatch } from "react";
import type { CartEntry } from "../types";
import type { CartAction } from "./cartReducer";

export const CartStateContext = createContext<CartEntry[] | null>(null);
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(
  null,
);
export const CartCountContext = createContext<number>(0);
