<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GenerarTicketsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'empresa_id' => 'required|exists:empresas,id',
            'cantidad' => 'required|integer|min:1|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'empresa_id.required' => 'Debe seleccionar una empresa',
            'empresa_id.exists' => 'La empresa seleccionada no existe',
            'cantidad.required' => 'Debe especificar la cantidad de tickets',
            'cantidad.min' => 'Debe generar al menos 1 ticket',
            'cantidad.max' => 'No puede generar más de 1000 tickets a la vez',
        ];
    }
}