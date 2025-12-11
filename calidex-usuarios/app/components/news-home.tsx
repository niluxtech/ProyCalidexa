"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NewsCardProps {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  image: string;
  videoUrl?: string | null;
  slug: string;
}

export default function NewsCard({
  id,
  title,
  date,
  category,
  author,
  image,
  videoUrl,
  slug,
}: NewsCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const mostrarVideo = videoUrl && videoUrl.trim() !== '';

  // Función para convertir URL de YouTube a embed
  const getYouTubeEmbedUrl = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <Link
      href={`/noticias/${slug}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      {/* Video o Imagen */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        {mostrarVideo ? (
          /* Video de YouTube */
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            {/* Skeleton mientras carga - fondo gris neutro */}
            {imageLoading && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200">
                {/* Efecto shimmer animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            )}
            
            {/* Imagen real */}
            {!imageError && (
              <Image
                src={image}
                alt={title}
                fill
                className={`object-cover group-hover:scale-105 transition-all duration-300 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                unoptimized={image.startsWith('http://localhost') || image.startsWith('https://')}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            )}
            
            {/* Fallback si hay error - muestra el fondo esmeralda con icono */}
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-500">
                <svg
                  className="w-16 h-16 text-white opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </>
        )}
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
