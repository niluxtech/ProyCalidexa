"use client";

import { useState, useEffect } from "react";
import NewCardGrid from "@/app/components/news-grid";
import AnimateOnScroll from "@/app/components/animate-on-scroll";
import Link from "next/link";
import { api } from "@/lib/api";
import { adaptNoticiaToCard } from "@/lib/adapters";

export default function News() {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [todasNoticias, setTodasNoticias] = useState<any[]>([]);
  const [ultimas, setUltimas] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [categorias, setCategorias] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch inicial
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [noticiasRes, categoriasRes] = await Promise.all([
          api.getNoticias(),
          api.getCategorias(),
        ]);

        const adaptadas = noticiasRes.data.map(adaptNoticiaToCard);
        setTodasNoticias(adaptadas);
        setNoticias(adaptadas);
        setUltimas(adaptadas.slice(0, 5));
        setCategorias(categoriasRes);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrar por búsqueda y categoría
  useEffect(() => {
    let filtered = [...todasNoticias];
    // Filtrar por búsqueda (título y descripción)
    if (search) {
      filtered = filtered.filter((noticia) =>
        noticia.title.toLowerCase().includes(search.toLowerCase()) ||
        noticia.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Filtrar por categoría
    if (categoriaSeleccionada) {
      const fetchPorCategoria = async () => {
        try {
          const response = await api.getNoticiasPorCategoria(categoriaSeleccionada);
          // La respuesta es paginada, necesitamos acceder a .data
          const adaptadas = response.data.map(adaptNoticiaToCard);
          setNoticias(adaptadas);
        } catch (error) {
          console.error("Error al filtrar por categoría:", error);
          setNoticias([]);
        }
      };
      fetchPorCategoria();
    } else {
      setNoticias(filtered);
    }
  }, [search, categoriaSeleccionada, todasNoticias]);

  const handleLimpiarFiltros = () => {
    setSearch("");
    setCategoriaSeleccionada("");
    setNoticias(todasNoticias);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-10">
              Noticias y Actualizaciones
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Columna izquierda: Grid de noticias */}
            <AnimateOnScroll animation="fadeInRight" threshold={0.2} className="lg:col-span-2 order-2 lg:order-1">
              {isLoading ? (
                <p className="text-gray-500">Cargando noticias...</p>
              ) : noticias.length === 0 ? (
                <p className="text-gray-500">No se encontraron noticias</p>
              ) : (
                <NewCardGrid news={noticias} columns={2} />
              )}
            </AnimateOnScroll>

            {/* Columna derecha: Sidebar */}
            <AnimateOnScroll animation="fadeInLeft" threshold={0.2} className="order-1 lg:order-2">
              <aside className="space-y-8">
              {/* Buscador */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h3 className="text-[var(--color-primary)] font-semibold mb-3">
                  Buscar
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar noticia..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-primary)]">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Filtro de categorías */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h3 className="text-[var(--color-primary)] font-semibold mb-3">
                  Categorías
                </h3>
                <select
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option value="">Todas las categorías</option>
                  {Object.entries(categorias).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón limpiar filtros */}
              {(search || categoriaSeleccionada) && (
                <button
                  onClick={handleLimpiarFiltros}
                  className="w-full bg-gray-300 text-[var(--color-primary)] font-medium px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Limpiar filtros
                </button>
              )}

              {/* Últimas noticias */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h3 className="text-[var(--color-primary)] font-semibold mb-3">
                  Últimas noticias
                </h3>
                <ul className="space-y-2 text-sm text-[var(--color-text-grey)]">
                  {ultimas.map((noticia) => (
                    <li key={noticia.id}>
                      <Link
                        href={`/noticias/${noticia.slug}`}
                        className="hover:text-[var(--color-secondary)] transition line-clamp-2"
                      >
                        {noticia.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              </aside>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
}
