"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Versão Blindada para Next.js 15
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 15 }} // Começa um pouco mais baixo
        animate={{ opacity: 1, y: 0 }}  // Sobe suavemente
        exit={{ opacity: 0, y: -15 }}   // Sai subindo
        transition={{ 
          duration: 0.25, 
          ease: "easeOut" 
        }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}