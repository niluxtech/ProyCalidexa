<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NoticiaService;
use App\Http\Requests\StoreNoticiaRequest;
use App\Http\Requests\UpdateNoticiaRequest;
use Illuminate\Http\Request;

class NoticiaController extends Controller
{
    protected $noticiaService;

    public function __construct(NoticiaService $noticiaService)
    {
        $this->noticiaService = $noticiaService;
    }

    public function index(Request $request)
    {
        $noticias = $this->noticiaService->listar($request->get('per_page', 15));
        return response()->json($noticias);
    }

    public function store(StoreNoticiaRequest $request)
    {
        $noticia = $this->noticiaService->crear($request->validated());

        return response()->json([
            'message' => 'Noticia creada exitosamente',
            'data' => $noticia
        ], 201);
    }

    public function show($id)
    {
        $noticia = $this->noticiaService->obtenerPorId($id);
        return response()->json($noticia);
    }

    public function update(UpdateNoticiaRequest $request, $id)
    {
        $noticia = $this->noticiaService->actualizar($id, $request->validated());

        return response()->json([
            'message' => 'Noticia actualizada exitosamente',
            'data' => $noticia
        ]);
    }

    public function destroy($id)
    {
        $this->noticiaService->eliminar($id);

        return response()->json([
            'message' => 'Noticia eliminada exitosamente'
        ]);
    }

    public function publicadas(Request $request)
    {
        $noticias = $this->noticiaService->listarPublicadas($request->get('per_page', 12));
        return response()->json($noticias);
    }

    public function porCategoria(Request $request, $categoria)
    {
        $noticias = $this->noticiaService->listarPorCategoria(
            $categoria,
            $request->get('per_page', 12)
        );
        return response()->json($noticias);
    }

    public function showBySlug($slug)
    {
        $noticia = $this->noticiaService->obtenerPorSlug($slug);
        return response()->json($noticia);
    }

    public function categorias()
    {
        $categorias = $this->noticiaService->obtenerCategorias();
        return response()->json($categorias);
    }
}