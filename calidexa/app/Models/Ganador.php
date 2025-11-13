<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ganador extends Model
{
    use HasFactory;

    protected $table = 'ganadores';

    protected $fillable = [
        'empresa_id',
        'ticket_id',
        'nombre_ganador',
        'documento',
        'evidencia_url',
        'publicado'
    ];

    protected $casts = [
        'publicado' => 'boolean',
    ];

    // Relaciones
    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    // Scopes
    public function scopePublicados($query)
    {
        return $query->where('publicado', true);
    }

    public function scopePorEmpresa($query, $empresaId)
    {
        return $query->where('empresa_id', $empresaId);
    }

    // Método auxiliar
    public function publicar()
    {
        $this->update(['publicado' => true]);
    }

    public function despublicar()
    {
        $this->update(['publicado' => false]);
    }
}