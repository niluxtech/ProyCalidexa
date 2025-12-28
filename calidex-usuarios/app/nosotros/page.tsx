import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { adaptEmpresaToLogo } from "@/lib/adapters";
import {
  CheckCircle2,
  Star,
  Users,
  Target,
  FileCheck,
  Shield,
  Award,
  Eye,
  Heart,
} from "lucide-react";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://calidexa.pe";

export const metadata: Metadata = {
  title: "CalidexA",
  description:
    "Conoce más sobre CalidexA, un sistema de confianza para el mercado peruano que construye confianza entre empresas y personas.",
  alternates: {
    canonical: `${baseUrl}/nosotros`,
  },
  openGraph: {
    title: "CalidexA",
    description:
      "Conoce más sobre CalidexA, un sistema de confianza para el mercado peruano que construye confianza entre empresas y personas.",
    url: `${baseUrl}/nosotros`,
    siteName: "CalidexA",
    images: [
      {
        url: `${baseUrl}/logoCalidexa.png`,
        width: 1200,
        height: 630,
        alt: "CalidexA - Nosotros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalidexA",
    description:
      "Conoce más sobre CalidexA, un sistema de confianza para el mercado peruano.",
    images: [`${baseUrl}/logoCalidexa.png`],
  },
};

export default async function Nosotros() {
  // Fetch empresas activas para el carrusel de logos
  let empresasLogos: any[] = [];
  try {
    const empresas = await api.getEmpresas();
    let empresasData: any[] = [];
    if (Array.isArray(empresas)) {
      empresasData = empresas;
    } else if (empresas && Array.isArray(empresas.data)) {
      empresasData = empresas.data;
    }

    empresasLogos = empresasData
      .filter((empresa: any) => empresa.logo_url)
      .slice(0, 10)
      .map(adaptEmpresaToLogo);
  } catch (error) {
    console.error("Error al cargar empresas:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="w-20 h-1 bg-[var(--color-secondary)] mx-auto rounded-full"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
              Construyendo confianza en cada decisión
            </h1>
            <p className="text-xl sm:text-2xl text-[var(--color-text-grey)] leading-relaxed font-medium mb-3">
              Construimos confianza entre empresas y personas
            </p>
            <p className="text-lg sm:text-xl text-[var(--color-secondary)] font-semibold">
              Tranquilidad para elegir bien
            </p>
          </div>
        </div>
      </section>

      {/* Sección 1: Quiénes Somos */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src="/contactoImg.webp"
                  alt="CalidexA - Quiénes Somos"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-4 leading-tight">
                  Quiénes Somos
                </h2>
                <div className="w-20 h-1 bg-[var(--color-secondary)] mb-6 rounded-full"></div>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed mb-4">
                  En Calidexa trabajamos para construir un mercado más confiable, donde las personas y empresas puedan tomar decisiones seguras y bien informadas.
                </p>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed mb-4">
                  Somos un sistema independiente que evalúa, reconoce y destaca a los negocios que cumplen lo que prometen, promoviendo un entorno basado en calidad, responsabilidad y buenas prácticas.
                </p>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed">
                  Creemos que elegir un buen servicio no debería ser un riesgo, y por eso analizamos evidencias reales, verificamos información y destacamos únicamente a quienes demuestran compromiso auténtico con sus clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Misión, Visión y Propósito */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Misión */}
              <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-[var(--color-primary)]/20">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Target className="w-6 h-6 text-gray-400 group-hover:text-[var(--color-secondary)] transition-colors duration-300" />
                  <h3 className="text-xl font-bold text-gray-600 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    Nuestra Misión
                  </h3>
                </div>
                <div className="w-16 h-1 bg-gray-300 group-hover:bg-[var(--color-secondary)] mb-4 rounded-full transition-colors duration-300"></div>
                <p className="text-[var(--color-text-grey)] leading-relaxed">
                  Impulsar un mercado más transparente, responsable y seguro, donde las empresas que cumplen sean reconocidas y donde las personas puedan elegir con tranquilidad.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-[var(--color-primary)]/20">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Eye className="w-6 h-6 text-gray-400 group-hover:text-[var(--color-secondary)] transition-colors duration-300" />
                  <h3 className="text-xl font-bold text-gray-600 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    Nuestra Visión
                  </h3>
                </div>
                <div className="w-16 h-1 bg-gray-300 group-hover:bg-[var(--color-secondary)] mb-4 rounded-full transition-colors duration-300"></div>
                <p className="text-[var(--color-text-grey)] leading-relaxed">
                  Convertirnos en una referencia internacional de confianza, un estándar que certifique calidad real y que transforme la relación entre empresas y consumidores.
                </p>
              </div>

              {/* Propósito */}
              <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-[var(--color-primary)]/20">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Heart className="w-6 h-6 text-gray-400 group-hover:text-[var(--color-secondary)] transition-colors duration-300" />
                  <h3 className="text-xl font-bold text-gray-600 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    Nuestro Propósito
                  </h3>
                </div>
                <div className="w-16 h-1 bg-gray-300 group-hover:bg-[var(--color-secondary)] mb-4 rounded-full transition-colors duration-300"></div>
                <p className="text-[var(--color-text-grey)] leading-relaxed">
                  Fomentar una comunidad donde los buenos negocios crecen y donde las personas pueden tomar decisiones informadas, basadas en evidencia y transparencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Carrusel de empresas */}
      {empresasLogos.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-[var(--color-secondary)]" />
                <span className="text-[var(--color-secondary)] font-semibold text-sm uppercase tracking-wide">
                  Empresas Acreditadas
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-4">
                Negocios que están transformando la confianza en el Perú
              </h2>
            </div>

            <div className="flex overflow-x-auto gap-8 py-4 px-4 scrollbar-hide justify-center items-center max-w-6xl mx-auto">
              {empresasLogos.map((empresa) => (
                <Link
                  key={empresa.id}
                  href="https://mensaje.calidexa.pe/"
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
                      unoptimized={
                        empresa.logo.startsWith("http://localhost") ||
                        empresa.logo.startsWith("https://")
                      }
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sección 3: Qué Hacemos */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-4">
                 Nuestro Enfoque
              </h2>
              <div className="w-20 h-1 bg-[var(--color-secondary)] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Verificamos información",
                  description:
                    "Revisamos trabajos reales, evidencias y datos confiables para garantizar que una empresa cumple lo que promete.",
                  icon: Shield,
                },
                {
                  title: "Reconocemos el buen servicio",
                  description:
                    "Destacamos a negocios que ofrecen atención responsable, transparente y orientada al cliente.",
                  icon: Award,
                },
                {
                  title: "Evaluamos buenas prácticas",
                  description:
                    "Analizamos procesos, responsabilidad, cumplimiento y estándares de servicio.",
                  icon: FileCheck,
                },
                {
                  title: "Conectamos a la comunidad",
                  description:
                    "Unimos a personas y negocios que buscan calidad, profesionalismo y tranquilidad en cada decisión.",
                  icon: Users,
                },
              ].map((caracteristica, index) => {
                const IconComponent = caracteristica.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-xl p-6 flex flex-col border-2 border-[var(--color-primary)] transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 text-center transition-colors duration-300">
                      {caracteristica.title}
                    </h3>
                    <div className="flex justify-center mb-4">
                      <IconComponent
                        className="w-12 h-12 text-[var(--color-primary)] transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-[var(--color-primary)] text-sm text-center leading-relaxed flex-grow">
                      {caracteristica.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Por Qué Existimos */}
      {/* <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6">
                Por Qué Existimos
              </h2>
            </div>
            <div className="space-y-4 text-lg text-[var(--color-text-grey)]">
              <p className="text-center">
                Porque muchas personas han tenido experiencias negativas al contratar servicios.
              </p>
              <p className="text-center">
                Porque las empresas que sí cumplen merecen ser reconocidas.
              </p>
              <p className="text-center font-semibold text-[var(--color-primary)]">
                Porque la confianza debe ser algo accesible, no una apuesta.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Sección 5: Nuestra Promesa */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6">
                Nuestra Promesa
                <div className="w-20 h-1 bg-[var(--color-secondary)] mx-auto rounded-full mt-2"></div>
              </h2>

              <p className="text-lg text-[var(--color-text-grey)] mb-8">
                Cada reconocimiento de Calidexa representa:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { label: "Cumplimiento", icon: CheckCircle2, color: "text-green-600", hoverColor: "group-hover:text-green-600" },
                { label: "Responsabilidad", icon: Shield, color: "text-blue-600", hoverColor: "group-hover:text-blue-600" },
                { label: "Buen servicio", icon: Award, color: "text-purple-600", hoverColor: "group-hover:text-purple-600" },
                { label: "Transparencia", icon: Eye, color: "text-indigo-600", hoverColor: "group-hover:text-indigo-600" },
                { label: "Calidad", icon: Star, color: "text-yellow-600", hoverColor: "group-hover:text-yellow-600" },
              ].map((valor, index) => {
                const IconComponent = valor.icon;
                return (
                  <div
                    key={index}
                    className="group inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[var(--color-primary)]/30 cursor-pointer"
                  >
                    <IconComponent 
                      className={`w-5 h-5 text-gray-400 ${valor.hoverColor} transition-colors duration-300`} 
                      strokeWidth={2}
                    />
                    <span className="font-semibold text-gray-500 group-hover:text-[var(--color-primary)] text-base whitespace-nowrap transition-colors duration-300">
                      {valor.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="text-center space-y-4">
              <p className="text-lg text-[var(--color-text-grey)] italic">
                Valoramos la integridad por encima de todo.
              </p>
              <p className="text-lg text-[var(--color-text-grey)]">
                Cada empresa destacada en Calidexa ha demostrado su calidad a través de hechos, no palabras.
              </p>
              <div className="pt-6 border-t border-gray-300">
                <p className="text-xl font-bold text-[var(--color-primary)] mb-2">
                  Calidexa reconoce mérito, no intereses.
                </p>
                <p className="text-lg text-[var(--color-secondary)] font-semibold">
                  La confianza es nuestro principal compromiso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: CTA Final */}
      <section className="bg-[var(--color-primary)] py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Únete a la comunidad que está transformando la confianza en el
              Perú
            </h2>
            <p className="text-lg mb-8 text-white/90 leading-relaxed">
              Si eres una empresa comprometida con la calidad y la
              transparencia, o si buscas tomar decisiones informadas, Calidexa
              es para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/empresas"
                className="inline-block bg-white text-[var(--color-primary)] font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all border-2 border-white"
              >
                Buscar empresas seguras
              </Link>
              <Link
                href="/contacto"
                className="inline-block bg-[var(--color-secondary)] text-[var(--color-primary)] font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
              >
                Recomendar mi empresa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
