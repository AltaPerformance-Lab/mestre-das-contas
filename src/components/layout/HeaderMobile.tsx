"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar"; // Reusa a mesma sidebar dentro do menu mobile

export default function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
      {/* Logo Mobile */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-blue-600 text-white p-1.5 rounded-md">
          <Calculator size={20} strokeWidth={2.5} />
        </div>
        <span className="font-bold text-slate-900 tracking-tight">Mestre das Contas</span>
      </Link>

      {/* Botão Menu */}
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6 text-slate-700" />
      </Button>

      {/* Drawer / Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fundo Escuro */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          {/* Conteúdo do Menu */}
          <div className="relative bg-white w-[280px] h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            
            {/* Reusa a Sidebar aqui dentro */}
            <div className="h-full overflow-y-auto" onClick={() => setIsOpen(false)}> 
               {/* O onClick fecha o menu ao clicar num link */}
               <Sidebar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}