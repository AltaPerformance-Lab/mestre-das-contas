"use client";

import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit"; 
import { TrendingUp, ArrowRight, Sparkles, Coins, Baby, QrCode } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="flex flex-col gap-6 py-6 w-full items-center h-full">
      
      {/* 1. ANÚNCIO TOPO (Rola normal) */}
      <div className="w-full flex justify-center px-1">
         <AdUnit 
            slot="sidebar_right_top" 
            format="rectangle" 
            variant="auto"
            className="!my-0" 
         />
      </div>

      {/* 2. WIDGET DESTAQUES (Rola normal) */}
      <div className="w-[calc(100%-16px)] relative overflow-hidden bg-slate-900 rounded-2xl p-5 text-white shadow-xl shadow-slate-200/50 group">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
          <h3 className="relative z-10 font-bold text-xs mb-4 flex items-center gap-2 text-blue-200 uppercase tracking-wider">
              <TrendingUp size={14} className="text-blue-400"/> Em Alta
          </h3>
          <ul className="relative z-10 space-y-3">
              <li>
                  <Link href="/financeiro/reforma-tributaria" className="group/link block">
                      <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-sm text-emerald-400 flex items-center gap-2"><Sparkles size={13} /> Novo IVA 2026</span>
                          <ArrowRight size={13} className="text-slate-500 group-hover/link:text-emerald-400 group-hover/link:translate-x-1 transition-all"/>
                      </div>
                      <span className="text-[11px] text-slate-400 block leading-tight">Impacto nos serviços e comércio.</span>
                  </Link>
              </li>
              <li className="border-t border-white/10 pt-2">
                  <Link href="/financeiro/salario-liquido" className="group/link block">
                      <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-sm text-white group-hover/link:text-blue-300 transition-colors flex items-center gap-2"><Coins size={13} className="text-blue-400"/> Salário Líquido</span>
                          <ArrowRight size={13} className="text-slate-500 group-hover/link:text-blue-300 group-hover/link:translate-x-1 transition-all"/>
                      </div>
                      <span className="text-[11px] text-slate-400 block leading-tight">Tabela 2025 atualizada.</span>
                  </Link>
              </li>
              <li className="border-t border-white/10 pt-2">
                  <Link href="/ferramentas/gerador-qr-code" className="group/link block">
                      <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-sm text-white group-hover/link:text-yellow-300 transition-colors flex items-center gap-2"><QrCode size={13} className="text-yellow-400"/> QR Code Grátis</span>
                          <ArrowRight size={13} className="text-slate-500 group-hover/link:text-yellow-300 group-hover/link:translate-x-1 transition-all"/>
                      </div>
                      <span className="text-[11px] text-slate-400 block leading-tight">Pix, Wi-Fi e Links sem expirar.</span>
                  </Link>
              </li>
          </ul>
      </div>

      {/* 3. ANÚNCIO STICKY (O Único que cola) */}
      {/* O TRUQUE: 'sticky top-24' faz este elemento específico grudar na tela 
          quando o usuário rolar, enquanto o resto da sidebar (acima dele) rola e some.
          Isso preenche o espaço em branco dinamicamente.
      */}
      <div className="sticky top-24 w-full flex justify-center px-1 pb-6 transition-all duration-300">
         <AdUnit 
            slot="sidebar_right_sticky" 
            format="vertical" 
            variant="agency"
            className="!my-0"
         />
      </div>

    </div>
  );
}