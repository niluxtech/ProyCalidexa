import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  image: string;
  slug: string;
}

export default function NewsCard({
  id,
  title,
  date,
  category,
  author,
  image,
  slug,
}: NewsCardProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      {/* Imagen */}
      <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-emerald-400 to-emerald-500 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Contenido */}
      <div className="p-5 sm:p-6">
        {/* Título */}
        <h3 className="text-[var(--color-primary)] font-semibold text-lg sm:text-xl mb-3 line-clamp-2 group-hover:text-[var(--color-secondary)] transition-colors text-left">
          {title}
        </h3>

        {/* Metadata */}
        <div className="flex flex-col gap-1 text-sm text-[var(--color-text-grey)] text-left">
          <p>
            {date} - {category}
          </p>
          <p>{author}</p>
        </div>
      </div>
    </Link>
  );
}
