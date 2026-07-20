interface EmptyStateProps {
  title?: string;
  description?: string;
}

function EmptyState({
  title = "No products found",
  description = "Try adjusting your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default EmptyState;
