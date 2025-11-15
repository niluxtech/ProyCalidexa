const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper para fetch con manejo de errores
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    next: { revalidate: 3600 }, // ISR: revalidar cada hora
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

// ========== TIPOS BASADOS EN API LARAVEL ==========

export interface Empresa {
  id: number;
  nombre: string;
  slug: string;
  codigo: string;
  ruc: string; // Ya viene encriptado desde backend
  nivel: 'Sello' | 'Certificado';
  estado: 'Activo' | 'Inactivo';
  logo_url: string | null;
  descripcion: string | null;
  created_at: string;
  updated_at: string;
}

export interface Noticia {
  id: number;
  titulo: string;
  slug: string;
  categoria: string;
  contenido: string; // HTML
  imagen_url: string | null;
  video_url: string | null;
  publicado_at: string | null;
  extracto?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  per_page: number;
  to: number;
  total: number;
}

export interface TicketConsulta {
  id: number;
  codigo_ticket: string;
  estado: 'pendiente' | 'ocupado' | 'anulado';
  resultado: string | null;
  premio: string | null;
  empresa: {
    id: number;
    nombre: string;
    codigo: string;
    logo_url: string | null;
  };
  created_at: string;
}

// ========== ENDPOINTS PÚBLICOS ==========

export const api = {
  // --- Noticias ---
  getNoticias: () =>
    apiFetch<PaginatedResponse<Noticia>>('/public/noticias?per_page=12'),

  getNoticiaPorSlug: (slug: string) =>
    apiFetch<Noticia>(`/public/noticias/${slug}`),

  getNoticiasPorCategoria: (categoria: string) =>
    apiFetch<PaginatedResponse<Noticia>>(`/public/noticias/categoria/${categoria}`),

  getCategorias: () =>
    apiFetch<Record<string, string>>('/public/categorias'),

  // --- Empresas ---
  getEmpresas: (buscar?: string) =>
    apiFetch<Empresa[]>(`/public/empresas${buscar ? `?buscar=${encodeURIComponent(buscar)}` : ''}`),

  getEmpresaPorSlug: (slug: string) =>
    apiFetch<Empresa>(`/public/empresas/${slug}`),

  // --- Tickets ---
  consultarTicket: async (codigo: string): Promise<TicketConsulta> => {
    const res = await fetch(`${API_URL}/public/tickets/consultar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo_ticket: codigo }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Error al consultar ticket' }));
      throw new Error(error.message || 'Error al consultar ticket');
    }

    return res.json();
  },

  // --- Contacto ---
  enviarContacto: async (data: {
    nombre: string;
    email: string;
    telefono?: string;
    mensaje: string;
  }) => {
    const res = await fetch(`${API_URL}/public/contacto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Error al enviar mensaje' }));
      throw new Error(error.message || 'Error al enviar mensaje');
    }

    return res.json();
  },
};


