import Image from "next/image";
import Link from "next/link";

interface NewCardProps {
  id: string;
  image: string;
  date: string;
  title: string;
  description: string;
  slug: string;
}

export default function NewCard({
  id,
  image,
  date,
  title,
  description,
  slug,
}: NewCardProps) {
  return (
    <div className="bg-white border-1 border-[var(--color-primary)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Imagen */}
      <div className="w-full h-[200px] relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized={image.startsWith('http://localhost') || image.startsWith('https://')}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col text-left">
        <p className="text-sm text-gray-500 mb-2">{date}</p>

        <Link href={`/noticias/${slug}`}>
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2 line-clamp-3 hover:text-[var(--color-secondary)] transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-[var(--color-text-grey)] mb-3 line-clamp-4">
          {description}
        </p>

        <Link
          href={`/noticias/${slug}`}
          className="text-[var(--color-secondary)] text-sm underline font-medium hover:opacity-80 transition self-start"
        >
          Leer más
        </Link>
      </div>
    </div>
  );
}
