import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { empresasService, type CreateEmpresaData } from '../../../api/empresas';


export const useCreateEmpresa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmpresaData) => empresasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      toast.success('Empresa creada exitosamente');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al crear empresa';
      toast.error(message);
    },
  });
};

export const useUpdateEmpresa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateEmpresaData> }) =>
      empresasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      toast.success('Empresa actualizada exitosamente');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al actualizar empresa';
      toast.error(message);
    },
  });
};

export const useDeleteEmpresa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => empresasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      toast.success('Empresa eliminada exitosamente');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al eliminar empresa';
      toast.error(message);
    },
  });
};