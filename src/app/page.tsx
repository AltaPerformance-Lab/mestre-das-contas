
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
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* INJEÇÃO DO SCHEMA NO HEAD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* --- HERO SECTION (LCP OTIMIZADO) --- */}
      <HeroSection />

      {/* --- DESTAQUE DUPLO: REFORMA & QR CODE (Grid Moderno) --- */}
      <FeaturedTools />

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