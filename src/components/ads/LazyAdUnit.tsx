"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';

// Dynamic import of the actual AdUnit component
const AdUnit = dynamic(() => import("./AdUnit"), { 
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[100px] bg-slate-50 dark:bg-slate-900/50 animate-pulse rounded-3xl border border-slate-100 dark:border-slate-800" />
});

interface LazyAdUnitProps {
  slot: string;
  format?: string;
  variant?: string;
  className?: string;
}

export default function LazyAdUnit(props: LazyAdUnitProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Se já carregou, não precisa observar mais
    if (isVisible) return; 
    
    // Se não tiver suporte (browsers muito antigos), carrega logo
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Carrega 200px antes de aparecer na tela
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div ref={ref} className={`min-h-[100px] w-full ${props.className || ''} print:hidden`}>
      {isVisible ? (
        <AdUnit {...props} />
      ) : (
        /* Placeholder leve antes de carregar o Ad */
        <div className="w-full h-full min-h-[100px] bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl flex items-center justify-center border border-dashed border-slate-200/50 dark:border-slate-800/50">
             <span className="sr-only">Carregando Publicidade...</span>
        </div>
      )}
    </div>
  );
}
