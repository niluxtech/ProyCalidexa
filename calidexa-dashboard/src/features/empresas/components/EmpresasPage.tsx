import { useState } from 'react';
import { Building2, Plus, Search } from 'lucide-react';
import { useEmpresas } from '../hooks/useEmpresas';
import { useCreateEmpresa, useUpdateEmpresa, useDeleteEmpresa } from '../hooks/useEmpresaForm';
import { EmpresaCard } from './EmpresaCard';
import { EmpresaForm } from './EmpresaForm';
import { Loading } from '../../../components/common';
import { Button, Modal } from '../../../components/ui';
import type { Empresa } from '../../../types';


export const EmpresasPage = () => {
  const { data, isLoading, search, setSearch } = useEmpresas();
  const createMutation = useCreateEmpresa();
  const updateMutation = useUpdateEmpresa();
  const deleteMutation = useDeleteEmpresa();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [empresaToDelete, setEmpresaToDelete] = useState<Empresa | undefined>();

  const handleCreate = () => {
    setSelectedEmpresa(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setIsModalOpen(true);
  };

  const handleDelete = (empresa: Empresa) => {
    setEmpresaToDelete(empresa);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (empresaToDelete) {
      deleteMutation.mutate(empresaToDelete.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setEmpresaToDelete(undefined);
        },
      });
    }
  };

  const onSubmit = (data: any) => {
    // Convertir File a FormData
    const formData: any = { ...data };
    
    if (data.logo && data.logo[0]) {
      formData.logo = data.logo[0];
    } else {
      delete formData.logo;
    }

    if (selectedEmpresa) {
      updateMutation.mutate(
        { id: selectedEmpresa.id, data: formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedEmpresa(undefined);
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
          <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gestiona las empresas certificadas
          </p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus className="h-5 w-5 mr-2" />
          Nueva Empresa
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar empresas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Grid */}
      {data?.data.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No hay empresas</h3>
          <p className="mt-2 text-sm text-gray-500">
            Comienza creando tu primera empresa
          </p>
          <Button variant="primary" className="mt-4" onClick={handleCreate}>
            <Plus className="h-5 w-5 mr-2" />
            Nueva Empresa
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((empresa) => (
            <EmpresaCard
              key={empresa.id}
              empresa={empresa}
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
          setSelectedEmpresa(undefined);
        }}
        title={selectedEmpresa ? 'Editar Empresa' : 'Nueva Empresa'}
        size="lg"
      >
        <EmpresaForm
          empresa={selectedEmpresa}
          onSubmit={onSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedEmpresa(undefined);
          }}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEmpresaToDelete(undefined);
        }}
        title="Eliminar Empresa"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            ¿Estás seguro de eliminar la empresa{' '}
            <span className="font-semibold">{empresaToDelete?.nombre}</span>? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setEmpresaToDelete(undefined);
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