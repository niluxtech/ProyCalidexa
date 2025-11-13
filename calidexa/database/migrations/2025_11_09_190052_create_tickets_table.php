<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('empresas')->onDelete('cascade');
            $table->string('codigo_ticket', 50)->unique(); // EMPZ7BXS8-TCK-25
            $table->enum('estado', ['pendiente', 'ocupado', 'anulado'])->default('pendiente');
            $table->string('resultado')->nullable();
            $table->string('premio')->nullable();
            $table->timestamps();
            
            $table->index(['empresa_id', 'estado']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};