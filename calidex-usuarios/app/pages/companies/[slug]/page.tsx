import Image from "next/image";
import Link from "next/link";

interface CompanyDetailProps {
  params: Promise<{ slug: string }>;
}

const companiesData = [
  {
    slug: "multiservicios-kendra",
    name: "Multiservicios Kendra",
    ruc: "12457863109",
    address: "Urb. Bocanegra, Av. Lima 4320, Callao 91698",
    phone: "+51 987654321",
    email: "contacto@multiservicioskendra.pe",
    logo: "https://picsum.photos/200/200?random=1",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://calidexa.pe/empresa/multiservicios-kendra",
    about: `
      Multiservicios Kendra es una empresa dedicada a brindar soluciones tecnológicas 
      y soporte técnico a pequeñas y medianas empresas. Su compromiso con la innovación 
      y la atención personalizada la posiciona como una de las más confiables en el Callao.
    `,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.576594737809!2d-77.1154!3d-12.0550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8a3ab4f3b2b%3A0x9e4b8b8a6b86e3e!2sCallao!5e0!3m2!1ses!2spe!4v1708348892839!5m2!1ses!2spe",
  },
  {
    slug: "ecomarket",
    name: "EcoMarket",
    ruc: "20654789123",
    address: "Av. Primavera 1020, Santiago de Surco, Lima",
    phone: "+51 945321789",
    email: "ventas@ecomarket.pe",
    logo: "https://picsum.photos/200/200?random=2",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://calidexa.pe/empresa/ecomarket",
    about: `
      EcoMarket es un comercio especializado en la venta de productos orgánicos y sostenibles. 
      Promueve el consumo responsable y el cuidado del medio ambiente, trabajando con productores 
      locales y ofreciendo alternativas ecológicas para el hogar y la alimentación.
    `,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.8286320406436!2d-76.99902!3d-12.0868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7f3cb1e18c3%3A0x8b879d9f79e6c8df!2sAv.%20Primavera%201020%2C%20Santiago%20de%20Surco%2015039!5e0!3m2!1ses!2spe!4v1708349992839!5m2!1ses!2spe",
  },
  {
    slug: "tech-innovators",
    name: "Tech Innovators",
    ruc: "20587456982",
    address: "Av. Arequipa 3200, Lince, Lima",
    phone: "+51 999456321",
    email: "info@techinnovators.pe",
    logo: "https://picsum.photos/200/200?random=3",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://calidexa.pe/empresa/tech-innovators",
    about: `
      Tech Innovators es una empresa peruana dedicada al desarrollo de software, 
      inteligencia artificial y soluciones digitales. Su misión es impulsar la transformación 
      tecnológica de las organizaciones mediante herramientas modernas y eficientes.
    `,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.873756034281!2d-77.0341!3d-12.0843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8ebdc5f9a01%3A0xf41e3f7f9dfc2b18!2sAv.%20Arequipa%203200%2C%20Lince%2015046!5e0!3m2!1ses!2spe!4v1708350192839!5m2!1ses!2spe",
  },
  {
    slug: "bioandes",
    name: "BioAndes",
    ruc: "20678912340",
    address: "Jr. Ayacucho 560, Cusco",
    phone: "+51 972654123",
    email: "info@bioandes.pe",
    logo: "https://picsum.photos/200/200?random=4",
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://calidexa.pe/empresa/bioandes",
    about: `
      BioAndes es una empresa comprometida con la producción y comercialización de alimentos 
      orgánicos provenientes de los Andes peruanos. Su enfoque en la sostenibilidad y el 
      comercio justo la ha posicionado como una marca referente en el sector agroecológico.
    `,
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.7909785585674!2d-71.9779!3d-13.5171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd5d6e4f9b02b%3A0x1a0db894b1b7d4a3!2sJr.%20Ayacucho%20560%2C%20Cusco!5e0!3m2!1ses!2spe!4v1708350392839!5m2!1ses!2spe",
  },
];

export default async function CompanyDetail({ params }: CompanyDetailProps) {
  const { slug } = await params;
  const company = companiesData.find((c) => c.slug === slug);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Empresa no encontrada.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 py-10 px-4 lg:px-0">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Inicio
          </Link>{" "}
          /{" "}
          <Link
            href="/pages/companies"
            className="hover:text-[var(--color-primary)]"
          >
            Empresas
          </Link>{" "}
          / <span className="text-gray-600">{company.name}</span>
        </nav>

        {/* Encabezado */}
        <div className=" p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="flex items-center gap-4">
            <Image
              src={company.logo}
              alt={company.name}
              width={80}
              height={80}
              className="rounded-full object-cover border border-gray-200"
            />
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-1">
                {company.name}
              </h1>
              <p className="text-sm text-[var(--color-text)]">
                <strong>RUC:</strong> {company.ruc}
              </p>
              <p className="text-sm text-[var(--color-text)]">
                <strong>Dirección:</strong> {company.address}
              </p>
              <p className="text-sm text-[var(--color-text)]">
                <strong>Celular:</strong> {company.phone}
              </p>
              <p className="text-sm text-[var(--color-text)]">
                <strong>Correo electrónico:</strong> {company.email}
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                QR Link
              </p>
              <Image
                src={company.qr}
                alt="QR Link"
                width={120}
                height={120}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Sobre nosotros */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
            Sobre nosotros
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
            {company.about.trim()}
          </p>
        </section>

        {/* Ubicación */}
        <section>
          <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
            Ubicación
          </h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md h-[300px]">
            <iframe
              src={company.mapEmbed}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </main>
  );
}
