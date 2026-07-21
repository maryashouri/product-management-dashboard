import { useSearchParams } from "react-router-dom";

import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";
import Pagination from "./components/Pagination";

import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";

import { useProducts } from "./hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";

import type { Product, ProductCategory, ProductStatus } from "./types/product";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "./components/ ProductForm";
import DeleteProductModal from "./components/DeleteProductModal";

const PAGE_SIZE = 10;

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDelete, setProductDelete] = useState<Product | null>(null);

  const page = Number(searchParams.get("page") ?? 1);

  const search = searchParams.get("search") ?? "";

  const category = searchParams.get("category") as ProductCategory;

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
      <Button
        className="mb-4"
        onClick={() => {
          setSelectedProduct(null);
          setIsDialogOpen(true);
        }}
      >
        + Add Product
      </Button>

      <ProductFilters
        search={search}

        category={category}

        status={status}

        onSearchChange={(value) => updateParams("search", value)}

        onCategoryChange={(value) => updateParams("category", value)}

        onStatusChange={(value) => updateParams("status", value)}
      />

      {data?.data.length ? (
        <ProductTable
          products={data.data}
          onEdit={(product) => {
            setSelectedProduct(product);
            setIsDialogOpen(true);
          }}
          onDelete={(product) => {
            setProductDelete(product);
          }}
        />
      ) : (
        <EmptyState />
      )}

      <Pagination
        currentPage={page}

        totalPages={data?.pages ?? 1}

        onPageChange={handlePageChange}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <ProductForm
            product={selectedProduct}
            onSuccess={() => {
              setIsDialogOpen(false);
              setSelectedProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>
      <DeleteProductModal
        open={!!productDelete}
        product={productDelete}
        onOpenChange={(open) => {
          if (!open) {
            setProductDelete(null);
          }
        }}
      />
    </main>
  );
}

export default ProductsPage;
