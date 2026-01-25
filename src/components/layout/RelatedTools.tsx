"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calculator, DollarSign, Briefcase, Heart, 
  Droplet, Flame, Baby, Scale, 
  Zap, Calendar, Percent, Landmark, 
  CreditCard, Image as ImageIcon, FileText, 
  Lock, QrCode, Smartphone, Receipt, CheckCircle2
} from "lucide-react";

type Tool = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: any;
  color: string;
  bgIsDark?: boolean;
};

const ALL_TOOLS: Tool[] = [
  // FINANCEIRO
  { id: "financiamento-veiculos", title: "Financiamento de Veículos", description: "Simule parcelas e juros de carros (CDC).", href: "/financeiro/financiamento-veiculos", icon: Calculator, color: "text-blue-600 dark:text-blue-400" },
  { id: "salario-liquido", title: "Salário Líquido", description: "Descubra quanto cai na sua conta.", href: "/financeiro/salario-liquido", icon: DollarSign, color: "text-green-600 dark:text-green-400" },
  { id: "simulador-maquininha", title: "Taxas da Maquininha", description: "Quanto você recebe das vendas?", href: "/financeiro/simulador-maquininha", icon: CreditCard, color: "text-violet-600 dark:text-violet-400" },
  { id: "juros-compostos", title: "Juros Compostos", description: "Simule a mágica dos investimentos.", href: "/financeiro/juros-compostos", icon: Percent, color: "text-emerald-600 dark:text-emerald-400" },
  { id: "financiamento", title: "Financiamento Imobiliário", description: "SAC vs Price: Qual o melhor?", href: "/financeiro/financiamento", icon: Landmark, color: "text-indigo-600 dark:text-indigo-400" },
  { id: "calculadora-mei", title: "Calculadora MEI", description: "Limite, DAS e Declaração.", href: "/financeiro/calculadora-mei", icon: Briefcase, color: "text-emerald-500 dark:text-emerald-400" },
  { id: "reforma-tributaria", title: "Reforma Tributária", description: "Entenda o novo IVA/IBS.", href: "/financeiro/reforma-tributaria", icon: Landmark, color: "text-amber-500 dark:text-amber-400" },
  { id: "dias-uteis", title: "Dias Úteis", description: "Calcule prazos e feriados.", href: "/financeiro/calculadora-dias-uteis", icon: Calendar, color: "text-blue-500 dark:text-blue-400" },
  
  // TRABALHISTA
  { id: "rescisao", title: "Cálculo de Rescisão", description: "Quanto vou receber ao sair?", href: "/trabalhista/rescisao", icon: Briefcase, color: "text-amber-600 dark:text-amber-400" },
  { id: "ferias", title: "Calculadora de Férias", description: "Simule valor com 1/3 constitucional.", href: "/trabalhista/ferias", icon: Calendar, color: "text-orange-600 dark:text-orange-400" },
  { id: "decimo-terceiro", title: "13º Salário", description: "Primeira e segunda parcela.", href: "/trabalhista/decimo-terceiro", icon: DollarSign, color: "text-yellow-600 dark:text-yellow-400" },
  { id: "seguro-desemprego", title: "Seguro Desemprego", description: "Valor e parcelas.", href: "/trabalhista/seguro-desemprego", icon: Lock, color: "text-indigo-600 dark:text-indigo-400" },
  { id: "horas-extras", title: "Horas Extras", description: "Calcule 50%, 100% e noturno.", href: "/trabalhista/horas-extras", icon: Zap, color: "text-purple-600 dark:text-purple-400" },
  
  // SAÚDE
  { id: "gestacional", title: "Calculadora Gestacional", description: "DPP, Semanas e Signo do bebê.", href: "/saude/gestacional", icon: Baby, color: "text-pink-600 dark:text-pink-400" },
  { id: "imc", title: "IMC Online", description: "Calcule seu Índice de Massa Corporal.", href: "/saude/imc", icon: Scale, color: "text-red-600 dark:text-red-400" },
  { id: "calorias-diarias", title: "Calorias Diárias (TMB)", description: "Dieta para emagrecer ou ganhar massa.", href: "/saude/calorias-diarias", icon: Flame, color: "text-orange-500 dark:text-orange-400" },
  { id: "agua", title: "Água Diária", description: "Meta de hidratação por peso.", href: "/saude/agua", icon: Droplet, color: "text-cyan-600 dark:text-cyan-400" },

  // FERRAMENTAS
  { id: "gerador-pix", title: "Gerador de Pix", description: "Crie QR Code com valor fixo.", href: "/ferramentas/gerador-pix", icon: QrCode, color: "text-emerald-500 dark:text-emerald-400" },
  { id: "gerador-recibo", title: "Gerador de Recibo", description: "Recibos profissionais em PDF.", href: "/ferramentas/gerador-recibo", icon: Receipt, color: "text-slate-600 dark:text-slate-400" },
  { id: "gerador-link-whatsapp", title: "Link WhatsApp", description: "Crie links diretos para conversa.", href: "/ferramentas/gerador-link-whatsapp", icon: Smartphone, color: "text-green-500 dark:text-green-400" },
  { id: "conversor-imagem", title: "Conversor de Imagem", description: "WebP, PNG, JPG otimizados.", href: "/ferramentas/conversor-imagem", icon: ImageIcon, color: "text-purple-600 dark:text-purple-400" },
];

interface RelatedToolsProps {
  currentTool: string;
}

export default function RelatedTools({ currentTool }: RelatedToolsProps) {
  const [recommendations, setRecommendations] = useState<Tool[]>([]);

  useEffect(() => {
    // 1. Filtra a ferramenta atual
    const available = ALL_TOOLS.filter(t => t.id !== currentTool);
    
    // 2. Embaralha (Fisher-Yates Shuffle moderno)
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }

    // 3. Pega as 3 primeiras
    setRecommendations(available.slice(0, 3));
  }, [currentTool]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose animate-in fade-in slide-in-from-bottom-4 duration-700">
      <p className="font-bold text-slate-900 dark:text-slate-100 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
         <CheckCircle2 size={16} className="text-emerald-500"/> Veja também:
      </p>
      
      <div className="grid md:grid-cols-3 gap-4">
        {recommendations.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link 
              key={tool.id} 
              href={tool.href} 
              className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all group relative overflow-hidden"
            >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"/>

                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform bg-slate-50 dark:bg-slate-800 ${tool.color}`}>
                   <Icon size={20}/>
                </div>
                
                <span className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                </span>
                
                <span className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                    {tool.description}
                </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
