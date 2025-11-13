
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Grid de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Columna 1: Logo y descripción */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4">
              <Image 
                src="/logo-calidexa.png" 
                alt="Calidexa Logo" 
                width={140}
                height={56}
                className="w-32 lg:w-36 h-auto"
              />
            </Link>
            <p className="text-sm text-[var(--color-text)] leading-relaxed">
              Acreditando la excelencia en Perú
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h3 className="text-[var(--color-primary)] font-semibold text-base lg:text-lg mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contacto@calidexa.pe" 
                  className="flex items-center gap-2 text-sm text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contacto@calidexa.pe
                </a>
              </li>
              <li>
                <a 
                  href="tel:+51987654321" 
                  className="flex items-center gap-2 text-sm text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +51 987654321
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Navegación */}
          <div>
            <h3 className="text-[var(--color-primary)] font-semibold text-base lg:text-lg mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/news" 
                  className="text-sm text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link 
                  href="/companies" 
                  className="text-sm text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  Empresas
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-300 mt-8 pt-6">
          <p className="text-center text-sm text-[var(--color-text-grey)]">
            2025 Calidex Perú. Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}