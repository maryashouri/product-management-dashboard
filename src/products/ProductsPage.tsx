import { useSearchParams } from "react-router-dom";

import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";

import EmptyState from "@/components/EmptyState";
import Spinner from "@/components/Spinner";

import { useProducts } from "./hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";

import type { ProductStatus } from "./types/product";

const PAGE_SIZE = 10;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);

  const search = searchParams.get("search") ?? "";

  const category = searchParams.get("category");

  const status = searchParams.get("status") as ProductStatus;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending, isError } = useProducts({
    page,

    limit: PAGE_SIZE,

    search: debouncedSearch || undefined,

    category,

    status,
  });

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);
    else params.delete(key);

    if (key !== "page") {
      params.set("page", "1");
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) =>
    updateParams("page", String(newPage));

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load products"
        description="Something went wrong while loading products."
      />
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      <ProductFilters
        search={search}

        category={category}

        status={status}

        onSearchChange={(value) => updateParams("search", value)}

        onCategoryChange={(value) => updateParams("category", value)}

        onStatusChange={(value) => updateParams("status", value)}
      />

      {data?.data.length ? (
        <ProductTable products={data.data} />
      ) : (
        <EmptyState />
      )}

      <Pagination
        currentPage={page}

        totalPages={data?.pages ?? 1}

        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default ProductsPage;
