"use client";

import { 
  Zap, ArrowRight, Code2, Calculator, Rocket, CheckCircle2, 
  Search, Smartphone, Magnet, TrendingUp, ShieldAlert, Palette, 
  MonitorSmartphone, Database, LineChart, LucideIcon 
} from "lucide-react";
import React from "react";

// --- CONFIGURAÇÃO ---
const WHATSAPP_NUMBER = "5564981296245"; 
const BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

interface InternalAdUnitProps {
  format?: "horizontal" | "vertical" | "rectangle" | "auto" | string;
  variant?: string | number; 
  className?: string;
  slot?: string; 
}

type AdModel = {
  id: number;
  themeBg: string;
  themeBorder: string;
  accentColor: string;
  icon: LucideIcon;
  category: string;
  title: React.ReactNode;
  subtitle: string;
  ctaText: string;
  ctaBtnClasses: string;
  texture?: "noise" | "blur-blue" | "blur-purple" | "blur-green" | "blur-orange" | "none";
}

// --- OS 15 MODELOS DE BANNER ---
const adsConfig: AdModel[] = [
  // --- GRUPO 1: INSTITUCIONAL & PROVA SOCIAL ---
  {
    id: 1, 
    themeBg: "bg-slate-950",
    themeBorder: "border-slate-800",
    accentColor: "text-purple-400",
    icon: Code2,
    category: "Desenvolvimento Web",
    title: <>Gostou deste site? <span className="text-slate-400 block text-sm md:text-base font-normal mt-1">Nós criamos a tecnologia por trás do Mestre das Contas.</span></>,
    subtitle: "Desenvolvemos sistemas de alta performance e calculadoras.",
    ctaText: "Conhecer a Agência",
    ctaBtnClasses: "bg-white text-slate-950 hover:bg-purple-50",
    texture: "blur-purple"
  },
  {
    id: 10,
    themeBg: "bg-zinc-900",
    themeBorder: "border-zinc-800",
    accentColor: "text-teal-400",
    icon: MonitorSmartphone,
    category: "Tecnologia Moderna",
    title: <>Sites que parecem apps. <span className="text-zinc-400 block text-sm md:text-base font-normal mt-1">Navegação fluida e instantânea como este site.</span></>,
    subtitle: "Usamos as tecnologias mais modernas do mercado (Next.js).",
    ctaText: "Quero um Site Moderno",
    ctaBtnClasses: "bg-teal-500 text-white hover:bg-teal-400",
    texture: "noise"
  },
  {
    id: 11,
    themeBg: "bg-gradient-to-br from-slate-900 to-red-950",
    themeBorder: "border-red-900/50",
    accentColor: "text-red-400",
    icon: Palette,
    category: "Redesign Profissional",
    title: <>Seu site parece antigo? <span className="text-red-200 block text-sm md:text-base font-normal mt-1">Design ultrapassado afasta clientes e destrói credibilidade.</span></>,
    subtitle: "Um visual moderno aumenta suas vendas instantaneamente.",
    ctaText: "Modernizar Meu Site",
    ctaBtnClasses: "bg-red-600 text-white hover:bg-red-500",
    texture: "none"
  },

  // --- GRUPO 2: VELOCIDADE & PERFORMANCE ---
  {
    id: 2, 
    themeBg: "bg-slate-900",
    themeBorder: "border-blue-900/50",
    accentColor: "text-blue-400",
    icon: Zap,
    category: "Alta Performance",
    title: <>Seu site demora para carregar? <span className="text-slate-400 block text-sm md:text-base font-normal mt-1">Você pode estar perdendo até 40% das vendas por lentidão.</span></>,
    subtitle: "Sites rápidos rankeiam melhor no Google e vendem mais.",
    ctaText: "Otimizar Agora",
    ctaBtnClasses: "bg-blue-600 text-white hover:bg-blue-500",
    texture: "blur-blue"
  },
  {
    id: 5,
    themeBg: "bg-gradient-to-r from-pink-950 to-slate-900",
    themeBorder: "border-pink-900/50",
    accentColor: "text-pink-400",
    icon: Smartphone,
    category: "Mobile First",
    title: <>Seu site é ruim no celular? <span className="text-pink-200 block text-sm md:text-base font-normal mt-1">Mais de 70% do tráfego hoje vem de smartphones.</span></>,
    subtitle: "Criamos experiências perfeitas para qualquer tela.",
    ctaText: "Arrumar Versão Mobile",
    ctaBtnClasses: "bg-pink-600 text-white hover:bg-pink-500",
    texture: "noise"
  },

  // --- GRUPO 3: CALCULADORAS & FERRAMENTAS ---
  {
    id: 3, 
    themeBg: "bg-gradient-to-r from-indigo-950 to-slate-900",
    themeBorder: "border-indigo-900/50",
    accentColor: "text-indigo-300",
    icon: Calculator,
    category: "Software House",
    title: <>Tenha sua própria Calculadora. <span className="text-indigo-200 block text-sm md:text-base font-normal mt-1">Atraia milhares de clientes qualificados automaticamente.</span></>,
    subtitle: "Ferramentas como esta geram tráfego massivo.",
    ctaText: "Orçar Ferramenta",
    ctaBtnClasses: "bg-white text-indigo-950 hover:bg-indigo-50",
    texture: "blur-purple"
  },
  {
    id: 6,
    themeBg: "bg-gradient-to-br from-orange-950 to-slate-900",
    themeBorder: "border-orange-900/50",
    accentColor: "text-orange-400",
    icon: Magnet,
    category: "Geração de Leads",
    title: <>Transforme visitantes em Leads. <span className="text-orange-200 block text-sm md:text-base font-normal mt-1">Pare de perder contatos. Capture e-mails e telefones 24/7.</span></>,
    subtitle: "Use iscas digitais de alta conversão.",
    ctaText: "Criar Máquina de Leads",
    ctaBtnClasses: "bg-orange-500 text-white hover:bg-orange-400",
    texture: "blur-orange"
  },
  {
    id: 15,
    themeBg: "bg-slate-900",
    themeBorder: "border-slate-700",
    accentColor: "text-cyan-400",
    icon: Database,
    category: "SaaS Sob Medida",
    title: <>Precisa de um sistema complexo? <span className="text-slate-400 block text-sm md:text-base font-normal mt-1">Desenvolvemos plataformas SaaS e painéis administrativos.</span></>,
    subtitle: "Automatize sua operação com software personalizado.",
    ctaText: "Falar com Engenheiro",
    ctaBtnClasses: "bg-cyan-600 text-white hover:bg-cyan-500",
    texture: "noise"
  },

  // --- GRUPO 4: SEO & TRÁFEGO ---
  {
    id: 4,
    themeBg: "bg-gradient-to-br from-green-950 to-slate-900",
    themeBorder: "border-green-900/50",
    accentColor: "text-green-400",
    icon: Search,
    category: "SEO Avançado",
    title: <>Desaparecido no Google? <span className="text-green-200 block text-sm md:text-base font-normal mt-1">Se você não está na primeira página, seu cliente não te acha.</span></>,
    subtitle: "Dominamos as técnicas para colocar sua empresa no topo.",
    ctaText: "Quero Rankear no Google",
    ctaBtnClasses: "bg-green-600 text-white hover:bg-green-500",
    texture: "blur-green"
  },
  {
    id: 8,
    themeBg: "bg-emerald-950",
    themeBorder: "border-emerald-800",
    accentColor: "text-emerald-400",
    icon: TrendingUp,
    category: "Tráfego Orgânico",
    title: <>Pare de depender só de anúncios. <span className="text-emerald-200 block text-sm md:text-base font-normal mt-1">Construa uma fonte de clientes gratuita e recorrente.</span></>,
    subtitle: "O SEO técnico é o melhor investimento a longo prazo.",
    ctaText: "Aumentar Meu Tráfego",
    ctaBtnClasses: "bg-emerald-500 text-white hover:bg-emerald-400",
    texture: "noise"
  },

  // --- GRUPO 5: DORES & RESULTADOS ---
  {
    id: 12,
    themeBg: "bg-red-950",
    themeBorder: "border-red-800",
    accentColor: "text-red-300",
    icon: ShieldAlert,
    category: "Alerta de Negócios",
    title: <>Site feio vende menos. <span className="text-red-100 block text-sm md:text-base font-normal mt-1">A primeira impressão é a que fica. Não passe amadorismo.</span></>,
    subtitle: "Invista na imagem digital da sua empresa.",
    ctaText: "Profissionalizar Agora",
    ctaBtnClasses: "bg-white text-red-900 hover:bg-red-50",
    texture: "none"
  },
  {
    id: 13,
    themeBg: "bg-gradient-to-r from-blue-950 via-slate-900 to-red-950",
    themeBorder: "border-slate-700",
    accentColor: "text-white",
    icon: Rocket,
    category: "Competitividade",
    title: <>Seu concorrente tem um site melhor? <span className="text-slate-300 block text-sm md:text-base font-normal mt-1">Não fique para trás. Supere a concorrência digitalmente.</span></>,
    subtitle: "Analisamos seus rivais e criamos algo superior.",
    ctaText: "Superar Concorrência",
    ctaBtnClasses: "bg-white text-slate-950 font-bold hover:bg-slate-100",
    texture: "noise"
  },
  {
    id: 14,
    themeBg: "bg-gradient-to-br from-lime-950 to-slate-900",
    themeBorder: "border-lime-900/50",
    accentColor: "text-lime-400",
    icon: LineChart,
    category: "Otimização de Conversão (CRO)",
    title: <>Muitos cliques, poucas vendas? <span className="text-lime-200 block text-sm md:text-base font-normal mt-1">Seu site pode estar com funil de vendas quebrado.</span></>,
    subtitle: "Transforme visitantes curiosos em clientes pagantes.",
    ctaText: "Melhorar Conversão",
    ctaBtnClasses: "bg-lime-600 text-white hover:bg-lime-500",
    texture: "blur-green"
  },
  {
    id: 7,
    themeBg: "bg-gradient-to-br from-yellow-950 to-amber-900",
    themeBorder: "border-yellow-900/50",
    accentColor: "text-yellow-400",
    icon: CheckCircle2,
    category: "Autoridade Digital",
    title: <>Construa autoridade no seu nicho. <span className="text-yellow-100 block text-sm md:text-base font-normal mt-1">Um site profissional te posiciona como líder de mercado.</span></>,
    subtitle: "Transmita confiança absoluta para seus clientes.",
    ctaText: "Construir Autoridade",
    ctaBtnClasses: "bg-yellow-500 text-white hover:bg-yellow-400",
    texture: "noise"
  },
  {
    id: 9,
    themeBg: "bg-slate-950",
    themeBorder: "border-slate-800",
    accentColor: "text-purple-400",
    icon: Code2,
    category: "Alta Performance Web",
    title: <>Precisando de um parceiro técnico? <span className="text-slate-400 block text-sm md:text-base font-normal mt-1">Somos especialistas em React, Next.js e performance.</span></>,
    subtitle: "A mesma qualidade deste site, para o seu negócio.",
    ctaText: "Falar no WhatsApp",
    ctaBtnClasses: "bg-purple-600 text-white hover:bg-purple-500",
    texture: "blur-purple"
  },
];

