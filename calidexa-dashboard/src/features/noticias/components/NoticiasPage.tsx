import { useState } from 'react';
import { Plus, Newspaper } from 'lucide-react';
import {
  useNoticias,
  useCreateNoticia,
  useUpdateNoticia,
  useDeleteNoticia,
} from '../hooks/useNoticias';
import { NoticiaCard } from './NoticiaCard';
import { NoticiaForm } from './NoticiaForm';
import { Loading } from '../../../components/common';
import { Button, Modal } from '../../../components/ui';
import type { Noticia } from '../../../types';

export const NoticiasPage = () => {
  const { data, isLoading } = useNoticias();
  const createMutation = useCreateNoticia();
  const updateMutation = useUpdateNoticia();
  const deleteMutation = useDeleteNoticia();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noticiaToDelete, setNoticiaToDelete] = useState<Noticia | undefined>();

  const handleCreate = () => {
    setSelectedNoticia(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (noticia: Noticia) => {
    setSelectedNoticia(noticia);
    setIsModalOpen(true);
  };

  const handleDelete = (noticia: Noticia) => {
    setNoticiaToDelete(noticia);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (noticiaToDelete) {
      deleteMutation.mutate(noticiaToDelete.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setNoticiaToDelete(undefined);
        },
      });
    }
  };

  const onSubmit = (data: any) => {
    const formData: any = { ...data };

    if (data.imagen && data.imagen[0]) {
      formData.imagen = data.imagen[0];
    } else {
      delete formData.imagen;
    }

    if (selectedNoticia) {
      updateMutation.mutate(
        { id: selectedNoticia.id, data: formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedNoticia(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Noticias</h1>
          <p className="text-sm text-gray-600 mt-1">Gestiona las noticias publicadas</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus className="h-5 w-5 mr-2" />
          Nueva Noticia
        </Button>
      </div>

      {/* Grid */}
      {data?.data.length === 0 ? (
        <div className="text-center py-12">
          <Newspaper className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No hay noticias</h3>
          <p className="mt-2 text-sm text-gray-500">
            Comienza creando tu primera noticia
          </p>
          <Button variant="primary" className="mt-4" onClick={handleCreate}>
            <Plus className="h-5 w-5 mr-2" />
            Nueva Noticia
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((noticia) => (
            <NoticiaCard
              key={noticia.id}
              noticia={noticia}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNoticia(undefined);
        }}
        title={selectedNoticia ? 'Editar Noticia' : 'Nueva Noticia'}
        size="xl"
      >
        <NoticiaForm
          noticia={selectedNoticia}
          onSubmit={onSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedNoticia(undefined);
          }}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setNoticiaToDelete(undefined);
        }}
        title="Eliminar Noticia"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            ¿Estás seguro de eliminar la noticia{' '}
            <span className="font-semibold">{noticiaToDelete?.titulo}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setNoticiaToDelete(undefined);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={deleteMutation.isPending}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};