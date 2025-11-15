import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import AnimateOnScroll from "@/app/components/animate-on-scroll";

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailProps) {
  const { slug } = await params;

  try {
    const noticia = await api.getNoticiaPorSlug(slug);
    const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || '';

    return {
      title: noticia.titulo,
      description: noticia.extracto || noticia.contenido.substring(0, 160).replace(/<[^>]*>/g, ''),
      openGraph: {
        title: noticia.titulo,
        description: noticia.extracto || '',
        images: noticia.imagen_url
          ? [`${STORAGE_URL}/${noticia.imagen_url}`]
          : [],
      },
    };
  } catch {
    return {
      title: 'Noticia no encontrada',
    };
  }
}

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { slug } = await params;

  let noticia;
  try {
    noticia = await api.getNoticiaPorSlug(slug);
  } catch {
    notFound();
  }

  // Helper para construir URL de imagen
  const buildImageUrl = (imagePath: string | null): string => {
    if (!imagePath) return '/no-image.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const baseUrl = STORAGE_URL.endsWith('/') ? STORAGE_URL.slice(0, -1) : STORAGE_URL;
    return `${baseUrl}/${cleanPath}`;
  };

  const imagenUrl = buildImageUrl(noticia.imagen_url);

  const fecha = new Date(noticia.publicado_at || noticia.created_at).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Structured data para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": noticia.titulo,
    "image": imagenUrl,
    "datePublished": noticia.publicado_at || noticia.created_at,
    "dateModified": noticia.updated_at,
    "author": {
      "@type": "Organization",
      "name": "CalidexA"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CalidexA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://calidexa.pe/logo-calidexa.png"
      }
    },
    "description": noticia.extracto || noticia.contenido.substring(0, 160).replace(/<[^>]*>/g, ''),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-white text-gray-800 py-10 px-4 lg:px-0">
        <article className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <AnimateOnScroll animation="fadeInDown" threshold={0.2}>
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-[var(--color-primary)]">
                Inicio
              </Link>{" "}
              /{" "}
              <Link href="/noticias" className="hover:text-[var(--color-primary)]">
                Noticias
              </Link>{" "}
              / <span className="text-gray-600">{noticia.titulo}</span>
            </nav>
          </AnimateOnScroll>

          {/* Header */}
          <AnimateOnScroll animation="fadeInUp" threshold={0.2}>
            <header className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 mb-4">
                {noticia.categoria}
              </span>

              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-2">
                {noticia.titulo}
              </h1>

              <p className="text-sm text-gray-500 mb-6">
                CalidexA | Publicado el {fecha}
              </p>
            </header>
          </AnimateOnScroll>

          {/* Imagen destacada */}
          <AnimateOnScroll animation="fadeIn" delay="delay-1s" threshold={0.2}>
            <Image
              src={imagenUrl}
              alt={noticia.titulo}
              className="w-full h-[300px] lg:h-[400px] rounded-2xl mb-8"
              width={800}
              height={400}
              priority
              unoptimized={imagenUrl.startsWith('http://localhost') || imagenUrl.startsWith('https://')}
            />
          </AnimateOnScroll>

          {/* Contenido HTML */}
          <AnimateOnScroll animation="fadeInUp" delay="delay-0.5s" threshold={0.2}>
            <div
              className="prose prose-lg max-w-none text-justify leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: noticia.contenido }}
            />
          </AnimateOnScroll>

          {/* Video (si existe) */}
          {noticia.video_url && (
            <AnimateOnScroll animation="fadeIn" threshold={0.2}>
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <iframe
                  src={noticia.video_url.replace('watch?v=', 'embed/')}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  className="w-full h-full"
                  title="Video de la noticia"
                />
              </div>
            </AnimateOnScroll>
          )}

          {/* Botón volver */}
          <AnimateOnScroll animation="fadeInUp" threshold={0.2}>
            <div className="text-center pt-8 mt-8 border-t border-gray-200">
              <Link
                href="/noticias"
                className="inline-block text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium border border-[var(--color-primary)] hover:border-[var(--color-secondary)] px-8 py-3 rounded-full transition-colors"
              >
                ← Volver a Noticias
              </Link>
            </div>
          </AnimateOnScroll>
        </article>
      </main>
    </>
  );
}
