export type ProductStatus = "inactive" | "active";

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Furniture",
  "Books",
  "Clothing",
];

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
  id: number;

  name: string;

  sku: string;

  category: ProductCategory;

  status: ProductStatus;

  price: number;

  weight: number;

  description: string;
}

export interface ProductsQueryParams {
  page: number;

  limit: number;

  search?: string;

  category?: ProductCategory;

  status?: ProductStatus;
}

export interface ProductsResponse {
  data: Product[];

  first: number;

  prev: number | null;

  next: number | null;

  last: number;

  pages: number;

  items: number;
}
