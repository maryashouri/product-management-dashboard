import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "../api/products.api";

import type { ProductsResponse } from "../types/product";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        queryKey: ["products"],
      });

      const previousQueries = queryClient.getQueriesData<ProductsResponse>({
        queryKey: ["products"],
      });

      queryClient.setQueriesData<ProductsResponse>(
        {
          queryKey: ["products"],
        },
        (old) => {
          if (!old) {
            return old;
          }

          return {
            ...old,
            items: Math.max(old.items - 1, 0),
            data: old.data.filter((product) => product.id !== id),
          };
        },
      );

      return {
        previousQueries,
      };
    },

    onError: (_error, _id, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
}
