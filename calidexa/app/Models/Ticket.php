<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'empresa_id',
        'codigo_ticket',
        'estado',
        'resultado',
        'premio'
    ];

    // Relaciones
    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function ganador()
    {
        return $this->hasOne(Ganador::class);
    }

    // Scopes
    public function scopePorEmpresa($query, $empresaId)
    {
        return $query->where('empresa_id', $empresaId);
    }

    public function scopePorEstado($query, $estado)
    {
        return $query->where('estado', $estado);
    }

    public function scopePorFechas($query, $desde, $hasta)
    {
        return $query->whereBetween('created_at', [$desde, $hasta]);
    }

    public function scopePendientes($query)
    {
        return $query->where('estado', 'pendiente');
    }

    public function scopeOcupados($query)
    {
        return $query->where('estado', 'ocupado');
    }

    // Métodos auxiliares
    public function marcarComoOcupado($resultado = null, $premio = null)
    {
        $this->update([
            'estado' => 'ocupado',
            'resultado' => $resultado,
            'premio' => $premio
        ]);
    }

    public function anular()
    {
        $this->update(['estado' => 'anulado']);
    }
}