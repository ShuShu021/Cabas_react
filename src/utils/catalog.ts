import type { Category, Product } from "../types";
import { getFinalPrice } from "./price";

export const CATEGORIES: { slug: string; id: Category; label: string }[] = [
  { slug: "telephones", id: "smartphones", label: "Téléphones" },
  { slug: "ordinateurs", id: "laptops", label: "Ordinateurs" },
  {
    slug: "accessoires",
    id: "mobile-accessories",
    label: "Accessoires mobiles",
  },
  { slug: "cuisine", id: "kitchen-accessories", label: "Cuisine" },
  { slug: "sport", id: "sports-accessories", label: "Sport" },
  { slug: "epicerie", id: "groceries", label: "Épicerie" },
];

export function getCategoryLabel(apiCategory: string): string {
  return CATEGORIES.find((c) => c.id === apiCategory)?.label ?? apiCategory;
}

export type SortKey = "pertinence" | "prix" | "note" | "nom";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "pertinence", label: "Pertinence" },
  { value: "prix", label: "Prix croissant" },
  { value: "note", label: "Note décroissante" },
  { value: "nom", label: "Nom de A à Z" },
];

export function parseSort(value: string | null): SortKey {
  return SORT_OPTIONS.find((o) => o.value === value)?.value ?? "pertinence";
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "prix":
      return copy.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    case "note":
      return copy.sort((a, b) => b.rating - a.rating);
    case "nom":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}
