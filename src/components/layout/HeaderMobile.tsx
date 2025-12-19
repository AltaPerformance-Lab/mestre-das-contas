"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calculator } from "lucide-react";
// IMPORTANTE: Estamos importando o MobileSidebar específico
import MobileSidebar from "./MobileSidebar"; 

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu ao navegar
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloqueia scroll
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
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-slate-100 relative z-50">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
            <Calculator size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Mestre das Contas</span>
        </Link>

        {/* Botão Abrir */}
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-transform"
        >
          <Menu className="h-7 w-7" />
        </button>
      </header>

      {/* --- MENU OVERLAY (LÓGICA CSS PURA) --- */}
      {/* Container fixo que controla a visibilidade geral */}
      <div 
        className={`fixed inset-0 z-[9999] transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0 delay-200"
        }`}
      >
        {/* Fundo Escuro */}
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* O DRAWER (Gaveta Lateral) */}
        <div 
          className={`absolute top-0 left-0 h-full w-[85%] max-w-[300px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header do Menu */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50 shrink-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navegação</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* CONTEÚDO (Aqui entra o MobileSidebar) */}
          <div className="flex-1 overflow-y-auto bg-white">
             {/* Verifica se o componente existe visualmente */}
             <MobileSidebar />
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