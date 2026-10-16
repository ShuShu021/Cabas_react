export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export type Category =
  | "smartphones"
  | "laptops"
  | "mobile-accessories"
  | "kitchen-accessories"
  | "sports-accessories"
  | "groceries";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  reviews: Review[];
  thumbnail: string;
  images: string[];
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  firstName: string;
  image: string;
  accessToken: string;
}

export interface NewProduct {
  title: string;
  category: Category;
  brand?: string;
  price: number;
  stock: number;
  description: string;
  tags: string[];
  userId: number;
}

export interface CartEntry {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  stock: number;
  quantity: number;
}
