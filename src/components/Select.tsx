import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

const selectVariants = cva(
  "flex w-full rounded-md border bg-white transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3",
        lg: "h-11 px-4",
      },
      variant: {
        default: "border-gray-300 focus:border-blue-500",
        error: "border-red-500 focus:border-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

type SelectProps = ComponentPropsWithoutRef<"select"> &
  VariantProps<typeof selectVariants>;

function Select({ className, size, variant, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        selectVariants({
          size,
          variant,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export default Select;
