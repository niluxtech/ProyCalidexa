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
        'descripcion',
        'latitud',
        'longitud',
        'direccion'
    ];

    protected $casts = [
        'ruc' => 'encrypted',
    ];

    // NUEVO: Agrega logo al JSON
    protected $appends = ['logo'];

    // NUEVO: Oculta logo_url del JSON
    protected $hidden = ['logo_url'];

    // NUEVO: Accessor para URL completa del logo
    public function getLogoAttribute()
    {
        return !empty($this->attributes['logo_url'])
            ? url('storage/' . $this->attributes['logo_url']) 
            : null;
    }

    // Relaciones
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function ganadores()
    {
        return $this->hasMany(Ganador::class);
    }

    // Scopes
    public function scopeActivas($query)
    {
        return $query->where('estado', 'Activo');
    }

    public function scopeBuscar($query, $termino)
    {
        return $query->where('nombre', 'like', "%{$termino}%")
                    ->orWhere('slug', 'like', "%{$termino}%");
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($empresa) {
            if (empty($empresa->slug)) {
                $empresa->slug = Str::slug($empresa->nombre);
            }
            if (empty($empresa->codigo)) {
                $empresa->codigo = strtoupper(Str::random(9));
            }
        });
    }
}