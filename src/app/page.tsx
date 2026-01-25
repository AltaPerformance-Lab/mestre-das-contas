
import dynamic from 'next/dynamic';
import { Metadata } from "next";
import { 
  Briefcase, 
  TrendingUp, 
  Heart, 
  Wrench
} from "lucide-react";

// --- IMPORTAÇÃO DOS COMPONENTES DE PUBLICIDADE E CTA ---
// Lazy Load para AdUnit (Melhora LCP e TBT) - Agora via wrapper Client Component
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import AgencyCTA from "@/components/layout/AgencyCTA";

// --- IMPORTAÇÃO DOS NOVOS COMPONENTES REFATORADOS ---
import HeroSection from "@/components/home/HeroSection";
import FeaturedTools from "@/components/home/FeaturedTools";
import CalculatorCategory from "@/components/home/CalculatorCategory";

// --- IMPORTAÇÃO DOS DADOS ---
import { laborCards, financeCards, healthCards, toolsCards } from "@/data/home-cards";

// --- METADATA AVANÇADA PARA SEO ---
export const metadata: Metadata = {
  title: "Mestre das Contas - Calculadoras Trabalhistas, Financeiras e Reforma Tributária",
  description: "Faça cálculos exatos de Rescisão, Férias, 13º Salário e simule o impacto da Reforma Tributária 2026. Ferramentas gratuitas e atualizadas pela Lei vigente.",
  keywords: ["calculadora rescisão", "calculadora férias", "reforma tributária 2026", "simulador iva", "gerador qr code", "mestre das contas", "conversor imagem", "gerador senhas"],
  alternates: {
    canonical: "https://mestredascontas.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://mestredascontas.com.br",
    title: "Mestre das Contas - Ferramentas de Precisão",
    description: "Simplifique sua vida financeira com calculadoras que funcionam.",
    siteName: "Mestre das Contas",
  },
};

export default function Home() {
  
  // SCHEMA MARKUP (JSON-LD) - Estrutura de WebSite e Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mestre das Contas",
    "url": "https://mestredascontas.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mestredascontas.com.br/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "Calculadoras gratuitas para cálculos trabalhistas, financeiros e de saúde.",
    "publisher": {
      "@type": "Organization",
      "name": "Mestre das Contas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mestredascontas.com.br/opengraph-image" 
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      
      {/* INJEÇÃO DO SCHEMA NO HEAD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* --- HERO SECTION (LCP OTIMIZADO) --- */}
      <HeroSection />

      {/* --- DESTAQUE DUPLO: REFORMA & QR CODE (Grid Moderno) --- */}
      <FeaturedTools />

      {/* --- NAVEGAÇÃO POR CATEGORIAS (ACESSIBILIDADE/UX) --- */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
           <Briefcase className="text-blue-600" size={24} /> O que você precisa hoje?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* CARD 1 - TRABALHISTA */}
            <a href="/trabalhista" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <Briefcase size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Trabalhista</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">Rescisão, Férias, 13º</span>
            </a>

            {/* CARD 2 - FINANCEIRO */}
            <a href="/financeiro" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <TrendingUp size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Financeiro</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">Salário, MEI, Juros</span>
            </a>

            {/* CARD 3 - FERRAMENTAS */}
            <a href="/ferramentas" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-violet-50 dark:bg-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <Wrench size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Ferramentas</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">PDF, QR Code, Senhas</span>
            </a>

            {/* CARD 4 - SAÚDE */}
            <a href="/saude" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-rose-50 dark:bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <Heart size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Saúde</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">IMC, Calorias, Água</span>
            </a>

        </div>
      </section>

      {/* --- PUBLICIDADE (SLOT 1 - ALTA VISIBILIDADE) --- */}
      <section className="max-w-5xl mx-auto px-4 mb-16 min-h-[100px]">
        <LazyAdUnit slot="home_top_feed" format="horizontal" />
      </section>

      {/* --- CATEGORIAS DE CALCULADORAS --- */}
      <section id="calculadoras" className="pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* BLOCO TRABALHISTA */}
          <CalculatorCategory 
            title="Trabalhista"
            description="Garanta seus direitos. Cálculos baseados na CLT."
            icon={<Briefcase size={28}/>}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            linkHref="/trabalhista"
            linkColor="text-blue-600"
            cards={laborCards}
            cols={3}
          />

          {/* --- PUBLICIDADE (SLOT 2 - ENTRE CATEGORIAS) --- */}
          <LazyAdUnit slot="home_middle_feed" format="horizontal" />

          {/* BLOCO FINANCEIRO */}
          <CalculatorCategory 
            title="Financeiro"
            description="Planeje seu futuro e proteja seu dinheiro."
            icon={<TrendingUp size={28}/>}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-600"
            linkHref="/financeiro"
            linkColor="text-emerald-600"
            cards={financeCards}
            cols={3}
          />

           {/* BLOCO UTILIDADES (NOVO) */}
           <CalculatorCategory 
            title="Utilidades Digitais"
            description="Ferramentas práticas para o seu dia a dia online."
            icon={<Wrench size={28}/>}
            iconBgColor="bg-violet-100"
            iconColor="text-violet-600"
            linkHref="/ferramentas"
            linkColor="text-violet-600"
            cards={toolsCards}
            cols={4}
          />

          {/* BLOCO SAÚDE */}
          <CalculatorCategory 
            title="Saúde e Bem-estar"
            description="Cuidar de você também é uma conta que precisa fechar."
            icon={<Heart size={28}/>}
            iconBgColor="bg-rose-100"
            iconColor="text-rose-600"
            linkHref="/saude"
            linkColor="text-rose-600"
            cards={healthCards}
            cols={4}
          />

        </div>
      </section>

      {/* --- CTA FINAL DA AGÊNCIA (Capture Leads de Desenvolvimento) --- */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
         <AgencyCTA />
      </section>

    </div>
  );
}