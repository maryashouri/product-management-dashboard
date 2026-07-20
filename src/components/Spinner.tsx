function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
    </div>
  );
}

export default Spinner;
