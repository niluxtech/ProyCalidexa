<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'estado' => 'required|in:pendiente,ocupado,anulado',
            'resultado' => 'nullable|string|max:255',
            'premio' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'estado.required' => 'El estado es obligatorio',
            'estado.in' => 'El estado debe ser: pendiente, ocupado o anulado',
            'resultado.max' => 'El resultado no puede superar los 255 caracteres',
            'premio.max' => 'El premio no puede superar los 255 caracteres',
        ];
    }
}