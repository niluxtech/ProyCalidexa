import type { PaginatedResponse, Ticket } from '../types';
import axios from './axios';

export interface TicketFilters {
  empresa_id?: number;
  estado?: 'pendiente' | 'ocupado' | 'anulado';
  fecha_desde?: string;
  fecha_hasta?: string;
  per_page?: number;
}

export interface GenerateTicketsData {
  empresa_id: number;
  cantidad: number;
}

export interface UpdateTicketData {
  estado: 'pendiente' | 'ocupado' | 'anulado';
  resultado?: string;
  premio?: string;
}

export const ticketsService = {
  getAll: async (filters?: TicketFilters): Promise<PaginatedResponse<Ticket>> => {
    const { data } = await axios.get<PaginatedResponse<Ticket>>('/tickets', { 
      params: filters 
    });
    return data;
  },

  getById: async (id: number): Promise<Ticket> => {
    const { data } = await axios.get<Ticket>(`/tickets/${id}`);
    return data;
  },

  generate: async (ticketData: GenerateTicketsData): Promise<{
    message: string;
    data: {
      success: boolean;
      cantidad: number;
      empresa: string;
      tickets: Ticket[];
    };
  }> => {
    const { data } = await axios.post('/tickets', ticketData);
    return data;
  },

  update: async (id: number, ticketData: UpdateTicketData): Promise<{ 
    message: string; 
    data: Ticket 
  }> => {
    const { data } = await axios.put<{ message: string; data: Ticket }>(
      `/tickets/${id}`, 
      ticketData
    );
    return data;
  },

  delete: async (id: number): Promise<{ message: string }> => {
    const { data } = await axios.delete<{ message: string }>(`/tickets/${id}`);
    return data;
  },

  getEstadisticas: async (): Promise<Record<string, number>> => {
    const { data } = await axios.get<Record<string, number>>('/tickets-estadisticas');
    return data;
  },

  exportPDF: async (filters?: TicketFilters): Promise<Blob> => {
    const { data } = await axios.get('/tickets-exportar/pdf', {
      params: filters,
      responseType: 'blob',
    });
    return data;
  },

  exportExcel: async (filters?: TicketFilters): Promise<Blob> => {
    const { data } = await axios.get('/tickets-exportar/excel', {
      params: filters,
      responseType: 'blob',
    });
    return data;
  },
};