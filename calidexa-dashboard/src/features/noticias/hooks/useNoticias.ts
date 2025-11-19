import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { noticiasService, type CreateNoticiaData } from '../../../api/noticias';

export const useNoticias = (perPage: number = 15) => {
  return useQuery({
    queryKey: ['noticias', perPage],
    queryFn: () => noticiasService.getAll({ per_page: perPage }),
  });
};

export const useCategorias = () => {
  return useQuery({
    queryKey: ['categorias'],
    queryFn: noticiasService.getCategorias,
    staleTime: Infinity, // No refetch automático
  });
};

export const useCreateNoticia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNoticiaData) => noticiasService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
      toast.success('Noticia creada exitosamente');
    },
    onError: (error: any) => {
      let message = 'Error al crear noticia';
      
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

export const useUpdateNoticia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateNoticiaData> }) =>
      noticiasService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
      toast.success('Noticia actualizada exitosamente');
    },
    onError: (error: any) => {
      let message = 'Error al actualizar noticia';
      
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

export const useDeleteNoticia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => noticiasService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noticias'] });
      toast.success('Noticia eliminada exitosamente');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al eliminar noticia';
      toast.error(message);
    },
  });
};