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
      let message = 'Error al crear empresa';
      
      // Manejar error 413 (Request Entity Too Large)
      if (error.response?.status === 413) {
        message = 'El archivo es demasiado grande. Por favor, reduce el tamaño de la imagen (máximo 5MB) o comprímela antes de subirla.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      
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
      let message = 'Error al actualizar empresa';
      
      // Manejar error 413 (Request Entity Too Large)
      if (error.response?.status === 413) {
        message = 'El archivo es demasiado grande. Por favor, reduce el tamaño de la imagen (máximo 5MB) o comprímela antes de subirla.';
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      
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