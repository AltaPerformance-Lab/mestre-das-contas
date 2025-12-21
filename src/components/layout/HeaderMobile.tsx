"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calculator } from "lucide-react";
// IMPORTANTE: Reutilizamos o Sidebar principal, passando a prop isMobile
import Sidebar from "./Sidebar"; 

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
      <header className="md:hidden px-4 py-3 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-slate-200 fixed top-0 left-0 right-0 z-40 h-16 shadow-sm">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm shadow-blue-200">
            <Calculator size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Mestre das Contas</span>
        </Link>

        {/* Botão Abrir */}
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-slate-700 hover:bg-slate-100 rounded-full active:bg-slate-200 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="h-7 w-7" />
        </button>
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
          className={`absolute top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header Interno do Menu */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/80 shrink-0 h-16">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">
                Navegação
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Conteúdo (Reutiliza Sidebar com isMobile=true) */}
          <div className="flex-1 overflow-y-auto bg-white overscroll-contain pt-4">
             <Sidebar isMobile={true} onItemClick={() => setIsOpen(false)} />
          </div>

          {/* Footer do Menu */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-center text-slate-400 shrink-0">
            Mestre das Contas &copy; 2026
          </div>
        </div>
      </div>
    </>
  );
}