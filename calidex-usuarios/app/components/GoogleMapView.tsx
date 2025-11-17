"use client";

import { useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const GOOGLE_MAPS_API_KEY = "AIzaSyC8diofmJR1op6UHzP1ikKOp851Ujk_0yk";

interface GoogleMapViewProps {
  lat: number | string;
  lng: number | string;
  address?: string | null;
  empresaNombre?: string;
  logoUrl?: string | null;
}

export const GoogleMapView = ({
  lat,
  lng,
  address,
  empresaNombre,
  logoUrl,
}: GoogleMapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Convertir a números y validar
  const latitude = typeof lat === "number" ? lat : parseFloat(lat as any);
  const longitude = typeof lng === "number" ? lng : parseFloat(lng as any);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // Validar coordenadas
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error("Coordenadas inválidas:", { lat, lng });
      return;
    }

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: empresaNombre || "Ubicación de la empresa",
    });

    // Crear ventana de información con logo
    if (address) {
      const logoHtml = logoUrl
        ? `<img src="${logoUrl}" alt="${empresaNombre || 'Logo'}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 50%; border: 2px solid #e5e7eb; margin-right: 12px; flex-shrink: 0;" />`
        : '';
      
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 0; max-width: 300px;">
            <div style="display: flex; align-items: flex-start; padding: 12px;">
              ${logoHtml}
              <div style="flex: 1; min-width: 0;">
                <h3 style="margin: 0 0 6px 0; font-weight: bold; color: #1f2937; font-size: 16px; line-height: 1.3;">
                  ${empresaNombre || "Empresa"}
                </h3>
                <p style="margin: 0; color: #4b5563; font-size: 13px; line-height: 1.4;">
                  ${address}
                </p>
              </div>
            </div>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // Abrir automáticamente la ventana de información
      infoWindow.open(map, marker);
    }

    markerRef.current = marker;

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [isLoaded, lat, lng, address, empresaNombre, logoUrl]);

  if (loadError) {
    return (
      <div className="text-red-500 text-sm text-center py-4">
        Error al cargar el mapa. Por favor, recarga la página.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-gray-500">Cargando mapa...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg border border-gray-300 overflow-hidden"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow-sm text-xs text-gray-600 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>Ubicación de la empresa</span>
        </div>
      </div>

      {address && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
          <strong className="text-gray-800">Dirección:</strong> {address}
        </div>
      )}
    </div>
  );
};
