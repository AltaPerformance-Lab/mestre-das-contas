"use client";

// Otimização de Performance (LCP):
// Removemos a animação global do Framer Motion pois ela causava
// "opacity: 0" inicial, atrasando o LCP em 7+ segundos no mobile.
// Agora o conteúdo é renderizado instantaneamente.

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex-1 flex flex-col">
      {children}
    </div>
  );
}