import { Calendar, Edit, Trash2, Newspaper } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '../../../components/ui';
import type { Noticia } from '../../../types';

interface NoticiaCardProps {
  noticia: Noticia;
  onEdit: (noticia: Noticia) => void;
  onDelete: (noticia: Noticia) => void;
}

export const NoticiaCard = ({ noticia, onEdit, onDelete }: NoticiaCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      {/* Imagen o Placeholder */}
      {noticia.imagen ? (
        <img
          src={noticia.imagen}
          alt={noticia.titulo}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
          <Newspaper className="h-16 w-16 text-primary-600" />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Badge Categoría */}
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 mb-2">
          {noticia.categoria}
        </span>

        {/* Título */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          {noticia.titulo}
        </h3>

        {/* Extracto */}
        {noticia.extracto && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{noticia.extracto}</p>
        )}

        {/* Fecha */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Calendar className="h-4 w-4" />
          {noticia.publicado_at
            ? formatDistanceToNow(new Date(noticia.publicado_at), {
                addSuffix: true,
                locale: es,
              })
            : 'Sin publicar'}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(noticia)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(noticia)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};