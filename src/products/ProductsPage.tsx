import { useSearchParams } from "react-router-dom";

import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";

import EmptyState from "@/components/EmptyState";
import Spinner from "@/components/Spinner";

import { useProducts } from "./hooks/useProducts";

const PAGE_SIZE = 2;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");

  const { data, isPending, isError } = useProducts({
    page,
    limit: PAGE_SIZE,
  });

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);
  }

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description="Unable to load products."
      />
    );
  }

  if (!data?.data.length) {
    return <EmptyState />;
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      <ProductTable products={data.data} />

      <Pagination
        currentPage={page}
        totalPages={data.pages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default ProductsPage;
