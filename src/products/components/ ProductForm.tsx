import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "../product.schema";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "../constants";
import { Button } from "@/components/ui/Button";

interface ProductFormProps {
  defaultValues?: ProductFormValues;

  onSubmit: (values: ProductFormValues) => void;

  isSubmitting?: boolean;
}

function ProductForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Input placeholder="Name" {...register("name")} />
        <p>{errors.name?.message}</p>
      </div>

      <div>
        <Input placeholder="SKU" {...register("sku")} />
        <p>{errors.sku?.message}</p>
      </div>

      <div>
        <Select {...register("category")}>
          {PRODUCT_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Select {...register("status")}>
          {PRODUCT_STATUSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Input type="number" placeholder="Price" {...register("price")} />
        <p>{errors.price?.message}</p>
      </div>

      <div>
        <Input type="number" placeholder="Weight" {...register("weight")} />
        <p>{errors.weight?.message}</p>
      </div>

      <div>
        <textarea
          className="min-h-32 w-full rounded-md border p-3"
          placeholder="Description"
          {...register("description")}
        />
        <p>{errors.description?.message}</p>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Save Product
      </Button>
    </form>
  );
}

export default ProductForm;
