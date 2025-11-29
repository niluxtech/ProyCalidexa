"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { api, TicketConsulta } from '@/lib/api';
import Link from 'next/link';
import AnimateOnScroll from '@/app/components/animate-on-scroll';

// Helper para construir URL de imagen correctamente (igual que en adapters.ts)
function buildImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return '/no-image.png';
  
  // Si ya es una URL completa, retornarla
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';
  
  // Remover barra inicial si existe
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Construir URL completa
  const baseUrl = STORAGE_URL.endsWith('/') ? STORAGE_URL.slice(0, -1) : STORAGE_URL;
  return `${baseUrl}/${cleanPath}`;
}

const ticketSchema = z.object({
  codigo_ticket: z
    .string()
    .min(1, 'Código es requerido')
    .transform(val => val.toUpperCase().trim()),
});

type TicketFormData = z.infer<typeof ticketSchema>;

export default function ConsultarTicket() {
  const [resultado, setResultado] = useState<TicketConsulta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cacheBuster, setCacheBuster] = useState<number>(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (data: TicketFormData) => {
    setIsLoading(true);
    setResultado(null);

    try {
      const response = await api.consultarTicket(data.codigo_ticket);
      setResultado(response);
      setCacheBuster(Date.now()); // Actualizar timestamp para evitar caché de imágenes
      toast.success('Ticket encontrado');
    } catch (error: any) {
      const message = error.message || 'Ticket no encontrado';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getEstadoBadge = (estado: string) => {
    const styles = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      ocupado: 'bg-green-100 text-green-800',
      anulado: 'bg-red-100 text-red-800',
    };
    return styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getEstadoTexto = (estado: string) => {
    const textos = {
      pendiente: 'Pendiente',
      ocupado: 'Ocupado',
      anulado: 'Anulado',
    };
    return textos[estado as keyof typeof textos] || estado;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <AnimateOnScroll animation="fadeInUp" threshold={0.2}>
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Consultar Ticket
            </h1>
            <p className="text-[var(--color-text-grey)]">
              Ingresa el código de tu ticket para verificar su estado
            </p>
          </div>
        </AnimateOnScroll>

        {/* Formulario */}
        <AnimateOnScroll animation="fadeInUp" delay="delay-1s" threshold={0.2}>
          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código del Ticket
              </label>
              <input
                {...register('codigo_ticket')}
                type="text"
                placeholder="Ej: EMPZ7BXS8-TCK-1"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] uppercase"
              />
              {errors.codigo_ticket && (
                <p className="text-red-600 text-sm mt-2 text-center">
                  {errors.codigo_ticket.message}
                </p>
              )}
              <p className="text-xs text-gray-500 text-center mt-2">
                Formato: CODIGO-TCK-NÚMERO
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Consultando...' : 'Consultar Ticket'}
            </button>
          </form>
          </div>
        </AnimateOnScroll>

        {/* Resultado */}
        {resultado && (
          <AnimateOnScroll animation="fadeInUp" threshold={0.2} triggerOnce={false}>
            <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Resultado de Consulta
              </h2>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getEstadoBadge(
                  resultado.estado
                )}`}
              >
                {getEstadoTexto(resultado.estado)}
              </span>
            </div>

            <div className="space-y-4">
              {/* Código */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-600">Código:</span>
                <span className="font-mono font-semibold text-gray-900">
                  {resultado.codigo_ticket}
                </span>
              </div>

              {/* Empresa */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-600">Empresa:</span>
                <Link
                  href={`/empresas/${resultado.empresa.codigo.toLowerCase()}`}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  {((resultado.empresa as any).logo || resultado.empresa.logo_url) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${buildImageUrl((resultado.empresa as any).logo || resultado.empresa.logo_url)}?v=${cacheBuster}`}
                      alt={resultado.empresa.nombre}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium text-[var(--color-primary)]">
                    {resultado.empresa.nombre}
                  </span>
                </Link>
              </div>

              {/* Fecha emisión */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm text-gray-600">Fecha de emisión:</span>
                <span className="font-medium text-gray-900">
                  {new Date(resultado.created_at).toLocaleDateString('es-PE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* Resultado (si existe) */}
              {resultado.resultado && (
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-sm text-gray-600">Resultado:</span>
                  <span className="font-medium text-gray-900">
                    {resultado.resultado}
                  </span>
                </div>
              )}

              {/* Premio (si existe) */}
              {resultado.premio && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    🎉 ¡Felicidades!
                  </p>
                  <p className="text-green-900 font-semibold">
                    Premio: {resultado.premio}
                  </p>
                </div>
              )}

              {/* Estado pendiente */}
              {resultado.estado === 'pendiente' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-800">
                    ⏳ Este ticket aún no ha participado en ningún sorteo
                  </p>
                </div>
              )}

              {/* Estado anulado */}
              {resultado.estado === 'anulado' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-red-800">
                    ❌ Este ticket ha sido anulado y no es válido
                  </p>
                </div>
              )}
            </div>
            </div>
          </AnimateOnScroll>
        )}
      </div>
    </main>
  );
}