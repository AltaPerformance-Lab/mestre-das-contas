import Link from "next/link";
import { Wrench, TrendingUp, Briefcase, Heart, PiggyBank, ArrowRight } from "lucide-react";
import { financeCards, laborCards, healthCards, toolsCards } from "@/data/home-cards";

type Category = "financeiro" | "trabalhista" | "saude" | "ferramentas" | "destaques";

interface SmartCrossLinkerProps {
  currentHref: string;
  category: Category;
  maxItems?: number;
}

// Embaralhamento determinístico baseado na URL da página atual
// Garante que a mesma página mostre sempre os mesmos links (estabilidade SEO)
// Mas páginas diferentes mostrarão links diferentes (espalha o link juice)
function deterministicShuffle<T>(array: T[], seedStr: string): T[] {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = seedStr.charCodeAt(i) + ((seed << 5) - seed);
  }
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const random = Math.abs(seed / 233280);
    const j = Math.floor(random * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SmartCrossLinker({ currentHref, category, maxItems = 4 }: SmartCrossLinkerProps) {
  
  // 1. Mapeamento com STRINGS COMPLETAS para o Tailwind compilar corretamente
  const config = {
    financeiro: {
      icon: <PiggyBank size={22} className="text-emerald-500" />,
      title: "Ferramentas Financeiras Relacionadas",
      theme: {
        borderHover: "hover:border-emerald-500 dark:hover:border-emerald-500",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        iconBgHover: "group-hover:bg-emerald-500",
        iconText: "text-emerald-600 dark:text-emerald-400",
        arrow: "text-emerald-500"
      },
      data: financeCards,
    },
    trabalhista: {
      icon: <Briefcase size={22} className="text-blue-500" />,
      title: "Calculadoras Trabalhistas",
      theme: {
        borderHover: "hover:border-blue-500 dark:hover:border-blue-500",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        iconBgHover: "group-hover:bg-blue-500",
        iconText: "text-blue-600 dark:text-blue-400",
        arrow: "text-blue-500"
      },
      data: laborCards,
    },
    saude: {
      icon: <Heart size={22} className="text-rose-500" />,
      title: "Calculadoras de Saúde",
      theme: {
        borderHover: "hover:border-rose-500 dark:hover:border-rose-500",
        iconBg: "bg-rose-100 dark:bg-rose-900/30",
        iconBgHover: "group-hover:bg-rose-500",
        iconText: "text-rose-600 dark:text-rose-400",
        arrow: "text-rose-500"
      },
      data: healthCards,
    },
    ferramentas: {
      icon: <Wrench size={22} className="text-violet-500" />,
      title: "Ferramentas Úteis",
      theme: {
        borderHover: "hover:border-violet-500 dark:hover:border-violet-500",
        iconBg: "bg-violet-100 dark:bg-violet-900/30",
        iconBgHover: "group-hover:bg-violet-500",
        iconText: "text-violet-600 dark:text-violet-400",
        arrow: "text-violet-500"
      },
      data: toolsCards,
    },
    destaques: {
      icon: <TrendingUp size={22} className="text-amber-500" />,
      title: "Mais Acessados",
      theme: {
        borderHover: "hover:border-amber-500 dark:hover:border-amber-500",
        iconBg: "bg-amber-100 dark:bg-amber-900/30",
        iconBgHover: "group-hover:bg-amber-500",
        iconText: "text-amber-600 dark:text-amber-400",
        arrow: "text-amber-500"
      },
      data: [...financeCards, ...laborCards, ...toolsCards].filter(c => c.highlight)
    }
  };

  const currentConfig = config[category] || config.financeiro;
  const { theme } = currentConfig;

  // 2. Filtra a página atual
  const availableTools = currentConfig.data.filter(tool => !currentHref.startsWith(tool.href));
  
  // 3. Embaralha de forma determinística
  const shuffledTools = deterministicShuffle(availableTools, currentHref);
  
  // 4. Pega os primeiros maxItems
  const recommendedTools = shuffledTools.slice(0, maxItems);

  if (recommendedTools.length === 0) return null;

  return (
    // Transformado em <aside> para melhor semântica de SEO estrutural
    <aside aria-label="Links relacionados" className="mt-12 not-prose border-t border-slate-200 dark:border-slate-800 pt-8 print:hidden">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        {currentConfig.icon} {currentConfig.title}
      </h3>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedTools.map((tool, index) => {
          const IconComponent = tool.icon;
          
          return (
            <Link key={index} href={tool.href} className="block group">
              <div className={`h-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1 ${theme.borderHover}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${theme.iconBg} ${theme.iconBgHover}`}>
                  <IconComponent size={20} className={`group-hover:text-white transition-colors ${theme.iconText}`} />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1 flex items-center justify-between">
                  {tool.title}
                  <ArrowRight size={14} className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${theme.arrow}`} />
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">
                  {tool.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
