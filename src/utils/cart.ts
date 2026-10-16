import type { CartEntry, Product } from "../types";
import { getFinalPrice } from "./price";

export const CART_STORAGE_KEY = "cabas-cart";

export function toCartEntry(product: Product): Omit<CartEntry, "quantity"> {
  return {
    productId: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    discountPercentage: product.discountPercentage,
    stock: product.stock,
  };
}

export function getLineTotal(entry: CartEntry): number {
  return Math.round(getFinalPrice(entry) * entry.quantity * 100) / 100;
}

export function getCartSummary(entries: CartEntry[]) {
  const total = entries.reduce((sum, e) => sum + getLineTotal(e), 0);
  return {
    productCount: entries.length,
    itemCount: entries.reduce((sum, e) => sum + e.quantity, 0),
    total: Math.round(total * 100) / 100,
  };
}

function isCartEntry(value: unknown): value is CartEntry {
  if (typeof value !== "object" || value === null) return false;
  const e = value as Record<string, unknown>;
  return (
    typeof e.productId === "number" &&
    typeof e.title === "string" &&
    typeof e.thumbnail === "string" &&
    typeof e.price === "number" &&
    typeof e.discountPercentage === "number" &&
    typeof e.stock === "number" &&
    typeof e.quantity === "number"
  );
}

export function loadCart(): CartEntry[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isCartEntry) : [];
  } catch {
    return [];
  }
}
