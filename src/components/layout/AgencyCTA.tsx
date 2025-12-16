"use client";

import { Rocket, Code2 } from "lucide-react";

export default function AgencyCTA() {
  return (
    <div className="mt-10 relative overflow-hidden rounded-xl bg-slate-950 text-white shadow-2xl print:hidden group">
      
      {/* Background Tech sutil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6">
        
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/50">
            <Code2 className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Gostou da velocidade desta ferramenta?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-lg">
              Este site foi desenvolvido pela <strong>Alta Performance Web</strong>. Criamos sistemas, calculadoras e sites que carregam instantaneamente e convertem mais.
            </p>
          </div>
        </div>

        <a 
          href="https://wa.me/5564981296245?text=Ol%C3%A1%2C%20vi%20o%20Mestre%20dos%20C%C3%A1lculos%20e%20quero%20um%20projeto%20similar." 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-bold text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-900/20 whitespace-nowrap"
        >
          <Rocket size={16} />
          Solicitar Orçamento
        </a>
      </div>
    </div>
  );
}