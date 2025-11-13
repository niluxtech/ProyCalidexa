<?php

namespace App\Services;

use App\Repositories\NoticiaRepository;
use Illuminate\Support\Facades\Storage;

class NoticiaService
{
    protected $noticiaRepository;

    public function __construct(NoticiaRepository $noticiaRepository)
    {
        $this->noticiaRepository = $noticiaRepository;
    }

    public function listar($perPage = 15)
    {
        return $this->noticiaRepository->paginate($perPage);
    }

    public function listarPublicadas($perPage = 12)
    {
        return $this->noticiaRepository->publicadas($perPage);
    }

    public function listarPorCategoria($categoria, $perPage = 12)
    {
        return $this->noticiaRepository->porCategoria($categoria, $perPage);
    }

    public function obtenerPorId($id)
    {
        return $this->noticiaRepository->find($id);
    }

    public function obtenerPorSlug($slug)
    {
        return $this->noticiaRepository->findBySlug($slug);
    }

    public function crear(array $data)
    {
        // Manejar imagen si existe
        if (isset($data['imagen']) && $data['imagen']) {
            $data['imagen_url'] = $this->guardarImagen($data['imagen']);
            unset($data['imagen']);
        }

        // Si no se especifica fecha de publicación, usar ahora
        if (!isset($data['publicado_at']) || empty($data['publicado_at'])) {
            $data['publicado_at'] = now();
        }

        return $this->noticiaRepository->create($data);
    }

    public function actualizar($id, array $data)
    {
        $noticia = $this->noticiaRepository->find($id);

        // Manejar nueva imagen
        if (isset($data['imagen']) && $data['imagen']) {
            // Eliminar imagen anterior si existe
            if ($noticia->imagen_url) {
                $this->eliminarImagen($noticia->imagen_url);
            }
            
            $data['imagen_url'] = $this->guardarImagen($data['imagen']);
            unset($data['imagen']);
        }

        return $this->noticiaRepository->update($id, $data);
    }

    public function eliminar($id)
    {
        $noticia = $this->noticiaRepository->find($id);

        // Eliminar imagen si existe
        if ($noticia->imagen_url) {
            $this->eliminarImagen($noticia->imagen_url);
        }

        return $this->noticiaRepository->delete($id);
    }

    public function obtenerCategorias()
    {
        return [
            'General' => 'General',
            'Certificaciones' => 'Certificaciones',
            'Anuncios' => 'Anuncios',
            'Eventos' => 'Eventos',
        ];
    }

    private function guardarImagen($file)
    {
        return $file->store('noticias/imagenes', 'public');
    }

    private function eliminarImagen($path)
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}