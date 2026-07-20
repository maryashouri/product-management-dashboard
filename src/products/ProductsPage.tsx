import { useSearchParams } from "react-router-dom";

import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/Spinner";
import Pagination from "./components/Pagination";
import ProductTable from "./components/ProductTable";
import { useProducts } from "./hooks/useProducts";

const PAGE_SIZE = 10;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");

  const { data, isPending, isError } = useProducts({
    page,
    limit: PAGE_SIZE,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load products"
        description="Something went wrong while fetching products."
      />
    );
  }

  if (!data || data.data.length === 0) {
    return <EmptyState />;
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Product Management Dashboard</h1>

      <ProductTable products={data.data} />

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default ProductsPage;
