import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Filter, X } from 'lucide-react';
import { useEmpresasSelect } from '../hooks/useTickets';
import { TicketFilters as TicketFiltersType } from '@/api/tickets'; // ← IMPORTAR TIPO

interface TicketFiltersProps {
  filters: TicketFiltersType; // ← USAR TIPO CORRECTO
  onFilterChange: (filters: TicketFiltersType) => void;
  onClearFilters: () => void;
}

export const TicketFilters = ({ filters, onFilterChange, onClearFilters }: TicketFiltersProps) => {
  const { data: empresas } = useEmpresasSelect();

  const empresasOptions = empresas
    ? [
        { value: '', label: 'Todas las empresas' },
        ...Object.entries(empresas).map(([id, nombre]) => ({
          value: id,
          label: nombre,
        })),
      ]
    : [];

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== '');

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium text-gray-900">Filtros</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="ml-auto">
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          value={filters.empresa_id?.toString() || ''} // ← CONVERTIR A STRING PARA SELECT
          onChange={(e) =>
            onFilterChange({
              ...filters,
              empresa_id: e.target.value ? parseInt(e.target.value) : undefined, // ← CONVERTIR A NUMBER
            })
          }
          options={empresasOptions}
        />

        <Select
          value={filters.estado || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              estado: (e.target.value as 'pendiente' | 'ocupado' | 'anulado' | undefined) || undefined,
            })
          }
          options={[
            { value: '', label: 'Todos los estados' },
            { value: 'pendiente', label: 'Pendiente' },
            { value: 'ocupado', label: 'Ocupado' },
            { value: 'anulado', label: 'Anulado' },
          ]}
        />

        <Input
          type="date"
          value={filters.fecha_desde || ''}
          onChange={(e) =>
            onFilterChange({ ...filters, fecha_desde: e.target.value || undefined })
          }
          placeholder="Fecha desde"
        />

        <Input
          type="date"
          value={filters.fecha_hasta || ''}
          onChange={(e) =>
            onFilterChange({ ...filters, fecha_hasta: e.target.value || undefined })
          }
          placeholder="Fecha hasta"
        />
      </div>
    </div>
  );
};