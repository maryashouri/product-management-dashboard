import type { Product } from "../types/product";

interface ProductRowProps {
  product: Product;
}

function ProductRow({ product }: ProductRowProps) {
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
    </tr>
  );
}

export default ProductRow;
