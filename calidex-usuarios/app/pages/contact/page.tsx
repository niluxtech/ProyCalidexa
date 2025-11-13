import Navbar from "@/app/components/navbar";
import Image from "next/image";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Contact CTA */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-4">
                Contacto
              </h2>
              <p className="text-[var(--color-text-grey)]">
                Estamos aquí para ayudarte. Ponte en contacto con nostros a
                travéz del formulario o nuestra información de contacto directa
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
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
                  <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-4">
                    Envíanos un mensaje
                  </h3>
                  <label className="block text-[var(--text-color)] font-medium mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[var(--text-color)] font-medium mb-1">
                    Celular
                  </label>
                  <input
                    type="tel"
                    placeholder="Tu número de contacto"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-[var(--text-color)] font-medium mb-1">
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
