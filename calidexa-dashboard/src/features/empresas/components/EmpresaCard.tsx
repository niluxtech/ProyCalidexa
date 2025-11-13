import { Building2, Edit, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui";
import type { Empresa } from "../../../types";


interface EmpresaCardProps {
  empresa: Empresa;
  onEdit: (empresa: Empresa) => void;
  onDelete: (empresa: Empresa) => void;
}

export const EmpresaCard = ({ empresa, onEdit, onDelete }: EmpresaCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
      {/* Logo o Icono */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {empresa.logo_url ? (
            <img
              src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}/storage/${empresa.logo_url}`}
              alt={empresa.nombre}
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
              <Building2 className="h-6 w-6 text-primary-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{empresa.nombre}</h3>
            <p className="text-xs text-gray-500">{empresa.codigo}</p>
          </div>
        </div>

        {/* Badge Estado */}
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            empresa.estado === 'Activo'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {empresa.estado}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Nivel:</span> {empresa.nivel}
        </p>
        {empresa.descripcion && (
          <p className="text-sm text-gray-600 line-clamp-2">{empresa.descripcion}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(empresa)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(empresa)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </div>
    </div>
  );
};