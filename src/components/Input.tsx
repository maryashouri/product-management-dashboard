import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef } from "react";

const inputVariants = cva("w-full rounded-md border transition outline-none", {
  variants: {
    size: {
      sm: "h-9 px-3",
      md: "h-10 px-3",
      lg: "h-11 px-4",
    },

    intent: {
      default: "border-gray-300 focus:border-blue-500",
      error: "border-red-500 focus:border-red-500",
    },
  },

  defaultVariants: {
    size: "md",
    intent: "default",
  },
});

type InputProps = ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof inputVariants>;

export default function Input({
  className,
  size,
  intent,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        inputVariants({
          size,
          intent,
        }),
        className,
      )}
      {...props}
    />
  );
}
