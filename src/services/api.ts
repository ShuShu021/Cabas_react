import type {
  AuthUser,
  LoginCredentials,
  NewProduct,
  Product,
  ProductSearchResponse,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, init);
  if (!response.ok) {
    throw new ApiError(`Erreur HTTP ${response.status}`, response.status);
  }
  return (await response.json()) as T;
}

export function searchProducts(query: string, signal?: AbortSignal) {
  return request<ProductSearchResponse>(
    `/products/search?q=${encodeURIComponent(query)}&limit=0`,
    { signal },
  );
}

export function getProductById(id: number | string, signal?: AbortSignal) {
  return request<Product>(`/products/${id}`, { signal });
}

export function login(credentials: LoginCredentials) {
  return request<AuthUser>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export function createProduct(payload: NewProduct) {
  return request<NewProduct & { id: number }>("/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
