<?php

namespace Database\Seeders;

use App\Models\Noticia;
use Illuminate\Database\Seeder;

class NoticiaSeeder extends Seeder
{
    public function run(): void
    {
        $noticias = [
            [
                'titulo' => 'CalidexA certifica 50 nuevas empresas en 2024',
                'categoria' => 'Certificaciones',
                'contenido' => '<p>Este año hemos alcanzado un hito importante al certificar 50 nuevas empresas comprometidas con la calidad y excelencia en sus servicios.</p><p>Las empresas certificadas han demostrado cumplir con los más altos estándares de calidad.</p>',
                'publicado_at' => now()->subDays(5),
            ],
            [
                'titulo' => 'Nuevos estándares de calidad para 2025',
                'categoria' => 'Anuncios',
                'contenido' => '<p>CalidexA presenta los nuevos requisitos y estándares que entrarán en vigencia el próximo año.</p><p>Estos cambios buscan elevar aún más el nivel de excelencia empresarial.</p>',
                'publicado_at' => now()->subDays(2),
            ],
            [
                'titulo' => 'Taller gratuito: Mejora continua empresarial',
                'categoria' => 'Eventos',
                'contenido' => '<p>Inscríbete a nuestro taller virtual sobre procesos de mejora continua y gestión de calidad.</p><p>Fecha: 15 de diciembre. Cupos limitados.</p>',
                'publicado_at' => now()->subDay(),
            ],
            [
                'titulo' => 'Noticia programada para futuro',
                'categoria' => 'General',
                'contenido' => '<p>Esta noticia se publicará automáticamente en el futuro.</p>',
                'publicado_at' => now()->addDays(3), // Publicación futura
            ],
        ];

        foreach ($noticias as $noticia) {
            Noticia::create($noticia);
        }
    }
}