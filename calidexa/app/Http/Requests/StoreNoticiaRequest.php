<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNoticiaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo' => 'required|string|max:255',
            'categoria' => 'required|string|max:100',
            'contenido' => 'required|string',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
            'video_url' => 'nullable|url|max:500',
            'publicado_at' => 'nullable|date',
        ];
    }

    public function messages(): array
    {
        return [
            'titulo.required' => 'El título es obligatorio',
            'titulo.max' => 'El título no puede superar los 255 caracteres',
            'categoria.required' => 'La categoría es obligatoria',
            'contenido.required' => 'El contenido es obligatorio',
            'imagen.image' => 'El archivo debe ser una imagen',
            'imagen.mimes' => 'La imagen debe ser un archivo de tipo: jpeg, png, jpg',
            'imagen.max' => 'La imagen no puede superar los 5MB',
            'video_url.url' => 'La URL del video no es válida',
            'publicado_at.date' => 'La fecha de publicación no es válida',
        ];
    }
}