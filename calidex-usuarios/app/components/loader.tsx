"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular progreso del 0% al 100% en 1000ms (1 segundo)
    const duration = 1000; // 1000ms = 1 segundo
    const steps = 50; // 50 actualizaciones
    const increment = 100 / steps;
    const intervalTime = duration / steps;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        opacity: 1,
        pointerEvents: 'all'
      }}
    >
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Logo con patrón de puntos animado */}
          <div className="relative w-32 h-32 loader-container">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Punto central */}
              <circle 
                cx="60" 
                cy="60" 
                r="4" 
                fill="#14285f"
                className="loader-dot"
                style={{ animationDelay: '0s' }}
              />
              
              {/* Puntos en círculo interno (6 puntos) */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const radius = 20;
                const x = Math.round((60 + radius * Math.cos(angle)) * 100) / 100;
                const y = Math.round((60 + radius * Math.sin(angle)) * 100) / 100;
                return (
                  <circle
                    key={`inner-${i}`}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#14285f"
                    className="loader-dot"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  />
                );
              })}
              
              {/* Puntos en círculo medio (12 puntos) */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const radius = 35;
                const x = Math.round((60 + radius * Math.cos(angle)) * 100) / 100;
                const y = Math.round((60 + radius * Math.sin(angle)) * 100) / 100;
                return (
                  <circle
                    key={`middle-${i}`}
                    cx={x}
                    cy={y}
                    r="2.5"
                    fill="#c58e39"
                    className="loader-dot"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                );
              })}
              
              {/* Puntos en círculo externo (18 puntos) */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((i) => {
                const angle = (i * 20) * (Math.PI / 180);
                const radius = 50;
                const x = Math.round((60 + radius * Math.cos(angle)) * 100) / 100;
                const y = Math.round((60 + radius * Math.sin(angle)) * 100) / 100;
                return (
                  <circle
                    key={`outer-${i}`}
                    cx={x}
                    cy={y}
                    r="2"
                    fill="#14285f"
                    className="loader-dot"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Título */}
          <h1 className="text-4xl font-bold text-white tracking-wide">
            CalidexA
          </h1>

          {/* Mensaje de carga */}
          <p className="text-white/80 text-lg">
            Cargando contenido...
          </p>

          {/* Barra de progreso */}
          <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#14285f] via-[#c58e39] to-[#14285f] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
  );
}

