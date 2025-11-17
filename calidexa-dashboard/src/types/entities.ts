export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Empresa {
  id: number;
  nombre: string;
  slug: string;
  codigo: string;
  ruc: string;
  nivel: 'Sello' | 'Certificado';
  estado: 'Activo' | 'Inactivo';
  logo_url: string | null;
  descripcion: string | null;
  latitud: number | null;
  longitud: number | null;
  direccion: string | null;
  created_at: string;
  updated_at: string;
}

export interface Noticia {
  id: number;
  titulo: string;
  slug: string;
  categoria: string;
  contenido: string;
  imagen_url: string | null;
  video_url: string | null;
  publicado_at: string | null;
  extracto?: string;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  empresa_id: number;
  codigo_ticket: string;
  estado: 'pendiente' | 'ocupado' | 'anulado';
  resultado: string | null;
  premio: string | null;
  created_at: string;
  updated_at: string;
  empresa?: Empresa;
}

export interface DashboardKPIs {
  kpis: {
    total_empresas: number;
    total_noticias: number;
    tickets_pendientes: number;
    tickets_ocupados: number;
    tickets_anulados: number;
  };
  ultimos_registros: {
    empresas: Empresa[];
    noticias: Noticia[];
    tickets: Ticket[];
  };
}