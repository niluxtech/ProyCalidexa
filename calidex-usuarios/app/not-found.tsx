import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="inline-block bg-[var(--color-primary)] text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}


