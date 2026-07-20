import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",

  secondary: "border border-gray-300 bg-white hover:bg-gray-100",

  danger: "bg-red-600 text-white hover:bg-red-700",
};

function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export default Button;
