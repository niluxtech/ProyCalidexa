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
        'publicado_at'
    ];

    protected $casts = [
        'publicado_at' => 'datetime',
    ];

    // NUEVO: Agrega extracto e imagen al JSON
    protected $appends = ['extracto', 'imagen'];

    // NUEVO: Oculta imagen_url del JSON
    protected $hidden = ['imagen_url'];

    // NUEVO: Accessor para URL completa de imagen
    public function getImagenAttribute()
    {
        return !empty($this->attributes['imagen_url'])
            ? url('storage/' . $this->attributes['imagen_url']) 
            : null;
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