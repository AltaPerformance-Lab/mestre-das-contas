"use client";

import { Rocket, Code2 } from "lucide-react";
import Link from "next/link";

export default function AgencyCTA() {
  return (
    <div className="mt-12 mb-8 relative overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl print:hidden group border border-slate-800 isolate">
      
      {/* Background Otimizado (CSS Puro, sem imagens externas) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 gap-6 md:gap-8">
        
        <div className="flex items-start gap-5 text-center md:text-left">
          <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 ring-1 ring-blue-500/30 text-blue-400 shrink-0 shadow-lg shadow-blue-900/20">
            <Code2 size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">
              Precisa de um site rápido como este?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md text-pretty">
              Desenvolvemos calculadoras e sistemas de alta performance focados em SEO e conversão. 
              Fale com a <strong className="text-blue-400">Alta Performance Web</strong>.
            </p>
          </div>
        </div>

        <Link 
          href="/para-empresas" 
          className="flex items-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/20 whitespace-nowrap active:scale-95"
          aria-label="Conhecer soluções para empresas"
        >
          <Rocket size={18} />
          Solicitar Orçamento
        </Link>
      </div>
    </div>
  );
}