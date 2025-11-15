export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent"></div>
        <p className="mt-4 text-[var(--color-text-grey)]">Cargando...</p>
      </div>
    </div>
  );
}


