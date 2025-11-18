<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactoRequest;
use App\Mail\ContactoMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactoController extends Controller
{
    /**
     * Enviar mensaje de contacto por email
     */
    public function enviar(ContactoRequest $request)
    {
        try {
            $datos = $request->validated();
            
            // Enviar email a contacto@calidexa.pe
            Mail::to(config('mail.from.address'))
                ->send(new ContactoMail($datos));
            
            // Registrar en logs para seguimiento
            Log::info('Email de contacto enviado exitosamente', [
                'nombre' => $datos['nombre'],
                'email' => $datos['email'],
                'fecha' => now()->toDateTimeString()
            ]);
            
            return response()->json([
                'message' => 'Mensaje enviado exitosamente. Te responderemos pronto.'
            ], 200);
            
        } catch (\Exception $e) {
            // Registrar error en logs
            Log::error('Error al enviar email de contacto', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'datos' => $request->all()
            ]);
            
            return response()->json([
                'message' => 'Error al enviar el mensaje. Por favor intenta nuevamente.'
            ], 500);
        }
    }
}