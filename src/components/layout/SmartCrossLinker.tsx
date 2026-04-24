import Link from "next/link";
import { Wrench, TrendingUp, Briefcase, Heart, PiggyBank, ArrowRight } from "lucide-react";
import { financeCards, laborCards, healthCards, toolsCards } from "@/data/home-cards";

type Category = "financeiro" | "trabalhista" | "saude" | "ferramentas";

interface SmartCrossLinkerProps {
  currentHref: string;
  category: Category;
  maxItems?: number;
}

export default function SmartCrossLinker({ currentHref, category, maxItems = 4 }: SmartCrossLinkerProps) {
  // 1. Mapeia as categorias para seus respectivos ícones e títulos
  const config = {
    financeiro: {
      icon: <PiggyBank size={22} className="text-emerald-500" />,
      title: "Ferramentas Financeiras Relacionadas",
      color: "emerald",
      data: financeCards,
    },
    trabalhista: {
      icon: <Briefcase size={22} className="text-blue-500" />,
      title: "Calculadoras Trabalhistas",
      color: "blue",
      data: laborCards,
    },
    saude: {
      icon: <Heart size={22} className="text-rose-500" />,
      title: "Calculadoras de Saúde",
      color: "rose",
      data: healthCards,
    },
    ferramentas: {
      icon: <Wrench size={22} className="text-violet-500" />,
      title: "Ferramentas Úteis",
      color: "violet",
      data: toolsCards,
    },
  };

  const currentConfig = config[category] || config.financeiro;

  // 2. Filtra os itens removendo a página atual e seleciona uma quantidade aleatória ou os primeiros da lista
  // Isso garante que o usuário não seja recomendado para a página em que já está
  const availableTools = currentConfig.data.filter(tool => !currentHref.startsWith(tool.href));
  
  // Opcional: Embaralhar para o SEO ver links diferentes? 
  // O Google prefere consistência, vamos pegar os X primeiros mais relevantes
  const recommendedTools = availableTools.slice(0, maxItems);

  if (recommendedTools.length === 0) return null;

  return (
    <div className="mt-12 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        {currentConfig.icon} {currentConfig.title}
      </h3>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedTools.map((tool, index) => {
          const IconComponent = tool.icon;
          
          return (
            <Link key={index} href={tool.href} className="block group">
              <div className={`h-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-${currentConfig.color}-500 dark:hover:border-${currentConfig.color}-500 transition-all hover:shadow-md hover:-translate-y-1`}>
                <div className={`bg-${currentConfig.color}-100 dark:bg-${currentConfig.color}-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-${currentConfig.color}-500 transition-colors`}>
                  <IconComponent size={20} className={`text-${currentConfig.color}-600 dark:text-${currentConfig.color}-400 group-hover:text-white`} />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1 flex items-center justify-between">
                  {tool.title}
                  <ArrowRight size={14} className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-${currentConfig.color}-500`} />
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">
                  {tool.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
