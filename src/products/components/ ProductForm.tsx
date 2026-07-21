import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "../product.schema";

import type { Product } from "../types/product";

import { PRODUCT_CATEGORIES } from "../constants";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { checkSkuExists } from "../api/products.api";

interface ProductFormProps {
  product?: Product | null;

  onSuccess: () => void;
}

const DEFAULT_VALUES: ProductFormValues = {
  name: "",
  sku: "",
  category: "Books",
  status: "active",
  price: 10,
  weight: 0,
  description: "",
};

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const createMutation = useCreateProduct();

  const updateMutation = useUpdateProduct();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const {
    register,

    handleSubmit,

    reset,

    watch,

    formState: { errors },
    setError,
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(product ?? DEFAULT_VALUES);
  }, [product, reset]);

  const category = watch("category");
  const isEditMode = product != null;

  const onSubmit = async (values: ProductFormValues) => {
    const exists = await checkSkuExists(values.sku, product?.id);

    if (exists) {
      setError("sku", {
        type: "manual",
        message: "SKU already exists.",
      });

      return;
    }

    if (isEditMode) {
      await updateMutation.mutateAsync({
        id: product.id,
        data: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }

    reset(DEFAULT_VALUES);

    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>

          <Input {...register("name")} placeholder="MacBook Pro" />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">SKU</label>

          <Input placeholder="MBP-001" {...register("sku")} />

          {errors.sku && (
            <p className="mt-1 text-sm text-red-500">{errors.sku.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>

          <Select {...register("category")}>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>

          <Select {...register("status")}>
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </Select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Price</label>

          <Input
            type="number"
            step="0.01"
            {...register("price", {
              valueAsNumber: true,
            })}
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Weight</label>

          <Input
            type="number"
            step="0.01"
            {...register("weight", {
              valueAsNumber: true,
            })}
          />

          {category === "Electronics" && (
            <p className="mt-1 text-xs text-gray-500">
              Electronics products must have a weight greater than 0.
            </p>
          )}

          {errors.weight && (
            <p className="mt-1 text-sm text-red-500">{errors.weight.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Description</label>

        <textarea
          rows={5}
          className="w-full rounded-md border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500"
          placeholder="Write product description..."
          {...register("description")}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : !!product
              ? "Update Product"
              : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
