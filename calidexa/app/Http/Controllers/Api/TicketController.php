<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TicketService;
use App\Services\EmpresaService;
use App\Http\Requests\GenerarTicketsRequest;
use App\Http\Requests\UpdateTicketRequest;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TicketsExport;

class TicketController extends Controller
{
    protected $ticketService;
    protected $empresaService;

    public function __construct(
        TicketService $ticketService,
        EmpresaService $empresaService
    ) {
        $this->ticketService = $ticketService;
        $this->empresaService = $empresaService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['empresa_id', 'estado', 'fecha_desde', 'fecha_hasta']);
        
        $tickets = !empty($filters)
            ? $this->ticketService->filtrar($filters, $request->get('per_page', 50))
            : $this->ticketService->listar($request->get('per_page', 50));

        return response()->json($tickets);
    }

    public function store(GenerarTicketsRequest $request)
    {
        $resultado = $this->ticketService->generarTickets(
            $request->validated()['empresa_id'],
            $request->validated()['cantidad']
        );

        if ($resultado['success']) {
            return response()->json([
                'message' => "Se generaron {$resultado['cantidad']} tickets para {$resultado['empresa']}",
                'data' => $resultado
            ], 201);
        }

        return response()->json([
            'message' => 'Error al generar tickets',
            'error' => $resultado['error']
        ], 500);
    }

    public function show($id)
    {
        $ticket = $this->ticketService->obtenerPorId($id);
        return response()->json($ticket);
    }

    public function update(UpdateTicketRequest $request, $id)
    {
        $validated = $request->validated();
        
        $ticket = $this->ticketService->actualizarEstado(
            $id,
            $validated['estado'],
            $validated['resultado'] ?? null,
            $validated['premio'] ?? null
        );

        return response()->json([
            'message' => 'Ticket actualizado exitosamente',
            'data' => $ticket
        ]);
    }

    public function destroy($id)
    {
        $this->ticketService->anular($id);

        return response()->json([
            'message' => 'Ticket anulado exitosamente'
        ]);
    }

    public function consultarPorCodigo(Request $request)
    {
        $request->validate([
            'codigo_ticket' => 'required|string',
        ]);

        $ticket = $this->ticketService->consultarPorCodigo($request->codigo_ticket);

        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket no encontrado'
            ], 404);
        }

        return response()->json($ticket);
    }

    public function estadisticas()
    {
        $estadisticas = $this->ticketService->obtenerEstadisticas();
        return response()->json($estadisticas);
    }

    public function exportarPDF(Request $request)
    {
        $filters = $request->only(['empresa_id', 'estado', 'fecha_desde', 'fecha_hasta']);
        $tickets = $this->ticketService->filtrar($filters, 10000)->items();

        $pdf = Pdf::loadView('exports.tickets-pdf', compact('tickets'));
        
        return $pdf->download('tickets-' . now()->format('Y-m-d') . '.pdf');
    }

    public function exportarExcel(Request $request)
    {
        $filters = $request->only(['empresa_id', 'estado', 'fecha_desde', 'fecha_hasta']);
        
        return Excel::download(
            new TicketsExport($filters),
            'tickets-' . now()->format('Y-m-d') . '.xlsx'
        );
    }

    public function exportarPorEmpresaPDF($slug)
    {
        $empresa = $this->empresaService->obtenerPorSlug($slug);
        $filters = ['empresa_id' => $empresa->id];
        $tickets = $this->ticketService->filtrar($filters, 10000)->items();

        $pdf = Pdf::loadView('exports.tickets-pdf', compact('tickets', 'empresa'));
        
        return $pdf->download("tickets-{$slug}-" . now()->format('Y-m-d') . '.pdf');
    }

    public function exportarPorEmpresaExcel($slug)
    {
        $empresa = $this->empresaService->obtenerPorSlug($slug);
        $filters = ['empresa_id' => $empresa->id];
        
        return Excel::download(
            new TicketsExport($filters),
            "tickets-{$slug}-" . now()->format('Y-m-d') . '.xlsx'
        );
    }
}