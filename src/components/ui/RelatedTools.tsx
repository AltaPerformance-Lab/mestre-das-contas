"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Wallet, 
  Clock, 
  FileText, 
  Coins, 
  Percent, 
  CalendarDays,
  Briefcase,
  BarChart3
} from 'lucide-react';

interface Tool {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
  category: "trabalhista" | "financeiro" | "saude" | "ferramentas";
}

const ALL_TOOLS: Tool[] = [
  // Trabalhista
  { name: "Rescisão CLT", href: "/trabalhista/rescisao", icon: Briefcase, description: "Calcule seus direitos ao sair da empresa", category: "trabalhista" },
  { name: "Férias", href: "/trabalhista/ferias", icon: CalendarDays, description: "Valor das férias + 1/3 constitucional", category: "trabalhista" },
  { name: "Décimo Terceiro", href: "/trabalhista/decimo-terceiro", icon: FileText, description: "Calcule a 1ª e 2ª parcela do 13º", category: "trabalhista" },
  { name: "Horas Extras", href: "/trabalhista/horas-extras", icon: Clock, description: "Valor da hora extra 50% e 100%", category: "trabalhista" },
  { name: "Seguro Desemprego", href: "/trabalhista/seguro-desemprego", icon: Wallet, description: "Valor e quantidade de parcelas", category: "trabalhista" },
  
  // Financeiro
  { name: "Comparador de Renda", href: "/financeiro/comparador-salario", icon: BarChart3, description: "Você é rico ou pobre? Compare sua renda", category: "financeiro" },
  { name: "Salário Líquido", href: "/financeiro/salario-liquido", icon: Coins, description: "Descontos de INSS e IRRF (2026)", category: "financeiro" },
  { name: "Juros Compostos", href: "/financeiro/juros-compostos", icon: TrendingUp, description: "Simule o poder dos juros no tempo", category: "financeiro" },
  { name: "Porcentagem", href: "/financeiro/porcentagem", icon: Percent, description: "Cálculos rápidos de %", category: "financeiro" },
  { name: "Calculadora MEI", href: "/financeiro/calculadora-mei", icon: Calculator, description: "Compare CLT x PJ (MEI)", category: "financeiro" }
];

import { TrendingUp } from 'lucide-react';

interface RelatedToolsProps {
  currentToolLink: string; // Para não mostrar a própria ferramenta
  category: "trabalhista" | "financeiro" | "saude" | "ferramentas";
  maxItems?: number;
}

export default function RelatedTools({ currentToolLink, category, maxItems = 3 }: RelatedToolsProps) {
  
  // Filtra por categoria e remove a ferramenta atual
  const filteredTools = ALL_TOOLS
    .filter(t => t.category === category && t.href !== currentToolLink)
    .slice(0, maxItems);

  if (filteredTools.length === 0) return null;

  return (
    <div className="w-full mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
         <Calculator size={20} className="text-blue-600 dark:text-blue-400"/>
         Ferramentas Relacionadas
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href}
            className="group flex flex-col p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                 <tool.icon size={18} />
               </div>
               <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{tool.name}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pl-1">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
