import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCategorias } from '../hooks/useNoticias';
import { Input, Select, Textarea, Button } from '../../../components/ui';
import type { Noticia } from '../../../types';

const noticiaSchema = z.object({
  titulo: z.string().min(1, 'Título es requerido').max(255),
  categoria: z.string().min(1, 'Categoría es requerida'),
  contenido: z.string().min(1, 'Contenido es requerido'),
  video_url: z.string().url('URL inválida').optional().or(z.literal('')),
  publicado_at: z.string().optional(),
  imagen: z.any().optional(),
});

type NoticiaFormData = z.infer<typeof noticiaSchema>;

interface NoticiaFormProps {
  noticia?: Noticia;
  onSubmit: (data: NoticiaFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<NoticiaFormData>;
}

export const NoticiaForm = ({ noticia, onSubmit, onCancel, isLoading, defaultValues }: NoticiaFormProps) => {
  const { data: categorias } = useCategorias();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticiaFormData>({
    resolver: zodResolver(noticiaSchema),
    defaultValues: defaultValues || (noticia
      ? {
          titulo: noticia.titulo,
          categoria: noticia.categoria,
          contenido: noticia.contenido,
          video_url: noticia.video_url || '',
          publicado_at: noticia.publicado_at
            ? new Date(noticia.publicado_at).toISOString().slice(0, 16)
            : '',
        }
      : {
          categoria: 'General',
          publicado_at: new Date().toISOString().slice(0, 16),
        }),
  });

  const categoriasOptions =
    categorias
      ? Object.entries(categorias).map(([key, value]) => ({
          value: key,
          label: value,
        }))
      : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('titulo')}
        label="Título"
        placeholder="Título de la noticia"
        error={errors.titulo?.message}
      />

      <Select
        {...register('categoria')}
        label="Categoría"
        options={categoriasOptions}
        error={errors.categoria?.message}
      />

      <Textarea
        {...register('contenido')}
        label="Contenido"
        placeholder="Contenido de la noticia (puede incluir HTML)"
        rows={8}
        error={errors.contenido?.message}
      />

      <Input
        {...register('video_url')}
        label="URL del Video (opcional)"
        placeholder="https://youtube.com/..."
        error={errors.video_url?.message}
      />

      <Input
        {...register('publicado_at')}
        label="Fecha de Publicación"
        type="datetime-local"
        error={errors.publicado_at?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Imagen (opcional)
        </label>
        <input
          {...register('imagen', {
            validate: (files) => {
              if (files && files[0]) {
                const file = files[0];
                const maxSize = 5 * 1024 * 1024; // 5MB en bytes
                if (file.size > maxSize) {
                  return 'El archivo es demasiado grande. El tamaño máximo es 5MB.';
                }
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!validTypes.includes(file.type)) {
                  return 'El archivo debe ser una imagen JPG o PNG.';
                }
              }
              return true;
            },
          })}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
        <p className="mt-1 text-xs text-gray-500">JPG, PNG (máx. 5MB)</p>
        {errors.imagen && (
          <p className="mt-1 text-xs text-red-600">{errors.imagen.message as string}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {noticia ? 'Actualizar' : 'Crear'} Noticia
        </Button>
      </div>
    </form>
  );
};