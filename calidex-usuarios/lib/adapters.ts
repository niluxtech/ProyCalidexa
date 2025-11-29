import { Empresa, Noticia } from './api';

const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';

// Helper para construir URL de imagen correctamente
function buildImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return '/no-image.png';
  
  // Si ya es una URL completa, retornarla
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Remover barra inicial si existe
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Construir URL completa
  const baseUrl = STORAGE_URL.endsWith('/') ? STORAGE_URL.slice(0, -1) : STORAGE_URL;
  return `${baseUrl}/${cleanPath}`;
}

// Convierte Empresa de Laravel → Formato de CompanyCard
export function adaptEmpresaToCard(empresa: Empresa & { logo?: string | null }) {
  // El backend puede devolver 'logo' (accessor) o 'logo_url' (campo directo)
  const logoPath = (empresa as any).logo || empresa.logo_url;
  return {
    id: empresa.id.toString(),
    name: empresa.nombre,
    description: empresa.descripcion || 'Sin descripción disponible',
    logo: buildImageUrl(logoPath),
    slug: empresa.slug,
  };
}

// Convierte Noticia de Laravel → Formato de NewsCard (página /noticias)
export function adaptNoticiaToCard(noticia: Noticia & { imagen?: string | null }) {
  const fecha = new Date(noticia.publicado_at || noticia.created_at);
  // El backend puede devolver 'imagen' (accessor) o 'imagen_url' (campo directo)
  const imagenPath = (noticia as any).imagen || noticia.imagen_url;

  return {
    id: noticia.id.toString(),
    image: buildImageUrl(imagenPath),
    date: fecha.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    title: noticia.titulo,
    description: noticia.extracto || stripHtml(noticia.contenido).substring(0, 150) + '...',
    slug: noticia.slug,
  };
}

// Convierte Noticia de Laravel → Formato de NewsCard Home (landing)
export function adaptNoticiaToHomeCard(noticia: Noticia & { imagen?: string | null }) {
  const fecha = new Date(noticia.publicado_at || noticia.created_at);
  // El backend puede devolver 'imagen' (accessor) o 'imagen_url' (campo directo)
  const imagenPath = (noticia as any).imagen || noticia.imagen_url;

  return {
    id: noticia.id.toString(),
    title: noticia.titulo,
    date: fecha.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    category: noticia.categoria,
    author: 'CalidexA',
    image: buildImageUrl(imagenPath),
    slug: noticia.slug,
  };
}

// Convierte Empresa de Laravel → Formato para carrusel de logos
export function adaptEmpresaToLogo(empresa: Empresa & { logo?: string | null }) {
  // El backend puede devolver 'logo' (accessor) o 'logo_url' (campo directo)
  const logoPath = (empresa as any).logo || empresa.logo_url;
  return {
    id: empresa.id.toString(),
    nombre: empresa.nombre,
    logo: buildImageUrl(logoPath),
    slug: empresa.slug,
  };
}

// Helper: Remover tags HTML
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}


