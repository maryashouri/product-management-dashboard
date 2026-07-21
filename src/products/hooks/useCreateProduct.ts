import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "../api/products.api";

import type { ProductsResponse } from "../types/product";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: (createdProduct) => {
      queryClient.setQueriesData(
        {
          queryKey: ["products"],
        },
        (old: ProductsResponse | undefined) => {
          if (!old) {
            return old;
          }

          return {
            ...old,

            items: old.items + 1,

            data: [createdProduct, ...old.data].slice(0, old.data.length),
          };
        },
      );
    },
  });
}
