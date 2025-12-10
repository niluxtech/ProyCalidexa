import Link from "next/link";

export default function Companies() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-8 leading-tight">
              Estamos construyendo una comunidad única.
            </h1>
            
            <p className="text-lg sm:text-xl text-[var(--color-text-grey)] leading-relaxed mb-12 max-w-3xl mx-auto">
              Pronto podrás conocer a las primeras empresas que creen en la transparencia, el compromiso y el respeto por sus clientes. Gracias por ser parte de este inicio: juntos daremos visibilidad a negocios que cumplen con lo que prometen y ofrecen tranquilidad a quienes los eligen.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-6">
                ¿Quieres que tu empresa aparezca aquí cuando lancemos la lista?
              </h2>
              
              <p className="text-lg text-[var(--color-text-grey)] mb-6">
                Si tu empresa comparte estos valores, queremos conocerte.
              </p>
              
              <div className="bg-white rounded-xl p-6 border-2 border-[var(--color-primary)]/20">
                <p className="text-base text-[var(--color-text-grey)] mb-2">
                  Envíanos un correo a
                </p>
                <a 
                  href="mailto:Contacto@calidexa.pe?subject=Unirme a CalidexA"
                  className="text-xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors inline-block mb-2"
                >
                  Contacto@calidexa.pe
                </a>
                <p className="text-base text-[var(--color-text-grey)] mt-4">
                  con el asunto: <span className="font-semibold text-[var(--color-primary)]">"Unirme a CalidexA"</span>.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-[var(--color-secondary)] font-semibold text-lg">
              <span>Próximamente</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
