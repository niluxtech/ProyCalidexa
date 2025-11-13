<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        // Solo para requests API
        if ($request->is('api/*')) {
            
            // Modelo no encontrado (404)
            if ($exception instanceof ModelNotFoundException) {
                return response()->json([
                    'message' => 'Registro no encontrado'
                ], 404);
            }

            // Ruta no encontrada (404)
            if ($exception instanceof NotFoundHttpException) {
                return response()->json([
                    'message' => 'Endpoint no encontrado'
                ], 404);
            }

            // Errores de validación (422)
            if ($exception instanceof ValidationException) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $exception->errors()
                ], 422);
            }

            // Otros errores (500)
            return response()->json([
                'message' => 'Error del servidor',
                'error' => config('app.debug') ? $exception->getMessage() : 'Ocurrió un error inesperado'
            ], 500);
        }

        return parent::render($request, $exception);
    }
}