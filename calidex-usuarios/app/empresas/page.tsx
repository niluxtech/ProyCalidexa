"use client";

import { useState, useEffect } from "react";
import CompanyGrid from "@/app/components/company-grid";
import AnimateOnScroll from "@/app/components/animate-on-scroll";
import { api } from "@/lib/api";
import { adaptEmpresaToCard } from "@/lib/adapters";

export default function Companies() {
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresas = async () => {
      setIsLoading(true);
      try {
        const response = await api.getEmpresas(search || undefined);
        // Manejar tanto array directo como respuesta paginada
        const empresasArray = Array.isArray(response) 
          ? response 
          : (response as any)?.data || [];
        const adaptadas = empresasArray.map(adaptEmpresaToCard);
        setEmpresas(adaptadas);
      } catch (error) {
        console.error("Error al cargar empresas:", error);
        setEmpresas([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce para búsqueda
    const timer = setTimeout(() => {
      fetchEmpresas();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fadeInUp" threshold={0.2}>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-4">
                Empresas certificadas por CalidexA
              </h1>
              <p className="text-[var(--color-text-grey)]">
                Encuentre empresas confiables y certificadas que cumplen con
                nuestros rigurosos estándares de calidad.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeInUp" delay="delay-1s" threshold={0.2}>
            {/* Búsqueda */}
            <div className="mt-10">
              <div className="relative w-full sm:w-64 mx-auto">
                <input
                  type="text"
                  placeholder="Buscar empresa..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 flex items-center gap-2 mx-auto bg-gray-300 text-[var(--color-primary)] font-medium px-4 py-2 rounded-full hover:bg-gray-400 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8 8 0 004.582 9M4 20v-5h.582m15.356-2a8 8 0 01-15.356 2"
                    />
                  </svg>
                  Limpiar búsqueda
                </button>
              )}
            </div>
            {/* Grid de empresas */}
            <div className="mt-10">
              {isLoading ? (
                <p className="text-gray-500">Cargando empresas...</p>
              ) : empresas.length === 0 ? (
                <p className="text-gray-500">No se encontraron empresas</p>
              ) : (
                <CompanyGrid companies={empresas} columns={3} />
              )}
            </div>
          </AnimateOnScroll>
          </div>
      </section>
    </main>
  );
}
