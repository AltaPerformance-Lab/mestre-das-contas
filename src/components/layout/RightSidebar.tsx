"use client";

import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit"; 
import { TrendingUp, ArrowRight, Sparkles, Calculator } from "lucide-react";

export default function RightSidebar() {
  return (
    <aside className="flex flex-col gap-8 py-6 px-4 h-full">
      
      {/* --- BLOCO 1: ANÚNCIO RETÂNGULO (Acima da dobra) --- */}
      {/* Removemos a borda externa pois o AdUnit já é um card completo */}
      <div className="w-full">
         <AdUnit 
            slot="sidebar_right_top" 
            format="rectangle" 
            variant="auto" // O sistema escolherá um anúncio
         />
      </div>

      {/* --- BLOCO 2: WIDGET DESTAQUES (Estilo Dark Premium) --- */}
      <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200/50 group">
          
          {/* Efeito de Fundo */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>

          <h3 className="relative z-10 font-bold text-sm mb-5 flex items-center gap-2 text-blue-200 uppercase tracking-wider">
              <TrendingUp size={16} className="text-blue-400"/> Em Alta Agora
          </h3>

          <ul className="relative z-10 space-y-4">
              <li>
                  <Link href="/financeiro/reforma-tributaria" className="group/link block">
                      <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-emerald-400 flex items-center gap-2">
                             <Sparkles size={14} /> Novo IVA 2026
                          </span>
                          <ArrowRight size={14} className="text-slate-500 group-hover/link:text-emerald-400 group-hover/link:translate-x-1 transition-all"/>
                      </div>
                      <span className="text-xs text-slate-400 block leading-snug">
                          Simule o impacto da nova lei na sua empresa.
                      </span>
                  </Link>
              </li>
              
              <li className="border-t border-white/10 pt-3">
                  <Link href="/trabalhista/rescisao" className="group/link block">
                      <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white group-hover/link:text-blue-300 transition-colors">
                              Rescisão CLT
                          </span>
                          <ArrowRight size={14} className="text-slate-500 group-hover/link:text-blue-300 group-hover/link:translate-x-1 transition-all"/>
                      </div>
                      <span className="text-xs text-slate-400 block leading-snug">
                          Cálculo exato com multas e FGTS atualizado.
                      </span>
                  </Link>
              </li>

              <li className="border-t border-white/10 pt-3">
                  <Link href="/saude/gestacional" className="group/link block">
                      <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white group-hover/link:text-pink-300 transition-colors">
                              Calculadora Gestacional
                          </span>
                          <ArrowRight size={14} className="text-slate-500 group-hover/link:text-pink-300 group-hover/link:translate-x-1 transition-all"/>
                      </div>
                      <span className="text-xs text-slate-400 block leading-snug">
                          Descubra a DPP e a idade do bebê.
                      </span>
                  </Link>
              </li>
          </ul>
      </div>

      {/* --- BLOCO 3: ANÚNCIO STICKY (Gruda ao rolar) --- */}
      {/* A classe 'sticky top-24' faz a mágica acontecer */}
      <div className="sticky top-24 w-full">
         <AdUnit 
            slot="sidebar_right_sticky" 
            format="vertical" 
            variant="agency" // Força o anúncio da agência aqui para vender o serviço
         />
      </div>

    </aside>
  );
}