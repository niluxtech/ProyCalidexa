import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "¿Cómo Trabajamos? | CalidexA",
  description:
    "Conoce cómo CalidexA trabaja para generar confianza a través de transparencia, responsabilidad y compromiso con la calidad.",
};

export default function ComoTrabajamos() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Sección 1: Imagen izquierda, texto derecha */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src="/contactoImg.webp"
                  alt="CalidexA trabajando"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6">
                  ¿Cómo trabaja CalidexA para generar confianza?
                </h2>
                <p className="text-[var(--color-text-grey)] text-lg leading-relaxed mb-8">
                  En CalidexA nos tomamos muy en serio la confianza. Por eso
                  hemos creado un sistema que evalúa, verifica y reconoce a las
                  empresas que se comprometen con la calidad, la transparencia y
                  el buen servicio, para que los clientes puedan elegir con más
                  tranquilidad.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block bg-[var(--color-primary)] text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all"
                >
                  Afíliate a CalidexA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Nuestros principios - 3 cards con imágenes */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Nuestros principios
            </h2>
            <p className="text-[var(--color-text-grey)] text-lg max-w-3xl mx-auto">
              CalidexA se sostiene sobre tres pilares que guían todas nuestras
              decisiones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Transparencia",
                description:
                  "Promovemos información clara y honesta sobre las empresas que forman parte de la comunidad.",
                color: "bg-green-500",
                image: "/trasnparecnia.png",
              },
              {
                title: "Responsabilidad",
                description:
                  "Las empresas acreditadas asumen compromisos frente a sus clientes y nuestra comunidad.",
                color: "bg-blue-500",
                image: "/responsabilidad.png",
              },
              {
                title: "Confianza",
                description:
                  "Trabajamos para que cada experiencia de compra sea más segura y alineada a lo que se promete.",
                color: "bg-purple-500",
                image: "/confianza.png",
              },
            ].map((principio, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src={principio.image}
                    alt={principio.title}
                    fill
                    className="object-cover "
                  />
                </div>
                <div className="py-8 px-12 sm:px-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mb-3">
                    {principio.title}
                  </h3>
                  <p className="text-[var(--color-text-grey)]">
                    {principio.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 3: Paso a paso - 4 pasos */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[var(--color-secondary)] font-semibold mb-2">
              PASO A PASO
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)]">
              Nuestro proceso en 4 pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "1",
                numberColor: "border-[var(--color-primary)]",
                title: "Verificación inicial",
                description:
                  "Validamos los datos esenciales de la empresa: existencia, rubro, contacto y representante responsable.",
              },
              {
                number: "2",
                numberColor: "border-blue-500",
                title: "Evaluación de buenas prácticas",
                description:
                  "Revisamos que la empresa cumpla coherencia en su servicio, buena atención, tiempos razonables y trato adecuado.",
              },
              {
                number: "3",
                numberColor: "border-purple-500",
                title: "Acompañamiento y mejora continua",
                description:
                  "Realizamos revisiones periódicas, analizamos experiencias de clientes y sugerimos mejoras cuando es necesario.",
              },
              {
                number: "4",
                numberColor: "border-[var(--color-secondary)]",
                title: "Reconocimiento CalidexA",
                description:
                  "Destacamos a las empresas que mantienen buenas prácticas como negocios confiables y comprometidos con la calidad.",
              },
            ].map((paso, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 rounded-full border-4 ${paso.numberColor} flex items-center justify-center mx-auto mb-4 bg-white`}
                >
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    {paso.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">
                  {paso.title}
                </h3>
                <p className="text-[var(--color-text-grey)]">
                  {paso.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: Texto izquierda, imagen derecha - Compromisos */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex-1 w-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6">
                  Compromisos de las empresas que forman parte de CalidexA
                </h2>
                <ul className="space-y-4 text-[var(--color-text-grey)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>
                      Cumplir lo que prometen en sus canales de venta.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>
                      Dar información clara sobre precios, condiciones y plazos.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>Atender consultas y reclamos con respeto.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>
                      Permitir la verificación de información cuando sea
                      requiera.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>
                      Cuidar la reputación y confianza de la comunidad.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src="/compromiso.png"
                  alt="Compromisos CalidexA"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5: Texto derecha, imagen izquierda - Seguimiento y control */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <div className="flex-1 w-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-6">
                  Seguimiento y control dentro de la comunidad
                </h2>
                <ul className="space-y-4 text-[var(--color-text-grey)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>Revisamos reportes y comentarios recibidos.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>
                      Monitoreamos cambios relevantes en la operación.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>
                      Solicitamos aclaraciones o evidencia cuando hay dudas.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      •
                    </span>
                    <span>
                      Fomentamos el diálogo directo entre empresa y cliente.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative w-full h-[400px] lg:h-[500px]">
                <Image
                  src="/seguimiento.png"
                  alt="Seguimiento y control"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: Con números - Medidas cuando no cumplen */}
      <section className="bg-gray-100 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] text-center mb-12">
            Medidas cuando una empresa no cumple lo que promete
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto w-fit">
            {[
              {
                number: "01",
                numberBgColor: "#004e6470",
                numberColor: "#004E64",
                title: "Advertencia y mejora",
                description:
                  "Se informa el problema y se da opción a corregirlo.",
              },
              {
                number: "02",
                numberBgColor: "#4597d578",
                numberColor: "#4597D5",
                title: "Seguimiento especial",
                description:
                  "Se monitorean nuevos casos y se pide información adicional.",
              },
              {
                number: "03",
                numberBgColor: "#9473ff63",
                numberColor: "#9473FF",
                title: "Suspensión temporal",
                description:
                  "La empresa deja de figurar como reconocida hasta mejorar sus prácticas.",
              },
              {
                number: "04",
                numberBgColor: "#d4af375e",
                numberColor: "#D4AF37",
                title: "Retiro definitivo",
                description:
                  "Si persisten malas prácticas, se retira a la empresa de la comunidad.",
              },
            ].map((medida, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center max-w-[280px] h-[272px] flex flex-col items-center justify-center gap-4"
                style={{ backgroundColor: medida.numberBgColor }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center font-bold text-xl text-[48px] justify-self-center"
                  style={{ color: medida.numberColor }}
                >
                  {medida.number}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 w-[10rem] justify-self-center">
                  {medida.title}
                </h3>
                <p className="text-dark/90">{medida.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 7: Última sección con CTA */}
      <section className="bg-[var(--color-primary)] py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              ¿Qué garantía tienes como cliente al usar CalidexA?
            </h2>
            <p className="text-lg mb-8 text-white/90 leading-relaxed">
              Al usar CalidexA tienes la garantía de que todas las empresas
              han sido previamente verificadas y evaluadas; además, puedes
              reportar cualquier inconveniente para que nuestro equipo lo
              revise, y cada empresa se compromete a cumplir estándares
              básicos de transparencia y buen servicio.
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
                Certificar mi empresa
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
