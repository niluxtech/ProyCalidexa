<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ContactoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $datos;

    public function __construct(array $datos)
    {
        $this->datos = $datos;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            // ✅ DESDE tu email de Zoho (único permitido)
            from: new Address(
                config('mail.from.address'),
                config('mail.from.name')
            ),
            // ✅ Para que las respuestas vayan al usuario
            replyTo: [
                new Address($this->datos['email'], $this->datos['nombre'])
            ],
            subject: 'Nuevo mensaje de contacto - CalidexA',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contacto',
            with: [
                'nombre' => $this->datos['nombre'],
                'email' => $this->datos['email'],
                'telefono' => $this->datos['telefono'] ?? 'No proporcionado',
                'mensaje' => $this->datos['mensaje'],
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}