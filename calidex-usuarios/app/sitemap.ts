import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calidexa.pe';

  // Páginas estáticas
  const routes = [
    '',
    '/noticias',
    '/empresas',
    '/nosotros',
    '/como-trabajamos',
    '/contacto',
    '/consultar-ticket',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Noticias dinámicas
  let noticiasUrls: MetadataRoute.Sitemap = [];
  try {
    const { data: noticias } = await api.getNoticias();
    noticiasUrls = noticias.map((noticia) => ({
      url: `${baseUrl}/noticias/${noticia.slug}`,
      lastModified: new Date(noticia.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error al generar sitemap de noticias:', error);
  }

  // Empresas dinámicas
  let empresasUrls: MetadataRoute.Sitemap = [];
  try {
    const empresasResponse = await api.getEmpresas();
    const empresasArray = Array.isArray(empresasResponse) 
      ? empresasResponse 
      : empresasResponse.data;
    
    empresasUrls = empresasArray.map((empresa) => ({
      url: `${baseUrl}/empresas/${empresa.slug}`,
      lastModified: new Date(empresa.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error al generar sitemap de empresas:', error);
  }

  return [...routes, ...noticiasUrls, ...empresasUrls];
}


