import type { Product } from "../types";

export function getFinalPrice(
  product: Pick<Product, "price" | "discountPercentage">,
): number {
  const final = product.price * (1 - product.discountPercentage / 100);
  return Math.round(final * 100) / 100;
}

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export const formatPrice = (value: number) => formatter.format(value);
