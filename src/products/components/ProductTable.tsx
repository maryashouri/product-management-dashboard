import type { Product } from "../types/product";

interface ProductTableProps {
  products: Product[];
}

function ProductTable({ products }: ProductTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>SKU</th>
          <th>Category</th>
          <th>Status</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>

            <td>{product.sku}</td>

            <td>{product.category}</td>

            <td>{product.status}</td>

            <td>${product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
