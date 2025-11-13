import type { PaginatedResponse, Noticia } from '../types';
import axios from './axios';

export interface CreateNoticiaData {
  titulo: string;
  categoria: string;
  contenido: string;
  imagen?: File;
  video_url?: string;
  publicado_at?: string;
}

export const noticiasService = {
  getAll: async (params?: { per_page?: number }): Promise<PaginatedResponse<Noticia>> => {
    const { data } = await axios.get<PaginatedResponse<Noticia>>('/noticias', { params });
    return data;
  },

  getById: async (id: number): Promise<Noticia> => {
    const { data } = await axios.get<Noticia>(`/noticias/${id}`);
    return data;
  },

  create: async (noticiaData: CreateNoticiaData): Promise<{ 
    message: string; 
    data: Noticia 
  }> => {
    const formData = new FormData();
    
    Object.entries(noticiaData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axios.post<{ message: string; data: Noticia }>(
      '/noticias', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },

  update: async (id: number, noticiaData: Partial<CreateNoticiaData>): Promise<{ 
    message: string; 
    data: Noticia 
  }> => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    Object.entries(noticiaData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axios.post<{ message: string; data: Noticia }>(
      `/noticias/${id}`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const { data } = await axios.delete<{ message: string }>(`/noticias/${id}`);
    return data;
  },

  getCategorias: async (): Promise<Record<string, string>> => {
    const { data } = await axios.get<Record<string, string>>('/public/categorias');
    return data;
  },
};