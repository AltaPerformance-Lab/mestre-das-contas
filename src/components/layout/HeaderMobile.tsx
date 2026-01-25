"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calculator } from "lucide-react";
// IMPORTANTE: Reutilizamos o Sidebar principal, passando a prop isMobile
import Sidebar from "./Sidebar"; 

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu ao navegar
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloqueia scroll do body quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className="md:hidden px-4 py-3 flex items-center justify-between bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 fixed top-0 left-0 right-0 z-40 h-16 shadow-sm dark:shadow-none transition-colors">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm shadow-blue-200">
            <Calculator size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-lg tracking-tight">Mestre das Contas</span>
        </Link>

        {/* Botão Tema e Abrir */}
        <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 -mr-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full active:bg-slate-200 transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="h-7 w-7" />
            </button>
        </div>
      </header>

      {/* --- GAVETA LATERAL --- */}
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? "visible" : "invisible delay-300"
        }`}
      >
        {/* Fundo Escuro (Backdrop) */}
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* O Menu em Si */}
        <div 
          className={`absolute top-0 left-0 h-full w-[85%] max-w-[320px] bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header Interno do Menu */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 shrink-0 h-16">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-2">
                Navegação
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Conteúdo (Reutiliza Sidebar com isMobile=true) */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 overscroll-contain pt-4">
             <Sidebar isMobile={true} onItemClick={() => setIsOpen(false)} />
          </div>

          {/* Footer do Menu */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-[10px] text-center text-slate-400 dark:text-slate-600 shrink-0">
            Mestre das Contas &copy; 2026
          </div>
        </div>
      </div>
    </>
  );
}