import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

interface CompanyDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CompanyDetailProps) {
  const { slug } = await params;

  try {
    const empresa = await api.getEmpresaPorSlug(slug);
    const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || '';

    return {
      title: empresa.nombre,
      description: empresa.descripcion || `Información sobre ${empresa.nombre}`,
      openGraph: {
        title: empresa.nombre,
        description: empresa.descripcion || '',
        images: empresa.logo_url ? [`${STORAGE_URL}/${empresa.logo_url}`] : [],
      },
    };
  } catch {
    return {
      title: 'Empresa no encontrada',
    };
  }
}

export default async function CompanyDetail({ params }: CompanyDetailProps) {
  const { slug } = await params;

  let empresa;
  try {
    empresa = await api.getEmpresaPorSlug(slug);
  } catch {
    notFound();
  }

  // Helper para construir URL de imagen
  const buildImageUrl = (imagePath: string | null): string => {
    if (!imagePath) return '/no-image.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const baseUrl = STORAGE_URL.endsWith('/') ? STORAGE_URL.slice(0, -1) : STORAGE_URL;
    return `${baseUrl}/${cleanPath}`;
  };

  const logoUrl = buildImageUrl(empresa.logo_url);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://calidexa.pe/empresas/${empresa.slug}`;

  // Structured data para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": empresa.nombre,
    "url": `https://calidexa.pe/empresas/${empresa.slug}`,
    "logo": logoUrl,
    "description": empresa.descripcion || `Empresa certificada por CalidexA: ${empresa.nombre}`,
    "identifier": empresa.codigo,
    "areaServed": "PE",
    "award": `Certificación CalidexA - ${empresa.nivel}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-white text-gray-800 py-10 px-4 lg:px-0">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              Inicio
            </Link>{" "}
            /{" "}
            <Link
              href="/empresas"
              className="hover:text-[var(--color-primary)]"
            >
              Empresas
            </Link>{" "}
            / <span className="text-gray-600">{empresa.nombre}</span>
          </nav>

          {/* Encabezado */}
          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <div className="flex items-center gap-4">
              <Image
                src={logoUrl}
                alt={empresa.nombre}
                width={80}
                height={80}
                className="rounded-full object-cover border border-gray-200"
                unoptimized={logoUrl.startsWith('http://localhost') || logoUrl.startsWith('https://')}
              />
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-1">
                  {empresa.nombre}
                </h1>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                  empresa.nivel === 'Certificado'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {empresa.nivel}
                </span>

                <p className="text-sm text-[var(--color-text)] mt-2">
                  <strong>RUC:</strong> {empresa.ruc}
                </p>
                <p className="text-sm text-[var(--color-text)]">
                  <strong>Código:</strong> {empresa.codigo}
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="mt-6 md:mt-0">
              <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center">
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  QR Verificación
                </p>
                <Image
                  src={qrUrl}
                  alt="QR Verificación"
                  width={120}
                  height={120}
                  className="rounded-md"
                  unoptimized={true}
                />
              </div>
            </div>
          </div>

          {/* Sobre la Empresa */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
              Sobre la empresa
            </h2>
            {empresa.descripcion ? (
              <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                {empresa.descripcion}
              </p>
            ) : (
              <p className="text-gray-500 italic">
                No hay descripción disponible.
              </p>
            )}
          </section>

          {/* Estado */}
          <section>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              empresa.estado === 'Activo'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              <span className={`h-3 w-3 rounded-full ${
                empresa.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-400'
              }`}></span>
              <span className="font-medium">
                Estado: {empresa.estado}
              </span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
