<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmpresaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Ya está protegido por auth:sanctum
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255|unique:empresas',
            'ruc' => 'required|string|size:11',
            'nivel' => 'required|in:Sello,Certificado',
            'estado' => 'required|in:Activo,Inactivo',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
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
            'nivel.in' => 'El nivel debe ser Sello o Certificado',
            'estado.in' => 'El estado debe ser Activo o Inactivo',
            'logo.image' => 'El archivo debe ser una imagen',
            'logo.mimes' => 'El logo debe ser un archivo de tipo: jpeg, png, jpg',
            'logo.max' => 'El logo no puede superar los 5MB',
        ];
    }
}