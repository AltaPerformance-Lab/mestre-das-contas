"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Calculator, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar"; // Reutilizamos a Sidebar aqui dentro para não duplicar código

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Fecha o menu se a tela for redimensionada para desktop (evita bugs visuais)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trava o scroll do corpo da página quando o menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* --- BARRA DE TOPO (Visível apenas Mobile/Tablet) --- */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
            <Calculator size={20} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">
            Mestre das <span className="text-blue-600">Contas</span>
          </span>
        </Link>

        {/* AÇÕES (Busca Rápida + Menu) */}
        <div className="flex items-center gap-2">
          
          {/* Botão de Busca (Opcional - leva para a home ou abre modal) */}
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
              <Search size={20} />
            </Button>
          </Link>

          {/* Botão Menu Hambúrguer */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(true)}
            className="text-slate-700 hover:bg-slate-100 rounded-full"
            aria-label="Abrir Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* --- DRAWER / MENU LATERAL (Overlay) --- */}
      {/* Fundo Escuro (Backdrop) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      {/* Conteúdo do Menu (Gaveta) */}
      <div 
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Cabeçalho do Menu Interno */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Navegação</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Fechar Menu"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Reutiliza o Componente Sidebar Original */}
        {/* O 'overflow-y-auto' permite rolar o menu se ele for muito alto */}
        <div className="flex-1 overflow-y-auto" onClick={(e) => {
            // Fecha o menu se clicar em um link (a tag 'A' ou Link do Next)
            if ((e.target as HTMLElement).closest('a')) {
                setIsOpen(false);
            }
        }}>
           <Sidebar />
        </div>
      </div>
    </>
  );
}