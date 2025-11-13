<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmpresaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $empresaId = $this->route('empresa'); // Obtiene ID de la ruta
        
        return [
            'nombre' => 'required|string|max:255|unique:empresas,nombre,' . $empresaId,
            'ruc' => 'required|string|size:11',
            'nivel' => 'required|in:Sello,Certificado',
            'estado' => 'required|in:Activo,Inactivo',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'descripcion' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre de la empresa es obligatorio',
            'nombre.unique' => 'Ya existe una empresa con este nombre',
            'ruc.required' => 'El RUC es obligatorio',
            'ruc.size' => 'El RUC debe tener exactamente 11 dígitos',
        ];
    }
}