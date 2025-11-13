import CompanyGrid from "@/app/components/company-grid";
import Navbar from "@/app/components/navbar";
import Image from "next/image";

const companies = [
  {
    id: "1",
    name: "multiservicios-kendra",
    description: "Empresa de soluciones tecnológicas y desarrollo de software.",
    logo: "/no-image.png",
    slug: "multiservicios-kendra",
  },
  {
    id: "2",
    name: "EcoMarket",
    description: "Comercio especializado en productos orgánicos y sostenibles.",
    logo: "/no-image.png",
    slug: "ecomarket",
  },
  {
    id: "3",
    name: "Tech Innovators",
    description: "Empresa de soluciones tecnológicas y desarrollo de software.",
    logo: "/no-image.png",
    slug: "tech-innovators",
  },
  {
    id: "4",
    name: "EcoMarket",
    description: "Comercio especializado en productos orgánicos y sostenibles.",
    logo: "/no-image.png",
    slug: "ecomarket",
  },
];

export default function Companies() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Contact CTA */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 ">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-4">
                Empresas acreditadas por Calidex
              </h2>
              <p className="text-[var(--color-text-grey)]">
                Encuentre empresas confiables y certificas que cumplen con
                nuestros rigurosos estádares de calidad. Navegue por nuestro
                directorio para conectar con los líderes de la industria en Perú
              </p>
              {/* Filtros */}
              <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Ingrese un nombre"
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-primary)]">
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

                <button className="flex items-center gap-2 bg-gray-300 text-[var(--color-primary)] font-medium px-4 py-2 rounded-full hover:bg-gray-400 transition">
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
                      d="M4 6h4v4H4V6zm6 0h10v4H10V6zM4 14h4v4H4v-4zm6 0h10v4H10v-4z"
                    />
                  </svg>
                  Categoría
                </button>

                <button className="flex items-center gap-2 bg-gray-300 text-[var(--color-primary)] font-medium px-4 py-2 rounded-full hover:bg-gray-400 transition">
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
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 22s8-7.373 8-13a8 8 0 10-16 0c0 5.627 8 13 8 13z"
                    />
                  </svg>
                  Ubicación
                </button>

                <button className="flex items-center gap-2 bg-gray-300 text-[var(--color-primary)] font-medium px-4 py-2 rounded-full hover:bg-gray-400 transition">
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
                  Limpiar filtros
                </button>
              </div>

              {/* Empresas */}
              <div className="mt-10">
                <CompanyGrid companies={companies} columns={3} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
