import Image from "next/image";
import Link from "next/link";

interface CompanyCardProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  slug: string;
}

export default function CompanyCard({
  id,
  name,
  description,
  logo,
  slug,
}: CompanyCardProps) {
  return (
    <div className="bg-white border-2 border-[var(--color-primary)] rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Logo + Nombre en la misma fila */}
      <div className="flex items-center justify-start gap-4 mb-4">
        <Image
          src={logo}
          alt={name}
          width={60}
          height={60}
          className="rounded-full object-cover border border-gray-200"
        />
        <h3 className="text-lg font-semibold text-[var(--color-primary)] text-left line-clamp-2">
          {name}
        </h3>
      </div>

      {/* Descripción */}
      <p className="text-sm text-[var(--color-text-grey)] mb-4 line-clamp-3 text-left">
        {description}
      </p>

      {/* Botón */}
      <Link
        href={`/pages/companies/${slug}`}
        className="inline-block text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium border border-[var(--color-primary)] hover:border-[var(--color-secondary)] px-6 py-2 rounded-full transition-colors"
      >
        Ver detalles
      </Link>
    </div>
  );
}
