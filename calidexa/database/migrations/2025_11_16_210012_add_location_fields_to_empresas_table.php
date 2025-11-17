<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->decimal('latitud', 10, 8)->nullable()->after('descripcion');
            $table->decimal('longitud', 11, 8)->nullable()->after('latitud');
            $table->string('direccion')->nullable()->after('longitud');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('empresas', function (Blueprint $table) {
            $table->dropColumn(['latitud', 'longitud', 'direccion']);
        });
    }
};
