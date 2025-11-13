<?php

namespace App\Services;

use App\Repositories\EmpresaRepository;
use Illuminate\Support\Facades\Storage;

class EmpresaService
{
    protected $empresaRepository;

    public function __construct(EmpresaRepository $empresaRepository)
    {
        $this->empresaRepository = $empresaRepository;
    }

    public function listar($perPage = 15)
    {
        return $this->empresaRepository->paginate($perPage);
    }

    public function listarActivas()
    {
        return $this->empresaRepository->activas();
    }

    public function buscar($termino, $perPage = 15)
    {
        return $this->empresaRepository->buscar($termino, $perPage);
    }

    public function obtenerPorId($id)
    {
        return $this->empresaRepository->find($id);
    }

    public function obtenerPorSlug($slug)
    {
        return $this->empresaRepository->findBySlug($slug);
    }

    public function crear(array $data)
    {
        // Manejar logo si existe
        if (isset($data['logo']) && $data['logo']) {
            $data['logo_url'] = $this->guardarLogo($data['logo']);
            unset($data['logo']);
        }

        return $this->empresaRepository->create($data);
    }

    public function actualizar($id, array $data)
    {
        $empresa = $this->empresaRepository->find($id);

        // Manejar nuevo logo
        if (isset($data['logo']) && $data['logo']) {
            // Eliminar logo anterior si existe
            if ($empresa->logo_url) {
                $this->eliminarLogo($empresa->logo_url);
            }
            
            $data['logo_url'] = $this->guardarLogo($data['logo']);
            unset($data['logo']);
        }

        return $this->empresaRepository->update($id, $data);
    }

    public function eliminar($id)
    {
        $empresa = $this->empresaRepository->find($id);

        // Eliminar logo si existe
        if ($empresa->logo_url) {
            $this->eliminarLogo($empresa->logo_url);
        }

        return $this->empresaRepository->delete($id);
    }

    public function obtenerParaSelect()
    {
        return $this->empresaRepository->all()->pluck('nombre', 'id');
    }

    private function guardarLogo($file)
    {
        return $file->store('empresas/logos', 'public');
    }

    private function eliminarLogo($path)
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}