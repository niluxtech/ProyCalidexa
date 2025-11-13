<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->string('slug')->unique();
            $table->string('codigo', 20)->unique();
            $table->text('ruc');
            $table->enum('nivel', ['Sello', 'Certificado'])->default('Sello');
            $table->enum('estado', ['Activo', 'Inactivo'])->default('Activo');
            $table->string('logo_url')->nullable();
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};