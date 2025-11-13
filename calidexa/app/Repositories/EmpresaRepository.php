<?php

namespace App\Repositories;

use App\Models\Empresa;
use Illuminate\Support\Str;

class EmpresaRepository
{
    public function all()
    {
        return Empresa::orderBy('nombre')->get();
    }

    public function activas()
    {
        return Empresa::activas()->orderBy('nombre')->get();
    }

    public function paginate($perPage = 15)
    {
        return Empresa::orderBy('nombre')->paginate($perPage);
    }

    public function find($id)
    {
        return Empresa::findOrFail($id);
    }

    public function findBySlug($slug)
    {
        return Empresa::where('slug', $slug)->firstOrFail();
    }

    public function buscar($termino, $perPage = 15)
    {
        return Empresa::buscar($termino)->paginate($perPage);
    }

    public function create(array $data)
    {
        // Generar slug si no existe
        if (!isset($data['slug']) || empty($data['slug'])) {
            $data['slug'] = Str::slug($data['nombre']);
        }

        // Generar código único
        if (!isset($data['codigo']) || empty($data['codigo'])) {
            $data['codigo'] = $this->generarCodigoUnico();
        }

        return Empresa::create($data);
    }

    public function update($id, array $data)
    {
        $empresa = $this->find($id);
        
        // Actualizar slug si cambia el nombre
        if (isset($data['nombre']) && $data['nombre'] !== $empresa->nombre) {
            $data['slug'] = Str::slug($data['nombre']);
        }

        $empresa->update($data);
        return $empresa->fresh();
    }

    public function delete($id)
    {
        $empresa = $this->find($id);
        return $empresa->delete();
    }

    private function generarCodigoUnico()
    {
        do {
            $codigo = strtoupper(Str::random(9));
        } while (Empresa::where('codigo', $codigo)->exists());

        return $codigo;
    }
}