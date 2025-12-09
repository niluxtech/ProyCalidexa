import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from "sonner";
import LoadingProvider from "./components/loading-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const baseUrl = 'https://calidexa.pe';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CalidexA - Certificación de Calidad Empresarial en Perú",
    template: "%s | CalidexA"
  },
  description: "Plataforma que certifica empresas comprometidas con la calidad, transparencia y cumplimiento en Perú",
  keywords: ["certificación", "calidad", "empresas", "Perú", "acreditación", "confianza"],
  authors: [{ name: "CalidexA" }],
  creator: "CalidexA",
  publisher: "CalidexA",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: baseUrl,
    siteName: "CalidexA",
    title: "CalidexA - Certificación de Calidad Empresarial",
    description: "Acreditamos empresas que cumplen lo que prometen",
    images: [
      {
        url: `${baseUrl}/logoCalidexa.png`,
        width: 1200,
        height: 630,
        alt: "CalidexA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalidexA",
    description: "Certificación de Calidad Empresarial en Perú",
    images: [`${baseUrl}/logoCalidexa.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} antialiased flex flex-col min-h-screen`}>
        <LoadingProvider>
          <Navbar />
          {children}
          <Footer />
        </LoadingProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}