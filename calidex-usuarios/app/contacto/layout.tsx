import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://calidexa.pe";

export const metadata: Metadata = {
  title: "Contacto | CalidexA",
  description:
    "Estamos aquí para ayudarte. Ponte en contacto con nosotros a través del formulario o nuestra información de contacto directa.",
  alternates: {
    canonical: `${baseUrl}/contacto`,
  },
  openGraph: {
    title: "Contacto | CalidexA",
    description:
      "Estamos aquí para ayudarte. Ponte en contacto con nosotros a través del formulario o nuestra información de contacto directa.",
    url: `${baseUrl}/contacto`,
    siteName: "CalidexA",
    images: [
      {
        url: `${baseUrl}/logoCalidexa.png`,
        width: 1200,
        height: 630,
        alt: "CalidexA - Contacto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | CalidexA",
    description:
      "Estamos aquí para ayudarte. Ponte en contacto con nosotros.",
    images: [`${baseUrl}/logoCalidexa.png`],
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

