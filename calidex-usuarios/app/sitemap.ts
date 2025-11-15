import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://calidexa.pe';

  // Páginas estáticas
  const routes = [
    '',
    '/noticias',
    '/empresas',
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
    const empresas = await api.getEmpresas();
    empresasUrls = empresas.map((empresa) => ({
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


