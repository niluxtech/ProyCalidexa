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

    // NUEVO: Agrega logo al JSON, pero también mantenemos logo_url para compatibilidad
    protected $appends = ['logo'];

    // NUEVO: Accessor para URL completa del logo
    public function getLogoAttribute()
    {
        if (empty($this->attributes['logo_url'])) {
            return null;
        }
        
        // Usar STORAGE_URL si está configurado, sino usar APP_URL
        $storageUrl = env('STORAGE_URL', env('APP_URL') . '/storage');
        $cleanPath = ltrim($this->attributes['logo_url'], '/');
        
        return rtrim($storageUrl, '/') . '/' . $cleanPath;
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