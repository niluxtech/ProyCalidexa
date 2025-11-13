<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Empresa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'slug',
        'codigo',
        'ruc',
        'nivel',
        'estado',
        'logo_url',
        'descripcion'
    ];

    protected $casts = [
        'ruc' => 'encrypted', // Encripta automáticamente
    ];

    // Relaciones
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function ganadores()
    {
        return $this->hasMany(Ganador::class);
    }

    // Scopes (filtros reutilizables)
    public function scopeActivas($query)
    {
        return $query->where('estado', 'Activo');
    }

    public function scopeBuscar($query, $termino)
    {
        return $query->where('nombre', 'like', "%{$termino}%")
                    ->orWhere('slug', 'like', "%{$termino}%");
    }

    // Evento: generar slug y código antes de crear
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($empresa) {
            if (empty($empresa->slug)) {
                $empresa->slug = Str::slug($empresa->nombre);
            }
            if (empty($empresa->codigo)) {
                $empresa->codigo = strtoupper(Str::random(9)); // EMPZ7BXS8
            }
        });
    }
}