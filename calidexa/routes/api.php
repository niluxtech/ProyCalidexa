<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EmpresaController;
use App\Http\Controllers\Api\NoticiaController;
use App\Http\Controllers\Api\TicketController;

// Rutas Públicas (sin autenticación)
Route::prefix('public')->group(function () {
    
    // Noticias públicas
    Route::get('/noticias', [NoticiaController::class, 'publicadas']);
    Route::get('/noticias/categoria/{categoria}', [NoticiaController::class, 'porCategoria']);
    Route::get('/noticias/{slug}', [NoticiaController::class, 'showBySlug']);
    Route::get('/categorias', [NoticiaController::class, 'categorias']);
    
    // Empresas públicas
    Route::get('/empresas', [EmpresaController::class, 'activas']);
    Route::get('/empresas/{slug}', [EmpresaController::class, 'showBySlug']);
    
    // Consulta de ticket
    Route::post('/tickets/consultar', [TicketController::class, 'consultarPorCodigo']);
    
});

// Autenticación
Route::post('/login', [AuthController::class, 'login']);

// Rutas Protegidas (requieren autenticación)
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // Empresas (Admin)
    Route::apiResource('empresas', EmpresaController::class);
    Route::get('/empresas-select', [EmpresaController::class, 'selectOptions']);
    
    // Noticias (Admin)
    Route::apiResource('noticias', NoticiaController::class);
    
    // Tickets (Admin)
    Route::apiResource('tickets', TicketController::class);
    Route::get('/tickets-estadisticas', [TicketController::class, 'estadisticas']);
    
    // Exportaciones de tickets
    Route::get('/tickets-exportar/pdf', [TicketController::class, 'exportarPDF']);
    Route::get('/tickets-exportar/excel', [TicketController::class, 'exportarExcel']);
    Route::get('/tickets-empresa/{slug}/pdf', [TicketController::class, 'exportarPorEmpresaPDF']);
    Route::get('/tickets-empresa/{slug}/excel', [TicketController::class, 'exportarPorEmpresaExcel']);
    
});