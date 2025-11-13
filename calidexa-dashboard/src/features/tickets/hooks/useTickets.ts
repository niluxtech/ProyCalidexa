import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ticketsService, TicketFilters, GenerateTicketsData, UpdateTicketData } from '@/api/tickets';
import { empresasService } from '@/api/empresas';

// ← ELIMINAR useState, recibir filters como parámetro
export const useTickets = (filters: TicketFilters = {}) => {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => ticketsService.getAll(filters),
  });
};

export const useGenerateTickets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateTicketsData) => ticketsService.generate(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success(data.message);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al generar tickets';
      toast.error(message);
    },
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTicketData }) =>
      ticketsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Ticket actualizado exitosamente');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al actualizar ticket';
      toast.error(message);
    },
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ticketsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Ticket anulado exitosamente');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al anular ticket';
      toast.error(message);
    },
  });
};

export const useEmpresasSelect = () => {
  return useQuery({
    queryKey: ['empresas-select'],
    queryFn: () => empresasService.getSelectOptions(),
  });
};