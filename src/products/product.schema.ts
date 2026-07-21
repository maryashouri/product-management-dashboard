import { z } from "zod";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "./constants";

export const productSchema = z
  .object({
    name: z.string().trim().min(3).max(100),

    sku: z.string().trim().min(3).max(30),

    category: z.enum(PRODUCT_CATEGORIES),

    status: z.enum(PRODUCT_STATUSES),

    price: z.coerce.number().positive(),

    weight: z.coerce.number().min(0),

    description: z.string().trim().max(500),
  })
  .superRefine((data, ctx) => {
    if (data.category === "Electronics" && data.weight <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["weight"],
        message: "Electronics products must have weight greater than zero.",
      });
    }
  });

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;
