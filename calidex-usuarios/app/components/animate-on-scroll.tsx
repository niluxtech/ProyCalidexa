"use client";

import { useEffect, useRef } from "react";
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
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
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

  useEffect(() => {
    if (inView && elementRef.current) {
      const element = elementRef.current;
      element.classList.add("animate__animated", `animate__${animation}`);
      if (delay) {
        element.classList.add(`animate__${delay}`);
      }
    }
  }, [inView, animation, delay]);

  return (
    <div ref={combinedRef} className={className}>
      {children}
    </div>
  );
}
