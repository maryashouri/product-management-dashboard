import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProduct } from "../api/products.api";

import type { ProductPayload, ProductsResponse } from "../types/product";

interface UpdateProductVariables {
  id: number;
  data: ProductPayload;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductVariables) =>
      updateProduct(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["products"],
      });

      const previous = queryClient.getQueriesData<ProductsResponse>({
        queryKey: ["products"],
      });

      queryClient.setQueriesData(
        {
          queryKey: ["products"],
        },
        (old: ProductsResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((product) => {
              if (product.id !== id) {
                return product;
              }

              return {
                ...product,
                ...data,
              };
            }),
          };
        },
      );

      return { previous };
    },
    onSuccess(updatedProduct) {
      queryClient.setQueriesData(
        {
          queryKey: ["products"],
        },
        (old: ProductsResponse | undefined) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product,
            ),
          };
        },
      );
    },

    onError: (_error, _variables, context) => {
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
}