const TextureLayer = ({ type }: { type: AdModel["texture"] }) => {
    // Usando CSS radial-gradient para simular noise sem imagem externa (mais leve)
    if (type === "noise") return <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>;
    
    if (type?.startsWith("blur")) {
        const colorMap = {
            "blur-blue": "bg-blue-600/30", "blur-purple": "bg-purple-600/30", 
            "blur-green": "bg-green-600/30", "blur-orange": "bg-orange-600/30"
        };
        const colorClass = colorMap[type as keyof typeof colorMap] || "bg-white/10";
        return (
            <>
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-50 mix-blend-screen ${colorClass}`}></div>
              <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-50 mix-blend-screen ${colorClass}`}></div>
            </>
        )
    }
    return null;
}

export default function InternalAdUnit({ 
  format = "horizontal", 
  variant = "auto", 
  className = "", 
  slot = "default" 
}: InternalAdUnitProps) {
  
  let selectedAd: AdModel;
  const legacyMap: Record<string, number> = { "agency": 1, "speed": 2, "software": 3 };

  // --- LÓGICA DE SELEÇÃO (DETERMINÍSTICA) ---
  if (variant && typeof variant === "string" && legacyMap[variant]) {
      selectedAd = adsConfig.find(ad => ad.id === legacyMap[variant]) || adsConfig[0];
  } else if (variant === "auto" || !variant) {
      // Hash based on slot string to ensure consistency (anti-hydration mismatch)
      let hash = 0;
      const seed = slot || "default_slot";
      for (let i = 0; i < seed.length; i++) {
          hash = seed.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      const index = Math.abs(hash) % adsConfig.length;
      selectedAd = adsConfig[index];
  } else {
      selectedAd = adsConfig.find(ad => String(ad.id) === String(variant)) || adsConfig[0];
  }

  const waMessage = encodeURIComponent(`Olá! Vi o banner "${selectedAd.category}" no Mestre das Contas e gostaria de saber mais sobre esse serviço.`);
  const finalLink = `${BASE_URL}${waMessage}`;
  const Icon = selectedAd.icon;

  // --- RENDERIZAÇÃO VERTICAL ---
  if (format === "vertical" || format === "rectangle") {
    return (
      <a 
        href={finalLink} target="_blank" rel="noopener noreferrer"
        className={`group relative flex w-full flex-col overflow-hidden rounded-2xl ${selectedAd.themeBg} p-8 text-center shadow-xl border ${selectedAd.themeBorder} min-h-[400px] justify-between ${className} hover:ring-2 ring-white/10 transition-all isolate`}
      >
        <TextureLayer type={selectedAd.texture} />

        <div className="relative z-10 flex flex-col items-center">
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300 ${selectedAd.accentColor}`}>
                <Icon size={32} strokeWidth={1.5} />
            </div>
            
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-white/5 ${selectedAd.accentColor}`}>{selectedAd.category}</span>

            <h3 className="text-xl font-bold text-white mb-4 leading-snug text-balance">
                {selectedAd.title}
            </h3>
            
            <p className="text-sm text-slate-300 leading-relaxed opacity-80 border-t border-white/5 pt-4 text-pretty">
                {selectedAd.subtitle}
            </p>
        </div>

        <div className={`relative z-10 w-full rounded-xl py-4 text-sm font-bold transition-all shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 ${selectedAd.ctaBtnClasses} will-change-transform`}>
            {selectedAd.ctaText} <ArrowRight size={16} className="inline-block ml-1" />
        </div>
      </a>
    );
  }

  // --- RENDERIZAÇÃO HORIZONTAL ---
  return (
    <a 
      href={finalLink} target="_blank" rel="noopener noreferrer"
      className={`group relative flex w-full flex-col sm:flex-row overflow-hidden rounded-2xl px-6 py-8 sm:py-6 shadow-lg items-center justify-between border ${selectedAd.themeBg} ${selectedAd.themeBorder} ${className} hover:shadow-2xl transition-all isolate`}
    >
      <TextureLayer type={selectedAd.texture} />

      <div className="relative z-10 mb-6 sm:mb-0 text-center sm:text-left flex-1 sm:pr-8">
        <div className={`flex items-center justify-center sm:justify-start gap-2 text-[10px] font-bold uppercase tracking-widest mb-2 ${selectedAd.accentColor}`}>
           <Icon size={14} /> {selectedAd.category}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2 text-balance">
           {selectedAd.title}
        </h3>
        <p className="text-slate-400 text-sm hidden sm:block text-pretty">
            {selectedAd.subtitle}
        </p>
      </div>

      <div className={`relative z-10 flex shrink-0 items-center justify-center rounded-xl px-8 py-4 text-sm font-bold transition-all group-hover:scale-105 shadow-lg whitespace-nowrap ${selectedAd.ctaBtnClasses} will-change-transform`}>
         {selectedAd.ctaText} <ArrowRight size={16} className="ml-2" />
      </div>
    </a>
  );
}