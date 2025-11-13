<?php

namespace App\Services;

use App\Repositories\TicketRepository;
use App\Repositories\EmpresaRepository;
use Illuminate\Support\Facades\DB;

class TicketService
{
    protected $ticketRepository;
    protected $empresaRepository;

    public function __construct(
        TicketRepository $ticketRepository,
        EmpresaRepository $empresaRepository
    ) {
        $this->ticketRepository = $ticketRepository;
        $this->empresaRepository = $empresaRepository;
    }

    public function listar($perPage = 50)
    {
        return $this->ticketRepository->paginate($perPage);
    }

    public function filtrar(array $filters, $perPage = 50)
    {
        return $this->ticketRepository->filtrar($filters, $perPage);
    }

    public function obtenerPorId($id)
    {
        return $this->ticketRepository->find($id);
    }

    public function consultarPorCodigo($codigo)
    {
        return $this->ticketRepository->findByCodigo($codigo);
    }

    public function generarTickets($empresaId, $cantidad)
    {
        $empresa = $this->empresaRepository->find($empresaId);
        
        // Obtener último correlativo
        $ultimoCorrelativo = $this->ticketRepository->obtenerUltimoCorrelativo($empresaId);
        
        $ticketsGenerados = [];

        DB::beginTransaction();
        
        try {
            for ($i = 1; $i <= $cantidad; $i++) {
                $correlativo = $ultimoCorrelativo + $i;
                $codigoTicket = $this->generarCodigoTicket($empresa->codigo, $correlativo);
                
                $ticket = $this->ticketRepository->create([
                    'empresa_id' => $empresaId,
                    'codigo_ticket' => $codigoTicket,
                    'estado' => 'pendiente',
                ]);
                
                $ticketsGenerados[] = $ticket;
            }
            
            DB::commit();
            
            return [
                'success' => true,
                'cantidad' => $cantidad,
                'tickets' => $ticketsGenerados,
                'empresa' => $empresa->nombre,
            ];
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    public function actualizarEstado($id, $estado, $resultado = null, $premio = null)
    {
        return $this->ticketRepository->update($id, [
            'estado' => $estado,
            'resultado' => $resultado,
            'premio' => $premio,
        ]);
    }

    public function anular($id)
    {
        return $this->ticketRepository->update($id, [
            'estado' => 'anulado',
        ]);
    }

    public function obtenerEstadisticas()
    {
        return $this->ticketRepository->contarPorEstado();
    }

    private function generarCodigoTicket($codigoEmpresa, $correlativo)
    {
        return sprintf('%s-TCK-%d', $codigoEmpresa, $correlativo);
    }
}