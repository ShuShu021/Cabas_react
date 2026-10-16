import type { NewProduct } from "../types";
import { CATEGORIES } from "./catalog";

export interface ProductFormValues {
  title: string;
  category: string;
  brand: string;
  price: string;
  stock: string;
  description: string;
  tags: string;
}

export type ProductFormField = keyof ProductFormValues;
export type ProductFormErrors = Partial<Record<ProductFormField, string>>;

export const EMPTY_PRODUCT_FORM: ProductFormValues = {
  title: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
  description: "",
  tags: "",
};

export function validate(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const price = Number(values.price.trim().replace(",", "."));
  const stockText = values.stock.trim();
  const stock = Number(stockText);
  const categoryIsValid = CATEGORIES.some(
    (category) => category.id === values.category,
  );

  if (!title) errors.title = "Le nom du produit est obligatoire.";
  if (!categoryIsValid) errors.category = "Choisissez une catégorie.";
  if (!Number.isFinite(price) || price <= 0) {
    errors.price = "Saisissez un prix supérieur à 0.";
  }
  if (!/^\d+$/.test(stockText) || !Number.isSafeInteger(stock) || stock < 0) {
    errors.stock = "Saisissez un stock entier positif ou nul.";
  }
  if (!description) errors.description = "La description est obligatoire.";
  if (!values.tags.split(/\r?\n/).some((tag) => tag.trim())) {
    errors.tags = "Saisissez au moins un tag.";
  }

  return errors;
}

export function toNewProduct(
  values: ProductFormValues,
  userId: number,
): NewProduct {
  const category = CATEGORIES.find(
    (item) => item.id === values.category,
  );
  if (!category) {
    throw new Error("La catégorie du produit est invalide.");
  }

  return {
    title: values.title.trim(),
    category: category.id,
    ...(values.brand.trim() ? { brand: values.brand.trim() } : {}),
    price: Number(values.price.trim().replace(",", ".")),
    stock: Number(values.stock.trim()),
    description: values.description.trim(),
    tags: values.tags
      .split(/\r?\n/)
      .map((tag) => tag.trim())
      .filter(Boolean),
    userId,
  };
}
