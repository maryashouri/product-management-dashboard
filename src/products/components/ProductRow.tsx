import { Button } from "@/components/ui/Button";
import type { Product } from "../types/product";

interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
  return (
    <tr className="border-b last:border-none">
      <td className="px-4 py-3">{product.name}</td>

      <td className="px-4 py-3">{product.sku}</td>

      <td className="px-4 py-3">{product.category}</td>

      <td className="px-4 py-3">${product.price}</td>

      <td className="px-4 py-3">
        <span
          className={
            product.status === "active"
              ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
              : "rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          }
        >
          {product.status}
        </span>
      </td>
      <td>
        <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(product)}
          className="mx-2"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default ProductRow;
