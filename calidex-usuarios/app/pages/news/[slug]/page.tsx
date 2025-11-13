import Image from "next/image";
import Link from "next/link";

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

const newsData = [
  {
    slug: "calidexa-certifica-nuevas-empresas",
    title: "Calidexa certifica nuevas empresas del sector tecnológico en Lima",
    date: "20 de Mayo, 2025",
    author: "Calidexa",
    image: "https://picsum.photos/800/400?1",
    content: `
      Durante la ceremonia anual realizada en Lima, Calidexa reconoció a diversas empresas 
      del sector tecnológico que demostraron altos estándares de innovación, calidad y 
      compromiso con sus clientes. Este reconocimiento busca promover la mejora continua 
      y fortalecer la confianza en el ecosistema empresarial peruano.
      
      Las compañías certificadas recibirán acceso a capacitaciones, asesorías personalizadas 
      y podrán formar parte del directorio de empresas acreditadas por Calidexa, un espacio 
      que busca conectar negocios de confianza con potenciales clientes.
    `,
  },
  {
    slug: "confianza-del-consumidor-en-peru",
    title:
      "La confianza del consumidor crece en Perú gracias a nuevas acreditaciones",
    date: "18 de Mayo, 2025",
    author: "Instituto Calidexa",
    image: "https://picsum.photos/800/400?2",
    content: `
      Según los últimos reportes de Calidexa, la confianza del consumidor peruano ha mostrado 
      un crecimiento sostenido durante los primeros meses del año. El informe destaca que 
      el 65% de los peruanos prefiere adquirir productos o servicios de empresas acreditadas 
      por programas de calidad.
      
      Este cambio refleja una mayor conciencia sobre la importancia de la transparencia y la 
      responsabilidad empresarial en el país.
    `,
  },
  {
    slug: "innovacion-y-calidad-en-el-sector-empresarial",
    title:
      "Innovación y calidad marcan la pauta en el sector empresarial peruano",
    date: "22 de Mayo, 2025",
    author: "Calidexa Newsroom",
    image: "https://picsum.photos/800/400?3",
    content: `
      Las empresas peruanas continúan apostando por la transformación digital y la mejora de 
      procesos para mantenerse competitivas. Calidexa ha impulsado diversas iniciativas para 
      apoyar este proceso, ofreciendo programas de acreditación enfocados en innovación y 
      gestión eficiente.
      
      Este esfuerzo contribuye a fortalecer la imagen del país como un referente en calidad 
      y confiabilidad empresarial en la región.
    `,
  },
  {
    slug: "alianzas-estrategicas-con-empresas-peruanas",
    title:
      "Calidexa anuncia nuevas alianzas estratégicas con empresas peruanas",
    date: "25 de Mayo, 2025",
    author: "Calidexa Comunicaciones",
    image: "https://picsum.photos/800/400?4",
    content: `
      Con el objetivo de promover la colaboración entre empresas certificadas, Calidexa anunció 
      la creación de una red de alianzas estratégicas. Esta red permitirá compartir recursos, 
      conocimientos y experiencias para impulsar el crecimiento sostenible y responsable de las 
      empresas peruanas.
      
      Las primeras alianzas se establecieron con firmas de tecnología, educación y servicios financieros.
    `,
  },
  {
    slug: "programa-de-formacion-empresarial",
    title:
      "Calidexa lanza programa de formación empresarial para jóvenes emprendedores",
    date: "28 de Mayo, 2025",
    author: "Calidexa Academy",
    image: "https://picsum.photos/800/400?5",
    content: `
      El nuevo programa de formación empresarial está dirigido a jóvenes que buscan iniciar o 
      fortalecer sus negocios. A través de talleres virtuales y mentorías personalizadas, los 
      participantes podrán adquirir herramientas para mejorar su gestión administrativa y digital.
      
      Calidexa reafirma así su compromiso con el desarrollo del talento emprendedor en el Perú.
    `,
  },
  {
    slug: "impacto-de-las-certificaciones-en-el-mercado",
    title:
      "El impacto de las certificaciones empresariales en el mercado peruano",
    date: "30 de Mayo, 2025",
    author: "Observatorio Calidexa",
    image: "https://picsum.photos/800/400?6",
    content: `
      Un reciente estudio realizado por el Observatorio Calidexa reveló que las empresas 
      certificadas presentan un 40% más de fidelización de clientes. Este impacto positivo 
      demuestra la importancia de contar con estándares de calidad verificables y una gestión 
      orientada al cliente.
      
      Las certificaciones no solo fortalecen la reputación empresarial, sino que también 
      impulsan la competitividad del mercado nacional.
    `,
  },
];

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { slug } = await params;
  const news = newsData.find((n) => n.slug === slug); // Aquí busca la noticia por slug

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Noticia no encontrada.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 py-10 px-4 lg:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Inicio
          </Link>{" "}
          /{" "}
          <Link
            href="/pages/news"
            className="hover:text-[var(--color-primary)]"
          >
            Noticias
          </Link>{" "}
          / <span className="text-gray-600">{news.title}</span>
        </nav>

        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary)] mb-2">
          {news.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {news.author} | Publicado el {news.date}
        </p>

        <Image
          src={news.image}
          alt={news.title}
          className="w-full h-[300px] object-cover rounded-2xl mb-8"
          width={800}
          height={400}
        />

        <div className="prose prose-gray max-w-none text-justify leading-relaxed">
          {news.content.split("\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
