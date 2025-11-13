import Navbar from "@/app/components/navbar";
import NewCardGrid from "@/app/components/news-grid";
import Image from "next/image";

const sampleNews = [
  {
    id: "1",
    image: "https://picsum.photos/400/200",
    date: "20 de Mayo, 2025",
    title: "Calidexa certifica nuevas empresas del sector tecnológico en Lima",
    description:
      "Durante la ceremonia anual, Calidexa reconoció a las empresas que mantienen altos estándares de calidad e innovación en el país.",
    slug: "calidexa-certifica-nuevas-empresas",
  },
  {
    id: "2",
    image: "https://picsum.photos/400/201",
    date: "18 de Mayo, 2025",
    title:
      "La confianza del consumidor crece en Perú gracias a nuevas acreditaciones",
    description:
      "Según los últimos reportes, más peruanos confían en empresas acreditadas por Calidexa, reflejando un cambio positivo en el mercado nacional.",
    slug: "confianza-del-consumidor-en-peru",
  },
  {
    id: "3",
    image: "https://picsum.photos/400/202",
    date: "20 de Mayo, 2025",
    title: "Calidexa certifica nuevas empresas del sector tecnológico en Lima",
    description:
      "Durante la ceremonia anual, Calidexa reconoció a las empresas que mantienen altos estándares de calidad e innovación en el país.",
    slug: "calidexa-certifica-nuevas-empresas",
  },
  {
    id: "4",
    image: "https://picsum.photos/400/205",
    date: "18 de Mayo, 2025",
    title:
      "La confianza del consumidor crece en Perú gracias a nuevas acreditaciones",
    description:
      "Según los últimos reportes, más peruanos confían en empresas acreditadas por Calidexa, reflejando un cambio positivo en el mercado nacional.",
    slug: "confianza-del-consumidor-en-peru",
  },
  {
    id: "5",
    image: "https://picsum.photos/400/206",
    date: "20 de Mayo, 2025",
    title: "Calidexa certifica nuevas empresas del sector tecnológico en Lima",
    description:
      "Durante la ceremonia anual, Calidexa reconoció a las empresas que mantienen altos estándares de calidad e innovación en el país.",
    slug: "calidexa-certifica-nuevas-empresas",
  },
  {
    id: "6",
    image: "https://picsum.photos/400/207",
    date: "18 de Mayo, 2025",
    title:
      "La confianza del consumidor crece en Perú gracias a nuevas acreditaciones",
    description:
      "Según los últimos reportes, más peruanos confían en empresas acreditadas por Calidexa, reflejando un cambio positivo en el mercado nacional.",
    slug: "confianza-del-consumidor-en-peru",
  },
];

export default function News() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Título */}
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-10">
              Noticias y Actualizaciones
            </h2>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Columna izquierda: Grid de noticias */}
              <div className="lg:col-span-2">
                <NewCardGrid news={sampleNews} columns={2} />
              </div>

              {/* Columna derecha: Sidebar */}
              <aside className="space-y-8">
                {/* Buscador */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h3 className="text-[var(--color-primary)] font-semibold mb-3">
                    Buscar
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ingrese un nombre"
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-primary)]"></button>
                  </div>
                </div>

                {/* Últimas noticias */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h3 className="text-[var(--color-primary)] font-semibold mb-3">
                    Últimas noticias
                  </h3>
                  <ul className="space-y-2 text-sm text-[var(--color-text-grey)]">
                    <li className="hover:text-[var(--color-secondary)] cursor-pointer transition">
                      Anuncio Importante: Nuevas Normativas
                    </li>
                    <li className="hover:text-[var(--color-secondary)] cursor-pointer transition">
                      Avances en Programas de Certificación
                    </li>
                    <li className="hover:text-[var(--color-secondary)] cursor-pointer transition">
                      Calidex en el Evento Anual Empresarial
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
