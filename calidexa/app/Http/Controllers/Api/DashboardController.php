<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\EmpresaService;
use App\Services\NoticiaService;
use App\Services\TicketService;

class DashboardController extends Controller
{
    protected $empresaService;
    protected $noticiaService;
    protected $ticketService;

    public function __construct(
        EmpresaService $empresaService,
        NoticiaService $noticiaService,
        TicketService $ticketService
    ) {
        $this->empresaService = $empresaService;
        $this->noticiaService = $noticiaService;
        $this->ticketService = $ticketService;
    }

    public function index()
    {
        $estadisticasTickets = $this->ticketService->obtenerEstadisticas();
        
        return response()->json([
            'kpis' => [
                'total_empresas' => $this->empresaService->listar(1)->total(),
                'total_noticias' => $this->noticiaService->listar(1)->total(),
                'tickets_pendientes' => $estadisticasTickets['pendiente'] ?? 0,
                'tickets_ocupados' => $estadisticasTickets['ocupado'] ?? 0,
                'tickets_anulados' => $estadisticasTickets['anulado'] ?? 0,
            ],
            'ultimos_registros' => [
                'empresas' => $this->empresaService->listar(5)->items(),
                'noticias' => $this->noticiaService->listar(5)->items(),
                'tickets' => $this->ticketService->listar(5)->items(),
            ]
        ]);
    }
}