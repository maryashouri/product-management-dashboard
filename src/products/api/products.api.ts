import { api } from "../../api/axios";
import type { ProductsQueryParams, ProductsResponse } from "../types/product";

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

  return response.data;
}
