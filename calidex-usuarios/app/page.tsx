import Image from "next/image";
import Link from "next/link";
import NewsGrid from "./components/news-grid-home";
import { api } from "@/lib/api";
import { adaptNoticiaToHomeCard, adaptEmpresaToLogo } from "@/lib/adapters";

export default async function Home() {
  // Fetch últimas 3 noticias
  let ultimasNoticias: any[] = [];
  try {
    const { data: noticias } = await api.getNoticias();
    ultimasNoticias = noticias.slice(0, 3).map(adaptNoticiaToHomeCard);
  } catch (error) {
    console.error("Error al cargar noticias:", error);
  }

  // Fetch empresas activas para el carrusel de logos
  let empresasLogos: any[] = [];
  try {
    const empresas = await api.getEmpresas();
    // Filtrar solo empresas con logo y limitar a 10 para el carrusel
    empresasLogos = empresas
      .filter(empresa => empresa.logo_url)
      .slice(0, 10)
      .map(adaptEmpresaToLogo);
  } catch (error) {
    console.error("Error al cargar empresas:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4 leading-tight">
                  Acreditamos negocios que cumplen lo que prometen
                </h1>
                <p className="text-base sm:text-lg text-[var(--color-text-grey)] mb-8 max-w-xl mx-auto lg:mx-0">
                  CalidexA certifica empresas que garantizan calidad,
                  cumplimiento y transparencia en cada servicio o producto.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block text-white hover:text-[var(--color-secondary)] font-medium bg-[var(--color-primary)] hover:border-[var(--color-secondary)] px-8 py-3 rounded-full transition-colors text-base sm:text-lg"
                >
                  Contáctanos
                </Link>
              </div>

              <div className="flex-1 flex justify-center">
                <Image
                  src="/imgBanner.webp"
                  alt="Calidexa hero"
                  width={500}
                  height={400}
                  className="rounded-2xl object-cover"
                  style={{
                    filter: 'drop-shadow(0 0 0.75rem #000)'
                  }}
                />
              </div>
            </div>

            {/* Carrusel de logos */}
            {empresasLogos.length > 0 && (
              <div className="mt-12">
                <p className="text-center text-sm text-[var(--color-text-grey)] mb-4">
                  Empresas certificadas
                </p>
                <div className="flex overflow-x-auto gap-8 py-4 px-4 scrollbar-hide justify-center items-center">
                  {empresasLogos.map((empresa) => (
                    <Link
                      key={empresa.id}
                      href={`/empresas/${empresa.slug}`}
                      className="flex-shrink-0 group"
                      title={empresa.nombre}
                    >
                      <div className="relative w-24 h-16 sm:w-28 sm:h-20 flex items-center justify-center bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[var(--color-primary)]/20">
                        <Image
                          src={empresa.logo}
                          alt={`Logo de ${empresa.nombre}`}
                          width={100}
                          height={60}
                          className="object-fill rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 max-h-full"
                          unoptimized={empresa.logo.startsWith('http://localhost') || empresa.logo.startsWith('https://')}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Últimas Noticias */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-8">
              Últimas noticias
            </h2>

            {ultimasNoticias.length > 0 ? (
              <>
                <NewsGrid news={ultimasNoticias} columns={3} />
                <div className="mt-8">
                  <Link
                    href="/noticias"
                    className="inline-block text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium border border-[var(--color-primary)] hover:border-[var(--color-secondary)] px-6 py-2 rounded-full transition-colors"
                  >
                    Ver más
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-gray-500">No hay noticias disponibles en este momento.</p>
            )}
          </div>
        </section>

        {/* CTA Contacto */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-4">
              ¿Tienes dudas o sugerencias? Escríbenos
            </h2>
            <p className="text-[var(--color-text-grey)] mb-8">
              Nuestro equipo estará encantado de atenderte.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-[var(--color-secondary)] text-[var(--color-primary)] font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all"
            >
              Ir a Contacto
            </Link>
          </div>
        </section>
      </main>
  );
}
