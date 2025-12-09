import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://calidexa.pe";

export const metadata: Metadata = {
  title: "Noticias | CalidexA",
  description:
    "Mantente informado con las últimas noticias y actualizaciones de CalidexA sobre empresas certificadas y el mercado peruano.",
  alternates: {
    canonical: `${baseUrl}/noticias`,
  },
  openGraph: {
    title: "Noticias | CalidexA",
    description:
      "Mantente informado con las últimas noticias y actualizaciones de CalidexA sobre empresas certificadas y el mercado peruano.",
    url: `${baseUrl}/noticias`,
    siteName: "CalidexA",
    images: [
      {
        url: `${baseUrl}/logoCalidexa.png`,
        width: 1200,
        height: 630,
        alt: "CalidexA - Noticias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noticias | CalidexA",
    description:
      "Mantente informado con las últimas noticias y actualizaciones de CalidexA.",
    images: [`${baseUrl}/logoCalidexa.png`],
  },
};

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

