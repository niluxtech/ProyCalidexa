<?php

namespace App\Repositories;

use App\Models\Ticket;
use Illuminate\Support\Facades\DB;

class TicketRepository
{
    public function all()
    {
        return Ticket::with('empresa')->orderBy('created_at', 'desc')->get();
    }

    public function paginate($perPage = 50)
    {
        return Ticket::with('empresa')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function find($id)
    {
        return Ticket::with('empresa')->findOrFail($id);
    }

    public function findByCodigo($codigo)
    {
        return Ticket::with('empresa')
            ->where('codigo_ticket', $codigo)
            ->first();
    }

    public function filtrar($filters, $perPage = 50)
    {
        $query = Ticket::with('empresa');

        if (isset($filters['empresa_id'])) {
            $query->where('empresa_id', $filters['empresa_id']);
        }

        if (isset($filters['estado'])) {
            $query->where('estado', $filters['estado']);
        }

        if (isset($filters['fecha_desde'])) {
            $query->whereDate('created_at', '>=', $filters['fecha_desde']);
        }

        if (isset($filters['fecha_hasta'])) {
            $query->whereDate('created_at', '<=', $filters['fecha_hasta']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function contarPorEstado()
    {
        return Ticket::select('estado', DB::raw('count(*) as total'))
            ->groupBy('estado')
            ->pluck('total', 'estado');
    }

    public function obtenerUltimoCorrelativo($empresaId)
    {
        $ultimoTicket = Ticket::where('empresa_id', $empresaId)
            ->orderBy('id', 'desc')
            ->first();

        if (!$ultimoTicket) {
            return 0;
        }

        // Extraer número del formato: CODIGO-TCK-###
        preg_match('/-TCK-(\d+)$/', $ultimoTicket->codigo_ticket, $matches);
        return isset($matches[1]) ? (int)$matches[1] : 0;
    }

    public function create(array $data)
    {
        return Ticket::create($data);
    }

    public function update($id, array $data)
    {
        $ticket = $this->find($id);
        $ticket->update($data);
        return $ticket->fresh();
    }

    public function delete($id)
    {
        $ticket = $this->find($id);
        return $ticket->delete();
    }
}