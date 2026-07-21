import { api } from "../../api/axios";
import type {
  Product,
  ProductsQueryParams,
  ProductsResponse,
} from "../types/product";

export async function getProducts({
  page,
  limit,
  search,
  category,
  status,
}: ProductsQueryParams): Promise<ProductsResponse> {
  const response = await api.get("/products", {
    params: {
      _page: page,
      _per_page: limit,

      ...(search && { name: search }),

      ...(category && { category }),

      ...(status && { status }),
    },
  });

  console.log("AXIOS RESPONSE:", response);

  return response.data;
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);

  return data;
}

export async function createProduct(
  product: Omit<Product, "id">,
): Promise<Product> {
  const { data } = await api.post<Product>("/products", product);

  return data;
}

export async function updateProduct(
  id: number,
  product: Omit<Product, "id">,
): Promise<Product> {
  const { data } = await api.patch<Product>(`/products/${id}`, product);

  return data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`);
}

export async function checkSkuExists(sku: string): Promise<boolean> {
  const { data } = await api.get<Product[]>("/products", {
    params: {
      sku,
    },
  });

  return data.length > 0;
}
