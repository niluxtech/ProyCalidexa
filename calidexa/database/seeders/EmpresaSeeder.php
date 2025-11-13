<?php

namespace Database\Seeders;

use App\Models\Empresa;
use Illuminate\Database\Seeder;

class EmpresaSeeder extends Seeder
{
    public function run(): void
    {
        $empresas = [
            [
                'nombre' => 'BrianSac',
                'ruc' => '20123456789',
                'nivel' => 'Certificado',
                'estado' => 'Activo',
                'descripcion' => 'Empresa líder en soluciones tecnológicas'
            ],
            [
                'nombre' => 'TechPro Solutions',
                'ruc' => '20987654321',
                'nivel' => 'Sello',
                'estado' => 'Activo',
                'descripcion' => 'Innovación en software empresarial'
            ],
            [
                'nombre' => 'Comercial del Norte',
                'ruc' => '20456789123',
                'nivel' => 'Certificado',
                'estado' => 'Activo',
                'descripcion' => 'Distribución y comercio al por mayor'
            ],
            [
                'nombre' => 'Servicios Integrales SAC',
                'ruc' => '20321654987',
                'nivel' => 'Sello',
                'estado' => 'Inactivo',
                'descripcion' => 'Mantenimiento y servicios generales'
            ],
        ];

        foreach ($empresas as $empresa) {
            Empresa::create($empresa);
        }
    }
}