"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: string;
  delay?: string;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function AnimateOnScroll({
  children,
  animation = "fadeInUp",
  delay = "",
  className = "",
  threshold = 0.1,
  triggerOnce = true,
}: AnimateOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    // Verificar si está en vista inicialmente
    initialInView: false,
    // Usar rootMargin para activar un poco antes
    rootMargin: '0px 0px -50px 0px',
  });

  // Combinar ambos refs
  const combinedRef = (node: HTMLDivElement | null) => {
    elementRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  // Inicializar estado oculto
  useEffect(() => {
    if (elementRef.current && !isInitialized) {
      const element = elementRef.current;
      // Verificar si el elemento está en el viewport al montarse
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInViewport && !inView) {
        // Ocultar solo si no está en vista
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
      } else if (isInViewport) {
        // Si está en vista, mostrar inmediatamente con animación
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        element.classList.add("animate__animated", `animate__${animation}`);
        if (delay) {
          element.classList.add(`animate__${delay}`);
        }
        setHasAnimated(true);
      }
      setIsInitialized(true);
    }
  }, [inView, isInitialized, animation, delay]);

  useEffect(() => {
    if (elementRef.current && isInitialized && inView && !hasAnimated) {
      const element = elementRef.current;
      
      // Pequeño delay para asegurar renderizado
      const timer = setTimeout(() => {
        // Mostrar elemento
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        
        // Agregar animación
        element.classList.add("animate__animated", `animate__${animation}`);
        if (delay) {
          element.classList.add(`animate__${delay}`);
        }
        
        setHasAnimated(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [inView, animation, delay, hasAnimated, isInitialized]);

  return (
    <div 
      ref={combinedRef} 
      className={className}
      style={{ 
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
