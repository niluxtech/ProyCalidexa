<?php

namespace App\Repositories;

use App\Models\Noticia;
use Illuminate\Support\Str;

class NoticiaRepository
{
    public function all()
    {
        return Noticia::orderBy('publicado_at', 'desc')->get();
    }

    public function publicadas($perPage = 12)
    {
        return Noticia::publicadas()->paginate($perPage);
    }

    public function destacadas()
    {
        return Noticia::destacadas()->get();
    }

    public function countDestacadas()
    {
        return Noticia::where('destacada', true)->count();
    }

    public function porCategoria($categoria, $perPage = 12)
    {
        return Noticia::publicadas()
            ->porCategoria($categoria)
            ->paginate($perPage);
    }

    public function find($id)
    {
        return Noticia::findOrFail($id);
    }

    public function findBySlug($slug)
    {
        return Noticia::where('slug', $slug)
            ->publicadas()
            ->firstOrFail();
    }

    public function paginate($perPage = 15)
    {
        return Noticia::orderBy('publicado_at', 'desc')->paginate($perPage);
    }

    public function create(array $data)
    {
        if (!isset($data['slug']) || empty($data['slug'])) {
            $data['slug'] = $this->generarSlugUnico($data['titulo']);
        }

        return Noticia::create($data);
    }

    public function update($id, array $data)
    {
        $noticia = $this->find($id);
        
        if (isset($data['titulo']) && $data['titulo'] !== $noticia->titulo) {
            $data['slug'] = $this->generarSlugUnico($data['titulo'], $id);
        }

        $noticia->update($data);
        return $noticia->fresh();
    }

    public function delete($id)
    {
        $noticia = $this->find($id);
        return $noticia->delete();
    }

    private function generarSlugUnico($titulo, $excludeId = null)
    {
        $slug = Str::slug($titulo);
        $originalSlug = $slug;
        $count = 1;

        while ($this->slugExists($slug, $excludeId)) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    private function slugExists($slug, $excludeId = null)
    {
        $query = Noticia::where('slug', $slug);
        
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }
}