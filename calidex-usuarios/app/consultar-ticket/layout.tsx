import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://calidexa.pe";

export const metadata: Metadata = {
  title: "Consultar Ticket | CalidexA",
  description:
    "Consulta el estado de tu ticket en CalidexA. Ingresa tu número de ticket para verificar su estado y seguimiento.",
  alternates: {
    canonical: `${baseUrl}/consultar-ticket`,
  },
  openGraph: {
    title: "Consultar Ticket | CalidexA",
    description:
      "Consulta el estado de tu ticket en CalidexA. Ingresa tu número de ticket para verificar su estado y seguimiento.",
    url: `${baseUrl}/consultar-ticket`,
    siteName: "CalidexA",
    images: [
      {
        url: `${baseUrl}/logoCalidexa.png`,
        width: 1200,
        height: 630,
        alt: "CalidexA - Consultar Ticket",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultar Ticket | CalidexA",
    description:
      "Consulta el estado de tu ticket en CalidexA.",
    images: [`${baseUrl}/logoCalidexa.png`],
  },
};

export default function ConsultarTicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

