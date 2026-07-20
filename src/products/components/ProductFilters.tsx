import Input from "@/components/Input";
import Select from "@/components/Select";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "../constants";

interface ProductFiltersProps {
  search: string;

  category?: string;

  status?: string;

  onSearchChange: (value: string) => void;

  onCategoryChange: (value: string) => void;

  onStatusChange: (value: string) => void;
}

function ProductFilters({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <Select
        value={category ?? ""}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">All Categories</option>

        {PRODUCT_CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>

      <Select
        value={status ?? ""}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">All Status</option>

        {PRODUCT_STATUSES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default ProductFilters;
