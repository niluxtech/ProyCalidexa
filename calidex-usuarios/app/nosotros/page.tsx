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
  TrendingUp,
  Award,
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

      {/* Sección 1: Imagen izquierda, texto derecha - Sistema de confianza */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src="/contactoImg.webp"
                  alt="Sistema de confianza CalidexA"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-secondary)]" />
                  <span className="text-[var(--color-secondary)] font-semibold text-sm uppercase tracking-wide">
                    Sobre Nosotros
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
                  Somos un sistema de confianza para el mercado peruano
                </h2>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed mb-4">
                  Calidexa nace como una iniciativa independiente que
                  identifica, reconoce y promueve a las empresas que cumplen con
                  calidad, transparencia y buenas prácticas.
                </p>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed">
                  Nuestro propósito es simple: que cualquier persona pueda
                  elegir con seguridad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Texto izquierda, imagen derecha - Mercado honesto */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src="/imgBanner.webp"
                  alt="Mercado honesto y transparente"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-[var(--color-secondary)]" />
                  <span className="text-[var(--color-secondary)] font-semibold text-sm uppercase tracking-wide">
                    Nuestro Compromiso
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
                  Impulsamos un mercado más honesto y transparente
                </h2>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed mb-4">
                  Creemos que la confianza no debería ser un riesgo.
                </p>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed">
                  Nuestro objetivo es construir una comunidad donde las empresas
                  cumplan lo que prometen y donde el público pueda tomar
                  decisiones informadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Imagen izquierda, texto derecha - Evaluamos y verificamos */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src="/seguimiento.png"
                  alt="Evaluación y verificación"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-[var(--color-secondary)]" />
                  <span className="text-[var(--color-secondary)] font-semibold text-sm uppercase tracking-wide">
                    Nuestro Proceso
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
                  Evaluamos, verificamos y reconocemos el buen servicio
                </h2>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed mb-4">
                  En Calidexa analizamos buenas prácticas, recopilamos
                  evidencias, promovemos compromisos de calidad y monitoreamos
                  que se cumpla lo prometido.
                </p>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed">
                  Así, garantizamos que cada sello entregado realmente
                  represente confianza.
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

      {/* Sección 5: Cards de características */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Verificamos información",
                description:
                  "Confirmamos datos reales para garantizar que cada empresa cumple lo que promete.",
                icon: Shield,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
              },
              {
                title: "Reconocemos el buen servicio",
                description:
                  "Destacamos a empresas que brindan una atención honesta y orientada al cliente.",
                icon: Award,
                color: "text-yellow-600",
                bgColor: "bg-yellow-50",
                borderColor: "border-yellow-200",
              },
              {
                title: "Conectamos a la comunidad",
                description:
                  "Unimos a empresas responsables con personas que buscan calidad y tranquilidad al elegir.",
                icon: Users,
                color: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
              },
              {
                title: "Nuestra misión",
                description:
                  "Impulsar un mercado más transparente, responsable y confiable en el Perú.",
                icon: Target,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
              },
              {
                title: "Evaluamos buenas prácticas",
                description:
                  "Analizamos criterios clave de servicio, responsabilidad y calidad empresarial.",
                icon: FileCheck,
                color: "text-indigo-600",
                bgColor: "bg-indigo-50",
                borderColor: "border-indigo-200",
              },
            ].map((caracteristica, index) => {
              const IconComponent = caracteristica.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border-2 border-transparent hover:border-[var(--color-primary)]/20 group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] min-w-[280px] max-w-[350px]"
                >
                  <div
                    className={`w-16 h-16 ${caracteristica.bgColor} ${caracteristica.borderColor} rounded-xl flex items-center justify-center mb-6 mx-auto border-2 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${caracteristica.color}`}
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4 text-center group-hover:text-[var(--color-secondary)] transition-colors">
                    {caracteristica.title}
                  </h3>
                  <p className="text-[var(--color-text-grey)] text-center flex-grow leading-relaxed">
                    {caracteristica.description}
                  </p>
                </div>
              );
            })}
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
                href="https://mensaje.calidexa.pe/"
                className="inline-block bg-white text-[var(--color-primary)] font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all border-2 border-white"
              >
                Buscar empresas seguras
              </Link>
              <Link
                href="/contacto"
                className="inline-block bg-[var(--color-secondary)] text-[var(--color-primary)] font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
              >
                Certificar mi empresa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
