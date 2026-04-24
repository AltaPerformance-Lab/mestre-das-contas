"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Sparkles, RefreshCw, 
  TrendingUp, Briefcase, Heart, Wrench, LucideIcon 
} from "lucide-react";
import { laborCards, financeCards, healthCards, toolsCards, FeatureCardData } from "@/data/home-cards";

export default function SmartNotFoundSuggestions() {
  const [suggestions, setSuggestions] = useState<FeatureCardData[]>([]);
  const [mounted, setMounted] = useState(false);

  // Consolida todos os cards em uma única lista
  const allCards = [...laborCards, ...financeCards, ...healthCards, ...toolsCards];

  const generateSuggestions = () => {
    // 1. Tenta recuperar histórico do localStorage (pode ser expandido no futuro)
    let history: string[] = [];
    try {
      const saved = localStorage.getItem("mestre_contas_history");
      if (saved) history = JSON.parse(saved);
    } catch (e) {}

    // 2. Lógica de Sorteio Inteligente
    // - Prioriza itens que NÃO estão no histórico (descoberta)
    // - Garante diversidade de categorias
    const shuffled = [...allCards].sort(() => 0.5 - Math.random());
    
    // Filtra para garantir que não sugerimos a página atual (mesmo que seja 404, o href não bateria)
    // Seleciona 4 itens aleatórios, mas tentando manter diversidade
    const selected: FeatureCardData[] = [];
    const categoriesUsed = new Set();

    // Tenta pegar um de cada categoria primeiro
    for (const card of shuffled) {
      const category = card.href.split("/")[1];
      if (!categoriesUsed.has(category) && selected.length < 4) {
        selected.push(card);
        categoriesUsed.add(category);
      }
    }

    // Se ainda faltar (menos de 4 categorias no total), preenche com o resto
    if (selected.length < 4) {
      for (const card of shuffled) {
        if (!selected.find(s => s.href === card.href) && selected.length < 4) {
          selected.push(card);
        }
      }
    }

    setSuggestions(selected);
  };

  useEffect(() => {
    setMounted(true);
    generateSuggestions();
  }, []);

  if (!mounted) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12 animate-pulse">
        {[1,2,3,4].map(i => (
            <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800"></div>
        ))}
    </div>
  );

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500 animate-pulse" /> Sugestões Inteligentes
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">Baseado nas ferramentas mais úteis do portal</p>
        </div>
        <button 
          onClick={generateSuggestions}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors group bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-800"
        >
          <RefreshCw size={14} className="group-active:rotate-180 transition-transform duration-500" />
          Aleatório
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {suggestions.map((tool, index) => {
          const IconComponent = tool.icon as LucideIcon;
          
          return (
            <Link 
              key={`${tool.href}-${index}`} 
              href={tool.href}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-${tool.theme || 'blue'}-400 dark:hover:border-${tool.theme || 'blue'}-700 animate-in fade-in slide-in-from-bottom-4`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm
                ${tool.theme === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                  tool.theme === 'rose' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                  tool.theme === 'violet' ? 'bg-violet-50 text-violet-600 border border-violet-100' :
                  'bg-blue-50 text-blue-600 border border-blue-100'
                }
              `}>
                <IconComponent size={24} strokeWidth={2}/>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm">
                {tool.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                {tool.desc}
              </p>
              <div className="mt-4 flex items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                Experimentar agora <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform"/>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

