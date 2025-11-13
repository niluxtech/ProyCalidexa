import Navbar from "@/app/components/navbar";
import Image from "next/image";
import NewsGrid from "./components/news-grid-home";
import Link from "next/link";

const latestNews = [
  {
    id: "1",
    title: "Calidex Lanza Programa de Apoyo para PYMES en Cusco",
    date: "12 de Agosto, 2025",
    category: "Comunicaciones",
    author: "Equipo D",
    image: "/no-image.png",
    slug: "programa-apoyo-pymes-cusco",
  },
  {
    id: "2",
    title: "Nueva Certificación de Calidad para Empresas Peruanas",
    date: "10 de Agosto, 2025",
    category: "Certificaciones",
    author: "Equipo A",
    image: "/no-image.png",
    slug: "certificacion-calidad-empresas",
  },
  {
    id: "3",
    title: "Calidexa Expande sus Servicios a Arequipa",
    date: "8 de Agosto, 2025",
    category: "Expansión",
    author: "Equipo C",
    image: "/no-image.png",
    slug: "expansion-arequipa",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
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
                  href="/afiliate"
                  className="inline-block text-white hover:text-[var(--color-secondary)] font-medium bg-[var(--color-primary)] hover:border-[var(--color-secondary)] px-8 py-3 rounded-full transition-colors text-base sm:text-lg"
                >
                  Afíliate a Calidexa
                </Link>
              </div>

              <div className="flex-1 flex justify-center">
                <Image
                  src="/no-image.png"
                  alt="Calidexa hero"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Carrusel de logos */}
            <div className="mt-12">
              <div className="flex overflow-x-auto gap-8 py-2 px-2 scrollbar-hide justify-center">
                {[
                  "/no-image.png",
                  "/no-image.png",
                  "/no-image.png",
                  "/no-image.png",
                  "/no-image.png",
                ].map((logo, index) => (
                  <div key={index} className="flex-shrink-0">
                    <Image
                      src={logo}
                      alt={`Logo ${index + 1}`}
                      width={100}
                      height={30}
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Últimas Noticias */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-8">
              Últimas noticias
            </h2>

            <NewsGrid news={latestNews} columns={3} />

            <div className="mt-8">
              <Link
                href="/news"
                className="inline-block text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium border border-[var(--color-primary)] hover:border-[var(--color-secondary)] px-6 py-2 rounded-full transition-colors"
              >
                Ver más
              </Link>{" "}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-4">
                ¿Tienes dudas o sugerencias? Escríbenos
              </h2>
              <p className="text-[var(--color-text-grey)]">
                Nuestro equipo estará encantado de atenderte lo antes posible.
              </p>
            </div>

            {/* Contenido: imagen + formulario */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
              {/* Imagen */}
              <div className="flex-1 flex justify-center">
                <Image
                  src="/no-image.png"
                  alt="Contacto Calidexa"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>

              {/* Formulario */}
              <form className="flex-1 w-full max-w-md bg-gray-50 p-6 rounded-2xl shadow-sm">
                <div className="mb-4">
                  <label className="block text-[var(--color-primary)] font-medium mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[var(--color-primary)] font-medium mb-1">
                    Celular
                  </label>
                  <input
                    type="tel"
                    placeholder="Tu número de contacto"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-[var(--color-primary)] font-medium mb-1">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  ></textarea>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  className="w-full bg-[var(--color-secondary)] text-[var(--color-primary)] font-medium px-6 py-3 rounded-full hover:opacity-90 transition-all"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
