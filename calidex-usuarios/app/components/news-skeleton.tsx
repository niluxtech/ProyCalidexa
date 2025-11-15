export default function NewsSkeleton() {
  return (
    <div className="block bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Imagen skeleton */}
      <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-gray-200 to-gray-300"></div>

      {/* Contenido skeleton */}
      <div className="p-5 sm:p-6">
        {/* Título skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded mb-3 w-1/2"></div>

        {/* Metadata skeleton */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

