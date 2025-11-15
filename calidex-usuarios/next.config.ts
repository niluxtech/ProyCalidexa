import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "api.calidexa.pe",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
    ],
  },
  // Redirecciones de rutas antiguas (si las había)
  async redirects() {
    return [
      {
        source: "/pages/news/:slug*",
        destination: "/noticias/:slug*",
        permanent: true,
      },
      {
        source: "/pages/companies/:slug*",
        destination: "/empresas/:slug*",
        permanent: true,
      },
      {
        source: "/pages/contact",
        destination: "/contacto",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
