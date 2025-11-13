import { useState } from "react";
import { Plus, Download, FileSpreadsheet } from "lucide-react";
import {
  useTickets,
  useGenerateTickets,
  useUpdateTicket,
  useDeleteTicket,
} from "../hooks/useTickets";
import { GenerateTicketsForm } from "./GenerateTicketsForm";
import { EditTicketForm } from "./EditTicketForm";
import { TicketFilters } from "./TicketFilters";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Loading } from "@/components/common/Loading";
import { Ticket } from "@/types";
import { ticketsService, TicketFilters as TicketFiltersType } from '@/api/tickets';
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const TicketsPage = () => {
  const [filters, setFilters] = useState<TicketFiltersType>({});
  const { data, isLoading } = useTickets(filters);
  const generateMutation = useGenerateTickets();
  const updateMutation = useUpdateTicket();
  const deleteMutation = useDeleteTicket();

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();

  const handleGenerate = (data: { empresa_id: number; cantidad: number }) => {
    generateMutation.mutate(data, {
      onSuccess: () => {
        setIsGenerateModalOpen(false);
      },
    });
  };

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (data: any) => {
    if (selectedTicket) {
      updateMutation.mutate(
        { id: selectedTicket.id, data },
        {
          onSuccess: () => {
            setIsEditModalOpen(false);
            setSelectedTicket(undefined);
          },
        }
      );
    }
  };

  const handleDelete = (ticket: Ticket) => {
    if (confirm(`¿Anular ticket ${ticket.codigo_ticket}?`)) {
      deleteMutation.mutate(ticket.id);
    }
  };

  const handleExportPDF = async () => {
    try {
      const blob = await ticketsService.exportPDF(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tickets-${format(new Date(), "yyyy-MM-dd")}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("PDF descargado exitosamente");
    } catch (error) {
      toast.error("Error al exportar PDF");
    }
  };

  const handleExportExcel = async () => {
    try {
      const blob = await ticketsService.exportExcel(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tickets-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Excel descargado exitosamente");
    } catch (error) {
      toast.error("Error al exportar Excel");
    }
  };

  const getEstadoBadge = (estado: string) => {
    const styles = {
      pendiente: "bg-yellow-100 text-yellow-800",
      ocupado: "bg-green-100 text-green-800",
      anulado: "bg-red-100 text-red-800",
    };
    return styles[estado as keyof typeof styles] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gestiona los tickets de sorteos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExportExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsGenerateModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Generar Tickets
          </Button>
        </div>
      </div>

      {/* Filters */}
      <TicketFilters
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={() => setFilters({})}
      />

      {/* Table */}
      {data?.data.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No se encontraron tickets</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Premio</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium text-gray-900">
                  {ticket.codigo_ticket}
                </TableCell>
                <TableCell className="text-gray-600">
                  {ticket.empresa?.nombre || "-"}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getEstadoBadge(
                      ticket.estado
                    )}`}
                  >
                    {ticket.estado}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">
                  {ticket.resultado || "-"}
                </TableCell>
                <TableCell className="text-gray-600">
                  {ticket.premio || "-"}
                </TableCell>
                <TableCell className="text-gray-500 text-xs">
                  {format(new Date(ticket.created_at), "dd/MM/yyyy HH:mm", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(ticket)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(ticket)}
                    >
                      Anular
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Generate Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generar Tickets"
        size="md"
      >
        <GenerateTicketsForm
          onSubmit={handleGenerate}
          onCancel={() => setIsGenerateModalOpen(false)}
          isLoading={generateMutation.isPending}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTicket(undefined);
        }}
        title="Editar Ticket"
        size="md"
      >
        {selectedTicket && (
          <EditTicketForm
            ticket={selectedTicket}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedTicket(undefined);
            }}
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>
    </div>
  );
};
