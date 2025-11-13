import type { PaginatedResponse, Empresa } from '../types';
import axios from './axios';


export interface CreateEmpresaData {
  nombre: string;
  ruc: string;
  nivel: 'Sello' | 'Certificado';
  estado: 'Activo' | 'Inactivo';
  logo?: File;
  descripcion?: string;
}

export interface UpdateEmpresaData extends Partial<CreateEmpresaData> {
  id: number;
}

export const empresasService = {
  getAll: async (params?: { 
    per_page?: number; 
    buscar?: string 
  }): Promise<PaginatedResponse<Empresa>> => {
    const { data } = await axios.get<PaginatedResponse<Empresa>>('/empresas', { params });
    return data;
  },

  getById: async (id: number): Promise<Empresa> => {
    const { data } = await axios.get<Empresa>(`/empresas/${id}`);
    return data;
  },

  create: async (empresaData: CreateEmpresaData): Promise<{ 
    message: string; 
    data: Empresa 
  }> => {
    const formData = new FormData();
    
    Object.entries(empresaData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axios.post<{ message: string; data: Empresa }>(
      '/empresas', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },

  update: async (id: number, empresaData: Partial<CreateEmpresaData>): Promise<{ 
    message: string; 
    data: Empresa 
  }> => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    Object.entries(empresaData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axios.post<{ message: string; data: Empresa }>(
      `/empresas/${id}`, 
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
    const { data } = await axios.delete<{ message: string }>(`/empresas/${id}`);
    return data;
  },

  getSelectOptions: async (): Promise<Record<number, string>> => {
    const { data } = await axios.get<Record<number, string>>('/empresas-select');
    return data;
  },
};