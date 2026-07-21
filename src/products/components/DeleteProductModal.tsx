import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/Button";

import type { Product } from "../types/product";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

interface DeleteProductModalProps {
  open: boolean;
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}

function DeleteProductModal({
  open,
  product,
  onOpenChange,
}: DeleteProductModalProps) {
  const deleteMutation = useDeleteProduct();

  async function handleDelete() {
    if (!product) return;
    try {
      await deleteMutation.mutateAsync(product.id);
      onOpenChange(false);
    } catch {}
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{product?.name}</span>?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProductModal;
