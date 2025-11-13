import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select, Textarea, Button } from '../../../components/ui';
import type { Empresa } from '../../../types';


const empresaSchema = z.object({
  nombre: z.string().min(1, 'Nombre es requerido').max(255),
  ruc: z.string().length(11, 'RUC debe tener 11 dígitos'),
  nivel: z.enum(['Sello', 'Certificado']),
  estado: z.enum(['Activo', 'Inactivo']),
  descripcion: z.string().optional(),
  logo: z.any().optional(),
});

type EmpresaFormData = z.infer<typeof empresaSchema>;

interface EmpresaFormProps {
  empresa?: Empresa;
  onSubmit: (data: EmpresaFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EmpresaForm = ({ empresa, onSubmit, onCancel, isLoading }: EmpresaFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
    defaultValues: empresa
      ? {
          nombre: empresa.nombre,
          ruc: empresa.ruc,
          nivel: empresa.nivel,
          estado: empresa.estado,
          descripcion: empresa.descripcion || '',
        }
      : {
          nivel: 'Sello',
          estado: 'Activo',
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('nombre')}
        label="Nombre de la Empresa"
        placeholder="Ej: BrianSac"
        error={errors.nombre?.message}
      />

      <Input
        {...register('ruc')}
        label="RUC"
        placeholder="20123456789"
        maxLength={11}
        error={errors.ruc?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          {...register('nivel')}
          label="Nivel"
          options={[
            { value: 'Sello', label: 'Sello' },
            { value: 'Certificado', label: 'Certificado' },
          ]}
          error={errors.nivel?.message}
        />

        <Select
          {...register('estado')}
          label="Estado"
          options={[
            { value: 'Activo', label: 'Activo' },
            { value: 'Inactivo', label: 'Inactivo' },
          ]}
          error={errors.estado?.message}
        />
      </div>

      <Textarea
        {...register('descripcion')}
        label="Descripción (opcional)"
        placeholder="Breve descripción de la empresa"
        rows={4}
        error={errors.descripcion?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo (opcional)
        </label>
        <input
          {...register('logo')}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
        <p className="mt-1 text-xs text-gray-500">JPG, PNG (máx. 2MB)</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {empresa ? 'Actualizar' : 'Crear'} Empresa
        </Button>
      </div>
    </form>
  );
};