"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./loader";

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const startTimeRef = useRef(Date.now());
  const previousPathnameRef = useRef<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detectar cambios de ruta
  useEffect(() => {
    const currentPath = pathname + (searchParams?.toString() || '');
    
    if (previousPathnameRef.current !== null && previousPathnameRef.current !== currentPath) {
      // Cambio de ruta detectado
      setIsLoading(true);
      startTimeRef.current = Date.now();
      
      // Limpiar timeout anterior si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    
    previousPathnameRef.current = currentPath;
  }, [pathname, searchParams]);

  // Controlar el tiempo mínimo de visualización
  useEffect(() => {
    if (!isLoading) return;

    const minDisplayTime = 1000; // 1 segundo
    
    const hideLoader = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        timeoutRef.current = null;
      }, remaining);
    };

    // Pequeño delay para asegurar renderizado
    const initTimer = setTimeout(hideLoader, 10);

    return () => {
      clearTimeout(initTimer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);

  // Carga inicial
  useEffect(() => {
    setIsLoading(true);
    startTimeRef.current = Date.now();
  }, []);

  return (
    <>
      {children}
      {isLoading && <Loader />}
    </>
  );
}

