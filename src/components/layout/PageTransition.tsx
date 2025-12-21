"use client";

import { 
  AnimatePresence, 
  domAnimation, 
  LazyMotion, 
  m // 'm' é a versão ultra-leve do 'motion'
} from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    /* 1. LazyMotion: Carrega apenas o motor básico de animação (sem física pesada).
      Isso reduz o JS inicial em cerca de 25kb (Gzip).
    */
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <m.div
          key={pathname}
          /* 2. Usamos 'm.div' em vez de 'motion.div'.
             Isso diz ao Framer para usar a versão leve carregada acima.
          */
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.2, // Um pouco mais rápido para parecer mais responsivo (snappy)
            ease: "easeOut" 
          }}
          className="w-full flex-1 flex flex-col"
          /* 3. Acessibilidade: O framer lida com reduced-motion nativamente 
             quando usamos domAnimation, mas manter a transição simples ajuda.
          */
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}