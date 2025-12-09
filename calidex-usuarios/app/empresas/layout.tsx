import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://calidexa.pe";

export const metadata: Metadata = {
  title: "Empresas | CalidexA",
  description:
    "Encuentra empresas confiables y certificadas que cumplen con nuestros rigurosos estándares de calidad en Perú.",
  alternates: {
    canonical: `${baseUrl}/empresas`,
  },
  openGraph: {
    title: "Empresas | CalidexA",
    description:
      "Encuentra empresas confiables y certificadas que cumplen con nuestros rigurosos estándares de calidad en Perú.",
    url: `${baseUrl}/empresas`,
    siteName: "CalidexA",
    images: [
      {
        url: `${baseUrl}/logoCalidexa.png`,
        width: 1200,
        height: 630,
        alt: "CalidexA - Empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Empresas | CalidexA",
    description:
      "Encuentra empresas confiables y certificadas que cumplen con nuestros rigurosos estándares de calidad.",
    images: [`${baseUrl}/logoCalidexa.png`],
  },
};

export default function EmpresasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

