"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit"; 
import { TrendingUp, ArrowRight, Sparkles, Coins, Baby, QrCode, Briefcase, Calculator, FileText, Percent, Car } from "lucide-react";

const TRENDING_GROUPS = [
    [
        {
            href: "/financeiro/reforma-tributaria",
            title: "Novo IVA 2026",
            desc: "Impacto nos serviços e comércio.",
            icon: Sparkles,
            color: "text-emerald-400",
            hoverColor: "group-hover/link:text-emerald-400"
        },
        {
            href: "/financeiro/salario-liquido",
            title: "Salário Líquido",
            desc: "Tabela 2026 atualizada.",
            icon: Coins,
            color: "text-blue-400",
            hoverColor: "group-hover/link:text-blue-300"
        },
        {
            href: "/ferramentas/gerador-qr-code",
            title: "QR Code Grátis",
            desc: "Pix, Wi-Fi e Links sem expirar.",
            icon: QrCode,
            color: "text-yellow-400",
            hoverColor: "group-hover/link:text-yellow-300"
        }
    ],
    [
        {
            href: "/financeiro/calculadora-mei",
            title: "Calculadora MEI",
            desc: "Limite e DAS 2026 atualizados.",
            icon: Briefcase,
            color: "text-indigo-400",
            hoverColor: "group-hover/link:text-indigo-300"
        },
        {
            href: "/trabalhista/rescisao",
            title: "Calcular Rescisão",
            desc: "Simule seu acerto trabalhista.",
            icon: Calculator,
            color: "text-rose-400",
            hoverColor: "group-hover/link:text-rose-300"
        },
        {
             href: "/financeiro/financiamento-veiculos",
             title: "Financiar Carro",
             desc: "Simulador de parcelas reias.",
             icon: Car,
             color: "text-orange-400",
             hoverColor: "group-hover/link:text-orange-300"
        }
    ],
    [
        {
            href: "/ferramentas/recibo-online",
            title: "Recibo Online",
            desc: "Gerador de recibo PDF grátis.",
            icon: FileText,
            color: "text-emerald-400",
            hoverColor: "group-hover/link:text-emerald-300"
        },
        {
            href: "/ferramentas/porcentagem",
            title: "Calc. Porcentagem",
            desc: "Descontos e aumentos fáceis.",
            icon: Percent,
            color: "text-cyan-400",
            hoverColor: "group-hover/link:text-cyan-300"
        },
         {
            href: "/trabalhista/seguro-desemprego",
            title: "Seguro Desemprego",
            desc: "Valor e Qtd. de Parcelas.",
            icon: Briefcase,
            color: "text-amber-400",
            hoverColor: "group-hover/link:text-amber-300"
        }
    ]
];

export default function RightSidebar() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
            setCurrentGroupIndex((prev) => (prev + 1) % TRENDING_GROUPS.length);
            setFade(true);
        }, 300); // Tempo para o fade out completar
    }, 8000); // Troca a cada 8 segundos

    return () => clearInterval(interval);
  }, []);

  const currentItems = TRENDING_GROUPS[currentGroupIndex];

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

      {/* 2. WIDGET DESTAQUES ROTATIVO */}
      <div className="w-[calc(100%-16px)] relative overflow-hidden bg-slate-900 rounded-2xl p-5 text-white shadow-xl shadow-slate-200/50 dark:shadow-none group min-h-[220px]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
          
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h3 className="font-bold text-xs flex items-center gap-2 text-blue-200 uppercase tracking-wider">
                <TrendingUp size={14} className="text-blue-400"/> Em Alta
            </h3>
            <div className="flex gap-1">
                {TRENDING_GROUPS.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-500 ${idx === currentGroupIndex ? 'w-4 bg-blue-500' : 'w-1 bg-slate-700'}`}
                    />
                ))}
            </div>
          </div>

          <ul className={`relative z-10 space-y-3 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {currentItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx} className={idx > 0 ? "border-t border-white/10 pt-2" : ""}>
                        <Link href={item.href} className="group/link block">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className={`font-bold text-sm text-white ${item.hoverColor} transition-colors flex items-center gap-2`}>
                                    <Icon size={13} className={item.color}/> {item.title}
                                </span>
                                <ArrowRight size={13} className={`text-slate-500 ${item.hoverColor} group-hover/link:translate-x-1 transition-all`}/>
                            </div>
                            <span className="text-[11px] text-slate-400 block leading-tight truncate">{item.desc}</span>
                        </Link>
                    </li>
                  );
              })}
          </ul>
      </div>

      {/* 3. ANÚNCIO STICKY (O Único que cola) */}
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