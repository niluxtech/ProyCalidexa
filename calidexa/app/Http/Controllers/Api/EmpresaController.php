<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\EmpresaService;
use App\Http\Requests\StoreEmpresaRequest;
use App\Http\Requests\UpdateEmpresaRequest;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    protected $empresaService;

    public function __construct(EmpresaService $empresaService)
    {
        $this->empresaService = $empresaService;
    }

    public function index(Request $request)
    {
        $empresas = $request->has('buscar')
            ? $this->empresaService->buscar($request->buscar)
            : $this->empresaService->listar($request->get('per_page', 15));

        return response()->json($empresas);
    }

    public function store(StoreEmpresaRequest $request)
    {
        $empresa = $this->empresaService->crear($request->validated());

        return response()->json([
            'message' => 'Empresa creada exitosamente',
            'data' => $empresa
        ], 201);
    }

    public function show($id)
    {
        $empresa = $this->empresaService->obtenerPorId($id);
        return response()->json($empresa);
    }

    public function update(UpdateEmpresaRequest $request, $id)
    {
        $empresa = $this->empresaService->actualizar($id, $request->validated());

        return response()->json([
            'message' => 'Empresa actualizada exitosamente',
            'data' => $empresa
        ]);
    }

    public function destroy($id)
    {
        $this->empresaService->eliminar($id);

        return response()->json([
            'message' => 'Empresa eliminada exitosamente'
        ]);
    }

    public function activas(Request $request)
    {
        $empresas = $request->has('buscar')
            ? $this->empresaService->buscar($request->buscar)
            : $this->empresaService->listarActivas();

        return response()->json($empresas);
    }

    public function showBySlug($slug)
    {
        $empresa = $this->empresaService->obtenerPorSlug($slug);
        return response()->json($empresa);
    }

    public function selectOptions()
    {
        $empresas = $this->empresaService->obtenerParaSelect();
        return response()->json($empresas);
    }
}