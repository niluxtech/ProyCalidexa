"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import Image from 'next/image';
import AnimateOnScroll from '@/app/components/animate-on-scroll';

const contactSchema = z.object({
  nombre: z.string().min(1, 'Nombre es requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await api.enviarContacto(data);
      toast.success('¡Mensaje enviado exitosamente!');
      reset();
    } catch (error: any) {
      const message = error.message || 'Error al enviar mensaje';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll animation="fadeInUp" threshold={0.2}>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-4">
                Contacto
              </h1>
              <p className="text-[var(--color-text-grey)]">
                Estamos aquí para ayudarte. Ponte en contacto con nosotros a
                través del formulario o nuestra información de contacto directa
              </p>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-6xl mx-auto">
            <AnimateOnScroll animation="fadeInLeft" threshold={0.2} className="flex-1 flex justify-center">
              <div className="drop-shadow-lg">
                <Image
                  src="/contactoImg.webp"
                  alt="Contacto CalidexA"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>
            </AnimateOnScroll>

            {/* Formulario */}
            <AnimateOnScroll animation="fadeInRight" threshold={0.2} className="flex-1 w-full max-w-md">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-gray-50 p-6 rounded-2xl shadow-sm"
              >
              <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-6">
                Envíanos un mensaje
              </h3>

              <div className="mb-4">
                <label className="block text-[var(--color-text)] font-medium mb-1">
                  Nombre *
                </label>
                <input
                  {...register('nombre')}
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                />
                {errors.nombre && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-[var(--color-text)] font-medium mb-1">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-[var(--color-text)] font-medium mb-1">
                  Celular (opcional)
                </label>
                <input
                  {...register('telefono')}
                  type="tel"
                  placeholder="987654321"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[var(--color-text)] font-medium mb-1">
                  Mensaje *
                </label>
                <textarea
                  {...register('mensaje')}
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                ></textarea>
                {errors.mensaje && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.mensaje.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-secondary)] text-[var(--color-primary)] font-medium px-6 py-3 rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              </form>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
}