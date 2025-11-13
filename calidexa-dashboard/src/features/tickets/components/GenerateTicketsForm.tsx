import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useEmpresasSelect } from '../hooks/useTickets';

// ← CAMBIAR A z.number() SIN COERCE
const generateTicketsSchema = z.object({
  empresa_id: z.string().min(1, 'Selecciona una empresa'),
  cantidad: z.number().min(1, 'Mínimo 1').max(1000, 'Máximo 1000'),
});

type GenerateTicketsFormData = z.infer<typeof generateTicketsSchema>;

interface GenerateTicketsFormProps {
  onSubmit: (data: { empresa_id: number; cantidad: number }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const GenerateTicketsForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: GenerateTicketsFormProps) => {
  const { data: empresas } = useEmpresasSelect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateTicketsFormData>({
    resolver: zodResolver(generateTicketsSchema),
    defaultValues: {
      cantidad: 10,
    },
  });

  const empresasOptions = empresas
    ? Object.entries(empresas).map(([id, nombre]) => ({
        value: id,
        label: nombre,
      }))
    : [];

  const handleFormSubmit: SubmitHandler<GenerateTicketsFormData> = (data) => {
    onSubmit({
      empresa_id: parseInt(data.empresa_id),
      cantidad: data.cantidad,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Select
        {...register('empresa_id')}
        label="Empresa"
        options={[{ value: '', label: 'Selecciona una empresa' }, ...empresasOptions]}
        error={errors.empresa_id?.message}
      />

      <Input
        {...register('cantidad', { valueAsNumber: true })} // ← AGREGAR valueAsNumber
        label="Cantidad de Tickets"
        type="number"
        min={1}
        max={1000}
        placeholder="Ej: 100"
        error={errors.cantidad?.message}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Se generarán tickets con formato: <strong>CODIGO_EMPRESA-TCK-###</strong>
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Generar Tickets
        </Button>
      </div>
    </form>
  );
};