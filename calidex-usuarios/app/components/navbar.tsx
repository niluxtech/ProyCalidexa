"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Agregar esta línea

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-calidexa.png"
              alt="Calidexa Logo"
              width={120}
              height={50}
              className="w-28 sm:w-32 lg:w-36 h-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 lg:gap-8 list-none m-0">
            <li>
              <Link
                href="/noticias"
                className={`text-[var(--color-text)] hover:text-[var(--color-secondary)] font-medium text-sm lg:text-base transition-colors duration-300 ${
                  isActive("/noticias") ? "text-[var(--color-secondary)]" : ""
                }`}
              >
                Noticias
              </Link>
            </li>
            <li>
              <Link
                href="/empresas"
                className={`text-[var(--color-text)] hover:text-[var(--color-secondary)] font-medium text-sm lg:text-base transition-colors duration-300 ${
                  isActive("/empresas") ? "text-[var(--color-secondary)]" : ""
                }`}
              >
                Empresas
              </Link>
            </li>
            {/* <li>
              <Link
                href="/consultar-ticket"
                className={`text-[var(--color-text)] hover:text-[var(--color-secondary)] font-medium text-sm lg:text-base transition-colors duration-300 ${
                  isActive("/consultar-ticket") ? "text-[var(--color-secondary)]" : ""
                }`}
              >
                Consultar Ticket
              </Link>
            </li> */}
            <li>
              <Link
                href="/contacto"
                className={`text-[var(--color-text)] hover:text-[var(--color-secondary)] font-medium text-sm lg:text-base transition-colors duration-300 ${
                  isActive("/contacto") ? "text-[var(--color-secondary)]" : ""
                }`}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-[var(--color-text)] hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <ul className="flex flex-col gap-4 pt-4">
              <li>
                <Link
                  href="/noticias"
                  className="block text-[var(--color-text)] hover:text-[var(--color-secondary)] font-medium text-base transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/empresas"
                  className="block text-[var(--color-text)] hover:text-[var(--color-secondary)] font-medium text-base transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Empresas
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/consultar-ticket"
                  className="block text-[var(--color-text)] hover:text-[var(--color-secondary)] font-medium text-base transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Consultar Ticket
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contacto"
                  className="block text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-semibold text-base transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

/*
 <Link
                href="/contact"
                className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-semibold text-sm lg:text-base transition-colors duration-300"
              >
                Contacto
              </Link>
*/
