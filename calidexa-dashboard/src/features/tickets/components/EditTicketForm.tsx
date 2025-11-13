import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Ticket } from '@/types';

const editTicketSchema = z.object({
  estado: z.enum(['pendiente', 'ocupado', 'anulado']),
  resultado: z.string().max(255).optional().or(z.literal('')),
  premio: z.string().max(255).optional().or(z.literal('')),
});

type EditTicketFormData = z.infer<typeof editTicketSchema>;

interface EditTicketFormProps {
  ticket: Ticket;
  onSubmit: (data: EditTicketFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EditTicketForm = ({ ticket, onSubmit, onCancel, isLoading }: EditTicketFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTicketFormData>({
    resolver: zodResolver(editTicketSchema),
    defaultValues: {
      estado: ticket.estado,
      resultado: ticket.resultado || '',
      premio: ticket.premio || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Info del Ticket */}
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Código:</p>
            <p className="font-medium text-gray-900">{ticket.codigo_ticket}</p>
          </div>
          <div>
            <p className="text-gray-600">Empresa:</p>
            <p className="font-medium text-gray-900">{ticket.empresa?.nombre}</p>
          </div>
        </div>
      </div>

      <Select
        {...register('estado')}
        label="Estado"
        options={[
          { value: 'pendiente', label: 'Pendiente' },
          { value: 'ocupado', label: 'Ocupado' },
          { value: 'anulado', label: 'Anulado' },
        ]}
        error={errors.estado?.message}
      />

      <Input
        {...register('resultado')}
        label="Resultado (opcional)"
        placeholder="Ej: Ganador"
        error={errors.resultado?.message}
      />

      <Input
        {...register('premio')}
        label="Premio (opcional)"
        placeholder="Ej: TV 50 pulgadas"
        error={errors.premio?.message}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Actualizar Ticket
        </Button>
      </div>
    </form>
  );
};