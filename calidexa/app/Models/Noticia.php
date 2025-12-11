<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Noticia extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'slug',
        'categoria',
        'contenido',
        'imagen_url',
        'video_url',
        'publicado_at',
        'destacada',
        'mostrar_video'
    ];

    protected $casts = [
        'publicado_at' => 'datetime',
        'destacada' => 'boolean',
        'mostrar_video' => 'boolean',
    ];

    // NUEVO: Agrega extracto e imagen al JSON, pero también mantenemos imagen_url para compatibilidad
    protected $appends = ['extracto', 'imagen'];

    // NUEVO: Accessor para URL completa de imagen
    public function getImagenAttribute()
    {
        if (empty($this->attributes['imagen_url'])) {
            return null;
        }
        
        // Usar STORAGE_URL si está configurado, sino usar APP_URL
        $storageUrl = env('STORAGE_URL', env('APP_URL') . '/storage');
        $cleanPath = ltrim($this->attributes['imagen_url'], '/');
        
        return rtrim($storageUrl, '/') . '/' . $cleanPath;
    }

    // Scopes
    public function scopePublicadas($query)
    {
        return $query->whereNotNull('publicado_at')
                    ->where('publicado_at', '<=', now())
                    ->orderBy('publicado_at', 'desc');
    }

    public function scopePorCategoria($query, $categoria)
    {
        return $query->where('categoria', $categoria);
    }

    public function scopeDestacadas($query)
    {
        return $query->where('destacada', true)
                    ->orderBy('publicado_at', 'desc')
                    ->limit(3);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($noticia) {
            if (empty($noticia->slug)) {
                $noticia->slug = Str::slug($noticia->titulo);
            }
        });

        static::updating(function ($noticia) {
            if ($noticia->isDirty('titulo') && empty($noticia->slug)) {
                $noticia->slug = Str::slug($noticia->titulo);
            }
        });
    }

    // Accessor para extracto
    public function getExtractoAttribute()
    {
        return Str::limit(strip_tags($this->contenido), 150);
    }
}